/**
 * Consent-decoupling contract.
 *
 * The canonical accepted-lead event carries no PII and no advertising identity.
 * It is an operational record that a real, server-accepted lead exists, so it
 * must fire for every accepted submission regardless of what the visitor chose
 * in the cookie banner. Consent governs what the TAGS do with it (Google Consent
 * Mode), not whether the business fact is recorded.
 *
 * Every test here runs with NO consent stored — the state of a visitor who
 * ignored the banner — unless it explicitly grants some.
 */
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import test, { beforeEach } from 'node:test';
import { JSDOM } from 'jsdom';

import { CANONICAL_LEAD_EVENT } from '../lib/lead-contract';
import { CONSENT_STORAGE_KEY, CONSENT_VERSION } from '../lib/consent';
import { pushAcceptedLead } from '../utils/enhancedConversions';

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'https://mountainspineorthopedics.com/',
});
Object.defineProperty(globalThis, 'window', { value: dom.window, configurable: true });
Object.defineProperty(globalThis, 'document', { value: dom.window.document, configurable: true });

type DataLayerWindow = typeof window & { dataLayer: Array<Record<string, unknown>> };
const dataLayer = () => (window as DataLayerWindow).dataLayer;
const canonical = () => dataLayer().filter((e) => e.event === CANONICAL_LEAD_EVENT);
const enhanced = () => dataLayer().filter((e) => 'enhanced_conversion_data' in e);

function setConsent(analytics: boolean, marketing: boolean) {
  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({
    version: CONSENT_VERSION,
    timestamp: '2026-09-20T00:00:00.000Z',
    categories: { necessary: true, analytics, marketing, functional: false },
  }));
}

let seq = 0;
const uniqueId = (prefix: string) => `${prefix}-${++seq}`;

beforeEach(() => {
  window.localStorage.clear();
  window.sessionStorage.clear();
  (window as DataLayerWindow).dataLayer = [];
  window.history.replaceState({}, '', '/');
});

const BASE = {
  form_name: 'ConsultationForm',
  form_source: 'general-contact' as const,
  email: 'patient@example.com',
  phone: '5615551212',
  firstName: 'Pat',
  lastName: 'Example',
};

// ---------------------------------------------------------------------------
// The regression this suite exists for.
// ---------------------------------------------------------------------------

test('banner ignored (no consent stored) still emits the canonical accepted-lead event', async () => {
  const submissionId = uniqueId('ignored');
  assert.equal(
    await pushAcceptedLead({ acceptance: { ok: true, submissionId }, state: 'florida', ...BASE }),
    true,
  );

  assert.equal(canonical().length, 1, 'a server-accepted lead must always produce the business event');
  assert.equal(canonical()[0].market, 'FL');
  assert.equal(canonical()[0].submission_id, submissionId);
  // Opt-in: an ignored banner is not consent, so no hashed enhanced identity.
  // Consent Mode (denied by default) governs what the tags do with the event.
  assert.equal(enhanced().length, 0, 'undecided is not consent, so no enhanced identity is sent');
});

test('all categories rejected still emits the canonical accepted-lead event', async () => {
  setConsent(false, false);
  const submissionId = uniqueId('rejected');
  await pushAcceptedLead({ acceptance: { ok: true, submissionId }, state: 'georgia', ...BASE });

  assert.equal(canonical().length, 1);
  assert.equal(canonical()[0].market, 'GA');
  assert.equal(enhanced().length, 0, 'rejection must suppress identity, not the business event');
});

test('analytics-only consent emits the base event and no enhanced identity', async () => {
  setConsent(true, false);
  await pushAcceptedLead({ acceptance: { ok: true, submissionId: uniqueId('analytics') }, state: 'new-york', ...BASE });

  assert.equal(canonical().length, 1);
  assert.equal(canonical()[0].market, 'NY');
  assert.equal(enhanced().length, 0, 'ad_user_data is denied under analytics-only consent');
});

test('marketing consent granted emits the base event plus exactly one enhanced identity push', async () => {
  setConsent(true, true);
  await pushAcceptedLead({ acceptance: { ok: true, submissionId: uniqueId('granted') }, state: 'pennsylvania', ...BASE });

  assert.equal(canonical().length, 1);
  assert.equal(canonical()[0].market, 'PA');
  assert.equal(enhanced().length, 1, 'one accepted lead yields at most one enhanced-data event');

  const ec = enhanced()[0].enhanced_conversion_data as Record<string, unknown>;
  assert.ok(ec.sha256_email_address, 'email must be hashed, not absent');
  assert.equal(JSON.stringify(ec).includes('patient@example.com'), false, 'no plaintext email');
  assert.equal(JSON.stringify(ec).includes('5615551212'), false, 'no plaintext phone');
});

// ---------------------------------------------------------------------------
// The base event must survive a broken enhanced-conversions step.
// ---------------------------------------------------------------------------

test('a failing enhanced-data step does not prevent the base conversion event', async () => {
  setConsent(true, true);
  const realCrypto = globalThis.crypto;
  // Force buildHashedEC's digest to throw — the harshest realistic failure.
  Object.defineProperty(globalThis, 'crypto', {
    value: { subtle: { digest: () => { throw new Error('subtle unavailable'); } } },
    configurable: true,
  });

  try {
    await pushAcceptedLead({ acceptance: { ok: true, submissionId: uniqueId('ecfail') }, state: 'FL', ...BASE });
  } finally {
    Object.defineProperty(globalThis, 'crypto', { value: realCrypto, configurable: true });
  }

  assert.equal(canonical().length, 1, 'enhanced-conversion failure must never swallow the business event');
});

// ---------------------------------------------------------------------------
// The build gate itself. If the accepted-lead push is ever re-gated behind
// consent, `npm run build` must fail before the regression can ship.
// ---------------------------------------------------------------------------

test('the measurement-contract build gate passes against the current source', () => {
  const script = fileURLToPath(new URL('../scripts/validate-measurement-contract.mjs', import.meta.url));
  const output = execFileSync(process.execPath, [script], { encoding: 'utf8' });
  assert.match(output, /checks passed/, output);
});

// ---------------------------------------------------------------------------
// Opt-in Consent Mode posture: denied for every visitor until they accept.
// ---------------------------------------------------------------------------

test('the Consent Mode default denies every optional signal, globally', async () => {
  const { readFile } = await import('node:fs/promises');
  const layout = await readFile(new URL('../app/layout.tsx', import.meta.url), 'utf8');

  const blocks = [...layout.matchAll(
    /gtag\s*\(\s*['"]consent['"]\s*,\s*['"]default['"]\s*,\s*\{([\s\S]*?)\}\s*\)/g,
  )].map((m) => m[1]);
  assert.equal(blocks.length, 1, 'expected exactly one, global, consent default');
  assert.doesNotMatch(blocks[0], /region\s*:/, 'the default must not be region-scoped');

  for (const signal of [
    'ad_storage', 'analytics_storage', 'ad_user_data', 'ad_personalization',
    'functionality_storage', 'personalization_storage',
  ]) {
    assert.match(blocks[0], new RegExp(`${signal}\\s*:\\s*'denied'`), `${signal} denied by default`);
  }
});

test('the undecided runtime state cannot grant over the denied default', async () => {
  // CookieConsentManager issues a Consent Mode update on mount. If the undecided
  // categories granted, that update would override the denied HTML default for
  // every visitor who never answers the banner.
  const { undecidedConsentCategories, getGoogleConsentPayload, isAdvertisingAllowed } =
    await import('../lib/consent');
  assert.equal(undecidedConsentCategories.analytics, false);
  assert.equal(undecidedConsentCategories.marketing, false);
  assert.equal(undecidedConsentCategories.functional, false);

  const payload = getGoogleConsentPayload(undecidedConsentCategories);
  for (const signal of ['ad_storage', 'analytics_storage', 'ad_user_data', 'ad_personalization'] as const) {
    assert.equal(payload[signal], 'denied', `${signal} must be denied while undecided`);
  }

  window.localStorage.clear();
  assert.equal(isAdvertisingAllowed(), false, 'an undecided visitor is not an advertising audience');
});

test('an explicit refusal still denies every advertising signal', async () => {
  const { defaultConsentCategories, getGoogleConsentPayload } = await import('../lib/consent');
  const payload = getGoogleConsentPayload(defaultConsentCategories);
  for (const signal of ['ad_storage', 'analytics_storage', 'ad_user_data', 'ad_personalization'] as const) {
    assert.equal(payload[signal], 'denied', `${signal} must be denied on refusal`);
  }
  assert.equal(payload.security_storage, 'granted');
});

test('an explicit refusal still suppresses enhanced identity', async () => {
  const meta = await import('../utils/enhancedConversions');
  setConsent(false, false);
  await meta.pushAcceptedLead({
    acceptance: { ok: true, submissionId: uniqueId('refused-ec') },
    state: 'florida', ...BASE,
  });
  assert.equal(canonical().length, 1, 'the business event still fires');
  assert.equal(enhanced().length, 0, 'identity must stop on an explicit refusal');
});
