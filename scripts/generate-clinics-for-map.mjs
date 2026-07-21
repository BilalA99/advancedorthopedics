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
  ({ reviews, whatOurPatientsSay, specialists, skilled, whyChoose, easyToReach, nearby, advancedTreatments, faqs, gallery, galleryIntro, ...rest }) =>
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

const checkOnly = process.argv.includes('--check');

// Line-ending-agnostic comparison: this repo's .gitattributes (`* text=auto`)
// lets git normalize line endings on checkout, so a plain `git stash`/branch
// switch on Windows can flip CRLF<->LF without changing the actual data —
// that shouldn't count as "stale".
const normalizeNewlines = (s) => s.replace(/\r\n/g, '\n');

if (checkOnly) {
  const existing = fs.existsSync(outPath) ? fs.readFileSync(outPath, 'utf8') : null;
  if (existing !== null && normalizeNewlines(existing) === normalizeNewlines(generatedContent)) {
    console.log(`clinicsForMap.generated.ts is up to date (${safe.length} entries).`);
    process.exit(0);
  }
  console.error(
    existing === null
      ? 'clinicsForMap.generated.ts is missing.'
      : 'clinicsForMap.generated.ts is STALE — it no longer matches components/data/clinics.tsx.'
  );
  console.error('Run: npx tsx scripts/generate-clinics-for-map.mjs');
  process.exit(1);
}

fs.writeFileSync(outPath, generatedContent);
console.log(`Wrote ${safe.length} entries to ${outPath}`);
