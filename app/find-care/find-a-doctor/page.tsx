import { buildCanonical } from "@/lib/seo";
import { getOgImageForPath } from "@/lib/og";
import { getVisibleProviders, getVisibleReviews } from '@/lib/providers/providerVisibility';
import { sitewideReviews } from '@/components/data/socialProofReviews';
import PhysicianSchema from '@/components/PhysicianSchema';

export const metadata = {
  title: "Find an Orthopedic Doctor in Florida | Mountain Spine & Orthopedics",
  description: "Find board-certified orthopedic doctors and spine surgeons in Florida. Our expert physicians specialize in comprehensive spine care, joint reconstruction, and pain management.",
  alternates: {
    canonical: buildCanonical('/find-care/find-a-doctor'),
  },
  openGraph: {
    title: "Find an Orthopedic Doctor in Florida | Mountain Spine & Orthopedics",
    description: "Find board-certified orthopedic doctors and spine surgeons in Florida. Our expert physicians specialize in comprehensive spine care, joint reconstruction, and pain management.",
    url: buildCanonical('/find-care/find-a-doctor'),
    images: [
      {
        url: getOgImageForPath('/find-care'),
        width: 1200,
        height: 630,
        alt: 'Find a Doctor at Mountain Spine & Orthopedics',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Find an Orthopedic Doctor in Florida | Mountain Spine & Orthopedics",
    description: "Find board-certified orthopedic doctors and spine surgeons in Florida. Our expert physicians specialize in comprehensive spine care, joint reconstruction, and pain management.",
    images: [getOgImageForPath('/find-care')],
  },
};

// MedicalOrganization Schema for brand consistency
const medicalOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "name": "Mountain Spine & Orthopedics",
  "description": "Leading spine and orthopedic specialists in Florida providing advanced minimally invasive treatments, including Band-Aid Back Surgery, laser spine procedures, and comprehensive pain management.",
  "url": "https://mountainspineorthopedics.com",
  "logo": "https://mountainspineorthopedics.com/newlogo4.png",
  "image": "https://mountainspineorthopedics.com/herosectionimg.jpg",
  "telephone": [
    "(561) 223-9959",
    "(754) 212-8736",
    "(407) 565-7598",
    "(407) 960-1717",
    "(863) 777-5805",
    "(561) 556-1802",
    "(954) 987-2047",
    "(561) 544-5501"
  ],
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
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 27.7663,
      "longitude": -82.6404
    },
    "geoRadius": "300000"
  },
  "areaServed": [
    "Florida",
    "Hollywood, FL",
    "Orlando, FL",
    "Altamonte Springs, FL",
    "Davenport, FL",
    "Fort Pierce, FL",
    "Palm Beach Gardens, FL",
    "South Miami, FL",
    "Boca Raton, FL"
  ]
};

import React from 'react'
import ContactUsSection from '@/components/ContactUsSection'
import RatingsAndReviews from '@/components/RatingsAndReviews'
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
import DoctorCard from '@/components/DoctorCard';
import FindCareContactUsSection from '@/components/FindCardContactUsSection';
import { TextAnimate } from '@/components/magicui/text-animate';
import { Marquee } from '@/components/magicui/marquee';

export default function FindADoctor() {
  const visibleDoctors = getVisibleProviders();
  return (
    <main className='w-full flex flex-col items-center justify-center bg-white h-full'>
      {/* JSON-LD Schema Markup for SEO */}
      <PhysicianSchema doctors={visibleDoctors} wrapInItemList={true} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalOrganizationSchema) }} />
      <section className="w-full h-full flex flex-col relative overflow-hidden [mask-composite:intersect] [mask-image:linear-gradient(to_top,transparent,black_6rem)]">
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
          alt="Find a board-certified orthopedic doctor or spine surgeon at Mountain Spine & Orthopedics"
        />
        <div
          className="w-full h-[100px] absolute bottom-0 z-[1]"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 1) 100%)',
          }}
        />
        <div className="z-[2] flex flex-col w-full h-full text-left relative pt-32 lg:pt-26 pb-20 px-6 lg:px-[80px]">
          <div className='max-w-[1440px] w-full flex flex-col items-start justify-start'>
            <TextAnimate 
              animation="blurInUp" 
              by="word" 
              once
              as="h1"
              style={{
                fontFamily: 'var(--font-public-sans)',
                fontWeight: 500,
              }}
              className='text-[#252932] text-3xl md:text-6xl'
            >
              Find a Doctor
            </TextAnimate>
            <p
              style={{
                fontFamily: 'var(--font-public-sans)',
                fontWeight: 500,
              }}
              className='text-[#252932] text-lg md:text-xl mt-2'
            >
              Connect With a Top Spine Surgeon or Orthopedic Specialist
            </p>
          </div>
        </div>
      </section>
      <FindCareContactUsSection page={'Find a Doctor'} backgroundcolor="white" />
      <div className="w-full flex flex-row items-center justify-evenly py-20 "
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

      <section className="w-full max-w-[1440px] flex flex-col py-[50px] h-full px-[40px]">
        <div className=" flex flex-row">
          <div className=" flex flex-col space-y-[24px] w-[50%]">
            <h2
              style={{
                fontFamily: "var(--font-public-sans)",
                fontWeight: 500,
              }}
              className="text-black text-5xl text-left w-full"
            >Meet Our Doctors</h2>
          </div>
        </div>
        <div className=" mt-[60px] grid-cols-1 md:grid-cols-2 grid lg:grid-cols-3 gap-16">
          {
            visibleDoctors.map((item) => (
              <DoctorCard key={item.name} doctor={item} />
            ))
          }
        </div>
      </section>


      <RatingsAndReviews reviews={getVisibleReviews(sitewideReviews)} />
    </main>
  )
}
