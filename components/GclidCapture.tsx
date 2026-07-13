'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { captureGclid, captureUtmParams } from '@/lib/gclid';
import { CONSENT_UPDATED_EVENT } from '@/lib/consent';

/**
 * Zero-render component — captures GCLID and UTM params on page load.
 * Must be placed in the root layout so it fires on every page.
 * Renders nothing. Has zero visual impact.
 */
export default function GclidCapture() {
  const pathname = usePathname();

  useEffect(() => {
    captureGclid();
    captureUtmParams();
  }, [pathname]);

  useEffect(() => {
    const handleConsentUpdated = () => {
      captureGclid();
      captureUtmParams();
    };

    window.addEventListener(CONSENT_UPDATED_EVENT, handleConsentUpdated);
    return () => window.removeEventListener(CONSENT_UPDATED_EVENT, handleConsentUpdated);
  }, []);

  return null;
}
