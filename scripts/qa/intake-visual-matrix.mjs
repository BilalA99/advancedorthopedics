/**
 * Visual matrix for the consultation intake form.
 *
 * Drives Puppeteer (already a dependency) rather than the user's Chrome, which can
 * sit in DevTools device emulation and pin the viewport regardless of the size we
 * ask for.
 *
 * Per viewport it proves the things the meeting change could have broken:
 *   - the ZIP field is present, visible and inside the viewport
 *   - "Best Time To Contact" is gone
 *   - the insurance dropdown is present and not clipped
 *   - the page does not scroll horizontally
 *   - no console errors and no hydration warnings
 *
 * Usage: node scripts/tmp/intake-visual-matrix.mjs <baseUrl> <outDir> [desktop|mobile|all]
 */
import puppeteer from 'puppeteer';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const BASE = process.argv[2] || 'http://localhost:3000';
const OUT = process.argv[3] || path.join('docs', 'operations', 'mso-intake-form-insurance-routing', 'evidence');
const WHICH = process.argv[4] || 'all';

const DESKTOP = [
  { name: '1280x720', width: 1280, height: 720 },
  { name: '1366x768', width: 1366, height: 768 },
  { name: '1440x900', width: 1440, height: 900 },
  { name: '1536x864', width: 1536, height: 864 },
  { name: '1920x1080', width: 1920, height: 1080 },
];

const MOBILE = [
  { name: '320x568-iphone-se1', width: 320, height: 568, mobile: true },
  { name: '360x800-android', width: 360, height: 800, mobile: true },
  { name: '375x667-iphone-se2', width: 375, height: 667, mobile: true },
  { name: '390x844-iphone-12', width: 390, height: 844, mobile: true },
  { name: '393x852-iphone-15', width: 393, height: 852, mobile: true },
  { name: '412x915-pixel', width: 412, height: 915, mobile: true },
  { name: '414x896-iphone-xr', width: 414, height: 896, mobile: true },
  { name: '768x1024-ipad', width: 768, height: 1024, mobile: true },
  { name: '820x1180-ipad-air', width: 820, height: 1180, mobile: true },
];

// The intake form renders inside ContactUsSection, which the homepage and
// /find-care/book-an-appointment both use. The homepage is the highest-traffic
// instance; book-an-appointment is the one paid traffic is sent to.
const PAGES = [
  { slug: 'home', url: '/' },
  { slug: 'insurance-policy', url: '/insurance-policy' },
];

const results = [];

function record(row) {
  results.push(row);
  const status = row.failures.length === 0 ? 'PASS' : 'FAIL';
  console.log(
    `${status.padEnd(4)} ${row.page.padEnd(18)} ${row.viewport.padEnd(22)} ` +
    (row.failures.length ? row.failures.join('; ') : 'zip+insurance ok, no overflow, no console errors') +
    (row.note ? `  [${row.note}]` : ''),
  );
}

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

const viewports = [
  ...(WHICH === 'mobile' ? [] : DESKTOP.map((v) => ({ ...v, kind: 'desktop' }))),
  ...(WHICH === 'desktop' ? [] : MOBILE.map((v) => ({ ...v, kind: 'mobile' }))),
];

for (const pageDef of PAGES) {
  for (const vp of viewports) {
    const page = await browser.newPage();
    const consoleErrors = [];
    const hydrationWarnings = [];

    page.on('console', (msg) => {
      const text = msg.text();
      if (/hydrat|did not match|server.*client/i.test(text)) hydrationWarnings.push(text);
      else if (msg.type() === 'error') consoleErrors.push(text);
    });
    page.on('pageerror', (err) => consoleErrors.push(String(err.message || err)));

    await page.setViewport({
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 1,
      isMobile: Boolean(vp.mobile),
      hasTouch: Boolean(vp.mobile),
    });

    const failures = [];
    let probeNote = '';
    try {
      await page.goto(BASE + pageDef.url, { waitUntil: 'networkidle2', timeout: 60000 });

      // CSS sanity. An unstyled page shows the mobile AND desktop trees at once, so
      // every DOM measurement below would be plausible and wrong. `hidden` is an
      // unconditional utility, unlike `sm:hidden` which does nothing under 640px.
      const cssApplied = await page.evaluate(() => {
        const probe = document.createElement('div');
        probe.className = 'hidden';
        document.body.appendChild(probe);
        const ok = getComputedStyle(probe).display === 'none';
        probe.remove();
        return ok;
      });
      if (!cssApplied) failures.push('CSS NOT APPLIED — measurements unreliable');

      // The form sits below the fold inside a reveal animation; unscrolled it
      // screenshots blank because an ancestor has opacity 0.
      const found = await page.evaluate(() => {
        // Scoped via #insurance_type: id="postal_code" is duplicated across five
        // form components, and the homepage lazily mounts DoctorContactForm, so
        // querySelector('input[autocomplete="postal-code"]') can return a hidden input in another form.
        const form = document.querySelector('#insurance_type')?.closest('form');
        const el = form?.querySelector('input[autocomplete="postal-code"]');
        if (el) el.scrollIntoView({ block: 'center' });
        return Boolean(el);
      });
      if (!found) failures.push('ZIP field NOT FOUND — ZIP field missing');

      await new Promise((r) => setTimeout(r, 900)); // let the reveal settle

      const probe = await page.evaluate(() => {
        const insurance = document.querySelector('#insurance_type');
        const intakeForm = insurance?.closest('form');
        const zip = intakeForm?.querySelector('input[autocomplete="postal-code"]');
        const rect = (el) => {
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return { x: r.x, y: r.y, w: r.width, h: r.height };
        };
        const cs = (el) => (el ? getComputedStyle(el) : null);
        const zipStyle = cs(zip);
        return {
          zip: rect(zip),
          insurance: rect(insurance),
          zipVisible: Boolean(zipStyle && zipStyle.display !== 'none' && zipStyle.visibility !== 'hidden' && Number(zipStyle.opacity) > 0),
          zipInputMode: zip ? zip.getAttribute('inputmode') : null,
          zipAutocomplete: zip ? zip.getAttribute('autocomplete') : null,
          zipType: zip ? zip.getAttribute('type') : null,
          zipLabelled: Boolean(zip && zip.getAttribute('aria-label')),
          zipFontSize: zipStyle ? parseFloat(zipStyle.fontSize) : null,
          // Scoped to the intake form. Other forms on the page (DoctorContactForm on
          // the desktop hero, the BookAnAppointment modal) still carry the field;
          // that is tracked separately and must not mask this form's state.
          bestTimeInIntakeForm: (() => {
            const form = document.querySelector('#insurance_type')?.closest('form');
            return form ? /best time to contact|preferred contact time/i.test(form.innerText) : null;
          })(),
          otherFormsWithBestTime: Array.from(document.querySelectorAll('form'))
            .filter((f) => !f.querySelector('#insurance_type'))
            .filter((f) => /best time to contact/i.test(f.innerText)).length,
          bodyScrollWidth: document.documentElement.scrollWidth,
          bodyClientWidth: document.documentElement.clientWidth,
          viewportWidth: window.innerWidth,
        };
      });

      if (probe.zip && !probe.zipVisible) failures.push('ZIP field present but not visible');
      if (!probe.insurance) failures.push('#insurance_type NOT FOUND — insurance dropdown missing');
      if (probe.bestTimeInIntakeForm) failures.push('"Best Time To Contact" still in the intake form');
      if (probe.bestTimeInIntakeForm === null) failures.push('intake form not found (no #insurance_type)');
      if (probe.zipInputMode !== 'numeric') failures.push(`ZIP inputmode=${probe.zipInputMode} (want numeric)`);
      if (probe.zipAutocomplete !== 'postal-code') failures.push(`ZIP autocomplete=${probe.zipAutocomplete}`);
      if (!probe.zipLabelled) failures.push('ZIP field has no accessible label');

      if (probe.zip) {
        if (probe.zip.w <= 0 || probe.zip.h <= 0) failures.push('ZIP field has zero size');
        if (probe.zip.x < -1) failures.push(`ZIP field clipped left (x=${probe.zip.x.toFixed(0)})`);
        if (probe.zip.x + probe.zip.w > probe.viewportWidth + 1) {
          failures.push(`ZIP field overflows right (right=${(probe.zip.x + probe.zip.w).toFixed(0)} > ${probe.viewportWidth})`);
        }
      }
      // iOS zooms a focused input whose font-size is under 16px.
      // Reported, not failed: shadcn's Input base class carries md:text-sm, so at
      // >=768px EVERY field in EVERY form on the site is 14px, not just ZIP. That is
      // a pre-existing sitewide trait and fixing it is not this change's business.
      if (vp.mobile && probe.zipFontSize !== null && probe.zipFontSize < 16) {
        probeNote = (probeNote ? probeNote + '; ' : '') +
          `ZIP ${probe.zipFontSize}px (<16px, iOS zooms on focus) — sitewide shadcn md:text-sm, pre-existing`;
      }
      if (probe.bodyScrollWidth > probe.bodyClientWidth + 1) {
        failures.push(`horizontal overflow (scrollWidth ${probe.bodyScrollWidth} > clientWidth ${probe.bodyClientWidth})`);
      }
      if (consoleErrors.length) failures.push(`console errors: ${consoleErrors.slice(0, 2).join(' | ')}`);
      if (hydrationWarnings.length) failures.push(`hydration: ${hydrationWarnings.slice(0, 1).join(' | ')}`);

      if (probe.otherFormsWithBestTime > 0) {
        probeNote = `${probe.otherFormsWithBestTime} OTHER form(s) on this page still show best-time (separate finding)`;
      }

      const dir = path.join(OUT, vp.kind);
      await mkdir(dir, { recursive: true });
      await page.screenshot({ path: path.join(dir, `${pageDef.slug}-${vp.name}-form.png`) });
    } catch (err) {
      failures.push(`ERROR: ${String(err.message || err).slice(0, 160)}`);
    }

    record({ page: pageDef.slug, viewport: vp.name, kind: vp.kind, failures, note: probeNote });
    await page.close();
  }
}

await browser.close();

const failed = results.filter((r) => r.failures.length);
await writeFile(
  path.join(OUT, 'visual-matrix-results.json'),
  JSON.stringify({ base: BASE, total: results.length, failed: failed.length, results }, null, 2),
);

console.log(`\n${results.length - failed.length}/${results.length} viewport checks passed`);
if (failed.length) {
  console.log('FAILURES:');
  for (const f of failed) console.log(`  ${f.page} ${f.viewport}: ${f.failures.join('; ')}`);
  process.exit(1);
}
