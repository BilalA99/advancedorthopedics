# Claude for Chrome — follow-up prompt (after the first run found the setup-tag fault)

Paste everything between the rules into the **same** Claude for Chrome session if it
is still open (it still has Preview and Tag Assistant tabs up), or a new one on the
Seo@ profile.

---

Your last run was right, and the thing you found changes the plan. Confirming your
finding from the code, so you know it is not a probe artifact:

The `__awud` setup tag (`Lead Submit Form Enhanced`) reads a `__awec` variable in
MANUAL mode, which reads `enhanced_conversion_data.*` from the dataLayer. The site
pushes `enhanced_conversion_data` **after** the canonical event, in a separate
`ec_capture` event, behind a marketing-consent check, after an async SHA-256 hash.
So at the moment GTM runs that setup tag, every key it reads is undefined — on
every real lead, not just your probe, and never at all for visitors who declined
marketing consent.

Your proposed fix is the correct one. Do it.

## What to change

In GTM container **GTM-T57SB8NQ**, workspace 38:

1. Open the FL conversion tag (`Thank You Page`, AW-17270956371, label
   `soPPCPay3ucaENPCt6tA`). Under **Advanced Settings → Tag Sequencing**, remove
   `Lead Submit Form Enhanced` as the setup tag. Leave everything else alone — do
   not change its trigger, its order ID, or its conversion label.
2. Do the same on the NJ/NY conversion tag (`Thank You Page For NJ/NY`,
   AW-17988324873, label `m2yGCJfJ5YEcEImcwIFD`).
3. Leave the `Lead Submit Form Enhanced` tag itself in place but **unattached**.
   Do not delete it and do not give it a new trigger — firing it on `ec_capture`
   would not help, because Google applies user-provided data to *subsequent*
   conversions rather than retroactively to one that already fired. Attaching it
   anywhere right now would only risk re-introducing a block.
4. Do **not** enable "Include user-provided data from your website" on the
   conversion tags. It would read the same variable at the same moment and still
   find nothing, and I would rather the configuration say plainly that enhanced
   conversions are off than have it look configured while sending empty data.

Enhanced conversions being unattached is a deliberate, temporary trade. A conversion
that reports without identity enrichment is worth far more than one that never
reports. The permanent repair is site-side and is my job, not yours.

## Verify before publishing

In Preview, on `https://mountainspineorthopedics.com/find-care/book-an-appointment`:

```js
dataLayer.push({
  event: 'lead_form_submit_success',
  form_id: 'ChromeProbe', form_source: 'book-appointment',
  page_path: '/find-care/book-an-appointment',
  market: 'FL', submission_id: 'chrome-probe-' + Date.now()
});
```

Required evidence, in this order:

1. `Thank You Page` moves to **Tags Fired** (it was under Tags Not Fired before).
2. **A network request to `googleadservices.com/pagead/conversion/17270956371/`.**
   This is the only thing that actually counts. A tag showing as "fired" is not
   proof — these tags have been showing as fired or blocked while sending nothing
   for over a week.
3. Repeat with `market: 'NJ'` and confirm `/pagead/conversion/17988324873/`.

**Before you run the probe, clear this browser's `_gcl_aw` cookie** for
mountainspineorthopedics.com. You reported it holds `TEST-GCLID-NOT-REAL`, which is
left over from my own earlier probing — my fault, not yours. It gets attached to
outgoing hits and would make the test traffic look like it came from a paid click.

If both conversion requests fire, publish with the version name
`Fix Ads conversion transport and remove blocking setup tag` and a description
naming both faults: no Google tag for either AW- destination, and a user-data setup
tag that gated the conversion on data the site pushes later.

If either does not fire, **stop and tell me**. Do not publish a partial fix.

## After publishing

Reload the live site (not Preview) and push the same event again. Confirm the
`googleadservices.com` request fires on the **published** container. A fix that
works only in Preview is not a fix.

## Then carry on with the Ads work

Once publishing is verified, do Tasks 2 and 3 from the previous brief:

- **Task 2** — both accounts, Goals → Conversions → Summary: every conversion action
  with name, source (Website vs GA4), status, Primary/Secondary, and 30-day count.
  I especially need to know whether the GA4-imported `form_submit` action is
  Secondary while the tag-based one is Primary — that combination would show zero
  form conversions in the Conversions column while conversions were in fact
  arriving, and would explain the original report with nothing broken on the site.
  Also report the attribution model and click-through conversion window.
- **Task 3** — NJ/NY account: campaign statuses (limited by budget / paused /
  disapproved), geo-targeting and whether it is set to "presence" or "presence or
  interest", 14-day impressions / clicks / CTR / avg CPC, any disapproved ads or
  policy flags, and the 14-day search terms report.

## One more thing to check

You saw GA4's `g/collect`, `ccm/collect` and `measurement/conversion` POSTs return
**503** in that browser. That is unusual and I do not want it written off. Check
whether it still happens in a clean incognito window with extensions disabled. If it
persists there, say so — it would mean GA4 collection is failing for real users too,
which is a separate incident from this one and a bigger one.

## Reporting

Report what you changed, the published version number, and the network evidence for
FL and NJ separately. If something did not work, say so plainly — I need accuracy
more than I need it to sound finished. Your last report was exactly right to stop
where it did.
