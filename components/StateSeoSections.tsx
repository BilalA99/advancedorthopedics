import React from 'react';
import Link from 'next/link';
import { conditions } from '@/components/data/conditions';
import { AllTreatmentsCombined } from '@/components/data/treatments';
import { resolveConditionSlugHref } from '@/lib/internal-link-redirects';

interface StateSeoSectionsProps {
  stateName: string;
  stateSlug: string;
  nearbyRegions?: string[];
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
      'microdiscectomy',
      'laminectomy',
      'spinal-fusion',
      'acdf',
      'artificial-disc-replacement',
    ],
  },
  {
    title: 'Knee',
    tagMatchers: ['Knee'],
    conditionSlug: 'knee',
    priorityConditions: [
      'knee-arthritis',
      'meniscus-tear',
      'acl-tear',
      'mcl-injury',
      'lcl-injury',
      'patellofemoral-pain',
    ],
    priorityTreatments: [
      'total-knee-replacement',
      'knee-arthroscopy',
      'meniscus-repair',
      'acl-reconstruction',
    ],
  },
  {
    title: 'Hip',
    tagMatchers: ['Hip'],
    conditionSlug: 'hip',
    priorityConditions: [
      'hip-arthritis',
      'labral-tear',
      'hip-bursitis',
      'hip-impingement',
    ],
    priorityTreatments: [
      'total-hip-replacement',
      'hip-arthroscopy',
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
      'labral-tear',
    ],
    priorityTreatments: [
      'rotator-cuff-repair',
      'shoulder-arthroscopy',
    ],
  },
  {
    title: 'Hand, Wrist & Elbow',
    tagMatchers: ['Hand', 'Wrist', 'Carpal Tunnel', 'Hand/Wrist', 'Elbow', 'Tennis Elbow'],
    conditionSlug: 'hand-wrist-elbow',
    priorityConditions: [
      'carpal-tunnel',
      'trigger-finger',
      'tennis-elbow',
      'cubital-tunnel',
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
      'achilles-tendinitis',
      'ankle-sprain',
      'bunions',
    ],
    priorityTreatments: [
      'achilles-repair',
      'bunion-surgery',
      'ankle-arthroscopy',
    ],
  },
  {
    title: 'Sports Medicine',
    tagMatchers: ['Sports Medicine', 'Sports Injury'],
    conditionSlug: 'sports-medicine',
    priorityConditions: [
      'sports-injury',
      'acl-tear',
      'meniscus-tear',
    ],
    priorityTreatments: [
      'acl-reconstruction',
      'meniscus-repair',
      'knee-arthroscopy',
    ],
  },
  {
    title: 'Pain Management',
    tagMatchers: ['Pain Management'],
    conditionSlug: 'pain-management',
    priorityConditions: [],
    priorityTreatments: [
      'epidural-steroid-injection',
      'facet-injection',
      'cortisone-injections-for-back-pain',
    ],
  },
];

// State-specific intro copy for Services section
const getStateServicesIntro = (stateName: string, stateSlug: string): string => {
  const intros: Record<string, string> = {
    florida: `At Mountain Spine & Orthopedics, we provide comprehensive orthopedic and spine care across Florida through our network of convenient locations. Our board-certified specialists offer same-day and next-day appointments for urgent orthopedic needs, ensuring you receive timely care when you need it most. We specialize in minimally invasive procedures and advanced diagnostic capabilities to help patients throughout Florida.`,
    'new-jersey': `Our New Jersey locations provide expert orthopedic and spine care to patients across North, Central, and South Jersey. With convenient access via major corridors including the Garden State Parkway and Route 22, our board-certified specialists offer same-day and next-day appointments when available. We serve patients from Essex County, Middlesex County, and surrounding communities with advanced orthopedic care.`,
    'new-york': `Our New York location offers accessible orthopedic and spine care with convenient parking and easy transit access for patients throughout Manhattan, Brooklyn, Queens, and surrounding areas. Our board-certified specialists provide same-day and next-day appointments when available, ensuring you receive timely expert care. We focus on minimally invasive techniques and personalized treatment plans.`,
    pennsylvania: `Mountain Spine & Orthopedics provides comprehensive orthopedic and spine care across Pennsylvania through convenient locations with accessible parking for easy appointments. Our board-certified specialists offer same-day and next-day scheduling when available, ensuring timely access to expert orthopedic care. We serve patients throughout the state with advanced diagnostic and treatment capabilities.`,
  };
  return intros[stateSlug] || `Our ${stateName} locations provide comprehensive orthopedic and spine care with board-certified specialists offering same-day and next-day appointments when available. We specialize in advanced diagnostic imaging and personalized treatment plans.`;
};

// State-specific intro copy for Conditions section
const getStateConditionsIntro = (stateName: string, stateSlug: string): string => {
  const intros: Record<string, string> = {
    florida: `Our Florida orthopedic specialists evaluate and treat a comprehensive range of conditions affecting the spine, joints, and musculoskeletal system. From common issues like herniated discs and arthritis to sports injuries and work-related conditions, we provide expert diagnosis and personalized treatment plans.`,
    'new-jersey': `Patients throughout New Jersey visit our clinics for expert evaluation and treatment of orthopedic and spine conditions. Our specialists commonly address back pain, neck pain, joint arthritis, sports injuries, and work-related musculoskeletal conditions with advanced diagnostic capabilities and evidence-based care.`,
    'new-york': `Our New York orthopedic specialists provide comprehensive evaluation and treatment for conditions affecting the spine, joints, and musculoskeletal system. We commonly treat back pain, neck pain, joint arthritis, sports injuries, and repetitive strain conditions with personalized treatment plans tailored to each patient's needs.`,
    pennsylvania: `Our Pennsylvania orthopedic specialists evaluate and treat a wide range of conditions affecting the spine, joints, and musculoskeletal system. We provide expert diagnosis for common issues including back pain, joint arthritis, sports injuries, and work-related conditions with advanced imaging and personalized care.`,
  };
  return intros[stateSlug] || `Our ${stateName} orthopedic specialists evaluate and treat a comprehensive range of conditions affecting the spine, joints, and musculoskeletal system with expert diagnosis and personalized treatment plans.`;
};

// State-specific intro copy for Treatments section
const getStateTreatmentsIntro = (stateName: string, stateSlug: string): string => {
  const intros: Record<string, string> = {
    florida: `Our Florida locations offer both surgical and non-surgical treatment options, tailored to each patient's condition and goals. We specialize in minimally invasive techniques when appropriate, which can reduce recovery time and post-operative discomfort. Our specialists work closely with patients to develop personalized treatment plans.`,
    'new-jersey': `Our New Jersey orthopedic specialists use advanced, minimally invasive techniques to treat a wide range of conditions. We offer both surgical and non-surgical treatment options, including targeted injections and advanced surgical procedures, tailored to each patient's specific needs and lifestyle goals.`,
    'new-york': `Our New York location offers both surgical and non-surgical treatment options using advanced, minimally invasive techniques. We tailor treatment plans to each patient's condition, activity level, and goals, ensuring the most appropriate approach for optimal outcomes.`,
    pennsylvania: `Our Pennsylvania locations provide both surgical and non-surgical treatment options using advanced orthopedic techniques. We specialize in minimally invasive approaches when appropriate and develop personalized treatment plans based on each patient's condition and goals.`,
  };
  return intros[stateSlug] || `Our ${stateName} locations offer both surgical and non-surgical treatment options using advanced techniques, tailored to each patient's condition and goals.`;
};

export default function StateSeoSections({ stateName, stateSlug, nearbyRegions = [] }: StateSeoSectionsProps) {
  // Helper to prioritize and limit items
  const prioritizeAndLimit = <T extends { slug: string }>(
    items: T[],
    prioritySlugs: string[],
    limit: number = 10
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
    { slug: 'spine', label: 'Spine Care', href: '/conditions/spine' },
    { slug: 'knee', label: 'Knee Pain & Knee Surgery', href: '/conditions/knee' },
    { slug: 'hip', label: 'Hip Pain & Hip Surgery', href: '/conditions/hip' },
    { slug: 'shoulder', label: 'Shoulder Pain & Shoulder Surgery', href: '/conditions/shoulder' },
    { slug: 'hand-wrist-elbow', label: 'Hand, Wrist & Elbow Care', href: '/conditions/hand-wrist-elbow' },
    { slug: 'foot-ankle', label: 'Foot & Ankle Care', href: '/conditions/foot-ankle' },
    { slug: 'sports-medicine', label: 'Sports Medicine & Athletic Injuries', href: '/conditions/sports-medicine' },
    { slug: 'pain-management', label: 'Pain Management Procedures', href: '/conditions/pain-management' },
    // There is no /injuries hub route; that href 404s. Point at the same entry
    // point the primary navigation uses for this section.
    { slug: 'injuries', label: 'Injury Care & Treatment', href: '/injuries/car-accident' },
  ];

  return (
    <>
      {/* Section 1: Orthopedic Services Available Across {stateName} */}
      <section className="w-full max-w-[1440px] flex flex-col py-[50px] h-full px-2 md:px-[40px] mx-auto">
        <h2
          style={{
            fontFamily: 'var(--font-public-sans)',
            fontWeight: 500,
          }}
          className="text-black text-5xl text-left w-full mb-6"
        >
          Orthopedic Services Available Across {stateName}
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-public-sans)',
            fontWeight: 400,
          }}
          className="text-[#424959] text-lg mb-6 leading-relaxed"
        >
          {getStateServicesIntro(stateName, stateSlug)}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bodyPartHubs.map((hub) => (
            <Link
              key={hub.slug}
              href={hub.href}
              className="text-[#0A50EC] hover:underline text-lg font-medium"
            >
              {hub.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Section 2: Top Conditions We Treat in {stateName} */}
      <section className="w-full max-w-[1440px] flex flex-col py-[50px] h-full px-2 md:px-[40px] mx-auto">
        <h2
          style={{
            fontFamily: 'var(--font-public-sans)',
            fontWeight: 500,
          }}
          className="text-black text-5xl text-left w-full mb-6"
        >
          Top Conditions We Treat in {stateName}
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-public-sans)',
            fontWeight: 400,
          }}
          className="text-[#424959] text-lg mb-6 leading-relaxed"
        >
          {getStateConditionsIntro(stateName, stateSlug)}
        </p>

        {BODY_PART_GROUPS.map((group) => {
          const filteredConditions = conditions.filter(condition =>
            matchesTag(condition.tag, group.tagMatchers)
          );

          const displayedConditions = prioritizeAndLimit(
            filteredConditions,
            group.priorityConditions,
            10
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

      {/* Section 3: Treatments & Procedures Offered in {stateName} */}
      <section className="w-full max-w-[1440px] flex flex-col py-[50px] h-full px-2 md:px-[40px] mx-auto">
        <h2
          style={{
            fontFamily: 'var(--font-public-sans)',
            fontWeight: 500,
          }}
          className="text-black text-5xl text-left w-full mb-6"
        >
          Treatments & Procedures Offered in {stateName}
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-public-sans)',
            fontWeight: 400,
          }}
          className="text-[#424959] text-lg mb-6 leading-relaxed"
        >
          {getStateTreatmentsIntro(stateName, stateSlug)}
        </p>

        {BODY_PART_GROUPS.map((group) => {
          const filteredTreatments = AllTreatmentsCombined.filter(treatment =>
            matchesTag(treatment.tag, group.tagMatchers)
          );

          const displayedTreatments = prioritizeAndLimit(
            filteredTreatments,
            group.priorityTreatments,
            10
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

      {/* Section 4: Areas We Serve in {stateName} */}
      <section className="w-full max-w-[1440px] flex flex-col py-[50px] h-full px-2 md:px-[40px] mx-auto">
        <h2
          style={{
            fontFamily: 'var(--font-public-sans)',
            fontWeight: 500,
          }}
          className="text-black text-5xl text-left w-full mb-6"
        >
          Areas We Serve in {stateName}
        </h2>
        <div className="flex flex-wrap gap-3">
          {nearbyRegions.map((region, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-[#E0F5FF] text-[#252932] rounded-full text-base font-medium"
            >
              {region}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}