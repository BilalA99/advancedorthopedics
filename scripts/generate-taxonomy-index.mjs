// Generates a slim, client-safe index of condition and treatment taxonomy.
//
// Why this exists: several 'use client' components render a short list of
// related conditions/treatments — filtered by tag, sliced to 6-8 items — and
// import `conditions` and `AllTreatmentsCombined` to do it. Those modules are
// 1.3MB and 867KB of source, and a bundler cannot tree-shake individual entries
// out of a single array literal, so the entire dataset ends up in the client
// bundle. That is what pushed /area-of-pain/* to 729kB of first-load JS to
// render at most fourteen links.
//
// This emits only { slug, title, tag } — everything those call sites actually
// read. Same approach as components/data/clinicsForMap.generated.ts.
//
// Usage:
//   node scripts/generate-taxonomy-index.mjs           regenerate
//   node scripts/generate-taxonomy-index.mjs --check    exit 1 if stale

import fs from 'fs';
import path from 'path';
import { register } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'url';

// conditions.tsx / treatments.tsx import image assets that only Next's bundler
// can resolve. Register the stub loader here so this script works standalone
// (prebuild, CI) without needing NODE_OPTIONS set by the caller.
register('./asset-stub-loader.mjs', pathToFileURL(path.dirname(fileURLToPath(import.meta.url)) + '/'));
// These modules contain JSX in their data (rich content fields). Only strings
// are read here, so a minimal React shim is enough to let them evaluate — it
// must be installed before the dynamic import below.
globalThis.React = globalThis.React ?? {
  createElement: () => null,
  Fragment: Symbol.for('react.fragment'),
};

const { conditions } = await import('../components/data/conditions.tsx');
const { AllTreatmentsCombined } = await import('../components/data/treatments.tsx');

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const slim = (arr) =>
  arr
    .filter((x) => x && x.slug && x.slug !== 'undefined' && x.title)
    .map((x) => ({ slug: x.slug, title: x.title, tag: x.tag ?? null }));

const conditionIndex = slim(conditions);
const treatmentIndex = slim(AllTreatmentsCombined);

const content = `/**
 * Auto-generated, client-safe taxonomy index.
 * DO NOT hand-edit — regenerate with: node scripts/generate-taxonomy-index.mjs
 *
 * Only { slug, title, tag } — the fields client components need to render
 * related-condition and related-treatment links. Deliberately independent of
 * components/data/conditions.tsx and treatments.tsx, which are 1.3MB and 867KB
 * of source: a bundler cannot tree-shake entries out of a single array literal,
 * so importing those into a client component ships the whole dataset.
 */

export interface TaxonomyEntry {
  slug: string;
  title: string;
  tag: string | null;
}

export const conditionIndex: TaxonomyEntry[] = ${JSON.stringify(conditionIndex, null, 2)};

export const treatmentIndex: TaxonomyEntry[] = ${JSON.stringify(treatmentIndex, null, 2)};
`;

const outPath = path.join(__dirname, '../components/data/taxonomyIndex.generated.ts');
const normalize = (s) => s.replace(/\r\n/g, '\n');

if (process.argv.includes('--check')) {
  const existing = fs.existsSync(outPath) ? fs.readFileSync(outPath, 'utf8') : null;
  if (existing !== null && normalize(existing) === normalize(content)) {
    console.log(`taxonomyIndex.generated.ts is up to date (${conditionIndex.length} conditions, ${treatmentIndex.length} treatments).`);
    process.exit(0);
  }
  console.error(existing === null ? 'taxonomyIndex.generated.ts is missing.' : 'taxonomyIndex.generated.ts is STALE.');
  console.error('Run: npx tsx scripts/generate-taxonomy-index.mjs');
  process.exit(1);
}

fs.writeFileSync(outPath, content);
console.log(`Wrote taxonomyIndex.generated.ts (${conditionIndex.length} conditions, ${treatmentIndex.length} treatments, ${Math.round(content.length / 1024)}KB).`);
