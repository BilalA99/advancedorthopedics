// Import required types for metadata handling
import type { Metadata, ResolvingMetadata } from "next";
import type { StaticImageData } from "next/image";
import React from "react";

// Import the list of all treatments
import { AllTreatments, treatmentContentPlaceholders, allTreatmentContent, TreatmentContent } from "@/components/data/treatments";
import { treatmentFAQs } from "@/components/data/treatmentFAQs";
import { generateFAQPageSchema } from "@/lib/faq-utils";
import { buildCanonical, safeTitle, safeDescription, normalizeUTF8 } from "@/lib/seo";
import { getOgImageForPath } from "@/lib/og";
import { getTreatmentMetadata, generateTreatmentMetadataFallback } from "@/lib/metadata-seo";
import { getVisibleProviderBySlug } from "@/lib/providers/providerVisibility";

// Helper function to safely get the image source URL as a string
const getImageSource = (image: string | StaticImageData | undefined): string => {
  if (!image) return "https://mountainspineortho.b-cdn.net/public/default-treatment-image.jpg"; // Provide a default fallback image
  return typeof image === "string" ? image : image.src;
};

function capitalizeWords(str: string): string {
  return str.replace(/\b\w/g, l => l.toUpperCase());
}

// Helper to strip HTML and markdown from text for schema
function stripHtmlAndMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove markdown bold
    .replace(/<[^>]*>/g, ' ') // Remove HTML tags
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// This function dynamically generates metadata for each treatment page
export async function generateMetadata(
  { params }: { params: Promise<{ TreatmentDetails: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  
  // Check for new TreatmentContent format first (includes all batches)
  const treatmentContent = allTreatmentContent.find(
    (x: TreatmentContent) => x.slug === resolvedParams.TreatmentDetails
  );
  
  // Fall back to old TreatmentsCardProp format
  const treatment = treatmentContent 
    ? null 
    : AllTreatments.find(t => t.slug === resolvedParams.TreatmentDetails);

  if (!treatmentContent && !treatment) {
    const readableSlug = resolvedParams.TreatmentDetails.replace(/-/g, " ");
    const canonicalUrl = buildCanonical(`/treatments/${resolvedParams.TreatmentDetails}`);
    return {
      title: "Treatment Not Found | Mountain Spine & Orthopedics",
      description: "Learn about orthopedic care and treatments with our specialists in Florida.",
      alternates: {
        canonical: canonicalUrl,
      },
    };
  }

  const isNewFormat = !!treatmentContent;
  const slug = isNewFormat && treatmentContent ? treatmentContent.slug : (treatment?.slug ?? resolvedParams.TreatmentDetails);
  const canonicalUrl = buildCanonical(`/treatments/${slug}`);
  
  // Use the specific image for the treatment, with a fallback (treatment is null for new-format)
  const ogImage = isNewFormat && treatmentContent && treatmentContent.heroImage
    ? (typeof treatmentContent.heroImage === 'string' ? treatmentContent.heroImage : (treatmentContent.heroImage as StaticImageData).src)
    : treatment
      ? (typeof treatment.inTxt_img === 'string' ? treatment.inTxt_img : treatment.inTxt_img?.src || getOgImageForPath('/treatments'))
      : getOgImageForPath('/treatments');

  // Get SEO-optimized metadata from centralized helper
  const treatmentTitle = isNewFormat && treatmentContent ? treatmentContent.title : (treatment?.title ?? '');
  const seoMetadata = getTreatmentMetadata(slug) || generateTreatmentMetadataFallback(treatmentTitle);
  
  // Use SEO metadata with normalization
  const title = normalizeUTF8(seoMetadata.metaTitle);
  const description = normalizeUTF8(seoMetadata.metaDescription);

  return {
    title,
    description,
    keywords: isNewFormat && treatmentContent ? treatmentContent.keywords : (treatment?.keywords || [treatment?.title ?? '', "orthopedic treatment", "spine surgery"]),
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonicalUrl,
      siteName: 'Mountain Spine & Orthopedics',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: treatmentTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

// --- SEO ENHANCEMENT: Combined JSON-LD Schema Component ---
const TreatmentSchemas = async ({ params }: { params: Promise<{ TreatmentDetails: string }> }) => {
    const resolvedParams = await params;
    
    // Check for new TreatmentContent format first (includes all batches)
    const treatmentContent = allTreatmentContent.find((x: TreatmentContent) => x.slug === resolvedParams.TreatmentDetails);
    
    // Fall back to old TreatmentsCardProp format
    const treatment = treatmentContent 
        ? null 
        : AllTreatments.find(t => t.slug === resolvedParams.TreatmentDetails);

    if (!treatmentContent && !treatment) {
        return null;
    }
    
    const isNewFormat = !!treatmentContent;
    const baseUrl = 'https://mountainspineorthopedics.com';
    const treatmentSlug = isNewFormat && treatmentContent ? treatmentContent.slug : (treatment?.slug ?? resolvedParams.TreatmentDetails);
    const treatmentTitle = isNewFormat && treatmentContent ? treatmentContent.title : (treatment?.title ?? '');
    const treatmentUrl = `${baseUrl}/treatments/${treatmentSlug}`;
    const treatmentDescription = stripHtmlAndMarkdown(
      isNewFormat && treatmentContent
        ? (treatmentContent.overview?.body ?? treatmentContent.heroDescription ?? treatmentContent.metaDescription ?? '')
        : (treatment?.body ?? '')
    );
    const imageUrl = isNewFormat && treatmentContent && treatmentContent.heroImage
        ? (typeof treatmentContent.heroImage === 'string' ? treatmentContent.heroImage : treatmentContent.heroImage.src)
        : (treatment ? (typeof treatment.inTxt_img === 'string' ? treatment.inTxt_img : treatment.inTxt_img?.src ?? '') : '');

    // Unique IDs for cross-referencing
    const organizationId = `${baseUrl}#medicalorganization`;
    const medicalProcedureId = `${treatmentUrl}#medicalprocedure`;
    const webpageId = `${treatmentUrl}#webpage`;
    const breadcrumbId = `${treatmentUrl}#breadcrumb`;
    const serviceId = `${treatmentUrl}#service`;

    // 1. MedicalOrganization Schema
    const medicalOrganizationSchema = {
        '@type': 'MedicalOrganization',
        '@id': organizationId,
        'name': 'Mountain Spine & Orthopedics',
        'url': baseUrl,
        'logo': `${baseUrl}/newlogo4.png`,
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
        'medicalSpecialty': [
            'Orthopedic Surgery',
            'Spine Surgery',
            'Sports Medicine',
            'Pain Management',
            'Minimally Invasive Surgery',
            'Joint Replacement',
            'Spinal Fusion',
            'Discectomy',
            'Arthroscopy'
        ],
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
            },
            {
                '@type': 'State',
                'name': 'Georgia',
                'sameAs': 'https://en.wikipedia.org/wiki/Georgia_(U.S._state)'
            }
        ]
    };

    // 2. MedicalProcedure Schema (Enhanced with @id)
    const medicalProcedureSchema: any = {
        '@type': 'MedicalProcedure',
        '@id': medicalProcedureId,
        'name': treatmentTitle,
        'description': treatmentDescription,
        'url': treatmentUrl,
        'bodyLocation': isNewFormat && treatmentContent ? (treatmentContent.tag ?? 'Spine') : (treatment?.tag ?? 'Spine'),
        'howPerformed': (isNewFormat && treatmentContent && treatmentContent.procedure)
            ? stripHtmlAndMarkdown(treatmentContent.procedure.steps.join(' ')) 
            : (treatment?.procedure_info ? stripHtmlAndMarkdown(treatment.procedure_info) : ''),
        'preparation': (isNewFormat && treatmentContent && treatmentContent.overview)
            ? stripHtmlAndMarkdown(treatmentContent.overview.body) 
            : (treatment?.detail ? stripHtmlAndMarkdown(treatment.detail) : ''),
        'followup': (isNewFormat && treatmentContent && treatmentContent.recovery)
            ? stripHtmlAndMarkdown(treatmentContent.recovery.details) 
            : (treatment?.recovery_info ? stripHtmlAndMarkdown(treatment.recovery_info) : ''),
        'author': {
            '@id': organizationId
        },
        'provider': {
            '@id': organizationId
        }
    };

    // Add image only if it exists
    if (imageUrl) {
        medicalProcedureSchema.image = imageUrl;
    }

    // 3. WebPage Schema
    const webpageSchema: any = {
        '@type': 'WebPage',
        '@id': webpageId,
        'url': treatmentUrl,
        'name': treatmentTitle,
        'description': treatmentDescription,
        'isPartOf': {
            '@id': `${baseUrl}#website`
        },
        'breadcrumb': {
            '@id': breadcrumbId
        },
        'mainEntity': {
            '@id': medicalProcedureId
        },
        'about': {
            '@id': medicalProcedureId
        },
        'publisher': {
            '@id': organizationId
        }
    };

    // Add image only if it exists
    if (imageUrl) {
        webpageSchema.image = imageUrl;
    }

    // Clinical review provenance, gated on the record actually carrying a review
    // date. Treatments without `reviewedAt` emit nothing here, so the schema
    // never claims a physician reviewed a page that no one reviewed. Mirrors the
    // condition pages' pattern: `reviewedBy` is a doctor slug when an individual
    // is credited, otherwise the MedicalOrganization is.
    const reviewedAt = isNewFormat ? treatmentContent?.reviewedAt : undefined;
    const reviewer = isNewFormat && treatmentContent?.reviewedBy
        ? getVisibleProviderBySlug(treatmentContent.reviewedBy)
        : undefined;

    if (reviewedAt) {
        webpageSchema.lastReviewed = reviewedAt;
        webpageSchema.dateModified = reviewedAt;
        webpageSchema.reviewedBy = reviewer
            ? {
                '@type': 'Physician',
                'name': reviewer.name,
                'url': `${baseUrl}/about/meetourdoctors/${reviewer.slug}`,
                'medicalSpecialty': reviewer.medicalSpecialty,
            }
            : { '@id': organizationId };
        medicalProcedureSchema.lastReviewed = reviewedAt;
    }

    // 4. Service Schema
    const serviceSchema = {
        '@type': 'Service',
        '@id': serviceId,
        'name': treatmentTitle,
        'description': `Expert ${treatmentTitle} performed by board-certified orthopedic specialists at Mountain Spine & Orthopedics. Comprehensive care with advanced minimally invasive techniques.`,
        'url': treatmentUrl,
        'provider': {
            '@id': organizationId
        },
        'serviceType': [
            'Medical Treatment',
            'Orthopedic Care',
            'Spine Care',
            'Pain Management'
        ],
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
            },
            {
                '@type': 'State',
                'name': 'Georgia',
                'sameAs': 'https://en.wikipedia.org/wiki/Georgia_(U.S._state)'
            }
        ],
        'hasOfferCatalog': {
            '@type': 'OfferCatalog',
            'name': `${treatmentTitle} Services`,
            'itemListElement': {
                '@type': 'Offer',
                'itemOffered': {
                    '@id': medicalProcedureId
                }
            }
        }
    };

    // 5. BreadcrumbList Schema
    const breadcrumbSchema = {
        '@type': 'BreadcrumbList',
        '@id': breadcrumbId,
        'itemListElement': [
            {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Home',
                'item': `${baseUrl}/`
            },
            {
                '@type': 'ListItem',
                'position': 2,
                'name': 'Treatments',
                'item': `${baseUrl}/treatments`
            },
            {
                '@type': 'ListItem',
                'position': 3,
                'name': treatmentTitle,
                'item': treatmentUrl
            }
        ]
    };

    // 6. FAQPage Schema - Use only dedicated FAQ data file
    let faqSchema: any = null;
    const specificFAQs = treatmentFAQs[treatmentSlug];
    
    if (specificFAQs && specificFAQs.length > 0) {
        faqSchema = {
            '@type': 'FAQPage',
            '@id': `${treatmentUrl}#faqpage`,
            'url': treatmentUrl,
            'mainEntity': specificFAQs.map(faq => ({
                '@type': 'Question',
                'name': faq.question,
                'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': stripHtmlAndMarkdown(faq.answer)
                }
            })),
            'about': {
                '@id': medicalProcedureId
            },
            'isPartOf': {
                '@id': webpageId
            }
        };
    } else if (isNewFormat && treatmentContent) {
        // TypeScript guard: treatmentContent is defined in this block
        const tc = treatmentContent;
        faqSchema = {
            '@type': 'FAQPage',
            '@id': `${treatmentUrl}#faqpage`,
            'url': treatmentUrl,
            'mainEntity': [
                {
                    '@type': 'Question',
                    'name': `What are the benefits of ${treatmentTitle}?`,
                    'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': tc.benefits && tc.benefits.length > 0 
                            ? stripHtmlAndMarkdown(tc.benefits.join(' '))
                            : "Relieves spine and joint pain and improves mobility."
                    }
                },
                {
                    '@type': 'Question',
                    'name': `Who is a candidate for ${treatmentTitle}?`,
                    'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': (tc.candidates?.list && tc.candidates.list.length > 0)
                            ? stripHtmlAndMarkdown(tc.candidates.list.join(' '))
                            : "Patients with orthopedic or spinal conditions that have not responded to conservative treatments."
                    }
                },
                {
                    '@type': 'Question',
                    'name': 'What is the recovery process like?',
                    'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': tc.recovery?.details 
                            ? stripHtmlAndMarkdown(tc.recovery.details)
                            : "Recovery may include follow-up visits, activity modification, and a gradual return to daily activities depending on your treatment plan."
                    }
                }
            ],
            'about': {
                '@id': medicalProcedureId
            },
            'isPartOf': {
                '@id': webpageId
            }
        };
    } else if (treatment) {
        faqSchema = {
            '@type': 'FAQPage',
            '@id': `${treatmentUrl}#faqpage`,
            'url': treatmentUrl,
            'mainEntity': [
                {
                    '@type': 'Question',
                    'name': `What are the benefits of ${treatment.title}?`,
                    'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': typeof treatment.benefits === 'string' 
                            ? treatment.benefits 
                            : "Relieves spine and joint pain and improves mobility."
                    }
                },
                {
                    '@type': 'Question',
                    'name': `What conditions does ${treatment.title} treat?`,
                    'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': treatment.conditions_treated || "Treats orthopedic and spinal conditions."
                    }
                },
                {
                    '@type': 'Question',
                    'name': 'What is the recovery process like?',
                    'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': treatment.recovery_info || "Recovery may include follow-up visits, activity modification, and a gradual return to daily activities depending on your treatment plan."
                    }
                }
            ],
            'about': {
                '@id': medicalProcedureId
            },
            'isPartOf': {
                '@id': webpageId
            }
        };
    }

    // Build consolidated @graph array
    const graphSchemas: any[] = [
        medicalOrganizationSchema,
        medicalProcedureSchema,
        webpageSchema,
        serviceSchema,
        breadcrumbSchema
    ];

    // Add FAQPage if it exists
    if (faqSchema) {
        graphSchemas.push(faqSchema);
    }

    // Return single consolidated @graph schema
    const consolidatedSchema = {
        '@context': 'https://schema.org',
        '@graph': graphSchemas
    };

    // Render single consolidated schema
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(consolidatedSchema) }}
        />
    );
};

export default async function Layout({ 
    children,
    params 
}: { 
    children: React.ReactNode;
    params: Promise<{ TreatmentDetails: string }>;
}) {
  return (
    <>
      {await TreatmentSchemas({ params })}
      {children}
    </>
  );
}
