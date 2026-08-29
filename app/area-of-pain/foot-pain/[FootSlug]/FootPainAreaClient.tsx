"use client"
import React from 'react';
import Image from 'next/image';
import Script from 'next/script';
import ConditionDetialsLanding from '@/public/ConditionDetails.jpeg';
import DoctorCard from '@/components/DoctorCard';
import { DoctorContactForm } from '@/components/DoctorContactForm';
import { FootPainDropdown } from '@/components/foot-pain-dropdown';
import { TextAnimate } from '@/components/magicui/text-animate';
import { PhoneText } from '@/components/PhoneText';
import { PhoneCTA } from '@/components/PhoneCTA';
import Link from 'next/link';
import { conditionIndex as conditions } from '@/components/data/taxonomyIndex.generated';
import { treatmentIndex as AllTreatmentsCombined } from '@/components/data/taxonomyIndex.generated';

// Helper to resolve specialty slug for cross-linking
const SPECIALTY_MAP: Record<string, string> = {
  'lumbar-degenerative-disc-disease': 'degenerative-disc-disease',
  'cervical-degenerative-disc-disease': 'degenerative-disc-disease',
  'bunion-pain-hallux-valgus': 'bunions-hallux-valgus',
  'heel-pain-plantar-fasciitis': 'plantar-fasciitis',
  'flat-feet-pain': 'flat-feet',
  'ankle-arthroscopy-recovery-pain': 'ankle-arthroscopy',
  'hammertoes-foot-pain': 'hammer-toes',
  'diabetic-foot-ulcer-care': 'diabetic-foot-ulcers',
  'ankle-replacement-surgery-pain': 'ankle-replacement',
  'achilles-tendon-pain': 'achilles-tendonitis',
};

function resolveSpecialtySlug(painSlug: string, allSpecialtySlugs: string[]): string | null {
  const mapped = SPECIALTY_MAP[painSlug];
  if (mapped && allSpecialtySlugs.includes(mapped)) return mapped;
  return allSpecialtySlugs.includes(painSlug) ? painSlug : null;
}

function stripTags(html: string | React.ReactNode): string {
  if (typeof html === 'string') {
    return html.replace(/<[^>]*>/g, '');
  }
  
  // Handle ReactNode/JSX - extract text content
  if (html && typeof html === 'object' && 'props' in html) {
    // If it's a React element with children, extract text recursively
    if (html.props && html.props.children) {
      return extractTextFromReactNode(html.props.children);
    }
  }
  
  return '';
}

function extractTextFromReactNode(node: React.ReactNode): string {
  if (typeof node === 'string') {
    return node;
  }
  
  if (typeof node === 'number') {
    return String(node);
  }
  
  if (Array.isArray(node)) {
    return node.map(extractTextFromReactNode).join(' ');
  }
  
  if (node && typeof node === 'object' && 'props' in node) {
    if (node.props && node.props.children) {
      return extractTextFromReactNode(node.props.children);
    }
  }
  
  return '';
}

function buildFaq(condition: any) {
  const faqs: Array<{q: string, a: string}> = [];
  
  if (condition.what_sym) {
    faqs.push({
      q: `What are the symptoms of ${condition.title}?`,
      a: stripTags(condition.what_sym)
    });
  }
  
  if (condition.treatment) {
    faqs.push({
      q: `How is ${condition.title} treated?`,
      a: stripTags(condition.treatment)
    });
  }
  
  if (condition.diagnose) {
    faqs.push({
      q: `How is ${condition.title} diagnosed?`,
      a: stripTags(condition.diagnose)
    });
  }
  
  if (condition.prevent) {
    faqs.push({
      q: `Can I prevent ${condition.title}?`,
      a: stripTags(condition.prevent)
    });
  }
  
  return faqs.slice(0, 4);
}

export function FootPainAreaClient({ condition_details, randomDoctors, specialtySlugs = [] }: { condition_details: any, randomDoctors: any[], specialtySlugs?: string[] }) {
  if (!condition_details) {
    return null;
  }

  // Build FAQ JSON-LD
  const faqs = buildFaq(condition_details);
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(({q, a}) => ({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": a
      }
    }))
  };

  // Resolve specialty slug for cross-link
  const specialtySlug = resolveSpecialtySlug(condition_details.slug, specialtySlugs);

  // Generate dynamic alt text for hero image
  const heroAltText = `Illustration representing ${condition_details.title} treatment in Florida`;

  return (
    <main className='w-full flex flex-col items-center justify-center bg-white h-full'>
      {/* Screen reader only H1 */}
      
      {/* FAQ JSON-LD Script */}
      {faqs.length > 0 && (
        <Script 
          id={`faq-${condition_details.slug}`} 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} 
        />
      )}

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
          alt={heroAltText}
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
        <div className="z-[1] flex flex-col w-full h-full text-left relative pb-20">

          <div className=' px-6 xl:px-[80px] z-[2] w-full flex items-center justify-center'>
            <div className=' mt-[220px] flex flex-row sm:space-x-[4px] rounded-[62px] w-fit items-center justify-center px-[20px] py-[10px]'
              style={{
                background: 'rgba(255, 255, 255, 0.50)'
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-public-sans)",
                  fontWeight: 400,
                }}
                className="sm:text-md text-[11px] sm:block hidden text-[#111315]"
              >
                Area of Pain
              </span>
              <span
                style={{
                  fontFamily: "var(--font-public-sans)",
                  fontWeight: 400,
                }}
                className="sm:text-md text-[11px] sm:block hidden text-[#111315]"
              >
                /
              </span>
              <span
                style={{
                  fontFamily: "var(--font-public-sans)",
                  fontWeight: 400,
                }}
                className="sm:text-md text-[11px] text-[#2358AC]"
              >
                Foot & Ankle Pain
              </span>
              <span
                style={{
                  fontFamily: "var(--font-public-sans)",
                  fontWeight: 400,
                }}
                className="sm:text-md text-[11px] text-[#111315]"
              >
                /
              </span>
              <span
                style={{
                  fontFamily: "var(--font-public-sans)",
                  fontWeight: 400,
                }}
                className="sm:text-md text-[11px] text-[#5093FF]"
              >
                {condition_details.title}
              </span>
            </div>
          </div>
          <div className="px-6 xl:px-[80px] z-[2] flex flex-row space-x-[20px] items-center justify-center mt-[12px] w-full">
            <TextAnimate as="h1" animation="blurInUp" by="word" once
              style={{
                fontFamily: "var(--font-public-sans)",
                fontWeight: 400,
              }}
              className="text-[#252932] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center"
            >
              {condition_details.title}
            </TextAnimate>
          </div>

          {/* Cross-link to specialty page */}
          {specialtySlug && (
            <div className="z-[2] px-6 xl:px-[80px] mt-[16px] w-full flex justify-center">
              <a 
                href={`/conditions/${specialtySlug}`}
                className="inline-flex items-center px-4 py-2 rounded-lg border border-[#2358AC] bg-white/80 hover:bg-[#2358AC] hover:text-white text-[#2358AC] transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Learn medical details
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          )}

          <div className="z-[2] px-6 xl:px-[80px] mt-[24px] md:w-[70%] w-full self-center pb-8">
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 400,
              }}
              className="text-[#424959] sm:text-lg text-sm text-center"
            >
              <PhoneText text={condition_details.body} trackLocation="Foot & Ankle Pain Hero Section" />
            </p>
          </div>
        </div>
      </section>

      <section className=' max-w-[1440px] w-full h-full flex flex-col lg:flex-row relative overflow-hidden px-6 xl:px-[80px] py-[50px] space-x-[60px]'>
        <div className='lg:w-[30%] w-full lg:order-1 order-2 bg-white flex flex-col space-y-[60px]'>
          <DoctorContactForm backgroundcolor={'#FAFAFA'} />
          <div className=' space-y-[30px] lg:flex lg:flex-col hidden'>
            <FootPainDropdown CurrentCondition={condition_details.title} />
            <Image src={condition_details.side_img!} width={300} height={300} layout="responsive" className="w-full rounded-[20px] max-h-[500px] aspect-1/2 object-center object-cover" alt='' />
          </div>
        </div>

        <div className=' lg:w-[70%] lg:order-2 order-1  flex flex-col space-y-[60px] rounded-[24px] '>
          <section className='bg-[#FAFAFA] space-y-[40px] flex flex-col w-full  p-6 lg:p-[40px] rounded-[24px]'>
            {/* Detail */}
            <div className=' flex flex-col space-y-[16px] '>
              <h2
                style={{
                  fontFamily: 'var(--font-public-sans)',
                  fontWeight: 500,
                }}
                className='text-[#111315] sm:text-5xl text-2xl'
              >
                About {condition_details.title}
              </h2>
              <div
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 400,
                }}
                className='text-[#424959] sm:text-xl text-sm'
              >
                <PhoneText text={condition_details?.detail} trackLocation="Foot & Ankle Pain Detail Section" />
              </div>
            </div>

            {
              condition_details.forum?.map((item: any, index: number) => (
                <React.Fragment key={index}>
                  <div className=' flex flex-col space-y-[16px] '>
                    <h3 style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }} className='text-[#111315] sm:text-4xl text-xl'>
                      {item.heading}
                    </h3>
                    <div style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }} className='text-[#424959] sm:text-xl text-sm'>
                      <PhoneText text={item.post} trackLocation="Foot & Ankle Pain Forum Section" />
                    </div>
                  </div>
                </React.Fragment>
              ))
            }

          </section>

          {/* Phone CTA Section */}
          <PhoneCTA />

          {/* Possible Causes and Treatments Cross-Links */}
          <section className='bg-[#FAFAFA] space-y-[40px] flex flex-col w-full p-6 lg:p-[40px] rounded-[24px]'>
            <h2 
              style={{
                fontFamily: 'var(--font-public-sans)',
                fontWeight: 500,
              }}
              className='text-[#111315] sm:text-4xl text-2xl'
            >
              Possible Causes We Evaluate
            </h2>
            <p 
              style={{
                fontFamily: 'var(--font-public-sans)',
                fontWeight: 400,
              }}
              className="text-[#424959] text-lg mb-4"
            >
              These conditions may cause {condition_details.title.toLowerCase()} symptoms:
            </p>
            <div className="flex flex-wrap gap-3">
              {conditions
                .filter(c => c.tag === 'Foot' || c.tag === 'Ankle')
                .slice(0, 8)
                .map((condition) => (
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

            <h2 
              style={{
                fontFamily: 'var(--font-public-sans)',
                fontWeight: 500,
              }}
              className='text-[#111315] sm:text-4xl text-2xl mt-8'
            >
              Treatments We May Recommend
            </h2>
            <p 
              style={{
                fontFamily: 'var(--font-public-sans)',
                fontWeight: 400,
              }}
              className="text-[#424959] text-lg mb-4"
            >
              Depending on your diagnosis, we may recommend:
            </p>
            <div className="flex flex-wrap gap-3">
              {AllTreatmentsCombined
                .filter(t => t.tag === 'Foot' || t.tag === 'Ankle')
                .slice(0, 6)
                .map((treatment) => (
                  <Link
                    key={treatment.slug}
                    href={`/treatments/${treatment.slug}`}
                    className="bg-white border hover:cursor-pointer border-[#252932] px-[20px] py-[10px] rounded-[62px] text-sm transition-colors hover:bg-[#FAFAFA]"
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontWeight: 400,
                      }}
                      className="text-[#252932]"
                    >
                      {treatment.title}
                    </span>
                  </Link>
                ))}
            </div>
          </section>

          <section className='bg-white space-y-[40px] '>
            <h2
              style={{
                fontFamily: "var(--font-public-sans)",
                fontWeight: 400,
              }}
              className="text-[#111315] text-5xl"
            >
              Meet our Doctors
            </h2>
            <div className='grid grid-cols-1 space-y-4 md:space-y-0 md:grid-cols-2 gap-x-[32px] '>
              {
                randomDoctors.map((item) => (
                  <DoctorCard doctor={item} key={item.name} />
                ))
              }
            </div>
          </section>
          <div>
          </div>
        </div>
      </section>
    </main>
  );
}