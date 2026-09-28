# 08 — GTM verification

## No GTM change is required by this work, and none was made

This is the important point. The qualified conversion fires from the canonical
`lead_form_submit_success` dataLayer event. An unqualified lead simply never emits
that event, so the existing trigger needs no new condition, no new variable and no
exception. The container is untouched.

That is a deliberate design property: putting qualification into GTM would have
meant sending the insurance answer to GTM, which is exactly what the privacy
boundary forbids.

## What was verified, and how

The thing GTM consumes is the dataLayer. That was verified directly in a real
browser, on a real build, by intercepting `dataLayer.push` before any application
code ran and reading every push:

| Assertion | Result |
| --- | --- |
| A PPO submission pushes exactly one `lead_form_submit_success` | pass, desktop and mobile |
| An "Other" submission pushes **zero** `lead_form_submit_success` | pass, desktop and mobile |
| An "Other" submission pushes **nothing at all** to dataLayer | pass |
| A triple-click pushes exactly one | pass |
| A refresh / retry of one submission pushes exactly one | pass |
| Direct visit to `/thank-you` pushes zero | pass |
| Refresh of `/thank-you` pushes zero | pass |
| Direct visit to `/thank-you/other` pushes zero | pass |
| The event carries exactly six keys, none of them insurance or ZIP | pass |
| ZIP appears only inside `enhanced_conversion_data` | pass |

Full output in `05-desktop-test-matrix.md` and `06-mobile-test-matrix.md`.

## Existing container configuration this depends on

Unchanged, and re-confirmed as still correct by the
`obsolete form_submit stays retired` prebuild check:

```
Thank You Page GTM      → Primary form conversion
Offline Form Lead – FL  → Secondary, primary_for_goal=false
Click-to-call           → CALL_FROM_ADS
Local actions           → not a qualified form submission
```

The earlier remediation — legacy `form_submit` triggers removed from four tags,
one successful form event preserved, one user-provided-data flow preserved — still
holds. Nothing here reactivated a retired trigger, and the prebuild gate fails the
build if a form ever references the legacy event again.

## What still needs a human with GTM console access

Driving GTM Preview / Tag Assistant needs an authenticated session in the
`seo@appflowstudio.io` Google account and the ability to click through the Tag
Assistant consent screen. That was not done from this session. The steps, for
whoever runs it against production after deploy:

1. Open Tag Assistant for container **GTM-MSO** and connect to
   `https://mountainspineorthopedics.com/insurance-policy`.
2. Fill the consultation form with synthetic data (`Testpatient Synthetic`,
   `qa+intake@example.com`, ZIP `33463`) and select **PPO (any carrier)**.
3. Submit. Confirm in Tag Assistant:
   - `lead_form_submit_success` fires **once**
   - the Google Ads conversion tag fires **once**
   - `enhanced_conversion_data` is present and contains `sha256_email_address`,
     `sha256_phone_number` and an unhashed `address.postal_code`
   - the event contains **no** insurance field and **no** top-level ZIP
4. Repeat with **Other / not listed**. Confirm:
   - **no** `lead_form_submit_success`
   - **no** Google Ads conversion tag fires
   - the browser lands on `/thank-you/other`
5. Navigate directly to `/thank-you` and reload twice. Confirm the conversion tag
   does not fire on either load.

Expect two synthetic rows in `public.forms` from steps 3 and 4, and two emails to
`info@mountainspineorthopedics.com`. Delete the rows afterwards:

```sql
delete from public.forms
where patient_email = 'qa+intake@example.com';
```

## One expected, non-obvious consequence for reporting

`lead_form_submit_success` volume in GA4 and Google Ads **will drop** after this
deploys, because "Other" leads no longer emit it. That is the intended effect — the
conversion action becomes a qualified-lead signal rather than an any-lead signal.

Total lead volume is unchanged. Anyone comparing week-over-week conversions without
knowing this will read it as a regression, so it is worth saying before the
comparison is made. The true total, and the qualified/unqualified split, is in
Supabase:

```sql
select
  date_trunc('day', created_at) as day,
  count(*) filter (where insurance_type in (
    'PPO','Blue Cross Blue Shield PPO','UnitedHealthcare PPO','Cigna PPO','Aetna PPO',
    'Meritain Health PPO','MultiPlan / PHCS PPO','Bright Health PPO',
    'Workers’ Compensation','Auto / Personal Injury (PIP)'
  )) as qualified,
  count(*) as total
from public.forms
where created_at > now() - interval '30 days'
group by 1 order by 1 desc;
```
