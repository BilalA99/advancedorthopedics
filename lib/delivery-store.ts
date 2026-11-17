import "server-only";

import { createServiceClient } from "@/utils/supabase/service";
import {
  isTerminalStatus,
  isRetryDue,
  shouldApplyStatus,
  MAX_DELIVERY_ATTEMPTS,
  type DeliveryStatus,
  type MessageType,
} from "@/lib/message-delivery";

/**
 * Persistence for `public.message_deliveries`.
 *
 * The contract every function here keeps: NEVER THROW. Delivery bookkeeping is
 * not allowed to be the reason a lead is lost or a staff notification is
 * delayed. Each call returns a discriminated result and logs identifiers only,
 * so an outage here degrades the system to "the old behaviour, loudly" rather
 * than to "leads on the floor".
 */

const TABLE = "message_deliveries";

export type ClaimOutcome =
  /** This caller owns the send. Proceed. */
  | { claimed: true; deliveryId: string; attempt: number }
  /** Someone already sent it (or it is permanently dead). Do not send. */
  | { claimed: false; reason: "already-settled"; status: DeliveryStatus }
  /** A recoverable attempt exists but its backoff has not elapsed. */
  | { claimed: false; reason: "backoff" }
  /** Attempts exhausted. Needs a human, not another send. */
  | { claimed: false; reason: "exhausted" }
  /** No durable store. Caller decides whether to fail open or closed. */
  | { claimed: false; reason: "store-unavailable" };

/**
 * Claims the right to send one message, exactly once.
 *
 * The claim is an INSERT on a UNIQUE column, which is the only primitive that is
 * actually atomic across two concurrent serverless invocations. Two Meta retries
 * racing each other both try to insert the same `delivery_key`; Postgres lets
 * exactly one through and gives the other a 23505, which is read here as "the
 * other one owns it" rather than as an error.
 *
 * On a retry of a previously-failed attempt the row already exists, so the
 * insert conflicts; we then read the row and decide by status and backoff.
 */
export async function claimDelivery({
  submissionId,
  messageType,
  deliveryKey,
}: {
  submissionId: string;
  messageType: MessageType;
  deliveryKey: string;
}): Promise<ClaimOutcome> {
  const supabase = createServiceClient();
  if (!supabase) return { claimed: false, reason: "store-unavailable" };

  try {
    const { data, error } = await supabase
      .from(TABLE)
      .insert({
        submission_id: submissionId,
        message_type: messageType,
        delivery_key: deliveryKey,
        status: "processing",
        attempt_count: 1,
        last_attempt_at: new Date().toISOString(),
      })
      .select("id, attempt_count")
      .single();

    if (!error && data) {
      return { claimed: true, deliveryId: data.id as string, attempt: 1 };
    }

    // 23505 = unique violation on delivery_key: a row already exists.
    if ((error as { code?: string } | null)?.code !== "23505") {
      console.error("[delivery-store] claim insert failed", {
        messageType,
        code: (error as { code?: string } | null)?.code,
      });
      return { claimed: false, reason: "store-unavailable" };
    }
  } catch (err) {
    console.error("[delivery-store] claim threw", {
      messageType,
      reason: err instanceof Error ? err.message : "unknown",
    });
    return { claimed: false, reason: "store-unavailable" };
  }

  // The row exists. Decide whether this is a legitimate retry.
  try {
    const { data, error } = await supabase
      .from(TABLE)
      .select("id, status, attempt_count, last_attempt_at")
      .eq("delivery_key", deliveryKey)
      .single();

    if (error || !data) return { claimed: false, reason: "store-unavailable" };

    const status = data.status as DeliveryStatus;
    const attempts = data.attempt_count as number;

    // Already accepted/delivered/bounced/suppressed: sending again is the exact
    // duplicate this table exists to prevent.
    if (isTerminalStatus(status)) return { claimed: false, reason: "already-settled", status };

    // A `processing` row left by a crashed attempt is indistinguishable from one
    // left by a live attempt, so it is governed by the same backoff rather than
    // being re-sent immediately. A crash between provider-accept and row-update
    // leaves this row `processing`; the reconciliation sweep promotes it to
    // `unknown` for review instead of resending blindly.
    if (!isRetryDue(attempts, data.last_attempt_at as string | null)) {
      return attempts >= MAX_DELIVERY_ATTEMPTS
        ? { claimed: false, reason: "exhausted" }
        : { claimed: false, reason: "backoff" };
    }

    const nextAttempt = attempts + 1;
    const { data: updated, error: updateError } = await supabase
      .from(TABLE)
      .update({
        status: "processing",
        attempt_count: nextAttempt,
        last_attempt_at: new Date().toISOString(),
      })
      .eq("id", data.id)
      // Optimistic guard: only win if nobody else bumped the attempt first.
      .eq("attempt_count", attempts)
      .select("id");

    if (updateError || !updated?.length) return { claimed: false, reason: "backoff" };
    return { claimed: true, deliveryId: data.id as string, attempt: nextAttempt };
  } catch (err) {
    console.error("[delivery-store] claim re-read threw", {
      messageType,
      reason: err instanceof Error ? err.message : "unknown",
    });
    return { claimed: false, reason: "store-unavailable" };
  }
}

/** Records provider acceptance. `providerMessageId` is the reconciliation handle. */
export async function recordAccepted(
  deliveryId: string,
  providerMessageId: string | null,
): Promise<void> {
  const supabase = createServiceClient();
  if (!supabase) return;
  try {
    await supabase
      .from(TABLE)
      .update({
        status: "accepted",
        provider_message_id: providerMessageId,
        accepted_at: new Date().toISOString(),
        error_code: null,
      })
      .eq("id", deliveryId);
  } catch (err) {
    // The send already happened. Losing this write is survivable precisely
    // because the delivery_key is deterministic: reconciliation finds the row
    // stuck in `processing` and flags it instead of re-sending.
    console.error("[delivery-store] recordAccepted failed", {
      deliveryId,
      reason: err instanceof Error ? err.message : "unknown",
    });
  }
}

/** Records a failed attempt. `pending` leaves it eligible for backoff retry. */
export async function recordFailure(
  deliveryId: string,
  status: Extract<DeliveryStatus, "pending" | "failed" | "unknown">,
  errorCode: string,
): Promise<void> {
  const supabase = createServiceClient();
  if (!supabase) return;
  try {
    const now = new Date().toISOString();
    await supabase
      .from(TABLE)
      .update({
        status,
        // Sanitized code only — never a provider message, which can echo the
        // recipient address back into the database.
        error_code: errorCode.slice(0, 64),
        ...(status === "failed" ? { failed_at: now } : {}),
      })
      .eq("id", deliveryId);
  } catch (err) {
    console.error("[delivery-store] recordFailure failed", {
      deliveryId,
      reason: err instanceof Error ? err.message : "unknown",
    });
  }
}

/**
 * Records a message that was deliberately NOT sent — flag off, or a lead older
 * than the activation boundary.
 *
 * Writing a `suppressed` row rather than nothing is what makes the decision
 * auditable, and what guarantees that flipping the flag on later does not mail
 * the historical leads: the row is terminal, so a later claim is refused.
 */
export async function recordSuppressed({
  submissionId,
  messageType,
  deliveryKey,
  reason,
}: {
  submissionId: string;
  messageType: MessageType;
  deliveryKey: string;
  reason: string;
}): Promise<void> {
  const supabase = createServiceClient();
  if (!supabase) return;
  try {
    await supabase.from(TABLE).upsert(
      {
        submission_id: submissionId,
        message_type: messageType,
        delivery_key: deliveryKey,
        status: "suppressed",
        error_code: reason.slice(0, 64),
      },
      { onConflict: "delivery_key", ignoreDuplicates: true },
    );
  } catch (err) {
    console.error("[delivery-store] recordSuppressed failed", {
      messageType,
      reason: err instanceof Error ? err.message : "unknown",
    });
  }
}

/**
 * Applies a provider delivery event, idempotently.
 *
 * Resend replays webhooks and delivers them out of order, so a late
 * `email.sent` must not overwrite a recorded `email.delivered`. The status rank
 * in `lib/message-delivery.ts` decides; an out-of-order or duplicate event is a
 * no-op rather than a regression.
 */
export async function applyProviderEvent({
  providerMessageId,
  status,
  occurredAt,
}: {
  providerMessageId: string;
  status: DeliveryStatus;
  occurredAt: string;
}): Promise<{ applied: boolean; reason?: string }> {
  const supabase = createServiceClient();
  if (!supabase) return { applied: false, reason: "store-unavailable" };

  try {
    const { data, error } = await supabase
      .from(TABLE)
      .select("id, status")
      .eq("provider_message_id", providerMessageId)
      .maybeSingle();

    if (error) return { applied: false, reason: "lookup-failed" };
    // An event for a message this system did not send (e.g. a website form's
    // confirmation, which is not tracked in this table).
    if (!data) return { applied: false, reason: "unknown-message" };

    const current = data.status as DeliveryStatus;
    if (!shouldApplyStatus(current, status)) {
      return { applied: false, reason: "out-of-order" };
    }

    const stamp =
      status === "delivered"
        ? { delivered_at: occurredAt }
        : status === "bounced"
          ? { bounced_at: occurredAt }
          : status === "failed"
            ? { failed_at: occurredAt }
            : {};

    const { data: updated, error: updateError } = await supabase
      .from(TABLE)
      .update({ status, ...stamp })
      .eq("id", data.id)
      // Guard against a concurrent event winning in between.
      .eq("status", current)
      .select("id");

    if (updateError) return { applied: false, reason: "update-failed" };
    if (!updated?.length) return { applied: false, reason: "out-of-order" };
    return { applied: true };
  } catch (err) {
    console.error("[delivery-store] applyProviderEvent threw", {
      reason: err instanceof Error ? err.message : "unknown",
    });
    return { applied: false, reason: "store-unavailable" };
  }
}

/**
 * Promotes attempts stuck mid-flight to `unknown` for human review.
 *
 * This is the answer to "the provider accepted the email but the application
 * crashed before recording success". That row sits in `processing` with a
 * provider id we never captured, so the outcome is genuinely unknowable from
 * here — and the safe move is to FLAG it, not to resend indefinitely into a
 * patient's inbox. Returns counts only; never lead data.
 */
export async function reconcileStalled(olderThanMinutes = 30): Promise<{ flagged: number }> {
  const supabase = createServiceClient();
  if (!supabase) return { flagged: 0 };
  try {
    const cutoff = new Date(Date.now() - olderThanMinutes * 60_000).toISOString();
    const { data, error } = await supabase
      .from(TABLE)
      .update({ status: "unknown", error_code: "stalled_in_processing" })
      .eq("status", "processing")
      .lt("last_attempt_at", cutoff)
      .select("id");
    if (error) return { flagged: 0 };
    return { flagged: data?.length ?? 0 };
  } catch {
    return { flagged: 0 };
  }
}

/**
 * Counts unresolved deliveries, for generic operational alerting.
 *
 * Deliberately a COUNT and nothing else: an alert that names the patient whose
 * confirmation bounced has moved patient data into whatever receives alerts.
 */
export async function countUnresolved(): Promise<Record<string, number>> {
  const supabase = createServiceClient();
  if (!supabase) return {};
  try {
    const out: Record<string, number> = {};
    for (const status of ["pending", "processing", "unknown", "failed", "bounced"] as const) {
      const { count } = await supabase
        .from(TABLE)
        .select("id", { count: "exact", head: true })
        .eq("status", status);
      if (count) out[status] = count;
    }
    return out;
  } catch {
    return {};
  }
}
