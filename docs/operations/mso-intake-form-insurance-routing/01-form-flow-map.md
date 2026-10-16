# 01 — Form and lead-flow map

## The lead path, end to end

```
Visitor
  → landing page (organic page, /lp/* paid landing page, or a location page)
  → intake form component (one of nine, below)
  → client validation: zod schema + the shared ZIP rule (lib/postal-code.ts)
  → POST to one of four endpoints under /api/forms/
  → server validation + qualification (lib/intake-submission.ts → resolveIntake)
      ├─ malformed ZIP        → 400, nothing is stored or emailed
      └─ otherwise            → continue, with a server-decided qualification
  → sendContactEmail   → Resend → info@mountainspineorthopedics.com (staff)
  → sendUserEmail      → logLeadToSupabase → public.forms  (submission_id minted here)
                       → Resend → patient confirmation
  → response: { ok, submissionId, qualification, destination }
  → browser obeys `qualification`:
      ├─ qualified   → pushAcceptedLead → canonical lead_form_submit_success event
      │                                 → (consent-gated) Enhanced Conversions push
      │                                 → (eligible sources only) Meta Lead
      │                → router.push('/thank-you')
      └─ unqualified → NO dataLayer event at all
                       → router.push('/thank-you/other')
  → GTM → GA4 / Google Ads
  → Appflow Analytics reads Supabase (so unqualified volume stays measurable)
```

The conversion fires from the **dataLayer push before navigation**, never from
arriving at a page. Both thank-you pages are inert: neither contains `dataLayer`,
`pushEvent`, `gtag(`, `restoreECFromSession` or any other emitter, which a test now
enforces. That is what makes a direct visit, a refresh and a back/forward all
worth zero conversions.

## The nine intake forms

All nine reach `pushAcceptedLead`, whose `lead_qualification` parameter **defaults
to `'qualified'`**. That default is right for the clinical questionnaires that
never ask about insurance, and dangerous for an intake form that does — so every
form below now passes the server's decision explicitly, and the build gate fails
if one stops.

| Component | Rendered on | Endpoint | ZIP | Insurance |
| --- | --- | --- | --- | --- |
| `ContactForm` (`ConsultationForm`) | homepage, `/insurance-policy`, `/about`, conditions, treatments, injuries, blogs, locations, `/patient-forms`, `/find-care/*` | `consultation` | yes | yes |
| `DoctorContactForm` | **`/find-care/book-an-appointment`**, doctor profiles, area-of-pain pages, homepage desktop hero (≥1366px, lazily mounted by `HeroContactFormIdle`) | `doctor` | yes | yes |
| `BodyPartHeroForm` | **`/lp/*` paid landing pages**, condition and body-part pages | `doctor` | yes | yes |
| `BookAnAppoitmentButton` | sitewide modal (16 importers) | `book-appointment` | yes | yes |
| `BookAnAppointmentPopup` | inside `BookAnAppoitmentButton` | `book-appointment` | no | yes |
| `MobileHeroMiniForm` | homepage mobile hero (via `MobileHeroConversionPanel`) | `doctor` | yes | yes |
| `StateHeroForm` | `/locations/[state]` | `consultation` | yes | yes |
| `MiniContactForm` | `/conditions/[slug]` | `consultation` | no | yes |
| `PatientAdvocateForm` | `/insurance-policy`, `ContactForm` | `patient-advocate` | yes | yes |

Three further lead forms exist and are deliberately **out of scope** — see
`04-implementation-summary.md` § "Not included":
`CandidacyCheckClient`, `ConditionCheckSection` (clinical questionnaires that ask
their own insurance question and are excluded from Meta by
`isMetaEligibleFormSource`) and `LawyerContactForm` (attorney coordination, not
patient intake).

### Which form paid traffic uses

`/lp/*` pages carry `form_source: 'paid-landing'` and render **`BodyPartHeroForm`**.
`/find-care/book-an-appointment` carries `form_source: 'book-appointment'` and
renders **`DoctorContactForm`**. Neither is `ConsultationForm`. This is why the
work was extended past the single component the meeting notes implied — gating only
`ConsultationForm` would have left the paid and booking paths firing qualified
conversions unconditionally, which is the opposite of the meeting's stated purpose.

### Desktop and mobile are different components

The homepage renders `MobileHeroMiniForm` on small screens and `DoctorContactForm`
in the desktop hero, the latter mounted lazily on idle by
`HeroContactFormIdle.client.tsx` and only visible from about 1366px. Testing one
viewport would have missed the other entirely.

## Fields carried through the flow

Visible, per form (exact set varies — see the table above):
name / first + last name, email, phone, **ZIP**, state, **insurance**, reason.

Hidden or derived on every submission:
`gclid`, `gbraid`, `wbraid`, `utm_source`, `utm_medium`, `utm_campaign`,
`utm_term`, `utm_content`, `country`, `form_source`, `landing_path`,
`created_at` (Supabase default) and `submission_id` (server-minted UUID).

There is no separate consent checkbox on these forms; consent is handled sitewide
by `CookieConsentManager` and read through `lib/consent.ts`.

## Where each field ends up

| Field | Supabase `forms` | Staff email | Canonical lead event | Enhanced Conversions |
| --- | --- | --- | --- | --- |
| name | `patient_name` | yes | no | hashed |
| email | `patient_email` | yes | no | hashed |
| phone | `patient_phone` | yes | no | hashed (E.164) |
| **ZIP** | **`postal_code`** (new) | **yes** (new) | **no** | `address.postal_code`, unhashed per Google's spec |
| **insurance** | `insurance_type` | **yes** (new) | **no** | **no** |
| state | `state` | yes | `market` | no |
| reason | `reason` | yes | no | no |
| gclid / gbraid / wbraid | yes | gclid only | no | no |
| utm_* | yes | yes | no | no |
| landing_path | yes | no | no | no |
| form_source | yes | no | `form_source` | no |
| submission_id | yes | no | `submission_id` | no |
| qualification | *(derivable from `insurance_type`)* | no | **no** | **no** |

The canonical lead event is a closed set of six operational keys —
`event`, `form_id`, `form_source`, `page_path`, `market`, `submission_id` — and a
test asserts that exact key set so it cannot silently gain a seventh.

## Duplicate-conversion surface, and what closes it

| Route to a duplicate | Closed by |
| --- | --- |
| Direct visit to `/thank-you` | both thank-you pages contain no emitter at all |
| Refresh / back / forward | same, plus the in-page `emittedSubmissionIds` set |
| Double or triple click on submit | synchronous `submittingRef` guard; the button is no longer re-enabled in a `finally` before navigation |
| Retry after a timeout | `emittedSubmissionIds` keyed on the server's submission id |
| Same lead emailed twice | Resend `Idempotency-Key` derived from a stable submission fingerprint |
| An "Other" lead promoted to qualified on retry | the submission id is registered **before** the qualification gate returns |
| A forged `qualification` on the wire | `parseLeadRouting` re-derives the destination from the qualification and fails closed |
| A forged insurance value | server-side `classifyInsurance`, which fails closed |

One genuine gap remains and is documented rather than hidden: a patient who
submits, lands on the thank-you page and then navigates back and submits a *second*
time creates a second lead with a new `submission_id`, which is a second
conversion. That is a real second enquiry from the clinic's point of view, and
Resend's idempotency key collapses the duplicate emails. Deduplicating it further
would need a server-side fingerprint window.
