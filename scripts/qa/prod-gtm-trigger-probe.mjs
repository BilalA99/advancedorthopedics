/**
 * Does GTM fire the Google Ads conversion when it receives the canonical lead event?
 *
 * This is the narrow question the incident turns on. Leads ARE reaching Supabase,
 * so form submission works; what is disputed is whether a submission is COUNTED as
 * a Google Ads conversion.
 *
 * Rather than drive the form (which tests the site, already known to work), this
 * loads a real production page with the live container and pushes the exact
 * canonical event the site pushes, then watches what leaves the browser. It is the
 * same input GTM sees from a real lead, with none of the form's variables.
 *
 * Nothing is submitted and no lead is created — the only thing sent is a dataLayer
 * push, which is what the site itself does on every accepted lead.
 *
 * NOTE ON WHAT THIS PROVES: a conversion request leaving the browser means the tag
 * fired. It does NOT prove Google Ads attributes or reports it — the conversion
 * action could still be paused, set to Secondary, or excluded from "Conversions".
 * Those live in the Ads UI, not the browser. See the verdict text.
 *
 * Usage: node scripts/qa/prod-gtm-trigger-probe.mjs [baseUrl] [market]
 */
import puppeteer from 'puppeteer';
import { randomUUID } from 'node:crypto';

const BASE = process.argv[2] || 'https://mountainspineorthopedics.com';
const MARKETS = (process.argv[3] || 'FL,NJ,NY,GA,PA').split(',');

// protocolTimeout: request interception on a page this heavy can stall a CDP
// round-trip past the 180s default and abort the run mid-probe.
const browser = await puppeteer.launch({
  headless: true,
  protocolTimeout: 300000,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

console.log(`\nGTM trigger probe — ${BASE}`);
console.log('(pushes the canonical lead event; no form, no lead, nothing persisted)\n');

const summary = [];

for (const market of MARKETS) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const hits = [];
  await page.setRequestInterception(true);
  page.on('request', async (req) => {
    const url = req.url();
    // Block any real form POST as a safety net — this probe should never submit.
    if (/\/api\/forms\//.test(url) && req.method() === 'POST') {
      return req.abort();
    }
    if (/googleadservices\.com|doubleclick\.net|google\.com\/pagead|google\.[a-z.]+\/ccm\/collect|analytics\.google\.com|google-analytics\.com/.test(url)) {
      hits.push(url);
    }
    try { await req.continue(); } catch {}
  });

  await page.evaluateOnNewDocument(() => {
    try {
      localStorage.setItem('mso_cookie_consent_v1', JSON.stringify({
        version: 1, timestamp: '2026-09-20T00:00:00.000Z',
        categories: { necessary: true, analytics: true, marketing: true, functional: true },
      }));
    } catch {}
  });

  // domcontentloaded, not networkidle2: since the AW- Google tags were added the
  // page keeps sending remarketing pings, so the network never goes idle and the
  // navigation would time out before the probe ever runs.
  await page.goto(BASE + '/find-care/book-an-appointment', { waitUntil: 'domcontentloaded', timeout: 90000 });
  // Let GTM boot and the consent update settle before measuring.
  await new Promise((r) => setTimeout(r, 4000));

  const before = hits.length;

  // The exact payload buildCanonicalLeadEvent produces.
  await page.evaluate((mkt, sid) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'lead_form_submit_success',
      form_id: 'ConversionProbe',
      form_source: 'book-appointment',
      page_path: '/find-care/book-an-appointment',
      market: mkt,
      submission_id: sid,
    });
  }, market, randomUUID());

  await new Promise((r) => setTimeout(r, 5000));

  const fired = hits.slice(before);
  const conversions = fired.filter((u) => /\/pagead\/conversion|\/pagead\/1p-conversion|\/ccm\/collect/.test(u));

  const ids = [...new Set(conversions.map((u) => {
    const id = (u.match(/conversion(?:_async)?\/(\d+)/) || [])[1];
    const label = (u.match(/[?&]label=([^&]+)/) || [])[1];
    return id ? `AW-${id}${label ? '/' + decodeURIComponent(label) : ''}` : null;
  }).filter(Boolean))];

  // Print every request so "2 hits but 0 conversions" is explainable rather than
  // just puzzling: a GA4 collect hit means the event reached GTM and GTM acted on
  // it for GA4 but not for Ads, which narrows the fault to the Ads tags alone.
  for (const u of fired) {
    console.log('        ' + u.slice(0, 400));
  }

  summary.push({ market, total: fired.length, conversions: conversions.length, ids });
  console.log(`market=${market.padEnd(3)} google requests after push: ${String(fired.length).padStart(2)}   conversion pings: ${conversions.length}${ids.length ? '   ' + ids.join(', ') : ''}`);

  await page.close();
}

await browser.close();

console.log('\n─── VERDICT ─────────────────────────────────────────────');
const anyConv = summary.some((s) => s.conversions > 0);
const flConv = summary.find((s) => s.market === 'FL')?.conversions || 0;
const njConv = summary.find((s) => s.market === 'NJ')?.conversions || 0;

if (!anyConv) {
  console.log('NO conversion request fired for ANY market.');
  console.log('GTM received the canonical event and did not act on it. The fault is in');
  console.log('the container: the Google Ads conversion tags are paused, their trigger');
  console.log('no longer matches, or a blocking exception was added. Code is not at fault —');
  console.log('the site pushed exactly what the tags listen for.');
} else {
  console.log(`FL fired ${flConv}, NJ fired ${njConv}.`);
  console.log('A conversion request leaving the browser means the TAG fired. It does not');
  console.log('prove Google Ads counts it: the conversion action can still be paused, set');
  console.log('to Secondary, or excluded from the Conversions column. Check the Ads UI.');
}
for (const s of summary) {
  if (s.conversions === 0) console.log(`  · market=${s.market}: no conversion — expected if no tag is bound to lead_form_submit_success_${s.market}`);
}
