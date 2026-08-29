/**
 * Centralized state normalization and resolution for multi-state tracking.
 *
 * Valid state values are lowercase, hyphenated slugs matching the routing structure:
 *   /locations/florida, /locations/new-jersey, /locations/new-york, /locations/pennsylvania
 *
 * No abbreviations, no uppercase, no spacing variations anywhere in analytics data.
 */

export const VALID_STATES = [
  'florida',
  'new-jersey',
  'new-york',
  'pennsylvania',
] as const;

export type StateSlug = (typeof VALID_STATES)[number];

/** Human-readable label for each state slug */
export const STATE_DISPLAY_NAMES: Record<StateSlug, string> = {
  florida: 'Florida',
  'new-jersey': 'New Jersey',
  'new-york': 'New York',
  pennsylvania: 'Pennsylvania',
};

/** Ready-to-use options array for Select components */
export const STATE_OPTIONS: { value: StateSlug; label: string }[] = VALID_STATES.map(
  (s) => ({ value: s, label: STATE_DISPLAY_NAMES[s] })
);

/**
 * Normalizes any state representation (abbreviation, slug, full name) to a valid StateSlug.
 * Returns '' if the value cannot be resolved.
 */
const SLUG_MAP: Record<string, StateSlug> = {
  // Slug passthrough
  florida: 'florida',
  'new-jersey': 'new-jersey',
  'new-york': 'new-york',
  pennsylvania: 'pennsylvania',
  // Abbreviations (upper and lower)
  fl: 'florida',
  nj: 'new-jersey',
  ny: 'new-york',
  pa: 'pennsylvania',
  // Full name variants
  'new jersey': 'new-jersey',
  'new york': 'new-york',
};

export function normalizeState(value: string): StateSlug | '' {
  if (!value) return '';
  const key = value.trim().toLowerCase();
  return SLUG_MAP[key] ?? '';
}

export type StateCode = 'FL' | 'NJ' | 'NY' | 'PA';

const STATE_CODE_BY_SLUG: Record<StateSlug, StateCode> = {
  florida: 'FL',
  'new-jersey': 'NJ',
  'new-york': 'NY',
  pennsylvania: 'PA',
};

/** Canonical storage/measurement boundary. UI values remain route-friendly slugs. */
export function normalizeStateCode(value: string): StateCode | '' {
  const slug = normalizeState(value);
  return slug ? STATE_CODE_BY_SLUG[slug] : '';
}

export function isValidState(value: string): value is StateSlug {
  return (VALID_STATES as readonly string[]).includes(value);
}

/**
 * Extracts the state slug from a pathname that begins with /locations/{state}.
 * Works for both state hub pages and nested location pages.
 *
 * Examples:
 *   /locations/florida                     → "florida"
 *   /locations/new-jersey/hoboken-ortho    → "new-jersey"
 *   /about                                 → ""
 */
export function slugFromPathname(pathname: string): StateSlug | '' {
  const match = pathname.match(
    /\/locations\/(florida|new-jersey|new-york|pennsylvania)/
  );
  return match ? (match[1] as StateSlug) : '';
}
