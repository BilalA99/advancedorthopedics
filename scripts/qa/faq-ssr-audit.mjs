/**
 * FAQ server-rendering audit.
 *
 * Answers the only question that matters for SEO and for LLM retrieval: is the
 * FAQ **answer text** present in the HTML the server sends, before any JavaScript
 * runs? A crawler that does not execute JS, and most LLM fetchers, see exactly
 * this bytes-on-the-wire document and nothing more.
 *
 * Deliberately uses a plain fetch rather than a browser. Rendering the page in
 * Puppeteer would run React, hydrate, and show the answers whether or not they
 * were ever in the server HTML — which is precisely the failure this audit exists
 * to detect. The raw response is the source of truth.
 *
 * For every page it reports:
 *   - how many FAQ questions appear in the server HTML
 *   - how many ANSWERS appear, matched on a distinctive slice of the answer text
 *   - whether FAQPage JSON-LD is present, and whether every acceptedAnswer in it
 *     is backed by visible text in the same document (schema asserting content the
 *     page does not show is a structured-data violation, not a win)
 *   - whether answers are inside <details>, aria-hidden, or display:none
 *
 * Usage: node scripts/qa/faq-ssr-audit.mjs <baseUrl> [--json]
 */
import { writeFile } from 'node:fs/promises';

const BASE = process.argv[2] || 'http://localhost:3000';
const JSON_OUT = process.argv.includes('--json');

/** One representative URL per FAQ-bearing page family, plus the families' names. */
const PAGES = [
  ['/about/faqs',                                  'Sitewide FAQ page (FaqsSection)'],
  ['/find-care/second-opinion',                    'Second opinion (FaqsSection)'],
  ['/find-care/free-mri-review',                   'Free MRI review (FaqsSection)'],
  ['/find-care/candidacy-check',                   'Candidacy check (FaqsSection)'],
  ['/conditions/herniated-disc',                   'Condition (ConditionFAQ)'],
  ['/conditions/sciatica',                         'Condition (ConditionFAQ)'],
  ['/treatments/anterior-lumbar-interbody-fusion', 'Treatment (TreatmentFAQ)'],
  ['/treatments/revision-spinal-surgery',          'Treatment (TreatmentFAQ)'],
  ['/treatments/orthopedic-injections',            'Treatment (TreatmentFAQ)'],
  ['/locations/florida/hollywood-orthopedics',     'Location (LocationFAQSection)'],
  ['/locations/florida',                           'State hub (state-faqs)'],
  ['/injuries/car-accident',                       'Injury (faqs.ts)'],
  ['/injuries/work-injury',                        'Injury (faqs.ts)'],
  ['/injuries/personal-injury',                    'Injury (faqs.ts)'],
  ['/injuries/slip-and-fall',                      'Injury (faqs.ts)'],
  ['/area-of-pain/back-pain/lower-back-pain',      'Pain area'],
  ['/lp/spine-injections',                         'Paid landing page'],
  ['/lp/adult-scoliosis-treatment',                'Paid landing page'],
];

const stripTags = (html) => html
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ');

/** HTML entities and whitespace normalised, so text comparisons are meaningful. */
const normalise = (s) => s
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#x27;|&#39;|&rsquo;|&#8217;/g, "'")
  .replace(/&nbsp;/g, ' ').replace(/&mdash;/g, '—').replace(/&ndash;/g, '–')
  .replace(/\s+/g, ' ')
  // Stripping an inline tag leaves a space before the punctuation that followed it
  // ("<strong>per year</strong>." becomes "per year ."), which would otherwise
  // report a false mismatch on text that is character-for-character identical.
  .replace(/\s+([.,;:!?)])/g, '$1')
  .replace(/([(])\s+/g, '$1')
  .trim();

/** Every FAQPage block in the document, however it is nested. */
function extractFaqSchemas(html) {
  const out = [];
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) {
    let parsed;
    try { parsed = JSON.parse(m[1].trim()); } catch { continue; }
    const visit = (node) => {
      if (!node || typeof node !== 'object') return;
      if (Array.isArray(node)) return node.forEach(visit);
      if (node['@type'] === 'FAQPage' && Array.isArray(node.mainEntity)) out.push(node);
      Object.values(node).forEach(visit);
    };
    visit(parsed);
  }
  return out;
}

/**
 * Is `needle` present in `haystack`?
 *
 * Compares a distinctive slice rather than the whole answer: rendered text can
 * differ from the schema string by markup boundaries, entity encoding, or a
 * trailing link, and a whole-string match would report false failures on text
 * that is genuinely on the page.
 */
function textPresent(haystack, needle) {
  // Google permits limited HTML inside acceptedAnswer.text (links, lists, bold),
  // and this site uses <strong>. Strip it before comparing, or every answer with
  // markup reports a false miss against the tag-stripped page text.
  const n = normalise(stripTags(needle));
  if (n.length < 25) return haystack.includes(n);
  // Take a slice from the middle: the start is often a shared stock phrase and the
  // end often carries a link or punctuation that markup splits.
  const start = Math.floor(n.length * 0.15);
  const slice = n.slice(start, start + 60);
  return haystack.includes(slice);
}

const results = [];

for (const [path, family] of PAGES) {
  const row = { path, family, ok: true, notes: [], status: null };
  try {
    const res = await fetch(BASE + path, { redirect: 'follow' });
    row.status = res.status;
    if (!res.ok) {
      row.ok = false;
      row.notes.push(`HTTP ${res.status}`);
      results.push(row);
      continue;
    }
    const html = await res.text();
    const visible = normalise(stripTags(html));

    const schemas = extractFaqSchemas(html);
    row.schemaBlocks = schemas.length;
    const entities = schemas.flatMap((s) => s.mainEntity);
    row.schemaQuestions = entities.length;

    if (entities.length === 0) {
      row.notes.push('no FAQPage JSON-LD');
    }

    // Every schema answer must be readable in the served document.
    let qMissing = 0, aMissing = 0;
    const missingSamples = [];
    for (const e of entities) {
      const q = e.name || '';
      const a = e.acceptedAnswer?.text || '';
      if (q && !textPresent(visible, q)) { qMissing++; missingSamples.push('Q: ' + normalise(q).slice(0, 70)); }
      if (a && !textPresent(visible, a)) { aMissing++; missingSamples.push('A: ' + normalise(a).slice(0, 70)); }
    }
    // A Q&A rendered twice is not an error, but it is worth knowing about: it
    // usually means two FAQ components are mounted on one page.
    if (entities.length) {
      const probe = normalise(stripTags(entities[0].acceptedAnswer?.text || ''));
      if (probe.length > 40) {
        const slice = probe.slice(10, 60);
        const count = visible.split(slice).length - 1;
        if (count > 1) row.duplicateRender = count;
      }
    }

    row.questionsMissingFromHtml = qMissing;
    row.answersMissingFromHtml = aMissing;
    if (qMissing || aMissing) {
      row.ok = false;
      row.notes.push(`${qMissing} question(s) and ${aMissing} answer(s) in JSON-LD are NOT in the rendered HTML`);
      row.missingSamples = missingSamples.slice(0, 4);
    }

    // Structural hazards that hide text from a crawler even when it is present.
    const hazards = [];
    if (/<details[\s>]/i.test(html)) hazards.push('<details> element (content collapsed by default in some crawlers)');
    // aria-hidden on a FAQ panel removes it from the accessibility tree AND is a
    // strong signal to Google that the content is not for users.
    const ariaHiddenPanels = (html.match(/aria-hidden=["']true["']/gi) || []).length;
    if (ariaHiddenPanels > 0) hazards.push(`${ariaHiddenPanels} aria-hidden="true" element(s) on the page`);
    if (/display:\s*none/i.test(html)) hazards.push('inline display:none present somewhere on the page');
    row.hazards = hazards;

    // A page with FAQ schema but no visible heading is a mismatch worth flagging.
    if (entities.length > 0 && !/frequently asked question|faq/i.test(visible)) {
      row.ok = false;
      row.notes.push('FAQ schema present but no visible FAQ heading');
    }

    if (row.ok && entities.length > 0) {
      row.notes.push(`${entities.length} Q&A pairs, all present in server HTML`);
    }
  } catch (err) {
    row.ok = false;
    row.notes.push('ERROR: ' + String(err.message || err).slice(0, 120));
  }
  results.push(row);
}

// ── report ───────────────────────────────────────────────────────────────────
console.log(`\nFAQ server-rendering audit — ${BASE}`);
console.log('(plain fetch, no JavaScript executed — what a crawler actually reads)\n');
console.log('STATUS  PAGE                                          SCHEMA  Q/A   NOTES');
console.log('-'.repeat(118));
for (const r of results) {
  const qa = r.schemaQuestions != null ? String(r.schemaQuestions).padStart(3) : '  -';
  console.log(
    `${(r.ok ? 'PASS' : 'FAIL').padEnd(7)} ${r.path.padEnd(45)} ${String(r.schemaBlocks ?? '-').padStart(6)}  ${qa}   ${r.notes.join('; ')}`,
  );
  for (const s of r.missingSamples || []) console.log(`        ↳ MISSING ${s}`);
  if (r.duplicateRender) console.log(`        ↳ note: first answer appears ${r.duplicateRender}x in the HTML (two FAQ blocks mounted?)`);
  for (const h of r.hazards || []) console.log(`        ↳ note: ${h}`);
}

const failed = results.filter((r) => !r.ok);
const totalQA = results.reduce((n, r) => n + (r.schemaQuestions || 0), 0);
console.log(`\n${results.length - failed.length}/${results.length} pages pass · ${totalQA} Q&A pairs checked`);
if (failed.length) {
  console.log('\nFAILURES:');
  for (const f of failed) console.log(`  ${f.path}: ${f.notes.join('; ')}`);
}

if (JSON_OUT) {
  await writeFile('faq-ssr-audit-results.json', JSON.stringify(results, null, 2));
  console.log('\nwrote faq-ssr-audit-results.json');
}

process.exit(failed.length ? 1 : 0);
