/**
 * Intake-form insurance selection, qualification and post-submit routing.
 *
 * ## The option list (Abubeckr, Slack #mountain-spine-and-orthopedics, 2026-10-14)
 *
 * The intake dropdown offers exactly seven answers, in this order:
 *
 *   1. Florida Blue / Blue Cross Blue Shield   qualified
 *   2. UnitedHealthcare                       qualified
 *   3. Aetna                                  qualified
 *   4. Cigna                                  qualified
 *   5. Other job insurance                    qualified
 *   6. Medicare / Medicaid / TRICARE          unqualified
 *   7. Marketplace or self-pay                unqualified
 *
 * The first five route to the tracked /thank-you page and fire the qualified
 * conversion once. The last two route to the untracked /thank-you/other page and
 * fire nothing. Every submission is still stored and emailed either way.
 *
 * This list replaces the earlier one derived from components/data/insurancePlans.ts.
 * That file is the practice's PUBLIC statement on /insurance-policy and is left as
 * it is; the intake dropdown is a separate, shorter question with its own list,
 * written out here so the spec reads one to one against the code.
 *
 * ## Values equal labels
 *
 * `value` is what lands in Supabase `forms.insurance_type`, in the staff email
 * subject and in the lead sheet. It is the exact text the patient chose, so a row
 * reads the same everywhere it appears.
 *
 * ## Privacy: the insurance answer never reaches an advertising payload
 *
 * The selected plan is persisted to Supabase and shown in the internal staff
 * email. It is never added to the canonical lead event, never placed in a URL,
 * and never sent to GA4, Google Ads or Meta. An unqualified lead produces no
 * dataLayer event at all. See
 * docs/operations/mso-intake-form-insurance-routing/03-tracking-audit.md.
 */

import { isUnderMinimumAge } from "@/lib/date-of-birth";

export type InsuranceQualification = "qualified" | "unqualified";

export interface InsuranceOption {
  /** Stored verbatim in Supabase `forms.insurance_type`. */
  readonly value: string;
  /** Shown to the patient. */
  readonly label: string;
  readonly qualification: InsuranceQualification;
}

/** The placeholder shown before a patient picks an answer. */
export const INSURANCE_PLACEHOLDER = "Select your insurance" as const;

function option(text: string, qualification: InsuranceQualification): InsuranceOption {
  return { value: text, label: text, qualification };
}

/** The seven options, in the order the spec lists them. Do not re-sort. */
export const INSURANCE_OPTIONS: readonly InsuranceOption[] = Object.freeze([
  option("Florida Blue / Blue Cross Blue Shield", "qualified"),
  option("UnitedHealthcare", "qualified"),
  option("Aetna", "qualified"),
  option("Cigna", "qualified"),
  option("Other job insurance", "qualified"),
  option("Medicare / Medicaid / TRICARE", "unqualified"),
  option("Marketplace or self-pay", "unqualified"),
]);

/** The options every intake form renders, in display order. */
export function getInsuranceOptions(): readonly InsuranceOption[] {
  return INSURANCE_OPTIONS;
}

/**
 * Classifies a submitted insurance value.
 *
 * **Fails closed.** Anything not matching a currently-offered qualified option —
 * an empty string, an unknown carrier, a stale value from a cached page, a
 * hand-crafted POST — is `"unqualified"`. A false `"unqualified"` costs one
 * under-counted conversion; a false `"qualified"` corrupts Smart Bidding with a
 * lead the practice cannot serve.
 */
export function classifyInsurance(value: string | null | undefined): InsuranceQualification {
  const normalized = (value ?? "").trim().toLowerCase();
  if (!normalized) return "unqualified";

  const match = getInsuranceOptions().find(
    (option) => option.value.toLowerCase() === normalized,
  );
  return match?.qualification === "qualified" ? "qualified" : "unqualified";
}

export const QUALIFIED_THANK_YOU_PATH = "/thank-you" as const;
export const UNQUALIFIED_THANK_YOU_PATH = "/thank-you/other" as const;

/**
 * Where to send the patient after a successful submission.
 *
 * Both destinations are real confirmations — an unqualified lead is still a
 * patient who asked for help, and the practice still receives the lead. The two
 * pages differ in what they promise and in the fact that only the qualified page
 * sits behind the qualified conversion.
 *
 * Note: the *path* is not what fires the conversion. The conversion fires from
 * the canonical dataLayer event in `utils/enhancedConversions.ts`, which is
 * pushed before navigation. This function only decides the destination — the
 * measurement contract's `thank-you navigation is not the conversion source`
 * check depends on that separation.
 */
export function thankYouPathFor(qualification: InsuranceQualification): string {
  return qualification === "qualified"
    ? QUALIFIED_THANK_YOU_PATH
    : UNQUALIFIED_THANK_YOU_PATH;
}

/** Convenience: classify and route in one step. */
export function routeForInsurance(value: string | null | undefined): {
  qualification: InsuranceQualification;
  thankYouPath: string;
} {
  const qualification = classifyInsurance(value);
  return { qualification, thankYouPath: thankYouPathFor(qualification) };
}

// ─────────────────────────────────────────────────────────────────────────────
// Server-authoritative routing decision
//
// The qualification that gates the conversion is decided on the SERVER and sent
// back to the browser, rather than being derived in the browser and trusted.
// `classifyInsurance` is deterministic and both sides call it, so the two agree
// by construction — but "the client computed it" and "the server computed it and
// the client obeyed" are different guarantees, and only the second one holds when
// the request did not come from our form.
// ─────────────────────────────────────────────────────────────────────────────

/** Destination names, so the wire format never carries a raw URL to navigate to. */
export type LeadDestination = "qualified_thank_you" | "other_thank_you";

export interface LeadRoutingDecision {
  readonly qualification: InsuranceQualification;
  readonly destination: LeadDestination;
}

export function destinationFor(qualification: InsuranceQualification): LeadDestination {
  return qualification === "qualified" ? "qualified_thank_you" : "other_thank_you";
}

export function pathForDestination(destination: LeadDestination): string {
  return destination === "qualified_thank_you"
    ? QUALIFIED_THANK_YOU_PATH
    : UNQUALIFIED_THANK_YOU_PATH;
}

/**
 * The server's decision for a submitted insurance value.
 *
 * Inherits `classifyInsurance`'s fail-closed behaviour: an empty, unknown, stale
 * or forged value is `"unqualified"` and routes to the neutral confirmation, so a
 * hand-crafted POST cannot mint a qualified conversion.
 */
export function resolveLeadRouting(
  value: string | null | undefined,
  dateOfBirth?: string | null,
): LeadRoutingDecision {
  // Under 20 is never a qualified lead, whatever the plan (Abubeckr, 2026-10-25).
  // The forms already refuse an under-20 date; this covers a stale page or a
  // hand-made POST. A blank date of birth is not judged (the field is optional).
  const qualification = isUnderMinimumAge(dateOfBirth) ? "unqualified" : classifyInsurance(value);
  return { qualification, destination: destinationFor(qualification) };
}

/**
 * Reads the decision back off the response, for the browser.
 *
 * Returns `null` — rather than a fail-closed `"unqualified"` — when the fields are
 * absent or malformed. That distinction matters during a deploy: a browser
 * holding a page from the new build can post to a server still running the old
 * one, and a hard fail-closed default would silently mark every lead in that
 * window unqualified and lose real conversions. `null` means "the server did not
 * say", and the caller falls back to `classifyInsurance` on the same value —
 * the identical function, so the identical answer.
 *
 * A *present but unrecognised* qualification is different: that is corruption or
 * tampering, not absence, and it fails closed to `"unqualified"`.
 */
export function parseLeadRouting(value: unknown): LeadRoutingDecision | null {
  if (!value || typeof value !== "object") return null;
  const candidate = value as { qualification?: unknown; destination?: unknown };
  if (typeof candidate.qualification !== "string") return null;

  const qualification: InsuranceQualification =
    candidate.qualification === "qualified" ? "qualified" : "unqualified";

  // The destination is re-derived from the qualification rather than taken off
  // the wire, so a tampered `destination` can never send the patient somewhere
  // that disagrees with the conversion decision.
  return { qualification, destination: destinationFor(qualification) };
}

/**
 * The label over the optional insurance-card upload, word for word as the spec
 * gives it (Abubeckr, 2026-10-14, item 13). Every form with a card upload renders
 * this constant, so the wording cannot drift between them.
 */
export const INSURANCE_CARD_UPLOAD_LABEL =
  "Upload your insurance card to get verified faster (optional)." as const;
