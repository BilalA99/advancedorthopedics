'use client';
import React from 'react';
import Image from 'next/image';
import { Dot } from 'lucide-react';
import { DoctorContactForm } from '@/components/DoctorContactForm';
import { TextAnimate } from '@/components/magicui/text-animate';
import { socials } from '@/components/DoctorCard';
// Import the DoctorProp type from the data file
import type { DoctorProp } from '@/components/data/doctors';
import Link from 'next/link';

export default function DoctorProfileClient({ doctor }: { doctor: DoctorProp }) {
  // Use the doctor's actual conditions treated data
  const conditionsTreated = doctor.conditionsTreated;

  return (
    <section className='max-w-[1440px] w-full h-full flex flex-col lg:flex-row gap-x-[60px] relative overflow-hidden px-6 xl:px-[80px] py-[50px] '>
      <div className=' w-full lg:w-[35%] flex flex-col md:flex-row lg:space-x-0 space-x-6 lg:flex-col h-full'>
        <div className='lg:w-full sm:w-[50%] w-full h-full lg:max-h-[630px] rounded-[16px] overflow-hidden space-y-[24px] hover:cursor-pointer'>
          <div className='w-full h-full flex flex-col'>
            {/* A circular-cut-out source (transparent corners) is scaled so the
            circle covers the square frame - 1.42x is sqrt(2), the exact factor
            at which an inscribed circle covers its square, so the crop is fixed
            and cannot be repositioned. Everyone else renders exactly as before. */}
            {doctor.imgCircularMask ? (
              <div className='w-full lg:max-h-[400px] lg:h-[400px] aspect-square rounded-[16px] overflow-hidden'>
                <Image src={doctor.img} alt={doctor.name} className='w-full h-full object-cover scale-[1.42]' draggable={false} />
              </div>
            ) : (
              <Image src={doctor.img} alt={doctor.name} className='w-full lg:max-h-[400px] rounded-[16px] bg-gray-500 lg:h-[400px] aspect-square object-cover' draggable={false} />
            )}
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="mt-6 mb-2">
              <ol className="flex flex-row flex-wrap gap-2 text-sm text-[#2358AC]">
                <li><a href="/about/meetourdoctors">Doctors</a> /</li>
                <li aria-current="page" className="text-[#252932] font-semibold">{doctor.name}</li>
              </ol>
            </nav>
            {/* Main Heading (now <p> for visual, not <h1>) */}
            <p style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }} className="text-black text-3xl text-left w-full lg:mt-0 mt-4">{doctor.name}</p>
            <p style={{ fontFamily: "var(--font-inter)", fontWeight: 400 }} className="text-[#54535C] text-lg mt-1">{doctor.practice}</p>
            <div className=' flex flex-row space-x-[16px] mt-2'>
              {socials.map((item: any, index: number) => (
                <Link href={item.link} target='_blank' className=' border border-[#FAFAFA] rounded-full px-[13px] py-[10px] items-center justify-center' key={index}>
                  <item.icon />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className='lg:my-10 sm:my-0 my-10'><DoctorContactForm backgroundcolor='#FAFAFA' header='Book an Appointment' /></div>
        {doctor.cert && (
          <div className='w-full h-full object-cover rounded-2xl overflow-hidden lg:block hidden'>
            <Image src={doctor.cert} className='w-full h-full' alt='Doctor Certification' />
          </div>
        )}
      </div>
      <div className=' w-full lg:w-[70%] h-full flex flex-col py-2 space-y-[40px] md:mt-0 mt-4'>
        <section className=' flex flex-col space-y-[24px]'>
          <h2 style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }} className="text-[#111315] text-4xl">About</h2>
          {doctor.aboutme.split(/\n\n/).map((para, idx) => (
            <p key={idx} style={{ fontFamily: "var(--font-inter)", fontWeight: 400 }} className="text-[#838890] text-lg mb-2">{para}</p>
          ))}
        </section>
        <section className=' flex flex-col space-y-[24px]'>
          <h2 style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }} className="text-[#111315] text-4xl">Credentials</h2>
          {doctor.bio.split(/\n\n/).map((para, idx) => (
            <p key={idx} style={{ fontFamily: "var(--font-inter)", fontWeight: 400 }} className="text-[#838890] text-lg mb-2">{para}</p>
          ))}
        </section>
        <section className=' flex flex-col space-y-[24px]'>
          <h2 style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }} className="text-[#111315] text-4xl">Specialties</h2>
          <ul className='flex flex-col space-y-4'>
            {doctor.specialties.map((item) => (
              <li key={item} className=' flex flex-row space-x-2 items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M1.29199 8.99996C1.29199 13.2572 4.74313 16.7083 9.00033 16.7083C13.2575 16.7083 16.7087 13.2572 16.7087 8.99996C16.7087 4.74276 13.2575 1.29163 9.00033 1.29163C4.74313 1.29163 1.29199 4.74276 1.29199 8.99996ZM9.00033 17.9583C4.05277 17.9583 0.0419922 13.9475 0.0419922 8.99996C0.0419922 4.05241 4.05277 0.041626 9.00033 0.041626C13.9479 0.041626 17.9587 4.05241 17.9587 8.99996C17.9587 13.9475 13.9479 17.9583 9.00033 17.9583ZM12.7944 6.92229C13.0276 6.66784 13.0104 6.27249 12.756 6.03924C12.5015 5.806 12.1062 5.82319 11.8729 6.07764L7.73069 10.5964L6.10893 8.97469C5.86486 8.73061 5.46913 8.73061 5.22505 8.97469C4.98097 9.21877 4.98097 9.61449 5.22505 9.85857L7.30838 11.9419C7.42892 12.0624 7.59347 12.1285 7.7639 12.1248C7.93433 12.1211 8.09586 12.048 8.21105 11.9223L12.7944 6.92229Z" fill="#92BCFF" />
                </svg>
                <span style={{ fontFamily: "var(--font-public-sans)", fontWeight: 400 }} className='text-[#111315] text-xl'>{item}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className=' flex flex-col space-y-[24px]'>
          <h2 style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }} className="text-[#111315] text-4xl">Conditions Treated</h2>
          <ul className='flex flex-col space-y-4'>
            {conditionsTreated.map((item) => (
              <li key={item} className=' flex flex-row space-x-2 items-center'>
                <span style={{ fontFamily: "var(--font-public-sans)", fontWeight: 400 }} className='text-[#111315] text-xl'>{item}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className=' flex flex-col space-y-[24px]'>
          <h2 style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }} className="text-[#111315] text-4xl">Snapshot</h2>
          <div>
            <h3 style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }} className="text-[#111315] text-2xl mb-2">Career Highlights</h3>
            <ul className='flex flex-col space-y-4'>
              {doctor.snapshot.map((item) => (
                <li className=' flex flex-row space-x-2 items-center' key={item}>
                  <Dot className='text-[#838890]' size={25} />
                  <span style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 400 }} className='text-[#838890] text-xl'>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </section>
  );
} 