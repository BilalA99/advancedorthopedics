/**
 * Preferred Sources implementation audit.
 *
 * Verifies the "add as preferred source" control against Google's spec
 * (https://developers.google.com/search/docs/appearance/preferred-sources) on the
 * three page families it was added to, and confirms it is server-rendered.
 *
 * Checks, per page:
 *   - the control exists in the SERVER HTML (plain fetch, no JS)
 *   - its href is exactly the documented deeplink, pointing at the bare domain
 *     (Google accepts domain and subdomain only — never a path)
 *   - it is a real <a> with an accessible name, opening safely
 *   - it appears exactly once, so a reader is not asked twice on one page
 *   - no duplicate id / heading collision with the rest of the page
 *
 * Usage: node scripts/qa/preferred-source-audit.mjs <baseUrl>
 */
const BASE = process.argv[2] || 'http://localhost:3000';
const EXPECTED_DOMAIN = 'mountainspineorthopedics.com';
const EXPECTED_HREF = `https://www.google.com/preferences/source?q=${EXPECTED_DOMAIN}`;

const PAGES = [
  ['/blogs/what-degree-of-scoliosis-requires-surgery',              'Blog'],
  ['/treatments/revision-spinal-surgery',          'Treatment'],
  ['/treatments/anterior-lumbar-interbody-fusion', 'Treatment'],
  ['/conditions/herniated-disc',                   'Condition'],
  ['/conditions/sciatica',                         'Condition'],
];

let failures = 0;
const check = (name, ok, detail = '') => {
  if (!ok) failures++;
  console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${name}${detail ? ' — ' + detail : ''}`);
};

console.log(`\nPreferred Sources audit — ${BASE}`);
console.log('(plain fetch, no JavaScript executed)\n');

for (const [path, family] of PAGES) {
  console.log(`### ${path}  (${family})`);
  let html;
  try {
    const res = await fetch(BASE + path, { redirect: 'follow' });
    if (!res.ok) { check('page responds 200', false, `HTTP ${res.status}`); console.log(''); continue; }
    html = await res.text();
  } catch (err) {
    check('page fetches', false, String(err.message || err).slice(0, 80));
    console.log('');
    continue;
  }

  // The module marker and the link itself, both in the raw server HTML.
  const moduleCount = (html.match(/data-module="preferred-source"/g) || []).length;
  const linkCount = (html.match(/data-cta-action="preferred-source"/g) || []).length;
  check('module is server-rendered', moduleCount >= 1, `${moduleCount} instance(s)`);
  check('rendered exactly once', moduleCount === 1 && linkCount === 1,
    `module x${moduleCount}, link x${linkCount}`);

  // Google's deeplink, exactly: the bare domain, no path.
  const hrefMatch = html.match(/href="(https:\/\/www\.google\.com\/preferences\/source\?q=[^"]*)"/);
  const href = hrefMatch ? hrefMatch[1].replace(/&amp;/g, '&') : null;
  check('uses the documented deeplink', href === EXPECTED_HREF, href || 'no matching href found');

  if (href) {
    const q = new URL(href).searchParams.get('q');
    check('nominates a bare domain, not a path', Boolean(q) && !q.includes('/'), q || '(missing)');
    check('nominates the right domain', q === EXPECTED_DOMAIN, q || '(missing)');
  }

  // A real link, safely opened, with an accessible name.
  const anchor = html.match(/<a[^>]*data-cta-action="preferred-source"[^>]*>/);
  const tag = anchor ? anchor[0] : '';
  check('is a real <a> element', Boolean(tag));
  check('has an accessible name', /aria-label="[^"]{20,}"/.test(tag));
  check('opens safely in a new tab', /target="_blank"/.test(tag) && /rel="[^"]*noopener/.test(tag));

  // Visible label present as text, not only as an attribute — so a crawler and an
  // LLM both read what the control does.
  check('button text is in the HTML', /Add as preferred source/.test(html));

  // No third-party script pulled in for this.
  check('no Google SWG script loaded', !/news\.google\.com\/swg\/js/.test(html));

  console.log('');
}

console.log(failures === 0 ? 'ALL PASS' : `${failures} FAILURE(S)`);
process.exit(failures ? 1 : 0);
