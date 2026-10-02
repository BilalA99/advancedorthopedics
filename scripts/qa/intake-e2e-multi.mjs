/**
 * PPO / Other end-to-end flows for the intake forms beyond ConsultationForm.
 *
 * Covers the two surfaces the advertising spend actually lands on — the main
 * booking page and the paid landing pages — plus the state hero form. As in
 * intake-e2e-flows.mjs the endpoint is intercepted, so no real lead rows and no
 * emails to the clinic are produced; the stub mirrors what the real handler
 * returns, and the real handler's own logic is covered by the unit tests and by
 * intake-server-contract.mjs.
 *
 * Usage: node scripts/tmp/intake-e2e-multi.mjs <baseUrl> [desktop|mobile]
 */
import puppeteer from 'puppeteer';
import { randomUUID } from 'node:crypto';

const BASE = process.argv[2] || 'http://localhost:3000';
const PROFILE = process.argv[3] || 'desktop';
const VP = PROFILE === 'mobile'
  ? { width: 390, height: 844, isMobile: true, hasTouch: true, label: 'mobile 390x844' }
  : { width: 1440, height: 900, isMobile: false, hasTouch: false, label: 'desktop 1440x900' };

/**
 * `kind` is how the insurance control is driven:
 *   'radix'  — shadcn/Radix Select, keyboard-driven (type-ahead + Enter)
 *   'native' — a real <select>, driven with page.select()
 */
const TARGETS = [
  {
    name: 'DoctorContactForm @ /find-care/book-an-appointment (main booking page)',
    url: '/find-care/book-an-appointment',
    endpoint: '/api/forms/doctor',
    insuranceId: 'doctor_insurance_type',
    kind: 'radix',
    // The full form lives in a Radix Dialog opened by the page's "Book an
    // Appointment" CTA. The CTA sits below the fold, and scrollIntoView() from
    // inside page.evaluate does not reliably bring it into the viewport here, so
    // a coordinate click lands on nothing. An in-page .click() on the element
    // carrying the onClick is what actually opens it.
    prepare: 'open-booking-dialog',
  },
  {
    name: 'BodyPartHeroForm @ /lp/adult-scoliosis-treatment (PAID landing page)',
    url: '/lp/adult-scoliosis-treatment',
    endpoint: '/api/forms/doctor',
    insuranceId: 'bodypart_insurance_type',
    kind: 'native',
    // The full form lives in a dialog opened by the landing page's CTA.
    prepare: 'open-evaluation-dialog',
  },
  {
    name: 'StateHeroForm @ /locations/florida',
    url: '/locations/florida',
    endpoint: '/api/forms/consultation',
    insuranceId: 'statehero_insurance_type',
    kind: 'radix',
    // Progressive: ZIP and insurance render only after the first phase is filled
    // and its CTA clicked.
    prepare: 'expand-state-hero',
    // The state hero is a DESKTOP surface: at 390px its first-phase fields are not
    // rendered at all (verified — `hero_first_name` has no client rects on mobile
    // and does on desktop), so mobile visitors reach this page through a different
    // component. Nothing to drive here on mobile.
    desktopOnly: true,
  },
];

let failures = 0;
const check = (name, passed, detail = '') => {
  if (!passed) failures++;
  console.log(`  ${passed ? 'ok  ' : 'FAIL'} ${name}${detail ? ' — ' + detail : ''}`);
};

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });

async function openPage(target) {
  const page = await browser.newPage();
  await page.setViewport(VP);
  const posts = [];

  await page.setRequestInterception(true);
  page.on('request', async (req) => {
    if (!req.url().includes(target.endpoint)) {
      try { await req.continue(); } catch {}
      return;
    }
    let body = {};
    const raw = req.postData() || '';
    try {
      body = JSON.parse(raw);
    } catch {
      // multipart/form-data: pull the fields we assert on out of the raw body.
      const field = (name) => {
        const m = new RegExp(`name="${name}"\\r?\\n\\r?\\n([^\\r\\n]*)`).exec(raw);
        return m ? m[1] : undefined;
      };
      body = {
        insurance_type: field('insurance_type'),
        postalCode: field('postalCode'),
        bestTime: field('bestTime'),
        gclid: field('gclid'),
        email: field('email'),
      };
    }
    posts.push(body);

    const insurance = String(body.insurance_type || '').trim().toLowerCase();
    const qualification = insurance === 'ppo' ? 'qualified' : 'unqualified';
    return req.respond({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        ok: true,
        submissionId: randomUUID(),
        qualification,
        destination: qualification === 'qualified' ? 'qualified_thank_you' : 'other_thank_you',
      }),
    });
  });

  await page.evaluateOnNewDocument(() => {
    window.__pushes = [];
    const real = [];
    Object.defineProperty(window, 'dataLayer', {
      configurable: true,
      get() { return real; },
      set(v) { if (Array.isArray(v)) { real.length = 0; real.push(...v); } },
    });
    const origPush = Array.prototype.push;
    real.push = function (...a) { for (const x of a) window.__pushes.push(x); return origPush.apply(this, a); };
  });

  await page.goto(BASE + target.url, { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1500));

  if (target.prepare === 'open-booking-dialog') {
    const opened = await page.evaluate(() => {
      const form = document.getElementById('doctor_insurance_type')?.closest('form');
      if (!form) return false;
      const cta = Array.from(form.querySelectorAll('div'))
        .find((d) => /w-full self-center flex items-center justify-center/.test(d.className || ''));
      if (!cta) return false;
      cta.click();
      return true;
    });
    if (!opened) throw new Error('could not find the booking CTA on ' + target.url);
    await new Promise((r) => setTimeout(r, 1800));
  }

  if (target.prepare === 'open-evaluation-dialog') {
    // Desktop: a [data-open-evaluation] CTA beside the hero opens the dialog directly.
    await page.evaluate(() => {
      const t = document.querySelector('[data-open-evaluation]');
      if (t) t.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    await new Promise((r) => setTimeout(r, 1500));

    // Mobile: that CTA is not rendered. The route in is the compact hero form —
    // fill name and phone, submit it, and its handler opens the same dialog.
    if (!(await page.$(`#${target.insuranceId}`))) {
      await page.evaluate(() => {
        const setVal = (el, v) => {
          Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set.call(el, v);
          el.dispatchEvent(new Event('input', { bubbles: true }));
        };
        const compact = Array.from(document.querySelectorAll('form'))
          .find((f) => f.querySelector('input[name="website"]'));
        if (!compact) return;
        for (const el of compact.querySelectorAll('input:not([type=hidden])')) {
          const d = `${el.name || ''} ${el.placeholder || ''}`.toLowerCase();
          if (/website/.test(d)) continue;            // honeypot: must stay empty
          if (/first|name/.test(d)) setVal(el, 'Testpatient');
          else if (/phone|tel/.test(d)) setVal(el, '5615550123');
        }
        const btn = Array.from(compact.querySelectorAll('button'))
          .find((b) => /get relief now|continue|next/i.test(b.innerText || ''))
          || compact.querySelector('button');
        if (btn) btn.click();
      });
      await new Promise((r) => setTimeout(r, 1800));
    }
  }

  if (target.prepare === 'expand-state-hero') {
    await page.evaluate(() => {
      const set = (id, value) => {
        const el = document.getElementById(id);
        if (!el) return;
        const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        setter.call(el, value);
        el.dispatchEvent(new Event('input', { bubbles: true }));
      };
      set('hero_first_name', 'Testpatient');
      set('hero_last_name', 'Synthetic');
      set('hero_phone', '5615550123');
      set('hero_email', 'qa+intake@example.com');
    });
    await new Promise((r) => setTimeout(r, 500));
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button'))
        .find((b) => /get free consultation/i.test(b.innerText || ''));
      if (btn) btn.click();
    });
    await new Promise((r) => setTimeout(r, 1500));
  }

  return { page, posts };
}

/**
 * The id of the insurance control the user can actually interact with.
 *
 * DoctorContactForm renders the same RHF field twice — once in the visible
 * preview form and once inside the booking Dialog — so two controls share the
 * field. Once the Dialog is open, Radix makes everything behind it inert, and
 * driving the preview copy silently does nothing: the listbox never opens and it
 * reads as a broken dropdown rather than a harness pointing at the wrong element.
 */
async function resolveInsuranceId(page, target) {
  return page.evaluate((id) => {
    const prefix = id.split('_')[0];
    const all = Array.from(document.querySelectorAll(
      '[id^="' + prefix + '"][id$="_insurance_type"], #' + id,
    ));
    // Prefer one inside an open dialog, then any visible one, then the named one.
    const inDialog = all.find((e) => e.closest('[role="dialog"]') && e.getClientRects().length > 0);
    const visible = all.find((e) => e.getClientRects().length > 0);
    return (inDialog || visible || document.getElementById(id) || {}).id || id;
  }, target.insuranceId);
}

/** Scopes to the form containing this target's insurance control. */
async function scope(page, target) {
  const resolvedId = await resolveInsuranceId(page, target);
  const ok = await page.evaluate((id) => {
    const el = document.getElementById(id);
    const form = el?.closest('form');
    if (!form) return false;
    document.querySelectorAll('[data-qa-target]').forEach((f) => f.removeAttribute('data-qa-target'));
    form.setAttribute('data-qa-target', '1');
    return true;
  }, resolvedId);
  if (!ok) throw new Error(`insurance control #${resolvedId} not found on ${target.url}`);
  return '[data-qa-target="1"]';
}

/**
 * Picks a value from any Radix Select addressed by CSS selector.
 *
 * Keyboard type-ahead first, because it behaves identically with and without
 * touch emulation; a real pointer sequence as fallback, because Radix items
 * listen on pointer events and ignore a plain element.click() under touch.
 */
async function selectRadixBySelector(page, selector, wanted) {
  const reads = () => page.evaluate((s) => document.querySelector(s)?.textContent?.trim() || '', selector);
  const done = async () => { const t = await reads(); return Boolean(t) && !/^select /i.test(t); };

  await page.evaluate((s) => { const e = document.querySelector(s); e.scrollIntoView({ block: 'center' }); e.focus(); }, selector);
  await page.keyboard.press('Enter');
  await new Promise((r) => setTimeout(r, 550));
  await page.keyboard.type(wanted.slice(0, 8), { delay: 60 });
  await new Promise((r) => setTimeout(r, 250));
  await page.keyboard.press('Enter');
  await new Promise((r) => setTimeout(r, 450));
  if (await done()) return reads();

  const seen = await page.evaluate((s, want) => {
    const trigger = document.querySelector(s);
    const controlled = trigger?.getAttribute('aria-controls');
    const all = Array.from(document.querySelectorAll('[role="listbox"]'));
    const visible = all.filter((b) => b.getClientRects().length > 0);
    const box = (controlled && all.find((b) => b.id === controlled)) || visible[visible.length - 1] || all[all.length - 1];
    if (!box) return [];
    const options = Array.from(box.querySelectorAll('[role="option"]'));
    const norm = (o) => (o.textContent || '').trim().toLowerCase();
    const el = options.find((o) => norm(o) === want.toLowerCase())
      || options.find((o) => norm(o).indexOf(want.toLowerCase()) === 0)
      || options.find((o) => norm(o).includes(want.toLowerCase()));
    if (!el) return options.map((o) => (o.textContent || '').trim());
    el.scrollIntoView({ block: 'center' });
    const r = el.getBoundingClientRect();
    const base = { bubbles: true, cancelable: true, composed: true, clientX: r.x + r.width / 2, clientY: r.y + r.height / 2, pointerId: 1, isPrimary: true, button: 0 };
    el.dispatchEvent(new PointerEvent('pointerdown', { ...base, pointerType: 'mouse' }));
    el.dispatchEvent(new MouseEvent('mousedown', base));
    el.dispatchEvent(new PointerEvent('pointerup', { ...base, pointerType: 'mouse' }));
    el.dispatchEvent(new MouseEvent('mouseup', base));
    el.dispatchEvent(new MouseEvent('click', base));
    return null;
  }, selector, wanted);
  await new Promise((r) => setTimeout(r, 450));
  if (await done()) return reads();

  throw new Error(`"${wanted}" did not register on ${selector} (reads "${await reads()}"; offered ${JSON.stringify(seen || []).slice(0, 220)})`);
}

async function setInsurance(page, target, sc, wanted) {
  const insuranceId = await resolveInsuranceId(page, target);
  target = Object.assign({}, target, { insuranceId: insuranceId });

  if (target.kind === 'native') {
    const value = await page.evaluate((id, want) => {
      const sel = document.getElementById(id);
      const opt = Array.from(sel.options).find((o) => o.textContent.trim().toLowerCase().includes(want.toLowerCase()));
      return opt ? opt.value : null;
    }, target.insuranceId, wanted);
    if (!value) throw new Error(`no option matching "${wanted}"`);
    await page.select(`#${target.insuranceId}`, value);
    return value;
  }

  // Radix: keyboard type-ahead, which behaves the same with and without touch.
  await page.evaluate((id) => {
    const el = document.getElementById(id);
    el.scrollIntoView({ block: 'center' });
    el.focus();
  }, target.insuranceId);
  await page.keyboard.press('Enter');
  await new Promise((r) => setTimeout(r, 550));
  await page.keyboard.type(wanted.slice(0, 8), { delay: 60 });
  await new Promise((r) => setTimeout(r, 250));
  await page.keyboard.press('Enter');
  await new Promise((r) => setTimeout(r, 450));
  let shown = await page.evaluate((id) => document.getElementById(id)?.textContent?.trim(), target.insuranceId);
  if (shown && !/^select /i.test(shown)) return shown;

  // Fallback: a real pointer sequence on the matching option. Radix items listen on
  // pointer events, so under touch emulation a plain click() is ignored and the
  // value silently stays unset — which then reads as a broken form rather than a
  // broken harness.
  const seen = await page.evaluate((want, id) => {
    const trigger = document.getElementById(id);
    const controlled = trigger?.getAttribute('aria-controls');
    const all = Array.from(document.querySelectorAll('[role="listbox"]'));
    const visible = all.filter((b) => b.getClientRects().length > 0);
    const box = (controlled && all.find((b) => b.id === controlled)) || visible[visible.length - 1] || all[all.length - 1];
    if (!box) return [];
    const options = Array.from(box.querySelectorAll('[role="option"]'));
    const norm = (o) => (o.textContent || '').trim().toLowerCase();
    const el = options.find((o) => norm(o) === want.toLowerCase())
      || options.find((o) => norm(o).includes(want.toLowerCase()));
    if (!el) return options.map((o) => (o.textContent || '').trim());
    el.scrollIntoView({ block: 'center' });
    const r = el.getBoundingClientRect();
    const base = { bubbles: true, cancelable: true, composed: true, clientX: r.x + r.width / 2, clientY: r.y + r.height / 2, pointerId: 1, isPrimary: true, button: 0 };
    el.dispatchEvent(new PointerEvent('pointerdown', { ...base, pointerType: 'mouse' }));
    el.dispatchEvent(new MouseEvent('mousedown', base));
    el.dispatchEvent(new PointerEvent('pointerup', { ...base, pointerType: 'mouse' }));
    el.dispatchEvent(new MouseEvent('mouseup', base));
    el.dispatchEvent(new MouseEvent('click', base));
    return null;
  }, wanted, target.insuranceId);
  await new Promise((r) => setTimeout(r, 450));

  shown = await page.evaluate((id) => document.getElementById(id)?.textContent?.trim(), target.insuranceId);
  if (!shown || /^select /i.test(shown)) {
    throw new Error(`insurance "${wanted}" did not register (reads "${shown}"; options ${JSON.stringify(seen || []).slice(0, 200)})`);
  }
  return shown;
}

/**
 * Fills every empty field in the scoped form, inferring what each one wants.
 *
 * Generic on purpose: these forms disagree about how they identify their inputs —
 * ids (`first_name`), names (`firstName`), or placeholders alone
 * (`"First Name"`, `"example@email.com"`, `"e.g., 33463"`) — and a selector list
 * that misses one leaves the field empty, which surfaces as a validation error
 * that looks like a product bug.
 */
async function fillCommon(page, sc, insuranceId) {
  await page.evaluate((scope, insId) => {
    const form = document.querySelector(scope);
    const setValue = (el, value) => {
      const proto = el instanceof window.HTMLTextAreaElement
        ? window.HTMLTextAreaElement.prototype
        : window.HTMLInputElement.prototype;
      Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, value);
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    };

    const describe = (el) =>
      `${el.id} ${el.getAttribute('name') || ''} ${el.placeholder || ''} ${el.getAttribute('aria-label') || ''} ${el.type}`.toLowerCase();

    for (const el of form.querySelectorAll('input:not([type=hidden]):not([type=file]), textarea')) {
      if (el.value) continue;
      const d = describe(el);
      if (/first/.test(d)) setValue(el, 'Testpatient');
      else if (/last/.test(d)) setValue(el, 'Synthetic');
      else if (/mail/.test(d)) setValue(el, 'qa+intake@example.com');
      else if (/phone|tel|\d{3}\) ?\d{3}/.test(d)) setValue(el, '5615550123');
      else if (/zip|postal|33463/.test(d)) setValue(el, '33463');
      else if (el instanceof window.HTMLTextAreaElement) {
        setValue(el, 'Automated QA check for intake routing. Not a real patient.');
      } else if (/name/.test(d)) setValue(el, 'Testpatient Synthetic');
    }

    // Native selects other than the insurance one — state, mostly.
    for (const sel of form.querySelectorAll('select')) {
      if (sel.id === insId) continue;
      if (sel.value) continue;
      const opt = Array.from(sel.options).find((o) => /florida/i.test(o.textContent))
        || Array.from(sel.options).find((o) => o.value);
      if (opt) {
        Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype, 'value')
          .set.call(sel, opt.value);
        sel.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  }, sc, insuranceId);

  // Radix state select, if this form uses one. The aria-label is not consistent
  // across components — ConsultationForm says "Select your state",
  // DoctorContactForm says "Select state" — so accept either.
  const stateSel = (await page.$(`${sc} [aria-label="Select your state"]`))
    ? `${sc} [aria-label="Select your state"]`
    : `${sc} [aria-label="Select state"]`;
  if (await page.$(stateSel)) {
    const cur = await page.evaluate((s) => document.querySelector(s)?.textContent?.trim(), stateSel);
    // Matches "Select state" AND "Select your state": the placeholder wording is
    // not consistent across components, and a guard that only knew one of them
    // skipped setting state entirely on the other.
    if (!cur || /^select /i.test(cur)) {
      await selectRadixBySelector(page, stateSel, 'Florida');
    }
  }
  await new Promise((r) => setTimeout(r, 300));
}

async function submitForm(page, sc) {
  await page.waitForFunction(() => getComputedStyle(document.body).pointerEvents !== 'none', { timeout: 5000 }).catch(() => {});
  const clicked = await page.evaluate((s) => {
    const form = document.querySelector(s);
    // A <button> inside a form defaults to type="submit" in HTML, but the CSS
    // attribute selector only matches when the attribute is actually written —
    // and DoctorContactForm's submit button omits it. Falling back to the FIRST
    // button picks a Radix SelectTrigger (role="combobox"), which opens a dropdown
    // instead of submitting and looks exactly like a dead form.
    const candidates = Array.from(form.querySelectorAll('button'))
      .filter((b) => b.getAttribute('role') !== 'combobox' && !b.closest('[role="listbox"]'));
    const b = form.querySelector('button[type="submit"]') || candidates[candidates.length - 1];
    if (!b) return false;
    b.scrollIntoView({ block: 'center' });
    b.click();
    return true;
  }, sc);
  if (!clicked) throw new Error('no submit button found in the scoped form');
}

const leadEvents = (page) => page.evaluate(() => (window.__pushes || []).filter((e) => e && e.event === 'lead_form_submit_success'));

console.log(`\n=== additional intake surfaces: ${VP.label} ===`);

for (const target of TARGETS) {
  console.log(`\n### ${target.name}`);

  if (target.desktopOnly && PROFILE === 'mobile') {
    console.log('  SKIP desktop-only surface (its fields are not rendered at mobile widths)');
    continue;
  }

  for (const [choice, wantQualified] of [['PPO (any', true], ['Other /', false]]) {
    let page;
    try {
      const opened = await openPage(target);
      page = opened.page;
      const posts = opened.posts;
      const sc = await scope(page, target);

      await fillCommon(page, sc, target.insuranceId);
      await setInsurance(page, target, sc, choice);
      await submitForm(page, sc);
      await new Promise((r) => setTimeout(r, 3000));

      const events = await leadEvents(page);
      const url = page.url();
      const label = wantQualified ? 'PPO' : 'Other';

      if (posts.length !== 1) {
        const diag = await page.evaluate((sc) => {
          const form = document.querySelector(sc);
          return {
            errors: Array.from(form.querySelectorAll('p,span'))
              .map((e) => (e.textContent || '').trim())
              .filter((t) => /must be|required|Invalid|Please (enter|select|provide|fill)/i.test(t))
              .slice(0, 8),
            empty: Array.from(form.querySelectorAll('input:not([type=hidden]),textarea'))
              .filter((e) => !e.value)
              .map((e) => e.id || e.name || e.placeholder || e.type)
              .slice(0, 10),
          };
        }, sc);
        console.log(`       [diag] errors=${JSON.stringify(diag.errors)} empty=${JSON.stringify(diag.empty)}`);
      }
      check(`${label}: submitted exactly one lead`, posts.length === 1, `${posts.length} request(s)`);
      check(`${label}: best-time NOT in the payload`, !posts[0]?.bestTime, String(posts[0]?.bestTime));
      check(`${label}: insurance in the payload`, Boolean(posts[0]?.insurance_type), String(posts[0]?.insurance_type));

      if (wantQualified) {
        check('PPO: routed to the qualified thank-you', url.endsWith('/thank-you'), url);
        check('PPO: fired exactly one qualified conversion', events.length === 1, `${events.length} event(s)`);
      } else {
        check('Other: routed to the separate thank-you', url.endsWith('/thank-you/other'), url);
        check('Other: fired ZERO qualified conversions', events.length === 0, `${events.length} event(s)`);
        check('Other: lead still delivered', posts.length === 1);
      }
    } catch (err) {
      failures++;
      console.log(`  FAIL ${wantQualified ? 'PPO' : 'Other'}: ${String(err.message || err).slice(0, 180)}`);
    }
    if (page) await page.close();
  }
}

await browser.close();
console.log(`\n${failures === 0 ? 'ALL PASS' : failures + ' FAILURE(S)'} on ${VP.label}`);
process.exit(failures ? 1 : 0);
