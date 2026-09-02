import { conditions } from "@/components/data/conditions";
import { SITEMAP_EXCLUDED_PATHS } from "@/lib/sitemap-exclusions";

/**
 * The /area-of-pain/* routes render the same condition content as /conditions/*.
 * They are prerendered and indexable but deliberately excluded from the sitemap,
 * which treats /conditions/* as canonical — so without this they compete with
 * the pages they duplicate.
 *
 * Each /area-of-pain page therefore points its canonical at the equivalent
 * /conditions page, consolidating signals while leaving the URL reachable for
 * existing inbound links. Chosen over a 301 because it is reversible and
 * retires no URL.
 *
 * A cross-canonical is only emitted when the target genuinely exists as a
 * condition page and is not itself a redirect source — otherwise the page keeps
 * its own canonical rather than pointing at a URL that 404s or redirects.
 */
const CONDITION_SLUGS: ReadonlySet<string> = new Set(
  conditions.map((c) => c.slug).filter((s): s is string => Boolean(s) && s !== "undefined")
);

export function canonicalPathForPainArea(selfPath: string, slug: string): string {
  const target = `/conditions/${slug}`;
  if (!CONDITION_SLUGS.has(slug)) return selfPath;
  if (SITEMAP_EXCLUDED_PATHS.has(target)) return selfPath;
  return target;
}

/**
 * True when this pain-area slug has a genuine /conditions equivalent to point at.
 *
 * 324 of the 390 pain-area pages do. The remaining 65 either have no condition
 * record under that exact slug (they are pain-area-specific variants such as
 * `heel-pain-plantar-fasciitis`) or resolve to one of the four condition URLs
 * that are themselves redirect sources.
 *
 * Those 65 have nothing to consolidate onto, so they stay self-canonical — which
 * leaves them indexable duplicates. Callers use this to noindex them instead.
 * Verified against Search Console: no /area-of-pain URL reaches the top 100 pages
 * by clicks over 90 days, and that list's floor is 53 impressions, so nothing
 * measurable is lost by dropping them from the index.
 *
 * Deliberately not solved with a slug alias map: a wrong alias would point a
 * canonical at a semantically different condition, which is worse than a noindex
 * on a page nobody reaches.
 */
export function hasCrossCanonicalTarget(slug: string): boolean {
  const target = `/conditions/${slug}`;
  return CONDITION_SLUGS.has(slug) && !SITEMAP_EXCLUDED_PATHS.has(target);
}
