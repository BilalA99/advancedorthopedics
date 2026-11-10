# Meta Instant Form → `info@` (real time)

Delivers a Meta lead to the scheduling team the moment it is submitted, by
reusing the intake path every website form already uses.

## Why a webhook

Meta has **no native setting** that emails a lead — or even a "you have a lead"
alert — to an address of your choosing. The "Gmail" tile in Instant Forms →
Lead Integration is Zapier-brokered, not native. Meta also deletes Instant Form
leads after 90 days. So the realistic options were a paid third-party processor,
a polling timer, or this. A webhook arrives in seconds and adds no vendor.

## Flow

```
Meta Instant Form
      │  POST (signed)
      ▼
/api/webhooks/meta-leadgen
      │  verify X-Hub-Signature-256, ACK 200 immediately
      │  waitUntil( … )
      ▼
GET /{leadgen_id}  (Graph)
      ▼
sendContactEmail({ form_source: "meta-instant-form" })
      │  existing Resend sender, existing template, existing idempotency key
      ▼
info@mountainspineorthopedics.com
```

Nothing new sends email. The lead renders in the same staff template as a
website lead, with campaign / ad set / ad carried through as UTMs.

## Environment variables

Set in Vercel for **Production** (and Preview, if you want to test there).

| Variable | What it is | Where to get it |
| --- | --- | --- |
| `META_APP_SECRET` | App secret for the MSO Marketing API app (`1857329048632570`). Used only to verify signatures. | developers.facebook.com → App → Settings → Basic |
| `META_LEADS_ACCESS_TOKEN` | Token holding **`leads_retrieval`** for Page `995449336974458` | Business Settings → System users → Generate new token |
| `META_WEBHOOK_VERIFY_TOKEN` | Any random string you choose; must match what you paste into Meta | generate one |
| `META_GRAPH_API_VERSION` | optional, defaults to `v26.0` | — |

`RESEND_API_KEY` is already configured and is reused as-is.

## Wiring it up in Meta

1. Deploy, so `https://mountainspineorthopedics.com/api/webhooks/meta-leadgen`
   is live.
2. developers.facebook.com → the app → **Webhooks** → **Page** → Subscribe to
   the **`leadgen`** field.
   - Callback URL: the URL above
   - Verify token: your `META_WEBHOOK_VERIFY_TOKEN`
   - Meta will `GET` the URL and expect `hub.challenge` echoed back.
3. Subscribe the Page itself to the app:
   `POST /995449336974458/subscribed_apps?subscribed_fields=leadgen`
   using a **Page access token**.
4. Test with Meta's **Lead Ads Testing Tool** — pick the Page and form
   `3634773886703639`, submit a synthetic lead, confirm the email arrives at
   `info@`.

## Behaviour and failure modes

- **Signature required.** The endpoint is public; an unverified body is rejected
  with 401 and never reaches the mailer.
- **Fast ACK.** Meta treats a slow 200 as a failure and retries, which would
  double-send. The response is returned before delivery runs, via `waitUntil`.
- **Duplicates.** Resend's idempotency key (`notify` + form_source + email +
  phone) collapses repeats within 24h, so a Meta retry is safe.
- **Missing token.** If `META_LEADS_ACCESS_TOKEN` is absent the request is
  acknowledged and the gap is logged loudly as `lead NOT delivered`. The lead is
  still retrievable from the Instant Forms library.
- **Delivery failure.** Logged with the lead id and reason, never with contact
  fields. Meta retries for up to ~36h.
- **Backup.** Ads Manager → Instant Forms → the form → **Download** always
  works, independently of this endpoint.

## Measurement contract

`meta-instant-form` is registered in `lib/lead-contract.ts` and placed in
`META_INELIGIBLE_FORM_SOURCES`. That is **not** a clinical-data suppression —
it is because Meta already attributed this conversion natively, so reporting it
back as a website `Lead` would double-count one lead against one ad.

`tests/measurement-meta-pixel.test.ts` was updated accordingly: suppression now
has two distinct causes (clinical workflow, or already-Meta-attributed) rather
than one.

## What this does not do

- It does not persist to Supabase. Website leads persist via `sendUserEmail`;
  this path deliberately does not email the patient, because Meta already shows
  them a confirmation. If Supabase persistence is wanted for Meta leads, export
  `logLeadToSupabase` and call it alongside `sendContactEmail`.
- It does not send the patient a confirmation email.
