#!/usr/bin/env node
/**
 * Measurement-contract build gate.
 *
 * Runs in `prebuild`, so a build fails rather than shipping a regression in the
 * accepted-lead measurement path. This complements tests/measurement-*.test.ts:
 * the tests prove runtime behaviour, this proves structural invariants that a
 * well-meaning refactor could quietly break.
 *
 * Checks are deliberately tolerant of formatting — comments are stripped and
 * whitespace is normalised before matching — so reformatting the source never
 * fails the build, but a real change in meaning does.
 */
import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const TRACKING_MODULE = 'utils/enhancedConversions.ts';
const CONTRACT_MODULE = 'lib/lead-contract.ts';
const CANONICAL_EVENT = 'lead_form_submit_success';

const failures = [];
const fail = (check, detail) => failures.push({ check, detail });

const read = (relative) => readFile(path.join(ROOT, relative), 'utf8');

/** Removes line and block comments so prose can never satisfy or trip a check. */
function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/.*$/gm, '$1');
}

/**
 * Extracts a function body by brace matching, so nesting is handled correctly.
 *
 * The parameter list is skipped by paren-matching first: these functions take a
 * destructured object, so the first `{` after the name belongs to the params,
 * not the body.
 */
function extractFunctionBody(source, fnName) {
  const signature = new RegExp(`function\\s+${fnName}\\s*\\(`);
  const match = signature.exec(source);
  if (!match) return null;

  const openParen = source.indexOf('(', match.index);
  let parenDepth = 0;
  let closeParen = -1;
  for (let i = openParen; i < source.length; i += 1) {
    if (source[i] === '(') parenDepth += 1;
    else if (source[i] === ')') {
      parenDepth -= 1;
      if (parenDepth === 0) { closeParen = i; break; }
    }
  }
  if (closeParen === -1) return null;

  const openBrace = source.indexOf('{', closeParen);
  if (openBrace === -1) return null;

  let depth = 0;
  for (let i = openBrace; i < source.length; i += 1) {
    const char = source[i];
    if (char === '{') depth += 1;
    else if (char === '}') {
      depth -= 1;
      if (depth === 0) return source.slice(openBrace + 1, i);
    }
  }
  return null;
}

const CONSENT_GUARDS = /\b(hasMeasurementConsent|hasAnalyticsConsent|hasMarketingConsent|consentGranted|getConsentState|hasFunctionalConsent)\s*\(/;

async function checkAcceptedLeadIsConsentIndependent() {
  const source = stripComments(await read(TRACKING_MODULE));
  const body = extractFunctionBody(source, 'pushFormSubmit');

  if (!body) {
    fail('accepted-lead push is reachable',
      `could not locate pushFormSubmit in ${TRACKING_MODULE}; the gate cannot verify the contract`);
    return;
  }

  const pushIndex = body.search(/dataLayer\s*\.\s*push\s*\(\s*buildCanonicalLeadEvent/);
  if (pushIndex === -1) {
    fail('accepted-lead push exists',
      `pushFormSubmit no longer pushes buildCanonicalLeadEvent(...) to dataLayer`);
    return;
  }

  // Nothing consent-shaped may stand between entering the function and emitting
  // the business event. That gate is exactly the defect this file guards against.
  const beforePush = body.slice(0, pushIndex);
  const guard = CONSENT_GUARDS.exec(beforePush);
  if (guard) {
    fail('accepted-lead push is NOT gated behind consent',
      `${guard[1]}() is evaluated before the ${CANONICAL_EVENT} push in pushFormSubmit. ` +
      `The business event carries no PII and must fire for every server-accepted lead; ` +
      `consent governs tag behaviour via Google Consent Mode, not event creation.`);
  }

  // Enhanced identity, by contrast, MUST be consent-gated.
  const afterPush = body.slice(pushIndex);
  const identityCall = /\b(pushEC|persistEC|pushECSilent|captureAndPersistEC)\s*\(/.exec(afterPush);
  if (identityCall) {
    const beforeIdentity = afterPush.slice(0, identityCall.index);
    if (!/isAdvertisingAllowed\s*\(/.test(beforeIdentity)) {
      fail('enhanced user data stays consent-gated',
        `${identityCall[1]}() runs in pushFormSubmit without an isAdvertisingAllowed() ` +
        `guard ahead of it. Identity must still stop on an explicit refusal, even though ` +
        `undecided US visitors are now allowed.`);
    }
  }
}

async function checkSingleCanonicalPush() {
  const source = stripComments(await read(TRACKING_MODULE));
  const pushes = source.match(/dataLayer\s*\.\s*push\s*\(\s*buildCanonicalLeadEvent/g) || [];
  if (pushes.length !== 1) {
    fail('exactly one canonical accepted-lead push exists',
      `found ${pushes.length} canonical pushes in ${TRACKING_MODULE}; a submission path must emit through one place only`);
  }
}

async function checkEventShape() {
  const source = stripComments(await read(CONTRACT_MODULE));
  const body = extractFunctionBody(source, 'buildCanonicalLeadEvent');
  if (!body) {
    fail('canonical event builder exists', `could not locate buildCanonicalLeadEvent in ${CONTRACT_MODULE}`);
    return;
  }

  for (const required of ['market', 'submission_id', 'form_id', 'form_source', 'page_path']) {
    if (!new RegExp(`\\b${required}\\s*:`).test(body)) {
      fail('canonical event carries its required fields',
        `buildCanonicalLeadEvent does not set "${required}"`);
    }
  }

  // The market value must go through the uppercase-code normaliser. Assigning a
  // raw slug here is the regression that silently splits every market report.
  if (!/\bmarket\s*:\s*normalizeStateCode\s*\(/.test(body)) {
    fail('market uses the uppercase state-code contract',
      `market must be produced by normalizeStateCode(...) so it is FL/NJ/NY/PA/GA, never a slug like "new-jersey"`);
  }

  if (!/\bsubmission_id\s*:\s*\w/.test(body)) {
    fail('submission_id is server-issued',
      'submission_id must be assigned from the server-issued acceptance value');
  }

  const PHI_FIELDS = [
    'email', 'phone', 'phone_number', 'first_name', 'firstName', 'last_name', 'lastName',
    'name', 'dob', 'date_of_birth', 'reason', 'symptom', 'symptoms', 'diagnosis',
    'treatment', 'condition', 'insurance', 'payer', 'message', 'notes', 'comments',
    'landing_path',
  ];
  for (const field of PHI_FIELDS) {
    if (new RegExp(`\\b${field}\\s*:`).test(body)) {
      fail('no PHI-like field in the advertising payload',
        `buildCanonicalLeadEvent sets "${field}", which must never reach GA4 / Google Ads`);
    }
  }
}

async function checkLegacyEventNotRestored() {
  const files = await collectClientFiles();
  for (const { relative, source } of files) {
    const stripped = stripComments(source);
    if (/event\s*:\s*['"`]form_submit['"`]/.test(stripped) ||
        /push(Event|MarketingEvent)\s*\(\s*['"`]form_submit['"`]/.test(stripped)) {
      fail('obsolete form_submit is not restored',
        `${relative} pushes the retired "form_submit" event; ${CANONICAL_EVENT} is the single accepted-lead event`);
    }
  }
}

async function checkThankYouIsNotTheConversionSource() {
  const candidates = ['app/thank-you/page.tsx'];
  for (const relative of candidates) {
    let source;
    try {
      source = stripComments(await read(relative));
    } catch {
      continue;
    }
    const emitters = ['pushAcceptedLead', 'pushFormSubmit', CANONICAL_EVENT, 'restoreECFromSession'];
    for (const emitter of emitters) {
      if (source.includes(emitter)) {
        fail('thank-you navigation is not the conversion source',
          `${relative} references "${emitter}"; arriving at the page is not proof a lead was accepted ` +
          `(it is reachable by direct link, reload and back/forward)`);
      }
    }
  }
}

async function checkFormsShareOneSuccessPath() {
  const files = await collectClientFiles();
  const forms = files.filter(({ source }) => /\/api\/forms\//.test(source));

  if (forms.length < 10) {
    fail('the form inventory is discoverable',
      `expected at least 10 lead forms, found ${forms.length}; the gate may be scanning the wrong tree`);
  }

  for (const { relative, source } of forms) {
    const stripped = stripComments(source);
    if (!/pushAcceptedLead\s*\(/.test(stripped)) {
      fail('every form uses the shared success path',
        `${relative} posts a lead but never calls pushAcceptedLead`);
    }
    if (stripped.includes(CANONICAL_EVENT)) {
      fail('no form builds the canonical event itself',
        `${relative} references "${CANONICAL_EVENT}" directly instead of delegating to the shared helper`);
    }
    if (/dataLayer\s*\.\s*push/.test(stripped)) {
      fail('no form pushes to dataLayer directly',
        `${relative} pushes to dataLayer directly, creating a second success path`);
    }
  }
}

async function checkConsentModeDefaults() {
  const source = await read('app/layout.tsx');
  const blocks = [...source.matchAll(
    /gtag\s*\(\s*['"]consent['"]\s*,\s*['"]default['"]\s*,\s*\{([\s\S]*?)\}\s*\)/g,
  )].map((m) => m[1]);

  if (blocks.length < 2) {
    fail('Consent Mode declares a US default and an EEA carve-out',
      `expected TWO gtag("consent","default") blocks in app/layout.tsx — a granted ` +
      `global default and a denied region override for EEA/UK/CH — found ${blocks.length}`);
    return;
  }

  const globalBlock = blocks.find((b) => !/region\s*:/.test(b));
  const regionBlock = blocks.find((b) => /region\s*:/.test(b));

  if (!globalBlock || !regionBlock) {
    fail('Consent Mode declares a US default and an EEA carve-out',
      'could not distinguish the global default block from the region-scoped one');
    return;
  }

  const AD_SIGNALS = ['ad_storage', 'analytics_storage', 'ad_user_data', 'ad_personalization'];

  // US/global: granted. This is what makes an undecided US visitor measurable.
  for (const signal of AD_SIGNALS) {
    const setting = new RegExp(`${signal}\\s*:\\s*['"](\\w+)['"]`).exec(globalBlock);
    if (!setting) {
      fail('US visitors are measured by default', `${signal} is missing from the global consent default`);
    } else if (setting[1] !== 'granted') {
      fail('US visitors are measured by default',
        `${signal} defaults to "${setting[1]}". Owner decision 2026-09-21: US-only ` +
        `advertising, so the global default grants and only EEA/UK/CH is denied.`);
    }
  }

  // EEA/UK/CH: denied. Google's EU user consent policy still applies to them.
  for (const signal of AD_SIGNALS) {
    const setting = new RegExp(`${signal}\\s*:\\s*['"](\\w+)['"]`).exec(regionBlock);
    if (!setting || setting[1] !== 'denied') {
      fail('EEA, UK and Switzerland stay denied by default',
        `${signal} must be "denied" in the region-scoped default; found "${setting ? setting[1] : 'missing'}"`);
    }
  }

  // The carve-out must actually cover the consent-required regions.
  for (const code of ['GB', 'CH', 'DE', 'FR', 'IE', 'IT', 'ES', 'NL', 'SE', 'PL']) {
    if (!new RegExp(`['"]${code}['"]`).test(regionBlock)) {
      fail('EEA, UK and Switzerland stay denied by default',
        `region list is missing "${code}"`);
    }
  }

  // The runtime must not contradict the HTML default for an undecided visitor.
  const consent = stripComments(await read('lib/consent.ts'));
  const undecided = /undecidedConsentCategories[\s\S]*?\{([\s\S]*?)\}/.exec(consent);
  if (!undecided) {
    fail('the undecided runtime state matches the Consent Mode default',
      'lib/consent.ts no longer exports undecidedConsentCategories');
  } else {
    for (const cat of ['analytics', 'marketing']) {
      if (!new RegExp(`${cat}\\s*:\\s*true`).test(undecided[1])) {
        fail('the undecided runtime state matches the Consent Mode default',
          `undecidedConsentCategories.${cat} must be true, otherwise the Consent Mode ` +
          `update sent on mount denies and cancels the granted default`);
      }
    }
  }
}

let cachedFiles = null;
async function collectClientFiles() {
  if (cachedFiles) return cachedFiles;
  const out = [];

  async function walk(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) await walk(full);
      else if (/\.(ts|tsx)$/.test(entry.name)) {
        out.push({ relative: path.relative(ROOT, full).replace(/\\/g, '/'), source: await readFile(full, 'utf8') });
      }
    }
  }

  for (const dir of ['components', 'app', 'lib', 'utils']) {
    await walk(path.join(ROOT, dir));
  }
  cachedFiles = out;
  return out;
}

/**
 * Meta form-source triage.
 *
 * isMetaEligibleFormSource FAILS CLOSED: a source must be listed explicitly in
 * META_ELIGIBLE_FORM_SOURCES to produce a Meta Lead. That is only safe if every
 * form is actually triaged, so this check proves the two lists in
 * lib/route-privacy.ts partition FORM_SOURCES exactly — no gaps, no overlap.
 *
 * Adding a form to lib/lead-contract.ts therefore fails the build until someone
 * decides whether its SUBMISSION carries patient-specific clinical answers.
 */
function readListLiteral(source, name) {
  const match = new RegExp(`${name}\\s*=\\s*\\[([\\s\\S]*?)\\]\\s*as const`).exec(source);
  if (!match) return null;
  return [...match[1].matchAll(/['"]([a-z0-9-]+)['"]/g)].map((m) => m[1]);
}

async function checkMetaFormSourceTriage() {
  const contract = stripComments(await read(CONTRACT_MODULE));
  const privacy = stripComments(await read('lib/route-privacy.ts'));

  const all = readListLiteral(contract, 'FORM_SOURCES');
  const eligible = readListLiteral(privacy, 'META_ELIGIBLE_FORM_SOURCES');
  const ineligible = readListLiteral(privacy, 'META_INELIGIBLE_FORM_SOURCES');

  if (!all || all.length === 0) {
    fail('every form source is triaged for Meta', 'could not read FORM_SOURCES from lib/lead-contract.ts');
    return;
  }
  if (!eligible || !ineligible) {
    fail('every form source is triaged for Meta',
      'could not read META_ELIGIBLE_FORM_SOURCES / META_INELIGIBLE_FORM_SOURCES from lib/route-privacy.ts');
    return;
  }

  const eligibleSet = new Set(eligible);
  const ineligibleSet = new Set(ineligible);

  for (const source of all) {
    const inEligible = eligibleSet.has(source);
    const inIneligible = ineligibleSet.has(source);
    if (!inEligible && !inIneligible) {
      fail('every form source is triaged for Meta',
        `form source "${source}" is not triaged. Decide whether its SUBMISSION carries ` +
        `patient-specific clinical answers, then add it to META_INELIGIBLE_FORM_SOURCES ` +
        `(clinical) or META_ELIGIBLE_FORM_SOURCES (marketing) in lib/route-privacy.ts. ` +
        `Resolution fails closed, so an untriaged source would silently send no Meta Lead.`);
    }
    if (inEligible && inIneligible) {
      fail('every form source is triaged for Meta',
        `form source "${source}" is in BOTH the eligible and ineligible lists`);
    }
  }

  // Neither list may name a source that no longer exists.
  const allSet = new Set(all);
  for (const [listName, list] of [['META_ELIGIBLE_FORM_SOURCES', eligible], ['META_INELIGIBLE_FORM_SOURCES', ineligible]]) {
    for (const source of list) {
      if (!allSet.has(source)) {
        fail('every form source is triaged for Meta',
          `${listName} names "${source}", which is not in FORM_SOURCES`);
      }
    }
  }

  // The three clinical workflows must stay denied.
  for (const required of ['condition-check', 'candidacy-check', 'free-mri-review']) {
    if (!ineligibleSet.has(required)) {
      fail('clinical form sources stay denied',
        `"${required}" collects patient-specific clinical answers and must never produce a Meta Lead`);
    }
  }
}

/**
 * D10 (2026-09-24): a lead whose insurance is not accepted must not fire the
 * qualified conversion.
 *
 * Structural, not behavioural — tests/measurement-insurance-routing.test.ts
 * proves the runtime behaviour. This proves a refactor cannot quietly remove the
 * gate or reorder it after the push, which is the failure mode that would send
 * unqualified leads into Smart Bidding without any test necessarily noticing.
 */
const QUALIFICATION_GATE = /lead_qualification\s*===\s*['"]unqualified['"]/;

async function checkUnqualifiedLeadsDoNotConvert() {
  const source = stripComments(await read(TRACKING_MODULE));
  const body = extractFunctionBody(source, 'pushFormSubmit');

  if (!body) {
    fail('unqualified leads cannot fire the qualified conversion',
      `could not locate pushFormSubmit in ${TRACKING_MODULE}`);
    return;
  }

  const gate = QUALIFICATION_GATE.exec(body);
  if (!gate) {
    fail('unqualified leads cannot fire the qualified conversion',
      `pushFormSubmit no longer tests lead_qualification === 'unqualified'. ` +
      `Without that gate an "Other"-insurance lead fires the qualified conversion ` +
      `and corrupts Smart Bidding with leads the practice cannot serve (D10).`);
    return;
  }

  const pushIndex = body.search(/dataLayer\s*\.\s*push\s*\(\s*buildCanonicalLeadEvent/);
  if (pushIndex !== -1 && gate.index > pushIndex) {
    fail('unqualified leads cannot fire the qualified conversion',
      `the lead_qualification gate is evaluated AFTER the ${CANONICAL_EVENT} push, ` +
      `so the conversion has already fired by the time qualification is checked.`);
  }

  // The gate must actually stop execution, not merely branch around one call.
  const gateTail = body.slice(gate.index, gate.index + 200);
  if (!/\breturn\b/.test(gateTail)) {
    fail('unqualified leads cannot fire the qualified conversion',
      `the lead_qualification check does not return, so an unqualified lead can ` +
      `still reach the advertising surfaces below it.`);
  }
}

/**
 * The insurance answer must never become an advertising signal.
 *
 * Guards both directions: the tracking module must not import the option list or
 * carrier names, and the canonical payload builder must not learn an insurance
 * field. Qualification reaches the tracking module as an opaque
 * qualified/unqualified flag and nothing more.
 */
async function checkInsuranceStaysFirstParty() {
  const tracking = stripComments(await read(TRACKING_MODULE));
  const contract = stripComments(await read(CONTRACT_MODULE));

  const carriers = /\b(aetna|cigna|unitedhealthcare|blue\s*cross|bcbs|humana|medicaid|medicare)\b/i;
  for (const [label, source] of [[TRACKING_MODULE, tracking], [CONTRACT_MODULE, contract]]) {
    const hit = carriers.exec(source);
    if (hit) {
      fail('insurance selections stay first-party',
        `${label} names the carrier "${hit[1]}". Carrier names belong in ` +
        `lib/insurance-routing.ts and Supabase, never in the measurement path.`);
    }
    if (/insurance_type/.test(source)) {
      fail('insurance selections stay first-party',
        `${label} references insurance_type. The measurement path may only see ` +
        `the opaque lead_qualification flag.`);
    }
  }

  const builder = extractFunctionBody(contract, 'buildCanonicalLeadEvent');
  if (builder && /insurance/i.test(builder)) {
    fail('insurance selections stay first-party',
      `buildCanonicalLeadEvent mentions insurance; the advertising payload is a ` +
      `closed set of six operational keys and must not gain an insurance field.`);
  }
}

const CHECKS = [
  ['accepted-lead event is consent-independent', checkAcceptedLeadIsConsentIndependent],
  ['unqualified leads cannot fire the qualified conversion', checkUnqualifiedLeadsDoNotConvert],
  ['insurance selections stay first-party', checkInsuranceStaysFirstParty],
  ['exactly one canonical push per submission path', checkSingleCanonicalPush],
  ['canonical event shape and market contract', checkEventShape],
  ['obsolete form_submit stays retired', checkLegacyEventNotRestored],
  ['thank-you navigation is not the conversion source', checkThankYouIsNotTheConversionSource],
  ['all forms share one success path', checkFormsShareOneSuccessPath],
  ['Consent Mode US default + EEA carve-out', checkConsentModeDefaults],
  ['every form source is triaged for Meta', checkMetaFormSourceTriage],
];

async function main() {
  for (const [, check] of CHECKS) {
    await check();
  }

  if (failures.length === 0) {
    console.log(`measurement-contract: ${CHECKS.length} checks passed.`);
    return;
  }

  console.error(`\nmeasurement-contract: ${failures.length} violation(s).\n`);
  for (const { check, detail } of failures) {
    console.error(`  x ${check}`);
    console.error(`    ${detail}\n`);
  }
  process.exit(1);
}

main().catch((error) => {
  console.error('measurement-contract: validator crashed', error);
  process.exit(1);
});
