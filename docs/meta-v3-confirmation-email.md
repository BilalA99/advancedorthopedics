# Meta Instant Form V3 — lead capture, staff alert, patient confirmation

**Status, 2026-11-17.** V3 support is implemented, tested and ready to deploy.
The patient confirmation email is implemented and tested but **disabled in
production, and must stay disabled**, for a contractual reason that engineering
cannot resolve (§4). Lead capture and staff notification are unchanged in intent
and keep working exactly as they do today.

---

## 1. The live production path, as verified

This is the deployed path, traced from the route outward — not from repository
files that merely look relevant. `src/leads/pipeline.ts` and
`scripts/lead-alert-watcher.ts` do **not** exist in this repository and power
nothing.

| # | Step | Where |
|---|---|---|
| 1 | Meta POSTs a `leadgen` change | `app/api/webhooks/meta-leadgen/route.ts` → `POST` |
| 2 | `X-Hub-Signature-256` HMAC-SHA256 over the **raw** body, constant-time | `lib/meta-leadgen.ts` → `verifyMetaSignature` |
| 3 | Envelope parsed; `object === "page"`, field `leadgen` | `extractLeadgenChanges` |
| 4 | Page id checked against the allowlist | `lib/meta-forms.ts` → `isAuthorizedPage` |
| 5 | 200 returned, work continues in `waitUntil` | route |
| 6 | Graph `GET /{leadgen_id}` with the token in an **Authorization header** | route → `fetchLead` |
| 7 | `field_data` collapsed; location title-cased; attribution → UTMs | `mapLeadToContact`, `formatMetaLocation` |
| 8 | Form id → `{status, version}` | `classifyMetaForm` |
| 9 | Insert into `public.forms` (publishable key, RLS insert-only) | `components/email/sendcontactemail.ts` → `persistMetaLead` → `logLeadToSupabase` |
| 10 | `AFTER INSERT` trigger `forms_to_google_sheets` POSTs the row to the Apps Script lead sheet | database |
| 11 | Staff alert to `info@` via Resend | `sendMetaStaffNotification` |
| 12 | Patient confirmation, gated | `sendMetaPatientConfirmation` |
| 13 | Per-message delivery state | `public.message_deliveries` via `lib/delivery-store.ts` |
| 14 | Resend delivery events | `app/api/webhooks/resend/route.ts` |
| 15 | Stalled-attempt sweep, every 30 min | `app/api/cron/reconcile-deliveries/route.ts` |

Orchestration for steps 8–13 is `lib/meta-lead-pipeline.ts`.

### Why `email_sent` is always false

Nothing has ever written it. `grep -rn email_sent` over the whole repository
returns **no application code at all** — only this document. The column has
`default false`, so every one of the 1,414 rows in production reads false,
including the Meta leads whose staff notifications were confirmed delivered in
the mailbox. It is not a stale value or a race; the write does not exist.

Consequently `email_sent` is **left exactly as it is**: never written, never
backfilled, not trusted. Marking rows delivered retroactively would invent
evidence. Real state now lives in `public.message_deliveries`, per lead **per
message type** — because one boolean cannot express "staff notification
delivered, patient confirmation bounced".

---

## 2. What was wrong, and what changed

| Defect found | Change |
|---|---|
| No form allowlist — any `leadgen` change on any Page was stored and emailed | `lib/meta-forms.ts` registry; unknown form → **quarantined**, unknown Page → dropped with a log |
| `leadgen_id` not stored anywhere, so a Meta retry (~36h window) created a **second lead row** and a **second lead-sheet line** | `forms.external_lead_id` + partial **unique** index; 23505 is read as "already stored", not as failure |
| Meta's own `created_time` not stored, so "when did the patient submit" was unanswerable | `forms.external_submitted_at`, distinct from `created_at` (our receipt time) |
| No V2/V3 distinction | `forms.external_form_id`, `forms.external_form_version` — version **derived** from the id server-side, never accepted from a payload |
| Staff subject was `New Meta Ad Lead — <patient name> — <clinic>` | `New Appointment Request — Action Required`. Name and clinic stay in the **body**, where staff read them |
| Resend's 24h idempotency key was the only dedup, shorter than Meta's retry window, and provider-side state we cannot query | `message_deliveries.delivery_key` unique, deterministic; Resend's key is now a hashed second line of defence |
| Graph token travelled in the URL query string, where it reaches request logs and fetch error messages | `Authorization: Bearer` header |
| No timeout on the Graph call — a hang held the background task until the platform killed it, losing the lead with no record | `AbortSignal.timeout(10s)` |
| No patient acknowledgement at all | implemented, **flag-off** |

### Deliberately not changed

Website forms, page layouts, SEO, metadata, structured data, sitemaps, GA4, GTM,
Google Ads conversions, consent behaviour, location routing, and every other
email workflow. `sendUserEmail`, `sendContactEmail` and the rest of
`sendcontactemail.ts` keep their existing behaviour; the Meta section of that
file was split into three functions, and `logLeadToSupabase` gained four
nullable columns and one new branch (23505 → duplicate).

The Apps Script lead-sheet trigger is untouched. The new table is deliberately
**not** `public.forms`, so nothing new fires that webhook.

---

## 3. Form and field contract

```
Page           995449336974458
Campaign       120249813788530446
Ad set         120249813788910446
Ads            120250344643750446, 120250344642940446,
               120250344642730446, 120250344643310446

V2  3634773886703639   live            → form_version "v2"
V3  3068973836772964   cutover pending → form_version "v3"
```

Question keys are **identical** across V2 and V3, which is why the field mapping
needed no change:

| Meta key | → contact | → `public.forms` |
|---|---|---|
| `full_name` | `name` | `patient_name` |
| `phone_number` | `phone` | `patient_phone` |
| `email` | `email` | `patient_email` |
| `preferred_location` | `location` (title-cased) | appended to `reason` |
| — | `utm_source` `facebook`/`instagram` | `utm_source` |
| — | `utm_medium` `paid_social` | `utm_medium` |
| `campaign_id` | `utm_campaign` | `utm_campaign` |
| `adset_id` | `utm_term` | `utm_term` |
| `ad_id` | `utm_content` | `utm_content` |
| `created_time` | — | `external_submitted_at` |
| `id` (leadgen) | — | `external_lead_id` **(unique)** |
| `form_id` | — | `external_form_id` |
| derived | — | `external_form_version` |
| — | — | `state` = `FL` (hardcoded; the form offers Florida clinics only) |
| — | — | `form_source` = `meta-instant-form` |

`preferred_location` option keys are unchanged: `south_miami`, `hollywood`,
`boca_raton`, `palm_beach_gardens`, `fort_pierce`, `orlando`,
`altamonte_springs`, `davenport`, `jacksonville`, `not_sure`. They are
title-cased for display rather than looked up in a table, so a clinic added to
the Instant Form tomorrow reads correctly with no deploy; a test asserts every
known key renders sensibly.

`public.forms` has no column for the chosen clinic, so it rides in `reason`
(free text, surfaces as the lead sheet's "Reason / Condition" column). Columns
were **not renamed**.

### Phone verification

V3 has native Meta SMS verification, confirmed in the Ads Manager preview. Meta
exposes **no reliable per-lead verification attribute** through the API, so no
lead is ever labelled "phone verified". That is a property of the form's
configuration, not evidence about an individual. Meta's verification is also
**not consent for Mountain Spine to send SMS**, and no SMS of any kind is
implemented.

---

## 4. Provider and privacy eligibility — **BLOCKED**

The patient confirmation processes an identifiable healthcare appointment
request: a named individual, their phone number and email, and the fact that
they asked an orthopedic practice for an appointment. Removing clinical detail
does **not** make that non-PHI — the identity plus the care-seeking event is the
protected pairing.

**Resend — not eligible.**
- `resend.com/security`: *"Resend is not HIPAA compliant and cannot sign a
  Business Associate Agreement."* (verified 2026-11-17)
- Enterprise Terms, 17 Aug 2026: the Service *"is not designed or intended for
  Restricted Data … unless the Order Form expressly permits it"*; Restricted
  Data expressly includes *"protected health information subject to HIPAA"*; PHI
  is permitted only *"under a Business Associate Agreement signed by both
  parties"*.
- No Order Form or signed BAA for this account has been produced. **Do not
  assume one exists.**

**Supabase — not eligible as configured.** Verified through the Supabase
management API: organization `AppFlow Studios` is on the **Pro** plan with
`opt_in_tags: ["AI_SQL_GENERATOR_OPT_IN"]` — **no HIPAA add-on** — and project
`bwrnnmzqipnoakmdbevz` is **not** flagged High Compliance. Supabase's own docs
require a signed BAA *and* the HIPAA add-on before PHI, plus PITR, SSL
enforcement, network restrictions and connection logging on the project.

**This also describes the system as it already is.** Patient names, phone
numbers, emails, dates of birth and insurance selections have been flowing
through Resend and this Supabase project for the website's own forms since long
before this task. Nothing here created that exposure, and nothing here is
authorised to switch it off: §5 of the brief, correctly, says not to disable
lead capture or staff access without a coordinated plan. **This needs to reach
the client's privacy and security decision-makers as an existing-state finding,
not as a new feature's blocker.**

### Consequences in code

- `ENABLE_META_PATIENT_CONFIRMATION_EMAIL` defaults to **0** and must stay 0.
- The send path is provider-independent at the seam that matters:
  `sendMetaPatientConfirmation` is the only function that touches Resend for this
  message, and `lib/meta-lead-pipeline.ts` calls it through a
  `send: (opaqueKey) => Promise<{ id }>` callback. Substituting an approved
  provider is one function body plus one env var; the webhook, the outbox, the
  idempotency model and the templates are untouched.
- Everything else is tested end to end with synthetic data.

### Paths forward (client decision, not engineering)

1. Obtain a Resend Enterprise Order Form expressly permitting PHI **plus** a
   signed BAA. Their public security page says this is not available, so expect
   this to fail.
2. Move transactional patient mail to a provider that signs a BAA (Paubox,
   LuxSci, AWS SES under the AWS BAA, Google Workspace under its BAA).
3. Supabase Team/Enterprise + HIPAA add-on + signed BAA, then mark the project
   High Compliance and satisfy its four required settings.
4. Accept the risk in writing, with a named decision-maker. **Engineering cannot
   make this call, and this implementation does not establish HIPAA compliance.**

---

## 5. The patient confirmation email

**Sender** `Mountain Spine & Orthopedics <info@mountainspineorthopedics.com>` —
already the verified production sender for the website's own patient
confirmation (`sendUserEmail`), so no new address is claimed. A dedicated
`scheduling@` would read better but is **not verified in Resend**, and an
unverified sender fails every send silently. **Reply-To** `info@`.

**Subject** `We've received your request` — generic; no name, no clinic, nothing
clinical. **Preview text** `Our scheduling team will be in touch during business
hours.` — deliberately not a repeat of the subject.

Preview: `npx tsx scripts/preview-meta-confirmation-email.mjs` →
`reports/meta-confirmation-preview.html` (desktop and 390px frames side by side,
plus the `text/plain` part).

- Table layout, inline styles, no media queries — Outlook renders through Word,
  which ignores flexbox, grid and most of `<style>`. `max-width: 560px` with a
  percentage width reflows on a phone without a query.
- Brand `#0A50EC`, white background. Body text `#4b5563` on white = **7.6:1**.
- `tel:+15612239959` on both the button and the number; the number also appears
  as text, because Outlook strips some `tel:` links and a button with no visible
  number leaves such a reader nothing to dial.
- **One** remote asset: the logo, from the practice's own CDN, already loaded by
  the existing production patient confirmation. No webfont, no second image, no
  pixel, no analytics, no click redirector, no query string on any URL
  (asserted by test). Verified on the rendered output: 1 `<img>`, 0 `<script>`,
  0 `<iframe>`.
- Open and click tracking are disabled **at message level**. Resend's domain
  settings are the other place these can be turned on and can be changed in the
  dashboard without a deploy — **verify the domain setting is off before
  activation**. Click tracking would also rewrite the `tel:` href and break the
  CTA.
- `Auto-Submitted: auto-generated` and `X-Entity-Ref-ID` mark it transactional.
- No response-time promise. 64% of leads arrive after 4 PM and 55% at weekends,
  so "within 24 hours" would be broken by most leads on the day they arrive. A
  test fails the build if such a phrase appears.
- States plainly that the appointment is **not** confirmed until the patient
  speaks to scheduling — a patient who believes they already have an appointment
  does not answer the call that would have made one.

### ⚠️ Outbound caller ID is unverified

*"Please expect a call from (561) 223-9959"* is an assertion about what appears
on a patient's screen. Nothing reachable from this environment can confirm the
practice's outbound caller ID. If the practice dials out on a different trunk,
this line trains patients to ignore the real call — the exact failure the email
exists to prevent. **Confirm with the practice before activation.** If inbound
and outbound differ, split the constants in
`lib/meta-confirmation-content.ts` and reword to name both.

### Deliverability (verified read-only; no DNS was modified)

| Record | Value | Verdict |
|---|---|---|
| SPF (root) | `v=spf1 include:dc-aa8e722993._spfm… ~all` → `include:_spf.google.com ~all` | Google only — **Resend is not in the root SPF**, and does not need to be |
| SPF (`send.` subdomain) | `v=spf1 include:amazonses.com ~all` | ✅ Resend's MAIL FROM domain, which is what SPF actually checks |
| DKIM | `resend._domainkey` present, 1024-bit RSA key | ✅ signs as `d=mountainspineorthopedics.com` |
| DMARC | `v=DMARC1; p=reject; adkim=r; aspf=r;` | ✅ |

With `aspf=r`, `send.mountainspineorthopedics.com` is an organizational match
for the root, so SPF aligns; DKIM aligns directly. `p=reject` is therefore
satisfied on both authentication methods. **No DNS change is required**, which
is consistent with the existing production emails being delivered.

---

## 6. Idempotency and delivery state

### Identity

```
meta:{leadgen_id}:staff-notification:v1
meta:{leadgen_id}:patient-confirmation:v1
```

Per lead **and** per message type, so the two can never dedupe each other.
Deterministic, so the second attempt can see the first one's row across a cold
start, a redeploy, or a crash.

Resend's `Idempotency-Key` gets `sha256(delivery_key)[0..48]` — opaque, because
the header travels to a provider with no BAA and must not carry an id joinable
to an ad or a person. Still deterministic, so it still dedupes.

### Three independent layers

1. **Lead storage** — `forms.external_lead_id` unique partial index. Two
   concurrent retries: Postgres lets one through, the other gets 23505, which is
   read as *already stored*.
2. **Each message** — `message_deliveries.delivery_key` unique. The claim is an
   INSERT on that unique column, the only primitive that is actually atomic
   across two serverless invocations. A read-then-write would let both send.
3. **Provider** — Resend's key, 24h, as a second line of defence only.

### Statuses

`pending` · `processing` · `accepted` · `delivered` · `bounced` · `failed` ·
`suppressed` · `unknown`

`accepted` is the provider taking the message; `delivered` is a receiving server
taking it. **Neither is evidence anyone read it** — two staff alerts sat unread
for ~17 hours while being, by any provider measure, delivered.

### The crash case

Provider accepts, process dies before the row is updated → the row sits in
`processing`. The outcome is genuinely unknowable from here, so the 30-minute
sweep promotes it to `unknown` with `error_code = stalled_in_processing` for a
human. **It does not resend.** And if something did retry, the deterministic key
means Resend collapses it.

### Retries

Bounded: ~1m, 5m, 25m, 2h, then `exhausted` — 5 attempts maximum. 429 and 5xx
are recoverable; 4xx and validation errors are not. A hard bounce or a complaint
is terminal and is **never** retried.

### No patient data in the delivery table

No name, address, phone, subject or body. `error_code` is a sanitized code
(`http_503`, `validation_error`), never a provider message that could echo the
recipient. The recipient is reachable only by joining `submission_id` back to
`public.forms`, which needs `service_role`.

---

## 7. Security

- **Signature**: HMAC-SHA256 over the raw body, `timingSafeEqual`, rejects
  missing/short/non-`sha256=`/wrong-secret/tampered. Six tests.
- **GET challenge**: preserved unchanged.
- **Page allowlist**: default `995449336974458`. An explicitly empty
  `META_LEAD_PAGE_IDS` disables the check — the escape hatch so a second Page
  cannot cause silent lead loss while a fix is deployed.
- **Graph token**: Authorization header, not the query string. 10s timeout. Error
  handling reports status, never the response body.
- **`public.forms` permits anonymous INSERT** (`anon`, `with check (true)`) —
  required, since the publishable key ships in the client bundle. So **anyone
  can insert a row claiming `form_source = 'meta-instant-form'`.** That is
  pre-existing and unchanged.

  **It cannot trigger a confirmation email.** Emails are created only by
  `lib/meta-lead-pipeline.ts`, reached only from the signature-verified webhook.
  Nothing reads `public.forms` to decide what to send — there is no poller, no
  trigger-driven mailer, no row-watcher. The row is an *output* of the pipeline,
  never an input. `message_deliveries` has RLS on with **no policies** and
  `REVOKE ALL FROM anon, authenticated`, so a public client cannot create,
  read, or suppress a delivery job either.

  What a forged row *can* still do is put a fake line in the Apps Script lead
  sheet via the existing `AFTER INSERT` trigger. That is a pre-existing issue,
  out of scope here, and worth its own ticket.
- **`service_role` key** is read only by `utils/supabase/service.ts`, which is
  `server-only`, so a client import is a build error rather than a credential
  leak.
- **Logging**: identifiers and outcomes only. No name, phone, email, subject or
  body in any log line added here, including error paths.
- **Resend webhook**: Svix signature verified (HMAC-SHA256 over
  `{id}.{timestamp}.{body}`), 5-minute replay tolerance, rotation-aware. The
  event parser keeps `type`, `created_at` and `email_id` and discards `data.to`
  and `data.subject` — asserted by test.
- **Cron**: `Authorization: Bearer $CRON_SECRET`, mandatory, fails closed.

### Meta token rotation — plan only, not executed

The Meta environment reports an exposed, unrotated `META_LEADS_ACCESS_TOKEN`
shared with this website. **Nothing here revoked or changed it.** Order:

1. Consumers: this repo (`META_LEADS_ACCESS_TOKEN`, Vercel Production — the only
   use is the Graph lead lookup) and the separate Meta API environment.
2. Issue a replacement System User token with `leads_retrieval` (+ the Meta
   environment's scopes). Do not revoke anything yet.
3. Set it in Vercel Production. **Redeploy** — `process.env` is read at
   invocation, but a Vercel env change needs a deploy to take effect.
4. Test: submit a synthetic V3 lead and confirm the Graph lookup succeeds and a
   staff alert arrives.
5. Confirm the Meta environment is working on the replacement.
6. **Then** revoke the exposed token.
7. Re-verify both environments.

Never print a token value. The header change in step 6 of §1 reduces the chance
of a repeat.

---

## 8. Activation gates

A patient confirmation requires **all** of:

| Gate | Where |
|---|---|
| `ENABLE_META_PATIENT_CONFIRMATION_EMAIL=1` | `lib/config/featureFlags.ts` (strict `"1"`/`"0"`; a typo throws at startup) |
| `META_PATIENT_CONFIRMATION_ACTIVATION_AT` set and valid | unset ⇒ **no lead qualifies** |
| `external_submitted_at` ≥ boundary | judged on **Meta's** `created_time`, not our receipt time |
| `form_version === "v3"` | V2 stragglers get storage + staff alert only |
| form status `authorized` | quarantined forms never mail a patient |
| recipient address present and plausible | no send to `""` |
| `SUPABASE_SERVICE_ROLE_KEY` present | **fails closed** — no outbox, no proof the patient was not already mailed |

An ineligible lead gets a `suppressed` row, not silence. `suppressed` is
terminal, so **turning the flag on later cannot retroactively mail a lead that
was already judged ineligible** — which is what protects the 12 historical rows
(latest 2026-11-16 23:32 UTC) when Meta replays a webhook.

Staff notification is **not** behind any of this. It fails *open* if the outbox
is unavailable (a lost alert loses the patient; a duplicate costs a scheduler
five seconds). The patient email fails *closed* (a duplicate email about a
medical appointment request is not a five-second cost).

---

## 9. Staff notification and secure access

Subject is now `New Appointment Request — Action Required`. The name, phone,
email and clinic remain in the **body**, unchanged — the scheduling team loses
nothing it needs to work the lead.

**There is no authenticated internal dashboard.** `app/internal/` does not
exist; `/internal` appears only as a blocked prefix in the pixel policy. So
there is nowhere to point staff *to*, which is exactly why the body was left
intact rather than reduced to a link.

The smallest appropriate remediation, in order of effort — **not built here, and
not a new CRM**:

1. The Apps Script lead sheet already exists and already receives every lead.
   Restrict its sharing to named scheduling staff and turn on Drive audit
   logging. Hours, not days, and no code.
2. `info@` is a **shared mailbox** and two alerts went unread for ~17 hours.
   Give it an owner and a response SLA. This is the actual cause of the
   zero-answer rate, and no amount of email design fixes it.
3. Only if 1–2 prove insufficient: a Supabase-auth-gated `/internal/leads`
   reading via `service_role`. **Never a public lookup URL.**

---

## 10. Lead ownership and outcomes

No approved system records lead owner, contact attempts, successful contact, PPO
qualification, booking or attendance. The lead sheet is the only artefact, and it
is append-only from the trigger.

`public.message_deliveries` deliberately does **not** become that system — it
tracks messages, not patients. The minimal next step is to add outcome columns to
the lead sheet (owner, first-attempt timestamp, outcome enum) and have staff fill
them, before building anything. **Keep it internal: no qualified-lead, booking or
attendance event goes back to Meta.** `meta-instant-form` is already in
`META_INELIGIBLE_FORM_SOURCES` in `lib/route-privacy.ts`, so a Meta lead cannot
become a Meta `Lead` conversion — it was captured by Meta and is already
attributed natively.

Ship any such schema change **separately** from this one.

---

## 11. Rollback

**Disable the confirmation instantly** — set
`ENABLE_META_PATIENT_CONFIRMATION_EMAIL=0` in Vercel and redeploy. Lead capture,
staff notification, V2 and V3 support, and all delivery history are unaffected.

**Full revert of this change set** — revert the application commit. Both
migrations are additive and nullable, so the previous code runs unchanged against
the new schema: it simply stops writing four columns and one table. **Do not drop
anything.** In particular, dropping `forms_external_lead_id_key` would silently
restore duplicate lead rows on Meta retries.

Delivery history is never deleted. A reverted deploy leaves `message_deliveries`
in place as the audit record of what was sent.

| Scenario | Action |
|---|---|
| Patients report a confusing email | flag → 0, redeploy |
| Duplicate patient emails | flag → 0; inspect `message_deliveries` for two `accepted` rows on one `delivery_key` (should be impossible — unique) |
| V3 leads quarantined | check `META_LEAD_FORM_ID_V3`; leads are **still stored and still alerting staff** |
| Leads stop arriving | check the Page allowlist first; set `META_LEAD_PAGE_IDS=` (empty) to disable that check |
| Supabase outage | leads persist-fail but staff alerts still send (`persisted: false`, logged loudly) |
| Resend outage | leads still stored; sends retry with backoff; nothing is lost |

---

## 11a. Pre-deployment hardening (2026-11-17)

Seven items raised in review, and what changed.

### Page validation now fails closed

The first version let `META_LEAD_PAGE_IDS=` (present but empty) disable the Page
check entirely, on the theory that a typo must not drop live leads. That was
wrong: an env var that is *present but empty* is trivially produced by a bad
copy-paste or a templating tool that emits empty strings for unset values, so a
security control could be switched off by accident with no signal. The handoff
Page is now compiled in and cannot be removed; the env var only **adds** pages.
`isAuthorizedPage` has no "no restriction configured" branch left, and a missing
page id is rejected. Four tests pin this.

### Quarantine is now restricted, with a generic alert

Previously an unrecognised form still went through `sendMetaStaffNotification` —
the full scheduling email, with name, phone, email and clinic. That let a stray
leadgen subscription, or an attacker on an unrelated Page, put arbitrary contact
details in front of staff in a message indistinguishable from a real patient
request. Staff would then call a stranger, or a planted number.

Quarantined leads (unauthorized **form or Page**) now get
`sendMetaQuarantineAlert`: identifiers only — form id, page id, lead id, reason —
and a plain-text instruction to confirm the form before acting. Subject is
`Action needed: unrecognized Meta lead form (no patient details)`, deliberately
distinguishable from a real lead. **The lead is still stored**, so nothing is
lost and an authorized operator can recover it. Both alerts claim the *same*
`staff-notification` delivery key, so exactly one is ever sent per lead and a
misconfiguration cannot flood the inbox.

### Anonymous inserts can no longer impersonate a Meta lead

`202611170003`. `with check (true)` meant the browser could set every column,
including the four `external_*` ones. Three real abuses: claiming
`form_source='meta-instant-form'` (forging channel attribution and CPL),
**reserving** an `external_lead_id` so the real webhook's insert is rejected as a
duplicate, and forging `external_form_version='v3'`. The policy now permits only
what the website legitimately writes. Verified against production: a normal
website submission still succeeds; all three forgery attempts are refused; of
1,400 existing rows, 0 have any `external_*` value, so nothing was broken.

This was always a **data-integrity** hole, not an email hole — outbound mail is
created only on the signature-verified webhook path, and nothing reads
`public.forms` to decide what to send.

### Meta ingestion writes as `service_role`

Consequence of the above: the tightened policy deliberately forbids `anon` from
writing `external_*`, so Meta ingestion must bypass it. `logLeadToSupabase` now
picks the client by whether an `external_lead_id` is present — website
submissions keep the publishable key and the existing trust model untouched;
Meta ingestion uses `service_role`. Second benefit: `createClient()` reads
`cookies()`, and this path runs inside `waitUntil` after the response, where
there is no meaningful cookie scope and no browser to act for. A missing service
key now fails loudly rather than producing an RLS violation that reads like
schema drift.

### `waitUntil` can no longer silently lose a lead

This was the last real hole. Everything after the 200 ran in one in-memory
promise; if the invocation died, or the Graph lookup failed, Meta had already
been told 200 and would never retry, and nothing in the database knew the lead
existed.

`202611170004` adds `public.meta_lead_ingestions`, keyed on the leadgen id, and
the webhook writes the receipt **synchronously before responding**. One upsert is
well inside Meta's timeout. Then:

- A failed Graph lookup records `graph_timeout` / `graph_lookup_failed` and stays
  retryable instead of vanishing.
- A failed insert records `persist_failed` and stays retryable.
- The 30-minute cron re-drives up to 10 pending leads per run — safe because
  every step is keyed on a unique column, so a retry **resumes** rather than
  duplicates.
- Retries are bounded at 5, then the row goes `failed` and waits for a human.
- Quarantined rows are terminal, so the sweep does not resend the operational
  alert forever.

The fetch-and-process logic moved to `lib/meta-lead-ingest.ts`, because an App
Router route module may export only route handlers — an extra export is a hard
type error — and the cron needs to call the same code.

Note the asymmetry the cron encodes: **lead ingestion is re-driven, message
delivery is not.** A message stuck in `processing` may or may not have reached
the provider, and that is unknowable from here, so it is flagged `unknown` for a
human. Re-driving ingestion risks nothing; resending an email on a guess risks a
duplicate in a patient's inbox.

### Apps Script lead sheet: duplicates and failures

Inspected, **not changed** — it is outside this change set and working.

- **Duplicates are now prevented upstream**, which is the effective fix: the
  trigger is `AFTER INSERT`, and the unique `forms_external_lead_id_key` means a
  Meta retry no longer produces a second insert, so no second POST. Before this
  work, a retry produced a duplicate sheet line.
- **Failures are silent, and remain so.** `net.http_post` is fire-and-forget with
  a 5000 ms timeout; nothing inspects `net._http_response`, so if Apps Script is
  down the row is in Supabase and never reaches the sheet, with no alert. The
  lead is not lost — Supabase is the system of record — but the sheet silently
  diverges. Worth its own ticket; out of scope here.
- A forged row from a public client can still add a fake line to the sheet. The
  impersonation fix above removes the *Meta-shaped* version of that; a generic
  forged website lead is still possible and is pre-existing.

### Meta credential rotation: confirmed feasible, with one caveat

Verified via the token-introspection endpoint: a **System User** token on app
`MSO Marketing API` (`1857329048632570`), System User `122096384031489946`,
scopes include `leads_retrieval`, issued 2026-09-22, **`neverExpires: true`**. So
it will not roll over on its own — rotation has to be deliberate.

Generating a new System User token does not invalidate existing ones, so the
"replacement works before the old one dies" ordering in §7 is achievable.

**The caveat, which needs checking in the Meta app dashboard before anyone acts:**
the cleanest way to invalidate one specific System User token may be to reset the
**app secret** — and `META_APP_SECRET` is what verifies `X-Hub-Signature-256` on
this webhook. If both live on app `1857329048632570`, resetting the secret to
revoke the token would **break webhook signature verification until
`META_APP_SECRET` is updated and redeployed**, and would invalidate every other
token on that app, including the Meta API environment's. Confirm the revocation
mechanism, and whether the webhook subscription is on this same app, before
revoking; if it is, treat it as a coordinated change with both env vars updated
in the same deploy. This could not be verified from here — reading app
subscriptions needs an app access token, which this environment does not hold and
should not construct.


---

## 12. Environment variables

Names and purposes only — **no values appear here or anywhere in this
repository**. `.env.example` is gitignored (`.gitignore:34 .env*`), so this
section is the tracked copy; the local `.env.example` carries the same notes.

### Already in production

| Variable | Purpose |
|---|---|
| `META_APP_SECRET` | Verifies `X-Hub-Signature-256`. Absent ⇒ the webhook returns 500 |
| `META_WEBHOOK_VERIFY_TOKEN` | The GET subscription handshake |
| `META_LEADS_ACCESS_TOKEN` | Graph lead lookup (`leads_retrieval`). Absent ⇒ Meta is acknowledged but nothing is delivered, logged loudly. **Shared with the Meta API environment — see §7 before rotating** |
| `META_GRAPH_API_VERSION` | Optional; defaults `v26.0` |
| `RESEND_API_KEY` | Email sending |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Lead insert (publishable; ships in the client bundle by design) |

### New — none required for V3 lead capture

V3 works with the current production configuration. The ids are defaulted in
`lib/meta-forms.ts`.

### New — required before the patient confirmation can be enabled

| Variable | Notes |
|---|---|
| `ENABLE_META_PATIENT_CONFIRMATION_EMAIL` | Exactly `"1"` or `"0"`; anything else **throws at startup**. Defaults `0` |
| `META_PATIENT_CONFIRMATION_ACTIVATION_AT` | ISO-8601. **Unset ⇒ no lead qualifies** |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only, for `public.message_deliveries` (needs select+update, impossible with the publishable key). Absent ⇒ the patient email **fails closed** |

### New — optional

| Variable | Notes |
|---|---|
| `META_LEAD_FORM_ID_V2`, `META_LEAD_FORM_ID_V3` | Override the defaulted ids |
| `META_LEAD_PAGE_IDS` | Comma-separated. Defaults to `995449336974458`; an **empty** value disables the page check |
| `RESEND_WEBHOOK_SECRET` | `whsec_…`. Absent ⇒ `/api/webhooks/resend` returns 401 and delivery state stops at `accepted` |
| `CRON_SECRET` | Bearer token for the reconciliation cron. Absent ⇒ 401, fails closed |

A Vercel environment-variable change needs a **redeploy** to take effect.

---

## 13. Verification performed

| Check | Result |
|---|---|
| `npx tsc --noEmit` | No new errors in any changed file. 44 pre-existing errors elsewhere (framer-motion `Variants`, FAQ typings) unchanged |
| `next lint` on all new files | Clean. One `<img>` warning, suppressed inline with a reason — `next/image` cannot run in a mail client |
| `npm run test:measurement` | **271/271 pass**, including 78 new tests in 2 new files |
| `npm run validate:measurement` | 18/18 |
| `npm run build` | **exit 0**, compiled in 81s, 783/783 static pages, all three new routes built as dynamic functions |
| Email preview | `reports/meta-confirmation-preview.html`; rendered output audited: 1 `<img>` (own CDN logo), 0 `<script>`, 0 `<iframe>`, 0 query strings, `tel:` CTA intact, balanced table markup |
| DNS | SPF / DKIM / DMARC read and verified aligned; **no DNS modified** |

### Live production database verification

Every probe touching `public.forms` ran inside a transaction that was **rolled
back**, because that table carries the `forms_to_google_sheets` trigger and a
synthetic row must never reach the Apps Script lead sheet.

**The rollback claim was verified, not assumed** — "a rollback undoes an HTTP
request" is false in general. A request already in flight cannot be recalled,
and this says nothing whatsoever about Resend emails, which are sent over HTTP
from the application and are irreversible. What was checked is narrower and
specific to this trigger:

- `supabase_functions.http_request` is plpgsql and calls `net.http_post`.
- `pg_net` is version **0.14.0**, which implements `net.http_post` as an INSERT
  into the table `net.http_request_queue` in the *caller's* transaction.
- Probed directly: inside a transaction the queue held 1 row; after `rollback`
  the queue held **0** and `net._http_response` recorded **no** response.
- The background worker runs in a separate backend, so MVCC prevents it from
  ever seeing an uncommitted queue row.

So for *this* trigger on *this* pg_net version, a rolled-back insert genuinely
never sends. That does not generalise to other side effects, and should be
re-verified if pg_net is upgraded.

| Probe | Result |
|---|---|
| Duplicate `external_lead_id` | ✅ rejected (`unique_violation`); exactly one row remained |
| `external_form_version` / `external_submitted_at` stored | ✅ `v3`, and distinct from `created_at` |
| Duplicate `delivery_key` | ✅ rejected |
| Staff + patient messages for the same lead | ✅ both insertable; they never dedupe each other |
| Invalid `status` / `message_type` | ✅ both rejected by check constraint |
| `anon` / `authenticated` grants on `message_deliveries` | ✅ **NONE**; RLS on, 0 policies |
| **Website form regression** — `anon` INSERT into `public.forms` after the four new columns | ✅ still succeeds (the exact failure that broke lead capture for ~4 days in September) |
| Residual test data | ✅ none; 1,400 rows and 12 Meta leads unchanged |

### What was NOT tested, and why

- **End-to-end against live Meta and Resend.** No `META_*` or
  `SUPABASE_SERVICE_ROLE_KEY` value exists in the local environment (confirmed:
  the local `.env` holds only Google Maps, Supabase URL/anon, Resend, base URL
  and the GA id), and sending a real email requires the production key. The
  Graph fetch, the two sends and the outbox round-trip are therefore verified at
  the unit and database level, not by one live request.
- **The GET challenge handshake**, which needs the production verify token.
- **Resend's domain-level tracking settings**, not inspectable from here —
  recorded as a blocker.
