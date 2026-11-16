import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import test from 'node:test';

import {
  extractLeadgenChanges,
  fieldsOf,
  formatMetaLocation,
  mapLeadToContact,
  verifyMetaSignature,
  type GraphLead,
} from '../lib/meta-leadgen';
import { FORM_SOURCES } from '../lib/lead-contract';
import {
  META_ELIGIBLE_FORM_SOURCES,
  META_INELIGIBLE_FORM_SOURCES,
  isMetaEligibleFormSource,
} from '../lib/route-privacy';

const APP_SECRET = 'test-app-secret';
const BODY = JSON.stringify({ object: 'page', entry: [] });

function sign(secret: string, raw: string): string {
  return `sha256=${createHmac('sha256', secret).update(raw, 'utf8').digest('hex')}`;
}

// ── Signature verification ───────────────────────────────────────────────────
// The webhook URL is public. Anything that fails verification must never reach
// the mailer.

test('accepts a body signed with the app secret', () => {
  assert.equal(verifyMetaSignature(APP_SECRET, sign(APP_SECRET, BODY), BODY), true);
});

test('rejects a body signed with the wrong secret', () => {
  assert.equal(verifyMetaSignature(APP_SECRET, sign('wrong-secret', BODY), BODY), false);
});

test('rejects a tampered body', () => {
  const header = sign(APP_SECRET, BODY);
  assert.equal(verifyMetaSignature(APP_SECRET, header, '{"object":"evil"}'), false);
});

test('rejects missing, malformed and non-sha256 signature headers', () => {
  assert.equal(verifyMetaSignature(APP_SECRET, null, BODY), false);
  assert.equal(verifyMetaSignature(APP_SECRET, undefined, BODY), false);
  assert.equal(verifyMetaSignature(APP_SECRET, 'sha256=nothex', BODY), false);
  assert.equal(verifyMetaSignature(APP_SECRET, 'md5=abcdef', BODY), false);
  assert.equal(verifyMetaSignature(APP_SECRET, sign(APP_SECRET, BODY).slice(0, 20), BODY), false);
});

test('rejects everything when no app secret is configured', () => {
  assert.equal(verifyMetaSignature('', sign('', BODY), BODY), false);
});

// ── Envelope parsing ─────────────────────────────────────────────────────────

test('extracts only leadgen changes from a page envelope', () => {
  const changes = extractLeadgenChanges({
    object: 'page',
    entry: [
      {
        changes: [
          { field: 'leadgen', value: { leadgen_id: 'L1', form_id: 'F1' } },
          { field: 'feed', value: { leadgen_id: 'IGNORED' } },
          { field: 'leadgen', value: { form_id: 'no-lead-id' } },
        ],
      },
    ],
  });
  assert.equal(changes.length, 1);
  assert.equal(changes[0].leadgen_id, 'L1');
});

test('ignores envelopes that are not page objects or are malformed', () => {
  assert.deepEqual(extractLeadgenChanges({ object: 'instagram', entry: [] }), []);
  assert.deepEqual(extractLeadgenChanges(null), []);
  assert.deepEqual(extractLeadgenChanges({ object: 'page' }), []);
});

// ── Field mapping ────────────────────────────────────────────────────────────

const LEAD: GraphLead = {
  id: 'L1',
  platform: 'ig',
  campaign_id: '120249813788530446',
  adset_id: '120249813788910446',
  ad_id: '120250344642730446',
  form_id: '3634773886703639',
  field_data: [
    { name: 'full_name', values: ['Jane Doe'] },
    { name: 'phone_number', values: ['+15615550123'] },
    { name: 'email', values: ['jane@example.com'] },
    { name: 'preferred_location', values: ['Hollywood'] },
  ],
};

test('collapses Meta field_data into a lookup, skipping empties', () => {
  const f = fieldsOf({ field_data: [
    { name: 'email', values: ['a@b.com'] },
    { name: 'blank', values: [] },
    { values: ['no name'] },
  ] });
  assert.deepEqual(f, { email: 'a@b.com' });
});

test('maps a lead onto the shape sendContactEmail expects', () => {
  const c = mapLeadToContact(LEAD);
  assert.equal(c.name, 'Jane Doe');
  assert.equal(c.email, 'jane@example.com');
  assert.equal(c.phone, '+15615550123');
  assert.equal(c.location, 'Hollywood');
});

test('carries campaign, ad set and ad ids through as UTMs', () => {
  const c = mapLeadToContact(LEAD);
  assert.equal(c.utm_campaign, '120249813788530446');
  assert.equal(c.utm_term, '120249813788910446');
  assert.equal(c.utm_content, '120250344642730446');
  assert.equal(c.utm_medium, 'paid_social');
});

test('distinguishes Instagram from Facebook as the traffic source', () => {
  assert.equal(mapLeadToContact({ ...LEAD, platform: 'ig' }).utm_source, 'instagram');
  assert.equal(mapLeadToContact({ ...LEAD, platform: 'fb' }).utm_source, 'facebook');
  assert.equal(mapLeadToContact({ ...LEAD, platform: undefined }).utm_source, 'facebook');
});

test('falls back to the webhook change when the lead node omits ids', () => {
  const bare: GraphLead = { id: 'L1', field_data: [] };
  const c = mapLeadToContact(bare, {
    leadgen_id: 'L1',
    campaign_id: 'C9',
    adgroup_id: 'A9',
    ad_id: 'D9',
  });
  assert.equal(c.utm_campaign, 'C9');
  assert.equal(c.utm_term, 'A9');
  assert.equal(c.utm_content, 'D9');
});

test('builds a name from first and last when full_name is absent', () => {
  const c = mapLeadToContact({ field_data: [
    { name: 'first_name', values: ['Ada'] },
    { name: 'last_name', values: ['Lovelace'] },
  ] });
  assert.equal(c.name, 'Ada Lovelace');
});

test('never invents contact values for a lead with no answers', () => {
  const c = mapLeadToContact({ field_data: [] });
  assert.equal(c.name, '');
  assert.equal(c.email, '');
  assert.equal(c.phone, '');
  assert.equal(c.location, '');
});

// ── Preferred location ───────────────────────────────────────────────────────
//
// Meta returns a CUSTOM question's answer KEY, not its label. These are the
// nine clinic options plus "not sure" on form 3634773886703639 as of
// 2026-11-16, in the exact form the Graph API hands them over.

test('renders Meta answer keys as the clinic names staff use', () => {
  assert.equal(formatMetaLocation('fort_pierce'), 'Fort Pierce');
  assert.equal(formatMetaLocation('altamonte_springs'), 'Altamonte Springs');
  assert.equal(formatMetaLocation('south_miami'), 'South Miami');
  assert.equal(formatMetaLocation('palm_beach_gardens'), 'Palm Beach Gardens');
  assert.equal(formatMetaLocation('boca_raton'), 'Boca Raton');
  assert.equal(formatMetaLocation('orlando'), 'Orlando');
  assert.equal(formatMetaLocation('davenport'), 'Davenport');
  assert.equal(formatMetaLocation('jacksonville'), 'Jacksonville');
  assert.equal(formatMetaLocation('hollywood'), 'Hollywood');
});

test('spells out the one option that is a sentence, not a place', () => {
  assert.equal(formatMetaLocation('not_sure'), 'Not sure yet');
});

test('leaves an already-readable location untouched', () => {
  assert.equal(formatMetaLocation('Hollywood'), 'Hollywood');
  assert.equal(formatMetaLocation('Palm Beach Gardens'), 'Palm Beach Gardens');
});

test('never turns a missing location into a fabricated one', () => {
  assert.equal(formatMetaLocation(''), '');
  assert.equal(formatMetaLocation('   '), '');
  assert.equal(formatMetaLocation(null), '');
  assert.equal(formatMetaLocation(undefined), '');
});

test('a new clinic key formats correctly without any code change', () => {
  // The point of title-casing over a lookup table: a location added to the
  // Instant Form must not reach the front desk as a raw key.
  assert.equal(formatMetaLocation('winter_garden'), 'Winter Garden');
});

// ── Measurement contract ─────────────────────────────────────────────────────

test('meta-instant-form is a registered form source', () => {
  assert.ok((FORM_SOURCES as readonly string[]).includes('meta-instant-form'));
});

test('meta-instant-form must not report back to Meta as a website Lead', () => {
  // The conversion is already attributed natively by Meta; reporting it again
  // would double-count the same lead against the same ad.
  assert.equal(isMetaEligibleFormSource('meta-instant-form'), false);
  assert.ok((META_INELIGIBLE_FORM_SOURCES as readonly string[]).includes('meta-instant-form'));
  assert.ok(!(META_ELIGIBLE_FORM_SOURCES as readonly string[]).includes('meta-instant-form'));
});

test('the eligible and ineligible lists still partition FORM_SOURCES exactly', () => {
  const eligible = new Set<string>(META_ELIGIBLE_FORM_SOURCES);
  const ineligible = new Set<string>(META_INELIGIBLE_FORM_SOURCES);
  for (const source of FORM_SOURCES) {
    const inE = eligible.has(source);
    const inI = ineligible.has(source);
    assert.ok(inE || inI, `${source} is triaged into neither list`);
    assert.ok(!(inE && inI), `${source} appears in both lists`);
  }
  assert.equal(eligible.size + ineligible.size, FORM_SOURCES.length);
});
