/**
 * Injury-page insurance plans (Abubeckr and Bilal, 2026-10-24; mapping by Israel,
 * 2026-10-26): Auto insurance / PIP on car accident and personal injury, Workers'
 * compensation on work injury and slip and fall. Both are accepted plans, so they
 * route to the tracked thank-you page and fire the qualified conversion.
 */
import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { InsuranceSelect } from '../components/InsuranceSelect';
import {
  AUTO_PIP_OPTION,
  WORKERS_COMP_OPTION,
  classifyInsurance,
  getInsuranceOptions,
  resolveLeadRouting,
} from '../lib/insurance-routing';

const root = path.join(import.meta.dirname, '..');
const readSource = (rel: string) => readFileSync(path.join(root, rel), 'utf8');

test('Auto insurance / PIP and Workers\' compensation are accepted plans', () => {
  for (const value of [AUTO_PIP_OPTION.value, WORKERS_COMP_OPTION.value]) {
    assert.equal(classifyInsurance(value), 'qualified', value);
    assert.deepEqual(resolveLeadRouting(value), { qualification: 'qualified', destination: 'qualified_thank_you' });
  }
  // Still not accepted, whatever the page.
  assert.equal(classifyInsurance('Medicare / Medicaid / TRICARE'), 'unqualified');
  // Under 20 still wins over an accepted plan.
  assert.equal(resolveLeadRouting(AUTO_PIP_OPTION.value, '2012-01-01').qualification, 'unqualified');
});

test('the extra plan sits right after "Other job insurance", before the two not accepted', () => {
  for (const [extra, option] of [['auto-pip', AUTO_PIP_OPTION], ['workers-comp', WORKERS_COMP_OPTION]] as const) {
    const values = getInsuranceOptions(extra).map((o) => o.value);
    assert.equal(values.length, 8);
    assert.equal(values[4], 'Other job insurance');
    assert.equal(values[5], option.value);
    assert.deepEqual(values.slice(6), ['Medicare / Medicaid / TRICARE', 'Marketplace or self-pay']);
  }
  assert.equal(getInsuranceOptions().length, 7, 'the shared forms keep the seven');
});

test('the select renders the extra only when asked', () => {
  const plain = renderToStaticMarkup(React.createElement(InsuranceSelect, { value: '', onChange: () => {} }));
  const pip = renderToStaticMarkup(React.createElement(InsuranceSelect, { value: '', onChange: () => {}, extra: 'auto-pip' }));
  assert.doesNotMatch(plain, /Auto insurance|Workers/);
  assert.match(pip, /Auto insurance \/ PIP/);
  assert.doesNotMatch(pip, /Workers/);
});

test('each injury page shows the right extra, and no other form shows one', () => {
  const expected: Record<string, string> = {
    'app/injuries/car-accident/lead-capture-form.tsx': 'auto-pip',
    'app/injuries/personal-injury/lead-capture-form.tsx': 'auto-pip',
    'app/injuries/work-injury/lead-capture-form.tsx': 'workers-comp',
    'app/injuries/slip-and-fall/lead-capture-form.tsx': 'workers-comp',
  };
  for (const [file, extra] of Object.entries(expected)) {
    assert.match(readSource(file), new RegExp(`<InsuranceSelect extra="${extra}"`), file);
  }
  for (const file of [
    'components/ContactForm.tsx', 'components/BodyPartHeroForm.tsx', 'components/MobileHeroMiniForm.tsx',
    'components/DoctorContactForm.tsx', 'components/BookAnAppoitmentButton.tsx', 'components/BookAnAppointmentPopup.tsx',
    'components/MiniContactForm.tsx', 'components/StateHeroForm.tsx', 'components/PatientAdvocateForm.tsx',
  ]) {
    assert.doesNotMatch(readSource(file), /<InsuranceSelect[^>]*extra=/, file);
  }
});
