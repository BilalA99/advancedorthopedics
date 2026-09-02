/**
 * Inbound/outbound internal-link distribution across every built page.
 *
 * Server-rendered links only. NavBar.tsx and all three body-part dropdowns are
 * 'use client', so their links never reach the server HTML and contribute
 * nothing here — which is the point: Googlebot's first pass sees what this
 * measures, not what the hydrated nav adds.
 *
 * Usage: node scripts/internal-link-distribution.mjs
 */

import fs from 'fs';
import path from 'path';

const APP = path.join('.next', 'server', 'app');
const SECTIONS = 'conditions|treatments|locations|injuries|find-care|about|area-of-pain|blogs|lp';
const HREF = new RegExp(`href="(/(?:${SECTIONS})[^"#?]*)"`, 'g');

const pages = new Map();
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) {
      const rel = path.relative(APP, p).split(path.sep).join('/').replace(/\.html$/, '');
      pages.set('/' + (rel === 'index' ? '' : rel), p);
    }
  }
})(APP);

const inbound = new Map([...pages.keys()].map((k) => [k, new Set()]));
const outbound = new Map();

for (const [route, file] of pages) {
  const body = fs.readFileSync(file, 'utf8').split('</head>')[1] || '';
  const targets = new Set();
  for (const m of body.matchAll(HREF)) if (m[1] !== route) targets.add(m[1]);
  outbound.set(route, targets.size);
  for (const t of targets) if (inbound.has(t)) inbound.get(t).add(route);
}

const stat = (arr) => {
  const a = [...arr].sort((x, y) => x - y);
  const q = (p) => a[Math.min(a.length - 1, Math.floor(a.length * p))];
  return {
    n: a.length,
    zero: a.filter((v) => v === 0).length,
    min: a[0], p25: q(0.25), median: q(0.5), p75: q(0.75), p90: q(0.9), max: a[a.length - 1],
    mean: (a.reduce((s, v) => s + v, 0) / a.length).toFixed(1),
  };
};

const inb = (r) => inbound.get(r).size;
const groups = {
  'ALL built pages': [...pages.keys()],
  'excluding /area-of-pain': [...pages.keys()].filter((r) => !r.startsWith('/area-of-pain')),
  'templated tier only': [...pages.keys()].filter(
    (r) => r.startsWith('/conditions/') || r.startsWith('/treatments/')),
  '  /conditions/* only': [...pages.keys()].filter((r) => r.startsWith('/conditions/')),
  '  /treatments/* only': [...pages.keys()].filter((r) => r.startsWith('/treatments/')),
  '/area-of-pain only': [...pages.keys()].filter((r) => r.startsWith('/area-of-pain')),
  '/locations/* only': [...pages.keys()].filter((r) => r.startsWith('/locations/')),
};

console.log('INBOUND internal links (server-rendered)');
console.log('='.repeat(96));
console.log('group'.padEnd(26) + ['n', 'zero', 'min', 'p25', 'med', 'p75', 'p90', 'max', 'mean']
  .map((h) => h.padStart(7)).join(''));
for (const [name, list] of Object.entries(groups)) {
  const s = stat(list.map(inb));
  console.log(name.padEnd(26) + [s.n, s.zero, s.min, s.p25, s.median, s.p75, s.p90, s.max, s.mean]
    .map((v) => String(v).padStart(7)).join(''));
}

console.log('\nTOP 20 by INBOUND links');
[...pages.keys()].sort((a, b) => inb(b) - inb(a)).slice(0, 20)
  .forEach((r) => console.log(`  ${String(inb(r)).padStart(4)}  ${r}`));

console.log('\nTOP 20 by OUTBOUND links');
[...outbound.entries()].sort((a, b) => b[1] - a[1]).slice(0, 20)
  .forEach(([r, n]) => console.log(`  ${String(n).padStart(4)}  ${r}`));

console.log('\nPages with ZERO inbound, by section');
const zeroBy = {};
for (const r of pages.keys()) if (inb(r) === 0) {
  const k = '/' + (r.split('/')[1] || '(root)');
  zeroBy[k] = (zeroBy[k] || 0) + 1;
}
Object.entries(zeroBy).sort((a, b) => b[1] - a[1])
  .forEach(([k, v]) => console.log(`  ${String(v).padStart(4)}  ${k}`));
