# Healthcare privacy remediation — Mountain Spine & Orthopedics

**Prepared 2026-11-17 by the website engineering environment.**
**Audience: the authorized client representative and whoever holds privacy/security
sign-off for the practice. This is an escalation, not an engineering plan.**

---

## 0. Read this first

This document is **not** about the Meta V3 feature. The V3 work is technically
ready and ships with its patient confirmation email **disabled**, so it adds no
new patient-data flow.

What this document records is that **the practice's existing, live website has
been processing identifiable patient health information through vendors that are
not contractually authorized to receive it** — and has been doing so since long
before the V3 project started. That finding is the reason the confirmation email
cannot be switched on, but the exposure itself is independent of it and does not
go away by leaving the feature off.

**Nothing has been deleted, disabled, cancelled or purchased.** No patient record
was removed, no infrastructure was torn down, no subscription was bought. Turning
off lead capture or staff access unilaterally would mean patients who ask for
appointments never get called, which is a worse outcome than the exposure. Every
item below needs a decision by someone authorized to make it.

---

## 1. What is actually flowing, and where

Established by direct inspection on 2026-11-17, not inference.

| Data | Where it goes today | Authorized? |
|---|---|---|
| Patient name, phone, email | Supabase `public.forms`; Resend (email body); Google Apps Script → Google Sheet | **No BAA established for any of the three** |
| Date of birth | Supabase `public.forms.date_of_birth`; staff email body | **No** |
| Insurance selection | Supabase `public.forms.insurance_type`; staff email subject (via `subjectWithInsurance`) and body | **No** |
| Clinical answers (pain area, symptoms, prior diagnosis, smoking, recent tests) | Supabase `public.forms.reason`; staff email body — from `condition-check`, `candidacy-check`, `free-mri-review` | **No**, and this is the most sensitive category |
| ZIP, landing page, consent state, ad click ids | Supabase `public.forms` | Same vendors |
| Meta Instant Form leads (name, phone, email, chosen clinic) | Same path | Same vendors |

Volume: **1,400 rows** in `public.forms`, earliest **2025-09-08**, of which **12**
are Meta leads. Every row with a patient email is in scope.

The identity plus the care-seeking event is the protected pairing. A record
saying "this named person asked an orthopedic practice for an appointment" is
PHI in a covered entity's hands **even with no clinical detail attached** — so
the name/phone/email rows are in scope, not only the clinical ones.

> **One legal question that is not engineering's to answer:** whether Mountain
> Spine is a HIPAA covered entity for this activity, and whether these vendors
> are business associates. That determination drives everything below and should
> be made by counsel. The rest of this document assumes it is yes, because that
> is the prudent assumption for a medical practice collecting appointment
> requests, but it has not been confirmed.

---

## 2. Vendor-by-vendor status and required action

### 2.1 Supabase — **database holding every patient record**

| | |
|---|---|
| Verified state | Organization `AppFlow Studios`, plan **Pro**, `opt_in_tags: ["AI_SQL_GENERATOR_OPT_IN"]` — **no HIPAA add-on**. Project `bwrnnmzqipnoakmdbevz` is **not** marked High Compliance. |
| Required | Supabase's docs: a **signed BAA** *and* the **HIPAA add-on** before PHI. High Compliance projects additionally require Point-in-Time Recovery, SSL enforcement, network restrictions and Postgres connection logging. |
| Action | 1. Contact Supabase sales re: BAA + HIPAA add-on (requires Team or Enterprise). 2. Mark the project High Compliance. 3. Satisfy the four required settings. 4. Re-run Supabase's Security Advisor. |
| Decision needed | Plan upgrade cost. **Not purchased** — that is the client's call. |
| Note | `AI_SQL_GENERATOR_OPT_IN` is enabled org-wide. Worth reviewing independently: it governs whether schema is shared with an AI service. It does not appear to send row data, but it should be a deliberate choice on a project holding patient records. |

### 2.2 Resend — **transactional email**

| | |
|---|---|
| Verified state | `resend.com/security`: *"Resend is not HIPAA compliant and cannot sign a Business Associate Agreement."* Enterprise Terms (17 Aug 2026): the Service *"is not designed or intended for Restricted Data … unless the Order Form expressly permits it"*; Restricted Data expressly includes *"protected health information subject to HIPAA"*; PHI allowed only *"under a Business Associate Agreement signed by both parties"*. |
| Current usage | **Every** staff notification and patient confirmation on the site — name, phone, email, DOB, insurance, and clinical answers in message bodies. Insurance also appears in some **subject lines** (`subjectWithInsurance`). |
| Required | Either an Order Form expressly permitting PHI plus a signed BAA — which the public security page says is unavailable — or **replace the provider**. |
| Replacement candidates (will sign a BAA) | Paubox, LuxSci, AWS SES under the AWS BAA, Google Workspace SMTP relay under the Workspace BAA. |
| Migration cost | **Low for the Meta path, moderate sitewide.** `sendMetaPatientConfirmation` is already provider-independent behind a `send(opaqueKey) => Promise<{id}>` callback — one function body plus one env var. The other nine senders in `components/email/sendcontactemail.ts` each call `getResendClient()` directly and would each need the same treatment. |
| Interim mitigation, cheap and immediate | Stop putting insurance in subject lines (`subjectWithInsurance`). Subjects replicate to lock screens, notification banners and mail-server logs. The Meta staff subject has already been made generic; the website forms have not. |

### 2.3 Google Workspace + Apps Script + the lead Sheet

| | |
|---|---|
| Verified state | `public.forms` has an `AFTER INSERT` trigger `forms_to_google_sheets` calling `supabase_functions.http_request` → `net.http_post` (pg_net **0.14.0**) to a script under `script.google.com/a/macros/appflowstudio.io/...`. **Every patient row, in full, is POSTed to Apps Script and written to a Google Sheet.** |
| The problem | The script and Sheet are in the **`appflowstudio.io`** Workspace — the *agency's* tenant, not the practice's. So patient records live in a third party's Google account. Even with a Workspace BAA in place, that BAA would be between Google and **AppFlow Studio**, and would not by itself authorize AppFlow Studio to hold the practice's PHI — that needs a BAA between the **practice and AppFlow Studio**. |
| Required | 1. A signed BAA between the practice and AppFlow Studio (or move the Sheet into the practice's own Workspace). 2. Confirm the Workspace has the Google BAA accepted, and that **Apps Script and Sheets are "Covered Services"** under it — not every Google service is. 3. Restrict Sheet sharing to named scheduling staff; remove link-sharing if present. 4. Enable Drive audit logging. |
| Decision needed | Who is the data controller for the lead sheet. This is the single most consequential open question here. |

### 2.6 Supabase `service_role` key — exposed 2026-11-17, **rotate**

On 2026-11-17 the project's legacy `service_role` JWT was pasted into a chat
transcript while configuring the Meta V3 deploy. No misuse is known or alleged.
It is recorded here because of what the credential is, not because of what
happened to it.

**Why it matters more than an ordinary key.** `service_role` bypasses Row Level
Security completely. It is not scoped to a table or an operation: it can read,
modify and delete every row in `public.forms` — 1,400 patient records including
names, phone numbers, emails, dates of birth, insurance selections and the
clinical answers from the assessment forms. It is strictly more powerful than
the Supabase dashboard login, because it needs no account and no MFA.

**Rotate it, but not casually.** On this project the legacy `anon` and
`service_role` keys are both signed by the same project JWT secret, so rotating
that secret invalidates BOTH. The `anon` key is in the client bundle and in
Vercel, so an uncoordinated rotation takes lead capture down sitewide. Required
order:

1. Rotate the JWT secret in Supabase (Settings -> JWT Keys).
2. Update `NEXT_PUBLIC_SUPABASE_ANON_KEY` **and** `SUPABASE_SERVICE_ROLE_KEY` in
   Vercel Production in the same pass.
3. Redeploy — a Vercel env change does not take effect until a new deployment.
4. Verify: submit a synthetic website form, and confirm a Meta lead persists.

Sequence this **after** the V3 deploy is verified, not during it.

**Worth pairing with it:** migrate off legacy keys altogether. Supabase retires
them in early 2027, and the replacement publishable/secret keys are individually
revocable — so a future exposure can be killed without taking the public key
down with it. That is a planned task with months of runway, not an emergency.

### 2.4 Vercel — **hosting**

| | |
|---|---|
| Verified state | Not verified from this environment. Vercel offers a BAA on **Enterprise** only. |
| Exposure | Patient data transits Vercel Functions and appears in runtime logs wherever any code path logs it. The Meta pipeline logs identifiers only (audited), but the **older website form routes have not been audited for log redaction** as part of this work. |
| Action | 1. Confirm the Vercel plan and whether a BAA exists. 2. Audit the website form routes for patient data in `console.*`. 3. Review log retention. |

### 2.5 Everything else that touches the request

| Vendor | Status |
|---|---|
| Bunny CDN (`mountainspineortho.b-cdn.net`) | Serves the email logo. A remote image in an email discloses recipient IP and read time to the host. Low severity, but it is a disclosure and it is unpapered. |
| Google Ads / GA4 / GTM | Already governed by `lib/route-privacy.ts`; clinical form sources are excluded from conversions, consent-gated. **No change needed, and none made.** |
| Meta pixel | `meta-instant-form` is in `META_INELIGIBLE_FORM_SOURCES`, so a patient lead cannot become a Meta conversion. **Correct as-is.** |
| Error reporting / APM | None found installed. Worth keeping that way until a BAA exists — adding Sentry or similar would create a new PHI recipient. |

---

## 3. Meta lead collection specifically

Leads are captured **inside** Facebook/Instagram before reaching us. Meta signs
no BAA and its Business Tools Terms §1.h forbids sharing data based on health
information, so the practice cannot treat Meta as a business associate.

What this means in practice:

- The current V2/V3 forms collect **contact details only** — name, phone, email,
  preferred clinic. No DOB, no insurance, nothing clinical. That is the right
  design and **must not drift**: adding a symptom or insurance question to the
  Instant Form would put clinical data inside Meta's systems.
- No qualified-lead, booking, attendance or outcome event is sent back to Meta,
  and none should be. Already structurally enforced.
- Meta's native SMS phone verification happens entirely inside Meta. It is
  **not consent for the practice to send SMS**, and no SMS is implemented.
- **Open question for counsel:** whether the practice's *use* of Meta lead ads
  for appointment requests is itself acceptable, given Meta retains the lead for
  90 days in its own systems under terms with no BAA. This is a
  pre-existing arrangement, not something this project introduced.

---

## 4. Retention, access control, audit logging

Current state, verified:

| Control | State |
|---|---|
| Retention | **None.** `public.forms` has no retention policy; rows go back to 2025-09-08 and nothing deletes them. |
| Access control | `anon`/`authenticated` can INSERT website leads only and read **nothing** (verified: 0 of 1,400 rows visible as `anon`). `message_deliveries` and `meta_lead_ingestions` deny `anon` outright. Reads require `service_role`. |
| Who can read leads | Anyone with the Supabase dashboard, plus anyone with access to the Google Sheet, plus anyone with access to `info@`. **None of these three is a named, auditable list today.** |
| Audit logging | Postgres connection logging not enabled (it is a High Compliance requirement). Drive audit logging unverified. No application-level access log. |
| `info@` | A **shared** mailbox with no owner and no SLA. Two staff alerts went unread for ~17 hours. |

Recommended, in order of effort — **none of this deletes anything**:

1. Name the people who may read patient leads, and remove everyone else from the
   Supabase project, the Sheet, and `info@`. Hours, no code.
2. Give `info@` a named owner and a response SLA. This is also the fix for the
   zero-answer rate — 11 of 11 leads were called and none answered, and no email
   design addresses that.
3. Agree a retention period with counsel, then implement it as a scheduled job.
   **Do not delete anything before that decision**, both because records may be
   needed and because deletion itself can be a reportable act.
4. Enable Postgres connection logging and Drive audit logging.
5. Only if 1–2 prove insufficient: a Supabase-auth-gated internal lead view.
   **Never a public lookup URL.**

---

## 5. Does this require a privacy incident assessment?

**Engineering's answer: this needs to be formally assessed, and engineering
cannot do the assessing.** The facts that bear on it:

- Patient data has been disclosed to vendors with no BAA for **~14 months**
  (earliest row 2025-09-08).
- Until **2026-08-30**, `public.forms` had **RLS disabled** while the `anon`
  role held SELECT/INSERT/UPDATE/DELETE/TRUNCATE. The publishable key ships in
  the client JavaScript bundle, so for that period **anyone who opened devtools
  could have read every patient lead** — names, emails, phone numbers,
  insurance. This is recorded in
  `supabase/migrations/202608300001_enable_rls_forms_blogs.sql`, which was
  written when it was fixed.
- Whether that was *actually* accessed by anyone is **not determinable from
  here**: Supabase Pro log retention is far shorter than the exposure window.
  The absence of evidence of access is not evidence of absence.
- Staff email subjects contained patient names (Meta) and insurance type
  (website forms), replicating identifiable data to notification surfaces.

Under the HIPAA Breach Notification Rule an impermissible disclosure is presumed
a breach unless a four-factor risk assessment shows low probability of
compromise. The RLS gap in particular looks like it needs that assessment on the
record. **This must go to counsel.** Notification deadlines run from discovery,
so the date this document is read matters.

---

## 6. What happens to the Meta V3 launch

These are **two separate decisions**, and conflating them is the main thing this
document exists to prevent:

| | Technical readiness | Privacy authorization |
|---|---|---|
| V3 lead capture, dedup, staff alert | **READY** — tested, migrations live, build green | Adds **no new** data flow. Same path, same vendors, same fields as the V2 form already in production. |
| Patient confirmation email | **READY** — implemented, tested, provider-independent | **BLOCKED** — §2.1 and §2.2 |

**V3 can be launched without the confirmation email.** It introduces no data flow
the practice is not already running, and it makes several things strictly better:
staff subjects no longer carry patient names, duplicate leads can no longer be
created, anonymous clients can no longer forge a Meta lead, and the Graph
credential no longer travels in a URL.

That launch is **not** an answer to anything in §1–§5, and must not be recorded
as one.

---

## 7. Decision list for the authorized representative

| # | Decision | Owner | Blocks |
|---|---|---|---|
| 1 | Is the practice a covered entity for this activity? Are these vendors business associates? | Counsel | Everything |
| 2 | Does the RLS exposure window (to 2026-08-30) require a breach risk assessment? | Counsel | Notification clock |
| 3 | Who controls the lead Sheet — practice or agency? BAA between them? | Client + agency | §2.3 |
| 4 | Fund Supabase Team/Enterprise + HIPAA add-on? | Client | Confirmation email |
| 5 | Replace Resend, or pursue an Order Form + BAA? | Client | Confirmation email |
| 6 | Vercel plan and BAA status? | Client | §2.4 |
| 7 | Retention period for patient leads? | Counsel | §4.3 |
| 8 | Named list of people who may read patient leads? | Client | §4.1 |

**Cheap, immediate, no decision required** (engineering can do these on
instruction): remove insurance from website email subject lines; audit the
website form routes for patient data in logs; restrict Sheet sharing; give
`info@` an owner.
