import React from 'react';
import type { ClinicsProps } from '@/components/data/clinics';
import LocationGallerySlideshow from '@/components/LocationGallerySlideshow.client';
import BookAnAppoitmentButton from '@/components/BookAnAppoitmentButton';
import TrackedOutboundLink from '@/components/TrackedOutboundLink';

interface LocationGallerySectionProps {
  clinic: ClinicsProps;
  city: string;
  stateAbbr: string;
  stateSlug: string;
  locationUrl: string;
}

export default function LocationGallerySection({
  clinic,
  city,
  stateAbbr,
  stateSlug,
}: LocationGallerySectionProps) {
  if (!clinic.gallery || clinic.gallery.length < 1) {
    return null;
  }

  const directionsUrl =
    clinic.placeUrl ||
    clinic.link ||
    (clinic.address
      ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(clinic.address)}`
      : `https://www.google.com/maps/dir/?api=1&destination=${clinic.lat},${clinic.lng}`);

  const intro =
    clinic.galleryIntro ||
    `View photos of our orthopedic and spine clinic in ${city}, ${stateAbbr}. See our facility and the care environment where we provide back pain, neck pain, and joint treatment for patients near ${city}.`;

  return (
    <section
      className="w-full flex flex-col py-[50px] px-2 md:px-[40px] max-w-[1440px] mx-auto"
      aria-label="Location photo gallery"
    >
      <h2
        style={{ fontFamily: 'var(--font-public-sans)' }}
        className="text-3xl md:text-4xl font-[500] text-[#111315] mb-4"
      >
        Photo Gallery: Mountain Spine & Orthopedics in {city}, {stateAbbr}
      </h2>

      <p
        style={{ fontFamily: 'var(--font-public-sans)' }}
        className="text-lg text-[#424959] mb-8 max-w-3xl"
      >
        {intro}
      </p>

      <div className="mb-10">
        <LocationGallerySlideshow images={clinic.gallery} />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <TrackedOutboundLink
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          eventName="directions_click"
          eventParams={{
            location_name: clinic.name,
            location_state: stateSlug,
          }}
          className="h-full max-h-[56px] group flex flex-row items-center justify-center hover:cursor-pointer px-[24px] py-[16px] rounded-[62px] bg-[#E5E7EB] text-[#252932] w-fit font-[500] text-[14px] hover:bg-[#D1D5DB] transition-colors min-h-[44px]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2 flex-shrink-0">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span style={{ fontFamily: 'var(--font-public-sans)' }}>Get Directions</span>
        </TrackedOutboundLink>
        <a
          href={`tel:+1${clinic.phone?.replace(/\D/g, '') || '5612239959'}`}
          className="h-full max-h-[56px] flex flex-row items-center justify-center px-[24px] py-[16px] rounded-[62px] bg-[#E5E7EB] text-[#252932] w-fit font-[500] text-[14px] hover:bg-[#D1D5DB] transition-colors min-h-[44px]"
          style={{ fontFamily: 'var(--font-public-sans)' }}
        >
          Call
        </a>
        <div className="min-h-[44px]">
          <BookAnAppoitmentButton />
        </div>
      </div>
    </section>
  );
}
