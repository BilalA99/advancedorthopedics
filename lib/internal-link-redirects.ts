/**
 * Canonical destinations for internal links whose target redirects elsewhere.
 *
 * Four records in components/data/conditions.tsx are really treatments that were
 * consolidated into their treatment pages. next.config.ts 308s
 * `/conditions/{slug}` to the treatment URL, and lib/sitemap-exclusions.ts keeps
 * those paths out of the sitemap — but the data rows are deliberately retained,
 * because lib/metadata-seo.ts and the foot-pain area client still resolve against
 * those slugs (see the comment in sitemap-exclusions.ts).
 *
 * The consequence was that every data-driven link builder — the condition hub,
 * the sidebar list, the body-part grids, the location templates, the prose
 * auto-linker — happily emitted `/conditions/{slug}` and sent users and crawlers
 * through an unnecessary redirect hop. Keeping the URL out of the sitemap fixed
 * the sitemap; it did nothing for the ~200 internal links.
 *
 * `resolveConditionHref` closes that gap at the point of link generation, so the
 * data rows can stay exactly where they are.
 *
 * Sourced from the redirect table in next.config.ts. If a redirect is added or
 * changed there, mirror it here — scripts/audit-sitemap-vs-redirects.mjs already
 * guards the sitemap half of this contract.
 */

const REDIRECTED_CONDITION_HREFS: Readonly<Record<string, string>> = {
  // Area-of-pain pages consolidated into their canonical condition pages.
  '/area-of-pain/back-pain/sciatica-nerve-pain': '/conditions/sciatica',
  '/area-of-pain/back-pain/lumbar-degenerative-disc-disease': '/conditions/degenerative-disc-disease',
  '/area-of-pain/neck-and-shoulder-pain/neck-and-shoulder-pain-treatment': '/conditions/neck-pain',
  // Condition records that are really treatments.
  '/conditions/aging-management': '/treatments/aging-management',
  '/conditions/ankle-arthroscopy': '/treatments/ankle-arthroscopy-minimally-invasive-surgery',
  '/conditions/ankle-replacement': '/treatments/ankle-replacement-surgery',
  '/conditions/degenerative-disc-disease-surgery': '/treatments/degenerative-disc-disease-surgery',
};

/**
 * The canonical, 200-returning href for an internal condition link.
 * Returns the input unchanged for every slug that is a real condition.
 */
export function resolveConditionHref(href: string): string {
  return REDIRECTED_CONDITION_HREFS[href] ?? href;
}

/** Convenience for call sites that hold a bare slug rather than a path. */
export function resolveConditionSlugHref(slug: string): string {
  return resolveConditionHref(`/conditions/${slug}`);
}

/** True when `/conditions/{slug}` would redirect rather than render. */
export function isRedirectedConditionSlug(slug: string): boolean {
  return `/conditions/${slug}` in REDIRECTED_CONDITION_HREFS;
}

export { REDIRECTED_CONDITION_HREFS };
