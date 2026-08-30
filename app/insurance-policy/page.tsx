import { Metadata } from 'next';
import { buildCanonical } from '@/lib/seo';
import InsurancePolicyClient from './InsurancePolicyClient'

// BreadcrumbList Schema for navigation context
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://mountainspineorthopedics.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Insurance Policy",
      "item": "https://mountainspineorthopedics.com/insurance-policy"
    }
  ]
};

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
};

export const generateMetadata = (): Metadata => ({
  title: 'PPO Insurance Accepted | Mountain Spine & Orthopedics',
  description: 'Mountain Spine & Orthopedics is a PPO practice. We accept PPO plans from Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare and more — no referral needed. HMO plans are not accepted. Check your carrier before you book.',
  alternates: {
    canonical: buildCanonical('/insurance-policy'),
  },
  openGraph: {
    title: 'PPO Insurance Accepted | Mountain Spine & Orthopedics',
    description: 'Mountain Spine & Orthopedics is a PPO practice. We accept PPO plans from Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare and more — no referral needed. HMO plans are not accepted. Check your carrier before you book.',
    url: buildCanonical('/insurance-policy'),
    siteName: 'Mountain Spine & Orthopedics',
    type: 'website',
    images: [
      {
        url: '/InsuranceLanding.png',
        width: 1200,
        height: 630,
        alt: 'Insurance Policy at Mountain Spine & Orthopedics',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PPO Insurance Accepted | Mountain Spine & Orthopedics',
    description: 'Mountain Spine & Orthopedics is a PPO practice. We accept PPO plans from Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare and more — no referral needed. HMO plans are not accepted. Check your carrier before you book.',
    images: ['/InsuranceLanding.png'],
  },
})

export default function InsurancePolicy() {
  return (
    <>
      {/* JSON-LD Schema Markup for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalOrganizationSchema) }} />
      
      <InsurancePolicyClient />
    </>
  )
}
