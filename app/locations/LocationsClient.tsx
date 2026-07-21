'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, Building2 } from 'lucide-react'
import { clinicsForMap as clinics } from '@/components/data/clinicsForMap.generated'
import ClinicsMap from '@/components/ClinicsMap'
import { TextAnimate } from '@/components/magicui/text-animate'
import Image from 'next/image'
import Link from 'next/link'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { STATE_METADATA, VALID_STATE_SLUGS, getClinicsByState } from '@/lib/locationRedirects'
import { LOCATION_HOURS_DISPLAY, MAIN_PHONE_DISPLAY, MAIN_PHONE_TEL, STATE_PHONE_NUMBERS } from '@/lib/locationConstants'

interface LocationsClientProps {
  selectedLocation?: any
  setSelectedLocation?: (location: any) => void
}

export default function LocationsClient({ selectedLocation, setSelectedLocation }: LocationsClientProps) {
  // Create local state if props are not provided
  const [localSelectedLocation, setLocalSelectedLocation] = useState(selectedLocation);
  
  // Use props if provided, otherwise use local state
  const currentSelectedLocation = selectedLocation !== undefined ? selectedLocation : localSelectedLocation;
  const currentSetSelectedLocation = setSelectedLocation || setLocalSelectedLocation;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [hasMounted, setHasMounted] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    setHasMounted(true)
    // Calculate initial dimensions
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    // Initial calculation
    updateDimensions()

    // Add resize listener
    window.addEventListener('resize', updateDimensions)

    // Cleanup
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useEffect(() => {
    if (!api) {
      return
    }

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const hoverVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  // Location Card Component
  const LocationCard = ({ clinic, index, isMobile = false }: { clinic: any, index: number, isMobile?: boolean }) => {
    const statePhone = STATE_PHONE_NUMBERS[clinic.stateSlug as keyof typeof STATE_PHONE_NUMBERS] ?? { display: MAIN_PHONE_DISPLAY, tel: MAIN_PHONE_TEL };
    return (
    <motion.div
      key={index}
      variants={isMobile ? undefined : itemVariants}
      whileHover={isMobile ? undefined : "hover"}
      onHoverStart={isMobile ? undefined : () => setHoveredIndex(index)}
      onHoverEnd={isMobile ? undefined : () => setHoveredIndex(null)}
      className="group cursor-pointer h-full relative"
    >
      <div className="relative h-full bg-gradient-to-br from-[#E0F5FF] to-[#F8FAFC] rounded-3xl p-6 border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 right-4 w-16 h-16 bg-[#0A50EC] rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 bg-[#252932] rounded-full"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <motion.div
              animate={hoveredIndex === index ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 0.6 }}
              className="w-12 h-12 bg-[#0A50EC] rounded-2xl flex items-center justify-center shadow-lg"
            >
              <Building2 className="w-6 h-6 text-white" />
            </motion.div>
            <div className="text-right">
              <span className="text-sm font-medium text-[#0A50EC] bg-white/80 px-3 py-1 rounded-full">
                {clinic.region ? clinic.region.split(',')[0].trim() : (clinic.stateAbbr || 'Location')}
              </span>
            </div>
          </div>

          {/* Clinic Name */}
          <h3 className="text-2xl font-bold text-[#252932] mb-4 group-hover:text-[#0A50EC] transition-colors duration-300">
            {clinic.name}
          </h3>

          {/* Address */}
          <div className="flex items-start space-x-3 mb-4">
            <MapPin className="w-5 h-5 text-[#0A50EC] mt-0.5 flex-shrink-0" />
            <p className="text-[#424959] text-sm leading-relaxed">
              {clinic.address || '123 Medical Center Dr, Suite 100'}
            </p>
          </div>

          {/* Phone */}
          <div className="flex items-center space-x-3 mb-4 relative z-20">
            <Phone className="w-5 h-5 text-[#0A50EC] flex-shrink-0" />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                window.location.href = `tel:+1${statePhone.tel}`;
              }}
              className="text-[#252932] font-medium hover:text-[#0A50EC] transition-colors duration-300 text-left"
            >
              {statePhone.display}
            </button>
          </div>

          {/* Hours */}
          <div className="flex items-start space-x-3 mb-6">
            <Clock className="w-5 h-5 text-[#0A50EC] mt-0.5 flex-shrink-0" />
            <div className="text-[#424959] text-sm">
              <p className="font-medium">Hours: {LOCATION_HOURS_DISPLAY}</p>
            </div>
          </div>

          {/* CTA Button */}
          <motion.div
            variants={isMobile ? undefined : hoverVariants}
            className="mt-auto"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/50 shadow-sm group-hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between">
                <span className="text-[#252932] font-semibold">View Details</span>
                <motion.div
                  animate={hoveredIndex === index ? { x: 5 } : { x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg className="w-5 h-5 text-[#0A50EC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stretched Link */}
        <Link 
          href={`/locations/${clinic.stateSlug}/${clinic.locationSlug}`} 
          className="absolute inset-0 z-10"
          aria-label={`View details for ${clinic.name}`}
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A50EC]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
      </div>
    </motion.div>
    );
  }

  return (
    <main className='w-full flex flex-col items-center justify-center bg-white h-full pb-10'>
      <section className="w-full h-full flex flex-col relative overflow-hidden [mask-composite:intersect] [mask-image:linear-gradient(to_top,transparent,black_6rem)]" id="Locations">
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
          alt="Find Mountain Spine & Orthopedics clinic locations across Florida, New Jersey, New York, and Pennsylvania"
        />
        <div
          className="lg:w-[100%] z-[1] h-full absolute left-0 top-0 md:w-[100%] w-full"
          style={{
            background: 'linear-gradient(180deg, rgba(10, 80, 236, 0.20) 0%, rgba(255, 255, 255, 0.20) 100%)',
          }}
        />
        <div
          className="w-full h-[100px] absolute bottom-0 z-[1]"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0.8) 100%)',
          }}
        />
        <div className="z-[2] flex flex-col w-full h-full text-left relative pt-32 lg:pt-26 pb-20 px-6 lg:px-[80px]">
          <div className='max-w-[1440px] w-full flex flex-col items-start justify-start'>
            <TextAnimate animation="blurInUp" by="word" once as="h1"
              style={{
                fontFamily: 'var(--font-reem-kufi)',
                fontWeight: 500,
              }}
              className='text-[#252932] sm:text-6xl text-4xl'
            >
              Orthopedic Clinic Locations in Florida, New Jersey, New York & Pennsylvania
            </TextAnimate>
            <div className="mt-6 space-y-4 max-w-4xl">
              <p
                style={{
                  fontFamily: 'var(--font-public-sans)',
                  fontWeight: 400,

                }}
                className='text-[#424959] text-lg leading-relaxed'
              >
                Mountain Spine & Orthopedics makes it easy to find expert spine and joint care near you. Our orthopedic specialists evaluate and treat common conditions such as back pain, neck pain, sciatica, herniated discs, arthritis, joint injuries, and sports-related injuries with personalized care plans focused on restoring mobility and function.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-public-sans)',
                  fontWeight: 400,

                }}
                className='text-[#424959] text-lg leading-relaxed'
              >
                Use the state picker and map to find the most convenient clinic, then select a location to view directions, hours, and local details. If you need help scheduling, call the number for your state—FL/PA <a href="tel:+15612239959" className="text-[#0A50EC] hover:underline font-medium">(561) 223-9959</a>, NJ <a href="tel:+19732596756" className="text-[#0A50EC] hover:underline font-medium">(973) 259-6756</a>, NY <a href="tel:+16463895606" className="text-[#0A50EC] hover:underline font-medium">(646) 389-5606</a>—and our team will match you with the best office for your symptoms and availability.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white w-full">
        <ClinicsMap startingClinic={currentSelectedLocation} />
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-16">
        
        {/* State Hub Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 px-4 md:px-8">
          {VALID_STATE_SLUGS.map((stateSlug, index) => {
            const stateInfo = STATE_METADATA[stateSlug]
            const stateClinicCount = getClinicsByState(stateSlug).length
            return (
              <motion.div
                key={stateSlug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/locations/${stateSlug}`}
                  className="group relative block"
                >
                  <motion.div
                    className="relative overflow-hidden bg-gradient-to-br from-white to-[#F8FAFC] border-2 border-[#0A50EC]/20 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-lg transition-all duration-300 group-hover:border-[#0A50EC] group-hover:shadow-2xl"
                    whileHover={{ 
                      scale: 1.03,
                      y: -4,
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Animated background gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0A50EC] to-[#0A50EC]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl md:rounded-3xl" />
                    
                    {/* Decorative circles */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 md:w-20 md:h-20 bg-[#0A50EC]/5 rounded-full group-hover:bg-white/10 transition-colors duration-500" />
                    <div className="absolute -bottom-2 -left-2 w-10 h-10 md:w-14 md:h-14 bg-[#0A50EC]/5 rounded-full group-hover:bg-white/10 transition-colors duration-500" />
                    
                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center text-center">
                      {/* State icon */}
                      <div className="w-10 h-10 md:w-14 md:h-14 bg-[#0A50EC]/10 rounded-xl md:rounded-2xl flex items-center justify-center mb-2 md:mb-3 group-hover:bg-white/20 transition-colors duration-300">
                        <MapPin className="w-5 h-5 md:w-7 md:h-7 text-[#0A50EC] group-hover:text-white transition-colors duration-300" />
                      </div>
                      
                      {/* State name */}
                      <h3 className="text-base md:text-xl font-bold text-[#252932] group-hover:text-white transition-colors duration-300 mb-1">
                        {stateInfo?.name}
                      </h3>
                      
                      {/* Location count badge */}
                      <div className="flex items-center gap-1 md:gap-2">
                        <span className="text-xs md:text-sm text-[#424959] group-hover:text-white/80 transition-colors duration-300">
                          {stateClinicCount} location{stateClinicCount > 1 ? 's' : ''}
                        </span>
                      </div>
                      
                      {/* Arrow indicator */}
                      <motion.div 
                        className="mt-2 md:mt-3 flex items-center gap-1 text-[#0A50EC] group-hover:text-white transition-colors duration-300"
                        initial={{ x: 0 }}
                        whileHover={{ x: 4 }}
                      >
                        <span className="text-xs md:text-sm font-medium">Explore</span>
                        <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.div>
                    </div>
                    
                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                      <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Browse Orthopedic Clinics by State - Table of Contents */}
        <section className="mb-16">
          <h2
            style={{
              fontFamily: 'var(--font-public-sans)',
              fontWeight: 500,
            }}
            className="text-4xl md:text-5xl font-bold text-[#252932] mb-6 text-center"
          >
            Browse Orthopedic Clinics by State
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {VALID_STATE_SLUGS.map((stateSlug) => {
              const stateInfo = STATE_METADATA[stateSlug]
              return (
                <a
                  key={stateSlug}
                  href={`#${stateSlug}-clinics`}
                  className="px-4 py-2 bg-[#E0F5FF] text-[#252932] rounded-full text-base font-medium hover:bg-[#0A50EC] hover:text-white transition-colors"
                >
                  {stateInfo?.name}
                </a>
              )
            })}
          </div>
        </section>

        {/* Locations Grouped by State */}
        {VALID_STATE_SLUGS.map((stateSlug) => {
          const stateInfo = STATE_METADATA[stateSlug]
          const stateClinics = getClinicsByState(stateSlug)
          if (stateClinics.length === 0) return null
          
          // State-specific intro text
          const getStateIntro = (slug: string) => {
            const intros: Record<string, string> = {
              florida: `From South Florida through Central Florida, Mountain Spine & Orthopedics provides orthopedic and spine care close to home. Patients choose our Florida locations for thorough evaluations, modern diagnostics, and treatment options tailored to back pain, neck pain, joint pain, and athletic injuries. View the full Florida directory to compare cities and find the closest office.`,
              'new-jersey': `Our New Jersey locations help patients across North and Central NJ access orthopedic and spine specialists without long travel times. Whether you're dealing with chronic back pain, pinched nerves, joint injuries, or arthritis-related stiffness, our NJ clinics focus on accurate diagnosis and clear next steps. Browse New Jersey locations to choose the most convenient office.`,
              'new-york': `Our New York location serves patients who need specialized orthopedic and spine evaluations with straightforward scheduling and coordinated follow-up care. If you're experiencing neck pain, radiating arm symptoms, low back pain, or joint pain that limits activity, explore our New York location page for directions and details.`,
              pennsylvania: `Mountain Spine & Orthopedics offers convenient access to orthopedic and spine care for patients in Pennsylvania, including evaluation for back pain, neck pain, sciatica, joint injuries, and degenerative conditions. View our Pennsylvania locations to compare offices and choose the best clinic for your needs.`,
            }
            return intros[slug] || `Our ${stateInfo?.name} locations provide expert orthopedic and spine care with board-certified specialists. Browse locations below to find the most convenient office for your needs.`
          }
          
          return (
            <section key={stateSlug} id={`${stateSlug}-clinics`} className="mb-16 scroll-mt-20">
              {/* State Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8 px-6 lg:px-8"
              >
                <h2
                  style={{
                    fontFamily: 'var(--font-public-sans)',
                    fontWeight: 500,
                  }}
                  className="text-4xl md:text-5xl font-bold text-[#252932] mb-4"
                >
                  {stateInfo?.name} Orthopedic Clinics
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-public-sans)',
                    fontWeight: 400,
                  }}
                  className="text-lg text-[#424959] leading-relaxed mb-4 max-w-4xl"
                >
                  {getStateIntro(stateSlug)}
                </p>
                <Link
                  href={`/locations/${stateSlug}`}
                  className="inline-flex items-center px-4 py-2 bg-white border border-[#0A50EC]/20 rounded-full text-[#0A50EC] font-medium hover:bg-[#0A50EC] hover:text-white transition-all duration-300 text-sm"
                >
                  View All {stateInfo?.name} Locations
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>

              {/* Mobile Carousel for this state */}
              <div className="block md:hidden mb-8">
                {hasMounted && dimensions.width > 0 && (
                  <div className="w-full">
                    <Carousel
                      className="w-full"
                      opts={{
                        align: "center",
                        containScroll: "trimSnaps",
                      }}
                    >
                      <CarouselContent>
                        {stateClinics.map((clinic, index) => (
                          <CarouselItem key={index} className="basis-full py-6">
                            <LocationCard clinic={clinic} index={index} isMobile={true} />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="bg-white/90 backdrop-blur-sm border border-[#0A50EC]/20 hover:bg-white hover:shadow-xl transition-all duration-300 absolute -left-5 top-1/2 -translate-y-1/2" />
                      <CarouselNext className="bg-white/90 backdrop-blur-sm border border-[#0A50EC]/20 hover:bg-white hover:shadow-xl transition-all duration-300 absolute -right-5 top-1/2 -translate-y-1/2" />
                    </Carousel>
                  </div>
                )}
              </div>

              {/* Desktop Grid for this state */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 lg:px-8"
              >
                {stateClinics.map((clinic, index) => (
                  <LocationCard key={index} clinic={clinic} index={index} />
                ))}
              </motion.div>
            </section>
          )
        })}

        {/* Common Reasons Patients Visit Section */}
        <section className="mb-16 px-6 lg:px-8">
          <h2
            style={{
              fontFamily: 'var(--font-public-sans)',
              fontWeight: 500,
            }}
            className="text-4xl md:text-5xl font-bold text-[#252932] mb-6"
          >
            Common Reasons Patients Visit Mountain Spine & Orthopedics
          </h2>
          <ul className="space-y-4 text-lg text-[#424959]">
            <li className="flex items-start">
              <span className="text-[#0A50EC] mr-3">•</span>
              <span>
                <Link href="/conditions/spine" className="text-[#0A50EC] hover:underline font-medium">Back pain, sciatica, and leg numbness</Link> (lumbar spine evaluation and treatment planning)
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-[#0A50EC] mr-3">•</span>
              <span>
                <Link href="/conditions/spine" className="text-[#0A50EC] hover:underline font-medium">Neck pain, pinched nerves, and arm symptoms</Link> (cervical spine evaluation)
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-[#0A50EC] mr-3">•</span>
              <span>
                <Link href="/conditions/knee" className="text-[#0A50EC] hover:underline font-medium">Knee pain, swelling, and instability</Link> (meniscus, cartilage, arthritis evaluation)
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-[#0A50EC] mr-3">•</span>
              <span>
                <Link href="/conditions/shoulder" className="text-[#0A50EC] hover:underline font-medium">Shoulder pain and limited range of motion</Link> (rotator cuff and impingement evaluation)
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-[#0A50EC] mr-3">•</span>
              <span>
                <Link href="/injuries" className="text-[#0A50EC] hover:underline font-medium">Sports injuries and overuse conditions</Link> (return-to-activity planning)
              </span>
            </li>
          </ul>
        </section>

        {/* What to Expect Section */}
        <section className="mb-16 px-6 lg:px-8">
          <h2
            style={{
              fontFamily: 'var(--font-public-sans)',
              fontWeight: 500,
            }}
            className="text-4xl md:text-5xl font-bold text-[#252932] mb-6"
          >
            What to Expect at Your First Visit
          </h2>
          <ul className="space-y-4 text-lg text-[#424959]">
            <li className="flex items-start">
              <span className="text-[#0A50EC] mr-3">•</span>
              <span>A focused exam based on your symptoms, injury history, and goals</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#0A50EC] mr-3">•</span>
              <span>Review of any prior imaging and records (if available)</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#0A50EC] mr-3">•</span>
              <span>If needed, guidance on appropriate imaging to clarify diagnosis</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#0A50EC] mr-3">•</span>
              <span>A personalized plan that may include activity modifications, targeted treatments, or specialist follow-up</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#0A50EC] mr-3">•</span>
              <span>Clear next steps so you know exactly what to do after your appointment</span>
            </li>
          </ul>
        </section>

        {/* Locations FAQs Section */}
        <section 
          className="mb-16 px-6 lg:px-8"
          aria-labelledby="locations-faq-heading"
        >
          <h2 
            id="locations-faq-heading"
            style={{
              fontFamily: 'var(--font-public-sans)',
              fontWeight: 500,
            }}
            className="text-4xl md:text-5xl font-bold text-[#252932] mb-8 text-center"
          >
            Locations FAQ
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem 
                value="item-0"
                className="border-b border-gray-200"
              >
                <AccordionTrigger 
                  className="text-left text-lg font-semibold text-[#252932] hover:text-[#0A50EC]"
                >
                  How do I choose the best location near me?
                </AccordionTrigger>
                <AccordionContent 
                  className="text-[#424959] leading-relaxed pt-2"
                >
                  <p>
                    Choose the closest clinic in your state, then select the office that's most convenient for commuting and scheduling. If you're unsure, call our scheduling team: FL/PA <a href="tel:+15612239959" className="text-[#0A50EC] hover:underline font-medium">(561) 223-9959</a>, NJ <a href="tel:+19732596756" className="text-[#0A50EC] hover:underline font-medium">(973) 259-6756</a>, or NY <a href="tel:+16463895606" className="text-[#0A50EC] hover:underline font-medium">(646) 389-5606</a>, and we'll recommend the best location based on your symptoms and availability.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem 
                value="item-1"
                className="border-b border-gray-200"
              >
                <AccordionTrigger 
                  className="text-left text-lg font-semibold text-[#252932] hover:text-[#0A50EC]"
                >
                  Do you offer same-day or next-day appointments?
                </AccordionTrigger>
                <AccordionContent 
                  className="text-[#424959] leading-relaxed pt-2"
                >
                  <p>
                    Availability varies by location and day, but many offices can accommodate urgent musculoskeletal concerns quickly. Call to check the earliest openings.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem 
                value="item-2"
                className="border-b border-gray-200"
              >
                <AccordionTrigger 
                  className="text-left text-lg font-semibold text-[#252932] hover:text-[#0A50EC]"
                >
                  Do I need a referral to see an orthopedic specialist?
                </AccordionTrigger>
                <AccordionContent 
                  className="text-[#424959] leading-relaxed pt-2"
                >
                  <p>
                    Referral requirements depend on your insurance plan. If you tell us your coverage, we can confirm what's needed before scheduling.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem 
                value="item-3"
                className="border-b border-gray-200"
              >
                <AccordionTrigger 
                  className="text-left text-lg font-semibold text-[#252932] hover:text-[#0A50EC]"
                >
                  What conditions do you treat at your locations?
                </AccordionTrigger>
                <AccordionContent 
                  className="text-[#424959] leading-relaxed pt-2"
                >
                  <p>
                    Our clinics commonly evaluate back pain, neck pain, sciatica, herniated discs, arthritis, joint injuries, and sports-related injuries. Your location page also lists local services and common conditions treated.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem 
                value="item-4"
                className="border-b border-gray-200"
              >
                <AccordionTrigger 
                  className="text-left text-lg font-semibold text-[#252932] hover:text-[#0A50EC]"
                >
                  What should I bring to my appointment?
                </AccordionTrigger>
                <AccordionContent 
                  className="text-[#424959] leading-relaxed pt-2"
                >
                  <p>
                    Bring your ID, insurance card, a list of medications, and any imaging reports or prior medical records related to your symptoms.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-[#E0F5FF] to-[#F8FAFC] rounded-3xl p-8 md:p-12 border border-white/50 shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0A50EC] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#252932] mb-2">Extended Hours</h3>
              <p className="text-[#424959]">Open 7 days a week until 8 PM for your convenience</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#0A50EC] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#252932] mb-2">State Phone Numbers</h3>
              <p className="text-[#424959] text-sm">FL/PA: <a href="tel:+15612239959" className="text-[#0A50EC] hover:underline">(561) 223-9959</a> · NJ: <a href="tel:+19732596756" className="text-[#0A50EC] hover:underline">(973) 259-6756</a> · NY: <a href="tel:+16463895606" className="text-[#0A50EC] hover:underline">(646) 389-5606</a></p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#0A50EC] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#252932] mb-2">{clinics.length} Locations</h3>
              <p className="text-[#424959]">Serving communities across FL, NJ, NY & PA</p>
            </div>
          </div>
        </motion.div>
        </div>
      </div>
    </main>
  )
} 
