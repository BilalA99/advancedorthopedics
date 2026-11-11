// lib/gclid.ts
// GCLID + UTM Capture Utility
// Used for Google Ads offline conversion attribution
// Mountain Spine & Orthopedics — NJ/NY Expansion
import { isAdvertisingAllowed } from './consent';

const GCLID_COOKIE_NAME = 'mso_gclid';
const GCLID_COOKIE_EXPIRY_DAYS = 90;
const UTM_COOKIE_EXPIRY_DAYS = 30;

const AD_CLICK_PARAMS = [
  'gclid',
  'gbraid',
  'wbraid',
  'fbclid',
  'msclkid',
] as const;

const UTM_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'utm_id',
  // Meta platform IDs. Numeric IDs are used rather than campaign/ad NAMES so a
  // name like "NJ Herniated Disc Surgery PPO" never travels through analytics
  // as a URL parameter. Names are joined back from the IDs in reporting.
  'meta_campaign_id',
  'meta_adset_id',
  'meta_ad_id',
] as const;

export type UtmParam = typeof UTM_PARAMS[number];
export type AdClickParam = typeof AD_CLICK_PARAMS[number];
export type AttributionData = Record<AdClickParam | UtmParam, string>;

export const EMPTY_ATTRIBUTION: AttributionData = {
  gclid: '',
  gbraid: '',
  wbraid: '',
  fbclid: '',
  msclkid: '',
  utm_source: '',
  utm_medium: '',
  utm_campaign: '',
  utm_term: '',
  utm_content: '',
  utm_id: '',
  meta_campaign_id: '',
  meta_adset_id: '',
  meta_ad_id: '',
};

/**
 * Reads a single query parameter from the current URL
 */
function getQueryParam(name: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  } catch {
    return null;
  }
}

/**
 * Landing-parameter buffer — the fix for the biggest attribution leak.
 *
 * Capture is gated on marketing consent, but the banner is answered SECONDS or
 * MINUTES after arrival, and this is a single-page app. A visitor who lands on
 * /lp/x?fbclid=...&utm_campaign=123, browses to /treatments, and only then
 * presses Accept used to be captured from a URL that no longer carried any
 * parameters — so a genuinely consented, genuinely attributable paid click was
 * recorded as organic. Permanently.
 *
 * This keeps the arrival parameters in MEMORY ONLY (module scope: no cookie, no
 * localStorage, nothing transmitted) until consent resolves. On consent the
 * normal cookie write happens from the buffer. Rejection simply means the
 * buffer is never read and dies with the page.
 *
 * Module scope survives client-side navigation but not a full reload, which is
 * the correct lifetime: it is page state, not storage.
 */
let landingBuffer: Record<string, string> | null = null;

/** Reads every attribution parameter present on the current URL. */
function readAttributionParamsFromUrl(): Record<string, string> {
  const found: Record<string, string> = {};
  if (typeof window === 'undefined') return found;
  try {
    const params = new URLSearchParams(window.location.search);
    [...AD_CLICK_PARAMS, ...UTM_PARAMS].forEach((name) => {
      const raw = params.get(name);
      if (raw) found[name] = raw;
    });
  } catch {
    // Unparseable query string: nothing to read.
  }
  return found;
}

/**
 * Refreshes the buffer.
 *
 * LATEST CLICK WINS. If the current URL carries any attribution parameter it is
 * a fresh arrival, so the buffer is REPLACED wholesale rather than merged —
 * otherwise a visitor who arrived from Google and later clicked a Meta ad would
 * keep resurrecting the stale gclid. If the URL carries none, an existing
 * buffer is preserved so a later Accept can still be attributed.
 */
function snapshotLandingParams(): void {
  if (typeof window === 'undefined') return;
  const current = readAttributionParamsFromUrl();
  if (Object.keys(current).length > 0) {
    landingBuffer = current;
    return;
  }
  if (!landingBuffer) landingBuffer = {};
}

/**
 * Current URL first, then the buffered landing URL.
 *
 * The buffer is consulted ONLY when the current URL carries no attribution
 * parameters at all. On a URL that does carry them, the absence of one specific
 * parameter is meaningful — a new gbraid click legitimately clears a previous
 * gclid — so no fallback is applied.
 */
function getParamWithBuffer(name: string): string | null {
  snapshotLandingParams();
  const direct = getQueryParam(name);
  if (direct) return direct;
  if (Object.keys(readAttributionParamsFromUrl()).length > 0) return null;
  // The buffer stays locked until the visitor accepts advertising: their
  // arrival parameters stay in memory, unread, and die with the page unless a
  // later Accept (GclidCapture re-runs on consent change) releases them.
  if (!isAdvertisingAllowed()) return null;
  return landingBuffer?.[name] ?? null;
}

/** Exposed so the Meta adapter can seed _fbc after consent. */
export function getBufferedLandingParam(name: string): string | null {
  snapshotLandingParams();
  return getParamWithBuffer(name);
}

/**
 * Call as early as possible on every page load, BEFORE consent is known.
 * Only reads the URL into memory — writes nothing and sends nothing.
 */
export function bufferLandingAttribution(): void {
  snapshotLandingParams();
}

function validClickId(value: string | null): string | null {
  if (!value) return null;
  const normalized = value.trim();
  return /^[A-Za-z0-9._~-]{1,256}$/.test(normalized) ? normalized : null;
}

function validCampaignValue(value: string | null): string | null {
  if (!value) return null;
  const normalized = value.replace(/[\u0000-\u001F\u007F]/g, '').trim();
  return normalized ? normalized.slice(0, 500) : null;
}

/**
 * Sets a first-party cookie
 */
function setCookie(name: string, value: string, days: number): void {
  if (typeof document === 'undefined') return;
  try {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  } catch {
    // Silently fail — never break the page for tracking
  }
}

/**
 * Reads a cookie value by name
 */
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  try {
    const match = document.cookie.match(
      new RegExp('(^| )' + name + '=([^;]+)')
    );
    return match ? decodeURIComponent(match[2]) : null;
  } catch {
    return null;
  }
}

/**
 * Call on page load.
 * If gclid is in the URL, saves it to cookie (overwrites previous — latest click wins).
 * If no gclid in URL, existing cookie value is preserved.
 */
export function captureGclid(): void {
  if (!isAdvertisingAllowed()) return;

  const googleClickParams = ['gclid', 'gbraid', 'wbraid'] as const;
  const currentGoogleClick = googleClickParams
    .map((param) => [param, validClickId(getParamWithBuffer(param))] as const)
    .filter((entry): entry is readonly [typeof googleClickParams[number], string] => Boolean(entry[1]));

  if (currentGoogleClick.length > 0) {
    [...googleClickParams, GCLID_COOKIE_NAME].forEach((name) => setCookie(name, '', -1));
    currentGoogleClick.forEach(([param, value]) => {
      setCookie(param, value, GCLID_COOKIE_EXPIRY_DAYS);
      if (param === 'gclid') setCookie(GCLID_COOKIE_NAME, value, GCLID_COOKIE_EXPIRY_DAYS);
    });
  }

  (['fbclid', 'msclkid'] as const).forEach((param) => {
    const value = validClickId(getParamWithBuffer(param));
    if (value) setCookie(param, value, GCLID_COOKIE_EXPIRY_DAYS);
  });
}

/**
 * Call on page load alongside captureGclid().
 * Captures all UTM parameters from the URL and stores them in cookies.
 */
export function captureUtmParams(): void {
  UTM_PARAMS.forEach((param) => {
    const value = validCampaignValue(getParamWithBuffer(param));
    if (value && isAdvertisingAllowed()) {
      setCookie(param, value, UTM_COOKIE_EXPIRY_DAYS);
    }
  });
}

/**
 * Returns the stored GCLID value from cookie.
 * Use this to populate hidden form fields before submission.
 * Returns empty string (never null) so it's safe to use directly in form values.
 */
export function getStoredGclid(): string {
  return validClickId(getParamWithBuffer('gclid')) ?? validClickId(getCookie(GCLID_COOKIE_NAME)) ?? validClickId(getCookie('gclid')) ?? '';
}

/**
 * Returns all stored UTM parameter values as a record.
 * Use this to populate hidden UTM fields in forms.
 */
export function getStoredUtmParams(): Record<UtmParam, string> {
  const result = {} as Record<UtmParam, string>;
  UTM_PARAMS.forEach((param) => {
    result[param] = validCampaignValue(getParamWithBuffer(param)) ?? validCampaignValue(getCookie(param)) ?? '';
  });
  return result;
}

export function getStoredAdClickParams(): Record<AdClickParam, string> {
  const result = {} as Record<AdClickParam, string>;
  AD_CLICK_PARAMS.forEach((param) => {
    if (param === 'gclid') {
      result[param] = getStoredGclid();
      return;
    }
    result[param] = validClickId(getParamWithBuffer(param)) ?? validClickId(getCookie(param)) ?? '';
  });
  return result;
}

/**
 * Returns a combined attribution object with GCLID + all UTMs.
 * Use this to pass the full attribution payload to your backend.
 */
export function getAttributionData(): AttributionData {
  return {
    ...getStoredAdClickParams(),
    ...getStoredUtmParams(),
  };
}
