/**
 * ZIP preservation, "Best Time To Contact" removal, and server-authoritative
 * qualification on the consultation intake form.
 *
 * The 2026-09-24 meeting removed ONE field and kept ZIP. An earlier pass on this
 * branch removed both, so these tests exist to make the distinction enforceable
 * rather than remembered: ZIP must stay present, validated on both sides, stored,
 * notified and attributed, while "Best Time To Contact" must be gone from the
 * intake path entirely.
 *
 * Three kinds of check appear here deliberately:
 *
 *   - behavioural, for the ZIP rule and the routing decision, because that is
 *     where a subtle bug (a leading zero, a fail-open default) actually lives;
 *   - structural, for "the field is in the form" and "the column is written",
 *     because no unit test can observe a JSX field or a Supabase insert without
 *     a browser and a database, and a silent deletion is exactly the regression
 *     that already happened once;
 *   - privacy, for the boundary that ZIP may reach the lead record and the staff
 *     email but must never become an analytics dimension.
 */
import assert from 'node:assert/strict';
import test, { beforeEach } from 'node:test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { JSDOM } from 'jsdom';

import { CANONICAL_LEAD_EVENT } from '../lib/lead-contract';
import {
  POSTAL_CODE_ERROR,
  POSTAL_CODE_PATTERN,
  isValidPostalCode,
  normalizePostalCode,
  postalCodePrefix,
  toStoredPostalCode,
} from '../lib/postal-code';
import {
  OTHER_OPTION,
  PPO_OPTION,
  QUALIFIED_THANK_YOU_PATH,
  UNQUALIFIED_THANK_YOU_PATH,
  destinationFor,
  parseLeadRouting,
  pathForDestination,
  resolveLeadRouting,
} from '../lib/insurance-routing';
import { CONSENT_STORAGE_KEY, CONSENT_VERSION } from '../lib/consent';
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
 * Needed because the code that REMOVED "Best Time To Contact" explains itself by
 * naming it, and the migration documents its own rollback with "drop column".
 * A check for a removed field must read the code, not the prose about it.
 */
const stripComments = (source: string) => source
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
  .replace(/^\s*\/\/.*$/gm, '')
  .replace(/^\s*--.*$/gm, '');

/** Consent written straight to storage, as the other measurement tests do. */
function setConsent(analytics: boolean, marketing: boolean) {
  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({
    version: CONSENT_VERSION,
    timestamp: '2026-09-20T00:00:00.000Z',
    categories: { necessary: true, analytics, marketing, functional: false },
  }));
}

const FORM = readSource('components/ContactForm.tsx');
const FORM_CODE = stripComments(FORM);
const ROUTE = readSource('app/api/forms/consultation/route.ts');
const PERSIST = readSource('components/email/sendcontactemail.ts');
const TEMPLATE = readSource('components/email/emailtemplate.tsx');
const RESOLVER = readSource('lib/intake-submission.ts');

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

// ─────────────────────── the ZIP rule (section 6 audit list) ───────────────────────

test('a five-digit US ZIP is valid', () => {
  for (const zip of ['33463', '32701', '34950', '10001', '99950']) {
    assert.equal(isValidPostalCode(zip), true, zip + ' should be valid');
    assert.equal(toStoredPostalCode(zip), zip);
  }
});

test('ZIP+4 is still supported', () => {
  assert.equal(isValidPostalCode('33143-4716'), true);
  assert.equal(toStoredPostalCode('33143-4716'), '33143-4716');
});

test('a leading-zero ZIP keeps its leading zero and is never coerced to a number', () => {
  // The whole class of bug: Number('02134') === 2134, a different postal code.
  for (const zip of ['02134', '00501', '01001', '07001']) {
    assert.equal(isValidPostalCode(zip), true, zip + ' should be valid');
    assert.equal(toStoredPostalCode(zip), zip, zip + ' must round-trip unchanged');
    assert.equal(postalCodePrefix(zip), zip);
  }
  assert.equal(typeof toStoredPostalCode('02134'), 'string');
  assert.notEqual(toStoredPostalCode('02134'), String(Number('02134')));
});

test('Florida ZIPs, the practice home market, are unaffected', () => {
  for (const zip of ['33021', '32701', '32835', '34950', '33410', '33143', '33496', '33837', '33463']) {
    assert.equal(isValidPostalCode(zip), true, zip + ' should be valid');
  }
});

test('empty input is invalid', () => {
  for (const empty of ['', '   ', null, undefined]) {
    assert.equal(isValidPostalCode(empty as string), false);
    assert.equal(toStoredPostalCode(empty as string), '');
  }
});

test('non-numeric and wrong-length input is invalid', () => {
  for (const bad of ['abcde', '3346a', 'ABCDE', '3346', '334634', '1', '33463-12', '33463-12345', '-33463', '33463-']) {
    assert.equal(isValidPostalCode(bad), false, bad + ' should be invalid');
    assert.equal(toStoredPostalCode(bad), '', bad + ' must not be stored');
  }
});

test('whitespace and pasted input are tolerated without changing the ZIP', () => {
  assert.equal(toStoredPostalCode('  33463  '), '33463');
  assert.equal(toStoredPostalCode('\t33463\n'), '33463');
  assert.equal(toStoredPostalCode(' 33463 '), '33463'); // non-breaking space, pasted from Word
  assert.equal(toStoredPostalCode('33 463'), '33463');
});

test('a mobile numeric keypad can still produce a valid ZIP+4', () => {
  // inputMode="numeric" gives no hyphen key, so a patient types nine bare digits.
  assert.equal(toStoredPostalCode('334631234'), '33463-1234');
  assert.equal(toStoredPostalCode('33463 1234'), '33463-1234');
  // An autocorrecting keyboard substitutes an en dash for the hyphen.
  assert.equal(toStoredPostalCode('33463–1234'), '33463-1234');
});

test('normalization never invents a valid ZIP out of an invalid one', () => {
  // 6 and 8 digits are typos, not a ZIP+4 missing its separator.
  for (const bad of ['334631', '33463123', '3346312345']) {
    assert.equal(isValidPostalCode(bad), false, bad + ' should stay invalid');
  }
  // Letters are surfaced, not stripped into a plausible ZIP.
  assert.equal(normalizePostalCode('3346a'), '3346a');
  assert.equal(isValidPostalCode('3346a'), false);
});

test('the pattern is anchored, so no prefix or suffix sneaks through', () => {
  assert.equal(POSTAL_CODE_PATTERN.test('x33463'), false);
  assert.equal(POSTAL_CODE_PATTERN.test('33463x'), false);
  assert.equal(POSTAL_CODE_PATTERN.test('33463\n33464'), false);
});

// ───────────────── ZIP exists / submits / persists (section 19) ─────────────────

test('ZIP exists: the intake form renders a labelled, required ZIP field', () => {
  assert.match(FORM, /name="postalCode"/, 'form has no postalCode field');
  assert.match(FORM, /ZIP \/ Postal Code/, 'ZIP field has no visible label');
  // Component-scoped, not a bare "postal_code": five components render a ZIP
  // input, and duplicate ids made label[for] and getElementById resolve to
  // whichever copy came first — often one in a hidden form.
  assert.match(FORM, /id="consultation_postal_code"/, 'ZIP field has no stable, scoped id');
  assert.match(FORM, /htmlFor="consultation_postal_code"/, 'ZIP label is not associated with its input');
  assert.match(FORM, /aria-label="ZIP or postal code"/, 'ZIP field is not labelled for screen readers');
  assert.match(FORM, /autoComplete="postal-code"/, 'ZIP field does not opt into browser autofill');
  assert.match(FORM, /inputMode="numeric"/, 'ZIP field does not request a numeric mobile keyboard');
  assert.match(FORM, /postalCode:\s*z\.string\(\)\.refine\(isValidPostalCode/, 'ZIP is not validated by the shared rule');
});

test('ZIP is validated by the shared rule on both sides, so they cannot drift', () => {
  assert.match(FORM, /from "@\/lib\/postal-code"/, 'form does not import the shared ZIP rule');
  // The routes reach the same rule one level up, through the shared resolver that
  // all four intake endpoints use, so they cannot validate ZIP differently.
  assert.match(ROUTE, /from "@\/lib\/intake-submission"/, 'endpoint does not use the shared intake resolver');
  assert.match(ROUTE, /resolveIntake\(/, 'endpoint does not validate ZIP server-side');
  assert.match(RESOLVER, /from "@\/lib\/postal-code"/, 'resolver does not import the shared ZIP rule');
  assert.match(RESOLVER, /validateSubmittedPostalCode\(postalCode\)/, 'resolver does not validate ZIP');
  // No surface may re-declare the rule locally.
  const inlineZipRegex = /\\d\{5\}/;
  assert.doesNotMatch(FORM, inlineZipRegex, 'form re-declares the ZIP regex instead of importing it');
  assert.doesNotMatch(ROUTE, inlineZipRegex, 'endpoint re-declares the ZIP regex instead of importing it');
});

test('ZIP submits: it is in the request payload and forwarded to both handlers', () => {
  assert.match(FORM, /postalCode,/, 'ZIP is not in the submitted payload');
  assert.match(ROUTE, /postalCode\?: string;/, 'endpoint does not accept postalCode');
  assert.equal(
    (ROUTE.match(/^\s*postalCode,\s*$/gm) || []).length, 2,
    'ZIP must be forwarded to BOTH sendContactEmail and sendUserEmail',
  );
});

test('ZIP persists: the Supabase insert writes postal_code', () => {
  assert.match(PERSIST, /postal_code:\s*data\.postal_code\s*\|\|\s*null,/, 'forms insert does not write postal_code');
  assert.match(PERSIST, /postal_code\?: string;/, 'logLeadToSupabase does not accept postal_code');
  assert.match(PERSIST, /postal_code:\s*formData\.postalCode,/, 'sendUserEmail does not pass ZIP through to persistence');
});

test('ZIP reaches the internal notification, and only when present', () => {
  assert.match(TEMPLATE, /ZIP Code:/, 'staff email has no ZIP row');
  assert.match(TEMPLATE, /\{postalCode && \(/, 'ZIP row is not conditional, so it can render an empty label');
  assert.match(TEMPLATE, /postalCode\?: string,/, 'template does not accept postalCode');
});

test('ZIP stays in the Enhanced Conversions identity payload', () => {
  // Dropping ZIP from this call silently degrades Google Ads match quality. It is
  // the pre-existing, approved user-provided-data flow the meeting did not touch.
  assert.match(FORM, /postalCode, lead_qualification: qualification/, 'ZIP no longer reaches pushAcceptedLead');
});

// ───────────── "Best Time To Contact" is gone from intake (section 7) ─────────────

test('best time to contact does not exist anywhere in the intake form', () => {
  for (const pattern of [/bestTime/, /best_time/i, /Best Time To Contact/i, /Preferred Contact Time/i]) {
    assert.doesNotMatch(FORM_CODE, pattern, 'intake form still references ' + pattern);
  }
  for (const option of ['As Soon As Possible', 'Morning', 'Afternoon', 'Evening']) {
    assert.ok(!FORM_CODE.includes(option), 'intake form still offers the removed option ' + option);
  }
});

test('the endpoint neither requires nor forwards best time', () => {
  assert.doesNotMatch(stripComments(ROUTE), /bestTime/, 'endpoint still references bestTime');
});

test('best time is optional downstream, so a submission without it is accepted', () => {
  // An outdated backend contract that still REQUIRED the removed field would
  // reject every new submission.
  // Scoped to the two functions the intake form calls. sendMRIContactEmail and
  // the candidacy/condition senders still take a REQUIRED bestTime, correctly:
  // those forms still ask the question, and the meeting only changed intake.
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
  assert.match(migration, /add column if not exists postal_code/, 'the migration does not add postal_code');
});

// ─────────────── server-authoritative qualification (section 9) ───────────────

test('the server decides qualification, and the endpoint returns it', () => {
  assert.match(RESOLVER, /resolveLeadRouting\(insuranceType\)/, 'the shared resolver does not classify insurance server-side');
  assert.match(ROUTE, /resolveIntake\(\{ insuranceType: body\.insurance_type/, 'endpoint does not classify insurance server-side');
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

test('PPO resolves to qualified and the tracked thank-you page', () => {
  const routing = resolveLeadRouting(PPO_OPTION.value);
  assert.equal(routing.qualification, 'qualified');
  assert.equal(routing.destination, 'qualified_thank_you');
  assert.equal(pathForDestination(routing.destination), QUALIFIED_THANK_YOU_PATH);
});

test('Other resolves to unqualified and the separate thank-you page', () => {
  const routing = resolveLeadRouting(OTHER_OPTION.value);
  assert.equal(routing.qualification, 'unqualified');
  assert.equal(routing.destination, 'other_thank_you');
  assert.equal(pathForDestination(routing.destination), UNQUALIFIED_THANK_YOU_PATH);
  assert.notEqual(UNQUALIFIED_THANK_YOU_PATH, QUALIFIED_THANK_YOU_PATH);
});

test('an unknown, stale or forged insurance value cannot qualify', () => {
  // 'Medicaid' and 'HMO plans (any carrier)' ARE offered options — they simply
  // classify as unqualified, which is the point. The rest are values no form can
  // produce: forged, stale, or a bare carrier name with no plan type.
  for (const tampered of ['', '   ', 'Humana', 'ppo; qualified', 'Aetna HMO', 'Aetna', 'Medicaid', 'HMO plans (any carrier)', '__proto__', 'true']) {
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

test('the resolver accepts an absent ZIP, because not every form collects one', () => {
  // Hard-requiring ZIP on a shared endpoint would 400 every MiniContactForm lead.
  for (const absent of [undefined, null, '', '   ']) {
    const result = resolveIntake({ insuranceType: 'PPO', postalCode: absent });
    assert.equal(result.ok, true, `absent ZIP (${JSON.stringify(absent)}) must not be rejected`);
    if (result.ok) {
      assert.equal(result.postalCode, '');
      assert.equal(result.routing.qualification, 'qualified');
    }
  }
});

test('the resolver rejects a malformed ZIP outright rather than storing garbage', () => {
  for (const bad of ['123', '3346a', 'abcde', '33463-12', '334634']) {
    const result = resolveIntake({ insuranceType: 'PPO', postalCode: bad });
    assert.equal(result.ok, false, `${bad} should be rejected`);
    if (!result.ok) {
      assert.equal(result.field, 'postalCode');
      assert.equal(result.error, POSTAL_CODE_ERROR);
    }
  }
});

test('the resolver normalizes a valid ZIP and keeps its leading zero', () => {
  const result = resolveIntake({ insuranceType: 'PPO', postalCode: ' 02134 ' });
  assert.equal(result.ok, true);
  if (result.ok) assert.equal(result.postalCode, '02134');

  const plus4 = resolveIntake({ insuranceType: 'PPO', postalCode: '334631234' });
  assert.equal(plus4.ok, true);
  if (plus4.ok) assert.equal(plus4.postalCode, '33463-1234');
});

test('the resolver fails closed on insurance, even with a perfectly valid ZIP', () => {
  for (const tampered of ['', 'Humana', 'Aetna', 'Medicare', '__proto__', 'qualified']) {
    const result = resolveIntake({ insuranceType: tampered, postalCode: '33463' });
    assert.equal(result.ok, true, 'a bad insurance value is not a request error');
    if (result.ok) {
      assert.equal(result.routing.qualification, 'unqualified', `${tampered} must not qualify`);
      assert.equal(result.routing.destination, 'other_thank_you');
    }
  }
});

test('the resolver qualifies the accepted plans', () => {
  for (const good of ['PPO', 'Aetna PPO', 'Cigna PPO', 'Workers’ Compensation']) {
    const result = resolveIntake({ insuranceType: good, postalCode: '33463' });
    assert.equal(result.ok, true);
    if (result.ok) {
      assert.equal(result.routing.qualification, 'qualified', `${good} should qualify`);
      assert.equal(result.routing.destination, 'qualified_thank_you');
    }
  }
});

test('a rejected ZIP yields no routing decision at all', () => {
  // A 400 must never carry a qualification the browser could act on.
  const result = resolveIntake({ insuranceType: 'PPO', postalCode: 'nope' });
  assert.equal(result.ok, false);
  assert.ok(!('routing' in result), 'a rejection leaked a routing decision');
});

// ─────────────── ZIP must not leak into analytics (section 13) ───────────────

test('ZIP never appears in the canonical lead event', async () => {
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

test('ZIP is CONFINED to the Enhanced Conversions push, never loose in dataLayer', async () => {
  // An undecided visitor IS advertising-allowed here: isAdvertisingAllowed()
  // returns true for "nothing stored" by the owner's 2026-09-21 decision for US
  // traffic. So the invariant that matters is not that ZIP is absent from
  // dataLayer, it is that ZIP appears ONLY inside the isolated, purpose-built
  // enhanced_conversion_data payload — where Google's spec puts postal_code
  // unhashed — and never as a loose event parameter anything could report on.
  setConsent(true, true);

  await pushAcceptedLead({
    acceptance: { ok: true, submissionId: uniqueId('zip-consent') },
    ...LEAD,
    postalCode: '02134',
    lead_qualification: 'qualified',
  });
  await new Promise((r) => setTimeout(r, 25));

  const carrying = dataLayer().filter((e) => JSON.stringify(e).includes('02134'));
  assert.ok(carrying.length > 0, 'ZIP vanished from Enhanced Conversions, degrading match quality');
  for (const entry of carrying) {
    assert.ok('enhanced_conversion_data' in entry, 'ZIP appeared outside the Enhanced Conversions payload');
    assert.notEqual(entry.event, CANONICAL_LEAD_EVENT, 'ZIP was merged into the canonical lead event');
    // It must sit under address.postal_code, not at the top level of the event.
    assert.ok(!('postal_code' in entry), 'ZIP became a top-level event parameter');
  }
  assert.ok(!JSON.stringify(canonical()).includes('02134'), 'ZIP leaked into the canonical event');
});

test('an explicit marketing refusal keeps ZIP out of dataLayer entirely', async () => {
  setConsent(false, false);

  await pushAcceptedLead({
    acceptance: { ok: true, submissionId: uniqueId('zip-refused') },
    ...LEAD,
    postalCode: '02134',
    lead_qualification: 'qualified',
  });
  await new Promise((r) => setTimeout(r, 25));

  assert.ok(!JSON.stringify(dataLayer()).includes('02134'), 'ZIP was transmitted after an explicit refusal');
  // The business event still fires: refusing marketing must not erase the lead.
  assert.equal(canonical().length, 1, 'an explicit refusal suppressed the lead event itself');
});

test('the insurance answer and its qualification never reach the canonical event', async () => {
  await pushAcceptedLead({
    acceptance: { ok: true, submissionId: uniqueId('ins-canon') },
    ...LEAD,
    postalCode: '33463',
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
  await pushAcceptedLead({ acceptance: { ok: true, submissionId: id }, ...LEAD, postalCode: '33463', lead_qualification: 'qualified' });
  assert.equal(canonical().length, 1);
});

test('a retry of the same submission does not duplicate the conversion', async () => {
  const id = uniqueId('retry');
  for (let i = 0; i < 4; i++) {
    await pushAcceptedLead({ acceptance: { ok: true, submissionId: id }, ...LEAD, postalCode: '33463', lead_qualification: 'qualified' });
  }
  assert.equal(canonical().length, 1, 'a refresh or double-submit of one submission fired more than one conversion');
});

test('an Other submission fires zero qualified conversions, retried or not', async () => {
  const id = uniqueId('other');
  for (let i = 0; i < 3; i++) {
    await pushAcceptedLead({ acceptance: { ok: true, submissionId: id }, ...LEAD, postalCode: '33463', lead_qualification: 'unqualified' });
  }
  assert.equal(canonical().length, 0);
  assert.equal(dataLayer().length, 0, 'an unqualified lead emitted a dataLayer event');
});

test('an Other submission cannot be promoted into a conversion by a later retry', async () => {
  const id = uniqueId('promote');
  await pushAcceptedLead({ acceptance: { ok: true, submissionId: id }, ...LEAD, postalCode: '33463', lead_qualification: 'unqualified' });
  // Same submission id, now claiming to be qualified. The id is already spent.
  await pushAcceptedLead({ acceptance: { ok: true, submissionId: id }, ...LEAD, postalCode: '33463', lead_qualification: 'qualified' });
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

test('the shared error message is the one the form and endpoint both show', () => {
  assert.ok(POSTAL_CODE_ERROR.length > 0);
  assert.match(RESOLVER, /POSTAL_CODE_ERROR/, 'the shared resolver does not use the shared ZIP error message');
  assert.match(FORM, /POSTAL_CODE_ERROR/, 'form does not use the shared ZIP error message');
  // The endpoint surfaces whatever the resolver returned rather than inventing its own.
  assert.match(ROUTE, /error: intake\.error, field: intake\.field/, 'endpoint does not surface the resolver error');
});
