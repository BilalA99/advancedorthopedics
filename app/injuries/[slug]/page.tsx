import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { injuries } from '@/components/data/injuries';
import { ConsultationForm } from '@/components/ContactForm';
import { getVisibleProviders } from '@/lib/providers/providerVisibility';
import DoctorCard from '@/components/DoctorCard';
import Link from 'next/link';
import Logo from '@/public/newlogo4.png';

// Generate static params for all injuries
export async function generateStaticParams() {
  return injuries.map(injury => ({
    slug: injury.slug,
  }));
}

export default async function InjuryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const injury = injuries.find(i => i.slug === slug);
  
  if (!injury) {
    notFound();
  }

  // Randomly select 2 doctors for display
  const shuffledDoctors = [...getVisibleProviders()].sort(() => Math.random() - 0.5);
  const selectedDoctors = shuffledDoctors.slice(0, 2);

  return (
    <div className="w-full flex flex-col">
      {/* Hero Section */}
      <div className="relative w-full bg-gradient-to-br from-[#0A50EC] to-[#1E3A8A] py-16 sm:py-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 space-y-6">
              <h1 
                style={{ fontFamily: "var(--font-public-sans)", fontWeight: 600 }}
                className="text-white text-4xl sm:text-5xl lg:text-6xl"
              >
                {injury.title}
              </h1>
              <p 
                style={{ fontFamily: "var(--font-inter)", fontWeight: 400 }}
                className="text-white/90 text-lg sm:text-xl max-w-2xl"
              >
                {injury.body}
              </p>
            </div>
            {injury.card_img && (
              <div className="flex-shrink-0 w-full lg:w-96 h-64 relative rounded-2xl overflow-hidden shadow-xl">
                <Image 
                  src={injury.card_img || Logo}
                  alt={injury.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            {injury.detail && (
              <div className="space-y-4">
                <h2 
                  style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }}
                  className="text-[#111315] text-3xl sm:text-4xl"
                >
                  Overview
                </h2>
                <div 
                  style={{ fontFamily: "var(--font-inter)", fontWeight: 400 }}
                  className="text-[#60646C] text-lg leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: injury.detail }}
                />
              </div>
            )}

            {/* What We Evaluate */}
            {injury.what_we_evaluate && (
              <div className="space-y-4">
                <h2 
                  style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }}
                  className="text-[#111315] text-3xl sm:text-4xl"
                >
                  What We Evaluate
                </h2>
                <div 
                  style={{ fontFamily: "var(--font-inter)", fontWeight: 400 }}
                  className="text-[#60646C] text-lg leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: injury.what_we_evaluate }}
                />
              </div>
            )}

            {/* Common Injuries */}
            {injury.common_injuries && (
              <div className="space-y-4">
                <h2 
                  style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }}
                  className="text-[#111315] text-3xl sm:text-4xl"
                >
                  Common Injuries
                </h2>
                <div 
                  style={{ fontFamily: "var(--font-inter)", fontWeight: 400 }}
                  className="text-[#60646C] text-lg leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: injury.common_injuries }}
                />
              </div>
            )}

            {/* When to Seek Care */}
            {injury.when_to_seek && (
              <div className="space-y-4">
                <h2 
                  style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }}
                  className="text-[#111315] text-3xl sm:text-4xl"
                >
                  When to Seek Care
                </h2>
                <div 
                  style={{ fontFamily: "var(--font-inter)", fontWeight: 400 }}
                  className="text-[#60646C] text-lg leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: injury.when_to_seek }}
                />
              </div>
            )}

            {/* Schedule */}
            {injury.schedule && (
              <div className="bg-[#FAFAFA] rounded-2xl p-6 sm:p-8">
                <div 
                  style={{ fontFamily: "var(--font-inter)", fontWeight: 400 }}
                  className="text-[#60646C] text-lg leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: injury.schedule }}
                />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Consultation Form */}
            <div className="sticky top-4">
              <ConsultationForm />
            </div>

            {/* Featured Doctors */}
            <div className="space-y-4">
              <h3 
                style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }}
                className="text-[#111315] text-2xl"
              >
                Our Specialists
              </h3>
              <div className="space-y-4">
                {selectedDoctors.map((doctor, index) => (
                  <DoctorCard key={index} doctor={doctor} />
                ))}
              </div>
              <Link 
                href="/about/meetourdoctors"
                className="block text-center py-3 px-6 bg-[#0A50EC] text-white rounded-lg hover:bg-[#0940C0] transition-colors"
                style={{ fontFamily: "var(--font-inter)", fontWeight: 500 }}
              >
                View All Doctors
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
