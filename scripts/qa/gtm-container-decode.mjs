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

// Every tag, so a dependency between tags is visible rather than assumed.
//
// `setup_tags` matters more than it looks: a __awct conversion tag transports
// through a Google tag (__googtag) registered for its conversion ID, and GTM
// wires that as a setup tag — "fire tag N first, then me". Reading only the
// __awct tags and grepping for an AW- prefix misses it twice over, because the
// prefix is not stored (the ID is bare) and the dependency lives on the tag, not
// in the trigger. Both of those produced wrong conclusions here before.
console.log('All tags:');
tags.forEach((t, n) => {
  const id = t.vtp_tagId || t.vtp_conversionId || t.vtp_measurementId || '';
  const setup = (t.setup_tags || []).filter((x) => Array.isArray(x)).map((x) => `tag#${x[1]}`);
  console.log(
    `  tag#${String(n).padStart(2)}  ${String(t.function).padEnd(12)} ` +
    `${String(id).padEnd(18)}${setup.length ? '  setup→ ' + setup.join(', ') : ''}`
  );
});
console.log('');

// Google Ads Conversion Tracking tags and what fires them.
const adsTags = tags.map((t, idx) => ({ t, idx })).filter(({ t }) => t.function === '__awct');
console.log(`Google Ads Conversion Tracking tags: ${adsTags.length}`);
for (const { t, idx } of adsTags) {
  console.log(`\n  tag#${idx}  conversionId=${t.vtp_conversionId}  label=${t.vtp_conversionLabel ?? '(none)'}`);
  const firing = rules.filter((r) => {
    const adds = r.filter((c) => c[0] === 'add').flatMap((c) => c.slice(1));
    return adds.includes(idx);
  });
  // Whether a __googtag in THIS CONTAINER names this conversion's AW- destination.
  //
  // This question cannot be answered from the container, and two earlier versions
  // of this script pretended otherwise. A Google tag carries a list of
  // DESTINATIONS configured in the Google tag UI, not in GTM, and the container
  // stores only its primary id. Here, `__googtag G-XXHSYV3NMD` (the GA4 tag) loads
  // a Google tag whose destinations include BOTH AW-17270956371 and
  // AW-17988324873 — invisible in this JSON, and the reason the conversions sent
  // fine for months while this script reported "no Google tag".
  //
  // So treat "none in container" as "unknown", never as "cannot send". The only
  // thing that settles it is a network capture:
  // scripts/qa/prod-gtm-trigger-probe.mjs.
  //
  // (Note also that GTM stores the id bare — "17270956371", never "AW-…" — so
  // grepping a container for "AW-" finds nothing and reads as "no Ads tags".)
  const googTag = tags.findIndex(
    (x) => x.function === '__googtag' && String(x.vtp_tagId || '').replace(/^AW-/, '') === String(t.vtp_conversionId)
  );
  console.log(
    googTag === -1
      ? `    google tag: none named in container for AW-${t.vtp_conversionId} — UNKNOWN, not absent.` +
        `\n                A Google tag's destination list lives outside the container; verify by network capture.`
      : `    google tag: tag#${googTag} __googtag ${tags[googTag].vtp_tagId} (destinations still not visible here)`
  );

  // THIS is the line that actually matters, and the one that took longest to find.
  //
  // A setup tag GATES the tag it is attached to: GTM fires it first and holds the
  // conversion until it reports completion. One that never completes blocks the
  // conversion silently and forever, and the conversion then appears under "Tags
  // Not Fired" with a perfectly correct trigger — which reads as a trigger problem
  // and is not one.
  //
  // That is what stopped Florida form conversions on 22 September 2026: container
  // v37 attached a __awud user-data tag as a setup tag, and that tag waits on
  // dataLayer keys the site only pushes afterwards. Nothing about the conversion
  // tag itself was wrong, which is why it survived inspection for over a week.
  const setupRefs = (t.setup_tags || []).filter((x) => Array.isArray(x)).map((x) => x[1]);
  for (const s of setupRefs) {
    const st = tags[s];
    const what = st && st.function === '__awud'
      ? 'enhanced-conversions user data — GATES this conversion; check what it waits on below'
      : 'gates this conversion until it completes';
    console.log(`    setup tag: tag#${s} ${st ? st.function : '(missing)'} — ${what}`);
  }

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

// __awud = Google Ads User-Provided Data. It is wired as a SETUP tag on the
// conversion tags, which means GTM fires it first and holds the conversion until
// it reports completion. A __awud that never completes therefore blocks the
// conversion silently and indefinitely — the conversion shows under "Tags Not
// Fired" with a correctly-matching trigger, which looks like a trigger problem
// and is not one.
//
// What it reads decides whether that can happen in production or only under a
// synthetic probe: a tag reading dataLayer keys the site never sends will hang
// on every real lead too, while one reading page elements may resolve on a real
// submission and not on a bare dataLayer push.
console.log('');
console.log('--- RAW: the awud (user-provided data) tags, and what they read ---');
tags.forEach((t, idx) => {
  if (t.function !== '__awud') return;
  console.log(`tag#${idx}:`, JSON.stringify(t));
  // Follow macro references transitively: the tag points at one __awec variable,
  // which in turn points at one variable per user-data field. The field-level
  // variables are the interesting ones — they name the dataLayer keys the tag is
  // waiting for, which is what decides whether the site can ever satisfy it.
  const seen = new Set();
  const walk = (node, depth) => {
    JSON.stringify(node).replace(/\["macro",(\d+)\]/g, (_, s) => {
      const n = Number(s);
      if (seen.has(n)) return '';
      seen.add(n);
      console.log(`    ${'  '.repeat(depth)}macro#${n}: ${describeMacro(n)}`);
      if (macros[n] && macros[n].function !== '__v') walk(macros[n], depth + 1);
      return '';
    });
  };
  walk(t, 0);
});

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
