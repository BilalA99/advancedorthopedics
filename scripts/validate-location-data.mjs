// Fails the build when a clinic record carries data that would publish a wrong
// address, wrong phone, wrong market, or a dead canonical URL.
//
// These are patient-facing facts: a bad coordinate or a cross-market phone
// number sends someone to the wrong building or the wrong front desk, and a
// duplicate or retired slug silently 404s a page that ads or search point at.
//
// Usage: node scripts/validate-location-data.mjs      (exit 1 on any error)
//        node scripts/validate-location-data.mjs --self-test

import { clinics } from '../components/data/clinics.tsx';

// Generous state bounding boxes — wide enough never to flag a legitimate
// address, tight enough to catch a transposed sign or a wrong-state paste.
const STATE_BOUNDS = {
  FL: { lat: [24.3, 31.2], lng: [-87.8, -79.8] },
  NJ: { lat: [38.8, 41.5], lng: [-75.7, -73.8] },
  NY: { lat: [40.3, 45.2], lng: [-79.9, -71.7] },
  PA: { lat: [39.6, 42.4], lng: [-80.7, -74.5] },
};

// Each market's front-desk number.
const MARKET_PHONES = { FL: '5612239959', NJ: '9732596756', NY: '6463895606' };

// Compare on normalised digits so formatting — parentheses, dots, spaces, a
// leading +1 — can never hide a placeholder. "(123) 456-7890" and "+1234567890"
// are the same number once punctuation is stripped.
const PLACEHOLDER_DIGITS = new Set(['1234567890', '5555555555', '0000000000', '9999999999']);
const toDigits = (v) => String(v || '').replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '');
const isPlaceholderPhone = (v) => PLACEHOLDER_DIGITS.has(toDigits(v));
const inStateBox = (stateAbbr, lat, lng) => {
  const b = STATE_BOUNDS[stateAbbr];
  if (!b) return true;
  return !(lat < b.lat[0] || lat > b.lat[1] || lng < b.lng[0] || lng > b.lng[1]);
};

if (process.argv.includes('--self-test')) {
  const probes = [
    ['real Hollywood FL coords pass',            inStateBox('FL', 26.0113548, -80.1789073) === true],
    ['out-of-state coords rejected',             inStateBox('FL', 40.7128, -74.006) === false],
    ['NJ coords in NJ pass',                     inStateBox('NJ', 40.5896, -74.6046) === true],
    ['"(123) 456-7890" rejected',                isPlaceholderPhone('(123) 456-7890') === true],
    ['"+1234567890" rejected',                   isPlaceholderPhone('+1234567890') === true],
    ['"123.456.7890" rejected',                  isPlaceholderPhone('123.456.7890') === true],
    ['"(555) 555-5555" rejected',                isPlaceholderPhone('(555) 555-5555') === true],
    ['real "(561) 223-9959" passes',             isPlaceholderPhone('(561) 223-9959') === false],
    ['real "(973) 259-6756" passes',             isPlaceholderPhone('(973) 259-6756') === false],
    ['real "(646) 389-5606" passes',             isPlaceholderPhone('(646) 389-5606') === false],
  ];
  let bad = 0;
  for (const [name, ok] of probes) {
    console.log(`${ok ? 'pass  ' : 'BROKEN'}  ${name}`);
    if (!ok) bad++;
  }
  console.log(bad ? `SELF-TEST FAILED (${bad})` : `self-test OK (${probes.length} probes)`);
  process.exit(bad ? 1 : 0);
}

const errors = [];
const warnings = [];
const err = (slug, msg) => errors.push(`${slug}: ${msg}`);

const seenLocationSlug = new Map();
const seenLegacySlug = new Map();
const allLocationSlugs = new Set(clinics.map((c) => `${c.stateSlug}/${c.locationSlug}`));

for (const c of clinics) {
  const id = c.locationSlug || c.slug || `id:${c.id}`;

  for (const field of ['name', 'region', 'address', 'phone', 'stateAbbr', 'stateSlug', 'locationSlug', 'locationType']) {
    if (!c[field]) err(id, `missing required field "${field}"`);
  }
  if (typeof c.lat !== 'number' || typeof c.lng !== 'number') err(id, 'missing or non-numeric lat/lng');

  if (c.phone && isPlaceholderPhone(c.phone)) err(id, `placeholder phone number: "${c.phone}"`);

  if (typeof c.lat === 'number' && typeof c.lng === 'number' && !inStateBox(c.stateAbbr, c.lat, c.lng)) {
    err(id, `coordinates (${c.lat}, ${c.lng}) fall outside ${c.stateAbbr}`);
  }

  const addrState = (c.address || '').match(/,\s*([A-Z]{2})\s+\d{5}(?:-\d{4})?\s*$/);
  if (!addrState) warnings.push(`${id}: address does not end in "CITY, ST ZIP" — "${c.address}"`);
  else if (addrState[1] !== c.stateAbbr) {
    err(id, `address state "${addrState[1]}" does not match stateAbbr "${c.stateAbbr}" — "${c.address}"`);
  }

  // Cross-market phone leakage. Only an error for states that have their own
  // front-desk number: PA has none, and both lib/locationConstants.ts and
  // lib/contact-routing.ts deliberately route PA callers to the FL desk, so
  // that pairing is reported as a warning rather than a data defect.
  const digits = toDigits(c.phone);
  const foreign = Object.entries(MARKET_PHONES).find(([st, num]) => num === digits && st !== c.stateAbbr);
  if (foreign) {
    const msg = `${c.stateAbbr} clinic displays the ${foreign[0]} phone number (${c.phone})`;
    if (MARKET_PHONES[c.stateAbbr]) err(id, msg);
    else warnings.push(`${id}: ${msg} — intentional: ${c.stateAbbr} has no dedicated number`);
  }

  const key = `${c.stateSlug}/${c.locationSlug}`;
  if (seenLocationSlug.has(key)) err(id, `duplicate canonical route /locations/${key} (also used by ${seenLocationSlug.get(key)})`);
  else seenLocationSlug.set(key, id);

  if (c.slug) {
    if (seenLegacySlug.has(c.slug)) err(id, `duplicate legacy slug "${c.slug}" (also used by ${seenLegacySlug.get(c.slug)})`);
    else seenLegacySlug.set(c.slug, id);
  }

  for (const old of c.oldSlugs || []) {
    if (allLocationSlugs.has(`${c.stateSlug}/${old}`)) {
      err(id, `oldSlugs entry "${old}" is still a live canonical route in ${c.stateSlug}`);
    }
  }
}

for (const w of warnings) console.warn(`warn  ${w}`);

if (errors.length) {
  console.error(`\nLocation data validation FAILED (${errors.length} error${errors.length === 1 ? '' : 's'}):`);
  for (const e of errors) console.error(`  error ${e}`);
  process.exit(1);
}

console.log(`Location data OK — ${clinics.length} clinics validated (${warnings.length} warning${warnings.length === 1 ? '' : 's'}).`);
