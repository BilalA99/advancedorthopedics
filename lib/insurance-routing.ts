/**
 * Intake-form insurance selection, qualification and post-submit routing.
 *
 * Implements meeting decisions D10 and D11 (2026-09-24):
 *
 *   D10 — accepted insurance or PPO routes to the qualified, tracked thank-you
 *         page and fires the qualified conversion exactly once. "Other" routes
 *         to a separate thank-you page and must NOT fire it.
 *   D11 — PPO appears explicitly, so a patient who knows they hold a PPO is not
 *         pushed into "Other".
 *
 * ## Why the option list is configuration, not a hard-coded constant
 *
 * The carriers named in the meeting — UnitedHealthcare, Cigna, Aetna, Blue Cross
 * Blue Shield — were discussion, not an approved list. AB owns the final list.
 * So the accepted set is declared once here and gated by
 * `INSURANCE_LIST_APPROVED`: until AB signs off, production keeps the
 * conservative fallback and the only thing waiting on approval is a data edit,
 * not code.
 *
 * ## Privacy: the insurance answer never reaches an advertising payload
 *
 * This module deliberately exposes qualification as a routing decision and
 * nothing else. The selected carrier is persisted to Supabase (`forms
 * .insurance_type`, first-party) and shown in the internal notification email.
 * It is never added to the canonical lead event, never placed in a URL, and
 * never sent to GA4, Google Ads or Meta.
 *
 * That follows the rule this codebase already applies to `landing_path` and to
 * the neutral `paid-landing` form source: first-party qualification stays
 * server-side. An unqualified lead therefore produces **no** dataLayer event at
 * all — see `docs/2026-09-26-intake/` for why a distinctly-named
 * `lead_form_submit_unqualified` event was considered and rejected (the event
 * name alone would carry the insurance answer into analytics).
 *
 * Total lead volume, including unqualified leads, stays measurable from
 * Supabase, which is what Appflow Analytics reads.
 */

/** Flip to `true` only when AB has approved the exact list in `APPROVED_PLANS`. */
export const INSURANCE_LIST_APPROVED = false;

export type InsuranceQualification = "qualified" | "unqualified";

export interface InsuranceOption {
  /** Stored verbatim in Supabase `forms.insurance_type`. */
  readonly value: string;
  /** Shown to the patient. */
  readonly label: string;
  readonly qualification: InsuranceQualification;
}

/**
 * The explicit PPO option required by D11.
 *
 * It leads the list because it answers the question for the largest group of
 * patients before the carrier name matters, matching the framing already used in
 * `components/data/insurancePlans.ts` ("An Aetna PPO is accepted; an Aetna HMO is
 * not").
 */
export const PPO_OPTION: InsuranceOption = {
  value: "PPO",
  label: "PPO (any carrier)",
  qualification: "qualified",
};

/**
 * Pending AB approval. Carrier names come from the 2026-09-24 discussion and
 * must be confirmed before `INSURANCE_LIST_APPROVED` is set to `true`.
 *
 * Each entry is PPO-scoped on purpose: the practice accepts PPO plans, so an
 * entry is a carrier whose *PPO* product is accepted, never a blanket statement
 * about that carrier's HMO products.
 */
export const APPROVED_PLANS: readonly InsuranceOption[] = [
  { value: "UnitedHealthcare PPO", label: "UnitedHealthcare PPO", qualification: "qualified" },
  { value: "Cigna PPO", label: "Cigna PPO", qualification: "qualified" },
  { value: "Aetna PPO", label: "Aetna PPO", qualification: "qualified" },
  { value: "Blue Cross Blue Shield PPO", label: "Blue Cross Blue Shield PPO", qualification: "qualified" },
];

/**
 * What production shows until AB approves the carrier list.
 *
 * PPO plus "Other" only. This is the conservative choice: naming a carrier the
 * practice does not in fact accept would route a patient to a qualified
 * thank-you page and fire a qualified conversion for a lead that is not
 * qualified — the exact failure D10 exists to prevent. Showing fewer options
 * under-reports; showing a wrong option corrupts the conversion signal.
 */
export const FALLBACK_PLANS: readonly InsuranceOption[] = [];

/** Always last, always unqualified. */
export const OTHER_OPTION: InsuranceOption = {
  value: "Other",
  label: "Other / not listed",
  qualification: "unqualified",
};

/** The options the intake form renders, in display order. */
export function getInsuranceOptions(): readonly InsuranceOption[] {
  const plans = INSURANCE_LIST_APPROVED ? APPROVED_PLANS : FALLBACK_PLANS;
  return [PPO_OPTION, ...plans, OTHER_OPTION];
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
