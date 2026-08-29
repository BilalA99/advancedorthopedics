# Measurement QA Report — 2026-08-29

Branch `HomeSEO`, rebased onto `upstream/main` (AppFlow-Studio) at `5c99f1b`.

## Headline

The SHARED-02 / SHARED-03 remediation was **not missing** — it was sitting
uncommitted in the working tree (31 modified files plus `lib/lead-contract.ts`,
the attribution migration, and `tests/measurement-contract.test.ts`). It is now
committed, rebased onto latest upstream, extended, and the database migration it
depended on has been applied to production.

## Deploy-ordering hazard found and closed

Production `public.forms` had **no** `submission_id`, `gbraid` or `wbraid`
columns. The committed application code inserts all three, and persistence now
throws on failure rather than swallowing it. Deploying the code before the
migration would have made **every** form submission return 500 — zero leads
captured, with a confirmation email already sent to the patient.

The migration was applied first (Supabase project `bwrnnmzqipnoakmdbevz`,
migration `add_google_braid_attribution`) and verified:

| Check | Result |
|---|---|
| Rows in `public.forms` | 1,142 |
| Rows with NULL `submission_id` after backfill | 0 |
| Distinct `submission_id` values | 1,142 (all unique) |
| `submission_id` nullability / default | `NOT NULL` / `gen_random_uuid()` |
| `gbraid`, `wbraid` columns present | yes |
| Unique index `forms_submission_id_key` | present |

The migration is additive, so the currently-deployed code (which ignores the new
columns) continues to work. Code and migration can now deploy in either order.

## Invariants

| Invariant | Status | Evidence |
|---|---|---|
| One accepted form → one `lead_form_submit_success` | Implemented | Dedupe by `submissionId` in `utils/enhancedConversions.ts`; `tests/measurement-contract.test.ts` (8/8) |
| Rejected/failed form → zero accepted-lead events | Implemented | `pushAcceptedLead` returns false unless `readLeadAcceptance` parses `{ok:true, submissionId}` |
| Direct `/thank-you` or refresh → zero events | Implemented | Conversion restoration removed from `app/thank-you/page.tsx`; asserted by test 8 |
| Duplicate/retry → one stored lead, one event | Partial | Client-side dedupe by submission ID. **Server-side idempotency is not yet enforced** — a retried POST creates a second row with a new UUID. See open risks. |
| GCLID/GBRAID/WBRAID + UTMs persist | Implemented | `lib/gclid.ts` with click-ID validation; tests 3 and 4 |
| No PII/PHI in analytics payloads | Implemented | Canonical event carries only form ID, form source, page path, market, submission ID; test 7 |
| Single GA4 owner | Implemented | Hard-coded `gtag` bootstrap removed from `app/layout.tsx`; GTM is sole loader |

## Changes made this session beyond the recovered work

- **Persist before email.** All five persisting `send*Email` functions called
  `resend.emails.send()` first. With persistence now throwing, that ordering
  could email a patient a confirmation for a lead that was never stored. A
  stored lead with no email is recoverable by staff; the reverse is not.
  Reordered in `components/email/sendcontactemail.ts` (84 insertions,
  84 deletions — a pure move).

## Open risks

1. **Server-side idempotency.** A client retry or double-submit still creates a
   second `forms` row. The client emits one event per submission ID, so
   analytics stay correct, but the CRM sees duplicates. A natural key
   (email + form_source + truncated timestamp) or an idempotency key from the
   client would close this.
2. **`sendContactEmail` returns the Resend response, not an acceptance.** This
   is by design — it is the staff notification and every caller pairs it with
   `sendUserEmail`, which is the persistence boundary. Verified across all
   callers. Worth a comment-level guard so a future caller does not treat it as
   an acceptance.

## Not verified — requires live systems access

The following cannot be proven from the repository and remain open for the
PBG launch gate:

- Tag Assistant / GA4 DebugView confirmation that exactly one
  `lead_form_submit_success` reaches GA4 on a real submission.
- Retirement of legacy GTM triggers bound to `form_submit` / `form_submission`.
  **These must not be retired until the new code is deployed**, or conversions
  stop entirely.
- CallRail dynamic number insertion, pool assignment, and Florida/NJ routing.
- A controlled test call per market.
- Confirmation that the accessible name matches the `tel:` href after CallRail
  swaps the displayed number.
