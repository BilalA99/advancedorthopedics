-- Records the visitor's advertising-consent choice alongside the lead.
--
-- WHY THIS EXISTS
-- The consent banner stores its decision only in browser localStorage
-- (mso_cookie_consent_v1). Nothing about that choice ever reached the server,
-- which had two consequences found in the 2026-11-12 consent audit:
--
--   1. No auditable record existed that any given lead was collected with or
--      without marketing consent — on a healthcare site whose banner exists
--      precisely to create that record.
--
--   2. The downstream pipeline (public.forms AFTER INSERT trigger ->
--      Apps Script "Mountain Spine Lead Sheet Auto Sync" -> Google Ads offline
--      conversion import) had no field it COULD branch on. A visitor who
--      pressed Reject and then submitted a form still had their click ID and
--      SHA-256 email/phone uploaded to Google Ads, because the receiver was
--      structurally incapable of knowing they had refused.
--
-- Nullable on purpose: lead capture must never fail because a consent value is
-- missing or malformed. NULL means "not recorded" (rows written before this
-- migration, or a client that could not read its own storage) and MUST be
-- treated as NOT CONSENTED by any advertising consumer — fail closed.
--
-- Lead persistence itself remains completely independent of consent. A patient
-- who refuses marketing cookies can still request care, and this column must
-- never be used to gate the insert, the notification email, or internal
-- recordkeeping.

ALTER TABLE public.forms
  ADD COLUMN IF NOT EXISTS marketing_consent boolean,
  ADD COLUMN IF NOT EXISTS consent_recorded_at timestamptz;

COMMENT ON COLUMN public.forms.marketing_consent IS
  'Visitor advertising-consent state at submission. NULL = not recorded; treat as NOT consented. Gates offline conversion upload only — never lead persistence.';

COMMENT ON COLUMN public.forms.consent_recorded_at IS
  'Client timestamp of the stored consent decision, for audit. NULL when no decision was recorded.';

-- Partial index: the offline export reads only consented rows carrying a click ID.
CREATE INDEX IF NOT EXISTS forms_marketing_consent_idx
  ON public.forms (marketing_consent)
  WHERE marketing_consent IS TRUE;
