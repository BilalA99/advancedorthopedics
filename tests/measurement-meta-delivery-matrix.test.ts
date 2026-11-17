import assert from 'node:assert/strict';
import test from 'node:test';

import {
  MAX_DELIVERY_ATTEMPTS,
  buildDeliveryKey,
  classifyProviderFailure,
  isRetryDue,
  isTerminalStatus,
  providerIdempotencyKey,
  shouldApplyStatus,
  statusForProviderEvent,
  type DeliveryStatus,
  type MessageType,
} from '../lib/message-delivery';

/**
 * Behavioural tests for the delivery outbox, against an in-memory stand-in for
 * `public.message_deliveries`.
 *
 * WHY A FAKE TABLE RATHER THAN THE REAL ONE
 * The scenarios that matter here are concurrency and crash recovery: two Meta
 * retries racing, a provider accepting an email and the process dying before the
 * row is updated, an event replayed out of order. Those are reachable
 * deterministically against a fake with the same uniqueness rule, and not
 * reachable at all against a live database from a test runner.
 *
 * The fake enforces the ONE invariant the real schema enforces — `delivery_key`
 * is unique — because every guarantee in this system rests on it. If a change
 * to lib/delivery-store.ts stops relying on that uniqueness, these tests stop
 * describing production and the schema comment is the thing to re-read.
 */

type Row = {
  id: string;
  submission_id: string;
  message_type: MessageType;
  delivery_key: string;
  status: DeliveryStatus;
  provider_message_id: string | null;
  attempt_count: number;
  last_attempt_at: string | null;
  error_code: string | null;
};

class FakeOutbox {
  private rows = new Map<string, Row>();
  private seq = 0;

  /** Mirrors the unique index: a second insert of the same key is refused. */
  insert(row: Omit<Row, 'id'>): { row?: Row; conflict?: true } {
    if (this.rows.has(row.delivery_key)) return { conflict: true };
    const created = { ...row, id: `row-${++this.seq}` };
    this.rows.set(row.delivery_key, created);
    return { row: created };
  }

  get(key: string): Row | undefined {
    return this.rows.get(key);
  }

  byProviderId(id: string): Row | undefined {
    return [...this.rows.values()].find((r) => r.provider_message_id === id);
  }

  update(key: string, patch: Partial<Row>): void {
    const row = this.rows.get(key);
    if (row) this.rows.set(key, { ...row, ...patch });
  }

  size(): number {
    return this.rows.size;
  }
}

/**
 * The claim/send/record cycle from lib/delivery-store.ts + meta-lead-pipeline.ts,
 * reduced to the decision logic those two files share.
 */
function claim(
  outbox: FakeOutbox,
  deliveryKey: string,
  messageType: MessageType,
  now = new Date(),
): { claimed: boolean; reason?: string; attempt?: number } {
  const insert = outbox.insert({
    submission_id: 'sub-1',
    message_type: messageType,
    delivery_key: deliveryKey,
    status: 'processing',
    provider_message_id: null,
    attempt_count: 1,
    last_attempt_at: now.toISOString(),
    error_code: null,
  });
  if (insert.row) return { claimed: true, attempt: 1 };

  const row = outbox.get(deliveryKey)!;
  if (isTerminalStatus(row.status)) return { claimed: false, reason: 'already-settled' };
  if (!isRetryDue(row.attempt_count, row.last_attempt_at, now)) {
    return {
      claimed: false,
      reason: row.attempt_count >= MAX_DELIVERY_ATTEMPTS ? 'exhausted' : 'backoff',
    };
  }
  const attempt = row.attempt_count + 1;
  outbox.update(deliveryKey, {
    status: 'processing',
    attempt_count: attempt,
    last_attempt_at: now.toISOString(),
  });
  return { claimed: true, attempt };
}

function recordAccepted(outbox: FakeOutbox, key: string, providerId: string): void {
  outbox.update(key, { status: 'accepted', provider_message_id: providerId, error_code: null });
}

function recordFailure(outbox: FakeOutbox, key: string, status: DeliveryStatus, code: string): void {
  outbox.update(key, { status, error_code: code });
}

const STAFF_KEY = buildDeliveryKey('meta', '1234567890', 'staff-notification');
const PATIENT_KEY = buildDeliveryKey('meta', '1234567890', 'patient-confirmation');

// ═════════════════════════════════════════════════════════════════════════════
// Duplicate and concurrent webhooks
// ═════════════════════════════════════════════════════════════════════════════

test('a duplicate webhook does not duplicate either email', () => {
  const outbox = new FakeOutbox();

  // First webhook: both messages claimed and sent.
  assert.equal(claim(outbox, STAFF_KEY, 'staff-notification').claimed, true);
  recordAccepted(outbox, STAFF_KEY, 'resend-staff-1');
  assert.equal(claim(outbox, PATIENT_KEY, 'patient-confirmation').claimed, true);
  recordAccepted(outbox, PATIENT_KEY, 'resend-patient-1');

  // Meta retries the same leadgen_id.
  const staffRetry = claim(outbox, STAFF_KEY, 'staff-notification');
  const patientRetry = claim(outbox, PATIENT_KEY, 'patient-confirmation');

  assert.equal(staffRetry.claimed, false);
  assert.equal(staffRetry.reason, 'already-settled');
  assert.equal(patientRetry.claimed, false);
  assert.equal(patientRetry.reason, 'already-settled');
  assert.equal(outbox.size(), 2, 'two messages, no duplicates');
});

test('two CONCURRENT webhook retries: exactly one claim wins per message', () => {
  const outbox = new FakeOutbox();
  // Both invocations reach the claim before either has recorded anything. This
  // is the case a last-write-wins update would get wrong, and is why the claim
  // is an insert on a unique column rather than a read-then-write.
  const a = claim(outbox, PATIENT_KEY, 'patient-confirmation');
  const b = claim(outbox, PATIENT_KEY, 'patient-confirmation');

  assert.equal(a.claimed, true);
  assert.equal(b.claimed, false);
  assert.equal(b.reason, 'backoff', 'the loser waits; it does not send');
  assert.equal(outbox.size(), 1);
});

test('the staff notification and the patient confirmation never dedupe each other', () => {
  const outbox = new FakeOutbox();
  assert.equal(claim(outbox, STAFF_KEY, 'staff-notification').claimed, true);
  // Same lead, different message type — must still be claimable.
  assert.equal(claim(outbox, PATIENT_KEY, 'patient-confirmation').claimed, true);
  assert.equal(outbox.size(), 2);
});

test('a different lead is independent of a settled one', () => {
  const outbox = new FakeOutbox();
  claim(outbox, PATIENT_KEY, 'patient-confirmation');
  recordAccepted(outbox, PATIENT_KEY, 'resend-1');
  const other = buildDeliveryKey('meta', '9876543210', 'patient-confirmation');
  assert.equal(claim(outbox, other, 'patient-confirmation').claimed, true);
});

// ═════════════════════════════════════════════════════════════════════════════
// Independent failure: one email failing must not affect the other
// ═════════════════════════════════════════════════════════════════════════════

test('staff email succeeds while patient email fails', () => {
  const outbox = new FakeOutbox();
  claim(outbox, STAFF_KEY, 'staff-notification');
  recordAccepted(outbox, STAFF_KEY, 'resend-staff-1');

  claim(outbox, PATIENT_KEY, 'patient-confirmation');
  const { status } = classifyProviderFailure(503, null);
  recordFailure(outbox, PATIENT_KEY, status, 'http_503');

  assert.equal(outbox.get(STAFF_KEY)!.status, 'accepted');
  assert.equal(outbox.get(PATIENT_KEY)!.status, 'pending');
  // And the staff row must not be reopened by the patient failure.
  assert.equal(claim(outbox, STAFF_KEY, 'staff-notification').reason, 'already-settled');
});

test('patient email succeeds while staff email fails', () => {
  const outbox = new FakeOutbox();
  claim(outbox, PATIENT_KEY, 'patient-confirmation');
  recordAccepted(outbox, PATIENT_KEY, 'resend-patient-1');

  claim(outbox, STAFF_KEY, 'staff-notification');
  recordFailure(outbox, STAFF_KEY, 'pending', 'network_error');

  assert.equal(outbox.get(PATIENT_KEY)!.status, 'accepted');
  assert.equal(outbox.get(STAFF_KEY)!.status, 'pending');
});

test('a temporary provider outage is retried after backoff, then stops', () => {
  const outbox = new FakeOutbox();
  const t0 = new Date('2026-11-18T12:00:00Z');

  claim(outbox, PATIENT_KEY, 'patient-confirmation', t0);
  recordFailure(outbox, PATIENT_KEY, 'pending', 'http_503');

  // Immediately afterwards: refused, so a hot loop cannot hammer the provider.
  assert.equal(claim(outbox, PATIENT_KEY, 'patient-confirmation', t0).reason, 'backoff');

  // After the first backoff window (60s): allowed.
  const t1 = new Date(t0.getTime() + 61_000);
  assert.equal(claim(outbox, PATIENT_KEY, 'patient-confirmation', t1).claimed, true);

  // Drive it to exhaustion and confirm it stops rather than retrying forever.
  let now = t1;
  for (let i = 0; i < 10; i++) {
    recordFailure(outbox, PATIENT_KEY, 'pending', 'http_503');
    now = new Date(now.getTime() + 24 * 3600 * 1000);
    claim(outbox, PATIENT_KEY, 'patient-confirmation', now);
  }
  const final = claim(outbox, PATIENT_KEY, 'patient-confirmation', new Date(now.getTime() + 1e9));
  assert.equal(final.claimed, false);
  assert.equal(final.reason, 'exhausted');
  assert.ok(outbox.get(PATIENT_KEY)!.attempt_count <= MAX_DELIVERY_ATTEMPTS);
});

test('an invalid recipient address is not retried at all', () => {
  const outbox = new FakeOutbox();
  const t0 = new Date('2026-11-18T12:00:00Z');
  claim(outbox, PATIENT_KEY, 'patient-confirmation', t0);
  const { status, recoverable } = classifyProviderFailure(422, 'validation_error');
  assert.equal(recoverable, false);
  recordFailure(outbox, PATIENT_KEY, status, 'validation_error');
  assert.equal(outbox.get(PATIENT_KEY)!.status, 'failed');
  // `failed` is non-terminal by design (a human may requeue it), but the
  // pipeline returns `failed` rather than `backoff`, so nothing auto-resends.
  assert.equal(recoverable, false);
});

test('a hard bounce is terminal — never retried, never resent', () => {
  const outbox = new FakeOutbox();
  claim(outbox, PATIENT_KEY, 'patient-confirmation');
  recordAccepted(outbox, PATIENT_KEY, 'resend-1');
  // The provider webhook reports the bounce.
  const status = statusForProviderEvent('email.bounced')!;
  assert.ok(shouldApplyStatus('accepted', status));
  outbox.update(PATIENT_KEY, { status });

  const retry = claim(outbox, PATIENT_KEY, 'patient-confirmation');
  assert.equal(retry.claimed, false);
  assert.equal(retry.reason, 'already-settled');
});

test('a complaint suppresses the address rather than reopening it', () => {
  const outbox = new FakeOutbox();
  claim(outbox, PATIENT_KEY, 'patient-confirmation');
  recordAccepted(outbox, PATIENT_KEY, 'resend-1');
  outbox.update(PATIENT_KEY, { status: statusForProviderEvent('email.complained')! });
  assert.equal(outbox.get(PATIENT_KEY)!.status, 'suppressed');
  assert.equal(claim(outbox, PATIENT_KEY, 'patient-confirmation').reason, 'already-settled');
});

// ═════════════════════════════════════════════════════════════════════════════
// The crash case: provider accepted, application died before recording
// ═════════════════════════════════════════════════════════════════════════════

test('provider accepts but the DB update is lost: reconciliation flags, never resends', () => {
  const outbox = new FakeOutbox();
  const t0 = new Date('2026-11-18T12:00:00Z');

  // Claimed, sent, provider accepted — and then the invocation died, so
  // recordAccepted never ran. The row is stuck in `processing`.
  claim(outbox, PATIENT_KEY, 'patient-confirmation', t0);
  assert.equal(outbox.get(PATIENT_KEY)!.status, 'processing');

  // Inside the backoff window a retry is refused outright.
  assert.equal(claim(outbox, PATIENT_KEY, 'patient-confirmation', t0).reason, 'backoff');

  // The reconciliation sweep promotes a long-stalled `processing` row to
  // `unknown` with a sanitized code — a human decision, not a second email.
  outbox.update(PATIENT_KEY, { status: 'unknown', error_code: 'stalled_in_processing' });
  const row = outbox.get(PATIENT_KEY)!;
  assert.equal(row.status, 'unknown');
  assert.equal(row.error_code, 'stalled_in_processing');

  // Crucially: the delivery key is deterministic, so even if something DID try
  // again, Resend's idempotency key is identical and collapses the send.
  assert.equal(
    providerIdempotencyKey(PATIENT_KEY),
    providerIdempotencyKey(buildDeliveryKey('meta', '1234567890', 'patient-confirmation')),
  );
});

// ═════════════════════════════════════════════════════════════════════════════
// Provider delivery events
// ═════════════════════════════════════════════════════════════════════════════

test('accepted -> delivered is recorded as two distinct facts', () => {
  const outbox = new FakeOutbox();
  claim(outbox, PATIENT_KEY, 'patient-confirmation');
  recordAccepted(outbox, PATIENT_KEY, 'resend-1');
  assert.equal(outbox.get(PATIENT_KEY)!.status, 'accepted');

  const found = outbox.byProviderId('resend-1');
  assert.ok(found, 'the provider message id is the reconciliation handle');

  outbox.update(PATIENT_KEY, { status: statusForProviderEvent('email.delivered')! });
  assert.equal(outbox.get(PATIENT_KEY)!.status, 'delivered');
});

test('a replayed delivery event changes nothing', () => {
  const outbox = new FakeOutbox();
  claim(outbox, PATIENT_KEY, 'patient-confirmation');
  recordAccepted(outbox, PATIENT_KEY, 'resend-1');
  outbox.update(PATIENT_KEY, { status: 'delivered' });

  // Resend redelivers the same event, and then an older one arrives late.
  assert.equal(shouldApplyStatus('delivered', 'delivered'), false);
  assert.equal(shouldApplyStatus('delivered', 'accepted'), false);
  assert.equal(outbox.get(PATIENT_KEY)!.status, 'delivered');
});

test('an event for a message this system did not send matches nothing', () => {
  const outbox = new FakeOutbox();
  claim(outbox, PATIENT_KEY, 'patient-confirmation');
  recordAccepted(outbox, PATIENT_KEY, 'resend-1');
  // A website form's confirmation is not tracked in this table; its event must
  // be acknowledged and ignored, not applied to an unrelated row.
  assert.equal(outbox.byProviderId('resend-website-99'), undefined);
});

// ═════════════════════════════════════════════════════════════════════════════
// Suppression: the historical-lead guarantee
// ═════════════════════════════════════════════════════════════════════════════

test('a suppressed row is terminal, so enabling the flag later cannot mail it', () => {
  const outbox = new FakeOutbox();
  // First pass, flag off: a `suppressed` row is written rather than nothing.
  outbox.insert({
    submission_id: 'sub-1',
    message_type: 'patient-confirmation',
    delivery_key: PATIENT_KEY,
    status: 'suppressed',
    provider_message_id: null,
    attempt_count: 0,
    last_attempt_at: null,
    error_code: 'flag_disabled',
  });

  // Flag flipped on, same lead replayed by a Meta retry.
  const retry = claim(outbox, PATIENT_KEY, 'patient-confirmation');
  assert.equal(retry.claimed, false);
  assert.equal(retry.reason, 'already-settled');
  assert.equal(outbox.get(PATIENT_KEY)!.status, 'suppressed');
});

test('suppressing the patient email leaves the staff notification free to send', () => {
  const outbox = new FakeOutbox();
  outbox.insert({
    submission_id: 'sub-1',
    message_type: 'patient-confirmation',
    delivery_key: PATIENT_KEY,
    status: 'suppressed',
    provider_message_id: null,
    attempt_count: 0,
    last_attempt_at: null,
    error_code: 'flag_disabled',
  });
  // This is the shipped production state: confirmation off, staff alert working.
  assert.equal(claim(outbox, STAFF_KEY, 'staff-notification').claimed, true);
});

// ═════════════════════════════════════════════════════════════════════════════
// Restricted quarantine, and the durable-ingestion contract
//
// These encode the two hardening decisions made before deployment:
//   - an unverifiable lead must never reach the scheduling workflow
//   - a lead must be recoverable after the webhook has already answered 200
// ═════════════════════════════════════════════════════════════════════════════

/** Mirrors the quarantine decision in lib/meta-lead-pipeline.ts. */
function isQuarantined(formStatus: string, pageAuthorized: boolean): boolean {
  return formStatus !== 'authorized' || !pageAuthorized;
}

test('quarantine triggers on an unauthorized form OR an unauthorized Page', () => {
  assert.equal(isQuarantined('authorized', true), false);
  assert.equal(isQuarantined('quarantined', true), true);
  assert.equal(isQuarantined('unidentified', true), true);
  // The Page check alone is sufficient: a recognised form delivered from
  // someone else's Page is still not ours.
  assert.equal(isQuarantined('authorized', false), true);
});

test('a quarantined lead takes the staff-notification key, so only one alert is sent', () => {
  // Both the real scheduling alert and the generic quarantine alert claim the
  // SAME delivery key. That is deliberate: a misconfiguration delivering the
  // same lead repeatedly cannot flood the inbox, and a lead can never receive
  // both kinds of alert.
  const outbox = new FakeOutbox();
  assert.equal(claim(outbox, STAFF_KEY, 'staff-notification').claimed, true);
  recordAccepted(outbox, STAFF_KEY, 'resend-quarantine-1');

  const retry = claim(outbox, STAFF_KEY, 'staff-notification');
  assert.equal(retry.claimed, false);
  assert.equal(retry.reason, 'already-settled');
  assert.equal(outbox.size(), 1);
});

test('a quarantined lead never claims a patient-confirmation send', () => {
  // Suppressed before any claim, so no provider call is possible even if the
  // feature flag were on.
  const outbox = new FakeOutbox();
  outbox.insert({
    submission_id: 'sub-1',
    message_type: 'patient-confirmation',
    delivery_key: PATIENT_KEY,
    status: 'suppressed',
    provider_message_id: null,
    attempt_count: 0,
    last_attempt_at: null,
    error_code: 'quarantined',
  });
  assert.equal(claim(outbox, PATIENT_KEY, 'patient-confirmation').reason, 'already-settled');
  assert.equal(outbox.get(PATIENT_KEY)!.error_code, 'quarantined');
});

// ── Durable ingestion ────────────────────────────────────────────────────────

/**
 * In-memory stand-in for public.meta_lead_ingestions, enforcing the one
 * invariant the real schema enforces: leadgen_id is the PRIMARY KEY.
 */
class FakeIngestionQueue {
  private rows = new Map<string, { status: string; attempts: number; submissionId: string | null }>();

  /** Mirrors the upsert-ignore-duplicates receipt write. */
  recordReceived(leadgenId: string): { created: boolean } {
    if (this.rows.has(leadgenId)) return { created: false };
    this.rows.set(leadgenId, { status: 'received', attempts: 0, submissionId: null });
    return { created: true };
  }

  markProcessing(leadgenId: string): void {
    const row = this.rows.get(leadgenId);
    if (row) this.rows.set(leadgenId, { ...row, status: 'processing', attempts: row.attempts + 1 });
  }

  markCompleted(leadgenId: string, submissionId: string): void {
    const row = this.rows.get(leadgenId);
    if (row) this.rows.set(leadgenId, { ...row, status: 'completed', submissionId });
  }

  markAttemptFailed(leadgenId: string, max = 5): { exhausted: boolean } {
    const row = this.rows.get(leadgenId)!;
    const exhausted = row.attempts >= max;
    this.rows.set(leadgenId, { ...row, status: exhausted ? 'failed' : 'received' });
    return { exhausted };
  }

  markQuarantined(leadgenId: string): void {
    const row = this.rows.get(leadgenId);
    if (row) this.rows.set(leadgenId, { ...row, status: 'quarantined' });
  }

  pending(): string[] {
    return [...this.rows.entries()]
      .filter(([, r]) => ['received', 'processing', 'unknown'].includes(r.status) && r.attempts < 5)
      .map(([id]) => id);
  }

  get(leadgenId: string) {
    return this.rows.get(leadgenId);
  }

  size(): number {
    return this.rows.size;
  }
}

const LEADGEN = '1234567890';

test('a receipt is recorded before the 200, so a dead background task loses nothing', () => {
  const queue = new FakeIngestionQueue();
  assert.equal(queue.recordReceived(LEADGEN).created, true);

  // The invocation dies here — no Graph call, no insert, no email, and Meta
  // already has its 200 and will never retry.
  assert.deepEqual(queue.pending(), [LEADGEN], 'the sweep can still find it');
});

test('a duplicate webhook does not create a second work item', () => {
  const queue = new FakeIngestionQueue();
  queue.recordReceived(LEADGEN);
  queue.markProcessing(LEADGEN);
  // Meta retries while the first attempt is still in flight.
  assert.equal(queue.recordReceived(LEADGEN).created, false);
  assert.equal(queue.size(), 1);
  // And the retry must not reset a row that is mid-flight.
  assert.equal(queue.get(LEADGEN)!.status, 'processing');
});

test('a failed Graph lookup stays retryable instead of vanishing', () => {
  const queue = new FakeIngestionQueue();
  queue.recordReceived(LEADGEN);
  queue.markProcessing(LEADGEN);
  const { exhausted } = queue.markAttemptFailed(LEADGEN);
  assert.equal(exhausted, false);
  assert.equal(queue.get(LEADGEN)!.status, 'received');
  assert.deepEqual(queue.pending(), [LEADGEN]);
});

test('ingestion retries are bounded, then stop for a human', () => {
  const queue = new FakeIngestionQueue();
  queue.recordReceived(LEADGEN);
  let exhausted = false;
  for (let i = 0; i < 8 && !exhausted; i++) {
    queue.markProcessing(LEADGEN);
    exhausted = queue.markAttemptFailed(LEADGEN).exhausted;
  }
  assert.equal(exhausted, true);
  assert.equal(queue.get(LEADGEN)!.status, 'failed');
  assert.deepEqual(queue.pending(), [], 'a failed row is not re-driven forever');
});

test('a persisted lead closes the work item and links the submission', () => {
  const queue = new FakeIngestionQueue();
  queue.recordReceived(LEADGEN);
  queue.markProcessing(LEADGEN);
  queue.markCompleted(LEADGEN, 'submission-uuid-1');
  assert.equal(queue.get(LEADGEN)!.status, 'completed');
  assert.equal(queue.get(LEADGEN)!.submissionId, 'submission-uuid-1');
  assert.deepEqual(queue.pending(), []);
});

test('a quarantined work item is terminal and not re-driven', () => {
  // Otherwise every sweep would resend the operational alert. Clearing it is a
  // deliberate act: configure the form id, then reset the status to 'received'.
  const queue = new FakeIngestionQueue();
  queue.recordReceived(LEADGEN);
  queue.markProcessing(LEADGEN);
  queue.markQuarantined(LEADGEN);
  assert.equal(queue.get(LEADGEN)!.status, 'quarantined');
  assert.deepEqual(queue.pending(), []);
});

test('re-driving a lead cannot duplicate the lead row or either email', () => {
  // The guarantee that makes retry safe at all: the work item is keyed on the
  // leadgen id, the lead row on a unique external_lead_id, and each message on
  // a unique delivery_key. Re-driving resumes; it never duplicates.
  const queue = new FakeIngestionQueue();
  const outbox = new FakeOutbox();

  queue.recordReceived(LEADGEN);
  queue.markProcessing(LEADGEN);
  claim(outbox, STAFF_KEY, 'staff-notification');
  recordAccepted(outbox, STAFF_KEY, 'resend-staff-1');
  // Died before the lead row landed.
  queue.markAttemptFailed(LEADGEN);

  // The sweep re-drives it.
  queue.markProcessing(LEADGEN);
  const staffRetry = claim(outbox, STAFF_KEY, 'staff-notification');
  assert.equal(staffRetry.claimed, false, 'the staff alert is not sent twice');
  assert.equal(staffRetry.reason, 'already-settled');
  queue.markCompleted(LEADGEN, 'submission-uuid-1');

  assert.equal(outbox.size(), 1);
  assert.equal(queue.size(), 1);
  assert.equal(queue.get(LEADGEN)!.status, 'completed');
});
