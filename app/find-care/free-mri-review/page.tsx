import { buildCanonical } from "@/lib/seo";
import { getOgImageForPath } from "@/lib/og";

// HowTo Schema for the MRI review process
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Get a Free MRI Review from an Orthopedic Specialist",
  "description": "Submit your MRI scans securely and receive a complimentary review from our board-certified spine specialists within 24 hours.",
  "totalTime": "PT5M",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "USD",
    "value": "0"
  },
  "step": [
    {
      "@type": "HowToStep",
      "name": "Fill Out Your Contact Information",
      "text": "Provide your name, email, and phone number so our patient advocates can contact you with your results.",
      "url": "https://mountainspineorthopedics.com/find-care/free-mri-review#step-1"
    },
    {
      "@type": "HowToStep",
      "name": "Upload Your MRI or X-ray Files",
      "text": "Securely upload your imaging files directly through our HIPAA-compliant portal for our specialists to review.",
      "url": "https://mountainspineorthopedics.com/find-care/free-mri-review#step-2"
    },
    {
      "@type": "HowToStep",
      "name": "Receive Your Expert Review",
      "text": "A board-certified orthopedic spine specialist will review your scans and a patient advocate will contact you within 24 hours to discuss the findings and potential next steps.",
      "url": "https://mountainspineorthopedics.com/find-care/free-mri-review#step-3"
    }
  ],
  "supply": [
    {
      "@type": "HowToSupply",
      "name": "MRI or X-ray scan files"
    },
    {
      "@type": "HowToSupply",
      "name": "Computer or mobile device"
    }
  ],
  "tool": [
    {
      "@type": "HowToTool",
      "name": "Mountain Spine & Orthopedics Secure Upload Portal"
    }
  ]
};

// MedicalOrganization Schema for brand consistency
const medicalOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "name": "Mountain Spine & Orthopedics",
  "description": "Leading spine and orthopedic specialists providing advanced minimally invasive treatments, including Band-Aid Back Surgery, laser spine procedures, and comprehensive pain management. Serving patients across Florida, New Jersey, New York, and Pennsylvania.",
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
    "New Jersey",
    "New York",
    "Pennsylvania"
  ]
};

export const metadata = {
  title: 'Free MRI Review | Mountain Spine & Orthopedics',
  description: 'Get a complimentary MRI review from board-certified orthopedic spine specialists. Submit your scans securely and receive expert insights today.',
  alternates: {
    canonical: buildCanonical('/find-care/free-mri-review'),
  },
  openGraph: {
    title: 'Free MRI Review | Mountain Spine & Orthopedics',
    description: 'Get a complimentary MRI review from board-certified orthopedic spine specialists. Submit your scans securely and receive expert insights today.',
    type: 'website',
    url: buildCanonical('/find-care/free-mri-review'),
    images: [
      {
        url: getOgImageForPath('/find-care/free-mri-review'),
        width: 1200,
        height: 630,
        alt: 'Free MRI Review at Mountain Spine & Orthopedics',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free MRI Review | Mountain Spine & Orthopedics',
    description: 'Get a complimentary MRI review from board-certified orthopedic spine specialists. Submit your scans securely and receive expert insights today.',
    images: [getOgImageForPath('/find-care/free-mri-review')],
  },
  keywords: [
    'free MRI review',
    'orthopedic MRI',
    'spine specialist Florida',
    'MRI scan review',
    'Mountain Spine & Orthopedics',
    'virtual MRI review',
    'orthopedic care',
    'spine doctor'
  ],
  robots: {
    index: true,
    follow: true
  }
};

import FreeMRIReviewClient from './FreeMRIReviewClient'
import { getVisibleReviews } from '@/lib/providers/providerVisibility'
import { sitewideReviews } from '@/components/data/socialProofReviews'

export default function FreeMRIReview() {
  return (
    <>
      {/* JSON-LD Schema Markup for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalOrganizationSchema) }} />
      
      <FreeMRIReviewClient reviews={getVisibleReviews(sitewideReviews)} />
      <section className="mt-8 mb-8 w-full flex justify-center">
        <p className="text-sm text-gray-600 max-w-2xl text-center">
          Learn more about our{' '}
          <a href="/treatments/non-surgical-treatments-for-pain-management" className="text-blue-600 underline">non-surgical pain management treatments</a>{' '}or explore our full list of{' '}
          <a href="/locations" className="text-blue-600 underline">clinic locations</a>.
        </p>
      </section>
    </>
  );
}


