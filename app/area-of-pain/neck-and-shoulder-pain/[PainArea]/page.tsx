import { selectProvidersForPage } from "@/lib/providers/selectProviders";
import { conditions } from '@/components/data/conditions'
import { conditions as painconditions } from '@/components/data/painconditions'
import { getVisibleProviders } from '@/lib/providers/providerVisibility'
import { PainAreaTreatments } from '@/components/data/painareatreatments'
import { notFound } from 'next/navigation'
import { PainAreaClient } from './PainAreaClient'

export async function generateStaticParams() {
  const conditionSlugs = conditions.map((c) => c.slug)
  const painSlugs = painconditions.map((c) => c.slug)
  const allSlugs = Array.from(new Set([...painSlugs, ...conditionSlugs, 'neck-and-shoulder-pain-treatment']))
  return allSlugs.map((PainArea) => ({ PainArea }))
}


export default async function PainArea({ params }: { params: Promise<{ PainArea: string }> }) {
  const { PainArea } = await params;
  let condition_details;
  let specialtySlugs: string[] = [];

  if (PainArea === 'neck-and-shoulder-pain-treatment') {
    condition_details = (await import('@/components/data/painareatreatments')).PainAreaTreatments.find(
      (x) => x.slug === PainArea
    );
  } else {
    // Prefer painconditions for pain pages, fallback to conditions
    condition_details = painconditions.find((x) => x.slug === PainArea);
    if (!condition_details) {
      condition_details = conditions.find((x) => x.slug === PainArea);
    }
  }

  if (!condition_details) {
    return notFound();
  }

  // Get specialty slugs for cross-linking
  specialtySlugs = conditions.map(x => x.slug);

  const randomDoctors = selectProvidersForPage(getVisibleProviders(), PainArea);

  return <PainAreaClient condition_details={condition_details} randomDoctors={randomDoctors} specialtySlugs={specialtySlugs} />;
}
