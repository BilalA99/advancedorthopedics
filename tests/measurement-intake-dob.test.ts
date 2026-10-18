/**
 * The intake date of birth (Abubeckr and Israel, 2026-10-17, checklist thread).
 *
 *   - required on every intake form, as a native date input with no `name`;
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
  formatDateOfBirthForStaff,
  isValidDateOfBirth,
  normalizeDateOfBirth,
} from '../lib/date-of-birth';
import { subjectWithInsurance } from '../lib/intake-submission';

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
    assert.match(source, /isValidDateOfBirth|DATE_OF_BIRTH_REQUIRED_MESSAGE/, `${file} does not require it`);
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
});
