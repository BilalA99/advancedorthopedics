# Post-Launch Measurement Plan — Scoliosis Cluster & Georgia/Atlanta

Baseline date: **2026-08-30** (deploy date). Take the baseline pull *before* deploying if
possible; otherwise use the trailing 28 days ending 2026-08-30.

Checkpoints: baseline → +14d → +28d → +60d → +90d.

---

## 1. Scoliosis cluster (Search Console)

**Query filter (custom regex):**

```
scoliosis|degenerative scoliosis|adult scoliosis|spinal deformity|lumbar scoliosis|cobb angle
```

Pull at each checkpoint, broken out by **query × landing page × device**:

| Metric | Why |
|---|---|
| Impressions | Did the new sections earn new query coverage at all? |
| Clicks | The only number that can become a patient. |
| CTR | Title/description resonance; a rising-impressions/flat-CTR pattern means we surfaced for the wrong intent. |
| Average position | Directional only — averages across a mixed query set are noisy. |

**Pages to track individually** (do not aggregate):

- `/conditions/adult-degenerative-scoliosis` — the pillar
- `/conditions/spine-deformities` — the deformity parent
- `/blogs/adult-scoliosis-treatment-options-when-surgery-is-needed`

### What to look for

- **New query coverage on the pillar.** The four new sections target back-pain/sciatica,
  progression-with-age, diagnosis/Cobb angle, and doctor-type queries. If those clusters
  do not appear in the pillar's query list by +28d, the sections are not being retrieved
  and the headings need revisiting.
- **Cannibalization.** Same query alternating between the pillar and
  `/conditions/spine-deformities` across checkpoints. One query flipping landing pages is
  the signal; both pages appearing for *different* queries is correct and healthy.
- **`lumbar scoliosis` (HOLD decision).** If the pillar accumulates meaningful impressions
  for lumbar-scoliosis queries but sits at a poor position, that is the evidence needed to
  revisit the standalone-page decision in `scoliosis-query-page-map.md`. Volume alone is not.
- **Progression section (HOLD decision).** Same test for
  "does scoliosis get worse with age".

---

## 2. AI / generative visibility

Where the Search Console property exposes Google's generative/AI reporting, track
impressions and landing pages for the same query regex.

**This report is not available on every property.** If it is absent, record that fact at
each checkpoint rather than substituting a proxy — do not infer AI Overview visibility
from ordinary Search impressions. Continue measuring Search + GA4 conversions regardless.

Supporting signal, if the Ahrefs Brand Radar seat is active: AI-response mentions and
cited pages for the scoliosis prompt set.

---

## 3. Georgia / Atlanta

Nothing to compare against — this is a cold start. Establish the baseline at first
indexation, not at deploy.

| Checkpoint | What to confirm |
|---|---|
| +7d | `/locations/georgia` and `/locations/georgia/atlanta-orthopedics` indexed (URL Inspection). If not, request indexing. |
| +14d | First impressions appear; check which queries — expect brand + `orthopedic/spine surgeon atlanta` variants. |
| +28d | Impressions by query type: local ("near me", city-modified), condition-led, branded. |
| +60d / +90d | Clicks, CTR, phone clicks, and form submissions attributed to the Atlanta page. |

**When the GBP goes live**, add: GBP Performance (searches, calls, direction requests) and
Local Pack visibility for `orthopedic surgeon atlanta` / `spine surgeon atlanta`. Attach
the profile by filling the already-present optional fields on the Atlanta entry in
`components/data/clinics.tsx` (`placeId`, `cid`, `placeUrl`, `embedSrc`, exact `lat`/`lng`).
**Do not change the URL** when the GBP is attached.

---

## 4. Conversions (GA4)

Track the generic, non-sensitive events only:

- `lead_form_submit_success` (with `form_source`)
- phone click events
- MRI review and second-opinion CTA clicks

Segment by `form_source`:

| `form_source` | Reads as |
|---|---|
| `body-part-consultation` | Organic condition/body-part pages, incl. the scoliosis pillar |
| `location-contact` / `location-consultation` | Location pages, incl. Atlanta |
| `paid-landing` | `/lp/adult-scoliosis-treatment` |

**Privacy boundary — do not cross it.** No condition, symptom, diagnosis, or insurance
value may be sent to GA4 or Google Ads. `form_source` names the traffic channel, never the
ad group's condition. PPO/payer qualification stays first-party in Supabase (`public.forms`).
This is enforced by a test: `tests/measurement-contract.test.ts` → *"no form source encodes
a condition, symptom, or insurance status"*.

---

## 5. Paid landing page

Measured in Google Ads, not Search Console (it is noindexed).

- Landing page experience / ad relevance per ad group
- Conversion rate by ad group, against the `paid-landing` GA4 segment
- Confirm at each checkpoint that `/lp/adult-scoliosis-treatment` has **not** been indexed
  (`site:mountainspineorthopedics.com/lp/`). If it appears, the noindex has regressed.

---

## 6. Regression gates already automated

These run on every `npm run build` via `prebuild` and will fail the build:

- `scripts/validate-location-data.mjs` — location data integrity
- `scripts/audit-scoliosis-entity-graph.mjs` — no duplicated condition headings, no
  clinically mismatched physician on a condition/treatment page, no self-referencing
  internal links
- `scripts/generate-clinics-for-map.mjs --check` / `generate-taxonomy-index.mjs --check`

`npm run test:measurement` covers the analytics privacy contract.

---

# 7. Diagnosis of record — the December 2025 ranking collapse

Added 2026-09-01, after four rounds of verification refuted three competing hypotheses.

## The narrative

**December 2025 Google broad core update** (launched Dec 11, completed Dec 29; volatility
waves Dec 13 and Dec 20; YMYL sectors hit hardest; explicitly targeted content created to
rank in search rather than to help people) → the templated `/conditions` and `/treatments`
tiers were algorithmically deprioritized → **123 of 246 templated pages are now
Crawled – currently not indexed** → top-3 keywords went 96 → 0 between Dec 18/19 2025 and
Feb 25 2026.

**Ruled out:** manual action (GSC clean), security issue (GSC clean), backlink penalty
(DR rising), technical regression (no deploy at the inflection; the decline is a smooth
five-week glide, not a cliff), and the `/area-of-pain/*` duplicate theory (**0** of 137
excluded URLs are area-of-pain; the routes predate the collapse by six months and rankings
rose 0 → 96 while they existed).

**The mechanism, visible in the data:** exclusions cluster by body part — 12 shoulder pages,
10 knee, 10 hip. Google is deduplicating groups of near-identical templated pages against
one another. This is the framing the remedy must be written against.

## Corrected tier arithmetic

The page counts used in earlier drafts were wrong. Verified against build output —
124 condition pages and 122 treatment pages, not 136 and 121:

| Tier | Total | Excluded | Share |
|---|---|---|---|
| `/conditions/*` | 124 | 70 | **56%** |
| `/treatments/*` | 122 | 53 | **43%** |
| **Combined** | **246** | **123** | **50%** |

Conditions are worse than first stated, not better. **Exactly half the templated tier is
excluded from the index.** The narrative holds; the figures were wrong.

## Decline onset — daily resolution

| Date | top-3 |
|---|---|
| 2025-11-30 | 88 |
| **2025-12-13** | **96 (peak)** |
| 2025-12-18 | 87 |
| **2025-12-19** | **83 — inflection** |
| 2025-12-31 | 31 |
| 2026-01-23 | 2 |
| 2026-02-25 | 0 |

No code deployment sits at the inflection: a merge PR on 12-11 and a blog canonical fix on
12-21. The `/conditions` URL migration (`c59febd`) is 2026-01-14, four weeks *after* onset —
it cannot be the trigger, though it may have deepened a decline already underway.

**Still open, logged but not chased:** the decline continued two months past the Dec 29
rollout completion (31 → 2 → 0). Either lagging re-crawl or the Jan 14 migration deepened
it. Both readings recorded; no action this sprint.

## Other corrections folded in (2026-09-01)

- Internal-link canonicalisation has **14** call sites, not 13.
- Provider selection has **7** consumers, not 6 — the seventh is
  `app/lp/adult-scoliosis-treatment`.
- **Two additional redirect chains** were found and collapsed, beyond the two previously
  believed to be the only ones. Both were legacy no-hyphen aliases pointing at slugs that
  are themselves redirect sources:
  `/area-of-pain/back-pain/degenerativediscdisease` and
  `/area-of-pain/neck-and-shoulder-pain/degenerativediscdisease`.
  A scripted walk over all 121 rules in `next.config.ts` now reports **zero** multi-hop chains.
- The tsc baseline is **49** only after a fresh build; a run against stale `.next/types`
  reports 50. Fixed in `0aaccac` so the ceiling is real rather than timing-dependent.

## Sitemap — reasoning recorded precisely

A sitemap declares intent; **it does not gate indexation.** Google indexes what it can crawl
and is not told to exclude. The 123 excluded pages are indexable, sitemap-listed, and
refused on quality grounds — not a sitemap problem. "Sitemap correct" must never be read as
"indexation correct." That conflation is what let this sit unnoticed.

---

# 8. Differentiation pilot — LOCKED GROUPS

**Locked 2026-09-02.** Do not edit any page below except as this section permits.
Changing a control page beyond its permitted edit **voids the experiment.**

## Hypothesis

The December 2025 core update deprioritized the templated tier on **content quality**.
Sibling deduplication was tested and **refuted** (0 of 32 inspected URLs were canonicalized
onto a template sibling). Differentiation is therefore the only untested remedy. This pilot
asks whether differentiating a page is sufficient to earn indexation back, **before**
committing to ~246 rewrites.

## Design

| Arm | Edit permitted |
|---|---|
| **Treatment** (7 pages) | Full differentiation — `additionalSections` written to the noun-swap test, plus the outcome-claim sweep |
| **Control** (7 pages) | **Compliance edit only** — the outcome-claim sweep, using the shortest neutral clause that removes the claim. No expansion, no new sections, no metadata changes |

**Why controls are edited at all:** an untouched control tests "differentiation" against
"no edit," and any edit triggers a recrawl. A page re-indexed after editing might have
recovered because the content improved or merely because Google came back and looked.
Editing both arms makes recrawl common to both and isolates differentiation as the variable.

## Treatment arm

| Page | Inspection status | Last crawl |
|---|---|---|
| `/treatments/spinal-fusion` | Crawled – currently not indexed ✓ | *fill from inspection* |
| `/treatments/shoulder-arthroscopy` | Crawled – currently not indexed ✓ | *fill* |
| `/treatments/hip-arthroscopy-treatment` | Crawled – currently not indexed ✓ | *fill* |
| `/treatments/arthroscopic-knee-surgery` | Crawled – currently not indexed ✓ | *fill* |
| `/treatments/knee-cartilage-restoration` | Crawled – currently not indexed ✓ | *fill* |
| `/treatments/cervical-laminectomy` | ⚠️ **UNVERIFIED** | *fill* |
| `/conditions/herniated-disc` | ⚠️ **UNVERIFIED** | *fill* |

## Control arm

| Page | Inspection status | Last crawl |
|---|---|---|
| `/treatments/knee-osteotomy` | Crawled – currently not indexed ✓ | *fill* |
| `/treatments/partial-knee-replacement` | Crawled – currently not indexed ✓ | *fill* |
| `/treatments/shoulder-instability-surgery` | Crawled – currently not indexed ✓ | *fill* |
| `/treatments/total-knee-replacement` | ⚠️ **UNVERIFIED** | *fill* |
| `/treatments/knee-ligament-repair` | ⚠️ **UNVERIFIED** | *fill* |
| `/treatments/labral-repair-shoulder` | ⚠️ **UNVERIFIED** | *fill* |
| `/conditions/knee-arthritis` | Crawled – currently not indexed ✓ | *fill* |

All 14 confirmed to exist as built pages. **Four pages in each arm's UNVERIFIED rows must be
confirmed as `Crawled – currently not indexed` by URL Inspection before the pilot deploys.**
If any is indexed or discovered-only, swap it rather than edit it.

## Known confounds — document, do not correct for

1. **Recrawl latency.** Treatment-arm last-crawl spans Mar 18 – Aug 29 2026; control spans
   Apr 1 – Jul 28. A page last crawled in March will take longer to show any effect than one
   crawled in August, regardless of what was done to it. Record every date; read the result
   accordingly. Do not attempt statistical correction on n=7.
2. **Commit 5 touched both arms equally.** The Georgia copy sweep rewrote `metaTitle` on all
   246 templated pages, including all 14 pilot pages. This is symmetric across arms and
   therefore does not confound, but it means neither arm is truly "untouched" — the control
   condition is *metadata sweep + compliance edit*, not *no change*.
3. **URL Inspection is more current than the Pages report.** Two pages in the Sep 1
   crawled-not-indexed export inspect as indexed or never-crawled. The 137 figure is a
   lagging snapshot; validate any page-state claim by inspection, never by presence in the
   export.

## Read criteria at 60–90 days

| Outcome | Conclusion |
|---|---|
| Treatment exits Crawled-not-indexed, control does not | Remedy works. Scale to the tier with a proven template. |
| Neither moves | Remedy is wrong. ~246 rewrites avoided. |
| Both move | Something else changed. Test void — annotate and re-run. |

**Success metric is indexation, not ranking position.** Judging these pages on rank at 30
days fails them for the wrong reason.

## Excluded from the pilot, and why

- `/treatments/reverse-shoulder-replacement` — **indexed**; cannot measure exit from a state
  it is not in.
- `/conditions/cervical-herniated-disc` — **never crawled**; a different failure mode.
- `/conditions/hip-bursitis`, `/treatments/hip-resurfacing` — both report
  `Indexing allowed: N/A` and `N/A` canonical after a successful fetch, where every other
  crawled page reports `Yes` plus a canonical. Two anomalous pages in a seven-page control
  is too much noise.
- `/conditions/frozen-shoulder` — dropped when the control was rebalanced to match the
  treatment arm's composition (6 treatments + 1 condition).

---

# 9. Sitemap reconciliation — confirmed no-op (Commit 16)

No code change. The reasoning is recorded here precisely because misreading it is
what let the indexation problem sit unnoticed.

> **A sitemap declares intent; it does not gate indexation.** Google indexes what it can
> crawl and is not told to exclude. The ~123 excluded pages are indexable, sitemap-listed,
> and refused on quality grounds — that is not a sitemap problem, and no sitemap change
> can fix it.

**"Sitemap correct" must never be read as "indexation correct."**

Audited after the sweep: 703 built pages, **0 with no canonical**, 374 self-referencing,
329 cross-canonical by design (324 of those the area-of-pain consolidation). Nothing that
should be indexed is absent from the sitemap.

# 10. Two findings that closed without code changes

**Commit 11b — missing canonical tags: does not exist.** All nine reported pages emit a
correct self-referencing canonical in server-rendered HTML, and `curl` against production
confirms all seven checked return HTTP 200 with the correct tag. `lib/seo.ts` and
`lib/metadata-seo.ts` are unchanged between `upstream/main` and this branch. The GSC
"user-declared canonical: N/A" reading is an inspection artifact, not a served-page defect.

The pattern argues the same way: a missing tag makes Google pick a *content twin*, not fold
`/patient-forms` and `/find-care/free-mri-review` into `/about`. Unrelated pages collapsing
into a hub is characteristic of Google selecting a hub canonical for pages it judges thin —
a quality signal, consistent with the core-update diagnosis.

**Commit 11c — never-crawled pages are not under-linked.** Inbound internal links from
server-rendered HTML:

| Page | Inbound links |
|---|---|
| `/conditions/cervical-herniated-disc` | **174** |
| `/treatments/meniscus-surgery` | **47** |
| `/treatments/meniscus-repair-surgery` | **45** |
| `/treatments/degenerative-disc-disease-surgery-details` | **29** |

All four are in the sitemap. Site-wide median inbound is 0 — 387 of 703 pages have none,
essentially all of them the area-of-pain set that is now noindexed or canonicalised away.
These four are among the *best*-linked pages on the site.

"Discovered – currently not indexed" for a page with 47 inbound links from indexed pages is
Google **choosing not to fetch**, not failing to find. That is a crawl-budget and quality
decision, and it is consistent with the tier-level deprioritization. Adding more internal
links would not change it.

---

# 11. Internal-link distribution — concentration concern refuted

Raised from URL Inspection referring-page data: `/conditions/knee-instability` appeared as a
referring page for 11 of 32 inspected URLs and `/treatments/revision-spinal-surgery` for 12,
which looked like two pages carrying an unusual share of the site's internal linking.

Measured against server-rendered HTML across all 703 built pages:

| Page | Outbound internal links |
|---|---|
| `/conditions/knee-instability` | **51** |
| `/treatments/revision-spinal-surgery` | **65** |
| — site median | **60** |
| — templated-tier median (246 pages) | **57** |
| — templated-tier range | 47 – 118 |

**Neither is an outlier.** Both sit inside the normal band. Their frequent appearance as
referrers is a sampling artifact: every templated page links to roughly 50–65 siblings, so
in a 32-URL sample drawn from that same tier, any given page will show up as a referrer for
a third of them. There is no link-concentration problem and no workstream is warranted.

The genuine structural finding is the inverse, and it is already handled: **387 of 703 pages
have zero inbound internal links**, essentially all of them the `/area-of-pain/*` set, which
is now either cross-canonicalised to `/conditions` or noindexed. `NavBar.tsx` and all three
dropdowns are `'use client'`, so their 21 area-of-pain references never reach server HTML —
which is why those pages were orphaned in the first place.

Out-degree above 100 occurs on 34 pages, all of them hubs by design: `/sitemap` (302), the
five state pages (186 each), `/treatments` (159), and the location pages (~159 each).

---

# 12. Runbook corrections

**URL Inspection cannot be deep-linked.** The deep-link inspection URL format returns 404 —
the live route uses an opaque hashed `id`. The Search Console search-bar fallback is the only
reliable method. Inspection is a UI action requiring Search Console access; it cannot be
automated from this repo.

**Verify page state by inspection, never by the Pages export.** URL Inspection is more
current than the Pages report. Two pages in the 2026-09-01 crawled-not-indexed export
inspect as indexed or never-crawled. The 137 figure is a lagging snapshot.

**`grep -c` returning zero exits 1.** Chaining `grep -c … && npm run build` silently skips
the build and reports the grep's exit status, which produced a spurious "BUILD EXIT: 1" and
a stale page count during this sprint. Run builds in isolation and capture `$?` directly.

**Run `tsc` only after a build.** `tsconfig.json` includes `.next/types/**/*.ts`, and those
route types exist only after a build. A cold-checkout `tsc` under-reports — that is how this
project's baseline was mistaken for 49 when a fresh build reports 50.

**Use `npx tsx`, not `node`, for the generator scripts.** They import `clinics.tsx`;
`prebuild` invokes them through tsx. `node scripts/generate-clinics-for-map.mjs --check`
fails with `ERR_UNKNOWN_FILE_EXTENSION` and is not a repo bug.

---

# 13. Visual audit — 33 pages × 3 viewports (2026-09-02)

Run with `scripts/visual-audit-sprint.mjs` against a production build. Every surface this
sprint touched, one representative per change class. Screenshots plus structural checks,
because screenshots alone do not catch what a bulk string sweep can break.

## Result: 99 page/viewport combinations, 0 defects introduced by this sprint

| Check | Result |
|---|---|
| HTTP status | **200 on all 33 pages** |
| Horizontal overflow | **0** at every viewport |
| `<h1>` count | **exactly 1** on every page |
| Skipped heading levels | **0** |
| Images with no `alt` attribute | **0** |
| Literal markdown links (`](/treatments/…`) | **0** |
| Literal `<a href=` rendered as text | **0** |
| Stray `**` from bold-markdown edits | **0** |
| Empty headings | 5, on one pre-existing page (below) |
| Outcome claims in rendered text | **0** |
| Neurosurgery references | **0** |
| Canonical present | **all 33** |

The bulk-edit failure modes are the ones that mattered here — Commits 11 and 14a rewrote
~150 strings across five data files, and a single unbalanced tag or unconverted markdown
link would have shipped as visible garbage. None did.

Forward links verified as real anchors on all four supporting pages. The DDD `-details`
link carries the auto-linker's class rather than an inline one, confirming the deliberate
choice to leave that one as plain text (its body had no anchors, and adding one would have
tripped the "already has links, stop auto-linking" branch).

## Three findings, all pre-existing

**React error #418 (hydration mismatch) on a subset of treatment pages.** Initially looked
like mine — all three flagged pages were ones I had edited. Probing pages I never touched
settled it: `/treatments/hip-labral-repair`, `/treatments/total-hip-replacement`,
`/treatments/knee-osteotomy` and `/treatments/partial-knee-replacement` all error, while
`/treatments/spinal-fusion` — which this sprint *did* edit — is clean. **Not caused by this
sprint.** Worth its own investigation; a hydration mismatch means React discards the
server-rendered subtree and re-renders on the client.

**5 empty `<h3>` elements** on `/area-of-pain/foot-pain/heel-pain-plantar-fasciitis`. The
canonical `/conditions/plantar-fasciitis` is clean and the back-pain AoP variant is clean,
so it is isolated to the foot-pain variant. That page is now noindexed, so the SEO impact is
nil, but it is a rendering defect.

**One 404 resource** on `/locations/pennsylvania/philadelphia-walnut-orthopedics` — did not
reproduce on retry. Transient.

## 🔴 Correction: Atlanta *does* display and schema-assert opening hours

An earlier entry in this project's notes stated that Atlanta's absent `hoursDisplay` meant
the page and schema "stay silent rather than inventing them." **That was wrong, and the
visual audit caught it.**

`components/LocationNAP.tsx:13`:

```ts
const hours = clinic.hoursDisplay === undefined ? LOCATION_HOURS_DISPLAY : clinic.hoursDisplay;
```

The fallback is inverted from what was assumed: **`undefined` means show the sitewide
default**, not hide the field. Only an explicit value overrides it. So Atlanta renders
"Hours: 8AM–8PM, 7 days/week" and emits a matching `openingHoursSpecification`, identical to
established clinics.

This is a **sitewide pattern, not an Atlanta bug** — only **1 of 24** clinics sets
`hoursDisplay` explicitly; the other 23 inherit `LOCATION_HOURS_DISPLAY`.

For established offices that is presumably accurate practice policy. For Atlanta it is an
operating-hours claim, in structured data, for an office with no GBP, no reviews, and
deliberately unset GBP fields — i.e. an office nobody has verified the hours of.

**Needs a business answer, not a code change.** If 8AM–8PM 7 days is genuinely practice-wide
and Atlanta is staffed accordingly, the current output is accurate and nothing needs doing.
If it is not, this is fabricated hours on a live location page and in schema — the exact
class of claim the content rules forbid. Suppressing it is a one-line change to
`LocationNAP.tsx` plus the schema builder; do not make it without confirming the fact.

---

# 14. Hydration errors — measured, cross-referenced, and refuted as an exclusion driver

## The scan

`scripts/hydration-scan.mjs`, all 246 templated pages against a production build.

| Tier | Pages | React #418 | Rate |
|---|---|---|---|
| `/conditions/*` | 124 | **0** | **0.0%** |
| `/treatments/*` | 122 | **40** | **32.8%** |
| **Total** | **246** | **40** | **16.3%** |

Every error is React **#418** — a hydration mismatch, meaning React discarded the
server-rendered subtree and re-rendered on the client.

## 🔴 Cross-reference: hydration does NOT drive exclusion

Two independent cuts, and both run *against* the hypothesis.

**By tier** — the tier with **zero** hydration errors is excluded **more**:

| Tier | Hydration error rate | Exclusion rate |
|---|---|---|
| `/conditions/*` | **0.0%** | **56%** (70/124) |
| `/treatments/*` | **32.8%** | **43%** (53/122) |

**By body part** — exclusions were reported clustering 12 shoulder, 10 knee, 10 hip.
Hydration errors by the same cut:

| Body part | Hydration errors (treatments) | Reported exclusions |
|---|---|---|
| **shoulder** | **0** | **12 — the most** |
| knee | 7 (all 7 knee treatment pages) | 10 |
| hip | 7 | 10 |

**Shoulder has the highest exclusion count and zero hydration errors.**

The correlation is absent on one cut and inverted on the other. **Hydration failure is not
what is driving exclusion.** The content-quality hypothesis survives, and Commit 12 remains
the test worth running.

This is a confound to control for in the pilot, and a real defect worth fixing — but it is
not a cheaper alternative to the content work.

*Caveat: this is tier- and region-level (ecological) inference. A page-level join needs the
137-URL excluded export, which is not in this repo. The two cuts agreeing in direction makes
the conclusion robust, but a page-level check would settle it.*

## Diagnosis (report only — deliberately not fixed this sprint)

- **100% confined to `/treatments/*`.** Zero condition pages error, at any body part.
- **89% correlate with block-level HTML** (`<p>`, `<ul>`, `<div>`) inside the record's body
  fields: 32 of the 40 erroring pages have it, against 36 records that do.
- **The templates differ in exactly one relevant way.** The treatment template renders
  content into an `<li dangerouslySetInnerHTML>` host; the condition template only ever uses
  `<div>`. Injecting block-level markup into an `<li>` lets the browser reparent the DOM,
  which is precisely what produces a hydration mismatch.
- **Not `RichTextContent`** — that component was the first hypothesis and is refuted: it is
  used only by the condition template, which has a 0% error rate.

Clustering by region is consistent with this: erroring pages are knee (7/7), hip (7), and
hand/elbow (8); shoulder, spine and foot/ankle treatment pages are clean.

**Not fixed here because a fix would touch pages in both experimental arms mid-experiment.**
First item for the next sprint, with the above as the starting point.

## Pilot rebalance — required, and constrained

The arms are imbalanced on hydration status:

| Arm | Erroring | Clean |
|---|---|---|
| Treatment | 2 of 7 (`arthroscopic-knee-surgery`, `knee-cartilage-restoration`) | 5 |
| Control | **4 of 7** (`knee-osteotomy`, `partial-knee-replacement`, `total-knee-replacement`, `knee-ligament-repair`) | 3 |

29% vs 57%. Unbalanced on a variable that is not the treatment.

**Hard constraint: every one of the 7 knee treatment pages errors.** There is no
hydration-clean knee treatment page to swap in, and the control arm was knee-heavy. Knee
must therefore be dropped from both arms, or the arms matched on rate instead.

**Recommended: rebuild both arms from the clean regions** — shoulder, spine and foot/ankle
treatment pages have a **0%** error rate and offer 29 clean candidates:

| Region | Clean & untouched | Erroring |
|---|---|---|
| spine | 11 | 0 |
| foot/ankle | 13 | 0 |
| shoulder | 5 | 0 |
| hip | 2 | 7 |
| hand/elbow | 5 | 8 |
| knee | 1 (a condition page) | 7 |

**Final selection still requires URL Inspection** to confirm each candidate is
`Crawled – currently not indexed`. That cannot be obtained from this repo. The pool above is
filtered on the two criteria that can be verified here — hydration-clean, and untouched by
this sprint beyond the compliance edit.

---

# 15. PILOT — FINAL LOCK (2026-09-02). Supersedes §8.

5v5, matched on region and hydration status, zero knee or hip. **§8's 7v7 lock is void.**

## Two proposed slugs failed verification and were replaced

| Proposed | Problem | Replacement |
|---|---|---|
| `sacroiliac-joint-injection` | **hydration ERROR** — it is one of the 40. It sits in the "erroring without block tags" subgroup of injection pages, which is why it was not obvious. | `anterior-cervical-corpectomy-and-fusion` (spine, clean, untouched by 14a) |
| `acromioplasty` | **Received a rich, non-minimal 14a replacement.** At sweep time it was not a pilot page, so it got the full treatment — a long answer on the procedure's contested evidence base. As a control that violates the minimal-edit condition. | `shoulder-fracture-surgery` (shoulder, clean, untouched by 14a) |

## Treatment arm — full differentiation

| Slug | Region | Hydration | Sprint scope |
|---|---|---|---|
| `/treatments/spinal-fusion` | spine | clean | Commit 8 |
| `/treatments/cervical-laminectomy` | spine | clean | Commit 8 |
| `/treatments/endoscopic-discectomy-surgery` | spine | clean | Commit 8 |
| `/treatments/motion-preservation-spine-surgery` | spine | clean | **new — one extra page** |
| `/treatments/shoulder-arthroscopy` | shoulder | clean | Commit 9 |

## Control arm — minimal compliance edit only

| Slug | Region | Hydration | 14a edit |
|---|---|---|---|
| `/treatments/hybrid-cervical-spine-surgery` | spine | clean | none |
| `/treatments/vertebroplasty` | spine | clean | none |
| `/treatments/lumbar-decompression` | spine | clean | benefits bullet, minimal |
| `/treatments/anterior-cervical-corpectomy-and-fusion` | spine | clean | none |
| `/treatments/shoulder-fracture-surgery` | shoulder | clean | none |

**Composition matched: 4 spine + 1 shoulder on both sides. All ten hydration-clean.**

## Matching criteria applied

1. ✅ **Hydration-clean** — verified in `scripts/hydration-scan.mjs`; all ten.
2. ⚠️ **`Crawled – currently not indexed`** — **NOT VERIFIED.** Requires URL Inspection,
   which cannot be run from this repo. **Blocking: confirm all ten before deploying.** The
   Pages export is a lagging snapshot — `reverse-shoulder-replacement` appeared in it and
   inspects as indexed.
3. ✅ **No control page touched beyond the compliance edit** — the two failures above were
   caught by this check.
4. ⚠️ **Last-crawl date** — record per page at lock time; treat crawl-latency spread as a
   documented confound. Do not correct for it on n=5.
5. ✅ **Commit 13 dependency cleared** — `sacroiliac-joint-injection` is out of the arm
   entirely, so whether the injections LPs use it as a content source no longer matters.

## Excluded from both arms

- **All knee and hip pages** — every one of the 7 knee treatment pages errors, and hip is
  7 erroring / 2 clean. No clean knee candidate exists.
- `degenerative-disc-disease-surgery`, `shoulder-replacement`,
  `resurfacing-shoulder-replacement` — touched by Commit 11.
- `reverse-shoulder-replacement` — indexed; cannot measure exit from a state it is not in.
- `/conditions/cervical-herniated-disc` — never crawled; different failure mode.
- `revision-spinal-surgery` — anomalous internal-link weight (referring page for 12 of 32
  inspected URLs).
- `sacroiliac-joint-injection`, `acromioplasty` — see the failure table above.

## Read criteria at 60–90 days

| Outcome | Conclusion |
|---|---|
| Treatment exits Crawled-not-indexed, control does not | Remedy works — scale to the tier |
| Neither moves | Remedy is wrong — ~246 rewrites avoided |
| Both move | Something else changed — test void, annotate and re-run |

**Success metric is indexation, not ranking position.** n=5 per arm is a directional read,
not a powered test; a matched five is worth more than an unmatched seven.

---

# 16. PILOT — DEFINITIVE LOCK (2026-09-02). Supersedes §8 and §15.

**§8 (7v7) and §15 (5v5 with two invalid slugs) are both VOID.** This is the lock.

## Rejected candidates and why

| Slug | Rejected because |
|---|---|
| `anterior-cervical-corpectomy-and-fusion` | **Not in the crawled-not-indexed export** — some other index state. Same failure that put `reverse-shoulder-replacement` in and took it out. |
| `shoulder-fracture-surgery` | Same — not in the export. |
| `sacroiliac-joint-injection` | **Hydration ERROR.** Sits in the "erroring without block tags" injection subgroup. |
| `acromioplasty` | **Received the rich, non-minimal 14a replacement** (it was not a pilot page at sweep time). Disqualified as a control. |

**Correction carried:** "spine (11), shoulder (5), foot/ankle (13)" was a count of clean
*candidates*, not region-level cleanliness. `sacroiliac-joint-injection` proves spine is not
uniformly clean. **Region is a heuristic; every candidate below was verified individually.**

## Treatment arm — full differentiation (Commits 8 and 9)

| Slug | Region | Hydration | Index status | Written in |
|---|---|---|---|---|
| `/treatments/spinal-fusion` | spine | clean ✓ | crawled-not-indexed | Commit 8.1 |
| `/treatments/cervical-laminectomy` | spine | clean ✓ | crawled-not-indexed | Commit 8.2 |
| `/treatments/endoscopic-discectomy-surgery` | spine | clean ✓ | crawled-not-indexed | Commit 8.3 |
| `/treatments/motion-preservation-spine-surgery` | spine | clean ✓ | crawled-not-indexed | Commit 8.4 |
| `/treatments/shoulder-arthroscopy` | shoulder | clean ✓ | crawled-not-indexed | Commit 9.1 |

## Control arm — 14a minimal compliance edit only

| Slug | Region | Hydration | Gate 3: what 14a did |
|---|---|---|---|
| `/treatments/hybrid-cervical-spine-surgery` | spine | clean ✓ | no 14a edit |
| `/treatments/vertebroplasty` | spine | clean ✓ | no 14a edit |
| `/treatments/lumbar-decompression` | spine | clean ✓ | one `benefits` line: outcome claim → mechanism statement (see addendum) |
| `/treatments/kyphoplasty` | spine | clean ✓ | no 14a edit |
| `/treatments/biceps-tenodesis` | shoulder | clean ✓ | no 14a edit |

**Composition matched: 4 spine + 1 shoulder per arm. All ten individually hydration-verified.**

### Selection reasoning for the two open slots

**Spine slot — `kyphoplasty` chosen over `plif`.** PLIF is a lumbar fusion technique, and
`spinal-fusion` sits in the treatment arm receiving heavy differentiation. Putting a fusion
technique page in the control risks a **new** interaction created by this sprint — the
differentiated parent absorbing the specific technique — which would depress the control for
a reason unrelated to the treatment. Kyphoplasty and vertebroplasty are near-twins and may
interact with each other, but that relationship already exists in production and is stable.
**Prefer a pre-existing stable interaction over one this sprint introduces.**

**Shoulder slot — `biceps-tenodesis` chosen.** `labral-repair-shoulder` and
`shoulder-instability-surgery` are both labral/instability procedures performed
arthroscopically, and `shoulder-arthroscopy` is the treatment-arm page. Biceps tenodesis is
the most functionally distinct of the three, minimising interaction with the page being
differentiated.

### Addendum — byte-level control diff, 2026-09-06

`control_diff` compared every control record (treatments.tsx + treatmentFAQs.ts) against
`upstream/main` before push. Findings, correcting the assumptions above where they differ:

| Control | Delta vs production |
|---|---|
| `hybrid-cervical-spine-surgery` | **byte-identical** |
| `vertebroplasty` | **byte-identical** |
| `kyphoplasty` | **byte-identical** |
| `lumbar-decompression` | Georgia state-list sweep (3 strings) + one outcome-claim line replaced |
| `biceps-tenodesis` | Georgia state-list sweep (1 string) only |

Two earlier claims corrected by this diff: the Georgia sweep was **not** symmetric across
arms (it only touched records carrying the state-list string — three controls carry none),
and `lumbar-decompression`'s Gate 3 cell previously read "no 14a edit" when it has exactly
one minimal compliance line. Neither finding voids the pilot: the lumbar-decompression edit
is the permitted minimal class, and the recrawl consequence is recorded as downgraded
Limitation 4. The 2026-09-06 hydration re-scan confirms all ten locked slugs remain clean
(the sitewide population is unchanged at 40/246; the six erroring pages tagged
TREATMENT/CONTROL in `hydration-scan.json` are stale labels from the retired 7v7 lists,
none of them a locked slug).

## Gate results — all ten

1. **Hydration-clean** — ✓ all ten, verified individually, not by region.
2. **Untouched by differentiating commits** — ✓ none is touched by Commits 8, 9 or 11.
   ~~All were touched by the Georgia meta-title sweep~~ **Corrected 2026-09-06 by byte-level
   diff:** the sweep only touched records carrying the state-list string. Three controls
   (`hybrid-cervical-spine-surgery`, `vertebroplasty`, `kyphoplasty`) carry none and are
   **byte-identical to production**. See the addendum below.
3. **14a minimal, not rich** — ✓ four control pages received no 14a edit;
   `lumbar-decompression` received exactly one line ("High success rate for relieving
   radiating leg symptoms" → "Targets the compression causing radiating leg symptoms"),
   which is the permitted minimal class. None received a rich replacement. This gate
   rejected `acromioplasty`.

## Known limitations, recorded

1. **Index status is export-derived, not inspection-verified.** The export is a lagging
   snapshot — `reverse-shoulder-replacement` appeared in it and inspects as indexed. Not
   blocking; spot-check later.
2. **Crawl-latency spread.** Record last-crawl dates at deploy; do not statistically correct
   on n=5.
3. **"More differentiated" and "longer" are not fully separable.** Rich replacements add
   words to treatment pages and roughly none to controls.
4. **Recrawl confound PARTIALLY resolved — downgraded 2026-09-06.** The single-PR decision
   still prevents the two-edits-vs-one asymmetry a split PR would have created. But the
   byte-level control diff shows the "editing both arms makes recrawl common to both"
   premise does not hold: **5/5 treatment pages are edited, only 2/5 controls are**
   (`lumbar-decompression`, `biceps-tenodesis`). The three byte-identical controls get no
   edit-triggered recrawl and will be revisited on Google's own schedule. At read time,
   compare the treatment arm against the edited and untouched controls **separately** —
   if those two control groups diverge, "was edited at all" is live as a variable.

## Read criteria — 60–90 days from deploy

| Outcome | Conclusion |
|---|---|
| Treatment exits Crawled-not-indexed, control does not | Remedy works — scale to the tier with a proven template |
| Neither moves | Remedy is wrong — ~246 rewrites avoided |
| Both move | Something else changed — test void, annotate and re-run |

**Success metric is indexation, not ranking position.** n=5 per arm is a directional read.

---

# 17. Meniscus: the opportunity is gated on crawl, not on content

**Do not read a null result on these pages as a content failure.**

`meniscus surgery` is the best opportunity in the entire keyword set — **14,000 volume,
KD 0, traffic potential 12,000**, the best difficulty-to-potential ratio of anything pulled.
Both pages that target it are **Discovered – currently not indexed**: Google knows they
exist and has never fetched them.

| Page | GSC state |
|---|---|
| `/treatments/meniscus-surgery` | Discovered – never crawled |
| `/treatments/meniscus-repair-surgery` | Discovered – never crawled |

**Content cannot fix a page Google has not fetched.** Commit 9 wrote the content anyway so
it is right when the crawl comes, but the gating factor is crawl prioritisation.

Internal linking has been ruled out as the cause: 11c measured **47 and 45 inbound
server-rendered internal links** respectively, against a templated-tier median of 41 and a
site-wide median of 0. Both are in the sitemap. These are among the better-linked pages on
the site.

That leaves crawl prioritisation on a tier Google has deprioritised — the same diagnosis
that explains the 123 crawled-and-refused pages, expressed one step earlier in the funnel.
It is consistent with, not separate from, the core-update finding.

**Implication for the pilot:** if the differentiation remedy works and the tier's standing
recovers, these pages should begin to be crawled. If they are still uncrawled at 90 days
while treatment-arm pages have moved, that is a distinct signal worth investigating on its
own — but it is not evidence about the content written here.

---

# 18. Additional pilot confound — inbound internal link asymmetry

Measured after the location and state priority-slug repairs (2026-09-03):

| Arm | Page | Inbound pages linking it |
|---|---|---|
| Treatment | `spinal-fusion` | 97 |
| Treatment | `shoulder-arthroscopy` | 54 |
| Treatment | `motion-preservation-spine-surgery` | 40 |
| Treatment | `endoscopic-discectomy-surgery` | 9 |
| Treatment | `cervical-laminectomy` | 7 |
| | **treatment mean** | **41.4** |
| Control | `biceps-tenodesis` | 44 |
| Control | `lumbar-decompression` | 31 |
| Control | `hybrid-cervical-spine-surgery` | 17 |
| Control | `kyphoplasty` | 9 |
| Control | `vertebroplasty` | 7 |
| | **control mean** | **21.6** |

**The treatment arm is roughly twice as well linked internally as the control arm.**

**This is pre-existing structure, not something this sprint created.** Verified: the
priority-slug repairs in `LocationSeoSections.tsx` and `StateSeoSections.tsx` changed the
inbound count of **zero** of the ten pilot slugs (delta +0 on every one), because both pilot
treatment-arm pages that could have been added — `cervical-laminectomy` and
`shoulder-arthroscopy` — were deliberately kept out of the priority lists for exactly this
reason.

**Why it matters.** Internal links are one signal Google uses to judge which pages a site
considers important. If treatment-arm pages exit Crawled-not-indexed and controls do not,
better internal linking is a competing explanation alongside differentiation.

**Why it is not disqualifying.** The gap is driven by `spinal-fusion` at 97, which is a hub
page linked from most of the treatment tier. Excluding it, the treatment mean is 27.5 against
the control's 21.6 — a much smaller difference. And the direction of the confound is known
and can be stated when the result is read, which is the standard being applied to the other
three confounds.

**Do not attempt to equalise it.** Adding links to control pages to balance the arms would
mean editing control pages beyond the compliance edit, which voids the experiment outright.
An asymmetry that is documented is better than one that is engineered away.
