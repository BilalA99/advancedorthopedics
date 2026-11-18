/**
 * Frame-ancestors allowlist: who may embed mountainspineorthopedics.com in an iframe.
 *
 * WHY THIS EXISTS
 * We publish press releases on newswires (EIN Presswire today). A release can show
 * one of our pages in a frame underneath it ("Embedded Website"), so a reader can
 * land on a treatment page and use its lead form without leaving the release.
 *
 * WHAT IT REPLACES
 * The site used to send `X-Frame-Options: DENY` on every response, which blocks all
 * framing and cannot allowlist anyone — `ALLOW-FROM` is obsolete and ignored by
 * modern browsers. The CSP directive `frame-ancestors` is the supported replacement
 * and takes a list of origins. `X-Frame-Options` has been removed site-wide so that
 * header checkers don't keep reporting our pages as blocked.
 *
 * HOW TO ADD A WIRE
 * Uncomment (or add) the exact origin below, then deploy. One line, one wire.
 *
 * HARD RULE
 * Only named domains. Never add `*`, `https:`, `http:` or any bare wildcard host —
 * this allowlist IS the site's clickjacking protection, and a wildcard removes it.
 * A wildcard subdomain of a wire we already trust (e.g. `https://*.einnews.com`) is
 * fine; a wildcard that would match arbitrary sites is not.
 *
 * See docs/press-release-embedding.md for testing and rollback.
 */
export const FRAME_ANCESTORS: readonly string[] = [
  // Our own pages (same-origin framing).
  "'self'",

  // --- Active press-release wires ---
  'https://www.einpresswire.com',
  'https://*.einpresswire.com',
  'https://www.einnews.com',
  'https://*.einnews.com',

  // --- Future wires: uncomment one line to enable, then deploy ---
  // 'https://www.prnewswire.com',      // PR Newswire / Cision
  // 'https://www.prweb.com',           // PRWeb
  // 'https://www.businesswire.com',    // Business Wire
  // 'https://www.globenewswire.com',   // GlobeNewswire
  // 'https://www.newswire.com',        // Newswire.com
  // 'https://www.accessnewswire.com',  // ACCESS Newswire
];

/**
 * The built CSP directive, sent on every response from next.config.ts `headers()`.
 * Currently:
 *   frame-ancestors 'self' https://www.einpresswire.com https://*.einpresswire.com https://www.einnews.com https://*.einnews.com
 */
export const FRAME_ANCESTORS_CSP = `frame-ancestors ${FRAME_ANCESTORS.join(' ')}`;
