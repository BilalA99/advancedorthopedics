/**
 * The server-side half of an intake submission, shared by every lead endpoint.
 *
 * Four routes accept patient intake — `/api/forms/consultation`, `/api/forms/doctor`,
 * `/api/forms/book-appointment` and `/api/forms/patient-advocate` — and the intake
 * form components post to them. Qualification lives here so all four behave
 * identically: a change to the rule cannot land on three of them and be forgotten
 * on the fourth, which is precisely how one endpoint ends up firing qualified
 * conversions for plans the practice does not accept.
 *
 * The decision is made on the SERVER. The browser is told the outcome and obeys
 * it; it is never the source of it.
 *
 * ZIP / postal code is no longer collected (Abubeckr, 2026-10-14, item 7). Any
 * `postalCode` a stale page still posts is ignored: it is not validated, stored or
 * emailed. The `forms.postal_code` column stays in the database and is left empty.
 */

import {
  resolveLeadRouting,
  type LeadRoutingDecision,
} from "@/lib/insurance-routing";

export type IntakeResolution = { ok: true; routing: LeadRoutingDecision };

/**
 * Decides qualification for one submission.
 *
 * Fails closed. Empty, unknown, stale and forged insurance values are all
 * `"unqualified"`, so a hand-crafted POST cannot mint a qualified Google Ads
 * conversion. The lead is still stored and still emailed either way — an
 * unqualified lead is a real patient enquiry, just not an advertising conversion.
 */
export function resolveIntake({
  insuranceType,
}: {
  insuranceType?: string | null;
}): IntakeResolution {
  return {
    ok: true,
    routing: resolveLeadRouting(insuranceType),
  };
}

/**
 * The staff notification subject, with the insurance answer in it (item 11).
 *
 * Every intake submission emails the clinic, qualified or not, and the subject
 * carries the plan so the front desk can sort the inbox without opening each
 * message. Line breaks are flattened so a submitted value can never add an email
 * header. A form that asks no insurance question keeps the plain subject.
 */
export function subjectWithInsurance(base: string, insuranceType?: string | null): string {
  const insurance = String(insuranceType ?? "").replace(/[\r\n]+/g, " ").trim();
  return insurance ? `${base} - Insurance: ${insurance}` : base;
}
