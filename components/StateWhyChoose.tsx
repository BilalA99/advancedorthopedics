'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Award, Shield, Stethoscope, Zap } from 'lucide-react';

interface StateWhyChooseProps {
  stateName: string;
}

export default function StateWhyChoose({ stateName }: StateWhyChooseProps) {
  const benefits = [
    {
      icon: Award,
      title: 'Board-Certified Surgeons',
      desc: 'Our fellowship-trained specialists represent the top tier of orthopedic and spine surgical expertise.',
    },
    {
      icon: Clock,
      title: 'Same-Day Appointments',
      desc: `We prioritize acute injuries and chronic pain with flexible scheduling across our ${stateName} locations.`,
    },
    {
      icon: Shield,
      title: 'Minimally Invasive Focus',
      desc: 'Advanced surgical techniques designed for smaller incisions, less pain, and faster recovery times.',
    },
    {
      icon: Stethoscope,
      title: 'Personalized Care Plans',
      desc: 'Every treatment path is tailored to your specific diagnosis, lifestyle, and recovery goals.',
    },
    {
      icon: Zap,
      title: 'Cutting-Edge Technology',
      desc: 'Utilizing the latest in diagnostic imaging and surgical robotics for superior precision.',
    },
    {
      icon: CheckCircle,
      title: 'PPO & Workers\' Comp',
      desc: 'We work with most major PPO insurance plans and handle Workers\' Compensation claims efficiently.',
    },
  ];

  return (
    <section className="w-full py-10 sm:py-14 md:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 
            style={{ fontFamily: "var(--font-public-sans)" }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#252932] mb-4 sm:mb-6"
          >
            Why Choose Us for Orthopedic Care in {stateName}
          </h2>
          <p 
            style={{ fontFamily: "var(--font-public-sans)" }}
            className="text-base sm:text-lg md:text-xl text-[#424959] max-w-3xl mx-auto leading-relaxed"
          >
            Mountain Spine & Orthopedics brings specialist musculoskeletal care to your local community, combining fellowship-trained surgical skill with a patient-first approach.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#FAFAFA] p-5 sm:p-6 md:p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="bg-[#0A50EC]/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <benefit.icon className="w-6 h-6 text-[#0A50EC]" />
              </div>
              <h3 
                style={{ fontFamily: "var(--font-public-sans)" }}
                className="text-xl font-bold text-[#252932] mb-4"
              >
                {benefit.title}
              </h3>
              <p 
                style={{ fontFamily: "var(--font-inter)" }}
                className="text-[#424959] leading-relaxed"
              >
                {benefit.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
