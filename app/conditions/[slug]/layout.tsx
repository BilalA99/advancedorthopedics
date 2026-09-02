import type { Metadata, ResolvingMetadata } from "next";
import React from "react";
import { BODY_PARTS } from '@/components/data/bodyParts';
import { conditions, conditionContentPlaceholders, ConditionContent } from "@/components/data/conditions";
import { buildCanonical, safeTitle, safeDescription, normalizeUTF8, canonicalForOg } from "@/lib/seo";
import { getOgImageForPath } from "@/lib/og";
import { generateFAQPageSchema } from "@/lib/faq-utils";
import { conditionFAQs } from "@/components/data/conditionFAQs";
import { getConditionMetadata, generateConditionMetadataFallback } from "@/lib/metadata-seo";
import { conditionThumbnailBySlug, hubThumbnailBySlug } from "@/lib/seo/condition-images";
import { getVisibleProviderBySlug } from "@/lib/providers/providerVisibility";

// Helper to strip HTML and markdown from text for schema
function stripHtmlAndMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove markdown bold
    .replace(/<[^>]*>/g, ' ') // Remove HTML tags
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// This layout handles metadata for both body parts and conditions
export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const resolvedParams = await params;
    const { slug } = resolvedParams;
    
    // Check if it's a body part first
    const bodyPart = BODY_PARTS.find(bp => bp.slug === slug);
    if (bodyPart) {
        const url = buildCanonical(`/conditions/${slug}`);
        const hubImage = hubThumbnailBySlug[slug];
        const ogImage = hubImage?.url || getOgImageForPath(`/conditions/${slug}`);
        const ogAlt = hubImage?.alt || bodyPart.seoH1;
        
        // Generate comprehensive keywords for the body part
        const bodyPartKeywords = [
            `${bodyPart.title} conditions`,
            `${bodyPart.title} pain treatment`,
            `${bodyPart.title} specialist`,
            `${bodyPart.title} doctor`,
            `${bodyPart.title} surgery`,
            `${bodyPart.title.toLowerCase()} pain relief`,
            `${bodyPart.title.toLowerCase()} orthopedic`,
            `minimally invasive ${bodyPart.title.toLowerCase()} surgery`,
            'board-certified orthopedic surgeon',
            'Mountain Spine Orthopedics',
            'free MRI review',
            'second opinion orthopedic',
            'orthopedic specialist near me',
        ];
        
        // Multi-state location keywords
        const locationKeywords = ['Florida', 'New Jersey', 'New York', 'Pennsylvania', 'Georgia'];
        const combinedKeywords = [
            ...bodyPartKeywords,
            ...locationKeywords.map(loc => `${bodyPart.title.toLowerCase()} doctor ${loc}`),
            ...locationKeywords.map(loc => `orthopedic specialist ${loc}`),
        ];
        
        return {
            title: bodyPart.metaTitle,
            description: bodyPart.metaDescription,
            keywords: combinedKeywords,
            authors: [{ name: 'Mountain Spine & Orthopedics', url: 'https://mountainspineorthopedics.com' }],
            creator: 'Mountain Spine & Orthopedics',
            publisher: 'Mountain Spine & Orthopedics',
            category: 'Medical',
            classification: 'Orthopedic Medicine',
            alternates: {
                canonical: url,
            },
            robots: {
                index: true,
                follow: true,
                'max-image-preview': 'large',
                'max-snippet': -1,
                'max-video-preview': -1,
            },
            openGraph: {
                title: bodyPart.metaTitle,
                description: bodyPart.metaDescription,
                url: canonicalForOg(`/conditions/${slug}`),
                siteName: "Mountain Spine & Orthopedics",
                type: "website",
                locale: "en_US",
                images: [
                    {
                        url: ogImage,
                        width: 1200,
                        height: 630,
                        alt: ogAlt,
                        type: 'image/png',
                    },
                ],
                countryName: 'United States',
            },
            twitter: {
                card: "summary_large_image",
                title: bodyPart.metaTitle,
                description: bodyPart.metaDescription,
                images: [ogImage],
                site: '@mountainspine',
                creator: '@mountainspine',
            },
            other: {
                'geo.region': 'US',
                'geo.placename': 'United States',
                'revisit-after': '7 days',
                'rating': 'general',
                'distribution': 'global',
                'audience': 'all',
            },
        };
    }
    
    // Handle condition metadata (reuse existing logic from ConditionDetails layout)
    const conditionContent = conditionContentPlaceholders.find((c: ConditionContent) => c.slug === slug);
    const condition = conditionContent 
        ? null 
        : conditions.find(c => c.slug === slug);

    if (!conditionContent && !condition) {
        const readableSlug = slug.replace(/-/g, " ");
        const canonicalUrl = buildCanonical(`/conditions/${slug}`);
        return {
            title: `${readableSlug.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} | Mountain Spine & Orthopedics`,
            description: "Learn about orthopedic care and treatments with our specialists in Florida.",
            alternates: {
                canonical: canonicalUrl,
            },
        };
    }

    const isNewFormat = !!conditionContent;
    const canonicalUrl = buildCanonical(`/conditions/${isNewFormat ? conditionContent!.slug : condition!.slug}`);
    
    const slugForMetadata = isNewFormat ? conditionContent!.slug : condition!.slug;
    const title = isNewFormat ? conditionContent!.title : condition!.title;
    
    // Use new thumbnail mapping first, fallback to existing logic
    const conditionImage = conditionThumbnailBySlug[slugForMetadata];
    const ogImage = conditionImage?.url || (isNewFormat
        ? (conditionContent!.heroImage 
               ? (typeof conditionContent!.heroImage === 'string' ? conditionContent!.heroImage : conditionContent!.heroImage.src)
               : getOgImageForPath('/conditions'))
        : (typeof condition!.card_img === 'string' 
            ? condition!.card_img 
            : condition!.card_img?.src || getOgImageForPath('/conditions')));
    
    const ogAlt = conditionImage?.alt || `Illustration of ${title}`;
    
    const seoMetadata = getConditionMetadata(slugForMetadata) || generateConditionMetadataFallback(title);
    
    const finalTitle = normalizeUTF8(seoMetadata.metaTitle);
    const finalDescription = normalizeUTF8(seoMetadata.metaDescription);

    return {
      title: finalTitle,
      description: finalDescription,
      keywords: isNewFormat ? conditionContent!.keywords : (condition!.keywords || [condition!.title, "orthopedic condition", "spine condition"]),
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: finalTitle,
        description: finalDescription,
        url: canonicalUrl,
        siteName: 'Mountain Spine & Orthopedics',
        type: "article",
        images: [{
            url: ogImage,
            width: 1200,
            height: 630,
            alt: ogAlt,
        }],
      },
      twitter: {
        card: "summary_large_image",
        title: finalTitle,
        description: finalDescription,
        images: [ogImage],
      },
    };
}

// Condition schemas component (adapted from ConditionDetails layout)
const ConditionSchemas = async ({ slug }: { slug: string }) => {
    // Check conditionContentPlaceholders first for new ConditionContent format
    const conditionContent = conditionContentPlaceholders.find((c: ConditionContent) => c.slug === slug);
    
    // Legacy fallback - check conditions array for old ConditionInfoProp format
    const condition = conditionContent 
        ? null 
        : conditions.find(c => c.slug === slug);

    if (!conditionContent && !condition) {
        return null;
    }
    
    const isNewFormat = !!conditionContent;
    const conditionTitle = isNewFormat ? conditionContent!.title : condition!.title;
    const conditionDescription = stripHtmlAndMarkdown(isNewFormat ? conditionContent!.overview.body : condition!.body);
    const conditionUrl = buildCanonical(`/conditions/${isNewFormat ? conditionContent!.slug : condition!.slug}`);
    
    // Use new thumbnail mapping first, fallback to existing image logic
    const conditionSlug = isNewFormat ? conditionContent!.slug : condition!.slug;
    const mappedImage = conditionThumbnailBySlug[conditionSlug];
    const imageUrl = mappedImage?.url || (isNewFormat
        ? (conditionContent!.heroImage 
            ? (typeof conditionContent!.heroImage === 'string' ? conditionContent!.heroImage : conditionContent!.heroImage.src)
            : '')
        : (typeof condition!.card_img === 'string' ? condition!.card_img : condition!.card_img?.src || ''));

    // Get meta description for WebPage schema
    const metaDescription = isNewFormat
        ? (conditionContent!.metaDesc ? normalizeUTF8(conditionContent!.metaDesc) : conditionDescription)
        : (condition!.metaDesc ? normalizeUTF8(condition!.metaDesc) : conditionDescription);

    // Helper function to clean symptom text (remove markdown bold, extract clean text)
    const cleanSymptomText = (text: string): string => {
      return text.replace(/\*\*(.*?)\*\*/g, '$1').trim();
    };

    // Helper function to extract risk factors from causes body text
    const extractRiskFactors = (text: string): string[] => {
      // Split by common separators and clean
      const factors = text
        .split(/[,;]|and|or/)
        .map(f => f.trim().replace(/\*\*(.*?)\*\*/g, '$1'))
        .filter(f => f.length > 0 && !f.match(/^(the|a|an|is|are|can|may)$/i));
      return factors.length > 0 ? factors : [text.replace(/\*\*(.*?)\*\*/g, '$1')];
    };

    const baseUrl = 'https://mountainspineorthopedics.com';
    const organizationId = `${baseUrl}#medicalorganization`;
    const webpageId = `${conditionUrl}#webpage`;
    const medicalConditionId = `${conditionUrl}#medicalcondition`;
    const breadcrumbId = `${conditionUrl}#breadcrumb`;
    const serviceId = `${conditionUrl}#service`;

    // 1. MedicalOrganization Schema
    const medicalOrganizationSchema = {
        '@type': 'MedicalOrganization',
        '@id': organizationId,
        'name': 'Mountain Spine & Orthopedics',
        'description': 'Leading spine and orthopedic specialists in Florida providing advanced minimally invasive treatments, including Band-Aid Back Surgery, laser spine procedures, and comprehensive pain management.',
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
        'serviceArea': {
            '@type': 'GeoCircle',
            'geoMidpoint': {
                '@type': 'GeoCoordinates',
                'latitude': 27.7663,
                'longitude': -82.6404
            },
            'geoRadius': '300000'
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
            },
            {
                '@type': 'State',
                'name': 'Georgia',
                'sameAs': 'https://en.wikipedia.org/wiki/Georgia_(U.S._state)'
            }
        ]
    };

    // 2. MedicalCondition Schema
    const medicalConditionSchema: any = {
        '@type': 'MedicalCondition',
        '@id': medicalConditionId,
        'name': conditionTitle,
        'description': conditionDescription,
        'url': conditionUrl,
        'author': {
            '@id': organizationId
        },
        'provider': {
            '@id': organizationId
        }
    };

    // Add optional fields only if they exist
    const alternateName = isNewFormat ? conditionContent!.keywords?.[0] : condition!.keywords?.[0];
    if (alternateName) {
        medicalConditionSchema.alternateName = alternateName;
    }
    if (imageUrl) {
        medicalConditionSchema.image = imageUrl;
    }

    // Add signOrSymptom as array
    if (isNewFormat && conditionContent!.symptoms.list.length > 0) {
        medicalConditionSchema.signOrSymptom = conditionContent!.symptoms.list.map((symptom: string) => ({
            '@type': 'MedicalSymptom',
            'name': cleanSymptomText(symptom)
        }));
    } else if (condition!.what_sym) {
        const symptoms = condition!.what_sym.includes(',') 
            ? condition!.what_sym.split(',').map(s => s.trim())
            : [condition!.what_sym];
        medicalConditionSchema.signOrSymptom = symptoms.map((symptom: string) => ({
            '@type': 'MedicalSymptom',
            'name': symptom.trim()
        }));
    }

    // Add riskFactor as array
    if (isNewFormat && conditionContent!.causes.body) {
        const riskFactors = extractRiskFactors(conditionContent!.causes.body);
        medicalConditionSchema.riskFactor = riskFactors.map((factor: string) => ({
            '@type': 'MedicalRiskFactor',
            'name': factor
        }));
    } else if (condition!.risk_fac) {
        const riskFactors = condition!.risk_fac.includes(',')
            ? condition!.risk_fac.split(',').map(f => f.trim())
            : [condition!.risk_fac];
        medicalConditionSchema.riskFactor = riskFactors.map((factor: string) => ({
            '@type': 'MedicalRiskFactor',
            'name': factor.trim()
        }));
    }

    // Add possibleTreatment
    if (isNewFormat && conditionContent!.conservativeCare.body) {
        medicalConditionSchema.possibleTreatment = {
            '@type': 'MedicalTherapy',
            'name': stripHtmlAndMarkdown(conditionContent!.conservativeCare.body)
        };
    } else if (condition!.treatment) {
        medicalConditionSchema.possibleTreatment = {
            '@type': 'MedicalTherapy',
            'name': stripHtmlAndMarkdown(condition!.treatment)
        };
    }

    // 3. WebPage Schema
    const webpageSchema: any = {
        '@type': 'WebPage',
        '@id': webpageId,
        'url': conditionUrl,
        'name': conditionTitle,
        'description': metaDescription,
        'isPartOf': {
            '@id': `${baseUrl}#website`
        },
        'breadcrumb': {
            '@id': breadcrumbId
        },
        'mainEntity': {
            '@id': medicalConditionId
        },
        'about': {
            '@id': medicalConditionId
        },
        'publisher': {
            '@id': organizationId
        }
    };

    if (imageUrl) {
        webpageSchema.image = imageUrl;
    }

    // Review provenance, structured data only — there is deliberately no visible
    // byline for this.
    //
    // The scoliosis content was reviewed by a physician at the practice, but no
    // individual was named to attribute it to, so `reviewedBy` resolves to the
    // MedicalOrganization: a real entity, and an accurate statement that a
    // medical organisation reviewed the page. Naming a specific doctor requires
    // setting `reviewedBy` on the condition record to that doctor's slug, at
    // which point this emits a Physician object pointing at their profile.
    // It never invents a name.
    const reviewedAt = isNewFormat ? conditionContent!.reviewedAt : undefined;
    const reviewer = isNewFormat && conditionContent!.reviewedBy
        ? getVisibleProviderBySlug(conditionContent!.reviewedBy)
        : undefined;

    if (reviewedAt) {
        webpageSchema.lastReviewed = reviewedAt;
        webpageSchema.dateModified = reviewedAt;
    }
    webpageSchema.reviewedBy = reviewer
        ? {
            '@type': 'Physician',
            'name': reviewer.name,
            'url': `${baseUrl}/about/meetourdoctors/${reviewer.slug}`,
            'medicalSpecialty': reviewer.medicalSpecialty,
        }
        : { '@id': organizationId };

    // 4. Service Schema
    const serviceSchema = {
        '@type': 'Service',
        '@id': serviceId,
        'name': `Treatment for ${conditionTitle}`,
        'description': `Expert diagnosis and treatment of ${conditionTitle} by board-certified orthopedic specialists at Mountain Spine & Orthopedics. Comprehensive care including conservative treatments and advanced minimally invasive surgical options.`,
        'url': conditionUrl,
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
            'name': `${conditionTitle} Treatment Services`,
            'itemListElement': {
                '@type': 'Offer',
                'itemOffered': {
                    '@id': medicalConditionId
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
                'name': 'Conditions',
                'item': `${baseUrl}/conditions` 
            },
            {
                '@type': 'ListItem',
                'position': 3,
                'name': conditionTitle,
                'item': conditionUrl
            }
        ]
    };

    // 6. FAQPage Schema - Use only dedicated FAQ data file
    let faqSchema: any = null;
    const specificFAQs = conditionFAQs[conditionSlug];
    
    if (specificFAQs && specificFAQs.length > 0) {
        faqSchema = {
            '@type': 'FAQPage',
            '@id': `${conditionUrl}#faqpage`,
            'url': conditionUrl,
            'mainEntity': specificFAQs.map(faq => ({
                '@type': 'Question',
                'name': faq.question,
                'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': faq.answer
                }
            })),
            'about': {
                '@id': medicalConditionId
            },
            'isPartOf': {
                '@id': webpageId
            }
        };
    }

    // Build consolidated @graph array
    const graphSchemas: any[] = [
        medicalOrganizationSchema,
        medicalConditionSchema,
        webpageSchema,
        serviceSchema,
        breadcrumbSchema
    ];

    if (faqSchema) {
        graphSchemas.push(faqSchema);
    }

    const consolidatedSchema = {
        '@context': 'https://schema.org',
        '@graph': graphSchemas
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(consolidatedSchema) }}
        />
    );
};

export default async function UnifiedConditionLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
}) {
    const resolvedParams = await params;
    const { slug } = resolvedParams;
    
    // Check if it's a body part - body parts handle schemas in their page component
    const bodyPart = BODY_PARTS.find(bp => bp.slug === slug);
    
    // For conditions, render schemas in the layout
    // For body parts, schemas are in the page component
    return (
        <>
            {!bodyPart && <ConditionSchemas slug={slug} />}
            {children}
        </>
    );
}
