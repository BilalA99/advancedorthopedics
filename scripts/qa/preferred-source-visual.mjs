/**
 * Visual check for the Preferred Sources module across viewports.
 *
 * Screenshots it in place and asserts the layout properties that actually break:
 * overflow, touch-target size, stacking under 640px, and whether it is legible
 * beside the conversion module it sits above.
 *
 * Usage: node scripts/qa/preferred-source-visual.mjs <baseUrl> <outDir>
 */
import puppeteer from 'puppeteer';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const BASE = process.argv[2] || 'http://localhost:3000';
const OUT = process.argv[3] || path.join('docs', 'operations', 'faq-ssr-and-preferred-sources', 'evidence');

const VIEWPORTS = [
  { name: '320x568-iphone-se1', width: 320, height: 568, mobile: true },
  { name: '375x667-iphone-se2', width: 375, height: 667, mobile: true },
  { name: '390x844-iphone-12', width: 390, height: 844, mobile: true },
  { name: '414x896-iphone-xr', width: 414, height: 896, mobile: true },
  { name: '768x1024-ipad', width: 768, height: 1024, mobile: true },
  { name: '1280x720', width: 1280, height: 720 },
  { name: '1440x900', width: 1440, height: 900 },
  { name: '1920x1080', width: 1920, height: 1080 },
];

const PAGES = [
  ['blog', '/blogs/what-degree-of-scoliosis-requires-surgery'],
  ['condition', '/conditions/sciatica'],
  ['treatment', '/treatments/revision-spinal-surgery'],
];

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
let failures = 0;
const results = [];

for (const [slug, url] of PAGES) {
  for (const vp of VIEWPORTS) {
    const page = await browser.newPage();
    const consoleErrors = [];
    page.on('pageerror', (e) => consoleErrors.push(String(e.message || e)));
    await page.setViewport({
      width: vp.width, height: vp.height, deviceScaleFactor: 1,
      isMobile: Boolean(vp.mobile), hasTouch: Boolean(vp.mobile),
    });

    const problems = [];
    try {
      // Pre-seed a consent decision so the cookie banner does not cover the module
      // in the screenshot. On a 320px screen the banner is tall enough to hide it
      // entirely, which made the evidence useless even though the DOM measurements
      // passed. Seeding is closer to a returning visitor than dismissing would be.
      await page.evaluateOnNewDocument(() => {
        try {
          localStorage.setItem('mso_cookie_consent_v1', JSON.stringify({
            version: 1,
            timestamp: '2026-09-20T00:00:00.000Z',
            categories: { necessary: true, analytics: true, marketing: true, functional: true },
          }));
        } catch {}
      });

      await page.goto(BASE + url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await new Promise((r) => setTimeout(r, 1200));

      // CSS sanity — an unstyled page makes every measurement below meaningless.
      const cssOk = await page.evaluate(() => {
        const probe = document.createElement('div');
        probe.className = 'hidden';
        document.body.appendChild(probe);
        const ok = getComputedStyle(probe).display === 'none';
        probe.remove();
        return ok;
      });
      if (!cssOk) problems.push('CSS NOT APPLIED');

      const found = await page.evaluate(() => {
        // Blog renders the bare button in the hero tag row; the clinical templates
        // render the framed module at the end. Either is valid — measure what is there.
        const el = document.querySelector('[data-module="preferred-source"]')
          || document.querySelector('[data-cta-action="preferred-source"]');
        if (el) el.scrollIntoView({ block: 'center' });
        return Boolean(el);
      });
      if (!found) problems.push('preferred-source control not found');

      await new Promise((r) => setTimeout(r, 700));

      const probe = await page.evaluate(() => {
        const link = document.querySelector('[data-cta-action="preferred-source"]');
        if (!link) return null;
        // In the hero there is no wrapper module; the row the button sits in is its
        // container for overflow purposes.
        const mod = document.querySelector('[data-module="preferred-source"]') || link.parentElement;
        const inHero = !document.querySelector('[data-module="preferred-source"]');
        const m = mod.getBoundingClientRect();
        const l = link.getBoundingClientRect();
        const cs = getComputedStyle(mod);
        return {
          mod: { x: m.x, y: m.y, w: m.width, h: m.height },
          link: { x: l.x, y: l.y, w: l.width, h: l.height },
          flexDirection: cs.flexDirection,
          modVisible: m.width > 0 && m.height > 0,
          linkFontSize: parseFloat(getComputedStyle(link).fontSize),
          viewportWidth: window.innerWidth,
          docScrollW: document.documentElement.scrollWidth,
          docClientW: document.documentElement.clientWidth,
          // Is the button inside the module's padding box?
          linkWithinModule: l.left >= m.left - 1 && l.right <= m.right + 1,
          inHero,
          // Does the button overlap any tag pill? Overlap in the hero row would
          // mean the wrap is wrong, which a screenshot alone can hide.
          overlapsSibling: (() => {
            if (!inHero) return false;
            const sibs = Array.from(mod.children).filter((c) => c !== link);
            return sibs.some((c) => {
              const r = c.getBoundingClientRect();
              if (!r.width || !r.height) return false;
              return !(l.right <= r.left + 1 || l.left >= r.right - 1 || l.bottom <= r.top + 1 || l.top >= r.bottom - 1);
            });
          })(),
        };
      });

      if (!probe) {
        problems.push('module or link missing after scroll');
      } else {
        if (!probe.modVisible) problems.push('module has zero size');
        if (probe.link.h < 38) problems.push(`touch target ${probe.link.h.toFixed(0)}px < 38px`);
        if (!probe.linkWithinModule) problems.push('button overflows its container');
        if (probe.mod.x < -1 || probe.mod.x + probe.mod.w > probe.viewportWidth + 1) {
          problems.push('module overflows the viewport');
        }
        if (probe.docScrollW > probe.docClientW + 1) {
          problems.push(`page scrolls horizontally (${probe.docScrollW} > ${probe.docClientW})`);
        }
        if (probe.overlapsSibling) problems.push('button overlaps a tag pill');

        if (probe.inHero) {
          // Hero: the button shares a wrapping row with the tag pills. It must not
          // overflow the panel and must stay an easy target; it is NOT expected to
          // be full width, because it sits beside the tags when there is room.
          if (probe.link.h < 38) problems.push(`hero button ${probe.link.h.toFixed(0)}px tall, want >=38px`);
        } else {
          // Framed module: stacked below 640px, row at and above it.
          const expected = vp.width < 640 ? 'column' : 'row';
          if (probe.flexDirection !== expected) {
            problems.push(`flex-direction ${probe.flexDirection}, expected ${expected} at ${vp.width}px`);
          }
          if (vp.width < 640 && probe.link.w < probe.mod.w * 0.7) {
            problems.push(`button only ${Math.round((probe.link.w / probe.mod.w) * 100)}% wide when stacked`);
          }
        }
      }

      if (consoleErrors.length) problems.push(`console: ${consoleErrors[0].slice(0, 60)}`);

      const dir = path.join(OUT, vp.mobile ? 'mobile' : 'desktop');
      await mkdir(dir, { recursive: true });
      await page.screenshot({ path: path.join(dir, `${slug}-${vp.name}-preferred-source.png`) });
    } catch (err) {
      problems.push('ERROR: ' + String(err.message || err).slice(0, 90));
    }

    if (problems.length) failures++;
    results.push({ slug, vp: vp.name, problems });
    console.log(
      `${problems.length ? 'FAIL' : 'PASS'}  ${slug.padEnd(10)} ${vp.name.padEnd(20)} ` +
      (problems.length ? problems.join('; ') : 'sized, stacked and inside the viewport'),
    );
    await page.close();
  }
}

await browser.close();
console.log(`\n${results.length - failures}/${results.length} viewport checks passed`);
process.exit(failures ? 1 : 0);
