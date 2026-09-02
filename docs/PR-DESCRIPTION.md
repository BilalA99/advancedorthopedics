# SEO, schema and content-integrity sprint

**Base:** `upstream/main` @ `5c99f1b` · **Head:** `pa-ga-phone-and-atlanta-wiring`
**55 commits · 214 files · working tree clean**

## Summary

This PR lands the Georgia/Atlanta launch, a clinically grounded provider-selection system,
six new providers, internal-link and canonical hygiene, and a content-integrity sweep that
removes **111 unsourced medical outcome claims** from the data layer — 41 of which were
being served to Google as `FAQPage` structured data. It also carries the diagnosis of record
for the December 2025 ranking collapse, arrived at by refuting three competing hypotheses
(see `docs/seo/post-launch-measurement.md`).

Four planned commits were **retired after measurement refuted their premise**, and that is
recorded rather than quietly dropped.

---

## ⚠️ Deploy the measurement commit separately

> Deploy Commit 7 separately from the rest of this PR, and complete the GTM cutover
> checklist below **before** the code deploys. Reported Google Ads conversions are expected
> to fall roughly 10–25% once duplicate events and the `/thank-you` pageview trigger are
> removed. `Count: One conversion` on `Thank You Page GTM` already dedupes within a click,
> so this is a correction, not a collapse. Take a 14-day pre-fix baseline per campaign and
> per conversion action first, then hold a 21-day change freeze and judge performance on the
> manual PPO tracker, not on platform-reported conversions.

*(Commit 7's remaining scope — 7b PII hashing and 7d `landing_path` — is not in this PR. The
cutover checklist below applies whenever it ships.)*

### GTM cutover — required pre-deploy, not included in this PR

**Order is non-negotiable: GTM leads, code follows.** Production currently fires
`form_submit`; the survivor in this branch is `lead_form_submit_success`.

1. In GTM, add a trigger on `lead_form_submit_success` **alongside** the existing
   `form_submit` trigger. Point the same tags at both. Publish. Nothing double-fires because
   only one event name is ever actually pushed.
2. Repeat for the state-filtered triggers `form_submit_FL` / `_NJ` / `_NY` (filtered on
   `DLV - state`) and for `Lead Submit Form Enhanced`.
3. **Then** deploy the code.
4. Confirm conversions flow on the new event for 48 hours.
5. **Then** remove the `form_submit` triggers, the `/thank-you` pageview conversion trigger,
   and the four orphaned zero-tag triggers (`Form Subm`, `Form Submission`, `History
   Change`, `Thank You Page Trigger`).

---

## Root cause of record — the December 2025 collapse

> **December 2025 Google broad core update** (launched Dec 11, completed Dec 29; volatility
> waves Dec 13 and Dec 20; YMYL sectors hit hardest; explicitly targeted content created to
> rank in search rather than to help people) → the templated `/conditions` and `/treatments`
> tiers were algorithmically deprioritized **on content quality, not deduplicated against one
> another** → 123 of ~246 templated pages were crawled, assessed, and judged not worth
> indexing → top-3 keywords 118 → 0.
>
> **Ruled out:** manual action (GSC clean), security issue (GSC clean), backlink penalty
> (DR rising), technical regression (no deploy at the inflection; the decline is a smooth
> five-week glide, not a cliff), and the `/area-of-pain/*` duplicate theory (0 of 137
> excluded URLs are area-of-pain; the routes predate the collapse by six months and rankings
> rose 0 → 96 while they existed).
>
> **Sibling deduplication is refuted:** across 32 inspected URLs, zero pages were
> canonicalized onto a template sibling. All 9 canonical "mismatches" were an inspection
> artifact, not a missing tag.

| Tier | Total | Excluded | Share |
|---|---|---|---|
| `/conditions/*` | 124 | 70 | **56%** |
| `/treatments/*` | 122 | 53 | **43%** |
| **Combined** | **246** | **123** | **50%** |

Decline onset is **2025-12-18/19**, pinned to daily resolution. No code deployment sits at
the inflection.

---

## Commits and revert risk

| # | Commit | Revert risk |
|---|---|---|
| 1 | `6b76a8f` RLS migration already applied to production | **None** — file only; DB already has it. Do not re-apply. |
| 2 | `33158ba` Generated data files | None — regenerable |
| 3 | `41156e2` Internal link canonicalisation | Low — additive resolver + 2 redirect fixes |
| 3b | `d8d3103` Area-of-pain canonical resolution | **Medium** — changes indexability of 389 pages. Reversible; retires no URL. |
| 3c | `0aaccac` `params` type fix | None — one type annotation |
| 5 | `a711300` Georgia copy sweep | Low — 674 meta titles, mechanical |
| 6 | `0602df2` Provider selection | **Medium** — changes which physicians appear sitewide. Fail-safe hides the module rather than showing a wrong provider. |
| 8a | `7bc5f6c` `additionalSections` on treatments | **None** — provably inert; no record sets the field |
| 11 | `5d38493` Cannibalization + self-link fix | Low |
| 14a | `6c5b9cb` **Remove 111 outcome claims** | Low to revert, but **reverting reinstates unsourced medical claims** — treat as one-way |
| 15 | `e0d2bdf` CI typecheck gate | None |
| — | `7d64ca7` Six providers; orthopedic-only positioning | **Medium** — new provider records and schema type change for PAs |
| — | `877dfb3` Scoliosis LP; review-provenance schema | Low — new route, gated schema |
| — | `6cfc6cd` Schema/metadata/lead-contract hardening | Low — grouped small changes |

---

## Indexation prediction — how to judge this

**Commits 8, 9, 10 and 12 are measured on exit from Crawled-not-indexed over 60–90 days, not
on ranking position over 30 days.** Judging them on rank at 30 days fails them for the wrong
reason.

The area-of-pain canonical work (3b) is expected to improve **crawl efficiency and index
hygiene, not rankings**. Those pages were not causing the December collapse — the routes
predate it by six months and rankings rose while they existed.

## Differentiation pilot

Locked by slug in `docs/seo/post-launch-measurement.md` §8. Seven treatment-arm pages get
full differentiation; seven control-arm pages get the **compliance edit only**.

Controls are edited rather than left untouched because any edit triggers a recrawl — an
untouched control would confound "differentiation worked" with "Google came back and
looked." The 14a sweep ran across both arms for exactly this reason.

Four pages in the two arms are still marked **UNVERIFIED** and must be confirmed as
`Crawled – currently not indexed` by URL Inspection before the pilot deploys. If any is
indexed or discovered-only, swap it rather than edit it.

---

## Outstanding business inputs

- **Atlanta local phone** — currently `(404) 913-6886`; confirm it is correct and staffed.
- **Atlanta GBP fields** — `placeId`, `cid`, `placeUrl`, `embedSrc`, Place `lat`/`lng`.
  Create at `https://business.google.com/create`; suite goes in the address, not the
  business name; primary category `Orthopedic surgeon`; video verification likely.
  **Do not change the URL when the GBP is attached.**
- **Atlanta on-site physicians and confirmed services** — the clinic record deliberately
  carries no `hoursDisplay` because hours were never confirmed. Unknown fields stay unset.
- **A named physician reviewer** for `reviewedBy`. Until one exists, `reviewedAt` and
  `reviewedBy` stay unset sitewide and the schema stays silent. It must never invent a name.
- **`lumbar scoliosis` (4,800 vol) is on HOLD** pending the SERP-overlap test in
  `docs/seo/scoliosis-query-page-map.md`.
- 🔴 **Operating hours are published from a default, not a per-location fact.**
  `components/LocationNAP.tsx:13` reads
  `clinic.hoursDisplay === undefined ? LOCATION_HOURS_DISPLAY : clinic.hoursDisplay` —
  so an unset field means **render the sitewide default**, not stay silent. **Only 1 of 24
  clinics sets it explicitly**; the other 23 inherit "8AM–8PM, 7 days/week" and emit a
  matching `openingHoursSpecification` in structured data.
  > **Are 8AM–8PM, 7 days/week the actual operating hours at all 24 locations including
  > Atlanta? If any location differs, `hoursDisplay` must be set explicitly on that clinic
  > record, and the website hours must match what that location's Google Business Profile
  > publishes.**

  Two distinct risks. **Atlanta** is an operating-hours claim in structured data for an
  office with no GBP, no reviews, and deliberately unset GBP fields — nobody has verified
  it. **The other 22 inheriting clinics** risk publishing incorrect hours, which also
  creates a website-to-GBP mismatch; that consistency is a local ranking input, so an
  inconsistency costs visibility independent of accuracy. No code changed.
- 🔴 **"Same-day" vs "same-week" contradiction.** Site copy promises same-day appointments
  (`clinics.tsx:138, 175, 182, 190, 626–627, 651, 655`); approved ad copy says same-week.
  Deliberately not edited — this is an operational claim, not a marketing adjective. If the
  practice genuinely offers same-day, removing it costs conversions; if it does not, it is a
  promise the front desk breaks on every call. **Needs a business answer, not a code change.**
- **Sharmez Savory PA-C has no confirmed practice location** — `locations: []`. Joseph
  Cunningham's were narrowed by inference from NY/NJ licensure and a Brooklyn-based career.

---

## Out of scope, logged for follow-up

- **Location page template sameness.** Full analysis in
  `docs/seo/location-page-duplication-audit.md`. Two clinical paragraphs repeat across 20–22
  of 24 location pages with only the city swapped. The outcome claim inside one of them is
  fixed in 14a; the paragraph rewrite is its own sprint and **must not run during the
  Commit 12 observation window** or the pilot's control group is contaminated. Sequence
  Philadelphia first — three near-identical pages, one city, 1,490 combined impressions and
  zero clicks.
- **`/find-care/book-an-appointment`** — 447 impressions, 0 clicks at position 9.7. 63% of
  impressions are brand-navigational, where the homepage and GBP already hold positions 1–3
  and this page is a redundant second listing. It ranks **position 1.0** on genuine
  commercial queries (`hand doctor near me`, `spine specialists in my area`) with 1–2
  impressions each. It needs non-brand impression volume, which is a content and
  internal-linking problem, not a metadata one. **Do not rewrite the title.**
- **11 excluded blog URLs** — blog content lives in production Supabase, not this repo.
  `components/data/blogs.ts` is a stale decoy with 6 unrelated entries that nothing renders.
- 🔴 **React #418 hydration mismatches on 40 of 246 templated pages (16.3%)** — pre-existing,
  quantified, diagnosed, and deliberately **not fixed in this sprint** because a fix would
  touch pages in both experimental arms mid-experiment. **First item for the next sprint.**
  Confined entirely to `/treatments/*` (0 of 124 conditions, 40 of 122 treatments); 89%
  correlate with block-level HTML in the record body; the treatment template renders into an
  `<li dangerouslySetInnerHTML>` host where the condition template only uses `<div>`.
  **Cross-referenced and refuted as an exclusion driver** — the tier with zero hydration
  errors (`/conditions`, 56%) is excluded *more* than the tier with 32.8% (`/treatments`,
  43%), and shoulder has the highest exclusion count (12) with zero hydration errors. Full
  analysis in `docs/seo/post-launch-measurement.md` §14.
- **5 empty `<h3>` elements** on `/area-of-pain/foot-pain/heel-pain-plantar-fasciitis` —
  pre-existing, isolated to the foot-pain variant (the canonical `/conditions/plantar-fasciitis`
  is clean), page is now noindexed so SEO impact is nil. Logged.
- **387 of 703 pages have zero inbound internal links** — essentially all the area-of-pain
  set, now noindexed or canonicalised away. `NavBar.tsx` and all three dropdowns are
  `'use client'`, so their 21 area-of-pain references never reach server HTML.
- **Superlatives** in `clinics.tsx` (`world-class`, `top-tier`, `renowned`, `top-rated`) —
  specified for Commit 14, not yet applied.

## Not in this PR

- **Commit 7** — 7b PII hashing, 7d `landing_path`
- **Commits 8, 9, 10, 12** — the differentiation content and pilot
- **Commit 13** — three injections landing pages
- **Commit 14** — PT positioning and superlatives
- **Phase E** — `temur/insurance-copy`, gated on approval, must never merge here

---

## Verification

```
npm run build          exit 0, 751/751 static pages
npx tsc --noEmit       49 errors — unchanged pre-existing baseline, all in
                       scripts/ and temp_conditions_old.tsx
npm run test:measurement   9/9
sitemap                339 URLs
canonical audit        703 pages, 0 missing a canonical
FAQPage schema         122 blocks, 539 questions, 0 malformed
outcome claims         0 remaining in any data file
neurosurgery refs      0 across all 751 built pages
redirect chains        0 across all 121 rules
provider resolution    124/124 conditions, 122/122 treatments
```

**Two known QA false positives — do not "fix":** the wide `div.flex` is the existing hero
marquee (`document.scrollWidth` overflow is 0, clipped by design, identical on Florida and
Pennsylvania); the sub-44px tap-target population is shared chrome present sitewide and is
its own accessibility pass.
