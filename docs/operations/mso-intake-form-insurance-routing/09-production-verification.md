# 09 — Production verification

## Status: PENDING MERGE

Production has **not** been deployed. At Bilal's direction the work stops at a
pull request so the Vercel preview and the 15-option dropdown can be reviewed
before it reaches patients.

| Field | Value |
| --- | --- |
| Branch | `feat/intake-insurance-routing` |
| Commit | `8d5f9c2` |
| Pull request | https://github.com/BilalA99/advancedorthopedics/pull/4 |
| Base | `origin/main` (auto-deploys production) |
| Divergence | 3 commits ahead, 0 behind — clean fast-forward |
| Local build verified | `next build` exit 0, 768/768 pages |
| Preview | Vercel builds one automatically for the pushed branch |

## Already applied to production

**`public.forms.postal_code`** — migration `202609270001_add_postal_code.sql`,
applied to project `bwrnnmzqipnoakmdbevz` before any code that writes it.

This ordering is deliberate. Adding a column the code does not yet write is inert;
deploying code that writes a column which does not exist rejects **every** INSERT
into `public.forms` and silently destroys lead capture, which is exactly what
happened for four days when `landing_path` shipped without a migration.

Confirmed present, nullable, with a comment, and existing writes unaffected
(1,243 rows at the time of application).

## After merging — run these against production

### 1. Record the deployment

```bash
git log -1 --format='%H %s' origin/main      # commit SHA
```

Take the deployment ID from the Vercel dashboard and add both here.

### 2. Routes respond

```bash
for p in / /insurance-policy /find-care/book-an-appointment /thank-you /thank-you/other; do
  printf '%s -> ' "$p"
  curl -s -o /dev/null -w '%{http_code}\n' "https://mountainspineorthopedics.com$p"
done
```

Expect `200` for all five.

### 3. Server-side ZIP validation is live (no side effects)

These are rejected **before** anything is emailed or persisted, so they create no
leads. Do not substitute a valid ZIP — that would create a real lead and email the
clinic.

```bash
node scripts/qa/intake-server-contract.mjs https://mountainspineorthopedics.com
```

Expect every check to pass: `400`, the shared message, `field: "postalCode"`, no
submission id, no qualification, and a `307` to `/unavailable` for a non-US header.

### 4. The forms render correctly

```bash
node scripts/qa/intake-form-audit.mjs https://mountainspineorthopedics.com desktop
node scripts/qa/intake-form-audit.mjs https://mountainspineorthopedics.com mobile
```

Expect `0 problems` on both: every rendered intake form exposes the insurance
dropdown and none shows best-time.

### 5. Thank-you pages fire nothing on a direct visit

Load `https://mountainspineorthopedics.com/thank-you` directly, reload twice, then
do the same for `/thank-you/other`. In DevTools:

```js
dataLayer.filter(e => e.event === 'lead_form_submit_success')   // expect []
```

### 6. One real qualified lead, end to end

This one **does** create a row and email the clinic, so do it once and clean up.

1. `/insurance-policy`, fill with `Testpatient Synthetic`, `qa+intake@example.com`,
   `5615550123`, ZIP `33463`, insurance **PPO (any carrier)**.
2. Submit. Expect to land on `/thank-you`.
3. Confirm one `lead_form_submit_success` in `dataLayer`, carrying exactly
   `event, form_id, form_source, page_path, market, submission_id` — no insurance,
   no ZIP.
4. Repeat with **Other / not listed**. Expect `/thank-you/other`, and **zero**
   `lead_form_submit_success`.

Then verify both landed with ZIP and insurance intact:

```sql
select submission_id, created_at, form_source, insurance_type, postal_code, state
from public.forms
where patient_email = 'qa+intake@example.com'
order by created_at desc;
```

Expect two rows: one with `insurance_type = 'PPO'`, one with `'Other'`, both with
`postal_code = '33463'`. Confirm both staff emails arrived at
`info@mountainspineorthopedics.com` showing a **ZIP Code** row and an **Insurance**
row, and **no** "Your Preferred Contact Time" row.

Clean up:

```sql
delete from public.forms where patient_email = 'qa+intake@example.com';
```

### 7. GTM Preview

Steps in `08-gtm-verification.md`. Needs an authenticated `seo@appflowstudio.io`
session, which was not available from this session.

### 8. Watch the logs

The failure mode is silent — emails keep arriving while rows stop being written.
Grep production logs for the loud line that exists for exactly this:

```
[logLeadToSupabase] insert failed — lead NOT persisted
```

and confirm the table is still growing:

```sql
select count(*), max(created_at) from public.forms;
```

## Expect this, and do not mistake it for a regression

`lead_form_submit_success` volume in GA4 and Google Ads **will fall** once this is
live, because "Other" leads no longer emit it. The conversion action becomes a
qualified-lead signal rather than an any-lead signal. Total lead volume is
unchanged; the split is queryable from Supabase using the query in
`08-gtm-verification.md`.

## Rollback

`10-rollback.md`. Revert the code and **leave the column** — dropping
`postal_code` while a writer is deployed would reject every lead INSERT.
