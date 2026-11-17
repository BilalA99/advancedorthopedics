import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import test from 'node:test';

import {
  META_FIELD_KEYS,
  META_FORM_ID_V2_DEFAULT,
  META_FORM_ID_V3_DEFAULT,
  META_PAGE_ID_DEFAULT,
  PREFERRED_LOCATION_KEYS,
  authorizedFormIds,
  authorizedPageIds,
  classifyMetaForm,
  isAuthorizedPage,
} from '../lib/meta-forms';
import { fieldsOf, formatMetaLocation, mapLeadToContact, type GraphLead } from '../lib/meta-leadgen';
import {
  CONFIRMATION_ELIGIBLE_FORM_VERSIONS,
  decideActivation,
  parseActivationBoundary,
} from '../lib/config/metaConfirmationActivation';
import {
  MAX_DELIVERY_ATTEMPTS,
  backoffSecondsFor,
  buildDeliveryKey,
  classifyProviderFailure,
  isRetryDue,
  isTerminalStatus,
  providerIdempotencyKey,
  shouldApplyStatus,
  statusForProviderEvent,
  type DeliveryStatus,
} from '../lib/message-delivery';
import { parseResendEvent, verifyResendSignature } from '../lib/resend-webhook';
import {
  CONFIRMATION_HEADING,
  CONFIRMATION_INTRO,
  CONFIRMATION_OUTRO,
  CONFIRMATION_PREVIEW_TEXT,
  CONFIRMATION_SUBJECT,
  SCHEDULING_PHONE_DISPLAY,
  SCHEDULING_PHONE_TEL,
  confirmationPlainText,
} from '../lib/meta-confirmation-content';

// ═════════════════════════════════════════════════════════════════════════════
// Form registry — V2/V3 acceptance and quarantine
// ═════════════════════════════════════════════════════════════════════════════

const EMPTY_ENV = {};

test('accepts the live V2 form and labels it v2', () => {
  const result = classifyMetaForm(META_FORM_ID_V2_DEFAULT, EMPTY_ENV);
  assert.deepEqual(result, {
    status: 'authorized',
    version: 'v2',
    formId: META_FORM_ID_V2_DEFAULT,
  });
});

test('accepts the new V3 form and labels it v3', () => {
  const result = classifyMetaForm(META_FORM_ID_V3_DEFAULT, EMPTY_ENV);
  assert.deepEqual(result, {
    status: 'authorized',
    version: 'v3',
    formId: META_FORM_ID_V3_DEFAULT,
  });
});

test('the handoff ids are exactly what the Meta environment published', () => {
  // A typo here silently quarantines every live lead, so the literal values are
  // pinned rather than merely referenced.
  assert.equal(META_FORM_ID_V2_DEFAULT, '3634773886703639');
  assert.equal(META_FORM_ID_V3_DEFAULT, '3068973836772964');
  assert.equal(META_PAGE_ID_DEFAULT, '995449336974458');
});

test('both versions are authorized simultaneously — V2 is not retired by V3', () => {
  assert.deepEqual(authorizedFormIds(EMPTY_ENV), [
    META_FORM_ID_V2_DEFAULT,
    META_FORM_ID_V3_DEFAULT,
  ]);
});

test('an unknown form id is quarantined, with no version guessed', () => {
  const result = classifyMetaForm('9999999999999999', EMPTY_ENV);
  assert.equal(result.status, 'quarantined');
  assert.equal(result.version, null);
});

test('a missing form id is unidentified rather than quarantined', () => {
  assert.equal(classifyMetaForm(undefined, EMPTY_ENV).status, 'unidentified');
  assert.equal(classifyMetaForm('', EMPTY_ENV).status, 'unidentified');
  assert.equal(classifyMetaForm('   ', EMPTY_ENV).status, 'unidentified');
});

test('env overrides replace the defaults, so a V4 needs config not a deploy', () => {
  const env = { META_LEAD_FORM_ID_V3: '555' };
  assert.equal(classifyMetaForm('555', env).version, 'v3');
  // The old V3 id stops being authorized once overridden — that is the point.
  assert.equal(classifyMetaForm(META_FORM_ID_V3_DEFAULT, env).status, 'quarantined');
  // V2 is untouched by a V3 override.
  assert.equal(classifyMetaForm(META_FORM_ID_V2_DEFAULT, env).version, 'v2');
});

test('surrounding whitespace in a form id does not cause a quarantine', () => {
  assert.equal(classifyMetaForm(` ${META_FORM_ID_V3_DEFAULT} `, EMPTY_ENV).version, 'v3');
});

// ── Page authorization ───────────────────────────────────────────────────────

test('the handoff Page is authorized by default', () => {
  assert.equal(isAuthorizedPage(META_PAGE_ID_DEFAULT, EMPTY_ENV), true);
});

test('an unrelated Page is rejected by default', () => {
  // The second Page on this business (628293770374959) has no leadgen forms and
  // must not be able to deliver leads.
  assert.equal(isAuthorizedPage('628293770374959', EMPTY_ENV), false);
  assert.equal(isAuthorizedPage(null, EMPTY_ENV), false);
});

test('an empty allowlist value CANNOT disable the page check', () => {
  // The earlier version treated META_LEAD_PAGE_IDS='' as "no restriction", which
  // meant a security control could be switched off by a bad copy-paste or a
  // templating tool that emits empty strings for unset values. It now fails
  // closed: the handoff Page is compiled in and cannot be removed.
  for (const value of ['', '   ', ',,', ' , ']) {
    const env = { META_LEAD_PAGE_IDS: value };
    assert.equal(isAuthorizedPage('628293770374959', env), false, `value=${JSON.stringify(value)}`);
    assert.equal(isAuthorizedPage(null, env), false);
    assert.equal(isAuthorizedPage(META_PAGE_ID_DEFAULT, env), true, 'the handoff Page survives');
  }
});

test('the env var ADDS pages and can never remove the handoff Page', () => {
  const env = { META_LEAD_PAGE_IDS: '111, 222 ,333' };
  assert.equal(isAuthorizedPage('222', env), true);
  assert.equal(isAuthorizedPage('444', env), false);
  // Adding a second Page does not orphan the first.
  assert.equal(isAuthorizedPage(META_PAGE_ID_DEFAULT, env), true);
  assert.deepEqual(authorizedPageIds(env), [META_PAGE_ID_DEFAULT, '111', '222', '333']);
});

test('the authorized page list is deduplicated and never empty', () => {
  assert.deepEqual(authorizedPageIds({}), [META_PAGE_ID_DEFAULT]);
  assert.deepEqual(
    authorizedPageIds({ META_LEAD_PAGE_IDS: META_PAGE_ID_DEFAULT }),
    [META_PAGE_ID_DEFAULT],
  );
  assert.ok(authorizedPageIds({ META_LEAD_PAGE_IDS: '' }).length >= 1);
});

// ═════════════════════════════════════════════════════════════════════════════
// Field mapping contract — identical keys across V2 and V3
// ═════════════════════════════════════════════════════════════════════════════

function leadFixture(overrides: Partial<GraphLead> = {}): GraphLead {
  return {
    id: '1234567890',
    created_time: '2026-11-18T15:04:05+0000',
    field_data: [
      { name: 'full_name', values: ['Jane Synthetic'] },
      { name: 'phone_number', values: ['+15615550123'] },
      { name: 'email', values: ['jane.synthetic@example.test'] },
      { name: 'preferred_location', values: ['palm_beach_gardens'] },
    ],
    campaign_id: '120249813788530446',
    adset_id: '120249813788910446',
    ad_id: '120250344643750446',
    form_id: META_FORM_ID_V3_DEFAULT,
    platform: 'fb',
    ...overrides,
  };
}

test('the four question keys are the documented contract', () => {
  assert.deepEqual([...META_FIELD_KEYS], [
    'full_name',
    'phone_number',
    'email',
    'preferred_location',
  ]);
});

test('a V3 lead maps onto the same contact shape as a V2 lead', () => {
  const v3 = mapLeadToContact(leadFixture());
  const v2 = mapLeadToContact(leadFixture({ form_id: META_FORM_ID_V2_DEFAULT }));
  // The mapping is driven by field keys, not by form id — which is exactly why
  // V3 needed no mapping change.
  assert.deepEqual(v3, v2);
  assert.equal(v3.name, 'Jane Synthetic');
  assert.equal(v3.phone, '+15615550123');
  assert.equal(v3.email, 'jane.synthetic@example.test');
  assert.equal(v3.location, 'Palm Beach Gardens');
});

test('campaign, ad set and ad attribution ride on the existing UTM fields', () => {
  const contact = mapLeadToContact(leadFixture());
  assert.equal(contact.utm_source, 'facebook');
  assert.equal(contact.utm_medium, 'paid_social');
  assert.equal(contact.utm_campaign, '120249813788530446');
  assert.equal(contact.utm_term, '120249813788910446');
  assert.equal(contact.utm_content, '120250344643750446');
});

test('an Instagram lead is attributed to instagram, not facebook', () => {
  const contact = mapLeadToContact(leadFixture({ platform: 'ig' }));
  assert.equal(contact.utm_source, 'instagram');
});

test('missing optional attribution stays empty rather than being fabricated', () => {
  const contact = mapLeadToContact(
    leadFixture({ campaign_id: undefined, adset_id: undefined, ad_id: undefined }),
  );
  assert.equal(contact.utm_campaign, '');
  assert.equal(contact.utm_term, '');
  assert.equal(contact.utm_content, '');
});

test('webhook-envelope attribution is used when Graph omits it', () => {
  const contact = mapLeadToContact(
    leadFixture({ campaign_id: undefined, adset_id: undefined, ad_id: undefined }),
    { campaign_id: 'c-1', adgroup_id: 'a-1', ad_id: 'ad-1' },
  );
  assert.equal(contact.utm_campaign, 'c-1');
  assert.equal(contact.utm_term, 'a-1');
  assert.equal(contact.utm_content, 'ad-1');
});

test('every published preferred_location key renders as a readable label', () => {
  const expected: Record<string, string> = {
    south_miami: 'South Miami',
    hollywood: 'Hollywood',
    boca_raton: 'Boca Raton',
    palm_beach_gardens: 'Palm Beach Gardens',
    fort_pierce: 'Fort Pierce',
    orlando: 'Orlando',
    altamonte_springs: 'Altamonte Springs',
    davenport: 'Davenport',
    jacksonville: 'Jacksonville',
    not_sure: 'Not sure yet',
  };
  for (const key of PREFERRED_LOCATION_KEYS) {
    assert.equal(formatMetaLocation(key), expected[key], `key ${key}`);
  }
});

test('a malformed lead payload yields empty fields, never a throw', () => {
  assert.deepEqual(fieldsOf({ field_data: undefined }), {});
  assert.deepEqual(fieldsOf({ field_data: [{ name: 'email', values: [] }] }), {});
  const contact = mapLeadToContact({ field_data: [] });
  assert.equal(contact.name, '');
  assert.equal(contact.email, '');
  assert.equal(contact.location, '');
});

test('an unknown location key still produces something a scheduler can read', () => {
  // The Instant Form's clinic list changes when a clinic opens; a lookup table
  // would fall back to the raw key at exactly that moment.
  assert.equal(formatMetaLocation('new_smyrna_beach'), 'New Smyrna Beach');
});

// ═════════════════════════════════════════════════════════════════════════════
// Activation gate — the 12 historical leads must never be mailed
// ═════════════════════════════════════════════════════════════════════════════

const BOUNDARY = '2026-11-18T00:00:00Z';
const AFTER = '2026-11-18T14:00:00Z';
/** The most recent real Meta lead in production: 2026-11-16 23:32 UTC. */
const HISTORICAL = '2026-11-16T23:32:09Z';

test('the flag defaults closed: nothing sends while it is off', () => {
  const decision = decideActivation({
    enabled: false,
    activationBoundary: BOUNDARY,
    submittedAt: AFTER,
    formVersion: 'v3',
  });
  assert.equal(decision.eligible, false);
  assert.equal(decision.reason, 'flag-disabled');
});

test('flag on but no boundary configured still sends nothing', () => {
  // Misconfiguration is not consent. This is the gate that stops "turn the flag
  // on" from mailing every historical lead a webhook happens to replay.
  const decision = decideActivation({
    enabled: true,
    activationBoundary: undefined,
    submittedAt: AFTER,
    formVersion: 'v3',
  });
  assert.equal(decision.eligible, false);
  assert.equal(decision.reason, 'activation-boundary-unset');
});

test('a malformed boundary fails closed rather than being ignored', () => {
  const decision = decideActivation({
    enabled: true,
    activationBoundary: 'next tuesday',
    submittedAt: AFTER,
    formVersion: 'v3',
  });
  assert.equal(decision.eligible, false);
  assert.equal(decision.reason, 'activation-boundary-invalid');
});

test('a historical lead replayed after activation is refused', () => {
  const decision = decideActivation({
    enabled: true,
    activationBoundary: BOUNDARY,
    submittedAt: HISTORICAL,
    formVersion: 'v3',
  });
  assert.equal(decision.eligible, false);
  assert.equal(decision.reason, 'before-activation-boundary');
});

test('a lead with no submission time is refused, not assumed recent', () => {
  for (const value of [undefined, null, '', 'not a date']) {
    const decision = decideActivation({
      enabled: true,
      activationBoundary: BOUNDARY,
      submittedAt: value,
      formVersion: 'v3',
    });
    assert.equal(decision.eligible, false, `submittedAt=${String(value)}`);
    assert.equal(decision.reason, 'submission-time-unknown');
  }
});

test('only V3 is eligible: a late V2 lead gets storage and a staff alert only', () => {
  const decision = decideActivation({
    enabled: true,
    activationBoundary: BOUNDARY,
    submittedAt: AFTER,
    formVersion: 'v2',
  });
  assert.equal(decision.eligible, false);
  assert.equal(decision.reason, 'form-version-not-eligible');
  assert.deepEqual([...CONFIRMATION_ELIGIBLE_FORM_VERSIONS], ['v3']);
});

test('a quarantined form (null version) is never eligible', () => {
  const decision = decideActivation({
    enabled: true,
    activationBoundary: BOUNDARY,
    submittedAt: AFTER,
    formVersion: null,
  });
  assert.equal(decision.eligible, false);
  assert.equal(decision.reason, 'form-version-not-eligible');
});

test('a new V3 lead after the boundary with the flag on is eligible', () => {
  const decision = decideActivation({
    enabled: true,
    activationBoundary: BOUNDARY,
    submittedAt: AFTER,
    formVersion: 'v3',
  });
  assert.deepEqual(decision, { eligible: true, reason: 'eligible' });
});

test('a lead exactly at the boundary is eligible (inclusive)', () => {
  const decision = decideActivation({
    enabled: true,
    activationBoundary: BOUNDARY,
    submittedAt: BOUNDARY,
    formVersion: 'v3',
  });
  assert.equal(decision.eligible, true);
});

test('boundary parsing distinguishes unset from malformed', () => {
  assert.equal(parseActivationBoundary(undefined), null);
  assert.equal(parseActivationBoundary('   '), null);
  assert.equal(parseActivationBoundary('garbage'), 'invalid');
  assert.ok(parseActivationBoundary(BOUNDARY) instanceof Date);
});

// ═════════════════════════════════════════════════════════════════════════════
// Idempotency and delivery state
// ═════════════════════════════════════════════════════════════════════════════

test('delivery keys are per-lead AND per-message-type', () => {
  const staff = buildDeliveryKey('meta', '1234567890', 'staff-notification');
  const patient = buildDeliveryKey('meta', '1234567890', 'patient-confirmation');
  assert.equal(staff, 'meta:1234567890:staff-notification:v1');
  assert.equal(patient, 'meta:1234567890:patient-confirmation:v1');
  // The whole reason email_sent was inadequate: one lead, two independent
  // messages that must never dedupe each other.
  assert.notEqual(staff, patient);
});

test('a delivery key is stable across calls — that is what makes a retry safe', () => {
  assert.equal(
    buildDeliveryKey('meta', '42', 'patient-confirmation'),
    buildDeliveryKey('meta', '42', 'patient-confirmation'),
  );
});

test('a delivery key refuses to be minted without an external id', () => {
  assert.throws(() => buildDeliveryKey('meta', '', 'staff-notification'));
  assert.throws(() => buildDeliveryKey('meta', '   ', 'staff-notification'));
});

test('the provider idempotency key is opaque and leaks no Meta lead id', () => {
  const key = buildDeliveryKey('meta', '1234567890', 'patient-confirmation');
  const opaque = providerIdempotencyKey(key);
  // Resend holds no BAA, so the header must not carry an id joinable to an ad.
  assert.ok(!opaque.includes('1234567890'));
  assert.ok(!opaque.includes('meta'));
  assert.match(opaque, /^[0-9a-f]{48}$/);
  // Still deterministic, or it would not dedupe anything.
  assert.equal(opaque, providerIdempotencyKey(key));
});

test('different messages get different provider keys', () => {
  assert.notEqual(
    providerIdempotencyKey(buildDeliveryKey('meta', '1', 'staff-notification')),
    providerIdempotencyKey(buildDeliveryKey('meta', '1', 'patient-confirmation')),
  );
});

test('settled statuses are terminal and must never be resent', () => {
  for (const status of ['accepted', 'delivered', 'bounced', 'suppressed'] as DeliveryStatus[]) {
    assert.equal(isTerminalStatus(status), true, status);
  }
  for (const status of ['pending', 'processing', 'failed', 'unknown'] as DeliveryStatus[]) {
    assert.equal(isTerminalStatus(status), false, status);
  }
});

test('backoff is bounded — retries cannot run forever', () => {
  assert.equal(backoffSecondsFor(1), 60);
  assert.equal(backoffSecondsFor(2), 300);
  assert.equal(backoffSecondsFor(3), 1500);
  assert.equal(backoffSecondsFor(4), 7200);
  assert.equal(backoffSecondsFor(MAX_DELIVERY_ATTEMPTS), null);
  assert.equal(backoffSecondsFor(MAX_DELIVERY_ATTEMPTS + 10), null);
});

test('a retry is withheld until its backoff has elapsed', () => {
  const now = new Date('2026-11-18T12:00:00Z');
  const justNow = new Date('2026-11-18T11:59:30Z').toISOString();
  const longAgo = new Date('2026-11-18T11:00:00Z').toISOString();
  assert.equal(isRetryDue(1, justNow, now), false);
  assert.equal(isRetryDue(1, longAgo, now), true);
  // Exhausted attempts are never due, however old.
  assert.equal(isRetryDue(MAX_DELIVERY_ATTEMPTS, longAgo, now), false);
});

test('a first attempt with no recorded time is due immediately', () => {
  assert.equal(isRetryDue(1, null), true);
  assert.equal(isRetryDue(1, 'not a date'), true);
});

test('an invalid recipient is permanent — retrying it only burns reputation', () => {
  const result = classifyProviderFailure(422, 'validation_error');
  assert.equal(result.status, 'failed');
  assert.equal(result.recoverable, false);
});

test('rate limits and 5xx are recoverable; 4xx is not', () => {
  assert.deepEqual(classifyProviderFailure(429, null), { status: 'pending', recoverable: true });
  assert.deepEqual(classifyProviderFailure(503, null), { status: 'pending', recoverable: true });
  assert.deepEqual(classifyProviderFailure(400, null), { status: 'failed', recoverable: false });
});

test('a network failure with no status code is recoverable', () => {
  assert.deepEqual(classifyProviderFailure(null, null), { status: 'pending', recoverable: true });
});

// ── Provider events ─────────────────────────────────────────────────────────

test('provider events map onto distinct statuses — accepted is not delivered', () => {
  assert.equal(statusForProviderEvent('email.sent'), 'accepted');
  assert.equal(statusForProviderEvent('email.delivered'), 'delivered');
  assert.equal(statusForProviderEvent('email.bounced'), 'bounced');
  assert.equal(statusForProviderEvent('email.complained'), 'suppressed');
  assert.equal(statusForProviderEvent('email.delivery_delayed'), 'pending');
  assert.equal(statusForProviderEvent('email.failed'), 'failed');
  assert.equal(statusForProviderEvent('email.opened'), null);
  assert.equal(statusForProviderEvent('contact.created'), null);
});

test('a replayed or out-of-order event cannot regress a recorded status', () => {
  // Resend redelivers; a late email.sent after email.delivered must be a no-op.
  assert.equal(shouldApplyStatus('delivered', 'accepted'), false);
  assert.equal(shouldApplyStatus('delivered', 'delivered'), false);
  assert.equal(shouldApplyStatus('bounced', 'delivered'), false);
  // Forward transitions still apply.
  assert.equal(shouldApplyStatus('accepted', 'delivered'), true);
  assert.equal(shouldApplyStatus('pending', 'accepted'), true);
  assert.equal(shouldApplyStatus('delivered', 'bounced'), true);
});

// ── Resend webhook signature ────────────────────────────────────────────────

const WHSEC = `whsec_${Buffer.from('resend-test-signing-key').toString('base64')}`;

function svixSign(secret: string, id: string, timestamp: string, body: string): string {
  const key = Buffer.from(secret.replace('whsec_', ''), 'base64');
  const mac = createHmac('sha256', key).update(`${id}.${timestamp}.${body}`, 'utf8').digest('base64');
  return `v1,${mac}`;
}

const NOW = new Date('2026-11-18T12:00:00Z');
const TS = String(Math.floor(NOW.getTime() / 1000));
const EVENT_BODY = JSON.stringify({
  type: 'email.delivered',
  created_at: '2026-11-18T12:00:00.000Z',
  data: { email_id: 'abc-123', to: ['patient@example.test'], subject: 'We’ve received your request' },
});

test('a correctly signed Resend event verifies', () => {
  const result = verifyResendSignature({
    secret: WHSEC,
    svixId: 'msg_1',
    svixTimestamp: TS,
    svixSignature: svixSign(WHSEC, 'msg_1', TS, EVENT_BODY),
    rawBody: EVENT_BODY,
    now: NOW,
  });
  assert.deepEqual(result, { ok: true });
});

test('a tampered body fails verification', () => {
  const result = verifyResendSignature({
    secret: WHSEC,
    svixId: 'msg_1',
    svixTimestamp: TS,
    svixSignature: svixSign(WHSEC, 'msg_1', TS, EVENT_BODY),
    rawBody: EVENT_BODY.replace('delivered', 'bounced'),
    now: NOW,
  });
  assert.equal(result.ok, false);
});

test('a signature for a different message id fails', () => {
  const result = verifyResendSignature({
    secret: WHSEC,
    svixId: 'msg_2',
    svixTimestamp: TS,
    svixSignature: svixSign(WHSEC, 'msg_1', TS, EVENT_BODY),
    rawBody: EVENT_BODY,
    now: NOW,
  });
  assert.equal(result.ok, false);
});

test('an old event is refused — a captured POST cannot be replayed later', () => {
  const stale = String(Math.floor(NOW.getTime() / 1000) - 3600);
  const result = verifyResendSignature({
    secret: WHSEC,
    svixId: 'msg_1',
    svixTimestamp: stale,
    svixSignature: svixSign(WHSEC, 'msg_1', stale, EVENT_BODY),
    rawBody: EVENT_BODY,
    now: NOW,
  });
  assert.equal(result.ok, false);
  assert.equal(result.ok === false && result.reason, 'timestamp-out-of-tolerance');
});

test('verification fails closed with no secret configured', () => {
  const result = verifyResendSignature({
    secret: undefined,
    svixId: 'msg_1',
    svixTimestamp: TS,
    svixSignature: svixSign(WHSEC, 'msg_1', TS, EVENT_BODY),
    rawBody: EVENT_BODY,
    now: NOW,
  });
  assert.equal(result.ok, false);
  assert.equal(result.ok === false && result.reason, 'missing-secret');
});

test('missing svix headers are refused', () => {
  const result = verifyResendSignature({
    secret: WHSEC,
    svixId: null,
    svixTimestamp: TS,
    svixSignature: 'v1,x',
    rawBody: EVENT_BODY,
    now: NOW,
  });
  assert.equal(result.ok === false && result.reason, 'missing-headers');
});

test('key rotation is supported: any v1 entry in the list may match', () => {
  const good = svixSign(WHSEC, 'msg_1', TS, EVENT_BODY);
  const result = verifyResendSignature({
    secret: WHSEC,
    svixId: 'msg_1',
    svixTimestamp: TS,
    svixSignature: `v1,AAAA ${good}`,
    rawBody: EVENT_BODY,
    now: NOW,
  });
  assert.equal(result.ok, true);
});

test('the event parser keeps only identifiers — never the recipient or subject', () => {
  const event = parseResendEvent(JSON.parse(EVENT_BODY));
  assert.ok(event);
  assert.deepEqual(Object.keys(event!).sort(), ['createdAt', 'emailId', 'type']);
  assert.equal(event!.emailId, 'abc-123');
  // The payload carried data.to and data.subject. Neither survives parsing.
  assert.equal(JSON.stringify(event).includes('patient@example.test'), false);
  assert.equal(JSON.stringify(event).includes('received your request'), false);
});

test('an unparseable provider payload yields null, not a throw', () => {
  assert.equal(parseResendEvent(null), null);
  assert.equal(parseResendEvent('string'), null);
  assert.equal(parseResendEvent({}), null);
  assert.equal(parseResendEvent({ type: '' }), null);
});

// ═════════════════════════════════════════════════════════════════════════════
// Patient confirmation copy — what a patient actually receives
// ═════════════════════════════════════════════════════════════════════════════

const ALL_COPY = [
  CONFIRMATION_SUBJECT,
  CONFIRMATION_PREVIEW_TEXT,
  CONFIRMATION_HEADING,
  ...CONFIRMATION_INTRO,
  ...CONFIRMATION_OUTRO,
  confirmationPlainText(),
].join('\n');

test('the subject carries no patient name and no clinical hint', () => {
  assert.equal(CONFIRMATION_SUBJECT, "We've received your request");
  // A subject is the most widely-replicated part of an email: lock screens,
  // notification banners, mail-server logs.
  for (const forbidden of ['Jane', 'name', 'pain', 'spine', 'appointment confirmed']) {
    assert.ok(
      !CONFIRMATION_SUBJECT.toLowerCase().includes(forbidden.toLowerCase()),
      `subject must not contain "${forbidden}"`,
    );
  }
});

test('the email states the appointment is NOT yet confirmed', () => {
  // The most consequential line in the email. A patient who believes they have
  // an appointment does not answer the call that would have made one.
  assert.ok(
    CONFIRMATION_OUTRO.some((p) =>
      p.includes('not confirmed until you speak with our scheduling team'),
    ),
  );
});

test('the email promises no response time it cannot keep', () => {
  // 64% of leads arrive after 4 PM and 55% at weekends, so any interval would be
  // broken by most leads on the day they arrive.
  for (const forbidden of [
    'within 24 hours',
    'within an hour',
    'immediately',
    'same day',
    'shortly',
    '24 hours',
  ]) {
    assert.ok(
      !ALL_COPY.toLowerCase().includes(forbidden),
      `copy must not promise "${forbidden}"`,
    );
  }
  assert.ok(ALL_COPY.includes('during business hours'));
});

test('the copy contains no clinical, insurance or marketing content', () => {
  for (const forbidden of [
    'pain', 'symptom', 'diagnos', 'insurance',
    'date of birth', 'surgery', 'unsubscribe', 'newsletter',
    'discount', 'free consultation',
  ]) {
    assert.ok(
      !ALL_COPY.toLowerCase().includes(forbidden),
      `copy must not contain "${forbidden}"`,
    );
  }
  // Whole words only. "ppo" is a substring of "appointment" and "mri" of
  // nothing here, but a naive substring check on short clinical acronyms
  // produces false failures that get silenced rather than fixed.
  for (const forbidden of ['ppo', 'mri', 'offer', 'condition']) {
    assert.ok(
      !new RegExp(`\\b${forbidden}\\b`, 'i').test(ALL_COPY),
      `copy must not contain the word "${forbidden}"`,
    );
  }
});

test('the scheduling number is correct and consistent everywhere', () => {
  assert.equal(SCHEDULING_PHONE_DISPLAY, '(561) 223-9959');
  assert.equal(SCHEDULING_PHONE_TEL, '+15612239959');
  // Same digits in both forms — a mismatch would send patients to a dead line.
  assert.equal(SCHEDULING_PHONE_DISPLAY.replace(/\D/g, ''), SCHEDULING_PHONE_TEL.slice(2));
});

test('the plain-text part carries the number, the heading and the caveat', () => {
  const text = confirmationPlainText();
  assert.ok(text.includes(SCHEDULING_PHONE_DISPLAY));
  assert.ok(text.includes(CONFIRMATION_HEADING));
  assert.ok(text.includes('not confirmed until you speak with our scheduling team'));
  assert.ok(text.includes('mountainspineorthopedics.com'));
});

test('the plain-text part carries no URL query string or tracking parameter', () => {
  const text = confirmationPlainText();
  // A bare "?" is legitimate — "Prefer to speak with us directly?" — so the
  // assertion is about query strings on URLs, not about punctuation.
  for (const url of text.match(/\bhttps?:\/\/\S+|\b[a-z0-9.-]+\.(?:com|org|net)\S*/gi) ?? []) {
    assert.ok(!url.includes('?'), `URL must carry no query string: ${url}`);
    assert.ok(!url.includes('#'), `URL must carry no fragment: ${url}`);
  }
  for (const forbidden of ['utm_', 'gclid', 'fbclid', 'click.', 'track']) {
    assert.ok(!text.includes(forbidden), `text must not contain "${forbidden}"`);
  }
});

test('the preview text does not merely repeat the subject', () => {
  assert.notEqual(CONFIRMATION_PREVIEW_TEXT, CONFIRMATION_SUBJECT);
  assert.equal(
    CONFIRMATION_PREVIEW_TEXT,
    'Our scheduling team will be in touch during business hours.',
  );
});
