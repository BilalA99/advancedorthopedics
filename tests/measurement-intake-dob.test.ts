/**
 * The intake date of birth (Abubeckr and Israel, 2026-10-17, checklist thread).
 *
 *   - optional on every intake form (2026-10-18), a native date input with no `name`;
 *   - one validation rule, shared by the browser and the server;
 *   - the server never rejects a lead over it: missing or invalid is stored NULL;
 *   - it reaches the staff email body, never the subject, never a tracking module.
 *
 * scripts/validate-measurement-contract.mjs enforces the same rules structurally.
 */
import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { DateOfBirthInput } from '../components/DateOfBirthInput';
import {
  ageOn,
  formatDateOfBirthForStaff,
  isUnderMinimumAge,
  isValidDateOfBirth,
  normalizeDateOfBirth,
  UNDER_MINIMUM_AGE_MESSAGE,
} from '../lib/date-of-birth';
import { resolveIntake, subjectWithInsurance } from '../lib/intake-submission';
import { resolveLeadRouting } from '../lib/insurance-routing';

const root = path.join(import.meta.dirname, '..');
const readSource = (rel: string) => readFileSync(path.join(root, rel), 'utf8');
const stripComments = (source: string) => source
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
  .replace(/^\s*\/\/.*$/gm, '');

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
  // The four injury-page forms (2026-10-24, "please update all of them").
  'app/injuries/car-accident/lead-capture-form.tsx',
  'app/injuries/personal-injury/lead-capture-form.tsx',
  'app/injuries/slip-and-fall/lead-capture-form.tsx',
  'app/injuries/work-injury/lead-capture-form.tsx',
  // The three questionnaires (2026-10-24).
  'app/find-care/free-mri-review/FreeMRIReviewClient.tsx',
  'components/CandidacyCheckClient.tsx',
  'components/ConditionCheckSection.tsx',
];

const INTAKE_ROUTES = [
  'app/api/forms/consultation/route.ts',
  'app/api/forms/doctor/route.ts',
  'app/api/forms/book-appointment/route.ts',
  'app/api/forms/patient-advocate/route.ts',
];

const NOW = new Date('2026-10-17T12:00:00Z');

test('a real past date is accepted as YYYY-MM-DD', () => {
  assert.equal(normalizeDateOfBirth('1985-04-23', NOW), '1985-04-23');
  assert.equal(normalizeDateOfBirth(' 2000-02-29 ', NOW), '2000-02-29');
  assert.equal(normalizeDateOfBirth('1900-01-01', NOW), '1900-01-01');
});

test('empty, malformed, impossible, too old and future dates are rejected', () => {
  for (const value of ['', null, undefined, '04/23/1985', '1985-4-23', '2001-02-30',
    '2001-13-01', '1899-12-31', '2026-10-19', '2099-01-01', 'not a date']) {
    assert.equal(normalizeDateOfBirth(value as string, NOW), null, String(value));
  }
});

test('the browser check agrees with the server rule', () => {
  assert.equal(isValidDateOfBirth('1990-06-15'), true);
  assert.equal(isValidDateOfBirth(''), false);
  assert.equal(isValidDateOfBirth('1990-02-31'), false);
});

test('staff see MM/DD/YYYY, or "Not provided" when missing', () => {
  assert.equal(formatDateOfBirthForStaff('1985-04-23'), '04/23/1985');
  assert.equal(formatDateOfBirthForStaff(''), 'Not provided');
  assert.equal(formatDateOfBirthForStaff(undefined), 'Not provided');
});

test('the input is a native date input with no name and birthday autofill', () => {
  const html = renderToStaticMarkup(
    React.createElement(DateOfBirthInput, { id: 'dob', value: '', onChange: () => {} }),
  );
  assert.match(html, /type="date"/);
  assert.match(html, /autoComplete="bday"|autocomplete="bday"/);
  assert.doesNotMatch(html, /\bname=/);
  assert.match(html, /min="1900-01-01"/);
});

test('every intake form renders the date of birth and sends it as date_of_birth', () => {
  for (const file of INTAKE_FORMS) {
    const source = stripComments(readSource(file));
    assert.match(source, /<DateOfBirthInput\b/, `${file} renders no DateOfBirthInput`);
    assert.match(source, /date_of_birth/, `${file} does not send date_of_birth`);
    assert.match(source, /isValidDateOfBirth/, `${file} does not check that a typed date is real`);
    // Optional (Israel and Abubeckr, 2026-10-18): no form may require it.
    assert.doesNotMatch(source, /DATE_OF_BIRTH_REQUIRED_MESSAGE/, `${file} requires the date of birth`);
    assert.doesNotMatch(source, /Date of birth\s*<span className="text-red-500">\*<\/span>/,
      `${file} marks the date of birth as required`);
  }
});

test('every intake endpoint normalises the date of birth instead of rejecting the lead', () => {
  for (const file of INTAKE_ROUTES) {
    const source = stripComments(readSource(file));
    assert.match(source, /normalizeDateOfBirth\(/, `${file} does not normalise date_of_birth`);
  }
});

test('the date of birth never reaches the email subject or a tracking module', () => {
  assert.equal(subjectWithInsurance('New Contact Form Submission', 'Aetna'),
    'New Contact Form Submission - Insurance: Aetna');
  const dob = /date_?of_?birth|dateOfBirth|\bdob\b|\bbday\b/i;
  for (const file of ['utils/enhancedConversions.ts', 'lib/lead-contract.ts', 'lib/meta-pixel.ts']) {
    assert.doesNotMatch(stripComments(readSource(file)), dob, `${file} mentions the date of birth`);
  }
  const persistence = stripComments(readSource('components/email/sendcontactemail.ts'));
  for (const line of persistence.split('\n').filter((l) => /subject\s*:/.test(l))) {
    assert.doesNotMatch(line, dob, `an email subject carries the date of birth: ${line.trim()}`);
  }
  assert.match(persistence, /date_of_birth:\s+normalizeDateOfBirth\(data\.date_of_birth\)/,
    'the Supabase writer does not store the normalised date of birth');
  // The three questionnaire actions write it too (2026-10-24).
  for (const source of ['free-mri-review', 'candidacy-check', 'condition-check']) {
    assert.match(persistence,
      new RegExp(`date_of_birth:\\s+formData\\.date_of_birth,\\s+form_source:\\s+'${source}'`),
      `the ${source} action does not store the date of birth`);
  }
});

// ───────────── under 20 is not accepted (Abubeckr, 2026-10-25) ─────────────

test('age is whole years, and the 20th birthday is the first accepted day', () => {
  const today = new Date(2026, 9, 26, 12); // 26 Oct 2026, local time
  assert.equal(ageOn('2006-10-26', today), 20);
  assert.equal(ageOn('2006-10-27', today), 19);
  assert.equal(isUnderMinimumAge('2006-10-26', today), false);
  assert.equal(isUnderMinimumAge('2006-10-27', today), true);
  assert.equal(isUnderMinimumAge('2010-01-01', today), true);
  assert.equal(isUnderMinimumAge('1985-04-23', today), false);
});

test('a blank or invalid date of birth is never treated as under 20', () => {
  for (const value of ['', null, undefined, '2010-02-30', 'not a date']) {
    assert.equal(isUnderMinimumAge(value as string), false, String(value));
  }
});

test('an under-20 lead is unqualified whatever the insurance, on the server', () => {
  const young = '2015-06-01';
  assert.deepEqual(resolveLeadRouting('Aetna', young),
    { qualification: 'unqualified', destination: 'other_thank_you' });
  assert.equal(resolveIntake({ insuranceType: 'Aetna', dateOfBirth: young }).routing.qualification, 'unqualified');
  // Blank date of birth: insurance alone decides, as before.
  assert.equal(resolveLeadRouting('Aetna', '').qualification, 'qualified');
  assert.equal(resolveLeadRouting('Aetna', '1985-04-23').qualification, 'qualified');
});

test('the date input shows the under-20 message itself', () => {
  const young = React.createElement(DateOfBirthInput, { id: 'dob', value: '2015-06-01', onChange: () => {} });
  const adult = React.createElement(DateOfBirthInput, { id: 'dob', value: '1985-04-23', onChange: () => {} });
  assert.match(renderToStaticMarkup(young), new RegExp(UNDER_MINIMUM_AGE_MESSAGE.replace(/[.]/g, '\.')));
  assert.doesNotMatch(renderToStaticMarkup(adult), /20 and older/);
});

test('every patient form refuses an under-20 date and disables its submit button', () => {
  for (const file of INTAKE_FORMS) {
    const source = stripComments(readSource(file));
    assert.match(source, /isUnderMinimumAge\(/, `${file} does not check the minimum age`);
    // MiniContactForm has no submit button of its own (its only button opens the
    // Book an Appointment popup); its validation still refuses an under-20 date.
    if (file === 'components/MiniContactForm.tsx') continue;
    assert.match(source, /disabled=\{[^}]*(underMinimumAge|isUnderMinimumAge)/, `${file} does not disable its submit button for under 20`);
  }
});

test('every server action and endpoint passes the date of birth into the routing decision', () => {
  // Raw source: stripComments would treat the "/*" in "/api/forms/*" as a comment start.
  const actions = readSource('components/email/sendcontactemail.ts');
  assert.equal((actions.match(/resolveLeadRouting\(formData\.insurance_type, formData\.date_of_birth\)/g) || []).length, 4);
  for (const file of INTAKE_ROUTES) {
    assert.match(stripComments(readSource(file)), /resolveIntake\(\{[^}]*dateOfBirth/, `${file} does not pass the date of birth to resolveIntake`);
  }
});
