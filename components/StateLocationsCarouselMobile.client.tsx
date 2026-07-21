'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from '@/components/ui/carousel';
import type { ClinicsMapSafeProps } from '@/components/data/clinicsForMap.generated';
import StateLocationCard from '@/components/StateLocationCard';

interface StateLocationsCarouselMobileProps {
  stateClinics: ClinicsMapSafeProps[];
  stateInfo: { name?: string } | undefined;
  phoneDisplay: string;
  phoneTel: string;
}

/**
 * Isolated client component for the mobile locations carousel.
 * Owns carousel api/current state so that swiping does not re-render the parent
 * and retrigger the hero TextAnimate animation.
 */
export default function StateLocationsCarouselMobile({
  stateClinics,
  stateInfo,
  phoneDisplay,
  phoneTel,
}: StateLocationsCarouselMobileProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!api) return;
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="block md:hidden mb-16 w-full min-w-0 overflow-hidden">
      <div className="w-full min-w-0">
        <Carousel
          setApi={setApi}
          className="w-full min-w-0"
          opts={{ align: 'center', containScroll: 'trimSnaps' }}
        >
          <CarouselContent className="min-w-0">
            {stateClinics.map((clinic, index) => (
              <CarouselItem key={index} className="basis-full min-w-0 py-6">
                <StateLocationCard clinic={clinic} index={index} isMobile stateInfo={stateInfo} phoneDisplay={phoneDisplay} phoneTel={phoneTel} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-white/90 backdrop-blur-sm border border-[#0A50EC]/20 hover:bg-white hover:shadow-xl transition-all duration-300 absolute -left-5 top-1/2 -translate-y-1/2" />
          <CarouselNext className="bg-white/90 backdrop-blur-sm border border-[#0A50EC]/20 hover:bg-white hover:shadow-xl transition-all duration-300 absolute -right-5 top-1/2 -translate-y-1/2" />
        </Carousel>
        {hasMounted && (
          <div className="flex justify-center mt-6 space-x-2">
            {stateClinics.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === current ? 'bg-[#0A50EC] w-6' : 'bg-[#0A50EC]/30 hover:bg-[#0A50EC]/50'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
