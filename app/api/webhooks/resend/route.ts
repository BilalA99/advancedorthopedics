import { NextResponse } from "next/server";

import { applyProviderEvent } from "@/lib/delivery-store";
import { statusForProviderEvent } from "@/lib/message-delivery";
import { parseResendEvent, verifyResendSignature } from "@/lib/resend-webhook";

/**
 * Resend delivery-event receiver.
 *
 * WHY THIS EXISTS
 * Resend's API returning an id means Resend accepted the message, not that a
 * receiving server did. Without these events the delivery table could only ever
 * say `accepted`, which is exactly the conflation that let the first audit read
 * "no email was sent" off a database flag while the mail sat in the mailbox.
 * These events are the only source of `delivered`, `bounced` and `complained`.
 *
 * Requires RESEND_WEBHOOK_SECRET and a webhook configured in the Resend
 * dashboard. Until both exist this endpoint verifies nothing successfully and
 * returns 401, which is the correct closed state — the rest of the pipeline does
 * not depend on it.
 */

export const runtime = "nodejs";
// Signature verification needs the exact raw body.
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const raw = await request.text();

  const verification = verifyResendSignature({
    secret: process.env.RESEND_WEBHOOK_SECRET,
    svixId: request.headers.get("svix-id"),
    svixTimestamp: request.headers.get("svix-timestamp"),
    svixSignature: request.headers.get("svix-signature"),
    rawBody: raw,
  });

  if (!verification.ok) {
    // Reason only — never the body, which carries the recipient address.
    console.warn("[ResendWebhook] rejected", { reason: verification.reason });
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const event = parseResendEvent(JSON.parse(raw) as unknown);
  if (!event) {
    console.warn("[ResendWebhook] unparseable payload");
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const status = statusForProviderEvent(event.type);
  if (!status || !event.emailId) {
    // An event type we do not track (or one with no email id). Acknowledged so
    // Resend stops retrying something that is not an error.
    return NextResponse.json({ ok: true, applied: false });
  }

  const result = await applyProviderEvent({
    providerMessageId: event.emailId,
    status,
    occurredAt: event.createdAt,
  });

  // Replays and out-of-order events are no-ops, not errors: the status rank in
  // lib/message-delivery.ts refuses to regress a row, so a redelivered
  // `email.sent` after `email.delivered` changes nothing. Always acknowledge, or
  // Resend retries forever.
  console.info("[ResendWebhook] handled", {
    type: event.type,
    status,
    applied: result.applied,
    reason: result.reason ?? null,
  });

  return NextResponse.json({ ok: true, applied: result.applied });
}
