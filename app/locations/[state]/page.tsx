import React from 'react'
import Image from 'next/image'
import { clinicsForMap as clinics } from '@/components/data/clinicsForMap.generated'
import ClinicsMap from '@/components/ClinicsMap'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { STATE_METADATA, VALID_STATE_SLUGS } from '@/lib/locationRedirects'
import { STATE_FAQS } from '@/lib/state-faqs'
import { generateFAQPageSchema } from "@/lib/faq-utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { MAIN_PHONE_DISPLAY, MAIN_PHONE_TEL, MAIN_PHONE_E164, MAIN_PHONE_HREF, STATE_PHONE_NUMBERS } from '@/lib/locationConstants'
import StateSeoSections from '@/components/StateSeoSections'
import StateLocationsCarouselMobile from '@/components/StateLocationsCarouselMobile.client'
import StateLocationsGridDesktop from '@/components/StateLocationsGridDesktop.client'
import StateWhyChoose from '@/components/StateWhyChoose'
import StateInsurance from '@/components/StateInsurance'
import StateCTA from '@/components/StateCTA'
import { PhoneTextLink } from '@/components/PhoneTextLink'
import SlidingDiv from '@/components/SlidingAnimation'
import StateHeroForm from '@/components/StateHeroForm'
import BarTrans from '@/components/BarTrans'
import MobileHeroConversionPanel from '@/components/MobileHeroConversionPanel'

export async function generateStaticParams() {
  return VALID_STATE_SLUGS.map((state) => ({ state }))
}

export default async function StateHubPage({
  params,
}: {
  params: Promise<{ state: string }>
}) {
  const { state } = await params

  if (!VALID_STATE_SLUGS.includes(state as any)) {
    notFound()
  }
  
  const stateInfo = STATE_METADATA[state]
  const statePhone = STATE_PHONE_NUMBERS[state as keyof typeof STATE_PHONE_NUMBERS] || { display: MAIN_PHONE_DISPLAY, tel: MAIN_PHONE_TEL, e164: MAIN_PHONE_E164, href: MAIN_PHONE_HREF };
  
  // Filter clinics client-side to avoid server-side require issues
  const stateClinics = clinics.filter(clinic => clinic.stateSlug === state)
  const stateFaqs = STATE_FAQS[state] || []
  
  // Generate top cities for intro paragraph
  const topCities = stateClinics
    .slice(0, 10)
    .map(clinic => clinic.region.split(',')[0].trim())
    .join(', ')
  
  // Prepare city locations array for StateSeoSections
  const cityLocations = stateClinics.map(clinic => ({
    name: clinic.name,
    slug: clinic.locationSlug,
    stateSlug: clinic.stateSlug,
    url: `/locations/${clinic.stateSlug}/${clinic.locationSlug}`,
    address: clinic.address
  }))
  
  // Define state-specific nearby regions
  const nearbyRegionsByState: Record<string, string[]> = {
    florida: [
      'South Florida',
      'Central Florida',
      'Treasure Coast',
      'Miami-Dade County',
      'Broward County',
      'Palm Beach County',
      'Orange County',
      'St. Lucie County',
      'Duval County'
    ],
    'new-jersey': [
      'North Jersey',
      'Central Jersey',
      'South Jersey',
      'Essex County',
      'Middlesex County',
      'Monmouth County',
      'Bergen County',
      'Camden County',
      'Hudson County'
    ],
    'new-york': [
      'Manhattan',
      'Midtown',
      'Upper East Side',
      'Upper West Side',
      'Chelsea',
      'Financial District',
      'Brooklyn',
      'Queens',
      'Jersey City',
      'Hoboken'
    ],
    pennsylvania: [
      'Philadelphia',
      'Pittsburgh',
      'Allentown',
      'Erie',
      'Harrisburg',
      'Scranton',
      'Lancaster',
      'Reading',
      'York'
    ]
  }
  
  const nearbyRegions = nearbyRegionsByState[state] || []
  
  // Generate JSON-LD schemas
  const canonicalUrl = `https://mountainspineorthopedics.com/locations/${state}`
  const pageDescription = `Board-certified spine and orthopedic surgeons across ${stateInfo?.name || ''}. Locations in ${topCities}. Same-day and next-day appointments available.`

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': `Spine & Orthopedic Surgeons in ${stateInfo?.name || ''}`,
    'description': pageDescription,
    'url': canonicalUrl,
    'about': {
      '@type': 'MedicalOrganization',
      'name': 'Mountain Spine & Orthopedics'
    },
    'areaServed': {
      '@type': 'AdministrativeArea',
      'name': stateInfo?.name || ''
    }
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://mountainspineorthopedics.com/'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Locations',
        'item': 'https://mountainspineorthopedics.com/locations'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': stateInfo?.name || '',
        'item': canonicalUrl
      }
    ]
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': `Mountain Spine & Orthopedics ${stateInfo?.name || ''} Locations`,
    'description': `Orthopedic and spine clinic locations in ${stateInfo?.name || ''}`,
    'numberOfItems': stateClinics.length,
    'itemListElement': stateClinics.map((clinic, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': clinic.name,
      'url': `https://mountainspineorthopedics.com/locations/${clinic.stateSlug}/${clinic.locationSlug}`,
      'item': {
        '@type': 'MedicalBusiness',
        'name': clinic.name,
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': clinic.address,
          'addressLocality': clinic.region.split(',')[0],
          'addressRegion': stateInfo?.abbr || '',
          'addressCountry': 'US'
        },
        'telephone': statePhone.e164,
        'url': `https://mountainspineorthopedics.com/locations/${clinic.stateSlug}/${clinic.locationSlug}`
      }
    }))
  }

  const faqSchema = stateFaqs.length > 0
    ? generateFAQPageSchema(stateFaqs, canonicalUrl)
    : null

  if (stateClinics.length === 0) {
    notFound()
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <main className='w-full flex flex-col items-center justify-center bg-white h-full pb-6 md:pb-10'>
      {/* 1. HERO - 2-column: text left, form right */}
      <section className="w-full flex flex-col relative overflow-hidden [mask-composite:intersect] [mask-image:linear-gradient(to_top,transparent,black_6rem)]" aria-label={`Spine & Orthopedic Surgeons in ${stateInfo?.name}`}>
        <div style={{ filter: 'blur(30px)' }} className="w-full h-[120px] absolute top-0 z-[1]" />
        <Image
          src="/herosectionimg.jpg"
          priority
          fetchPriority="high"
          fill
          className="absolute top-0 object-cover object-center w-full h-full"
          alt={`Board-certified spine and orthopedic surgeons across ${stateInfo?.name}. Same-day and next-day appointments available.`}
        />
        <div
          className="z-[1] absolute inset-0 w-full h-full"
          style={{ background: 'linear-gradient(180deg, rgba(10, 80, 236, 0.20) 0%, rgba(255, 255, 255, 0.20) 100%)' }}
        />
        <div
          className="w-full h-[100px] absolute bottom-0 z-[1]"
          style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0.8) 100%)' }}
        />

        {/* 2-column content grid */}
        <div className="z-[2] relative w-full pt-20 sm:pt-24 lg:pt-28 pb-10 sm:pb-14 lg:pb-16 px-4 sm:px-6 lg:px-[80px]">
          <div className="max-w-[1440px] w-full mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12 xl:gap-16">

            {/* LEFT: Text content */}
            <div className="flex-1 min-w-0 flex flex-col items-start">
              <SlidingDiv position="left">
                <div className="flex flex-row space-x-[4px] rounded-[62px] w-fit items-center justify-center px-[16px] sm:px-[20px] py-[8px] sm:py-[10px] mb-4" style={{ background: 'rgba(255, 255, 255, 0.50)' }}>
                  <Link href="/locations" style={{ fontFamily: "var(--font-public-sans)", fontWeight: 400 }} className="text-[#111315] hover:text-[#2258AC] transition-colors text-sm sm:text-base">Locations</Link>
                  <span className="text-[#111315]">/</span>
                  <span className="text-[#2258AC]">{stateInfo?.name}</span>
                </div>
              </SlidingDiv>

              <SlidingDiv position="left">
                <h1 style={{ fontFamily: 'var(--font-reem-kufi)', fontWeight: 500 }} className="text-[#252932] text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight mb-3">
                  Spine &amp; Orthopedic Surgeons in {stateInfo?.name || ''}
                </h1>
              </SlidingDiv>

              {/* Mobile CRO panel — visible only below sm (640px); desktop uses StateHeroForm on the right */}
              <div className="w-full sm:hidden mt-4 mb-2">
                <MobileHeroConversionPanel
                  pageType="state"
                  phone={statePhone.display}
                  phoneTel={statePhone.href}
                  stateName={stateInfo?.name || ''}
                  defaultState={stateInfo?.abbr || state.toUpperCase()}
                />
              </div>

              <SlidingDiv position="left">
                <p style={{ fontFamily: 'var(--font-reem-kufi)', fontWeight: 500 }} className="text-[#252932] text-base sm:text-lg lg:text-xl mb-5 break-words">
                  Board-certified specialists at {stateClinics.length} convenient {stateInfo?.name} location{stateClinics.length > 1 ? 's' : ''}. Same-day and next-day appointments.
                </p>
              </SlidingDiv>

              {/* Trust bullets */}
              <SlidingDiv position="left">
                <ul className="flex flex-col gap-2 mb-6">
                  {[
                    'Board-certified spine & orthopedic surgeons',
                    'Same-day & next-day appointments available',
                    `${stateClinics.length} convenient ${stateInfo?.name} location${stateClinics.length > 1 ? 's' : ''}`,
                    'Most major insurance plans accepted',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#0A50EC] flex items-center justify-center">
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                          <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span style={{ fontFamily: 'var(--font-public-sans)' }} className="text-[#252932] text-sm sm:text-base font-medium">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </SlidingDiv>

              {/* Phone CTA — hidden on mobile where MobileHeroConversionPanel handles this */}
              <SlidingDiv position="left" className="hidden sm:flex">
                <PhoneTextLink
                  trackLocation={`StateHero-${stateInfo?.name}`}
                  phoneNumber={statePhone.display}
                  displayText={statePhone.display}
                  className="text-lg sm:text-xl"
                />
              </SlidingDiv>
            </div>

            {/* RIGHT: Hero form card — desktop/tablet only; mobile uses MobileHeroConversionPanel above */}
            <SlidingDiv position="right" className="w-full lg:w-[420px] xl:w-[460px] flex-shrink-0 hidden sm:block">
              <StateHeroForm defaultState={state} stateName={stateInfo?.name || ''} />
            </SlidingDiv>

          </div>
        </div>
      </section>

      <div className="bg-white w-full">
        {/* 2. LOCATIONS GRID - Immediately after hero */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 md:pt-12 pb-8 sm:pb-12 md:pb-16">
          <section id="locations" className="scroll-mt-20" aria-labelledby="locations-heading">
            <h2 id="locations-heading" className="text-xl sm:text-3xl md:text-4xl font-bold text-[#252932] mt-0 sm:mt-2 text-center mb-6 sm:mb-8 md:mb-10 break-words px-2">
              Our {stateInfo?.name} Locations
            </h2>

            {/* Mobile Carousel - Isolated state so swiping does not re-render hero / re-trigger header animation */}
            <StateLocationsCarouselMobile
              stateClinics={stateClinics}
              stateInfo={stateInfo}
              phoneDisplay={statePhone.display}
              phoneTel={statePhone.tel}
            />

            {/* Desktop Grid - Own hover state so hovering does not re-render page / re-trigger hero animation */}
            <StateLocationsGridDesktop stateClinics={stateClinics} stateInfo={stateInfo} phoneDisplay={statePhone.display} phoneTel={statePhone.tel} />
            
          </section>
        </div>

        {/* 3. MAP - Second after locations */}
        <ClinicsMap startingClinic={stateClinics[0] || null} stateName={stateInfo?.name} />
        
        {/* 4. INTRO PARAGRAPH - Third after map */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
          <section className="mb-8 sm:mb-12 md:mb-16" aria-labelledby="intro-heading">
            <h2 id="intro-heading" style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 700 }} className="text-[#062044] text-xl sm:text-2xl mb-4">About Our {stateInfo?.name} Orthopedic & Spine Locations</h2>
            <p className="text-lg text-[#424959] leading-relaxed max-w-4xl mx-auto">
              Mountain Spine & Orthopedics provides comprehensive orthopedic and spine care across {stateInfo?.name}, with board-certified surgeons specializing in spine surgery, joint replacement, minimally invasive spine surgery, sports medicine, and pain management. Our {stateClinics.length} convenient {stateInfo?.name} location{stateClinics.length > 1 ? 's' : ''} serve patients in {topCities} and surrounding communities.{state === 'new-jersey' ? ' Our New Jersey clinics serve patients throughout North, Central, and South Jersey, with convenient access via major corridors including the Garden State Parkway and Route 22.' : state === 'new-york' ? ' Our New York locations provide accessible orthopedic care with convenient parking and easy transit access for patients throughout the region.' : state === 'pennsylvania' ? ' Our Pennsylvania clinics serve patients across the state with convenient locations and accessible parking for easy appointments.' : ' Our Florida clinics serve patients throughout the state with convenient locations and ample parking for easy access.'} We offer same-day and next-day appointments for urgent orthopedic needs, advanced diagnostic imaging coordination, and personalized treatment plans that may include non-surgical options like medications and injections, or surgical interventions when appropriate. Our team focuses on accurate diagnosis, evidence-based care, and helping patients return to their active lifestyles.
            </p>
          </section>

          {/* SEO Sections: Services, Conditions, Treatments, Areas We Serve */}
          <StateSeoSections
            stateName={stateInfo?.name || ''}
            stateSlug={state}
            nearbyRegions={nearbyRegions}
          />

          <StateWhyChoose stateName={stateInfo?.name || state} />

          {/* 6. PATIENT REVIEWS */}
          <section
            className="mb-8 sm:mb-12 md:mb-16"
            aria-labelledby="reviews-heading"
          >
            <h2 id="reviews-heading" className="text-xl sm:text-2xl md:text-3xl font-bold text-[#252932] mb-4 sm:mb-6 text-center break-words px-2">
              Patient Reviews in {stateInfo?.name}
            </h2>
            <p className="text-[#424959] text-base sm:text-lg mb-4 sm:mb-6 text-center max-w-3xl mx-auto px-2">
              Our patients share their experiences at our {stateInfo?.name} locations. Read location-specific reviews and ratings on each city page.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {stateClinics.slice(0, 6).map((clinic) => (
                <Link
                  key={clinic.id}
                  href={`/locations/${clinic.stateSlug}/${clinic.locationSlug}`}
                  className="p-4 bg-white rounded-xl border border-gray-200 hover:border-[#0A50EC] hover:shadow-md transition-all duration-300"
                >
                  <p className="text-[#252932] font-semibold mb-1">
                    Read reviews for {clinic.region.split(',')[0].trim()}
                  </p>
                  {clinic.rating && clinic.reviewCount && clinic.reviewCount > 0 && (
                    <p className="text-sm text-[#424959]">
                      {clinic.rating} stars • {clinic.reviewCount} reviews
                    </p>
                  )}
                  {(!clinic.rating || !clinic.reviewCount || clinic.reviewCount === 0) && (
                    <p className="text-sm text-[#424959]">
                      View patient reviews
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>

          <StateInsurance stateName={stateInfo?.name || state} />

          <StateCTA 
            stateName={stateInfo?.name || state}
            phoneNumber={statePhone.display}
            phoneNumberRaw={statePhone.tel}
          />
          <BarTrans />

          {/* FAQ SECTION */}
          <section
            className="mb-8 sm:mb-12 md:mb-16 mt-8"
            aria-labelledby="faq-heading"
          >
            <h2 id="faq-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#252932] mb-6 sm:mb-8 text-center px-2">
              Frequently Asked Questions About Orthopedic Care in {stateInfo?.name}
            </h2>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full flex flex-col gap-3">
                {stateFaqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`} 
                    className="!border !border-gray-200 !rounded-xl overflow-hidden bg-[#FAFAFA] data-[state=open]:bg-white data-[state=open]:shadow-md transition-all duration-200"
                  >
                    <AccordionTrigger 
                      className="text-left text-base sm:text-lg font-semibold text-[#252932] hover:text-[#0A50EC] px-4 sm:px-6 py-4 sm:py-5 hover:no-underline [&[data-state=open]]:bg-white"
                    >
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent 
                      className="text-[#424959] leading-relaxed px-4 sm:px-6 pb-5 pt-0"
                    >
                      <p>{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

        </div>
      </div>
    </main>
    </>
  )
}
