-- Durable record that a Meta lead was RECEIVED, written before the 200.
--
-- THE GAP THIS CLOSES
-- The webhook answers Meta with 200 and then does the real work inside
-- `waitUntil`. That is correct — Meta treats a slow 200 as a failure and
-- retries, which double-sends — but it means everything after the response lives
-- in one in-memory promise. If the invocation dies (deploy, OOM, platform
-- restart), or the Graph lookup fails, or Supabase is briefly unavailable, the
-- lead is gone: Meta already got its 200 and will never retry, and nothing in
-- the database knows the lead ever existed.
--
-- Meta deletes Instant Form leads after 90 days, and the leadgen id is the only
-- handle for fetching one again. So the id is recorded SYNCHRONOUSLY, before the
-- response, and the reconciliation sweep re-drives anything left unfinished.
-- One small insert is a price worth paying inside Meta's timeout; losing a
-- patient is not.
--
-- NOT A SECOND LEAD TABLE. This holds identifiers and processing state only — no
-- name, no phone, no email, nothing from field_data. The lead itself still lands
-- in public.forms exactly as before. This is a work queue, and it is the reason
-- a failed Graph lookup is now recoverable rather than silent.
--
-- Deliberately NOT public.forms: that table carries the AFTER INSERT trigger
-- forms_to_google_sheets, so a row here must not fire the Apps Script lead sheet
-- for a lead whose details have not been fetched yet.
--
-- Rollback (non-destructive alternative preferred: stop writing to it):
--   drop table if exists public.meta_lead_ingestions;

create table if not exists public.meta_lead_ingestions (
  -- Meta's leadgen id IS the primary key. Nothing else is needed to identify a
  -- lead, and making it the key means a duplicate webhook cannot create a
  -- second work item even under concurrency.
  leadgen_id     text        primary key,

  -- Identifiers from the webhook envelope, so a retry can be classified and
  -- re-driven without re-reading the original request.
  form_id        text,
  page_id        text,
  campaign_id    text,
  adset_id       text,
  ad_id          text,

  status         text        not null default 'received',

  attempt_count  integer     not null default 0,

  -- Set once the lead has been stored in public.forms. The join key back to the
  -- lead record, and the signal that ingestion actually completed.
  submission_id  uuid,

  received_at     timestamptz not null default now(),
  last_attempt_at timestamptz,
  completed_at    timestamptz,

  -- Short sanitized code: 'graph_timeout', 'graph_http_500', 'persist_failed'.
  -- Never a Graph response body — a Graph error body can echo the request URL.
  error_code     text,

  constraint meta_lead_ingestions_status_check
    check (status in (
      'received',    -- recorded, not yet processed
      'processing',  -- an attempt is in flight
      'completed',   -- stored in public.forms; messages handled separately
      'quarantined', -- an unauthorized form or page; held, not discarded
      'failed',      -- attempts exhausted; needs a human
      'unknown'      -- stalled mid-flight; needs reconciliation
    ))
);

comment on table public.meta_lead_ingestions is
  'Work queue for Meta Instant Form leads, written before the webhook returns 200 so a lead cannot be lost when the background task dies. Identifiers and processing state only — no patient data. service_role access only.';

comment on column public.meta_lead_ingestions.leadgen_id is
  'Meta leadgen id, primary key. A duplicate webhook cannot create a second work item.';

comment on column public.meta_lead_ingestions.submission_id is
  'public.forms.submission_id once the lead is stored. NULL means ingestion has not completed.';

comment on column public.meta_lead_ingestions.error_code is
  'Sanitized failure code only. Never a Graph response body, which can contain the request URL and therefore the access token.';

-- The reconciliation sweep's read path.
create index if not exists meta_lead_ingestions_pending_idx
  on public.meta_lead_ingestions (status, last_attempt_at)
  where status in ('received', 'processing', 'unknown');

-- RLS on with NO policies, and all privileges revoked: anon and authenticated
-- get nothing. A public client must not be able to see which leads exist, nor
-- mark one completed to stop it ever being retried.
alter table public.meta_lead_ingestions enable row level security;

revoke all on public.meta_lead_ingestions from anon, authenticated;
