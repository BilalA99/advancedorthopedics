-- Persist the intake form's date of birth (2026-10-17, Abubeckr's checklist thread).
--
-- Every intake form now asks for a required date of birth so the front desk has it
-- before the first call. The value is first-party only: this column and the body of
-- the staff email. It is never a GA4, Google Ads or Meta parameter.
--
-- Ordering matters (see 202609140001_add_landing_path.sql): this column MUST exist
-- in production before the code that writes it is deployed, or every INSERT into
-- public.forms is rejected by PostgREST ("column does not exist").
--
-- Additive and nullable, so it cannot reject an existing writer. The RLS insert
-- policy "Public website can submit leads" and the forms_submission_id_key unique
-- index are unaffected. Historical rows keep NULL; the value was never collected.
--
-- Rollback (only if something depends on the column being absent):
--   alter table public.forms drop column if exists date_of_birth;

alter table public.forms
  add column if not exists date_of_birth date;

comment on column public.forms.date_of_birth is
  'Patient date of birth from the intake form, validated client- and server-side (lib/date-of-birth.ts). NULL when missing or invalid. First-party lead record only: never sent to GA4, Google Ads or Meta.';
