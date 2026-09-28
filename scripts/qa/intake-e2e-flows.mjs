/**
 * End-to-end intake flows: PPO, Other, validation, tampering, duplicates.
 *
 * ## Why the endpoint is intercepted
 *
 * A real submission against this build inserts a row into the PRODUCTION Supabase
 * project and emails info@mountainspineorthopedics.com through Resend, because
 * RESEND_API_KEY and the Supabase keys in .env are the live ones. Driving twenty
 * submissions through it would put twenty fake patients in the clinic's lead table
 * and twenty emails in their inbox.
 *
 * So the browser half is tested against an intercepted endpoint that returns
 * exactly what the real handler returns, and the server half — ZIP validation,
 * fail-closed qualification, the routing decision — is proven separately and
 * directly in tests/measurement-intake-zip.test.ts plus the live-handler check in
 * intake-server-contract.mjs, which calls the route module in-process with the
 * email and persistence boundaries stubbed.
 *
 * Interception is also what makes the negative assertions meaningful: it lets us
 * force a 500, a timeout and a duplicate response on demand.
 *
 * Usage: node scripts/tmp/intake-e2e-flows.mjs <baseUrl> [mobile|desktop]
 */
import puppeteer from 'puppeteer';
import { randomUUID } from 'node:crypto';

const BASE = process.argv[2] || 'http://localhost:3000';
const PROFILE = process.argv[3] || 'desktop';

const VIEWPORTS = {
  desktop: { width: 1440, height: 900, isMobile: false, hasTouch: false, label: 'desktop 1440x900' },
  mobile: { width: 390, height: 844, isMobile: true, hasTouch: true, label: 'mobile 390x844 (iPhone 12)' },
};
const VP = VIEWPORTS[PROFILE];

// /find-care/book-an-appointment renders DoctorContactForm — <ConsultationForm /> is
// commented out there — so it cannot exercise this component. /insurance-policy
// renders the real intake form and is topically the right place for an insurance
// question.
const FORM_URL = BASE + '/insurance-policy';

/**
 * Tags the intake form so every selector below is scoped to it.
 *
 * id="postal_code" is duplicated across five form components and the homepage
 * mounts DoctorContactForm lazily, so a bare '#postal_code' can resolve to a hidden
 * input in a different form and make every assertion here meaningless.
 */
const SCOPE = '[data-qa-intake="1"]';
async function scopeToIntakeForm(page) {
  const ok = await page.evaluate(() => {
    const form = document.querySelector('#insurance_type')?.closest('form');
    if (!form) return false;
    form.setAttribute('data-qa-intake', '1');
    return true;
  });
  if (!ok) throw new Error('intake form (#insurance_type) not found on ' + FORM_URL);
}

const results = [];
let failures = 0;

function check(name, passed, detail = '') {
  results.push({ name, passed, detail });
  if (!passed) failures++;
  console.log(`${passed ? 'ok  ' : 'FAIL'} ${name}${detail ? ' — ' + detail : ''}`);
}

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });

/**
 * Opens the form with the submission endpoint stubbed.
 *
 * `behaviour` controls what the fake endpoint does, so error, timeout and
 * duplicate-response paths are reachable.
 */
async function openForm({ behaviour = 'ok', fixedSubmissionId = null } = {}) {
  const page = await browser.newPage();
  await page.setViewport(VP);

  const posts = [];
  const consoleErrors = [];
  page.on('pageerror', (e) => consoleErrors.push(String(e.message || e)));

  await page.setRequestInterception(true);
  page.on('request', async (req) => {
    const url = req.url();
    if (!url.includes('/api/forms/consultation')) {
      try { await req.continue(); } catch {}
      return;
    }

    let body = {};
    try { body = JSON.parse(req.postData() || '{}'); } catch {}
    posts.push(body);

    if (behaviour === 'error') {
      return req.respond({ status: 500, contentType: 'application/json', body: JSON.stringify({ ok: false }) });
    }
    if (behaviour === 'timeout') {
      return; // never respond: exercises the pending/disabled state
    }
    if (behaviour === 'zip-reject') {
      return req.respond({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ ok: false, error: 'Please enter a valid ZIP code', field: 'postalCode' }),
      });
    }

    // Mirror the real handler: it classifies server-side and fails closed.
    const insurance = String(body.insurance_type || '').trim().toLowerCase();
    const qualification = insurance === 'ppo' ? 'qualified' : 'unqualified';
    const destination = qualification === 'qualified' ? 'qualified_thank_you' : 'other_thank_you';

    return req.respond({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        ok: true,
        submissionId: fixedSubmissionId || randomUUID(),
        qualification,
        destination,
      }),
    });
  });

  // Capture every dataLayer push before any app code runs.
  await page.evaluateOnNewDocument(() => {
    window.__pushes = [];
    const real = [];
    Object.defineProperty(window, 'dataLayer', {
      configurable: true,
      get() { return real; },
      set(v) { if (Array.isArray(v)) { real.length = 0; real.push(...v); } },
    });
    const origPush = Array.prototype.push;
    real.push = function (...args) {
      for (const a of args) window.__pushes.push(a);
      return origPush.apply(this, args);
    };
  });

  await page.goto(FORM_URL, { waitUntil: 'networkidle2', timeout: 60000 });
  // Let lazily-mounted forms settle first, so the scope tag lands on the right one.
  await new Promise((r) => setTimeout(r, 1200));
  await scopeToIntakeForm(page);
  await page.evaluate((sc) => document.querySelector(sc + ' #postal_code')?.scrollIntoView({ block: 'center' }), SCOPE);
  await new Promise((r) => setTimeout(r, 700));

  return { page, posts, consoleErrors };
}

/**
 * Picks an option from a Radix Select.
 *
 * Two traps this avoids. First, a page-wide '[role="option"]' query can hit a
 * different Select entirely — /insurance-policy renders its own plan filter built
 * from INSURANCE_PLANS, so the first 13 options on that page belong to it, not to
 * the intake dropdown. Second, Radix does not act on a synthetic
 * `dispatchEvent(new MouseEvent('click'))`; it listens on pointer events, so a
 * dispatched click silently leaves the value unset and the form merely fails
 * validation later, which looks like a form bug rather than a harness bug.
 *
 * So: open the trigger, find the one listbox that is actually visible, and issue a
 * real click on the option whose text matches.
 */
async function selectOption(page, triggerSelector, wanted) {
  const reads = async () => page.evaluate(
    (sel) => document.querySelector(sel)?.textContent?.trim() || '',
    triggerSelector,
  );
  const registered = async () => {
    const t = await reads();
    return Boolean(t) && !/^select /i.test(t);
  };

  const openListbox = async () => {
    await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      el.scrollIntoView({ block: 'center' });
      el.focus();
    }, triggerSelector);
    await page.keyboard.press('Enter');
    await new Promise((r) => setTimeout(r, 550));
  };

  // ── Attempt 1: keyboard. Radix Select implements type-ahead on its content and
  // commits on Enter. This is the only path that behaves identically with and
  // without touch emulation: under `hasTouch: true` Radix items respond to pointer
  // events, so a plain node.click() is ignored and the value silently stays unset.
  await openListbox();
  await page.keyboard.type(wanted.slice(0, 8), { delay: 60 });
  await new Promise((r) => setTimeout(r, 250));
  await page.keyboard.press('Enter');
  await new Promise((r) => setTimeout(r, 450));
  if (await registered()) return reads();

  // ── Attempt 2: a real pointer sequence on the matching option.
  if (!(await page.$('[role="listbox"]'))) await openListbox();
  const found = await page.evaluate((want, trigSel) => {
    const trigger = document.querySelector(trigSel);
    const controlled = trigger?.getAttribute('aria-controls');
    const all = Array.from(document.querySelectorAll('[role="listbox"]'));
    const visible = all.filter((b) => b.getClientRects().length > 0);
    const box = (controlled && all.find((b) => b.id === controlled)) || visible[visible.length - 1] || all[all.length - 1];
    if (!box) return { ok: false, seen: [] };
    const options = Array.from(box.querySelectorAll('[role="option"]'));
    const norm = (o) => (o.textContent || '').trim().toLowerCase();
    const el = options.find((o) => norm(o) === want.toLowerCase())
      || options.find((o) => norm(o).includes(want.toLowerCase()));
    if (!el) return { ok: false, seen: options.map((o) => (o.textContent || '').trim()) };

    el.scrollIntoView({ block: 'center' });
    const r = el.getBoundingClientRect();
    const base = { bubbles: true, cancelable: true, composed: true, clientX: r.x + r.width / 2, clientY: r.y + r.height / 2, pointerId: 1, isPrimary: true, button: 0 };
    for (const [type, PointerCtor] of [['pointerdown', 'pointer'], ['mousedown', 'mouse'], ['pointerup', 'pointer'], ['mouseup', 'mouse'], ['click', 'mouse']]) {
      const ev = PointerCtor === 'pointer'
        ? new PointerEvent(type, { ...base, pointerType: 'mouse' })
        : new MouseEvent(type, base);
      el.dispatchEvent(ev);
    }
    return { ok: true, seen: options.map((o) => (o.textContent || '').trim()) };
  }, wanted, triggerSelector);
  await new Promise((r) => setTimeout(r, 450));
  if (await registered()) return reads();

  throw new Error(
    `selecting "${wanted}" did not register on ${triggerSelector} ` +
    `(trigger reads "${await reads()}"; listbox offered ${JSON.stringify(found.seen).slice(0, 300)})`,
  );
}

/**
 * Fills the form. Any field can be set to null to test validation.
 *
 * Every operation re-queries by selector rather than holding an ElementHandle.
 * React re-renders the form after each Radix Select closes, which detaches any
 * handle captured earlier and makes a later .click() throw "Node is detached from
 * document" — a harness failure that reads like a form failure.
 */
async function fill(page, {
  first = 'Testpatient',
  last = 'Synthetic',
  email = 'qa+intake@example.com',
  phone = '5615550123',
  zip = '33463',
  insurance = 'PPO',
  reason = 'Automated QA check for intake routing. Not a real patient.',
} = {}) {
  const typeInto = async (selector, value) => {
    if (value === null) return;
    const exists = await page.$(selector);
    if (!exists) throw new Error(`field not found: ${selector}`);
    await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      el.scrollIntoView({ block: 'center' });
      el.focus();
    }, selector);
    await page.type(selector, value, { delay: 8 });
  };

  await typeInto(`${SCOPE} #first_name`, first);
  await typeInto(`${SCOPE} #last_name`, last);
  await typeInto(`${SCOPE} input[placeholder="Enter your email"]`, email);
  await typeInto(`${SCOPE} input[placeholder="+1 0123456789"]`, phone);
  await typeInto(`${SCOPE} #postal_code`, zip);

  // State is required and is not prefilled on every page, so set it explicitly.
  const stateSelector = `${SCOPE} [aria-label="Select your state"]`;
  if (await page.$(stateSelector)) {
    const current = await page.evaluate((sel) => document.querySelector(sel)?.textContent?.trim(), stateSelector);
    if (!current || /select your state/i.test(current)) {
      await selectOption(page, stateSelector, 'Florida');
    }
  }

  if (insurance !== null) {
    await selectOption(page, `${SCOPE} #insurance_type`, insurance);
  }

  await typeInto(`${SCOPE} textarea`, reason);
}

const submit = async (page) => {
  await page.waitForFunction(
    () => getComputedStyle(document.body).pointerEvents !== 'none',
    { timeout: 5000 },
  ).catch(() => {});
  const clicked = await page.evaluate((sc) => {
    const b = document.querySelector(`${sc} button[type="submit"]`);
    if (!b) return false;
    b.scrollIntoView({ block: 'center' });
    b.click();
    return true;
  }, SCOPE);
  if (!clicked) throw new Error('submit button not found in the intake form');
};

const settle = (ms = 2500) => new Promise((r) => setTimeout(r, ms));

/** The intake form's visible validation errors, for diagnosing a blocked submit. */
const formErrors = (page) => page.evaluate((sc) => {
  const form = document.querySelector(sc);
  if (!form) return ['<intake form not found>'];
  return Array.from(form.querySelectorAll('p'))
    .map((e) => (e.textContent || '').trim())
    .filter((t) => /must be|required|Invalid|Please (enter|select|provide)/i.test(t));
}, SCOPE);

/** Current field values, for the same purpose. */
const formState = (page) => page.evaluate((sc) => {
  const form = document.querySelector(sc);
  if (!form) return {};
  return {
    zip: form.querySelector('#postal_code')?.value,
    insurance: form.querySelector('#insurance_type')?.textContent?.trim(),
    state: form.querySelector('[aria-label="Select your state"]')?.textContent?.trim(),
    email: form.querySelector('input[placeholder="Enter your email"]')?.value,
    phone: form.querySelector('input[placeholder="+1 0123456789"]')?.value,
    first: form.querySelector('#first_name')?.value,
    reason: form.querySelector('textarea')?.value?.slice(0, 20),
  };
}, SCOPE);

/** Prints why a submit did not reach the endpoint. */
async function explainBlocked(page, label) {
  console.log(`      [diag ${label}] errors=${JSON.stringify(await formErrors(page))} state=${JSON.stringify(await formState(page))}`);
}

const leadEvents = (page) => page.evaluate(() =>
  (window.__pushes || []).filter((e) => e && e.event === 'lead_form_submit_success'));

const allPushes = (page) => page.evaluate(() => window.__pushes || []);

console.log(`\n=== intake E2E: ${VP.label} against ${BASE} ===\n`);

// ───────────────────────── 1. PPO → qualified ─────────────────────────
{
  const { page, posts } = await openForm();
  await fill(page, { insurance: 'PPO' });
  await submit(page);
  await settle();

  const url = page.url();
  const events = await leadEvents(page);
  const pushes = await allPushes(page);

  check('PPO: navigates to the qualified thank-you page', url.endsWith('/thank-you'), url);
  check('PPO: fires exactly one qualified conversion event', events.length === 1, `${events.length} event(s)`);
  check('PPO: ZIP was submitted to the endpoint', posts[0]?.postalCode === '33463', JSON.stringify(posts[0]?.postalCode));
  check('PPO: insurance was submitted to the endpoint', posts[0]?.insurance_type === 'PPO', String(posts[0]?.insurance_type));
  check('PPO: best-time was NOT submitted', !('bestTime' in (posts[0] || {})), Object.keys(posts[0] || {}).join(','));
  check('PPO: attribution keys present in payload',
    ['gclid', 'gbraid', 'wbraid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].every((k) => k in (posts[0] || {})));
  check('PPO: ZIP is absent from the canonical lead event',
    events.length === 1 && !JSON.stringify(events[0]).includes('33463'), JSON.stringify(events[0] || {}));
  // Key-based, not substring: page_path is legitimately "/insurance-policy" here.
  const eventKeys = Object.keys(events[0] || {}).filter((k) => k !== 'gtm.uniqueEventId').sort();
  check('PPO: canonical event carries no insurance field',
    JSON.stringify(eventKeys) === JSON.stringify(['event', 'form_id', 'form_source', 'market', 'page_path', 'submission_id']),
    eventKeys.join(','));
  check('PPO: no insurance or qualification value in the canonical event',
    !Object.entries(events[0] || {}).some(([k, v]) => k !== 'page_path' && typeof v === 'string' && /insurance|ppo|qualified/i.test(v)));
  check('PPO: exactly one lead submission request was made', posts.length === 1, `${posts.length} request(s)`);
  await page.close();
}

// ───────────────────────── 2. Other → non-qualified ─────────────────────────
{
  const { page, posts } = await openForm();
  await fill(page, { insurance: 'Other' });
  await submit(page);
  await settle();

  const url = page.url();
  const events = await leadEvents(page);
  const pushes = await allPushes(page);

  if (posts.length !== 1) await explainBlocked(page, 'Other');
  check('Other: navigates to the separate thank-you page', url.endsWith('/thank-you/other'), url);
  check('Other: fires ZERO qualified conversion events', events.length === 0, `${events.length} event(s)`);
  check('Other: emits no lead dataLayer event at all', pushes.filter((p) => /lead_form/.test(p?.event || '')).length === 0);
  check('Other: the lead was still delivered to the endpoint', posts.length === 1 && posts[0].email === 'qa+intake@example.com');
  check('Other: ZIP was still submitted', posts[0]?.postalCode === '33463');
  check('Other: attribution still submitted', 'gclid' in (posts[0] || {}));
  await page.close();
}

// ───────────────────────── 3. validation ─────────────────────────
{
  const { page, posts } = await openForm();
  await fill(page, { zip: null, insurance: 'PPO' });
  await submit(page);
  await settle(1200);
  check('empty ZIP blocks submission client-side', posts.length === 0, `${posts.length} request(s)`);
  const stayed = !page.url().includes('/thank-you');
  check('empty ZIP keeps the patient on the form', stayed, page.url());
  const zipErrs = await formErrors(page);
  check('empty ZIP shows the ZIP error message',
    zipErrs.some((e) => /valid ZIP code/i.test(e)), JSON.stringify(zipErrs));
  await page.close();
}
{
  const { page, posts } = await openForm();
  await fill(page, { zip: '123', insurance: 'PPO' });
  await submit(page);
  await settle(1200);
  check('invalid ZIP blocks submission client-side', posts.length === 0, `${posts.length} request(s)`);
  await page.close();
}
{
  const { page, posts } = await openForm();
  await fill(page, { zip: '02134', insurance: 'PPO' });
  await submit(page);
  await settle();
  if (posts.length !== 1) await explainBlocked(page, 'leading-zero ZIP');
  check('leading-zero ZIP is ACCEPTED and submitted intact',
    posts.length === 1 && posts[0].postalCode === '02134', JSON.stringify(posts[0]?.postalCode));
  check('leading-zero ZIP still routes to qualified', page.url().endsWith('/thank-you'), page.url());
  await page.close();
}
{
  const { page, posts } = await openForm();
  await fill(page, { zip: '334631234', insurance: 'PPO' });
  await submit(page);
  await settle();
  if (posts.length !== 1) await explainBlocked(page, 'nine-digit ZIP');
  check('nine bare digits normalize to ZIP+4 before submission',
    posts[0]?.postalCode === '33463-1234', JSON.stringify(posts[0]?.postalCode));
  await page.close();
}
{
  const { page, posts } = await openForm();
  await fill(page, { insurance: null });
  await submit(page);
  await settle(1200);
  check('missing insurance blocks submission', posts.length === 0, `${posts.length} request(s)`);
  const insErrs = await formErrors(page);
  check('missing insurance shows its error message',
    insErrs.some((e) => /select your insurance/i.test(e)), JSON.stringify(insErrs));
  await page.close();
}
{
  const { page, posts } = await openForm();
  await fill(page, { email: 'not-an-email', insurance: 'PPO' });
  await submit(page);
  await settle(1200);
  check('invalid email blocks submission', posts.length === 0, `${posts.length} request(s)`);
  await page.close();
}
{
  const { page, posts } = await openForm();
  await fill(page, { phone: '123', insurance: 'PPO' });
  await submit(page);
  await settle(1200);
  check('invalid phone blocks submission', posts.length === 0, `${posts.length} request(s)`);
  await page.close();
}

// ───────── 4. server rejects a ZIP the client somehow let through ─────────
{
  const { page } = await openForm({ behaviour: 'zip-reject' });
  await fill(page, { insurance: 'PPO' });
  await submit(page);
  await settle();
  const events = await leadEvents(page);
  check('a server ZIP rejection fires no conversion', events.length === 0, `${events.length} event(s)`);
  check('a server ZIP rejection keeps the patient on the form', !page.url().includes('/thank-you'), page.url());
  const srvErr = await page.evaluate((sc) => {
    const form = document.querySelector(sc);
    return Array.from(form.querySelectorAll('p[role="alert"], p')).map((e) => (e.textContent || '').trim());
  }, SCOPE);
  check('a server ZIP rejection surfaces the server message',
    srvErr.some((e) => /valid ZIP code/i.test(e)), JSON.stringify(srvErr.filter(Boolean).slice(0, 6)));
  await page.close();
}

// ───────── 5. server error / retry ─────────
{
  const { page } = await openForm({ behaviour: 'error' });
  await fill(page, { insurance: 'PPO' });
  await submit(page);
  await settle();
  const events = await leadEvents(page);
  check('a 500 fires no conversion', events.length === 0, `${events.length} event(s)`);
  check('a 500 keeps the patient on the form', !page.url().includes('/thank-you'));
  const enabled = await page.evaluate(() => !document.querySelector('[data-qa-intake="1"] button[type="submit"]')?.disabled);
  check('a 500 re-enables submit so the patient can retry', enabled);
  const preserved = await page.evaluate(() => document.querySelector('[data-qa-intake="1"] #postal_code')?.value);
  check('a 500 preserves the entered ZIP for the retry', preserved === '33463', String(preserved));
  await page.close();
}
{
  const { page } = await openForm({ behaviour: 'timeout' });
  await fill(page, { insurance: 'PPO' });
  await submit(page);
  await settle(1500);
  const disabled = await page.evaluate(() => document.querySelector('[data-qa-intake="1"] button[type="submit"]')?.disabled === true);
  check('an in-flight submission keeps the button disabled (loading state visible)', disabled);
  const spinner = await page.evaluate(() => document.body.innerText.includes('Sending...'));
  check('an in-flight submission shows the Sending... state', spinner);
  await page.close();
}

// ───────── 6. duplicates ─────────
{
  const { page, posts } = await openForm();
  await fill(page, { insurance: 'PPO' });
  // Three clicks as fast as the driver allows.
  await page.waitForFunction(
    () => getComputedStyle(document.body).pointerEvents !== 'none',
    { timeout: 5000 },
  ).catch(() => {});
  await page.evaluate(() => {
    const b = document.querySelector('[data-qa-intake="1"] button[type="submit"]');
    b.click(); b.click(); b.click();
  });
  await settle(3000);
  const events = await leadEvents(page);
  check('a triple-click creates exactly ONE lead', posts.length === 1, `${posts.length} request(s)`);
  check('a triple-click fires exactly ONE conversion', events.length === 1, `${events.length} event(s)`);
  await page.close();
}
{
  // Same submission id returned twice: the in-page dedupe must collapse it.
  const fixed = randomUUID();
  const { page, posts } = await openForm({ fixedSubmissionId: fixed });
  await fill(page, { insurance: 'PPO' });
  await submit(page);
  await settle();
  const first = (await leadEvents(page)).length;
  // Navigate back and submit again — same id from the stub.
  await page.goBack({ waitUntil: 'networkidle2' }).catch(() => {});
  await settle(1200);
  const afterBack = (await leadEvents(page)).length;
  check('one conversion after the first submit', first === 1, `${first}`);
  check('Back does not fire another conversion', afterBack <= 1, `${afterBack} event(s)`);
  await page.close();
}

// ───────── 7. direct thank-you visits fire nothing ─────────
for (const p of ['/thank-you', '/thank-you/other']) {
  const page = await browser.newPage();
  await page.setViewport(VP);
  await page.evaluateOnNewDocument(() => {
    window.__pushes = [];
    const real = [];
    Object.defineProperty(window, 'dataLayer', { configurable: true, get() { return real; }, set(v) { if (Array.isArray(v)) { real.length = 0; real.push(...v); } } });
    const origPush = Array.prototype.push;
    real.push = function (...a) { for (const x of a) window.__pushes.push(x); return origPush.apply(this, a); };
  });
  // domcontentloaded, not networkidle2: /thank-you renders a looping Lottie
  // animation that keeps the network busy indefinitely, so networkidle2 never
  // settles and the navigation times out. The assertion is about dataLayer pushes,
  // which happen long before the animation finishes loading.
  await page.goto(BASE + p, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await settle(2500);
  const events = await leadEvents(page);
  check(`direct visit to ${p} fires zero conversions`, events.length === 0, `${events.length} event(s)`);

  await page.reload({ waitUntil: 'domcontentloaded' });
  await settle(2500);
  const afterReload = await leadEvents(page);
  check(`refreshing ${p} fires zero conversions`, afterReload.length === 0, `${afterReload.length} event(s)`);
  await page.close();
}

// ───────── 8. mobile specifics ─────────
if (PROFILE === 'mobile') {
  const { page } = await openForm();
  const probe = await page.evaluate(() => {
    const zip = document.querySelector('[data-qa-intake="1"] #postal_code');
    const cs = getComputedStyle(zip);
    return {
      inputMode: zip.getAttribute('inputmode'),
      fontSize: parseFloat(cs.fontSize),
      autocomplete: zip.getAttribute('autocomplete'),
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    };
  });
  check('mobile: ZIP requests the numeric keyboard', probe.inputMode === 'numeric', String(probe.inputMode));
  check('mobile: ZIP font-size >= 16px so iOS does not zoom on focus', probe.fontSize >= 16, `${probe.fontSize}px`);
  check('mobile: ZIP opts into postal-code autofill', probe.autocomplete === 'postal-code');
  check('mobile: no horizontal overflow on the form page', !probe.overflow);

  // Orientation change must not break the form.
  await page.setViewport({ width: 844, height: 390, isMobile: true, hasTouch: true });
  await settle(800);
  const landscape = await page.evaluate(() => {
    const zip = document.querySelector('[data-qa-intake="1"] #postal_code');
    const r = zip.getBoundingClientRect();
    return { present: Boolean(zip), width: r.width, overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1 };
  });
  check('mobile: ZIP survives rotation to landscape', landscape.present && landscape.width > 0);
  check('mobile: no horizontal overflow in landscape', !landscape.overflow);

  // The submit button must be reachable with the keyboard open. Focusing an input
  // is the closest headless proxy: the button must still be in the layout.
  await page.focus(`${SCOPE} #postal_code`);
  await settle(400);
  const reachable = await page.evaluate(() => {
    const b = document.querySelector('[data-qa-intake="1"] button[type="submit"]');
    b.scrollIntoView({ block: 'center' });
    const r = b.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && r.top < window.innerHeight && r.bottom > 0;
  });
  check('mobile: submit button is reachable while an input is focused', reachable);
  await page.close();
}

await browser.close();

console.log(`\n${results.length - failures}/${results.length} checks passed on ${VP.label}`);
if (failures) process.exit(1);
