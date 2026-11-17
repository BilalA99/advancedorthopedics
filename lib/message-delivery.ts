/**
 * Durable delivery identity and state for outbound lead messages.
 *
 * WHY A SEPARATE MODEL FROM `forms.email_sent`
 * `public.forms.email_sent` is a single boolean with default false that no code
 * path has ever written — it is false on all 1,414 rows in production, including
 * the Meta leads whose staff notifications were confirmed delivered in the
 * mailbox. One boolean also cannot represent two independent messages about the
 * same lead: a staff notification that was delivered and a patient confirmation
 * that bounced are not the same fact. So `email_sent` is left untouched (never
 * backfilled, never trusted) and real state lives in `public.message_deliveries`,
 * keyed per lead PER MESSAGE TYPE.
 *
 * WHY THE KEY IS DERIVED, NOT RANDOM
 * Meta retries a webhook for ~36h, and two retries can be in flight at once.
 * Resend's `Idempotency-Key` collapses duplicates for 24h, which is shorter than
 * Meta's retry window and is provider-side state we cannot query. A key derived
 * deterministically from (external lead id, message type, version) means the
 * SECOND attempt can see the first one's row and stop, even across a cold start,
 * a redeploy, or a crash between "provider accepted" and "row updated".
 */

import { createHash } from "node:crypto";

export const MESSAGE_TYPES = ["staff-notification", "patient-confirmation"] as const;
export type MessageType = (typeof MESSAGE_TYPES)[number];

/**
 * Delivery lifecycle.
 *
 * `accepted` and `delivered` are deliberately distinct: Resend returning an id
 * means the API took the message, not that a receiving server took it. Treating
 * those as the same thing is what let the original audit read "no email" from a
 * database flag while the mail sat in the mailbox.
 */
export const DELIVERY_STATUSES = [
  "pending",
  "processing",
  "accepted",
  "delivered",
  "bounced",
  "failed",
  "suppressed",
  "unknown",
] as const;
export type DeliveryStatus = (typeof DELIVERY_STATUSES)[number];

/** Statuses that must never be retried automatically. */
const TERMINAL_STATUSES = new Set<DeliveryStatus>([
  "accepted",
  "delivered",
  "bounced",
  "suppressed",
]);

/** A hard bounce or a suppression list hit is permanent; resending is abuse. */
export function isTerminalStatus(status: DeliveryStatus): boolean {
  return TERMINAL_STATUSES.has(status);
}

export const MAX_DELIVERY_ATTEMPTS = 5;

/**
 * The logical idempotency identifier, e.g.
 *   `meta:1234567890:patient-confirmation:v1`
 *
 * Readable on purpose: an operator reading a row in the dashboard can tell what
 * it is without a lookup, and the Meta lead id is not patient information.
 */
export function buildDeliveryKey(
  namespace: string,
  externalId: string,
  messageType: MessageType,
  revision = "v1",
): string {
  const id = externalId.trim();
  if (!id) throw new Error("A delivery key needs an external id");
  return `${namespace}:${id}:${messageType}:${revision}`;
}

/**
 * The opaque form of the same key, for the provider's `Idempotency-Key` header.
 *
 * Resend's key travels in an HTTP header to a third party that holds no BAA, so
 * it must not carry a Meta lead id that can be joined back to an ad, an audience
 * or a person. A SHA-256 of the logical key is stable, collision-free in
 * practice, and meaningless to the receiver — while still guaranteeing that two
 * attempts at the same message produce the same header.
 */
export function providerIdempotencyKey(deliveryKey: string): string {
  return createHash("sha256").update(deliveryKey, "utf8").digest("hex").slice(0, 48);
}

/**
 * Bounded exponential backoff with a fixed schedule rather than a formula, so
 * the retry ceiling is obvious by reading it: ~1m, 5m, 25m, 2h.
 */
const BACKOFF_SECONDS = [60, 300, 1500, 7200] as const;

export function backoffSecondsFor(attemptCount: number): number | null {
  if (attemptCount >= MAX_DELIVERY_ATTEMPTS) return null;
  const index = Math.max(0, Math.min(attemptCount - 1, BACKOFF_SECONDS.length - 1));
  return BACKOFF_SECONDS[index];
}

/** True when a recoverable failure may be attempted again now. */
export function isRetryDue(
  attemptCount: number,
  lastAttemptAt: string | null | undefined,
  now: Date = new Date(),
): boolean {
  const wait = backoffSecondsFor(attemptCount);
  if (wait === null) return false;
  if (!lastAttemptAt) return true;
  const last = new Date(lastAttemptAt).getTime();
  if (!Number.isFinite(last)) return true;
  return now.getTime() - last >= wait * 1000;
}

/**
 * Classifies a provider error into a status.
 *
 * An invalid recipient address is `failed` and NOT retried: the address will not
 * become valid on the second attempt, and retrying it burns reputation. Only
 * transport-shaped failures (5xx, 429, network) are recoverable.
 */
export function classifyProviderFailure(statusCode: number | null | undefined, code?: string | null): {
  status: DeliveryStatus;
  recoverable: boolean;
} {
  const normalized = (code || "").toLowerCase();
  if (normalized.includes("validation") || normalized.includes("invalid")) {
    return { status: "failed", recoverable: false };
  }
  if (statusCode === 429) return { status: "pending", recoverable: true };
  if (typeof statusCode === "number" && statusCode >= 500) {
    return { status: "pending", recoverable: true };
  }
  if (typeof statusCode === "number" && statusCode >= 400) {
    return { status: "failed", recoverable: false };
  }
  // No status code at all is a network or timeout failure: recoverable.
  return { status: "pending", recoverable: true };
}

/**
 * Reduces a Resend webhook event name onto a status, or null when the event is
 * not a delivery-state transition we track.
 */
export function statusForProviderEvent(eventType: string): DeliveryStatus | null {
  switch (eventType) {
    case "email.sent":
      return "accepted";
    case "email.delivered":
      return "delivered";
    case "email.bounced":
      return "bounced";
    case "email.complained":
      return "suppressed";
    case "email.delivery_delayed":
      return "pending";
    case "email.failed":
      return "failed";
    default:
      return null;
  }
}

/**
 * Provider events arrive out of order and can replay. A rank keeps a late
 * `email.sent` from overwriting an already-recorded `email.delivered`, and makes
 * event handling idempotent without needing to store an event log.
 */
const STATUS_RANK: Record<DeliveryStatus, number> = {
  pending: 0,
  processing: 1,
  accepted: 2,
  unknown: 2,
  delivered: 3,
  failed: 4,
  bounced: 5,
  suppressed: 5,
};

export function shouldApplyStatus(current: DeliveryStatus, incoming: DeliveryStatus): boolean {
  return STATUS_RANK[incoming] > STATUS_RANK[current];
}
