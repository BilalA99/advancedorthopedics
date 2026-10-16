/**
 * Insurance qualification, conversion gating and thank-you routing.
 *
 * The option list is Abubeckr's 2026-10-14 spec (Slack #mountain-spine-and-
 * orthopedics, items 9 to 12): seven options, the first five tracked, the last two
 * untracked, decided on the server, never in a URL.
 *
 * Two things must hold together, and the value of these tests is that they hold
 * them together:
 *
 *   1. An accepted-insurance lead fires the qualified conversion exactly once
 *      and lands on the tracked thank-you page.
 *   2. An "Other" lead fires NOTHING to any advertising surface, lands on a
 *      different page, and cannot be promoted into a conversion by a retry.
 *
 * Plus the privacy invariant: the insurance answer never appears in the
 * advertising payload, under any key, for either route.
 *
 * As with the other measurement tests, every case runs with NO consent stored
 * unless it grants some, so behaviour is proven for the visitor who ignored the
 * banner.
 */
import assert from 'node:assert/strict';
import test, { beforeEach } from 'node:test';
import { JSDOM } from 'jsdom';

import { CANONICAL_LEAD_EVENT } from '../lib/lead-contract';
import {
  classifyInsurance,
  getInsuranceOptions,
  routeForInsurance,
  thankYouPathFor,
  INSURANCE_OPTIONS,
  INSURANCE_PLACEHOLDER,
  INSURANCE_CARD_UPLOAD_LABEL,
  QUALIFIED_THANK_YOU_PATH,
  UNQUALIFIED_THANK_YOU_PATH,
} from '../lib/insurance-routing';
import { INSURANCE_PLANS } from '../components/data/insurancePlans';
import { pushAcceptedLead } from '../utils/enhancedConversions';

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'https://mountainspineorthopedics.com/find-care/book-an-appointment',
});
Object.defineProperty(globalThis, 'window', { value: dom.window, configurable: true });
Object.defineProperty(globalThis, 'document', { value: dom.window.document, configurable: true });

type DataLayerWindow = typeof window & { dataLayer: Array<Record<string, unknown>> };
const dataLayer = () => (window as DataLayerWindow).dataLayer;
const canonical = () => dataLayer().filter((e) => e.event === CANONICAL_LEAD_EVENT);

let seq = 0;
const uniqueId = (prefix: string) => `${prefix}-${++seq}`;

const LEAD = {
  form_name: 'ConsultationForm',
  form_source: 'general-contact' as const,
  state: 'FL',
  email: 'patient@example.com',
  phone: '5615551212',
  firstName: 'Pat',
  lastName: 'Example',
};

beforeEach(() => {
  (window as DataLayerWindow).dataLayer = [];
  window.localStorage.clear();
});

// ───────────────────────── option list (Abubeckr, 2026-10-14, item 9) ─────────────────────────

/** The spec, word for word and in order. */
const SPEC_OPTIONS = [
  'Florida Blue / Blue Cross Blue Shield',
  'UnitedHealthcare',
  'Aetna',
  'Cigna',
  'Other job insurance',
  'Medicare / Medicaid / TRICARE',
  'Marketplace or self-pay',
];

test('the dropdown offers exactly the seven spec options, in the spec order', () => {
  assert.deepEqual(getInsuranceOptions().map((o) => o.label), SPEC_OPTIONS);
  assert.equal(INSURANCE_OPTIONS.length, 7);
});

test('each stored value is the exact text the patient chose', () => {
  for (const option of getInsuranceOptions()) {
    assert.equal(option.value, option.label, `${option.label} is stored under a different value`);
  }
});

test('the first five qualify and the last two do not (item 10)', () => {
  const qualification = getInsuranceOptions().map((o) => o.qualification);
  assert.deepEqual(qualification, [
    'qualified', 'qualified', 'qualified', 'qualified', 'qualified',
    'unqualified', 'unqualified',
  ]);
});

test('the first five route to the tracked thank-you page', () => {
  for (const value of SPEC_OPTIONS.slice(0, 5)) {
    assert.equal(classifyInsurance(value), 'qualified', `${value} should qualify`);
    assert.equal(routeForInsurance(value).thankYouPath, QUALIFIED_THANK_YOU_PATH);
  }
});

test('the last two route to the untracked thank-you page', () => {
  for (const value of SPEC_OPTIONS.slice(5)) {
    assert.equal(classifyInsurance(value), 'unqualified', `${value} must not qualify`);
    assert.equal(routeForInsurance(value).thankYouPath, UNQUALIFIED_THANK_YOU_PATH);
  }
});

test('none of the retired options survive', () => {
  const labels = getInsuranceOptions().map((o) => o.label.toLowerCase());
  for (const retired of [
    'ppo (any carrier)', 'meritain health', 'multiplan / phcs', 'bright health',
    'workers’ compensation', 'auto / personal injury (pip)',
    'medicare, medicaid or hmo plan', 'other / not listed', 'self-pay / no insurance',
  ]) {
    assert.ok(!labels.includes(retired), `${retired} is still offered`);
  }
  // And none of the old stored values still qualify, so a stale cached page
  // posting one fails closed rather than minting a conversion.
  for (const stale of ['PPO', 'Aetna PPO', 'Cigna PPO', 'Blue Cross Blue Shield PPO', 'Workers’ Compensation', 'Auto / Personal Injury (PIP)', 'Self-pay / no insurance', 'Other']) {
    assert.equal(classifyInsurance(stale), 'unqualified', `${stale} must no longer qualify`);
  }
});

test('the placeholder reads "Select your insurance"', () => {
  assert.equal(INSURANCE_PLACEHOLDER, 'Select your insurance');
});

test('the public plan list is untouched by the dropdown change', () => {
  // /insurance-policy still publishes the practice's full statement; the intake
  // dropdown is a separate, shorter question and no longer derives from it.
  assert.ok(INSURANCE_PLANS.length >= 10, 'insurancePlans.ts lost entries');
});

test('the card upload label is the exact spec wording (item 13)', () => {
  assert.equal(INSURANCE_CARD_UPLOAD_LABEL, 'Upload your insurance card to get verified faster (optional).');
});

// ───────────────────────── classification fails closed ─────────────────────────

test('accepted insurance classifies as qualified', () => {
  assert.equal(classifyInsurance('Aetna'), 'qualified');
});

test('classification is case and whitespace insensitive', () => {
  assert.equal(classifyInsurance('  aetna  '), 'qualified');
  assert.equal(classifyInsurance('UNITEDHEALTHCARE'), 'qualified');
});

test('the untracked answers classify as unqualified', () => {
  assert.equal(classifyInsurance('Medicare / Medicaid / TRICARE'), 'unqualified');
  assert.equal(classifyInsurance('Marketplace or self-pay'), 'unqualified');
});

test('empty, missing and unknown values fail closed to unqualified', () => {
  for (const value of ['', '   ', null, undefined, 'Humana', 'Humana HMO', 'Aetna HMO', 'Medicare', 'true']) {
    assert.equal(classifyInsurance(value as string | null | undefined), 'unqualified',
      `${JSON.stringify(value)} must not be treated as qualified`);
  }
});

// ───────────────────────── routing (D10) ─────────────────────────

test('qualified routes to the tracked thank-you page', () => {
  assert.equal(thankYouPathFor('qualified'), QUALIFIED_THANK_YOU_PATH);
  assert.equal(routeForInsurance('Cigna').thankYouPath, '/thank-you');
});

test('unqualified routes to a separate, different thank-you page', () => {
  assert.equal(thankYouPathFor('unqualified'), UNQUALIFIED_THANK_YOU_PATH);
  assert.equal(routeForInsurance('Marketplace or self-pay').thankYouPath, '/thank-you/other');
  assert.notEqual(UNQUALIFIED_THANK_YOU_PATH, QUALIFIED_THANK_YOU_PATH);
});

test('neither thank-you path can carry the insurance answer (item 12)', () => {
  // Both paths are fixed constants with no query string or fragment, so no
  // destination the forms can navigate to has room for the answer.
  for (const p of [QUALIFIED_THANK_YOU_PATH, UNQUALIFIED_THANK_YOU_PATH]) {
    assert.match(p, /^\/thank-you(\/other)?$/);
  }
  for (const option of getInsuranceOptions()) {
    const p = routeForInsurance(option.value).thankYouPath;
    assert.ok(p === QUALIFIED_THANK_YOU_PATH || p === UNQUALIFIED_THANK_YOU_PATH);
    assert.ok(!p.includes('?') && !p.includes('#'), `${p} carries a query or fragment`);
    for (const word of option.value.toLowerCase().split(/[^a-z]+/).filter((w) => w.length > 3)) {
      assert.ok(!p.toLowerCase().includes(word), `${p} contains "${word}" from ${option.value}`);
    }
  }
});

// ───────────────────────── conversion gating ─────────────────────────

test('a qualified lead fires the canonical conversion exactly once', async () => {
  const submissionId = uniqueId('qualified');
  const accepted = await pushAcceptedLead({
    ...LEAD,
    acceptance: { ok: true, submissionId },
    lead_qualification: 'qualified',
  });

  assert.equal(accepted, true);
  assert.equal(canonical().length, 1);
  assert.equal(canonical()[0].submission_id, submissionId);
});

test('an unqualified lead fires NO canonical conversion', async () => {
  const accepted = await pushAcceptedLead({
    ...LEAD,
    acceptance: { ok: true, submissionId: uniqueId('unqualified') },
    lead_qualification: 'unqualified',
  });

  // The lead was still accepted — it is persisted and emailed server-side.
  assert.equal(accepted, true);
  assert.equal(canonical().length, 0, 'an "Other" lead must never fire the qualified conversion');
});

test('an unqualified lead pushes nothing at all to the dataLayer', async () => {
  await pushAcceptedLead({
    ...LEAD,
    acceptance: { ok: true, submissionId: uniqueId('silent') },
    lead_qualification: 'unqualified',
  });
  assert.equal(dataLayer().length, 0,
    'no event may carry the insurance answer into analytics, not even by its name');
});

test('qualification defaults to qualified so forms without the field are unchanged', async () => {
  await pushAcceptedLead({ ...LEAD, acceptance: { ok: true, submissionId: uniqueId('default') } });
  assert.equal(canonical().length, 1);
});

test('a retry cannot promote an unqualified submission into a conversion', async () => {
  const submissionId = uniqueId('retry');

  await pushAcceptedLead({
    ...LEAD, acceptance: { ok: true, submissionId }, lead_qualification: 'unqualified',
  });
  assert.equal(canonical().length, 0);

  // Same submission ID replayed, this time claiming to be qualified.
  await pushAcceptedLead({
    ...LEAD, acceptance: { ok: true, submissionId }, lead_qualification: 'qualified',
  });
  assert.equal(canonical().length, 0,
    'the submission ID is registered before the qualification gate, so a replay is inert');
});

test('duplicate qualified submits still fire exactly once', async () => {
  const submissionId = uniqueId('dupe');
  await pushAcceptedLead({ ...LEAD, acceptance: { ok: true, submissionId }, lead_qualification: 'qualified' });
  await pushAcceptedLead({ ...LEAD, acceptance: { ok: true, submissionId }, lead_qualification: 'qualified' });
  assert.equal(canonical().length, 1);
});

// ───────────────────────── privacy invariant ─────────────────────────

test('the insurance answer never appears in the advertising payload', async () => {
  await pushAcceptedLead({
    ...LEAD,
    acceptance: { ok: true, submissionId: uniqueId('privacy') },
    lead_qualification: 'qualified',
  });

  const [event] = canonical();
  assert.ok(event, 'expected the qualified event');

  // Closed shape: exactly the six operational keys, nothing more.
  assert.deepEqual(Object.keys(event).sort(), [
    'event', 'form_id', 'form_source', 'market', 'page_path', 'submission_id',
  ]);

  const serialised = JSON.stringify(event).toLowerCase();
  for (const forbidden of ['insurance', 'qualification', 'aetna', 'cigna', 'bcbs', 'unitedhealth']) {
    assert.ok(!serialised.includes(forbidden),
      `"${forbidden}" must not appear anywhere in the advertising payload`);
  }

  // Matched on word boundaries: a bare substring search for "ppo" also matches
  // "appointment", which legitimately appears in page_path. Likewise "qualified"
  // is a substring of "unqualified".
  for (const forbidden of [/\bppo\b/, /\bqualified\b/, /\bunqualified\b/]) {
    assert.ok(!forbidden.test(serialised),
      `${forbidden} must not appear as a term in the advertising payload`);
  }
});
