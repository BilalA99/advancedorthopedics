import { selectRelevantProviders } from "@/lib/providers/providerRelevance";
import { notFound } from 'next/navigation';
import { AllTreatments, treatmentContentPlaceholders, allTreatmentContent, TreatmentContent, AllTreatmentsCombined } from '@/components/data/treatments';
import { treatmentThumbnailBySlug } from '@/lib/seo/treatment-images';
import React from 'react';
import Image from 'next/image';
import ConditionDetialsLanding from '@/public/ConditionDetails.jpeg';
import { ConsultationForm } from '@/components/ContactForm';
import BodyPartHeroForm from '@/components/BodyPartHeroForm';
import DoctorCard from '@/components/DoctorCard';
import TreatmentsList from '@/components/TreatmentsList';
import Link from 'next/link';
import { conditions } from '@/components/data/conditions';
import InternalLinkingSection from '@/components/InternalLinkingSection';
import TreatmentFAQ from '@/components/TreatmentFAQ';
import { getBodyPartSlugFromTag, getBodyPartFromTag } from '@/lib/bodyPartMapping';
import { BODY_PARTS } from '@/components/data/bodyParts';
import { isNonEmptyString } from '@/lib/content-validation';

import { conditionContentPlaceholders } from '@/components/data/conditions';
import { resolveConditionSlugHref } from '@/lib/internal-link-redirects';

// Helper: Build a map of all condition/treatment titles to their slugs and type
// Include both old and new format data
const conditionMap = Object.fromEntries([
  ...conditions.map(c => [c.title.toLowerCase(), { slug: c.slug, type: 'condition' }]),
  ...conditionContentPlaceholders.map(c => [c.title.toLowerCase(), { slug: c.slug, type: 'condition' }])
]);
const treatmentMap = Object.fromEntries([
  ...AllTreatments.map(t => [t.title.toLowerCase(), { slug: t.slug, type: 'treatment' }]),
  ...allTreatmentContent.map(t => [t.title.toLowerCase(), { slug: t.slug, type: 'treatment' }])
]);
const allTitles = [
  ...conditions.map(c => c.title),
  ...conditionContentPlaceholders.map(c => c.title),
  ...AllTreatments.map(t => t.title),
  ...allTreatmentContent.map(t => t.title)
];

// Enhanced function to handle both bold text conversion and internal linking
function processTextWithBoldAndLinks(text: string, currentSlug: string): string {
  if (!text || typeof text !== 'string') return text;
  
  // Step 0: Remove bold formatting from "Physical Therapy" / "physical therapy" (not a service we offer)
  let processed = text.replace(/\*\*Physical Therapy\*\*/gi, 'Physical Therapy');
  processed = processed.replace(/\*\*physical therapy\*\*/gi, 'physical therapy');
  
  // Step 1: ALWAYS convert **bold** markdown to <strong> tags first (even if HTML links exist)
  // This handles cases where markdown is inside HTML links like <a>**text**</a>
  processed = processed.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  
  // Step 2: Clean up Physical Therapy links/bold that might have been created
  processed = processed.replace(/<a[^>]*>Physical Therapy<\/a>/gi, 'Physical Therapy')
                       .replace(/<a[^>]*>physical therapy<\/a>/gi, 'physical therapy')
                       .replace(/<strong>Physical Therapy<\/strong>/gi, 'Physical Therapy')
                       .replace(/<strong>physical therapy<\/strong>/gi, 'physical therapy');
  
  // Step 3: If text already contains HTML links, we're done (don't add more links)
  if (processed.includes('<a href=')) {
    return processed;
  }
  
  // Step 4: Linkify text that doesn't already have links
  // Sort titles by length descending to avoid partial matches
  const sortedTitles = allTitles.slice().sort((a, b) => b.length - a.length);
  
  // Track which slugs have already been linked
  const linkedSlugs = new Set<string>();
  
  // Split into segments to avoid linking inside existing HTML tags
  const segments: Array<{ type: 'text' | 'html'; content: string }> = [];
  let lastIndex = 0;
  const tagRegex = /<[^>]+>/g;
  let tagMatch;
  
  while ((tagMatch = tagRegex.exec(processed)) !== null) {
    if (tagMatch.index > lastIndex) {
      segments.push({
        type: 'text',
        content: processed.substring(lastIndex, tagMatch.index)
      });
    }
    segments.push({
      type: 'html',
      content: tagMatch[0]
    });
    lastIndex = tagMatch.index + tagMatch[0].length;
  }
  
  if (lastIndex < processed.length) {
    segments.push({
      type: 'text',
      content: processed.substring(lastIndex)
    });
  }
  
  // Process only text segments for linking
  const processedSegments = segments.map(segment => {
    if (segment.type === 'html') {
      return segment.content;
    }
    
    let textContent = segment.content;
    
    sortedTitles.forEach(title => {
      const lowerTitle = title.toLowerCase();
      const cond = conditionMap[lowerTitle];
      const treat = treatmentMap[lowerTitle];
      const slug = cond ? cond.slug : treat ? treat.slug : null;
      const type = cond ? 'condition' : treat ? 'treatment' : null;
      
      if (!slug || slug === currentSlug) return;
      if (lowerTitle === 'physical therapy') return;
      if (linkedSlugs.has(slug)) return;
      
      const escapedTitle = title.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
      const titleRegex = new RegExp(`(?<![\\w-])${escapedTitle}(?![\\w-])`, 'gi');
      
      let hasMatched = false;
      textContent = textContent.replace(titleRegex, (match) => {
        if (hasMatched) return match;
        hasMatched = true;
        linkedSlugs.add(slug);
        const href = type === 'condition' ? resolveConditionSlugHref(slug) : `/treatments/${slug}`;
        return `<a href="${href}" class="underline text-[#252932] hover:text-[#2358AC]">${match}</a>`;
      });
    });
    
    return textContent;
  });
  
  processed = processedSegments.join('');
  
  // Step 5: Final cleanup - remove any Physical Therapy links
  processed = processed.replace(/<a[^>]*>Physical Therapy<\/a>/gi, 'Physical Therapy')
                       .replace(/<a[^>]*>physical therapy<\/a>/gi, 'physical therapy');
  
  return processed;
}

// Helper function to process numbered list steps - wraps first part in styled element if plain text
function processNumberedListStep(step: string, currentSlug: string): string {
  if (!step || typeof step !== 'string') return step;
  
  // If step already has HTML tags (like <h3>), just process it normally
  if (step.includes('<h3>') || step.includes('<p>') || step.includes('<strong>') || step.includes('<a')) {
    return processTextWithBoldAndLinks(step, currentSlug);
  }
  
  // For plain text steps, identify the "heading" part
  // Pattern 1: Text ending with colon (e.g., "Pre-Procedure: Diagnostic Block")
  const colonMatch = step.match(/^([^:]+:)\s*(.+)$/);
  if (colonMatch) {
    const heading = colonMatch[1].trim();
    const rest = colonMatch[2].trim();
    return `<span class="numbered-list-heading">${processTextWithBoldAndLinks(heading, currentSlug)}</span> ${processTextWithBoldAndLinks(rest, currentSlug)}`;
  }
  
  // Pattern 2: First sentence ending with period, followed by more text
  const sentenceMatch = step.match(/^([^.]+\.[^.]*)\s+(.+)$/);
  if (sentenceMatch) {
    const firstSentence = sentenceMatch[1].trim();
    const rest = sentenceMatch[2].trim();
    return `<span class="numbered-list-heading">${processTextWithBoldAndLinks(firstSentence, currentSlug)}</span> ${processTextWithBoldAndLinks(rest, currentSlug)}`;
  }
  
  // Pattern 3: Single sentence - style the whole thing as heading
  // This handles cases like "An incision is made to access the hip joint (typically posterior approach)"
  return `<span class="numbered-list-heading">${processTextWithBoldAndLinks(step, currentSlug)}</span>`;
}

function linkifyText(text: string, currentSlug: string): string {
  if (!text || typeof text !== 'string') return text;
  let replaced = text;
  // Sort titles by length descending to avoid partial matches
  const sortedTitles = allTitles.slice().sort((a, b) => b.length - a.length);
  sortedTitles.forEach(title => {
    const lowerTitle = title.toLowerCase();
    const cond = conditionMap[lowerTitle];
    const treat = treatmentMap[lowerTitle];
    const slug = cond ? cond.slug : treat ? treat.slug : null;
    const type = cond ? 'condition' : treat ? 'treatment' : null;
    if (!slug || slug === currentSlug) return;
    // Only link if the title matches exactly as a whole word/phrase
    const regex = new RegExp(`(?<![\\w-])${title.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}(?![\\w-])`, 'g');
    replaced = replaced.replace(regex, match => {
      const href = type === 'condition' ? resolveConditionSlugHref(slug) : `/treatments/${slug}`;
      return `<a href="${href}" class="underline text-[#252932]">${match}</a>`;
    });
  });
  return replaced;
}

// Helper to render string or JSX/ReactNode fields (converts ** to <strong>, adds internal links)
function renderField(field: any, currentSlug: string) {
  if (!field) return null;
  if (typeof field === 'string') {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: processTextWithBoldAndLinks(field, currentSlug) }}
      />
    );
  }
  if (React.isValidElement(field)) {
    return field;
  }
  return null;
}

export const dynamicParams = false;        // ⬅ 404 unknown slugs immediately

export async function generateStaticParams() {
  const allSlugs = [
    ...allTreatmentContent.map(t => ({ TreatmentDetails: t.slug })),
    ...AllTreatments.map(t => ({ TreatmentDetails: t.slug }))
  ];
  return allSlugs;
}

export default async function Page({ params }: { params: Promise<{ TreatmentDetails: string }> }) {
  const resolvedParams = await params;
  
  // Check for new TreatmentContent format first (includes all batches)
  const treatmentContent = allTreatmentContent.find((x: TreatmentContent) => x.slug === resolvedParams.TreatmentDetails);
  
  // Fall back to old TreatmentsCardProp format
  const treatment = treatmentContent 
    ? null 
    : AllTreatments.find(t => t.slug === resolvedParams.TreatmentDetails);
  
  if (!treatmentContent && !treatment) notFound();
  
  // Use new format if available, otherwise use old format
  const isNewFormat = !!treatmentContent;

  // Derive a meaningful body-part label for the hero form (e.g. "Neck", "Spine", "Knee")
  // so the form reads "Experiencing Neck Pain?" instead of the full procedure name
  const _treatmentSlug = isNewFormat ? treatmentContent!.slug : treatment!.slug;
  const _combinedTreatment = AllTreatmentsCombined.find(t => t.slug === _treatmentSlug);
  const _bodyPartHub = getBodyPartFromTag(_combinedTreatment?.tag);
  const heroFormLabel = _bodyPartHub?.title ?? 'Orthopedic';


    // Physicians are matched to the treatment's clinical domain rather than picked
    // from the full roster — see lib/providers/providerRelevance.ts. An empty list
    // means no verified provider offers this treatment, and the module is hidden.
    const randomDoctors = selectRelevantProviders({
      slug: _treatmentSlug,
      tag: _combinedTreatment?.tag,
      additionalTags: _combinedTreatment?.additionalTags,
    });

    // Page-specific physician heading when the record supplies one; every
    // treatment without it keeps the original wording.
    const doctorsHeading =
      (isNewFormat ? treatmentContent!.doctorsHeading : undefined) ?? 'Meet our Doctors';

  return (
    <main className='w-full flex flex-col items-center justify-center bg-white h-full'>
      {/* Landing */}
      <section className="w-full h-full flex flex-col relative overflow-hidden [mask-composite:intersect] [mask-image:linear-gradient(to_top,transparent,black_6rem)]" >
        <div
          style={{
            filter: 'blur(30px)'
          }}
          className="w-full h-[120px] absolute top-0 z-[1]"
        />
        <Image
          src={'/herosectionimg.jpg'}
          priority={true}
          fetchPriority="high"
          layout='fill'
          className="h-full absolute top-0 object-cover object-center md:object-center w-full"
          alt={`A surgeon discussing ${isNewFormat ? treatmentContent!.title : treatment!.title} options with a patient in Florida`}
        />
        <div
          className="lg:w-[100%] z-[1] h-full absolute left-0 top-0 md:w-[100%] w-full"
          style={{
            background: 'linear-gradient(180deg, rgba(10, 80, 236, 0.20) 0%, rgba(255, 255, 255, 0.20) 100%)',
          }}
        />
        {/* <div
        className="lg:w-[100%] z-[1] h-full absolute left-0 top-0 md:w-[85%] w-full"
        style={{
          background: '#5FBBEC',
        }}
      /> */}
        <div className="z-[1] flex flex-col w-full h-full text-left relative">
          <div className="max-w-[1440px] mx-auto w-full flex flex-col lg:flex-row items-start px-6 xl:px-[80px] pt-[220px] pb-10 gap-8 lg:gap-12 z-[2]">
            {/* Left: Breadcrumb + H1 + Description */}
            <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left pb-6 lg:pb-0">
              <div
                className="text-xs md:text-md flex flex-row space-x-[4px] rounded-[62px] w-fit items-center justify-center px-[20px] py-[10px] mb-4"
                style={{ background: 'rgba(255, 255, 255, 0.50)' }}
              >
                <span style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 400 }} className="text-[#252932]">Treatment</span>
                <span style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 400 }} className="text-[#252932]">/</span>
                <span style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 400 }} className="text-[#2358AC]">Treatment Details</span>
                <span style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 400 }} className="text-[#252932] sm:inline hidden">/</span>
                <span style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 400 }} className="text-[#2358AC] sm:inline hidden">
                  {isNewFormat ? treatmentContent!.title : treatment!.title}
                </span>
              </div>
              <h1
                style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 400 }}
                className="text-[#252932] flex-wrap text-3xl md:text-6xl lg:text-7xl"
              >
                {isNewFormat ? treatmentContent!.title : treatment!.title}
              </h1>
              <div className="mt-[24px] lg:max-w-[600px]">
                {renderField(
                  isNewFormat
                    ? (treatmentContent!.heroDescription || treatmentContent!.metaDescription)
                    : treatment!.body,
                  isNewFormat ? treatmentContent!.slug : treatment!.slug
                )}
              </div>
            </div>
            {/* Right: Hero Form — aligned with H1, not breadcrumb */}
            <div className="w-full max-w-[340px] sm:max-w-[360px] flex-shrink-0 mx-auto lg:mx-0 lg:mt-[52px]">
              <BodyPartHeroForm bodyPartTitle={heroFormLabel} />
            </div>
          </div>
        </div>
      </section>

      <section className='max-w-[1440px] w-full flex lg:flex-row flex-col relative py-[50px] px-6 xl:px-[80px] space-x-[60px]'>
        <aside className='lg:w-[30%] w-full lg:order-1 order-2 bg-white flex flex-col lg:overflow-hidden lg:flex-shrink-0 lg:items-stretch'>
          <div className='lg:flex-shrink-0'>
            <ConsultationForm />
          </div>
          <div className='mt-10 lg:flex-shrink-0' />
          <div className='flex flex-col space-y-[20px] hover:cursor-pointer mt-[32px] lg:mt-4 lg:flex-1 lg:min-h-0 lg:overflow-hidden'>
            <TreatmentsList
              currentTreatment={isNewFormat ? treatmentContent!.title : treatment!.title}
              filterByTag={AllTreatmentsCombined.find(t => t.slug === _treatmentSlug)?.tag}
            />
          </div>

          {randomDoctors.length > 0 && (
          <section className='bg-white space-y-[40px] lg:hidden flex flex-col mt-6'>
            <h2
              style={{
                fontFamily: "var(--font-public-sans)",
                fontWeight: 400,
              }}
              className="text-[#111315] sm:text-5xl text-3xl"
            >
              {doctorsHeading}
            </h2>
            <div className='grid grid-cols-1 xl:grid-cols-2 gap-x-[32px] gap-y-[32px] '>
              {
                randomDoctors.map((doctor) => (
                  <DoctorCard doctor={doctor} key={doctor.name} />
                ))
              }
            </div>
          </section>
          )}
          <div className='lg:hidden flex flex-col mt-6'>
            <InternalLinkingSection currentSlug={isNewFormat ? treatmentContent!.slug : treatment!.slug} pageType="treatment" />
          </div>

        </aside>


        <div className=' w-full lg:w-[70%] lg:order-2 order-1  flex flex-col space-y-[60px] lg:mt-0 mt-6 rounded-[24px] '>
          <section className='bg-[#FAFAFA] space-y-[40px] flex flex-col w-full p-4 md:p-[40px] rounded-[24px]'>
            {isNewFormat && treatmentContent ? (
              <>
                {/* Overview Section */}
                {treatmentContent.overview && (
                  <div className=' flex flex-col space-y-[16px] '>
                    <h2
                      style={{
                        fontFamily: 'var(--font-public-sans)',
                        fontWeight: 500,
                      }}
                      className='text-[#111315] sm:text-5xl text-2xl'
                    >
                      {treatmentContent.overview.heading}
                    </h2>
                    <div
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontWeight: 400,
                      }}
                      className='text-[#424959] sm:text-xl text-sm [&_strong]:font-semibold [&_strong]:text-[#111315] [&_a]:underline [&_a]:text-[#252932] [&_a:hover]:text-[#2358AC]'
                      dangerouslySetInnerHTML={{ __html: processTextWithBoldAndLinks(treatmentContent.overview.body, treatmentContent.slug) }}
                    />
                  </div>
                )}

                {/* Back to Hub Callout */}
                {(() => {
                  // Get treatment tag from AllTreatmentsCombined (includes tag derived from keywords for new format)
                  const combinedTreatment = AllTreatmentsCombined.find(t => t.slug === treatmentContent.slug);
                  const treatmentTag = combinedTreatment?.tag || null;
                  
                  const bodyPartSlug = treatmentTag ? getBodyPartSlugFromTag(treatmentTag) : null;
                  if (bodyPartSlug) {
                    const hub = getBodyPartFromTag(treatmentTag);
                    return (
                      <div className="mb-8 p-4 bg-[#F0F7FF] border-l-4 border-[#0A50EC] rounded">
                        <p 
                          style={{
                            fontFamily: 'var(--font-public-sans)',
                            fontWeight: 400,
                          }}
                          className="text-[#424959] text-base mb-2"
                        >
                          <strong 
                            style={{
                              fontFamily: 'var(--font-public-sans)',
                              fontWeight: 600,
                            }}
                          >
                            Explore {hub?.title} Conditions & Treatments
                          </strong>
                        </p>
                        <Link 
                          href={`/conditions/${bodyPartSlug}`}
                          className="text-[#0A50EC] hover:underline font-medium"
                          style={{
                            fontFamily: 'var(--font-public-sans)',
                            fontWeight: 500,
                          }}
                        >
                          View all {hub?.title.toLowerCase()} conditions and treatment options →
                        </Link>
                      </div>
                    );
                  }
                  return null;
                })()}

                {/* Candidates Section */}
                {treatmentContent.candidates && treatmentContent.candidates.list.length > 0 && (
                  <div className=' flex flex-col space-y-[16px] '>
                    <h2
                      style={{
                        fontFamily: 'var(--font-public-sans)',
                        fontWeight: 500,
                      }}
                      className='text-[#111315] text-2xl sm:text-4xl'
                    >
                      {treatmentContent.candidates.heading}
                    </h2>
                    <ul className="list-disc pl-5 space-y-2">
                      {treatmentContent.candidates.list.map((candidate, index) => (
                        <li
                          key={index}
                          style={{
                            fontFamily: 'var(--font-inter)',
                            fontWeight: 400,
                          }}
                          className='text-[#424959] sm:text-xl text-sm [&_strong]:font-semibold [&_strong]:text-[#111315] [&_a]:underline [&_a]:text-[#252932] [&_a:hover]:text-[#2358AC]'
                          dangerouslySetInnerHTML={{ __html: processTextWithBoldAndLinks(candidate, treatmentContent.slug) }}
                        />
                      ))}
                    </ul>
                  </div>
                )}

                {/* Conditions This Procedure Helps - Linked List */}
                {(() => {
                  // Get treatment tag to find related conditions
                  const combinedTreatment = AllTreatmentsCombined.find(t => t.slug === treatmentContent.slug);
                  const treatmentTag = combinedTreatment?.tag || null;
                  
                  if (treatmentTag) {
                    // Filter conditions that match the treatment's tag
                    const relatedConditions = conditions
                      .filter(c => c.tag === treatmentTag)
                      .slice(0, 6); // Limit to 6 conditions
                    
                    if (relatedConditions.length > 0) {
                      return (
                        <div className=' flex flex-col space-y-[16px] '>
                          <h2
                            style={{
                              fontFamily: 'var(--font-public-sans)',
                              fontWeight: 500,
                            }}
                            className='text-[#111315] text-2xl sm:text-4xl'
                          >
                            What Conditions does {treatmentContent.title} Help Ease?
                          </h2>
                          <p
                            style={{
                              fontFamily: 'var(--font-inter)',
                              fontWeight: 400,
                            }}
                            className='text-[#424959] sm:text-xl text-sm mb-4'
                          >
                            This procedure may help with:
                          </p>
                          <div className="flex flex-wrap gap-3">
                            {relatedConditions.map((condition) => (
                              <Link
                                key={condition.slug}
                                href={`/conditions/${condition.slug}`}
                                className="bg-white border hover:cursor-pointer border-[#252932] px-[20px] py-[10px] rounded-[62px] text-sm transition-colors hover:bg-[#FAFAFA]"
                              >
                                <span
                                  style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                  }}
                                  className="text-[#252932]"
                                >
                                  {condition.title}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      );
                    }
                  }
                  // Fallback: show nothing if no conditions found (candidates section already exists)
                  return null;
                })()}

                {/* Hero Image */}
                {treatmentContent.heroImage && (
                  <Image
                    src={treatmentContent.heroImage}
                    alt={
                      treatmentContent.heroImageAlt || 
                      (typeof treatmentContent.heroImage === 'string' && treatmentThumbnailBySlug[treatmentContent.slug]?.alt) ||
                      treatmentContent.title
                    }
                    title={
                      (typeof treatmentContent.heroImage === 'string' && treatmentThumbnailBySlug[treatmentContent.slug]?.title) ||
                      undefined
                    }
                    width={300}
                    height={300}
                    layout="responsive"
                    className="w-full h-full object-cover object-center rounded-[24px] bg-[#FAFAFA] items-center justify-center flex overflow-hidden aspect-video"
                  />
                )}

                {/* Procedure Section */}
                {treatmentContent.procedure && treatmentContent.procedure.steps.length > 0 && (
                  <div className=' flex flex-col space-y-[16px] '>
                    <h2
                      style={{
                        fontFamily: 'var(--font-public-sans)',
                        fontWeight: 500,
                      }}
                      className='text-[#111315] text-2xl sm:text-4xl'
                    >
                      {treatmentContent.procedure.heading}
                    </h2>
                    <ol className="list-decimal pl-5 space-y-2 [&_li_h3]:font-bold [&_li_h3]:text-lg [&_li_h3]:sm:text-xl [&_li_h3]:text-[#111315] [&_li_h3]:mb-2 [&_li_p]:text-[#424959] [&_li_p]:sm:text-xl [&_li_p]:text-sm [&_li_p]:font-normal [&_li_.numbered-list-heading]:font-bold [&_li_.numbered-list-heading]:text-lg [&_li_.numbered-list-heading]:sm:text-xl [&_li_.numbered-list-heading]:text-[#111315]">
                      {treatmentContent.procedure.steps.map((step, index) => (
                        <li
                          key={index}
                          style={{
                            fontFamily: 'var(--font-inter)',
                            fontWeight: 400,
                          }}
                          className='text-[#424959] sm:text-xl text-sm [&_strong]:font-semibold [&_strong]:text-[#111315] [&_a]:underline [&_a]:text-[#252932] [&_a:hover]:text-[#2358AC]'
                          dangerouslySetInnerHTML={{ __html: processNumberedListStep(step, treatmentContent.slug) }}
                        />
                      ))}
                    </ol>
                  </div>
                )}

                {/* Benefits Section */}
                {treatmentContent.benefits.length > 0 && (
                  <div className=' flex flex-col space-y-[16px] '>
                    <h2
                      style={{
                        fontFamily: 'var(--font-public-sans)',
                        fontWeight: 500,
                      }}
                      className='text-[#111315] text-2xl sm:text-4xl'
                    >
                      Benefits of {treatmentContent.title}
                    </h2>
                    <ul className="list-disc pl-5 space-y-2">
                      {treatmentContent.benefits.map((benefit, index) => (
                        <li
                          key={index}
                          style={{
                            fontFamily: 'var(--font-inter)',
                            fontWeight: 400,
                          }}
                          className='text-[#424959] sm:text-xl text-sm [&_strong]:font-semibold [&_strong]:text-[#111315] [&_a]:underline [&_a]:text-[#252932] [&_a:hover]:text-[#2358AC]'
                          dangerouslySetInnerHTML={{ __html: processTextWithBoldAndLinks(benefit, treatmentContent.slug) }}
                        />
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recovery Section */}
                {treatmentContent.recovery && (
                  <div className=' flex flex-col space-y-[16px] '>
                    <h2
                      style={{
                        fontFamily: 'var(--font-public-sans)',
                        fontWeight: 500,
                      }}
                      className='text-[#111315] text-2xl sm:text-4xl'
                    >
                      {treatmentContent.recovery.heading}
                    </h2>
                    <div className="mb-4">
                      <span
                        style={{
                          fontFamily: 'var(--font-public-sans)',
                          fontWeight: 600,
                        }}
                        className='text-[#111315] sm:text-2xl text-xl'
                      >
                        Recovery Timeline: {treatmentContent.recovery.timeline}
                      </span>
                    </div>
                    <p
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontWeight: 400,
                      }}
                      className='text-[#424959] sm:text-xl text-sm [&_strong]:font-semibold [&_strong]:text-[#111315] [&_a]:underline [&_a]:text-[#252932] [&_a:hover]:text-[#2358AC]'
                      dangerouslySetInnerHTML={{ __html: processTextWithBoldAndLinks(treatmentContent.recovery.details, treatmentContent.slug) }}
                    />
                  </div>
                )}

                {/* Related {Body Part} Treatments Section */}
                {(() => {
                  // Get treatment tag to find related treatments
                  const combinedTreatment = AllTreatmentsCombined.find(t => t.slug === treatmentContent.slug);
                  const treatmentTag = combinedTreatment?.tag || null;
                  const bodyPartSlug = treatmentTag ? getBodyPartSlugFromTag(treatmentTag) : null;
                  const hub = bodyPartSlug ? getBodyPartFromTag(treatmentTag) : null;
                  
                  if (treatmentTag && hub) {
                    // Filter treatments that match the same tag, exclude current treatment
                    const relatedTreatments = AllTreatmentsCombined
                      .filter(t => t.tag === treatmentTag && t.slug !== treatmentContent.slug)
                      .slice(0, 8); // Limit to 8 treatments
                    
                    if (relatedTreatments.length > 0) {
                      return (
                        <div className=' flex flex-col space-y-[16px] '>
                          <h2
                            style={{
                              fontFamily: 'var(--font-public-sans)',
                              fontWeight: 500,
                            }}
                            className='text-[#111315] text-2xl sm:text-4xl'
                          >
                            Related {hub.title} Treatments
                          </h2>
                          <p
                            style={{
                              fontFamily: 'var(--font-inter)',
                              fontWeight: 400,
                            }}
                            className='text-[#424959] sm:text-xl text-sm mb-4'
                          >
                            Explore other {hub.title.toLowerCase()} treatment options:
                          </p>
                          <div className="flex flex-wrap gap-3">
                            {relatedTreatments.map((relatedTreatment) => (
                              <Link
                                key={relatedTreatment.slug}
                                href={`/treatments/${relatedTreatment.slug}`}
                                className="bg-white border hover:cursor-pointer border-[#252932] px-[20px] py-[10px] rounded-[62px] text-sm transition-colors hover:bg-[#FAFAFA]"
                              >
                                <span
                                  style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                  }}
                                  className="text-[#252932]"
                                >
                                  {relatedTreatment.title}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      );
                    }
                  }
                  return null;
                })()}

                {/* FAQ Section from dedicated data file */}
                <TreatmentFAQ slug={treatmentContent.slug} />

                {/* Schedule a Consultation Today */}
                <div className=' flex flex-col space-y-[16px] '>
                  <h2
                    style={{
                      fontFamily: 'var(--font-public-sans)',
                      fontWeight: 500,
                    }}
                    className='text-[#111315] text-2xl sm:text-4xl'
                  >
                    Schedule a Consultation Today
                  </h2>
                  {treatmentContent.schedule && (
                    <div
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontWeight: 400,
                      }}
                      className='text-[#424959] sm:text-xl text-sm [&_strong]:font-semibold [&_strong]:text-[#111315] [&_a]:underline [&_a]:text-[#252932] [&_a:hover]:text-[#2358AC]'
                      dangerouslySetInnerHTML={{ __html: processTextWithBoldAndLinks(treatmentContent.schedule, treatmentContent.slug) }}
                    />
                  )}
                  <Link href="/find-care/candidacy-check">
                    <button
                      style={{
                        fontFamily: 'var(--font-public-sans)',
                        fontWeight: 500,
                      }}
                      className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-[62px] bg-[#2358AC] text-white text-base font-semibold hover:bg-[#1a4a8a] transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      Take our quick candidacy check form
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </Link>
                </div>

                {/* Locations Offering Evaluation - visually connected to Schedule CTA */}
                <div className=' flex flex-col space-y-[16px] '>
                  <h2
                    style={{
                      fontFamily: 'var(--font-public-sans)',
                      fontWeight: 500,
                    }}
                    className='text-[#111315] text-2xl sm:text-4xl'
                  >
                    Locations Offering Evaluation
                  </h2>
                  <p
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontWeight: 400,
                    }}
                    className="text-[#424959] sm:text-xl text-sm"
                  >
                    Our board-certified specialists offer {treatmentContent.title.toLowerCase()} evaluation and treatment at locations across Florida, New Jersey, New York, Pennsylvania, and Georgia. Schedule a consultation at a clinic near you.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/locations"
                      className="bg-white border border-[#252932] text-[#252932] px-5 py-2.5 rounded-full text-sm hover:bg-[#F0F0F0] transition-colors"
                      style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 400 }}
                    >
                      View All Locations
                    </Link>
                    <Link
                      href="/locations/florida"
                      className="bg-white border border-[#252932] text-[#252932] px-5 py-2.5 rounded-full text-sm hover:bg-[#F0F0F0] transition-colors"
                      style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 400 }}
                    >
                      Florida Locations
                    </Link>
                    <Link
                      href="/locations/new-jersey"
                      className="bg-white border border-[#252932] text-[#252932] px-5 py-2.5 rounded-full text-sm hover:bg-[#F0F0F0] transition-colors"
                      style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 400 }}
                    >
                      New Jersey Locations
                    </Link>
                    <Link
                      href="/locations/new-york"
                      className="bg-white border border-[#252932] text-[#252932] px-5 py-2.5 rounded-full text-sm hover:bg-[#F0F0F0] transition-colors"
                      style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 400 }}
                    >
                      New York Locations
                    </Link>
                    <Link
                      href="/locations/pennsylvania"
                      className="bg-white border border-[#252932] text-[#252932] px-5 py-2.5 rounded-full text-sm hover:bg-[#F0F0F0] transition-colors"
                      style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 400 }}
                    >
                      Pennsylvania Locations
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Legacy Format - Keep existing rendering */}
                {/* Detail (skip redundant "About" - same text as hero subtitle) */}
                {/* What is {treatment.title}? */}
                {treatment && isNonEmptyString(treatment.detail) && (
                  <div className=' flex flex-col space-y-[16px] '>
                    <h2
                      style={{
                        fontFamily: 'var(--font-public-sans)',
                        fontWeight: 500,
                      }}
                      className='text-[#111315] text-2xl sm:text-4xl'
                    >
                      What is {treatment.title}?
                    </h2>
                    <div
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontWeight: 400,
                      }}
                      className='text-[#424959] sm:text-xl text-sm'
                    >
                      {renderField(treatment.detail, treatment.slug)}
                    </div>
                  </div>
                )}

                {/* Back to Hub Callout */}
                {(() => {
                  const treatmentTag = treatment!.tag || null;
                  const bodyPartSlug = treatmentTag ? getBodyPartSlugFromTag(treatmentTag) : null;
                  if (bodyPartSlug) {
                    const hub = getBodyPartFromTag(treatmentTag);
                    return (
                      <div className="mb-8 p-4 bg-[#F0F7FF] border-l-4 border-[#0A50EC] rounded">
                        <p 
                          style={{
                            fontFamily: 'var(--font-public-sans)',
                            fontWeight: 400,
                          }}
                          className="text-[#424959] text-base mb-2"
                        >
                          <strong 
                            style={{
                              fontFamily: 'var(--font-public-sans)',
                              fontWeight: 600,
                            }}
                          >
                            Explore {hub?.title} Conditions & Treatments
                          </strong>
                        </p>
                        <Link 
                          href={`/conditions/${bodyPartSlug}`}
                          className="text-[#0A50EC] hover:underline font-medium"
                          style={{
                            fontFamily: 'var(--font-public-sans)',
                            fontWeight: 500,
                          }}
                        >
                          View all {hub?.title.toLowerCase()} conditions and treatment options →
                        </Link>
                      </div>
                    );
                  }
                  return null;
                })()}

                <Image
                  src={treatment!.inTxt_img || '/default-treatment.png'}
                  alt={treatment!.title}
                  width={300}
                  height={300}
                  layout="responsive"
                  className="w-full h-full object-cover object-center rounded-[24px] bg-[#FAFAFA] items-center justify-center flex overflow-hidden aspect-video"
                />

                {treatment && isNonEmptyString(treatment.procedure_info) && (
                  <div className=' flex flex-col space-y-[16px] '>
                    <h2
                      style={{
                        fontFamily: 'var(--font-public-sans)',
                        fontWeight: 500,
                      }}
                      className='text-[#111315] text-2xl sm:text-4xl'
                    >
                      What does {treatment.title} look like?
                    </h2>
                    <div
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontWeight: 400,
                      }}
                      className='text-[#424959] sm:text-xl text-sm [&_strong]:font-semibold [&_strong]:text-[#111315] [&_a]:underline [&_a]:text-[#252932] [&_a:hover]:text-[#2358AC] [&_h3]:font-semibold [&_h3]:text-[#111315] [&_h3]:text-xl [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:first:mt-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ul]:mt-2'
                    >
                      {renderField(treatment.procedure_info, treatment.slug)}
                    </div>
                  </div>
                )}


                {/* Conditions it Treats */}
                {treatment && isNonEmptyString(treatment.conditions_treated) && (
                  <div className=' flex flex-col space-y-[16px] '>
                    <h2
                      style={{
                        fontFamily: 'var(--font-public-sans)',
                        fontWeight: 500,
                      }}
                      className='text-[#111315] text-2xl sm:text-4xl'
                    >
                      What Conditions does {treatment.title} Help Ease?
                    </h2>
                    <div
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontWeight: 400,
                      }}
                      className='text-[#424959] sm:text-xl text-sm [&_strong]:font-semibold [&_strong]:text-[#111315] [&_a]:underline [&_a]:text-[#252932] [&_a:hover]:text-[#2358AC]'
                    >
                      {renderField(treatment.conditions_treated, treatment.slug)}
                    </div>
                  </div>
                )}

                {treatment && ((typeof treatment.benefits === 'string' && isNonEmptyString(treatment.benefits)) || (treatment.benefits && typeof treatment.benefits !== 'string')) && (
                  <div className=' flex flex-col space-y-[16px] '>
                    <h2
                      style={{
                        fontFamily: 'var(--font-public-sans)',
                        fontWeight: 500,
                      }}
                      className='text-[#111315] text-2xl sm:text-4xl'
                    >
                      Benefits of {treatment.title}
                    </h2>
                    <div
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontWeight: 400,
                      }}
                      className='text-[#424959] sm:text-xl text-sm [&_strong]:font-semibold [&_strong]:text-[#111315] [&_a]:underline [&_a]:text-[#252932] [&_a:hover]:text-[#2358AC] [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1 [&_li]:list-item [&_li]:mb-1'
                    >
                      {typeof treatment.benefits === 'string' ? (
                        treatment.benefits.trim().startsWith('<ul>') || treatment.benefits.includes('</li>') ? (
                          <div className="[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_li]:list-item" dangerouslySetInnerHTML={{ __html: processTextWithBoldAndLinks(treatment.benefits, treatment.slug) }} />
                        ) : (
                          <ul className="list-disc pl-5 space-y-2">
                            {treatment.benefits
                              .split(/\n+/)
                              .map((line: string) => line.trim())
                              .filter(Boolean)
                              .map((line: string, index: number) => (
                                <li key={index} dangerouslySetInnerHTML={{ __html: linkifyText(line, treatment.slug) }} />
                              ))}
                          </ul>
                        )
                      ) : (
                        typeof treatment.benefits !== 'string' && treatment.benefits
                      )}
                    </div>
                  </div>
                )}

                {/* Recovery Info */}
                {treatment && isNonEmptyString(treatment.recovery_info) && (
                  <div className=' flex flex-col space-y-[16px] '>
                    <h2
                      style={{
                        fontFamily: 'var(--font-public-sans)',
                        fontWeight: 500,
                      }}
                      className='text-[#111315] text-2xl sm:text-4xl'
                    >
                      What does post {treatment.title} recovery look like?
                    </h2>
                    <div
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontWeight: 400,
                      }}
                      className='text-[#424959] sm:text-xl text-sm [&_strong]:font-semibold [&_strong]:text-[#111315] [&_a]:underline [&_a]:text-[#252932] [&_a:hover]:text-[#2358AC]'
                    >
                      {renderField(treatment.recovery_info, treatment.slug)}
                    </div>
                  </div>
                )}

                {/* Related {Body Part} Treatments Section */}
                {(() => {
                  const treatmentTag = treatment!.tag || null;
                  const bodyPartSlug = treatmentTag ? getBodyPartSlugFromTag(treatmentTag) : null;
                  const hub = bodyPartSlug ? getBodyPartFromTag(treatmentTag) : null;
                  
                  if (treatmentTag && hub) {
                    // Filter treatments that match the same tag, exclude current treatment
                    const relatedTreatments = AllTreatmentsCombined
                      .filter(t => t.tag === treatmentTag && t.slug !== treatment!.slug)
                      .slice(0, 8); // Limit to 8 treatments
                    
                    if (relatedTreatments.length > 0) {
                      return (
                        <div className=' flex flex-col space-y-[16px] '>
                          <h2
                            style={{
                              fontFamily: 'var(--font-public-sans)',
                              fontWeight: 500,
                            }}
                            className='text-[#111315] text-2xl sm:text-4xl'
                          >
                            Related {hub.title} Treatments
                          </h2>
                          <p
                            style={{
                              fontFamily: 'var(--font-inter)',
                              fontWeight: 400,
                            }}
                            className='text-[#424959] sm:text-xl text-sm mb-4'
                          >
                            Explore other {hub.title.toLowerCase()} treatment options:
                          </p>
                          <div className="flex flex-wrap gap-3">
                            {relatedTreatments.map((relatedTreatment) => (
                              <Link
                                key={relatedTreatment.slug}
                                href={`/treatments/${relatedTreatment.slug}`}
                                className="bg-white border hover:cursor-pointer border-[#252932] px-[20px] py-[10px] rounded-[62px] text-sm transition-colors hover:bg-[#FAFAFA]"
                              >
                                <span
                                  style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                  }}
                                  className="text-[#252932]"
                                >
                                  {relatedTreatment.title}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      );
                    }
                  }
                  return null;
                })()}

                {/* FAQ Section from dedicated data file */}
                <TreatmentFAQ slug={treatment!.slug} />

                {/* Schedule a Consultation Today */}
                <div className=' flex flex-col space-y-[16px] '>
                  <h2
                    style={{
                      fontFamily: 'var(--font-public-sans)',
                      fontWeight: 500,
                    }}
                    className='text-[#111315] text-2xl sm:text-4xl'
                  >
                    Schedule a Consultation Today
                  </h2>
                  <div
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontWeight: 400,
                    }}
                    className='text-[#424959] sm:text-xl text-sm'
                  >
                    {renderField(treatment!.schedule, treatment!.slug)}
                  </div>
                  <Link href="/find-care/candidacy-check">
                    <button
                      style={{
                        fontFamily: 'var(--font-public-sans)',
                        fontWeight: 500,
                      }}
                      className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-[62px] bg-[#2358AC] text-white text-base font-semibold hover:bg-[#1a4a8a] transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      Take our quick candidacy check form
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </Link>
                </div>

                {/* Locations Offering Evaluation - visually connected to Schedule CTA */}
                <div className=' flex flex-col space-y-[16px] '>
                  <h2
                    style={{
                      fontFamily: 'var(--font-public-sans)',
                      fontWeight: 500,
                    }}
                    className='text-[#111315] text-2xl sm:text-4xl'
                  >
                    Locations Offering Evaluation
                  </h2>
                  <p
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontWeight: 400,
                    }}
                    className="text-[#424959] sm:text-xl text-sm"
                  >
                    Our board-certified specialists offer {treatment!.title.toLowerCase()} evaluation and treatment at locations across Florida, New Jersey, New York, Pennsylvania, and Georgia. Schedule a consultation at a clinic near you.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/locations"
                      className="bg-white border border-[#252932] text-[#252932] px-5 py-2.5 rounded-full text-sm hover:bg-[#F0F0F0] transition-colors"
                      style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 400 }}
                    >
                      View All Locations
                    </Link>
                    <Link
                      href="/locations/florida"
                      className="bg-white border border-[#252932] text-[#252932] px-5 py-2.5 rounded-full text-sm hover:bg-[#F0F0F0] transition-colors"
                      style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 400 }}
                    >
                      Florida Locations
                    </Link>
                    <Link
                      href="/locations/new-jersey"
                      className="bg-white border border-[#252932] text-[#252932] px-5 py-2.5 rounded-full text-sm hover:bg-[#F0F0F0] transition-colors"
                      style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 400 }}
                    >
                      New Jersey Locations
                    </Link>
                    <Link
                      href="/locations/new-york"
                      className="bg-white border border-[#252932] text-[#252932] px-5 py-2.5 rounded-full text-sm hover:bg-[#F0F0F0] transition-colors"
                      style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 400 }}
                    >
                      New York Locations
                    </Link>
                    <Link
                      href="/locations/pennsylvania"
                      className="bg-white border border-[#252932] text-[#252932] px-5 py-2.5 rounded-full text-sm hover:bg-[#F0F0F0] transition-colors"
                      style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 400 }}
                    >
                      Pennsylvania Locations
                    </Link>
                  </div>
                </div>
              </>
            )}
          </section>

          {randomDoctors.length > 0 && (
          <section className='bg-white space-y-[40px] lg:flex-col lg:flex hidden' aria-labelledby="doctors-desktop">
            <p
              id="doctors-desktop"
              role="heading"
              aria-level={2}
              style={{
                fontFamily: "var(--font-public-sans)",
                fontWeight: 400,
              }}
              className="text-[#111315] sm:text-5xl text-3xl"
            >
              {doctorsHeading}
            </p>
            <div className='grid grid-cols-1 xl:grid-cols-2 gap-x-[32px] gap-y-[32px] '>
              {
                randomDoctors.map((doctor) => (
                  <DoctorCard doctor={doctor} key={doctor.name} />
                ))
              }
            </div>
          </section>
          )}
          <div className='lg:flex hidden flex-col'>
            <InternalLinkingSection currentSlug={isNewFormat ? treatmentContent!.slug : treatment!.slug} pageType="treatment" />
          </div>
          <div>

          </div>
        </div>

      </section>
    </main>
  );
}
