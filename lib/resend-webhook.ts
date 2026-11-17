import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Verification for Resend's delivery-event webhooks.
 *
 * Resend signs with Svix. The scheme is documented and small, so it is
 * implemented here rather than by adding the `svix` package: one more dependency
 * in the request path of a public endpoint is a worse trade than forty lines of
 * HMAC, and this way the verification is directly unit-testable.
 *
 * THE SCHEME
 *   signed payload  = `${svix-id}.${svix-timestamp}.${rawBody}`
 *   secret          = base64 decode of the part after `whsec_`
 *   signature       = base64( HMAC-SHA256(secret, signedPayload) )
 *   svix-signature  = space-separated list of `v1,<signature>` entries
 *
 * The header carries a LIST because Svix supports key rotation: during a
 * rotation two signatures are sent and either may be the valid one, so every v1
 * entry is checked.
 */

/** Rejects events older than this, so a captured POST cannot be replayed later. */
export const WEBHOOK_TOLERANCE_SECONDS = 5 * 60;

export type WebhookVerification =
  | { ok: true }
  | {
      ok: false;
      reason:
        | "missing-secret"
        | "missing-headers"
        | "malformed-secret"
        | "timestamp-out-of-tolerance"
        | "no-signature-match";
    };

export function verifyResendSignature({
  secret,
  svixId,
  svixTimestamp,
  svixSignature,
  rawBody,
  now = new Date(),
}: {
  secret: string | undefined;
  svixId: string | null;
  svixTimestamp: string | null;
  svixSignature: string | null;
  rawBody: string;
  now?: Date;
}): WebhookVerification {
  if (!secret) return { ok: false, reason: "missing-secret" };
  if (!svixId || !svixTimestamp || !svixSignature) {
    return { ok: false, reason: "missing-headers" };
  }

  const seconds = Number(svixTimestamp);
  if (!Number.isFinite(seconds)) return { ok: false, reason: "timestamp-out-of-tolerance" };
  const skew = Math.abs(Math.floor(now.getTime() / 1000) - seconds);
  if (skew > WEBHOOK_TOLERANCE_SECONDS) {
    return { ok: false, reason: "timestamp-out-of-tolerance" };
  }

  const rawSecret = secret.startsWith("whsec_") ? secret.slice("whsec_".length) : secret;
  let key: Buffer;
  try {
    key = Buffer.from(rawSecret, "base64");
    if (key.length === 0) return { ok: false, reason: "malformed-secret" };
  } catch {
    return { ok: false, reason: "malformed-secret" };
  }

  const expected = createHmac("sha256", key)
    .update(`${svixId}.${svixTimestamp}.${rawBody}`, "utf8")
    .digest();

  const candidates = svixSignature
    .split(" ")
    .filter((part) => part.startsWith("v1,"))
    .map((part) => part.slice(3));

  for (const candidate of candidates) {
    let received: Buffer;
    try {
      received = Buffer.from(candidate, "base64");
    } catch {
      continue;
    }
    if (received.length !== expected.length) continue;
    // Constant-time: a length-safe compare is the whole point of the header.
    if (timingSafeEqual(received, expected)) return { ok: true };
  }

  return { ok: false, reason: "no-signature-match" };
}

export type ResendEvent = {
  type: string;
  createdAt: string;
  emailId: string | null;
};

/**
 * Extracts only the three fields we act on.
 *
 * Resend's payload also carries `data.to`, `data.subject` and `data.from` — the
 * recipient address and the subject line. Those are read past deliberately and
 * never persisted or logged: the delivery table exists to record STATE, and
 * copying a patient's address into a second table (and into whatever reads its
 * logs) would widen the exposure this work is meant to narrow.
 */
export function parseResendEvent(payload: unknown): ResendEvent | null {
  if (!payload || typeof payload !== "object") return null;
  const body = payload as {
    type?: unknown;
    created_at?: unknown;
    data?: { email_id?: unknown; created_at?: unknown };
  };
  if (typeof body.type !== "string" || !body.type) return null;

  const emailId =
    typeof body.data?.email_id === "string" && body.data.email_id ? body.data.email_id : null;

  const createdAt =
    typeof body.created_at === "string"
      ? body.created_at
      : typeof body.data?.created_at === "string"
        ? body.data.created_at
        : new Date().toISOString();

  return { type: body.type, createdAt, emailId };
}
