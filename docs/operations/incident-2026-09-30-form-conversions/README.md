# Incident — "website forms have not counted since 23 September"

Audited 2026-09-30. **The claim is half right, and the half that is wrong matters
more than the half that is right.**

## Answer in one line

**RESOLVED 1 October 2026 — GTM container v38.** Form conversions stopped on 22
September because container **v37** (21 September, "Update Thank You Page conversion
tags") attached a user-data tag as a **setup tag** on both conversion tags. A setup
tag gates the tag it is attached to, and this one waits on dataLayer keys the site
only pushes afterwards, so it never completed and the conversion never fired.
Removing it restored both accounts; verified by network capture on the published
container.

Lead capture was never broken — leads were arriving in the database the whole time.

> **A wrong call of mine, corrected below.** I first diagnosed this as a missing
> Google tag and said the conversion tags "cannot send" without one. That was wrong.
> The Florida tag recorded 23 conversions through 22 September with no Google tag in
> the container at all. See [What I got wrong](#what-i-got-wrong).

## What was verified, and how

Everything below is measured, not inferred. Method for each is named so any of it
can be re-run and challenged.

### 1. Lead capture is NOT broken — proven

Direct query against production Supabase (`public.forms`):

| Date | Real form leads |
| --- | --- |
| Sep 30 | 4 (all FL, all with `gclid`) |
| Sep 28 | 1 |
| Sep 26 | 5 |
| Sep 25 | 2 |
| Sep 24 | 1 |
| Sep 23 | 1 (NJ) |

**22 real leads since 23 September**, four of them on 30 September carrying a
`gclid` — i.e. paid clicks that converted. Any statement that the figures are
"phone calls only" because forms stopped working is wrong: the forms submitted,
persisted, and emailed.

### 2. The site pushes the conversion event correctly — proven live

Loaded the real production page with the live container and pushed the exact
canonical event, then read GTM's own resolved state:

```
google_tag_manager['GTM-T57SB8NQ'].dataLayer.get('event')  === "lead_form_submit_success"
google_tag_manager['GTM-T57SB8NQ'].dataLayer.get('market') === "FL"
```

Both correct. The site's half of the contract is intact.

### 3. The GTM container is configured correctly — proven from the published JS

The published container (`gtm.js?id=GTM-T57SB8NQ`) is public JavaScript and
carries the live tag graph. Decoded (`scripts/qa/gtm-container-decode.mjs`):

```
tag#6   __awct  conversionId=17270956371  label=soPPCPay3ucaENPCt6tA
        fires when: event == "lead_form_submit_success" AND dataLayer["market"] == "FL"

tag#10  __awct  conversionId=17988324873  label=m2yGCJfJ5YEcEImcwIFD
        fires when: event == "lead_form_submit_success" AND dataLayer["market"] == "NJ"
                 or event == "lead_form_submit_success" AND dataLayer["market"] == "NY"
```

Right event, right variable, right values, no blocking exceptions, `orderId`
bound to `submission_id` for de-duplication. **Nothing is wrong with the trigger
logic** — which is why "check the trigger" would have been a dead end.

### 4. The tag does not fire — proven

Pushed the event on production with consent granted (`gcs=G111`) and a `gclid` in
the URL, then recorded **every** network request by exact host:

```
Requests after pushing lead_form_submit_success (market=FL): 2
  www.google.com/measurement/conversion      tid=G-XXHSYV3NMD  en=form_submit
  analytics.google.com/g/collect             tid=G-XXHSYV3NMD

hosts contacted: www.google.com, analytics.google.com
googleadservices.com contacted: FALSE
```

The GA4 tag fires. The Google Ads conversion tag does not — `googleadservices.com`
is never contacted, so no conversion beacon leaves the browser.

## The first diagnosis — superseded, kept because the reasoning matters

What follows was my original root cause. **It is wrong.** It is kept because the
decoding technique it introduced is sound and because the way it failed is the most
useful thing in this document.

The container had exactly one Google tag:

```
tag#0  __googtag  vtp_tagId = "G-XXHSYV3NMD"      ← GA4 only
```

There is **no Google tag carrying `AW-17270956371` or `AW-17988324873`**. A modern
`__awct` conversion tag transports through a Google tag registered for that
conversion ID; with no such destination on the page it has nothing to send through
and fails silently — no console error, no network request, nothing in the UI to
suggest a problem.

Two things made this easy to miss, and both produced a wrong answer here first:

1. **GTM stores the conversion ID bare** — `"17270956371"`, never `"AW-…"`. Grepping
   the container for `AW-` returns nothing, which reads as "there are no Ads tags"
   when in fact there are three.
2. **The conversion tags DO have `setup_tags`**, which looks like the transport and
   is not. `tag#6 setup→ tag#22` and `tag#10 setup→ tag#23` are both `__awud` —
   the enhanced-conversions *user data* tag. It supplies hashed user data to a
   conversion; it is not a destination and does not let the tag send.

`scripts/qa/gtm-container-decode.mjs` now prints the transport verdict per tag, so
neither mistake can be repeated silently:

```
tag#6   transport: MISSING — no __googtag for AW-17270956371. This tag cannot send.
        setup:     tag#22 __awud — enhanced-conversions user data (not a transport)
tag#7   transport: MISSING — no __googtag for AW-17270956371. This tag cannot send.
tag#10  transport: MISSING — no __googtag for AW-17988324873. This tag cannot send.
```

### This is broader than forms

`tag#7` is the **"Contact Us" click conversion** (`gtm.click` on `Contact Us`), and
it has the same missing transport. So the FL account has been losing *both* the
form conversion and the contact-click conversion, not forms alone.

That is consistent with the reported symptom rather than contradicting it: the
phone numbers that ARE counting are Google's own call reporting (call extensions
and forwarding numbers), which Google counts on its side and which never depended
on a tag in this container. Everything the website itself was supposed to report
has been silent.

**Confirm and fix in GTM (5 minutes):**

1. Tags → New → **Google tag**, Tag ID `AW-17270956371`, trigger **Initialization —
   All Pages**. Repeat for `AW-17988324873`.
2. Preview, push a test lead, confirm `Thank You Page` fires and a request goes to
   `googleadservices.com/pagead/conversion/17270956371/`.
3. Publish.

Adding the two Google tags fixes all three conversion tags at once — the form
conversions for both accounts *and* the Contact Us click conversion — because they
all fail for the same single reason.

Re-run `node scripts/qa/prod-gtm-trigger-probe.mjs` afterwards — it passes only
when `googleadservices.com` is actually contacted.

If adding the Google tags does not fix it, the next candidates in order are: the
tag is paused in the workspace (paused tags are excluded from the published
container — but these ARE published, so this is unlikely); or the conversion action
was deleted in Ads, which invalidates the label.

## Second fault — found in GTM Preview on 1 October, root-caused in the code

Adding the two Google tags was necessary and **not sufficient**. With both in place
and the container in Preview, the FL conversion still sent nothing:

- `Lead Submit Form Enhanced` (the `__awud` setup tag) showed **"Still running"**
  and never completed.
- `Thank You Page` (the FL conversion tag) sat under **Tags Not Fired**, with its
  trigger matching correctly.
- The GTM beacon read `tr=1gaawe.1awud.5gaawe` — no `awct` in it.

A setup tag gates the tag it is attached to: GTM fires it first and holds the
conversion until it reports completion. One that never completes blocks the
conversion silently and forever, and the conversion appears under "Tags Not Fired"
with a perfectly correct trigger — which reads as a trigger problem and is not one.

### Why it never completes — this is an ordering defect, not a probe artifact

The `__awud` tags read a `__awec` variable in **MANUAL** mode, which reads these
dataLayer keys (`scripts/qa/gtm-container-decode.mjs` resolves this transitively):

```
tag#22 __awud  ->  macro#17 __awec (MANUAL)
                     macro#11  dataLayer["enhanced_conversion_data.address.country"]
                     macro#14  dataLayer["enhanced_conversion_data.address.postal_code"]
                     macro#12/13/15/16  custom JS (last name, phone, first name, email)
```

The site pushes `enhanced_conversion_data` — but **after** the canonical event, and
only for visitors who granted marketing consent. From `utils/enhancedConversions.ts`:

```
STEP 1  dataLayer.push(buildCanonicalLeadEvent(...))   <- synchronous, first, consent-independent
        ...
        if (!isAdvertisingAllowed()) return;           <- consent gate
        await pushEC(ecData)                           <- async SHA-256, pushes { event: 'ec_capture',
                                                          enhanced_conversion_data: {...} }
```

So at the instant GTM runs the setup tag — immediately on `lead_form_submit_success`
— every key it reads is **undefined**. The data it is waiting for is pushed later,
in a different event, behind a consent check, after an async hash.

That is not a quirk of the synthetic probe. It is the ordering on **every real
lead**, and for any visitor who declined marketing consent the data never arrives
at all. The deliberate design decision that keeps the lead event consent-independent
(documented in that file, and correct) is precisely what starves the setup tag.

**Both faults had to be fixed together.** The missing Google tag meant the
conversion had no transport; the setup tag meant it never fired in the first place.
Fixing either alone changes nothing observable, which is why the first fix verified
as a failure and that failure was informative rather than a setback.

### The fix

Remove `Lead Submit Form Enhanced` as a **setup tag** from both conversion tags, and
publish that together with the two Google tags.

Enhanced conversions are then not attached, and that is the right trade for now:
a conversion that reports without identity enrichment is worth incomparably more
than one that never reports. Re-attaching them is a follow-up, not a blocker —
moving the `__awud` to its own trigger on `ec_capture` does **not** work, because
Google applies user data to *subsequent* conversions, not retroactively to one that
already fired. The real repair is site-side: hash the identity while the server
request is still in flight, so it is ready to push synchronously *ahead* of the
canonical event rather than after it. That keeps the lead event consent-independent
and gives the conversion its user data at fire time.

## What I got wrong

I diagnosed this as a missing Google tag — no `__googtag` for either AW- destination,
therefore the conversion tags had no transport and could not send. I stated it as
fact, built a check into `gtm-container-decode.mjs` that printed "This tag cannot
send", and wrote a brief telling someone to go fix it.

**The Ads data refutes it.** `Thank You Page GTM` recorded **23 form conversions in
September**, its last on **22 September** — all of them while no Google tag existed
in the container. A `__awct` tag can load its own conversion pixel. "No Google tag"
was a true observation and a false conclusion.

What misled me: my own probe showed zero requests to `googleadservices.com` when the
event fired, and I had an explanation ready that fit. But the probe could not
distinguish "fired and had nowhere to send" from "never fired at all" — it only saw
the absence of a request. The setup tag meant the tag never fired. I took a single
observation consistent with two causes and reported the one I had already thought of.

The Ads console answered it in one number that I never had access to: the date of
the last recorded conversion. **22 September — one day after v37 was published.**
That alone localises the cause to v37 and rules out anything that was already true
before it, which included the missing Google tag.

Corrections made:

- `gtm-container-decode.mjs` no longer claims a tag cannot send. It reports whether
  a Google tag exists and says explicitly that this is not proof, pointing at the
  network probe as the only thing that settles it.
- The same script now flags a setup tag as **gating** the conversion, which is what
  actually matters and what the first version buried.

### The two Google tags were not the fix

They were added on my recommendation and they were not necessary. They are not
inert, either: they make the site send remarketing and view-through pings to both
Ads accounts on every page load, which it was not doing before. My own probe
confirms it — the page no longer reaches network idle, and `viewthroughconversion`
requests now fire for both conversion IDs.

That is defensible (it is the modern setup, and it is what enhanced conversions and
remarketing audiences route through) but it is a real change in what is collected
about every visitor, made for a reason that turned out to be wrong. **It is worth a
deliberate decision to keep or remove, rather than being left in by accident.**
Consent Mode still applies to them.

## The thing most likely to be misread: you may be looking at the wrong number

One conversion signal **is** reaching Google right now:

```
www.google.com/measurement/conversion?...&tid=G-XXHSYV3NMD&en=form_submit
```

That is the GA4 property forwarding an **imported** conversion to Ads. So Google is
being told about form submissions — just through GA4 import, under a different
conversion action from the `Thank You Page` tag.

The Ads "Conversions" column counts **Primary** actions only. If the GA4-imported
`form_submit` action is set to Secondary, and the tag-based action is Primary but
never fires, the column shows **zero forms while form conversions are in fact
arriving**. That produces the exact reported symptom — "both figures are phone
calls only" — without anything being broken on the website.

**Check in Google Ads → Goals → Conversions → Summary:** list every action, its
source (Website vs Google Analytics 4), its status, and whether it is Primary or
Secondary. That single screen will say whether the number being read is the right
one. I could not check it — no Ads access this session (see below).

## New Jersey: $184, no lead — this one is real

Not a tracking artifact. NJ/NY form leads by date:

| Date | NJ/NY leads |
| --- | --- |
| Sep 14–21 | 1–2 per day |
| Sep 23 | 1 (organic, referred from `chatgpt.com`, no gclid) |
| Sep 24 – Sep 30 | **0** |

The last NJ lead of any kind was 23 September. Seven days, zero. The NJ pages
themselves are up (`/locations/new-jersey`, `/locations/new-york`,
`/locations/new-jersey/paramus-orthopedics` all return 200 and render a lead form),
so this is a demand/targeting problem rather than a broken page:

### What the Ads account actually shows (read 1 October)

- **No New York campaign exists.** NJ-Outer explicitly *excludes* all of New York
  State, New York City, the Bronx and Yonkers, and nothing else targets NY. The
  account carries an NY conversion ID and an NY market in the container, but buys no
  NY traffic at all.
- **NJ-Central — Non-Brand Search** ($58/day) is *limited by search volume*, and took
  209 impressions with **0 clicks** on 30 September. Its Dynamic Search Ads setting
  targets **"all URLs Google knows about"** — on a 769-page site full of blog,
  condition and treatment pages, that is a standing waste risk and should be narrowed
  to the pages that actually convert.
- **NJ-Outer — Non-Brand Search** ($61/day) is *limited by budget*: $811.58 over 14
  days, 142 clicks, ~3.5% CTR, $5.72 avg CPC, 13 conversions. This is the one with
  demand to absorb more money.
- **44% of 14-day spend ($698) sits in Google's hidden "Other search terms"**, so
  nearly half the budget is not attributable to a visible query. The visible terms
  are relevant ("orthopedic doctor near me", "back specialist near me").
- The two highest-spend ads have **Poor** ad strength.
- Geo-targeting is correctly set to **Presence** (not "presence or interest") on both
  campaigns, and no ads are disapproved.
- **NJ's `Submit lead form` records $0 per conversion** because the tag sends
  `value=0`. Ads' $1 fallback only applies when no value is sent at all, so
  value-based bidding has nothing to work with.

The geo gap and the DSA setting are the two worth acting on first.

## A correction I owe you

While testing earlier in this session I created **8 synthetic lead rows** in
production `public.forms` (`Testpatient Synthetic` / `qa+intake@example.com`,
27–28 September). My local dev server writes to the production database and sends
real email through Resend, and one diagnostic script submitted valid payloads after
I loosened server-side ZIP validation.

They have been deleted. They were inflating the September lead count by 8 and would
have shown up in the tracker as real FL leads. Resend's idempotency key means the
staff inbox likely received one or two notifications rather than eight.

## Still open

1. **Decide whether to keep the two AW- Google tags.** They were not the fix and they
   add remarketing collection on every page load. See
   [What I got wrong](#what-i-got-wrong).
2. **Re-attach enhanced conversions properly.** They are unattached in v38. The
   repair is site-side: hash the identity while the server request is in flight so
   it can be pushed *ahead* of the canonical event instead of after it. Until then
   Ads still reports `ec_mode=a` and "Enhanced conversions is enabled" on the FL
   action, which overstates what is actually being sent.
3. **Reconcile the $184.** It does not match this account's $877.50 for the same
   window.
4. **No New York paid search at all**, and the NJ-Central DSA targets every URL
   Google knows about.
5. **4 test conversions** (2 FL, 2 NJ) were created during verification, identifiable
   by order IDs beginning `chrome-probe-`. They carry no gclid so they attach to no
   campaign, but they do sit in the conversion action totals for 1 October.

## Access notes

The Chrome connector was never available to this session, so the GTM and Ads UI work
was done by Claude for Chrome on the Seo@ profile, and everything else from
production Supabase, the published GTM container, and Puppeteer probes. The GA4
`503`s seen during that work were an ad blocker in that browser, not an outage —
GA4 Realtime received every probe.

That leaves exactly two things open, both requiring your login:

1. **Add the two Google tags in GTM** (the fix above).
2. **Read Ads → Goals → Conversions** to see which actions are Primary and whether
   the GA4-imported conversion is already counting forms.

## Reproduce

```bash
node scripts/qa/prod-gtm-trigger-probe.mjs https://mountainspineorthopedics.com FL,NJ,NY
node scripts/qa/gtm-container-decode.mjs GTM-T57SB8NQ
```

Neither submits a form or creates a lead. The first pushes the canonical event and
watches the network; the second decodes the live published container.
