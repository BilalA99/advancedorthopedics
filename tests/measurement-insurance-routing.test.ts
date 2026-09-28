/**
 * Insurance qualification, conversion gating and thank-you routing (D10 / D11).
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
  PPO_OPTION,
  OTHER_OPTION,
  PLAN_OPTIONS,
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

// ───────────────────────── option list (D11) ─────────────────────────

test('PPO appears explicitly as its own option', () => {
  const options = getInsuranceOptions();
  const ppo = options.find((o) => o.value === 'PPO');
  assert.ok(ppo, 'a patient who knows they hold a PPO must have a PPO option');
  assert.equal(ppo.qualification, 'qualified');
});

test('PPO is offered first and Other is offered last', () => {
  const options = getInsuranceOptions();
  assert.equal(options[0].value, PPO_OPTION.value);
  assert.equal(options[options.length - 1].value, OTHER_OPTION.value);
});

test('the options are derived from the published plan list, not a second copy', () => {
  const values = getInsuranceOptions().map((o) => o.value);
  for (const plan of INSURANCE_PLANS) {
    assert.ok(values.includes(plan.name),
      `${plan.name} is published on /insurance-policy but is not offered in the form`);
  }
  // Exactly the published plans, plus the explicit PPO option and Other.
  assert.equal(values.length, INSURANCE_PLANS.length + 2);
});

test('a plan the practice does not participate in is never qualified', () => {
  for (const plan of INSURANCE_PLANS) {
    const option = PLAN_OPTIONS.find((o) => o.value === plan.name);
    assert.ok(option, `${plan.name} missing from PLAN_OPTIONS`);
    if (plan.status === 'accepted') {
      assert.equal(option.qualification, 'qualified', `${plan.name} is accepted and should qualify`);
    } else {
      assert.equal(option.qualification, 'unqualified',
        `${plan.name} is "${plan.status}" and must NOT fire a qualified conversion`);
    }
  }
});

test('Medicare, Medicaid and HMO products route to the Other flow', () => {
  // "partial" and "not-accepted" are real leads the clinic still receives, but
  // they are not accepted-insurance conversions.
  for (const name of ['Medicare', 'Medicaid', 'HMO plans (any carrier)', 'Medicare or Medicaid HMO']) {
    assert.equal(classifyInsurance(name), 'unqualified', `${name} must not qualify`);
    assert.equal(routeForInsurance(name).thankYouPath, UNQUALIFIED_THANK_YOU_PATH);
  }
});

test('PPO carriers and the other accepted payers qualify', () => {
  for (const name of [
    'Blue Cross Blue Shield PPO', 'UnitedHealthcare PPO', 'Cigna PPO', 'Aetna PPO',
    'Meritain Health PPO', 'MultiPlan / PHCS PPO', 'Bright Health PPO',
    'Workers’ Compensation', 'Auto / Personal Injury (PIP)',
  ]) {
    assert.equal(classifyInsurance(name), 'qualified', `${name} should qualify`);
    assert.equal(routeForInsurance(name).thankYouPath, QUALIFIED_THANK_YOU_PATH);
  }
});

test('PPO carriers are listed before the non-PPO payers and the excluded plans', () => {
  const values = getInsuranceOptions().map((o) => o.value);
  const ppoCarrierIdx = values.indexOf('Aetna PPO');
  const workersIdx = values.indexOf('Workers’ Compensation');
  const hmoIdx = values.indexOf('HMO plans (any carrier)');
  assert.ok(ppoCarrierIdx < workersIdx, 'PPO carriers should precede the other accepted payers');
  assert.ok(workersIdx < hmoIdx, 'accepted payers should precede the ones that are not accepted');
});

// ───────────────────────── classification fails closed ─────────────────────────

test('accepted insurance classifies as qualified', () => {
  assert.equal(classifyInsurance('PPO'), 'qualified');
});

test('classification is case and whitespace insensitive', () => {
  assert.equal(classifyInsurance('  ppo  '), 'qualified');
  assert.equal(classifyInsurance('PpO'), 'qualified');
});

test('Other classifies as unqualified', () => {
  assert.equal(classifyInsurance('Other'), 'unqualified');
});

test('empty, missing and unknown values fail closed to unqualified', () => {
  for (const value of ['', '   ', null, undefined, 'Humana', 'Humana HMO', 'Aetna', 'Aetna HMO', 'true']) {
    assert.equal(classifyInsurance(value as string | null | undefined), 'unqualified',
      `${JSON.stringify(value)} must not be treated as qualified`);
  }
});

test('a carrier name alone does not qualify — the PPO product does', () => {
  // The practice accepts an Aetna PPO and not an Aetna HMO, so the bare carrier
  // name is not an answer and must not be treated as one.
  assert.equal(classifyInsurance('Aetna'), 'unqualified');
  assert.equal(classifyInsurance('Aetna PPO'), 'qualified');
  assert.equal(classifyInsurance('Aetna HMO'), 'unqualified');
});

// ───────────────────────── routing (D10) ─────────────────────────

test('qualified routes to the tracked thank-you page', () => {
  assert.equal(thankYouPathFor('qualified'), QUALIFIED_THANK_YOU_PATH);
  assert.equal(routeForInsurance('PPO').thankYouPath, '/thank-you');
});

test('unqualified routes to a separate, different thank-you page', () => {
  assert.equal(thankYouPathFor('unqualified'), UNQUALIFIED_THANK_YOU_PATH);
  assert.equal(routeForInsurance('Other').thankYouPath, '/thank-you/other');
  assert.notEqual(UNQUALIFIED_THANK_YOU_PATH, QUALIFIED_THANK_YOU_PATH);
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
