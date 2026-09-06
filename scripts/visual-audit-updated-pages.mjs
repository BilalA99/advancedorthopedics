/**
 * Full visual + content audit of every page this PR visually updates.
 *
 * Complements visual-audit-sprint.mjs (33 key pages) and the static built-HTML
 * sweep (all 706 documents, content-rule regexes): this script loads the 59
 * layout-changed routes in a real browser at three viewports, asserts
 * structure, and captures mobile + desktop screenshots for human review.
 *
 * Superlative hits are reported WITH surrounding text rather than pass/fail,
 * because location pages legitimately carry them inside patient reviews —
 * classification is a human step, deliberately.
 */
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const BASE = process.argv[3] || 'http://localhost:3000';
const routesFile = process.argv[2];
const routes = JSON.parse(fs.readFileSync(routesFile, 'utf8'));
const OUT = 'audit-shots-updated';
fs.mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: 'mobile', width: 390, height: 844, shot: true },
  { name: 'tablet', width: 768, height: 1024, shot: false },
  { name: 'desktop', width: 1440, height: 900, shot: true },
];

const SUPERLATIVE = /world-class|top-tier|\brenowned\b|top-rated|best orthopedic|elite surgeons|leaders in/i;

const results = [];
const browser = await puppeteer.launch({ headless: 'new' });

for (const route of routes) {
  for (const vp of VIEWPORTS) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height });
    const consoleErrors = [];
    page.on('pageerror', (e) => consoleErrors.push('PAGEERROR ' + String(e).slice(0, 120)));
    page.on('console', (m) => {
      if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 120));
    });
    let status = 0;
    try {
      const resp = await page.goto(BASE + route, { waitUntil: 'networkidle0', timeout: 90000 });
      status = resp ? resp.status() : 0;
    } catch (e) {
      results.push({ route, vp: vp.name, status: 'LOAD-FAIL', error: String(e).slice(0, 150) });
      await page.close();
      continue;
    }

    const data = await page.evaluate((superlativeSrc) => {
      const sup = new RegExp(superlativeSrc, 'gi');
      const doc = document;
      const overflow = doc.documentElement.scrollWidth - doc.documentElement.clientWidth;
      const h1s = doc.querySelectorAll('h1').length;
      const emptyHeadings = [...doc.querySelectorAll('h1,h2,h3,h4')].filter(
        (h) => !h.textContent.trim()
      ).length;
      const imgNoAlt = [...doc.querySelectorAll('img')].filter(
        (i) => !i.hasAttribute('alt')
      ).length;
      const robots = doc.querySelector('meta[name="robots"]')?.content || '';
      const canonical = doc.querySelector('link[rel="canonical"]')?.href || '';
      // visible text only, excluding script/style
      const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT, {
        acceptNode(n) {
          const p = n.parentElement;
          if (!p) return NodeFilter.FILTER_REJECT;
          const tag = p.tagName;
          if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT')
            return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        },
      });
      const supHits = [];
      let node;
      while ((node = walker.nextNode())) {
        const t = node.textContent;
        let m;
        sup.lastIndex = 0;
        while ((m = sup.exec(t))) {
          // record ancestor chain classes to let review-context be classified
          let anc = [], el = node.parentElement;
          for (let i = 0; i < 6 && el; i++, el = el.parentElement)
            anc.push(el.className && typeof el.className === 'string' ? el.className.split(' ')[0] : el.tagName);
          supHits.push({
            frag: t.slice(Math.max(0, m.index - 60), m.index + 70).trim(),
            chain: anc.join('>').slice(0, 120),
          });
          if (supHits.length > 8) break;
        }
        if (supHits.length > 8) break;
      }
      const ptFirst = /\b(we|our)\b[^.]{0,60}physical therapy/i.exec(doc.body.innerText);
      return {
        overflow, h1s, emptyHeadings, imgNoAlt, robots, canonical,
        words: doc.body.innerText.split(/\s+/).length,
        supHits,
        ptFirst: ptFirst ? ptFirst[0].slice(0, 90) : null,
        neuro: /neurosurg/i.test(doc.body.innerText),
        paraLeak: doc.body.innerText.includes('[PARAGRAPH BREAK]'),
        literalTag: /<\/?(strong|a|p|br)\b/.test(doc.body.innerText),
      };
    }, SUPERLATIVE.source);

    if (vp.shot) {
      const slug = route.replace(/\//g, '_').replace(/^_/, '') || 'home';
      await page.screenshot({
        path: path.join(OUT, `${slug}.${vp.name}.png`),
        fullPage: vp.name === 'desktop',
      });
    }
    results.push({ route, vp: vp.name, status, consoleErrors, ...data });
    await page.close();
  }
  process.stdout.write('.');
}
await browser.close();
console.log('\n');

fs.writeFileSync(path.join(OUT, 'audit.json'), JSON.stringify(results, null, 1));

// summary
let flagged = 0;
for (const r of results) {
  const probs = [];
  if (r.status !== 200) probs.push('status=' + r.status);
  if (r.overflow > 0) probs.push('overflowX=' + r.overflow);
  if (r.h1s !== 1) probs.push('h1=' + r.h1s);
  if (r.emptyHeadings) probs.push('empty-headings=' + r.emptyHeadings);
  if (r.imgNoAlt) probs.push('img-no-alt=' + r.imgNoAlt);
  if (r.consoleErrors && r.consoleErrors.length) probs.push('console=' + r.consoleErrors.length);
  if (r.ptFirst) probs.push('PT-FIRST-PERSON');
  if (r.neuro) probs.push('NEURO');
  if (r.paraLeak) probs.push('PARA-LEAK');
  if (r.literalTag) probs.push('LITERAL-TAG');
  if (probs.length) {
    flagged++;
    console.log(`${r.route} [${r.vp}] ${probs.join(' | ')}`);
    if (r.consoleErrors?.length) console.log('    ' + r.consoleErrors[0]);
    if (r.ptFirst) console.log('    PT: ' + r.ptFirst);
  }
}
console.log(`\n${results.length} page/viewport combinations, ${flagged} flagged.`);
console.log(`superlative fragments captured for human classification -> ${OUT}/audit.json`);
