import "server-only";
import { parseStrictBooleanFlag } from "./parseStrictBooleanFlag";

/**
 * Controls whether Dr. Scott Katzman appears in public website output.
 * Missing value defaults to true (visible) to preserve existing production behavior.
 */
export const showScottKatzman = parseStrictBooleanFlag("SHOW_SCOTT_KATZMAN", process.env.SHOW_SCOTT_KATZMAN, true);

/**
 * Controls the automatic patient confirmation email for Meta Instant Form leads.
 *
 * DEFAULTS TO FALSE AND MUST STAY FALSE until the blockers in
 * docs/meta-v3-confirmation-email.md are cleared. Resend's public security page
 * states it is not HIPAA compliant and cannot sign a BAA, and its 17 Aug 2026
 * Enterprise Terms permit "protected health information subject to HIPAA" only
 * where the Order Form expressly permits it under a signed BAA. The Supabase
 * organization behind this project is on the Pro plan with no HIPAA add-on and
 * the project is not marked High Compliance. An identifiable appointment request
 * is not made non-PHI by omitting clinical detail, so enabling this is a
 * contractual decision the practice has to make, not an engineering one.
 *
 * Staff notification and lead capture are deliberately NOT behind this flag:
 * they are the existing production workflow and turning them off would lose
 * leads. See section "Rollback" in the doc.
 */
export const enableMetaPatientConfirmationEmail = parseStrictBooleanFlag(
  "ENABLE_META_PATIENT_CONFIRMATION_EMAIL",
  process.env.ENABLE_META_PATIENT_CONFIRMATION_EMAIL,
  false,
);

/**
 * ISO-8601 instant before which no Meta lead may receive a confirmation email.
 *
 * Unset means "no lead qualifies", so the flag alone cannot mail the 12
 * historical leads. Set this to the moment of the authorized cutover.
 */
export const metaPatientConfirmationActivationAt =
  process.env.META_PATIENT_CONFIRMATION_ACTIVATION_AT;
