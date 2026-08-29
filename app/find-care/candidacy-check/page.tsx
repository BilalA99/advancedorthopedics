import { Metadata } from 'next'
import CandidacyCheckClient from '@/components/CandidacyCheckClient'
import { buildCanonical } from "@/lib/seo";
import { getOgImageForPath } from "@/lib/og";
import { getVisibleReviews } from "@/lib/providers/providerVisibility";
import { sitewideReviews } from "@/components/data/socialProofReviews";

// HowTo Schema for the candidacy check process
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Check Your Candidacy for Spine Surgery",
  "description": "Get a free spine surgery candidacy evaluation from our expert team in a few simple steps. Determine which minimally invasive treatments may be right for your condition.",
  "totalTime": "PT3M",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "USD",
    "value": "0"
  },
  "step": [
    {
      "@type": "HowToStep",
      "name": "Pain Assessment",
      "text": "Answer questions about pain location, duration, and severity to help our specialists evaluate treatment options.",
      "url": "https://mountainspineorthopedics.com/find-care/candidacy-check#step-1"
    },
    {
      "@type": "HowToStep",
      "name": "Symptom Evaluation",
      "text": "Identify related symptoms and aggravating activities. This helps determine optimal treatment approaches for effective pain management.",
      "url": "https://mountainspineorthopedics.com/find-care/candidacy-check#step-2"
    },
    {
      "@type": "HowToStep",
      "name": "Provide Your Profile",
      "text": "Share basic information so our specialists can provide a preliminary assessment of treatment candidacy.",
      "url": "https://mountainspineorthopedics.com/find-care/candidacy-check#step-3"
    }
  ],
  "supply": [
    {
      "@type": "HowToSupply",
      "name": "Computer or mobile device"
    },
    {
      "@type": "HowToSupply",
      "name": "Internet connection"
    },
    {
      "@type": "HowToSupply",
      "name": "Medical records (if available)"
    }
  ],
  "tool": [
    {
      "@type": "HowToTool",
      "name": "Mountain Spine & Orthopedics Candidacy Checker"
    }
  ]
}

// MedicalOrganization Schema for brand consistency
const medicalOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "name": "Mountain Spine & Orthopedics",
  "description": "Leading spine and orthopedic specialists in Florida providing advanced minimally invasive treatments, including Band-Aid Back Surgery, laser spine procedures, and comprehensive pain management.",
  "url": "https://mountainspineorthopedics.com",
  "logo": "https://mountainspineorthopedics.com/newlogo4.png",
  "image": "https://mountainspineorthopedics.com/herosectionimg.jpg",
  "telephone": [
    "(561) 223-9959",
    "(754) 212-8736",
    "(407) 565-7598",
    "(407) 960-1717",
    "(863) 777-5805",
    "(561) 556-1802",
    "(954) 987-2047",
    "(561) 544-5501"
  ],
  "medicalSpecialty": [
    "Orthopedic Surgery",
    "Spine Surgery",
    "Sports Medicine",
    "Pain Management",
    "Minimally Invasive Surgery",
    "Joint Replacement",
    "Spinal Fusion",
    "Discectomy",
    "Arthroscopy"
  ],
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 27.7663,
      "longitude": -82.6404
    },
    "geoRadius": "300000"
  },
  "areaServed": [
    "Florida",
    "Hollywood, FL",
    "Orlando, FL",
    "Altamonte Springs, FL",
    "Davenport, FL",
    "Fort Pierce, FL",
    "Palm Beach Gardens, FL",
    "South Miami, FL",
    "Boca Raton, FL"
  ]
}

export const metadata: Metadata = {
  title: 'Free Spine Surgery Candidacy Check | Mountain Spine & Orthopedics',
  description: 'Get a free spine surgery candidacy evaluation from our expert team. Determine which treatments may be right for your condition with our comprehensive assessment tool.',
  openGraph: {
    title: 'Free Spine Surgery Candidacy Check | Mountain Spine & Orthopedics',
    description: 'Get a free spine surgery candidacy evaluation from our expert team. Determine which treatments may be right for your condition with our comprehensive assessment tool.',
    type: 'website',
    url: buildCanonical('/find-care/candidacy-check'),
    images: [
      {
        url: getOgImageForPath('/find-care'),
        width: 1200,
        height: 630,
        alt: 'Free Spine Surgery Candidacy Check at Mountain Spine & Orthopedics',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Spine Surgery Candidacy Check | Mountain Spine & Orthopedics',
    description: 'Get a free spine surgery candidacy evaluation from our expert team. Determine which treatments may be right for your condition with our comprehensive assessment tool.',
    images: [getOgImageForPath('/find-care')],
  },
  alternates: {
    canonical: buildCanonical('/find-care/candidacy-check'),
  },
}

export default function CandidacyCheckPage() {
  return (
    <>
      {/* JSON-LD Schema Markup for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalOrganizationSchema) }} />
      
      <CandidacyCheckClient reviews={getVisibleReviews(sitewideReviews)} />
    </>
  )
}
