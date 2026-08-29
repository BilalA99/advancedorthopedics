import React from 'react'
import PatientFormsLanding from '@/public/PatientFormsLanding.jpeg'
import OrthoDoctos from '@/public/OrthoDoctors.jpeg'
import Image from 'next/image'
import ContactUsSection from '@/components/ContactUsSection'
import { TextAnimate } from '@/components/magicui/text-animate'

import { buildCanonical } from '@/lib/seo';
import { getOgImageForPath } from '@/lib/og';

// BreadcrumbList Schema for navigation context
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://mountainspineorthopedics.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Patient Forms",
      "item": "https://mountainspineorthopedics.com/patient-forms"
    }
  ]
}

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
}

export const metadata = {
    title: 'Patient Forms | Mountain Spine & Orthopedics',
    description: 'Access new patient packets and forms for Mountain Spine & Orthopedics. Download, complete, and bring or fax to streamline your visit.',
    alternates: {
        canonical: buildCanonical('/patient-forms'),
    },
    openGraph: {
        title: 'Patient Forms | Mountain Spine & Orthopedics',
        description: 'Access new patient packets and forms for Mountain Spine & Orthopedics. Download, complete, and bring or fax to streamline your visit.',
        url: buildCanonical('/patient-forms'),
        type: 'website',
        images: [
          {
            url: getOgImageForPath('/patient-forms'),
            width: 1200,
            height: 630,
            alt: 'Downloadable patient forms for Mountain Spine & Orthopedics',
          },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Patient Forms | Mountain Spine & Orthopedics',
        description: 'Access new patient packets and forms for Mountain Spine & Orthopedics. Download, complete, and bring or fax to streamline your visit.',
        images: [getOgImageForPath('/patient-forms')],
    },
};

export default function PatientForms() {
    return (
        <main className='w-full flex flex-col items-center justify-center bg-white h-full'>
            {/* JSON-LD Schema Markup for SEO */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalOrganizationSchema) }} />
            
            {/* Landing */}
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
                    alt="Mountain Spine & Orthopedics patient forms and consultation desk with friendly medical staff"
                />
                <div
                    className="lg:w-[100%] z-[1] h-full absolute left-0 top-0 md:w-[100%] w-full"
                    style={{
                        background: 'linear-gradient(180deg, rgba(10, 80, 236, 0.20) 0%, rgba(255, 255, 255, 0.20) 100%)',
                    }}
                />
                <div className="z-[2] flex flex-col w-full h-full text-left relative pt-32 lg:pt-26 pb-20 px-6 lg:px-[80px]">
                    <div className='px-6 xl:px-[80px] z-[2]'>
                        <div className='flex flex-row space-x-[4px] rounded-[62px] w-fit items-center justify-center px-[20px] py-[10px]'
                            style={{
                                background: 'rgba(255, 255, 255, 0.50)'
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: "var(--font-public-sans)",
                                    fontWeight: 400,
                                }}
                                className="text-[#252932]"
                            >
                                Find Care
                            </span>

                            <span
                                style={{
                                    fontFamily: "var(--font-public-sans)",
                                    fontWeight: 400,
                                }}
                                className="text-[#252932]"
                            >
                                /
                            </span>

                            <span
                                style={{
                                    fontFamily: "var(--font-public-sans)",
                                    fontWeight: 400,
                                }}
                                className="text-[#2358AC]"
                            >
                                Patient Forms
                            </span>
                        </div>
                    </div>
                    <div className="px-6 xl:px-[80px] z-[2] flex flex-row space-x-[20px] items-center justify-start mt-[12px]">
                        <h1
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 400,
                            }}
                            className="text-[#252932] text-4xl sm:text-6xl xl:text-6xl"
                        >
                            Patient Forms
                        </h1>
                    </div>

                    <div className="z-[2] px-6 xl:px-[80px] mt-[24px] w-full pb-8">
                        <p
                            style={{
                                fontWeight: 400,
                                fontSize: "20px",
                                lineHeight: "148%",
                            }}
                            className="text-[#252932] text-shadow-sm text-xl lg:text-2xl w-full"
                        >
                            If you have been told to use one of our online forms prior to a visit or treatment, please look below. If you have any questions, or do not see the specific form you are looking for, please don't hesitate to call or email us.
                        </p>
                    </div>
                </div>
            </section>

            {/* Download Patient Forms */}
            <section className='max-w-[1440px] w-full h-full flex lg:flex-row flex-col relative overflow-hidden p-4 xl:px-[40px] space-x-[32px] py-[50px] xl:space-y-0 space-y-6'>
                <div className=' xl:w-[45%] w-full  rounded-[24px] overflow-hidden '>
                    <Image src={OrthoDoctos} className=' aspect-square w-full object-cover h-full object-center xl:max-h-[500px]' alt='Group of Orthopedic doctors' />
                </div>

                <div className=' xl:w-[55%] w-full flex flex-col bg-[#FAFAFA] space-y-[40px] rounded-[24px] p-4 xl:p-[40px] items-center justify-center '>
                    <h2
                        style={{
                            fontFamily: "var(--font-public-sans)",
                            fontWeight: 500, color: '#252932',
                        }}
                        className='text-3xl items-center text-center'
                    >
                        Download New Patient Packet
                    </h2>

                    <h3 className='text-xl text-center px-5 font-normal'>
                        Download patient forms and fax or bring to the office.
                    </h3>

                    <a 
                        href="/new-patient-packet.pdf" 
                        download="Mountain-Spine-New-Patient-Packet.pdf"
                        className='max-h-[56px] h-full px-[32px] py-[16px] rounded-[62px] relative flex bg-[#0A50EC] text-white text-[14px] font-semibold w-fit justify-center items-center hover:cursor-pointer hover:bg-[#0845C7] transition-colors space-x-[10px]'
                        aria-label="Download New Patient Packet PDF"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                            <path fillRule="evenodd" clipRule="evenodd" d="M11.0572 0.75H11.0572C13.2479 0.749987 14.9686 0.749977 16.312 0.930594C17.6886 1.11568 18.7809 1.50272 19.6391 2.36091C20.4973 3.21911 20.8843 4.31137 21.0694 5.68802C21.25 7.03144 21.25 8.75214 21.25 10.9428V11.0572C21.25 13.2479 21.25 14.9686 21.0694 16.312C20.8843 17.6886 20.4973 18.7809 19.6391 19.6391C18.7809 20.4973 17.6886 20.8843 16.312 21.0694C14.9686 21.25 13.2479 21.25 11.0572 21.25H10.9428C8.7521 21.25 7.03144 21.25 5.68802 21.0694C4.31137 20.8843 3.21911 20.4973 2.36091 19.6391C1.50272 18.7809 1.11568 17.6886 0.930594 16.312C0.749977 14.9686 0.749987 13.2479 0.75 11.0572V11.0572V10.9428V10.9428C0.749987 8.75211 0.749977 7.03144 0.930594 5.68802C1.11568 4.31137 1.50272 3.21911 2.36091 2.36091C3.21911 1.50272 4.31137 1.11568 5.68802 0.930594C7.03144 0.749977 8.75212 0.749987 10.9428 0.75H10.9428H11.0572ZM11 5C11.5523 5 12 5.44772 12 6V9.12839H12.5501L12.5692 9.12835C12.6415 9.12812 12.7856 9.12766 12.9131 9.14599C13.0276 9.16245 13.5425 9.24678 13.7802 9.78159C14.0179 10.3164 13.7355 10.7551 13.6711 10.8511C13.5992 10.958 13.5023 11.0648 13.4537 11.1182L13.4409 11.1324L12.7691 11.8767C12.549 12.1206 12.3215 12.3729 12.1049 12.556C11.8592 12.7636 11.4949 13 11 13C10.5051 13 10.1408 12.7636 9.89511 12.556C9.6785 12.3729 9.45095 12.1206 9.23092 11.8767L8.55915 11.1324L8.54626 11.1182C8.4977 11.0648 8.40076 10.958 8.32894 10.8511C8.26446 10.7551 7.98208 10.3164 8.2198 9.78159C8.45752 9.24678 8.97239 9.16245 9.08686 9.14599C9.21437 9.12766 9.35854 9.12812 9.43077 9.12835L9.44994 9.12839H10V6C10 5.44772 10.4477 5 11 5ZM7 16C7 15.4477 7.44772 15 8 15H14C14.5523 15 15 15.4477 15 16C15 16.5523 14.5523 17 14 17H8C7.44772 17 7 16.5523 7 16Z" fill="#FAFAFA" />
                        </svg>
                        <span>
                            Download New Patient Packet
                        </span>
                    </a>
                </div>
            </section>

            <section className="w-full flex flex-col items-center justify-center">
                <h3 className="text-xl font-semibold text-[#252932] mb-4 text-center">Contact Us</h3>
                <ContactUsSection />
            </section>
        </main>
    )
}
