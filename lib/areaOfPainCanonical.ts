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
