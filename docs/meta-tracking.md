# Meta conversion tracking — Mountain Spine & Orthopedics

**Pixel / Dataset ID:** `1114353070995808`
**Implemented:** 2026-09-21 · branch `feat/meta-pixel-conversion-tracking`
**Status:** website implementation complete and tested locally. Meta Events Manager
verification is still outstanding — see *Manual checks required*.

---

## 1. Architecture

The application is the source of truth. Ad platforms do not decide what a lead is.

```
         FORM SUBMITTED
               │
      server validates + persists
               │
        { ok: true, submissionId }          ← the only trigger that counts
               │
   utils/enhancedConversions.ts  pushFormSubmit()
               │
    ┌──────────┴───────────┬────────────────────┐
    │                      │                    │
STEP 1 (always)      STEP 2 (consent)     STEP 3 (consent)
dataLayer.push        Meta `Lead`          Google Enhanced
lead_form_submit_     eventID =            Conversions
success               submission_id        (hashed, separate push)
{form_id, form_source,   custom_data: {}
 page_path, market,
 submission_id}
    │                      │
 GA4 / GTM /            Meta Pixel
 Google Ads             (+ Meta-managed CAPI)
```

Two distinct layers, deliberately:

| Layer | Contents | Consent |
|---|---|---|
| **A — first-party** | market, location, form id, campaign IDs, submission_id, lead quality | site's existing policy |
| **B — Meta signal** | `Lead` / `Contact` / `PageView` + `eventID`, empty `custom_data` | marketing consent required |

Everything the business needs for reporting stays in Layer A. Meta gets the
minimum that makes optimisation work.

## 2. Files

| File | Purpose |
|---|---|
| `lib/meta-pixel.ts` | Typed adapter. init, PageView, Lead, Contact, consent, route suspension. Every export no-ops safely and never throws. |
| `lib/route-privacy.ts` | Deny-by-default route, query-string and form-source policy. |
| `components/MetaPixel.tsx` | Loader (`next/script`) + SPA route tracker. |
| `components/CookieConsentManager.tsx` | *(modified)* renders `<MetaPixel />` under the marketing gate; calls `revokeMetaConsent()` on withdrawal. |
| `utils/enhancedConversions.ts` | *(modified)* fires Meta `Lead` after the canonical success event; Meta `Contact` on phone clicks. |
| `tests/measurement-meta-pixel.test.ts` | 22 deterministic tests. |

## 3. Consent

Meta is classified as **Advertising/Marketing**, alongside CallRail and Google Ads —
not Functional (which covers embedded maps) and not Analytics. The existing
banner, categories, storage key (`mso_cookie_consent_v1`) and state machine were
reused unchanged. No second banner, no new category, no altered defaults.

Consent is treated as **three** states, not two. `isAdvertisingAllowed()` in
`lib/consent.ts` is the predicate; `hasMarketingConsent()` still exists and still
gates the higher-sensitivity paths.

| Visitor state | Meta behaviour |
|---|---|
| **No decision (banner ignored)** | **Tracked.** Pixel loads, inits once, one PageView, Leads fire. Site-owner decision of 2026-09-21: silence is not an objection. |
| **Reject all** | Nothing. Dispatch revoked and every advertising cookie cleared. |
| **Analytics only** | Nothing — this is an explicit refusal of marketing. |
| **Accept marketing** | Loads, inits once, fires one PageView for the current page. No refresh needed. |
| **Revoked after acceptance** | `fbq('consent','revoke')`, component unmounts, cookies cleared. |

What deliberately did NOT change with that decision:

- **Google Consent Mode defaults stay denied**, so Google's own cookieless
  behaviour applies until the visitor chooses. The build gate enforces this.
- **Google Enhanced Conversions still require `hasMarketingConsent()`** — they
  transmit hashed identity, which is a materially different act from a pixel
  PageView, and the owner decision did not cover it.
- **CallRail DNI still requires affirmative consent** — it rewrites phone
  numbers in the page and was left exactly as found.

Verified in a real browser on an untouched banner: pixel initialized, 1 fbevents,
1 PageView, `_fbp` set, `_fbc` seeded, all attribution cookies written, and
GTM/GA4 unchanged with Consent Mode still denied-by-default. Then on explicit
Reject: `_fbp`, `_fbc`, `fbclid`, every UTM and every `meta_*` cookie cleared to
null, and zero further events even when `fbq('track','Lead')` was forced.

Google Consent Mode defaults (`ad_storage`, `analytics_storage`, `ad_user_data`,
`ad_personalization` = denied) were **not touched**. Verified still denied-by-default
after this change.

## 4. Route and query privacy — SURFACE vs SUBMISSION

The boundary is **patient-specific information, not subject matter**. Public
pages about back pain, herniated discs, injections and surgery are marketing
content and stay fully measurable; they are what paid media lands on.

**Blocked outright** (`SENSITIVE_PATH_PREFIXES`): `/internal` only.

**Blocked by query key** (`SENSITIVE_QUERY_KEYS`): none. A repo-wide audit found
no route that encodes patient-submitted health data in a query string.

**Deliberately NOT blocked** (an earlier, over-broad version of this file did
block them, at real cost to paid-media measurement):

| Surface | Why it is eligible |
|---|---|
| `/patient-forms` | Public page offering **blank** new-patient packets for download. Collects nothing, uploads nothing. |
| `/condition-check`, `/find-care/candidacy-check`, `/find-care/free-mri-review` | Landing on a page that *offers* an assessment reveals nothing about the visitor. These are ad destinations. Only the **submission** is restricted. |
| `/conditions?data={"tags":["Spine"]}` | A public content filter linked from HomePageUI, NavBar, ServicesAndExpertiseSection and HomeInteractiveAnatomy — equivalent to the path `/conditions/sciatica`, which was always eligible. Blocking one while allowing the other was incoherent. |
| `/conditions/*`, `/treatments/*`, `/lp/*`, `/locations/*`, `/blogs/*`, doctor pages | Ordinary public marketing content. |

### The automatic-PageView finding (important)

**VERIFIED in-browser.** Once `fbevents.js` is resident, Meta fires its **own**
PageView on `history` changes, with **no `fbq()` call from this codebase**.
Unmounting the `<Script>` does not stop it — the script has already executed.

Measured before the fix: navigating from an eligible page to `/patient-forms`
transmitted a PageView for that clinical URL while our adapter was provably
silent (fbq call spy recorded zero calls).

**Fix:** `lib/meta-pixel.ts` wraps `history.pushState`/`replaceState` *after*
fbevents installs its own hook, so our wrapper is the outer function and runs
first. It evaluates the **target** URL and calls `fbq('consent','revoke')` before
delegating, then `grant` when an eligible route returns.

Measured after the fix — 0 PageViews on every clinical route including the first
entry, and normal tracking resumed afterwards.

## 5. Event taxonomy

Deliberately small.

| Meta event | When | Payload |
|---|---|---|
| `PageView` | one per eligible page load + one per eligible SPA path transition | none |
| `Lead` | server-confirmed accepted submission from an eligible form source | `{}` + `eventID` = `submission_id` |
| `Contact` | click on a `tel:` CTA | `{}` + opaque random `eventID` |

**Not implemented, deliberately:** `Schedule` (a callback request is not a booked
appointment), `ViewContent` (would encode condition interest), and any custom
event naming a condition, procedure or payer.

### Form inventory → Meta mapping

All 16 lead forms route through the single `pushAcceptedLead()` funnel. Each passes
an explicit `form_source`.

A lead is **never** suppressed because of the page it came from — only because
the workflow itself collects patient-specific clinical answers. This is an
explicit DENY list of three, from reading the form schemas:

| Form source | Meta `Lead`? | Fields that decided it |
|---|---|---|
| **condition-check** | **No** | `pain_area`, `pain_symptoms`, `pain_desc`, `pain_worst`, `pain_source`, `insurance_type` |
| **candidacy-check** | **No** | `condition`, `age`, `health`, `smoking`, `recent_diagnosis`, `last_test_date`, `insurance_type` |
| **free-mri-review** | **No** | `recent_diagnosis`, `last_test_date`, `insurance_type` |
| every other source (16 of 19) | **Yes** | generic contact / consultation / callback |

The three still produce the canonical `lead_form_submit_success` event, still
reach Google Ads and GA4, and are still persisted with full attribution. Only
the third-party advertising conversion is withheld.

Resolution **fails CLOSED**: a source must appear in `META_ELIGIBLE_FORM_SOURCES`
explicitly. That cannot silently cost signal, because the build gate proves the
eligible and ineligible lists **partition `FORM_SOURCES` exactly** — no gaps, no
overlap, no stale entries. Adding a form to `lib/lead-contract.ts` fails the
build until someone decides whether it may become an advertising conversion.
Mutation-tested three ways: untriaged source, source in both lists, and a list
entry that is not a real form source.

## 5b. Environment guard — local and preview never touch the production dataset

`isMetaEnvironmentEnabled()` blocks the pixel entirely on a non-production
origin: `localhost`, `127.0.0.1`, `0.0.0.0`, `::1`, `*.local`, `*.localhost`,
and any deployment where `NEXT_PUBLIC_VERCEL_ENV` is set to something other than
`production`. The component also refuses to render the `<Script>`, so
`connect.facebook.net` is never even requested.

This exists because two local test PageViews **did** reach the live dataset
during implementation, before the guard was written. Automated local runs, CI
and preview deploys must not create events that look like real traffic.

**Escape hatch:** set `NEXT_PUBLIC_META_PIXEL_ID` to a **test** dataset id and
local tracking runs against that id instead. The production id is never used
from a local or preview origin.

First-party attribution is deliberately NOT blocked locally — `fbclid`, UTMs and
`meta_*` IDs are still captured on a dev machine, so attribution work stays
testable without touching Meta.

Verified in a real browser on `http://localhost:3117` with an eligible route and
a Meta click in the URL: 0 `connect.facebook.net` requests, 0 beacons, `fbq`
undefined, no `_fbp`/`_fbc` — while `fbclid`, `utm_source` and `meta_ad_id` were
all captured and GTM/GA4 were unaffected.

## 6. What Meta never receives

Verified at the network layer on a real `Lead` request: `ud[...]` params **empty**,
`cd[...]` params **empty**, `aems=0;0` (Automatic Advanced Matching off).

Never sent, hashed or unhashed: email · phone · first/last name · postal code ·
patient identifiers · insurance carrier/type/PPO status · diagnosis · symptoms ·
consultation reason · condition · treatment interest · procedure · doctor selected ·
MRI or imaging data · uploaded files · medical history · candidacy results ·
questionnaire answers · market · clinic · form name.

`fbq('init', ...)` is called with **no** second argument, so Advanced Matching
cannot be enabled from code.

## 7. Deduplication

| Risk | Control |
|---|---|
| Double-click / rapid resubmit | `emittedSubmissionIds` Set in `pushFormSubmit` — one accepted submission, one dispatch |
| React rerender / Strict Mode | `window.__msoMetaInitialized` guard + `lastTrackedPath` ref |
| Duplicate init | idempotent `initMetaPixel()` — verified exactly one `init` |
| Duplicate first PageView | vendor inline `track('PageView')` deliberately NOT used; init owns the initial PageView, the effect owns transitions only |
| Browser vs Meta-managed CAPI | shared `eventID` = server `submission_id` |
| Two loader scripts | one `<Script id="meta-pixel-base">` — verified exactly one `fbevents.js` in DOM |

## 8. Conversions API

**UNVERIFIED from code — requires Events Manager.** The brief states Meta-managed
("Set up with Meta") web-events CAPI may already be mirroring pixel events. No
custom server-side CAPI was built, deliberately: a second pipeline would risk
Browser + Meta-managed Server + Custom Server for one lead.

Because every browser `Lead` carries `eventID = submission_id`, a mirrored server
event will deduplicate against it automatically.

Consider custom CAPI **only** if a proven gap appears — CRM qualified-lead events,
appointment outcomes, or Meta-managed CAPI demonstrably not mirroring `Lead`.

## 9. noscript pixel — intentionally omitted

The vendor `<noscript><img src="...facebook.com/tr..."></noscript>` is **not**
included. It would render server-side and fire before any consent check, since
consent lives in `localStorage` and is only readable client-side. There is no
server-side consent mechanism to gate it. Omitting it loses a very small
no-JavaScript segment; including it would transmit to Meta regardless of the
visitor's choice.

## 10. Attribution (first-party)

`lib/gclid.ts` captures and persists, under marketing consent only: `gclid`,
`gbraid`, `wbraid`, `fbclid`, `msclkid`, `utm_source/medium/campaign/term/content`,
and now **`utm_id`, `meta_campaign_id`, `meta_adset_id`, `meta_ad_id`**.

### Landing-parameter buffer — the biggest signal recovery

Capture is gated on marketing consent, but the banner is answered seconds or
minutes after arrival, and this is a single-page app. A visitor who landed on
`/lp/x?fbclid=...&utm_campaign=123`, browsed to `/treatments`, and only then
pressed Accept was captured from a URL that no longer carried any parameters —
so a consented, attributable **paid click was recorded as organic. Permanently.**

`bufferLandingAttribution()` now snapshots the arrival parameters into **memory
only** (module scope — no cookie, no storage, nothing transmitted) and the normal
cookie write reads from it once consent exists.

Two rules keep it honest:

- **Latest click wins.** A URL carrying any attribution parameter replaces the
  buffer wholesale, so an older `gclid` is never resurrected over a newer `fbclid`.
- **Rejection keeps it locked.** The buffer is only readable once marketing
  consent exists. A visitor who rejected behaves exactly as before it existed.

`_fbc` is also seeded after consent, in Meta's documented `fb.1.<ts>.<fbclid>`
format, when the pixel could not derive one itself — never overwriting Meta's own.

**Verified in a real browser** (land with Meta params → browse away → accept):
`fbclid`, `utm_source`, `utm_campaign`, `meta_campaign_id`, `meta_adset_id`,
`meta_ad_id` and `_fbc` were all recovered. Every one of them was `null` before.

### Recommended Meta ad URL template

```
utm_source=meta&utm_medium=paid_social
&utm_campaign={{campaign.id}}&utm_content={{ad.id}}&utm_term={{adset.id}}&utm_id={{campaign.id}}
&meta_campaign_id={{campaign.id}}&meta_adset_id={{adset.id}}&meta_ad_id={{ad.id}}
```

Numeric IDs only. A campaign named "NJ Herniated Disc Surgery PPO" must never
become a URL parameter on a healthcare site.

## 11. Market / location

`market` (`FL|NJ|NY|PA|GA`) via `normalizeStateCode()` and `location_slug` remain
**first-party only**, in the canonical dataLayer event. They are deliberately not
sent to Meta. One pixel for all five states — never fragment by market.

## 12. Manual checks required (cannot be done from code)

1. **Events Manager → Data sources → Dataset `1114353070995808` → Settings**
   confirm Automatic Advanced Matching is **Off**.
2. **Settings → Data Source Category** — confirm whether the dataset is flagged
   for restricted/health data, and record any event or parameter restrictions.
3. **Test Events** — submit one test lead; confirm exactly one `Lead`, whether a
   Server row appears, and whether it shows **Deduplicated**.
4. **Diagnostics** — review every warning; classify each as real problem /
   expected healthcare restriction / test artifact / Meta-side change.
5. **Automatic advanced matching & automatic events** — confirm what the pixel
   config at `connect.facebook.net/signals/config/1114353070995808` enables. The
   automatic PageView behaviour documented in §4 comes from there.
6. **Pixel Helper** on production: homepage 1 PageView; location page 1 PageView;
   `/conditions/*`, `/treatments/*`, `/area-of-pain/*`, `/injuries/*`,
   `/condition-check`, `/find-care/candidacy-check`, `/find-care/free-mri-review`
   — none. `/patient-forms` DOES get a PageView (it names no condition).
   The authoritative list is `SENSITIVE_PATH_PREFIXES` in `lib/route-privacy.ts`
   — check against the code, never against a copy in prose. An earlier version
   of this checklist listed routes the policy did not actually exclude, so
   anyone following it would have certified a protection that did not exist.

## 13. Known limitations

- Meta's own automatic events are controlled Meta-side; §4's history guard
  suppresses them on sensitive routes but the setting should still be reviewed.
- The loader script remains in the DOM after consent withdrawal; dispatch is
  revoked but the script is not unloaded (browsers cannot unload an executed script).
- ~~A `PageView` on a public condition page transmits that page's URL...~~
  **RESOLVED 2026-11-12.** The policy review happened. Condition, treatment,
  area-of-pain, injury and clinical-assessment routes are now excluded by path.
  The deciding factor was not US statute — the federal theory was vacated in
  *AHA v. Becerra* (2024) — but Meta's Business Tools Terms §1.h, which forbids
  data "based on, directly or otherwise, health information" and which consent
  cannot waive. See `lib/route-privacy.ts` for the full rationale.
- ~~`?data=` URLs get no Meta PageView at all.~~ **This was never true.**
  `SENSITIVE_QUERY_KEYS` is empty, so the query was always eligible. Its hosts
  (`/conditions`, `/treatments`) are now excluded by path instead, which is the
  stronger control and makes the point moot.
- An observed Meta `PageView` reported `dl` as the bare origin with no path.
  **Do not rely on this** — it could not be reproduced from the code or from
  `fbevents.js`, and is most likely a browser-extension artifact in the test
  profile. Rate the risk as if the full URL is transmitted.
