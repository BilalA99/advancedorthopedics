// Cross-checks the live sitemap against the redirect table and against itself.
//
// Enforces three invariants the crawl kept flagging:
//   1. No sitemap URL is the *source* of a redirect (a sitemap must list only
//      final 200 URLs — listing a redirect wastes crawl budget and muddies
//      canonicalisation).
//   2. No URL appears twice.
//   3. Every URL is absolute, https, and on the canonical host.
//
// Usage: node scripts/audit-sitemap-vs-redirects.mjs [baseUrl]
//        (defaults to http://localhost:3000 — start `npm start` first)

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = process.argv[2] || 'http://localhost:3000';
const CANONICAL_HOST = 'mountainspineorthopedics.com';

// ── redirect sources, read straight out of next.config.ts ──
const cfg = fs.readFileSync(path.join(__dirname, '../next.config.ts'), 'utf8');
const sources = new Set();
// Redirects in next.config.ts are written both as object literals
// (source: "/x") and as JSON ("source":"/x"), so allow an optional quoted key.
for (const m of cfg.matchAll(/["']?source["']?\s*:\s*["']([^"']+)["']/g)) sources.add(m[1]);
// treat `/x/:slug*` style params as prefix matches
const prefixSources = [...sources].filter((s) => s.includes(':')).map((s) => s.split(':')[0].replace(/\/$/, ''));
const exactSources = new Set([...sources].filter((s) => !s.includes(':')));

const res = await fetch(`${base}/sitemap.xml`);
if (!res.ok) {
  console.error(`Could not fetch ${base}/sitemap.xml — ${res.status} ${res.statusText}`);
  process.exit(1);
}
const xml = await res.text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());

const errors = [];
const seen = new Map();

for (const u of urls) {
  let parsed;
  try { parsed = new URL(u); } catch { errors.push(`not a valid absolute URL: ${u}`); continue; }

  if (parsed.protocol !== 'https:') errors.push(`non-https URL in sitemap: ${u}`);
  if (parsed.hostname !== CANONICAL_HOST) errors.push(`non-canonical host: ${u}`);

  const p = parsed.pathname.replace(/\/$/, '') || '/';
  if (seen.has(p)) errors.push(`duplicate path in sitemap: ${p}`);
  else seen.set(p, u);

  if (exactSources.has(p)) errors.push(`sitemap lists a redirect source: ${p}`);
  else {
    // Segment-aware: "/locations/fl" must not match "/locations/florida".
    const hit = prefixSources.find(
      (pre) => pre.length > 1 && (p === pre || p.startsWith(pre + '/'))
    );
    if (hit) errors.push(`sitemap lists a URL under redirect prefix "${hit}...": ${p}`);
  }
}

console.log(`Sitemap: ${urls.length} URLs, ${seen.size} unique paths.`);
console.log(`Redirect table: ${exactSources.size} exact sources, ${prefixSources.length} prefix sources.`);

if (errors.length) {
  console.error(`\nFAILED (${errors.length} issue${errors.length === 1 ? '' : 's'}):`);
  for (const e of errors.slice(0, 60)) console.error(`  ${e}`);
  if (errors.length > 60) console.error(`  ...and ${errors.length - 60} more`);
  process.exit(1);
}
console.log('OK — no redirect sources, duplicates, or non-canonical URLs in the sitemap.');
