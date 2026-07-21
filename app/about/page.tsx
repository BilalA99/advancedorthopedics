import React from 'react'
import Image from 'next/image'
import RatingsAndReviews from '@/components/RatingsAndReviews'
import ClinicsMap from '@/components/ClinicsMap'
import ContactUsSection from '@/components/ContactUsSection'
import { getVisibleProviders, getVisibleReviews } from "@/lib/providers/providerVisibility";
import { sitewideReviews } from "@/components/data/socialProofReviews";
import DoctorCard from '@/components/DoctorCard'
import StarRating from '@/components/StarRating'
import { TextAnimate } from '@/components/magicui/text-animate'
import Link from 'next/link'
import { Metadata } from 'next'
import { buildCanonical } from '@/lib/seo'
import { getOgImageForPath } from '@/lib/og'
import PhysicianSchema from '@/components/PhysicianSchema'

export const metadata: Metadata = {
  title: 'About Mountain Spine & Orthopedics | Expert Spine & Joint Care',
  description: 'Learn about our board-certified orthopedic specialists, advanced facilities, and commitment to comprehensive spine and joint care across Florida, New Jersey, New York, and Pennsylvania. Meet our expert team dedicated to your recovery.',
  alternates: {
    canonical: buildCanonical('/about'),
  },
  openGraph: {
    title: 'About Mountain Spine & Orthopedics | Expert Spine & Joint Care',
    description: 'Learn about our board-certified orthopedic specialists, advanced facilities, and commitment to comprehensive spine and joint care across Florida, New Jersey, New York, and Pennsylvania. Meet our expert team dedicated to your recovery.',
    url: buildCanonical('/about'),
    type: 'website',
    images: [
      {
        url: getOgImageForPath('/about'),
        width: 1200,
        height: 630,
        alt: 'About Mountain Spine & Orthopedics - Expert Orthopedic Care',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Mountain Spine & Orthopedics | Expert Spine & Joint Care',
    description: 'Learn about our board-certified orthopedic specialists, advanced facilities, and commitment to comprehensive spine and joint care across Florida, New Jersey, New York, and Pennsylvania. Meet our expert team dedicated to your recovery.',
    images: [getOgImageForPath('/about')],
  },
};

// AboutPage Schema with MedicalOrganization as mainEntity
const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About Mountain Spine & Orthopedics | Expert Spine & Joint Care",
  "description": "Learn about our board-certified orthopedic specialists, advanced facilities, and commitment to comprehensive spine and joint care across Florida, New Jersey, New York, and Pennsylvania.",
  "url": "https://mountainspineorthopedics.com/about",
  "mainEntity": {
    "@type": "MedicalOrganization",
    "name": "Mountain Spine & Orthopedics",
    "url": "https://mountainspineorthopedics.com",
    "logo": "https://mountainspineorthopedics.com/newlogo4.png",
    "image": "https://mountainspineorthopedics.com/herosectionimg.jpg",
    "description": "Leading spine and orthopedic specialists in Florida providing advanced minimally invasive treatments, including Band-Aid Back Surgery, laser spine procedures, and comprehensive pain management.",
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
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "3500 Tyler St",
        "addressLocality": "Hollywood",
        "addressRegion": "FL",
        "postalCode": "33021",
        "addressCountry": "US"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "652 Palm Springs Dr",
        "addressLocality": "Altamonte Springs",
        "addressRegion": "FL",
        "postalCode": "32701",
        "addressCountry": "US"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "6150 Metrowest Blvd Suite 102",
        "addressLocality": "Orlando",
        "addressRegion": "FL",
        "postalCode": "32835",
        "addressCountry": "US"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "2215 Nebraska Ave Suite 1C",
        "addressLocality": "Fort Pierce",
        "addressRegion": "FL",
        "postalCode": "34950",
        "addressCountry": "US"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "3355 Burns Road Suite 304",
        "addressLocality": "Palm Beach Gardens",
        "addressRegion": "FL",
        "postalCode": "33410",
        "addressCountry": "US"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "7000 SW 62 AVE, Suite 330",
        "addressLocality": "South Miami",
        "addressRegion": "FL",
        "postalCode": "33143-4716",
        "addressCountry": "US"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "1905 Clint Moore Rd #300",
        "addressLocality": "Boca Raton",
        "addressRegion": "FL",
        "postalCode": "33496",
        "addressCountry": "US"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "499 E Central Pkwy, Suite 130",
        "addressLocality": "Altamonte Springs",
        "addressRegion": "FL",
        "postalCode": "32701",
        "addressCountry": "US"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "2400 North Blvd W Suite C",
        "addressLocality": "Davenport",
        "addressRegion": "FL",
        "postalCode": "33837",
        "addressCountry": "US"
      }
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
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "200",
      "bestRating": "5",
      "worstRating": "1"
    },
    "sameAs": [
      "https://www.facebook.com/people/Mountain-Spine-Orthopedics/61576930958681/",
      "https://www.instagram.com/mountainspineortho/"
    ]
  }
};

export default function AboutUs() {
  const featuredDoctors = getVisibleProviders().slice(0, 3);
  return (
    <main className='w-full flex flex-col items-center justify-center bg-white h-full'>
      {/* JSON-LD Schema Markup for SEO and Knowledge Graph */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} />
      <PhysicianSchema doctors={featuredDoctors} wrapInItemList={true} />
      
      {/* Landing */}
      <section className=" w-full h-full flex flex-col relative overflow-hidden [mask-composite:intersect] [mask-image:linear-gradient(to_top,transparent,black_6rem)]" >
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
          alt="Mountain Spine & Orthopedics board-certified physicians providing comprehensive spine and joint care to Florida patients"
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
        <div className="z-[1] flex flex-col w-full h-full text-left relative sm:pt-60 sm:pb-20 pt-30 pb-0">
          <div className=' px-6 xl:px-[80px] z-[2] w-full flex items-center justify-center'>
            <div className=' mb-6 flex flex-row sm:space-x-[4px] rounded-[62px] w-fit items-center justify-center px-[20px] py-[10px]'
              style={{
                background: 'rgba(255, 255, 255, 0.50)'
              }}
            >

              <span
                style={{
                  fontFamily: "var(--font-public-sans)",
                  fontWeight: 400,
                }}
                className="sm:text-md text-xs text-[#5093FF]"
              >
                About Us
              </span>
            </div>
          </div>
          <div className="px-6 xl:px-[80px] z-[2] flex flex-row space-x-[20px] items-center justify-center text-center w-full">
            <TextAnimate 
              animation="blurInUp" 
              by="word" 
              once
              as="h1"
              style={{
                fontFamily: "var(--font-public-sans)",
                fontWeight: 400,
              }}
              className="text-[#252932] text-3xl md:text-6xl text-center"
            >
              About Mountain Spine & Orthopedics
            </TextAnimate>
          </div>

          <div className="z-[2] px-6 xl:px-[80px] mt-[24px] w-full pb-8 self-center md:w-[70%]">
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 400,
                lineHeight: "148%",
              }}
              className="text-[#424959] text-sm sm:text-lg md:text-xl text-center"
            >
              Mountain Spine & Orthopedics is dedicated to delivering comprehensive orthopedic care to eliminate the pain, discomfort, and dysfunction of numerous conditions of the neck and back.
            </p>
          </div>
        </div>
      </section>

      {/* Leading Experts */}
      <section className=' w-full max-w-[1440px] flex flex-col py-[50px] h-full px-6 xl:px-[40px]'>
        <div className=' space-x-[12px] flex flex-row items-center justify-center'>
          <StarRating rating={5} size={25} />
          <span
            style={{
              fontFamily: 'var(--font-public-sans)',
              fontWeight: 500,
            }}
            className='text-[#424959] text-xl'
          >
            200+ reviews for all locations
          </span>
        </div>

        <div className=' mt-[16px] '>
          <h2
            style={{
              fontFamily: 'var(--font-public-sans)',
              fontWeight: 500,
            }}
            className='text-[#00031A] md:text-6xl text-center text-3xl sm:text-5xl '
          >
            Leading Experts in Comprehensive Spine Care & Pain Management
          </h2>
        </div>

        <div className=' mt-[20px] self-center w-[92%]'>
          <p
            style={{
              fontFamily: 'var(--font-public-sans)',
              fontWeight: 500,
            }}
            className='text-[#424959] text-lg sm:text-xl text-center'
          >
            Our award-winning team of board-certified spine surgeons and medical staff offer the latest in research, technology, and treatments for pain management and comprehensive orthopedic care.<span className='text-black font-[600]'> Our comprehensive "concierge" services range from non-surgical, conservative methods to advanced orthopedic procedures performed with precision and care.</span>
            <br /><br />
            Our spine surgeons are dedicated to achieving the best results for every patient with the most appropriate approach possible using state-of-the-art equipment and procedures to promote faster recovery times that allow you to return to normal activities much sooner. We offer expert diagnosis and treatment for pain and dysfunction caused by deformity, degenerative disc disease, trauma, and failed neck or back surgeries.<span className='text-black font-[600]'>Mountain Spine & Orthopedics operate in the most efficient ways to provide a safe environment and deliver the most effective medical services to patients.</span> When it comes to spine-related issues, Mountain Spine & Orthopedics offers the treatment and care you deserve and expect. Regardless of the cause, our experienced team is ready to help.
            <br /><br />
            Our experienced and board-certified neurologists, neurosurgeons, orthopedic specialists, and physicians work together to treat specific spine and back disorders using comprehensive techniques. We combine advanced technology with a patient-centered approach to ensure our patients get the best possible outcomes.
          </p>
        </div>

        <div className='mt-[10px]' />
        <ClinicsMap />

      </section>

      {/* Meet our Experts */}
      <section className="w-full max-w-[1440px] flex flex-col py-[50px] h-full px-[40px]">
        <div className=" flex md:flex-row flex-col">
          <div className=" flex flex-col space-y-[24px] md:w-[50%] w-full">
            <h2
              style={{
                fontFamily: "var(--font-public-sans)",
                fontWeight: 500,
              }}
              className="text-black text-5xl text-left w-full"
            >Meet Our Experts</h2>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 400,
              }}
              className="text-[#54535C] md:w-[50%] w-full"
            >
              Highly skilled and compassionate professionals ready to care for you
            </p>
          </div>

          <div className="md:w-[50%] flex items-center md:justify-end w-full md:mt-0 mt-4">
            <Link
              href={'/about/meetourdoctors'}
              className="bg-white border hover:cursor-pointer border-[#252932] px-[20px] py-[10px] space-x-[10px] flex flex-row items-center justify-center rounded-[62px]">
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400,
                }}
                className="text-[#252932]"
              >View all</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="11" viewBox="0 0 18 11" fill="none">
                <path d="M12.3982 0.268483C12.0402 -0.0894963 11.4598 -0.089494 11.1018 0.268488C10.7438 0.62647 10.7438 1.20687 11.1018 1.56485L14.1203 4.58333H1.66667C1.16041 4.58333 0.75 4.99374 0.75 5.5C0.75 6.00626 1.16041 6.41667 1.66667 6.41667H14.1203L11.1018 9.43516C10.7439 9.79314 10.7439 10.3735 11.1019 10.7315C11.4598 11.0895 12.0402 11.0895 12.3982 10.7315L16.9766 6.15303C16.9935 6.13637 17.0098 6.11905 17.0254 6.10112C17.0873 6.02997 17.1365 5.95154 17.1728 5.86885C17.2221 5.75677 17.2496 5.63294 17.25 5.50273L17.25 5.5C17.25 5.49717 17.25 5.49434 17.25 5.49152C17.2489 5.37622 17.2266 5.26602 17.1867 5.16463C17.142 5.05068 17.0736 4.94387 16.9815 4.85178L12.3982 0.268483Z" fill="#252932" />
              </svg>
            </Link>
          </div>
        </div>
        <div className=" mt-[60px] grid xl:grid-cols-3  grid-cols-1 md:grid-cols-2 gap-[32px]">
          {
            featuredDoctors.map((item) => (
              <DoctorCard key={item.name} doctor={item} />
            ))
          }
        </div>
      </section>


      {/* What our patients say */}
      <RatingsAndReviews reviews={getVisibleReviews(sitewideReviews)} />

      {/* Contact Us */}
      <ContactUsSection />

    </main>
  )
}

