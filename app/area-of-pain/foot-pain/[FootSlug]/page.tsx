import { selectProvidersForPage } from "@/lib/providers/selectProviders";
import { conditions } from '@/components/data/conditions'
import { conditions as painconditions } from '@/components/data/painconditions'
import { getVisibleProviders } from '@/lib/providers/providerVisibility'
import { PainAreaTreatments } from '@/components/data/painareatreatments'
import { notFound } from 'next/navigation'
import { FootPainAreaClient } from './FootPainAreaClient'

export async function generateStaticParams() {
  const conditionSlugs = conditions.map((c) => c.slug)
  const painSlugs = painconditions.map((c) => c.slug)
  const allSlugs = Array.from(new Set([...painSlugs, ...conditionSlugs, 'footpaintreatmentoptions']))
  return allSlugs.map((FootSlug) => ({ FootSlug }))
}


export default async function FootPainArea({ params }: { params: Promise<{ FootSlug: string }> }) {
  const { FootSlug } = await params;
  let condition_details;
  let specialtySlugs: string[] = [];

  if (FootSlug === 'footpaintreatmentoptions') {
    condition_details = (await import('@/components/data/painareatreatments')).PainAreaTreatments.find(
      (x) => x.slug === FootSlug
    );
  } else {
    // Prefer painconditions for pain pages, fallback to conditions
    condition_details = painconditions.find((x) => x.slug === FootSlug);
    if (!condition_details) {
      condition_details = conditions.find((x) => x.slug === FootSlug);
    }
  }

  if (!condition_details) {
    return notFound();
  }

  // Get specialty slugs for cross-linking
  specialtySlugs = conditions.map(x => x.slug);

  const randomDoctors = selectProvidersForPage(getVisibleProviders(), FootSlug);

  return <FootPainAreaClient condition_details={condition_details} randomDoctors={randomDoctors} specialtySlugs={specialtySlugs} />;
}
