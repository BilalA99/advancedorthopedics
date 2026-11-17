-- Transactional outbox for outbound messages about a lead.
--
-- WHY A NEW TABLE RATHER THAN MORE COLUMNS ON public.forms
--
--   1. public.forms carries an AFTER INSERT trigger (`forms_to_google_sheets`)
--      that POSTs every new row to the Apps Script lead sheet. Delivery state
--      changes many times per lead; writing them onto the lead row would either
--      spam that pipeline or require touching a trigger that is working.
--
--   2. One lead has MANY messages. `forms.email_sent` is a single boolean that
--      cannot say "staff notification delivered, patient confirmation bounced".
--      It is also false on all 1,414 existing rows because no code has ever
--      written it, which is what made the first audit conclude no email had been
--      sent when the mailbox proved otherwise. That column is left exactly as it
--      is: never written here, never backfilled, and not to be trusted.
--
--   3. Access needs to differ. public.forms must stay INSERT-able by `anon` (the
--      public website submits with the publishable key). This table must not be
--      touchable by anon at all — it is the thing that decides whether an
--      outbound email is sent, so a public writer could manufacture or suppress
--      patient email.
--
-- CONTAINS NO PATIENT DATA, BY CONSTRUCTION. No name, no address, no phone, no
-- subject, no body, no clinical field. The recipient is reachable only by
-- joining `submission_id` back to public.forms, which requires service_role.
-- `error_code` is a sanitized provider code, never a provider message that might
-- echo a recipient address.
--
-- Rollback (non-destructive alternative preferred: just stop writing to it):
--   drop table if exists public.message_deliveries;

create table if not exists public.message_deliveries (
  id             uuid        primary key default gen_random_uuid(),

  -- Internal, non-PII lead reference. Matches public.forms.submission_id.
  -- Deliberately NOT a foreign key: a delivery attempt must still be recordable
  -- when the lead insert itself failed, which is precisely the case that most
  -- needs an audit trail.
  submission_id  uuid        not null,

  -- 'staff-notification' | 'patient-confirmation'
  message_type   text        not null,

  -- The logical idempotency identity, e.g. meta:{leadgen_id}:patient-confirmation:v1
  -- UNIQUE: this is what makes "exactly one of each message per lead" a database
  -- guarantee rather than an application hope.
  delivery_key   text        not null unique,

  status         text        not null default 'pending',

  -- Provider's id for the accepted message. The handle for reconciling a crash
  -- between "provider accepted" and "row updated".
  provider_message_id text,

  attempt_count  integer     not null default 0,

  created_at      timestamptz not null default now(),
  last_attempt_at timestamptz,
  accepted_at     timestamptz,
  delivered_at    timestamptz,
  bounced_at      timestamptz,
  failed_at       timestamptz,

  -- Short, sanitized failure code (e.g. 'validation_error', 'http_503').
  error_code     text,

  constraint message_deliveries_message_type_check
    check (message_type in ('staff-notification', 'patient-confirmation')),

  -- 'accepted' is the provider taking the message; 'delivered' is a receiving
  -- server taking it. Conflating the two is what the audit got wrong.
  constraint message_deliveries_status_check
    check (status in (
      'pending',     -- queued, not yet attempted
      'processing',  -- an attempt is in flight
      'accepted',    -- provider returned an id
      'delivered',   -- receiving server accepted it
      'bounced',     -- hard bounce; never retry
      'failed',      -- permanent application/provider rejection
      'suppressed',  -- deliberately not sent (flag off, pre-activation, complaint)
      'unknown'      -- outcome indeterminate; needs reconciliation
    ))
);

comment on table public.message_deliveries is
  'Durable per-message delivery state for lead notifications. No patient data: identifiers, status and timestamps only. service_role access only. Does not replace or write public.forms.email_sent.';

comment on column public.message_deliveries.delivery_key is
  'Deterministic idempotency identity, e.g. meta:{leadgen_id}:patient-confirmation:v1. Unique, so a webhook retry cannot produce a second message.';

comment on column public.message_deliveries.status is
  'pending|processing|accepted|delivered|bounced|failed|suppressed|unknown. accepted = provider API acceptance, NOT inbox placement.';

comment on column public.message_deliveries.error_code is
  'Sanitized failure code only. Never a provider message, recipient address, or email body.';

-- Reconciliation sweep: find work needing another look, cheaply.
create index if not exists message_deliveries_reconcile_idx
  on public.message_deliveries (status, last_attempt_at)
  where status in ('pending', 'processing', 'unknown');

-- Provider webhook lookup path.
create index if not exists message_deliveries_provider_message_id_idx
  on public.message_deliveries (provider_message_id)
  where provider_message_id is not null;

create index if not exists message_deliveries_submission_id_idx
  on public.message_deliveries (submission_id);

-- RLS on with NO policies: anon and authenticated get nothing — no select, no
-- insert, no update, no delete. service_role bypasses RLS, which is the only way
-- the server writes here. This is the control that stops a public client from
-- manufacturing a confirmation-email job.
alter table public.message_deliveries enable row level security;

revoke all on public.message_deliveries from anon, authenticated;
