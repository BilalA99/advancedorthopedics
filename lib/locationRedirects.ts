/**
 * Location Redirects Utility
 * 
 * This file contains the mapping from legacy location slugs to the new
 * state-first canonical URL structure.
 * 
 * Legacy format: /locations/{slug}
 * New format: /locations/{stateSlug}/{locationSlug}
 */

import { clinics } from '@/components/data/clinics';
import { clinicsForMap } from '@/components/data/clinicsForMap.generated';

export interface LocationRedirectMapping {
  state: string;
  location: string;
}

/**
 * Static mapping of legacy location slugs to their new state-first URLs.
 * This is used for 301 redirects to preserve SEO equity and existing citations.
 */
export const LEGACY_LOCATION_REDIRECTS: Record<string, LocationRedirectMapping> = {
  // Florida locations
  'hollywood-fl-orthopedics': { state: 'florida', location: 'hollywood-orthopedics' },
  'palm-springs-orthopedics': { state: 'florida', location: 'palm-springs-orthopedics' },
  'orlando-orthopedics': { state: 'florida', location: 'orlando-orthopedics' },
  'fort-pierce-orthopedics': { state: 'florida', location: 'fort-pierce-orthopedics' },
  'palm-beach-gardens-orthopedics': { state: 'florida', location: 'palm-beach-gardens-orthopedics' },
  'miami-beach-orthopedics': { state: 'florida', location: 'south-miami-orthopedics' },
  'boca-raton-orthopedics': { state: 'florida', location: 'boca-raton-orthopedics' },
  'altamonte-springs-orthopedics': { state: 'florida', location: 'altamonte-springs-orthopedics' },
  'davenport-orthopedics': { state: 'florida', location: 'davenport-orthopedics' },
  'jacksonville-orthopedics': { state: 'florida', location: 'jacksonville-orthopedics' },
  // Note: New NJ/NY/PA locations don't have legacy slugs since they're new
};

/**
 * Get the redirect path for a legacy location slug.
 * 
 * @param slug - The legacy location slug (e.g., 'hollywood-fl-orthopedics')
 * @returns The new canonical path (e.g., '/locations/florida/hollywood-orthopedics') or null if not found
 */
export function getRedirectForLegacySlug(slug: string): string | null {
  const mapping = LEGACY_LOCATION_REDIRECTS[slug];
  if (mapping) {
    return `/locations/${mapping.state}/${mapping.location}`;
  }
  return null;
}

/**
 * Build the canonical URL path for a clinic using the new state-first structure.
 * 
 * @param stateSlug - The state slug (e.g., 'florida', 'new-jersey', 'new-york', 'pennsylvania')
 * @param locationSlug - The location slug (e.g., 'hollywood-orthopedics')
 * @returns The canonical path (e.g., '/locations/florida/hollywood-orthopedics')
 */
export function buildLocationPath(stateSlug: string, locationSlug: string): string {
  return `/locations/${stateSlug}/${locationSlug}`;
}

/**
 * Get the canonical URL path for a clinic object.
 * 
 * @param clinic - The clinic object (must have stateSlug and locationSlug)
 * @returns The canonical path (e.g., '/locations/florida/hollywood-orthopedics')
 */
export function getClinicUrl(clinic: { stateSlug: string; locationSlug: string }): string {
  return buildLocationPath(clinic.stateSlug, clinic.locationSlug);
}

/**
 * Find a clinic by state and location slugs.
 * 
 * @param stateSlug - The state slug (e.g., 'florida')
 * @param locationSlug - The location slug (e.g., 'hollywood-orthopedics')
 * @returns The clinic object or undefined if not found
 */
export function findClinicByStateAndLocation(stateSlug: string, locationSlug: string) {
  return clinics.find(
    clinic => clinic.stateSlug === stateSlug && clinic.locationSlug === locationSlug
  );
}

/**
 * Get all clinics for a specific state.
 * 
 * @param stateSlug - The state slug (e.g., 'florida', 'new-jersey', 'new-york', 'pennsylvania')
 * @returns Array of clinics in that state
 */
export function getClinicsByState(stateSlug: string) {
  return clinicsForMap.filter(clinic => clinic.stateSlug === stateSlug);
}

/**
 * Get all unique state slugs from the clinics data.
 * 
 * @returns Array of unique state slugs
 */
export function getAllStateSlugs(): string[] {
  const stateSlugs = new Set(clinics.map(clinic => clinic.stateSlug));
  return Array.from(stateSlugs);
}

/**
 * Get all state/location pairs for generating static params.
 * 
 * @returns Array of { state, location } objects
 */
export function getAllLocationParams(): { state: string; location: string }[] {
  return clinics.map(clinic => ({
    state: clinic.stateSlug,
    location: clinic.locationSlug,
  }));
}

/**
 * State metadata for hub pages
 */
export const STATE_METADATA: Record<string, { name: string; abbr: string; description: string }> = {
  florida: {
    name: 'Florida',
    abbr: 'FL',
    description: 'Expert orthopedic and spine care across Florida. Find a Mountain Spine & Orthopedics clinic near you.',
  },
  'new-jersey': {
    name: 'New Jersey',
    abbr: 'NJ',
    description: 'Expert orthopedic and spine care across New Jersey. Find a Mountain Spine & Orthopedics clinic near you.',
  },
  'new-york': {
    name: 'New York',
    abbr: 'NY',
    description: 'Expert orthopedic and spine care in New York. Find a Mountain Spine & Orthopedics clinic near you.',
  },
  pennsylvania: {
    name: 'Pennsylvania',
    abbr: 'PA',
    description: 'Expert orthopedic and spine care across Pennsylvania. Find a Mountain Spine & Orthopedics clinic near you.',
  },
};

/**
 * Valid state slugs for validation
 */
export const VALID_STATE_SLUGS = ['florida', 'new-jersey', 'new-york', 'pennsylvania'] as const;

/**
 * Check if a state slug is valid
 */
export function isValidStateSlug(stateSlug: string): stateSlug is typeof VALID_STATE_SLUGS[number] {
  return VALID_STATE_SLUGS.includes(stateSlug as typeof VALID_STATE_SLUGS[number]);
}
