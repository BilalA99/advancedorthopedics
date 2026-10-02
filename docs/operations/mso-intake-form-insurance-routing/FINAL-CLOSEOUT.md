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
| Required insurance dropdown | done, on all 9 intake forms **and the 3 clinical questionnaires** |
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
| Automated tests | 148/148 |
| Build gate | 15/15 checks, each verified to fail when broken |
| Typecheck | 20,664 → 44 errors, none in files this work touched |
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

   This was then taken all the way: the three **clinical questionnaires**
   (candidacy check, condition check, free MRI review) also ask for insurance and
   also fired the qualified conversion unconditionally. They now decide it
   server-side in their own server actions and obey the answer, exactly as the four
   endpoints do. Twelve lead surfaces are gated, not one.

3. **One insurance list, not four.** The questionnaires each carried their own
   copy — `"Cigna Healthcare"`, `"Meritan Health"` (a typo for Meritain),
   `"Multiplan"`, `"United Healthcare"` — none of which matched the values the rest
   of the system stores. Those leads could never be classified, and the lead
   sheet's PPO detection (a substring test for `"ppo"`) marked every one of them
   STANDARD. All four lists are now the one canonical list.

4. **`Self-pay / no insurance` was added to the plan list** as an accepted,
   non-PPO payer, alongside Workers' Compensation and Auto/PIP. It was already a
   live option on the candidacy form, the practice demonstrably serves those
   patients, and the `/thank-you/other` page already offers self-pay pricing. It
   now appears on every intake form and qualifies. Reverse it by deleting one entry
   from `insurancePlans.ts` if that is not what you want.

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

## A finding I reported and then disproved

An earlier pass of this document claimed `/find-care/book-an-appointment` could
not be submitted at all. **That was wrong, and it is worth saying plainly rather
than quietly deleting.**

The page works. Its "Book an Appointment" CTA opens a Radix Dialog containing the
real form, and the full PPO and Other flows have now been driven through it end to
end on desktop and mobile: PPO routes to `/thank-you` with exactly one conversion,
Other routes to `/thank-you/other` with none.

What produced the false finding: the CTA sits below the fold at y≈1050 in a 900px
viewport, `scrollIntoView()` called from inside `page.evaluate` did not bring it
into view, and so every coordinate-based click landed on empty space. No dialog
opened, no request fired, no validation error appeared — which reads exactly like a
dead form. An in-page `.click()` on the element carrying the handler opens it
immediately.

Two real (harness) bugs were fixed off the back of it, and both would have hidden
genuine regressions later:

- `DoctorContactForm` renders the same RHF field twice — once in the visible
  preview form, once inside the Dialog. Once the Dialog is open Radix makes
  everything behind it inert, so driving the preview copy silently does nothing.
  The harness now resolves to whichever control is actually interactive.
- The state-select guard tested `/select your state/i`, but this component's
  placeholder reads "Select state", so state was never set and the form failed
  validation on a field the harness thought it had filled.

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

3. **`tsc` is usable again.** `@types/react` was bumped to 18.3.31 (matching
   `react@18.3.1`), taking the error count from **20,664 to 44**. Every remaining
   error is pre-existing and unrelated to this work. The restored check immediately
   found two duplicate JSX attributes in `MobileHeroMiniForm`, now fixed.

4. **iPad focus-zoom.** shadcn's `Input` has `md:text-sm`, so every field on the
   site is 14px at ≥768px. Sitewide and pre-existing.

5. **Duplicate ids are gone.** Every ZIP input is now component-scoped
   (`consultation_postal_code`, `doctor_postal_code`, …), the intake form's label is
   properly associated again, and a build-gate check fails if a bare id returns or
   two components ever claim the same one.

## Remaining work

Everything raised in earlier revisions of this document has been closed except one
item, which needs a human hand on a deploy button.

### 1. ZIP into the leads sheet — patch ready, deploy is yours

The website stores ZIP and the Supabase webhook already sends it. The receiver
("Mountain Spine Lead Sheet Auto Sync") has no column for it. The exact two-line
patch is in the appendix of `apps-script/Code.gs`.

**I did not apply it**, deliberately. That project is a live web app: editing the
code is not enough, it has to be re-deployed as a new version, and the database
trigger points at one specific deployment URL. Getting that wrong silently stops
every lead reaching the sheet AND stops the Google Ads offline-conversion export.
That is not a change to make blind from a browser session.

The tracker finds the column by header name, so nothing else needs editing
afterwards — ZIP features are dormant and cannot throw until the column exists.

### 2. Decide: should the offline export be qualification-aware?

The receiver uploads leads to Google Ads as `Offline Form Lead - FL` / `- NJNY`
valued by traffic source, not by whether the practice can serve the patient. Now
that insurance is captured, that export could skip unqualified leads or value them
lower. This is a media-buying decision with budget consequences, not an engineering
one, so it is yours to make rather than mine to assume.

### 3. Decide: Enhanced Conversions for undecided visitors

Described above. `isAdvertisingAllowed()` returns `true` for a visitor who has not
answered the banner, and the function's own docstring says otherwise. The comment is
wrong, not the code — but which one you want to be true is an owner decision.

### 4. Housekeeping

An empty **"Untitled project"** in Apps Script, created accidentally when I opened
Extensions → Apps Script on the leads sheet. No code, no triggers, no deployment.

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
