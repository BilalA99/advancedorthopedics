'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Calendar, Shield, Zap } from 'lucide-react';
import BookAnAppoitmentButton from './BookAnAppoitmentButton';
import { pushPhoneClickEvent } from '@/utils/enhancedConversions';

interface StateCTAProps {
  stateName: string;
  phoneNumber: string;
  phoneNumberRaw: string;
}

const trustItems = [
  { icon: Zap, label: 'Same-day appointments' },
  { icon: Shield, label: 'Board-certified surgeons' },
  { icon: Calendar, label: 'Most insurance accepted' },
];

export default function StateCTA({ stateName, phoneNumber, phoneNumberRaw }: StateCTAProps) {
  return (
    <section className="w-full relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-[#0A50EC] via-[#0A50EC] to-[#0840C0] overflow-hidden">
      {/* Subtle pattern overlay for depth */}
      <div 
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />
      {/* Soft gradient orbs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-3xl translate-y-1/2" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center"
        >
          {/* Trust badges - compact on mobile */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-6 sm:mb-8"
          >
            {trustItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-white/90">
                <item.icon className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm sm:text-base font-medium">{item.label}</span>
              </div>
            ))}
          </motion.div>

          <h2 
            style={{ fontFamily: "var(--font-public-sans)" }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-3xl mx-auto"
          >
            Ready to Start Your Recovery in {stateName}?
          </h2>
          <p 
            style={{ fontFamily: "var(--font-public-sans)" }}
            className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto mt-4 sm:mt-5"
          >
            Schedule a same-day consultation with our fellowship-trained specialists and reclaim your active lifestyle today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 w-full max-w-xl mx-auto mt-8 sm:mt-10">
            <motion.div 
              className="w-full sm:w-auto"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <BookAnAppoitmentButton 
              bordered
              className="w-full sm:w-auto !bg-white !text-[#0A50EC] hover:!bg-gray-100 py-5 sm:py-6 px-8 sm:px-10 text-lg sm:text-xl font-bold rounded-2xl shadow-xl transition-all border-2 border-white/20" />
            </motion.div>

            <div className="flex flex-col items-center sm:items-center text-white group">
              <span className="text-xs sm:text-sm font-medium text-white/80 uppercase tracking-wider mb-1">Call Our {stateName} Office</span>
              <a 
                href={`tel:+1${phoneNumberRaw}`}
                className="text-2xl font-bold flex items-center gap-3 hover:text-white transition-all border-b-2 border-white/40 group-hover:border-white pb-1"
                onClick={() => {
                  pushPhoneClickEvent({
                    location: `StateCTA-${stateName}`,
                    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
                  });
                }}
              >
                <Phone className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0" />
                {phoneNumber}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
