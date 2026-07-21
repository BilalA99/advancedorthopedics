import React from 'react'
import Image from 'next/image'
import { getVisibleProviders, getVisibleReviews } from "@/lib/providers/providerVisibility";
import { sitewideReviews } from "@/components/data/socialProofReviews";
import DoctorCard from '@/components/DoctorCard'
import RatingsAndReviews from '@/components/RatingsAndReviews';
import { TextAnimate } from '@/components/magicui/text-animate';
import Link from 'next/link';
import { buildCanonical } from '@/lib/seo';
import { getOgImageForPath } from '@/lib/og';
import PhysicianSchema from '@/components/PhysicianSchema';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Board-Certified Orthopedic Doctors | Mountain Spine & Orthopedics',
  description: 'Meet the expert team of spine and orthopedic surgeons at Mountain Spine. Our renowned doctors use advanced, compassionate care to help you find relief. Learn more.',
  alternates: {
    canonical: buildCanonical('/about/meetourdoctors'),
  },
  openGraph: {
    title: 'Board-Certified Orthopedic Doctors | Mountain Spine & Orthopedics',
    description: 'Meet the expert team of spine and orthopedic surgeons at Mountain Spine. Our renowned doctors use advanced, compassionate care to help you find relief. Learn more.',
    url: buildCanonical('/about/meetourdoctors'),
    images: [getOgImageForPath('/about')],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Board-Certified Orthopedic Doctors | Mountain Spine & Orthopedics',
    description: 'Meet the expert team of spine and orthopedic surgeons at Mountain Spine. Our renowned doctors use advanced, compassionate care to help you find relief. Learn more.',
    images: [getOgImageForPath('/about')],
  }
};

export default function MeetOurDoctors() {
  const visibleDoctors = getVisibleProviders();
  return (
    <main className='w-full flex flex-col items-center justify-center bg-white h-full'>
      {/* JSON-LD Schema Markup for SEO - Physician Schema for E-E-A-T */}
      <PhysicianSchema doctors={visibleDoctors} wrapInItemList={true} />
      
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
          alt="A compassionate Mountain Spine & Orthopedics doctor reviewing a patient's spine condition"
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

          <div className="px-6 xl:px-[80px] z-[2] flex flex-row space-x-[20px] items-center justify-center text-center w-full">
            <h1
              style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }}
              className="text-[#252932] lg:text-7xl md:text-5xl text-4xl text-center"
            >
              Meet Our Doctors
            </h1>
          </div>

          <div className="z-[2] px-6 xl:px-[80px] mt-[24px] w-full">
            <p
              style={{
                fontWeight: 400,
              }}
              className="text-[#424959] text-xl lg:text-2xl text-center"
            >
              Not sure which spine condition you might have?<br className=' xl:flex hidden' />{' '}Find out with our 2-minute Condition Checker.
            </p>
          </div>

          <div className=' mt-[40px]  px-6 xl:px-[80px] pb-8 w-full flex items-center justify-center'>
            <Link href={'/condition-check'}
              className=" max-h-[56px] h-full px-[32px] py-[16px] rounded-[62px] relative flex bg-transparent border border-[#0A50EC] w-fit text-[#0A50EC] text-[14px] font-semibold justify-center items-center hover:cursor-pointe "
            >
              <span
                style={{
                  fontFamily: "var(--font-public-sans)",
                  fontWeight: 500, fontSize: "16px",
                  lineHeight: "24px",
                  letterSpacing: "0.02em"
                }}
              >Condition Checker</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1440px] flex flex-col py-[50px] h-full px-[40px]">
        <div className=" flex flex-row">
          <div className=" flex flex-col space-y-[24px] md:w-[50%]">
            <h2
              style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }}
              className="text-black text-5xl text-left w-full"
            >Our Leading Orthopedic Experts</h2>
            <p className="text-[#424959] text-lg">
              Our team of board-certified, fellowship-trained specialists bring decades of combined experience in advanced spine care, joint reconstruction, and pain management.
            </p>
          </div>
        </div>
        <div className=" mt-[60px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-16 items-stretch">
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
