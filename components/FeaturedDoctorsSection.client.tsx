'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
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

export default function FeaturedDoctorsSection({ doctors }: { doctors: DoctorProp[] }) {
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

    const items = doctors.slice(0, 3)

    return (
        <div className="w-full">
            {/* Mobile Carousel - Only visible on mobile */}
            <div className="block md:hidden">
                {hasMounted && dimensions.width > 0 && (
                    <div className="w-full">
                        <Carousel setApi={setApi} className="w-full" opts={{ align: 'center', dragFree: false, containScroll: 'trimSnaps' }}>
                            <CarouselContent>
                                {items.map((doc, index) => (
                                    <CarouselItem key={doc.name + index} className="basis-full py-4">
                                        <DoctorCard doctor={doc} />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>

                            {/* Inline Controls (arrows + indicators at same level) */}
                            <div className="mt-4 flex items-center justify-center gap-3">
                                <CarouselPrevious className="static translate-x-0 translate-y-0 relative bg-white/90 backdrop-blur-sm border border-[#0A50EC]/20 hover:bg-white hover:shadow-xl transition-all duration-300 w-8 h-8" />
                                <div className="flex items-center gap-2">
                                    {items.map((_, index) => (
                                        <motion.button
                                            key={index}
                                            onClick={() => api?.scrollTo(index)}
                                            className={`h-2 rounded-full transition-all duration-300 ${index === current ? 'bg-[#0A50EC] w-6' : 'bg-[#0A50EC]/30 w-2 hover:bg-[#0A50EC]/50'}`}
                                            whileTap={{ scale: 0.9 }}
                                        />
                                    ))}
                                </div>
                                <CarouselNext className="static translate-x-0 translate-y-0 relative bg-white/90 backdrop-blur-sm border border-[#0A50EC]/20 hover:bg-white hover:shadow-xl transition-all duration-300 w-8 h-8" />
                            </div>
                        </Carousel>
                    </div>
                )}
            </div>

            {/* Desktop Grid - Only visible on desktop */}
            <div className="hidden md:grid xl:grid-cols-3 items-stretch grid-cols-2 gap-[32px]">
                {items.map((doc) => (
                    <DoctorCard key={doc.name} doctor={doc} />
                ))}
            </div>
        </div>
    )
}
