# Claude for Chrome — final prompt (re-attach enhanced conversions, fix value, trim waste)

Run on the **Seo@ profile** (`seo@appflowstudio.io`, Chrome's `Profile 7`).

Prerequisite: the site-side fix must be deployed first. Conversions already work
without this prompt — this run restores enhanced conversions and cleans up the
things the audit surfaced. Nothing here is urgent in the way the last one was.

---

You have full ownership. Work through this end to end without asking me to confirm
each step. Stop only if something contradicts what is written here.

## Context

Site: mountainspineorthopedics.com. GTM container **GTM-T57SB8NQ**. Google Ads
**AW-17270956371** (Florida, account 721-766-1742) and **AW-17988324873** (NJ/NY,
account 147-098-7566).

Your last run fixed the outage: container **v38** removed a `__awud` user-data tag
that had been attached as a **setup tag** on both conversion tags and was gating
them. Conversions now fire — I re-verified independently from a clean headless
browser on the published container, FL and NJ both.

Enhanced conversions were left unattached, deliberately, because the identity data
arrived on the dataLayer *after* the conversion tag read it. **That is now fixed in
the site code and deployed.** `enhanced_conversion_data` is pushed in an `ec_capture`
event *before* `lead_form_submit_success`, so the data is present when the
conversion fires. It is still consent-gated and still SHA-256 hashed.

## Task 1 — Re-attach enhanced conversions, the safe way

**Do not restore the setup tag.** That is what caused the outage. A setup tag gates
the conversion; if the user data is ever missing — a visitor who declined marketing
consent, a browser without Web Crypto — the conversion would hang again and we would
be back where we started. The site is built so that case is normal and expected.

Instead, on **each** conversion tag (`Thank You Page` for FL, `Thank You Page For
NJ/NY`):

1. Open the tag. Confirm **Tag Sequencing** has no setup tag. Leave it that way.
2. Tick **"Include user-provided data from your website"**.
3. Select the existing user-provided data variable (the `__awec` one that
   `Lead Submit Form Enhanced` was using — it reads `enhanced_conversion_data.*`).
   Do not create a new one; reusing it keeps one definition.

This reads the identity at fire time but does **not** gate the tag. If the data is
absent the conversion still fires, just without enhancement. That is the behaviour
we want and the distinction that matters.

Leave the `Lead Submit Form Enhanced` tags themselves unattached and untriggered.

## Task 2 — Fix the conversion value

NJ's `Submit lead form` records **$0** per conversion because the tag sends
`value=0`. Google's $1 fallback only applies when **no** value is sent at all, so
value-based bidding currently has nothing to work with.

On both conversion tags, **clear the Conversion Value field entirely** — leave it
empty rather than setting it to 0. Do not invent a lead value; if we want a real
number later that is a business decision, not a tag setting.

## Task 3 — Verify, then publish

In Preview, on `https://mountainspineorthopedics.com/find-care/book-an-appointment`.
Clear `_gcl_aw`, `gclid` and `mso_gclid` cookies first if any test values remain.

Because the site now pushes identity first, test it the way the site does — push
both events in order:

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

Those digests are 64-character dummies, not real hashes of anything. They are the
right shape to prove the plumbing; they will not match a real user, which is fine —
we are testing transport, not match rate.

Required evidence:

1. `Thank You Page` fires — **not** blocked, not "still running".
2. A request to `googleadservices.com/pagead/conversion/17270956371/` **containing
   user data** — look for an `em=`/`pn=` or `tv.1~em` style parameter, or `ec_mode`
   alongside the hashed fields. A conversion request with no user-data parameters
   means Task 1 did not take.
3. Repeat with `market: 'NJ'` → `/pagead/conversion/17988324873/`.
4. **Then test the failure case**, which matters more than the success case: reload,
   push ONLY the `lead_form_submit_success` event with no `ec_capture` first, and
   confirm the conversion **still fires**. If it does not, the tag is gated again —
   stop, revert, and tell me.

Publish only if all four pass. Version name:
`Re-attach enhanced conversions without gating; clear zero conversion value`.

## Task 4 — Trim the NJ waste

In the NJ/NY account (147-098-7566):

1. **NJ-Central — Non-Brand Search** has Dynamic Search Ads targeting **"all URLs
   Google knows about"**. The site has 769 pages, most of them blog, condition and
   treatment content that does not convert. Narrow DSA to specific pages — the
   `/locations/new-jersey/*` pages and the main treatment pages — or turn DSA off on
   that campaign if narrowing is not straightforward. Tell me which you did.
2. **NJ-Outer — Non-Brand Search** is *limited by budget* at $61/day while NJ-Central
   is *limited by search volume* at $58/day. NJ-Outer is the one with demand it
   cannot serve. **Do not change budgets** — just confirm the current daily amounts
   and 14-day spend for each so I can decide the shift.
3. The two highest-spend ads have **Poor** ad strength. List them with their headline
   and description counts so I can see what they are missing. Do not rewrite them.

**Ignore New York.** There is no NY campaign and that is intentional — it is not in
the plan yet. Do not create one and do not flag it again.

## Task 5 — Clean up

Four test conversions from the last run are in the accounts (2 FL, 2 NJ), identifiable
by order IDs beginning `chrome-probe-`. They carry no gclid so they attach to no
campaign. Confirm whether Google Ads lets you exclude or remove them; if not, just
tell me the dates and counts so they are on record rather than quietly in the totals.

## Report back

1. What you changed, per tag, and the published version number.
2. The four pieces of verification evidence from Task 3, especially #4 — the
   conversion firing *without* identity present. That is the regression test for the
   outage we just fixed.
3. What you did to the DSA targeting, and the budget/spend figures.
4. Anything that contradicts the above.

Accuracy over reassurance. If a step did not work, say so — the last run's value was
entirely in it stopping rather than publishing something that looked done.

---

## After this run

```bash
node scripts/qa/gtm-container-decode.mjs GTM-T57SB8NQ
node scripts/qa/prod-gtm-trigger-probe.mjs https://mountainspineorthopedics.com FL,NJ
```

The decoder must still show **no setup tag** on tags 6 and 10 — if a `setup tag:`
line reappears there, enhanced conversions were attached the wrong way and the
outage is back. The probe must still report one conversion ping per market.
