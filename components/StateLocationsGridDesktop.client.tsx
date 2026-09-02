'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { ClinicsMapSafeProps } from '@/components/data/clinicsForMap.generated';
import StateLocationCard from '@/components/StateLocationCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

interface StateLocationsGridDesktopProps {
  stateClinics: ClinicsMapSafeProps[];
  stateInfo: { name?: string } | undefined;
  phoneDisplay?: string;
  phoneTel?: string;
}

/**
 * Desktop locations grid. Owns hover state so that hovering cards does not
 * re-render the parent page and retrigger the hero header animation.
 */
export default function StateLocationsGridDesktop({
  stateClinics,
  stateInfo,
  phoneDisplay,
  phoneTel,
}: StateLocationsGridDesktopProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      // A state with a single office (Georgia, New York) rendered one card in the
      // left third of a 3-column grid with two empty columns beside it, which
      // reads as a broken layout rather than a deliberate one. Below three
      // clinics, drop to a centred, width-capped track so the row looks composed.
      className={`hidden md:grid gap-6 mb-16 ${
        stateClinics.length === 1
          ? 'md:grid-cols-1 max-w-[560px] mx-auto'
          : stateClinics.length === 2
            ? 'md:grid-cols-2 max-w-[840px] mx-auto'
            : 'md:grid-cols-2 lg:grid-cols-3'
      }`}
    >
      {stateClinics.map((clinic, index) => (
        <StateLocationCard
          key={index}
          clinic={clinic}
          index={index}
          isMobile={false}
          stateInfo={stateInfo}
          hoveredIndex={hoveredIndex}
          onHoverStart={() => setHoveredIndex(index)}
          onHoverEnd={() => setHoveredIndex(null)}
          phoneDisplay={phoneDisplay}
          phoneTel={phoneTel}
        />
      ))}
    </motion.div>
  );
}
