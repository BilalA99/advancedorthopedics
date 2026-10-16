/**
 * Site-wide audit of every rendered intake form.
 *
 * For each page, finds every <form> in the DOM (including ones inside dialogs that
 * are mounted but closed) and checks the two things the 2026-09-24 meeting decided:
 * the insurance dropdown is present, and "Best Time To Contact" is gone.
 *
 * Reads the DOM rather than the source because the source cannot tell you which
 * component actually renders on a given URL — that is how /find-care/book-an-appointment
 * turned out to render DoctorContactForm while <ConsultationForm /> sat commented out.
 *
 * Usage: node scripts/tmp/intake-form-audit.mjs <baseUrl> [desktop|mobile]
 */
import puppeteer from 'puppeteer';

const BASE = process.argv[2] || 'http://localhost:3000';
const PROFILE = process.argv[3] || 'desktop';
const VP = PROFILE === 'mobile'
  ? { width: 390, height: 844, isMobile: true, hasTouch: true }
  : { width: 1440, height: 900, isMobile: false, hasTouch: false };

const PAGES = [
  ['/', 'homepage — ConsultationForm + DoctorContactForm hero'],
  ['/insurance-policy', 'ConsultationForm + PatientAdvocateForm'],
  ['/find-care/book-an-appointment', 'DoctorContactForm (main booking page)'],
  ['/lp/adult-scoliosis-treatment', 'BodyPartHeroForm (PAID landing page)'],
  ['/lp/spine-injections', 'BodyPartHeroForm (PAID landing page)'],
  ['/locations/florida', 'StateHeroForm'],
  ['/about', 'ConsultationForm'],
  ['/find-care/find-a-doctor', 'ConsultationForm'],
  ['/find-care/second-opinion', 'ConsultationForm'],
  ['/patient-forms', 'ConsultationForm'],
];

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
let failures = 0;
let formsSeen = 0;

for (const [url, note] of PAGES) {
  const page = await browser.newPage();
  await page.setViewport(VP);
  const consoleErrors = [];
  page.on('pageerror', (e) => consoleErrors.push(String(e.message || e)));

  try {
    await page.goto(BASE + url, { waitUntil: 'networkidle2', timeout: 60000 });
    await new Promise((r) => setTimeout(r, 1200));

    // Several forms only mount inside a dialog: BodyPartHeroForm on the /lp/*
    // landing pages opens from a [data-open-evaluation] CTA, and the sitewide
    // BookAnAppoitmentButton opens from its own trigger. Scanning without opening
    // them reports "no lead form rendered" on the paid landing pages, which is
    // exactly where the conversion gate matters most.
    await page.evaluate(() => {
      const trigger = document.querySelector('[data-open-evaluation]');
      if (trigger) trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    await new Promise((r) => setTimeout(r, 1200));

    // StateHeroForm is progressive: ZIP and insurance render only once `expanded`
    // is set. Its CTA validates the first-phase fields before expanding, so an
    // empty click does nothing — fill them, then expand. Scanning the collapsed
    // state would report a four-field form with no insurance, which is the
    // collapsed state behaving correctly rather than a missing dropdown.
    const heroFilled = await page.evaluate(() => {
      const set = (id, value) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        setter.call(el, value);
        el.dispatchEvent(new Event('input', { bubbles: true }));
        return true;
      };
      return set('hero_first_name', 'Testpatient')
        && set('hero_last_name', 'Synthetic')
        && set('hero_phone', '5615550123')
        && set('hero_email', 'qa+intake@example.com');
    });
    if (heroFilled) {
      await new Promise((r) => setTimeout(r, 400));
      await page.evaluate(() => {
        const btn = Array.from(document.querySelectorAll('button'))
          .find((b) => /get free consultation/i.test(b.innerText || ''));
        if (btn) btn.click();
      });
      await new Promise((r) => setTimeout(r, 1200));
    }

    const report = await page.evaluate(() => {
      // Report every form with real inputs. A heuristic that silently drops a form
      // would report a clean page while an ungated form sat on it.
      const isLeadForm = (f) =>
        f.querySelectorAll('input:not([type=hidden]),textarea,[role=combobox],select').length >= 3;
      return Array.from(document.querySelectorAll('form')).filter(isLeadForm).map((f, i) => {
        const insuranceEl = f.querySelector('#insurance_type, [id$="_insurance_type"], [aria-label="Select your insurance"], select[name="insurance_type"]');
        const names = Array.from(f.querySelectorAll('input:not([type=hidden]),textarea,select,[role=combobox]'))
          .map((e) => e.id || e.getAttribute('name') || '');
        // A hand-off form takes a name and phone and then OPENS the full form in a
        // dialog — it never posts a lead, so it needs no insurance field. The
        // honeypot `website` input plus the absence of any email input identifies
        // BodyPartHeroForm's compact hero. Verified in source: its submit handler
        // is handleInitialSubmit, which only calls setShowDialog(true).
        const handoff = names.includes('website')
          && !f.querySelector('input[type=email], input[placeholder*="mail" i]')
          && names.length <= 3;
        return {
          handoff,
          index: i,
          hasInsurance: Boolean(insuranceEl),
          insuranceId: insuranceEl?.id || null,
          bestTime: /best time to contact|preferred contact time|select a time/i.test(f.innerText || ''),
          hasZip: Boolean(f.querySelector('input[autocomplete="postal-code"], #postal_code')),
          fieldCount: f.querySelectorAll('input:not([type=hidden]),textarea,[role=combobox],select').length,
          visible: f.getClientRects().length > 0,
        };
      });
    });

    console.log(`\n### ${url}  (${note})`);
    if (!report.length) console.log('    no lead form rendered');
    for (const f of report) {
      formsSeen++;
      const problems = [];
      if (!f.hasInsurance && !f.handoff) problems.push('NO insurance dropdown');
      if (f.bestTime) problems.push('still shows best-time');
      if (problems.length) failures++;
      console.log(
        `    ${problems.length ? 'FAIL' : 'ok  '} form[${f.index}]${f.handoff ? ' [hand-off: posts no lead]' : ''} ` +
        `insurance=${f.hasInsurance ? (f.insuranceId || 'yes') : 'NO'} zip=${f.hasZip} ` +
        `fields=${f.fieldCount} visible=${f.visible}` +
        (problems.length ? `  <-- ${problems.join('; ')}` : ''),
      );
    }
    if (consoleErrors.length) {
      console.log(`    console errors: ${consoleErrors.slice(0, 2).join(' | ')}`);
      failures++;
    }
  } catch (err) {
    console.log(`\n### ${url}\n    ERROR: ${String(err.message || err).slice(0, 160)}`);
    failures++;
  }
  await page.close();
}

await browser.close();
console.log(`\n${formsSeen} lead form(s) inspected on ${PAGES.length} pages (${PROFILE}); ${failures} problem(s)`);
process.exit(failures ? 1 : 0);
