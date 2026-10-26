/**
 * ZIP removal, "Best Time To Contact" removal, and server-authoritative
 * qualification on the intake forms.
 *
 * Abubeckr, Slack #mountain-spine-and-orthopedics, 2026-10-14, item 7: "Remove
 * ZIP code and best time to contact." This file used to enforce the opposite for
 * ZIP (an earlier decision kept it). It now proves ZIP is gone from every intake
 * form, every intake endpoint, the shared resolver, the staff email and the
 * Supabase writer, while the `forms.postal_code` column itself stays in the
 * database untouched.
 *
 * Three kinds of check appear here deliberately:
 *
 *   - behavioural, for the routing decision, because that is where a subtle bug
 *     (a fail-open default) actually lives;
 *   - structural, for "the field is gone from the form" and "the column is no
 *     longer written", because no unit test can observe a JSX field or a Supabase
 *     insert without a browser and a database;
 *   - privacy, for the boundary that the insurance answer never becomes an
 *     analytics dimension.
 */
import assert from 'node:assert/strict';
import test, { beforeEach } from 'node:test';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { JSDOM } from 'jsdom';

import { CANONICAL_LEAD_EVENT } from '../lib/lead-contract';
import {
  QUALIFIED_THANK_YOU_PATH,
  UNQUALIFIED_THANK_YOU_PATH,
  destinationFor,
  getInsuranceOptions,
  parseLeadRouting,
  pathForDestination,
  resolveLeadRouting,
} from '../lib/insurance-routing';
import { resolveIntake } from '../lib/intake-submission';
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

const root = path.join(import.meta.dirname, '..');
const readSource = (rel: string) => readFileSync(path.join(root, rel), 'utf8');

/**
 * Source with comments removed.
 *
 * Needed because the code that REMOVED a field explains itself by naming it, and
 * the migration documents its own rollback with "drop column". A check for a
 * removed field must read the code, not the prose about it.
 */
const stripComments = (source: string) => source
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
  .replace(/^\s*\/\/.*$/gm, '')
  .replace(/^\s*--.*$/gm, '');

const FORM = readSource('components/ContactForm.tsx');
const FORM_CODE = stripComments(FORM);
const ROUTE = readSource('app/api/forms/consultation/route.ts');
const PERSIST = readSource('components/email/sendcontactemail.ts');
const TEMPLATE = readSource('components/email/emailtemplate.tsx');
const RESOLVER = readSource('lib/intake-submission.ts');

/** The nine intake forms that carry the insurance dropdown. */
const INTAKE_FORMS = [
  'components/ContactForm.tsx',
  'components/BodyPartHeroForm.tsx',
  'components/MobileHeroMiniForm.tsx',
  'components/DoctorContactForm.tsx',
  'components/BookAnAppoitmentButton.tsx',
  'components/BookAnAppointmentPopup.tsx',
  'components/MiniContactForm.tsx',
  'components/StateHeroForm.tsx',
  'components/PatientAdvocateForm.tsx',
];

const INTAKE_ROUTES = [
  'app/api/forms/consultation/route.ts',
  'app/api/forms/doctor/route.ts',
  'app/api/forms/book-appointment/route.ts',
  'app/api/forms/patient-advocate/route.ts',
];

/** One qualified and one unqualified answer, straight from the live option list. */
const QUALIFIED_VALUE = getInsuranceOptions().find((o) => o.qualification === 'qualified')!.value;
const UNQUALIFIED_VALUE = getInsuranceOptions().find((o) => o.qualification === 'unqualified')!.value;

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
  window.sessionStorage.clear();
});

// ───────────────── ZIP is gone from intake (2026-10-14, item 7) ─────────────────

const ZIP_PATTERNS: Array<[RegExp, string]> = [
  [/postalCode/, 'a postalCode field or value'],
  [/ZIP \/ Postal Code/i, 'a ZIP label'],
  [/autoComplete=["']postal-code["']/, 'a postal-code autofill input'],
  [/isValidPostalCode|normalizePostalCode|POSTAL_CODE_ERROR|validateSubmittedPostalCode/, 'ZIP validation'],
  [/@\/lib\/postal-code/, 'an import of the removed ZIP module'],
];

test('ZIP is absent from every intake form', () => {
  for (const rel of INTAKE_FORMS) {
    const code = stripComments(readSource(rel));
    for (const [pattern, what] of ZIP_PATTERNS) {
      assert.doesNotMatch(code, pattern, `${rel} still has ${what}`);
    }
  }
});

test('ZIP is absent from every intake endpoint and the shared resolver', () => {
  for (const rel of [...INTAKE_ROUTES, 'lib/intake-submission.ts']) {
    const code = stripComments(readSource(rel));
    for (const [pattern, what] of ZIP_PATTERNS) {
      assert.doesNotMatch(code, pattern, `${rel} still has ${what}`);
    }
  }
});

test('the shared ZIP module is gone', () => {
  assert.equal(existsSync(path.join(root, 'lib/postal-code.ts')), false, 'lib/postal-code.ts still exists');
});

test('ZIP is no longer written to Supabase, but the column is left alone', () => {
  const code = stripComments(PERSIST);
  assert.doesNotMatch(code, /postal_code\s*:/, 'the forms insert still writes postal_code');
  assert.doesNotMatch(code, /postalCode/, 'the email/persistence module still carries postalCode');
  // The column stays: the migration that added it is untouched and drops nothing.
  const migration = readSource('supabase/migrations/202609270001_add_postal_code.sql');
  assert.match(migration, /add column if not exists postal_code/, 'the postal_code migration was changed');
});

test('ZIP is no longer in the staff email', () => {
  const code = stripComments(TEMPLATE);
  assert.doesNotMatch(code, /ZIP Code:/, 'staff email still has a ZIP row');
  assert.doesNotMatch(code, /postalCode/, 'staff email template still accepts postalCode');
});

test('a stale page posting a ZIP is accepted and the ZIP is ignored', () => {
  // A browser holding a page from before this change can still post postalCode.
  // The resolver takes only insurance, so the extra field cannot 400 the lead.
  const stale = { insuranceType: QUALIFIED_VALUE, postalCode: 'nope' } as { insuranceType: string };
  const result = resolveIntake(stale);
  assert.equal(result.ok, true);
  assert.ok(!('postalCode' in result), 'the resolver still returns a postal code');
  assert.equal(result.routing.qualification, 'qualified');
});

test('intake forms no longer hand a ZIP to Enhanced Conversions', () => {
  for (const rel of INTAKE_FORMS) {
    const code = stripComments(readSource(rel));
    const start = code.indexOf('pushAcceptedLead({');
    assert.notEqual(start, -1, `${rel} has no pushAcceptedLead call`);
    const call = code.slice(start, code.indexOf('})', start));
    assert.doesNotMatch(call, /postalCode/, `${rel} still sends a ZIP to Enhanced Conversions`);
  }
});

// ───────────── "Best Time To Contact" is gone from intake (item 7) ─────────────

test('best time to contact does not exist anywhere in the intake forms', () => {
  for (const rel of INTAKE_FORMS) {
    const code = stripComments(readSource(rel));
    for (const pattern of [/bestTime/, /best_time/i, /Best Time To Contact/i, /Preferred Contact Time/i]) {
      assert.doesNotMatch(code, pattern, `${rel} still references ${pattern}`);
    }
    assert.ok(!code.includes('As Soon As Possible'), `${rel} still offers the removed best-time options`);
  }
  for (const option of ['Morning', 'Afternoon', 'Evening']) {
    assert.ok(!FORM_CODE.includes(option), 'intake form still offers the removed option ' + option);
  }
});

test('the endpoints neither require nor forward best time', () => {
  for (const rel of INTAKE_ROUTES) {
    assert.doesNotMatch(stripComments(readSource(rel)), /bestTime/, `${rel} still references bestTime`);
  }
});

test('best time is optional downstream, so a submission without it is accepted', () => {
  // Scoped to the two functions the intake forms reach. sendMRIContactEmail still
  // takes a REQUIRED bestTime: the MRI review questionnaire still asks it and is
  // outside this change.
  for (const fn of ['sendUserEmail', 'sendContactEmail']) {
    const start = PERSIST.indexOf('export async function ' + fn);
    assert.notEqual(start, -1, 'cannot find ' + fn);
    const signature = PERSIST.slice(start, PERSIST.indexOf('}) {', start));
    assert.doesNotMatch(signature, /bestTime: string;/, fn + ' still requires bestTime');
    assert.match(signature, /bestTime\?: string;/, fn + ' does not accept bestTime as optional');
  }
});

test('the notification never shows an empty best-time label', () => {
  assert.match(TEMPLATE, /\{bestTime && \(/, 'best-time row is unconditional');
  assert.match(TEMPLATE, /bestTime\?: string,/, 'template still requires bestTime');
});

test('historical best_time values are preserved, not destroyed', () => {
  assert.match(PERSIST, /best_time:\s*data\.best_time\s*\|\|\s*null,/, 'best_time is no longer persisted at all');
  const migration = readSource('supabase/migrations/202609270001_add_postal_code.sql');
  assert.doesNotMatch(stripComments(migration), /drop column/i, 'the migration drops a column');
  assert.doesNotMatch(stripComments(migration), /delete|truncate|update /i, 'the migration touches existing rows');
});

// ─────────────── server-authoritative qualification (section 9) ───────────────

test('the server decides qualification, and the endpoint returns it', () => {
  // Since 2026-10-26 the date of birth rides along, so an under-20 lead is unqualified.
  assert.match(RESOLVER, /resolveLeadRouting\(insuranceType(, dateOfBirth)?\)/, 'the shared resolver does not classify insurance server-side');
  assert.match(ROUTE, /resolveIntake\(\{ insuranceType: body\.insurance_type(, dateOfBirth)? \}\)/, 'endpoint does not classify insurance server-side');
  assert.match(ROUTE, /\.\.\.acceptance, \.\.\.routing/, 'endpoint does not return the routing decision');

  // Every intake endpoint, not just this one.
  for (const rel of [
    'app/api/forms/doctor/route.ts',
    'app/api/forms/book-appointment/route.ts',
    'app/api/forms/patient-advocate/route.ts',
  ]) {
    const source = readSource(rel);
    assert.match(source, /resolveIntake\(/, `${rel} does not resolve qualification server-side`);
    assert.match(source, /\.\.\.acceptance, \.\.\.routing/, `${rel} does not return the routing decision`);
  }
});

test('the browser obeys the server rather than trusting its own value', () => {
  assert.match(FORM, /parseLeadRouting\(body\)/, 'form does not read the server decision');
  assert.match(FORM, /serverRouting\?\.qualification \?\? classifyInsurance/, 'form does not prefer the server decision');
});

test('a qualified answer resolves to the tracked thank-you page', () => {
  const routing = resolveLeadRouting(QUALIFIED_VALUE);
  assert.equal(routing.qualification, 'qualified');
  assert.equal(routing.destination, 'qualified_thank_you');
  assert.equal(pathForDestination(routing.destination), QUALIFIED_THANK_YOU_PATH);
});

test('an unqualified answer resolves to the separate thank-you page', () => {
  const routing = resolveLeadRouting(UNQUALIFIED_VALUE);
  assert.equal(routing.qualification, 'unqualified');
  assert.equal(routing.destination, 'other_thank_you');
  assert.equal(pathForDestination(routing.destination), UNQUALIFIED_THANK_YOU_PATH);
  assert.notEqual(UNQUALIFIED_THANK_YOU_PATH, QUALIFIED_THANK_YOU_PATH);
});

test('an unknown, stale or forged insurance value cannot qualify', () => {
  // 'Medicare / Medicaid / TRICARE' and 'Marketplace or self-pay' ARE offered
  // options; they simply classify as unqualified, which is the point. The rest are
  // values no form can produce now: forged, or stale values from the old list.
  for (const tampered of ['', '   ', 'Humana', 'ppo; qualified', 'PPO', 'Aetna PPO', 'Aetna HMO', 'Medicare / Medicaid / TRICARE', 'Marketplace or self-pay', 'Other', '__proto__', 'true']) {
    const routing = resolveLeadRouting(tampered);
    assert.equal(routing.qualification, 'unqualified', tampered + ' must not qualify');
    assert.equal(routing.destination, 'other_thank_you', tampered + ' must not route to the tracked page');
  }
  assert.equal(resolveLeadRouting(null).qualification, 'unqualified');
  assert.equal(resolveLeadRouting(undefined).qualification, 'unqualified');
});

test('a tampered destination cannot disagree with the qualification', () => {
  const forged = parseLeadRouting({ qualification: 'unqualified', destination: 'qualified_thank_you' });
  assert.equal(forged?.qualification, 'unqualified');
  assert.equal(forged?.destination, 'other_thank_you');
  assert.equal(pathForDestination(forged!.destination), UNQUALIFIED_THANK_YOU_PATH);
});

test('an unrecognised qualification on the wire fails closed', () => {
  for (const junk of ['QUALIFIED', 'yes', 'true', 'accepted', '']) {
    assert.equal(parseLeadRouting({ qualification: junk })?.qualification, 'unqualified', junk + ' must fail closed');
  }
});

test('an absent decision is null, so a deploy-skew response does not zero out conversions', () => {
  // null means "the server did not say", and the caller falls back to the same
  // shared classifier. A hard fail-closed default here would mark every lead in a
  // deploy window unqualified and lose real conversions.
  assert.equal(parseLeadRouting({ ok: true, submissionId: 'abc' }), null);
  assert.equal(parseLeadRouting(null), null);
  assert.equal(parseLeadRouting('qualified'), null);
  assert.equal(parseLeadRouting({ qualification: 42 }), null);
});

test('destinationFor and the paths stay in lockstep', () => {
  assert.equal(pathForDestination(destinationFor('qualified')), QUALIFIED_THANK_YOU_PATH);
  assert.equal(pathForDestination(destinationFor('unqualified')), UNQUALIFIED_THANK_YOU_PATH);
});

// ─────────────── the shared server resolver (section 9) ───────────────

test('the resolver fails closed on insurance', () => {
  for (const tampered of ['', 'Humana', 'Aetna PPO', 'Medicare', '__proto__', 'qualified', UNQUALIFIED_VALUE]) {
    const result = resolveIntake({ insuranceType: tampered });
    assert.equal(result.ok, true, 'a bad insurance value is not a request error');
    assert.equal(result.routing.qualification, 'unqualified', `${tampered} must not qualify`);
    assert.equal(result.routing.destination, 'other_thank_you');
  }
});

test('the resolver qualifies exactly the five accepted answers', () => {
  const qualified = getInsuranceOptions().filter((o) => o.qualification === 'qualified');
  assert.equal(qualified.length, 5);
  for (const { value } of qualified) {
    const result = resolveIntake({ insuranceType: value });
    assert.equal(result.routing.qualification, 'qualified', `${value} should qualify`);
    assert.equal(result.routing.destination, 'qualified_thank_you');
  }
});

// ─────────────── ZIP must not leak into analytics (section 13) ───────────────

test('ZIP never appears in the canonical lead event, even if a caller passes one', async () => {
  await pushAcceptedLead({
    acceptance: { ok: true, submissionId: uniqueId('zip-canon') },
    ...LEAD,
    postalCode: '02134',
    lead_qualification: 'qualified',
  });

  assert.equal(canonical().length, 1);
  const serialized = JSON.stringify(canonical()[0]);
  assert.ok(!serialized.includes('02134'), 'ZIP leaked into the canonical event: ' + serialized);
  for (const key of ['postal_code', 'postalCode', 'zip', 'address']) {
    assert.ok(!(key in canonical()[0]), 'canonical event gained a ' + key + ' field');
  }
});

test('the insurance answer and its qualification never reach the canonical event', async () => {
  await pushAcceptedLead({
    acceptance: { ok: true, submissionId: uniqueId('ins-canon') },
    ...LEAD,
    lead_qualification: 'qualified',
  });
  const event = canonical()[0];

  // The payload is a closed set of operational keys. Anything else is a leak.
  assert.deepEqual(
    Object.keys(event).sort(),
    ['event', 'form_id', 'form_source', 'market', 'page_path', 'submission_id'],
    'the canonical event gained or lost a key',
  );

  // Check VALUES for carrier names, keyed rather than substring-matched: the test
  // page path is /find-care/book-an-appointment, and "appointment" contains "ppo".
  for (const [key, value] of Object.entries(event)) {
    if (typeof value !== 'string') continue;
    const v = value.toLowerCase();
    for (const term of ['insurance', 'aetna', 'cigna', 'unitedhealthcare', 'blue cross', 'bcbs', 'qualified', 'unqualified']) {
      assert.ok(!v.includes(term), 'canonical event value ' + key + ' leaked ' + term);
    }
    assert.doesNotMatch(v, /ppo/, 'canonical event value ' + key + ' leaked a PPO reference');
  }
});

// ─────────────── one conversion, never two (section 11) ───────────────

test('a qualified submission fires the conversion exactly once', async () => {
  const id = uniqueId('once');
  await pushAcceptedLead({ acceptance: { ok: true, submissionId: id }, ...LEAD, lead_qualification: 'qualified' });
  assert.equal(canonical().length, 1);
});

test('a retry of the same submission does not duplicate the conversion', async () => {
  const id = uniqueId('retry');
  for (let i = 0; i < 4; i++) {
    await pushAcceptedLead({ acceptance: { ok: true, submissionId: id }, ...LEAD, lead_qualification: 'qualified' });
  }
  assert.equal(canonical().length, 1, 'a refresh or double-submit of one submission fired more than one conversion');
});

test('an Other submission fires zero qualified conversions, retried or not', async () => {
  const id = uniqueId('other');
  for (let i = 0; i < 3; i++) {
    await pushAcceptedLead({ acceptance: { ok: true, submissionId: id }, ...LEAD, lead_qualification: 'unqualified' });
  }
  assert.equal(canonical().length, 0);
  assert.equal(dataLayer().length, 0, 'an unqualified lead emitted a dataLayer event');
});

test('an Other submission cannot be promoted into a conversion by a later retry', async () => {
  const id = uniqueId('promote');
  await pushAcceptedLead({ acceptance: { ok: true, submissionId: id }, ...LEAD, lead_qualification: 'unqualified' });
  // Same submission id, now claiming to be qualified. The id is already spent.
  await pushAcceptedLead({ acceptance: { ok: true, submissionId: id }, ...LEAD, lead_qualification: 'qualified' });
  assert.equal(canonical().length, 0, 'an unqualified submission was promoted into a conversion on retry');
});

test('the form holds its submit lock through navigation, so a double click is one lead', () => {
  assert.match(FORM, /if \(submittingRef\.current\) return/, 'form has no synchronous in-flight guard');
  assert.doesNotMatch(FORM, /finally \{\s*setDisabled\(false\)/, 'form re-enables submit in a finally block, reopening the double-submit window');
});

test('neither thank-you page can fire a conversion on a direct visit', () => {
  for (const rel of ['app/thank-you/page.tsx', 'app/thank-you/other/page.tsx', 'app/thank-you/layout.tsx', 'app/thank-you/other/layout.tsx']) {
    const source = readSource(rel).replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
    for (const pattern of [/dataLayer/, /pushEvent/, /pushFormSubmit/, /pushAcceptedLead/, /restoreECFromSession/, /gtag\(/]) {
      assert.doesNotMatch(source, pattern, rel + ' contains ' + pattern + ' so a direct visit or refresh could fire a conversion');
    }
  }
});

test('the Other confirmation page uses no rejecting language', () => {
  // Patient-facing copy only: the file's own comments explain the routing and
  // legitimately use the word "unqualified" to do so.
  const copy = stripComments(readSource('app/thank-you/other/page.tsx')).toLowerCase();
  for (const word of ['rejected', 'unqualified', 'not eligible', 'ineligible', 'denied', 'declined']) {
    assert.ok(!copy.includes(word), 'the Other page says "' + word + '" to a patient');
  }
});
