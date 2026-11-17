/**
 * Activation boundary for the Meta patient confirmation email.
 *
 * WHY A TIMESTAMP AND NOT JUST A BOOLEAN
 * The 12 Meta leads already in `public.forms` were submitted between
 * 2026-11-11 and 2026-11-16 and were never told to expect a confirmation email.
 * Sending one now would be an unsolicited message about a request they made days
 * ago, and `/code` has no way to know whether the practice already called them.
 * So the flag alone is not sufficient: a lead only qualifies if its SUBMISSION
 * time is at or after an explicitly configured boundary.
 *
 * Fail closed in both directions:
 *   - flag off                -> no confirmation
 *   - flag on, no boundary set -> no confirmation (misconfiguration is not consent)
 *   - lead older than boundary -> no confirmation, recorded as `suppressed`
 *
 * No `server-only` guard, so this stays unit-testable under plain Node — the
 * same reason `parseStrictBooleanFlag` has none. Application code must read it
 * through `lib/config/featureFlags.ts`.
 */

export type ActivationDecision = {
  eligible: boolean;
  /** Stable, loggable reason. Never contains lead data. */
  reason:
    | "eligible"
    | "flag-disabled"
    | "activation-boundary-unset"
    | "activation-boundary-invalid"
    | "before-activation-boundary"
    | "submission-time-unknown"
    | "form-version-not-eligible";
};

/**
 * Only V3 leads receive a confirmation.
 *
 * V2's completion screen never told anyone to expect an email, and V2 stays
 * supported purely so delayed webhooks, retries and reconciliation of leads
 * already captured keep working. A V2 lead arriving after activation is a
 * straggler from the old form, not a new patient who was promised anything, so
 * it gets storage and a staff alert and nothing else.
 *
 * Belt and braces with the activation timestamp: either gate alone would be
 * sufficient to protect the 12 historical leads, and both are cheap.
 */
export const CONFIRMATION_ELIGIBLE_FORM_VERSIONS = ["v3"] as const;

/** Parses the boundary. Returns null when unset, NaN-date when malformed. */
export function parseActivationBoundary(raw: string | undefined): Date | null | "invalid" {
  const value = (raw || "").trim();
  if (!value) return null;
  const parsed = new Date(value);
  if (!Number.isFinite(parsed.getTime())) return "invalid";
  return parsed;
}

/**
 * Decides whether one lead may receive a patient confirmation.
 *
 * `submittedAt` is Meta's `created_time` for the lead, not our receipt time: a
 * webhook replayed or reconciled days later must still be judged by when the
 * patient actually pressed submit.
 */
export function decideActivation({
  enabled,
  activationBoundary,
  submittedAt,
  formVersion,
}: {
  enabled: boolean;
  activationBoundary: string | undefined;
  submittedAt: string | Date | null | undefined;
  /** Derived from the form id by `classifyMetaForm`. Never supplied by a payload. */
  formVersion: string | null | undefined;
}): ActivationDecision {
  if (!enabled) return { eligible: false, reason: "flag-disabled" };

  if (
    !formVersion ||
    !(CONFIRMATION_ELIGIBLE_FORM_VERSIONS as readonly string[]).includes(formVersion)
  ) {
    return { eligible: false, reason: "form-version-not-eligible" };
  }

  const boundary = parseActivationBoundary(activationBoundary);
  if (boundary === null) return { eligible: false, reason: "activation-boundary-unset" };
  if (boundary === "invalid") return { eligible: false, reason: "activation-boundary-invalid" };

  if (!submittedAt) return { eligible: false, reason: "submission-time-unknown" };
  const submitted = submittedAt instanceof Date ? submittedAt : new Date(submittedAt);
  if (!Number.isFinite(submitted.getTime())) {
    return { eligible: false, reason: "submission-time-unknown" };
  }

  if (submitted.getTime() < boundary.getTime()) {
    return { eligible: false, reason: "before-activation-boundary" };
  }
  return { eligible: true, reason: "eligible" };
}
