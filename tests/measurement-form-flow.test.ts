/**
 * Click identifiers, the end-to-end submit path, and the single-success-path
 * guarantee across every form in the site.
 *
 * The end-to-end case drives the exact sequence a form component runs —
 * fetch() the API, hand the raw Response to pushAcceptedLead — so Response
 * parsing, acceptance validation and the dataLayer push are all exercised
 * together rather than stubbed.
 */
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import test, { beforeEach } from 'node:test';
import { JSDOM } from 'jsdom';

import { CANONICAL_LEAD_EVENT } from '../lib/lead-contract';
import { CONSENT_STORAGE_KEY, CONSENT_VERSION } from '../lib/consent';
import { captureGclid, captureUtmParams, getAttributionData, getStoredGclid } from '../lib/gclid';
import { pushAcceptedLead } from '../utils/enhancedConversions';

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'https://mountainspineorthopedics.com/',
});
Object.defineProperty(globalThis, 'window', { value: dom.window, configurable: true });
Object.defineProperty(globalThis, 'document', { value: dom.window.document, configurable: true });

type DataLayerWindow = typeof window & { dataLayer: Array<Record<string, unknown>> };
const dataLayer = () => (window as DataLayerWindow).dataLayer;
const canonical = () => dataLayer().filter((e) => e.event === CANONICAL_LEAD_EVENT);

function setConsent(analytics: boolean, marketing: boolean) {
  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({
    version: CONSENT_VERSION,
    timestamp: '2026-09-20T00:00:00.000Z',
    categories: { necessary: true, analytics, marketing, functional: false },
  }));
}

function clearCookies() {
  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.split('=')[0]?.trim();
    if (name) document.cookie = `${name}=; Max-Age=0; path=/`;
  });
}

let seq = 0;
const uniqueId = (prefix: string) => `${prefix}-${++seq}`;

beforeEach(() => {
  window.localStorage.clear();
  window.sessionStorage.clear();
  clearCookies();
  (window as DataLayerWindow).dataLayer = [];
  window.history.replaceState({}, '', '/');
});

// ---------------------------------------------------------------------------
// Click identifiers. Their presence or absence is orthogonal to the base event.
// ---------------------------------------------------------------------------

test('a lead with no click identifier still emits the base event', async () => {
  const attribution = getAttributionData();
  assert.equal(attribution.gclid, '');
  assert.equal(attribution.gbraid, '');
  assert.equal(attribution.wbraid, '');

  await pushAcceptedLead({
    acceptance: { ok: true, submissionId: uniqueId('no-clickid') },
    form_name: 'ContactForm', form_source: 'general-contact', state: 'florida',
  });

  assert.equal(canonical().length, 1, 'organic leads are conversions too');
});

test('a real-format Google click identifier is preserved through navigation when consent permits', () => {
  setConsent(true, true);
  // Realistic shape: Google click ids are long, opaque, URL-safe strings.
  const gclid = 'Cj0KCQjwltKmBhDXARIsAFytc0aQ7mR3vZxK1LpN8sE4dW2bYhG9TqUvX6cZ';
  window.history.replaceState({}, '', `/lp/adult-scoliosis-treatment?gclid=${gclid}&utm_source=google&utm_medium=cpc`);

  captureGclid();
  captureUtmParams();

  // Navigate on, as a visitor would, then submit from a different page.
  window.history.replaceState({}, '', '/find-care/book-an-appointment');

  assert.equal(getStoredGclid(), gclid, 'the real identifier must survive verbatim');
  assert.equal(getAttributionData().utm_source, 'google');
});

test('gbraid and wbraid are preserved in their own right', () => {
  setConsent(true, true);
  window.history.replaceState({}, '', '/?gbraid=AbC123_dEf456-gHi789.jKl');
  captureGclid();
  window.history.replaceState({}, '', '/locations/georgia');

  assert.equal(getAttributionData().gbraid, 'AbC123_dEf456-gHi789.jKl');
});

test('a granted-consent click identifier is not deleted by a later grant', () => {
  setConsent(true, true);
  window.history.replaceState({}, '', '/?gclid=KeepMeAlive_123');
  captureGclid();
  window.history.replaceState({}, '', '/conditions/sciatica');
  assert.equal(getStoredGclid(), 'KeepMeAlive_123');

  // Re-granting consent (e.g. the visitor reopens preferences and re-accepts)
  // must not wipe a legitimate identifier that was already captured.
  setConsent(true, true);
  assert.equal(getStoredGclid(), 'KeepMeAlive_123', 'a legitimate id survives a repeat grant');
});

test('click identifiers are not stored while the consent policy denies marketing storage', () => {
  setConsent(false, false);
  window.history.replaceState({}, '', '/?gclid=ShouldNotPersist_999');
  captureGclid();
  captureUtmParams();

  // Leaving the page drops the URL parameter; nothing may have been written.
  window.history.replaceState({}, '', '/next');
  assert.equal(getStoredGclid(), '', 'no advertising cookie may be written under denied consent');
  assert.equal(getAttributionData().utm_source, '');
});

test('a blocked click identifier does not suppress the base event', async () => {
  setConsent(false, false);
  window.history.replaceState({}, '', '/?gclid=ShouldNotPersist_998');
  captureGclid();

  await pushAcceptedLead({
    acceptance: { ok: true, submissionId: uniqueId('blocked-clickid') },
    form_name: 'ContactForm', form_source: 'general-contact', state: 'new-york',
  });

  assert.equal(canonical().length, 1);
  assert.equal(canonical()[0].market, 'NY');
});

test('no hardcoded placeholder click identifier exists in shipped source', async () => {
  const files = ['lib/gclid.ts', 'utils/enhancedConversions.ts', 'lib/lead-contract.ts', 'lib/consent.ts'];
  const placeholder = /(TEST|DUMMY|FAKE|SAMPLE|PLACEHOLDER|QA)[_-]?(GCLID|GBRAID|WBRAID)/i;

  for (const file of files) {
    const source = await readFile(new URL(`../${file}`, import.meta.url), 'utf8');
    assert.equal(
      placeholder.test(source), false,
      `${file} must never ship a stand-in click identifier`,
    );
    // Nor may a real-looking id be baked in as a default.
    assert.equal(
      /gclid\s*[:=]\s*['"][A-Za-z0-9_.~-]{8,}['"]/.test(source), false,
      `${file} must not hardcode a click identifier value`,
    );
  }
});

// ---------------------------------------------------------------------------
// End-to-end: the real submit sequence a form component runs.
// ---------------------------------------------------------------------------

test('end-to-end: fetch acceptance to dataLayer, for an ignored banner on a paid landing page', async () => {
  // Banner ignored: nothing in localStorage. This is the production majority case.
  window.history.replaceState({}, '', '/lp/adult-scoliosis-treatment');
  const submissionId = uniqueId('e2e');

  // Stand in for the API route, returning exactly what it returns on success.
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response(
    JSON.stringify({ ok: true, submissionId }),
    { status: 200, headers: { 'content-type': 'application/json' } },
  );

  try {
    // Step one of the two-step hero form only opens the modal — no network, no event.
    assert.equal(canonical().length, 0, 'step one must not count as a conversion');

    // Step two: the visitor completes the modal and the form posts.
    const res = await fetch('/api/forms/doctor', { method: 'POST', body: new FormData() });
    assert.equal(res.ok, true);

    const accepted = await pushAcceptedLead({
      acceptance: res,
      form_name: 'BodyPartHeroForm',
      form_source: 'paid-landing',
      state: 'florida',
      email: 'patient@example.com',
      phone: '5615551212',
      firstName: 'Pat',
      lastName: 'Example',
    });

    assert.equal(accepted, true, 'the form must learn the lead was persisted');
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.deepEqual(canonical(), [{
    event: CANONICAL_LEAD_EVENT,
    form_id: 'BodyPartHeroForm',
    form_source: 'paid-landing',
    page_path: '/lp/adult-scoliosis-treatment',
    market: 'FL',
    submission_id: submissionId,
  }]);

  // Owner decision 2026-09-21 (US-only advertising): an ignored banner is an
  // ALLOWED state, so the hashed enhanced-identity push accompanies the lead.
  // Only an explicit refusal suppresses it.
  assert.equal(dataLayer().filter((e) => 'enhanced_conversion_data' in e).length, 1);
});

// ---------------------------------------------------------------------------
// Every form routes through the one shared success path.
// ---------------------------------------------------------------------------

async function collectFormSources(): Promise<Array<{ path: string; source: string }>> {
  const roots = [new URL('../components/', import.meta.url), new URL('../app/', import.meta.url)];
  const found: Array<{ path: string; source: string }> = [];

  async function walk(dir: URL) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
      const child = new URL(`${entry.name}${entry.isDirectory() ? '/' : ''}`, dir);
      if (entry.isDirectory()) {
        await walk(child);
      } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
        const source = await readFile(child, 'utf8');
        // A form is any client module that posts to a lead API route IN CODE.
        // Comments are stripped first: several modules name the endpoints in prose
        // while never posting to one, and matching those classifies a server-side
        // helper as a form and fails on it for not calling a browser-only function.
        const code = source
          .replace(/\/\*[\s\S]*?\*\//g, '')
          .replace(/^\s*\/\/.*$/gm, '');
        if (/\/api\/forms\//.test(code)) {
          found.push({ path: decodeURIComponent(child.pathname), source });
        }
      }
    }
  }

  for (const root of roots) await walk(root);
  return found;
}

test('every lead form reaches the shared accepted-lead helper and none emits the event itself', async () => {
  const forms = await collectFormSources();
  assert.ok(forms.length >= 10, `expected the full form inventory, found ${forms.length}`);

  for (const { path, source } of forms) {
    assert.ok(
      /pushAcceptedLead\s*\(/.test(source),
      `${path} posts a lead but does not route through pushAcceptedLead`,
    );
    // No component may assemble the canonical event or touch dataLayer directly —
    // that is how a second, divergent success path gets introduced.
    assert.equal(
      source.includes(CANONICAL_LEAD_EVENT), false,
      `${path} must not build the canonical event itself`,
    );
    assert.equal(
      /dataLayer\s*\.\s*push/.test(source), false,
      `${path} must not push to dataLayer directly`,
    );
  }
});
