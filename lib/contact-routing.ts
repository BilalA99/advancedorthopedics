/**
 * Centralized contact routing for state-aware phone and email resolution.
 *
 * Single source of truth for all state/regional contact info.
 * Use resolveContactByPathname(pathname) anywhere a component needs
 * the correct phone or email for the current page context.
 *
 * Route logic:
 *   /locations/new-jersey/**   → NJ contact
 *   /locations/new-york/**     → NY contact
 *   /locations/pennsylvania/** → PA contact
 *   /locations/georgia/**      → GA contact
 *   all other paths            → FL / General contact
 */

import { slugFromPathname } from './stateUtils';

export type ContactKey = 'fl' | 'nj' | 'ny' | 'pa' | 'ga';

export interface ContactInfo {
  key: ContactKey;
  label: string;
  phoneDisplay: string;
  phoneHref: string;
  phoneTel: string;
  email: string;
}

export const CONTACT_INFO: Record<ContactKey, ContactInfo> = {
  fl: {
    key: 'fl',
    label: 'FL',
    phoneDisplay: '(561) 223-9959',
    phoneHref: 'tel:+15612239959',
    phoneTel: '5612239959',
    email: 'fl@mountainspineorthopedics.com',
  },
  nj: {
    key: 'nj',
    label: 'NJ',
    phoneDisplay: '(973) 259-6756',
    phoneHref: 'tel:+19732596756',
    phoneTel: '9732596756',
    email: 'nj@mountainspineorthopedics.com',
  },
  ny: {
    key: 'ny',
    label: 'NY',
    phoneDisplay: '(646) 389-5606',
    phoneHref: 'tel:+16463895606',
    phoneTel: '6463895606',
    email: 'ny@mountainspineorthopedics.com',
  },
  pa: {
    key: 'pa',
    label: 'PA',
    phoneDisplay: '(215) 436-9496',
    phoneHref: 'tel:+12154369496',
    phoneTel: '2154369496',
    // Follows the per-state inbox convention above. UNCONFIRMED: verify this
    // mailbox exists and is monitored before this reaches production.
    email: 'pa@mountainspineorthopedics.com',
  },
  ga: {
    key: 'ga',
    label: 'GA',
    phoneDisplay: '(404) 913-6886',
    phoneHref: 'tel:+14049136886',
    phoneTel: '4049136886',
    // Follows the per-state inbox convention above. UNCONFIRMED: verify this
    // mailbox exists and is monitored before this reaches production.
    email: 'ga@mountainspineorthopedics.com',
  },
};

/** General inquiries email shown in the footer alongside all state-specific contacts. */
export const GENERAL_EMAIL = 'info@mountainspineorthopedics.com';

/**
 * Resolves the appropriate contact info based on the current pathname.
 *
 * Works for both state hub pages (/locations/new-jersey) and any nested
 * clinic page (/locations/new-jersey/bridgewater-orthopedics).
 * Falls back to FL / General for all other routes.
 */
export function resolveContactByPathname(pathname: string): ContactInfo {
  const stateSlug = slugFromPathname(pathname);
  if (stateSlug === 'new-jersey') return CONTACT_INFO.nj;
  if (stateSlug === 'new-york') return CONTACT_INFO.ny;
  if (stateSlug === 'pennsylvania') return CONTACT_INFO.pa;
  if (stateSlug === 'georgia') return CONTACT_INFO.ga;
  return CONTACT_INFO.fl;
}
