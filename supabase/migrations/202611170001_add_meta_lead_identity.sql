-- Give a Meta Instant Form lead a durable external identity.
--
-- WHY
-- `public.forms` had no column for Meta's leadgen id, its form id, or a form
-- version, so a Meta lead was identifiable only by form_source='meta-instant-form'
-- plus a free-text sentence in `reason`. Three consequences, all live today:
--
--   1. NO DEDUPLICATION. Meta retries a leadgen webhook for ~36h and can have two
--      retries in flight at once. Nothing in the database could tell the second
--      insert from the first, so a retry created a second lead row — which also
--      fired the AFTER INSERT trigger `forms_to_google_sheets` a second time and
--      put a duplicate line in the lead sheet. The Resend idempotency key stopped
--      the duplicate EMAIL for 24h; it never stopped the duplicate ROW, and
--      Meta's retry window is longer than Resend's dedup window.
--
--   2. NO RECONCILIATION. Meta deletes Instant Form leads after 90 days. Without
--      the leadgen id stored, a lead that failed mid-delivery could not be looked
--      up, re-driven, or even recognised as the same lead on a later attempt.
--
--   3. NO V2/V3 SPLIT. The V3 cutover needs per-version lead counts to prove the
--      new form is delivering before the old one is retired.
--
-- Additive and nullable, so no existing writer can be rejected (see
-- 202609140001_add_landing_path.sql for what that failure mode cost: ~4 days of
-- silently dropped leads). Historical rows keep NULL; the values were never
-- captured and no backfill is possible.
--
-- ORDERING: this migration MUST be applied to production BEFORE the application
-- code that writes these columns is deployed.
--
-- Rollback:
--   drop index if exists forms_external_lead_id_key;
--   alter table public.forms
--     drop column if exists external_lead_id,
--     drop column if exists external_form_id,
--     drop column if exists external_form_version;

alter table public.forms
  add column if not exists external_lead_id      text,
  add column if not exists external_form_id      text,
  add column if not exists external_form_version text,
  add column if not exists external_submitted_at timestamptz;

comment on column public.forms.external_lead_id is
  'Meta leadgen_id for form_source=meta-instant-form. The external deduplication key: unique where present. NULL for website leads.';

comment on column public.forms.external_form_id is
  'Meta Instant Form id that produced the lead (e.g. the V2 or V3 form). Identifier only, never patient data.';

comment on column public.forms.external_form_version is
  'Internal label for the Instant Form generation: v2, v3. Derived from the form id server-side, never supplied by a payload. NULL when the form id matched no authorized version (quarantined).';

-- Two different times, and the difference is operationally important.
--
-- `created_at` is when WE received the lead. `external_submitted_at` is Meta's
-- own `created_time` — when the PATIENT pressed submit. They diverge whenever
-- Meta delivers late, retries, or a lead is reconciled hours afterwards, and
-- only the patient's time can answer the questions the audit actually asked:
-- 64% of leads after 4 PM, 55% at weekends, and how stale a lead was by the
-- time anyone called it. The confirmation email's activation boundary is also
-- judged on this column, so a webhook replayed after the cutover cannot mail a
-- patient who submitted before it.
comment on column public.forms.external_submitted_at is
  'Meta created_time: when the patient submitted the Instant Form. Distinct from created_at, which is our receipt time. NULL for website leads.';

-- Partial unique index: enforces one row per Meta lead at the DATABASE level, so
-- two concurrent webhook retries cannot both win. Partial, because every website
-- lead has NULL here and NULL is not unique-constrained in Postgres anyway —
-- stated explicitly so the intent survives a future reader.
--
-- The application treats the resulting 23505 as SUCCESS ("already stored"), not
-- as a failure, and must never surface it as a dropped lead.
create unique index if not exists forms_external_lead_id_key
  on public.forms (external_lead_id)
  where external_lead_id is not null;
