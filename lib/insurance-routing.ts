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
 * ## The option list is DERIVED, never hand-maintained here
 *
 * `components/data/insurancePlans.ts` is the practice's authoritative statement of
 * what it participates in. It is published to patients on /insurance-policy, it
 * carries a per-plan `status` and the reasoning behind it, and it is what the
 * clinic actually maintains. So the dropdown is generated from it.
 *
 * An earlier version of this module kept its own `APPROVED_PLANS` array behind an
 * `INSURANCE_LIST_APPROVED` flag. That was a second copy of a list that already
 * existed, and a second copy is how the form comes to offer a plan the website
 * says is not accepted — the exact contradiction D10 exists to prevent. There is
 * now one list. Adding or removing a carrier is an edit to insurancePlans.ts and
 * the dropdown, the qualification rule and the public page all move together.
 *
 * ## How `status` maps to qualification
 *
 *   accepted      -> qualified    the practice participates and can bill the plan
 *   partial       -> unqualified  Medicare/Medicaid: not for spine surgery, "call us"
 *   not-accepted  -> unqualified  HMO products, Medicare/Medicaid HMO
 *
 * `partial` deliberately lands on the unqualified side. A partial plan is a real
 * lead the clinic still wants and still receives — it just is not an accepted-
 * insurance conversion, and reporting it as one would put leads the practice
 * cannot serve for the advertised procedure into Smart Bidding.
 *
 * Workers' Compensation and Auto/PIP are `accepted` without being PPO carriers,
 * and they qualify: the practice treats those patients and bills those payers.
 * The conversion signal tracks "can we serve this patient", not "is it a PPO".
 *
 * ## Privacy: the insurance answer never reaches an advertising payload
 *
 * This module deliberately exposes qualification as a routing decision and
 * nothing else. The selected plan is persisted to Supabase (`forms
 * .insurance_type`, first-party) and shown in the internal notification email.
 * It is never added to the canonical lead event, never placed in a URL, and
 * never sent to GA4, Google Ads or Meta.
 *
 * That follows the rule this codebase already applies to `landing_path` and to
 * the neutral `paid-landing` form source: first-party qualification stays
 * server-side. An unqualified lead therefore produces **no** dataLayer event at
 * all — see `docs/operations/mso-intake-form-insurance-routing/03-tracking-audit.md`
 * for why a distinctly-named `lead_form_submit_unqualified` event was considered
 * and rejected (the event name alone would carry the insurance answer into
 * analytics).
 *
 * Total lead volume, including unqualified leads, stays measurable from
 * Supabase, which is what Appflow Analytics reads.
 */

import { INSURANCE_PLANS, type InsurancePlan } from "@/components/data/insurancePlans";

export type InsuranceQualification = "qualified" | "unqualified";

export interface InsuranceOption {
  /** Stored verbatim in Supabase `forms.insurance_type`. */
  readonly value: string;
  /** Shown to the patient. */
  readonly label: string;
  readonly qualification: InsuranceQualification;
}

/** Only a plan the practice actually participates in is a qualified conversion. */
function qualificationForPlan(plan: InsurancePlan): InsuranceQualification {
  return plan.status === "accepted" ? "qualified" : "unqualified";
}

/**
 * The explicit PPO option required by D11.
 *
 * It leads the list because it answers the question for the largest group of
 * patients before the carrier name matters, matching the framing the practice
 * already uses publicly ("An Aetna PPO is accepted; an Aetna HMO is not").
 *
 * Its value stays the bare string "PPO" rather than its label, so the value is
 * stable if the wording of the label is ever tuned.
 */
export const PPO_OPTION: InsuranceOption = {
  value: "PPO",
  label: "PPO (any carrier)",
  qualification: "qualified",
};

/** Always last, always unqualified. */
export const OTHER_OPTION: InsuranceOption = {
  value: "Other",
  label: "Other / not listed",
  qualification: "unqualified",
};

/**
 * Plans from the authoritative list, in the order a patient should scan them:
 * PPO carriers first (the common case), then the other payers the practice
 * accepts, then the plans it does not.
 *
 * Within each group the source order is preserved, so the clinic controls
 * ordering by editing insurancePlans.ts.
 */
function planRank(plan: InsurancePlan): number {
  if (plan.status === "accepted") return plan.isPpoCarrier ? 0 : 1;
  return 2;
}

export const PLAN_OPTIONS: readonly InsuranceOption[] = INSURANCE_PLANS
  .map((plan, index) => ({ plan, index }))
  .sort((a, b) => planRank(a.plan) - planRank(b.plan) || a.index - b.index)
  .map(({ plan }) => ({
    value: plan.name,
    label: plan.name,
    qualification: qualificationForPlan(plan),
  }));

/** The options every intake form renders, in display order. */
export function getInsuranceOptions(): readonly InsuranceOption[] {
  return [PPO_OPTION, ...PLAN_OPTIONS, OTHER_OPTION];
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
export function resolveLeadRouting(value: string | null | undefined): LeadRoutingDecision {
  const qualification = classifyInsurance(value);
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
