import { NextResponse } from "next/server";
import { waitUntil } from "@vercel/functions";

import { sendMetaLeadEmail } from "@/components/email/sendcontactemail";
import {
  extractLeadgenChanges,
  mapLeadToContact,
  verifyMetaSignature,
  type GraphLead,
  type LeadgenValue,
} from "@/lib/meta-leadgen";

/**
 * Meta Instant Form -> info@ notification, in real time.
 *
 * Meta POSTs here the moment someone submits one of the Meta ads' Instant
 * Forms. We verify the signature, acknowledge immediately, then fetch the lead
 * and hand it to `sendMetaLeadEmail` — the same Resend sender and the same
 * `info@` recipient every website form already uses, but a STAFF-facing
 * template rather than the patient-facing one, because a scheduler reading this
 * needs the phone number and the action, not a thank-you letter.
 *
 * Idempotency is keyed on Meta's lead id, so a webhook retry cannot double-send.
 *
 * Why a webhook rather than polling: Meta offers no native email delivery and
 * deletes Instant Form leads after 90 days, so the alternative is discovering
 * leads on a timer. This arrives in seconds.
 *
 * Privacy: the form behind these ads deliberately collects contact details only
 * — no date of birth, no insurance, nothing clinical. That is strictly less
 * than the website appointment form already sends through this same path.
 */

export const runtime = "nodejs";
// Signature verification needs the raw body, and Meta expects a fast 200.
export const dynamic = "force-dynamic";

const GRAPH_VERSION = process.env.META_GRAPH_API_VERSION || "v26.0";
const LEAD_FIELDS = "id,created_time,field_data,campaign_id,adset_id,ad_id,form_id,platform";

async function fetchLead(leadgenId: string, token: string): Promise<GraphLead> {
  const url =
    `https://graph.facebook.com/${GRAPH_VERSION}/${leadgenId}` +
    `?fields=${LEAD_FIELDS}&access_token=${encodeURIComponent(token)}`;
  const res = await fetch(url, { cache: "no-store" });
  const json = (await res.json()) as GraphLead;
  if (!res.ok || json.error) {
    throw new Error(json.error?.message || `Graph returned ${res.status}`);
  }
  return json;
}

async function deliver(change: LeadgenValue, token: string): Promise<void> {
  const leadgenId = change.leadgen_id as string;
  const lead = await fetchLead(leadgenId, token);
  const contact = mapLeadToContact(lead, change);

  // Meta reports created_time in ISO; show it in clinic time so the scheduler
  // can judge how fresh the lead is at a glance.
  const submittedAt = lead.created_time
    ? new Date(lead.created_time).toLocaleString("en-US", {
        timeZone: "America/New_York",
        dateStyle: "medium",
        timeStyle: "short",
      })
    : undefined;

  await sendMetaLeadEmail({
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    location: contact.location,
    platform: contact.utm_source,
    leadId: leadgenId,
    formId: lead.form_id || change.form_id,
    campaignId: contact.utm_campaign,
    adsetId: contact.utm_term,
    adId: contact.utm_content,
    submittedAt,
  });

  // Identifiers only — never contact fields.
  console.info("[MetaLeadgen] delivered", {
    leadgenId,
    formId: lead.form_id || change.form_id,
    adId: lead.ad_id || change.ad_id,
  });
}

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

  // Respond first. Meta treats a slow 200 as a failure and retries, which would
  // double-send; `waitUntil` lets delivery finish after the response is sent.
  waitUntil(
    (async () => {
      for (const change of changes) {
        try {
          await deliver(change, token);
        } catch (error) {
          // Resend's idempotency key makes a Meta retry safe, so logging loudly
          // and letting Meta retry is the correct recovery here.
          console.error("[MetaLeadgen] delivery failed", {
            leadgenId: change.leadgen_id,
            reason: error instanceof Error ? error.message : String(error),
          });
        }
      }
    })(),
  );

  return NextResponse.json({ ok: true, received: changes.length });
}
