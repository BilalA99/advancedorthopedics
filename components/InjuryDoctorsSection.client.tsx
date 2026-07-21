'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import type { DoctorProp } from '@/components/data/doctors'
import DoctorCard from '@/components/DoctorCard'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
    type CarouselApi,
} from '@/components/ui/carousel'

export default function InjuryDoctorsSection({ doctors }: { doctors: DoctorProp[] }) {
    const [hasMounted, setHasMounted] = useState(false)
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        setHasMounted(true)
        const update = () => setDimensions({ width: window.innerWidth, height: window.innerHeight })
        update()
        window.addEventListener('resize', update)
        return () => window.removeEventListener('resize', update)
    }, [])

    useEffect(() => {
        if (!api) return
        api.on('select', () => setCurrent(api.selectedScrollSnap()))
    }, [api])

    const featuredDoctors = doctors.slice(0, 3)

    return (
        <section className="w-full flex flex-col py-[50px] h-full px-[40px]">
            <div className="flex md:flex-row flex-col mb-6">
                <div className="flex flex-col space-y-[24px] md:w-[50%] w-full">
                    <h2 style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }} className="text-black text-5xl text-left w-full">
                        Meet Our Experts
                    </h2>
                    <p style={{ fontFamily: "var(--font-inter)", fontWeight: 400 }} className="text-[#54535C] md:w-[50%] w-full">
                        Highly skilled and compassionate professionals ready to care for you
                    </p>
                </div>
                <div className="md:w-[50%] flex items-center md:justify-end w-full md:mt-0 mt-4">
                    <Link href={'/about/meetourdoctors'} className="bg-white border hover:cursor-pointer border-[#252932] px-[20px] py-[10px] space-x-[10px] flex flex-row items-center justify-center rounded-[62px]">
                        <span style={{ fontFamily: "var(--font-inter)", fontWeight: 400 }} className="text-[#252932]">View all</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="11" viewBox="0 0 18 11" fill="none">
                            <path d="M12.3982 0.268483C12.0402 -0.0894963 11.4598 -0.089494 11.1018 0.268488C10.7438 0.62647 10.7438 1.20687 11.1018 1.56485L14.1203 4.58333H1.66667C1.16041 4.58333 0.75 4.99374 0.75 5.5C0.75 6.00626 1.16041 6.41667 1.66667 6.41667H14.1203L11.1018 9.43516C10.7439 9.79314 10.7439 10.3735 11.1019 10.7315C11.4598 11.0895 12.0402 11.0895 12.3982 10.7315L16.9766 6.15303C16.9935 6.13637 17.0098 6.11905 17.0254 6.10112C17.0873 6.02997 17.1365 5.95154 17.1728 5.86885C17.2221 5.75677 17.2496 5.63294 17.25 5.50273L17.25 5.5C17.25 5.49717 17.25 5.49434 17.25 5.49152C17.2489 5.37622 17.2266 5.26602 17.1867 5.16463C17.142 5.05068 17.0736 4.94387 16.9815 4.85178L12.3982 0.268483Z" fill="#252932" />
                        </svg>
                    </Link>
                </div>
            </div>

            <div className="w-full">
                {/* Mobile Carousel - Only visible on mobile */}
                <div className="block md:hidden">
                    {hasMounted && dimensions.width > 0 && (
                        <div className="w-full">
                            <Carousel setApi={setApi} className="w-full" opts={{ align: 'center', dragFree: false, containScroll: 'trimSnaps' }}>
                                <CarouselContent>
                                    {featuredDoctors.map((doc, index) => (
                                        <CarouselItem key={doc.name + index} className="basis-full py-4">
                                            <DoctorCard doctor={doc} />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>

                                {/* Inline Controls (arrows + indicators at same level) */}
                                <div className="mt-4 flex items-center justify-center gap-3">
                                    <CarouselPrevious className="translate-x-0 translate-y-0 relative bg-white/90 backdrop-blur-sm border border-[#0A50EC]/20 hover:bg-white hover:shadow-xl transition-all duration-300 w-8 h-8" />
                                    <div className="flex items-center gap-2">
                                        {featuredDoctors.map((_, index) => (
                                            <motion.button
                                                key={index}
                                                onClick={() => api?.scrollTo(index)}
                                                className={`h-2 rounded-full transition-all duration-300 ${index === current ? 'bg-[#0A50EC] w-6' : 'bg-[#0A50EC]/30 w-2 hover:bg-[#0A50EC]/50'}`}
                                                whileTap={{ scale: 0.9 }}
                                            />
                                        ))}
                                    </div>
                                    <CarouselNext className="translate-x-0 translate-y-0 relative bg-white/90 backdrop-blur-sm border border-[#0A50EC]/20 hover:bg-white hover:shadow-xl transition-all duration-300 w-8 h-8" />
                                </div>
                            </Carousel>
                        </div>
                    )}
                </div>

                {/* Desktop Grid - Only visible on desktop */}
                <div className="hidden md:grid xl:grid-cols-3 items-stretch grid-cols-2 gap-[32px]">
                    {featuredDoctors.map((doc) => (
                        <DoctorCard key={doc.name} doctor={doc} />
                    ))}
                </div>
            </div>
        </section>
    )
}
