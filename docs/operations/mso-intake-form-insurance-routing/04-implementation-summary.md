# 04 — Implementation summary

## The correction this work exists for

The previous commit on this branch (`388d7f7`) implemented the insurance dropdown
and routing on one form, but **removed the ZIP / postal code field**, which the
2026-09-24 meeting had explicitly kept. This work restores ZIP everywhere, keeps
only "Best Time To Contact" removed, and extends the routing split to every intake
surface.

## Field-level before / after (the intake forms)

| Field | Before this work | After |
| --- | --- | --- |
| ZIP / Postal Code | **removed by `388d7f7`** | **restored**: visible, labelled, required client-side, format-validated on both sides, stored, notified, attributed |
| Best Time To Contact | present on 8 of 9 forms | **removed from all 9** (kept on the MRI / candidacy / condition questionnaires, which still ask it) |
| Insurance | on 1 of 9 forms, PPO + Other only | **on all 9**, 15 options derived from the published plan list |

## What changed, by file

### New

| File | Why |
| --- | --- |
| `lib/postal-code.ts` | The one ZIP rule. Normalisation, validation, ZIP-as-a-string. Replaces five copies of `/^\d{5}(?:-\d{4})?$/` and the server's complete absence of ZIP validation. |
| `lib/intake-submission.ts` | `resolveIntake` — the one server-side decision point for ZIP format and qualification, shared by all four endpoints so they cannot drift. |
| `supabase/migrations/202609270001_add_postal_code.sql` | Adds `public.forms.postal_code`. Applied to production **before** the code that writes it. |
| `app/thank-you/other/*` | The non-qualified confirmation (from `388d7f7`, kept). |
| `tests/measurement-intake-zip.test.ts` | 48 tests: the ZIP rule, ZIP preservation, best-time removal, the server resolver, routing, the privacy boundary, duplicate protection. |

### Rewritten

| File | Change |
| --- | --- |
| `lib/insurance-routing.ts` | Now **derives** its options from `components/data/insurancePlans.ts`. `APPROVED_PLANS`, `FALLBACK_PLANS` and the `INSURANCE_LIST_APPROVED` flag are gone — they were a second copy of a list that already existed. Adds the server-authoritative contract (`resolveLeadRouting`, `parseLeadRouting`, `destinationFor`, `pathForDestination`). |

### Forms (all nine)

Each: best-time removed, insurance dropdown added from the shared config, the
server's qualification obeyed, `lead_qualification` passed to `pushAcceptedLead`,
navigation by the server's destination, ZIP left exactly where it was (or restored).

`ContactForm`, `DoctorContactForm`, `BodyPartHeroForm`, `BookAnAppoitmentButton`,
`BookAnAppointmentPopup`, `MobileHeroMiniForm`, `StateHeroForm`, `MiniContactForm`,
`PatientAdvocateForm`.

### Endpoints (all four)

`consultation`, `doctor`, `book-appointment`, `patient-advocate` — each now calls
`resolveIntake`, returns `{ ok, submissionId, qualification, destination }`, and
forwards ZIP and insurance to storage and the staff email. None of them previously
forwarded ZIP at all.

### Persistence and notification

- `logLeadToSupabase` writes `postal_code`.
- The staff email template gained a conditional **ZIP Code** row and a conditional
  **Insurance** row; the best-time row is conditional, so no empty label renders.
- `best_time` keeps being written by the questionnaires that still ask it, and
  historical values are untouched.

### Gate

`scripts/validate-measurement-contract.mjs` — 10 checks before, **14** now.

## Specific decisions worth knowing

### ZIP is required by the form, format-validated by the server

The server rejects a malformed ZIP but accepts an absent one. Requiredness differs
per form — `ConsultationForm` requires ZIP, the compact `MiniContactForm` has never
collected it — and all three of those forms post to the same endpoint. Hard-
requiring ZIP there would have 400'd every `MiniContactForm` lead. Requiredness
stays with the form, where the patient can see the error; the server guarantees
nothing malformed is ever stored.

### ZIP is a string, end to end

`Number("02134")` is `2134`, a different postal code. Nothing in the ZIP path
coerces, parses or numerically compares. Tested against the whole 0xxxx band.

A mobile numeric keypad has no hyphen, so a patient entering a ZIP+4 there types
nine bare digits; the normaliser turns `334631234` into `33463-1234` rather than
failing them for using the keyboard we asked for. En dashes from autocorrecting
keyboards are handled the same way.

### The label association bug that was nearly introduced

Adding `htmlFor="postal_code"` to the intake ZIP label looked correct and was not:
`id="postal_code"` is duplicated across five components, and the homepage lazily
mounts `DoctorContactForm`, so on several pages `label[for="postal_code"]` resolved
to a **hidden input in a different form**. Removed; the accessible name comes from
`aria-label`, which takes precedence over a `<label>` anyway. De-duplicating those
ids is listed below as follow-up work.

### The submit lock

The forms re-enabled the submit button in a `finally` block that ran before
`router.push` completed, leaving a window in which a second click produced a second
lead — with a *new* `submission_id`, so neither the in-page dedupe nor Resend's
idempotency key would have collapsed it. The button now stays disabled through
navigation, and a synchronous `submittingRef` closes the gap that `setState`'s
asynchrony leaves open.

## Pre-existing bugs found and fixed along the way

1. **ZIP was never stored.** No column, no writer. Fixed by the migration plus the
   writer.
2. **`MiniContactForm` was unsubmittable.** Its zod schema required `bestTime`
   (`min(1)`) while no input for it was ever rendered, so the resolver could never
   pass. Rendering the replacement insurance field is what makes the form work.
3. **`PatientAdvocateForm` had no `FormMessage`** on that field, so its required-
   field error was invisible.
4. **Four forms carried their own ZIP regex**; the server had none.
5. **A dangling documentation reference** (`docs/2026-09-26-intake/`) that was never
   created. Now points at `03-tracking-audit.md`.

## Not included, and why

| Item | Status |
| --- | --- |
| `CandidacyCheckClient`, `ConditionCheckSection` | Clinical questionnaires that ask their **own** insurance question and post through server actions rather than the four intake endpoints. They still fire the qualified conversion unconditionally. Gating them is real remaining work — see `FINAL-CLOSEOUT.md`. |
| `LawyerContactForm` | Attorney coordination, not patient intake. Out of scope. |
| `FreeMRIReviewClient` | Still asks best-time, correctly — it is a clinical questionnaire, not the intake form the meeting discussed. |
| Duplicate `id="postal_code"` across five components | Pre-existing HTML validity / label-association issue. Not fixed here because renaming ids touches selectors the tests and the gate key on; worth a focused follow-up. |
| shadcn `Input`'s `md:text-sm` | Every field in every form is 14px at ≥768px, so an iPad focus zooms. Sitewide and pre-existing; fixing it changes every form on the site. |
| `isAdvertisingAllowed` docstring vs. behaviour | The comment claims Enhanced Conversions are gated on `hasMarketingConsent()`; the code gates on `isAdvertisingAllowed()`, which is true for undecided visitors. Pre-existing owner decision — flagged, not changed. |
| `@types/react` / `scheduler` mismatch | Makes `tsc` unusable. Pre-existing, one-line dependency fix, separate work. |
