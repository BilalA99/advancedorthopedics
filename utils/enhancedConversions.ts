// utils/enhancedConversions.ts
import { isAdvertisingAllowed } from "@/lib/consent";
import { createOpaqueEventId, trackMetaContact, trackMetaLead } from "@/lib/meta-pixel";
import { isMetaEligibleFormSource } from "@/lib/route-privacy";
import {
  buildCanonicalLeadEvent,
  parseLeadAcceptance,
  readLeadAcceptance,
  type FormSource,
} from "@/lib/lead-contract";

/**
 * Enhanced Conversions for Google Ads
 * 
 * This utility helps implement enhanced conversions by pushing user-provided data
 * to the dataLayer in a format that Google Tag Manager can use for enhanced conversions.
 * 
 * According to Google's documentation:
 * - Data should be pushed to dataLayer before conversion tags fire
 * - Data should be available on the thank-you page when conversion tags load
 * - Data structure must match Google's expected format
 */

type ECIn = {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  postalCode?: string;
  country?: string;
  address?: {
    street?: string;
    city?: string;
    region?: string;
    postalCode?: string;
    country?: string;
  };
};

type ECOut = {
  email: string;
  phone_number: string;
  address: {
    first_name: string;
    last_name: string;
    country: string;
    postal_code: string;
  };
};

/**
 * Formats a phone number to E.164 international format required by Google Ads.
 * Google Enhanced Conversions require phone numbers in E.164 format (e.g., +15551234567 for US).
 * 
 * @param phone - Raw phone number string
 * @param country - Country code (default: US)
 * @returns Phone number in E.164 format or empty string if invalid
 */
export function formatPhoneToE164(phone: string, country: string = 'US'): string {
  const rawPhone = phone.replace(/\D/g, '');
  
  if (!rawPhone || rawPhone.length === 0) {
    return '';
  }

  // Handle US/Canada numbers (country code +1)
  if (country === 'US' || country === 'CA' || !country) {
    if (rawPhone.length === 10) {
      // Standard 10-digit US number → add +1 prefix
      return `+1${rawPhone}`;
    } else if (rawPhone.length === 11 && rawPhone.startsWith('1')) {
      // 11-digit with leading 1 → add + prefix
      return `+${rawPhone}`;
    }
  }

  // For other countries or formats, return with + if not already present
  // This handles cases where the number might already include country code
  if (rawPhone.length >= 10) {
    return `+${rawPhone}`;
  }

  // Return empty for invalid/too-short numbers
  return '';
}

/**
 * Normalizes user input data to match Google's enhanced conversions format
 */
export function normalizeEC(v: ECIn): ECOut {
  const email = (v.email ?? '').trim().toLowerCase();
  const normalizedCountry = (v.country || "US").trim().toUpperCase();
  const phone_number = formatPhoneToE164(v.phone ?? '', normalizedCountry);
  const normalizedFirstName = (v.firstName ?? '').trim();
  const normalizedLastName = (v.lastName ?? '').trim();
  const normalizedPostal = (v.postalCode || '').replace(/\D/g, '').slice(0, 10);

  const result: ECOut = {
    email,
    phone_number,
    address: {
      first_name: normalizedFirstName,
      last_name: normalizedLastName,
      country: normalizedCountry || "US",
      postal_code: normalizedPostal,
    },
  };

  return result;
}

/**
 * Persists enhanced conversion data to sessionStorage for use on thank-you page
 */
export function persistEC(v: ECIn) {
  if (typeof window === 'undefined') return;
  if (!isAdvertisingAllowed()) return;
  const n = normalizeEC(v);
  try {
    sessionStorage.setItem('ec_email', n.email || '');
    sessionStorage.setItem('ec_phone', n.phone_number || '');
    sessionStorage.setItem('ec_first', n.address.first_name || '');
    sessionStorage.setItem('ec_last', n.address.last_name || '');
    sessionStorage.setItem('ec_postal', n.address.postal_code || '');
    sessionStorage.setItem('ec_country', n.address.country || 'US');
  } catch {}
}

/**
 * SHA-256, hex-encoded lowercase — the format Google's Enhanced Conversions spec
 * requires for pre-hashed user data.
 *
 * Uses Web Crypto, which is available in any secure context (https, and localhost
 * for development). Returns undefined for empty input so an absent field stays
 * absent rather than becoming the hash of an empty string, which would be a real
 * value that matches nothing and would pollute match rates.
 */
async function sha256Hex(value: string | undefined): Promise<string | undefined> {
  if (!value) return undefined;
  if (typeof crypto === 'undefined' || !crypto?.subtle) return undefined;
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Builds the enhanced_conversion_data payload with PII hashed.
 *
 * normalizeEC has already lowercased, trimmed and E.164-formatted the inputs, which
 * is the normalisation Google requires BEFORE hashing — hashing an unnormalised
 * value produces a digest that will never match.
 *
 * postal_code and country are deliberately NOT hashed: Google's spec treats them as
 * unhashed fields, and hashing them breaks matching.
 */
async function buildHashedEC(n: ECOut) {
  const [email, phone, first, last] = await Promise.all([
    sha256Hex(n.email),
    sha256Hex(n.phone_number),
    sha256Hex(n.address.first_name),
    sha256Hex(n.address.last_name),
  ]);
  return {
    sha256_email_address: email,
    sha256_phone_number: phone,
    address: {
      sha256_first_name: first,
      sha256_last_name: last,
      country: n.address.country || 'US',
      postal_code: n.address.postal_code || undefined,
    },
  };
}

/**
 * Hard ceiling on hashing before the lead event gives up waiting for it.
 *
 * Unreachable in practice — four SHA-256 digests of short strings are sub-
 * millisecond, and they run concurrently with the server response read, so the
 * observed cost is zero. It exists so that a browser with a broken or hostile
 * Web Crypto cannot hold up the one event that must fire for every lead.
 */
const HASH_BUDGET_MS = 500;

/**
 * Hashes the identity WITHOUT pushing it, so the caller can start the work early.
 *
 * ## Why this exists (incident 2026-09-30)
 *
 * Google Ads attaches user-provided data to a conversion only if that data is on
 * the dataLayer at the moment the conversion tag reads it. For over a week it was
 * not: `pushFormSubmit` pushed the canonical lead event first and the identity
 * afterwards, so the conversion tag always read an empty variable.
 *
 * That ordering was not an oversight — the lead event runs first precisely so no
 * enrichment can delay or suppress it. The fix therefore cannot be "push identity
 * first and await it", which would put a hash and a consent check in front of the
 * one event that must never be blocked.
 *
 * Instead the hash is started EARLY, during a wait the caller is already doing —
 * reading the server's response body — and both are awaited together. The lead
 * event waits for max(response, hash) rather than their sum, and the hash is
 * bounded by HASH_BUDGET_MS, so the added cost is unmeasurable in practice and
 * bounded in theory. See `pushAcceptedLead`.
 *
 * Never throws and never rejects: returns null when there is no consent, no
 * identity, or the hash fails. A null simply means the conversion goes out without
 * enhanced data, which is exactly the behaviour before this existed.
 */
export type PreparedIdentity = {
  /** Settles when hashing finishes. Never rejects; resolves null on failure. */
  readonly promise: Promise<Record<string, unknown> | null>;
  /**
   * The hash if it has ALREADY finished, otherwise undefined. Synchronous.
   *
   * The caller uses this instead of awaiting, so "is the identity ready?" costs
   * nothing and cannot delay the lead event even by a microtask. An earlier draft
   * used Promise.race against an already-resolved sentinel and was wrong: the
   * .catch() wrapper on the real promise adds a tick, so the sentinel always won
   * and the identity was never pushed in time.
   */
  peek(): Record<string, unknown> | null | undefined;
};

export function prepareHashedEC(v: ECIn): PreparedIdentity {
  const settledNull: PreparedIdentity = {
    promise: Promise.resolve(null),
    peek: () => null,
  };
  if (typeof window === 'undefined') return settledNull;
  // Consent is checked here, at preparation time, and again at push time. Identity
  // is advertising data under ad_user_data; it must not even be hashed into a
  // pushable shape for a visitor who declined.
  if (!isAdvertisingAllowed()) return settledNull;
  if (!v.email && !v.phone) return settledNull;

  let result: Record<string, unknown> | null | undefined;
  let promise: Promise<Record<string, unknown> | null>;
  try {
    // Watchdog. The caller awaits this promise alongside the server response, so
    // it must be guaranteed to settle even if Web Crypto never resolves — a
    // conversion that reports without identity is worth incomparably more than a
    // lead event that never fires. Four SHA-256 digests of short strings take
    // well under a millisecond, so this ceiling is unreachable in practice and
    // exists only so the lead event has a hard bound rather than a hope.
    promise = Promise.race([
      buildHashedEC(normalizeEC(v)),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), HASH_BUDGET_MS)),
    ]).then(
      (hashed) => (result = hashed ?? null),
      () => (result = null),
    );
  } catch {
    return settledNull;
  }
  return { promise, peek: () => result };
}

/**
 * Pushes enhanced conversion data to dataLayer for Google Tag Manager
 *
 * This should be called BEFORE navigation to the thank-you page to ensure
 * the data is available when conversion tags fire.
 *
 * @param v - User input data (email, phone, name, etc.)
 * @param eventName - Optional event name (default: 'ec_capture')
 */
export async function pushEC(v: ECIn, eventName: string = 'ec_capture') {
  if (typeof window === 'undefined') return;
  if (!isAdvertisingAllowed()) return;
  const n = normalizeEC(v);
  
  // Initialize dataLayer if it doesn't exist
  (window as any).dataLayer = (window as any).dataLayer || [];
  
  // Values are SHA-256 hashed here, before they touch dataLayer, so no plaintext PII
  // is ever readable by other scripts on the page. The sha256_ field names tell GTM the
  // data is already hashed — pushing hashed values under the raw field names would
  // cause a second hash and silently break Enhanced Conversions matching.
  (window as any).dataLayer.push({
    event: eventName,
    enhanced_conversion_data: await buildHashedEC(n),
  });
}

/**
 * Pushes enhanced conversion data to dataLayer without an event
 * This is useful when you want the data available for the next conversion tag
 * without triggering any additional events
 */
export async function pushECSilent(v: ECIn) {
  if (typeof window === 'undefined') return;
  if (!isAdvertisingAllowed()) return;
  const n = normalizeEC(v);
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({
    enhanced_conversion_data: await buildHashedEC(n),
  });
}

/**
 * Re-push EC data from sessionStorage on the thank-you page.
 * 
 * This ensures enhanced conversion data is available when conversion tags load.
 * Call this in a useEffect on the thank-you page so the Ads conversion tag sees the data.
 * 
 * @param eventName - Optional event name (default: 'ec_restore')
 */
export function restoreECFromSession(eventName: string = 'ec_restore') {
  if (typeof window === 'undefined') return;
  if (!isAdvertisingAllowed()) return;
  try {
    const country = (sessionStorage.getItem('ec_country') || 'US').trim().toUpperCase();
    const rawPhone = sessionStorage.getItem('ec_phone') || '';
    
    const ec: ECOut = {
      email: (sessionStorage.getItem('ec_email') || '').trim().toLowerCase(),
      phone_number: formatPhoneToE164(rawPhone, country),
      address: {
        first_name: (sessionStorage.getItem('ec_first') || '').trim(),
        last_name: (sessionStorage.getItem('ec_last') || '').trim(),
        country: country,
        postal_code: (sessionStorage.getItem('ec_postal') || '').trim(),
      },
    };

    (window as any).dataLayer = (window as any).dataLayer || [];
    
    // Hashed before it reaches dataLayer, exactly as in pushEC. sessionStorage still
    // holds the plaintext, which is same-origin and not readable by third-party
    // scripts — dataLayer is the surface that needed closing.
    void buildHashedEC(ec).then((hashed) => {
      (window as any).dataLayer.push({
        event: eventName,
        enhanced_conversion_data: hashed,
      });
    });
  } catch {}
}

/**
 * Pushes enhanced conversion data and persists it in one call
 * This is a convenience function that combines persistEC and pushEC
 */
export function captureAndPersistEC(v: ECIn, eventName: string = 'ec_capture') {
  persistEC(v);
  pushEC(v, eventName);
}

/** Generic custom event push helper (keeps analytics code tidy) */
export function pushEvent(name: string, params: Record<string, any> = {}) {
  if (typeof window === 'undefined') return;
  if (!isAdvertisingAllowed()) return;
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({ event: name, ...params });
}

export function pushMarketingEvent(name: string, params: Record<string, any> = {}) {
  if (typeof window === 'undefined') return;
  if (!isAdvertisingAllowed()) return;
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({ event: name, ...params });
}

/**
 * Phone click tracking — single entry point for every "tel:" CTA sitewide.
 *
 * Pushes the current event name (default `phone_click`, or a page-type-specific
 * variant like `location_phone_click`) AND the legacy `call_click` event so any
 * GTM trigger/Google Ads conversion still bound to the old event name keeps firing.
 * Call this instead of pushEvent('phone_click', ...) / pushEvent('call_click', ...)
 * directly — do not push 'call_click' anywhere else, to avoid double-firing.
 */
export function pushPhoneClickEvent(params: Record<string, any> = {}, eventName: string = 'phone_click') {
  pushEvent(eventName, params);
  if (eventName !== 'call_click') {
    pushEvent('call_click', params);
  }

  // Secondary Meta micro-conversion. A tel: click is NOT a completed call and
  // must never be reported as one. The dialled business number and every other
  // parameter stay first-party; Meta gets a bare Contact with an opaque ID.
  trackMetaContact(createOpaqueEventId('contact'));
}

/**
 * Appointment CTA click tracking — single entry point for "open booking dialog" CTAs.
 *
 * Pushes `appointment_cta_click` AND the legacy `booking_click` event so any
 * GTM trigger still bound to the old event name keeps firing. Call this instead
 * of pushEvent('appointment_cta_click', ...) directly.
 */
export function pushAppointmentCtaClick(params: Record<string, any> = {}) {
  pushEvent('appointment_cta_click', params);
  pushEvent('booking_click', params);
}

/**
 * Single entry point for accepted lead tracking.
 *
 * The caller must provide the non-PII ID returned by successful persistence.
 * Existing Enhanced Conversions data remains isolated in its own dataLayer push;
 * the canonical lead event contains only non-sensitive measurement context.
 */
const emittedSubmissionIds = new Set<string>();

type AcceptedLeadContext = {
  form_name: string;
  form_source?: FormSource;
  state: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  postalCode?: string;
  country?: string;
  /** See pushFormSubmit — D10 insurance qualification. Defaults to 'qualified'. */
  lead_qualification?: 'qualified' | 'unqualified';
};

export async function pushAcceptedLead({
  acceptance,
  ...context
}: AcceptedLeadContext & { acceptance: unknown }): Promise<boolean> {
  // Start hashing BEFORE awaiting the server's response body, so the digest is
  // computed during a wait that was happening anyway. By the time the lead event
  // fires below, this promise has long since settled and reading it is free.
  //
  // This is what makes enhanced conversions possible without putting anything in
  // front of the canonical event. Deliberately not awaited here.
  const preparedEC = prepareHashedEC({
    email: context.email,
    phone: context.phone,
    firstName: context.firstName,
    lastName: context.lastName,
    postalCode: context.postalCode,
    country: context.country,
  });
  // Await both together. An earlier version pushed whatever had settled by the
  // time the lead event fired, which made the ordering depend on whether the hash
  // happened to win a race against reading the response body — it lost for an
  // in-memory response, and would have been a coin toss in production.
  //
  // Promise.all does NOT serialise these: the hash started above and has been
  // running throughout. This waits for max(response, hash) rather than their sum,
  // and the hash is bounded by HASH_BUDGET_MS, so the lead event's worst case is
  // the response read plus nothing measurable.
  const [accepted] = await Promise.all([
    acceptance instanceof Response
      ? readLeadAcceptance(acceptance)
      : Promise.resolve(parseLeadAcceptance(acceptance)),
    preparedEC.promise,
  ]);

  if (!accepted) return false;
  await pushFormSubmit({ ...context, submission_id: accepted.submissionId, preparedEC });
  return true;
}

export async function pushFormSubmit({
  form_name,
  form_source,
  state,
  submission_id,
  email,
  phone,
  firstName,
  lastName,
  postalCode,
  country = 'US',
  lead_qualification = 'qualified',
  preparedEC,
}: {
  form_name: string;
  form_source?: FormSource;
  state: string;
  submission_id: string | number;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  postalCode?: string;
  country?: string;
  /**
   * Whether this lead met the practice's insurance criteria (D10, 2026-09-24).
   *
   * Defaults to 'qualified' so every form that does not ask about insurance
   * behaves exactly as before. Only forms carrying the insurance dropdown pass
   * 'unqualified', and they derive it from lib/insurance-routing.ts.
   */
  lead_qualification?: 'qualified' | 'unqualified';
  /**
   * A hash started earlier by pushAcceptedLead, so the identity can be on the
   * dataLayer before the conversion tag reads it. Absent when pushFormSubmit is
   * called directly, in which case enhanced data is attached afterwards as before.
   */
  preparedEC?: PreparedIdentity;
}) {
  if (typeof window === 'undefined') return;

  const acceptance = parseLeadAcceptance({ ok: true, submissionId: submission_id });
  if (!acceptance || emittedSubmissionIds.has(acceptance.submissionId)) return;

  emittedSubmissionIds.add(acceptance.submissionId);

  // ---------------------------------------------------------------------------
  // STEP 0 — Qualification gate (D10).
  //
  // A lead whose insurance is not accepted is a real, server-accepted lead: it
  // is persisted to Supabase, it emails the clinic, and the patient still gets a
  // confirmation page. What it is NOT is a qualified conversion, so it must not
  // reach Google Ads, Meta, or the enhanced-conversion identity path.
  //
  // Returning here — rather than adding an "unqualified" event — is deliberate.
  // The insurance answer must not reach an advertising payload, and a
  // distinctly-named event would carry that answer in its own name. Unqualified
  // volume stays measurable from Supabase, which is where this codebase already
  // keeps first-party qualification (see lib/insurance-routing.ts, and the
  // deliberately neutral 'paid-landing' form source).
  //
  // This gate is NOT consent-shaped: it asks what kind of lead this is, never
  // what the visitor permitted. The consent-independence contract is unaffected.
  //
  // The submission ID is registered above before this return, so a retry cannot
  // promote the same submission into a conversion later.
  // ---------------------------------------------------------------------------
  if (lead_qualification === 'unqualified') return;

  // ---------------------------------------------------------------------------
  // STEP 1 — Business event. Consent-INDEPENDENT by design.
  //
  // This payload is operational, not personal: form id, form source, page path,
  // market code and the server-issued submission id. It contains no identity and
  // no clinical field, so it is not advertising data and emitting it is not a
  // tracking decision the visitor needs to authorise.
  //
  // Consent governs what the TAGS may do with the event — Google Consent Mode
  // keeps ad_storage/analytics_storage denied until the visitor chooses, and GTM
  // degrades to cookieless pings on its own. Gating the PUSH instead meant GTM
  // never saw the event at all, so Consent Mode could never apply: every visitor
  // who ignored or rejected the banner became an invisible lead.
  //
  // It runs FIRST and outside any try/catch-able enrichment so nothing downstream
  // can suppress the record of a real, server-accepted lead.
  // ---------------------------------------------------------------------------
  const measurementWindow = window as typeof window & {
    dataLayer?: Array<Record<string, unknown>>;
  };
  measurementWindow.dataLayer = measurementWindow.dataLayer || [];

  // ---------------------------------------------------------------------------
  // STEP 0.9 — Identity, IF it is already in hand. Consent-GATED. Never blocking.
  //
  // Google Ads attaches user-provided data to a conversion only if it is on the
  // dataLayer when the conversion tag reads it. Pushing it after the lead event —
  // which is what happened until 2026-10-01 — means the tag always reads nothing.
  //
  // So it goes first. peek() is synchronous and this step never waits: by the time
  // control reaches here, pushAcceptedLead has already awaited the hash alongside
  // the server response, so the digest is in hand and reading it is free.
  //
  // An earlier version raced peek() against an immediately-resolved sentinel and
  // pushed whatever had settled. That was wrong — buildHashedEC awaits four
  // crypto.subtle.digest calls, so it loses to an in-memory response read every
  // time, and on a slow network it would have been a coin toss that looked correct
  // whenever anyone checked. Ordering is awaited explicitly now, not hoped for.
  //
  // When pushFormSubmit is called directly there is no prepared hash, peek() is
  // undefined, and the identity is attached after the lead event exactly as it was
  // before. That is a degradation in match rate, never a delay or a lost event.
  // ---------------------------------------------------------------------------
  const readyIdentity = preparedEC?.peek();
  const identityPushed = Boolean(readyIdentity);
  if (readyIdentity) {
    measurementWindow.dataLayer.push({
      event: 'ec_capture',
      enhanced_conversion_data: readyIdentity,
    });
  }

  measurementWindow.dataLayer.push(buildCanonicalLeadEvent({
    formId: form_name,
    formSource: form_source,
    pagePath: window.location.pathname,
    state,
    submissionId: acceptance.submissionId,
  }));

  // ---------------------------------------------------------------------------
  // STEP 2 — Enhanced-conversion identity. Consent-GATED and strictly isolated.
  //
  // Hashed email/phone/name is advertising identity under ad_user_data, so it is
  // prepared and transmitted only when marketing consent is granted. It travels
  // in its own dataLayer push and is best-effort: a failure here must never cost
  // the business event above, which is why it is wrapped rather than awaited bare.
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  // STEP 2 — Meta Lead. A separate advertising adapter consuming the same
  // confirmed success, never a second source of truth.
  //
  // Deliberately minimal: Meta receives the event name, an empty custom_data
  // object, and the server-issued submission ID as eventID. No market, no form
  // name, no clinic, no identity, no clinical value — the site keeps all of
  // that first-party. Clinical assessment surfaces (MRI review, candidacy
  // check, condition check) are excluded by isMetaEligibleFormSource, so a
  // completed medical questionnaire never becomes an ad-platform conversion.
  //
  // trackMetaLead enforces marketing consent and route eligibility itself and
  // cannot throw, so this can never affect the lead or the base event above.
  // ---------------------------------------------------------------------------
  if (isMetaEligibleFormSource(form_source)) {
    trackMetaLead(acceptance.submissionId);
  }

  if (!isAdvertisingAllowed()) return;

  // Normalize phone to E.164 once here so every downstream consumer gets the correct format.
  // formatPhoneToE164 returns '' for invalid/short numbers; treat those as absent.
  const normalizedPhone = phone ? formatPhoneToE164(phone, country) : '';

  const ecData: ECIn = {
    email,
    phone: normalizedPhone || phone, // pass E.164 to EC; fall back to raw only if normalization fails
    firstName,
    lastName,
    postalCode,
    country,
  };

  try {
    persistEC(ecData);
    // Skip when the identity already went out ahead of the lead event above.
    // Pushing it twice would put two ec_capture events on the dataLayer for one
    // submission, and any GTM tag listening on that event would fire twice.
    //
    // Also skip when there is nothing to send. A payload of all-undefined digests
    // is not enhanced data; it is an event that looks like identity, matches
    // nothing, and makes "did identity go out?" unanswerable from the dataLayer.
    if (!identityPushed && (email || normalizedPhone)) await pushEC(ecData);
  } catch {
    // Identity enrichment is an optimisation on top of an already-recorded lead.
  }
}

/**
 * Debug helper: Check if enhanced conversion data is in dataLayer
 * Useful for troubleshooting in browser console
 * 
 * Usage in browser console:
 *   verifyECData();
 */
export function verifyECData(): boolean {
  if (typeof window === 'undefined') {
    console.warn('verifyECData: Not available in server-side context');
    return false;
  }

  const dataLayer = (window as any).dataLayer || [];
  let found = false;

  console.log('Checking dataLayer for enhanced_conversion_data presence...');
  
  for (let i = dataLayer.length - 1; i >= 0; i--) {
    const item = dataLayer[i];
    if (item && item.enhanced_conversion_data) {
      found = true;
      console.log('Found enhanced_conversion_data.');
      return true;
    }
  }

  if (!found) {
    console.warn('No enhanced_conversion_data found in dataLayer');
  }

  return found;
}
