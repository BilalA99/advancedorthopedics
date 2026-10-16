/**
 * Abubeckr's intake-form checklist (Slack #mountain-spine-and-orthopedics,
 * 2026-10-14, items 9 to 13), the parts not already covered by
 * measurement-insurance-routing.test.ts and measurement-intake-zip.test.ts:
 *
 *   9.  the insurance question is a real, native <select>;
 *   11. every submission emails intake with the insurance in the subject line;
 *   12. the insurance answer never reaches a thank-you URL;
 *   13. the reason box is 2 to 3 lines and the card upload has the spec label.
 */
import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { InsuranceSelect } from '../components/InsuranceSelect';
import {
  getInsuranceOptions,
  INSURANCE_CARD_UPLOAD_LABEL,
  INSURANCE_PLACEHOLDER,
} from '../lib/insurance-routing';
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

/** Every form that routes by the insurance answer, intake and questionnaires alike. */
const ROUTED_FORMS = INTAKE_FORMS.concat([
  'components/CandidacyCheckClient.tsx',
  'components/ConditionCheckSection.tsx',
  'app/find-care/free-mri-review/FreeMRIReviewClient.tsx',
]);

const INTAKE_ROUTES = [
  'app/api/forms/consultation/route.ts',
  'app/api/forms/doctor/route.ts',
  'app/api/forms/book-appointment/route.ts',
  'app/api/forms/patient-advocate/route.ts',
];

// ───────────────────────── item 9: a native select ─────────────────────────

const renderSelect = (value = '') =>
  renderToStaticMarkup(
    React.createElement(InsuranceSelect, { id: 'test_insurance_type', value, onChange: () => {} }),
  );

test('InsuranceSelect renders a real <select>, not a custom listbox', () => {
  const html = renderSelect();
  assert.match(html, /^<select\b/, 'the component does not render a native select');
  assert.doesNotMatch(html, /role="(listbox|combobox)"/, 'the component renders a custom listbox');
});

test('InsuranceSelect offers the placeholder then the seven options, in order', () => {
  const html = renderSelect();
  const options = [...html.matchAll(/<option[^>]*value="([^"]*)"[^>]*>([^<]*)<\/option>/g)].map((m) => ({
    value: m[1],
    label: m[2].replace(/&amp;/g, '&'),
  }));
  assert.equal(options.length, 8, 'expected the placeholder plus seven options');
  assert.deepEqual(options[0], { value: '', label: INSURANCE_PLACEHOLDER });
  assert.deepEqual(options.slice(1).map((o) => o.label), getInsuranceOptions().map((o) => o.label));
  assert.match(html, /<option value="" disabled=""[^>]*>Select your insurance<\/option>/,
    'the placeholder must not be a selectable answer');
});

test('InsuranceSelect has no name, so a pre-hydration GET cannot put it in a URL (item 12)', () => {
  assert.doesNotMatch(renderSelect('Aetna'), /\sname=/, 'the select carries a name attribute');
});

test('every intake form renders the native InsuranceSelect and no insurance listbox', () => {
  for (const rel of INTAKE_FORMS) {
    const code = stripComments(readSource(rel));
    assert.match(code, /<InsuranceSelect\b/, `${rel} does not render InsuranceSelect`);
    assert.doesNotMatch(code, /<SelectTrigger[^>]*insurance_type/, `${rel} still renders a Radix insurance listbox`);
    assert.doesNotMatch(code, /name=["']insurance_type["']/, `${rel} still names an insurance field`);
  }
});

test('every intake form requires an insurance answer before it submits', () => {
  for (const rel of INTAKE_FORMS) {
    const code = stripComments(readSource(rel));
    const required =
      /insuranceType:\s*z\.string\(\)\.min\(1/.test(code) ||
      /if \(!formData\.insuranceType\)/.test(code);
    assert.ok(required, `${rel} can submit without an insurance answer`);
  }
});

// ───────────────────── item 11: insurance in the email subject ─────────────────────

test('the staff subject carries the insurance answer', () => {
  assert.equal(
    subjectWithInsurance('New Contact Form Submission', 'Aetna'),
    'New Contact Form Submission - Insurance: Aetna',
  );
  for (const option of getInsuranceOptions()) {
    assert.ok(subjectWithInsurance('New Contact Form Submission', option.value).endsWith(option.value),
      `${option.value} is not in the subject`);
  }
});

test('the subject cannot be used to inject an email header', () => {
  const subject = subjectWithInsurance('New Contact Form Submission', 'Aetna\r\nBcc: someone@example.com');
  assert.doesNotMatch(subject, /[\r\n]/, 'a line break reached the subject');
});

test('a form with no insurance question keeps the plain subject', () => {
  assert.equal(subjectWithInsurance('New Contact Form Submission', undefined), 'New Contact Form Submission');
  assert.equal(subjectWithInsurance('New Contact Form Submission', '   '), 'New Contact Form Submission');
});

test('the staff notification uses the insurance subject for every insurance-bearing email', () => {
  const code = stripComments(readSource('components/email/sendcontactemail.ts'));
  for (const base of [
    'New Contact Form Submission',
    'New MRI Review Form Submission',
    'New Candidacy Form Submission',
    'New Condition Check Form Submission',
  ]) {
    assert.match(code, new RegExp(`subject: subjectWithInsurance\\('${base}', formData\\.insurance_type\\)`),
      `${base} does not carry the insurance answer`);
  }
});

test('every intake endpoint emails intake with the insurance, qualified or not', () => {
  for (const rel of INTAKE_ROUTES) {
    const code = stripComments(readSource(rel));
    const start = code.indexOf('await sendContactEmail({');
    assert.notEqual(start, -1, `${rel} does not email intake`);
    const call = code.slice(start, code.indexOf('});', start));
    assert.match(call, /insurance_type/, `${rel} does not pass the insurance answer to the staff email`);
    // The staff email is sent before, and regardless of, the routing decision.
    assert.ok(start < code.indexOf('...routing'), `${rel} sends the routing decision before emailing intake`);
    assert.doesNotMatch(code.slice(0, start), /if \(\s*routing\.qualification/, `${rel} only emails some leads`);
  }
});

// ───────────────────── item 12: never in a thank-you URL ─────────────────────

test('no form navigates anywhere that could carry the insurance answer', () => {
  for (const rel of ROUTED_FORMS) {
    const code = stripComments(readSource(rel));
    const navigations = [
      ...code.matchAll(/(?:router\.(?:push|replace)|redirect|window\.location\.(?:assign|replace))\(((?:[^()]|\([^()]*\))*)\)/g),
    ].map((m) => m[1].trim());
    assert.ok(navigations.length > 0, `${rel} has no navigation to check`);
    for (const target of navigations) {
      assert.ok(
        /^pathForDestination\(destination\)$/.test(target) || /^res\.url$/.test(target),
        `${rel} navigates to ${target}, which is neither the server's fixed destination nor the server's own redirect`,
      );
    }
    assert.doesNotMatch(code, /thank-you[^'"`]*\?/, `${rel} builds a thank-you URL with a query string`);
    assert.doesNotMatch(code, /location\.href\s*=/, `${rel} assigns location.href directly`);
  }
});

test('the only server redirect from an intake endpoint is the geo-block page', () => {
  for (const rel of INTAKE_ROUTES) {
    const code = stripComments(readSource(rel));
    const redirects = [...code.matchAll(/NextResponse\.redirect\(([^;]*)\)/g)].map((m) => m[1]);
    for (const r of redirects) {
      assert.match(r, /^new URL\("\/unavailable", request\.url\)\)?$/, `${rel} redirects to ${r}`);
    }
  }
});

test('neither thank-you page reads a query string', () => {
  for (const rel of ['app/thank-you/page.tsx', 'app/thank-you/other/page.tsx']) {
    const code = stripComments(readSource(rel));
    assert.doesNotMatch(code, /searchParams|useSearchParams/, `${rel} reads the query string`);
  }
});

// ───────────────────── item 13: reason box and card upload ─────────────────────

test('the reason box is 2 to 3 lines on every intake form', () => {
  for (const rel of INTAKE_FORMS) {
    const code = stripComments(readSource(rel));
    const boxes = [...code.matchAll(/<(?:Textarea|textarea)\b[\s\S]*?\/>/g)].map((m) => m[0]);
    assert.ok(boxes.length > 0, `${rel} has no reason box`);
    for (const box of boxes) {
      const rows = /rows=\{(\d+)\}/.exec(box);
      assert.ok(rows, `${rel} has a reason box with no rows set`);
      const n = Number(rows[1]);
      assert.ok(n >= 2 && n <= 3, `${rel} has a ${n}-row reason box`);
      assert.doesNotMatch(box, /min-h-\[(?:[4-9]\d|\d{3,})px\]/, `${rel} still forces a tall reason box`);
      if (/<Textarea\b/.test(box)) {
        // The shared Textarea grows with its content; fixed sizing makes rows stick.
        assert.match(box, /field-sizing-fixed/, `${rel} lets the reason box grow past its rows`);
      }
    }
  }
});

test('every card upload carries the exact spec label', () => {
  assert.equal(INSURANCE_CARD_UPLOAD_LABEL, 'Upload your insurance card to get verified faster (optional).');
  for (const rel of INTAKE_FORMS) {
    const code = stripComments(readSource(rel));
    if (!/type="file"/.test(code)) continue;
    assert.match(code, /\{INSURANCE_CARD_UPLOAD_LABEL\}/, `${rel} has a card upload without the spec label`);
    assert.doesNotMatch(code, /\(Optional\)<\/span>/, `${rel} still carries the old "(Optional)" sub-labels`);
  }
});
