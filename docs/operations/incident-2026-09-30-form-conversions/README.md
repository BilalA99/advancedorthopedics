# Incident — "website forms have not counted since 23 September"

Audited 2026-09-30. **The claim is half right, and the half that is wrong matters
more than the half that is right.**

## Answer in one line

**RESOLVED — GTM container v38 (1 Oct), tidied in v39 (2 Oct).** Form conversions stopped on 22
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

That is a real change in what is collected about every visitor, made for a reason
that turned out to be wrong. Consent Mode still applies to them.

**And on 1 October they turned out to be actively harmful**, not merely unnecessary.
GTM hides the enhanced-conversions field on a conversion tag when a Google tag for
that destination exists in the container — the tag editor says so directly ("this tag
will use the configuration of Google tag …"). So the two tags I added are what made
the correct enhanced-conversions setup impossible to reach.

The alternative GTM offers in that state — a `user_data` parameter on the Google tag
— cannot work here either. Both Google tags are bare (`vtp_tagId` and nothing else)
and fire on **Initialization – All Pages**, so that parameter is evaluated at page
load. This site pushes `enhanced_conversion_data` when the visitor submits, much
later on the same page. It would read an empty variable every time.

**Decision: remove them.** It reverts an unnecessary change, drops the remarketing
pings, and restores the per-conversion-tag field, which reads its variable when the
conversion fires. The risk — do conversions still send without a Google tag? — is
answered by the same evidence that overturned the original diagnosis: they sent 23 of
them through 22 September with no Google tag present. It is still verified by network
capture before publishing, in `claude-for-chrome-final.md` Test D.

### The fact that explains all of it (found 1 October)

`mountainspinestream` is a single Google tag carrying `G-XXHSYV3NMD`,
**AW-17270956371** and **AW-17988324873** as destinations, loaded by the
`GA4 - Configuration` tag.

A Google tag's destination list is configured in the Google tag UI, **not in GTM**,
and the container stores only its primary id. So both AW- destinations were on the
page the entire time, and nothing in `gtm.js` could ever have shown that.

That is the single fact behind every wrong call here:

- "No transport, the tag cannot send" — the transport existed, invisibly.
- "The two Google tags I added are what hides the enhanced-conversions field" —
  `mountainspinestream` hides it, and removing mine changed nothing.
- It also explains the original design. Whoever built this used a `__awud` **setup
  tag** because the per-tag enhanced-conversions field was already hidden by
  `mountainspinestream`. The setup tag was the only route GTM left open — and it was
  the wrong one, because a setup tag gates the conversion.

`gtm-container-decode.mjs` now prints `UNKNOWN, not absent` for this, with the reason.

### A pattern worth naming

Three times now a confident structural claim of mine has been overturned by one
number from a console I could not read: "the tag cannot send" (refuted by the last
conversion date), "the Google tags are harmless" (refuted by the tag editor hiding a
field), and the DSA targeting that did not exist (refuted by an empty Website field).
In each case the codebase and the published container supported my reading and the
live account did not. The lesson is not to decode less — the container work found the
setup tag — but to label what is inference until an account confirms it.

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

## Site-side repair — identity now precedes the conversion (1 October)

Enhanced conversions were left unattached in v38 because the identity arrived too
late to be read. That is fixed in `utils/enhancedConversions.ts`.

### The constraint that makes this non-obvious

The naive fix — await the hash, push identity, then push the lead event — is worse
than the bug. It puts a consent check and a SHA-256 in front of the one event that
must fire for every server-accepted lead, which is precisely the mistake behind the
earlier consent-gating incident where every visitor who ignored the cookie banner
became an invisible lead.

So the ordering had to change **without** the lead event ever waiting on enrichment.

### How

`pushAcceptedLead` already awaits the server's response body. Hashing now starts
*before* that await and runs concurrently with it, then both are awaited together:

```ts
const preparedEC = prepareHashedEC({ email, phone, firstName, lastName, postalCode, country });

const [accepted] = await Promise.all([
  acceptance instanceof Response ? readLeadAcceptance(acceptance) : …,
  preparedEC.promise,
]);
```

`Promise.all` does not serialise these — the hash has been running throughout. The
lead event waits for `max(response, hash)`, not their sum, and the hash is bounded
by `HASH_BUDGET_MS` (500ms) so a broken or hostile Web Crypto cannot hold it up. In
practice four SHA-256 digests of short strings are sub-millisecond and the observed
cost is zero.

`pushFormSubmit` then pushes `ec_capture` ahead of the canonical event when the
identity is in hand, and suppresses the old late push so one submission never
produces two identity events.

### A race I got wrong first, caught by the test

The first attempt used a synchronous `peek()` and pushed whatever had already
settled. It looked elegant and was wrong: `buildHashedEC` awaits four
`crypto.subtle.digest` calls, so it loses to an in-memory response read every time.
The test caught it immediately —

```
not ok 1 - identity is on the dataLayer BEFORE the conversion event
  error: 'got ["lead_form_submit_success","ec_capture"]'
```

Had it been asserted by eye on a slow network it would have looked fine and shipped
as a coin toss. Ordering is now awaited explicitly rather than hoped for.

The same test run also showed a lead with no email or phone still emitting an
identity payload of all-undefined digests — an event that looks like identity,
matches nothing, and makes "did identity go out?" unanswerable from the dataLayer.
Now suppressed.

### Verification

`tests/measurement-identity-ordering.test.ts`, 7 cases, asserting both halves:

| Case | Asserts |
| --- | --- |
| identity precedes the conversion event | the fix works |
| exactly one identity push per submission | no double-fire for ec_capture listeners |
| refused marketing consent | identity suppressed, lead event still fires |
| broken Web Crypto | lead event still fires |
| no identity at all | lead event still fires, no empty payload |
| unqualified lead | neither event — insurance answer never reaches advertising |
| hashed content | no plaintext email, phone or name |

Full suite 155/155, `validate-measurement-contract` 15/15, `validate-faq-ssr-contract`
3/3, typecheck at its 44-error baseline.

**This needs the GTM half to take effect** — the conversion tags must read the
variable. See `claude-for-chrome-final.md`, which attaches it *without* a setup tag,
and whose most important check is that the conversion still fires when identity is
absent.

## Final state (2 October 2026)

**Container v39 is live and verified independently** — a clean headless browser, no
extensions, no cookies, no identity pushed, published container:

```
market=FL  conversion pings: 1   AW-17270956371/soPPCPay3ucaENPCt6tA
market=NJ  conversion pings: 1   AW-17988324873/m2yGCJfJ5YEcEImcwIFD
```

The decoder confirms no setup tag on any of the three conversion tags. That is the
regression check: a `setup tag:` line reappearing on tag 6 or 10 means the outage is
back.

v39 removed the two redundant AW- Google tags I had added on a wrong diagnosis.
`mountainspinestream` — the GA4 web data stream's Google tag, container 220432725,
which is the `v9220432725` visible in every conversion hit — already carries both Ads
destinations.

### Enhanced conversions: already on, in automatic mode

`mountainspinestream` has **"Allow user-provided data capabilities" ON with automatic
detection** for email, phone, name and address. "Specify CSS selectors or JavaScript
variables" is off and the `user_data` code snippet is unused.

So Google scrapes the DOM for identity. Reported coverage on the FL action is roughly
40–75%.

**This means the 1 October site-side ordering fix is currently inert.** The hashed
`enhanced_conversion_data` the site now pushes ahead of the conversion is not read by
anything, because nothing is configured to read it. The change is correct, tested and
harmless, and it is the prerequisite for the manual path — but today it does no work.
Recorded here rather than left to look like a win.

### Deferred, not dropped: is the manual path needed?

The number that decides it — the enhanced-conversions **match rate** — does not exist
yet. Ads reports "Insufficient conversion volume" for FL and no recent data for NJ,
because the outage blanked the trailing 7-day window.

**Re-read the match rate around 16 October**, once post-fix leads have accumulated:
Ads → Goals → Conversions → `Thank You Page GTM` → diagnostics.

- Healthy match rate → do nothing. Automatic detection is working and the manual path
  would be complexity for nothing.
- Zero or poor → trigger the `__awud` user-data tags on **Custom Event `ec_capture`**,
  with **no setup tag**. This works only because the site now pushes `ec_capture`
  ahead of the conversion; Google applies user data to subsequent conversions, never
  retroactively, which is why a trigger on it would have been useless before.

Note the manual path is also the only one compatible with this site's privacy design.
Google's CSS-selector option expects plaintext email and phone that it hashes itself;
this site never exposes plaintext, hashing with SHA-256 before anything reaches the
dataLayer. Automatic detection works by scraping the rendered form, which is why it
gets partial coverage rather than none.

### One number nobody has explained

FL coverage shows daily values for 23–29 September, after `Thank You Page GTM` last
fired on 22 September.

Hypothesis, explicitly not a finding: coverage is likely reported by the Google tag
from its own telemetry — the share of page loads where automatic detection found
user data — rather than per recorded conversion. The GA4 Google tag kept firing on
every page throughout the outage, so detection kept running and reporting while no
conversion was recorded. That would make coverage and conversion count independent,
which matches what was seen.

Settle it by re-reading coverage after a week of post-fix traffic. **Treat the FL
coverage line as unreliable until then.**

## Closed, do not revisit

- **Bidding / `value=0`**: every active campaign uses Maximize Conversions or Manual
  CPC. No value-based bidding anywhere, so conversion value is unused. Non-issue.
- **DSA on NJ-Central**: does not exist. The "all URLs Google knows about" text was
  default help text, not live targeting.
- **New York**: no campaign, intentional, not in the plan.
- **Test conversions**: tag pings with no click attached are never recorded. Nothing
  entered the totals; nothing to clean up.
- **Ad strength**: the gap is keyword coverage in headlines, not asset count — both
  Poor ads have 15 headlines and 4 descriptions. A copy pass, not a tracking issue.
- **Injury sitelinks**: added by Google AI on 27 September, on-domain. Housekeeping.

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
