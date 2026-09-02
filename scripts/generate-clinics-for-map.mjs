// Regenerates components/data/clinicsForMap.generated.ts from the source of
// truth in components/data/clinics.tsx. Run this whenever a clinic's core
// location fields (name, address, lat/lng, phone, slug, etc.) change.
//
// Why this exists: clinics.tsx also exports large embedded testimonial/review
// content per location. JS bundlers cannot tree-shake individual fields out of
// a single array literal, so any client component importing a filtered view
// *derived at runtime* from that module (e.g. `clinics.map(...)`) would still
// bundle the raw, unfiltered source (including any provider-identifying
// review text) alongside it. This script produces a fully independent static
// file instead, with zero import relationship to clinics.tsx at the value
// level, so client components that only need location/marker fields never
// pull in review content.
//
// Usage:
//   node scripts/generate-clinics-for-map.mjs           regenerate the file
//   node scripts/generate-clinics-for-map.mjs --check   exit 1 if the committed
//                                                        file is stale, without
//                                                        writing anything (for
//                                                        prebuild/CI use)

import { clinics } from '../components/data/clinics.tsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const safe = clinics.map(
  ({ reviews, whatOurPatientsSay, specialists, skilled, whyChoose, easyToReach, nearby, advancedTreatments, faqs, gallery, galleryIntro, hoursDisplay, ...rest }) =>
    rest
);

const header = `/**
 * Auto-generated, map/nav-safe view of clinics location data.
 * DO NOT hand-edit — regenerate with: node scripts/generate-clinics-for-map.mjs
 * (whenever a clinic's core location fields change in components/data/clinics.tsx)
 *
 * Deliberately independent of components/data/clinics.tsx's module scope —
 * that file also exports large embedded testimonial/review content (which may
 * name a provider gated by the visibility policy), and because JS bundlers
 * cannot tree-shake individual fields out of a single array literal, any
 * client component importing a filtered view *derived from* that module at
 * runtime would still bundle the raw, unfiltered source alongside it. This
 * file has zero import relationship to clinics.tsx, so client components
 * needing only location/marker fields never pull in review content.
 */
import type { StateAbbr, StateSlug, LocationType } from './clinics';

export interface ClinicsMapSafeProps {
  id: number;
  name: string;
  lat: number;
  lng: number;
  address: string;
  phone: string;
  region: string;
  link: string;
  embedSrc?: string;
  placeUrl?: string;
  slug: string;
  stateAbbr: StateAbbr;
  stateSlug: StateSlug;
  locationSlug: string;
  locationType: LocationType;
  oldSlugs?: string[];
  paragraph: string;
  keywords: string[];
  metaTitle: string;
  metaDescription: string;
  neighborhoodsWeServe?: string[];
  rating: number;
  reviewCount: number;
  ogImage: string;
  mapEmbed?: string;
  placeId?: string;
  cid?: string;
  businessProfileId?: string;
  kgId?: string;
  categories?: string[];
  formattedAddress?: string;
  addressLine1?: string;
  suite?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  county?: string;
  country?: string;
  countryCode?: string;
  stateCode?: string;
  googleMapsUrl?: string;
  hasMap?: string;
  updatedAt?: string;
}

export const clinicsForMap: ClinicsMapSafeProps[] = `;

const body = JSON.stringify(safe, null, 2) + ';\n';
const outPath = path.join(__dirname, '../components/data/clinicsForMap.generated.ts');
const generatedContent = header + body;

// ── Practice-wide review aggregate ──────────────────────────────────────────
// Derived from the same GBP-sourced per-location rating/reviewCount fields, so
// any review figure shown to a patient is traceable to real listing data rather
// than a hand-typed marketing number. Emitted as its own tiny module because the
// client components that display it (injury landing pages) must not pull the
// full clinicsForMap payload into their bundles just to read two numbers.
const rated = safe.filter(
  (c) => typeof c.rating === 'number' && typeof c.reviewCount === 'number' && c.reviewCount > 0
);
const totalReviews = rated.reduce((sum, c) => sum + c.reviewCount, 0);
const averageRating =
  Math.round((rated.reduce((sum, c) => sum + c.rating * c.reviewCount, 0) / totalReviews) * 10) / 10;

const aggregatePath = path.join(__dirname, '../components/data/reviewAggregate.generated.ts');
const aggregateContent = `/**
 * Auto-generated practice-wide review aggregate.
 * DO NOT hand-edit — regenerate with: node scripts/generate-clinics-for-map.mjs
 *
 * Derived from the per-location Google Business Profile rating/reviewCount
 * fields in components/data/clinics.tsx. Any review figure displayed to a
 * patient must be sourced from here so it stays traceable to real listing data.
 */

/** Locations contributing a Google rating. */
export const RATED_LOCATION_COUNT = ${rated.length};

/** Total Google reviews summed across all rated locations. */
export const TOTAL_REVIEW_COUNT = ${totalReviews};

/** Review-count-weighted average rating across all rated locations. */
export const AVERAGE_RATING = ${averageRating};
`;

const outputs = [
  { path: outPath, content: generatedContent, label: `clinicsForMap.generated.ts (${safe.length} entries)` },
  {
    path: aggregatePath,
    content: aggregateContent,
    label: `reviewAggregate.generated.ts (${totalReviews} reviews / ${rated.length} locations)`,
  },
];

const checkOnly = process.argv.includes('--check');

// Line-ending-agnostic comparison: this repo's .gitattributes (`* text=auto`)
// lets git normalize line endings on checkout, so a plain `git stash`/branch
// switch on Windows can flip CRLF<->LF without changing the actual data —
// that shouldn't count as "stale".
const normalizeNewlines = (s) => s.replace(/\r\n/g, '\n');

if (checkOnly) {
  let stale = false;
  for (const out of outputs) {
    const existing = fs.existsSync(out.path) ? fs.readFileSync(out.path, 'utf8') : null;
    if (existing !== null && normalizeNewlines(existing) === normalizeNewlines(out.content)) {
      console.log(`${out.label} is up to date.`);
      continue;
    }
    console.error(
      existing === null
        ? `${path.basename(out.path)} is missing.`
        : `${path.basename(out.path)} is STALE — it no longer matches components/data/clinics.tsx.`
    );
    stale = true;
  }
  if (stale) {
    console.error('Run: npx tsx scripts/generate-clinics-for-map.mjs');
    process.exit(1);
  }
  process.exit(0);
}

for (const out of outputs) {
  fs.writeFileSync(out.path, out.content);
  console.log(`Wrote ${out.label}`);
}
