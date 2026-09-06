# Every undeployed commit — full reference

**Deployed baseline:** `upstream/main` @ `5c99f1b` ("Merge pull request #84 from AppFlow-Studio/TemurDev")
**Head:** `pa-ga-phone-and-atlanta-wiring`
**Generated:** 2026-09-02 · **Regenerated:** 2026-09-06 (Wave 13)

`5c99f1b` is the exact merge-base. **Zero commits exist on `upstream/main` that are not on
this branch**, so everything below is purely additive to what is live. Nothing here has been
pushed or deployed.

| | |
|---|---|
| Commits ahead of production | **72** (71 code @ `e90fcb6` + this documentation wave) |
| Files changed | **209** |
| Lines | **+24,276 / −11,037** |
| Static pages built | **754** (production builds 741) |
| Sitemap URLs | **339** |
| Working tree | clean |

### Site scale, for reading "pages affected" below

124 condition pages · 122 treatment pages · 390 area-of-pain pages · 29 location pages
(24 clinics + 5 state hubs) · 12 provider records (11 rendered; Katzman suppressed by
`SHOW_SCOTT_KATZMAN=0`) · 4 paid landing pages · plus hubs, find-care, injuries and legal pages.

### Verification state at time of writing

```
npm run build                exit 0, 754/754 static pages
npx tsc --noEmit             49 errors (documented ceiling, all pre-existing)
npm run test:measurement     11/11 (two Commit-7 contract tests added)
validate-location-data       24 clinics, 0 warnings (prebuild gate)
audit-scoliosis-entity-graph 0 notes (prebuild gate)
visual-audit-sprint          33 pages x 3 viewports; 0 defects introduced
                             (15 flags, all accounted: 3 pages x 3 viewports of
                             pre-existing #418, the noindexed foot-pain empty
                             headings x 3, one non-reproducible resource 404)
canonical audit              703 pages 0 missing (2026-09-02 audit) + 3 new LPs
                             verified individually: self-canonical, noindex/follow
hydration scan               40/246 - unchanged population; all ten locked pilot
                             slugs clean (re-scanned 2026-09-06)
control diff                 5/5 control records diffed vs upstream/main:
                             3 byte-identical, 2 carry only permitted deltas
```

---

# WAVE 1 — Lead capture and measurement integrity

The highest-consequence group in the PR. These protect revenue data.

## `bdcf3bb` — single accepted-lead event with server-issued submission ID
**32 files** · 2026-08-29

**What.** One form submission was pushing three separate `dataLayer` events —
`lead_form_submit_success`, `form_submit`, and `form_submission`. Collapsed to a single
canonical event carrying a server-issued submission ID, with client-side dedupe via an
`emittedSubmissionIds` Set.

**Why.** Three events per submission means Google Ads counts one lead up to three times.
Every optimisation decision — bid strategy, budget allocation, campaign pause — was being
made on inflated conversion data.

**Evidence.** `lib/lead-contract.ts:3` now defines `CANONICAL_LEAD_EVENT`. The five API
form routes and every lead-capture form were rewired to the single path.

**Benefit.** Conversion counts become truthful. **Expect reported conversions to fall
10–25% on deploy** — that is the correction landing, not a regression.

**Pages affected.** All five `app/api/forms/*` routes; free-MRI-review client; all four
injury lead-capture forms (car-accident, personal-injury, slip-and-fall, work-injury); every
page hosting a lead form — i.e. every location page, every condition and treatment page with
a consultation form, and all find-care pages.

> ⚠️ **`form_submit` no longer exists in this tree but still fires in production.** GTM must
> be repointed to `lead_form_submit_success` **before** this deploys, or every website form
> conversion stops being recorded. Five-step cutover checklist is in `docs/PR-DESCRIPTION.md`.

## `57a2a08` — persist accepted lead before sending any email
**1 file** · 2026-08-29

**What.** Reordered the submission path so the lead is written to Supabase *before* any
email is attempted.

**Why.** Previously an SMTP failure could lose the patient entirely — the lead existed only
in the email that failed to send.

**Benefit.** A mail outage degrades notification, not acquisition. Directly protects revenue.

**Pages affected.** Every form on the site, via `components/email/sendcontactemail.ts`.

---

# WAVE 2 — Schema truthfulness and location data

## `d61157f` — remove fabricated ratings, reviews, hours and offer claims
**5 files, −154 lines** · 2026-08-29

**What.** Stripped invented `AggregateRating`, review, hours and offer claims from
structured data.

**Why.** Fabricated `AggregateRating` in schema is a documented trigger for a Google manual
action. This was the single highest-severity risk in the codebase.

**Evidence.** `lib/generateLocationSchema.ts` alone lost 100 lines of asserted-but-unsourced
markup.

**Benefit.** Removes manual-action exposure. Everything the site now asserts in schema is
either sourced or omitted.

**Pages affected.** All 29 location pages, the homepage, `/find-care/book-an-appointment`,
`/treatments/orthopedic-injections`, and all four injury pages.

## `bd26942` — correct Miami Beach entity to South Miami with 301
**15 files** · 2026-08-29

**What.** The clinic recorded as "Miami Beach" is physically in South Miami. Corrected the
entity and 301'd the old URL.

**Why.** NAP (name/address/phone) accuracy is a primary local-ranking input, and a
wrong-city entity competes against the correct one in local packs.

**Benefit.** Correct local entity; no orphaned URL.

**Pages affected.** The clinic page itself plus eight pages that hardcoded the old name:
condition-check, candidacy-check, find-a-doctor, second-opinion, insurance-policy,
patient-forms, orthopedic-injections, and `InjuryHotspots`.

## `1c6318a` — derive review figures from GBP data; guard location facts
**7 files** · 2026-08-29

**What.** Review counts and ratings now generate from real Google Business Profile data into
`reviewAggregate.generated.ts` (530 reviews across 23 locations). Added
`scripts/validate-location-data.mjs`.

**Why.** Review figures were previously hardcoded and drifting from reality.

**Benefit.** Review claims are sourced and regenerable. The validator makes bad location
data a build failure instead of a silent publish.

**Pages affected.** All 29 location pages; all four injury clients.

## `7e8f03f` — gate builds on location data validation
**1 file** · 2026-08-29

**What.** Wired the validator into `prebuild`.

**Why.** A validator nobody runs is documentation.

**Benefit.** Converts a whole class of silent data bug into a build error. This is the
pattern that later caught the stale taxonomy index twice during this sprint.

**Pages affected.** None directly — protects all 29 location pages.

## `0ef5e39` — correct two clinic coordinates against Google Business Profile
**3 files** · 2026-08-29

**What.** Two clinics had wrong lat/lng.

**Why.** Coordinates drive map embeds, directions links and `geo` schema. Wrong coordinates
send patients to the wrong place.

**Benefit.** Accurate directions; consistent geo signals.

**Pages affected.** Two location pages and the clinics map.

## `90d2b68` — surface Free Second Opinion; fix non-E.164 tel links
**5 files** · 2026-08-29

**What.** Added `SecondOpinionCallout`; corrected `tel:` hrefs to E.164 format. Added
`scripts/audit-sitemap-vs-redirects.mjs`.

**Why.** Non-E.164 `tel:` links fail to dial correctly on some mobile handsets — a direct
conversion loss on the highest-intent action on the site.

**Benefit.** Phone links dial reliably; a free second opinion is a strong differentiator now
actually visible.

**Pages affected.** All 29 location pages.

---

# WAVE 3 — SEO structure

## `83f0a62` — stop advertising four redirecting condition URLs in the sitemap
**3 files** · 2026-08-29

**What.** Four `/conditions/*` records are really treatments that were consolidated. Their
URLs 301 but were still declared in the sitemap.

**Why.** A sitemap that lists redirecting URLs wastes crawl budget and sends contradictory
signals.

**Benefit.** Sitemap declares only 200-returning canonical URLs.

**Pages affected.** Sitemap; four condition slugs (`ankle-arthroscopy`, `ankle-replacement`,
`aging-management`, `degenerative-disc-disease-surgery`).

## `3f49b11` — one H1 per page, remove hidden layout headings
**11 files** · 2026-08-29

**What.** Layout files were emitting hidden `<h1>`s in addition to each page's visible one.

**Why.** Multiple H1s dilute the page's topical signal and are an accessibility defect —
screen-reader users navigating by heading get a false document outline.

**Benefit.** Exactly one H1 per page. **Verified across all 33 audited pages in the visual
audit.**

**Pages affected.** condition-check, book-an-appointment, candidacy-check, find-a-doctor,
free-mri-review, find-care, insurance-policy, patient-forms, privacy-policy and their layouts.

## `4b545a5` — server-render hub content; remove remaining duplicate H1s
**12 files** · 2026-08-29

**What.** The conditions and treatments hubs rendered their content client-side.

**Why.** Content behind hydration may not be seen on Googlebot's first pass. For hub pages
whose entire purpose is distributing link equity into 246 templated pages, that is
load-bearing.

**Benefit.** Hub content and its outbound links are in the initial HTML response. The
internal-link distribution analysis later confirmed hubs emit 159–160 server-rendered links
each.

**Pages affected.** `/conditions`, `/treatments`, all three area-of-pain clients,
book-an-appointment, second-opinion, insurance-policy, blog client.

## `9df3a7c` — cross-canonical area-of-pain to /conditions; noindex stubs
**4 files** · 2026-08-29

**What.** Added `lib/areaOfPainCanonical.ts`. 390 `/area-of-pain/*` pages were prerendered,
`index,follow`, and self-canonicalising while rendering the same content as `/conditions/*`.

**Why.** The sitemap already treated `/conditions` as canonical and excluded them — so the
site declared one canonical while shipping 390 competing indexable duplicates.

**Chosen over a 301 deliberately:** reversible, and retires no URL. The pages stay reachable
at 200 for existing inbound links while their signals consolidate.

**Benefit.** 324 pages now point at their `/conditions` equivalent. **Guarded** — a
cross-canonical is only emitted where the target genuinely exists as a condition record and
is not itself a redirect source, so no canonical points at a 404 or a hop.

**Pages affected.** All 390 area-of-pain pages, across all three body-region routes.

## `3092161` — deterministic provider selection, blog CTA, dead-code removal
**12 files** · 2026-08-29

**What.** Made provider display deterministic rather than arbitrary; fixed the blog CTA;
removed dead code.

**Benefit.** A given page always shows the same providers — no flicker between builds, and a
stable entity association for schema.

**Pages affected.** Condition and treatment pages, blog pages.

---

# WAVE 4 — Accessibility

## `23340ee` — honour reduced motion, restore skip link, name controls and fields
**17 files** · 2026-08-29

**What.** Added `prefers-reduced-motion` support, restored the skip link, and gave
accessible names to unlabelled controls and form fields.

**Why.** Unnamed form fields are unusable with a screen reader. Ignoring reduced-motion
preferences can trigger symptoms in users with vestibular disorders — on a medical site
serving patients in pain, that is a real harm.

**Benefit.** WCAG compliance on the highest-impact failures. Reduced legal exposure for a
healthcare provider.

**Pages affected.** Root layout (sitewide), all four injury lead-capture forms,
`BodyPartHeroForm`, `ContactForm`, `DoctorCard`, booking button — i.e. every page carrying a
form or CTA.

## `bc80d82` — name Select triggers and remaining form fields
**16 files** · 2026-08-29

**What.** Completed the naming pass on Radix Select triggers.

**Benefit.** Every interactive control has an accessible name.

**Pages affected.** Every page with a state/time dropdown — all location pages, all forms.

## `c5034df` — stop hub pagination scrolling the page horizontally
**2 files** · 2026-08-29

**What.** Hub pagination caused horizontal page scroll on mobile.

**Benefit.** No horizontal overflow. **Verified: 0 overflow across all 33 pages × 3
viewports in the visual audit.**

**Pages affected.** `/conditions` and `/treatments` hubs on mobile.

## `775c37a`, `a82eadc`, `2d8e907` — accessibility, desktop and mobile QA reports
**1 file each** · 2026-08-29 · Documentation of the above with reproduction steps.

---

# WAVE 5 — Performance

## `3177458` — cut 404 kB of first-load JS from every area-of-pain page
**8 files** · 2026-08-29

**What.** Introduced `components/data/taxonomyIndex.generated.ts` and the generator, so
area-of-pain clients import a lightweight index instead of the full data modules.

**Why.** 404 kB of unnecessary JavaScript on 390 pages. Core Web Vitals are a ranking factor
and a conversion factor.

**Benefit.** **−404 kB first-load JS × 390 pages.** The largest single performance win in
the PR.

**Pages affected.** All 390 area-of-pain pages.

## `6b312bf` — cut 187 kB and 149 kB from the conditions and treatments hubs
**4 files** · 2026-08-29

**Benefit.** −187 kB on `/conditions`, −149 kB on `/treatments` — the two highest-traffic
hub pages.

**Pages affected.** Both hubs.

> Both commits depend on `taxonomyIndex.generated.ts`, which `prebuild` hard-fails on if
> stale. That gate fired twice during this sprint and prevented a broken build both times.

## `5b505bd` — performance report with before/after bundle sizes

---

# WAVE 6 — Insurance page

## `9c48991` — interactive plan checker on /insurance-policy
**3 files, +378 lines** · 2026-08-29

**What.** New `InsurancePlanChecker` component and `insurancePlans.ts` data.

**Why.** "Do you take my insurance?" is the single most common pre-appointment question. A
static list forces the patient to phone; a checker answers it immediately.

**Benefit.** Removes a major friction point before booking.

**Pages affected.** `/insurance-policy`.

## `192debf` — make PPO-only the organising fact, not a footnote
**7 files** · 2026-08-29

**What.** Restructured the page so PPO-only is the headline, and corrected payer copy
across `treatments.tsx` (210 lines).

**Why.** MSO accepts PPO only. Burying that wastes non-PPO patients' time and the practice's.

**Benefit.** Correct expectations set before the call.

**Pages affected.** `/insurance-policy`, `/about/faqs`, and treatment records carrying payer copy.

## `8650893` — fill the hero with a PPO at-a-glance panel

---

# WAVE 7 — Location UI and mobile

`1f32ee8` moved the Second Opinion callout beneath the form rather than above the CTAs ·
`f80d242` fixed area-of-pain pages printing raw HTML tags as visible text instead of
rendering them · `6c1464e` stopped the hero marquee overlapping the second-opinion card ·
`17c976c` put address, hours and directions above the offer on mobile.

**`f80d242` is the notable one** — stored HTML was being printed literally, so patients saw
markup on the page. **Pages affected:** area-of-pain routes.

The rest affect all 29 location pages, mobile-first. `17c976c` reflects real intent: a
visitor on a phone wants the address and directions, not the promotion.

---

# WAVE 8 — Pennsylvania and Georgia launch

## `8ed5da6` — wire PA and GA phone numbers; finish Atlanta launch
**12 files** · 2026-08-31

**What.** Real local numbers for Pennsylvania and Georgia; completed the Atlanta clinic record.

**Why.** A local number materially outperforms a shared line for local intent.

**Benefit.** Atlanta operational as the 24th clinic; Georgia live as the fifth state.

**Evidence.** `GA_PHONE_DISPLAY = "(404) 913-6886"`; Atlanta is clinic `id: 24` at
2250 North Druid Hills Rd NE, Suite 124, verified coordinates `33.829783 / -84.332626`.

**Atlanta carries no invented data:** `rating: 0`, `reviewCount: 0`, `reviews: []`, and
GBP fields (`placeId`, `cid`, `placeUrl`, `embedSrc`) deliberately unset with an explanatory
comment. Hours come from the sitewide default, which the business has confirmed is accurate
for all 24 locations.

**Pages affected.** `/locations/georgia`, `/locations/georgia/atlanta-orthopedics`, all
Pennsylvania location pages, footer, contact routing.

## `97d32fa` — commit the registry changes /locations/georgia needs to resolve
**3 files** · 2026-08-31

**What.** The Georgia route 404'd because a generated registry was not committed.

**Why this matters beyond the fix.** This is the standing lesson of the project: **verify
routing against build output, never against inference.** It is why the new scoliosis page's
sitemap inclusion was confirmed from `.next/server/app/sitemap.xml.body` rather than assumed,
and why the canonical audit later ran against all 703 built pages rather than a sample.

**Pages affected.** `/locations/georgia` and every Georgia clinic page.

## `90efcb4` — confirm PA/GA inboxes; unorphan the footer state columns
## `c6de1b4` — nav card said "Serving 4 States" while listing five
## `99f16dd` — cap dev server V8 heap at 3072 MB (developer tooling only)

---

# WAVE 9 — Sprint foundation

## `6b76a8f` — commit RLS migration already applied to production
**1 file** · 2026-09-01

**What.** `supabase/migrations/202608300001_enable_rls_forms_blogs.sql`, already live on
production project `bwrnnmzqipnoakmdbevz`. Committed as-is; **must not be re-applied.**

**Why it mattered.** `NEXT_PUBLIC_SUPABASE_ANON_KEY` ships inside the client bundle and is
public by construction. Before this migration `public.forms` and `public.blogs` had RLS
disabled while `anon` held SELECT/INSERT/UPDATE/DELETE/TRUNCATE. **Anyone who opened
devtools could read every patient lead — names, emails, phone numbers, insurance type — or
truncate the blog.** `pg_policies` was empty for schema `public`.

**Benefit.** The database was ahead of the repo; this closes that gap so the security posture
is reproducible from source.

**Note for future work.** There is no service-role key in `.env`. The app runs entirely on
the anon key, so **any new table silently returns zero rows until an explicit policy exists.**

## `33158ba` — commit generated data files
**What.** `taxonomyIndex.generated.ts` (112 conditions, 122 treatments) was stale and
uncommitted. `prebuild` hard-fails on it, so anyone pulling the data changes without it got a
broken build. `clinicsForMap.generated.ts` and `reviewAggregate.generated.ts` were already
current — verified, not assumed.

## `41156e2` — internal link canonicalisation
**14 files** · 2026-09-01

**What.** `lib/internal-link-redirects.ts` plus 12 call sites. Four condition records are
really treatments; `next.config.ts` 301s their URLs and the sitemap excludes them — but every
data-driven link builder still emitted the raw slug, sending users and crawlers through an
unnecessary redirect hop.

**Why.** Keeping the URL out of the sitemap fixed the sitemap. It did nothing for the roughly
200 internal links. `resolveConditionHref` closes the gap at link-generation time, so the data
rows stay where `lib/metadata-seo.ts` and the foot-pain client still resolve against them.

**Evidence, verified against build output.** All 7 redirect targets resolve to prerendered
200 pages · 0 bare `/injuries` links remain (it is an index-less route, so those 404'd from
every location and state page) · 0 `/blogs/tag/*` rows in the HTML sitemap (no such route has
ever existed) · `homepage-data.tsx` already pointed at `cervical-laminectomy`.

**Also collapsed two redirect chains the earlier pass missed** — legacy no-hyphen aliases
pointing at slugs that are themselves redirect sources. **A scripted walk over all 121
redirect rules confirms zero remaining multi-hop chains.**

**Pages affected.** Condition hub, sidebar lists, body-part grids, location and state
templates, the prose auto-linker, all three body-part dropdowns — every surface that emits a
condition link.

## `d8d3103` — area-of-pain canonical resolution
**4 files** · 2026-09-01

**What.** Split the 390 pages by whether a genuine consolidation target exists:
**324** canonical to their `/conditions` equivalent (still `index,follow`); **65** with no
equivalent get `noindex, follow`; **1** pre-existing stub already noindexed.

**Why the 65 are noindexed rather than aliased.** They are pain-area-specific slug variants
(`heel-pain-plantar-fasciitis`, `neck-herniated-disc`, `foraminal-stenosis-back-pain`) plus
the four condition URLs that are themselves redirect sources. **A slug alias map was
deliberately rejected** — a wrong alias points a canonical at a semantically different
condition, which is worse than a noindex on a page nobody reaches.

**Evidence.** Checked Search Console first: **no `/area-of-pain` URL appears in the top 100
pages by clicks over 90 days**, and that list's floor is 53 impressions — so nothing
measurable is lost. Verified in build output: all 324 cross-canonicals resolve to prerendered
200 pages, **none points at a 404, none at a redirect source, and no page is both noindexed
and cross-canonicalised** (no contradictory signals).

**Honest scope note.** These pages are **not** the indexation problem — 0 of 137 excluded
URLs are area-of-pain, the routes predate the December collapse by six months, and rankings
rose 0 → 96 while they existed. This is housekeeping. It matters because `NavBar.tsx` and all
three dropdowns are `'use client'`, so anyone who server-renders the nav would put 390
duplicates in front of Googlebot at once.

**Pages affected.** All 390 area-of-pain pages.

## `0602df2` — clinically grounded provider selection
**7 files** · 2026-09-01

**What.** `lib/providers/providerRelevance.ts`. Pages resolve to a care domain, the domain to
an eligible pool, and a deterministic slug-keyed rotation picks within it.

**Why.** Provider display was arbitrary. On a medical site, showing a foot-and-ankle surgeon
on a cervical fusion page is an E-E-A-T problem and a patient-trust problem.

**Mappings derive only from each provider's own verified profile** in `doctors.tsx`
(`medicalSpecialty`, `specialties`, `conditionsTreated`) — never assigned for SEO reasons.

**Fail-safe verified.** No resolvable domain returns `[]` and every caller **hides the
module** rather than falling back to an arbitrary physician. **124/124 condition pages and
122/122 treatment pages resolve**, so the empty path is a guard, not a live state.

**Specific tuning, verified in rendered output.** `adult-scoliosis-surgery` maps to
`["spine-deformity"]` with **no** `spine` fallback — the rotation spans the entire eligible
pool, so widening it admits Dr. Cowin (general spine/joint) onto a deformity page ahead of
Dr. Slaughter.

**Pages affected.** All 124 condition pages, all 122 treatment pages, all three area-of-pain
routes, injury pages, and the scoliosis LP — seven consumers.

## `0aaccac` — params type on area-of-pain back-pain layout
**1 file** · 2026-09-01

**What.** One type annotation: `params` typed as `{ PainArea: string }` while both sibling
layouts correctly use `Promise<{ … }>`. On Next.js 15 params is a Promise, and the function
already `await`s it — awaiting a non-Promise is legal TypeScript, which is why it went
unnoticed.

**Why it needed its own commit.** It only surfaces when `.next/types` is freshly generated,
which `tsconfig.json` includes. A tsc run against stale build artifacts reports 49; after a
real build it reports 50. **Fixing it makes 49 a real ceiling rather than an artifact of when
the check happens to run.**

## `a711300` — multi-state copy sweep for Georgia
**2 files** · 2026-09-01

**What.** **674 meta titles** rewritten across every condition and treatment record:
`FL, NJ, NY, & PA` → `FL, NJ, NY, PA & GA`.

**Why.** Georgia is the fifth state and Atlanta is operating, but sitewide copy still
advertised four.

**Rendered `<title>` and meta descriptions are unaffected** — those come from
`lib/metadata-seo.ts`, which contains none of these strings.

> **This commit was nearly lost.** It was dropped from the sprint plan as "already shipped" —
> shipped in the sense of written and verified, not in the sense of being in git. The 674
> rewrites were sitting uncommitted and would not have reached the PR.

**Pages affected.** All 124 condition pages and all 122 treatment pages.

## `7bc5f6c` — additionalSections support on treatment pages
**2 files** · 2026-09-01

**What.** The `additionalSections` mechanism existed only for conditions —
`ConditionSection` carries the `placement` key and `ConditionPage.tsx` renders it at four
points, but `TreatmentContent` had no such field and the treatment template rendered nothing.

**Why.** The spinal fusion and arthroscopy work both target treatment pages and had no way to
add question-led sections without this.

**Mirrors the condition model exactly** rather than inventing a second one: same fields, same
placement union, markup-identical component, placements mapped onto the treatment structure
(after overview, after candidacy, before procedure, after recovery).

**Existing pages provably unaffected, not merely sampled.** **Zero treatment records set
`additionalSections`**, so the filter matches nothing and the component returns `null` on all
122 pages. Ten sampled pages render identical markup before and after — once per-build noise
is stripped, since Next.js embeds a fresh build ID and content-hashed asset paths in every
build and raw byte comparison is therefore not a meaningful test.

---

# WAVE 10 — Content integrity

## `5d38493` — keyword cannibalization: topic ownership and forward links
**5 files** · 2026-09-02

**What.** Rescoped after measuring the premise. **Keyword-array intersection between the
suspected pairs is zero on three of four** — meniscus 0/8, shoulder replacement 0/8, spinal
vs lumbar fusion 0/7 — and the titles already encode the canonical/subtype split
("Meniscus Surgery (Meniscectomy)" vs "Meniscus Repair Surgery"). So no metadata rework was
needed on those pairs.

**Two genuine conflicts remained:**

1. **Fusion ownership.** Ahrefs resolves `spinal fusion` and `lumbar fusion` to one parent
   topic, so `spinal-fusion` owns the head term and `lumbar-fusion-surgery` is retargeted onto
   procedure and recovery long tail.
2. **DDD — the one real metadata cannibalization on the site**, and neither slug was on the
   original candidate list:
   `…-surgery` "Degenerative Disc Disease Surgery | Fusion & Replacement FL" vs
   `…-surgery-details` "Degenerative Disc Disease Surgery | Fusion & Disc Replacement Options".
   Owner is `/treatments/degenerative-disc-disease-surgery` because `next.config.ts:91`
   already 301s the retired `/conditions/` URL onto it — the site has already designated it
   canonical and it holds that consolidated signal.

   *There are four DDD URLs, not three. The fourth is a redirect source and sitemap-excluded,
   so it is not a competitor.*

**`title` untouched everywhere** — it is the canonical entity name used by schema, the
internal-link map, and condition lists.

**Forward hierarchy links added in prose on all four supporting pages.** The links that
already existed between these pairs are auto-generated related-treatment cards, which are
symmetric and therefore signal no hierarchy. Three bodies already contained an `<a href>`, so
an anchor is free; the DDD `-details` body had none, and adding one would have tripped the
"already has links, stop auto-linking" branch and **silently removed that page's other
internal links** — so that one is plain text and the auto-linker resolves it.

**Also fixes a real self-linking defect.** The prose auto-linker excluded entries by raw slug,
but a condition entry's href resolves through `resolveConditionSlugHref`, which maps the four
consolidated condition slugs onto their treatment URLs. On
`/treatments/ankle-replacement-surgery` the condition entry `ankle-replacement` passed the
guard and then **resolved back to the current page**. Now compares the resolved href.
**Verified: 5 body self-links → 1**, and the remaining one is the sidebar current-item link,
which is correct.

*The related-treatments generator itself is clean — it already excludes the current slug.*

**Pages affected.** `spinal-fusion`, `lumbar-fusion-surgery`,
`degenerative-disc-disease-surgery-details`, `meniscus-repair-surgery`,
`resurfacing-shoulder-replacement`; plus the self-link fix on all 124 condition and 122
treatment pages.

## `6c5b9cb` — remove unsourced outcome claims ⭐
**7 files** · 2026-09-02 · **The most significant content change in the PR.**

**What.** **111 unsourced medical outcome claims** removed across five data files.

**Why this is a different category from superlatives.** These were not marketing adjectives.
They were **numeric medical statistics presented as fact on YMYL pages**:

- "High success rate exceeding 90% for complete pain relief"
- "85–95% success rate with anatomic repair techniques"
- "80–90% of patients achieving significant pain relief"
- "implants lasting 15–20 years or more"
- "80–90% good-to-excellent outcomes"

**41 were in `treatmentFAQs.ts`, which feeds `FAQPage` structured data** — so they were being
served to Google as **machine-readable claims from a surgical practice**. That is a materially
different exposure from the same sentence in body prose, and that slice was done first.

| File | Claims |
|---|---|
| `treatmentFAQs.ts` | 41 (incl. ~14 questions literally titled "What is the success rate of X?") |
| `treatments.tsx` | 35 (mostly `benefits` bullets) |
| `clinics.tsx` | 27 |
| `conditions.tsx` / `conditionFAQs.ts` | 8 |

**Replaced, not deleted.** Each statistic became what actually determines the result for that
procedure — which findings predict a good outcome, what the surgeon weighs, what varies
between patients. A page that asserted a percentage and now says nothing has a hole where its
most confident paragraph was; this is both honest and more useful than a number nobody sourced.

**The `clinics.tsx` sentence did double duty.** "Patients choose Mountain Spine & Orthopedics
for our high surgical success rates…" appeared on **23 of 24 built location pages** — it was
simultaneously the most-duplicated clinical paragraph on the site and its most prominent
outcome claim. One edit closes both.

**Deliberately NOT changed:** `stem-cell-treatment`'s "not a cure or guaranteed treatment"
and "Results are not guaranteed" — those are **disclaimers, the opposite of a violation**; and
a blog title that critically examines success-rate numbers.

**Benefits.** Removes unsubstantiated medical claims from a YMYL site and from structured
data — a compliance and liability improvement independent of SEO. Unsourced medical statistics
across a templated tier are close to a literal description of what the December 2025 core
update targeted.

**Verified.** 0 claims remain in any data file · 122 `FAQPage` blocks with 539 questions all
parse with **no empty or truncated answers** · build exit 0 at 751/751 · tsc 49.

**Pages affected.** All 24 location pages, ~26 treatment pages via FAQs, ~30 more via
`benefits`, 4 condition pages.

## `e0d2bdf` — typecheck gate in CI
**What.** `.github/workflows/typecheck.yml` with a **hard ceiling of 49**.

**Why.** `next.config.ts` sets `typescript.ignoreBuildErrors` and `eslint.ignoreDuringBuilds`,
so a green `next build` says nothing about whether the project typechecks. Nothing in CI
checked it.

**The build runs before tsc deliberately** — `tsconfig.json` includes `.next/types/**/*.ts`
and those route types only exist after a build. That is exactly how this project's baseline
was mistaken for 49 when a fresh build reports 50.

**Documented as a ratchet, not a target.** Raising it to make a build pass defeats the point;
lowering it after a fix locks the gain in. The job prints errors by file so a regression is
attributable.

---

# WAVE 11 — Providers, positioning and the landing page

## `7d64ca7` — six new providers; orthopedic-only positioning
**9 files** · 2026-09-02

**What.** Adds Dr. Steven Schiebert, Dr. Dean Sorrento, Dr. Howard Sharf, Dr. Johnson Ho,
Joseph Cunningham PA-C and Sharmez Savory PA-C — **roster 6 → 12**.

**`PhysicianSchema` reworked for two problems the new records exposed:**

1. **schema.org has no Physician-Assistant type**, and `Physician` means an individual
   physician — emitting it for a PA-C **asserts a credential they do not hold**. PAs now emit
   `Person` plus an explicit physician-assistant `hasCredential`.
2. `img.src` is site-relative for local imports but absolute for providers whose photos are
   still hosted off-domain, so it can no longer be blindly prefixed with the origin.

**Also removes all neurosurgery positioning.** Mountain Spine is strictly orthopedic. 26
references split by kind rather than swept uniformly:

- **Positioning — deleted.** Practice titles, metaTitle, keywords, `medicalSpecialty`,
  `specialties`, the "board-certified neurologists, neurosurgeons" line on `/about`, and an
  **org-level `hasCredential` in JSON-LD asserting American Board of Neurological Surgery
  certification**. Cunningham's `conditionsTreated` also listed **"Spinal Tumors", "Brain
  Tumors" and "Intracranial Hemorrhage"** — conditions the practice does not treat, attached
  to a named provider, which is a stronger capability claim than the word itself.
- **Real credentials at other institutions — generalised, never falsified.** Both PAs hold
  genuine neurosurgery credentials earned elsewhere. Deleting a real credential would misstate
  a real person's history and cost E-E-A-T, so **employer, institution and year are kept and
  only the department label is dropped**: "Chief Physician Assistant at South Brooklyn Health",
  "Surgical Fellowship, Arrowhead Medical Center (2015)".

**Verified.** **0 occurrences of `neurosurg*` across all 751 built pages.** Both PA pages emit
`Person`, not `Physician`. One benign match is deliberately kept — "a neurological check of
strength, sensation, and reflexes" describes an exam an orthopedic spine surgeon performs.

> `next.config.ts` carries a **TEMPORARY** remote-image allowlist for the six providers whose
> photos still live on `orthopedicandlaserspinesurgery.com`. Remove it once migrated to BunnyCDN.

**Pages affected.** All 12 doctor profile pages, the doctors index, `/about`,
`/treatments/orthopedic-injections`, and every page rendering the physician module — all 124
condition and 122 treatment pages.

## `877dfb3` — adult scoliosis paid landing page and review-provenance schema
**3 files** · 2026-09-02

**What.** `/lp/adult-scoliosis-treatment` — a server component by design, so Ads quality
checks and the visitor both see real content before hydration. Only client boundaries are the
lead form, tracked phone link, and doctor cards — all existing components. No new visual
patterns.

**`noindex, follow` is deliberate and load-bearing:** organic authority for this cluster
belongs to `/conditions/adult-degenerative-scoliosis` and `/treatments/adult-scoliosis-surgery`.
**Do not "fix" the noindex.**

**Also adds clinical review provenance, gated on the record carrying a real review date.**
Treatments without `reviewedAt` emit nothing, so an unreviewed page asserts nothing rather
than inventing a reviewer — the same gating pattern as Atlanta's hours. **`reviewedAt` and
`reviewedBy` remain unset on every page** because no physician has reviewed one yet. That is
correct YMYL behaviour and the schema must stay silent until a real review happens.

**Pages affected.** `/lp/adult-scoliosis-treatment` (new); all 122 treatment pages via layout.

## `6cfc6cd` — schema, metadata and lead-contract hardening
**37 files** · 2026-09-02

**What.** The remaining sitewide surfaces: `lib/lead-contract.ts` and the measurement contract
test; `lib/seo.ts`, `lib/generateLocationSchema.ts`, `LocationItemListSchema`, `LocationNAP`;
injuries FAQs and layouts, about/faqs, find-care, the conditions and treatments hubs, the
homepage; form-source wiring and layout corrections in `BodyPartHeroForm`,
`HomeHeroSection`, `InjuryAttorneyPanel`, `InjuryClinicFinder`, `StateLocationsGridDesktop`.

**The measurement contract test** keeps `form_source` from ever encoding a condition, symptom,
or insurance status — so no health signal reaches GA4 or Google Ads. Injury-vertical sources
stay exempt: they name a business category, not a health condition.

**Grouped rather than split further** because each file carries a handful of lines and none is
independently revertable in a meaningful way; the risky changes in this sprint are isolated in
their own commits.

**Pages affected.** Sitewide.

---

# WAVE 12 — Documentation, tooling and investigation

These commits ship no user-facing change. They exist so the next person does not re-derive
four rounds of investigation.

| Commit | Contents |
|---|---|
| `3d12738` | Implementation artifacts for the 2026-08-29 remediation |
| `215f4bb` | Wave 3 results and two corrected premises |
| `3b0f536` | Visual QA checklist with localhost links |
| `8c0844c` | Untrack local `.claude` config |
| `ab6e73a` | Sprint documentation, diagnosis of record, QA tooling |
| `74a442f` | Internal-link distribution and runbook corrections |
| `95e5fe2` | Visual audit harness — and a correction it surfaced |
| `d8c7db2` | Hydration scan across the templated tier |
| `ebf65d8` | Internal-link distribution doc; final 5v5 pilot lock |

**`95e5fe2`** added `scripts/visual-audit-sprint.mjs` — 33 pages × 3 viewports, screenshots
plus structural assertions, because screenshots alone do not catch what a bulk string sweep
breaks. **99 combinations, zero defects introduced.** It also caught a wrong claim in the
project's own notes: Atlanta's absent `hoursDisplay` was described as the page staying silent,
but `LocationNAP.tsx:13` treats `undefined` as *render the sitewide default*. **Since
confirmed by the business that 8AM–8PM is accurate practice-wide, so no change was needed** —
but the reasoning in the notes was wrong and is corrected.

**`d8c7db2`** added `scripts/hydration-scan.mjs` and **refuted hydration failure as an
exclusion driver** — see below.

---

# WAVE 13 — Pilot lock, payer integrity, differentiation content, and the last three commits

Everything after the first edition of this document (`cc462bd`). This wave contains the
pilot's experimental content, so its commits are the ones the 60–90 day read depends on.

| Commit | Contents |
|---|---|
| `c15428a` | Definitive 5v5 pilot lock (§16), superseding the void 7v7 and first 5v5 |
| `7da4db6` | Payer revert: 105 treatment lines restored **byte-identical** to production's four variants |
| `054eba8` | Temur payer review widened to all three insurance surfaces |
| `562dcc9` | Flag that the payer revert was partial **by design** — the insurance page headline is held for review, not reverted |
| `ef13541` | **Spinal fusion cluster** — differentiated `additionalSections` on five spine pages, including the four spine treatment-arm slugs (§16 Commits 8.1–8.4) |
| `2686fd2` | Three business clearances recorded so they are not re-flagged |
| `e6af190` | **Arthroscopy cluster** — five records extended, including `shoulder-arthroscopy` (§16 Commit 9.1) |
| `6aaba2d` | Location priority-slug repair (22 substitutions); ACL sections; scoliosis local coverage |
| `2cafb7e` | State priority-slug repair (25 substitutions); link-asymmetry confound recorded |
| `86b5feb` | **Commit 7b/7d** — enhanced-conversion PII hashed client-side (`sha256_` field names); `landing_path` column plumbing |
| `80467de` | **Commit 14** — superlative sweep: 45 marketing-copy lines; review bodies and keyword arrays excluded by design |
| `727862a` | Regenerate `clinicsForMap` after the sweep (prebuild staleness gate caught it) |
| `e90fcb6` | **Commit 13** — three injections paid LPs on one shared template; `landing_path` wired end-to-end |

**`86b5feb` changes the GTM contract twice.** Hashed values ship under `sha256_`-prefixed
field names because Google's spec distinguishes raw from pre-hashed input **by field name**
— pushing hashes under the raw names would make GTM hash a second time and silently zero
the Enhanced Conversions match rate. The GTM user-provided-data variable must be updated in
the **same GTM publish** as the `lead_form_submit_success` trigger, before this code
deploys. The PR description carries the full cutover checklist.

**`e90fcb6` closed a gap `86b5feb` left open:** `landing_path` was declared on
`logLeadToSupabase` but fed by nothing. The form now appends `window.location.pathname`
**only when `formSource === 'paid-landing'`**, the doctor route reads it, `sendUserEmail`
forwards it. Supabase only — the measurement contract test enforces that it never enters
the GA4 payload. And the honest framing, corrected in the code comment: **this is not a
privacy control.** GA4 already receives the submitting page's pathname on every event as
`page_path`. `landing_path` exists to join a lead to its landing page in Supabase for
per-LP conversion rate; the line it honors is per-user vs per-page — nothing about a
condition is attached to an individual's ad-platform record.

**`80467de`'s deliberate exclusions, so nobody "fixes" them later:** 28 `reviewBody`
strings and 1 `testimonial` prop keep their superlatives — they are attributed patient
statements and are never edited. The 34 `keywords`-array entries ("best orthopedic surgeon
orlando") are search-query targets consumed only by `generateMetadata`, not rendered
claims. Lines carrying both a cleared same-day claim and a superlative had only the
superlative changed.

**The three LPs' link-graph guard:** `/lp/*` is noindex,**follow** — links pass. None of
the three new pages links any of the ten locked pilot slugs; the spine page routes its
surgical card to `lumbar-microdiscectomy-surgery`/`acdf-surgery` instead of
`lumbar-decompression` (control) or `spinal-fusion` (treatment), and the joint page routes
to the arthroscopy-cluster pages, never `shoulder-arthroscopy` or `biceps-tenodesis`.
(The scoliosis LP, which predates the lock, links `lumbar-decompression` and
`spinal-fusion` — recorded in `2cafb7e` as a pre-existing confound, left unedited because
editing it now would itself change the link graph mid-experiment.)

**The control-diff finding this wave surfaced:** byte-level comparison of all five control
records against `upstream/main` corrected two §16 claims — three controls are
byte-identical to production (the Georgia sweep never touched them), and
`lumbar-decompression` carries one minimal outcome-claim replacement where the lock table
said "no 14a edit." Neither voids the pilot; both are recorded in §16's dated addendum,
and the recrawl confound is downgraded from "resolved" to "partially resolved — 5/5
treatment pages edited vs 2/5 controls."

## Format drift — the migration debt, now quantified

Three schema-drift instances surfaced during this sprint: `TreatmentContent` lacked
`additionalSections`, then `h1` (both since added); `acl-injury` could not receive
`additionalSections` because it is a legacy `ConditionInfoProp`. The third is not an
isolated case:

| Condition data format | Records | Supports `additionalSections`/`h1`/`reviewedAt` |
|---|---|---|
| `ConditionContent` (new) | 181 | yes |
| In both arrays | 27 | via their `ConditionContent` twin (the router prefers it) |
| **`ConditionInfoProp` legacy-ONLY** | **85** | **no — migration required first** |

**85 of 239 unique condition slugs (36%) cannot receive any differentiation machinery**
until migrated. They are concentrated in exactly the joint and extremity conditions the
arthroscopy cluster and the injections LPs build toward: `knee-arthritis`,
`rotator-cuff-tear`, `hip-labral-tear`, `frozen-shoulder`, `carpal-tunnel-syndrome`,
`tennis-elbow`, `plantar-fasciitis`, and 78 more. **Any next-quarter differentiation scope
for these pages must budget the format migration as a prerequisite** — it is not a
per-page content cost.

### `acl-injury` — its own scoped item

`acl-injury` (17,000/mo volume, KD 1) is blocked by schema, not content: the differentiated
copy already exists and was relocated to `/treatments/acl-reconstruction-surgery` when the
legacy format rejected it (adding `additionalSections` to a `ConditionInfoProp` raised tsc
to 50). The migration of this one record — legacy → `ConditionContent`, preserving every
currently rendered field byte-for-byte, then moving the condition-side content back — is a
self-contained task with the highest volume-to-effort ratio in the backlog. It must not run
during the pilot observation window.

---

## Full-page audit of every visually updated route — 2026-09-06

Run before push, in two prongs: a **static content sweep over all 706 built HTML
documents** (banned-string regexes with scripts/styles stripped) and a **browser audit of
the 59 layout-changed routes** at three viewports with structural assertions, screenshot
review, and superlative fragments captured with ancestor chains for human classification
(`scripts/visual-audit-updated-pages.mjs`).

**Eight violations found and fixed (`1381dff` + follow-up) — every one lived OUTSIDE the
data files the earlier sweeps covered:**

| Violation | Where it rendered | Why earlier sweeps missed it |
|---|---|---|
| "guided by our in-house physical therapy team" — first-person PT, the hard line | 6 area-of-pain bunion variants | `painconditions.tsx` was never in any sweep's file list |
| "World-Class Expertise" card + "proven track record of successful outcomes" | all 24 clinic pages | string lives in the route file, not clinics.tsx |
| Same card, written `World - Class Expertise` | homepage | spaced hyphen defeats every `world-class` regex |
| "world-class … elite surgical skill" blurb | all 5 state hubs | component string (`StateWhyChoose.tsx`) |
| "the top tier of … surgical expertise" — unhyphenated | all 5 state hubs | `top-tier` regex requires the hyphen |
| "Meet with our world-class surgeons today" | nav dropdown, sitewide | component string (`NavBar`, `SidebarNavItem`) |
| "Our renowned doctors" ×3 / "Renowned Spine Surgeons" | doctors-page metadata / insurance trust card | route-file strings; the insurance fix is a superlative, not payer copy — Temur gate untouched |
| "unmatched precision" ×2, "unmatched expertise" | McCarthy and Slaughter bios | physician-bio file; the cleared "elite training from Princeton, Harvard, and Brown" is untouched — the clearance covered that phrase, not these comparatives. Softened minimally; flagged as reversible if the business clears them |

**Classified pre-existing, deliberately unchanged:** the three #418 hydration errors on
`meniscus-surgery` / `arthroscopic-knee-surgery` / `acl-reconstruction-surgery` **reproduce
on production today** (ground-truthed by loading the live pages — not the cluster's doing);
the 4px `/locations` mobile overflow measures identically on production; the audit's
"resource 404s" were Google Ads/Analytics beacons failing on localhost; every rendered
superlative remaining on location pages sits inside a patient review carousel.

**Also verified:** all 80 distinct internal link targets across the four LPs resolve 200;
all 74 `additionalSections` headings render in built HTML (the 11 "missing insurance
sections" were each record's dormant, never-rendered `insurance:` field — byte-identical
to production); zero outcome claims, neurosurgery references, or markdown leaks anywhere
in the 706 documents.

**The systemic lesson, recorded so the next sweep starts here:** a data-file sweep bounds
its guarantee to the files it reads. Marketing copy lives in at least five other places —
route files, shared components, nav data, metadata objects, physician bios — and string
matching must tolerate hyphen and spacing variants. The rendered-output sweep
(`static_sweep` over built HTML) is the only check whose coverage equals what users see.

---

# What this PR proves, and what it rules out

Four rounds of verification refuted three hypotheses. Each refutation is recorded with its
evidence so nobody re-opens it.

| Hypothesis | Verdict | Evidence |
|---|---|---|
| Manual action / security issue | **Ruled out** | GSC clean |
| Backlink penalty | **Ruled out** | DR rising throughout |
| Technical regression | **Ruled out** | No deploy at the inflection; a smooth five-week glide, not a cliff |
| `/area-of-pain/*` duplicates | **Ruled out** | 0 of 137 excluded URLs are area-of-pain; routes predate the collapse by six months and rankings rose 0 → 96 while they existed |
| Sibling deduplication | **Refuted** | Across 32 inspected URLs, zero pages canonicalized onto a template sibling; the DDD trio coexists without either absorbing the other |
| Missing canonical tags | **Refuted** | **0 of 703** built pages lack a canonical; production verified to both `curl` and Googlebot UA on all 9 reported pages; canonical well inside `<head>` with **zero illegal-in-head elements** before it |
| Hydration mismatches | **Refuted as driver** | Cross-reference **inverted on two independent cuts**: the tier with **0.0%** errors (`/conditions`) is excluded at **56%**, the tier with **32.8%** (`/treatments`) at **43%**; shoulder has **zero** errors and the **most** exclusions |
| Orphan pages | **Refuted** | Templated-tier median is **41** inbound links, with **0** orphaned treatment pages and 3 orphaned condition pages; the site-wide median of 0 is entirely an area-of-pain artifact |

**Surviving diagnosis:** the December 2025 broad core update deprioritized the templated tier
**on content quality**. 123 of 246 templated pages were crawled, assessed, and refused
indexation. Differentiation remains the only untested remedy, and Commit 12's pilot is
designed to test it before committing to ~246 rewrites.

---

# Known issues carried, deliberately unfixed

- **React #418 hydration mismatches — 40 pages, 32.8% of treatments, 0% of conditions.**
  Cause diagnosed: the treatment template injects into an `<li dangerouslySetInnerHTML>` host
  while the condition template uses `<div>`; block-level markup inside an `<li>` lets the
  browser reparent the DOM. **Not the exclusion driver.** Unfixed because a fix would touch
  pages in both experimental arms mid-experiment. **First item next sprint.**
- **Canonical discrepancy.** Code is clean and verified; GSC nonetheless reports nine pages as
  `Duplicate without user-selected canonical`. Stale index record is the only remaining
  explanation. Pending Test Live URL on `/patient-forms` and `/find-care/free-mri-review`.
- **Location page template sameness.** Two clinical paragraphs repeat across 20–22 of 24
  clinics with only the city swapped. `docs/seo/location-page-duplication-audit.md`. Its
  outcome claim is fixed in 14a; the paragraph rewrite is its own sprint and **must not run
  during the pilot observation window.**
- **5 empty `<h3>`s** on the foot-pain area-of-pain variant — pre-existing, page noindexed.
- **`/find-care/book-an-appointment`** — page-one position, zero clicks, 63% brand-navigational
  impressions. Needs non-brand impression volume, not a title rewrite.

# Outstanding business inputs

Atlanta GBP fields and on-site physicians · a named physician reviewer for `reviewedBy` ·
confirmation that the 19 verified GBP listings publish the same 8AM–8PM hours as the site ·
`lumbar scoliosis` on HOLD pending a SERP-overlap test.

## Closed — confirmed by the business, no code change

- **Same-day to same-week appointment availability confirmed; site copy and ad copy are both
  accurate and consistent.** The location-page same-day claims describe the best case and
  "same-week" in ad copy is the conservative expression of the same availability. No
  contradiction to resolve. Where those `clinics.tsx` lines also carry superlatives, Commit
  14 changes only the superlative and leaves the same-day language intact.
- **"Same-day callbacks"** in the shared hero — an operational commitment the front desk
  meets, distinct from an appointment promise.
- **"elite training from Princeton, Harvard, and Brown"** in Dr. McCarthy's bio — verifiable
  training at named institutions, not a superlative claim about the practice.
- **Clinic hours** — 8AM–8PM confirmed practice-wide, so the sitewide default is accurate.

# Not in this PR

Phase E `temur/insurance-copy` — gated on Temur's approval and **must never merge here**
(the branch exists, carrying no copy changes; the review doc travels in this PR) · the GTM
container changes (trigger rename + `sha256_` user-provided-data variable), which are a
coordinated pre-deploy step, not code · the GA4/Ads **audience inventory** (whether any
audience keys on `/lp/` or condition paths), which requires UI access · the outstanding
business inputs above.

*Stale entries removed 2026-09-06: Commit 7 (7b/7d), the differentiation content, Commit 13
and Commit 14 previously listed here are all now in the branch — see Wave 13.*
