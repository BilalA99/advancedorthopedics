#!/usr/bin/env node
/**
 * FAQ server-rendering build gate.
 *
 * Runs in `prebuild`, so a build fails rather than shipping FAQ content a crawler
 * or an LLM cannot read.
 *
 * Structural, not behavioural — `scripts/qa/faq-ssr-audit.mjs` proves the runtime
 * result against a live server, but that needs a server and cannot run here. This
 * proves the two invariants whose violation caused the defects the audit found,
 * both of which a well-meaning refactor could reintroduce in one line:
 *
 *   1. FAQ answers are always MOUNTED, never conditionally rendered. The accordion
 *      may hide an answer visually; it may not create it on click. When it did,
 *      the served HTML carried every question and only the first answer.
 *
 *   2. FAQPage JSON-LD is DERIVED from the same data the page renders, never
 *      hand-written beside it. A hand-written copy on the orthopedic-injections
 *      page drifted until three of its answers described content that appeared
 *      nowhere on the page — structured data asserting what the page does not say.
 *
 * Checks are tolerant of formatting (comments stripped, whitespace normalised) so
 * reformatting never fails a build, but a real change in meaning does.
 */
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const failures = [];
const fail = (check, detail) => failures.push({ check, detail });
const read = (rel) => readFile(path.join(ROOT, rel), 'utf8');

function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    .replace(/(^|[^:])\/\/.*$/gm, '$1');
}

/**
 * Components that render FAQ answers. Each must mount its answers unconditionally.
 */
const FAQ_COMPONENTS = [
  'components/FaqsSection.tsx',
  'components/ConditionFAQ.tsx',
  'components/TreatmentFAQ.tsx',
  'components/BlogFAQSection.tsx',
  'components/LocationFAQSection.tsx',
  'app/treatments/orthopedic-injections/InjectionsFAQ.tsx',
];

async function checkAnswersAreAlwaysMounted() {
  const check = 'FAQ answers are always mounted, never conditionally rendered';

  for (const rel of FAQ_COMPONENTS) {
    let source;
    try {
      source = stripComments(await read(rel));
    } catch {
      fail(check, `${rel} is missing — if it was renamed, update this gate`);
      continue;
    }

    // The exact shape of the historic bug: an open/expanded flag gating whether
    // the answer JSX exists at all, rather than how it looks.
    //   {isOpen && (<p>{answer}</p>)}      ← creates the answer on click
    //   {openItem === index && (...)}      ← same
    const conditionalMount = [
      /\{\s*isOpen\s*&&\s*\(/,
      /\{\s*open\w*\s*===\s*\w+\s*&&\s*\(/,
      /\{\s*expanded\w*\s*&&\s*\(/,
      /\{\s*isExpanded\s*&&\s*\(/,
      /\{\s*activeIndex\s*===\s*\w+\s*&&\s*\(/,
    ];
    for (const pattern of conditionalMount) {
      if (pattern.test(source)) {
        fail(check,
          `${rel} gates JSX on an open/expanded flag (${pattern.source}). A collapsed ` +
          `answer must still exist in the document — gate visibility, never mounting.`);
      }
    }

    // AnimatePresence is how the original bug was expressed: it unmounts children
    // on exit, so an answer inside one is absent from the DOM while collapsed.
    if (/AnimatePresence/.test(source)) {
      fail(check,
        `${rel} uses AnimatePresence, which unmounts its children. A FAQ answer ` +
        `inside one does not exist in the served HTML while collapsed.`);
    }
  }
}

/**
 * The orthopedic-injections page is the one that drifted. Its schema must stay
 * derived from the single FAQ source rather than reverting to a hand-written copy.
 */
async function checkInjectionsSchemaIsDerived() {
  const check = 'orthopedic-injections FAQPage schema is derived, not hand-written';
  const LAYOUT = 'app/treatments/orthopedic-injections/layout.tsx';
  const PAGE = 'app/treatments/orthopedic-injections/page.tsx';
  const FAQS = 'app/treatments/orthopedic-injections/faqs.ts';

  let layout, page, faqs;
  try {
    layout = stripComments(await read(LAYOUT));
    page = stripComments(await read(PAGE));
    faqs = await read(FAQS);
  } catch (err) {
    fail(check, `cannot read the injections FAQ files (${String(err.message || err).slice(0, 80)})`);
    return;
  }

  if (!/INJECTION_FAQS\s*:\s*FAQItem\[\]/.test(faqs)) {
    fail(check, `${FAQS} no longer exports INJECTION_FAQS as the single FAQ source`);
  }

  // Both consumers must import it rather than redeclare it.
  for (const [label, source] of [[LAYOUT, layout], [PAGE, page]]) {
    if (!/from ['"]\.\/faqs['"]/.test(source)) {
      fail(check, `${label} does not import the shared FAQ source from ./faqs`);
    }
    if (/const INJECTION_FAQS/.test(source)) {
      fail(check, `${label} redeclares INJECTION_FAQS instead of importing it — ` +
        `two copies is exactly how the schema drifted from the page.`);
    }
  }

  // The schema must be a projection of that array.
  if (!/mainEntity:\s*INJECTION_FAQS\.map\(/.test(layout)) {
    fail(check,
      `${LAYOUT} no longer builds mainEntity from INJECTION_FAQS.map(). A ` +
      `hand-written FAQPage block drifted from the page once already: three of its ` +
      `answers described content that appeared nowhere on the rendered page.`);
  }

  // A hand-written Question literal in the layout is the regression itself.
  const handWritten = (layout.match(/'@type':\s*'Question'/g) || []).length;
  if (handWritten > 1) {
    fail(check,
      `${LAYOUT} contains ${handWritten} literal '@type': 'Question' entries; the ` +
      `schema should be generated from INJECTION_FAQS, not enumerated by hand.`);
  }
}

/**
 * Preferred Sources must stay a server-rendered link, not a third-party script.
 */
async function checkPreferredSourceStaysServerRendered() {
  const check = 'preferred-source control stays a server-rendered link';
  const MODULE = 'components/PreferredSourceCTA.tsx';

  let source, code;
  try {
    source = await read(MODULE);
    // The component's own docstring explains WHY the SWG script was rejected, and
    // names it. Checking the raw source would match that prose and fail on a file
    // that is correct — so the script check reads code, and only the checks that
    // are genuinely about documented intent read the full source.
    code = stripComments(source);
  } catch {
    fail(check, `${MODULE} is missing`);
    return;
  }

  if (/^['"]use client['"]/m.test(source)) {
    fail(check, `${MODULE} became a client component; it is a link and needs no JS.`);
  }
  if (/news\.google\.com\/swg\/js/.test(code)) {
    fail(check,
      `${MODULE} loads Google's SWG publisher script. The deeplink was chosen ` +
      `deliberately: no third-party request on the site's highest-volume templates, ` +
      `and no consent decision to make. See docs/operations/faq-ssr-and-preferred-sources/.`);
  }
  if (!/google\.com\/preferences\/source\?q=/.test(code)) {
    fail(check, `${MODULE} no longer points at the documented preferred-source deeplink`);
  }
  // Google accepts domain and subdomain only. A path here fails silently forever.
  if (!/new URL\(SITE_URL\)\.hostname/.test(code)) {
    fail(check,
      `${MODULE} does not derive the nominated domain from SITE_URL's hostname. ` +
      `Google rejects path-level sources, so the value must be a bare host.`);
  }
  if (!/aria-label=/.test(code)) {
    fail(check, `${MODULE} lost its aria-label; "Add as preferred source" is ambiguous out of context.`);
  }
  if (!/rel="noopener/.test(code)) {
    fail(check, `${MODULE} opens a new tab without rel="noopener"`);
  }
}

const CHECKS = [
  ['FAQ answers are always mounted', checkAnswersAreAlwaysMounted],
  ['orthopedic-injections FAQPage schema is derived', checkInjectionsSchemaIsDerived],
  ['preferred-source control stays server-rendered', checkPreferredSourceStaysServerRendered],
];

for (const [, fn] of CHECKS) {
  try {
    await fn();
  } catch (err) {
    fail('gate', `check threw: ${String(err.message || err).slice(0, 120)}`);
  }
}

if (failures.length) {
  console.error(`\nfaq-ssr-contract: ${failures.length} violation(s).\n`);
  for (const f of failures) {
    console.error(`  x ${f.check}`);
    console.error(`    ${f.detail}\n`);
  }
  process.exit(1);
}

console.log(`faq-ssr-contract: ${CHECKS.length} checks passed.`);
