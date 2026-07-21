import "server-only";

import { Doctors, type DoctorProp } from "@/components/data/doctors";
import { showScottKatzman } from "@/lib/config/featureFlags";

/**
 * Stable identifiers for providers gated by a visibility flag.
 * Keyed by slug rather than display name, since names/punctuation can change
 * without the underlying provider identity changing.
 */
export const providerIds = {
  scottKatzman: "dr-scott-katzman",
} as const;

/** Slugs currently excluded from public output, derived from active flags. */
const HIDDEN_PROVIDER_SLUGS = new Set<string>(
  showScottKatzman ? [] : [providerIds.scottKatzman]
);

/**
 * Free-text markers used to strip provider mentions out of hand-authored copy
 * (testimonials, quotes) that isn't keyed to a provider slug. Only applied for
 * providers currently in HIDDEN_PROVIDER_SLUGS.
 */
const HIDDEN_PROVIDER_TEXT_MARKERS: Record<string, string[]> = {
  [providerIds.scottKatzman]: ["Katzman", "Dr. Scott "],
};

function getActiveHiddenTextMarkers(): string[] {
  return Array.from(HIDDEN_PROVIDER_SLUGS).flatMap(
    (slug) => HIDDEN_PROVIDER_TEXT_MARKERS[slug] ?? []
  );
}

export function isProviderVisible(provider: Pick<DoctorProp, "slug">): boolean {
  return !HIDDEN_PROVIDER_SLUGS.has(provider.slug);
}

/** All publicly visible providers, in the dataset's existing order. */
export function getVisibleProviders(): DoctorProp[] {
  return Doctors.filter(isProviderVisible);
}

/** A single provider by slug, or undefined if it doesn't exist or is hidden. */
export function getVisibleProviderBySlug(slug: string): DoctorProp | undefined {
  const provider = Doctors.find((d) => d.slug === slug);
  if (!provider || !isProviderVisible(provider)) return undefined;
  return provider;
}

/** True if free text (a testimonial, quote, etc.) names a currently-hidden provider. */
export function textMentionsHiddenProvider(text: string | undefined | null): boolean {
  if (!text) return false;
  const markers = getActiveHiddenTextMarkers();
  if (markers.length === 0) return false;
  return markers.some((marker) => text.toLowerCase().includes(marker.toLowerCase()));
}

/**
 * Filters a list of free-text reviews/testimonials, dropping any entry whose
 * body or author text names a currently-hidden provider.
 */
export function getVisibleReviews<T extends { reviewBody?: string; author?: string; body?: string; text?: string; testimonial?: string }>(
  reviews: T[]
): T[] {
  return reviews.filter(
    (r) =>
      !textMentionsHiddenProvider(r.reviewBody) &&
      !textMentionsHiddenProvider(r.author) &&
      !textMentionsHiddenProvider(r.body) &&
      !textMentionsHiddenProvider(r.text) &&
      !textMentionsHiddenProvider(r.testimonial)
  );
}
