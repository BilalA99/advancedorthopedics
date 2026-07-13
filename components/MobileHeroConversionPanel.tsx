'use client';

import React from 'react';
import MobileHeroMiniForm from '@/components/MobileHeroMiniForm';
import { pushPhoneClickEvent } from '@/utils/enhancedConversions';

interface MobileHeroConversionPanelProps {
  pageType: 'homepage' | 'location' | 'state';
  phone: string;
  phoneTel: string;
  cityName?: string;
  locationName?: string;
  locationSlug?: string;
  stateName?: string;
  timePeriod?: string;
  defaultState?: string;
}

export default function MobileHeroConversionPanel({
  pageType,
  phone,
  phoneTel,
  cityName,
  locationName,
  locationSlug,
  stateName,
  timePeriod = 'day',
  defaultState = '',
}: MobileHeroConversionPanelProps) {
  const isNight = timePeriod === 'night';
  const callLabel = pageType === 'location' && cityName
    ? `Call ${cityName} Office`
    : 'Call Now';

  const handleCallClick = () => {
    // Primary event stays page-type-specific for segmentation; pushPhoneClickEvent
    // also fires the legacy sitewide 'call_click' alias so existing GTM triggers
    // that expect a call event on every phone tap (not just non-location pages)
    // keep firing.
    pushPhoneClickEvent(
      {
        location_name: pageType === 'location' ? locationName : undefined,
        location_slug: pageType === 'location' ? locationSlug : undefined,
        state_name: pageType === 'state' ? stateName : undefined,
        page_path: typeof window !== 'undefined' ? window.location.pathname : '',
        cta_position: 'mobile_hero_top_fold',
      },
      pageType === 'location' ? 'location_phone_click' : 'phone_click'
    );
  };

  return (
    <div className="w-full space-y-3">
      {/* Mini Form — always visible, above the call button */}
      <MobileHeroMiniForm
        pageType={pageType}
        cityName={cityName}
        stateName={stateName}
        defaultState={defaultState}
      />

      {/* Divider */}
      <div className="flex items-center gap-2">
        <div className={`flex-1 h-px ${isNight ? 'bg-white/20' : 'bg-white/40'}`} />
        <span className={`text-xs font-medium ${isNight ? 'text-white/60' : 'text-[#252932]/50'}`}>or</span>
        <div className={`flex-1 h-px ${isNight ? 'bg-white/20' : 'bg-white/40'}`} />
      </div>

      {/* Phone CTA — lower = thumb zone, higher tap rate */}
      <a
        href={phoneTel}
        aria-label={`${callLabel} at ${phone}`}
        data-cta="mobile-hero-phone"
        data-cta-position="mobile_hero_top_fold"
        onClick={handleCallClick}
        className="flex w-full items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#0A50EC] text-white font-bold text-[15px] shadow-md min-h-[52px] active:scale-[0.98] transition-transform"
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 18 18"
          fill="none"
          className="flex-shrink-0"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.3852 0.0666578C11.0536 -0.0290477 10.7071 0.162219 10.6114 0.493864C10.5157 0.825509 10.707 1.17194 11.0386 1.26765C13.78 2.05874 15.9419 4.22057 16.7331 6.96182C16.8288 7.29347 17.1752 7.48472 17.5069 7.389C17.8385 7.29328 18.0298 6.94684 17.9341 6.6152C17.0238 3.46127 14.5392 0.976833 11.3852 0.0666578ZM10.9112 4.11842C10.5935 3.9835 10.2266 4.13169 10.0916 4.4494C9.95671 4.76712 10.1049 5.13406 10.4226 5.26898C11.4596 5.70934 12.2914 6.54113 12.7318 7.57812C12.8667 7.89584 13.2336 8.04402 13.5514 7.9091C13.8691 7.77417 14.0173 7.40724 13.8823 7.08952C13.3154 5.75446 12.2463 4.68536 10.9112 4.11842ZM4.51311 0.906545C4.27945 0.487351 3.90337 0.170069 3.43113 0.0724652C2.95397 -0.0261574 2.47434 0.119319 2.08015 0.440604C0.649844 1.60636 -0.260852 3.47409 0.134395 5.43344C0.377348 6.63783 0.78211 7.82615 1.60638 9.26341C3.2606 12.1479 5.84983 14.7385 8.73763 16.3947C10.1749 17.2189 11.3632 17.6237 12.5676 17.8666C14.5269 18.2619 16.3947 17.3512 17.5604 15.9209C17.8817 15.5267 18.0272 15.0471 17.9286 14.5699C17.831 14.0977 17.5137 13.7216 17.0945 13.4879L15.7591 12.7436C15.2673 12.4694 14.8534 12.2387 14.4936 12.088C14.1119 11.9282 13.7355 11.8332 13.3194 11.8766C12.9032 11.92 12.5545 12.0906 12.2141 12.3257C11.8931 12.5474 11.5357 12.8585 11.111 13.2283L8.97846 15.0848C6.56267 13.611 4.38855 11.4359 2.91618 9.02257L4.77273 6.89005C5.14248 6.46536 5.45365 6.10797 5.67532 5.78698C5.91047 5.44649 6.08101 5.0978 6.12441 4.68166C6.1678 4.26553 6.07287 3.88915 5.91303 3.50747C5.76236 3.14766 5.53163 2.73376 5.25746 2.24192L4.51311 0.906545Z"
            fill="white"
          />
        </svg>
        <span>{callLabel}: {phone}</span>
      </a>
    </div>
  );
}
