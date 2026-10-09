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
  INSURANCE_HELPER_TEXT,
} from '../lib/insurance-routing';
import { INSURANCE_PLANS, GOVERNMENT_AND_HMO_GROUP } from '../components/data/insurancePlans';
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

/** The option a published plan is reachable through — its group, or itself. */
const optionValueFor = (plan: (typeof INSURANCE_PLANS)[number]) =>
  plan.formGroup?.value ?? plan.name;

test('the options are derived from the published plan list, not a second copy', () => {
  const values = getInsuranceOptions().map((o) => o.value);

  // Every published plan must still be REACHABLE from the form — directly, or
  // through the group it belongs to. A plan the practice publishes but the form
  // cannot express is the drift this whole module exists to prevent.
  for (const plan of INSURANCE_PLANS) {
    assert.ok(values.includes(optionValueFor(plan)),
      `${plan.name} is published on /insurance-policy but is not reachable from the form`);
  }

  // And nothing EXTRA: exactly the ungrouped plans, one option per distinct
  // group, plus the explicit PPO option and Other. This is the half that catches
  // a hand-added option creeping back in.
  const expected =
    INSURANCE_PLANS.filter((p) => !p.formGroup).length +
    new Set(INSURANCE_PLANS.filter((p) => p.formGroup).map((p) => p.formGroup!.value)).size +
    2;
  assert.equal(values.length, expected,
    `expected ${expected} options, got ${values.length}: ${values.join(', ')}`);
});

test('a grouped option is never more permissive than its least-accepted member', () => {
  // The safety direction for grouping. Collapsing plans must only ever be able to
  // REMOVE a qualified option, never create one — otherwise adding a plan to a
  // group could silently start reporting leads the practice cannot serve.
  const grouped = INSURANCE_PLANS.filter((p) => p.formGroup);
  assert.ok(grouped.length > 0, 'this test is meaningless with no grouped plans');

  for (const groupValue of new Set(grouped.map((p) => p.formGroup!.value))) {
    const members = grouped.filter((p) => p.formGroup!.value === groupValue);
    const option = getInsuranceOptions().find((o) => o.value === groupValue);
    assert.ok(option, `${groupValue} missing from the options`);

    const everyMemberAccepted = members.every((p) => p.status === 'accepted');
    assert.equal(option.qualification, everyMemberAccepted ? 'qualified' : 'unqualified',
      `${groupValue} must be unqualified unless EVERY member is accepted`);
  }
});

test('carrier labels drop the PPO suffix but the stored VALUE keeps it', () => {
  // The lead-sheet automation classifies priority with
  //   insurance_type.toLowerCase().indexOf('ppo') !== -1
  // (Mountain Spine Lead Sheet Auto Sync -> getLeadPriority). If the stored value
  // ever loses "PPO", every lead silently becomes STANDARD and the front desk's
  // HIGH VALUE / PPO prioritisation collapses. Labels may change freely; values
  // may not.
  const aetna = getInsuranceOptions().find((o) => o.value === 'Aetna PPO');
  assert.ok(aetna, 'Aetna PPO missing from the options');
  assert.equal(aetna.label, 'Aetna', 'the patient-facing label should drop the PPO suffix');
  assert.equal(aetna.value, 'Aetna PPO', 'the STORED value must keep PPO');

  for (const plan of INSURANCE_PLANS) {
    if (!plan.isPpoCarrier) continue;
    const option = getInsuranceOptions().find((o) => o.value === plan.name);
    assert.ok(option, plan.name + ' missing');
    assert.doesNotMatch(option.label, /PPO/, option.label + ' still shows PPO to the patient');
    assert.match(option.value.toLowerCase(), /ppo/, plan.name + ' value lost its PPO marker');
  }
});

test('every qualified option still carries a PPO-detectable value or is a named payer', () => {
  // Workers' Comp and Auto/PIP are qualified without being PPO — they are handled
  // by name downstream, not by the substring check. Everything else that qualifies
  // must remain detectable as PPO.
  const namedPayers = [
    'Workers’ Compensation',
    'Auto / Personal Injury (PIP)',
    'Self-pay / no insurance',
  ];
  for (const option of getInsuranceOptions()) {
    if (option.qualification !== 'qualified') continue;
    if (namedPayers.indexOf(option.value) !== -1) continue;
    assert.match(option.value.toLowerCase(), /ppo/,
      option.value + ' qualifies but is not PPO-detectable by the lead sheet');
  }
});

test('a plan the practice does not participate in is never qualified', () => {
  for (const plan of INSURANCE_PLANS) {
    const option = PLAN_OPTIONS.find((o) => o.value === optionValueFor(plan));
    assert.ok(option, `${plan.name} missing from PLAN_OPTIONS`);
    if (plan.status !== 'accepted') {
      // The direction that matters: a plan the practice does not participate in
      // must never reach the qualified conversion, grouped or not.
      assert.equal(option.qualification, 'unqualified',
        `${plan.name} is "${plan.status}" and must NOT fire a qualified conversion`);
    } else if (!plan.formGroup) {
      assert.equal(option.qualification, 'qualified', `${plan.name} is accepted and should qualify`);
    }
    // An accepted plan inside a group is covered by the group test above: it may
    // legitimately be dragged to unqualified by a non-accepted sibling.
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
  // The excluded plans are collapsed into one grouped option; take whichever
  // option the first non-accepted plan is reachable through.
  const firstExcluded = INSURANCE_PLANS.find((p) => p.status !== 'accepted');
  assert.ok(firstExcluded, 'the list should contain at least one non-accepted plan');
  const excludedIdx = values.indexOf(optionValueFor(firstExcluded));

  assert.ok(ppoCarrierIdx < workersIdx, 'PPO carriers should precede the other accepted payers');
  assert.ok(workersIdx < excludedIdx, 'accepted payers should precede the ones that are not accepted');
});

test('Medicare, Medicaid and HMO are ONE option, and it does not qualify', () => {
  // The dropdown asked a patient to classify their own plan across four
  // government/HMO entries that all route identically — the decision they are
  // least equipped to make, with no routing benefit for getting it right.
  const options = getInsuranceOptions();
  const group = options.find((o) => o.value === GOVERNMENT_AND_HMO_GROUP.value);

  assert.ok(group, 'the grouped Medicare/Medicaid/HMO option is missing');
  assert.equal(group.label, 'Medicare, Medicaid or HMO plan');
  assert.equal(group.qualification, 'unqualified');
  assert.equal(classifyInsurance(group.value), 'unqualified');
  assert.equal(routeForInsurance(group.value).thankYouPath, UNQUALIFIED_THANK_YOU_PATH);

  // None of the four may still appear as its own option.
  for (const name of ['Medicare', 'Medicaid', 'HMO plans (any carrier)', 'Medicare or Medicaid HMO']) {
    assert.equal(options.find((o) => o.value === name), undefined,
      name + ' should be collapsed into the grouped option, not offered separately');
  }
});

test('the helper text only names options that actually exist', () => {
  // This is a real regression. The helper line under the dropdown was hardcoded
  // in ContactForm.tsx and said: choose "HMO plans (any carrier)". When the
  // government and HMO plans were collapsed into one option that instruction
  // pointed at something no longer in the list, so the form was telling patients
  // to pick an option they could not find.
  //
  // Any option name quoted in the helper text must be offered.
  const labels = getInsuranceOptions().map((o) => o.label);
  const quoted = INSURANCE_HELPER_TEXT.match(/"([^"]+)"/g) || [];

  assert.ok(quoted.length > 0, 'the helper text should name an option to choose');
  for (const q of quoted) {
    const name = q.slice(1, -1);
    assert.ok(labels.includes(name),
      `the helper text tells patients to choose "${name}", which is not an option: ${labels.join(', ')}`);
  }
});

test('the stored group value carries no PPO marker', () => {
  // The lead sheet flags priority with insurance_type.indexOf('ppo'). If the
  // grouped value ever contained "ppo", every Medicare/Medicaid/HMO lead would
  // show to the front desk as a PPO lead — the worst possible mislabel, since
  // those are precisely the patients who cannot be billed that way.
  assert.doesNotMatch(GOVERNMENT_AND_HMO_GROUP.value.toLowerCase(), /ppo/);
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
