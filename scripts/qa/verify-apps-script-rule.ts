/**
 * Proves the Apps Script's insurance rule agrees with lib/insurance-routing.ts
 * for every option the form can actually produce.
 *
 * The tracker lives in a different runtime and cannot import the site's config,
 * so it re-implements the rule as a substring test. That is a drift risk, and
 * this check is what makes the drift visible instead of silent: a mismatch here
 * means the Daily Tracker's PPO columns disagree with the conversion that fired.
 */
import { getInsuranceOptions } from "../../lib/insurance-routing";

// ── verbatim copy of the Apps Script logic ───────────────────────────────────
const INSURANCE_NOT_QUALIFIED = [
  'hmo plans (any carrier)', 'medicare', 'medicaid',
  'medicare or medicaid hmo', 'other', 'other / not listed',
  'non-ppo', 'non ppo', 'not ppo',
];
const INSURANCE_QUALIFIED_NAMED = [
  'workers compensation', 'auto / personal injury (pip)',
  'self-pay / no insurance',
];
function normalizeInsurance(value: string) {
  return String(value || '')
    .replace(/[\u2018\u2019\u02BC]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}
function isQualifiedInsurance(value: string) {
  const s = normalizeInsurance(value);
  if (!s) return false;
  if (INSURANCE_NOT_QUALIFIED.indexOf(s) !== -1) return false;
  if (INSURANCE_QUALIFIED_NAMED.indexOf(s) !== -1) return true;
  return s.indexOf('ppo') !== -1;
}
// ─────────────────────────────────────────────────────────────────────────────

let bad = 0;
console.log('value'.padEnd(32) + '| site      | apps script | match');
console.log('-'.repeat(74));
for (const o of getInsuranceOptions()) {
  const site = o.qualification === 'qualified';
  const gs = isQualifiedInsurance(o.value);
  const ok = site === gs;
  if (!ok) bad++;
  console.log(
    o.value.padEnd(32) + '| ' + String(site).padEnd(10) + '| ' +
    String(gs).padEnd(12) + '| ' + (ok ? 'ok' : 'MISMATCH'),
  );
}
// Values the form never produces, but a hand-typed sheet edit might.
for (const [v, expected] of [['', false], ['Aetna', false], ['Non-PPO', false], ['aetna ppo', true]] as [string, boolean][]) {
  const gs = isQualifiedInsurance(v);
  const ok = gs === expected;
  if (!ok) bad++;
  console.log((v || '(blank)').padEnd(32) + '| expect ' + String(expected).padEnd(3) + '| ' + String(gs).padEnd(12) + '| ' + (ok ? 'ok' : 'MISMATCH'));
}
console.log(bad === 0 ? '\nALL MATCH — tracker and site agree' : `\n${bad} MISMATCH(ES)`);
process.exit(bad ? 1 : 0);
