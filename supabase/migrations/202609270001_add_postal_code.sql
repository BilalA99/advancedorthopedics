-- Persist the intake form's ZIP / postal code.
--
-- The consultation intake form has collected a validated 5-digit (or ZIP+4) US
-- postal code for a long time, but `logLeadToSupabase` never wrote it and
-- `public.forms` never had a column for it: ZIP reached only the client-side
-- Google Ads Enhanced Conversions payload and was then discarded. So the field a
-- patient was required to fill in was not recoverable from the lead record, and
-- ZIP-based service-area reporting was impossible.
--
-- The 2026-09-24 meeting kept ZIP in the form (while removing "Best Time To
-- Contact"), which makes the gap worth closing rather than inheriting.
--
-- Ordering matters and is the whole reason this migration exists as its own step:
-- `landing_path` was added to the INSERT in application code with no migration,
-- and every INSERT into public.forms was rejected by PostgREST ("column does not
-- exist") for ~4 days, silently breaking lead capture (see
-- 202609140001_add_landing_path.sql). This column MUST exist in production before
-- the code that writes it is deployed.
--
-- Additive and nullable, so it cannot reject an existing writer: the RLS insert
-- policy "Public website can submit leads" (anon/authenticated, with check true)
-- and the forms_submission_id_key unique index are unaffected. Historical rows
-- keep NULL — no backfill is possible or attempted, because the value was never
-- stored.
--
-- Rollback (only if something depends on the column being absent):
--   alter table public.forms drop column if exists postal_code;

alter table public.forms
  add column if not exists postal_code text;

comment on column public.forms.postal_code is
  'US ZIP / postal code from the intake form (5-digit or ZIP+4), validated client- and server-side. First-party lead record and service-area reporting. Not a GA4 or Google Ads event parameter; the separate consent-gated Enhanced Conversions payload sends postal_code per Google''s spec.';
