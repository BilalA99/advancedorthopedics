-- ⚠️ SUPERSEDED IN PRODUCTION BY 202611170005 — DO NOT APPLY THIS ON ITS OWN.
--
-- This policy is correct only AFTER the application writes Meta leads as
-- service_role (lib/meta-lead-ingest.ts + the client switch in
-- logLeadToSupabase). It was applied ahead of that code on 2026-11-17 and broke
-- Meta lead persistence in live production for ~5 hours, because the deployed
-- webhook still inserted form_source='meta-instant-form' with the publishable
-- key. 202611170005 rolled the form_source clause back; the external_* clauses
-- stayed. Re-apply this file only once that release is live and a Meta lead has
-- been seen persisting with a non-null external_lead_id.
--
-- Stop a public client from impersonating a Meta lead.
--
-- THE HOLE
-- public.forms grants `anon` INSERT with `with check (true)`. That grant is
-- necessary — NEXT_PUBLIC_SUPABASE_ANON_KEY ships inside the client bundle, so
-- the browser must be able to submit a lead — but `with check (true)` means the
-- browser can set EVERY column, including the four added in
-- 202611170001_add_meta_lead_identity.sql. Three concrete abuses:
--
--   1. IMPERSONATION. Insert a row with form_source='meta-instant-form' and it
--      appears in the lead sheet, and in any future per-channel report, as a
--      paid Meta lead. Channel attribution and cost-per-lead become forgeable.
--
--   2. RESERVING A LEAD ID. external_lead_id carries a UNIQUE index. Insert a
--      row claiming a leadgen_id and the real webhook's insert for that lead is
--      rejected as a duplicate. The lead is not lost — the staff notification
--      keys off the leadgen id independently and still sends — but the stored
--      row is the attacker's, not the patient's, so the contact details a
--      scheduler reads from the sheet are wrong.
--
--   3. FORGING A VERSION LABEL. Claiming external_form_version='v3' would make
--      a forged row indistinguishable from a real V3 lead in reporting.
--
-- What it CANNOT do, before and after this migration: cause an email. Outbound
-- mail is created only on the signature-verified webhook path, and nothing reads
-- public.forms to decide what to send. There is no poller, no trigger-driven
-- mailer, no row-watcher. This migration closes the data-integrity hole, not an
-- email hole.
--
-- THE FIX
-- Replace `with check (true)` with a check that permits exactly what the public
-- website legitimately writes and nothing more. The four external_* columns are
-- reserved for server-side Meta ingestion, which runs as service_role and
-- bypasses RLS entirely, so it is unaffected.
--
-- WEBSITE COMPATIBILITY IS PRESERVED EXACTLY. Every website form reaches this
-- table through logLeadToSupabase, which sets external_* only for Meta leads
-- (see components/email/sendcontactemail.ts -> persistMetaLead). A website form
-- writes NULL in all four and a form_source from lib/lead-contract.ts, so no
-- existing submission is affected. Verified against production: of 1,400 rows,
-- 0 have any external_* value.
--
-- Rollback (restores the permissive behaviour):
--   drop policy if exists "Public website can submit leads" on public.forms;
--   create policy "Public website can submit leads" on public.forms
--     for insert to anon, authenticated with check (true);

drop policy if exists "Public website can submit leads" on public.forms;

create policy "Public website can submit leads"
  on public.forms
  for insert
  to anon, authenticated
  with check (
    -- Reserved for server-side Meta ingestion (service_role, which bypasses RLS).
    external_lead_id      is null
    and external_form_id      is null
    and external_form_version is null
    and external_submitted_at is null
    -- A public client may not claim to be a channel it cannot be. Only the
    -- signature-verified Meta webhook may write this value.
    and (form_source is null or form_source <> 'meta-instant-form')
  );

comment on policy "Public website can submit leads" on public.forms is
  'anon/authenticated may INSERT a website lead only: no external_* identity columns and not form_source=meta-instant-form. Those are reserved for the signature-verified Meta webhook running as service_role. Still no SELECT/UPDATE/DELETE policy, so a public client cannot read a lead back.';

comment on table public.forms is
  'Patient lead submissions. RLS on: anon/authenticated may INSERT website leads only (see the insert policy). Meta ingestion writes as service_role. Read leads via service_role — never with the publishable key.';
