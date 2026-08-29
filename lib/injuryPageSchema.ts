import { injuryLocations } from './injuryLocations';

export function buildInjuryMedicalWebPageSchema(opts: {
  url: string;
  headline: string;
  description: string;
  injuryName: string;
  alternateNames: string[];
  anatomy: string[];
  treatments: string[];
  symptoms: string[];
  breadcrumbLabel: string;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    headline: opts.headline,
    description: opts.description,
    url: opts.url,
    author: {
      '@type': 'Organization',
      name: 'Mountain Spine & Orthopedics',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Mountain Spine & Orthopedics',
      url: 'https://mountainspineorthopedics.com',
    },
    mainEntity: {
      '@type': 'MedicalCondition',
      name: opts.injuryName,
      alternateName: opts.alternateNames,
      relevantSpecialty: {
        '@type': 'MedicalSpecialty',
        name: 'Orthopedic Surgery',
      },
      signOrSymptom: opts.symptoms.map((s) => ({
        '@type': 'MedicalSymptom',
        name: s,
      })),
      possibleTreatment: opts.treatments.map((t) => ({
        '@type': 'MedicalTherapy',
        name: t,
      })),
      associatedAnatomy: opts.anatomy.map((a) => ({
        '@type': 'AnatomicalStructure',
        name: a,
      })),
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://mountainspineorthopedics.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: opts.breadcrumbLabel,
          item: opts.url,
        },
      ],
    },
  };
}

export function buildInjuryClinicItemListSchema(opts: {
  injuryPageUrl: string;
  availableService: string;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Mountain Spine & Orthopedics — ${opts.availableService} Clinics`,
    url: opts.injuryPageUrl,
    numberOfItems: injuryLocations.length,
    itemListElement: injuryLocations.map((loc, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'MedicalClinic',
        name: `Mountain Spine & Orthopedics — ${loc.city}${loc.neighborhood ? ` (${loc.neighborhood})` : ''}`,
        url: `https://mountainspineorthopedics.com/locations/${loc.stateSlug}/${loc.slug}`,
        telephone: '+15612239959',
        availableService: {
          '@type': 'MedicalTherapy',
          name: opts.availableService,
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: loc.address.split(',')[0].trim(),
          addressLocality: loc.city,
          addressRegion: loc.state,
          postalCode: loc.zip,
          addressCountry: 'US',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: loc.lat,
          longitude: loc.lng,
        },
      },
    })),
  };
}

export function buildInjuryFAQPageSchema(
  faqs: Array<{ q: string; a: string }>,
  pageUrl: string
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    url: pageUrl,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };
}
