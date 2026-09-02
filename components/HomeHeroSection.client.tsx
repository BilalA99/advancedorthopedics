'use client';

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import BookAnAppoitmentButton from "@/components/BookAnAppoitmentButton";
import HeroContactFormIdle from "@/components/HeroContactFormIdle.client";
import MobileHeroConversionPanel from "@/components/MobileHeroConversionPanel";
import { Marquee } from "@/components/magicui/marquee";
import { pushPhoneClickEvent } from "@/utils/enhancedConversions";

// Image Asset Imports
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
import { Clock } from 'lucide-react';

type TimePeriod = 'day' | 'sunset' | 'night';

function HeroPhoneCTA({ timePeriod }: { timePeriod: TimePeriod }) {
  const isNight = timePeriod === 'night';
  const defaultPhoneText = '(561) 223-9959';
  const defaultPhoneHref = 'tel:+15612239959';

  return (
    <div className="w-full mb-3 rounded-2xl border border-white/25 bg-white/10 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.18)] px-4 py-3 text-white">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className={`text-xs font-semibold uppercase tracking-wide ${isNight ? 'text-white/80' : 'text-[#EAF1FF]'}`}>
            Prefer to call?
          </p>
          <p className={`text-xs ${isNight ? 'text-white/80' : 'text-[#F3F7FF]'}`}>
            Tap to speak with our team
          </p>
        </div>
        <a
          href={defaultPhoneHref}
          aria-label="Call Mountain Spine and Orthopedics at 561-223-9959"
          data-cta="hero-phone-call"
          data-location="homepage-hero"
          data-phone="+15612239959"
          className="ctm-phone-number shrink-0 rounded-full bg-white text-[#0A50EC] px-3 py-2 text-sm font-bold shadow-sm hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/70"
          onClick={() => {
            pushPhoneClickEvent({
              location: 'HomeHero',
              page_path: typeof window !== 'undefined' ? window.location.pathname : '',
            });
          }}
        >
          <span className="inline-flex items-center gap-1.5">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 18 18" fill="none" className="flex-shrink-0">
              <path fillRule="evenodd" clipRule="evenodd" d="M11.3852 0.0666578C11.0536 -0.0290477 10.7071 0.162219 10.6114 0.493864C10.5157 0.825509 10.707 1.17194 11.0386 1.26765C13.78 2.05874 15.9419 4.22057 16.7331 6.96182C16.8288 7.29347 17.1752 7.48472 17.5069 7.389C17.8385 7.29328 18.0298 6.94684 17.9341 6.6152C17.0238 3.46127 14.5392 0.976833 11.3852 0.0666578ZM10.9112 4.11842C10.5935 3.9835 10.2266 4.13169 10.0916 4.4494C9.95671 4.76712 10.1049 5.13406 10.4226 5.26898C11.4596 5.70934 12.2914 6.54113 12.7318 7.57812C12.8667 7.89584 13.2336 8.04402 13.5514 7.9091C13.8691 7.77417 14.0173 7.40724 13.8823 7.08952C13.3154 5.75446 12.2463 4.68536 10.9112 4.11842ZM4.51311 0.906545C4.27945 0.487351 3.90337 0.170069 3.43113 0.0724652C2.95397 -0.0261574 2.47434 0.119319 2.08015 0.440604C0.649844 1.60636 -0.260852 3.47409 0.134395 5.43344C0.377348 6.63783 0.78211 7.82615 1.60638 9.26341C3.2606 12.1479 5.84983 14.7385 8.73763 16.3947C10.1749 17.2189 11.3632 17.6237 12.5676 17.8666C14.5269 18.2619 16.3947 17.3512 17.5604 15.9209C17.8817 15.5267 18.0272 15.0471 17.9286 14.5699C17.831 14.0977 17.5137 13.7216 17.0945 13.4879L15.7591 12.7436L15.7591 12.7436C15.2673 12.4694 14.8534 12.2387 14.4936 12.088C14.1119 11.9282 13.7355 11.8332 13.3194 11.8766C12.9032 11.92 12.5545 12.0906 12.2141 12.3257C11.8931 12.5474 11.5357 12.8585 11.111 13.2283L8.97846 15.0848C6.56267 13.611 4.38855 11.4359 2.91618 9.02257L4.77273 6.89005C5.14248 6.46536 5.45365 6.10797 5.67532 5.78698C5.91047 5.44649 6.08101 5.0978 6.12441 4.68166C6.1678 4.26553 6.07287 3.88915 5.91303 3.50747C5.76236 3.14766 5.53163 2.73376 5.25746 2.24192L5.25745 2.24191L4.51311 0.906545Z" fill="#0A50EC" />
            </svg>
            <span data-callrail-phone="hero-mobile-phone" className="ctm-phone-number">{defaultPhoneText}</span>
          </span>
        </a>
      </div>
    </div>
  );
}

export default function HomeHeroSection() {
  const [hasMounted, setHasMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [currentTime, setCurrentTime] = useState<string>('');
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('day');
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setHasMounted(true);
    // Calculate initial dimensions
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Initial calculation
    updateDimensions();

    // Add resize listener
    window.addEventListener('resize', updateDimensions);

    // Prefetch sunset and night variants once the browser is idle, so we
    // don't waste critical-path bandwidth on images that may never display.
    type IdleWindow = Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout?: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const w = window as IdleWindow;
    const injectPrefetch = () => {
      ['https://mountainspineortho.b-cdn.net/public/homemountain2.png',
       'https://mountainspineortho.b-cdn.net/public/homemountain3.png'].forEach((href) => {
        if (document.querySelector(`link[rel="prefetch"][href="${href}"]`)) return;
        const l = document.createElement('link');
        l.rel = 'prefetch';
        l.as = 'image';
        l.href = href;
        document.head.appendChild(l);
      });
    };
    let prefetchTimer: ReturnType<typeof setTimeout> | undefined;
    let prefetchIdle: number | undefined;
    if (typeof w.requestIdleCallback === 'function') {
      prefetchIdle = w.requestIdleCallback(injectPrefetch, { timeout: 4000 });
    } else {
      prefetchTimer = setTimeout(injectPrefetch, 2500);
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateDimensions);
      if (prefetchIdle !== undefined && typeof w.cancelIdleCallback === 'function') {
        w.cancelIdleCallback(prefetchIdle);
      }
      if (prefetchTimer !== undefined) clearTimeout(prefetchTimer);
    };
  }, []);

  // Determine time period based on current hour
  const getTimePeriod = (hour: number): TimePeriod => {
    // Sunset: 5 PM - 6:59 PM (17:00 - 18:59)
    if (hour >= 17 && hour < 19) {
      return 'sunset';
    }
    // Night: 7 PM - 5:59 AM (19:00 - 5:59)
    if (hour >= 19 || hour < 6) {
      return 'night';
    }
    // Day: 6 AM - 4:59 PM (6:00 - 16:59)
    return 'day';
  };

  // // Update current time and time period every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hour = now.getHours();

      const timeString = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      setCurrentTime(timeString);

      // Update time period and trigger fade if changed
      const newPeriod = getTimePeriod(hour);
      if (newPeriod !== timePeriod) {
        setTimePeriod(newPeriod);
        // Don't change fadeKey - keep images mounted for smooth crossfade
      }
    };

    // Set initial time immediately
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    setCurrentTime(timeString);

    // On initial load, show homemountain1.png first, then fade to appropriate image after delay
    if (initialLoad) {
      // Wait for initial fade-in to complete (1500ms) plus a brief pause, then transition to correct time period
      const transitionTimeout = setTimeout(() => {
        const hour = new Date().getHours();
        const actualPeriod = getTimePeriod(hour);
        if (actualPeriod !== 'day') {
          setTimePeriod(actualPeriod);
          // Don't change fadeKey - keep images mounted for smooth crossfade
        }
        setInitialLoad(false);
      }, 2000); // Wait for initial fade-in (1500ms) + 500ms pause for smooth transition

      // Start regular updates after initial transition
      const interval = setInterval(() => {
        updateTime();
      }, 1000);

      return () => {
        clearTimeout(transitionTimeout);
        clearInterval(interval);
      };
    } else {
      // Regular updates after initial load
      updateTime();
      const interval = setInterval(updateTime, 1000);
      return () => clearInterval(interval);
    }
  }, [timePeriod, initialLoad]);

  return (
    <section className={`w-full h-full flex flex-col relative overflow-hidden justify-between lg:pt-[60px] ${timePeriod === 'day' ? '[mask-composite:intersect] [mask-image:linear-gradient(to_top,transparent,black_6rem)]' : '[mask-composite:intersect] [mask-image:linear-gradient(to_top,transparent,black_2rem)]'}`}>
      <div
        style={{
          filter: 'blur(30px)'
        }}
        className="w-full h-[120px] absolute top-0 z-[1]"
      />
      {/* Time-based background images with smooth transitions */}
      <div className="absolute inset-0 w-full h-full">
        {/* Daytime image - homemountain1.png — LCP candidate, paints at full opacity on first frame */}
        <Image
          key="day-image"
          src={'https://mountainspineortho.b-cdn.net/public/homemountain1.png'}
          priority={true}
          fetchPriority="high"
          fill
          sizes="100vw"
          className={`absolute inset-0 object-cover object-center md:object-center transition-opacity duration-[1500ms] ease-in-out ${
            timePeriod === 'day' ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            pointerEvents: 'none',
            zIndex: timePeriod === 'day' ? 1 : 0
          }}
          alt="Board-certified spine and orthopedic surgeons consulting with Florida patients at Mountain Spine & Orthopedics - Daytime"
        />
        {/* Sunset image - homemountain2.png — lazy, prefetched after idle */}
        <Image
          key="sunset-image"
          src={'https://mountainspineortho.b-cdn.net/public/homemountain2.png'}
          fill
          sizes="100vw"
          loading="lazy"
          className={`absolute inset-0 object-cover object-center md:object-center transition-opacity duration-[1500ms] ease-in-out ${timePeriod === 'sunset' ? 'opacity-100' : 'opacity-0'
            }`}
          style={{
            pointerEvents: 'none',
            zIndex: timePeriod === 'sunset' ? 1 : 0
          }}
          alt="Board-certified spine and orthopedic surgeons consulting with Florida patients at Mountain Spine & Orthopedics - Sunset"
        />
        {/* Night image - homemountain3.png — lazy, prefetched after idle */}
        <Image
          key="night-image"
          src={'https://mountainspineortho.b-cdn.net/public/homemountain3.png'}
          fill
          sizes="100vw"
          loading="lazy"
          className={`absolute inset-0 object-cover object-center md:object-center transition-opacity duration-[1500ms] ease-in-out ${timePeriod === 'night' ? 'opacity-100' : 'opacity-0'
            }`}
          style={{
            pointerEvents: 'none',
            zIndex: timePeriod === 'night' ? 1 : 0
          }}
          alt="Board-certified spine and orthopedic surgeons consulting with Florida patients at Mountain Spine & Orthopedics - Night"
        />
      </div>
      <div
        className="lg:w-[100%] z-[1] h-full absolute left-0 top-0 md:w-[100%] w-full backdrop-blur-[2px]"
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

      <div className="w-full h-full flex flex-row relative overflow-hidden justify-between  xl:pb-[160px] xl:py-0 lg:py-10">
        <div className="z-[2] flex flex-col xl:w-[50%] sm:w-[70%] w-full h-full text-left xl:px-6 xl:py-8 relative ">
          <div className="z-[2] sm:mt-30 mt-16 hero-slide-left">
            <div className="xl:px-[80px] px-8 my-[24px] xl:w-[90%]">
              {/* Visible, SEO-relevant H1 — server-rendered text LCP candidate */}
              <h1
                style={{
                  fontFamily: "var(--font-public-sans)",
                  fontWeight: 500,
                }}
                className={`${timePeriod !== 'night'  ? 'text-[#252932]' : 'text-white'} text-4xl sm:text-6xl xl:text-6xl sm:text-left text-center`}
              >
                Welcome to<br /> Mountain <br /> Spine & Orthopedics
              </h1>

            </div>
          </div>
          <div className="z-[2] sm:hidden block px-4 mb-4">
            <MobileHeroConversionPanel
              pageType="homepage"
              phone="(561) 223-9959"
              phoneTel="tel:+15612239959"
              timePeriod={timePeriod}
            />
          </div>
          <div className="z-[2] hero-slide-left">
            <div className="xl:px-[80px] px-8 mb-[24px] xl:w-full md:w-[80%] lg:w-full md:text-left sm:text-center">
              <p
                style={{
                  fontWeight: 400,
                }}
                className={`${timePeriod !== 'night' ? 'sm:text-[#424959] text-[#252932]' : 'text-white'} text-xl lg:text-2xl sm:text-left text-center hidden sm:block`}
              >
                Expert orthopedic and spine surgeons offering minimally invasive spine surgery, joint replacement, and advanced back pain treatment across Florida, New Jersey, New York, Pennsylvania, and Georgia. Same-day and next-day appointments at convenient locations. Book your orthopedic consultation today.
              </p>
            </div>
          </div>

          <div className="z-[2] hero-slide-left">
            <div className="xl:px-[80px] px-8 mt-[24px] xl:w-full md:flex-row sm:flex hidden flex-col md:space-y-0 space-y-4 md:space-x-[16px] items-center">
              <div className="">
                <BookAnAppoitmentButton />
              </div>
              <div className="flex flex-row items-center space-x-[10px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 18 18" fill="none" className="flex-shrink-0">
                  <path fillRule="evenodd" clipRule="evenodd" d="M11.3852 0.0666578C11.0536 -0.0290477 10.7071 0.162219 10.6114 0.493864C10.5157 0.825509 10.707 1.17194 11.0386 1.26765C13.78 2.05874 15.9419 4.22057 16.7331 6.96182C16.8288 7.29347 17.1752 7.48472 17.5069 7.389C17.8385 7.29328 18.0298 6.94684 17.9341 6.6152C17.0238 3.46127 14.5392 0.976833 11.3852 0.0666578ZM10.9112 4.11842C10.5935 3.9835 10.2266 4.13169 10.0916 4.4494C9.95671 4.76712 10.1049 5.13406 10.4226 5.26898C11.4596 5.70934 12.2914 6.54113 12.7318 7.57812C12.8667 7.89584 13.2336 8.04402 13.5514 7.9091C13.8691 7.77417 14.0173 7.40724 13.8823 7.08952C13.3154 5.75446 12.2463 4.68536 10.9112 4.11842ZM4.51311 0.906545C4.27945 0.487351 3.90337 0.170069 3.43113 0.0724652C2.95397 -0.0261574 2.47434 0.119319 2.08015 0.440604C0.649844 1.60636 -0.260852 3.47409 0.134395 5.43344C0.377348 6.63783 0.78211 7.82615 1.60638 9.26341C3.2606 12.1479 5.84983 14.7385 8.73763 16.3947C10.1749 17.2189 11.3632 17.6237 12.5676 17.8666C14.5269 18.2619 16.3947 17.3512 17.5604 15.9209C17.8817 15.5267 18.0272 15.0471 17.9286 14.5699C17.831 14.0977 17.5137 13.7216 17.0945 13.4879L15.7591 12.7436L15.7591 12.7436C15.2673 12.4694 14.8534 12.2387 14.4936 12.088C14.1119 11.9282 13.7355 11.8332 13.3194 11.8766C12.9032 11.92 12.5545 12.0906 12.2141 12.3257C11.8931 12.5474 11.5357 12.8585 11.111 13.2283L8.97846 15.0848C6.56267 13.611 4.38855 11.4359 2.91618 9.02257L4.77273 6.89005C5.14248 6.46536 5.45365 6.10797 5.67532 5.78698C5.91047 5.44649 6.08101 5.0978 6.12441 4.68166C6.1678 4.26553 6.07287 3.88915 5.91303 3.50747C5.76236 3.14766 5.53163 2.73376 5.25746 2.24192L5.25745 2.24191L4.51311 0.906545ZM12.8148 16.6413C11.9601 16.4689 11.1147 16.2075 10.1427 15.7286L11.9059 14.1936C12.3633 13.7954 12.668 13.5313 12.9244 13.3543C13.1677 13.1862 13.3167 13.1337 13.449 13.1199C13.5814 13.1061 13.7379 13.1267 14.0107 13.241C14.2981 13.3613 14.6508 13.5569 15.1805 13.8521L16.4859 14.5798C16.6449 14.6684 16.6927 14.7659 16.7044 14.8229C16.7152 14.875 16.7145 14.9803 16.5915 15.1312C15.655 16.2801 14.2281 16.9264 12.8148 16.6413ZM3.80745 6.09513L2.27246 7.85829C1.79352 6.88632 1.53212 6.04092 1.35971 5.18627C1.0746 3.77289 1.72089 2.34601 2.86987 1.40954C3.02073 1.28658 3.12604 1.28583 3.17813 1.29659C3.23514 1.30838 3.33262 1.3561 3.42127 1.51514L4.14892 2.82057C4.44418 3.35027 4.6397 3.70291 4.76005 3.9903C4.87429 4.2631 4.89495 4.41965 4.88115 4.55201C4.86734 4.68438 4.81483 4.83329 4.64676 5.07665C4.46971 5.33303 4.20564 5.63774 3.80745 6.09513Z" fill={timePeriod !== 'night' ? '#0A50EC' : '#FFFFFF'} />
                </svg>
                <a
                  href="tel:+15612239959"
                  className={`${timePeriod !== 'night' ? 'hover:text-[#0A50EC]' : 'hover:text-gray-200'} hover:underline transition-colors duration-200 text-lg font-bold ${timePeriod !== 'night' ? 'text-[#424959]' : 'text-white'}`}
                  onClick={() => {
                    pushPhoneClickEvent({
                      location: 'HomeHero',
                      page_path: typeof window !== 'undefined' ? window.location.pathname : '',
                    });
                  }}
                  style={{
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  (561) 223-9959
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[50%] self-end h-full sm:flex hidden flex-col z-[2] mb-2 relative">
          <div className="xl:w-[65%] w-[95%] rounded-2xl mx-auto ">
            <div className="text-center mb-4">
              <div
                style={{
                  fontFamily: "var(--font-public-sans)",
                  fontWeight: 500,
                }}
                className={`text-[#252932] text-sm sm:text-sm text-end mr-4 ${timePeriod !== 'night' ? 'text-[#252932]' : 'text-gray-300'} flex items-center justify-end gap-x-2`}
              >
                <p className="font-semibold">{currentTime}</p> <span><Clock className='w-4 h-4' /></span>
              </div>
            </div>
            <HeroContactFormIdle backgroundcolor={'rgba(255,255,255,0.00)'} buttonText="Get Your Free Consultation" header="" timePeriod={timePeriod} />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-row items-center justify-evenly pb-10 "
      >
        {hasMounted && dimensions.width > 0 && (
          <div className="w-full z-20">
            <Marquee pauseOnHover className="w-full grayscale ">
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
                  className="lg:h-[40px] h-10 md:h-8 object-contain mx-[20px]"
                  draggable={false}
                />
              ))}
            </Marquee>
          </div>
        )}
      </div>
    </section>
  );
} 
