'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, Building2 } from 'lucide-react'
import { clinicsForMap as clinics } from '@/components/data/clinicsForMap.generated'
import ClinicsMap from '@/components/ClinicsMap'
import { TextAnimate } from '@/components/magicui/text-animate'
import Link from 'next/link'
import { LOCATION_HOURS_DISPLAY, MAIN_PHONE_DISPLAY, MAIN_PHONE_TEL, STATE_PHONE_NUMBERS } from '@/lib/locationConstants'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
    type CarouselApi,
} from "@/components/ui/carousel"
export default function LocationsPicker() {
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
                        <a
                            href={`tel:+1${statePhone.tel}`}
                            className="text-[#252932] font-medium hover:text-[#0A50EC] transition-colors duration-300"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {statePhone.display}
                        </a>
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

                {/* Stretched Link - This makes the whole card clickable without nesting <a> tags */}
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
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-16">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-6xl font-bold text-[#252932] my-6">
                    Our Locations
                </h2>
                <p className="text-lg md:text-xl text-[#424959] max-w-3xl mx-auto">
                    Visit any of our state-of-the-art facilities across Florida, New Jersey, New York, Pennsylvania, and Georgia for expert orthopedic care and personalized treatment.
                </p>
            </motion.div>

            {/* Mobile Carousel - Only visible on mobile */}
            <div className="block md:hidden mb-16">
                {hasMounted && dimensions.width > 0 && (
                    <div className="w-full">
                        <Carousel
                            setApi={setApi}
                            className="w-full"
                            opts={{
                                align: "center",
                                containScroll: "trimSnaps",
                            }}
                        >
                            <CarouselContent>
                                {clinics.map((clinic, index) => (
                                    <CarouselItem key={index} className="basis-full py-6">
                                        <LocationCard clinic={clinic} index={index} isMobile={true} />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="bg-white/90 backdrop-blur-sm border border-[#0A50EC]/20 hover:bg-white hover:shadow-xl transition-all duration-300 absolute sm:-left- left-0  top-1/2 -translate-y-1/2" />
                            <CarouselNext className="bg-white/90 backdrop-blur-sm border border-[#0A50EC]/20 hover:bg-white hover:shadow-xl transition-all duration-300 absolute sm:-right-5 right-0 top-1/2 -translate-y-1/2" />
                        </Carousel>

                        {/* Dynamic Progress Indicators */}
                        <div className="flex justify-center mt-6 space-x-2">
                            {clinics.map((_, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => api?.scrollTo(index)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === current
                                        ? 'bg-[#0A50EC] w-6'
                                        : 'bg-[#0A50EC]/30 hover:bg-[#0A50EC]/50'
                                        }`}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Desktop Bento Box Grid - Only visible on desktop */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 px-6 lg:px-8"
            >
                {clinics.map((clinic, index) => (
                    <LocationCard key={index} clinic={clinic} index={index} />
                ))}
            </motion.div>

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
                        <p className="text-[#424959] text-sm">FL: <a href="tel:+15612239959" className="text-[#0A50EC] hover:underline">(561) 223-9959</a> · NJ: <a href="tel:+19732596756" className="text-[#0A50EC] hover:underline">(973) 259-6756</a> · NY: <a href="tel:+16463895606" className="text-[#0A50EC] hover:underline">(646) 389-5606</a> · PA: <a href="tel:+12154369496" className="text-[#0A50EC] hover:underline">(215) 436-9496</a> · GA: <a href="tel:+14049136886" className="text-[#0A50EC] hover:underline">(404) 913-6886</a></p>
                    </div>

                    <div className="text-center">
                        <div className="w-16 h-16 bg-[#0A50EC] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <MapPin className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-[#252932] mb-2">Multiple Locations</h3>
                        <p className="text-[#424959]">Serving communities across Florida</p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}