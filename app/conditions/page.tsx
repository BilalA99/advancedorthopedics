import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { buildCanonical, canonicalForOg } from '@/lib/seo';
import { getOgImageForPath } from '@/lib/og';
import ConditionsHubClient from '@/components/ConditionsHubClient';
import { getVisibleReviews, isProviderVisible, providerIds } from '@/lib/providers/providerVisibility';
import { sitewideReviews } from '@/components/data/socialProofReviews';

export async function generateMetadata(): Promise<Metadata> {
  const url = buildCanonical('/conditions');
  const ogImage = getOgImageForPath('/conditions');

  return {
    title: "Orthopedic & Podiatric Conditions | Mountain Spine & Orthopedics",
    description: "Comprehensive guide to orthopedic and podiatric conditions. Expert diagnosis for back pain, neck pain, joint conditions, and foot/ankle problems. Board-certified specialists in FL, NJ, NY, and PA. Book a consultation today.",
    keywords: ["orthopedic conditions", "podiatric conditions", "spine conditions", "back pain", "neck pain", "joint conditions", "orthopedic specialists FL NJ NY PA"],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: "Orthopedic & Podiatric Conditions | Mountain Spine & Orthopedics",
      description: "Comprehensive guide to orthopedic and podiatric conditions. Expert diagnosis for back pain, neck pain, joint conditions, and more.",
      url: canonicalForOg('/conditions'),
      siteName: "Mountain Spine & Orthopedics",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Orthopedic Conditions & Treatments at Mountain Spine & Orthopedics",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Orthopedic Conditions & Treatments | Mountain Spine & Orthopedics",
      description: "Comprehensive guide to orthopedic and spine conditions. Expert diagnosis and treatment for back pain, neck pain, joint conditions, and more.",
      images: [ogImage],
    },
  };
}

export default function ConditionsPage() {
  return (
    <Suspense fallback={
      <main className="w-full flex flex-col items-center justify-center bg-white h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
        </div>
      </main>
    }>
      <ConditionsHubClient reviews={getVisibleReviews(sitewideReviews)} showFeaturedDoctor={isProviderVisible({ slug: providerIds.scottKatzman })} />
    </Suspense>
  );
}
