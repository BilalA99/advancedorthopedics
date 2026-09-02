import { ClinicsProps } from '@/components/data/clinics';
import { buildCanonical } from '@/lib/seo';
import { MAIN_PHONE_E164, STATE_PHONE_NUMBERS } from '@/lib/locationConstants';

export function LocationItemListSchema({ clinics }: { clinics: ClinicsProps[] }) {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Mountain Spine & Orthopedics Clinic Locations",
    "description": "Find all official clinic locations for Mountain Spine & Orthopedics throughout Florida, New Jersey, New York, Pennsylvania, and Georgia for expert spine and joint care.",
    "url": buildCanonical('/locations'),
    "itemListElement": clinics.map((clinic, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "MedicalBusiness",
        "@id": buildCanonical(`/locations/${clinic.stateSlug}/${clinic.locationSlug}`), // Unique ID for this clinic
        "name": clinic.name,
        "url": buildCanonical(`/locations/${clinic.stateSlug}/${clinic.locationSlug}`),
        "address": {
          "@type": "PostalAddress",
          "streetAddress": clinic.address, // Include full address with suite
          "addressLocality": clinic.region.split(',')[0],
          "addressRegion": clinic.stateAbbr,
          "addressCountry": "US"
        },
        "telephone": STATE_PHONE_NUMBERS[clinic.stateSlug as keyof typeof STATE_PHONE_NUMBERS]?.e164 || MAIN_PHONE_E164,
      }
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
    />
  );
}
