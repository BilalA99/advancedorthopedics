-- INTERIM POLICY. Restores Meta lead capture for the CURRENTLY DEPLOYED code.
--
-- ⚠️ ALREADY APPLIED IN PRODUCTION (project bwrnnmzqipnoakmdbevz, 2026-11-17).
-- This file is committed to bring the repo level with the database.
--
-- WHAT WENT WRONG
-- 202611170003 forbade `anon` from writing form_source='meta-instant-form'. That
-- is correct ONLY once the application writes Meta leads as service_role. It was
-- applied before that code shipped, so the deployed webhook — which inserts
-- form_source='meta-instant-form' with the publishable key — had every Meta
-- insert rejected by RLS from roughly 17:50 UTC on 2026-11-17 until this
-- migration.
--
-- Verified blast radius, by query rather than assumption:
--   * No Meta lead was lost. The newest Meta lead remained 2026-11-16 23:32 UTC,
--     before the window opened, so nothing hit the closed policy.
--   * Website forms were unaffected throughout. A real `modal-appointment` lead
--     persisted normally at 19:40 UTC, inside the window.
--   * Staff notification was never at risk: it does not depend on the insert,
--     so even a Meta lead arriving in the window would still have reached
--     info@ with full contact details. The loss would have been the database
--     row and the lead-sheet line, not the patient.
--
-- This is the mirror image of 202609140001_add_landing_path.sql, where code ran
-- ahead of the schema for ~4 days and every insert was rejected. The rule is the
-- same in both directions, and worth stating plainly because this repo has now
-- been bitten by it twice: a migration and the code that depends on it must not
-- be separated in time, and when they unavoidably are, THE DATABASE MUST
-- TOLERATE BOTH VERSIONS OF THE CODE for the whole gap. An additive migration
-- does that by construction. A RESTRICTING one does not, and must therefore be
-- applied after the deploy, never before it.
--
-- WHAT THIS POLICY DOES
-- Keeps the half of the fix that matters most; drops the half that needs code.
--
--   STILL BLOCKED — anon may not write external_lead_id, external_form_id,
--   external_form_version or external_submitted_at. This is the serious abuse:
--   reserving a leadgen_id so the real webhook's insert is refused as a
--   duplicate and the row a scheduler reads is the attacker's, plus forging a
--   version label.
--
--   TEMPORARILY ALLOWED AGAIN — anon may set form_source='meta-instant-form'.
--   This is exactly the pre-existing production behaviour, so it is not a new
--   exposure; it is the absence of an improvement. It lets a public client forge
--   channel attribution and cost-per-lead. It cannot cause an email: outbound
--   mail is created only on the signature-verified webhook path, and nothing
--   reads public.forms to decide what to send.
--
-- Net position versus before any of this work: strictly better.
--
-- ── RE-TIGHTEN AFTER THE CODE DEPLOYS ───────────────────────────────────────
-- Once the release carrying lib/meta-lead-ingest.ts and the service_role switch
-- in logLeadToSupabase is live, AND a Meta lead has been observed persisting
-- with a non-null external_lead_id, re-apply the full policy from
-- 202611170003. Until then THIS file is the policy in force.
--
-- Re-tighten with:
--   drop policy if exists "Public website can submit leads" on public.forms;
--   create policy "Public website can submit leads" on public.forms
--     for insert to anon, authenticated
--     with check (
--       external_lead_id is null and external_form_id is null
--       and external_form_version is null and external_submitted_at is null
--       and (form_source is null or form_source <> 'meta-instant-form')
--     );

drop policy if exists "Public website can submit leads" on public.forms;

create policy "Public website can submit leads"
  on public.forms
  for insert
  to anon, authenticated
  with check (
    -- Reserved for server-side Meta ingestion. Never writable by a public client.
    external_lead_id      is null
    and external_form_id      is null
    and external_form_version is null
    and external_submitted_at is null
    -- NOTE: the form_source restriction from 202611170003 is deliberately absent
    -- here. Restore it only together with the service_role ingestion code.
  );

comment on policy "Public website can submit leads" on public.forms is
  'INTERIM (2026-11-17). anon/authenticated may INSERT a lead but may not write any external_* identity column. The form_source=meta-instant-form restriction is lifted until the service_role Meta ingestion code is deployed — re-apply 202611170003 after that release is verified. Still no SELECT/UPDATE/DELETE policy.';
