import { buildCanonical } from "@/lib/seo";
import { getOgImageForPath } from "@/lib/og";

export const metadata = {
  title: 'Orthopedic Clinic Locations in Florida, New Jersey, New York, Pennsylvania & Georgia | Mountain Spine & Orthopedics',
  description: 'Find expert orthopedic and spine care near you. Mountain Spine & Orthopedics locations across Florida, New Jersey, New York, Pennsylvania, and Georgia. Same-day and next-day appointments available. Book your consultation today.',
  keywords: [
    'orthopedic clinic locations',
    'orthopedic surgeon near me',
    'spine surgeon near me',
    'Florida orthopedic clinic',
    'New Jersey orthopedic clinic',
    'New York orthopedic clinic',
    'Pennsylvania orthopedic clinic',
    'orthopedic specialist Florida',
    'spine clinic Florida',
    'joint pain doctor',
    'back pain clinic',
    'sports injury doctor',
    'orthopedic same-day appointments',
    'orthopedic doctor near me',
    'orthopedic clinic near me',
    'joint replacement',
    'spine surgery',
    'Mountain Spine & Orthopedics locations',
    'best orthopedic clinic',
    'orthopedic specialist near me'
  ],
  openGraph: {
    title: 'Orthopedic Clinic Locations in FL, NJ, NY, PA & GA | Mountain Spine & Orthopedics',
    description: 'Find all Mountain Spine & Orthopedics clinic locations across Florida, New Jersey, New York, Pennsylvania, and Georgia. Expert spine and joint care near you.',
    url: buildCanonical('/locations'),
    siteName: 'Mountain Spine & Orthopedics',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: getOgImageForPath('/locations'),
        width: 1200,
        height: 630,
        alt: 'Mountain Spine & Orthopedics clinic locations across FL, NJ, NY, PA and GA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Orthopedic Clinic Locations in FL, NJ, NY, PA & GA | Mountain Spine & Orthopedics',
    description: 'Find all Mountain Spine & Orthopedics clinic locations across Florida, New Jersey, New York, Pennsylvania, and Georgia. Expert spine and joint care near you.',
    images: [getOgImageForPath('/locations')],
  },
  alternates: {
    canonical: buildCanonical('/locations'),
  },
};

import LocationsClient from './LocationsClient';
import { clinics } from '@/components/data/clinics';
import { LocationItemListSchema } from '@/components/LocationItemListSchema';

// BreadcrumbList Schema
const BreadcrumbSchema = () => {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': buildCanonical('/')
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Locations',
        'item': buildCanonical('/locations')
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
};

// CollectionPage Schema
const LocationsCollectionPageSchema = () => {
  const itemListReference = {
    "@type": "ItemList",
    "name": "Mountain Spine & Orthopedics Clinic Locations",
    "numberOfItems": clinics.length,
    "url": buildCanonical('/locations'),
  };

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': 'Orthopedic Clinic Locations in Florida, New Jersey, New York, Pennsylvania & Georgia | Mountain Spine & Orthopedics',
    'description': 'Find expert orthopedic and spine care near you. Mountain Spine & Orthopedics locations across Florida, New Jersey, New York, Pennsylvania, and Georgia. Same-day and next-day appointments available. Book your consultation today.',
    'url': buildCanonical('/locations'),
    'mainEntity': itemListReference,
    'about': {
      '@type': 'MedicalOrganization',
      'name': 'Mountain Spine & Orthopedics'
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
    />
  );
};

// Locations Hub FAQs Schema
const LocationsFAQSchema = () => {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'How do I choose the best location near me?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Choose the closest clinic in your state, then select the office that\'s most convenient for commuting and scheduling. If you\'re unsure, call our scheduling team: FL (561) 223-9959, NJ (973) 259-6756, NY (646) 389-5606, PA (215) 436-9496, or GA (404) 913-6886, and we\'ll recommend the best location based on your symptoms and availability.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Do you offer same-day or next-day appointments?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Availability varies by location and day, but many offices can accommodate urgent musculoskeletal concerns quickly. Call to check the earliest openings.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Do I need a referral to see an orthopedic specialist?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Referral requirements depend on your insurance plan. If you tell us your coverage, we can confirm what\'s needed before scheduling.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What conditions do you treat at your locations?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Our clinics commonly evaluate back pain, neck pain, sciatica, herniated discs, arthritis, joint injuries, and sports-related injuries. Your location page also lists local services and common conditions treated.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What should I bring to my appointment?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Bring your ID, insurance card, a list of medications, and any imaging reports or prior medical records related to your symptoms.'
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
};

export default function LocationsPage() {
  return (
    <>
      <BreadcrumbSchema />
      <LocationsCollectionPageSchema />
      <LocationItemListSchema clinics={clinics} />
      <LocationsFAQSchema />
      <LocationsClient />
    </>
  );
}
