# Claude for Chrome — publish the revert, then trigger the user-data tag on `ec_capture`

Run on the **Seo@ profile** (`seo@appflowstudio.io`, Chrome's `Profile 7`).

Supersedes the previous version. Its Task 1 premise — that my two AW- Google tags
were hiding the enhanced-conversions field — was wrong; `mountainspinestream` hides
it, and that tag is not going away. The route to manual enhanced conversions is
different and is below.

---

You have full ownership. Work end to end without confirming each step. Stop if
something contradicts what is written here.

GTM **GTM-T57SB8NQ**. Ads **AW-17270956371** (FL, 721-766-1742), **AW-17988324873**
(NJ/NY, 147-098-7566). Live container **v38**; workspace 39 holds your 2 pending
deletions.

## What you found, and why it resolves everything

`mountainspinestream` is one Google tag carrying `G-XXHSYV3NMD`, **AW-17270956371**
and **AW-17988324873** as destinations, loaded by the `GA4 - Configuration` tag.

That single fact explains every wrong call in this investigation. The AW-
destinations were on the page the whole time, configured on the Google tag side
where the GTM container cannot show them. My "no transport, the tag cannot send"
diagnosis was reading an absence that was never there. I have changed the decoder to
report this as **unknown** rather than absent.

It also explains the original design: whoever set this up used a `__awud` **setup
tag** because the per-tag enhanced-conversions field was already hidden by
`mountainspinestream`. The setup tag was the only route available — and it was the
wrong one, because a setup tag gates the conversion.

## Decision 1 — Publish the two deletions. Yes.

My AW- Google tags are redundant: `mountainspinestream` already delivers both
destinations. You proved conversions fire without them (Tests B and D in Preview,
FL and NJ, both 200). Keeping two tags that duplicate a destination is clutter that
will mislead the next person exactly as it misled me.

1. Publish workspace 39 with version name
   `Remove redundant AW Google tags (destinations already on mountainspinestream)`
   and a description saying they were added on a wrong diagnosis and that
   `mountainspinestream` carries both AW- destinations.
2. Then run **live Test D**: reload the real page (cache-busted, not Preview), push
   only `lead_form_submit_success` with `market: 'FL'`, and confirm
   `googleadservices.com/pagead/conversion/17270956371/` still fires. Repeat for NJ.
   If either fails, roll back to v38 immediately and tell me.

## Decision 2 — Yes, read `mountainspinestream`'s settings. Read only.

Report, change nothing:

- Is **Enhanced conversions** on, and in which mode (Automatic / Manual / Code)?
- What the destination list is, in full.
- Whether a user-provided data source is configured, and what it points at.

The probe hits already carry `ec_mode=a&em=tv.1`, so automatic enhanced conversions
are on. `em=tv.1` with no value means automatic collection found nothing to scrape on
a page where no form was filled — which is expected and tells us nothing about real
submissions.

## Task 1 — Measure before building anything else

**This is the most valuable thing in this run.** Enhanced conversions may already be
working via automatic mode, in which case the manual path below is unnecessary.

In Google Ads → Goals → Conversions → **`Thank You Page GTM`** (FL), open its
diagnostics / enhanced conversions section and report:

- Whether enhanced conversions is reported as **active** for that action.
- The **match rate** (the percentage of conversions matched to a signed-in user).
- Any diagnostic warnings on the action.
- Do the same for NJ's `Submit lead form`.

If the match rate is healthy, say so and **stop before Task 2** — we would be adding
complexity for nothing. If it is zero or missing, continue.

## Task 2 — Manual enhanced conversions, without a setup tag

Only if Task 1 shows the match rate is zero or unavailable.

The site was changed on 1 October and is deployed. It now pushes the hashed identity
in an `ec_capture` event **before** `lead_form_submit_success`, where previously it
pushed it afterwards. That ordering change is what makes this work.

So the `__awud` tag gets its **own trigger** rather than being a setup tag:

1. Open `Lead Submit Form Enhanced` (the `__awud` user-data tag, AW-17270956371).
2. Give it a trigger: **Custom Event**, event name exactly `ec_capture`.
3. Confirm it is attached to **no** conversion tag as a setup tag. This is the whole
   point — a setup tag gates the conversion and is what caused the nine-day outage.
   A separately-triggered tag cannot gate anything.
4. Do the same for the NJ/NY copy (AW-17988324873).

Why this works now and would not have before: Google applies user-provided data to
*subsequent* conversions, not retroactively. Previously `ec_capture` fired after the
conversion, so a trigger on it would have been useless. Now it fires first.

Why it is safe: if `ec_capture` never fires — a visitor who declined marketing
consent, a browser without Web Crypto — the `__awud` simply does not run, and the
conversion fires unenhanced. Nothing waits on anything.

## Task 3 — Verify, then publish

**Test A — identity present.** Preview, clear `_gcl_aw`, `gclid`, `mso_gclid`, and
this time also `fbclid` and `_fbc` (both still hold `SAFE_TEST_VALUE` from earlier
testing — mine, not yours). Push both in this order:

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

Expect the conversion hit to carry the hashed values — look for `em=` with something
other than `tv.1`, or `ec_mode=m`. If it still reads `ec_mode=a&em=tv.1`, the manual
data is not being picked up; report that rather than publishing.

**Test B — the regression test, and still the one that matters most.** Reload. Push
ONLY `lead_form_submit_success`, no `ec_capture`. **The conversion must still fire.**
If it does not, revert immediately and tell me.

**Test C — NJ**, same as A with `market: 'NJ'`.

Publish only if all three pass:
`Trigger user-data tags on ec_capture (not as setup tags)`.

## Task 4 — Finish the asset audit

Not done last run. Report only, change nothing.

1. The **three disapproved image assets** — Clickbait, Clickbait +1, **Past
   Violation** — with their ad groups and stated reasons. Past Violation on a
   healthcare account is the one I most want to understand.
2. The sitelink final URLs you could not confirm. You established the injury
   sitelinks were **added by Google AI on 27 September**, not imported from a law
   account, and that the ones you checked are on-domain — so this is now
   housekeeping, not an alarm. **Yes, run the Assets report export** to get the full
   Final URL list; that is approved. Flag anything off-domain.
3. Whether Google's auto-created assets can be turned off for these campaigns, and
   what would be lost. Do not turn them off yet.

## Settled — do not revisit

- **Bidding:** you confirmed every active campaign uses Maximize Conversions or
  Manual CPC. No value-based bidding anywhere, so the `value=0` is irrelevant.
  Closed; change nothing.
- **DSA:** NJ-Central has none. Closed.
- **New York:** no campaign is intentional.
- **Test conversions:** never recorded; nothing to clean up.
- **Ad strength:** the gap is keyword coverage in headlines, not asset count. Noted
  for a separate copy pass; not part of this run.

## Report back

1. Published version numbers, and the live Test D result for FL and NJ.
2. `mountainspinestream`'s enhanced-conversions mode and destination list.
3. **The match rates from Task 1** — the number that decides whether Task 2 was even
   needed.
4. Task 3 results, especially Test B.
5. The disapproved-asset reasons.

Accuracy over reassurance. Four times now you have reported something that contradicted
my reading and been right each time. Keep doing that.

---

## After this run

```bash
node scripts/qa/gtm-container-decode.mjs GTM-T57SB8NQ
node scripts/qa/prod-gtm-trigger-probe.mjs https://mountainspineorthopedics.com FL,NJ
```

Tags 6 and 10 must show **no setup tag**. A `setup tag:` line reappearing there means
the user-data tag was attached the wrong way and the outage is back.
