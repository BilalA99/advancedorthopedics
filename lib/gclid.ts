// lib/gclid.ts
// GCLID + UTM Capture Utility
// Used for Google Ads offline conversion attribution
// Mountain Spine & Orthopedics — NJ/NY Expansion
import { hasMarketingConsent } from './consent';

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
  if (!hasMarketingConsent()) return;

  const googleClickParams = ['gclid', 'gbraid', 'wbraid'] as const;
  const currentGoogleClick = googleClickParams
    .map((param) => [param, validClickId(getQueryParam(param))] as const)
    .filter((entry): entry is readonly [typeof googleClickParams[number], string] => Boolean(entry[1]));

  if (currentGoogleClick.length > 0) {
    [...googleClickParams, GCLID_COOKIE_NAME].forEach((name) => setCookie(name, '', -1));
    currentGoogleClick.forEach(([param, value]) => {
      setCookie(param, value, GCLID_COOKIE_EXPIRY_DAYS);
      if (param === 'gclid') setCookie(GCLID_COOKIE_NAME, value, GCLID_COOKIE_EXPIRY_DAYS);
    });
  }

  (['fbclid', 'msclkid'] as const).forEach((param) => {
    const value = validClickId(getQueryParam(param));
    if (value) setCookie(param, value, GCLID_COOKIE_EXPIRY_DAYS);
  });
}

/**
 * Call on page load alongside captureGclid().
 * Captures all UTM parameters from the URL and stores them in cookies.
 */
export function captureUtmParams(): void {
  UTM_PARAMS.forEach((param) => {
    const value = validCampaignValue(getQueryParam(param));
    if (value && hasMarketingConsent()) {
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
  return validClickId(getQueryParam('gclid')) ?? validClickId(getCookie(GCLID_COOKIE_NAME)) ?? validClickId(getCookie('gclid')) ?? '';
}

/**
 * Returns all stored UTM parameter values as a record.
 * Use this to populate hidden UTM fields in forms.
 */
export function getStoredUtmParams(): Record<UtmParam, string> {
  const result = {} as Record<UtmParam, string>;
  UTM_PARAMS.forEach((param) => {
    result[param] = validCampaignValue(getQueryParam(param)) ?? validCampaignValue(getCookie(param)) ?? '';
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
    result[param] = validClickId(getQueryParam(param)) ?? validClickId(getCookie(param)) ?? '';
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
