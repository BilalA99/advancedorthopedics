import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BODY_PARTS } from '@/components/data/bodyParts';
import { conditions } from '@/components/data/conditions';
import { AllTreatmentsCombined } from '@/components/data/treatments';
import ConditionCard from '@/components/ConditionCard';
import TreatmentCard from '@/components/TreatmentCard';
import { isProviderVisible, providerIds } from '@/lib/providers/providerVisibility';
import ExpandableCardGrid from '@/components/ExpandableCardGrid';
import BodyPartHeroForm from '@/components/BodyPartHeroForm';
import { buildCanonical } from '@/lib/seo';
import { tagMatches } from '@/lib/tag-utils';
import { hubThumbnailBySlug } from '@/lib/seo/condition-images';

// Map body part slugs to medical specialties for schema markup
const BODY_PART_SPECIALTIES: Record<string, string[]> = {
  'spine': ['Spine Surgery', 'Orthopedic Surgery', 'Minimally Invasive Spine Surgery', 'Pain Management'],
  'neck': ['Cervical Spine Surgery', 'Orthopedic Surgery', 'Spine Surgery', 'Pain Management'],
  'back': ['Lumbar Spine Surgery', 'Orthopedic Surgery', 'Spine Surgery', 'Pain Management'],
  'shoulder': ['Shoulder Surgery', 'Orthopedic Surgery', 'Sports Medicine', 'Arthroscopic Surgery'],
  'hip': ['Hip Surgery', 'Orthopedic Surgery', 'Joint Replacement', 'Sports Medicine'],
  'knee': ['Knee Surgery', 'Orthopedic Surgery', 'Joint Replacement', 'Sports Medicine', 'Arthroscopic Surgery'],
  'hand-wrist-elbow': ['Hand Surgery', 'Elbow Surgery', 'Orthopedic Surgery', 'Microsurgery', 'Nerve Surgery', 'Sports Medicine'],
  'foot-ankle': ['Foot and Ankle Surgery', 'Orthopedic Surgery', 'Podiatric Surgery'],
};

// Map body part slugs to anatomical terms for schema
const BODY_PART_ANATOMY: Record<string, string> = {
  'spine': 'Vertebral Column',
  'neck': 'Cervical Spine',
  'back': 'Lumbar Spine',
  'shoulder': 'Glenohumeral Joint',
  'hip': 'Hip Joint',
  'knee': 'Knee Joint',
  'hand-wrist-elbow': 'Hand, Wrist, and Elbow',
  'foot-ankle': 'Foot and Ankle',
};

// This component is used internally by the unified [slug] route
// It accepts a slug prop instead of params
export default async function BodyPartPage({ bodyPartSlug }: { bodyPartSlug: string }) {
  const showFeaturedDoctor = isProviderVisible({ slug: providerIds.scottKatzman });
  const bodyPart = BODY_PARTS.find(bp => bp.slug === bodyPartSlug);

  if (!bodyPart) {
    notFound();
  }

  // Filter conditions by tag, additionalTags, and categories
  const filteredConditions = conditions.filter(condition =>
    tagMatches(condition.tag, condition.additionalTags, condition.categories, bodyPart.tagMatchers)
  );

  // Filter treatments by tag, additionalTags, and categories
  const filteredTreatments = AllTreatmentsCombined.filter(treatment =>
    tagMatches(treatment.tag, treatment.additionalTags, treatment.categories, bodyPart.tagMatchers)
  );

  // Build JSON-LD schemas with comprehensive SEO optimization
  const baseUrl = 'https://mountainspineorthopedics.com';
  const canonicalUrl = buildCanonical(`/conditions/${bodyPartSlug}`);
  
  // Schema IDs for cross-referencing
  const organizationId = `${baseUrl}#medicalorganization`;
  const webpageId = `${canonicalUrl}#webpage`;
  const breadcrumbId = `${canonicalUrl}#breadcrumb`;
  const serviceId = `${canonicalUrl}#service`;
  const faqPageId = `${canonicalUrl}#faqpage`;
  const conditionsListId = `${canonicalUrl}#conditions-list`;
  const treatmentsListId = `${canonicalUrl}#treatments-list`;
  const specialtyId = `${canonicalUrl}#specialty`;

  // 1. MedicalOrganization Schema (comprehensive)
  const medicalOrganizationSchema = {
    '@type': 'MedicalOrganization',
    '@id': organizationId,
    'name': 'Mountain Spine & Orthopedics',
    'alternateName': 'MSO',
    'description': 'Leading spine and orthopedic specialists in Florida, New Jersey, New York, and Pennsylvania providing advanced minimally invasive treatments, including Band-Aid Back Surgery, laser spine procedures, and comprehensive pain management.',
    'url': baseUrl,
    'logo': {
      '@type': 'ImageObject',
      'url': `${baseUrl}/newlogo4.png`,
      'width': 300,
      'height': 100
    },
    'image': `${baseUrl}/herosectionimg.jpg`,
    'telephone': [
      '(561) 223-9959',
      '(754) 212-8736',
      '(407) 565-7598',
      '(407) 960-1717',
      '(863) 777-5805',
      '(561) 556-1802',
      '(954) 987-2047',
      '(561) 544-5501'
    ],
    'email': 'info@mountainspineorthopedics.com',
    'medicalSpecialty': [
      'Orthopedic Surgery',
      'Spine Surgery',
      'Sports Medicine',
      'Pain Management',
      'Minimally Invasive Surgery',
      'Joint Replacement',
      'Arthroscopic Surgery'
    ],
    'availableService': {
      '@type': 'MedicalTherapy',
      'name': `${bodyPart.title} Treatment Services`,
      'description': `Comprehensive ${bodyPart.title.toLowerCase()} care including diagnosis, non-surgical treatments, and minimally invasive surgery`
    },
    'areaServed': [
      {
        '@type': 'State',
        'name': 'Florida',
        'sameAs': 'https://en.wikipedia.org/wiki/Florida'
      },
      {
        '@type': 'State',
        'name': 'New Jersey',
        'sameAs': 'https://en.wikipedia.org/wiki/New_Jersey'
      },
      {
        '@type': 'State',
        'name': 'New York',
        'sameAs': 'https://en.wikipedia.org/wiki/New_York_(state)'
      },
      {
        '@type': 'State',
        'name': 'Pennsylvania',
        'sameAs': 'https://en.wikipedia.org/wiki/Pennsylvania'
      }
    ],
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Orthopedic Services',
      'itemListElement': [
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'MedicalTherapy',
            'name': 'Free MRI Review'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'MedicalTherapy',
            'name': 'Second Opinion Consultation'
          }
        }
      ]
    }
  };

  // 2. MedicalSpecialty Schema
  const specialties = BODY_PART_SPECIALTIES[bodyPartSlug] || ['Orthopedic Surgery'];
  const medicalSpecialtySchema = {
    '@type': 'MedicalSpecialty',
    '@id': specialtyId,
    'name': specialties[0],
    'alternateName': bodyPart.title + ' Specialty',
    'relevantSpecialty': specialties.slice(1).map(spec => ({
      '@type': 'MedicalSpecialty',
      'name': spec
    }))
  };

  // 3. BreadcrumbList Schema (enhanced)
  const breadcrumbSchema = {
    '@type': 'BreadcrumbList',
    '@id': breadcrumbId,
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': baseUrl
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Conditions',
        'item': `${baseUrl}/conditions`
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': `${bodyPart.title} Conditions`,
        'item': canonicalUrl
      }
    ]
  };

  // 4. MedicalWebPage Schema (comprehensive)
  const hubImage = hubThumbnailBySlug[bodyPartSlug];
  const medicalWebPageSchema = {
    '@type': 'MedicalWebPage',
    '@id': webpageId,
    'url': canonicalUrl,
    'name': bodyPart.seoH1,
    'headline': bodyPart.seoH1,
    'description': bodyPart.metaDescription,
    'inLanguage': 'en-US',
    'isPartOf': {
      '@type': 'WebSite',
      '@id': `${baseUrl}#website`,
      'name': 'Mountain Spine & Orthopedics',
      'url': baseUrl,
      'publisher': { '@id': organizationId }
    },
    'breadcrumb': { '@id': breadcrumbId },
    'primaryImageOfPage': {
      '@type': 'ImageObject',
      'url': hubImage?.url || `${baseUrl}/herosectionimg.jpg`,
      'width': 1200,
      'height': 630
    },
    'specialty': { '@id': specialtyId },
    'about': [
      {
        '@type': 'AnatomicalStructure',
        'name': BODY_PART_ANATOMY[bodyPartSlug] || bodyPart.title,
        'description': `The ${bodyPart.title.toLowerCase()} is a critical anatomical structure treated by orthopedic specialists.`
      },
      ...filteredConditions.slice(0, 5).map(condition => ({
        '@type': 'MedicalCondition',
        'name': condition.title,
        'url': buildCanonical(`/conditions/${condition.slug}`)
      }))
    ],
    'mentions': filteredTreatments.slice(0, 5).map(treatment => ({
      '@type': 'MedicalProcedure',
      'name': treatment.title,
      'url': buildCanonical(`/treatments/${treatment.slug}`)
    })),
    'mainEntity': { '@id': serviceId },
    'author': { '@id': organizationId },
    'publisher': { '@id': organizationId },
    'datePublished': '2024-01-01',
    'dateModified': new Date().toISOString().split('T')[0],
    'hasPart': [
      {
        '@type': 'WebPageElement',
        'name': `Common ${bodyPart.title} Symptoms`,
        'description': bodyPart.sections.symptoms.substring(0, 200) + '...'
      },
      {
        '@type': 'WebPageElement',
        'name': `When to See an Orthopedist for ${bodyPart.title} Pain`,
        'description': bodyPart.sections.whenToSee.substring(0, 200) + '...'
      },
      {
        '@type': 'WebPageElement',
        'name': `How We Treat ${bodyPart.title} Conditions`,
        'description': bodyPart.sections.howWeTreat.substring(0, 200) + '...'
      }
    ],
    'speakable': {
      '@type': 'SpeakableSpecification',
      'cssSelector': ['h1', 'h2', '.intro-text']
    }
  };

  // 5. Service Schema (comprehensive medical service)
  const serviceSchema = {
    '@type': 'MedicalTherapy',
    '@id': serviceId,
    'name': `${bodyPart.title} Conditions & Treatment Services`,
    'alternateName': `${bodyPart.title} Care`,
    'description': `Comprehensive diagnosis and treatment services for ${bodyPart.title.toLowerCase()} conditions including conservative care, targeted injections, and minimally invasive surgical procedures.`,
    'url': canonicalUrl,
    'provider': { '@id': organizationId },
    'serviceType': 'Medical Treatment',
    'category': specialties[0],
    'areaServed': [
      { '@type': 'State', 'name': 'Florida' },
      { '@type': 'State', 'name': 'New Jersey' },
      { '@type': 'State', 'name': 'New York' },
      { '@type': 'State', 'name': 'Pennsylvania' }
    ],
    'availableChannel': {
      '@type': 'ServiceChannel',
      'serviceUrl': `${baseUrl}/find-care/book-an-appointment`,
      'servicePhone': '(561) 223-9959',
      'serviceSmsNumber': '(561) 223-9959'
    },
    'offers': [
      {
        '@type': 'Offer',
        'name': 'Free MRI Review',
        'description': 'Complimentary review of your MRI by our board-certified specialists',
        'url': `${baseUrl}/find-care/free-mri-review`,
        'price': '0',
        'priceCurrency': 'USD'
      },
      {
        '@type': 'Offer',
        'name': 'Second Opinion',
        'description': 'Expert second opinion consultation for your condition',
        'url': `${baseUrl}/find-care/second-opinion`,
        'price': '0',
        'priceCurrency': 'USD'
      }
    ],
    'potentialAction': {
      '@type': 'ReserveAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': `${baseUrl}/find-care/book-an-appointment`,
        'actionPlatform': [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform'
        ]
      },
      'result': {
        '@type': 'Reservation',
        'name': `${bodyPart.title} Consultation Appointment`
      }
    }
  };

  // 6. ItemList for Conditions (enhanced with MedicalCondition type)
  const conditionsItemListSchema = filteredConditions.length > 0 ? {
    '@type': 'ItemList',
    '@id': conditionsListId,
    'name': `Common ${bodyPart.title} Conditions We Treat`,
    'description': `Comprehensive list of ${bodyPart.title.toLowerCase()} conditions diagnosed and treated by Mountain Spine & Orthopedics specialists.`,
    'numberOfItems': filteredConditions.length,
    'itemListElement': filteredConditions.map((condition, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': condition.title,
      'url': buildCanonical(`/conditions/${condition.slug}`),
      'item': {
        '@type': 'MedicalCondition',
        'name': condition.title,
        'url': buildCanonical(`/conditions/${condition.slug}`),
        'description': condition.body ? condition.body.substring(0, 150) + '...' : `Learn about ${condition.title} diagnosis and treatment options.`
      }
    }))
  } : null;

  // 7. ItemList for Treatments (enhanced with MedicalProcedure type)
  const treatmentsItemListSchema = filteredTreatments.length > 0 ? {
    '@type': 'ItemList',
    '@id': treatmentsListId,
    'name': `Treatments for ${bodyPart.title} Pain & Injury`,
    'description': `Treatment options available for ${bodyPart.title.toLowerCase()} conditions at Mountain Spine & Orthopedics.`,
    'numberOfItems': filteredTreatments.length,
    'itemListElement': filteredTreatments.map((treatment, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': treatment.title,
      'url': buildCanonical(`/treatments/${treatment.slug}`),
      'item': {
        '@type': 'MedicalProcedure',
        'name': treatment.title,
        'url': buildCanonical(`/treatments/${treatment.slug}`),
        'description': treatment.body ? treatment.body.substring(0, 150) + '...' : `Learn about ${treatment.title} procedure details and recovery.`,
        'procedureType': treatment.tag === 'Spine' || treatment.tag === 'Lower Spine' ? 'Spine Surgery' : 'Orthopedic Surgery'
      }
    }))
  } : null;

  // 8. FAQPage Schema (enhanced with cross-references)
  const faqSchema = bodyPart.faqs.length > 0 ? {
    '@type': 'FAQPage',
    '@id': faqPageId,
    'url': canonicalUrl,
    'name': `Frequently Asked Questions About ${bodyPart.title} Conditions`,
    'description': `Common questions and expert answers about ${bodyPart.title.toLowerCase()} conditions, symptoms, and treatments.`,
    'mainEntity': bodyPart.faqs.map((faq, index) => ({
      '@type': 'Question',
      'name': faq.q,
      'position': index + 1,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.a,
        'author': { '@id': organizationId }
      }
    })),
    'about': { '@id': serviceId },
    'isPartOf': { '@id': webpageId },
    'author': { '@id': organizationId }
  } : null;

  // Build consolidated @graph array
  const graphSchemas: any[] = [
    medicalOrganizationSchema,
    medicalSpecialtySchema,
    breadcrumbSchema,
    medicalWebPageSchema,
    serviceSchema
  ];

  if (conditionsItemListSchema) graphSchemas.push(conditionsItemListSchema);
  if (treatmentsItemListSchema) graphSchemas.push(treatmentsItemListSchema);
  if (faqSchema) graphSchemas.push(faqSchema);

  // Consolidated schema
  const consolidatedSchema = {
    '@context': 'https://schema.org',
    '@graph': graphSchemas
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(consolidatedSchema) }}
      />
      <main className="w-full flex flex-col items-center justify-center bg-white h-full">
        {/* Hero Section with Contact Form */}
        <section className="w-full min-h-[420px] sm:min-h-[400px] lg:min-h-[450px] flex flex-col relative overflow-hidden">
          {/* Background blur effect */}
          <div
            style={{ filter: 'blur(30px)' }}
            className="w-full h-[80px] sm:h-[120px] absolute top-0 z-[1]"
          />
          {/* Background image */}
          <Image
            src={'/herosectionimg.jpg'}
            priority={true}
            fetchPriority="high"
            fill
            className="h-full absolute top-0 object-cover object-center w-full"
            alt={`${bodyPart.title} conditions and treatments at Mountain Spine & Orthopedics`}
            sizes="100vw"
          />
          {/* Gradient overlay */}
          <div
            className="w-full z-[1] h-full absolute left-0 top-0"
            style={{
              background: 'linear-gradient(180deg, rgba(10, 80, 236, 0.15) 0%, rgba(255, 255, 255, 0.30) 100%)',
            }}
          />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 bg-gradient-to-t from-white to-transparent z-[2]" />
          
          {/* Content container */}
          <div className="z-[3] flex flex-col lg:flex-row w-full h-full relative pt-24 pb-8 sm:pt-32 sm:pb-12 lg:pt-36 lg:pb-16 max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-[80px] gap-6 lg:gap-10 items-center lg:items-start">
            {/* Left side - Title and intro */}
            <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
              <h1
                style={{
                  fontFamily: 'var(--font-public-sans)',
                  fontWeight: 400,
                }}
                className="text-[#252932] text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-tight mb-3 sm:mb-4"
              >
                {bodyPart.seoH1}
              </h1>
              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 400,
                }}
                className="text-[#424959] text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl"
              >
                Expert diagnosis and personalized treatment from board-certified {bodyPart.title.toLowerCase()} specialists. Get relief with minimally invasive options and complimentary MRI reviews.
              </p>
              {/* Quick action buttons - visible on desktop */}
              <div className="hidden lg:flex flex-row gap-3 mt-6">
                <Link
                  href="/find-care/book-an-appointment"
                  className="bg-[#2358AC] text-white px-5 py-2.5 rounded-full hover:bg-[#1a4a8a] transition-all duration-200 shadow-sm hover:shadow-md text-sm"
                  style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
                >
                  Book Appointment
                </Link>
                <Link
                  href="/find-care/free-mri-review"
                  className="bg-white/90 backdrop-blur-sm border border-[#E5E7EB] text-[#374151] px-5 py-2.5 rounded-full hover:bg-white transition-all duration-200 text-sm"
                  style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
                >
                  Free MRI Review
                </Link>
              </div>
            </div>
            
            {/* Right side - Contact Form */}
            <div className="w-full max-w-[340px] sm:max-w-[360px] flex-shrink-0">
              <BodyPartHeroForm bodyPartTitle={bodyPart.title} />
            </div>
          </div>
        </section>

        {/* Conditions Section */}
        {filteredConditions.length > 0 && (
          <section className="max-w-[1440px] w-full flex flex-col py-8 sm:py-12 xl:py-[50px] xl:px-[80px] px-4 sm:px-6 space-y-6 sm:space-y-8 xl:space-y-[40px]">
            <div className="flex flex-col space-y-3 sm:space-y-4 xl:space-y-[24px]">
              <h2
                style={{
                  fontFamily: 'var(--font-public-sans)',
                  fontWeight: 500,
                }}
                className="text-[#111315] text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-tight"
              >
                Common {bodyPart.title} Conditions We Treat
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400,
                }}
                className="text-[#424959] text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed"
              >
                Our specialists diagnose and treat a comprehensive range of {bodyPart.title.toLowerCase()} conditions using advanced diagnostic tools and personalized treatment plans.
              </p>
            </div>
            <ExpandableCardGrid
              initialCount={6}
              mobileInitialCount={4}
              itemType="Conditions"
              totalCount={filteredConditions.length}
            >
              {filteredConditions.map((condition) => (
                <ConditionCard key={condition.slug} ConditionInfo={condition} showFeaturedDoctor={showFeaturedDoctor} />
              ))}
            </ExpandableCardGrid>
          </section>
        )}

        {/* Treatments Section */}
        {filteredTreatments.length > 0 && (
          <section className="max-w-[1440px] w-full flex flex-col py-8 sm:py-12 xl:py-[50px] xl:px-[80px] px-4 sm:px-6 space-y-6 sm:space-y-8 xl:space-y-[40px]">
            <div className="flex flex-col space-y-3 sm:space-y-4 xl:space-y-[24px]">
              <h2
                style={{
                  fontFamily: 'var(--font-public-sans)',
                  fontWeight: 500,
                }}
                className="text-[#111315] text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-tight"
              >
                Treatments for {bodyPart.title} Pain & Injury
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400,
                }}
                className="text-[#424959] text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed"
              >
                From conservative treatments to advanced minimally invasive procedures, we offer comprehensive care options for {bodyPart.title.toLowerCase()} conditions.
              </p>
            </div>
            <ExpandableCardGrid
              initialCount={6}
              mobileInitialCount={4}
              itemType="Treatments"
              totalCount={filteredTreatments.length}
            >
              {filteredTreatments.map((treatment) => (
                <TreatmentCard key={treatment.slug} ConditionInfo={treatment} showFeaturedDoctor={showFeaturedDoctor} />
              ))}
            </ExpandableCardGrid>
          </section>
        )}

        {/* Symptoms Section */}
        <section className="w-full px-4 sm:px-6 xl:px-[80px]">
          <div className="max-w-[1440px] mx-auto w-full flex flex-col py-6 sm:py-10 xl:py-[50px] px-4 sm:px-6 xl:px-10 space-y-4 sm:space-y-6 bg-[#FAFAFA] rounded-2xl sm:rounded-3xl">
            <h2
              style={{
                fontFamily: 'var(--font-public-sans)',
                fontWeight: 500,
              }}
              className="text-[#111315] text-xl sm:text-2xl lg:text-3xl xl:text-4xl leading-tight"
            >
              Common {bodyPart.title} Symptoms
            </h2>
            <div
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 400,
              }}
              className="text-[#424959] text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed space-y-4"
            >
              <p>{bodyPart.sections.symptoms}</p>
            </div>
          </div>
        </section>

        {/* When to See Section */}
        <section className="max-w-[1440px] w-full flex flex-col py-6 sm:py-10 xl:py-[50px] xl:px-[80px] px-4 sm:px-6 space-y-4 sm:space-y-6">
          <h2
            style={{
              fontFamily: 'var(--font-public-sans)',
              fontWeight: 500,
            }}
            className="text-[#111315] text-xl sm:text-2xl lg:text-3xl xl:text-4xl leading-tight"
          >
            When to See an Orthopedist for {bodyPart.title} Pain
          </h2>
          <div
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 400,
            }}
            className="text-[#424959] text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed space-y-4"
          >
            <p>{bodyPart.sections.whenToSee}</p>
          </div>
        </section>

        {/* How We Treat Section */}
        <section className="w-full px-4 sm:px-6 xl:px-[80px]">
          <div className="max-w-[1440px] mx-auto w-full flex flex-col py-6 sm:py-10 xl:py-[50px] px-4 sm:px-6 xl:px-10 space-y-4 sm:space-y-6 bg-[#FAFAFA] rounded-2xl sm:rounded-3xl">
            <h2
              style={{
                fontFamily: 'var(--font-public-sans)',
                fontWeight: 500,
              }}
              className="text-[#111315] text-xl sm:text-2xl lg:text-3xl xl:text-4xl leading-tight"
            >
              How We Treat {bodyPart.title} Conditions
            </h2>
            <div
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 400,
              }}
              className="text-[#424959] text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed space-y-4"
            >
              <p>{bodyPart.sections.howWeTreat}</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-[1440px] w-full flex flex-col py-8 sm:py-12 xl:py-[50px] xl:px-[80px] px-4 sm:px-6 space-y-6 sm:space-y-8">
          <div className="flex flex-col space-y-4 sm:space-y-6 text-center">
            <h2
              style={{
                fontFamily: 'var(--font-public-sans)',
                fontWeight: 500,
              }}
              className="text-[#111315] text-xl sm:text-2xl lg:text-3xl xl:text-4xl leading-tight"
            >
              Ready to Get Started?
            </h2>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 400,
              }}
              className="text-[#424959] text-sm sm:text-base lg:text-lg xl:text-xl max-w-2xl mx-auto leading-relaxed"
            >
              Take the first step toward relief. Book a consultation, get a free MRI review, or request a second opinion from our board-certified specialists.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-4 sm:mt-6">
              <Link
                href="/find-care/book-an-appointment"
                className="w-full sm:w-auto bg-[#2358AC] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full hover:bg-[#1a4a8a] transition-all duration-200 shadow-sm hover:shadow-md text-center"
              >
                <span
                  style={{
                    fontFamily: "var(--font-public-sans)",
                    fontWeight: 500,
                  }}
                  className="text-sm sm:text-base"
                >
                  Book an Appointment
                </span>
              </Link>
              <Link
                href="/find-care/free-mri-review"
                className="w-full sm:w-auto bg-white border border-[#252932] text-[#252932] px-6 py-3 sm:px-8 sm:py-4 rounded-full hover:bg-[#FAFAFA] transition-all duration-200 text-center"
              >
                <span
                  style={{
                    fontFamily: "var(--font-public-sans)",
                    fontWeight: 500,
                  }}
                  className="text-sm sm:text-base"
                >
                  Free MRI Review
                </span>
              </Link>
              <Link
                href="/find-care/second-opinion"
                className="w-full sm:w-auto bg-white border border-[#252932] text-[#252932] px-6 py-3 sm:px-8 sm:py-4 rounded-full hover:bg-[#FAFAFA] transition-all duration-200 text-center"
              >
                <span
                  style={{
                    fontFamily: "var(--font-public-sans)",
                    fontWeight: 500,
                  }}
                  className="text-sm sm:text-base"
                >
                  Second Opinion
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-[1440px] w-full flex flex-col py-8 sm:py-12 xl:py-[50px] xl:px-[80px] px-4 sm:px-6 space-y-6 sm:space-y-8">
          <div className="flex flex-col space-y-4 sm:space-y-6">
            <h2
              style={{
                fontFamily: 'var(--font-public-sans)',
                fontWeight: 500,
              }}
              className="text-[#111315] text-xl sm:text-2xl lg:text-3xl xl:text-4xl leading-tight"
            >
              Frequently Asked Questions About {bodyPart.title} Conditions
            </h2>
            <div className="space-y-4 sm:space-y-6">
              {bodyPart.faqs.map((faq, index) => (
                <div key={index} className="bg-[#FAFAFA] p-4 sm:p-6 rounded-xl sm:rounded-2xl xl:rounded-3xl">
                  <h3
                    style={{
                      fontFamily: "var(--font-public-sans)",
                      fontWeight: 500,
                    }}
                    className="text-[#111315] text-base sm:text-lg lg:text-xl xl:text-2xl mb-2 sm:mb-3 lg:mb-4 leading-snug"
                  >
                    {faq.q}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontWeight: 400,
                    }}
                    className="text-[#424959] text-sm sm:text-base lg:text-lg leading-relaxed"
                  >
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
