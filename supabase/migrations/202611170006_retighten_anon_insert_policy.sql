-- Re-applies the full policy from 202611170003, now that the evidence gate is met.
--
-- ⚠️ ALREADY APPLIED IN PRODUCTION (project bwrnnmzqipnoakmdbevz, 2026-11-17).
-- This file is committed to bring the repo level with the database. It
-- supersedes the interim 202611170005 and restores 202611170003's intent.
--
-- THE GATE WAS EVIDENCE, NOT TIME
-- 202611170005 deliberately held the form_source clause open until a Meta lead
-- had been OBSERVED persisting with a non-null external_lead_id. That column is
-- unwritable by anon, so its presence on a real row is proof that the deployed
-- ingestion path is genuinely running as service_role — which is the one thing
-- that makes this clause safe. Applying it on the assumption that the deploy
-- worked is what broke Meta capture for ~5 hours earlier the same day.
--
-- EVIDENCE, 2026-11-17 (production):
--   leadgen 1913133206136340 — form 3634773886703639 (V2), external_form_version
--     "v2". A REAL patient lead: submitted 23:31:51 UTC, stored 23:31:56, with
--     campaign / ad set / ad attribution intact. Ingestion completed in 1.79s.
--   leadgen 2135196257099074 — form 3068973836772964 (V3), external_form_version
--     "v3". A synthetic test lead created through Meta's test_leads endpoint and
--     removed from public.forms afterwards. Ingestion completed in 1.21s.
--   Both leads: staff-notification 'accepted' with a provider message id;
--     patient-confirmation 'suppressed' with error_code 'flag_disabled' and zero
--     attempts, so no provider call was made for the patient email.
--   The ingestion and delivery audit rows for both are retained deliberately —
--     they contain no patient data and they are the proof.
--
-- WHY THIS IS SAFE
-- Meta ingestion runs as service_role, which bypasses RLS entirely, so this
-- clause cannot reach it. It only stops a PUBLIC client from claiming to be a
-- Meta lead and thereby forging channel attribution and cost-per-lead.
--
-- Verified immediately after applying, inside a rolled-back transaction:
--   website form insert as anon            -> PASS
--   anon claiming form_source=meta-...     -> BLOCKED
--   anon writing external_lead_id          -> BLOCKED
--   service_role writing external_*        -> PASS
--
-- ROLLBACK, if a Meta lead ever stops persisting after this: restore the interim
-- policy from 202611170005, which omits only the form_source clause. Do NOT
-- instead relax the external_* clauses — those block the attack that can poison
-- a real patient's lead row.

drop policy if exists "Public website can submit leads" on public.forms;

create policy "Public website can submit leads"
  on public.forms
  for insert
  to anon, authenticated
  with check (
    -- Reserved for server-side Meta ingestion (service_role, bypasses RLS).
    external_lead_id      is null
    and external_form_id      is null
    and external_form_version is null
    and external_submitted_at is null
    -- A public client may not claim a channel it cannot be. Only the
    -- signature-verified Meta webhook may write this value.
    and (form_source is null or form_source <> 'meta-instant-form')
  );

comment on policy "Public website can submit leads" on public.forms is
  'anon/authenticated may INSERT a website lead only: no external_* identity columns and not form_source=meta-instant-form. Those are reserved for the signature-verified Meta webhook running as service_role, verified working in production 2026-11-17. Still no SELECT/UPDATE/DELETE policy.';
