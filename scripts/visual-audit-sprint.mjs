/**
 * Full visual + structural audit of every page this sprint touched.
 *
 * Screenshots alone do not catch the failure modes this sprint could plausibly
 * introduce, so each page is also checked for: horizontal overflow, h1 count,
 * skipped heading levels, images with no alt text, console errors, and — most
 * importantly — content that was edited by bulk string replacement and could
 * have rendered as literal markup rather than as HTML.
 *
 * Usage: node scripts/visual-audit-sprint.mjs <outDir> [baseUrl]
 */

import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

const OUT = process.argv[2] || 'audit-shots';
const BASE = process.argv[3] || 'http://localhost:3000';

const VIEWPORTS = [
  ['mobile', 390, 844, true],
  ['tablet', 768, 1024, false],
  ['desktop', 1440, 900, false],
];

// Every surface this sprint changed, one representative per change class.
const PAGES = [
  ['home', '/'],
  ['about', '/about'],
  ['about-faqs', '/about/faqs'],
  ['doctor-mccarthy', '/about/meetourdoctors/dr-christopher-mccarthy'],
  ['doctor-cunningham-pa', '/about/meetourdoctors/joseph-cunningham-pa-c'],
  ['doctor-savory-pa', '/about/meetourdoctors/sharmez-savory-pa-c'],
  ['conditions-hub', '/conditions'],
  ['cond-scoliosis-pillar', '/conditions/adult-degenerative-scoliosis'],
  ['cond-knee-arthritis-CONTROL', '/conditions/knee-arthritis'],
  ['cond-nerve-pain', '/conditions/nerve-pain'],
  ['treatments-hub', '/treatments'],
  ['tx-adult-scoliosis-NEW', '/treatments/adult-scoliosis-surgery'],
  ['tx-spinal-fusion-OWNER', '/treatments/spinal-fusion'],
  ['tx-lumbar-fusion-DEMOTED', '/treatments/lumbar-fusion-surgery'],
  ['tx-meniscus-repair-FWDLINK', '/treatments/meniscus-repair-surgery'],
  ['tx-resurfacing-FWDLINK', '/treatments/resurfacing-shoulder-replacement'],
  ['tx-ddd-details-FWDLINK', '/treatments/degenerative-disc-disease-surgery-details'],
  ['tx-knee-cartilage-RICH14a', '/treatments/knee-cartilage-restoration'],
  ['tx-total-knee-CONTROL14a', '/treatments/total-knee-replacement'],
  ['tx-rotator-cuff', '/treatments/rotator-cuff-repair-surgery'],
  ['tx-injections', '/treatments/orthopedic-injections'],
  ['locations-hub', '/locations'],
  ['loc-georgia', '/locations/georgia'],
  ['loc-atlanta', '/locations/georgia/atlanta-orthopedics'],
  ['loc-orlando-14a', '/locations/florida/orlando-orthopedics'],
  ['loc-philly-walnut', '/locations/pennsylvania/philadelphia-walnut-orthopedics'],
  ['lp-scoliosis', '/lp/adult-scoliosis-treatment'],
  ['aop-canonicalised', '/area-of-pain/back-pain/sciatica-nerve-pain'],
  ['aop-noindexed', '/area-of-pain/foot-pain/heel-pain-plantar-fasciitis'],
  ['injuries-car', '/injuries/car-accident'],
  ['free-mri', '/find-care/free-mri-review'],
  ['patient-forms', '/patient-forms'],
  ['insurance', '/insurance-policy'],
];

fs.mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const rows = [];
let hardFails = 0;

for (const [name, route] of PAGES) {
  for (const [vpName, width, height, isMobile] of VIEWPORTS) {
    const page = await browser.newPage();
    const consoleErrors = [];
    page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 120)); });
    page.on('pageerror', (e) => consoleErrors.push('PAGEERROR ' + String(e).slice(0, 120)));

    let status = 0;
    try {
      const resp = await page.goto(BASE + route, { waitUntil: 'networkidle2', timeout: 90000 });
      status = resp ? resp.status() : 0;
    } catch (e) {
      rows.push({ name, route, vp: vpName, status: 'NAV_FAIL', problems: [String(e).slice(0, 80)] });
      hardFails++;
      await page.close();
      continue;
    }

    // Mount reveal-animated sections before measuring or capturing.
    await page.evaluate(async () => {
      const step = Math.round(window.innerHeight * 0.8);
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 55));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 350));
    });

    const r = await page.evaluate(() => {
      const txt = document.body.innerText || '';
      const heads = [...document.querySelectorAll('main h1,main h2,main h3,main h4')]
        .map((h) => +h.tagName[1]);
      let skips = 0;
      for (let i = 1; i < heads.length; i++) if (heads[i] - heads[i - 1] > 1) skips++;
      const imgs = [...document.querySelectorAll('main img')];
      return {
        overflow: Math.max(0, document.body.scrollWidth - document.documentElement.clientWidth),
        h1: document.querySelectorAll('main h1, h1').length,
        h2: document.querySelectorAll('main h2').length,
        headingSkips: skips,
        // alt="" is the CORRECT marking for a decorative image, so only a
        // genuinely absent attribute is a defect. Treating alt="" as a failure
        // produces false positives on every hero and badge image.
        imgNoAlt: imgs.filter((i) => i.getAttribute('alt') === null).length,
        imgDecorative: imgs.filter((i) => i.getAttribute('alt') === '').length,
        imgTotal: imgs.length,
        words: txt.trim().split(/\s+/).length,
        // bulk-edit failure modes
        literalMarkdownLink: /\]\(\/(?:treatments|conditions)\//.test(txt),
        literalAnchorTag: /<a href=/i.test(txt),
        strayAsterisks: (txt.match(/\*\*/g) || []).length,
        emptyHeading: [...document.querySelectorAll('main h2,main h3')]
          .filter((h) => !(h.textContent || '').trim()).length,
        // content-rule regressions
        outcomeClaim: /success rate|high success/i.test(txt),
        neuro: /neurosurg/i.test(txt),
        robots: (document.querySelector('meta[name="robots"]') || {}).content || '',
        canonical: (document.querySelector('link[rel="canonical"]') || {}).href || '',
      };
    });

    const problems = [];
    if (status !== 200) problems.push(`HTTP ${status}`);
    if (r.overflow > 0) problems.push(`h-overflow ${r.overflow}px`);
    if (r.h1 !== 1) problems.push(`h1=${r.h1}`);
    if (r.headingSkips > 0) problems.push(`heading-skips=${r.headingSkips}`);
    if (r.imgNoAlt > 0) problems.push(`img-no-alt=${r.imgNoAlt}/${r.imgTotal}`);
    if (r.literalMarkdownLink) problems.push('LITERAL MARKDOWN LINK');
    if (r.literalAnchorTag) problems.push('LITERAL <a href> IN TEXT');
    if (r.strayAsterisks > 0) problems.push(`stray ** x${r.strayAsterisks}`);
    if (r.emptyHeading > 0) problems.push(`empty-heading=${r.emptyHeading}`);
    if (r.outcomeClaim) problems.push('OUTCOME CLAIM');
    if (r.neuro) problems.push('NEUROSURGERY REF');
    if (!r.canonical) problems.push('no canonical');
    if (consoleErrors.length) problems.push(`console-errors=${consoleErrors.length}`);
    if (problems.length) hardFails++;

    rows.push({ name, route, vp: vpName, status, ...r, problems, consoleErrors });

    await page.screenshot({
      path: path.join(OUT, `${name}__${vpName}.png`),
      fullPage: vpName === 'desktop',
    });
    await page.close();
  }
}

await browser.close();

console.log('%-34s %-8s %-4s %-5s %-6s %s'.replace(/%-?\d*s/g, (m) => m),
  'PAGE', 'VIEWPORT', 'HTTP', 'H1', 'WORDS', 'PROBLEMS');
console.log('='.repeat(112));
for (const x of rows) {
  const p = x.problems && x.problems.length ? x.problems.join(', ') : 'ok';
  console.log(
    `${String(x.name).padEnd(30)} ${String(x.vp).padEnd(8)} ${String(x.status).padEnd(4)} ` +
    `${String(x.h1 ?? '-').padEnd(3)} ${String(x.words ?? '-').padEnd(6)} ${p}`
  );
}

const failing = rows.filter((x) => x.problems && x.problems.length);
console.log(`\n${rows.length} page/viewport combinations, ${failing.length} with problems.`);
if (failing.length) {
  const uniq = [...new Set(failing.flatMap((x) => x.problems))].sort();
  console.log('distinct problems: ' + uniq.join(' | '));
}
fs.writeFileSync(path.join(OUT, 'audit.json'), JSON.stringify(rows, null, 2));
console.log(`screenshots + audit.json -> ${OUT}`);
