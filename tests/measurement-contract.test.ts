import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test, { beforeEach } from 'node:test';
import { JSDOM } from 'jsdom';

import {
  CANONICAL_LEAD_EVENT,
  buildCanonicalLeadEvent,
  parseLeadAcceptance,
  resolveFormSource,
} from '../lib/lead-contract';
import { CONSENT_STORAGE_KEY, CONSENT_VERSION } from '../lib/consent';
import { captureGclid, captureUtmParams, getAttributionData } from '../lib/gclid';
import { normalizeStateCode } from '../lib/stateUtils';
import { pushAcceptedLead } from '../utils/enhancedConversions';

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'https://mountainspineorthopedics.com/',
});

Object.defineProperty(globalThis, 'window', { value: dom.window, configurable: true });
Object.defineProperty(globalThis, 'document', { value: dom.window.document, configurable: true });

type DataLayerWindow = typeof window & { dataLayer: Array<Record<string, unknown>> };

function dataLayer() {
  return (window as DataLayerWindow).dataLayer;
}

function grantMeasurementConsent() {
  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({
    version: CONSENT_VERSION,
    timestamp: '2026-08-09T00:00:00.000Z',
    categories: { necessary: true, analytics: true, marketing: true, functional: false },
  }));
}

function clearCookies() {
  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.split('=')[0]?.trim();
    if (name) document.cookie = `${name}=; Max-Age=0; path=/`;
  });
}

beforeEach(() => {
  window.localStorage.clear();
  window.sessionStorage.clear();
  clearCookies();
  window.history.replaceState({}, '', '/');
  (window as DataLayerWindow).dataLayer = [];
  grantMeasurementConsent();
});

test('accepted backend submission emits exactly one non-PII canonical event', async () => {
  window.history.replaceState({}, '', '/find-care/book-an-appointment');
  const context = {
    form_name: 'DoctorContactForm',
    form_source: 'book-appointment' as const,
    state: 'Florida',
    email: 'patient@example.com',
    phone: '5615551212',
    firstName: 'Patient',
    lastName: 'Example',
  };

  assert.equal(await pushAcceptedLead({ acceptance: { ok: true, submissionId: 'qa-lead-1' }, ...context }), true);
  assert.equal(await pushAcceptedLead({ acceptance: { ok: true, submissionId: 'qa-lead-1' }, ...context }), true);

  const canonicalEvents = dataLayer()
    .filter((entry) => entry.event === CANONICAL_LEAD_EVENT);
  assert.equal(canonicalEvents.length, 1);
  assert.deepEqual(canonicalEvents[0], {
    event: CANONICAL_LEAD_EVENT,
    form_id: 'DoctorContactForm',
    form_source: 'book-appointment',
    page_path: '/find-care/book-an-appointment',
    market: 'FL',
    submission_id: 'qa-lead-1',
  });
  for (const forbidden of ['email', 'phone', 'firstName', 'lastName', 'name', 'reason']) {
    assert.equal(forbidden in canonicalEvents[0], false);
  }
});

test('invalid input and rejected backend responses emit zero success events', async () => {
  assert.equal(parseLeadAcceptance(null), null);
  assert.equal(await pushAcceptedLead({
    acceptance: null,
    form_name: 'ConsultationForm',
    form_source: 'general-contact',
    state: 'FL',
  }), false);

  const rejected = new Response(JSON.stringify({ ok: false }), {
    status: 500,
    headers: { 'content-type': 'application/json' },
  });
  assert.equal(await pushAcceptedLead({
    acceptance: rejected,
    form_name: 'ConsultationForm',
    form_source: 'general-contact',
    state: 'FL',
  }), false);
  assert.equal(dataLayer()
    .filter((entry) => entry.event === CANONICAL_LEAD_EVENT).length, 0);
});

test('GCLID, GBRAID, WBRAID, and all supported UTMs persist across navigation', () => {
  window.history.replaceState({}, '', '/?gclid=QA_GCLID_123&gbraid=QA_GBRAID_123&wbraid=QA_WBRAID_123&utm_source=google&utm_medium=cpc&utm_campaign=qa_tracking&utm_term=qa_term&utm_content=qa_content');
  captureGclid();
  captureUtmParams();
  window.history.replaceState({}, '', '/find-care/book-an-appointment');

  assert.deepEqual(getAttributionData(), {
    gclid: 'QA_GCLID_123',
    gbraid: 'QA_GBRAID_123',
    wbraid: 'QA_WBRAID_123',
    fbclid: '',
    msclkid: '',
    utm_source: 'google',
    utm_medium: 'cpc',
    utm_campaign: 'qa_tracking',
    utm_term: 'qa_term',
    utm_content: 'qa_content',
  });
});

test('new valid Google click replaces the previous Google click-ID set', () => {
  window.history.replaceState({}, '', '/?gclid=QA_GCLID_OLD');
  captureGclid();
  window.history.replaceState({}, '', '/?gbraid=QA_GBRAID_NEW');
  captureGclid();
  window.history.replaceState({}, '', '/next');

  const attribution = getAttributionData();
  assert.equal(attribution.gclid, '');
  assert.equal(attribution.gbraid, 'QA_GBRAID_NEW');
  assert.equal(attribution.wbraid, '');
});

test('state variants normalize at the storage and analytics boundary', () => {
  const cases: Array<[string, string]> = [
    ['FL', 'FL'], ['FLORIDA', 'FL'], ['Florida', 'FL'],
    ['NJ', 'NJ'], ['NEW-JERSEY', 'NJ'], ['NEW JERSEY', 'NJ'], ['New Jersey', 'NJ'],
    ['NY', 'NY'], ['NEW-YORK', 'NY'], ['NEW YORK', 'NY'], ['New York', 'NY'],
  ];
  cases.forEach(([input, expected]) => assert.equal(normalizeStateCode(input), expected));
});

test('form-source classification respects form placement and originating path', () => {
  assert.equal(resolveFormSource({ pathname: '/find-care/book-an-appointment', formId: 'DoctorContactForm' }), 'book-appointment');
  assert.equal(resolveFormSource({ pathname: '/about/meetourdoctors/john-doe', formId: 'DoctorContactForm' }), 'doctor-contact');
  assert.equal(resolveFormSource({ pathname: '/locations/florida/orlando', formId: 'DoctorContactForm' }), 'location-contact');
  assert.equal(resolveFormSource({ pathname: '/conditions/sciatica', formId: 'DoctorContactForm' }), 'general-contact');
  assert.equal(resolveFormSource({ pathname: '/conditions/sciatica', formId: 'BookAnAppoitmentButton' }), 'modal-appointment');
  // Paid landing pages get their own bucket, and it must stay channel-shaped:
  // the source names the traffic type, never the condition the ad group bought.
  assert.equal(resolveFormSource({ pathname: '/lp/adult-scoliosis-treatment', formId: 'BodyPartHeroForm' }), 'paid-landing');
  assert.equal(resolveFormSource({ explicitSource: 'paid-landing' }), 'paid-landing');
});

test('no form source encodes a condition, symptom, or insurance status', async () => {
  const { FORM_SOURCES } = await import('../lib/lead-contract');
  // GA4 and Google Ads receive form_source verbatim. A value naming a medical
  // condition or a payer would turn an ad-platform parameter into a health
  // signal about the visitor, which is exactly what must stay first-party.
  //
  // Matched per hyphen-delimited token, not as a substring: "book-appointment"
  // contains "ppo" inside "appointment" and is perfectly fine.
  //
  // The existing injury-vertical sources (car-accident, work-injury, ...) are
  // deliberately not covered here. They describe the legal/referral vertical the
  // lead came through, which the practice already treats as a business category,
  // and changing them is a decision for the team rather than something this test
  // should force. What this guards is diagnosis and payer terms.
  const forbiddenTokens = new Set([
    'scoliosis', 'sciatica', 'stenosis', 'herniated', 'hernia', 'disc', 'fracture',
    'arthritis', 'cancer', 'tumor', 'surgery', 'surgical', 'pain', 'symptom',
    'symptoms', 'diagnosis', 'ppo', 'hmo', 'medicare', 'medicaid', 'insurance',
    'insured', 'uninsured', 'payer', 'selfpay',
  ]);
  for (const source of FORM_SOURCES) {
    for (const token of source.split('-')) {
      assert.equal(
        forbiddenTokens.has(token),
        false,
        `form source "${source}" leaks a health or payer signal ("${token}")`,
      );
    }
  }
});

test('canonical payload builder contains only approved non-sensitive context', () => {
  assert.deepEqual(buildCanonicalLeadEvent({
    formId: 'StateHeroForm',
    formSource: 'state-consultation',
    pagePath: '/locations/new-jersey',
    state: 'NEW JERSEY',
    submissionId: 474,
  }), {
    event: CANONICAL_LEAD_EVENT,
    form_id: 'StateHeroForm',
    form_source: 'state-consultation',
    page_path: '/locations/new-jersey',
    market: 'NJ',
    submission_id: '474',
  });
});

test('thank-you presentation has no lead or conversion event emitter', async () => {
  const source = await readFile(new URL('../app/thank-you/page.tsx', import.meta.url), 'utf8');
  assert.equal(source.includes('lead_form_submit_success'), false);
  assert.equal(source.includes('pushFormSubmit'), false);
  assert.equal(source.includes('pushAcceptedLead'), false);
  assert.equal(source.includes('restoreECFromSession'), false);
});

test('landing_path is persisted server-side and never reaches the GA4 or Ads payload', async () => {
  // It must exist on the Supabase write path — that is the whole point of the field.
  const persistence = await readFile(
    new URL('../components/email/sendcontactemail.ts', import.meta.url), 'utf8');
  assert.ok(
    /landing_path:\s*data\.landing_path/.test(persistence),
    'landing_path must be written to the Supabase forms row',
  );

  // And it must NOT appear in the canonical client event, under any casing.
  const event = buildCanonicalLeadEvent({
    formId: 'InjectionsLandingForm',
    formSource: 'paid-landing',
    pagePath: '/lp/spine-and-back-injections',
    state: 'FLORIDA',
    submissionId: 991,
  }) as Record<string, unknown>;

  for (const key of Object.keys(event)) {
    assert.equal(
      /landing[_-]?path/i.test(key), false,
      `landing_path must not reach the measurement payload (found key "${key}")`,
    );
  }
  // NOTE: `page_path` legitimately carries the submitting page's pathname and is part
  // of the existing contract, so the pathname itself is not what this guards. What it
  // guards is that no SECOND, separately-named landing-page field is introduced —
  // landing_path exists to enable per-LP analysis server-side, not to add another path
  // field to the ad platform.
  assert.equal(
    Object.prototype.hasOwnProperty.call(event, 'landing_path'), false,
    'landing_path must not be a key on the measurement payload',
  );

  // The client-side measurement module must not reference it at all.
  const client = await readFile(
    new URL('../utils/enhancedConversions.ts', import.meta.url), 'utf8');
  assert.equal(
    client.includes('landing_path'), false,
    'landing_path must stay server-side; the client measurement module must not touch it',
  );
});

test('enhanced conversions PII is hashed before it reaches dataLayer', async () => {
  const source = await readFile(
    new URL('../utils/enhancedConversions.ts', import.meta.url), 'utf8');

  // Hashing must happen, and it must be SHA-256.
  assert.ok(source.includes("crypto.subtle.digest('SHA-256'"), 'must hash with SHA-256');

  // Every enhanced_conversion_data push must go through the hashing builder rather
  // than assembling a plaintext object literal.
  const plaintextPush = /enhanced_conversion_data:\s*\{\s*[\r\n]+\s*(email|phone_number):/;
  assert.equal(
    plaintextPush.test(source), false,
    'no enhanced_conversion_data push may contain plaintext email or phone_number',
  );

  // Pre-hashed values must use the sha256_ field names. Pushing hashed values under
  // the raw names would make GTM hash a second time and silently break matching.
  assert.ok(source.includes('sha256_email_address'), 'hashed email must use sha256_email_address');
  assert.ok(source.includes('sha256_phone_number'), 'hashed phone must use sha256_phone_number');

  // postal_code and country are unhashed per Google's spec.
  assert.ok(/postal_code: n\.address\.postal_code/.test(source), 'postal_code stays unhashed');
});
