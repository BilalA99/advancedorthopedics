import ClinicsMap from '@/components/ClinicsMap'
import { TextAnimate } from '@/components/magicui/text-animate'
import RatingsAndReviews from '@/components/RatingsAndReviews'
import React from 'react'
import { clinics } from '@/components/data/clinics'
import ContactUsSection from '@/components/ContactUsSection'
import AAOS from '@/public/AAOS.png';
import ACP from '@/public/ACP.png';
import AOA from '@/public/AOA.png';
import NASS from '@/public/NASS.png';
import Serpent from '@/public/Serpent.png';
import SMIS from '@/public/SMIS.png';

// Professional association logo alt text mapping
const associationLogoAlt: Record<string, string> = {
    'AAOS': 'American Academy of Orthopaedic Surgeons (AAOS) member logo',
    'ACP': 'American College of Physicians (ACP) certification',
    'AOA': 'American Osteopathic Association (AOA) accreditation',
    'NASS': 'North American Spine Society (NASS) membership badge',
    'Serpent': 'Medical caduceus symbol representing healthcare excellence',
    'SMIS': 'Society for Minimally Invasive Spine Surgery (SMISS) member'
};
import Image from 'next/image'
import { Marquee } from '@/components/magicui/marquee'
import { notFound } from 'next/navigation'
import Reveal from '@/components/RevealAnimation'
import BookAnAppoitmentButton from '@/components/BookAnAppoitmentButton'
import HomeWhyAO from '@/public/HomeWhyAO-min.jpeg'
import Link from 'next/link'
import SlidingDiv from '@/components/SlidingAnimation'
import { DoctorContactForm } from '@/components/DoctorContactForm'
import LocationLanding from '@/public/ConditionDetails.jpeg'
import { Testimonial } from '@/components/ui/testimonial-card'
import ReviewsCarousel from '@/components/ReviewsCarousel.client'
import { PhoneTextLink } from '@/components/PhoneTextLink'
import LocationFAQSection from '@/components/LocationFAQSection'
import { LocationNAP } from '@/components/LocationNAP'
import LocationSeoSections from '@/components/LocationSeoSections'
import LocationGallerySection from '@/components/LocationGallerySection'
import TrackedOutboundLink from '@/components/TrackedOutboundLink'
import { findClinicByStateAndLocation, getAllLocationParams, isValidStateSlug, STATE_METADATA } from '@/lib/locationRedirects'
import { ReviewLocationCapture } from '@/components/ReviewLocationCapture'
import { STATE_PHONE_NUMBERS, MAIN_PHONE_DISPLAY, MAIN_PHONE_TEL, MAIN_PHONE_E164, MAIN_PHONE_HREF } from '@/lib/locationConstants'
import SecondOpinionCallout from '@/components/SecondOpinionCallout'
import { getVisibleReviews } from '@/lib/providers/providerVisibility'
import MobileHeroConversionPanel from '@/components/MobileHeroConversionPanel'

export const dynamicParams = false;

export async function generateStaticParams() {
    return getAllLocationParams();
}

export default async function LocationDetails(
    {
        params,
    }: {
        params: Promise<{ state: string; location: string }>
    }
) {
    const { state, location: locationSlug } = await params;
    
    // Validate state slug
    if (!isValidStateSlug(state)) {
        return notFound();
    }
    
    // Find clinic by state and location slugs
    const locationData = findClinicByStateAndLocation(state, locationSlug);
    if (!locationData) {
        return notFound();
    }

    // whatOurPatientsSay (unused legacy JSX) and reviews (may name a hidden
    // provider) would otherwise be serialized wholesale into these Client
    // Component props even though neither ClinicsMap nor LocationGallerySection
    // renders them; strip both so that content never crosses the server/client
    // boundary. `reviews` is zeroed out rather than omitted since it's a
    // required field on ClinicsProps; the filtered list used for actual
    // display is computed separately as `visibleReviews` below.
    const { whatOurPatientsSay: _unusedTestimonialJsx, ...clinicForClientProps } = locationData;
    clinicForClientProps.reviews = [];

    const OurSpecialtyItems = [
        {
            icon: () => (
                <svg role="img" aria-label="Board-certified orthopedic specialist adding a patient to care" xmlns="http://www.w3.org/2000/svg" width="18" height="22" viewBox="0 0 18 22" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M7 11.2502C7.19892 11.2502 7.38968 11.3293 7.53033 11.4699L9 12.9396L10.4697 11.4699C10.6103 11.3293 10.8011 11.2502 11 11.2502H11H11.0001C12.3676 11.2502 13.5248 11.2502 14.3918 11.3668C15.2919 11.4878 16.0497 11.7467 16.6517 12.3486C17.2536 12.9505 17.5125 13.7084 17.6335 14.6085C17.75 15.4755 17.75 16.5778 17.75 17.9454V21.0002C17.75 21.4145 17.4142 21.7502 17 21.7502L1 21.7502C0.585789 21.7502 0.250001 21.4145 0.250001 21.0002L0.250001 17.9454V17.9454V17.9453C0.249981 16.5778 0.249965 15.4755 0.366525 14.6085C0.487541 13.7084 0.746435 12.9505 1.34835 12.3486C1.95027 11.7467 2.70814 11.4878 3.60825 11.3668C4.4752 11.2502 5.63238 11.2502 6.99994 11.2502H6.99998H7ZM13 13.7502C13.4142 13.7502 13.75 14.086 13.75 14.5002V15.7502H15C15.4142 15.7502 15.75 16.086 15.75 16.5002C15.75 16.9145 15.4142 17.2502 15 17.2502H13.75V18.5002C13.75 18.9145 13.4142 19.2502 13 19.2502C12.5858 19.2502 12.25 18.9145 12.25 18.5002V17.2502H11C10.5858 17.2502 10.25 16.9145 10.25 16.5002C10.25 16.086 10.5858 15.7502 11 15.7502H12.25V14.5002C12.25 14.086 12.5858 13.7502 13 13.7502ZM9 0.250137C6.65279 0.250137 4.75 2.15293 4.75 4.50014V5.50014C4.75 7.84735 6.65279 9.75014 9 9.75014C11.3472 9.75014 13.25 7.84735 13.25 5.50014L13.25 4.50014C13.25 2.15293 11.3472 0.250137 9 0.250137Z" fill="#0A50EC" />
                </svg>
            ),
            title: 'World-Class Expertise',
            body: `Our board-certified ${locationData.name.replace('Mountain Spine & Orthopedics', '').trim()} orthopedic surgeons bring years of experience and a proven track record of successful outcomes.`
        },
        {
            icon: () => (
                <svg role="img" aria-label="Spine anatomy diagram representing advanced spine care" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="Spine--Streamline-Simple-Icons" height="24" width="24">
                    <path d="M7.157 2.207c0.066 2.004 1.454 3.117 4.221 3.55 2.345 0.368 4.46 0.181 5.151 -1.829C17.874 0.01 14.681 0.985 11.915 0.55S7.051 -1.013 7.157 2.207m0.831 8.23c0.257 1.497 1.652 2.355 3.786 2.297 2.135 -0.059 3.728 -0.892 3.949 -2.507 0.409 -2.988 -1.946 -1.832 -4.08 -1.774 -2.136 0.059 -4.161 -0.952 -3.655 1.984m2.778 6.852c0.424 1.117 1.587 1.589 3.159 1.253 1.569 -0.335 2.656 -0.856 2.568 -2.129 -0.159 -2.357 -1.713 -1.616 -3.283 -1.279 -1.571 0.333 -3.272 -0.039 -2.444 2.155m1.348 5.221c0.123 0.943 0.939 1.5 2.215 1.49 1.279 -0.011 2.248 -0.515 2.412 -1.525 0.308 -1.871 -1.123 -1.175 -2.4 -1.165 -1.28 0.01 -2.47 -0.65 -2.227 1.2" fill="#0A50EC" strokeWidth="1"></path>
                </svg>
            ),
            title: 'Advanced Spine Care',
            body: <>Our Orthopedic clinic provides access to advanced spine care technology. Our comprehensive treatments give great results with cutting-edge technology that helps {locationData.name.replace('Mountain Spine & Orthopedics', '').trim()} residents heal faster.</>
        },
        {
            icon: () => (
                <svg role="img" aria-label="Medical clipboard with plus symbol representing comprehensive orthopedic care" xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.02299 3.376C7.03911 3.15406 7.06365 2.97295 7.09643 2.82372C7.15781 2.54433 7.23372 2.44399 7.27636 2.40136C7.31899 2.35872 7.41933 2.28281 7.69872 2.22143C7.98944 2.15756 8.40114 2.125 9 2.125H13C13.5989 2.125 14.0106 2.15756 14.3013 2.22143C14.5807 2.28281 14.681 2.35872 14.7236 2.40136C14.7663 2.44399 14.8422 2.54433 14.9036 2.82372C14.9364 2.97295 14.9609 3.15406 14.977 3.376C14.6818 3.37499 14.3738 3.375 14.0527 3.375H14.0527H14.0527H7.94732H7.94731H7.9473C7.62618 3.375 7.31821 3.37499 7.02299 3.376ZM5.01648 3.41956C5.03581 3.05074 5.07429 2.70741 5.14301 2.39459C5.25632 1.8788 5.46503 1.38426 5.86214 0.987143C6.25926 0.59003 6.7538 0.381319 7.26959 0.268009C7.77406 0.157186 8.35786 0.125 9 0.125H13C13.6421 0.125 14.2259 0.157186 14.7304 0.268009C15.2462 0.381319 15.7407 0.59003 16.1379 0.987143C16.535 1.38426 16.7437 1.8788 16.857 2.39459C16.9257 2.70741 16.9642 3.05074 16.9835 3.41956C17.325 3.43802 17.6415 3.46412 17.9342 3.50102C18.9621 3.63057 19.8113 3.90463 20.4878 4.5389C21.1712 5.1796 21.4729 5.99471 21.6143 6.98061C21.75 7.92738 21.75 9.13186 21.75 10.6289V10.6289V10.6289V10.6289V12.6211V12.6211V12.6211V12.6211C21.75 14.1181 21.75 15.3226 21.6143 16.2694C21.4729 17.2553 21.1712 18.0704 20.4878 18.7111C19.8113 19.3454 18.9621 19.6194 17.9342 19.749C16.9342 19.875 15.6579 19.875 14.0527 19.875H7.94733C6.3421 19.875 5.06579 19.875 4.06576 19.749C3.03794 19.6194 2.18873 19.3454 1.51217 18.7111C0.828766 18.0704 0.527127 17.2553 0.385739 16.2694C0.249962 15.3226 0.249979 14.1181 0.250001 12.6211V12.6211V12.6211V12.6211V10.6289V10.6289V10.6289V10.6289C0.249979 9.13188 0.249962 7.92739 0.385739 6.98061C0.527127 5.99471 0.828765 5.1796 1.51217 4.5389C2.18873 3.90463 3.03794 3.63057 4.06576 3.50102C4.35855 3.46412 4.67501 3.43802 5.01648 3.41956ZM11 7.625C11.5523 7.625 12 8.07272 12 8.625V10.625H14C14.5523 10.625 15 11.0727 15 11.625C15 12.1773 14.5523 12.625 14 12.625H12V14.625C12 15.1773 11.5523 15.625 11 15.625C10.4477 15.625 10 15.1773 10 14.625V12.625H8C7.44772 12.625 7 12.1773 7 11.625C7 11.0727 7.44772 10.625 8 10.625H10V8.625C10 8.07272 10.4477 7.625 11 7.625Z" fill="#0A50EC" />
                </svg>
            ),
            title: 'Comprehensive Care',
            body: 'We specialize in comprehensive orthopedic care that focuses on patient comfort, reduced recovery time, and helping you get back to your life faster with less pain and improved mobility.'
        },
        {
            icon: () => (
                <svg role="img" aria-label="Orthopedic surgical tool icon representing patient-centered care" className="text-[#0A50EC]" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 22 22">
                    <path d="m17.9646 5.49185.3705.37054c.3906.39052 1.0237.39052 1.4142 0 .3906-.39053.3906-1.02369 0-1.41422L17.594 2.29283c-.3905-.39052-1.0237-.39052-1.4142 0-.3905.39053-.3905 1.02369 0 1.41422l.3706.37059-.7412.74118-.3706-.37059c-.3905-.39053-1.0237-.39053-1.4142 0L9.71372 8.75891c-.39053.39053-.39053 1.02369 0 1.41419l.34948.3495-.77031.7703c-.39053.3905-.39053 1.0237 0 1.4142.39052.3905 1.02371.3905 1.41421 0l.7703-.7703.3917.3917c.3905.3905 1.0236.3905 1.4142 0l2.0628-2.0629c.4145.6745.6539 1.4706.6539 2.3256 0 2.4448-1.9584 4.4087-4.3521 4.4087-1.0458 0-2.00787-.3737-2.76051-.9999H11c.5523 0 1-.4477 1-1s-.4477-1-1-1H5c-.55228 0-1 .4477-1 1s.44772 1 1 1h1.26803C6.92225 17.0489 7.8715 17.8952 9 18.4182V20H5c-.55228 0-1 .4477-1 1s.44772 1 1 1h14c.5523 0 1-.4477 1-1s-.4477-1-1-1h-4v-1.9637c1.8034-1.1328 3-3.1517 3-5.4451 0-1.4061-.4498-2.70897-1.2126-3.76687l.8066-.80655c.3905-.39052.3905-1.02369 0-1.41421l-.3706-.37054.7412-.74118Z" />
                </svg>

            ),
            title: 'Patient-Centered Approach',
            body: 'We specialize in patient-centered orthopedic care that focuses on comfort, reduced recovery time, and helping you get back to your life faster with less pain and improved mobility.'
        },
    ]
    
    // Get state metadata for breadcrumb
    const stateInfo = STATE_METADATA[state];
    const statePhone = STATE_PHONE_NUMBERS[state as keyof typeof STATE_PHONE_NUMBERS] || { display: MAIN_PHONE_DISPLAY, tel: MAIN_PHONE_TEL, e164: MAIN_PHONE_E164, href: MAIN_PHONE_HREF };
    
    return (
        <main className='w-full flex-col items-center justify-center h-full'>
            <ReviewLocationCapture locationSlug={locationData.locationSlug} />
            <section className="w-full h-full flex flex-col relative overflow-hidden [mask-composite:intersect] [mask-image:linear-gradient(to_top,transparent,black_6rem)]  justify-between" >
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
                    alt={`Mountain Spine & Orthopedics ${locationData.region.split(',')[0].trim()} clinic - Expert orthopedic care consultation room`}
                />
                <div
                    className="lg:w-[100%] z-[1] h-full absolute left-0 top-0 md:w-[100%] w-full"
                    style={{
                        background: 'linear-gradient(180deg, rgba(10, 80, 236, 0.20) 0%, rgba(255, 255, 255, 0.20) 100%)',
                    }}
                />

                <div className="w-full h-full flex flex-row relative overflow-hidden justify-between sm:py-16">
                    <div className="z-[2] flex flex-col xl:w-[50%] sm:w-[70%] w-full h-full text-left xl:px-6 py-4 relative xl:pb-[160px]">

                        <SlidingDiv position="left" className="z-[2]">
                            <div className="xl:px-[80px] px-8 xl:w-[90%] space-y-4">
                                <div className='md:flex hidden flex-row space-x-[4px] rounded-[62px] w-fit items-center justify-center px-[20px] py-[10px]'
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.50)'
                                    }}
                                >
                                    <Link
                                        href="/locations"
                                        style={{
                                            fontFamily: "var(--font-public-sans)",
                                            fontWeight: 400,
                                        }}
                                        className="text-[#111315] hover:text-[#2258AC] transition-colors"
                                    >
                                        Locations
                                    </Link>

                                    <span
                                        style={{
                                            fontFamily: "var(--font-public-sans)",
                                            fontWeight: 400,
                                        }}
                                        className="text-[#111315]"
                                    >
                                        /
                                    </span>
                                    <Link
                                        href={`/locations/${state}`}
                                        style={{
                                            fontFamily: "var(--font-public-sans)",
                                            fontWeight: 400,
                                        }}
                                        className="text-[#111315] hover:text-[#2258AC] transition-colors"
                                    >
                                        {stateInfo?.name || state.toUpperCase()}
                                    </Link>
                                    <span
                                        style={{
                                            fontFamily: "var(--font-public-sans)",
                                            fontWeight: 400,
                                        }}
                                        className="text-[#111315]"
                                    >
                                        /
                                    </span>
                                    <span
                                        style={{
                                            fontFamily: "var(--font-public-sans)",
                                            fontWeight: 400,
                                        }}
                                        className="text-[#2258AC]"
                                    >
                                        {locationData.region.split(',')[0].trim()}
                                    </span>
                                </div>
                                <h1
                                    style={{
                                        fontFamily: "var(--font-public-sans)",
                                        fontWeight: 500,
                                    }}
                                    className="text-[#252932] text-3xl sm:text-5xl xl:text-6xl text-shadow-sm md:mt-0 mt-16"
                                >
                                    Orthopedic Surgeons & Spine Specialists in {locationData.region.split(',')[0].trim()}
                                </h1>
                            </div>
                        </SlidingDiv>

                        <SlidingDiv position="left" className="z-[2] sm:hidden block px-4 mt-4">
                            <MobileHeroConversionPanel
                                pageType="location"
                                phone={statePhone.display}
                                phoneTel={statePhone.href}
                                cityName={locationData.region.split(',')[0].trim()}
                                locationName={locationData.name}
                                locationSlug={locationSlug}
                                defaultState={stateInfo?.abbr || state.toUpperCase()}
                            />
                            {/* Secondary offer sits under the form, not above the
                                primary CTAs — booking stays the first action. */}
                            <div className="mt-4">
                                <SecondOpinionCallout cityName={locationData.region.split(',')[0].trim()} />
                            </div>
                        </SlidingDiv>

                        <SlidingDiv position="left" className="z-[2]">
                            <div className="xl:px-[80px] px-8 mb-[16px] xl:w-full md:w-[80%] lg:w-full md:text-left sm:text-center mt-2">
                                <p
                                    style={{
                                        fontWeight: 400,
                                    }}
                                    className="text-[#424959] text-base lg:text-lg"
                                >
                                    {locationData.paragraph
                                      ? locationData.paragraph.split('[PARAGRAPH BREAK]')[0].replace(/\s+/g, ' ').trim()
                                      : `${locationData.region.split(',')[0].trim()}'s trusted orthopedic and spine center — board-certified surgeons, same-day appointments, and minimally invasive treatments that get you back to your life faster.`}
                                </p>
                            </div>
                            {/* NAP Block - Mobile */}
                            <div className="xl:px-[80px] px-8 mt-1 sm:hidden block">
                                <LocationNAP slug={locationData.slug} phoneDisplay={statePhone.display} phoneTel={statePhone.tel} />
                            </div>
                            {/* NAP Block - Desktop */}
                            <div className="xl:px-[80px] px-8 mt-1 sm:block hidden">
                                <LocationNAP slug={locationData.slug} phoneDisplay={statePhone.display} phoneTel={statePhone.tel} />
                            </div>
                        </SlidingDiv>

                        {/* Mobile CTA row (under paragraph, above certificates) */}
                        <div className="z-[2] px-4 mt-3 sm:hidden block">
                            <div className="flex flex-col space-y-3 w-full max-w-[480px] mx-auto">
                                {/* Get Directions - light grey */}
                                <TrackedOutboundLink
                                    href={(locationData.link || (locationData.address ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(locationData.address)}` : `https://www.google.com/maps/dir/?api=1&destination=${locationData.lat},${locationData.lng}`))}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    eventName="directions_click"
                                    eventParams={{
                                        location_name: locationData.name,
                                        location_state: state,
                                    }}
                                    className="w-full h-[52px] rounded-[16px] bg-[#E5E7EB] text-[#252932] flex flex-row items-center justify-center gap-2 font-[500] text-[15px] shadow-sm active:scale-[0.98] transition-all duration-200"
                                    style={{ fontFamily: 'var(--font-public-sans)' }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    <span className="whitespace-nowrap">Get Directions</span>
                                </TrackedOutboundLink>

                                {/* Checkmark Items - Mobile */}
                                <div className="flex flex-col space-y-2 mt-4 w-full">
                                    <div className="flex items-start space-x-2">
                                        <span className="text-green-600 text-lg font-bold flex-shrink-0 mt-0.5">✓</span>
                                        <p
                                            style={{ fontFamily: 'var(--font-public-sans)' }}
                                            className="text-[#252932] text-sm sm:text-base font-[400] leading-relaxed"
                                        >
                                            Same-Day Appointments Available in {locationData.region.split(',')[0]}
                                        </p>
                                    </div>
                                    <div className="flex items-start space-x-2">
                                        <span className="text-green-600 text-lg font-bold flex-shrink-0 mt-0.5">✓</span>
                                        <p
                                            style={{ fontFamily: 'var(--font-public-sans)' }}
                                            className="text-[#252932] text-sm sm:text-base font-[400] leading-relaxed"
                                        >
                                            Urgent Evaluation for Severe Back or Neck Pain
                                        </p>
                                    </div>
                                    <div className="flex items-start space-x-2">
                                        <span className="text-green-600 text-lg font-bold flex-shrink-0 mt-0.5">✓</span>
                                        <p
                                            style={{ fontFamily: 'var(--font-public-sans)' }}
                                            className="text-[#252932] text-sm sm:text-base font-[400] leading-relaxed"
                                        >
                                            Complimentary MRI Review Available
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="z-[2] sm:block hidden">
                            <div className="xl:px-[80px] px-8 my-[16px] xl:w-full flex flex-col space-y-6 ">
                                <div className='flex flex-row md:space-x-[16px] flex-wrap items-center'>
                                    <div className="flex-shrink-0"><BookAnAppoitmentButton /></div>
                                    <div className="flex-shrink-0 lg:flex hidden">
                                        <PhoneTextLink
                                            trackLocation="LocationPageDesktop"
                                            phoneNumber={statePhone.display}
                                            displayText={statePhone.display}
                                        />
                                    </div>
                                </div>
                                <div className="lg:flex hidden">
                                    <TrackedOutboundLink
                                        href={(locationData.link || (locationData.address ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(locationData.address)}` : `https://www.google.com/maps/dir/?api=1&destination=${locationData.lat},${locationData.lng}`))} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        eventName="directions_click"
                                        eventParams={{
                                            location_name: locationData.name,
                                            location_state: state,
                                        }}
                                        className="h-full max-h-[56px] group flex flex-row items-center justify-center hover:cursor-pointer px-[24px] py-[16px] rounded-[62px] bg-[#E5E7EB] text-[#252932] w-fit font-[500] text-[14px] hover:bg-[#D1D5DB] transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 flex-shrink-0">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
                                            <circle cx="12" cy="10" r="3" />
                                        </svg>
                                        <span
                                            style={{ fontFamily: 'var(--font-public-sans)' }}
                                            className="group-hover:scale-[1.05] transition-transform duration-300 ease-in-out whitespace-nowrap"
                                        >
                                            Get Directions
                                        </span>
                                        <div className='pl-[10px] group-hover:translate-x-1 transition-all duration-300 ease-in-out flex-shrink-0'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12" fill="none">
                                                <path d="M12.3982 0.768483C12.0402 0.410504 11.4598 0.410506 11.1018 0.768488C10.7438 1.12647 10.7438 1.70687 11.1018 2.06485L14.1203 5.08333H1.66667C1.16041 5.08333 0.75 5.49374 0.75 6C0.75 6.50626 1.16041 6.91667 1.66667 6.91667H14.1203L11.1018 9.93516C10.7439 10.2931 10.7439 10.3735 11.1019 11.2315C11.4598 11.5895 12.0402 11.5895 12.3982 11.2315L16.9766 6.65303C16.9935 6.63637 17.0098 6.61905 17.0254 6.60112C17.0873 6.52997 17.1365 6.45154 17.1728 6.36885C17.2221 6.25677 17.2496 6.13294 17.25 6.00273L17.25 6C17.25 5.99717 17.25 5.99434 17.25 5.99152C17.2489 5.87623 17.2266 5.76602 17.1867 5.66463C17.142 5.55068 17.0736 5.44387 16.9815 5.35178L12.3982 0.768483Z" fill="currentColor" />
                                            </svg>
                                        </div>
                                    </TrackedOutboundLink>
                                </div>

                                {/* Checkmark Items - Desktop */}
                                <div className="flex flex-row flex-wrap items-center gap-x-6 gap-y-2 mt-4 lg:mt-6">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-green-600 text-base font-bold flex-shrink-0">✓</span>
                                        <p
                                            style={{ fontFamily: 'var(--font-public-sans)' }}
                                            className="text-[#252932] text-sm md:text-base font-[400] whitespace-nowrap"
                                        >
                                            Same-Day Appointments Available in {locationData.region.split(',')[0]}
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-green-600 text-base font-bold flex-shrink-0">✓</span>
                                        <p
                                            style={{ fontFamily: 'var(--font-public-sans)' }}
                                            className="text-[#252932] text-sm md:text-base font-[400] whitespace-nowrap"
                                        >
                                            Urgent Evaluation for Severe Back or Neck Pain
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-green-600 text-base font-bold flex-shrink-0">✓</span>
                                        <p
                                            style={{ fontFamily: 'var(--font-public-sans)' }}
                                            className="text-[#252932] text-sm md:text-base font-[400] whitespace-nowrap"
                                        >
                                            Complimentary MRI Review Available
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Form - Positioned higher for above the fold */}
                    <div className="w-[50%] sm:flex hidden flex-col z-[2] justify-start items-center xl:pt-8 lg:pt-12 md:pt-16">
                        <div className="xl:w-[65%] w-[95%] rounded-2xl mx-auto"><DoctorContactForm backgroundcolor={'#0xFF'} buttonText="Get Your Free Consultation" header="" defaultState={stateInfo?.abbr || state.toUpperCase()} /></div>
                        <div className="xl:w-[65%] w-[95%] mx-auto mt-5">
                            <SecondOpinionCallout cityName={locationData.region.split(',')[0].trim()} />
                        </div>
                    </div>
                </div>

                {/* Kept in normal flow. This band used to be xl:absolute xl:bottom-0,
                    which pulled it out of flow and let the hero columns render
                    underneath it once the second-opinion card made the right column
                    taller. The hero is content-height (no min-height), so flowing the
                    marquee after the columns puts it in the same place while making
                    the collision structurally impossible at any width. */}
                <div
                    className="z-[2] w-full flex flex-row items-center justify-evenly py-12 pt-[32px] pb-[50px]"

                >
                    <Marquee pauseOnHover className="w-full" >
                        {
                            [
                                { img: AAOS, name: 'AAOS' },
                                { img: ACP, name: 'ACP' },
                                { img: AOA, name: 'AOA' },
                                { img: NASS, name: 'NASS' },
                                { img: Serpent, name: 'Serpent' },
                                { img: SMIS, name: 'SMIS' }
                            ].map((item, index) => (
                                <Image key={index} src={item.img} alt={associationLogoAlt[item.name]} className=" lg:h-[40px] h-10 md:h-8 object-contain mx-[20px]" draggable={false} />
                            ))
                        }
                    </Marquee>
                </div>

            </section>
            <ClinicsMap startingClinic={clinicForClientProps} />
            <LocationGallerySection
              clinic={clinicForClientProps}
              city={locationData.region.split(',')[0].trim()}
              stateAbbr={stateInfo?.abbr || state}
              stateSlug={state}
              locationUrl={`/locations/${state}/${locationSlug}`}
            />
            {/* Our Specialty */}
            <section className=" w-full flex flex-col py-[50px] h-full px-2 md:px-[40px] items-center justify-center space-y-[60px]">
                <Reveal className="w-full" width="100%">
                    <div className=" flex xl:flex-row space-x-[60px] flex-col xl:space-y-0 space-y-8 w-full">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500, color: '#111315'
                            }}
                            className=" text-6xl w-[100%]"
                        >
                            Why Choose<br /> Mountain Spine & Orthopedics {locationData.region.split(',')[0].trim()}
                        </h2>

                        <div>
                            <p
                                style={{
                                    fontFamily: "var(--font-public-sans)",
                                    fontWeight: 400,
                                    color: '#424959'
                                }}
                                className="text-lg "
                            >
                                Trust {locationData.name} for expert care, compassionate service, and results that make a difference. Your mobility and well-being are our top priority!
                            </p>

                            <div className=" mt-[40px] xl:w-[50%] w-full md:w-fit"><BookAnAppoitmentButton /></div>
                            {/* INTERNAL LINKS HERE */}
                        </div>
                    </div>
                </Reveal>

                <div className=" flex xl:flex-row flex-col w-full gap-[32px] xl:items-stretch">
                    <div className=" xl:w-[50%] w-full rounded-[20px] overflow-hidden"><Image src={HomeWhyAO} className=" w-full h-full md:aspect-video aspect-square  object-cover" alt={`Orthopedic surgeon consulting with patient at Mountain Spine & Orthopedics ${locationData.region.split(',')[0].trim()} clinic`} /></div>

                    <div className=" xl:w-[50%] w-full flex flex-col space-y-[32px] ">
                        <Reveal className="w-full" width="100%">
                            <div className=" flex flex-col w-full space-y-[16px]">
                                <h3
                                    style={{
                                        fontFamily: "var(--font-public-sans)",
                                        fontWeight: 500, color: '#111315'
                                    }}
                                    className=" text-4xl"
                                >
                                    Our {locationData.name.replace('Mountain Spine & Orthopedics', '').trim()} Clinic Specialty
                                </h3>

                                <p
                                    style={{
                                        fontFamily: "var(--font-public-sans)",
                                        fontWeight: 500, color: '#424959'
                                    }}
                                    className=" text-lg"
                                >
                                    At Mountain Spine & Orthopedics, we provide exceptional care with the newest <a href='/treatments' className='underline text-[#252932]'>treatments</a> and a wide range of <a href='/conditions' className='underline text-[#252932]'>conditions</a> we treat. We put patients first.  Here's why {locationData.region.split(',')[0]} families choose us:
                                </p>
                                {/* INTERNAL LINKS HERE */}
                            </div>
                        </Reveal>

                        <Reveal className="w-full" width="100%" >
                            <div className=" grid grid-cols-1 md:grid-cols-2 rounded-[20px] overflow-hidden w-full">
                                {
                                    OurSpecialtyItems.map((item, index) => (
                                        <div key={index} className={`flex flex-col space-y-[16px] ${index == 1 || index == 2 ? 'bg-[#FAFAFA]' : 'bg-[#FAFAFA]'} p-6`}>
                                            <div className=" rounded-full bg-white p-1 items-center justify-center flex w-[20%] px-[12px] py-[15px] ">
                                                <item.icon />
                                            </div>
                                            <p
                                                style={{
                                                    fontFamily: "var(--font-public-sans)",
                                                    fontWeight: 500, color: '#252932'
                                                }}
                                                className=" text-xl"
                                            >{item.title}</p>
                                            <p
                                                style={{
                                                    fontFamily: "var(--font-inter)",
                                                    fontWeight: 500, color: '#424959'
                                                }}
                                                className="text-md"
                                            >{item.body}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </Reveal>

                    </div>
                </div>
            </section>
            {/* Removed duplicate certificates marquee under the map */}

            {/* SEO Sections: Services, Conditions, Treatments */}
            <LocationSeoSections 
                cityName={locationData.region.split(',')[0].trim()} 
                stateAbbr={stateInfo?.abbr || state.toUpperCase()}
                nearbyAreas={locationData.neighborhoodsWeServe || []}
            />
            <section className="w-full max-w-[1440px] flex flex-col py-10 space-y-12 h-full px-2 md:px-[40px]">
                {locationData.specialists}
                {locationData.skilled}
                {locationData.whyChoose}
                {locationData.mapEmbed ? (
                    <div className="w-full flex flex-col lg:flex-row lg:items-start mt-10 gap-6">
                        <div className="lg:w-1/3 xl:w-1/4 w-full">
                            {locationData.easyToReach}
                        </div>
                        <div className="lg:w-2/3 xl:w-3/4 w-full">
                            <div 
                                className="w-full rounded-lg overflow-hidden shadow-lg responsive-map-wrapper"
                                style={{ 
                                    height: 0,
                                }}
                            >
                                <div
                                    className="absolute inset-0 w-full h-full"
                                    dangerouslySetInnerHTML={{ 
                                        __html: locationData.mapEmbed
                                            .replace(/width="[^"]*"/gi, 'width="100%"')
                                            .replace(/height="[^"]*"/gi, 'height="100%"')
                                            .replace(/style="[^"]*"/gi, 'style="width: 100%; height: 100%; border: 0; position: absolute; top: 0; left: 0;"')
                                    }} 
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="w-full mt-10">
                        {locationData.easyToReach}
                    </div>
                )}
                {locationData.nearby}
                {locationData.advancedTreatments}
            </section>

            {/* FAQ Section */}
            {locationData.faqs && locationData.faqs.length > 0 && (
                <LocationFAQSection
                    faqs={locationData.faqs}
                    locationName={locationData.region.split(',')[0]}
                    pageUrl={`/locations/${state}/${locationSlug}`}
                />
            )}

            <section className="w-full max-w-[1440px] flex flex-col py-10 space-y-12 h-full px-2 md:px-[40px]">
                {locationData && (() => {
                    const visibleReviews = getVisibleReviews(locationData.reviews || []);
                    if (visibleReviews.length === 0) return null;
                    return (
                    <>
                        {/*
                          SSR-only reviews block — always present in HTML source for Googlebot.
                          The interactive carousel below is client-rendered; this ensures review
                          content (author, rating, text) is indexed without JS execution.
                          sr-only hides it visually without aria-hidden so crawlers read it fully.
                        */}
                        <div className="sr-only" aria-hidden="false">
                            <p><strong>Patient Reviews — {locationData.region.split(',')[0]}</strong></p>
                            {locationData.rating && locationData.reviewCount && locationData.reviewCount > 0 && (
                                <p>Rated {locationData.rating} out of 5 based on {locationData.reviewCount} patient reviews.</p>
                            )}
                            <ul>
                                {visibleReviews.map((review, i) => (
                                    <li key={i} itemScope itemType="https://schema.org/Review">
                                        <span itemProp="author" itemScope itemType="https://schema.org/Person">
                                            <span itemProp="name">{review.author}</span>
                                        </span>
                                        <span itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                                            <meta itemProp="ratingValue" content={String(review.reviewRating)} />
                                            <meta itemProp="bestRating" content="5" />
                                            {review.reviewRating} out of 5 stars
                                        </span>
                                        <span itemProp="reviewBody">{review.reviewBody}</span>
                                        {review.date && <time itemProp="datePublished" dateTime={review.date}>{review.date}</time>}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <ReviewsCarousel
                            reviews={visibleReviews}
                            cityName={locationData.region.split(',')[0]}
                            rating={locationData.rating}
                            reviewCount={locationData.reviewCount}
                        />
                    </>
                    );
                })()}
            </section>
            {/* <RatingsAndReviews /> */}
        </main>
    )
}
