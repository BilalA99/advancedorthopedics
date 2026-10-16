/**
 * Live checks against the REAL /api/forms/consultation endpoint.
 *
 * Deliberately limited to requests that the handler rejects BEFORE it calls
 * sendContactEmail or sendUserEmail, so nothing is inserted into the production
 * Supabase project and nothing is emailed to the clinic. In the current handler the
 * ZIP guard and the geo guard both return early, which is exactly what makes these
 * safe to run repeatedly.
 *
 * A request with a VALID ZIP is not made here: it would create a real lead row and
 * a real staff email. The accepted-path response shape is covered by
 * tests/measurement-intake-zip.test.ts and by the intercepted browser flows.
 *
 * Usage: node scripts/tmp/intake-server-contract.mjs <baseUrl>
 */
const BASE = process.argv[2] || 'http://localhost:3000';
const ENDPOINT = BASE + '/api/forms/consultation';

let failures = 0;
const check = (name, passed, detail = '') => {
  if (!passed) failures++;
  console.log(`${passed ? 'ok  ' : 'FAIL'} ${name}${detail ? ' — ' + detail : ''}`);
};

const BASE_BODY = {
  firstName: 'Testpatient',
  lastName: 'Synthetic',
  email: 'qa+intake@example.com',
  phone: '5615550123',
  reason: 'Automated server-contract check. Not a real patient.',
  insurance_type: 'PPO',
  country: 'US',
  state: 'FL',
  form_source: 'book-appointment',
};

async function post(body, headers = {}) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
    redirect: 'manual',
  });
  let json = null;
  try { json = await res.json(); } catch {}
  return { status: res.status, json };
}

console.log(`\n=== server contract against ${ENDPOINT} ===`);
console.log('(only pre-persistence rejection paths — no leads or emails are created)\n');

// ── ZIP is validated server-side, and rejection happens before any side effect ──
// ONLY malformed-but-present values. An absent or empty ZIP is now ACCEPTED by
// design (MiniContactForm does not collect one), so sending those here would sail
// past validation and create a real lead row plus a real email to the clinic.
for (const [label, zip] of [
  ['too short', '123'],
  ['too long', '334634'],
  ['non-numeric', 'abcde'],
  ['partial ZIP+4', '33463-12'],
  ['letters mixed in', '3346a'],
]) {
  const { status, json } = await post({ ...BASE_BODY, postalCode: zip });
  check(`server rejects ${label} ZIP with 400`, status === 400, `status ${status}`);
  check(`server returns the shared ZIP message for ${label} ZIP`,
    json?.error === 'Please enter a valid ZIP code', JSON.stringify(json));
  check(`server names the offending field for ${label} ZIP`, json?.field === 'postalCode', JSON.stringify(json?.field));
  check(`server does NOT return ok for ${label} ZIP`, json?.ok !== true);
  check(`server issues no submission id for ${label} ZIP`, !json?.submissionId, String(json?.submissionId));
  check(`server issues no qualification for ${label} ZIP`, !json?.qualification, String(json?.qualification));
}

// ── a rejected ZIP must never carry a qualified decision, even with PPO selected ──
{
  const { json } = await post({ ...BASE_BODY, insurance_type: 'PPO', postalCode: 'bogus' });
  check('a PPO submission with a bad ZIP yields no qualified decision',
    json?.qualification !== 'qualified' && json?.destination !== 'qualified_thank_you',
    JSON.stringify(json));
}

// ── the geo guard still stands in front of everything ──
{
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-vercel-ip-country': 'DE' },
    body: JSON.stringify({ ...BASE_BODY, postalCode: '33463' }),
    redirect: 'manual',
  });
  check('a non-US submission is redirected, not processed',
    res.status === 307 || res.status === 302 || res.status === 303,
    `status ${res.status}`);
  const location = res.headers.get('location') || '';
  check('the non-US redirect points at /unavailable', location.includes('/unavailable'), location);
}

console.log(failures === 0 ? '\nall server-contract checks passed' : `\n${failures} FAILURES`);
process.exit(failures ? 1 : 0);
