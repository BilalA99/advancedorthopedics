import React from 'react'
import Image from 'next/image'
import { ConsultationForm } from './ContactForm'
import HomeContactUs from '../public/HomeContactUs.jpeg'
import { DoctorContactForm } from './DoctorContactForm'
export default function FindCareContactUsSection({ page, backgroundcolor = '#FAFCFF', header, buttonText, submitButtonText }: { page: string, backgroundcolor?: string, header?: string, buttonText?: string, submitButtonText?: string }) {
  return (
    <section className={`bg-[${backgroundcolor}] w-full h-full pt-3 lg:pt-[50px] pb-[50px]`}>
      <div className="max-w-[1440px] w-full px-6 lg:px-[40px] mx-auto flex flex-col lg:flex-row space-x-[60px]">
        <div className="order-2 lg:order-1 w-full lg:w-[50%] flex flex-col p-[24px]">
          <div className='z-[2] w-full pb-2'>
            <div className='flex flex-row space-x-[4px] rounded-[62px] w-fit items-center justify-center'
              style={{
                background: 'rgba(255, 255, 255, 0.50)'
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-public-sans)",
                  fontWeight: 400,
                }}
                className="text-black"
              >
                Find Care
              </span>

              <span
                style={{
                  fontFamily: "var(--font-public-sans)",
                  fontWeight: 400,
                }}
                className="text-black"
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
                {page}
              </span>
            </div>
          </div>
          <h2
            style={{
              fontFamily: "var(--font-public-sans)",
              fontWeight: 500, color: '#252932',
            }}
            className="text-5xl w-[90%]"
          >
            Take the first step toward
            pain relief and recovery.
          </h2>

          <p
            style={{
              fontFamily: "var(--font-public-sans)",
              fontWeight: 500, color: '#424959',
            }}
            className="text-lg mt-[24px]"
          >
            Don't let pain hold you back any longer. Whether you need a second opinion, non-surgical options, or Mountain Spine & Orthopedics surgery, our team is here to help.
          </p>

          <Image src={HomeContactUs} className="w-full rounded-[24px] mt-[40px]" alt="Doctor teaching other doctors flex-1 flex" />

        </div>

        <div className="order-1 lg:order-2 w-full lg:w-[50%] flex flex-col bg-white pt-2 px-[24px] pb-[24px] lg:p-[24px] rounded-[24px] items-center justify-center">
          <h3
            style={{
              fontFamily: "var(--font-public-sans)",
              fontWeight: 500, color: '#252932',
            }}
            className="hidden lg:block text-5xl text-center"
          >
            Contact Us
          </h3>

          <p
            style={{
              fontFamily: "var(--font-public-sans)",
              fontWeight: 500, color: '#424959',
            }}
            className="hidden lg:block text-lg mt-[24px] text-center w-[60%]"
          >
            Have questions or need support?
            Reach out to us anytime - we're here to help.
          </p>

          {/* <ConsultationForm /> */}
          <DoctorContactForm backgroundcolor="#" header={header} buttonText={buttonText} submitButtonText={submitButtonText} />
        </div>
      </div>
    </section>
  )
}
