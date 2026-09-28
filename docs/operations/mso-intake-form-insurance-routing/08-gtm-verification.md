# 08 — GTM verification

Container **GTM-T57SB8NQ** (Mountain Spine Orthopedics, account 6301349322,
container 223492636), workspace 38, inspected 2026-09-28 as `seo@appflowstudio.io`.

**Workspace Changes: 0** — nothing unpublished, nothing half-edited.

## No GTM change is required by this work, and none was made

The qualified conversion fires from the canonical `lead_form_submit_success`
dataLayer event. An unqualified lead never emits that event, so the existing
triggers need no new condition, no new variable and no exception.

That is deliberate rather than convenient: putting qualification into GTM would
mean sending the insurance answer to GTM, which is exactly what the privacy
boundary forbids.

## The live configuration, read from the container

### Google Ads conversion tags

| Tag | Type | Firing trigger |
| --- | --- | --- |
| `Thank You Page` | Google Ads Conversion Tracking | `lead_form_submit_success_FL` |
| `Thank You Page For NJ/NY` | Google Ads Conversion Tracking | `lead_form_submit_success_NJ`, `lead_form_submit_success_NY` |
| `Click in Contact Us` | Google Ads Conversion Tracking | `Click in Contact Us Trigger` |
| `Click in Phone Number` | Google Ads Conversion Tracking | `Click in Phone Number Trigger` |
| `Google Ads Calls (2 minutes) Florida` | Calls from Website | `Tel Phone Number click Florida` |
| `Google Ads Calls – NJ (2 Min)` | Calls from Website | `Tel Phone Click - NJ` |
| `Google Ads Calls – NY (2 Min)` | Calls from Website | `Tel Click NY` |

**Both form-conversion tags fire only from `lead_form_submit_success_*`.** That is
the container-level confirmation that the gate works: an unqualified lead emits no
such event, so neither trigger fires, so no Google Ads conversion is recorded. The
gate did not need GTM's cooperation, and it did not get it — it simply starves the
trigger of its event.

### The safety properties, confirmed in the container

| Trigger | Tags attached | Why it matters |
| --- | --- | --- |
| `Thank You Page Trigger` (Page View) | **0** | Arriving at `/thank-you` fires nothing. A direct link, a bookmark or a refresh is worth zero conversions — confirmed in config, not just in code. |
| `History Change` (URL contains `/thank-you`) | **0** | SPA navigation to the thank-you page fires nothing either. |
| `Form Subm` (Form Submission) | **0** | The native form-submission listener is attached to nothing. |
| `Form Submission` (Form Submission) | **0** | Same. |
| `form_submit_FL` / `_NJ` / `_NY` | **0** each | The old market-scoped legacy triggers are dead. |

Those five are exactly the paths by which a duplicate or phantom conversion would
otherwise arrive, and all five are empty.

### GA4

`GA4 - Form Submit Event` fires on **two** triggers: `lead_form_submit_success`
and the legacy `form_submit`.

The legacy one is inert — the prebuild check `obsolete form_submit stays retired`
proves no code path pushes `form_submit`, so that trigger can never fire. It is
dead configuration rather than a live duplicate, and the tag therefore fires once
per qualified lead.

Worth cleaning up anyway, so nobody re-introduces `form_submit` later and silently
doubles the GA4 event. It is a two-click change and needs no code.

## Two things found that are worth your attention

### 1. Georgia and Pennsylvania leads fire no Google Ads conversion

`lead_form_submit_success_GA` and `lead_form_submit_success_PA` exist as triggers
but have **0 tags attached**. FL, NJ and NY each have one.

So a qualified lead from Georgia or Pennsylvania emits the event, GA4 records it,
and **no Google Ads conversion is recorded at all**. If there is no ad spend in
those markets that is correct and intentional; if there is, those conversions have
been invisible.

This is pre-existing and unrelated to this change. **I did not add the tags** —
creating Google Ads conversion tags is a media-buying decision with budget
consequences, not an engineering one.

### 2. Enhanced Conversions tags have no listed firing trigger

`Lead Submit Form Enhanced` and `Lead Submit Form Enhanced For NJ/NY` (Google Ads
User-provided Data Event) show an empty firing-trigger column, which normally means
they are attached as setup tags on the conversion tags rather than triggered
directly. Unchanged by this work, and the hashed payload they consume is still
pushed exactly as before — but worth confirming they are wired the way you expect
next time you are in the container.

## What was verified at the dataLayer level

The container consumes the dataLayer, so the dataLayer is where the behaviour was
proven — in a real browser, on a production build, by intercepting `dataLayer.push`
before any application code ran:

| Assertion | Result |
| --- | --- |
| A PPO submission pushes exactly one `lead_form_submit_success` | pass, desktop and mobile |
| An "Other" submission pushes **zero** | pass, desktop and mobile |
| An "Other" submission pushes **nothing at all** | pass |
| A triple-click pushes exactly one | pass |
| A refresh / retry of one submission pushes exactly one | pass |
| Direct visit to `/thank-you` pushes zero | pass |
| Refresh of `/thank-you` pushes zero | pass |
| Direct visit to `/thank-you/other` pushes zero | pass |
| The event carries exactly six keys, none of them insurance or ZIP | pass |
| ZIP appears only inside `enhanced_conversion_data` | pass |

Full output in `05-desktop-test-matrix.md` and `06-mobile-test-matrix.md`.

## Optional: a live Tag Assistant pass after merge

Everything above is verified from configuration plus the dataLayer. If you want the
end-to-end tag-fired confirmation as well:

1. Tag Assistant → connect to `https://mountainspineorthopedics.com/insurance-policy`.
2. Submit with synthetic data (`Testpatient Synthetic`, `qa+intake@example.com`,
   ZIP `33463`) and insurance **PPO (any carrier)**.
3. Confirm `lead_form_submit_success` fires once, `lead_form_submit_success_FL`
   fires, and `Thank You Page` (Google Ads Conversion Tracking) fires **once**.
4. Repeat with **Other / not listed**: no `lead_form_submit_success`, no conversion
   tag, lands on `/thank-you/other`.
5. Load `/thank-you` directly and reload twice: `Thank You Page` must not fire.

Then remove the two synthetic rows:

```sql
delete from public.forms where patient_email = 'qa+intake@example.com';
```

## Expect conversion volume to fall

`lead_form_submit_success` volume in GA4 and Google Ads **will drop** after this
deploys, because "Other" leads no longer emit it. That is the intended effect — the
conversion action becomes a qualified-lead signal rather than an any-lead signal.

Total lead volume is unchanged. The split is queryable from Supabase:

```sql
select
  date_trunc('day', created_at) as day,
  count(*) filter (where insurance_type ilike '%ppo%'
                      or insurance_type in ('Workers’ Compensation',
                                            'Auto / Personal Injury (PIP)',
                                            'Self-pay / no insurance')) as qualified,
  count(*) as total
from public.forms
where created_at > now() - interval '30 days'
group by 1 order by 1 desc;
```
