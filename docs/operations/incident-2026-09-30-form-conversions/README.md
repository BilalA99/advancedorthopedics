# Incident — "website forms have not counted since 23 September"

Audited 2026-09-30. **The claim is half right, and the half that is wrong matters
more than the half that is right.**

## Answer in one line

Forms are working and leads are arriving. What has stopped is the **Google Ads
conversion tag** — it is correctly configured, correctly triggered, and never
fires. Separately, New Jersey really has produced no form leads since 23 September,
so the $184 is a genuine media problem, not a reporting artifact.

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

## Root cause — most likely, and how to confirm in one click

The container has exactly one Google tag:

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

- $184 over seven days is roughly $26/day against a $4,000/month NJNY budget —
  about 20% of the pace that budget implies. Low spend produces low lead counts.
- Worth checking: are the NJ campaigns limited by budget, disapproved, or
  geo-targeted somewhere with no volume?

This needs the Ads account, not the codebase.

## A correction I owe you

While testing earlier in this session I created **8 synthetic lead rows** in
production `public.forms` (`Testpatient Synthetic` / `qa+intake@example.com`,
27–28 September). My local dev server writes to the production database and sends
real email through Resend, and one diagnostic script submitted valid payloads after
I loosened server-side ZIP validation.

They have been deleted. They were inflating the September lead count by 8 and would
have shown up in the tracker as real FL leads. Resend's idempotency key means the
staff inbox likely received one or two notifications rather than eight.

## What I could not do

The Chrome connector was not available this session, so I had **no access to the
Google Ads UI or the GTM editing UI**. Everything above is from production
Supabase, the published GTM container, and live browser probes I drove with
Puppeteer.

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
