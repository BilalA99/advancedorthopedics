/**
 * Identity-before-conversion ordering (incident 2026-09-30, fixed 2026-10-01).
 *
 * Google Ads attaches user-provided data to a conversion only if that data is on
 * the dataLayer at the moment the conversion tag reads it. Until 1 October the
 * identity was pushed AFTER the canonical lead event, so the conversion tag always
 * read an empty variable and enhanced conversions never applied.
 *
 * The naive fix — await the hash, then push identity, then push the lead event —
 * is worse than the bug. It puts a hash and a consent check in front of the one
 * event that must fire for every server-accepted lead, which is exactly the
 * mistake that caused the earlier consent-gating incident.
 *
 * What is actually done: hashing starts in pushAcceptedLead, concurrently with
 * reading the server's response body, and the lead event pushes whatever has
 * already settled. So this suite asserts BOTH halves — that the identity gets in
 * front when it is ready, and that nothing about it can delay, duplicate or
 * suppress the lead event when it is not.
 */
import assert from 'node:assert/strict';
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
const events = () => dataLayer().map((e) => e.event);
const indexOfCanonical = () => events().indexOf(CANONICAL_LEAD_EVENT);
const indexOfIdentity = () => dataLayer().findIndex((e) => 'enhanced_conversion_data' in e);

function grantMarketing() {
  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({
    version: CONSENT_VERSION,
    timestamp: '2026-09-20T00:00:00.000Z',
    categories: { necessary: true, analytics: true, marketing: true, functional: false },
  }));
}

let seq = 0;
const uniqueId = (prefix: string) => `${prefix}-${++seq}`;

beforeEach(() => {
  window.localStorage.clear();
  window.sessionStorage.clear();
  (window as DataLayerWindow).dataLayer = [];
});

const BASE = {
  form_name: 'ConsultationForm',
  form_source: 'general-contact' as const,
  state: 'florida',
  email: 'patient@example.com',
  phone: '5615551212',
  firstName: 'Pat',
  lastName: 'Example',
};

/**
 * A Response whose body read takes a real tick, which is what the production path
 * does and what gives the hash time to settle. Using a plain object instead would
 * test a path that skips the concurrency entirely.
 */
function acceptanceResponse(submissionId: string): Response {
  return new Response(JSON.stringify({ ok: true, submissionId }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
}

// ---------------------------------------------------------------------------
// The regression this suite exists for.
// ---------------------------------------------------------------------------

test('identity is on the dataLayer BEFORE the conversion event', async () => {
  grantMarketing();
  await pushAcceptedLead({ acceptance: acceptanceResponse(uniqueId('order')), ...BASE });

  const identityAt = indexOfIdentity();
  const canonicalAt = indexOfCanonical();

  assert.notEqual(identityAt, -1, 'identity must be pushed at all');
  assert.notEqual(canonicalAt, -1, 'the lead event must always fire');
  assert.ok(
    identityAt < canonicalAt,
    `identity must precede the conversion event so the tag can read it; got ${JSON.stringify(events())}`,
  );
});

test('exactly one identity push per submission', async () => {
  grantMarketing();
  await pushAcceptedLead({ acceptance: acceptanceResponse(uniqueId('once')), ...BASE });

  const identityEvents = dataLayer().filter((e) => 'enhanced_conversion_data' in e);
  assert.equal(
    identityEvents.length,
    1,
    'pushing early AND late would fire any tag listening on ec_capture twice',
  );
});

// ---------------------------------------------------------------------------
// The lead event must survive everything the identity path can do wrong.
// ---------------------------------------------------------------------------

test('refused marketing consent suppresses identity but not the lead event', async () => {
  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({
    version: CONSENT_VERSION,
    timestamp: '2026-09-20T00:00:00.000Z',
    categories: { necessary: true, analytics: true, marketing: false, functional: false },
  }));

  await pushAcceptedLead({ acceptance: acceptanceResponse(uniqueId('refused')), ...BASE });

  assert.equal(indexOfIdentity(), -1, 'ad_user_data is denied');
  assert.notEqual(indexOfCanonical(), -1, 'the business fact is not an advertising decision');
});

test('a broken hash still lets the lead event through, and does not reorder it', async () => {
  grantMarketing();
  const realCrypto = globalThis.crypto;
  // Remove subtle so sha256Hex yields undefined digests rather than throwing, and
  // also cover the throwing case by making the getter itself hostile.
  Object.defineProperty(globalThis, 'crypto', {
    value: { get subtle(): never { throw new Error('no subtle crypto'); } },
    configurable: true,
  });
  try {
    await pushAcceptedLead({ acceptance: acceptanceResponse(uniqueId('broken')), ...BASE });
  } finally {
    Object.defineProperty(globalThis, 'crypto', { value: realCrypto, configurable: true });
  }

  assert.notEqual(indexOfCanonical(), -1, 'a failed hash must never cost the lead event');
});

test('a lead with no identity at all still emits the lead event', async () => {
  grantMarketing();
  await pushAcceptedLead({
    acceptance: acceptanceResponse(uniqueId('anon')),
    form_name: 'ConsultationForm',
    form_source: 'general-contact' as const,
    state: 'new-jersey',
  });

  assert.equal(indexOfIdentity(), -1, 'nothing to hash means nothing to push');
  assert.notEqual(indexOfCanonical(), -1);
  assert.equal(dataLayer()[indexOfCanonical()].market, 'NJ');
});

test('an unqualified lead emits neither identity nor conversion', async () => {
  grantMarketing();
  await pushAcceptedLead({
    acceptance: acceptanceResponse(uniqueId('unqualified')),
    ...BASE,
    lead_qualification: 'unqualified',
  });

  assert.equal(indexOfCanonical(), -1, 'an unqualified lead is not a conversion');
  assert.equal(
    indexOfIdentity(),
    -1,
    'and its identity must not reach an advertising payload either',
  );
});

// ---------------------------------------------------------------------------
// Identity content, asserted at its new position.
// ---------------------------------------------------------------------------

test('the early identity push is hashed and carries no plaintext', async () => {
  grantMarketing();
  await pushAcceptedLead({ acceptance: acceptanceResponse(uniqueId('hashed')), ...BASE });

  const identity = dataLayer()[indexOfIdentity()].enhanced_conversion_data as Record<string, unknown>;
  const serialised = JSON.stringify(identity);

  assert.ok(identity.sha256_email_address, 'email must be hashed, not absent');
  assert.ok(identity.sha256_phone_number, 'phone must be hashed, not absent');
  assert.equal(serialised.includes('patient@example.com'), false, 'no plaintext email');
  assert.equal(serialised.includes('5615551212'), false, 'no plaintext phone');
  assert.equal(serialised.includes('Pat'), false, 'no plaintext first name');
});
