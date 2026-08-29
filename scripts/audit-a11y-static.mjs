// Static accessibility audit of built HTML.
//
// Catches the mechanical failures that reliably ship: images with no alt text,
// controls with no accessible name, form fields with no label, duplicate ids,
// a missing document language, and a missing skip link. All are decidable from
// the markup alone, so this can gate a build.
//
// Deliberately string-based rather than DOM-based. Parsing ~700 built pages
// (several are >900KB) with JSDOM exhausts the heap on a modest machine. These
// checks only need attribute presence and element text, which scanning handles
// at a fraction of the cost. It is not a replacement for axe or a real screen
// reader — it is the subset that can run cheaply on every build.
//
// Usage: node scripts/audit-a11y-static.mjs [dir] [--limit N]

import fs from 'fs';
import path from 'path';

const root = process.argv[2] || '.next/server/app';
const li = process.argv.indexOf('--limit');
const limit = li > -1 ? Number(process.argv[li + 1]) : Infinity;

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name.endsWith('.html')) acc.push(p);
  }
  return acc;
}

const attr = (tag, name) => {
  // Deliberately not a regex: attribute lookup needs no escaping, and the
  // escaping is exactly what broke this helper before (an invalid template
  // escape collapsed to a literal 's', so every lookup returned null and
  // every element looked unnamed).
  const key = ' ' + name.toLowerCase() + '=';
  const hay = tag.toLowerCase();
  const i = hay.indexOf(key);
  if (i < 0) return null;
  const q = tag[i + key.length];
  if (q !== '"' && q !== "'") return null;
  const end = tag.indexOf(q, i + key.length + 1);
  return end < 0 ? null : tag.slice(i + key.length + 1, end);
};
const stripTags = (h) => h.replace(/<[^>]*>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim();

const files = walk(root).slice(0, limit);
const totals = { imgNoAlt: 0, ctrlNoName: 0, inputNoLabel: 0, dupIds: 0, noLang: 0, skipLink: 0 };
const examples = {};
const note = (k, msg) => { (examples[k] ||= []).length < 4 && examples[k].push(msg); };

for (const f of files) {
  const short = f.replace(root, '') || '/';
  // Next embeds the serialized RSC tree inside <script>self.__next_f.push(...)
  // blocks. That payload contains escaped markup, so scanning the raw file
  // counts elements that are data, not DOM. Strip script/style first.
  const html = fs
    .readFileSync(f, 'utf8')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '');

  if (!/<html[^>]*\slang=/i.test(html)) { totals.noLang++; note('noLang', short); }
  if (!/<a[^>]*href="#(main-content|main|content)"/i.test(html)) { totals.skipLink++; note('skipLink', short); }

  for (const m of html.matchAll(/<img\b[^>]*>/gi)) {
    const t = m[0];
    if (attr(t, 'alt') === null && attr(t, 'aria-hidden') !== 'true' && attr(t, 'role') !== 'presentation') {
      totals.imgNoAlt++; note('imgNoAlt', `${short}  src=${(attr(t, 'src') || '').slice(0, 60)}`);
    }
  }

  for (const m of html.matchAll(/<(a|button)\b([^>]*)>([\s\S]*?)<\/\1>/gi)) {
    const [, tagName, attrs, inner] = m;
    const open = `<${tagName}${attrs}>`;
    if (attr(open, 'aria-hidden') === 'true') continue;
    if (tagName.toLowerCase() === 'a' && attr(open, 'href') === null) continue;
    const name =
      (attr(open, 'aria-label') || '').trim() ||
      (attr(open, 'title') || '').trim() ||
      (attr(open, 'aria-labelledby') ? 'via-labelledby' : '') ||
      stripTags(inner) ||
      (inner.match(/<img\b[^>]*>/i) ? (attr(inner.match(/<img\b[^>]*>/i)[0], 'alt') || '').trim() : '');
    if (!name) {
      totals.ctrlNoName++;
      note('ctrlNoName', `${short}  <${tagName}> ${(attr(open, 'href') || attr(open, 'class') || '').slice(0, 50)}`);
    }
  }

  const labelFor = new Set([...html.matchAll(/<label\b[^>]*\sfor="([^"]*)"/gi)].map((m) => m[1]));
  for (const m of html.matchAll(/<(input|select|textarea)\b[^>]*>/gi)) {
    const t = m[0];
    const type = (attr(t, 'type') || '').toLowerCase();
    if (['hidden', 'submit', 'button', 'image', 'reset'].includes(type)) continue;
    // Radix renders a visually hidden native control purely so the value posts
    // with the form; it is aria-hidden and out of the tab order, so needs no label.
    if (attr(t, 'aria-hidden') === 'true' || attr(t, 'tabindex') === '-1') continue;
    const id = attr(t, 'id');
    if (attr(t, 'aria-label') || attr(t, 'aria-labelledby') || (id && labelFor.has(id))) continue;
    totals.inputNoLabel++;
    note('inputNoLabel', `${short}  <${m[1]} name=${attr(t, 'name') || '?'}>`);
  }

  const seen = new Set(); let dup = 0;
  for (const m of html.matchAll(/\sid="([^"]+)"/g)) {
    if (seen.has(m[1])) dup++; else seen.add(m[1]);
  }
  if (dup) { totals.dupIds += dup; note('dupIds', `${short}  ${dup} duplicate id(s)`); }
}

const LABELS = {
  imgNoAlt: 'images with no alt attribute',
  ctrlNoName: 'links/buttons with no accessible name',
  inputNoLabel: 'form fields with no label',
  dupIds: 'duplicate element ids',
  noLang: 'pages with no <html lang>',
  skipLink: 'pages with no skip link',
};

console.log(`Scanned ${files.length} built pages.\n`);
let failed = false;
for (const [k, v] of Object.entries(totals)) {
  console.log(`${String(v).padStart(6)}  ${LABELS[k]}`);
  if (v > 0) { failed = true; (examples[k] || []).forEach((e) => console.log(`          ${e}`)); }
}
process.exit(failed ? 1 : 0);
