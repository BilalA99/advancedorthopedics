'use client';

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import BookAnAppoitmentButton from "@/components/BookAnAppoitmentButton";
import { DoctorContactForm } from "@/components/DoctorContactForm";
import SlidingDiv from "@/components/SlidingAnimation";
import { Marquee } from "@/components/magicui/marquee";
import Reveal from './RevealAnimation';
import { Clock, Phone } from 'lucide-react';
import { pushPhoneClickEvent } from '@/utils/enhancedConversions';

// Image Asset Imports
import AAOS from '@/public/AAOS.png';
import ACP from '@/public/ACP.png';
import AOA from '@/public/AOA.png';
import NASS from '@/public/NASS.png';
import Serpent from '@/public/Serpent.png';
import SMIS from '@/public/SMIS.png';

const associationLogoAlt: Record<string, string> = {
  'AAOS': 'American Academy of Orthopaedic Surgeons (AAOS) member logo',
  'ACP': 'American College of Physicians (ACP) certification',
  'AOA': 'American Osteopathic Association (AOA) accreditation',
  'NASS': 'North American Spine Society (NASS) membership badge',
  'Serpent': 'Medical caduceus symbol representing healthcare excellence',
  'SMIS': 'Society for Minimally Invasive Spine Surgery (SMISS) member'
};

interface StateHeroProps {
  stateName: string;
  stateAbbr?: string;
  h1: string;
  subheading: string;
  phoneNumber: string;
  phoneNumberRaw: string;
  stateSlug: string;
}

export default function StateHero({ stateName, stateAbbr, h1, subheading, phoneNumber, phoneNumberRaw, stateSlug }: StateHeroProps) {
  const [hasMounted, setHasMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    setHasMounted(true);
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="relative w-full bg-[#FAFAFA] pt-32 pb-10 overflow-hidden">
      {/* Background patterns could go here */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 relative z-10">
        <div className="w-full lg:w-1/2 flex flex-col space-y-8">
          <SlidingDiv position="left">
            <h1 
              style={{ fontFamily: "var(--font-public-sans)" }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#252932] leading-tight"
            >
              {h1}
            </h1>
          </SlidingDiv>

          <SlidingDiv position="left">
            <p 
              style={{ fontFamily: "var(--font-public-sans)" }}
              className="text-xl text-[#424959] leading-relaxed"
            >
              {subheading}
            </p>
          </SlidingDiv>

          <SlidingDiv position="left">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <BookAnAppoitmentButton />
              
              <div className="flex items-center gap-3">
                <div className="bg-[#0A50EC]/10 p-3 rounded-full">
                  <Phone className="w-6 h-6 text-[#0A50EC]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-[#424959] font-medium">Call for Appointment</span>
                  <a 
                    href={`tel:+1${phoneNumberRaw}`}
                    className="text-2xl font-bold text-[#252932] hover:text-[#0A50EC] transition-colors"
                    onClick={() => {
                      pushPhoneClickEvent({
                        location: `StateHero-${stateName}`,
                        page_path: typeof window !== 'undefined' ? window.location.pathname : '',
                      });
                    }}
                  >
                    {phoneNumber}
                  </a>
                </div>
              </div>
            </div>
          </SlidingDiv>
        </div>

        <div className="w-full lg:w-1/2">
          <SlidingDiv position="right">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 relative">
              <div className="absolute top-4 right-8 flex items-center gap-2 text-sm text-[#424959]">
                <Clock className="w-4 h-4" />
                <span className="font-medium">{currentTime}</span>
              </div>
              <h2 
                style={{ fontFamily: "var(--font-public-sans)" }}
                className="text-2xl font-bold text-[#252932] mb-6"
              >
                Request a Consultation
              </h2>
              <DoctorContactForm 
                backgroundcolor="white" 
                buttonText="Book Now" 
                header="" 
                defaultState={stateAbbr || stateName}
              />
            </div>
          </SlidingDiv>
        </div>
      </div>

      <div className="mt-20 w-full opacity-60">
        {hasMounted && dimensions.width > 0 && (
          <Marquee pauseOnHover className="w-full grayscale py-4">
            {[
              { img: AAOS, name: 'AAOS' },
              { img: ACP, name: 'ACP' },
              { img: AOA, name: 'AOA' },
              { img: NASS, name: 'NASS' },
              { img: Serpent, name: 'Serpent' },
              { img: SMIS, name: 'SMIS' }
            ].map((item, index) => (
              <Image
                key={index}
                src={item.img}
                alt={associationLogoAlt[item.name]}
                className="h-10 md:h-12 object-contain mx-12"
                draggable={false}
              />
            ))}
          </Marquee>
        )}
      </div>
    </section>
  );
}
