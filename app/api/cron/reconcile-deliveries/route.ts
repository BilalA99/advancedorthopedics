import { NextResponse } from "next/server";

import { countUnresolved, reconcileStalled } from "@/lib/delivery-store";
import { countByStatus, listPending } from "@/lib/meta-ingestion-store";
import { ingestMetaLead } from "@/lib/meta-lead-ingest";

/**
 * Reconciliation sweep for the delivery outbox.
 *
 * WHY A CRON AND NOT JUST RETRIES IN THE WEBHOOK
 * `waitUntil` keeps a background task alive until it settles, but if the
 * invocation dies mid-send — a deploy, an OOM, a platform restart — the task's
 * in-memory state goes with it and the row is left claimed in `processing`
 * forever. Nothing else would ever look at it. This sweep is the only thing that
 * does.
 *
 * It does two different things, and the distinction matters:
 *
 *   LEAD INGESTION (public.meta_lead_ingestions) IS re-driven. A lead that was
 *   received but never stored — a failed Graph lookup, a Supabase blip, an
 *   invocation that died — is retried, because every downstream step is keyed on
 *   a unique column and so a retry resumes rather than duplicates. Not retrying
 *   would mean losing the patient, since Meta already got its 200.
 *
 *   MESSAGE DELIVERY (public.message_deliveries) is NOT re-sent. A row stuck in
 *   `processing` may or may not have reached the provider, and the outcome is
 *   genuinely unknowable from here, so it is promoted to `unknown` for a human.
 *   Resending into a patient's inbox on a guess is the one thing this must never
 *   do.
 *
 * AUTHENTICATION. Vercel Cron sends `Authorization: Bearer $CRON_SECRET`. The
 * check is mandatory and fails closed: without it this would be a public
 * endpoint that mutates delivery state, and anyone could mark every pending
 * patient email `unknown` and stop it ever being investigated.
 *
 * The response carries COUNTS ONLY — no lead id, no submission id, no address.
 *
 * Runs every 30 minutes (vercel.json). A lead that fails ingestion is therefore
 * retried within half an hour rather than never.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Minutes a `processing` row may sit before it is treated as stalled. */
const STALL_MINUTES = 30;

function isAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  // No secret configured = no access. Never default to open.
  if (!secret) return false;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    console.warn("[reconcile-deliveries] unauthorized");
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  // ── 1. Re-drive unfinished lead ingestion ─────────────────────────────────
  // Bounded per run, so a backlog drains over several sweeps instead of one
  // invocation timing out and achieving nothing.
  const token = process.env.META_LEADS_ACCESS_TOKEN;
  let redriven = 0;
  let redriveFailed = 0;

  if (token) {
    const pending = await listPending({ limit: 10, stallMinutes: STALL_MINUTES });
    for (const record of pending) {
      try {
        await ingestMetaLead(
          {
            leadgen_id: record.leadgenId,
            form_id: record.formId ?? undefined,
            page_id: record.pageId ?? undefined,
            campaign_id: record.campaignId ?? undefined,
            adgroup_id: record.adsetId ?? undefined,
            ad_id: record.adId ?? undefined,
          },
          token,
        );
        redriven += 1;
      } catch {
        // ingestMetaLead already recorded the attempt and logged a sanitized
        // code. Keep going: one unrecoverable lead must not block the rest.
        redriveFailed += 1;
      }
    }
  } else if ((await countByStatus()).received) {
    console.error("[reconcile-deliveries] leads are waiting but META_LEADS_ACCESS_TOKEN is unset");
  }

  // ── 2. Flag stalled message deliveries for review ─────────────────────────
  const { flagged } = await reconcileStalled(STALL_MINUTES);
  const unresolved = await countUnresolved();
  const ingestion = await countByStatus();

  // Generic alerting surface: an operator watching logs sees that N deliveries
  // need review without learning anything about who they belong to.
  const needsReview =
    flagged > 0 ||
    redriveFailed > 0 ||
    !!unresolved.unknown ||
    !!unresolved.failed ||
    !!unresolved.bounced ||
    !!ingestion.failed ||
    !!ingestion.quarantined;

  if (needsReview) {
    console.warn("[reconcile-deliveries] needs review", {
      flagged,
      redriven,
      redriveFailed,
      deliveries: unresolved,
      ingestion,
    });
  } else {
    console.info("[reconcile-deliveries] clean", { redriven, deliveries: unresolved, ingestion });
  }

  return NextResponse.json({
    ok: true,
    redriven,
    redriveFailed,
    flagged,
    unresolved,
    ingestion,
  });
}
