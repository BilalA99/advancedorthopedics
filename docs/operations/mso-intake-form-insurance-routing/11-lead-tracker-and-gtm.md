# 11 — Lead tracker, GTM and GA4 coverage

## The whole path, and who owns each hop

```
Website intake form
  → POST /api/forms/*        (insurance + ZIP validated, qualification decided server-side)
  → Supabase public.forms    (insurance_type, postal_code, submission_id, attribution)
  │
  ├─ trigger forms_to_google_sheets  (AFTER INSERT, sends the whole row)
  │    → Apps Script web app "Mountain Spine Lead Sheet Auto Sync"
  │        → "MS Form Submissions + GCLID" sheet
  │            • All Leads / FL Leads / NJ + NY Leads
  │            • FL Export → Google Ads / NJ/NY Export → Google Ads
  │            • offline conversion import sheets (hashed email + phone)
  │        → also writes live form counts into the Daily Lead Tracker
  │
  └─ browser dataLayer (qualified leads only)
       → GTM → GA4 + Google Ads qualified conversion

Daily 8 AM: "MSO LEAD TRACKER" Apps Script reads All Leads
  → Daily Lead Tracker, Patient Status, Verification Queue,
    Lead Aging Alerts, Ads Alerts Log, Month-over-Month
```

Three separate Apps Script projects are involved, and it matters which is which:

| Project | Role | Touched here |
| --- | --- | --- |
| **Mountain Spine Lead Sheet Auto Sync** (standalone web app) | receives the Supabase webhook, writes All Leads + the Google Ads export sheets | **not edited** — two-line ZIP patch documented, not applied |
| **MSO LEAD TRACKER** (bound to the tracker sheet) | the daily 8 AM automation | **rewritten — v4, in `apps-script/Code.gs`** |
| Google Ads scripts | write spend and campaign columns at 7 AM | untouched |

## What changed in the tracker (v4)

`apps-script/Code.gs` in this folder is the full replacement for `Code.gs` in the
**MSO LEAD TRACKER** project.

### 1. PPO is now automatic for form leads

Every intake form asks for insurance, and the answer lands in All Leads column G.
Script 2 previously waited for the front desk to type "PPO Confirmed" in the
Patient Status tab for *every* lead. It now classifies form leads straight from
their own answer, and only call-in leads still need the manual mark — they have no
form answer to read.

Call leads whose phone number appears in All Leads are skipped in the manual pass,
because they are form leads and were already counted. Without that check every
form lead the front desk also marked would be counted twice.

### 2. A real bug: states were silently dropping leads

All Leads holds `FLORIDA` and `NEW-JERSEY` in older rows, not `FL` and `NJ`. v3
compared those against `['FL']` and `['NJ','NY','PA']`, matched nothing, hit
`continue`, and the lead vanished from every count with no log line. v4 normalises
state first, mirroring the receiver's own map.

Worth knowing: this means historical daily counts in the tracker were **under-
reported** for any day containing a long-form state value.

### 3. Insurance, ZIP and a derived Qualified? flag flow through

Patient Status gains three read-only columns (18–20): **Insurance**, **ZIP Code**,
**Qualified?**. The Verification Queue and Lead Aging Alerts carry them too, and
both now sort qualified leads to the top within each priority band — the leads the
practice can actually serve are the ones whose going cold matters.

Existing Patient Status rows are backfilled with insurance on the next run.

### 4. Month-over-Month gains cost per PPO lead

`Cost per PPO Lead ($)` sits next to CPL. Now that qualification is tracked, that
is the number that reflects what a servable lead costs, rather than what any
enquiry costs.

### 5. Script order changed

Script 3 (Patient Status sync) now runs **before** Script 2, because Script 2's
call-lead half reads Patient Status and needs yesterday's leads to already be
there.

## The tracker's rule is a copy, and that is a managed risk

The tracker cannot import `lib/insurance-routing.ts` — different runtime. So it
re-implements qualification as a rule rather than a list:

```
explicitly not accepted            -> not qualified
Workers' Comp / Auto-PIP           -> qualified
anything else containing "ppo"     -> qualified
```

`scripts/qa/verify-apps-script-rule.ts` runs that exact logic against the site's
live option list and fails on any disagreement. **All 15 options currently agree.**
Run it after any change to `insurancePlans.ts`:

```bash
npx tsx scripts/qa/verify-apps-script-rule.ts
```

It also guards `"Non-PPO"` — a real front-desk PPO Status value that contains the
substring `ppo` and would otherwise count as qualified.

## Why the dropdown shows "Aetna" but stores "Aetna PPO"

The receiver script decides lead priority like this:

```js
var isPPO = insurance_type && insurance_type.toLowerCase().indexOf('ppo') !== -1;
if (isPPO && isHighValue) return '⭐ HIGH VALUE';
if (isPPO)                return '✅ PPO';
return 'STANDARD';
```

That drives the colour-coding and sort order the front desk works from, across
Patient Status, the Verification Queue and Lead Aging Alerts.

So the labels were shortened and the **values deliberately were not**. Strip "PPO"
from the stored value and every lead silently becomes `STANDARD` — no error, no log
line, just a flat queue. `lib/insurance-routing.ts` carries this reasoning inline,
and two tests in `measurement-insurance-routing.test.ts` fail if a stored value
ever loses its PPO marker.

The trade-off this creates is real and worth watching: a patient with an **Aetna
HMO** now sees an option labelled plainly "Aetna". The helper text under the
dropdown is what carries the distinction — "the carriers above are their PPO plans.
If you have an HMO, choose 'HMO plans (any carrier)'". If HMO leads start appearing
as qualified, that copy is the first thing to revisit.

## GTM and GA4 — nothing to change, and why

The qualified conversion fires from the canonical `lead_form_submit_success`
dataLayer event. An unqualified lead never emits that event, so the existing
trigger needs no new condition, no new variable and no exception. **The container
is untouched.**

That is deliberate rather than convenient: putting qualification into GTM would
mean sending the insurance answer to GTM, which is exactly what the privacy
boundary forbids. Insurance and ZIP reach Supabase and the staff email and nothing
else.

Verified directly in a real browser on a production build, by intercepting
`dataLayer.push` before any app code ran — full results in `05` and `06`. The
existing container configuration (Thank You Page GTM primary conversion, Offline
Form Lead – FL secondary with `primary_for_goal=false`, click-to-call
`CALL_FROM_ADS`, local actions excluded) still holds, and the
`obsolete form_submit stays retired` prebuild check passes.

**Expect conversion volume to fall.** "Other" leads no longer emit the event. Total
lead volume is unchanged and visible in Supabase and in the tracker's Col E/F.

## Two things left open

### ZIP is not in the sheet yet

The website stores ZIP and the webhook already sends it; the receiver has no column
for it. The two-line patch is in the APPENDIX at the bottom of `apps-script/Code.gs`.
The tracker finds the column by header name, so it needs no further edit — ZIP
features are dormant until then and no code path can throw.

Do **not** reuse the "Best Time" column for it. The intake forms no longer send
`best_time`, but the historical values in that column are real.

### The offline conversion export is not qualification-aware

The receiver uploads leads to Google Ads as `Offline Form Lead - FL` / `- NJNY`
with a value from `CONVERSION_VALUES[form_source]` — by traffic source, not by
whether the practice can serve the patient. Now that insurance is captured, that
export could skip unqualified leads or value them lower, which would sharpen Smart
Bidding further than the on-site gate alone. That is a change to the receiver and
was not made here.

## Housekeeping

Opening Extensions → Apps Script on the leads sheet created an empty bound project
named **"Untitled project"** (it has no code, no triggers and no deployment, so it
does nothing). Delete it from script.google.com → My Projects when convenient.

## Installing v4

1. Open the **MSO LEAD TRACKER** Apps Script project.
2. Replace the whole of `Code.gs` with `apps-script/Code.gs` from this folder.
3. Run `testConnection` once. It reports: both sheets reachable, the Insurance
   Type column confirmed, whether a ZIP column exists, how many of the last 14
   days' leads carry an insurance answer, and self-tests for both the
   qualification rule and state normalisation.
4. Leave the existing triggers alone — `runAllAutomations` and
   `runWeeklyAutomations` keep their names.

The first run adds the three new Patient Status columns and backfills insurance on
existing rows. It is safe to run more than once: every write is an overwrite keyed
on date and account, never an increment.
