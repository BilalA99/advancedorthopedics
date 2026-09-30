/**
 * Production conversion probe — does a form submission actually fire the Google
 * Ads conversion on the live site?
 *
 * Drives the real production page in a real browser with GTM live, submits the
 * form, and watches what leaves the browser. Answers the question the reported
 * incident turns on: leads are arriving in Supabase, so is the failure in
 * conversion COUNTING rather than lead capture?
 *
 * ## No real lead is created
 *
 * The POST to /api/forms/* is intercepted and answered locally with the exact
 * shape the real endpoint returns. The site's own code then proceeds normally —
 * pushes the canonical dataLayer event, GTM sees it, tags fire or do not — while
 * nothing reaches Supabase, Resend, or the clinic's inbox. That is the whole
 * reason to intercept rather than submit for real.
 *
 * ## What it watches
 *
 *   dataLayer  — did lead_form_submit_success fire, and what `market` did it carry?
 *   network    — did a request reach googleadservices.com / google-analytics.com,
 *                and which conversion id/label did it name?
 *
 * A conversion "fires" only if BOTH happen. The event alone proves the site did
 * its part; the network request proves GTM acted on it.
 *
 * Usage: node scripts/qa/prod-conversion-probe.mjs [baseUrl] [state]
 */
import puppeteer from 'puppeteer';
import { randomUUID } from 'node:crypto';

const BASE = process.argv[2] || 'https://mountainspineorthopedics.com';
const STATE = process.argv[3] || 'Florida';

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

const adsRequests = [];
const posts = [];

await page.setRequestInterception(true);
page.on('request', async (req) => {
  const url = req.url();

  // Intercept the lead POST so nothing is persisted or emailed.
  if (/\/api\/forms\//.test(url) && req.method() === 'POST') {
    posts.push({ url, body: req.postData()?.slice(0, 400) });
    return req.respond({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ ok: true, submissionId: randomUUID() }),
    });
  }

  // Record anything heading to Google's conversion endpoints.
  if (/googleadservices\.com|google-analytics\.com|googletagmanager\.com\/gtag|doubleclick\.net|google\.com\/pagead/.test(url)) {
    adsRequests.push({ method: req.method(), url });
  }

  try { await req.continue(); } catch {}
});

// Capture every dataLayer push before any site code runs.
await page.evaluateOnNewDocument(() => {
  window.__pushes = [];
  const real = [];
  Object.defineProperty(window, 'dataLayer', {
    configurable: true,
    get() { return real; },
    set(v) { if (Array.isArray(v)) { real.length = 0; real.push(...v); } },
  });
  const origPush = Array.prototype.push;
  real.push = function (...args) {
    for (const a of args) { try { window.__pushes.push(JSON.parse(JSON.stringify(a))); } catch { window.__pushes.push({ unserialisable: true }); } }
    return origPush.apply(this, args);
  };
  // Consent: behave like a visitor who accepted, so nothing is suppressed by the
  // banner. The canonical lead event is consent-independent by design, but the
  // Ads tag is not, and the question here is whether the TAG fires.
  try {
    localStorage.setItem('mso_cookie_consent_v1', JSON.stringify({
      version: 1, timestamp: '2026-09-20T00:00:00.000Z',
      categories: { necessary: true, analytics: true, marketing: true, functional: true },
    }));
  } catch {}
});

console.log(`\nProduction conversion probe — ${BASE}`);
console.log('(form POST intercepted: no lead, no email, nothing persisted)\n');

await page.goto(BASE + '/find-care/book-an-appointment', { waitUntil: 'networkidle2', timeout: 90000 });
await new Promise((r) => setTimeout(r, 3000));

// ── Is GTM even on the page? ────────────────────────────────────────────────
const gtmState = await page.evaluate(() => ({
  containers: Array.from(document.querySelectorAll('script[src*="googletagmanager.com/gtm.js"]'))
    .map((s) => (s.getAttribute('src').match(/id=(GTM-[A-Z0-9]+)/) || [])[1]).filter(Boolean),
  googleTags: Array.from(document.querySelectorAll('script[src*="googletagmanager.com/gtag/js"]'))
    .map((s) => (s.getAttribute('src').match(/id=([A-Z]+-[A-Z0-9-]+)/) || [])[1]).filter(Boolean),
  hasDataLayer: Array.isArray(window.dataLayer),
  gtmLoaded: Boolean(window.google_tag_manager),
  gtmContainerKeys: window.google_tag_manager ? Object.keys(window.google_tag_manager).filter((k) => /^(GTM|AW|G)-/.test(k)) : [],
}));
console.log('GTM container(s) on page :', gtmState.containers.join(', ') || '(none)');
console.log('gtag id(s) on page       :', gtmState.googleTags.join(', ') || '(none)');
console.log('GTM runtime loaded       :', gtmState.gtmLoaded);
console.log('GTM runtime containers   :', gtmState.gtmContainerKeys.join(', ') || '(none)');

// ── Fill and submit the booking form ────────────────────────────────────────
const opened = await page.evaluate(() => {
  const trigger = Array.from(document.querySelectorAll('div'))
    .find((d) => /w-full self-center flex items-center justify-center/.test(d.className || '')
      && /Book an Appointment/.test(d.innerText || ''));
  if (trigger) { trigger.click(); return true; }
  return false;
});
await new Promise((r) => setTimeout(r, 2000));
console.log('booking dialog opened    :', opened);

const filled = await page.evaluate((state) => {
  const form = document.querySelector('[role="dialog"] form') || document.querySelector('form');
  if (!form) return 'no form';
  const setVal = (el, v) => {
    const proto = el instanceof window.HTMLTextAreaElement ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, v);
    el.dispatchEvent(new Event('input', { bubbles: true }));
  };
  for (const el of form.querySelectorAll('input:not([type=hidden]):not([type=file]), textarea')) {
    const d = `${el.id} ${el.name || ''} ${el.placeholder || ''}`.toLowerCase();
    if (/website/.test(d)) continue;
    if (el.value) continue;
    if (/first/.test(d)) setVal(el, 'Probe');
    else if (/last/.test(d)) setVal(el, 'Diagnostic');
    else if (/mail/.test(d)) setVal(el, 'probe+conversion@example.com');
    else if (/phone|tel/.test(d)) setVal(el, '5615550199');
    else if (/zip|postal|33463/.test(d)) setVal(el, '33463');
    else if (el instanceof window.HTMLTextAreaElement) setVal(el, 'Automated conversion-tracking probe. Not a patient enquiry.');
  }
  return 'filled';
}, STATE);
console.log('form fill                :', filled);

// Every Radix select still showing a placeholder, driven by keyboard.
//
// Addressed by role rather than aria-label: the deployed build's labels differ
// from the working tree's, and a selector keyed on the label silently matches
// nothing and leaves the field unset — which then reads as a broken form.
for (let round = 0; round < 6; round++) {
  const handles = await page.$$('[role="combobox"]');
  let acted = false;
  for (const el of handles) {
    const info = await page.evaluate((e) => ({
      text: (e.textContent || '').trim(),
      visible: e.getClientRects().length > 0,
    }), el);
    if (!info.visible || !/^select /i.test(info.text)) continue;

    await page.evaluate((e) => { e.scrollIntoView({ block: 'center' }); e.focus(); }, el);
    await page.keyboard.press('Enter');
    await new Promise((r) => setTimeout(r, 650));

    if (/state/i.test(info.text)) {
      await page.keyboard.type(STATE.slice(0, 7), { delay: 70 });
      await new Promise((r) => setTimeout(r, 300));
    } else {
      await page.keyboard.press('ArrowDown');
      await new Promise((r) => setTimeout(r, 200));
    }
    await page.keyboard.press('Enter');
    await new Promise((r) => setTimeout(r, 550));

    const after = await page.evaluate((e) => (e.textContent || '').trim(), el);
    console.log(`  select "${info.text}" -> "${after}"`);
    acted = true;
    break;
  }
  if (!acted) break;
}

await page.waitForFunction(() => getComputedStyle(document.body).pointerEvents !== 'none', { timeout: 5000 }).catch(() => {});
await page.evaluate(() => {
  const scope = document.querySelector('[role="dialog"]') || document;
  const btns = Array.from(scope.querySelectorAll('button')).filter((b) => b.getAttribute('role') !== 'combobox');
  const b = scope.querySelector('button[type="submit"]') || btns[btns.length - 1];
  if (b) { b.scrollIntoView({ block: 'center' }); b.click(); }
});

await new Promise((r) => setTimeout(r, 6000));

// If nothing submitted, say WHY rather than reporting a bare zero.
if (!posts.length) {
  const diag = await page.evaluate(() => {
    const scope = document.querySelector('[role="dialog"]') || document;
    const form = scope.querySelector('form') || document.querySelector('form');
    if (!form) return { note: 'no form element found' };
    return {
      errors: Array.from(form.querySelectorAll('p,span'))
        .map((e) => (e.textContent || '').trim())
        .filter((t) => /must be|required|Invalid|Please (enter|select|provide|fill)/i.test(t))
        .slice(0, 10),
      emptyInputs: Array.from(form.querySelectorAll('input:not([type=hidden]):not([type=file]), textarea'))
        .filter((e) => !e.value)
        .map((e) => e.id || e.name || e.placeholder || e.type)
        .slice(0, 12),
      unsetSelects: Array.from(form.querySelectorAll('[role="combobox"]'))
        .map((e) => (e.textContent || '').trim())
        .filter((t) => /^select /i.test(t))
        .slice(0, 6),
      buttons: Array.from(form.querySelectorAll('button'))
        .map((b) => ({ t: (b.innerText || '').trim().slice(0, 28), role: b.getAttribute('role'), type: b.getAttribute('type') }))
        .slice(0, 8),
    };
  });
  console.log('');
  console.log('─── WHY IT DID NOT SUBMIT ───');
  console.log('validation errors :', JSON.stringify(diag.errors));
  console.log('empty inputs      :', JSON.stringify(diag.emptyInputs));
  console.log('unset selects     :', JSON.stringify(diag.unsetSelects));
  console.log('buttons in form   :', JSON.stringify(diag.buttons));
}

// ── Results ─────────────────────────────────────────────────────────────────
const pushes = await page.evaluate(() => window.__pushes || []);
const leadEvents = pushes.filter((p) => p && p.event === 'lead_form_submit_success');
const errors = await page.evaluate(() => (window.__pushes || []).length);

console.log('\n─── RESULT ───────────────────────────────────────────────');
console.log('form POST intercepted     :', posts.length, posts.length ? '(no lead created)' : '(form did NOT submit)');
console.log('dataLayer pushes total    :', errors);
console.log('lead_form_submit_success  :', leadEvents.length);
for (const e of leadEvents) {
  console.log('   payload                :', JSON.stringify(e));
  console.log('   market (GTM matches on):', JSON.stringify(e.market));
}

const conversionHits = adsRequests.filter((r) => /googleadservices\.com\/pagead\/conversion|google\.com\/pagead\/1p-conversion|\/pagead\/conversion/.test(r.url));
console.log('\nGoogle Ads conversion requests:', conversionHits.length);
for (const r of conversionHits.slice(0, 8)) {
  const id = (r.url.match(/conversion\/(\d+)/) || [])[1];
  const label = (r.url.match(/[?&]label=([^&]+)/) || [])[1];
  console.log(`   ${id ? 'AW-' + id : '?'}${label ? ' / ' + decodeURIComponent(label) : ''}`);
}
console.log('\nall Google network hits   :', adsRequests.length);
const byHost = {};
for (const r of adsRequests) { const h = new URL(r.url).host; byHost[h] = (byHost[h] || 0) + 1; }
for (const [h, n] of Object.entries(byHost)) console.log(`   ${h}: ${n}`);

console.log('\n─── VERDICT ──────────────────────────────────────────────');
if (!posts.length) {
  console.log('INCONCLUSIVE — the form never submitted, so nothing downstream was exercised.');
} else if (!leadEvents.length) {
  console.log('SITE FAULT — the form submitted but pushed NO lead_form_submit_success.');
  console.log('GTM cannot fire a conversion for an event it never receives.');
} else if (!conversionHits.length) {
  console.log('GTM/ADS FAULT — the site pushed lead_form_submit_success correctly,');
  console.log('but no Google Ads conversion request left the browser. The event is');
  console.log('reaching GTM and GTM is not acting on it: check the tag\'s trigger,');
  console.log('its firing conditions, and whether the conversion action still exists.');
} else {
  console.log('WORKING — event pushed AND a Google Ads conversion request was sent.');
}

await browser.close();
