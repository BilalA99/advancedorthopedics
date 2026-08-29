/**
 * Paths that must never appear in the sitemap because a redirect in
 * next.config.ts sends them elsewhere.
 *
 * A sitemap is a list of canonical, indexable, 200-returning URLs. Listing a
 * URL that 301/308s wastes crawl budget and gives conflicting canonical
 * signals — Ahrefs flags it as "redirecting URLs in sitemap".
 *
 * These four are condition records that were consolidated into their treatment
 * equivalents. The data rows are deliberately kept in components/data/
 * conditions.tsx: lib/metadata-seo.ts and the foot-pain area client still
 * resolve against those slugs, so deleting the rows would break unrelated
 * lookups. They simply must not be advertised as canonical URLs.
 *
 * scripts/audit-sitemap-vs-redirects.mjs fails the audit if the sitemap and the
 * redirect table ever drift apart again, so this list cannot silently rot.
 */
export const SITEMAP_EXCLUDED_PATHS: ReadonlySet<string> = new Set([
  '/conditions/aging-management',
  '/conditions/ankle-arthroscopy',
  '/conditions/ankle-replacement',
  '/conditions/degenerative-disc-disease-surgery',
]);
