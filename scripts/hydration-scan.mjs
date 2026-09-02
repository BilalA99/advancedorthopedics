/**
 * Hydration-error scan across the templated tier.
 *
 * React #418/#423/#425 mean the server-rendered HTML did not match what the
 * client produced, so React discards the server subtree and re-renders. That is
 * a real defect independent of any experiment, and it is a confound for the
 * differentiation pilot if it lands unevenly across the two arms.
 *
 * Usage: node scripts/hydration-scan.mjs [baseUrl] [concurrency]
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const BASE = process.argv[2] || 'http://localhost:3000';
const CONC = Number(process.argv[3] || 6);
const APP = path.join('.next', 'server', 'app');

function routesIn(dir, prefix) {
  return fs
    .readdirSync(path.join(APP, dir))
    .filter((f) => f.endsWith('.html'))
    .map((f) => `${prefix}/${f.slice(0, -5)}`);
}

const ROUTES = [...routesIn('conditions', '/conditions'), ...routesIn('treatments', '/treatments')];

const PILOT = {
  '/treatments/spinal-fusion': 'TREATMENT',
  '/treatments/shoulder-arthroscopy': 'TREATMENT',
  '/treatments/hip-arthroscopy-treatment': 'TREATMENT',
  '/treatments/arthroscopic-knee-surgery': 'TREATMENT',
  '/treatments/knee-cartilage-restoration': 'TREATMENT',
  '/treatments/cervical-laminectomy': 'TREATMENT',
  '/conditions/herniated-disc': 'TREATMENT',
  '/treatments/knee-osteotomy': 'CONTROL',
  '/treatments/partial-knee-replacement': 'CONTROL',
  '/treatments/shoulder-instability-surgery': 'CONTROL',
  '/treatments/total-knee-replacement': 'CONTROL',
  '/treatments/knee-ligament-repair': 'CONTROL',
  '/treatments/labral-repair-shoulder': 'CONTROL',
  '/conditions/knee-arthritis': 'CONTROL',
};

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const results = [];
let idx = 0;

async function worker() {
  for (;;) {
    const i = idx++;
    if (i >= ROUTES.length) return;
    const route = ROUTES[i];
    const page = await browser.newPage();
    const codes = new Set();
    page.on('pageerror', (e) => {
      const m = String(e).match(/Minified React error #(\d+)/);
      if (m) codes.add(m[1]);
      else if (/hydrat/i.test(String(e))) codes.add('hydration');
    });
    try {
      await page.goto(BASE + route, { waitUntil: 'networkidle2', timeout: 60000 });
      await new Promise((r) => setTimeout(r, 700));
    } catch {
      codes.add('NAV_FAIL');
    }
    results.push({ route, arm: PILOT[route] || '', codes: [...codes] });
    await page.close();
  }
}

await Promise.all(Array.from({ length: CONC }, worker));
await browser.close();

const bad = results.filter((r) => r.codes.length);
const rate = ((bad.length / results.length) * 100).toFixed(1);

console.log('='.repeat(72));
console.log(`TEMPLATED TIER: ${results.length} pages scanned`);
console.log(`hydration/runtime errors: ${bad.length}  (${rate}%)`);
const byCode = {};
for (const r of bad) for (const c of r.codes) byCode[c] = (byCode[c] || 0) + 1;
console.log('by error code:', byCode);

const conds = results.filter((r) => r.route.startsWith('/conditions'));
const txs = results.filter((r) => r.route.startsWith('/treatments'));
const pct = (a) => a.length ? ((a.filter((r) => r.codes.length).length / a.length) * 100).toFixed(1) : '-';
console.log(`  /conditions: ${conds.filter(r=>r.codes.length).length}/${conds.length} (${pct(conds)}%)`);
console.log(`  /treatments: ${txs.filter(r=>r.codes.length).length}/${txs.length} (${pct(txs)}%)`);

console.log('\n' + '='.repeat(72));
console.log('PILOT CANDIDATES');
console.log(`${'slug'.padEnd(48)} ${'arm'.padEnd(10)} hydration`);
for (const [slug, arm] of Object.entries(PILOT)) {
  const r = results.find((x) => x.route === slug);
  const state = r ? (r.codes.length ? `ERROR #${r.codes.join(',')}` : 'clean') : 'NOT SCANNED';
  console.log(`${slug.padEnd(48)} ${arm.padEnd(10)} ${state}`);
}

fs.writeFileSync('hydration-scan.json', JSON.stringify(results, null, 2));
console.log('\nfull results -> hydration-scan.json');
