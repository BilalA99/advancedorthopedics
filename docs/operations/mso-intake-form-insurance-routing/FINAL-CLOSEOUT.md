# FINAL CLOSEOUT — MSO intake form, insurance routing

## What was asked, and what was delivered

The 2026-09-24 meeting decided: remove "Best Time To Contact", **keep ZIP**, add a
required insurance dropdown with PPO named explicitly, route accepted insurance and
PPO to a conversion-tracked thank-you page, route "Other" to a separate page that
fires no conversion, and keep receiving every lead either way.

The previous commit on this branch had implemented the routing on one form but
**removed ZIP**, which the meeting had explicitly kept. That correction is the core
of this work, and it grew in two directions once the code was actually read and the
site actually driven in a browser.

| Requirement | Status |
| --- | --- |
| ZIP kept, visible, labelled, required | done, on every form that had it |
| ZIP validation preserved (client **and** server) | done — one shared rule, `lib/postal-code.ts` |
| ZIP stored | **done — it never was before**; new `forms.postal_code` column |
| ZIP in notifications | **done — it never was before** |
| ZIP in attribution / Enhanced Conversions | restored (the previous commit had dropped it) |
| "Best time to contact" removed | done, from all 9 intake forms and all 4 endpoints |
| Required insurance dropdown | done, on all 9 intake forms |
| PPO explicit | done — `PPO (any carrier)`, first in the list |
| Approved plan list | done — derived from the practice's own published list |
| Accepted / PPO → qualified flow | done, verified in-browser on 4 surfaces |
| "Other" → separate flow | done, verified in-browser on 4 surfaces |
| Qualified conversion fires exactly once | verified |
| "Other" fires zero qualified conversions | verified |
| Every lead preserved regardless of qualification | verified |
| Desktop visual testing | 10/10 viewports |
| Mobile visual testing | 18/18 viewports |
| Desktop E2E | 44/44 + all other surfaces |
| Mobile E2E | 51/51 + all other surfaces |
| Automated tests | 146/146 |
| Build gate | 14/14 checks, each verified to fail when broken |
| Production build | exit 0, 768/768 pages |

## The two scope decisions you made, and what they cost

1. **Derive the list from `components/data/insurancePlans.ts`.** That file already
   existed, is published to patients on `/insurance-policy`, and carries a per-plan
   `accepted` / `partial` / `not-accepted` status. The dropdown now has 15 options
   instead of 2, including three carriers the meeting never mentioned (Meritain,
   MultiPlan/PHCS, Bright Health) and honest options for Medicare, Medicaid and HMO
   patients. No separate approval from AB was needed, because this list *is* the
   practice's own public statement of what it accepts.

2. **Extend to all remaining form surfaces.** Gating only `ConsultationForm` would
   have left the two highest-value paths ungated: `/find-care/book-an-appointment`
   renders `DoctorContactForm` (`<ConsultationForm />` is commented out there), and
   the `/lp/*` paid landing pages render `BodyPartHeroForm`. Both now gate the
   conversion.

## Bugs found that were not part of the brief

| Bug | Severity | Status |
| --- | --- | --- |
| ZIP was never stored anywhere — no column, no writer | high | fixed |
| `MiniContactForm` was unsubmittable: required `bestTime` in its schema with no input rendered | high | fixed |
| `PatientAdvocateForm` had no `FormMessage`, so its required-field error was invisible | medium | fixed |
| Submit re-enabled in a `finally` before navigation, leaving a double-submit window that mints a *second* submission id | medium | fixed |
| Four forms carried their own ZIP regex; the server validated ZIP nowhere | medium | fixed |
| `DoctorContactForm` emitted duplicate `id="doctor_insurance_type"` across its two layout variants | low | fixed |
| Dangling doc reference to a directory that was never created | low | fixed |

Two near-misses caught during testing, worth knowing because both would have
shipped silently:

- Adding `htmlFor="postal_code"` to the ZIP label looked correct but resolved to a
  **hidden input in a different form** on pages with more than one form. Removed.
- A regex-driven edit inserted `lead_qualification: qualification` into the request
  **payload** of two forms, where `qualification` is not yet declared — a runtime
  TDZ crash, and also the exact "client asserts its own qualification" anti-pattern
  the brief forbids. Caught by deliberately breaking the gate and noticing it did
  not fire.

## The most serious thing found — and it is not part of this change

**`/find-care/book-an-appointment`, the main booking page, has a form that cannot
be submitted.** Fill every field, click "Book an Appointment", and nothing happens:
no dialog opens, no network request is made, no validation error appears, the URL
does not change.

Cause: `DoctorContactForm` renders an outer `<form>` with **no `onSubmit`** — the
fields the page displays — and the real `<form onSubmit={…}>` lives inside a
`<Dialog>` **nested inside that outer form**. Nested `<form>` elements are invalid
HTML, so the parser discards the inner one, taking its submit handler and its
submit button with it.

Verified pre-existing, not caused by this work:
`git show HEAD:components/DoctorContactForm.tsx` has the identical structure —
outer form at line 301 with no `onSubmit`, and zero `<button>` elements between it
and the inner form at 621. Verified in a real browser with a real mouse click at
the CTA's exact centre coordinates, not a synthetic event.

It was **not fixed here**: repairing it means restructuring that component's
layout, which is outside this brief and needs a decision about whether the intended
flow is inline submission or the dialog. It is listed first under remaining work
because, if the booking page has been dead for any length of time, it dominates
every other number in this document.

The insurance dropdown, the server gate and the routing **are** wired into
`DoctorContactForm`; they simply cannot be exercised from that page until the
nesting is fixed. Everywhere else the component renders, they work.

## Things you should know, that I did not change

1. **GA4 / Google Ads `lead_form_submit_success` volume will drop.** "Other" leads
   no longer emit it. That is the intended effect — the conversion action becomes a
   qualified-lead signal. Total lead volume is unchanged and visible in Supabase.
   Anyone comparing week-over-week without knowing this will read it as a
   regression.

2. **Enhanced Conversions run for undecided visitors.** `isAdvertisingAllowed()`
   returns `true` when nothing is stored (your 2026-09-21 US decision), so hashed
   identity and unhashed ZIP are transmitted unless the visitor explicitly refuses.
   The docstring on that function claims EC is gated on `hasMarketingConsent()`,
   which is **not what the code does**. Pre-existing; the comment is wrong, not the
   code. Worth a decision rather than a silent fix.

3. **`tsc` is unusable in this repo.** `@types/react@18.0.38` imports
   `scheduler/tracing`, which `scheduler@0.23.2` no longer ships, collapsing
   `JSX.IntrinsicElements` and producing ~20,664 errors in files nobody touched.
   One-line dependency bump. Type confidence here came from the build, the 146 tests
   and the in-browser runs instead.

4. **iPad focus-zoom.** shadcn's `Input` has `md:text-sm`, so every field on the
   site is 14px at ≥768px. Sitewide and pre-existing.

5. **Duplicate `id="postal_code"`** across five components. Invalid HTML, breaks
   `label[for]`. Not fixed because renaming ids touches selectors the tests and the
   gate key on; worth a focused follow-up.

## Remaining work, in priority order

1. **Fix `/find-care/book-an-appointment`.** See above — the main booking page's
   form cannot be submitted. Unnest the `<form>` elements: either give the outer
   form an `onSubmit` and a real submit button, or move the `<Dialog>` out of it.
2. **Gate the clinical questionnaires.** `CandidacyCheckClient` and
   `ConditionCheckSection` already collect an insurance answer and still fire the
   qualified conversion unconditionally, because `lead_qualification` defaults to
   `'qualified'`. They post through server actions rather than the four intake
   endpoints, so they need their own pass. This is the largest remaining hole in
   the qualified signal.
3. Run GTM Preview against production — steps in `08-gtm-verification.md`.
4. De-duplicate `id="postal_code"` across the five components.
5. Bump `@types/react` so `tsc` works again.
6. Decide on the Enhanced-Conversions consent question in point 2 above.

## Where this stopped

Production was **not** deployed. At your direction the work stops at
**PR #4** (https://github.com/BilalA99/advancedorthopedics/pull/4), commit
`8d5f9c2`, so you can review the Vercel preview and the 15-option dropdown before
it reaches patients.

The one thing already live in production is the additive `forms.postal_code`
column, applied deliberately ahead of the code. It is inert until the code that
writes it ships, and that ordering is what prevents the class of outage that broke
lead capture for four days when `landing_path` shipped without a migration.

Post-merge verification steps are in `09-production-verification.md`.

## Evidence

```
docs/operations/mso-intake-form-insurance-routing/
  00-baseline.md                 08-gtm-verification.md
  01-form-flow-map.md            09-production-verification.md
  02-insurance-configuration.md  10-rollback.md
  03-tracking-audit.md           FINAL-CLOSEOUT.md
  04-implementation-summary.md   evidence/desktop/  (10 screenshots)
  05-desktop-test-matrix.md      evidence/mobile/   (18 screenshots)
  06-mobile-test-matrix.md       evidence/visual-matrix-results.json
  07-visual-regression.md
```

All test data is synthetic (`Testpatient Synthetic`, `qa+intake@example.com`,
ZIP `33463`). No real patient data appears in any artefact.
