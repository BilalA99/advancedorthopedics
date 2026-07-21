import { clinics } from "@/components/data/clinics";
import { getVisibleProviders } from "@/lib/providers/providerVisibility";
import { conditions, conditionContentPlaceholders } from "@/components/data/conditions";
import { AllTreatmentsCombined } from "@/components/data/treatments";
import { BODY_PARTS } from "@/components/data/bodyParts";
import { GetBlogsPublic } from "@/app/blogs/api/get-blogs";
import { VALID_STATE_SLUGS } from "@/lib/locationRedirects";
import { generateSitemapEntry, wrapInUrlset } from "@/lib/sitemap-utils";

export const revalidate = 3600;

/**
 * Comprehensive Sitemap
 * 
 * SEO Best Practices Applied:
 * - No <changefreq> or <priority> tags (Google ignores these)
 * - <lastmod> only included when accurate data is available
 * - Consistent ISO 8601 date format
 * - Only canonical URLs (no area-of-pain duplicates)
 * - All URLs return 200 status
 */

const staticPages = [
  "/",
  "/about",
  "/about/faqs",
  "/condition-check",
  "/privacy-policy",
  "/conditions",
  "/treatments",
  "/locations",
  "/blogs",
  "/find-care/book-an-appointment",
  "/find-care/find-a-doctor",
  "/find-care/free-mri-review",
  "/find-care/candidacy-check",
  "/find-care/second-opinion",
  "/insurance-policy",
  "/patient-forms",
  "/injuries/car-accident",
  "/injuries/slip-and-fall",
  "/injuries/work-injury",
  "/injuries/personal-injury",
];

export async function GET() {
  const sitemapEntries = new Map<string, string | undefined>();

  const addEntry = (path: string, lastmod?: string) => {
    // Normalize path (ensure leading slash, no trailing slash)
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    const finalPath =
      normalizedPath === "/" ? "/" : normalizedPath.replace(/\/$/, "");
    sitemapEntries.set(finalPath, lastmod);
  };

  // 1. Static pages
  staticPages.forEach((path) => addEntry(path));

  // 2. Location pages (state hubs + individual clinics)
  VALID_STATE_SLUGS.forEach((state) => addEntry(`/locations/${state}`));

  clinics.forEach((clinic) =>
    addEntry(
      `/locations/${clinic.stateSlug}/${clinic.locationSlug}`,
      clinic.updatedAt
    )
  );

  // 3. Doctor pages
  getVisibleProviders().filter((doctor) => doctor.slug && doctor.slug !== "undefined").forEach(
    (doctor) => addEntry(`/about/meetourdoctors/${doctor.slug}`, doctor.updatedAt)
  );

  // 4. Condition pages (body part hubs + individual conditions)
  BODY_PARTS.forEach((bodyPart) => addEntry(`/conditions/${bodyPart.slug}`));

  const allConditions = [...conditions, ...conditionContentPlaceholders];
  allConditions
    .filter((c) => c.slug && c.slug !== "undefined")
    .forEach((condition) =>
      addEntry(`/conditions/${condition.slug}`, condition.updatedAt)
    );

  // 5. Treatment pages
  AllTreatmentsCombined.filter(
    (treatment) => treatment.slug && treatment.slug !== "undefined"
  ).forEach((treatment) =>
    addEntry(`/treatments/${treatment.slug}`, treatment.updatedAt)
  );

  // 6. Blog pages (fetched from Supabase)
  try {
    const blogsData = await GetBlogsPublic();
    (blogsData || [])
      .filter((blog) => blog?.slug)
      .forEach((blog) =>
        addEntry(
          `/blogs/${blog.slug}`,
          blog.modified_at || blog.created_at
        )
      );
  } catch (error) {
    console.error("Error fetching blogs for sitemap:", error);
  }

  // Generate all XML entries from the deduplicated Map
  const allUrls = Array.from(sitemapEntries.entries())
    .map(([path, lastmod]) => generateSitemapEntry(path, lastmod))
    .join("");

  return new Response(wrapInUrlset(allUrls), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=59",
    },
  });
}
