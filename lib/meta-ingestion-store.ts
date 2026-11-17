import "server-only";

import { createServiceClient } from "@/utils/supabase/service";

/**
 * Persistence for `public.meta_lead_ingestions` — the work queue that makes a
 * Meta lead recoverable after the webhook has already answered 200.
 *
 * Same contract as `lib/delivery-store.ts`: NEVER THROW. A bookkeeping failure
 * must not be the reason a lead is dropped, so every function returns a result
 * and logs identifiers only.
 */

const TABLE = "meta_lead_ingestions";

export const MAX_INGESTION_ATTEMPTS = 5;

export type IngestionStatus =
  | "received"
  | "processing"
  | "completed"
  | "quarantined"
  | "failed"
  | "unknown";

export type IngestionRecord = {
  leadgenId: string;
  formId: string | null;
  pageId: string | null;
  campaignId: string | null;
  adsetId: string | null;
  adId: string | null;
  attemptCount: number;
};

/**
 * Records that a lead arrived, BEFORE the webhook responds.
 *
 * This is the one database write that is worth doing on the critical path. Meta
 * tolerates a few seconds; it does not tolerate being told 200 for a lead that
 * then evaporates, because it will never retry and the leadgen id is the only
 * way to fetch the lead back inside its 90-day window.
 *
 * Idempotent by primary key: a duplicate webhook re-notes the same row rather
 * than queueing a second unit of work. `ignoreDuplicates` is what makes the
 * second call a no-op instead of resetting a row that is mid-flight.
 */
export async function recordReceived(
  record: Omit<IngestionRecord, "attemptCount">,
): Promise<{ recorded: boolean }> {
  const supabase = createServiceClient();
  if (!supabase) return { recorded: false };
  try {
    const { error } = await supabase.from(TABLE).upsert(
      {
        leadgen_id: record.leadgenId,
        form_id: record.formId,
        page_id: record.pageId,
        campaign_id: record.campaignId,
        adset_id: record.adsetId,
        ad_id: record.adId,
        status: "received",
      },
      { onConflict: "leadgen_id", ignoreDuplicates: true },
    );
    if (error) {
      console.error("[meta-ingestion] recordReceived failed", {
        leadgenId: record.leadgenId,
        code: (error as { code?: string }).code,
      });
      return { recorded: false };
    }
    return { recorded: true };
  } catch (err) {
    console.error("[meta-ingestion] recordReceived threw", {
      leadgenId: record.leadgenId,
      reason: err instanceof Error ? err.message : "unknown",
    });
    return { recorded: false };
  }
}

/** Marks an attempt as started and bumps the counter. */
export async function markProcessing(leadgenId: string): Promise<void> {
  const supabase = createServiceClient();
  if (!supabase) return;
  try {
    // Read-then-write rather than an atomic increment: Supabase's REST client
    // has no `attempt_count = attempt_count + 1` form, and this counter only
    // bounds retries — an undercount from a race costs one extra attempt, not
    // correctness. The dedup guarantees live on UNIQUE columns, not here.
    const { data } = await supabase
      .from(TABLE)
      .select("attempt_count")
      .eq("leadgen_id", leadgenId)
      .maybeSingle();
    await supabase
      .from(TABLE)
      .update({
        status: "processing",
        attempt_count: ((data?.attempt_count as number) ?? 0) + 1,
        last_attempt_at: new Date().toISOString(),
      })
      .eq("leadgen_id", leadgenId);
  } catch (err) {
    console.error("[meta-ingestion] markProcessing failed", {
      leadgenId,
      reason: err instanceof Error ? err.message : "unknown",
    });
  }
}

/** Ingestion finished: the lead is stored in public.forms. */
export async function markCompleted(leadgenId: string, submissionId: string): Promise<void> {
  const supabase = createServiceClient();
  if (!supabase) return;
  try {
    await supabase
      .from(TABLE)
      .update({
        status: "completed",
        submission_id: submissionId,
        completed_at: new Date().toISOString(),
        error_code: null,
      })
      .eq("leadgen_id", leadgenId);
  } catch (err) {
    console.error("[meta-ingestion] markCompleted failed", {
      leadgenId,
      reason: err instanceof Error ? err.message : "unknown",
    });
  }
}

/**
 * Terminal states that are NOT retried.
 *
 * `quarantined` is terminal on purpose. An unauthorized form or page will not
 * become authorized by being retried, and retrying would re-send the
 * operational alert on every sweep. Clearing it is a deliberate act: configure
 * the form id, then reset the row's status to 'received'.
 */
export async function markQuarantined(leadgenId: string, reason: string): Promise<void> {
  const supabase = createServiceClient();
  if (!supabase) return;
  try {
    await supabase
      .from(TABLE)
      .update({ status: "quarantined", error_code: reason.slice(0, 64) })
      .eq("leadgen_id", leadgenId);
  } catch (err) {
    console.error("[meta-ingestion] markQuarantined failed", {
      leadgenId,
      reason: err instanceof Error ? err.message : "unknown",
    });
  }
}

/**
 * An attempt failed. Goes back to `received` while attempts remain, so the
 * sweep picks it up; `failed` once they are exhausted, so it stops and waits
 * for a human rather than retrying forever.
 */
export async function markAttemptFailed(
  leadgenId: string,
  errorCode: string,
): Promise<{ exhausted: boolean }> {
  const supabase = createServiceClient();
  if (!supabase) return { exhausted: false };
  try {
    const { data } = await supabase
      .from(TABLE)
      .select("attempt_count")
      .eq("leadgen_id", leadgenId)
      .maybeSingle();
    const attempts = (data?.attempt_count as number) ?? 1;
    const exhausted = attempts >= MAX_INGESTION_ATTEMPTS;
    await supabase
      .from(TABLE)
      .update({
        status: exhausted ? "failed" : "received",
        error_code: errorCode.slice(0, 64),
      })
      .eq("leadgen_id", leadgenId);
    return { exhausted };
  } catch (err) {
    console.error("[meta-ingestion] markAttemptFailed failed", {
      leadgenId,
      reason: err instanceof Error ? err.message : "unknown",
    });
    return { exhausted: false };
  }
}

/**
 * Leads still needing work, oldest first.
 *
 * `processing` rows older than the stall window are included: that state means
 * an attempt started and never reported back, which is exactly the
 * invocation-died case this queue exists for. Re-driving is safe because every
 * downstream step is idempotent — the lead insert is guarded by a unique
 * external_lead_id, and each message by a unique delivery_key.
 */
export async function listPending({
  limit = 25,
  stallMinutes = 10,
}: { limit?: number; stallMinutes?: number } = {}): Promise<IngestionRecord[]> {
  const supabase = createServiceClient();
  if (!supabase) return [];
  try {
    const stallCutoff = new Date(Date.now() - stallMinutes * 60_000).toISOString();
    const { data, error } = await supabase
      .from(TABLE)
      .select("leadgen_id, form_id, page_id, campaign_id, adset_id, ad_id, attempt_count, status, last_attempt_at")
      .in("status", ["received", "processing", "unknown"])
      .lt("attempt_count", MAX_INGESTION_ATTEMPTS)
      .order("received_at", { ascending: true })
      .limit(limit);

    if (error || !data) return [];

    return data
      .filter((row) => {
        // A 'received' row has no attempt in flight and is due immediately.
        if (row.status !== "processing") return true;
        // A 'processing' row is only due once the stall window has passed, so a
        // live attempt is never raced by the sweep.
        const last = row.last_attempt_at as string | null;
        return !last || last < stallCutoff;
      })
      .map((row) => ({
        leadgenId: row.leadgen_id as string,
        formId: (row.form_id as string | null) ?? null,
        pageId: (row.page_id as string | null) ?? null,
        campaignId: (row.campaign_id as string | null) ?? null,
        adsetId: (row.adset_id as string | null) ?? null,
        adId: (row.ad_id as string | null) ?? null,
        attemptCount: (row.attempt_count as number) ?? 0,
      }));
  } catch (err) {
    console.error("[meta-ingestion] listPending threw", {
      reason: err instanceof Error ? err.message : "unknown",
    });
    return [];
  }
}

/** Counts by status, for generic operational alerting. Never lead data. */
export async function countByStatus(): Promise<Record<string, number>> {
  const supabase = createServiceClient();
  if (!supabase) return {};
  const out: Record<string, number> = {};
  for (const status of ["received", "processing", "quarantined", "failed", "unknown"] as const) {
    try {
      const { count } = await supabase
        .from(TABLE)
        .select("leadgen_id", { count: "exact", head: true })
        .eq("status", status);
      if (count) out[status] = count;
    } catch {
      // Counting is diagnostic; a failure here must not break the sweep.
    }
  }
  return out;
}
