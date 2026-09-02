import { canonicalPathForPainArea, hasCrossCanonicalTarget } from "@/lib/areaOfPainCanonical";
import type { Metadata, ResolvingMetadata } from "next";
import { conditions } from "@/components/data/conditions";
import { conditions as painconditions } from "@/components/data/painconditions";
import { PainAreaTreatments } from "@/components/data/painareatreatments";
import { buildCanonical, safeTitle, safeDescription, normalizeUTF8 } from "@/lib/seo";
import { getOgImageForPath } from "@/lib/og";

export async function generateMetadata(
  { params }: { params: Promise<{ PainArea: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const conditionSlug = resolvedParams.PainArea;
  let data;

  // *** SELF-CANONICALIZATION FOR ALL PAIN PAGES ***
  const canonicalPath = canonicalPathForPainArea(`/area-of-pain/neck-and-shoulder-pain/${conditionSlug}`, conditionSlug);

  if (conditionSlug === "neck-and-shoulder-pain-treatment") {
    data = PainAreaTreatments.find((x) => x.slug === conditionSlug);
  } else {
    // Prefer painconditions for pain pages, fallback to conditions
    data = painconditions.find((x) => x.slug === conditionSlug);
    if (!data) {
      data = conditions.find((x) => x.slug === conditionSlug);
    }
  }

  if (!data) {
    const readableSlug = conditionSlug.replace(/-/g, " ");
    const title = `${readableSlug.replace(/\b\w/g, (l) => l.toUpperCase())} | Mountain Spine & Orthopedics`;
    const description = "Learn about orthopedic care and treatments.";
    
    // No matching condition record: this is a stub with a slug-derived title and
    // no H1. Keep it out of the index and emit no canonical rather than
    // advertising a thin page as canonical content.
    return {
      title,
      description,
      robots: { index: false, follow: true },
      openGraph: {
        title,
        description,
        type: "article",
        url: buildCanonical(canonicalPath),
        images: [
          {
            url: getOgImageForPath('/area-of-pain'),
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [getOgImageForPath('/area-of-pain')],
      },
    };
  }

  // Compute pain area in Title-Case
  const painArea = conditionSlug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  
  // Normalize and clean metadata
  const normalizedTitle = data.metaTitle ? normalizeUTF8(data.metaTitle) : undefined;
  const normalizedDesc = data.metaDesc ? normalizeUTF8(data.metaDesc) : undefined;
  
  // Title pattern - prefer data.metaTitle if available
  const title = safeTitle(normalizedTitle, `${painArea} | Orthopedic Pain Treatment in Florida | Mountain Spine & Orthopedics`);
  
  // Description - prefer data.metaDesc if available
  const description = safeDescription(normalizedDesc, `Learn causes, symptoms & minimally invasive treatments for ${painArea.toLowerCase()} at Mountain Spine & Orthopedics. Same-day appointments across Florida.`);

  return {
    title,
    description,
    keywords: data.keywords || [],
    // No /conditions equivalent to consolidate onto, so this page would stay a
    // self-canonical duplicate. Keep it reachable but out of the index.
    ...(hasCrossCanonicalTarget(conditionSlug)
      ? {}
      : { robots: { index: false, follow: true } }),
    alternates: { 
      canonical: buildCanonical(canonicalPath) 
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: buildCanonical(canonicalPath),
      images: [
        {
          url: getOgImageForPath('/area-of-pain'),
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [getOgImageForPath('/area-of-pain')],
    },
  };
}

export default function NeckAndShoulderPainAreaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
} 