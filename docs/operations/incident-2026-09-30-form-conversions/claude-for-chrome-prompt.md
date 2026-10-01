# Claude for Chrome prompt — fix the Google Ads conversion transport

Open Chrome on the **Seo@ profile** (`seo@appflowstudio.io` — Chrome's `Profile 7`),
then paste everything between the rules below into Claude for Chrome.

The diagnosis is already proven from the published container and live network
probes; the prompt tells Claude what to do and, deliberately, what the evidence
already says so it does not re-litigate it. It is written to be verified at each
step rather than trusted — every claim it makes back to you should be checkable.

---

You have full ownership of this task. Work through it end to end and do not stop to
ask me for confirmation at each step — I have already authorised every change
described here. Only stop if you hit something this prompt did not anticipate, or
if what you see contradicts the diagnosis below.

## Context you can rely on (already proven — do not re-investigate)

Site: mountainspineorthopedics.com. GTM container **GTM-T57SB8NQ** (account
6301349322, container 223492636). Google Ads conversion IDs **AW-17270956371**
(Florida) and **AW-17988324873** (New Jersey / New York). GA4 property
**G-XXHSYV3NMD**.

The website is working. Form leads are reaching the database — 22 real leads since
23 September, four of them carrying a `gclid`. The site pushes the correct
dataLayer event (`lead_form_submit_success`, with `market` set to FL/NJ/NY) and GTM
receives it correctly.

The published container was decoded directly from `gtm.js`. It contains three
Google Ads conversion tags, all correctly triggered:

- `tag#6` — AW-17270956371, label `soPPCPay3ucaENPCt6tA`, fires on
  `lead_form_submit_success` AND `market == "FL"`
- `tag#7` — AW-17270956371, label `zPVhCPmP0ecaENPCt6tA`, fires on a `Contact Us`
  click
- `tag#10` — AW-17988324873, label `m2yGCJfJ5YEcEImcwIFD`, fires on
  `lead_form_submit_success` AND `market` in (NJ, NY)

**The fault: the container has no Google tag for either AW- destination.** Its only
`__googtag` is `G-XXHSYV3NMD` (GA4). A Google Ads conversion tag does not send its
own beacon — it routes through a Google tag registered for that conversion ID. With
no such destination on the page, all three fail silently: no console error, no
network request, nothing in the GTM UI that looks wrong.

This was confirmed live: pushing the canonical event on production with consent
granted produced GA4 requests and **zero** requests to `googleadservices.com`.

Two traps that already produced wrong answers — do not fall into them:

- GTM stores the conversion ID **bare** (`17270956371`), never with the `AW-`
  prefix. Searching the container for "AW-" finds nothing; that does not mean there
  are no Ads tags.
- `tag#6` and `tag#10` have **setup tags** (`tag#22`, `tag#23`) that look like the
  transport but are not — both are `__awud`, the enhanced-conversions *user data*
  tag. It supplies hashed user data to a conversion. It is not a destination.

## Task 1 — Add the two Google tags and publish (this is the fix)

In GTM (https://tagmanager.google.com), container **GTM-T57SB8NQ**:

1. Confirm the diagnosis before changing anything. Go to Tags and check there is no
   existing Google tag whose ID begins `AW-`. If one already exists, stop and tell
   me — the diagnosis would be wrong and I need to know that before you change
   anything.
2. Create **Tags → New → Google tag**:
   - Tag ID: `AW-17270956371`
   - Trigger: **Initialization — All Pages**
   - Name it `Google Tag — AW-17270956371 (FL)`
3. Create a second one the same way with Tag ID `AW-17988324873`, named
   `Google Tag — AW-17988324873 (NJ/NY)`.
4. Check the workspace for any other pending changes before you publish. This
   workspace has had unpublished edits sitting in it. **List every pending change
   back to me.** Publish only your two new tags plus changes you can confirm are
   intended; if there is anything you cannot account for, tell me and wait.
5. Verify in **Preview** before publishing:
   - Connect Preview to `https://mountainspineorthopedics.com/find-care/book-an-appointment`
   - In the browser console, run:
     ```js
     dataLayer.push({
       event: 'lead_form_submit_success',
       form_id: 'ChromeProbe', form_source: 'book-appointment',
       page_path: '/find-care/book-an-appointment',
       market: 'FL', submission_id: 'chrome-probe-' + Date.now()
     });
     ```
   - In Preview, confirm the FL conversion tag moves to **Tags Fired**.
   - In DevTools → Network, filter `googleadservices` and confirm a request to
     `/pagead/conversion/17270956371/`. **This request is the actual proof.** The
     tag showing as "fired" in Preview is not sufficient — that is exactly what it
     has been doing all along while sending nothing.
   - Repeat with `market: 'NJ'` and confirm `/pagead/conversion/17988324873/`.
6. Publish, with a version name of `Add Google tags for AW- conversion transport`
   and a description saying the conversion tags had no destination and were failing
   silently.
7. After publishing, reload the live site and confirm once more that a pushed event
   produces a `googleadservices.com` request on the **published** container, not
   just in Preview.

Do not submit a real form at any point. Pushing the dataLayer event directly is
enough and creates no lead, no database row and no staff email.

## Task 2 — Read the Google Ads conversion setup and report back

In Google Ads (https://ads.google.com), for **both** accounts (FL and NJ/NY), go to
**Goals → Conversions → Summary** and report back, as a table:

- every conversion action: name, source (Website vs Google Analytics 4), status,
  and whether it is **Primary or Secondary**
- for each, the "Conversions" count over the last 30 days
- whether any action is in **"No recent conversions"** or **"Inactive"** state

I specifically need to know this: GA4 is currently forwarding an imported
`form_submit` conversion to Ads. If that imported action is **Secondary** and the
tag-based action is **Primary but silent**, then the Conversions column reads zero
for forms while form conversions are in fact arriving under a different action.
That would fully explain the reported "both figures are phone calls only" with
nothing broken on the site. Tell me which of those two is actually the case.

Also check **Goals → Conversions → Settings** and report the conversion **attribution
model** and **click-through conversion window**.

## Task 3 — New Jersey spend with no leads

The NJ/NY account spent $184 over roughly seven days and produced no form leads.
That part is real — the last NJ lead of any kind was 23 September, and the NJ pages
are up and serving working forms. So this is a media problem, not a tracking one.

In the NJ/NY account, report back:

- campaign status — are any **limited by budget**, **paused**, or **disapproved**?
- the **geo-targeting** on each active campaign, and whether "presence or interest"
  vs "presence" is set (interest-based targeting in a medical-services account
  wastes spend on people outside the service area)
- impressions, clicks, CTR and average CPC for the last 14 days
- any **disapproved ads** or policy flags — healthcare advertising gets restricted
  often and silently
- the **search terms report** for the last 14 days: are the queries actually
  relevant to orthopedic/spine care in NJ/NY?

$184 over seven days is about $26/day against a $4,000/month budget — roughly 20%
of the pace that budget implies. I want to know why it is underspending.

## How to report back

Give me, in this order:

1. **What you changed in GTM**, and the published version number.
2. **The verification evidence** — specifically whether a `googleadservices.com`
   conversion request fired on the published container, for FL and for NJ. If it
   did not, say so plainly and stop; do not describe the fix as complete.
3. **The Ads conversion table** from Task 2, and your answer to the Primary/Secondary
   question.
4. **The NJ findings** from Task 3, with the numbers.
5. Anything you found that contradicts the diagnosis above.

Be accurate over reassuring. If something did not work, I need to know that more
than I need it to sound finished.

---

## After Claude for Chrome is done

Re-run the local checks to confirm the fix from outside the browser:

```bash
node scripts/qa/gtm-container-decode.mjs GTM-T57SB8NQ
node scripts/qa/prod-gtm-trigger-probe.mjs https://mountainspineorthopedics.com FL,NJ,NY
```

The decoder should print `transport: tag#N __googtag AW-… — OK` for tags 6, 7 and
10 instead of `MISSING`. The probe passes only when `googleadservices.com` is
actually contacted. Neither script submits a form or creates a lead.
