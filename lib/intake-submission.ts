/**
 * The server-side half of an intake submission, shared by every lead endpoint.
 *
 * Four routes accept patient intake — `/api/forms/consultation`, `/api/forms/doctor`,
 * `/api/forms/book-appointment` and `/api/forms/patient-advocate` — and eight form
 * components post to them. Qualification and ZIP handling live here so all four
 * behave identically: a change to the rule cannot land on three of them and be
 * forgotten on the fourth, which is precisely how one endpoint ends up firing
 * qualified conversions for plans the practice does not accept.
 *
 * Both decisions are made on the SERVER. The browser is told the outcome and obeys
 * it; it is never the source of it.
 */

import {
  resolveLeadRouting,
  type LeadRoutingDecision,
} from "@/lib/insurance-routing";
import { POSTAL_CODE_ERROR, validateSubmittedPostalCode } from "@/lib/postal-code";

export type IntakeResolution =
  | { ok: true; postalCode: string; routing: LeadRoutingDecision }
  | { ok: false; error: string; field: string };

/**
 * Validates the ZIP format and decides qualification for one submission.
 *
 * ZIP: a malformed value is rejected; an absent one is accepted. Requiredness is a
 * per-form rule enforced client-side, because it genuinely differs — the main
 * consultation form requires ZIP, the compact MiniContactForm has never collected
 * it — and hard-requiring it on a shared endpoint would destroy the leads of every
 * form that does not ask.
 *
 * Qualification: fails closed. Empty, unknown, stale and forged insurance values
 * are all `"unqualified"`, so a hand-crafted POST cannot mint a qualified Google
 * Ads conversion. The lead is still stored and still emailed either way — an
 * unqualified lead is a real patient enquiry, just not an advertising conversion.
 */
export function resolveIntake({
  insuranceType,
  postalCode,
}: {
  insuranceType?: string | null;
  postalCode?: string | null;
}): IntakeResolution {
  const zip = validateSubmittedPostalCode(postalCode);
  if (!zip.ok) {
    return { ok: false, error: POSTAL_CODE_ERROR, field: "postalCode" };
  }

  return {
    ok: true,
    postalCode: zip.stored,
    routing: resolveLeadRouting(insuranceType),
  };
}
