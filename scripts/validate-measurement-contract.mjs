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
        `guard ahead of it. Identity is sent only after the visitor accepts marketing.`);
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
  // Classify on code, not prose: lib/intake-submission.ts names the endpoints
  // in its doc comments in their doc comments without ever posting to one.
  const forms = files.filter(({ source }) => /\/api\/forms\//.test(stripComments(source)));

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

  if (blocks.length !== 1) {
    fail('Consent Mode declares one global denied default',
      `expected ONE gtag("consent","default") block in app/layout.tsx, found ${blocks.length}. ` +
      `A second (e.g. region-scoped) block could grant somewhere by default.`);
    return;
  }

  const [globalBlock] = blocks;
  if (/region\s*:/.test(globalBlock)) {
    fail('Consent Mode declares one global denied default',
      'the consent default is region-scoped; it must apply to every visitor');
  }

  // Opt-in: nothing optional is granted until the visitor accepts.
  const DENIED_SIGNALS = [
    'ad_storage', 'analytics_storage', 'ad_user_data', 'ad_personalization',
    'functionality_storage', 'personalization_storage',
  ];
  for (const signal of DENIED_SIGNALS) {
    const setting = new RegExp(`${signal}\\s*:\\s*['"](\\w+)['"]`).exec(globalBlock);
    if (!setting || setting[1] !== 'denied') {
      fail('visitors are not measured before they accept',
        `${signal} must default to "denied"; found "${setting ? setting[1] : 'missing'}". ` +
        `This is a healthcare site: tracking is opt-in.`);
    }
  }

  // The runtime must not contradict the HTML default for an undecided visitor.
  const consent = stripComments(await read('lib/consent.ts'));
  const undecided = /undecidedConsentCategories[\s\S]*?\{([\s\S]*?)\}/.exec(consent);
  if (!undecided) {
    fail('the undecided runtime state matches the Consent Mode default',
      'lib/consent.ts no longer exports undecidedConsentCategories');
  } else {
    for (const cat of ['analytics', 'marketing', 'functional']) {
      if (!new RegExp(`${cat}\\s*:\\s*false`).test(undecided[1])) {
        fail('the undecided runtime state matches the Consent Mode default',
          `undecidedConsentCategories.${cat} must be false, otherwise the Consent Mode ` +
          `update sent on mount grants and overrides the denied default`);
      }
    }
  }

  // Advertising code must require a stored acceptance, not merely the absence
  // of a refusal.
  const allowed = /export function isAdvertisingAllowed\s*\(\)\s*\{([\s\S]*?)\n\}/.exec(consent);
  if (!allowed || !/hasMarketingConsent\s*\(\)/.test(allowed[1]) || /return\s+true/.test(allowed[1])) {
    fail('advertising waits for an explicit Accept',
      'isAdvertisingAllowed() in lib/consent.ts must return hasMarketingConsent() ' +
      'and must not allow an undecided visitor');
  }

  // CallRail and Meta must not mount for an undecided visitor.
  const manager = stripComments(await read('components/CookieConsentManager.tsx'));
  if (/consent\s*===\s*null\s*\|\|/.test(manager)) {
    fail('advertising waits for an explicit Accept',
      'CookieConsentManager mounts an advertising script while consent is null (undecided)');
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


/**
 * ZIP must stay OUT of the intake path (Abubeckr, 2026-10-14, item 7: "Remove ZIP
 * code and best time to contact").
 *
 * This replaces the earlier "ZIP stays in the intake form" check, which encoded
 * the opposite decision. Structural: no intake form, intake endpoint, the shared
 * resolver, the staff email or the Supabase writer may collect, validate, send or
 * write a ZIP, and the shared ZIP module must not come back. The forms.postal_code
 * column itself is left in the database on purpose and is not checked here.
 * tests/measurement-intake-zip.test.ts proves the same rule at runtime.
 */
const INTAKE_FORM = 'components/ContactForm.tsx';
const INTAKE_ROUTE = 'app/api/forms/consultation/route.ts';
const PERSISTENCE_MODULE = 'components/email/sendcontactemail.ts';
const ZIP_MODULE = 'lib/postal-code.ts';
const RESOLVER_MODULE = 'lib/intake-submission.ts';
const STAFF_EMAIL_TEMPLATE = 'components/email/emailtemplate.tsx';

/**
 * Every form component that posts patient intake to one of the lead endpoints.
 *
 * All of them gate the qualified conversion, because all of them reach
 * pushAcceptedLead, whose `lead_qualification` DEFAULTS to 'qualified'. A form
 * added here but not wired would fire a qualified Google Ads conversion for an
 * "Other" lead and nothing would notice — the default is convenient for the
 * clinical questionnaires that do not ask about insurance, and dangerous for an
 * intake form that does.
 */
const INTAKE_FORMS = [
  'components/ContactForm.tsx',
  'components/BodyPartHeroForm.tsx',
  'components/MobileHeroMiniForm.tsx',
  'components/DoctorContactForm.tsx',
  'components/BookAnAppoitmentButton.tsx',
  'components/BookAnAppointmentPopup.tsx',
  'components/MiniContactForm.tsx',
  'components/StateHeroForm.tsx',
  'components/PatientAdvocateForm.tsx',
];

/**
 * Every form that must gate the qualified conversion on the server's decision.
 *
 * Wider than INTAKE_FORMS: the clinical questionnaires ask for insurance too and
 * reach pushAcceptedLead, so ungated they fire a qualified conversion for every
 * submission regardless of the plan selected.
 *
 * They are NOT in INTAKE_FORMS because the best-time invariant does not apply to
 * them — the 2026-09-24 meeting removed that field from the intake form, and a
 * clinical questionnaire asking when to call is a different question. Keeping the
 * two lists separate is what lets each rule have its own correct scope.
 */
/**
 * The four injury-page lead forms (2026-10-24, Abubeckr: "please update all of
 * them"). They post through the sendUserEmail server action rather than a route,
 * ask the same insurance question and an optional date of birth, and gate the
 * conversion like every other intake form. Kept out of INTAKE_FORMS because they
 * still ask injury-specific questions (pain level, attorney) that the best-time
 * and id-scoping rules were not written for.
 */
const INJURY_FORMS = [
  'app/injuries/car-accident/lead-capture-form.tsx',
  'app/injuries/personal-injury/lead-capture-form.tsx',
  'app/injuries/slip-and-fall/lead-capture-form.tsx',
  'app/injuries/work-injury/lead-capture-form.tsx',
];

const CONVERSION_GATED_FORMS = INTAKE_FORMS.concat([
  'components/CandidacyCheckClient.tsx',
  'components/ConditionCheckSection.tsx',
  'app/find-care/free-mri-review/FreeMRIReviewClient.tsx',
], INJURY_FORMS);

/** Every endpoint that accepts patient intake. */
const INTAKE_ROUTES = [
  'app/api/forms/consultation/route.ts',
  'app/api/forms/doctor/route.ts',
  'app/api/forms/book-appointment/route.ts',
  'app/api/forms/patient-advocate/route.ts',
];

async function checkZipStaysRemovedFromIntake() {
  const check = 'ZIP stays removed from intake';

  const zipPatterns = [
    [/postalCode/, 'references postalCode'],
    [/ZIP \/ Postal Code/i, 'labels a ZIP field'],
    [/autoComplete=["']postal-code["']/, 'renders a postal-code autofill input'],
    [/isValidPostalCode|normalizePostalCode|POSTAL_CODE_ERROR/, 'validates a ZIP'],
    [/@\/lib\/postal-code/, 'imports the removed ZIP module'],
  ];

  for (const label of [...INTAKE_FORMS, ...INTAKE_ROUTES, RESOLVER_MODULE, STAFF_EMAIL_TEMPLATE, PERSISTENCE_MODULE]) {
    const source = stripComments(await read(label));
    for (const [pattern, what] of zipPatterns) {
      if (pattern.test(source)) {
        fail(check, `${label} ${what}. ZIP was removed from the intake forms on 2026-10-14.`);
      }
    }
  }

  const persistence = stripComments(await read(PERSISTENCE_MODULE));
  if (/postal_code\s*:/.test(persistence)) {
    fail(check, `${PERSISTENCE_MODULE} still writes forms.postal_code.`);
  }

  try {
    await read(ZIP_MODULE);
    fail(check, `${ZIP_MODULE} exists again. ZIP is no longer collected, so the shared rule was removed.`);
  } catch {
    // Absent, as intended.
  }
}

/**
 * The intake insurance question is a NATIVE <select> (2026-10-14, item 9), with
 * the insurance answer kept out of every URL (item 12).
 *
 * Every intake form renders the shared components/InsuranceSelect.tsx and none
 * renders the custom Radix listbox for insurance. The shared component must be a
 * real <select> and must carry no `name`, so a submit before hydration (a plain
 * GET of the form) cannot write the answer into the address bar.
 */
const INSURANCE_SELECT_MODULE = 'components/InsuranceSelect.tsx';

async function checkInsuranceIsANativeSelect() {
  const check = 'insurance is a native select and never named';

  const component = stripComments(await read(INSURANCE_SELECT_MODULE));
  if (!/<select\b/.test(component)) {
    fail(check, `${INSURANCE_SELECT_MODULE} does not render a native <select>.`);
  }
  if (/\bname\s*=/.test(component)) {
    fail(check, `${INSURANCE_SELECT_MODULE} sets a name attribute; a pre-hydration GET would put the answer in the URL.`);
  }
  // getInsuranceOptions(extra) since 2026-10-26: the injury pages add one plan.
  if (!/getInsuranceOptions\((extra)?\)/.test(component)) {
    fail(check, `${INSURANCE_SELECT_MODULE} does not render the shared insurance options.`);
  }

  for (const label of INTAKE_FORMS) {
    const source = stripComments(await read(label));
    if (!/<InsuranceSelect\b/.test(source)) {
      fail(check, `${label} does not render the shared native InsuranceSelect.`);
    }
    if (/<SelectTrigger[^>]*insurance_type/.test(source)) {
      fail(check, `${label} still renders the custom listbox for insurance.`);
    }
    if (/name=["']insurance_type["']/.test(source)) {
      fail(check, `${label} names an insurance field; a pre-hydration GET would put the answer in the URL.`);
    }
  }
}

/**
 * The intake date of birth (2026-10-17) is patient personal data and stays
 * first-party: Supabase forms.date_of_birth and the staff email BODY, nothing else.
 *
 * Structural, both directions. The measurement path (tracking module, canonical
 * contract, Meta pixel) must not mention it at all. The shared input must be a
 * native date input with no `name` (a pre-hydration GET would put a named field in
 * the URL, item 12). Every intake form renders it, every intake endpoint normalises
 * it, and no email subject carries it.
 * tests/measurement-intake-dob.test.ts proves the same rule at runtime.
 */
const DATE_OF_BIRTH_INPUT_MODULE = 'components/DateOfBirthInput.tsx';
const META_PIXEL_MODULE = 'lib/meta-pixel.ts';

async function checkDateOfBirthStaysFirstParty() {
  const check = 'date of birth stays first-party and is never named';
  const dobPattern = /date_?of_?birth|dateOfBirth|\bdob\b|\bbday\b|birth_?date/i;

  for (const label of [TRACKING_MODULE, CONTRACT_MODULE, META_PIXEL_MODULE]) {
    const source = stripComments(await read(label));
    const hit = dobPattern.exec(source);
    if (hit) {
      fail(check, `${label} mentions "${hit[0]}". A date of birth must never reach GA4, Google Ads or Meta.`);
    }
  }

  const component = stripComments(await read(DATE_OF_BIRTH_INPUT_MODULE));
  if (!/type="date"/.test(component)) {
    fail(check, `${DATE_OF_BIRTH_INPUT_MODULE} is not a native date input.`);
  }
  if (/\bname\s*=/.test(component)) {
    fail(check, `${DATE_OF_BIRTH_INPUT_MODULE} sets a name attribute; a pre-hydration GET would put the date of birth in the URL.`);
  }

  // Every patient lead form: intake, injury pages and the three questionnaires
  // (date of birth added to the questionnaires 2026-10-24).
  for (const label of CONVERSION_GATED_FORMS) {
    const source = stripComments(await read(label));
    if (!/<DateOfBirthInput\b/.test(source)) {
      fail(check, `${label} does not render the shared DateOfBirthInput.`);
    }
    if (/name=["']date_of_birth["']/.test(source)) {
      fail(check, `${label} names a date of birth field; a pre-hydration GET would put it in the URL.`);
    }
    if (/pushAcceptedLead\([^)]*dateOfBirth/.test(source)) {
      fail(check, `${label} passes the date of birth to pushAcceptedLead.`);
    }
  }

  for (const label of INTAKE_ROUTES) {
    const source = stripComments(await read(label));
    if (!/normalizeDateOfBirth\(/.test(source)) {
      fail(check, `${label} does not normalise date_of_birth with lib/date-of-birth.ts.`);
    }
  }

  const persistence = stripComments(await read(PERSISTENCE_MODULE));
  for (const line of persistence.split(/\r?\n/)) {
    if (/subject\s*:/.test(line) && dobPattern.test(line)) {
      fail(check, `${PERSISTENCE_MODULE} puts the date of birth in an email subject: ${line.trim()}`);
    }
  }
  // Only the subject builder: resolveIntake takes the date of birth on purpose
  // since 2026-10-26, to route an under-20 lead as unqualified.
  const subjectBuilder = extractFunctionBody(stripComments(await read(RESOLVER_MODULE)), 'subjectWithInsurance');
  if (!subjectBuilder) {
    fail(check, `${RESOLVER_MODULE} no longer has subjectWithInsurance; update this check.`);
  } else if (dobPattern.test(subjectBuilder)) {
    fail(check, `${RESOLVER_MODULE} subjectWithInsurance mentions the date of birth; the subject must not carry it.`);
  }
}

/**
 * Every lead form posts, never GETs, if it is submitted before the page loads
 * (2026-10-26). A <form> with no method defaults to GET, so a tap before the
 * JavaScript loads wrote every named field (name, email, phone) into the URL,
 * where analytics records it as the page address. method="post" keeps the
 * fields in the request body.
 */
async function checkLeadFormsNeverGet() {
  const check = 'lead forms never submit as GET';
  for (const label of [...CONVERSION_GATED_FORMS, 'components/LawyerContactForm.tsx']) {
    const source = stripComments(await read(label));
    const tags = source.match(/<form(?=[\s>])[^>]*/g) || [];
    if (tags.length === 0) fail(check, `${label} has no <form> tag; update this check.`);
    for (const tag of tags) {
      if (!/method="post"/.test(tag)) {
        fail(check, `${label} has a <form> without method="post"; a submit before the page loads would put the fields in the URL.`);
      }
    }
  }
}

/**
 * "Best Time To Contact" must stay removed from the intake path.
 *
 * Scoped to intake on purpose: the MRI-review, candidacy and condition-check
 * forms still ask the question, and their `best_time` column keeps its history.
 */
async function checkBestTimeStaysRemovedFromIntake() {
  for (const label of [...INTAKE_FORMS, ...INTAKE_ROUTES]) {
    const source = stripComments(await read(label));
    if (/bestTime|best_time/i.test(source)) {
      fail('best time to contact stays removed from intake',
        `${label} references best time to contact, which the 2026-09-24 meeting removed.`);
    }
    if (/["']As Soon As Possible["']/.test(source)) {
      fail('best time to contact stays removed from intake',
        `${label} still offers the removed "best time" options.`);
    }
  }
}

/**
 * Every intake form must gate the qualified conversion on the server's decision.
 *
 * Checks the whole chain per form, because any one link breaks it silently:
 * the options must come from the shared config, the server's answer must be read,
 * it must be handed to pushAcceptedLead, and navigation must follow it rather than
 * going to /thank-you unconditionally.
 */
async function checkEveryIntakeFormGatesTheConversion() {
  const check = 'every intake form gates the qualified conversion';

  for (const label of CONVERSION_GATED_FORMS) {
    const source = stripComments(await read(label));

    if (!/getInsuranceOptions\(\)|<InsuranceSelect[\s/>]/.test(source)) {
      fail(check, `${label} does not render the shared insurance options.`);
    }
    if (!/parseLeadRouting\(/.test(source)) {
      fail(check, `${label} does not read the server's qualification decision.`);
    }
    if (!/lead_qualification:\s*qualification/.test(source)) {
      fail(check, `${label} does not pass lead_qualification to pushAcceptedLead, so ` +
        `it defaults to 'qualified' and an "Other" lead fires a Google Ads conversion.`);
    }
    if (!/pathForDestination\(/.test(source)) {
      fail(check, `${label} does not route by the server's destination.`);
    }
    if (/router\.push\(\s*['"]\/thank-you['"]\s*\)/.test(source)) {
      fail(check, `${label} still navigates unconditionally to the qualified thank-you page.`);
    }
    // The Response body is consumed once; passing the Response after reading it
    // yields a null acceptance and silently drops the conversion.
    if (/acceptance:\s*res\b/.test(source)) {
      fail(check, `${label} passes the Response to pushAcceptedLead after reading its body.`);
    }
  }

  // The questionnaires post through server actions rather than a route handler,
  // so their server-side decision lives in the action itself.
  const ACTIONS_MODULE = 'components/email/sendcontactemail.ts';
  const actions = stripComments(await read(ACTIONS_MODULE));
  const gatedActions = (actions.match(/resolveLeadRouting\(/g) || []).length;
  if (gatedActions < 3) {
    fail(check, `${ACTIONS_MODULE} resolves qualification for only ${gatedActions} of the ` +
      `3 questionnaire server actions (candidacy, condition check, MRI review).`);
  }

  for (const label of INTAKE_ROUTES) {
    const source = stripComments(await read(label));
    if (!/resolveIntake\(/.test(source)) {
      fail(check, `${label} does not resolve qualification server-side.`);
    }
    if (!/\.\.\.routing/.test(source)) {
      fail(check, `${label} does not return the routing decision to the browser.`);
    }
  }
}

/**
 * ZIP must not become an advertising event parameter.
 *
 * The canonical lead event is a closed set of operational keys. ZIP belongs in
 * the lead record, the staff email, and the separate Enhanced Conversions
 * identity payload (where Google's spec places postal_code) — never as a loose
 * parameter on the business event that GA4 and Google Ads report on.
 */
async function checkZipIsNotAnAdvertisingParameter() {
  const contract = stripComments(await read(CONTRACT_MODULE));
  const builder = extractFunctionBody(contract, 'buildCanonicalLeadEvent');

  if (builder && /postal|\bzip\b/i.test(builder)) {
    fail('ZIP is not an advertising parameter',
      `buildCanonicalLeadEvent mentions a postal code. The canonical payload is a ` +
      `closed set of operational keys and must not gain a ZIP field.`);
  }
  if (/postal|\bzip\b/i.test(contract)) {
    fail('ZIP is not an advertising parameter',
      `${CONTRACT_MODULE} references a postal code; the lead-event contract must not know about ZIP.`);
  }
}

/**
 * Element ids on the intake forms must be component-scoped.
 *
 * Several components render an insurance select (and, until 2026-10-14, a ZIP input). When
 * they all used the same bare id, any page rendering two of them held duplicate
 * ids — invalid HTML, and both `label[for]` and `getElementById` then resolve to
 * whichever copy comes first, which on the homepage is a lazily-mounted hidden
 * form. That produced a real mis-association and cost real debugging time.
 */
async function checkFormElementIdsAreScoped() {
  const check = 'intake form element ids are component-scoped';
  const bare = [/id="postal_code"/, /id="insurance_type"/];

  const seen = new Map();
  for (const label of CONVERSION_GATED_FORMS) {
    const source = stripComments(await read(label));

    for (const pattern of bare) {
      // ContactForm legitimately owns the unprefixed `insurance_type` id — it is
      // the canonical intake form and the harnesses key on it — so it is the one
      // permitted holder. Everything else must be prefixed.
      if (pattern.source.includes('insurance_type') && label === INTAKE_FORM) continue;
      if (pattern.test(source)) {
        fail(check, `${label} uses a bare ${pattern.source}; scope it to the component ` +
          `(e.g. doctor_postal_code) so two forms on one page cannot collide.`);
      }
    }

    for (const m of source.matchAll(/id="([a-z0-9_]+)"/g)) {
      const id = m[1];
      if (!/_postal_code$|_insurance_type$|^insurance_type$/.test(id)) continue;
      if (seen.has(id) && seen.get(id) !== label) {
        fail(check, `id "${id}" is rendered by both ${seen.get(id)} and ${label}; ` +
          `a page showing both would contain duplicate ids.`);
      }
      seen.set(id, label);
    }
  }
}

const CHECKS = [
  ['accepted-lead event is consent-independent', checkAcceptedLeadIsConsentIndependent],
  ['unqualified leads cannot fire the qualified conversion', checkUnqualifiedLeadsDoNotConvert],
  ['insurance selections stay first-party', checkInsuranceStaysFirstParty],
  ['ZIP stays removed from intake', checkZipStaysRemovedFromIntake],
  ['insurance is a native select and never named', checkInsuranceIsANativeSelect],
  ['date of birth stays first-party and is never named', checkDateOfBirthStaysFirstParty],
  ['lead forms never submit as GET', checkLeadFormsNeverGet],
  ['best time to contact stays removed from intake', checkBestTimeStaysRemovedFromIntake],
  ['every intake form gates the qualified conversion', checkEveryIntakeFormGatesTheConversion],
  ['intake form element ids are component-scoped', checkFormElementIdsAreScoped],
  ['ZIP is not an advertising parameter', checkZipIsNotAnAdvertisingParameter],
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
