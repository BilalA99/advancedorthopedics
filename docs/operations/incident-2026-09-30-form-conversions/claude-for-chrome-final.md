# Claude for Chrome — remove the Google tags, then attach enhanced conversions

Run on the **Seo@ profile** (`seo@appflowstudio.io`, Chrome's `Profile 7`).

Supersedes the previous version of this file, whose Task 1 was unachievable and
whose Task 4 was based on a DSA setting that does not exist. Both are corrected
here.

---

You have full ownership. Work end to end without confirming each step. Stop if
something contradicts what is written here.

GTM **GTM-T57SB8NQ**. Ads **AW-17270956371** (FL, 721-766-1742), **AW-17988324873**
(NJ/NY, 147-098-7566). Live container is **v38**; conversions currently fire for
both markets and that must still be true when you finish.

## Both of your questions, answered

**1. Should enhanced conversions go on the Google tag as `user_data`? No.** I decoded
the published container. Both Google tags are bare — `vtp_tagId` and nothing else —
and they fire on **Initialization – All Pages**, i.e. at page load. A `user_data`
parameter there is evaluated when that tag fires. The site pushes
`enhanced_conversion_data` when the visitor submits the form, which is much later on
the same page. It would read an empty variable every time. Do not do it.

**2. The lead value is deferred.** See Task 4 — it needs one number from the account
that I do not have, and it may turn out to be a non-issue entirely.

## The actual fix: remove the two Google tags

You found that GTM hides the enhanced-conversions field on a conversion tag when a
Google tag for that destination exists in the container ("this tag will use the
configuration of Google tag mountainspinestream"). That is exactly what happened,
and **those two Google tags are mine** — I had you add them on 30 September on a
diagnosis that turned out to be wrong.

They were never the fix. The Florida conversion tag recorded 23 conversions through
22 September with no Google tag in the container at all. What actually broke things
was the `__awud` setup tag from v37, which you already removed.

So they are not neutral: they add remarketing and view-through pings on every page
load that the site was not sending before, **and** they are what blocks the correct
enhanced-conversions setup. Removing them reverts an unnecessary change and restores
the per-tag field, which reads its variable when the conversion fires — which is the
behaviour we need.

### Task 1 — Remove them

1. Delete (or pause) `Google Tag — AW-17270956371 (FL)` and
   `Google Tag — AW-17988324873 (NJ/NY)`. Do not touch the GA4 Google tag
   `G-XXHSYV3NMD`, and do not touch `mountainspinestream` if that is a different
   Google tag — tell me what it is and what ID it carries before you remove anything
   that is not one of the two I named.
2. Reopen `Thank You Page`. The **"Enable manual enhanced conversions"** field should
   now be visible. If it is still hidden, stop and tell me — something else in the
   container is registering that destination.

### Task 2 — Attach enhanced conversions, without gating

On **each** conversion tag (`Thank You Page` FL, `Thank You Page For NJ/NY`):

1. Confirm **Tag Sequencing has no setup tag**. Leave it that way. A setup tag gates
   the conversion, and that is what caused the outage — missing user data is a normal
   case here, not an error.
2. Enable manual enhanced conversions and point it at the existing `__awec`
   user-provided-data variable (the one `Lead Submit Form Enhanced` used, reading
   `enhanced_conversion_data.*`). Reuse it; do not create a second definition.

Leave the `Lead Submit Form Enhanced` tags unattached and untriggered.

## Task 3 — Verify, then publish

Preview on `https://mountainspineorthopedics.com/find-care/book-an-appointment`.
Clear `_gcl_aw`, `gclid` and `mso_gclid` first.

**Test A — identity present.** Push both, in this order, as the site does:

```js
dataLayer.push({
  event: 'ec_capture',
  enhanced_conversion_data: {
    sha256_email_address: 'a'.repeat(64),
    sha256_phone_number: 'b'.repeat(64),
    address: { sha256_first_name: 'c'.repeat(64), sha256_last_name: 'd'.repeat(64),
               country: 'US', postal_code: '33301' }
  }
});
dataLayer.push({
  event: 'lead_form_submit_success',
  form_id: 'ChromeProbe', form_source: 'book-appointment',
  page_path: '/find-care/book-an-appointment',
  market: 'FL', submission_id: 'chrome-probe-' + Date.now()
});
```

Expect `googleadservices.com/pagead/conversion/17270956371/` **carrying user-data
parameters** (`em=`/`pn=`, or `tv.1~em`, or `ec_mode` alongside hashed fields). A
conversion with no user-data parameters means Task 2 did not take.

**Test B — the regression test, and the one that matters most.** Reload. Push ONLY
the `lead_form_submit_success` event, with no `ec_capture` first. **The conversion
must still fire.** If it does not, the tag is gated again — revert everything and
tell me. This is the exact failure that took conversions down for nine days.

**Test C — NJ.** Repeat Test A with `market: 'NJ'` → `/pagead/conversion/17988324873/`.

**Test D — conversions survive removing the Google tags.** This is the risk in Task 1.
Tests A–C already prove it in Preview; after publishing, reload the **live** page
(not Preview, cache-busted) and confirm a conversion request still fires for FL.

Publish only if all four pass. Version name:
`Remove AW Google tags; attach enhanced conversions on the conversion tags`.

## Task 4 — The conversion value question

You found the value field is already empty and `value=0` comes from the tag itself.
Before anyone sets a number, I need to know whether it matters at all:

- Report the **bidding strategy** on every active campaign in both accounts.
- If they are all Maximize Conversions, Target CPA, or Manual CPC, then conversion
  value is unused and `$0` is a non-issue. Say so and change nothing.
- If any campaign uses **Maximize Conversion Value or Target ROAS**, then $0 is
  actively breaking bidding. Do not invent a number — report which campaigns, and I
  will get a per-lead value from Bilal and have you set it once on the Ads conversion
  action ("Use the same value for each conversion"), not on the tag.

Every conversion that fires is already a qualified lead — unqualified ones are gated
out in the site code and never reach Ads — so one flat value is the right shape.

## Task 5 — The policy and asset findings (these are real, act on them)

In NJ/NY, you found things more serious than the budget question. **Do not change
them yet — report them precisely so I can decide.**

1. **Three disapproved image assets**: Clickbait, Clickbait +1, Past Violation. Give
   me the ad groups they sit in and, if visible, the stated reason. "Past Violation"
   on a healthcare account is worth understanding before it spreads.
2. **Sitelinks named "Personal Injury", "Car Accident", "Slip And Fall Injuries"** in
   an orthopedic campaign. These look like they came from a personal-injury law
   account. List every sitelink on both NJ campaigns with its final URL, so I can see
   whether they point at this site at all. If any point at a different domain, say so
   immediately — that is a misconfiguration worth stopping for.
3. There is also a sitelink named **"New York"**. No NY campaign is intentional, but a
   sitelink pointing at NY content from an NJ campaign is a different thing. Report
   its URL.
4. Sitelinks and callouts showing **"Eligible (Limited)" under "Health in personalized
   advertising"** — list which, so we know what is actually serving.

## Task 6 — Ad strength (report only)

Both Poor ads are in ORTHO SURGEON GENERAL with identical copy. You found 15
headlines (the maximum) with **"Orthopedic Surgeon Near You" pinned to position 1**.
The pin is almost certainly the drag, not missing assets. Confirm the pin, and report
the exact description count — you saw 2 in the asset report but the ad row suggested
4. Do not rewrite the ads.

## Dropped from the previous brief

**Ignore DSA entirely.** You corrected this: NJ-Central has no DSA — empty Website
field, both ad groups Standard, and "use all URLs Google knows about" was default
help text, not live targeting. There is nothing to narrow. Good catch.

**Ignore New York.** No NY campaign is intentional and not in the plan.

**Test conversions need no cleanup.** You confirmed the probes never became
conversions (tag pings with no click attached are not recorded), so nothing is
sitting in the totals.

## Report back

1. What you removed and what you changed, per tag, with the published version number.
2. All four Task 3 results, **especially Test B** — the conversion firing with no
   identity present.
3. Bidding strategies (Task 4) and your verdict on whether $0 matters.
4. The policy/sitelink findings verbatim, with URLs.
5. Anything contradicting the above. Your last two reports were right to stop; that
   is worth more than a run that looks finished.

---

## After this run

```bash
node scripts/qa/gtm-container-decode.mjs GTM-T57SB8NQ
node scripts/qa/prod-gtm-trigger-probe.mjs https://mountainspineorthopedics.com FL,NJ
```

Expected: tags 6 and 10 show **no setup tag** (a `setup tag:` line there means the
outage is back), the `google tag:` line reads **none** for both AW- destinations, and
the probe still reports one conversion ping per market.
