import React from 'react';
import Link from 'next/link';
import { conditions } from '@/components/data/conditions';
import { AllTreatmentsCombined } from '@/components/data/treatments';
import { resolveConditionSlugHref } from '@/lib/internal-link-redirects';

interface LocationSeoSectionsProps {
  cityName: string;
  stateAbbr: string;
  nearbyAreas?: string[]; // Areas served from location data
}

// Helper function to check if a tag matches any of the tagMatchers (case-insensitive)
function matchesTag(tag: string | undefined, tagMatchers: string[]): boolean {
  if (!tag) return false;
  return tagMatchers.some(matcher => 
    tag.toLowerCase() === matcher.toLowerCase()
  );
}

// Body part groups for organization
const BODY_PART_GROUPS = [
  {
    title: 'Spine',
    tagMatchers: ['Spine', 'Lower Spine'],
    conditionSlug: 'spine',
    priorityConditions: [
      'herniated-disc',
      'bulging-disc',
      'sciatica',
      'spinal-stenosis',
      'degenerative-disc-disease',
      'pinched-nerve',
    ],
    priorityTreatments: [
      'lumbar-microdiscectomy-surgery',
      'lumbar-laminectomy-surgery',
      'spinal-fusion',
      'acdf-surgery',
      'artificial-disc-replacement-surgery',
      'adult-scoliosis-surgery',
    ],
  },
  {
    title: 'Knee',
    tagMatchers: ['Knee'],
    conditionSlug: 'knee',
    priorityConditions: [
      'knee-arthritis',
      'torn-meniscus',
      'acl-injury',
      'patellofemoral-pain-syndrome',
    ],
    priorityTreatments: [
      'total-knee-replacement',
      'arthroscopic-knee-surgery',
      'meniscus-repair-surgery',
      'acl-reconstruction-surgery',
    ],
  },
  {
    title: 'Hip',
    tagMatchers: ['Hip'],
    conditionSlug: 'hip',
    priorityConditions: [
      'hip-arthritis',
      'hip-labral-tear',
      'hip-bursitis',
      'hip-impingement',
    ],
    priorityTreatments: [
      'total-hip-replacement',
      'hip-arthroscopy-treatment',
    ],
  },
  {
    title: 'Shoulder',
    tagMatchers: ['Shoulder'],
    conditionSlug: 'shoulder',
    priorityConditions: [
      'rotator-cuff-tear',
      'shoulder-impingement',
      'frozen-shoulder',
      'slap-tear',
    ],
    priorityTreatments: [
      'rotator-cuff-repair-surgery',
      'shoulder-arthroscopy',
    ],
  },
  {
    title: 'Hand, Wrist & Elbow',
    tagMatchers: ['Hand', 'Wrist', 'Carpal Tunnel', 'Hand/Wrist', 'Elbow', 'Tennis Elbow'],
    conditionSlug: 'hand-wrist-elbow',
    priorityConditions: [
      'carpal-tunnel-syndrome',
      'trigger-finger',
      'tennis-elbow',
      'cubital-tunnel-syndrome',
    ],
    priorityTreatments: [
      'carpal-tunnel-release',
      'trigger-finger-release',
    ],
  },
  {
    title: 'Foot & Ankle',
    tagMatchers: ['Foot', 'Ankle'],
    conditionSlug: 'foot-ankle',
    priorityConditions: [
      'plantar-fasciitis',
      'achilles-tendonitis',
      'bunions-hallux-valgus',
    ],
    priorityTreatments: [
      'achilles-tendon-repair',
      'bunion-correction-surgery',
      'ankle-arthroscopy-minimally-invasive-surgery',
    ],
  },
];

export default function LocationSeoSections({ cityName, stateAbbr, nearbyAreas = [] }: LocationSeoSectionsProps) {
  // Helper to prioritize and limit items
  const prioritizeAndLimit = <T extends { slug: string }>(
    items: T[],
    prioritySlugs: string[],
    limit: number = 8
  ): T[] => {
    const prioritized: T[] = [];
    const others: T[] = [];

    items.forEach(item => {
      if (prioritySlugs.includes(item.slug)) {
        prioritized.push(item);
      } else {
        others.push(item);
      }
    });

    // Sort prioritized by priority order
    prioritized.sort((a, b) => {
      const aIndex = prioritySlugs.indexOf(a.slug);
      const bIndex = prioritySlugs.indexOf(b.slug);
      return aIndex - bIndex;
    });

    // Combine and limit
    return [...prioritized, ...others].slice(0, limit);
  };

  // Body-part hub links
  const bodyPartHubs = [
    { slug: 'spine', label: 'Spine Care' },
    { slug: 'knee', label: 'Knee Pain & Knee Surgery' },
    { slug: 'hip', label: 'Hip Pain & Hip Surgery' },
    { slug: 'shoulder', label: 'Shoulder Pain & Shoulder Surgery' },
    { slug: 'hand-wrist-elbow', label: 'Hand, Wrist & Elbow Care' },
    { slug: 'foot-ankle', label: 'Foot & Ankle Care' },
    { slug: 'sports-medicine', label: 'Sports Medicine & Athletic Injuries' },
    { slug: 'pain-management', label: 'Pain Management Procedures' },
  ];

  return (
    <>
      {/* Section 1: Services */}
      <section className="w-full max-w-[1440px] flex flex-col py-[50px] h-full px-2 md:px-[40px]">
        <h2
          style={{
            fontFamily: 'var(--font-public-sans)',
            fontWeight: 500,
          }}
          className="text-black text-5xl text-left w-full mb-6"
        >
          Services at Our {cityName}, {stateAbbr} Location
        </h2>
        {nearbyAreas.length > 0 && (
          <p
            style={{
              fontFamily: 'var(--font-public-sans)',
              fontWeight: 400,
            }}
            className="text-[#424959] text-lg mb-4"
          >
            Our {cityName} location provides comprehensive orthopedic and spine care to patients from {nearbyAreas.slice(0, 3).join(', ')}{nearbyAreas.length > 3 ? ', and surrounding areas' : ''}. We offer a full range of services organized by body area to address your specific needs.
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bodyPartHubs.map((hub) => (
            <Link
              key={hub.slug}
              href={`/conditions/${hub.slug}`}
              className="text-[#0A50EC] hover:underline text-lg font-medium"
            >
              {hub.label}
            </Link>
          ))}
          {/* There is no /injuries hub route; that href 404s. Point at the same
              entry point the primary navigation uses for this section. */}
          <Link
            href="/injuries/car-accident"
            className="text-[#0A50EC] hover:underline text-lg font-medium"
          >
            Injury Care & Treatment
          </Link>
        </div>
      </section>

      {/* Section 2: Conditions */}
      <section className="w-full max-w-[1440px] flex flex-col py-[50px] h-full px-2 md:px-[40px]">
        <h2
          style={{
            fontFamily: 'var(--font-public-sans)',
            fontWeight: 500,
          }}
          className="text-black text-5xl text-left w-full mb-6"
        >
          Conditions We Treat in {cityName}, {stateAbbr}
        </h2>
        {nearbyAreas.length > 0 && (
          <p
            style={{
              fontFamily: 'var(--font-public-sans)',
              fontWeight: 400,
            }}
            className="text-[#424959] text-lg mb-6"
          >
            Patients from {nearbyAreas.slice(0, 2).join(' and ')}{nearbyAreas.length > 2 ? `, ${nearbyAreas[2]}` : ''} visit our {cityName} clinic for expert diagnosis and treatment of orthopedic and spine conditions. Below are the most common conditions we treat, organized by body area.
          </p>
        )}

        {BODY_PART_GROUPS.map((group) => {
          const filteredConditions = conditions.filter(condition =>
            matchesTag(condition.tag, group.tagMatchers)
          );

          const displayedConditions = prioritizeAndLimit(
            filteredConditions,
            group.priorityConditions,
            8
          );

          if (displayedConditions.length === 0) return null;

          return (
            <div key={group.title} className="mb-8">
              <h3
                style={{
                  fontFamily: 'var(--font-public-sans)',
                  fontWeight: 500,
                }}
                className="text-black text-3xl text-left mb-4"
              >
                {group.title} Conditions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {displayedConditions.map((condition) => (
                  <Link
                    key={condition.slug}
                    href={resolveConditionSlugHref(condition.slug)}
                    className="text-[#0A50EC] hover:underline"
                  >
                    {condition.title}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Section 3: Treatments */}
      <section className="w-full max-w-[1440px] flex flex-col py-[50px] h-full px-2 md:px-[40px]">
        <h2
          style={{
            fontFamily: 'var(--font-public-sans)',
            fontWeight: 500,
          }}
          className="text-black text-5xl text-left w-full mb-6"
        >
          Treatments & Procedures in {cityName}, {stateAbbr}
        </h2>
        {nearbyAreas.length > 0 && (
          <p
            style={{
              fontFamily: 'var(--font-public-sans)',
              fontWeight: 400,
            }}
            className="text-[#424959] text-lg mb-6"
          >
            Our {cityName} orthopedic specialists use advanced, minimally invasive techniques to treat a wide range of conditions. We offer both surgical and non-surgical treatment options, tailored to each patient's needs and goals.
          </p>
        )}

        {BODY_PART_GROUPS.map((group) => {
          const filteredTreatments = AllTreatmentsCombined.filter(treatment =>
            matchesTag(treatment.tag, group.tagMatchers)
          );

          const displayedTreatments = prioritizeAndLimit(
            filteredTreatments,
            group.priorityTreatments,
            8
          );

          if (displayedTreatments.length === 0) return null;

          return (
            <div key={group.title} className="mb-8">
              <h3
                style={{
                  fontFamily: 'var(--font-public-sans)',
                  fontWeight: 500,
                }}
                className="text-black text-3xl text-left mb-4"
              >
                {group.title} Treatments
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {displayedTreatments.map((treatment) => (
                  <Link
                    key={treatment.slug}
                    href={`/treatments/${treatment.slug}`}
                    className="text-[#0A50EC] hover:underline"
                  >
                    {treatment.title}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
