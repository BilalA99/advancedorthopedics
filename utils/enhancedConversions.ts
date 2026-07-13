// utils/enhancedConversions.ts
import { hasMarketingConsent, hasMeasurementConsent } from "@/lib/consent";

/**
 * Enhanced Conversions for Google Ads
 * 
 * This utility helps implement enhanced conversions by pushing user-provided data
 * to the dataLayer in a format that Google Tag Manager can use for enhanced conversions.
 * 
 * According to Google's documentation:
 * - Data should be pushed to dataLayer before conversion tags fire
 * - Data should be available on the thank-you page when conversion tags load
 * - Data structure must match Google's expected format
 */

type ECIn = {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  postalCode?: string;
  country?: string;
  address?: {
    street?: string;
    city?: string;
    region?: string;
    postalCode?: string;
    country?: string;
  };
};

type ECOut = {
  email: string;
  phone_number: string;
  address: {
    first_name: string;
    last_name: string;
    country: string;
    postal_code: string;
  };
};

/**
 * Formats a phone number to E.164 international format required by Google Ads.
 * Google Enhanced Conversions require phone numbers in E.164 format (e.g., +15551234567 for US).
 * 
 * @param phone - Raw phone number string
 * @param country - Country code (default: US)
 * @returns Phone number in E.164 format or empty string if invalid
 */
export function formatPhoneToE164(phone: string, country: string = 'US'): string {
  const rawPhone = phone.replace(/\D/g, '');
  
  if (!rawPhone || rawPhone.length === 0) {
    return '';
  }

  // Handle US/Canada numbers (country code +1)
  if (country === 'US' || country === 'CA' || !country) {
    if (rawPhone.length === 10) {
      // Standard 10-digit US number → add +1 prefix
      return `+1${rawPhone}`;
    } else if (rawPhone.length === 11 && rawPhone.startsWith('1')) {
      // 11-digit with leading 1 → add + prefix
      return `+${rawPhone}`;
    }
  }

  // For other countries or formats, return with + if not already present
  // This handles cases where the number might already include country code
  if (rawPhone.length >= 10) {
    return `+${rawPhone}`;
  }

  // Return empty for invalid/too-short numbers
  return '';
}

/**
 * Normalizes user input data to match Google's enhanced conversions format
 */
export function normalizeEC(v: ECIn): ECOut {
  const email = (v.email ?? '').trim().toLowerCase();
  const normalizedCountry = (v.country || "US").trim().toUpperCase();
  const phone_number = formatPhoneToE164(v.phone ?? '', normalizedCountry);
  const normalizedFirstName = (v.firstName ?? '').trim();
  const normalizedLastName = (v.lastName ?? '').trim();
  const normalizedPostal = (v.postalCode || '').replace(/\D/g, '').slice(0, 10);

  const result: ECOut = {
    email,
    phone_number,
    address: {
      first_name: normalizedFirstName,
      last_name: normalizedLastName,
      country: normalizedCountry || "US",
      postal_code: normalizedPostal,
    },
  };

  return result;
}

/**
 * Persists enhanced conversion data to sessionStorage for use on thank-you page
 */
export function persistEC(v: ECIn) {
  if (typeof window === 'undefined') return;
  if (!hasMarketingConsent()) return;
  const n = normalizeEC(v);
  try {
    sessionStorage.setItem('ec_email', n.email || '');
    sessionStorage.setItem('ec_phone', n.phone_number || '');
    sessionStorage.setItem('ec_first', n.address.first_name || '');
    sessionStorage.setItem('ec_last', n.address.last_name || '');
    sessionStorage.setItem('ec_postal', n.address.postal_code || '');
    sessionStorage.setItem('ec_country', n.address.country || 'US');
  } catch {}
}

/**
 * Pushes enhanced conversion data to dataLayer for Google Tag Manager
 * 
 * This should be called BEFORE navigation to the thank-you page to ensure
 * the data is available when conversion tags fire.
 * 
 * @param v - User input data (email, phone, name, etc.)
 * @param eventName - Optional event name (default: 'ec_capture')
 */
export function pushEC(v: ECIn, eventName: string = 'ec_capture') {
  if (typeof window === 'undefined') return;
  if (!hasMarketingConsent()) return;
  const n = normalizeEC(v);
  
  // Initialize dataLayer if it doesn't exist
  (window as any).dataLayer = (window as any).dataLayer || [];
  
  // Push enhanced conversion data to dataLayer
  // Google Tag Manager will automatically hash this data before sending to Google Ads
  (window as any).dataLayer.push({
    event: eventName,
    enhanced_conversion_data: {
      email: n.email || undefined,
      phone_number: n.phone_number || undefined,
      address: {
        first_name: n.address.first_name || undefined,
        last_name: n.address.last_name || undefined,
        country: n.address.country || "US",
        postal_code: n.address.postal_code || undefined,
      },
    },
  });
}

/**
 * Pushes enhanced conversion data to dataLayer without an event
 * This is useful when you want the data available for the next conversion tag
 * without triggering any additional events
 */
export function pushECSilent(v: ECIn) {
  if (typeof window === 'undefined') return;
  if (!hasMarketingConsent()) return;
  const n = normalizeEC(v);
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({
    enhanced_conversion_data: {
      email: n.email || undefined,
      phone_number: n.phone_number || undefined,
      address: {
        first_name: n.address.first_name || undefined,
        last_name: n.address.last_name || undefined,
        country: n.address.country || "US",
        postal_code: n.address.postal_code || undefined,
      },
    },
  });
}

/**
 * Re-push EC data from sessionStorage on the thank-you page.
 * 
 * This ensures enhanced conversion data is available when conversion tags load.
 * Call this in a useEffect on the thank-you page so the Ads conversion tag sees the data.
 * 
 * @param eventName - Optional event name (default: 'ec_restore')
 */
export function restoreECFromSession(eventName: string = 'ec_restore') {
  if (typeof window === 'undefined') return;
  if (!hasMarketingConsent()) return;
  try {
    const country = (sessionStorage.getItem('ec_country') || 'US').trim().toUpperCase();
    const rawPhone = sessionStorage.getItem('ec_phone') || '';
    
    const ec: ECOut = {
      email: (sessionStorage.getItem('ec_email') || '').trim().toLowerCase(),
      phone_number: formatPhoneToE164(rawPhone, country),
      address: {
        first_name: (sessionStorage.getItem('ec_first') || '').trim(),
        last_name: (sessionStorage.getItem('ec_last') || '').trim(),
        country: country,
        postal_code: (sessionStorage.getItem('ec_postal') || '').trim(),
      },
    };

    (window as any).dataLayer = (window as any).dataLayer || [];
    
    // Push the data to dataLayer so conversion tags can access it
    (window as any).dataLayer.push({
      event: eventName,
      enhanced_conversion_data: {
        email: ec.email || undefined,
        phone_number: ec.phone_number || undefined,
        address: {
          first_name: ec.address.first_name || undefined,
          last_name: ec.address.last_name || undefined,
          country: ec.address.country || "US",
          postal_code: ec.address.postal_code || undefined,
        },
      },
    });
  } catch {}
}

/**
 * Pushes enhanced conversion data and persists it in one call
 * This is a convenience function that combines persistEC and pushEC
 */
export function captureAndPersistEC(v: ECIn, eventName: string = 'ec_capture') {
  persistEC(v);
  pushEC(v, eventName);
}

/** Generic custom event push helper (keeps analytics code tidy) */
export function pushEvent(name: string, params: Record<string, any> = {}) {
  if (typeof window === 'undefined') return;
  if (!hasMeasurementConsent()) return;
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({ event: name, ...params });
}

export function pushMarketingEvent(name: string, params: Record<string, any> = {}) {
  if (typeof window === 'undefined') return;
  if (!hasMarketingConsent()) return;
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({ event: name, ...params });
}

/**
 * Phone click tracking — single entry point for every "tel:" CTA sitewide.
 *
 * Pushes the current event name (default `phone_click`, or a page-type-specific
 * variant like `location_phone_click`) AND the legacy `call_click` event so any
 * GTM trigger/Google Ads conversion still bound to the old event name keeps firing.
 * Call this instead of pushEvent('phone_click', ...) / pushEvent('call_click', ...)
 * directly — do not push 'call_click' anywhere else, to avoid double-firing.
 */
export function pushPhoneClickEvent(params: Record<string, any> = {}, eventName: string = 'phone_click') {
  pushEvent(eventName, params);
  if (eventName !== 'call_click') {
    pushEvent('call_click', params);
  }
}

/**
 * Appointment CTA click tracking — single entry point for "open booking dialog" CTAs.
 *
 * Pushes `appointment_cta_click` AND the legacy `booking_click` event so any
 * GTM trigger still bound to the old event name keeps firing. Call this instead
 * of pushEvent('appointment_cta_click', ...) directly.
 */
export function pushAppointmentCtaClick(params: Record<string, any> = {}) {
  pushEvent('appointment_cta_click', params);
  pushEvent('booking_click', params);
}

/**
 * Single entry point for all form conversion tracking.
 *
 * Internally calls persistEC → pushEC → dataLayer form_submit in the correct order.
 * No other code should call persistEC or pushEC directly after form submission.
 *
 * Must be called once, BEFORE navigation to /thank-you.
 * State MUST be one of: "florida" | "new-jersey" | "new-york" | "pennsylvania"
 */
export function pushFormSubmit({
  form_name,
  state,
  email,
  phone,
  firstName,
  lastName,
  postalCode,
  country = 'US',
}: {
  form_name: string;
  state: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  postalCode?: string;
  country?: string;
}) {
  if (typeof window === 'undefined') return;

  // Normalize phone to E.164 once here so every downstream consumer gets the correct format.
  // formatPhoneToE164 returns '' for invalid/short numbers; treat those as absent.
  const normalizedPhone = phone ? formatPhoneToE164(phone, country) : '';

  const ecData: ECIn = {
    email,
    phone: normalizedPhone || phone, // pass E.164 to EC; fall back to raw only if normalization fails
    firstName,
    lastName,
    postalCode,
    country,
  };

  if (hasMarketingConsent()) {
    persistEC(ecData);
    pushEC(ecData);
  }

  if (hasMeasurementConsent()) {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: 'lead_form_submit_success',
      form_name,
      state: state || '',
      page_path: window.location.pathname,
    });
    (window as any).dataLayer.push({
      event: 'form_submit',
      form_name,
      state: state || '',
      page_path: window.location.pathname,
    });
    // Legacy alias — some GTM triggers/Ads conversions may still be bound to the
    // old 'form_submission' event name with its original camelCase field names.
    (window as any).dataLayer.push({
      event: 'form_submission',
      formName: form_name,
      pagePath: window.location.pathname,
    });
  }
}

/**
 * Debug helper: Check if enhanced conversion data is in dataLayer
 * Useful for troubleshooting in browser console
 * 
 * Usage in browser console:
 *   verifyECData();
 */
export function verifyECData(): boolean {
  if (typeof window === 'undefined') {
    console.warn('verifyECData: Not available in server-side context');
    return false;
  }

  const dataLayer = (window as any).dataLayer || [];
  let found = false;

  console.log('Checking dataLayer for enhanced_conversion_data presence...');
  
  for (let i = dataLayer.length - 1; i >= 0; i--) {
    const item = dataLayer[i];
    if (item && item.enhanced_conversion_data) {
      found = true;
      console.log('Found enhanced_conversion_data.');
      return true;
    }
  }

  if (!found) {
    console.warn('No enhanced_conversion_data found in dataLayer');
  }

  return found;
}
