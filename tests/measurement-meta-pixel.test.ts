/**
 * Meta Pixel adapter contract.
 *
 * Proves the advertising layer stays subordinate to the application layer:
 * Meta fires only on a confirmed server acceptance, only with advertising
 * consent, only on eligible routes and form sources, only once, and never with
 * identity or clinical data attached.
 */
import assert from 'node:assert/strict';
import test, { beforeEach } from 'node:test';
import { JSDOM } from 'jsdom';

import { CANONICAL_LEAD_EVENT } from '../lib/lead-contract';
import { CONSENT_STORAGE_KEY, CONSENT_VERSION } from '../lib/consent';
import {
  isMetaEligibleRoute,
  isSensitivePath,
  hasSensitiveQuery,
  isMetaEligibleFormSource,
} from '../lib/route-privacy';

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'https://mountainspineorthopedics.com/',
});
Object.defineProperty(globalThis, 'window', { value: dom.window, configurable: true });
Object.defineProperty(globalThis, 'document', { value: dom.window.document, configurable: true });

type FbqCall = unknown[];
type TestWindow = typeof window & {
  fbq?: ((...a: unknown[]) => void) & { queue?: unknown[] };
  __msoMetaInitialized?: boolean;
  dataLayer: Array<Record<string, unknown>>;
  __fbqCalls: FbqCall[];
};

const w = () => window as TestWindow;
const fbqCalls = () => w().__fbqCalls;
const metaEvents = (name: string) =>
  fbqCalls().filter((c) => c[0] === 'track' && c[1] === name);
const dataLayer = () => w().dataLayer;
const canonical = () => dataLayer().filter((e) => e.event === CANONICAL_LEAD_EVENT);

function setConsent(analytics: boolean, marketing: boolean) {
  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({
    version: CONSENT_VERSION,
    timestamp: '2026-09-20T00:00:00.000Z',
    categories: { necessary: true, analytics, marketing, functional: false },
  }));
}

/** Stands in for a loaded fbevents.js, recording every call. */
function installFakeFbq() {
  w().__fbqCalls = [];
  const fn = (...args: unknown[]) => { w().__fbqCalls.push(args); };
  w().fbq = fn as TestWindow['fbq'];
}

function goto(path: string, search = '') {
  window.history.replaceState({}, '', `${path}${search}`);
}

let seq = 0;
const uniqueId = (p: string) => `${p}-${++seq}`;

const IDENTITY = {
  email: 'patient@example.com',
  phone: '5615551212',
  firstName: 'Pat',
  lastName: 'Example',
};

function clearCookies() {
  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.split('=')[0]?.trim();
    if (name) document.cookie = `${name}=; Max-Age=0; path=/`;
  });
}

beforeEach(() => {
  window.localStorage.clear();
  window.sessionStorage.clear();
  clearCookies();
  w().dataLayer = [];
  w().__msoMetaInitialized = false;
  installFakeFbq();
  goto('/');
});

// ---------------------------------------------------------------------------
// Route + query privacy policy
// ---------------------------------------------------------------------------

test('only genuinely non-public surfaces are route-excluded', () => {
  for (const path of ['/internal', '/internal/review-links']) {
    assert.equal(isSensitivePath(path), true, `${path} must be sensitive`);
    assert.equal(isMetaEligibleRoute(path, ''), false, `${path} must be ineligible`);
  }
});

test('public assessment landing pages stay measurable', () => {
  // Landing on a page that OFFERS a symptom checker reveals nothing about the
  // visitor — these are paid-media destinations. Only the SUBMISSION is
  // restricted (see the form-source tests below).
  for (const path of [
    '/condition-check',
    '/find-care/candidacy-check',
    '/find-care/free-mri-review',
    // A public page offering blank new-patient packets for download. It
    // collects nothing and must not be excluded.
    '/patient-forms',
  ]) {
    assert.equal(isMetaEligibleRoute(path, ''), true, `${path} must stay eligible`);
  }
});

test('public marketing and content routes remain eligible', () => {
  const allowed = [
    '/',
    '/locations/new-jersey/paramus-orthopedics',
    '/lp/adult-scoliosis-treatment',
    '/conditions/sciatica',
    '/treatments/orthopedic-injections',
    '/find-care/book-an-appointment',
    '/about/meetourdoctors/john-doe',
  ];
  for (const path of allowed) {
    assert.equal(isMetaEligibleRoute(path, ''), true, `${path} should stay eligible`);
  }
});

test('the public ?data= content filter stays measurable', () => {
  // /conditions?data={"tags":["Spine"]} is a PUBLIC BROWSE FILTER linked from
  // HomePageUI, NavBar, ServicesAndExpertiseSection and HomeInteractiveAnatomy.
  // It is equivalent to the path /conditions/sciatica, which is eligible;
  // excluding one while allowing the other was incoherent and cost real
  // paid-media measurement.
  const search = `?data=${encodeURIComponent(JSON.stringify({ tags: ['Spine'] }))}`;
  assert.equal(hasSensitiveQuery(search), false);
  assert.equal(isMetaEligibleRoute('/conditions', search), true);
  assert.equal(isMetaEligibleRoute('/treatments', `?data=${encodeURIComponent('{"key":"knee"}')}`), true);
});

test('campaign parameters never block tracking', () => {
  assert.equal(
    isMetaEligibleRoute('/', '?utm_source=meta&utm_medium=paid_social&fbclid=abc&meta_ad_id=123'),
    true,
  );
});

// ---------------------------------------------------------------------------
// Form-source policy
// ---------------------------------------------------------------------------

test('clinical assessment form sources can never produce a Meta Lead', () => {
  for (const source of ['free-mri-review', 'candidacy-check', 'condition-check']) {
    assert.equal(isMetaEligibleFormSource(source), false, source);
  }
});

test('every form source is eligible unless clinical or already Meta-attributed', async () => {
  const { FORM_SOURCES } = await import('../lib/lead-contract');
  // Suppression has exactly two causes, and they are not the same thing.
  const clinical = new Set(['condition-check', 'candidacy-check', 'free-mri-review']);
  // Captured by Meta itself, so Meta has already counted that conversion.
  // Reporting it back as a website Lead would double-count one lead per ad.
  const alreadyAttributedByMeta = new Set(['meta-instant-form']);
  for (const source of FORM_SOURCES) {
    const suppressed = clinical.has(source) || alreadyAttributedByMeta.has(source);
    assert.equal(
      isMetaEligibleFormSource(source), !suppressed,
      `${source} eligibility is wrong`,
    );
  }
  // A lead is never suppressed for the PAGE it came from — only for the
  // workflow it used. A consultation on a condition page is a full Meta Lead.
  assert.equal(isMetaEligibleFormSource('body-part-consultation'), true);
  assert.equal(isMetaEligibleFormSource('paid-landing'), true);
});

test('an unknown or missing form source fails CLOSED', () => {
  // Resolution is an explicit allow list. This cannot silently cost signal,
  // because the build gate fails unless the eligible and ineligible lists
  // partition FORM_SOURCES exactly.
  assert.equal(isMetaEligibleFormSource(undefined), false);
  assert.equal(isMetaEligibleFormSource(''), false);
  assert.equal(isMetaEligibleFormSource('some-new-contact-form'), false);
  assert.equal(isMetaEligibleFormSource('CONDITION-CHECK'), false, 'case-insensitive deny');
  assert.equal(isMetaEligibleFormSource('BOOK-APPOINTMENT'), true, 'case-insensitive allow');
});

test('the eligible and ineligible lists partition FORM_SOURCES exactly', async () => {
  const { FORM_SOURCES } = await import('../lib/lead-contract');
  const { META_ELIGIBLE_FORM_SOURCES, META_INELIGIBLE_FORM_SOURCES } =
    await import('../lib/route-privacy');

  const eligible = new Set<string>(META_ELIGIBLE_FORM_SOURCES);
  const ineligible = new Set<string>(META_INELIGIBLE_FORM_SOURCES);

  for (const source of FORM_SOURCES) {
    const inE = eligible.has(source);
    const inI = ineligible.has(source);
    assert.equal(inE || inI, true, `"${source}" is not triaged for Meta`);
    assert.equal(inE && inI, false, `"${source}" is in both lists`);
  }
  const all = new Set<string>(FORM_SOURCES);
  for (const source of [...eligible, ...ineligible]) {
    assert.equal(all.has(source), true, `"${source}" is not a real form source`);
  }
  assert.equal(eligible.size + ineligible.size, FORM_SOURCES.length);
});

// ---------------------------------------------------------------------------
// Adapter guards
// ---------------------------------------------------------------------------

test('an UNDECIDED visitor is not tracked — silence is not consent', async () => {
  const meta = await import('../lib/meta-pixel');
  // Banner ignored: nothing stored.
  assert.equal(window.localStorage.getItem(CONSENT_STORAGE_KEY), null);
  assert.equal(meta.isMetaAllowed(), false);
  assert.equal(meta.initMetaPixel(), false);
  assert.equal(meta.trackMetaLead('lead-undecided'), false);
  assert.equal(meta.trackMetaContact('contact-undecided'), false);
  assert.equal(fbqCalls().length, 0, 'nothing may be dispatched to Meta before Accept');
});

test('an EXPLICIT rejection blocks init and every event', async () => {
  const meta = await import('../lib/meta-pixel');
  setConsent(false, false);
  assert.equal(meta.isMetaAllowed(), false);
  assert.equal(meta.initMetaPixel(), false);
  assert.equal(meta.trackMetaLead('lead-1'), false);
  assert.equal(meta.trackMetaContact('contact-1'), false);
  assert.equal(fbqCalls().length, 0, 'nothing may be dispatched to Meta');
});

test('analytics-only consent is an explicit refusal of marketing', async () => {
  const meta = await import('../lib/meta-pixel');
  setConsent(true, false);
  assert.equal(meta.isMetaAllowed(), false);
  assert.equal(meta.initMetaPixel(), false);
  assert.equal(fbqCalls().length, 0);
});

test('marketing consent initializes once and fires exactly one PageView', async () => {
  const meta = await import('../lib/meta-pixel');
  setConsent(true, true);

  assert.equal(meta.initMetaPixel(), true);
  // Repeated calls (Strict Mode, rerender, Script onLoad) must be no-ops.
  assert.equal(meta.initMetaPixel(), true);
  assert.equal(meta.initMetaPixel(), true);

  const inits = fbqCalls().filter((c) => c[0] === 'init');
  assert.equal(inits.length, 1, 'exactly one init');
  assert.equal(inits[0][1], '1114353070995808', 'correct pixel id');
  assert.equal(inits[0].length, 2, 'init must carry NO advanced-matching object');
  assert.equal(metaEvents('PageView').length, 1, 'exactly one PageView');
});

test('init is suppressed entirely on a sensitive route', async () => {
  const meta = await import('../lib/meta-pixel');
  setConsent(true, true);
  goto('/internal/review-links');
  assert.equal(meta.isMetaAllowed(), false);
  assert.equal(meta.initMetaPixel(), false);

  // No pixel initialization and no tracking event may occur. A
  // `consent revoke` IS expected and desirable here once the history guard is
  // installed — navigating into a clinical route must actively tell an
  // already-resident fbevents.js to stop, not merely stay quiet.
  assert.equal(fbqCalls().filter((c) => c[0] === 'init').length, 0, 'no init');
  assert.equal(fbqCalls().filter((c) => c[0] === 'track').length, 0, 'no tracking event');
  const nonConsent = fbqCalls().filter((c) => c[0] !== 'consent');
  assert.equal(nonConsent.length, 0, `only consent calls allowed, saw ${JSON.stringify(nonConsent)}`);
});

test('revoking consent stops dispatch and allows a clean re-init later', async () => {
  const meta = await import('../lib/meta-pixel');
  setConsent(true, true);
  meta.initMetaPixel();
  assert.equal(metaEvents('PageView').length, 1);

  setConsent(true, false);
  meta.revokeMetaConsent();
  assert.deepEqual(fbqCalls().at(-1), ['consent', 'revoke']);
  assert.equal(meta.trackMetaLead('lead-after-revoke'), false, 'no events after revoke');
  assert.equal(metaEvents('Lead').length, 0);
});

test('a missing pixel never throws — ad blocker safety', async () => {
  const meta = await import('../lib/meta-pixel');
  setConsent(true, true);
  delete w().fbq;
  w().__msoMetaInitialized = false;
  // Must not throw, must report failure honestly.
  assert.doesNotThrow(() => meta.trackMetaLead('lead-x'));
  assert.doesNotThrow(() => meta.trackMetaContact('contact-x'));
  assert.equal(meta.trackMetaLead('lead-x'), false);
});

test('opaque event ids carry no PII and are unique', async () => {
  const meta = await import('../lib/meta-pixel');
  const ids = new Set(Array.from({ length: 50 }, () => meta.createOpaqueEventId('contact')));
  assert.equal(ids.size, 50, 'ids must be unique');
  for (const id of ids) {
    for (const pii of Object.values(IDENTITY)) {
      assert.equal(id.includes(pii), false);
    }
    assert.match(id, /^contact_[A-Za-z0-9-]+$/);
  }
});

// ---------------------------------------------------------------------------
// End-to-end through the real canonical funnel
// ---------------------------------------------------------------------------

test('an accepted generic lead produces exactly one Meta Lead with no PII', async () => {
  const { pushAcceptedLead } = await import('../utils/enhancedConversions');
  const meta = await import('../lib/meta-pixel');
  setConsent(true, true);
  goto('/find-care/book-an-appointment');
  meta.initMetaPixel();

  const submissionId = uniqueId('meta-lead');
  const lead = {
    acceptance: { ok: true, submissionId },
    form_name: 'DoctorContactForm',
    form_source: 'book-appointment' as const,
    state: 'florida',
    ...IDENTITY,
  };

  assert.equal(await pushAcceptedLead(lead), true);
  // Rerender / double-click replay of the same accepted submission.
  await pushAcceptedLead(lead);
  await pushAcceptedLead(lead);

  const leads = metaEvents('Lead');
  assert.equal(leads.length, 1, 'exactly one Meta Lead per accepted submission');

  const [, , customData, options] = leads[0] as [string, string, Record<string, unknown>, Record<string, unknown>];
  assert.deepEqual(customData, {}, 'custom_data must be empty');
  assert.deepEqual(options, { eventID: submissionId }, 'eventID must be the server submission id');

  // Nothing identifying or clinical anywhere in what Meta received.
  const serialized = JSON.stringify(fbqCalls());
  for (const value of Object.values(IDENTITY)) {
    assert.equal(serialized.includes(value), false, `plaintext ${value} must not reach Meta`);
  }
  for (const word of ['florida', 'FL', 'DoctorContactForm', 'book-appointment', 'market', 'reason']) {
    assert.equal(serialized.includes(word), false, `"${word}" must not reach Meta`);
  }
});

test('clinical form submissions produce zero Meta Leads but still convert first-party', async () => {
  const { pushAcceptedLead } = await import('../utils/enhancedConversions');
  const meta = await import('../lib/meta-pixel');
  setConsent(true, true);
  goto('/');            // eligible route, so only the form source can block it
  meta.initMetaPixel();

  for (const form_source of ['free-mri-review', 'candidacy-check', 'condition-check'] as const) {
    await pushAcceptedLead({
      acceptance: { ok: true, submissionId: uniqueId(form_source) },
      form_name: 'ClinicalForm',
      form_source,
      state: 'new-jersey',
      ...IDENTITY,
    });
  }

  assert.equal(metaEvents('Lead').length, 0, 'no clinical assessment may reach Meta');
  // ...but the business still measures them internally.
  assert.equal(canonical().length, 3, 'first-party conversion is unaffected');
});

test('a rejected submission produces no Meta Lead', async () => {
  const { pushAcceptedLead } = await import('../utils/enhancedConversions');
  const meta = await import('../lib/meta-pixel');
  setConsent(true, true);
  meta.initMetaPixel();

  await pushAcceptedLead({ acceptance: null, form_name: 'ContactForm', form_source: 'general-contact', state: 'FL' });
  await pushAcceptedLead({
    acceptance: new Response(JSON.stringify({ ok: false }), { status: 500, headers: { 'content-type': 'application/json' } }),
    form_name: 'ContactForm', form_source: 'general-contact', state: 'FL',
  });

  assert.equal(metaEvents('Lead').length, 0);
  assert.equal(canonical().length, 0);
});

test('the canonical Google event fires regardless of Meta state', async () => {
  const { pushAcceptedLead } = await import('../utils/enhancedConversions');
  // Explicit refusal — Meta must stay silent, the business event must not.
  setConsent(false, false);
  const submissionId = uniqueId('google-regression');
  await pushAcceptedLead({
    acceptance: { ok: true, submissionId },
    form_name: 'ContactForm',
    form_source: 'general-contact',
    state: 'georgia',
    ...IDENTITY,
  });

  assert.equal(canonical().length, 1, 'Google/GA4 base event still fires');
  assert.equal(canonical()[0].market, 'GA');
  assert.equal(canonical()[0].submission_id, submissionId);
  assert.equal(fbqCalls().length, 0, 'Meta stays silent after an explicit refusal');
});

test('a Meta failure cannot break the lead or the canonical event', async () => {
  const { pushAcceptedLead } = await import('../utils/enhancedConversions');
  const meta = await import('../lib/meta-pixel');
  setConsent(true, true);
  meta.initMetaPixel();

  // Simulate fbevents.js throwing on every call.
  w().fbq = (() => { throw new Error('pixel exploded'); }) as TestWindow['fbq'];

  const submissionId = uniqueId('meta-throws');
  const accepted = await pushAcceptedLead({
    acceptance: { ok: true, submissionId },
    form_name: 'ContactForm',
    form_source: 'general-contact',
    state: 'pennsylvania',
    ...IDENTITY,
  });

  assert.equal(accepted, true, 'the form must still see success');
  assert.equal(canonical().length, 1, 'the canonical event must still fire');
  assert.equal(canonical()[0].market, 'PA');
});

test('phone clicks emit one Meta Contact with no number attached', async () => {
  const { pushPhoneClickEvent } = await import('../utils/enhancedConversions');
  const meta = await import('../lib/meta-pixel');
  setConsent(true, true);
  meta.initMetaPixel();

  pushPhoneClickEvent({ market: 'NJ', business_number: '+19732596756', page_path: '/locations/new-jersey' });

  const contacts = metaEvents('Contact');
  assert.equal(contacts.length, 1, 'one Contact per phone click');
  const [, , customData] = contacts[0] as [string, string, Record<string, unknown>];
  assert.deepEqual(customData, {}, 'no parameters on Contact');

  const serialized = JSON.stringify(fbqCalls());
  assert.equal(serialized.includes('9732596756'), false, 'the business number must not reach Meta');
  assert.equal(serialized.includes('NJ'), false, 'market must not reach Meta');
});

// ---------------------------------------------------------------------------
// Route-level suspension of Meta's OWN automatic PageView.
//
// Verified in a real browser: once fbevents.js is resident it fires a PageView
// on history changes by itself, with no fbq() call from this codebase, and
// unmounting the <Script> does not stop it. fbq('consent','revoke') does.
// ---------------------------------------------------------------------------

test('entering a sensitive route revokes Meta dispatch, leaving it restores', async () => {
  const meta = await import('../lib/meta-pixel');
  meta.__resetMetaRouteSuspension();
  setConsent(true, true);
  meta.initMetaPixel();
  assert.equal(metaEvents('PageView').length, 1);

  // Navigate into a clinical route.
  goto('/internal/review-links');
  meta.suspendMetaForRoute();
  assert.deepEqual(fbqCalls().at(-1), ['consent', 'revoke'], 'Meta must be told to stop');

  // Repeat suspension is a no-op, not a second revoke.
  const afterFirst = fbqCalls().length;
  meta.suspendMetaForRoute();
  assert.equal(fbqCalls().length, afterFirst, 'suspension is latched');

  // Back to an eligible route.
  goto('/locations/florida');
  meta.resumeMetaForRoute();
  assert.deepEqual(fbqCalls().at(-1), ['consent', 'grant']);
});

test('route suspension never re-grants against a withdrawn consent choice', async () => {
  const meta = await import('../lib/meta-pixel');
  meta.__resetMetaRouteSuspension();
  setConsent(true, true);
  meta.initMetaPixel();

  goto('/internal');
  meta.suspendMetaForRoute();

  // Visitor withdraws marketing consent while on the sensitive route.
  setConsent(true, false);
  goto('/');
  meta.resumeMetaForRoute();

  assert.notDeepEqual(fbqCalls().at(-1), ['consent', 'grant'],
    'must not re-grant when the visitor has withdrawn advertising consent');
});

// ---------------------------------------------------------------------------
// Attribution recovery — the biggest source of lost paid signal.
// ---------------------------------------------------------------------------

test('a late Accept still captures the landing click and campaign', async () => {
  const { bufferLandingAttribution, captureGclid, captureUtmParams, getAttributionData } =
    await import('../lib/gclid');

  // Arrive from a Meta ad. No consent yet — nothing may be stored.
  goto('/lp/adult-scoliosis-treatment',
    '?fbclid=IwAR_landing_click_123&utm_source=meta&utm_medium=paid_social' +
    '&utm_campaign=120111&meta_campaign_id=120111&meta_adset_id=120222&meta_ad_id=120333');
  bufferLandingAttribution();
  captureGclid();
  captureUtmParams();
  // Undecided is an allowed state, so the click is already persisted here.
  assert.equal(getAttributionData().fbclid, 'IwAR_landing_click_123');

  // Browse away — the parameters are gone from the URL forever.
  goto('/treatments');
  assert.equal(window.location.search, '');

  // Only now does the visitor accept.
  setConsent(true, true);
  captureGclid();
  captureUtmParams();

  const attribution = getAttributionData();
  assert.equal(attribution.fbclid, 'IwAR_landing_click_123', 'the paid click must survive a late Accept');
  assert.equal(attribution.utm_source, 'meta');
  assert.equal(attribution.utm_campaign, '120111');
  assert.equal(attribution.meta_campaign_id, '120111');
  assert.equal(attribution.meta_adset_id, '120222');
  assert.equal(attribution.meta_ad_id, '120333');
});

test('a newer click replaces the buffered older one', async () => {
  const { bufferLandingAttribution, getBufferedLandingParam } = await import('../lib/gclid');
  setConsent(true, true);

  goto('/', '?gclid=OLD_GOOGLE_CLICK');
  bufferLandingAttribution();

  // A later Meta click in the same page session must replace the buffer
  // wholesale, not merge into it.
  goto('/lp/spine-injections', '?fbclid=NEW_META_CLICK');
  bufferLandingAttribution();

  goto('/treatments');
  assert.equal(getBufferedLandingParam('fbclid'), 'NEW_META_CLICK', 'latest click wins');
  assert.equal(
    getBufferedLandingParam('gclid'), null,
    'the stale Google click must not be resurrected from the buffer',
  );
});

test('an explicit rejection keeps the landing buffer locked', async () => {
  const { bufferLandingAttribution, captureGclid, captureUtmParams, getAttributionData } =
    await import('../lib/gclid');
  goto('/', '?fbclid=SHOULD_NOT_PERSIST&utm_source=meta');
  bufferLandingAttribution();

  setConsent(false, false);
  captureGclid();
  captureUtmParams();
  goto('/treatments');

  assert.equal(getAttributionData().fbclid, '', 'rejection keeps the buffer locked');
  assert.equal(getAttributionData().utm_source, '');
  assert.equal(document.cookie.includes('fbclid'), false, 'no attribution cookie after refusal');
});

test('an UNDECIDED visitor has nothing persisted until they accept', async () => {
  const { bufferLandingAttribution, captureGclid, captureUtmParams, getAttributionData } =
    await import('../lib/gclid');
  // Nothing stored: the visitor has not answered the banner.
  goto('/lp/spine-injections', '?fbclid=UNDECIDED_CLICK&utm_source=meta&meta_ad_id=555');
  bufferLandingAttribution();
  captureGclid();
  captureUtmParams();

  goto('/treatments');
  assert.equal(getAttributionData().fbclid, '', 'undecided keeps the buffer locked');
  assert.equal(document.cookie.includes('fbclid'), false, 'no attribution cookie before Accept');

  // A later Accept releases the buffered landing click (GclidCapture re-runs
  // capture on the consent-change event).
  setConsent(true, true);
  captureGclid();
  captureUtmParams();
  const attribution = getAttributionData();
  assert.equal(attribution.fbclid, 'UNDECIDED_CLICK', 'the click survives until the visitor accepts');
  assert.equal(attribution.utm_source, 'meta');
  assert.equal(attribution.meta_ad_id, '555');
});

// ---------------------------------------------------------------------------
// Environment guard — local and preview origins must never reach the
// PRODUCTION dataset.
// ---------------------------------------------------------------------------

test('a local origin is blocked from the production pixel', async () => {
  const meta = await import('../lib/meta-pixel');
  const localDom = new JSDOM('<!doctype html><html><body></body></html>', {
    url: 'http://localhost:3000/lp/adult-scoliosis-treatment',
  });
  const realWindow = globalThis.window;
  const realDocument = globalThis.document;
  Object.defineProperty(globalThis, 'window', { value: localDom.window, configurable: true });
  Object.defineProperty(globalThis, 'document', { value: localDom.window.document, configurable: true });

  try {
    // Marketing granted and an eligible route — only the origin should stop it.
    localDom.window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({
      version: CONSENT_VERSION,
      timestamp: '2026-09-21T00:00:00.000Z',
      categories: { necessary: true, analytics: true, marketing: true, functional: true },
    }));
    assert.equal(meta.isMetaEnvironmentEnabled(), false, 'localhost must not use the production pixel');
    assert.equal(meta.isMetaAllowed(), false);
    assert.equal(meta.initMetaPixel(), false);
    assert.equal(typeof (localDom.window as unknown as { fbq?: unknown }).fbq, 'undefined');
  } finally {
    Object.defineProperty(globalThis, 'window', { value: realWindow, configurable: true });
    Object.defineProperty(globalThis, 'document', { value: realDocument, configurable: true });
  }
});

test('a production origin is environment-enabled', async () => {
  const meta = await import('../lib/meta-pixel');
  // The suite's own JSDOM is https://mountainspineorthopedics.com/.
  assert.equal(meta.isMetaEnvironmentEnabled(), true);
});
