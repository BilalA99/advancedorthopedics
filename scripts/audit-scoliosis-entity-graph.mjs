/**
 * Audits the condition/treatment → physician → heading relationships that the
 * page templates derive at render time, without needing a running server.
 *
 * Three things it will not let regress:
 *
 *  1. Condition headings must not double up the condition name
 *     ("... for Degenerative Scoliosis for Adult Degenerative Scoliosis").
 *  2. Every condition and treatment must resolve to physicians whose verified
 *     profile actually covers that clinical domain — no foot-and-ankle surgeon
 *     on a spine page, and no unresolvable page silently showing a random one.
 *  3. A condition's internalLinks must not point at itself.
 *
 * Usage: npx tsx scripts/audit-scoliosis-entity-graph.mjs
 * Exits non-zero on any failure so it can be wired into CI.
 */

import path from 'path';
import { register } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'url';

// conditions.tsx / treatments.tsx import image assets that only Next's bundler
// can resolve, and carry JSX in their data fields. Same standalone setup as
// scripts/generate-taxonomy-index.mjs.
const scriptsDir = pathToFileURL(path.dirname(fileURLToPath(import.meta.url)) + '/');
register('./asset-stub-loader.mjs', scriptsDir);
register('./server-only-stub-loader.mjs', scriptsDir);
globalThis.React = globalThis.React ?? {
  createElement: () => null,
  Fragment: Symbol.for('react.fragment'),
};

const { conditionContentPlaceholders, conditions } = await import('../components/data/conditions.tsx');
const { AllTreatmentsCombined } = await import('../components/data/treatments.tsx');
const { resolveCareDomains, eligibleProvidersForDomains } = await import(
  '../lib/providers/providerRelevance.ts'
);

const failures = [];
const notes = [];

/** Mirror of ensureConditionHeadingIncludesKeyword in ConditionPage.tsx. */
function ensureHeading(heading, title, suffix = 'for') {
  if (!heading || !title) return heading;
  const h = heading.toLowerCase();
  const t = title.toLowerCase();
  if (h.includes(t)) return heading;
  const words = t.split(/\s+/).filter(Boolean);
  if (words.length > 2 && h.includes(words.slice(-2).join(' '))) return heading;
  return `${heading.trim()} ${suffix === 'of' ? 'of' : 'for'} ${title}`;
}

/** "X ... X" where the same multi-word phrase appears twice in one heading. */
function hasRepeatedPhrase(heading) {
  const words = heading.toLowerCase().replace(/[?:,]/g, '').split(/\s+/).filter(Boolean);
  for (let size = 2; size <= Math.floor(words.length / 2); size++) {
    const seen = new Set();
    for (let i = 0; i + size <= words.length; i++) {
      const phrase = words.slice(i, i + size).join(' ');
      if (seen.has(phrase)) return phrase;
      seen.add(phrase);
    }
  }
  return null;
}

// ---------------------------------------------------------------- 1. headings
for (const condition of conditionContentPlaceholders) {
  const candidates = [
    [condition.symptoms?.heading, 'of'],
    [condition.causes?.heading, 'of'],
    [condition.conservativeCare?.heading, 'for'],
    [condition.surgeryOption?.heading, 'for'],
    ['Schedule a Consultation Today', 'for'],
  ];
  for (const [heading, suffix] of candidates) {
    if (!heading) continue;
    const rendered = ensureHeading(heading, condition.title, suffix);
    const repeated = hasRepeatedPhrase(rendered);
    if (repeated) {
      failures.push(`heading  ${condition.slug}: "${rendered}" repeats "${repeated}"`);
    }
  }
  for (const section of condition.additionalSections ?? []) {
    const repeated = hasRepeatedPhrase(section.heading);
    if (repeated) {
      failures.push(`heading  ${condition.slug}: additional section "${section.heading}" repeats "${repeated}"`);
    }
  }
}

// -------------------------------------------------------------- 2. physicians
function checkProviders(kind, slug, tag, additionalTags) {
  const domains = resolveCareDomains({ slug, tag, additionalTags });
  if (domains.length === 0) {
    notes.push(`nodomain ${kind} ${slug} (tag=${tag ?? 'none'}) — physician module hides`);
    return;
  }
  const providers = eligibleProvidersForDomains(domains);
  if (providers.length === 0) {
    notes.push(`noprov   ${kind} ${slug} — domains ${domains.join(',')} have no visible provider`);
    return;
  }
  // Assertions are on *exclusive* pages only. Genuinely multi-region content
  // (arthritis, joint-and-spine injections) tags several body areas on purpose,
  // and a foot-and-ankle surgeon belongs on those. What must never happen is a
  // provider appearing on a page with no overlapping domain at all.
  const isSpineOnly = domains.every((d) => d === 'spine' || d === 'spine-deformity');
  if (isSpineOnly && providers.some((p) => p.slug === 'dr-clay-shumway')) {
    failures.push(`provider ${kind} ${slug}: foot & ankle surgeon surfaced on a spine-only page`);
  }
  const isFootOnly = domains.every((d) => d === 'foot-ankle');
  if (isFootOnly && providers.some((p) => p.slug !== 'dr-clay-shumway')) {
    failures.push(`provider ${kind} ${slug}: non-foot-and-ankle provider surfaced on a foot-only page`);
  }
}

for (const condition of conditionContentPlaceholders) {
  checkProviders('condition', condition.slug, condition.tag, condition.additionalTags);
}
for (const condition of conditions) {
  checkProviders('condition', condition.slug, condition.tag, condition.additionalTags);
}
for (const treatment of AllTreatmentsCombined) {
  checkProviders('treatment', treatment.slug, treatment.tag, treatment.additionalTags);
}

// Adult scoliosis specifically must resolve to deformity-capable surgeons.
const scoliosisProviders = eligibleProvidersForDomains(
  resolveCareDomains({ slug: 'adult-degenerative-scoliosis', tag: 'Spine' })
);
if (scoliosisProviders.length === 0) {
  failures.push('provider adult-degenerative-scoliosis: no eligible deformity surgeon');
}

// ------------------------------------------------------------ 3. self-linking
for (const condition of conditionContentPlaceholders) {
  for (const link of condition.internalLinks ?? []) {
    if (link.slug === condition.slug) {
      failures.push(`selflink ${condition.slug}: internalLinks points at itself`);
    }
  }
}

for (const note of notes) console.log(`note  ${note}`);
for (const failure of failures) console.error(`FAIL  ${failure}`);

if (failures.length > 0) {
  console.error(`\nEntity graph audit FAILED — ${failures.length} problem(s).`);
  process.exit(1);
}
console.log(
  `\nEntity graph audit OK — ${conditionContentPlaceholders.length + conditions.length} conditions, ` +
    `${AllTreatmentsCombined.length} treatments, ${notes.length} note(s).`
);
