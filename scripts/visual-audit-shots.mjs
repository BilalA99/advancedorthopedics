/**
 * Capture screenshots of the new/changed pages for visual review.
 *
 * Scrolls the whole page first so SlidingDiv/Reveal sections have mounted —
 * below-fold content in this codebase renders at opacity 0 until scrolled into
 * view, and a naive full-page capture comes back blank for those sections.
 *
 * Usage: node scripts/visual-audit-shots.mjs <outDir> [mode]
 *   mode "fold"  (default) above-the-fold only
 *   mode "full"  full-page
 *   mode "slice" successive viewport-height slices
 */

import puppeteer from 'puppeteer';
import path from 'path';

const OUT = process.argv[2];
const MODE = process.argv[3] || 'fold';
if (!OUT) throw new Error('output dir required');

const PAGES = [
  ['lp', '/lp/adult-scoliosis-treatment'],
  ['georgia', '/locations/georgia'],
  ['atlanta', '/locations/georgia/atlanta-orthopedics'],
  ['scoliosis', '/conditions/adult-degenerative-scoliosis'],
];

const VIEWPORTS = [
  ['m', 390, 844, true],
  ['d', 1440, 900, false],
];

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

for (const [name, url] of PAGES) {
  for (const [vn, w, h, mobile] of VIEWPORTS) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: h, isMobile: mobile, deviceScaleFactor: 1 });
    await page.goto('http://localhost:3000' + url, { waitUntil: 'networkidle2', timeout: 60000 });

    // Mount reveal-animated sections, then return to the top.
    await page.evaluate(async () => {
      const step = Math.round(window.innerHeight * 0.8);
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 400));
    });

    if (MODE === 'fold') {
      await page.screenshot({ path: path.join(OUT, `${name}-${vn}-fold.png`) });
    } else if (MODE === 'full') {
      await page.screenshot({ path: path.join(OUT, `${name}-${vn}-full.png`), fullPage: true });
    } else {
      const total = await page.evaluate(() => document.body.scrollHeight);
      const slices = Math.min(8, Math.ceil(total / h));
      for (let i = 0; i < slices; i++) {
        await page.evaluate((y) => window.scrollTo(0, y), i * h);
        await new Promise((r) => setTimeout(r, 350));
        await page.screenshot({ path: path.join(OUT, `${name}-${vn}-s${i}.png`) });
      }
    }
    await page.close();
    console.log(`captured ${name} @${vn}`);
  }
}

await browser.close();
console.log('done');
