/**
 * Authorized Meta Instant Form registry.
 *
 * WHY THIS FILE EXISTS
 * The webhook had no form allowlist at all: `extractLeadgenChanges` accepted any
 * `leadgen` change on any page, and every accepted lead was stored and emailed.
 * That is why the V3 cutover needs no code change to keep working — but it also
 * means a leadgen subscription added to an unrelated page, or a form nobody on
 * this team configured, would have reached info@ as a patient lead.
 *
 * THE POLICY IS QUARANTINE, NOT REJECTION.
 * An unrecognised form is still stored and still produces a staff notification,
 * because the cost of being wrong in that direction is a confused scheduler,
 * while the cost of being wrong in the other direction is a lost patient. What
 * an unrecognised form never gets is the automatic PATIENT confirmation email:
 * an outbound message to an address we cannot attribute to an authorized form is
 * the one action that is not safely reversible.
 *
 * Both ids are defaulted from the Meta API environment's handoff and can be
 * overridden by environment variable, so a future V4 — or a correction — needs a
 * config change rather than a deploy.
 */

/** The live form behind the current Florida campaign. Still in production. */
export const META_FORM_ID_V2_DEFAULT = "3634773886703639" as const;

/**
 * MSO | FL | Orthopedic Appointment | Higher Intent | V3.
 *
 * Created and verified by the Meta API environment, NOT yet attached to ads at
 * the time this shipped. Accepting it before the cutover is deliberate: the
 * website must already be able to receive a V3 lead when the ads are switched,
 * or the first leads after the cutover land on an unprepared pipeline.
 */
export const META_FORM_ID_V3_DEFAULT = "3068973836772964" as const;

/**
 * The Facebook Page these forms live on.
 *
 * Page validation is what stops a leadgen subscription on an unrelated Page from
 * delivering strangers' contact details into this practice's lead sheet.
 */
export const META_PAGE_ID_DEFAULT = "995449336974458" as const;

/**
 * Just the shape these helpers read, rather than `NodeJS.ProcessEnv`.
 *
 * `process.env` satisfies it, and a test can pass a one-key literal without an
 * `as` cast — which matters because a cast is exactly how a test ends up
 * asserting against a shape production never sees.
 */
export type EnvSource = Record<string, string | undefined>;

export type MetaFormVersion = "v2" | "v3";

export type MetaFormStatus =
  /** Recognised, authorized, and safe for the full workflow. */
  | "authorized"
  /** A real form id arrived, but it matches no configured version. */
  | "quarantined"
  /** The webhook change carried no form id at all. */
  | "unidentified";

export type MetaFormClassification = {
  status: MetaFormStatus;
  version: MetaFormVersion | null;
  formId: string;
};

export function metaFormIdV2(env: EnvSource = process.env): string {
  return (env.META_LEAD_FORM_ID_V2 || META_FORM_ID_V2_DEFAULT).trim();
}

export function metaFormIdV3(env: EnvSource = process.env): string {
  return (env.META_LEAD_FORM_ID_V3 || META_FORM_ID_V3_DEFAULT).trim();
}

/**
 * Page ids permitted to deliver leads.
 *
 * `META_LEAD_PAGE_IDS` may ADD pages (comma-separated); it can never remove the
 * handoff Page, and it can never empty the list.
 *
 * THE ESCAPE HATCH WAS REMOVED (2026-11-17). The first version let an empty
 * `META_LEAD_PAGE_IDS=` disable the check entirely, reasoning that a typo'd page
 * id should not silently drop live leads. That trade was wrong in two ways:
 *
 *   1. It FAILS OPEN on missing configuration. An env var that is present but
 *      empty — trivially produced by a bad copy-paste or a templating tool that
 *      emits empty strings for unset values — turned a security control off
 *      without any signal. A control that can be disabled by accident is not a
 *      control.
 *
 *   2. The risk it protected against does not exist. The handoff Page is a
 *      compiled-in default, so the only way to reach an empty list was to
 *      deliberately set the variable to nothing. A new Page is additive: set
 *      `META_LEAD_PAGE_IDS=<new page id>` and both are authorized.
 *
 * So this always returns at least the handoff Page, and `isAuthorizedPage` has
 * no "no restriction configured" branch left to take.
 */
export function authorizedPageIds(env: EnvSource = process.env): string[] {
  const extra = (env.META_LEAD_PAGE_IDS || "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
  // Deduplicated, with the default first, so the list reads predictably in logs.
  return [...new Set([META_PAGE_ID_DEFAULT, ...extra])];
}

/**
 * True only when the page is explicitly authorized.
 *
 * Fails closed: a missing page id is rejected, and there is no configuration
 * that makes this return true for an arbitrary page.
 */
export function isAuthorizedPage(
  pageId: string | null | undefined,
  env: EnvSource = process.env,
): boolean {
  const id = pageId == null ? "" : String(pageId).trim();
  if (!id) return false;
  return authorizedPageIds(env).includes(id);
}

/**
 * Resolves a Meta form id to its authorization status and version label.
 *
 * `form_version` is DERIVED from the form id and never passed in from outside,
 * so a payload cannot claim to be V3. A form id we do not recognise gets
 * `version: null` rather than being optimistically filed as the newest version.
 */
export function classifyMetaForm(
  formId: string | null | undefined,
  env: EnvSource = process.env,
): MetaFormClassification {
  const id = (formId || "").trim();
  if (!id) return { status: "unidentified", version: null, formId: "" };
  if (id === metaFormIdV2(env)) return { status: "authorized", version: "v2", formId: id };
  if (id === metaFormIdV3(env)) return { status: "authorized", version: "v3", formId: id };
  return { status: "quarantined", version: null, formId: id };
}

/** Every form id currently accepted as authorized. For readiness reporting. */
export function authorizedFormIds(env: EnvSource = process.env): string[] {
  return [metaFormIdV2(env), metaFormIdV3(env)];
}

/**
 * The `preferred_location` option keys, exactly as both V2 and V3 return them.
 *
 * Recorded here as a CONTRACT, not as a lookup table. `formatMetaLocation` still
 * title-cases whatever arrives, so a clinic added to the Instant Form tomorrow
 * reads correctly without a deploy — this list exists so a test can prove every
 * known key renders sensibly, and so a renamed key is caught by that test rather
 * than by a scheduler seeing "Palm_beach_gardens" in an email.
 */
export const PREFERRED_LOCATION_KEYS = [
  "south_miami",
  "hollywood",
  "boca_raton",
  "palm_beach_gardens",
  "fort_pierce",
  "orlando",
  "altamonte_springs",
  "davenport",
  "jacksonville",
  "not_sure",
] as const;

/** The four question keys, identical across V2 and V3. */
export const META_FIELD_KEYS = ["full_name", "phone_number", "email", "preferred_location"] as const;
