import { DoctorProp } from './data/doctors';

interface PhysicianSchemaProps {
  doctors: DoctorProp[];
  wrapInItemList?: boolean;
}

/**
 * Reusable Physician Schema Component
 * Generates JSON-LD schema for physician(s) to improve SEO and Knowledge Graph presence
 * 
 * @param doctors - Array of doctor objects to generate schema for
 * @param wrapInItemList - If true, wraps physicians in an ItemList (useful for listing pages)
 */
export default function PhysicianSchema({ doctors, wrapInItemList = false }: PhysicianSchemaProps) {
  /**
   * `img.src` is a site-relative path for locally imported photos but an
   * absolute URL for providers whose photo is still hosted off-domain, so it
   * can't be blindly prefixed with the site origin.
   */
  const absoluteImageUrl = (doctor: DoctorProp) =>
    /^https?:\/\//.test(doctor.img.src)
      ? doctor.img.src
      : `https://mountainspineorthopedics.com${doctor.img.src}`;

  const worksFor = {
    "@type": "MedicalOrganization",
    "name": "Mountain Spine & Orthopedics",
    "url": "https://mountainspineorthopedics.com"
  };

  const generatePhysicianSchema = (doctor: DoctorProp) => {
    const shared = {
      "name": doctor.name,
      "image": absoluteImageUrl(doctor),
      "url": `https://mountainspineorthopedics.com/about/meetourdoctors/${doctor.slug}`,
      "jobTitle": doctor.practice,
      "knowsAbout": doctor.specialties, // DYNAMIC & SPECIFIC from data
      "worksFor": worksFor,
      "description": doctor.short_bio || doctor.desc,
      "sameAs": doctor.sameAs // DYNAMIC E-E-A-T SIGNAL from data
    };

    // schema.org has no Physician Assistant type, and `Physician` is a
    // MedicalOrganization subtype whose definition is "an individual
    // physician". Emitting it for a PA-C would assert a credential they do
    // not hold, so PAs are described as a Person carrying an explicit
    // physician-assistant credential instead.
    if (doctor.providerType === 'physician-assistant') {
      return {
        "@type": "Person",
        ...shared,
        "hasCredential": {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Board Certified Physician Assistant"
        }
      };
    }

    return {
      "@type": "Physician",
      ...shared,
      "medicalSpecialty": doctor.medicalSpecialty // DYNAMIC from data
    };
  };

  let schema;

  if (wrapInItemList) {
    // For listing pages (About, Find a Doctor)
    schema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": doctors.map((doctor, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": generatePhysicianSchema(doctor)
      }))
    };
  } else {
    // For single doctor pages or arrays of physicians
    schema = doctors.length === 1
      ? {
          "@context": "https://schema.org",
          ...generatePhysicianSchema(doctors[0])
        }
      : {
          "@context": "https://schema.org",
          "@graph": doctors.map(doctor => generatePhysicianSchema(doctor))
        };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

