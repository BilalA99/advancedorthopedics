'use client';
import React from 'react';
import { pushPhoneClickEvent } from '@/utils/enhancedConversions';

interface PhoneLinkProps {
  phone: string;
  className?: string;
  children?: React.ReactNode;
  trackLocation?: string;
}

export function PhoneLink({ phone, className = '', children, trackLocation = 'Unknown' }: PhoneLinkProps) {
  // Clean the phone number for tel: link
  const cleanPhone = phone.replace(/[^\d]/g, '');
  const displayPhone = children || phone;

  const handleClick = () => {
    pushPhoneClickEvent({
      location: trackLocation,
      page_path: typeof window !== 'undefined' ? window.location.pathname : '',
    });
  };

  return (
    <a 
      href={`tel:+1${cleanPhone}`}
      className={`hover:text-[#0A50EC] hover:underline transition-colors duration-200 ${className}`}
      onClick={handleClick}
      style={{
        fontFamily: "var(--font-inter)",
      }}
    >
      {displayPhone}
    </a>
  );
}
