'use client';

import React, { useState, useEffect } from 'react';
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Data Imports from the centralized file
import {
  ServicesAndExpertise,
  OurSpecialtyItems,
  Testimonials,
  Amenities,
  PainToProgress,
  OrthoConditionsWeTreat
} from '@/components/data/homepage-data';

// Component Imports
import BookAnAppoitmentButton from "@/components/BookAnAppoitmentButton";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import DoctorCard from "@/components/DoctorCard";
import ClinicsMap from "@/components/ClinicsMap";
import ContactUsSection from "@/components/ContactUsSection";
import RatingsAndReviews from "@/components/RatingsAndReviews";
import { DoctorContactForm } from "@/components/DoctorContactForm";
import { Doctors } from "@/components/data/doctors";

// Animation & UI Imports
import { motion } from "framer-motion";
import Reveal from "@/components/RevealAnimation";
import { NumberTicker } from "@/components/magicui/number-ticker";
import SlidingDiv from "@/components/SlidingAnimation";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Marquee } from "@/components/magicui/marquee";

// Image Asset Imports
import AAOS from '../../public/AAOS.png';
import ACP from '../../public/ACP.png';
import AOA from '../../public/AOA.png';
import NASS from '../../public/NASS.png';
import Serpent from '../../public/Serpent.png';
import SMIS from '../../public/SMIS.png';

// Professional association logo alt text mapping
const associationLogoAlt: Record<string, string> = {
  'AAOS': 'American Academy of Orthopaedic Surgeons (AAOS) member logo',
  'ACP': 'American College of Physicians (ACP) certification',
  'AOA': 'American Osteopathic Association (AOA) accreditation',
  'NASS': 'North American Spine Society (NASS) membership badge',
  'Serpent': 'Medical caduceus symbol representing healthcare excellence',
  'SMIS': 'Society for Minimally Invasive Spine Surgery (SMISS) member'
};
import HomeWhyAO from '../../public/HomeWhyAO-min.jpeg';
import MRI1 from '../../public/MRI1.png';
import MRI2 from '../../public/MRI2.png';
import MRI3 from '../../public/MRI3.png';

export default function HomePageUI() {
  const [selectedService, setSelectedService] = useState('Neck & Spine');
  const [selectedOrthoCondition, setSelectedOrthoCondition] = useState(OrthoConditionsWeTreat[0]);
  const router = useRouter();
  const [treatmentFilter, setTreatmentFilter] = useState<string>('');
  const [hasMounted, setHasMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

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

    // Cleanup
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const SendTreatmentFilterData = (treatmentfilter: string) => {
    setTreatmentFilter(treatmentfilter);
    router.push(`/treatments?filter=${treatmentfilter}`);
  };

  return (
    <main className=" w-full flex flex-col items-center justify-center bg-white h-full" >
      <section className="w-full h-full flex flex-col relative overflow-hidden [mask-composite:intersect] [mask-image:linear-gradient(to_top,transparent,black_6rem)]  justify-between" >
        <div
          style={{
            background: 'white',
            filter: 'blur(30px)'
          }}
          className="w-full h-[120px] absolute top-0 z-[1]"
        />
        <Image src={'https://mountainspineortho.b-cdn.net/public/home-landing-min.jpeg'} priority={true} fetchPriority="high" layout='fill' className="h-full absolute top-0 object-cover  object-center md:object-top pt-16 self-end w-full md:pl-[100px] pl-8" alt="Board-certified spine and orthopedic surgeons consulting with Florida patients at Mountain Spine & Orthopedics" />
        <div className="lg:w-[60%] z-[1] h-full absolute left-0 top-0 md:w-[85%] w-full"
          style={{
            background: 'linear-gradient(90deg, #5FBBEC 20.16%, rgba(95, 187, 236, 0.26) 90%,  rgba(255,0,0,0) 100%)',
          }}
        />

        <div className="w-full h-full flex flex-row relative overflow-hidden  justify-between">
          <div className="z-[2] flex flex-col xl:w-[50%] sm:w-[70%] w-full h-full  text-left xl:px-6 xl:py-8 relative xl:pb-[160px]">
            <SlidingDiv position="left" className="z-[2] sm:mt-30 mt-16">
              <div className="xl:px-[80px] px-8 my-[24px] xl:w-[90%]  ">
                <h1
                  style={{
                    fontFamily: "var(--font-public-sans)",
                    fontWeight: 500,
                  }}
                  className="text-white text-5xl sm:text-6xl xl:text-6xl text-shadow-sm"
                >
                  Welcome to<br /> Mountain <br /> Spine & Orthopedics
                </h1>
              </div>
            </SlidingDiv>
            <SlidingDiv position="left" className="z-[2] sm:hidden block px-4 mb-4">
              <div className="rounded-2xl bg-[rgba(255,255,255,0.50)]"><DoctorContactForm backgroundcolor={'#0xFF'} buttonText="Get Your Free Consultation" header="" /></div>
            </SlidingDiv>
            <SlidingDiv position="left" className="z-[2]">
              <div className="xl:px-[80px] px-8 mb-[24px] xl:w-full md:w-[80%] lg:w-full md:text-left sm:text-center">
                <p
                  style={{
                    fontWeight: 400,
                  }}
                  className="text-white text-xl lg:text-2xl text-shadow-sm"
                >
                  Experience the future of orthopedic care at our modern facility, where our expert team combines advanced technology with personalized treatment plans to deliver fast, effective minimally invasive procedures.
                </p>
              </div>
            </SlidingDiv>

            <SlidingDiv position="left" className="z-[2]">
              <div className="xl:px-[80px] px-8 my-[24px] xl:w-full flex md:flex-row flex-col md:space-y-0 space-y-4 md:space-x-[16px] items-center">
                <div className=""><BookAnAppoitmentButton /></div>
                <div className="flex flex-row items-center space-x-[10px]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 18 18" fill="none" className="flex-shrink-0">
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.3852 0.0666578C11.0536 -0.0290477 10.7071 0.162219 10.6114 0.493864C10.5157 0.825509 10.707 1.17194 11.0386 1.26765C13.78 2.05874 15.9419 4.22057 16.7331 6.96182C16.8288 7.29347 17.1752 7.48472 17.5069 7.389C17.8385 7.29328 18.0298 6.94684 17.9341 6.6152C17.0238 3.46127 14.5392 0.976833 11.3852 0.0666578ZM10.9112 4.11842C10.5935 3.9835 10.2266 4.13169 10.0916 4.4494C9.95671 4.76712 10.1049 5.13406 10.4226 5.26898C11.4596 5.70934 12.2914 6.54113 12.7318 7.57812C12.8667 7.89584 13.2336 8.04402 13.5514 7.9091C13.8691 7.77417 14.0173 7.40724 13.8823 7.08952C13.3154 5.75446 12.2463 4.68536 10.9112 4.11842ZM4.51311 0.906545C4.27945 0.487351 3.90337 0.170069 3.43113 0.0724652C2.95397 -0.0261574 2.47434 0.119319 2.08015 0.440604C0.649844 1.60636 -0.260852 3.47409 0.134395 5.43344C0.377348 6.63783 0.78211 7.82615 1.60638 9.26341C3.2606 12.1479 5.84983 14.7385 8.73763 16.3947C10.1749 17.2189 11.3632 17.6237 12.5676 17.8666C14.5269 18.2619 16.3947 17.3512 17.5604 15.9209C17.8817 15.5267 18.0272 15.0471 17.9286 14.5699C17.831 14.0977 17.5137 13.7216 17.0945 13.4879L15.7591 12.7436L15.7591 12.7436C15.2673 12.4694 14.8534 12.2387 14.4936 12.088C14.1119 11.9282 13.7355 11.8332 13.3194 11.8766C12.9032 11.92 12.5545 12.0906 12.2141 12.3257C11.8931 12.5474 11.5357 12.8585 11.111 13.2283L8.97846 15.0848C6.56267 13.611 4.38855 11.4359 2.91618 9.02257L4.77273 6.89005C5.14248 6.46536 5.45365 6.10797 5.67532 5.78698C5.91047 5.44649 6.08101 5.0978 6.12441 4.68166C6.1678 4.26553 6.07287 3.88915 5.91303 3.50747C5.76236 3.14766 5.53163 2.73376 5.25746 2.24192L5.25745 2.24191L4.51311 0.906545ZM12.8148 16.6413C11.9601 16.4689 11.1147 16.2075 10.1427 15.7286L11.9059 14.1936C12.3633 13.7954 12.668 13.5313 12.9244 13.3543C13.1677 13.1862 13.3167 13.1337 13.449 13.1199C13.5814 13.1061 13.7379 13.1267 14.0107 13.241C14.2981 13.3613 14.6508 13.5569 15.1805 13.8521L16.4859 14.5798C16.6449 14.6684 16.6927 14.7659 16.7044 14.8229C16.7152 14.875 16.7145 14.9803 16.5915 15.1312C15.655 16.2801 14.2281 16.9264 12.8148 16.6413ZM3.80745 6.09513L2.27246 7.85829C1.79352 6.88632 1.53212 6.04092 1.35971 5.18627C1.0746 3.77289 1.72089 2.34601 2.86987 1.40954C3.02073 1.28658 3.12604 1.28583 3.17813 1.29659C3.23514 1.30838 3.33262 1.3561 3.42127 1.51514L4.14892 2.82057C4.44418 3.35027 4.6397 3.70291 4.76005 3.9903C4.87429 4.2631 4.89495 4.41965 4.88115 4.55201C4.86734 4.68438 4.81483 4.83329 4.64676 5.07665C4.46971 5.33303 4.20564 5.63774 3.80745 6.09513Z" fill="#0A50EC" />
                  </svg>
                  <a
                    href="tel:+15612239959"
                    className="hover:text-[#0A50EC] hover:underline transition-colors duration-200 text-lg font-bold text-white"
                    onClick={() => {
                      if (typeof window !== "undefined" && window.dataLayer) {
                        window.dataLayer.push({
                          event: 'call_click',
                          phone_number: '5612239959',
                          location: 'HomeHero'
                        });
                      }
                    }}
                    style={{
                      fontFamily: "var(--font-inter)",
                    }}
                  >
                    (561) 223-9959
                  </a>
                </div>
              </div>
            </SlidingDiv>
          </div>

          <div className="w-[50%] self-end h-full sm:flex hidden flex-col z-[2] xl:mb-32" >
            <div className="xl:w-[65%] w-[95%] rounded-2xl bg-[rgba(255,255,255,0.50)] mx-auto"><DoctorContactForm backgroundcolor={'#0xFF'} buttonText="Get Your Free Consultation" header="" /></div>
          </div>
        </div>

        <div className="z-[2] w-full flex flex-row items-center justify-evenly xl:absolute xl:bottom-0 xl:left-0 xl:right-0 bg-white py-12 pt-[32px] pb-[50px]"
          style={{
            background: 'linear-gradient(0deg, #6FC2ED 47.98%, rgba(118, 197, 238, 0.00) 100%)'
          }}
        >
          {hasMounted && dimensions.width > 0 && (
            <div className="w-full">
              <Marquee pauseOnHover className="w-full">
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

      {/* Services & Expertise */}
      <section className="w-full max-w-[1440px] flex flex-col py-[50px] h-full px-3 md:px-[40px]">
        <div className=" xl:grid xl:grid-cols-3 flex flex-col gap-[32px]">
          <div className=" rounded-[24px] bg-[#FAFAFA] p-[40px] flex flex-col col-span-1">
            <div className=" bg-white rounded-[32px] px-[14px] py-[7px] w-fit ">
              <p
                style={{
                  fontFamily: "var(--font-public-sans)",
                  fontWeight: 500, background: 'linear-gradient(270deg, #D4ABE5 0%, #9596EC 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
                className=" text-sm text-center"
              >The Future of Spine & Orthopedic Care
              </p>
            </div>

            <div className="mt-[12px]">
              <h2
                style={{
                  fontFamily: "var(--font-public-sans)",
                  fontWeight: 500, color: '#252932',
                }}
                className="text-5xl text-left"
              >Services & Expertise</h2>
            </div>

            <div className="sm:grid hidden grid-cols-2 gap-[10px] mt-[40px]">
              {
                ServicesAndExpertise.map((item) => (
                  <Link
                    href={`/conditions?data=${encodeURIComponent(JSON.stringify({ tags: item.link }))}`}
                    key={item.title} className={`flex flex-row px-[15px] py-[10px] space-x-[10px] bg-[#FAFAFA] rounded-2xl items-center justify-center hover:cursor-pointer `} onClick={() => setSelectedService(item.title)}>
                    <Image src={item.img} alt={item.title} className="h-[22px] w-[22px] " />
                    <span className={`text-[#424959]`}>{item.title}</span>
                  </Link>
                ))
              }
            </div>
          </div>
          <div className=" rounded-[24px] bg-[#FAFAFA] p-10 flex-col col-span-2 sm:flex hidden">
            <div className="">
              <p
                style={{
                  fontFamily: "var(--font-public-sans)",
                  fontWeight: 500, color: 'black',
                  lineHeight: 1.5
                }}
                className="md:px-6 sm:text-2xl text-lg"
              >
                We combine cutting-edge orthopedic innovations with compassionate care to treat spine disorders, fractures, arthritis,
                sports injuries, and joint pain. Using minimally invasive techniques
                and evidence-based treatments, our specialists provide personalised solutions for faster recovery and lasting mobility.
              </p>
            </div>

            <div className=" mt-[40px] md:w-[45%] ">
              <BookAnAppoitmentButton />
            </div>
          </div>
        </div>

        <Reveal className="w-full" width="100%">
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px] mt-[32px]">
            {
              ServicesAndExpertise.map((item, index) => (
                <Link href={`/conditions?data=${encodeURIComponent(JSON.stringify({ tags: item.link }))}`} className={`flex flex-col p-4 rounded-[24px] space-y-[24px] hover:cursor-pointer ${`sm:bg-[#FAFAFA] ${index % 2 === 1 ? 'bg-[#FAFAFA]' : 'bg-[#FAFAFA]'} `}`} key={item.title}
                  onClick={() => setSelectedService(item.title)}
                >
                  <div className=" flex flex-row items-center justify-between">
                    <div className=" rounded-full border border-[#FAFAFA] h-12 w-12 items-center justify-center flex">
                      <span
                        style={{
                          fontFamily: "var(--font-public-sans)",
                          fontWeight: 500,
                        }}
                        className={`text-lg self-center text-[#252932]`}
                      >0{index + 1}</span>
                    </div>

                    <div className={`sm:bg-[#FAFAFA] ${index % 2 === 1 ? 'bg-[#FAFAFA]' : 'bg-[#FAFAFA]'}   rounded-full border border-[#FAFAFA] py-3 px-6`}> <Image src={item.img} alt={item.title} className="h-[22px] w-[22px] " /> </div>

                  </div>

                  <div className=" flex flex-col space-y-[16px]">
                    <h3
                      style={{
                        fontFamily: "var(--font-public-sans)",
                        fontWeight: 500,
                      }}
                      className={`text-3xl  'text-[#252932]`}
                    >{item.title}</h3>

                    <p
                      style={{
                        fontFamily: "var(--font-public-sans)",
                        fontWeight: 500,
                      }}
                      className={`text-lg  text-[#022967]`}
                    >
                      {item.desc}
                    </p>
                  </div>

                  <div className="w-full max-h-[240px] h-full relative" >
                    <Image src={item.anatomy} alt={item.title} height={240} width={240} layout="responsive" className="w-full sm:flex hidden max-h-[240px] h-full object-cover aspect-square rounded-[24px] lg:h-[240px]" />
                  </div>
                </Link>
              ))
            }
          </div>
        </Reveal>
      </section>

      {/* Expert Orthopedic Conditions We Treat */}
      <section className=" w-full max-w-[1440px] flex flex-col py-[50px] h-full px-2 md:px-[40px] items-center justify-center">
        <div className=" bg-[#EBF2FA] rounded-[40px] flex items-center justify-center w-full py-10 md:py-[60px] px-2 md:px-[60px] space-y-[60px] relative flex-col">

          <div className=" flex flex-col space-y-[16px]">
            <h2
              style={{
                fontFamily: "var(--font-public-sans)",
                fontWeight: 500, color: '#252932',
                lineHeight: 1.3
              }}
              className="text-5xl sm:text-6xl text-center"
            >
              Expert Orthopedic<br /> Conditions We Treat
            </h2>
            <p
              style={{
                fontFamily: "var(--font-public-sans)",
                fontWeight: 500, color: '#424959',
                lineHeight: 1.3
              }}
              className="text-xl text-center lg:w-[60%] self-center"
            >
              We combine cutting-edge orthopedic innovations with compassionate care to treat spine disorders, fractures, arthritis, sports injuries, and joint pain.
            </p>
          </div>

          <div className=" flex xl:flex-row flex-col justify-between w-full relative">
            <div className=" xl:py-24  z-20 xl:max-w-[30%] xl:w-[20%] w-full">
              <h3
                style={{
                  fontFamily: "var(--font-public-sans)",
                  fontWeight: 500, color: '#252932',
                }}
                className=" text-2xl  xl:text-start text-center"
              >
                See Our Treatment Category
              </h3>

              <div className=" space-y-[20px] flex flex-col mt-[24px]">
                {
                  selectedOrthoCondition.treatment_categories.map((item, index) => (
                    <Link key={index} href={`/treatments/${item.slug}`} className=" px-[28px] py-[14px] hover:bg-[#e8f0ff] bg-white rounded-[62px] hover:cursor-pointer hover:scale-[1.01] text-center">
                      <p className=" font-[500] text-black text-lg">{item.name}</p>
                    </Link>
                  ))
                }
              </div>
            </div>

            <div className="relative z-10 lg:overflow-visible overflow-hidden h-fit">
              <div className="absolute left-1/2 top-90 -translate-x-1/2 -translate-y-1/2 border border-white rounded-full h-[90%] sm:w-[730px] z-0 lg:max-h-[705px] xl:h-[705px] lg:h-[750px] pointer-events-none sm:flex hidden" />
              <div className="absolute left-1/2 top-90 -translate-x-1/2 -translate-y-1/2 border border-white rounded-full w-[500px] bg-[#F5F8FD] h-[60%] lg:h-[480px] items-center justify-center z-0  pointer-events-none sm:flex hidden">
                <div className="bg-white h-[70%] w-[70%] rounded-full z-0" />
              </div>
              {/* Interactive dots and image */}
              <div className="relative z-10">
                <Image
                  src={'https://mountainspineortho.b-cdn.net/public/HumanModel.png'}
                  alt="Human Anatomy Model"
                  height={705}
                  width={1440}
                  layout="responsive"
                  className="w-full max-h-[750px] max-h-sm  xl:max-h-[705px] h-full object-contain xl:object-cover py-4"
                />
                {/* Dots - use exact positions from original */}
                {/* Neck */}
                <motion.div
                  className="rounded-[50px] absolute p-[10px] top-[18%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 hover:cursor-pointer"
                  style={{ background: 'rgba(255, 255, 255, 0.40)', boxShadow: '0px 4px 13.9px 0px rgba(0, 0, 0, 0.15)', backdropFilter: 'blur(2.95px)' }}
                  animate={selectedOrthoCondition.area === 'Neck' ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                  transition={{ duration: 1.5, repeat: selectedOrthoCondition.area === 'Neck' ? Infinity : 0, ease: "easeInOut" }}
                  onClick={() => setSelectedOrthoCondition(OrthoConditionsWeTreat[0])}
                >
                  <div className={`h-5 w-5 sm:h-7 sm:w-7 rounded-full ${selectedOrthoCondition.area === 'Neck' ? 'bg-[#5E96F0]' : 'bg-white'}`} />
                </motion.div>
                {/* Right Shoulder */}
                <motion.div
                  className="rounded-[50px] absolute p-[10px] top-[20%] sm:top-38 z-20 xl:left-[60%] left-[60%] md:left-[55%] hover:cursor-pointer"
                  style={{ background: "rgba(255, 255, 255, 0.40)", boxShadow: "0px 4px 13.9px 0px rgba(0, 0, 0, 0.15)", backdropFilter: "blur(2.95px)" }}
                  animate={selectedOrthoCondition.area === 'Shoulder' ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                  transition={{ duration: 1.5, repeat: selectedOrthoCondition.area === 'Shoulder' ? Infinity : 0, ease: "easeInOut" }}
                  onClick={() => setSelectedOrthoCondition(OrthoConditionsWeTreat[1])}
                >
                  <div className={`h-5 w-5 sm:h-7 sm:w-7 rounded-full ${selectedOrthoCondition.area === 'Shoulder' ? 'bg-[#5E96F0]' : 'bg-white'}`} />
                </motion.div>
                {/* Hand */}
                <motion.div
                  className="rounded-[50px] absolute p-[10px] top-[50%] z-20 transform -translate-x-1/3 xl:-translate-x-1/2 -translate-y-1/2 xl:left-14 lg:left-1/3 md:left-[calc(1/3.6*100%)] sm:left-[calc(1/3.5*100%)] left-[calc(1/6*100%)] hover:cursor-pointer"
                  style={{ background: 'rgba(255, 255, 255, 0.40)', boxShadow: '0px 4px 13.9px 0px rgba(0, 0, 0, 0.15)', backdropFilter: 'blur(2.95px)' }}
                  animate={selectedOrthoCondition.area === 'Hand' ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                  transition={{ duration: 1.5, repeat: selectedOrthoCondition.area === 'Hand' ? Infinity : 0, ease: "easeInOut" }}
                  onClick={() => setSelectedOrthoCondition(OrthoConditionsWeTreat[2])}
                >
                  <div className={`h-5 w-5 sm:h-7 sm:w-7 rounded-full ${selectedOrthoCondition.area === 'Hand' ? 'bg-[#5E96F0]' : 'bg-white'}`} />
                </motion.div>
                {/* Spine */}
                <motion.div
                  className="rounded-[50px] absolute p-[10px] top-[30%] z-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:cursor-pointer"
                  style={{ background: 'rgba(255, 255, 255, 0.40)', boxShadow: '0px 4px 13.9px 0px rgba(0, 0, 0, 0.15)', backdropFilter: 'blur(2.95px)' }}
                  animate={selectedOrthoCondition.area === 'Spine' ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                  transition={{ duration: 1.5, repeat: selectedOrthoCondition.area === 'Spine' ? Infinity : 0, ease: "easeInOut" }}
                  onClick={() => setSelectedOrthoCondition(OrthoConditionsWeTreat[3])}
                >
                  <div className={`h-5 w-5 sm:h-7 sm:w-7 rounded-full ${selectedOrthoCondition.area === 'Spine' ? 'bg-[#5E96F0]' : 'bg-white'}`} />
                </motion.div>
                {/* Lower Spine */}
                <motion.div
                  className="rounded-[50px] absolute p-[10px] top-[42%] z-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:cursor-pointer"
                  style={{ background: 'rgba(255, 255, 255, 0.40)', boxShadow: '0px 4px 13.9px 0px rgba(0, 0, 0, 0.15)', backdropFilter: 'blur(2.95px)' }}
                  animate={selectedOrthoCondition.area === 'Lower Spine' ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                  transition={{ duration: 1.5, repeat: selectedOrthoCondition.area === 'Lower Spine' ? Infinity : 0, ease: "easeInOut" }}
                  onClick={() => setSelectedOrthoCondition(OrthoConditionsWeTreat[4])}
                >
                  <div className={`h-5 w-5 sm:h-7 sm:w-7 rounded-full ${selectedOrthoCondition.area === 'Lower Spine' ? 'bg-[#5E96F0]' : 'bg-white'}`} />
                </motion.div>
                {/* Knee */}
                <motion.div
                  className="rounded-[50px] absolute p-[10px] xl:top-110 top-[65%] sm:top-120 z-20 xl:right-[53%] right-[54%] hover:cursor-pointer"
                  style={{ background: 'rgba(255, 255, 255, 0.40)', boxShadow: '0px 4px 13.9px 0px rgba(0, 0, 0, 0.15)', backdropFilter: 'blur(2.95px)' }}
                  animate={selectedOrthoCondition.area === 'Knee' ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                  transition={{ duration: 1.5, repeat: selectedOrthoCondition.area === 'Knee' ? Infinity : 0, ease: "easeInOut" }}
                  onClick={() => setSelectedOrthoCondition(OrthoConditionsWeTreat[5])}
                >
                  <div className={`h-5 w-5 sm:h-7 sm:w-7 rounded-full ${selectedOrthoCondition.area === 'Knee' ? 'bg-[#5E96F0]' : 'bg-white'}`} />
                </motion.div>
                {/* Foot */}
                <motion.div
                  className="rounded-[50px] absolute p-[10px] xl:top-150 top-[85%] xs:top-132 sm:top-160 z-20 left-[55%] hover:cursor-pointer"
                  style={{ background: 'rgba(255, 255, 255, 0.40)', boxShadow: '0px 4px 13.9px 0px rgba(0, 0, 0, 0.15)', backdropFilter: 'blur(2.95px)' }}
                  animate={selectedOrthoCondition.area === 'Foot' ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                  transition={{ duration: 1.5, repeat: selectedOrthoCondition.area === 'Foot' ? Infinity : 0, ease: "easeInOut" }}
                  onClick={() => setSelectedOrthoCondition(OrthoConditionsWeTreat[6])}
                >
                  <div className={`h-5 w-5 sm:h-7 sm:w-7 rounded-full ${selectedOrthoCondition.area === 'Foot' ? 'bg-[#5E96F0]' : 'bg-white'}`} />
                </motion.div>
              </div>
            </div>

            <div className=" flex flex-col space-y-[10px] xl:w-[20%] w-full  xl:pt-50 z-20">
              <TextAnimate
                animation="blurInUp"
                by="character"
                once
                as="h3"
                style={{
                  fontFamily: "var(--font-public-sans)",
                  fontWeight: 500, color: '#252932',
                }}
                className=" xl:text-2xl lg:text-3xl">
                {selectedOrthoCondition.area_procedures.title}
              </TextAnimate>
              <p>
                {selectedOrthoCondition.area_procedures.desc}
              </p>
              <Link
                className=" mt-[12px] max-h-[56px] h-full  rounded-[62px] space-x-[10px] relative flex p-8 bg-[#0A50EC] text-white text-[14px] font-[500] w-fit xl:w-full justify-center items-center hover:cursor-pointer"
                href={`/treatments?data=${encodeURIComponent(JSON.stringify({ key: selectedOrthoCondition.area }))}`}
              >
                <TextAnimate
                  animation="blurInUp"
                  by="word"
                  once
                  as="span"
                  style={{
                    fontFamily: "var(--font-public-sans)",
                    fontWeight: 500,
                  }}
                >{selectedOrthoCondition.view_all_treatments.text}</TextAnimate>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                  <path d="M12.9985 1.46524C12.752 1.23664 12.4267 1.10984 12.1498 1.03007C11.8544 0.944969 11.5165 0.886948 11.1686 0.84632C10.4713 0.764898 9.65365 0.744548 8.88838 0.751159C8.11878 0.757808 7.38161 0.791999 6.83826 0.824347C6.56612 0.840548 6.34152 0.856353 6.18445 0.868151C6.1059 0.874051 6.04417 0.878953 6.00177 0.882408L5.95295 0.88645L5.93999 0.887552L5.93495 0.887986C5.5223 0.923934 5.21693 1.2876 5.25287 1.70025C5.28882 2.11288 5.65303 2.4182 6.06565 2.38228L6.06817 2.38207L6.07907 2.38114L6.12358 2.37745C6.16303 2.37424 6.2216 2.36959 6.2968 2.36394C6.44725 2.35264 6.66405 2.33737 6.92741 2.3217C7.45506 2.29028 8.16529 2.25746 8.90134 2.2511C9.64171 2.24471 10.3879 2.26536 10.9946 2.3362C11.0287 2.34017 11.062 2.34428 11.0947 2.34852L0.46967 12.9736C0.176777 13.2665 0.176777 13.7413 0.46967 14.0342C0.762563 14.3271 1.23744 14.3271 1.53033 14.0342L12.1578 3.40672C12.1596 3.42107 12.1614 3.43557 12.1631 3.45021C12.2334 4.05004 12.2544 4.80047 12.2486 5.55046C12.2429 6.29576 12.211 7.01955 12.1803 7.55855C12.1651 7.82757 12.1501 8.04947 12.1391 8.20364C12.1336 8.2807 12.129 8.34078 12.1258 8.3813L12.1222 8.42705L12.121 8.44154C12.0868 8.85431 12.3936 9.21673 12.8063 9.25104C13.2191 9.28536 13.5816 8.97805 13.6159 8.56526L13.6163 8.56067L13.6174 8.54746L13.6213 8.49761C13.6247 7.95428 13.6295 7.89119 13.6352 7.81094C13.6467 7.65046 13.6622 7.4211 13.6779 7.14367C13.7094 6.58976 13.7426 5.83985 13.7485 5.06198C13.7545 4.2888 13.7338 3.46659 13.6529 2.77563C13.6125 2.43136 13.5547 2.09687 13.4689 1.80777C13.3907 1.54431 13.258 1.20593 12.9985 0.965242Z" fill="#FAFAFA" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Mountain Spine & Orthopedics */}
      <section className="w-full max-w-[1440px] flex flex-col py-[50px] h-full px-2 md:px-[40px] items-center justify-center space-y-[60px]">
        <Reveal className="w-full" width="100%">
          <div className="flex xl:flex-row space-x-[60px] flex-col xl:space-y-0 space-y-8 w-full">
            <h2 style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500, color: '#111315' }} className="text-6xl w-[100%]">
              Why Choose<br /> Mountain Spine & Orthopedics
            </h2>
            <div>
              <p style={{ fontFamily: "var(--font-public-sans)", fontWeight: 400, color: '#424959' }} className="text-lg ">
                Trust Mountain Spine & Orthopedics for expert care, compassionate service, and results that make a difference. Your mobility and well-being are our top priority!
              </p>
              <div className="mt-[40px] xl:w-[50%] w-full md:w-fit"><BookAnAppoitmentButton /></div>
            </div>
          </div>
        </Reveal>
        <div className="flex xl:flex-row flex-col w-full gap-[32px] xl:items-stretch">
          <div className="xl:w-[50%] w-full rounded-[20px] overflow-hidden"><Image src={HomeWhyAO} className="w-full h-full md:aspect-video aspect-square object-cover" alt="Doctor Diagnosing Patient " /></div>
          <div className="xl:w-[50%] w-full flex flex-col space-y-[32px] ">
            <Reveal className="w-full" width="100%">
              <div className="flex flex-col w-full space-y-[16px]">
                <h3 style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500, color: '#111315' }} className="text-4xl">Our Specialty</h3>
                <p style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500, color: '#424959' }} className="text-lg">
                  At Mountain Spine & Orthopedics, we are dedicated to providing exceptional care with cutting-edge treatments and a patient-first approach. Here's why we stand out:
                </p>
              </div>
            </Reveal>
            <Reveal className="w-full" width="100%">
              <div className="grid grid-cols-1 md:grid-cols-2 rounded-[20px] overflow-hidden w-full">
                {OurSpecialtyItems.map((item, index) => (
                  <div key={index} className={`flex flex-col space-y-[16px] ${index == 1 || index == 2 ? 'bg-[#FAFAFA]' : 'bg-[#FAFAFA]'} p-6`}>
                    <div className="rounded-full bg-white p-1 items-center justify-center flex w-[20%] px-[12px] py-[15px] ">{item.icon()}</div>
                    <h4 style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500, color: '#252932' }} className="text-xl">{item.title}</h4>
                    <p style={{ fontFamily: "var(--font-inter)", fontWeight: 500, color: '#424959' }} className="text-md">{item.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Statistics/Testimonials Bar */}
      <section className="bg-[#252932] w-full py-[50px]">
        <div className="w-full max-w-[1440px] flex flex-col space-y-10 md:space-y-0 md:flex-row mx-auto px-[40px] items-center justify-evenly overflow-hidden">
          {Testimonials.map((item) => (
            <div className="flex flex-col space-y-[12px] p-[18px] max-h-[190px] lg:h-[190px] items-center justify-center" key={item.desc}>
              <strong style={{ fontFamily: "var(--font-public-sans)", fontWeight: 400 }} className="text-white lg:text-6xl md:text-4xl text-6xl">
                <NumberTicker value={item.value} className="text-white" />{item.stat}
              </strong>
              <p style={{ fontFamily: "var(--font-public-sans)", fontWeight: 400 }} className="text-white text-xl md:text-lg text-center lg:text-start">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What Our Patients Say */}
      <RatingsAndReviews />

      {/* Meet Our Experts */}
      <section className="w-full max-w-[1440px] flex flex-col py-[50px] h-full px-[40px]">
        <div className="flex md:flex-row flex-col">
          <div className="flex flex-col space-y-[24px] md:w-[50%] w-full">
            <h2 style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }} className="text-black text-5xl text-left w-full">Meet Our Experts</h2>
            <p style={{ fontFamily: "var(--font-inter)", fontWeight: 400 }} className="text-[#54535C] md:w-[50%] w-full">Highly skilled and compassionate professionals ready to care for you</p>
          </div>
          <div className="md:w-[50%] flex items-center md:justify-end w-full md:mt-0 mt-4">
            <Link href={'/about/meetourdoctors'} className="bg-white border hover:cursor-pointer border-[#252932] px-[20px] py-[10px] space-x-[10px] flex flex-row items-center justify-center rounded-[62px]">
              <span style={{ fontFamily: "var(--font-inter)", fontWeight: 400 }} className="text-[#252932]">View all</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="11" viewBox="0 0 18 11" fill="none"><path d="M12.3982 0.268483C12.0402 -0.0894963 11.4598 -0.089494 11.1018 0.268488C10.7438 0.62647 10.7438 1.20687 11.1018 1.56485L14.1203 4.58333H1.66667C1.16041 4.58333 0.75 4.99374 0.75 5.5C0.75 6.00626 1.16041 6.41667 1.66667 6.41667H14.1203L11.1018 9.43516C10.7439 9.79314 10.7439 10.3735 11.1019 10.7315C11.4598 11.0895 12.0402 11.0895 12.3982 10.7315L16.9766 6.15303C16.9935 6.13637 17.0098 6.11905 17.0254 6.10112C17.0873 6.02997 17.1365 5.95154 17.1728 5.86885C17.2221 5.75677 17.2496 5.63294 17.25 5.50273L17.25 5.5C17.25 5.49717 17.25 5.49434 17.25 5.49152C17.2489 5.37622 17.2266 5.26602 17.1867 5.16463C17.142 5.05068 17.0736 4.94387 16.9815 4.85178L12.3982 0.268483Z" fill="#252932" /></svg>
            </Link>
          </div>
        </div>
        <div className="mt-[60px] grid xl:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-[32px]">
          {Doctors.slice(0, 3).map((item) => (<DoctorCard key={item.name} doctor={item} />))}
        </div>
      </section>

      {/* Complimentary Perks */}
      <section className="w-full max-w-[1440px] flex xl:flex-row flex-col py-[50px] h-full px-2 md:px-[40px] space-x-[32px]">
        <div className="rounded-[24px] bg-[#FAFAFA] p-[24px] flex flex-col xl:w-[50%] w-full h-full">
          <div className="flex flex-col space-y-[24px]">
            <h2 style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500, color: 'black' }} className="text-5xl ">Top Florida Clinic Free Second Opinion & MRI Reading</h2>
            <p style={{ fontFamily: "var(--font-inter)", fontWeight: 500, color: '#424959', lineHeight: 1.5 }} className="">
              <span className="text-[#0A50EC]">Free Second Opinion.</span>Still suffering from pain-despite multiple treatments? At Mountain Spine & Orthopedics we <span className="text-[#0A50EC]">offer a free second opinion</span> and cutting-edge, minimally invasive procedures to relieve pain, restore mobility, and enhance your quality of life.
            </p>
              <div className="flex md:flex-row flex-col w-full gap-3 justify-center items-stretch">
                <div className="w-full md:flex-1 min-w-0"><BookAnAppoitmentButton /></div>
                <Link href={'/about'} className="bg-white border hover:cursor-pointer border-[#252932] px-3 py-2.5 gap-2 min-h-[56px] flex items-center justify-center rounded-[62px] w-full md:flex-1 group">
                  <span style={{ fontFamily: "var(--font-inter)", fontWeight: 400 }} className="text-[#252932] text-center text-[13px] leading-4">Learn More About Our Practice</span>
                  <div className="shrink-0 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none"><path d="M13.4985 0.965242C13.252 0.736636 12.9267 0.609835 12.6498 0.530065C12.3544 0.444969 12.0165 0.386948 11.6686 0.34632C10.9713 0.264898 10.1536 0.244548 9.38838 0.251159C8.61878 0.257808 7.88161 0.291999 7.33826 0.324347C7.06612 0.340548 6.84152 0.356353 6.68445 0.368151C6.6059 0.374051 6.54417 0.378953 6.50177 0.382408L6.45295 0.38645L6.43999 0.387552L6.43495 0.387986C6.0223 0.423934 5.71693 0.787596 5.75287 1.20025C5.78882 1.61288 6.15303 1.9182 6.56565 1.88228L6.56817 1.88207L6.57907 1.88114L6.62358 1.87745C6.66303 1.87424 6.7216 1.86959 6.7968 1.86394C6.94725 1.85264 7.16405 1.83737 7.42741 1.8217C7.95506 1.79028 8.66529 1.75746 9.40134 1.7511C10.1417 1.74471 10.8879 1.76536 11.4946 1.8362C11.5287 1.84017 11.562 1.84428 11.5947 1.84852L0.96967 12.4736C0.676777 12.7665 0.676777 13.2413 0.96967 13.5342C1.26256 13.8271 1.73744 13.8271 2.03033 13.5342L12.6578 2.90672C12.6596 2.92107 12.6614 2.93557 12.6631 2.95021C12.7334 3.55004 12.7544 4.30047 12.7486 5.05046C12.7429 5.79576 12.711 6.51955 12.6803 7.05855C12.6651 7.32757 12.6501 7.54947 12.6391 7.70364C12.6336 7.7807 12.629 7.84078 12.6258 7.8813L12.6222 7.92705L12.621 7.94154C12.5868 8.35431 12.8936 8.71673 13.3063 8.75104C13.7191 8.78536 14.0816 8.47805 14.1159 8.06526L14.1163 8.06067L14.1174 8.04746L14.1213 7.99761C14.1247 7.95428 14.1295 7.89119 14.1352 7.81094C14.1467 7.65046 14.1622 7.4211 14.1779 7.14367C14.2094 6.58976 14.2426 5.83985 14.2485 5.06198C14.2545 4.2888 14.2338 3.46659 14.1529 2.77563C14.1125 2.43136 14.0547 2.09687 13.9689 1.80777C13.8907 1.54431 13.758 1.20593 13.4985 0.965242Z" fill="#252932" /></svg>
                </div>
              </Link>
            </div>
            <div className=""><Image src={'https://mountainspineortho.b-cdn.net/public/HomeWhyAO-min.jpeg'} layout="responsive" height={1000} width={1440} alt="Doctor Treating a Patient" className="w-full xl:h-[250px] xl:max-h-[250px] object-cover object-center xl:object-top-left rounded-[12px]" /></div>
          </div>
        </div>
        <Reveal className="xl:w-[50%] w-full mt-0 " width="100%">
          <div className="flex flex-col space-y-[38px] w-full">
            <div className="bg-[#FAFAFA] w-full rounded-[24px] p-[24px] space-y-[24px] h-[50%]">
              <div className="flex flex-col space-y-[8px] ">
                <h3 style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500, color: 'black', lineHeight: 1.2 }} className="text-2xl ">Complimentary MRI Reading</h3>
                <p style={{ fontFamily: "var(--font-inter)", fontWeight: 500, color: '#424959' }} className="lg">Get a free MRI reading from our experts to tailor your treatment plan.</p>
              </div>
              <div className="grid grid-cols-3 gap-x-[16px]">
                {[MRI1, MRI2, MRI3].map((item, index) => (
                  <motion.div whileHover={{ translateY: -10 }} key={index}>
                    <Image src={item} className="w-full h-full aspect-square rounded-[12px]" alt="Image of an MRI Bone Scan" />
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="bg-[#FAFAFA] w-full rounded-[24px] p-4 md:p-[24px] space-y-[24px] h-[50%] items-center justify-center">
              <div className="flex flex-col space-y-[8px] items-center justify-center md:mt-10">
                <h3 style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500, color: 'black', lineHeight: 1.2 }} className="md:text-2xl text-4xl text-center">Complimentary Amenities</h3>
                <p style={{ fontFamily: "var(--font-inter)", fontWeight: 500, color: '#424959' }} className="w-[65%] text-center">Enjoy Complimentary Amenities: Free Car Service, Refreshments & WiFi</p>
              </div>
              <div className="flex flex-row gap-x-[16px] items-center justify-center">
                {Amenities.map((item, index) => (
                  <motion.div whileHover={{ translateY: -5, scale: 1.02 }} className="flex flex-col space-y-[12px] max-w-[88px] aspect-square p-[8px] items-center justify-center" key={item.title}>
                    <div className="bg-white rounded-[12px] aspect-square flex items-center justify-center p-[8px]">
                      {item.icon()}
                    </div>
                    <div>
                      <span style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }} className="text-sm text-[#252932]">{item.title}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* From Pain to Progress */}
      <section className="w-full max-w-[1440px] flex flex-col py-[50px] h-full px-2 md:px-[40px] ">
        <div
          style={{
            background: 'linear-gradient(246deg, #FAFBFC 13.17%, #E0F5FF 52.92%, #E1ECFE 99.53%)'
          }}
          className=" w-full p-[40px] rounded-[24px] items-center justify-center flex flex-col space-y-[0px]"
        >
          <div className="w-full flex items-center justify-center flex-col">
            <div className=" bg-white px-[14px] py-[7px] flex items-center justify-center max-w-[150px] rounded-[62px] self-center">
              <p
                style={{
                  fontFamily: "var(--font-public-sans)",
                  fontWeight: 500, background: 'linear-gradient(177deg, #252932 -13.59%, #0A50EC 109.86%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
                className="text-xl"
              >
                Our Process
              </p>
            </div>
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-public-sans)",
                  fontWeight: 500,
                }}
                className="text-5xl text-black mt-[20px]"
              >
                From Pain to Progress
              </h2>
            </div>
            <div className="flex items-center justify-center">
              <p
                style={{
                  fontFamily: "var(--font-public-sans)",
                  fontWeight: 500,
                }}
                className="text-lg text-[#424959] mt-[20px] text-center w-full md:w-[55%] self-center"
              >
                Trust Mountain Spine & Orthopedics for expert care, compassionate service, and results
                that make a difference. Your mobility and well-being are our top priority!
              </p>
            </div>
          </div>
          <div className="w-full md:mt-[60px] mt-4">
            {hasMounted && dimensions.width > 0 && (
              <div className="w-full">
                <Carousel className="w-full h-full">
                  <CarouselContent className="-ml-4 md:gap-x-4">
                    {PainToProgress.map((item, index) => (
                      <CarouselItem className="xl:basis-1/3 md:basis-1/2 pl-6 relative" key={index}>
                        <div className="bg-[#FAFAFA] flex flex-col p-4 rounded-[24px] space-y-[32px]" key={item.title}>
                          <div>
                            <Image
                              src={item.img}
                              alt={item.title}
                              className="w-full max-h-[240px] h-[240px] object-cover rounded-[24px] lg:h-[240px]"
                              draggable={false}
                            />
                          </div>
                          <div className="flex flex-col space-y-[16px]">
                            <h3
                              style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500, color: '#252932',
                              }}
                              className="text-xl"
                            >
                              {item.title}
                            </h3>
                            <p
                              style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500, color: '#424959',
                              }}
                              className="text-lg"
                            >
                              {item.body}
                            </p>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ClinicsMap */}
      <ClinicsMap />

      {/* ContactUsSection */}
      <ContactUsSection />
    </main>
  );
}
