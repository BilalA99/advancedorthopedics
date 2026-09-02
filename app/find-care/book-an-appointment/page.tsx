import ContactUsSection from '@/components/ContactUsSection'
import RatingsAndReviews from '@/components/RatingsAndReviews'
import { getVisibleReviews } from '@/lib/providers/providerVisibility'
import { sitewideReviews } from '@/components/data/socialProofReviews'
import React from 'react'
import Image from 'next/image'
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
import FindCareContactUsSection from '@/components/FindCardContactUsSection';
import { TextAnimate } from '@/components/magicui/text-animate';
import { Marquee } from '@/components/magicui/marquee';
import type { Metadata } from 'next'
import { buildCanonical } from "@/lib/seo";
import { getOgImageForPath } from "@/lib/og";

export const metadata: Metadata = {
  title: 'Book Your Appointment | Mountain Spine & Orthopedics',
  description: 'Schedule your orthopedic consultation today. Our patient advocates are ready to help you book an in-person or virtual visit with our Florida specialists.',
  alternates: {
    canonical: buildCanonical('/find-care/book-an-appointment'),
  },
  openGraph: {
    title: 'Book Your Appointment | Mountain Spine & Orthopedics',
    description: 'Schedule your orthopedic consultation today. Our patient advocates are ready to help you book an in-person or virtual visit with our Florida specialists.',
    url: buildCanonical('/find-care/book-an-appointment'),
    images: [
      {
        url: getOgImageForPath('/find-care/book-an-appointment'),
        width: 1200,
        height: 630,
        alt: 'Book an Appointment at Mountain Spine & Orthopedics',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book Your Appointment | Mountain Spine & Orthopedics',
    description: 'Schedule your orthopedic consultation today. Our patient advocates are ready to help you book an in-person or virtual visit with our Florida specialists.',
    images: [getOgImageForPath('/find-care/book-an-appointment')],
  },
}

// MedicalOrganization Schema for Book an Appointment page
// Refactored to use department property with nested MedicalClinic objects for proper data integrity
const BookAppointmentJsonLdSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "name": "Mountain Spine & Orthopedics",
    "description": "Leading spine and orthopedic specialists serving FL, NJ, NY, PA, and GA providing advanced minimally invasive treatments, including Band-Aid Back Surgery, laser spine procedures, and comprehensive pain management.",
    "url": "https://mountainspineorthopedics.com",
    "logo": "https://mountainspineorthopedics.com/newlogo4.png",
    "image": "https://mountainspineorthopedics.com/herosectionimg.jpg",
    "telephone": "(561) 223-9959",
    "medicalSpecialty": [
      "Orthopedic Surgery",
      "Spine Surgery", 
      "Sports Medicine",
      "Pain Management",
      "Minimally Invasive Surgery",
      "Joint Replacement",
      "Spinal Fusion",
      "Discectomy",
      "Arthroscopy"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Orthopedic Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalProcedure",
            "name": "Band-Aid Back Surgery"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "MedicalProcedure",
            "name": "Minimally Invasive Spine Surgery"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalProcedure", 
            "name": "Laser Spine Surgery"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalProcedure",
            "name": "Joint Replacement Surgery"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalProcedure",
            "name": "Pain Management"
          }
        }
      ]
    },
    "areaServed": [
      {
        "@type": "Neighborhood",
        "name": "Emerald Hills"
      },
      {
        "@type": "Neighborhood",
        "name": "MetroWest"
      },
      {
        "@type": "Neighborhood",
        "name": "ChampionsGate"
      },
      {
        "@type": "Neighborhood",
        "name": "Lawnwood"
      },
      {
        "@type": "State",
        "name": "Florida"
      },
      {
        "@type": "City",
        "name": "Hollywood"
      },
      {
        "@type": "City",
        "name": "Miami"
      },
      {
        "@type": "City",
        "name": "Orlando"
      },
      {
        "@type": "City",
        "name": "Altamonte Springs"
      },
      {
        "@type": "City",
        "name": "Davenport"
      },
      {
        "@type": "City",
        "name": "Fort Pierce"
      },
      {
        "@type": "City",
        "name": "Palm Beach Gardens"
      },
      {
        "@type": "City",
        "name": "Boca Raton"
      },
      {
        "@type": "City",
        "name": "Jacksonville"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/mountainspineorthopedics",
      "https://www.instagram.com/mountainspineorthopedics",
      "https://www.linkedin.com/company/mountainspineorthopedics"
    ],
    "department": [
      {
        "@type": "MedicalClinic",
        "name": "Mountain Spine & Orthopedics Hollywood, FL",
        "telephone": "(561) 223-9959",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "3500 Tyler St",
          "addressLocality": "Hollywood",
          "addressRegion": "FL",
          "postalCode": "33021",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 26.01135,
          "longitude": -80.1789
        }
      },
      {
        "@type": "MedicalClinic",
        "name": "Mountain Spine & Orthopedics Miami, FL",
        "telephone": "(561) 223-9959",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "7000 SW 62nd Ave, Suite 330",
          "addressLocality": "Miami",
          "addressRegion": "FL",
          "postalCode": "33143",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 25.69607,
          "longitude": -80.3014
        }
      },
      {
        "@type": "MedicalClinic",
        "name": "Mountain Spine & Orthopedics Palm Beach Gardens, FL",
        "telephone": "(561) 223-9959",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "3355 Burns Rd",
          "addressLocality": "Palm Beach Gardens",
          "addressRegion": "FL",
          "postalCode": "33410",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 26.83131,
          "longitude": -80.0846
        }
      },
      {
        "@type": "MedicalClinic",
        "name": "Mountain Spine & Orthopedics Fort Pierce, FL",
        "telephone": "(561) 223-9959",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "2215 Nebraska Ave",
          "addressLocality": "Fort Pierce",
          "addressRegion": "FL",
          "postalCode": "34950",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 27.43259,
          "longitude": -80.3448
        }
      },
      {
        "@type": "MedicalClinic",
        "name": "Mountain Spine & Orthopedics Jacksonville, FL",
        "telephone": "(561) 223-9959",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "1205 Monument Rd, Suite 202",
          "addressLocality": "Jacksonville",
          "addressRegion": "FL",
          "postalCode": "32225",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 30.34176,
          "longitude": -81.5381
        }
      },
      {
        "@type": "MedicalClinic",
        "name": "Mountain Spine & Orthopedics Altamonte Springs - Central Parkway, FL",
        "telephone": "(561) 223-9959",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "499 E Central Pkwy, Suite 130",
          "addressLocality": "Altamonte Springs",
          "addressRegion": "FL",
          "postalCode": "32701",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 28.67008,
          "longitude": -81.3747
        }
      },
      {
        "@type": "MedicalClinic",
        "name": "Mountain Spine & Orthopedics Altamonte Springs - Palm Springs Dr, FL",
        "telephone": "(561) 223-9959",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "652 Palm Springs Dr",
          "addressLocality": "Altamonte Springs",
          "addressRegion": "FL",
          "postalCode": "32701",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 28.6742,
          "longitude": -81.3742
        }
      },
      {
        "@type": "MedicalClinic",
        "name": "Mountain Spine & Orthopedics Orlando, FL",
        "telephone": "(561) 223-9959",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "6150 Metrowest Blvd",
          "addressLocality": "Orlando",
          "addressRegion": "FL",
          "postalCode": "32835",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 28.51362,
          "longitude": -81.4662
        }
      },
      {
        "@type": "MedicalClinic",
        "name": "Mountain Spine & Orthopedics Boca Raton, FL",
        "telephone": "(561) 223-9959",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "1905 Clint Moore Rd",
          "addressLocality": "Boca Raton",
          "addressRegion": "FL",
          "postalCode": "33496",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 26.40853,
          "longitude": -80.1258
        }
      },
      {
        "@type": "MedicalClinic",
        "name": "Mountain Spine & Orthopedics Davenport, FL",
        "telephone": "(561) 223-9959",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "2400 North Blvd W",
          "addressLocality": "Davenport",
          "addressRegion": "FL",
          "postalCode": "33837",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 28.16742,
          "longitude": -81.6389
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default function BookAnAppointment() {
  return (
    <main className='w-full flex flex-col items-center justify-center bg-white h-full'>
      {/* MedicalOrganization Schema for SEO */}
      <BookAppointmentJsonLdSchema />

      {/*
        CRO: On mobile the booking form is the primary conversion goal.
        Form is rendered first (order-1) so it appears above fold on mobile.
        Hero is decorative context — pushed below form on mobile (order-2),
        restored above form on lg+ (lg:order-1 / lg:order-2).
        pt-24 on the form wrapper clears the fixed nav height on mobile.
      */}
      <div className="order-1 lg:order-2 w-full">
        {/* Mobile-only compact hero — background image + title above the form.
            Hidden on lg+ where the full hero section (order-2 lg:order-1) takes over. */}
        <div className="lg:hidden relative overflow-hidden pt-20 pb-3 px-6">
          <Image
            src="/herosectionimg.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center"
            aria-hidden="true"
          />
          {/* Subtle bottom fade so hero blends into the form */}
          <div
            className="absolute inset-x-0 bottom-0 h-10 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.6))' }}
            aria-hidden="true"
          />
          <div className="relative z-10">
            {/* The lg+ hero below carries this page's single <h1>; this
                mobile-only duplicate is presentational. */}
            <p
              style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
              className="text-[#252932] text-3xl"
            >
              Book an Appointment
            </p>
            <p
              style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
              className="text-[#252932] text-base mt-1"
            >
              Our patient advocates are here to help. Schedule a virtual or in-person appointment at your earliest convenience.
            </p>
          </div>
        </div>
        {/* Negative top margin pulls the form up flush under the hero on mobile */}
        <div className="-mt-3 lg:mt-0">
          <FindCareContactUsSection page={'Book an Appointment'} backgroundcolor="white" />
        </div>
      </div>

      <section className="order-2 lg:order-1 hidden lg:flex w-full h-full flex-col relative overflow-hidden [mask-composite:intersect] [mask-image:linear-gradient(to_top,transparent,black_6rem)]">
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
          alt="Book an appointment with Mountain Spine & Orthopedics specialists"
        />
        <div
          className="w-full h-[100px] absolute bottom-0 z-[1]"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 1) 100%)',
          }}
        />
        <div className="z-[2] flex flex-col w-full h-full text-left relative pt-32 lg:pt-26 pb-20 px-6 lg:px-[80px]">
          <div className='max-w-[1440px] w-full flex flex-col items-start justify-start'>
            <TextAnimate as="h1" animation="blurInUp" by="word" once
              style={{
                fontFamily: 'var(--font-public-sans)',
                fontWeight: 500,
              }}
              className='text-[#252932] text-3xl md:text-6xl'
            >
              Book an Appointment
            </TextAnimate>
            <p
              style={{
                fontFamily: 'var(--font-public-sans)',
                fontWeight: 500,
              }}
              className='text-[#252932] md:text-xl text-lg mt-2'
            >
              Our patient advocates are here to help. Schedule a virtual or in-person appointment at your earliest convenience.
            </p>
          </div>
        </div>
      </section>

      <div className="order-3 w-full flex flex-row items-center justify-evenly py-20 "
      >

        <Marquee pauseOnHover className='w-full' >
          {
            [
              { img: AAOS, name: 'AAOS' },
              { img: ACP, name: 'ACP' },
              { img: AOA, name: 'AOA' },
              { img: NASS, name: 'NASS' },
              { img: Serpent, name: 'Serpent' },
              { img: SMIS, name: 'SMIS' }
            ].map((item, index) => (
              <Image key={index} src={item.img} alt={associationLogoAlt[item.name]} className=" h-[40px] object-contain mx-[20px]" />
            ))
          }
        </Marquee>

      </div>
      <div className="order-4 w-full">
        <RatingsAndReviews reviews={getVisibleReviews(sitewideReviews)} />
      </div>
    </main>
  )
}
