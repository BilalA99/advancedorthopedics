import { NextResponse } from "next/server";
import { waitUntil } from "@vercel/functions";

import { recordReceived } from "@/lib/meta-ingestion-store";
import { ingestMetaLead } from "@/lib/meta-lead-ingest";
import { extractLeadgenChanges, verifyMetaSignature, type LeadgenValue } from "@/lib/meta-leadgen";

/**
 * Meta Instant Form -> lead capture, staff alert, patient acknowledgement.
 *
 * Meta POSTs here the moment someone submits one of the Meta ads' Instant
 * Forms. We verify the signature, record the lead id durably, acknowledge, then
 * fetch and process in the background. `lib/meta-lead-ingest.ts` does the
 * fetch-and-process work, because an App Router route module may export only
 * route handlers and the reconciliation cron needs to call the same code.
 *
 * Why a webhook rather than polling: Meta offers no native email delivery and
 * deletes Instant Form leads after 90 days, so the alternative is discovering
 * leads on a timer. This arrives in seconds.
 *
 * FORM VERSIONS. Both the V2 form and the V3 form are accepted; the registry is
 * lib/meta-forms.ts. An unrecognised form, or a lead from an unauthorized Page,
 * is QUARANTINED rather than rejected: it is still stored, and staff get a
 * GENERIC alert carrying identifiers only — never contact details — so an
 * unverifiable lead cannot be mistaken for a real patient to call, and no
 * automatic patient email goes out. Dropping a real patient over a config
 * mismatch is the worse failure; so is putting a stranger's details in front of
 * a scheduler.
 *
 * Privacy: the forms behind these ads deliberately collect contact details only
 * — no date of birth, no insurance, nothing clinical. That is strictly less than
 * the website appointment form already sends through this same path.
 */

export const runtime = "nodejs";
// Signature verification needs the raw body, and Meta expects a fast 200.
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");
  const expected = process.env.META_WEBHOOK_VERIFY_TOKEN;

  if (mode === "subscribe" && expected && token === expected && challenge) {
    return new Response(challenge, {
      status: 200,
      headers: { "content-type": "text/plain" },
    });
  }
  console.warn("[MetaLeadgen] verification rejected");
  return NextResponse.json({ ok: false }, { status: 403 });
}

export async function POST(request: Request) {
  const appSecret = process.env.META_APP_SECRET;
  const token = process.env.META_LEADS_ACCESS_TOKEN;
  const raw = await request.text();

  if (!appSecret) {
    console.error("[MetaLeadgen] META_APP_SECRET is not configured");
    return NextResponse.json({ ok: false }, { status: 500 });
  }
  if (!verifyMetaSignature(appSecret, request.headers.get("x-hub-signature-256"), raw)) {
    console.warn("[MetaLeadgen] signature rejected", { bytes: raw.length });
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let changes: LeadgenValue[] = [];
  try {
    changes = extractLeadgenChanges(JSON.parse(raw));
  } catch {
    console.warn("[MetaLeadgen] malformed body");
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!token) {
    // Acknowledge so Meta does not retry into a wall, but make the gap loud.
    // The lead is still retrievable from the Instant Forms library.
    console.error("[MetaLeadgen] META_LEADS_ACCESS_TOKEN missing — lead NOT delivered", {
      count: changes.length,
    });
    return NextResponse.json({ ok: true, delivered: 0 });
  }

  // ── Durable receipt, BEFORE the 200 ───────────────────────────────────────
  //
  // This is the one database write on the critical path, and it is the fix for
  // the only remaining way a lead could vanish: everything after the response
  // runs in `waitUntil`, and if that invocation dies — a deploy, an OOM, a
  // platform restart — Meta has already been told 200 and will never retry.
  // Nothing would have known the lead existed.
  //
  // Meta keeps the lead retrievable by leadgen id for 90 days, so recording the
  // id is enough to recover everything else later. One upsert per change is
  // well inside Meta's timeout; losing a patient is not an acceptable saving.
  //
  // Unauthorized pages are recorded too, rather than dropped, so a
  // misconfiguration is visible and recoverable instead of silent. They are
  // quarantined downstream and never reach the scheduling workflow.
  const receipts = await Promise.all(
    changes.map(async (change) => ({
      change,
      recorded: (
        await recordReceived({
          leadgenId: change.leadgen_id as string,
          formId: change.form_id ?? null,
          pageId: change.page_id ?? null,
          campaignId: change.campaign_id ?? null,
          adsetId: change.adgroup_id ?? null,
          adId: change.ad_id ?? null,
        })
      ).recorded,
    })),
  );

  const unrecorded = receipts.filter((r) => !r.recorded).length;
  if (unrecorded > 0) {
    // Processing still proceeds — the in-memory path is what production has
    // today, so this is no worse than the status quo — but it is loud, because
    // the safety net is missing for these leads.
    console.error("[MetaLeadgen] receipt NOT recorded — lead is not recoverable if this dies", {
      unrecorded,
      total: changes.length,
    });
  }

  // Respond first. Meta treats a slow 200 as a failure and retries, which would
  // double-send; `waitUntil` lets delivery finish after the response is sent.
  //
  // `waitUntil` is the platform's supported background-execution primitive, not
  // a bare floating promise — Vercel keeps the invocation alive until it
  // settles. It is still only the FIRST attempt. Durability comes from the two
  // tables: public.meta_lead_ingestions (recorded above, so the lead survives)
  // and public.message_deliveries (so each message is sent exactly once). The
  // reconciliation sweep re-drives whatever is left unfinished.
  waitUntil(
    (async () => {
      for (const { change } of receipts) {
        try {
          await ingestMetaLead(change, token);
        } catch (error) {
          // The attempt is already recorded against the ingestion row, so the
          // sweep will retry. Meta's own retries are safe too: every step is
          // keyed on a unique column, so a retry resumes rather than duplicates.
          console.error("[MetaLeadgen] delivery failed — left for reconciliation", {
            leadgenId: change.leadgen_id,
            reason: error instanceof Error ? error.message : String(error),
          });
        }
      }
    })(),
  );

  return NextResponse.json({ ok: true, received: changes.length });
}
