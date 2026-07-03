import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Image from "next/image";
import Link from "next/link";
import { buildCanonical } from "@/lib/seo";
import { getOgImageForPath } from "@/lib/og";

// Data Imports from the centralized file
import {
  ServicesAndExpertise,
  Amenities,
} from '@/components/data/homepage-data';

// Component Imports (kept static — above the fold or tiny)
import BookAnAppoitmentButton from "@/components/BookAnAppoitmentButton";
import MountOnView from "@/components/MountOnView";

// Animation & UI Imports
import Reveal from "@/components/RevealAnimation";

// Above-the-fold (sync — hero owns the LCP)
import HomeHeroSection from '@/components/HomeHeroSection.client';
import HomeStatisticsBar from '@/components/HomeStatisticsBar.client';

// Below-the-fold client sections — split into separate JS chunks (still SSR'd for SEO)
const ServicesAndExpertiseSection = dynamic(() => import('@/components/ServicesAndExpertiseSection.client'));
const OurSpecialtySection         = dynamic(() => import('@/components/OurSpecialtySection.client'));
const HomeInteractiveAnatomy      = dynamic(() => import('@/components/HomeInteractiveAnatomy.client'));
const FeaturedDoctorsSection      = dynamic(() => import('@/components/FeaturedDoctorsSection.client'));
const HomePainToProgress          = dynamic(() => import('@/components/HomePainToProgress.client'));
const RatingsAndReviews           = dynamic(() => import('@/components/RatingsAndReviews'));
const ContactUsSection            = dynamic(() => import('@/components/ContactUsSection'));

// Google Maps lives in its own chunk and only mounts when the user scrolls near it.
// Wrapper is a client component so we can use `dynamic({ ssr: false })`.
import ClinicsMap from '@/components/ClinicsMapLazy.client';

// Image Asset Imports - Using CDN URLs since local files don't exist
const AAOS = 'https://mountainspineortho.b-cdn.net/public/AAOS.png';
const ACP = 'https://mountainspineortho.b-cdn.net/public/ACP.png';
const AOA = 'https://mountainspineortho.b-cdn.net/public/AOA.png';
const NASS = 'https://mountainspineortho.b-cdn.net/public/NASS.png';
const Serpent = 'https://mountainspineortho.b-cdn.net/public/Serpent.png';
const SMIS = 'https://mountainspineortho.b-cdn.net/public/SMIS.png';
const HomeWhyAO = 'https://mountainspineortho.b-cdn.net/public/HomeWhyAO-min.jpeg';
const MRI1 = 'https://mountainspineortho.b-cdn.net/public/MRI1.png';
const MRI2 = 'https://mountainspineortho.b-cdn.net/public/MRI2.png';
const MRI3 = 'https://mountainspineortho.b-cdn.net/public/MRI3.png';

// ✅ Server-Rendered Metadata for Homepage SEO - Multi-State Coverage
export const metadata: Metadata = {
  title: 'Mountain Spine & Orthopedics | Top Orthopedic & Spine Surgeons in FL, NJ, NY & PA',
  description: "Leading orthopedic and spine surgeons specializing in minimally invasive back surgery, joint replacement, and advanced neck pain treatment. Serving patients across Florida, New Jersey, New York & Pennsylvania. Book your consultation today.",
  openGraph: {
    title: 'Mountain Spine & Orthopedics | Top Orthopedic & Spine Surgeons in FL, NJ, NY & PA',
    description: "Leading orthopedic and spine surgeons specializing in minimally invasive back surgery, joint replacement, and advanced neck pain treatment. Serving patients across Florida, New Jersey, New York & Pennsylvania. Book your consultation today.",
    url: buildCanonical('/'),
    siteName: 'Mountain Spine & Orthopedics',
    images: [
      {
        url: getOgImageForPath('/'),
        width: 1200,
        height: 630,
        alt: 'Patient and doctor consultation at Mountain Spine & Orthopedics clinic.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mountain Spine & Orthopedics | Top Orthopedic & Spine Surgeons in FL, NJ, NY & PA',
    description: "Leading orthopedic and spine surgeons specializing in minimally invasive back surgery, joint replacement, and advanced neck pain treatment. Serving patients across Florida, New Jersey, New York & Pennsylvania. Book your consultation today.",
    images: [getOgImageForPath('/')],
  },
  keywords: [
    "orthopedic surgeon specialists",
    "minimally invasive spine surgery",
    "joint replacement surgery",
    "back pain treatment",
    "orthopedic surgery consultation",
    "orthopedic surgeon near me",
    "orthopedic specialists Florida",
    "orthopedic specialists New Jersey",
    "orthopedic specialists New York",
    "orthopedic specialists Pennsylvania",
    "spine surgery Hollywood FL",
    "orthopedic surgeon Boca Raton",
    "orthopedic surgery Orlando",
    "herniated disc specialist",
    "cervical disc replacement expert",
    "spinal stenosis treatment",
    "sciatica pain relief",
    "spine specialist near me",
    "joint pain relief",
    "neck pain treatment",
    "shoulder pain specialist",
    "knee pain doctor",
    "foot pain treatment"
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: buildCanonical('/'),
    languages: {
      'en-US': buildCanonical('/'),
    },
  },
};

// ✅ Enhanced JSON-LD Schema with Multiple Locations - Multi-State Coverage
const HomePageJsonLdSchema = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    'name': 'Mountain Spine & Orthopedics',
    'url': 'https://mountainspineorthopedics.com/',
    'logo': 'https://mountainspineorthopedics.com/newlogo4.png',
    'description': 'Board-certified orthopedic surgeon specialists providing minimally invasive spine surgery, joint replacement surgery, and advanced back pain treatment across Florida, New Jersey, New York, and Pennsylvania. Expert orthopedic surgery consultations available.',
    'image': 'https://mountainspineorthopedics.com/default_og.png',
    'telephone': '+1-561-223-9959',
    'priceRange': '$$',
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+1-561-223-9959',
      'contactType': 'Customer Service',
      'areaServed': ['Florida', 'New Jersey', 'New York', 'Pennsylvania'],
      'availableLanguage': ['en']
    },
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '3500 Tyler St',
      'addressLocality': 'Hollywood',
      'addressRegion': 'FL',
      'postalCode': '33021',
      'addressCountry': 'US'
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '5',
      'reviewCount': '200',
      'bestRating': '5',
      'worstRating': '1'
    },
    'sameAs': [
      'https://www.facebook.com/p/Mountain-Spine-Orthopedics-61576930958681/',
      'https://www.instagram.com/mountainspineortho/'
    ],
    'medicalSpecialty': [
      'Orthopedics',
      'Spine Surgery',
      'Pain Management',
      'Sports Medicine'
    ],
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Orthopedic Services',
      'itemListElement': [
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Minimally Invasive Spine Surgery',
            'url': 'https://mountainspineorthopedics.com/treatments/endoscopic-discectomy-surgery'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Free MRI Review',
            'url': 'https://mountainspineorthopedics.com/find-care/free-mri-review'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Joint Replacement Surgery',
            'url': 'https://mountainspineorthopedics.com/treatments'
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default function Home() {
  return (
    <>
      <HomePageJsonLdSchema />
        <main className="w-full flex flex-col items-center justify-center bg-white h-full">
        {/* Hero Section - Interactive (renders the visible <h1>) */}
        <HomeHeroSection />

        {/* Statistics/Testimonials Bar - Interactive - MOVED UP FOR IMMEDIATE SOCIAL PROOF */}
        <HomeStatisticsBar />

        {/* Services & Expertise */}
        <section className="w-full max-w-[1440px] flex flex-col py-[50px] h-full px-3 md:px-[40px]">
          <div className="xl:grid xl:grid-cols-3 flex flex-col gap-[32px]">
            <div className="rounded-[24px] bg-[#FAFAFA] p-[40px] flex flex-col col-span-1">
              <div className="bg-white rounded-[32px] px-[14px] py-[7px] w-fit">
                <p
                  style={{
                    fontFamily: "var(--font-public-sans)",
                    fontWeight: 500, background: 'linear-gradient(270deg, #D4ABE5 0%, #9596EC 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                  className="text-sm text-center"
                >
                  The Future of Spine & Orthopedic Care
                </p>
              </div>

              <div className="mt-[12px]">
                <h2
                  style={{
                    fontFamily: "var(--font-public-sans)",
                    fontWeight: 500, color: '#252932',
                  }}
                  className="text-5xl text-left"
                >
                  Services & Expertise
                </h2>
              </div>

              <div className="sm:grid hidden grid-cols-2 gap-[10px] mt-[40px]">
                {ServicesAndExpertise.map((item) => (
                  <Link
                    href={`/conditions?data=${encodeURIComponent(JSON.stringify({ tags: item.link }))}`}
                    key={item.title}
                    className="flex flex-row px-[15px] py-[10px] space-x-[10px] bg-[#EEEFF1] rounded-2xl items-center justify-center hover:cursor-pointer"
                  >
                    <Image src={item.img} alt={item.title} width={22} height={22} className="h-[22px] w-[22px]" />
                    <span className="text-[#424959]">{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="rounded-[24px] bg-[#FAFAFA] p-10 flex-col col-span-2 sm:flex hidden">
              <div className="">
                <p
                  style={{
                    fontFamily: "var(--font-public-sans)",
                    fontWeight: 500, color: 'black',
                    lineHeight: 1.5
                  }}
                  className="md:px-6 sm:text-2xl text-lg"
                >
                  Leading orthopedic specialists combining cutting-edge innovations with compassionate care to treat spine disorders, fractures, arthritis,
                  sports injuries, and joint pain across Florida, New Jersey, New York, and Pennsylvania. Using minimally invasive techniques
                  and evidence-based treatments, our board-certified specialists provide personalized solutions for faster recovery and lasting mobility.
                </p>
              </div>

              <div className="mt-[40px] md:w-[45%]">
                <BookAnAppoitmentButton bordered />
              </div>
            </div>
          </div>

          <Reveal className="w-full" width="100%">
            <ServicesAndExpertiseSection />
          </Reveal>
        </section>

        {/* Why Choose Mountain Spine & Orthopedics */}
        <section className="w-full max-w-[1440px] flex flex-col py-[50px] h-full px-2 md:px-[40px] items-center justify-center space-y-[60px]">
          <Reveal className="w-full" width="100%">
            <div className="flex xl:flex-row space-x-[60px] flex-col xl:space-y-0 space-y-8 w-full">
              <h2 style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500, color: '#111315' }} className="text-6xl w-[100%]">
                Why Choose<br /> Mountain Spine & Orthopedics
              </h2>
              <div>
                <p style={{ fontFamily: "var(--font-public-sans)", fontWeight: 400, color: '#424959' }} className="text-lg">
                  Trust Mountain Spine & Orthopedics for expert spine and joint care across Florida, New Jersey, New York, and Pennsylvania. We provide compassionate service with minimally invasive techniques that deliver faster recovery times. Your mobility and well-being are our top priority!
                </p>
                <div className="mt-[40px] xl:w-[50%] w-full md:w-fit">
                  <BookAnAppoitmentButton />
                </div>
              </div>
            </div>
          </Reveal>
          <div className="flex xl:flex-row flex-col w-full gap-[32px] xl:items-stretch">
            <div className="xl:w-[50%] w-full rounded-[20px] overflow-hidden">
              <Image src={HomeWhyAO} width={1440} height={1000} className="w-full h-full md:aspect-video aspect-square object-cover" alt="Board-certified orthopedic surgeon performing comprehensive patient evaluation at Mountain Spine & Orthopedics" />
            </div>
            <div className="xl:w-[50%] w-full flex flex-col space-y-[32px]">
              <Reveal className="w-full" width="100%">
                <div className="flex flex-col w-full space-y-[16px]">
                  <h3 style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500, color: '#111315' }} className="text-4xl">
                    Our Specialty
                  </h3>
                  <p style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500, color: '#424959' }} className="text-lg">
                    At Mountain Spine & Orthopedics, we are dedicated to providing exceptional spine and joint care with cutting-edge minimally invasive treatments and a patient-first approach. Serving patients across Florida, New Jersey, New York, and Pennsylvania. Here's why we stand out:
                  </p>
                </div>
              </Reveal>
              <Reveal className="w-full" width="100%"><OurSpecialtySection /></Reveal>
            </div>
          </div>
        </section>

        {/* Expert Orthopedic Conditions We Treat - Interactive */}
        <HomeInteractiveAnatomy />

        {/* Meet Our Experts */}
        <section className="w-full max-w-[1440px] flex flex-col py-[50px] h-full px-[40px]">
          <div className="flex md:flex-row flex-col mb-6">
            <div className="flex flex-col space-y-[24px] md:w-[50%] w-full">
              <h2 style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }} className="text-black text-5xl text-left w-full">
                Meet Our Expert Orthopedic Specialists
              </h2>
              <p style={{ fontFamily: "var(--font-inter)", fontWeight: 400 }} className="text-[#54535C] md:w-[50%] w-full">
                Board-certified orthopedic surgeons and spine specialists serving patients across FL, NJ, NY & PA with 20+ years of combined experience
              </p>
            </div>
            <div className="md:w-[50%] flex items-center md:justify-end w-full md:mt-0 mt-4">
              <Link href={'/about/meetourdoctors'} className="bg-white border hover:cursor-pointer border-[#252932] px-[20px] py-[10px] space-x-[10px] flex flex-row items-center justify-center rounded-[62px]">
                <span style={{ fontFamily: "var(--font-inter)", fontWeight: 400 }} className="text-[#252932]">View all</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="11" viewBox="0 0 18 11" fill="none">
                  <path d="M12.3982 0.268483C12.0402 -0.0894963 11.4598 -0.089494 11.1018 0.268488C10.7438 0.62647 10.7438 1.20687 11.1018 1.56485L14.1203 4.58333H1.66667C1.16041 4.58333 0.75 4.99374 0.75 5.5C0.75 6.00626 1.16041 6.41667 1.66667 6.41667H14.1203L11.1018 9.43516C10.7439 9.79314 10.7439 10.3735 11.1019 10.7315C11.4598 11.0895 12.0402 11.0895 12.3982 10.7315L16.9766 6.15303C16.9935 6.13637 17.0098 6.11905 17.0254 6.10112C17.0873 6.02997 17.1365 5.95154 17.1728 5.86885C17.2221 5.75677 17.2496 5.63294 17.25 5.50273L17.25 5.5C17.25 5.49717 17.25 5.49434 17.25 5.49152C17.2489 5.37622 17.2266 5.26602 17.1867 5.16463C17.142 5.05068 17.0736 4.94387 16.9815 4.85178L12.3982 0.268483Z" fill="#252932" />
                </svg>
              </Link>
            </div>
          </div>
          <FeaturedDoctorsSection />
        </section>

        {/* From Pain to Progress - Interactive - MOVED UP BEFORE TESTIMONIALS */}
        <HomePainToProgress />

        {/* What Our Patients Say */}
        <RatingsAndReviews />

        {/* Complimentary Perks */}
        <section className="w-full max-w-[1440px] flex xl:flex-row flex-col py-[50px] h-full px-2 md:px-[40px] space-x-[32px]">
          <div className="rounded-[24px] bg-[#FAFAFA] p-[24px] flex flex-col xl:w-[50%] w-full h-full">
            <div className="flex flex-col space-y-[24px]">
              <h2 style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500, color: 'black' }} className="text-5xl">
                Free Second Opinion & MRI Reading
              </h2>
              <p style={{ fontFamily: "var(--font-inter)", fontWeight: 500, color: '#424959', lineHeight: 1.5 }} className="">
                <span className="text-[#0A50EC]">Free Second Opinion.</span> Persistent pain concerns despite multiple treatments? At Mountain Spine & Orthopedics, serving patients across Florida, New Jersey, New York, and Pennsylvania, we <span className="text-[#0A50EC]">offer a free second opinion</span> and cutting-edge minimally invasive procedures for pain management, mobility restoration, and quality of life enhancement. Book your consultation today!
              </p>
              <div className="flex md:flex-row flex-col w-full gap-3 justify-center items-stretch">
                <div className="w-full md:flex-1 min-w-0">
                  <BookAnAppoitmentButton />
                </div>
                <Link href={'/about'} className="bg-white border hover:cursor-pointer border-[#252932] px-3 py-2.5 gap-2 min-h-[56px] flex items-center justify-center rounded-[62px] w-full md:flex-1 group">
                  <span style={{ fontFamily: "var(--font-inter)", fontWeight: 400 }} className="text-[#252932] text-center text-[13px] leading-4">Learn More About Our Practice</span>
                  <div className="shrink-0 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
                      <path d="M13.4985 0.965242C13.252 0.736636 12.9267 0.609835 12.6498 0.530065C12.3544 0.444969 12.0165 0.386948 11.6686 0.34632C10.9713 0.264898 10.1536 0.244548 9.38838 0.251159C8.61878 0.257808 7.88161 0.291999 7.33826 0.324347C7.06612 0.340548 6.84152 0.356353 6.68445 0.368151C6.6059 0.374051 6.54417 0.378953 6.50177 0.382408L6.45295 0.38645L6.43999 0.387552L6.43495 0.387986C6.0223 0.423934 5.71693 0.787596 5.75287 1.20025C5.78882 1.61288 6.15303 1.9182 6.56565 1.88228L6.56817 1.88207L6.57907 1.88114L6.62358 1.87745C6.66303 1.87424 6.7216 1.86959 6.7968 1.86394C6.94725 1.85264 7.16405 1.83737 7.42741 1.8217C7.95506 1.79028 8.66529 1.75746 9.40134 1.7511C10.1417 1.74471 10.8879 1.76536 11.4946 1.8362C11.5287 1.84017 11.562 1.84428 11.5947 1.84852L0.96967 12.4736C0.676777 12.7665 0.676777 13.2413 0.96967 13.5342C1.26256 13.8271 1.73744 13.8271 2.03033 13.5342L12.6578 2.90672C12.6596 2.92107 12.6614 2.93557 12.6631 2.95021C12.7334 3.55004 12.7544 4.30047 12.7486 5.05046C12.7429 5.79576 12.711 6.51955 12.6803 7.05855C12.6651 7.32757 12.6501 7.54947 12.6391 7.70364C12.6336 7.7807 12.629 7.84078 12.6258 7.8813L12.6222 7.92705L12.621 7.94154C12.5868 8.35431 12.8936 8.71673 13.3063 8.75104C13.7191 8.78536 14.0816 8.47805 14.1159 8.06526L14.1163 8.06067L14.1174 8.04746L14.1213 7.99761C14.1247 7.95428 14.1295 7.89119 14.1352 7.81094C14.1467 7.65046 14.1622 7.4211 14.1779 7.14367C14.2094 6.58976 14.2426 5.83985 14.2485 5.06198C14.2545 4.2888 14.2338 3.46659 14.1529 2.77563C14.1125 2.43136 14.0547 2.09687 13.9689 1.80777C13.8907 1.54431 13.758 1.20593 13.4985 0.965242Z" fill="#252932" />
                    </svg>
                  </div>
                </Link>
              </div>
              <div className="">
                <Image src={'https://mountainspineortho.b-cdn.net/public/HomeWhyAO-min.jpeg'} layout="responsive" height={1000} width={1440} alt="Orthopedic specialist providing personalized treatment plan consultation to patient" className="w-full xl:h-[250px] xl:max-h-[250px] object-cover object-center xl:object-top-left rounded-[12px]" />
              </div>
            </div>
          </div>
          <Reveal className="xl:w-[50%] w-full mt-0" width="100%">
            <div className="flex flex-col space-y-[38px] w-full">
              <div className="bg-[#FAFAFA] w-full rounded-[24px] p-[24px] space-y-[24px] h-[50%]">
                <div className="flex flex-col space-y-[8px]">
                  <h3 style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500, color: 'black', lineHeight: 1.2 }} className="text-2xl">
                    Complimentary MRI Reading
                  </h3>
                  <p style={{ fontFamily: "var(--font-inter)", fontWeight: 500, color: '#424959' }} className="text-lg">
                    Get a free MRI reading from our board-certified orthopedic specialists to tailor your personalized treatment plan.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-x-[16px]">
                  {[MRI1, MRI2, MRI3].map((item, index) => (
                    <div key={index}>
                      <Image src={item} width={300} height={300} className="w-full h-full aspect-square rounded-[12px]" alt="Image of an MRI Bone Scan" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#FAFAFA] w-full rounded-[24px] p-4 md:p-[24px] space-y-[24px] h-[50%] items-center justify-center">
                <div className="flex flex-col space-y-[8px] items-center justify-center md:mt-10">
                  <h3 style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500, color: 'black', lineHeight: 1.2 }} className="md:text-2xl text-4xl text-center">
                    Complimentary Amenities
                  </h3>
                  <p style={{ fontFamily: "var(--font-inter)", fontWeight: 500, color: '#424959' }} className="w-[65%] text-center">
                    Enjoy Complimentary Amenities: Free Car Service, Refreshments & WiFi
                  </p>
                </div>

                <div className="flex flex-row xl:gap-x-10 gap-x-8 items-center justify-center">
                  {Amenities.map((item, index) => (
                    <div className="flex flex-col space-y-[12px] w-fit aspect-square lg:p-[8px] p-0 items-center justify-center" key={item.title}>
                      <div className="bg-white rounded-[12px] aspect-square flex items-center justify-center p-[8px]">
                        {item.icon()}
                      </div>
                      <div>
                        <span style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }} className="text-sm w-fit text-[#0A50EC]">
                          {item.title}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ClinicsMap — Google Maps JS only fetches when user scrolls near */}
        <MountOnView rootMargin="400px" fallback={<div className="h-[400px] sm:h-[500px] md:h-[600px] lg:h-[680px] bg-gray-50 rounded-3xl mx-auto max-w-[1440px] my-12" aria-hidden="true" />}>
          <ClinicsMap />
        </MountOnView>

        {/* ContactUsSection */}
        <ContactUsSection />
      </main>
    </>
  );
}
