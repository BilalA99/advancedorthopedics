/**
 * Decodes the PUBLISHED GTM container and explains why a given dataLayer event
 * does or does not fire each Google Ads conversion tag.
 *
 * The published container is public JavaScript (gtm.js?id=…), and it carries the
 * live tag/trigger/variable graph — the same thing the UI shows, minus the names.
 * That makes it the authoritative answer to "what is ACTUALLY live right now",
 * independent of unpublished workspace edits or anyone's memory of what they
 * changed.
 *
 * Structure inside `var data = { ... }`:
 *   resource.macros     — variables (v: type, e.g. "v" = data layer variable)
 *   resource.tags       — tags (function: "__awct" = Google Ads Conversion Tracking)
 *   resource.predicates — conditions ({function: "_eq", arg0: macro ref, arg1: value})
 *   resource.rules      — [[predicate refs...], [tag refs...]] bindings
 *
 * Usage: node scripts/qa/gtm-container-decode.mjs <GTM-ID>
 */
const ID = process.argv[2] || 'GTM-T57SB8NQ';

const js = await (await fetch(`https://www.googletagmanager.com/gtm.js?id=${ID}`)).text();

// The container payload is assigned to a local `var data = {...};` — extract it by
// brace-matching from the first "{" after the assignment rather than regex, since
// the object contains nested braces and quoted braces.
const startKey = js.indexOf('var data = {');
if (startKey === -1) {
  console.error('Could not find the container payload in gtm.js — Google changed the shape.');
  process.exit(2);
}
let i = js.indexOf('{', startKey);
let depth = 0, inStr = false, esc = false, quote = '';
let end = -1;
for (let j = i; j < js.length; j++) {
  const c = js[j];
  if (inStr) {
    if (esc) { esc = false; continue; }
    if (c === '\\') { esc = true; continue; }
    if (c === quote) inStr = false;
    continue;
  }
  if (c === '"' || c === "'") { inStr = true; quote = c; continue; }
  if (c === '{') depth++;
  else if (c === '}') { depth--; if (depth === 0) { end = j + 1; break; } }
}
const raw = js.slice(i, end);

let data;
try {
  data = JSON.parse(raw);
} catch {
  // Some containers use single quotes / unquoted keys; fall back to evaluating the
  // literal. The source is Google's own CDN over TLS, and this is read-only.
  data = Function('"use strict"; return (' + raw + ');')();
}

const res = data.resource || {};
const macros = res.macros || [];
const tags = res.tags || [];
const predicates = res.predicates || [];
const rules = res.rules || [];

console.log(`\nPublished container ${ID}`);
console.log(`  macros: ${macros.length}  tags: ${tags.length}  predicates: ${predicates.length}  rules: ${rules.length}\n`);

const describeMacro = (n) => {
  const m = macros[n];
  if (!m) return `macro#${n}`;
  if (m.function === '__v' && m.vtp_name) return `dataLayer["${m.vtp_name}"]`;
  if (m.function === '__v') return `builtin(${m.vtp_dataLayerVersion ? 'dlv' : m.vtp_gtmEventId ? 'event' : 'v'})`;
  if (m.function === '__e') return 'event name';
  if (m.function === '__c') return `const(${JSON.stringify(m.vtp_value)})`;
  return `${m.function}#${n}`;
};

const describePredicate = (n) => {
  const p = predicates[n];
  if (!p) return `pred#${n}`;
  const left = typeof p.arg0 === 'string' && /^\{\{/.test(p.arg0)
    ? describeMacro(Number(p.arg0.replace(/[^0-9]/g, '')))
    : JSON.stringify(p.arg0);
  const fn = { _eq: '==', _cn: 'contains', _sw: 'startsWith', _ew: 'endsWith', _re: 'matches', _lt: '<', _gt: '>' }[p.function] || p.function;
  return `${left} ${fn} ${JSON.stringify(p.arg1)}`;
};

// Google Ads Conversion Tracking tags and what fires them.
const adsTags = tags.map((t, idx) => ({ t, idx })).filter(({ t }) => t.function === '__awct');
console.log(`Google Ads Conversion Tracking tags: ${adsTags.length}`);
for (const { t, idx } of adsTags) {
  console.log(`\n  tag#${idx}  conversionId=${t.vtp_conversionId}  label=${t.vtp_conversionLabel ?? '(none)'}`);
  const firing = rules.filter((r) => {
    const adds = r.filter((c) => c[0] === 'add').flatMap((c) => c.slice(1));
    return adds.includes(idx);
  });
  if (!firing.length) {
    console.log('    FIRING TRIGGERS: none — this tag is published but nothing fires it.');
    continue;
  }
  for (const r of firing) {
    const conds = r.filter((c) => c[0] === 'if').flatMap((c) => c.slice(1));
    const unless = r.filter((c) => c[0] === 'unless').flatMap((c) => c.slice(1));
    console.log('    fires when ALL of:');
    for (const c of conds) console.log(`      - ${describePredicate(c)}`);
    for (const c of unless) console.log(`      - NOT (${describePredicate(c)})   <-- blocking exception`);
  }
}

// Raw definitions for the pieces the Ads tags depend on, so a subtle
// misconfiguration (wrong dataLayer version, a default value, a blocking rule)
// is visible rather than inferred.
console.log('');
console.log("--- RAW: macros referenced by the Ads predicates ---");
for (const n of [0, 5]) {
  console.log(`macro#${n}:`, JSON.stringify(macros[n]));
}
console.log('');
console.log("--- RAW: every rule that mentions an awct tag ---");
const adsIdx = adsTags.map(({ idx }) => idx);
rules.forEach((r, n) => {
  const touched = r.filter((c) => c[0] === 'add').flatMap((c) => c.slice(1)).filter((x) => adsIdx.includes(x));
  if (touched.length) console.log(`rule#${n}:`, JSON.stringify(r));
});
console.log('');
console.log("--- RAW: the awct tag definitions ---");
for (const { t, idx } of adsTags) {
  const copy = { ...t };
  console.log(`tag#${idx}:`, JSON.stringify(copy));
}

// Every predicate that mentions a lead event or a market, for orientation.
console.log('\nPredicates mentioning lead_form_submit_success or market:');
predicates.forEach((p, n) => {
  const s = describePredicate(n);
  if (/lead_form_submit_success|market/i.test(s)) console.log(`  pred#${n}: ${s}`);
});

console.log('\nData-layer variables the container reads:');
macros.forEach((m, n) => {
  if (m.function === '__v' && m.vtp_name) console.log(`  macro#${n}: dataLayer["${m.vtp_name}"]`);
});
