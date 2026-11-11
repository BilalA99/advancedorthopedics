export const CONSENT_VERSION = 1;
export const CONSENT_STORAGE_KEY = "mso_cookie_consent_v1";
export const CONSENT_UPDATED_EVENT = "msoConsentUpdated";
export const OPEN_COOKIE_PREFERENCES_EVENT = "msoOpenCookiePreferences";

export type ConsentCategories = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
};

export type ConsentState = {
  version: number;
  timestamp: string;
  categories: ConsentCategories;
};

/**
 * What an EXPLICIT refusal looks like. Used when the visitor rejects, and as the
 * shape of a fully-denied state.
 */
export const defaultConsentCategories: ConsentCategories = {
  necessary: true,
  analytics: false,
  marketing: false,
  functional: false,
};

/**
 * What an UNDECIDED visitor gets: nothing optional. Silence is not consent.
 *
 * This mirrors the denied Consent Mode `default` declared in app/layout.tsx.
 * CookieConsentManager issues a Consent Mode `update` on mount, so the two must
 * agree — a granting update here would silently override the denied default.
 * Supersedes the 2026-09-21 decision that treated undecided as granted.
 */
export const undecidedConsentCategories: ConsentCategories = {
  necessary: true,
  analytics: false,
  marketing: false,
  functional: false,
};

export function getDefaultConsentState(): ConsentState {
  return {
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
    categories: defaultConsentCategories,
  };
}

function canUseStorage() {
  if (typeof window === "undefined" || typeof window.localStorage === "undefined") return false;

  try {
    const testKey = "__mso_consent_storage_test__";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

export function getConsentState(): ConsentState | null {
  if (!canUseStorage()) return null;

  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as ConsentState;
    if (parsed.version !== CONSENT_VERSION) return null;

    return {
      version: CONSENT_VERSION,
      timestamp: parsed.timestamp,
      categories: {
        necessary: true,
        analytics: Boolean(parsed.categories?.analytics),
        marketing: Boolean(parsed.categories?.marketing),
        functional: Boolean(parsed.categories?.functional),
      },
    };
  } catch {
    return null;
  }
}

export function hasAnalyticsConsent() {
  return Boolean(getConsentState()?.categories.analytics);
}

export function hasMarketingConsent() {
  return Boolean(getConsentState()?.categories.marketing);
}

/**
 * Whether advertising measurement (Meta Pixel, click-ID attribution, Enhanced
 * Conversions identity) may run RIGHT NOW.
 *
 *   undecided (nothing stored)  -> BLOCKED
 *   marketing granted           -> ALLOWED
 *   marketing explicitly denied -> BLOCKED
 *
 * Opt-in: nothing advertising-related runs until the visitor accepts marketing
 * in the banner. Supersedes the 2026-09-21 decision that allowed undecided.
 */
export function isAdvertisingAllowed() {
  return hasMarketingConsent();
}

/** True only for an explicit, stored refusal of marketing. */
export function hasDeclinedMarketing() {
  const state = getConsentState();
  return Boolean(state && !state.categories.marketing);
}

export function hasFunctionalConsent() {
  return Boolean(getConsentState()?.categories.functional);
}

export function hasMeasurementConsent() {
  const state = getConsentState();
  return Boolean(state?.categories.analytics || state?.categories.marketing);
}

export function getGoogleConsentPayload(categories: ConsentCategories) {
  return {
    ad_storage: categories.marketing ? "granted" : "denied",
    analytics_storage: categories.analytics ? "granted" : "denied",
    ad_user_data: categories.marketing ? "granted" : "denied",
    ad_personalization: categories.marketing ? "granted" : "denied",
    functionality_storage: categories.functional ? "granted" : "denied",
    personalization_storage: categories.functional ? "granted" : "denied",
    security_storage: "granted",
  } as const;
}

export function updateGoogleConsentMode(categories: ConsentCategories) {
  if (typeof window === "undefined") return;

  const w = window as typeof window & {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };

  w.dataLayer = w.dataLayer || [];
  w.gtag =
    w.gtag ||
    function gtagShim(...args: unknown[]) {
      w.dataLayer?.push(args);
    };

  w.gtag("consent", "update", getGoogleConsentPayload(categories));
}

export function setConsentState(categories: Omit<ConsentCategories, "necessary"> | ConsentCategories) {
  if (!canUseStorage()) return null;

  const state: ConsentState = {
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
    categories: {
      necessary: true,
      analytics: Boolean(categories.analytics),
      marketing: Boolean(categories.marketing),
      functional: Boolean(categories.functional),
    },
  };

  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state));
  updateGoogleConsentMode(state.categories);

  if (!state.categories.analytics || !state.categories.marketing) {
    cleanupNonEssentialCookies(state.categories);
  }

  if (!state.categories.marketing) {
    cleanupEnhancedConversionSession();
  }

  window.dispatchEvent(new CustomEvent(CONSENT_UPDATED_EVENT, { detail: state }));
  return state;
}

export function resetConsentPreferences() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(CONSENT_STORAGE_KEY);
  // Clearing the record returns the visitor to UNDECIDED, which is a denied
  // state, so deny and scrub exactly as an explicit refusal would.
  updateGoogleConsentMode(undecidedConsentCategories);
  cleanupNonEssentialCookies(undecidedConsentCategories);
  cleanupEnhancedConversionSession();
  window.dispatchEvent(new CustomEvent(CONSENT_UPDATED_EVENT, { detail: null }));
}

function expireCookie(name: string) {
  if (typeof document === "undefined") return;

  const hostnameParts = window.location.hostname.split(".");
  const domainVariants = [
    undefined,
    window.location.hostname,
    hostnameParts.length > 1 ? `.${hostnameParts.slice(-2).join(".")}` : undefined,
  ].filter(Boolean) as string[];

  document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
  domainVariants.forEach((domain) => {
    document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}; SameSite=Lax`;
  });
}

export function cleanupNonEssentialCookies(categories: ConsentCategories) {
  if (typeof document === "undefined") return;

  const cookies = document.cookie
    .split(";")
    .map((cookie) => cookie.trim().split("=")[0])
    .filter(Boolean);

  const analyticsPrefixes = ["_ga", "_gid", "_gat", "_clck", "_clsk", "_hj"];
  const marketingPrefixes = ["_gcl", "_fbp", "_fbc", "calltrk", "Calltrk", "callrail", "CallRail", "CLID"];
  const attributionCookies = [
    "mso_gclid", "gclid", "gbraid", "wbraid", "fbclid", "msclkid",
    // Campaign context is persisted from landing now, so an explicit refusal
    // has to clear it as well or the rejection would be only half honoured.
    "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "utm_id",
    "meta_campaign_id", "meta_adset_id", "meta_ad_id",
  ];

  cookies.forEach((name) => {
    const isAnalytics = analyticsPrefixes.some((prefix) => name === prefix || name.startsWith(prefix));
    const isMarketing =
      marketingPrefixes.some((prefix) => name === prefix || name.startsWith(prefix)) ||
      attributionCookies.includes(name);

    if ((!categories.analytics && isAnalytics) || (!categories.marketing && isMarketing)) {
      expireCookie(name);
    }
  });
}

function cleanupEnhancedConversionSession() {
  if (typeof window === "undefined" || typeof window.sessionStorage === "undefined") return;

  try {
    ["ec_email", "ec_phone", "ec_first", "ec_last", "ec_postal", "ec_country"].forEach((key) => {
      window.sessionStorage.removeItem(key);
    });
  } catch {
    // Storage may be unavailable in restrictive browser modes.
  }
}
