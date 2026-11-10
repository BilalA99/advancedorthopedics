/**
 * Advertising-pixel eligibility policy.
 *
 * The boundary is PATIENT-SPECIFIC INFORMATION, not subject matter. Mountain
 * Spine publishes a large public library about back pain, herniated discs,
 * injections and surgery, and buys paid media against it. Those pages are
 * marketing content and must stay measurable. Treating the topic of a public
 * webpage as though it were a visitor's diagnosis would destroy legitimate
 * campaign measurement while protecting nobody.
 *
 * So the rules are deliberately narrow, and split by SURFACE vs SUBMISSION:
 *
 *   ROUTE (PageView)  — almost everything is eligible, including
 *                       /conditions/*, /treatments/*, /lp/*, /locations/*,
 *                       /blogs/*, /about/meetourdoctors/*, and the public
 *                       assessment landing pages. Landing on a page that
 *                       offers a symptom checker reveals nothing about the
 *                       visitor; it is an ad destination like any other.
 *
 *   SUBMISSION (Lead) — three workflows collect patient-specific clinical
 *                       answers, so completing one must not become an ad
 *                       conversion. See META_INELIGIBLE_FORM_SOURCES.
 *
 * Evidence behind the split (read from the form schemas, 2026-09-21):
 *   condition-check  — pain_area, pain_symptoms, pain_desc, pain_worst,
 *                      pain_source, insurance_type
 *   candidacy-check  — condition, age, health, smoking, recent_diagnosis,
 *                      last_test_date, insurance_type
 *   free-mri-review  — recent_diagnosis, last_test_date, insurance_type
 *
 * /patient-forms was previously excluded and should NOT have been: it is a
 * public page offering blank new-patient packets for download. It collects
 * nothing, uploads nothing, and is a legitimate marketing destination.
 */

/**
 * Path prefixes where no advertising pixel may run.
 *
 * Kept to the genuinely non-public surfaces. Authenticated patient areas would
 * belong here too — none exist in this application today. Deliberately NOT
 * listed: /conditions, /treatments, /patient-forms, /condition-check,
 * /find-care/candidacy-check, /find-care/free-mri-review, and every other
 * public marketing page.
 */
export const SENSITIVE_PATH_PREFIXES = ["/internal"] as const;

/**
 * Query keys that would carry a visitor's OWN clinical answers in the URL.
 *
 * Intentionally empty. A repository-wide audit found no route that encodes
 * patient-submitted health information in a query string: the three assessment
 * forms keep their answers in React state and POST them, and none of them reads
 * searchParams.
 *
 * What the audit DID find is `?data=<url-encoded JSON>` on /conditions and
 * /treatments — for example {"tags":["Neck","Spine"]} — linked from
 * HomePageUI, NavBar, ServicesAndExpertiseSection and HomeInteractiveAnatomy.
 * That is a PUBLIC CONTENT FILTER chosen by browsing, exactly equivalent to the
 * path /conditions/sciatica, which is eligible. Blocking one while allowing the
 * other was incoherent and cost real paid-media measurement, so `data` is NOT
 * listed here.
 *
 * This hook stays in place so a genuinely patient-specific parameter can be
 * excluded immediately if one is ever introduced.
 */
export const SENSITIVE_QUERY_KEYS: readonly string[] = [];

function normalizePath(pathname: string): string {
  if (!pathname) return "/";
  const lower = pathname.toLowerCase();
  // Treat /foo and /foo/ identically, but never collapse "/" itself.
  return lower.length > 1 && lower.endsWith("/") ? lower.slice(0, -1) : lower;
}

export function isSensitivePath(pathname: string): boolean {
  const path = normalizePath(pathname);
  return SENSITIVE_PATH_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );
}

/**
 * Accepts a raw query string ("?a=1", "a=1", or ""), a URLSearchParams, or null.
 * Returns true when a sensitive key is present, regardless of its value.
 */
export function hasSensitiveQuery(search: string | URLSearchParams | null | undefined): boolean {
  if (!search) return false;
  if (SENSITIVE_QUERY_KEYS.length === 0) return false;

  let params: URLSearchParams;
  try {
    params = typeof search === "string" ? new URLSearchParams(search.replace(/^\?/, "")) : search;
  } catch {
    // An unparseable query string is treated as unsafe rather than ignored.
    return true;
  }

  for (const key of params.keys()) {
    if (SENSITIVE_QUERY_KEYS.includes(key.toLowerCase())) return true;
  }
  return false;
}

/**
 * The single question every advertising pixel asks before dispatching.
 */
export function isMetaEligibleRoute(
  pathname: string,
  search?: string | URLSearchParams | null,
): boolean {
  if (!pathname) return false;
  if (isSensitivePath(pathname)) return false;
  if (hasSensitiveQuery(search)) return false;
  return true;
}

/**
 * Lead sources whose SUBMISSION carries patient-specific clinical answers.
 *
 * Chosen by reading the form schemas, not by matching on names:
 *   condition-check  — pain_area, pain_symptoms, pain_desc, pain_worst,
 *                      pain_source, insurance_type
 *   candidacy-check  — condition, age, health, smoking, recent_diagnosis,
 *                      last_test_date, insurance_type
 *   free-mri-review  — recent_diagnosis, last_test_date, insurance_type
 *
 * These still produce the canonical `lead_form_submit_success` event, still
 * reach Google Ads and GA4, and are still persisted with full attribution in
 * Supabase. Only the third-party advertising conversion is withheld.
 */
export const META_INELIGIBLE_FORM_SOURCES = [
  "condition-check",
  "candidacy-check",
  "free-mri-review",
  // Not a clinical-data case. This lead was captured BY Meta inside an Instant
  // Form, so reporting it back to Meta as a website Lead would double-count the
  // same conversion against the same ad. Meta already attributes it natively.
  "meta-instant-form",
] as const;

/**
 * Lead sources that MAY produce a Meta `Lead`.
 *
 * A lead is never suppressed because of the page it came from — a consultation
 * request on a condition, treatment, doctor or paid-landing page is a
 * full-strength Meta Lead. Only the workflow matters.
 *
 * Resolution is FAIL CLOSED: a source must appear here explicitly. That cannot
 * silently cost signal, because `scripts/validate-measurement-contract.mjs`
 * fails the build unless this list and META_INELIGIBLE_FORM_SOURCES together
 * partition FORM_SOURCES exactly — no gaps, no overlap. Adding a form to
 * lib/lead-contract.ts therefore forces a deliberate decision about whether it
 * may become an advertising conversion, at build time rather than in production.
 */
export const META_ELIGIBLE_FORM_SOURCES = [
  "book-appointment",
  "doctor-contact",
  "location-contact",
  "general-contact",
  "homepage-consultation",
  "state-consultation",
  "location-consultation",
  "body-part-consultation",
  "modal-appointment",
  "patient-advocate",
  "attorney-coordination",
  "car-accident",
  "personal-injury",
  "slip-and-fall",
  "work-injury",
  "paid-landing",
] as const;

export function isMetaEligibleFormSource(formSource: string | undefined | null): boolean {
  if (!formSource) return false;
  const normalized = formSource.trim().toLowerCase();
  if ((META_INELIGIBLE_FORM_SOURCES as readonly string[]).includes(normalized)) return false;
  return (META_ELIGIBLE_FORM_SOURCES as readonly string[]).includes(normalized);
}
