import { conditions } from '@/components/data/conditions'
import { conditions as painconditions } from '@/components/data/painconditions'
import { getVisibleProviders } from '@/lib/providers/providerVisibility'
import { PainAreaTreatments } from '@/components/data/painareatreatments'
import { notFound } from 'next/navigation'
import { PainAreaClient } from './PainAreaClient'

export async function generateStaticParams() {
  const conditionSlugs = conditions.map((c) => c.slug)
  const painSlugs = painconditions.map((c) => c.slug)
  const allSlugs = Array.from(new Set([...painSlugs, ...conditionSlugs, 'back-pain-treatment-options']))
  return allSlugs.map((PainArea) => ({ PainArea }))
}

// This function shuffles an array and is used to display random doctors.
// It's defined here because it's only used for this server component.
function shuffleArray(array: any[]) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default async function PainArea({ params }: { params: Promise<{ PainArea: string }> }) {
  const { PainArea } = await params;
  let condition_details;
  let specialtySlugs: string[] = [];

  if (PainArea === 'back-pain-treatment-options') {
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
    // If the condition is not found, render the 404 page.
    return notFound();
  }

  // Get specialty slugs for cross-linking
  specialtySlugs = conditions.map(x => x.slug);

  // Select two random doctors to display on the page.
  const randomDoctors = shuffleArray(getVisibleProviders()).slice(0, 2);

  // Render the client component with the fetched data.
  // This server component does not render any JSX itself.
  return <PainAreaClient condition_details={condition_details} randomDoctors={randomDoctors} specialtySlugs={specialtySlugs} />;
}
