import type { Metadata } from "next";
import { buildCanonical, canonicalForOg } from "@/lib/seo";
import { getOgImageForPath } from "@/lib/og";

export const metadata: Metadata = {
  title: 'Orthopedic Condition Checker | Mountain Spine & Orthopedics',
  description: 'Answer a few quick questions to see if you\'re a candidate for minimally invasive spine or joint treatment. Takes less than 2 minutes.',
  alternates: { 
    canonical: buildCanonical('/condition-check') 
  },
  openGraph: {
    title: 'Orthopedic Condition Checker | Mountain Spine & Orthopedics',
    description: 'Answer a few quick questions to see if you\'re a candidate for minimally invasive spine or joint treatment. Takes less than 2 minutes.',
    url: canonicalForOg('/condition-check'),
    siteName: 'Mountain Spine & Orthopedics',
    type: 'website',
    images: [
      {
        url: getOgImageForPath('/'),
        width: 1200,
        height: 630,
        alt: 'Doctor Diagnosing a Patient',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Orthopedic Condition Checker | Mountain Spine & Orthopedics',
    description: 'Answer a few quick questions to see if you\'re a candidate for minimally invasive spine or joint treatment. Takes less than 2 minutes.',
    images: [getOgImageForPath('/')],
  },
  robots: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 },
};

export default function ConditionCheckLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
    </div>
  );
} 
