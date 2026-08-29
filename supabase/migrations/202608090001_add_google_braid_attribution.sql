-- Preserve privacy-safe Google Ads web-to-app click identifiers with each lead.
-- Apply before deploying application code that writes these columns.
alter table public.forms
  add column if not exists submission_id uuid,
  add column if not exists gbraid text,
  add column if not exists wbraid text;

update public.forms
set submission_id = gen_random_uuid()
where submission_id is null;

alter table public.forms
  alter column submission_id set default gen_random_uuid(),
  alter column submission_id set not null;

create unique index if not exists forms_submission_id_key
  on public.forms (submission_id);

comment on column public.forms.submission_id is
  'Non-PII UUID used to reconcile web submission, attribution, screening, and offline conversion outcomes.';

comment on column public.forms.gbraid is
  'First-party persisted Google Ads GBRAID from the accepted lead submission.';
comment on column public.forms.wbraid is
  'First-party persisted Google Ads WBRAID from the accepted lead submission.';
