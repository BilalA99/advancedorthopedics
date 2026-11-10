import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Pure helpers for the Meta Instant Form webhook.
 *
 * These live in lib/ rather than in the route because Next.js App Router only
 * permits route handlers and a fixed set of config exports from a route file,
 * and because signature verification and field mapping are the two parts worth
 * testing directly.
 */

export type LeadgenValue = {
  leadgen_id?: string;
  form_id?: string;
  page_id?: string;
  ad_id?: string;
  adgroup_id?: string;
  campaign_id?: string;
  created_time?: number;
};

export type GraphLead = {
  id?: string;
  created_time?: string;
  field_data?: Array<{ name?: string; values?: string[] }>;
  campaign_id?: string;
  adset_id?: string;
  ad_id?: string;
  form_id?: string;
  platform?: string;
  error?: { message?: string };
};

export type MetaLeadContact = {
  name: string;
  email: string;
  phone: string;
  location: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
};

/**
 * Constant-time check of Meta's `X-Hub-Signature-256`.
 *
 * The webhook URL is public, so an unverified body is indistinguishable from a
 * forged one and must never reach the mailer.
 */
export function verifyMetaSignature(
  appSecret: string,
  header: string | null | undefined,
  raw: string,
): boolean {
  if (!appSecret) return false;
  if (!header?.startsWith("sha256=")) return false;
  const expected = createHmac("sha256", appSecret).update(raw, "utf8").digest();
  let received: Buffer;
  try {
    received = Buffer.from(header.slice(7), "hex");
  } catch {
    return false;
  }
  if (received.length !== expected.length) return false;
  return timingSafeEqual(expected, received);
}

/** Pulls `leadgen` changes out of a Meta page webhook envelope. */
export function extractLeadgenChanges(payload: unknown): LeadgenValue[] {
  const body = payload as {
    object?: string;
    entry?: Array<{ changes?: Array<{ field?: string; value?: LeadgenValue }> }>;
  };
  if (body?.object !== "page" || !Array.isArray(body.entry)) return [];
  return body.entry
    .flatMap((e) => e.changes ?? [])
    .filter((c) => c.field === "leadgen" && c.value?.leadgen_id)
    .map((c) => c.value as LeadgenValue);
}

/** Meta returns answers as a name/values list; collapse to a lookup. */
export function fieldsOf(lead: GraphLead): Record<string, string> {
  const out: Record<string, string> = {};
  for (const f of lead.field_data ?? []) {
    if (f.name && Array.isArray(f.values) && f.values[0]) out[f.name] = f.values[0];
  }
  return out;
}

/**
 * Maps a Graph lead onto the shape `sendContactEmail` already expects, so a
 * Meta lead renders in the staff email exactly like a website lead.
 *
 * Attribution travels as UTMs because that is how every other lead on this site
 * carries it through to the staff email and Supabase.
 */
export function mapLeadToContact(lead: GraphLead, change: LeadgenValue = {}): MetaLeadContact {
  const f = fieldsOf(lead);
  const name =
    f.full_name || [f.first_name, f.last_name].filter(Boolean).join(" ").trim();
  return {
    name,
    email: f.email || "",
    phone: f.phone_number || "",
    location: f.preferred_location || "",
    utm_source: lead.platform === "ig" ? "instagram" : "facebook",
    utm_medium: "paid_social",
    utm_campaign: lead.campaign_id || change.campaign_id || "",
    utm_term: lead.adset_id || change.adgroup_id || "",
    utm_content: lead.ad_id || change.ad_id || "",
  };
}
