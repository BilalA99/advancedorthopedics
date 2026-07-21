'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Building2 } from 'lucide-react';
import Link from 'next/link';
import type { ClinicsMapSafeProps } from '@/components/data/clinicsForMap.generated';
import { MAIN_PHONE_DISPLAY, MAIN_PHONE_TEL, LOCATION_HOURS_DISPLAY } from '@/lib/locationConstants';

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: { duration: 0.3, ease: 'easeOut' as const },
  },
};

interface StateLocationCardProps {
  clinic: ClinicsMapSafeProps;
  index: number;
  isMobile?: boolean;
  stateInfo: { name?: string } | undefined;
  hoveredIndex?: number | null;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  phoneDisplay?: string;
  phoneTel?: string;
}

export default function StateLocationCard({
  clinic,
  index,
  isMobile = false,
  stateInfo,
  hoveredIndex = null,
  onHoverStart,
  onHoverEnd,
  phoneDisplay,
  phoneTel,
}: StateLocationCardProps) {
  const displayPhone = phoneDisplay ?? MAIN_PHONE_DISPLAY;
  const telPhone = phoneTel ?? MAIN_PHONE_TEL;
  return (
    <article
      className="group cursor-pointer h-full relative min-w-0 w-full"
      itemScope
      itemType="https://schema.org/MedicalBusiness"
    >
      <motion.div
        variants={isMobile ? undefined : itemVariants}
        initial={isMobile ? undefined : 'hidden'}
        animate={isMobile ? undefined : 'visible'}
        whileHover={isMobile ? undefined : 'hover'}
        onHoverStart={isMobile ? undefined : onHoverStart}
        onHoverEnd={isMobile ? undefined : onHoverEnd}
        className="relative h-full min-w-0 w-full bg-gradient-to-br from-[#E0F5FF] to-[#F8FAFC] rounded-3xl p-6 border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 right-4 w-16 h-16 bg-[#0A50EC] rounded-full" />
          <div className="absolute bottom-4 left-4 w-12 h-12 bg-[#252932] rounded-full" />
        </div>

        <div className="relative z-10 h-full flex flex-col min-w-0">
          <div className="flex items-center justify-between gap-2 mb-6 min-w-0">
            <motion.div
              animate={!isMobile && hoveredIndex === index ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 0.6 }}
              className="w-12 h-12 flex-shrink-0 bg-[#0A50EC] rounded-2xl flex items-center justify-center shadow-lg"
            >
              <Building2 className="w-6 h-6 text-white" />
            </motion.div>
            <div className="text-right min-w-0 flex-shrink">
              <span className="text-sm font-medium text-[#0A50EC] bg-white/80 px-3 py-1 rounded-full break-words inline-block max-w-full">
                {clinic.region ? clinic.region.split(',')[0].trim() : (stateInfo?.name || 'Location')}
              </span>
            </div>
          </div>

          <h3
            className="text-lg sm:text-2xl font-bold text-[#252932] mb-4 group-hover:text-[#0A50EC] transition-colors duration-300 break-words"
            itemProp="name"
          >
            {clinic.name}
          </h3>

          <div className="flex items-start space-x-3 mb-4 min-w-0" itemScope itemType="https://schema.org/PostalAddress">
            <MapPin className="w-5 h-5 text-[#0A50EC] mt-0.5 flex-shrink-0" aria-hidden="true" />
            <address
              className="text-[#424959] text-sm leading-relaxed not-italic break-words min-w-0"
              itemProp="streetAddress"
            >
              {clinic.address || '123 Medical Center Dr, Suite 100'}
            </address>
          </div>

          <div className="flex items-center space-x-3 mb-4 relative z-20">
            <Phone className="w-5 h-5 text-[#0A50EC] flex-shrink-0" aria-hidden="true" />
            <a
              href={`tel:+1${telPhone}`}
              className="text-[#252932] font-medium hover:text-[#0A50EC] transition-colors duration-300"
              itemProp="telephone"
              onClick={(e) => e.stopPropagation()}
            >
              {displayPhone}
            </a>
          </div>

          <div className="flex items-start space-x-3 mb-6">
            <Clock className="w-5 h-5 text-[#0A50EC] mt-0.5 flex-shrink-0" aria-hidden="true" />
            <div className="text-[#424959] text-sm">
              <p className="font-medium">Hours: {LOCATION_HOURS_DISPLAY}</p>
            </div>
          </div>
        </div>

        <Link
          href={`/locations/${clinic.stateSlug}/${clinic.locationSlug}`}
          className="absolute inset-0 z-10"
          aria-label={`View details for ${clinic.name}`}
        />

        <div className="absolute inset-0 bg-gradient-to-br from-[#0A50EC]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
      </motion.div>
    </article>
  );
}
