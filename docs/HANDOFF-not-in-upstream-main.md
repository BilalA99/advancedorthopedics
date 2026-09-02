# Handoff: everything on this machine that is not in `upstream/main`

**Branch:** `HomeSEO`
**Compared against:** `upstream/main` @ `5c99f1b` (*Merge pull request #84 from AppFlow-Studio/TemurDev*)
**Generated:** 2026-08-31

**Total delta: 170 tracked files changed (+6,883 / −2,396, 1 deleted), plus 12 brand-new
untracked files that `git diff` does not count.**

That splits into two very different piles, and you should treat them differently:

| | What | State | Review effort |
|---|---|---|---|
| **Pile A** | 33 commits already on `HomeSEO` | Committed, message-documented | Normal PR review |
| **Pile B** | 79 modified + 12 new files in the working tree | **Uncommitted** — no commits yet | Needs the most attention |

The 12 untracked files (these are new, and `git status` is the only thing that will show them):

```
app/lp/adult-scoliosis-treatment/layout.tsx      lib/internal-link-redirects.ts
app/lp/adult-scoliosis-treatment/page.tsx        lib/providers/providerRelevance.ts
docs/HANDOFF-not-in-upstream-main.md             scripts/audit-scoliosis-entity-graph.mjs
docs/seo/post-launch-measurement.md              scripts/qa-scoliosis-georgia-responsive.mjs
docs/seo/scoliosis-query-page-map.md             scripts/server-only-stub-loader.mjs
supabase/migrations/…_enable_rls_forms_blogs.sql scripts/visual-audit-shots.mjs
```

Pile B is the 2026-08-30/31 scoliosis + Georgia workstream. It has never been committed, so
`git log` tells you nothing about it. That is what most of this document covers.

---

## ⚠️ Read this first: one change is already live in production

Everything else in this document is local. **This one is not.**

**`supabase/migrations/202608300001_enable_rls_forms_blogs.sql` has already been applied to the
production Supabase project `bwrnnmzqipnoakmdbevz`.** The migration file in the repo is
uncommitted, but the database change is live right now.

**Why it was urgent.** `NEXT_PUBLIC_SUPABASE_ANON_KEY` ships inside the client JavaScript bundle,
so it is public by construction. Both `public.forms` and `public.blogs` had RLS **disabled** while
the `anon` role held `SELECT/INSERT/UPDATE/DELETE/TRUNCATE`, and `pg_policies` was empty for the
whole `public` schema. Anyone who opened devtools could read **all 1,147 patient leads** — names,
emails, phone numbers, insurance type — or truncate the blog.

**What it does.** Access was verified narrow before writing the policies:

| Table | App usage | Policy granted |
|---|---|---|
| `public.forms` | INSERT only — one call site, `components/email/sendcontactemail.ts` | INSERT for `anon`, `authenticated` |
| `public.blogs` | SELECT only — six call sites in `app/blogs/api/*` and `app/blogs/[BlogSlug]/page.tsx` | SELECT for `anon`, `authenticated` |

No SELECT policy on `forms` is deliberate. `service_role` bypasses RLS, so the dashboard and SQL
editor are unaffected — **that is how staff should read leads.** If anything is wired to read leads
with the anon key, it will now get zero rows; nothing in this repo does.

**Verified after applying:** as `anon`, leads visible = **0**, blogs visible = **36**, UPDATE and
DELETE blocked. Row counts unchanged at 1,147 / 36. A live lead was then submitted end-to-end
through `/api/forms/doctor` and persisted correctly (test row deleted afterwards).

**Rollback if lead capture ever breaks:**
```sql
alter table public.forms disable row level security;
alter table public.blogs disable row level security;
```

**Related, not fixed:** there is no service-role key in `.env`. The entire app runs on the anon key.
Any new table will need an explicit policy or it silently returns zero rows.

---

## How to verify after you pull

```bash
npm ci
npx tsc --noEmit          # 50 pre-existing errors; the number must not go up
npm run test:measurement  # 9/9
npm run build             # runs prebuild gates, then 743 static pages
npm start
node scripts/qa-scoliosis-georgia-responsive.mjs   # 5 pages x 9 viewports
```

`npm run build` will fail the build if any of these regress — they run in `prebuild`:

- `scripts/validate-location-data.mjs` — location data integrity (24 clinics, 5 expected warnings)
- `scripts/audit-scoliosis-entity-graph.mjs` — **new**; no duplicated condition headings, no
  clinically mismatched physician, no self-referencing internal links
- `scripts/generate-clinics-for-map.mjs --check` and `generate-taxonomy-index.mjs --check`

> **`next.config.ts` sets `eslint.ignoreDuringBuilds` and `typescript.ignoreBuildErrors`.**
> A green `npm run build` does **not** mean it typechecks. Run `npx tsc --noEmit` separately.
> Baseline is 50 pre-existing errors, unchanged by this work.

---

# PILE B — the uncommitted working tree (79 modified + 12 new)

## B1. Georgia is the 5th state, with an Atlanta office

**Address: 2250 North Druid Hills Rd NE, Suite 124, Atlanta, GA 30329.**

No new route files were written. The `[state]` and `[state]/[location]` templates are fully
data-driven, so Georgia was added through configuration:

| File | Change |
|---|---|
| `lib/stateUtils.ts` | `VALID_STATES`, display names, slug map, `ga` abbreviation, `StateCode`, pathname regex |
| `lib/locationRedirects.ts` | `STATE_METADATA`, `VALID_STATE_SLUGS` |
| `components/data/clinics.tsx` | New clinic `id: 24`, `atlanta-orthopedics`; `StateAbbr`/`StateSlug` unions gain `GA`/`georgia` |
| `lib/state-faqs.ts` | 5 Georgia FAQs |
| `components/NavBar.tsx` | Georgia entry under LOCATIONS |
| `components/CondensedLocations.tsx` | Display name |
| `app/locations/[state]/page.tsx` | `nearbyRegionsByState` |
| `app/locations/LocationsClient.tsx` | State intro copy |
| `components/data/clinicsForMap.generated.ts` | **Regenerated** — do not hand-edit |

Georgia flows automatically into the locations hub, footer, XML sitemap, breadcrumbs, and map.

### Atlanta contains no invented data

`rating: 0`, `reviewCount: 0`, `reviews: []`, no `placeId`/`cid`/`placeUrl`/`embedSrc`, no
`neighborhoodsWeServe`, no landmarks, no parking claims. The schema builder and the on-page reviews
block already guard on those, so nothing fabricated renders or is marked up. **The GBP is still
being created** — when it lands, fill those optional fields on that one clinic object. No template
changes needed. **Do not change the URL when the GBP is attached.**

### Coordinates are verified, not estimated

`lat: 33.829783, lng: -84.332626`, from the **US Census Bureau geocoder**
(`geocoding.geo.census.gov`, `Public_AR_Current` benchmark), which matched
`2250 DRUID HILLS RD NE, ATLANTA, GA, 30329`. That endpoint needs no API key and is the right tool
for any US address here. OpenStreetMap has no house number on that block; an interpolated guess was
~220 m out before this was corrected.

### Hours — a coupling worth knowing about

`ClinicsProps` gained `hoursDisplay?: string | null`. `null` suppresses the visible hours row
**and** omits `openingHoursSpecification` from the schema (`lib/generateLocationSchema.ts`).

Atlanta briefly ran with `hoursDisplay: null` while its hours were unconfirmed. **The practice has
since confirmed the 8AM–8PM, 7-days schedule is identical at every location including Atlanta**, so
the null was removed and both representations are on. The mechanism remains for any future office
that opens before its hours are known.

> Probing this with `grep "Hours: 8AM"` gives a **false negative** — React splits the label and
> value into separate text nodes. Grep for `Hours:` and count.

---

## B2. Physician selection is now clinically grounded (sitewide)

**This is the highest-risk-of-misunderstanding change in the pile. Read this section.**

`shuffleArray(Doctors)` was already gone before this session. What remained was
`selectProvidersForPage` — deterministic, but it picked from the **entire roster regardless of what
the page was about**. A foot-and-ankle surgeon could headline an adult scoliosis page.

**New: `lib/providers/providerRelevance.ts`** adds the missing relationship layer:

```
condition / treatment / body region  →  care domain(s)  →  eligible providers
```

Two rules it enforces:

1. **Provider→domain mappings are derived only from each provider's own verified profile** in
   `components/data/doctors.tsx` (`medicalSpecialty`, `specialties`, `conditionsTreated`). Nothing
   is assigned for SEO reasons. **When a provider's profile changes, update `PROVIDER_DOMAINS` —
   not the page.**
2. If a page resolves to no domain, the caller gets `[]` and **must hide the module**. Every one of
   the 6 call sites is guarded for that. No fallback to an arbitrary physician.

Applied at: `ConditionPage`, `treatments/[TreatmentDetails]`, the three `area-of-pain` routes, and
`injuries/[slug]`.

Within an eligible pool, the existing slug-keyed rotation still applies, so neighbouring pages don't
all show the same two faces, and any given URL is byte-identical across builds.

**Result:** the scoliosis page now features Dr. McCarthy and Dr. Slaughter — both verified for
reconstructive/deformity spine surgery. Audit confirms all 136 conditions and 121 treatments resolve
to clinically appropriate physicians, with zero unresolvable pages.

Guarded by `scripts/audit-scoliosis-entity-graph.mjs` in `prebuild`.

---

## B3. Scoliosis organic build-out

`/conditions/adult-degenerative-scoliosis` is the pillar. Changes:

- **Four new server-rendered question-led H2 sections**, direct-answer-first: back pain/sciatica,
  progression with age, diagnosis (standing X-rays + Cobb angle + MRI), and what type of doctor
  treats it. Delivered via a new optional `additionalSections` field on `ConditionContent` with a
  `placement` key, so they slot into clinical order rather than piling up at the end.
- **H1 is now "Adult Degenerative Scoliosis Treatment"** via a new optional `h1` override. `title`
  stays the canonical entity name for schema, the internal-link map, and condition lists — so
  nothing else had to be renamed.
- **A live duplicated-heading bug was fixed at the function level**, not per page:
  `ensureConditionHeadingIncludesKeyword` was producing *"Non-Surgical Treatment Options for
  Degenerative Scoliosis **for Adult Degenerative Scoliosis**"*. It now also matches on the title's
  head noun. The audit script proves all 136 conditions are clean.
- **Related links deduplicate by slug and can no longer self-link.**
- **Review provenance in schema only** — `lastReviewed` + `reviewedBy`. The content was reviewed by
  a physician at the practice, but no individual was named to attribute it to, so `reviewedBy`
  resolves to the `MedicalOrganization`. There is deliberately **no visible byline**. To credit a
  named physician later, set `reviewedBy` on the condition record to that doctor's slug and it emits
  a `Physician` object pointing at their profile. **It never invents a name.**
- `aria-hidden="true"` removed from the visible "Meet our Doctors" text, which had been hidden from
  screen readers entirely; it is now a real, condition-specific `<h2>`.

**Deliberately NOT done:** the two supporting blog articles. Blog posts live in the production
Supabase `blogs` table, not the repo (`components/data/blogs.ts` is a stale decoy with 6 unrelated
entries that nothing renders). Publishing would have meant INSERTs against production. Their query
clusters were absorbed into the pillar sections instead.

---

## B4. Paid landing page — `/lp/adult-scoliosis-treatment`

Server component. `noindex, follow`, **self-referencing canonical**, absent from the sitemap
(`app/sitemap.xml/route.ts` uses an explicit static list, so `/lp/*` is excluded by construction).

> The canonical must stay self-referencing. It was inheriting the root layout's default, which
> resolves to the **homepage** — a far worse signal than either alternative. It is deliberately not
> pointed at the organic condition page either: canonicalising a noindex URL onto an indexable one
> sends contradictory signals.

Reuses `BodyPartHeroForm`, `DoctorCard`, `PhoneTextLink`. Bundle: **4.91 kB / 166 kB first load** —
the lightest content page on the site.

Content rules followed, worth keeping if edited: no outcome/success-rate/complication claims, no
"best"/"top" superlatives, physicians come from the verified deformity-capable pool, and no hours,
wait times, or same-day promises.

---

## B5. Internal-link canonicalisation — 21 broken/redirecting links eliminated

**New: `lib/internal-link-redirects.ts`.** Maps every internal href whose target redirects to its
canonical destination, applied at **13 link generators** — including three separate prose
auto-linkers (`ConditionPage`, the treatments template, and the shared `lib/richText`).

A 23-page crawl went from **21 non-200 internal links to 0** (355 unique links, all 200).

What was actually broken:

| Problem | Detail |
|---|---|
| 4 condition records that are really treatments | `/conditions/{ankle-arthroscopy, ankle-replacement, aging-management, degenerative-disc-disease-surgery}` 308'd to `/treatments/*`. Data rows are deliberately retained (`lib/metadata-seo.ts` and the foot-pain client resolve against those slugs) — see `lib/sitemap-exclusions.ts`. |
| A genuine **redirect chain** | `/area-of-pain/back-pain/sciatica` → `sciatica-nerve-pain` → `/conditions/sciatica`, two hops. Collapsed to one in `next.config.ts`. Same for the DDD equivalent. |
| **14 `/blogs/tag/*` links to a route that has never existed** | Hardcoded in the HTML sitemap. The blogs page has no tag filtering at all — it only reads a `page` param. Rows removed. |
| A dead homepage link | `posterior-cervical-laminectomy-surgery` → real slug is `cervical-laminectomy` (`components/data/homepage-data.tsx`). |
| `/injuries` 404 | No such hub route; it 404'd from **every** location and state page. Repointed to `/injuries/car-accident`, matching what the primary nav uses. |
| HTML sitemap listing redirecting URLs | Now applies the same `SITEMAP_EXCLUDED_PATHS` rule the XML sitemap already had. |

`app/conditions/[slug]/ConditionPage.tsx` also gained `ConditionStateLinks`, driven off
`VALID_STATE_SLUGS` instead of a hardcoded four-state list — **that hardcoded list is how the site
could advertise four states after a fifth had launched.**

---

## B6. Analytics — one new form source, and a privacy guard

`lib/lead-contract.ts` gains **`"paid-landing"`**. It names the traffic **channel**, never the ad
group's condition, so no health signal reaches GA4 or Google Ads. First-party PPO/payer
qualification stays in Supabase.

`components/BodyPartHeroForm.tsx` gained optional `formSource` and `sourceLabel` props, defaulting to
existing behaviour — backwards compatible.

**New test** in `tests/measurement-contract.test.ts`: *"no form source encodes a condition, symptom,
or insurance status"*. Matches per hyphen-delimited token, not substring — `book-appointment`
contains `ppo` inside `appointment` and is fine. Existing injury-vertical sources
(`car-accident`, `work-injury`, …) are deliberately out of scope: they describe the legal/referral
vertical the practice already treats as a business category, and changing them is your call.

**End-to-end verified** through the live endpoint: `state=georgia` → **`GA`**,
`form_source=paid-landing` persisted, UTMs persisted, insert succeeded under the new RLS policy.

---

## B7. Multi-state copy sweep — 833 string replacements

Georgia had to appear everywhere the other four states are named:

- **55** long-form: `Florida, New Jersey, New York, and Pennsylvania` → `…, Pennsylvania, and Georgia` (27 files)
- **778** abbreviated: `FL, NJ, NY, & PA` and 3 variants → `FL, NJ, NY, PA & GA` (31 files)
- **10** schema `areaServed` entries across 5 files (`app/page.tsx`, both condition layouts, both
  treatment layouts) — structured data must not contradict the location architecture

**Safe because rendered `<title>` and descriptions come from `lib/metadata-seo.ts`, which contains
none of these strings.** The sweep touched keyword arrays, dead legacy metadata, and visible body
copy only — no title-length risk. 686 of the 778 are in `conditions.tsx` / `treatments.tsx` keyword
arrays; expect a large but mechanical diff there.

---

## B8. Visual / CRO pass

Audited at 390 / 768 / 1440 / 1920 with screenshots reviewed by eye, then fixed:

| Fix | File | Why |
|---|---|---|
| LP hero top padding `180px` → `112px` on mobile | `app/lp/.../page.tsx` | ~110 px of dead sky above the fold |
| CTA row lifted above the trust list | same | Mobile had **no CTA or form above the fold** — the *paid* page performed worse than the organic location page. Also lifts the desktop CTA above a 900 px fold. |
| 3-step "what happens next" under the form | same | Right column ran empty for ~400 px below the form, leaving the hero visibly left-heavy; also answers the "what am I signing up for?" hesitation |
| Hero subcopy tightened | same | 6 lines → 4 on mobile |
| Step numerals: `bg-white/70` → solid white + ring | same | Illegible against the sky background |
| First `<h2>` `text-5xl` → `text-4xl` | `ConditionPage.tsx` | The opening H2 was a size larger than every other H2 and nearly matched the H1 — two competing scales. **Affects all 136 condition pages** (both format branches). |
| Single/two-location grids centred and width-capped | `StateLocationsGridDesktop.client.tsx` | One card in the left third of a 3-column grid read as a broken layout. **Also fixes New York**, which had the identical problem. |

**Automated QA passes 5 pages × 9 viewports:** no horizontal overflow, no missing `alt`, exactly one
`<h1>`, no skipped heading levels, no console errors.

Two findings were investigated and **deliberately not "fixed"** because they are false positives:
the wide `div.flex` is the existing hero marquee (identical on Florida/PA, `document.scrollWidth`
overflow is 0, clipped by design), and the sub-44px tap-target population is shared chrome present
on every page sitewide. The QA script reports those as notes rather than failures — the count is
worth watching for regressions, but fixing them is its own sitewide accessibility pass.

---

## B9. New tooling

| Script | Purpose |
|---|---|
| `scripts/audit-scoliosis-entity-graph.mjs` | **Wired into `prebuild`** — fails the build on duplicated headings, mismatched physicians, self-links |
| `scripts/qa-scoliosis-georgia-responsive.mjs` | Responsive + a11y across 5 pages × 9 viewports |
| `scripts/visual-audit-shots.mjs` | Screenshot capture for visual review |
| `scripts/server-only-stub-loader.mjs` | Lets standalone `tsx` scripts import `lib/providers/*`, which imports `server-only` |
| `docs/seo/scoliosis-query-page-map.md` | Query → page ownership; **read before creating any new scoliosis page** |
| `docs/seo/post-launch-measurement.md` | GSC/GA4 measurement plan, baseline 2026-08-30 |

---

## B10. Adult Scoliosis Surgery treatment page (added 2026-08-31)

New URL: **`/treatments/adult-scoliosis-surgery`**. Fills a real architectural gap — the
site had a scoliosis *condition* pillar with no *treatment* counterpart, unlike
degenerative disc disease which has both. It owns surgical/commercial intent
(`scoliosis surgery` 9,600, `adult scoliosis surgery` 450 and rising, plus the
candidacy/cost/recovery long tail); the pillar keeps informational intent.

No new components, routes, or styles. It is one `TreatmentContent` record rendered by
the existing shared template.

| File | Change |
|---|---|
| `components/data/treatments.tsx` | New record at the end of `treatmentContentBatch5`; 3 **optional** interface fields (`doctorsHeading`, `reviewedAt`, `reviewedBy`); scoliosis link added to the OLIF and Multilevel-DDD overviews |
| `components/data/treatmentFAQs.ts` | New `"adult-scoliosis-surgery"` key, 7 FAQs (feeds both the visible accordion and the FAQPage schema) |
| `components/data/conditions.tsx` | Pillar's "When Surgery is Needed" now links forward to the new page, and its CTA slug points there instead of `spinal-fusion` |
| `components/data/taxonomyIndex.generated.ts` | **Regenerated — must be committed.** `prebuild` hard-fails on a stale index (`npx tsx scripts/generate-taxonomy-index.mjs`) |
| `lib/providers/providerRelevance.ts` | `"adult-scoliosis-surgery": ["spine-deformity"]` |
| `app/treatments/[TreatmentDetails]/page.tsx` | `doctorsHeading` used in place of the hardcoded "Meet our Doctors", falling back to it |
| `app/treatments/[TreatmentDetails]/layout.tsx` | `lastReviewed`/`reviewedBy` schema, gated on `reviewedAt` |
| `docs/seo/scoliosis-query-page-map.md` | Surgical cluster reassigned from the blog to this page |
| `docs/seo/PENDING-temur-insurance-faq-adult-scoliosis-surgery.md` | **Unshipped** insurance FAQ, awaiting approval |
| `scripts/qa-adult-scoliosis-surgery.mjs` | Responsive QA for the new page |

**Two things a reviewer will ask about.**

1. *Why `["spine-deformity"]` and not `["spine-deformity", "spine"]` like its neighbours?*
   Because `selectProvidersForPage` rotates across the **whole** eligible pool, and adding
   the `spine` fallback pulled Dr. Cowin (general spine/joint) onto a deformity page ahead
   of Dr. Slaughter. Verified in rendered output, not assumed. The fail-safe still holds:
   no eligible deformity provider means the module hides itself.
2. *Why does the page carry no insurance copy when OLIF and others do?*
   Deliberate — see the PENDING doc. Note the inconsistency is real: several existing
   records hardcode "PPO Insurance Accepted" in `benefits`/`overview`, and those strings
   reach this page's `ItemList` structured data through the related-treatments list even
   though the page's own copy says nothing about insurance.

**Not done, needs a human:** `reviewedAt`/`reviewedBy` are unset on this page because no
physician has actually reviewed it. Set both once one has — the schema stays silent until
then, which is the correct YMYL behaviour.

---

# PILE A — the 33 commits already on `HomeSEO`

Committed with descriptive messages; `git log upstream/main..HEAD` is the authority. By theme:

- **Measurement & leads (2):** single accepted-lead event with server-issued submission ID; persist
  the accepted lead before sending any email
- **Schema & data truth (4):** removed fabricated ratings/reviews/hours/offer claims; derived review
  figures from GBP data; corrected Miami Beach → South Miami with a 301; corrected two clinic
  coordinates against GBP
- **SEO structure (4):** stopped advertising four redirecting condition URLs in the sitemap; one H1
  per page; server-rendered hub content; cross-canonical area-of-pain → `/conditions` and noindex stubs
- **Accessibility (3):** reduced-motion support, skip link, named controls and form fields, named
  Select triggers
- **Performance (3):** −404 kB first-load JS on area-of-pain; −187 kB / −149 kB on the conditions and
  treatments hubs
- **Insurance page (3):** interactive plan checker, PPO-only as the organising fact, PPO
  at-a-glance hero panel
- **Locations UI (5):** Free Second Opinion surfacing, E.164 tel links, marquee/callout overlap
  fixes, mobile ordering of address/hours/directions
- **Build gates (1):** builds gated on location data validation
- **Docs/chore (8):** QA reports and implementation artifacts

---

# Risk register

| Risk | Where | Mitigation |
|---|---|---|
| **RLS is already live in prod** | Supabase | Rollback SQL above. Watch lead volume for 24 h after deploy. |
| Large mechanical diff | `conditions.tsx`, `treatments.tsx` | 686 of 778 replacements are keyword-array strings. Review the *shape*, not every line. |
| H2 scale change | All 136 condition pages | Single class change, visual only |
| Single-location grid change | Georgia **and New York** | Visual only |
| Provider mappings drift | `providerRelevance.ts` | `prebuild` audit fails the build |
| `next.config.ts` redirect edits | 2 chains collapsed | Both verified 200 after the change |
| Nothing is committed | Pile B | 91 files — commit in logical groups before opening a PR |

---

# Outstanding business inputs

1. **Atlanta local phone** — currently the practice main line `(561) 223-9959`. The location-data
   validator emits an intentional warning for this (same as the 4 PA clinics).
2. **Atlanta GBP** — `placeId`, `cid`, `placeUrl`, `embedSrc`, and exact Place `lat`/`lng`. All
   optional fields on the one clinic object; every consumer is already guarded.
3. **Atlanta on-site physicians and confirmed services** — the physician module hides rather than
   showing an unrelated specialist.
4. **Named physician reviewer** (optional) — set `reviewedBy` on the scoliosis condition record to
   upgrade the schema from organisation to a named `Physician`.
5. **`lumbar scoliosis` (4,800 vol) is on HOLD** — do not build `/conditions/lumbar-scoliosis` on
   volume alone. The SERP-overlap test to run first is written up in
   `docs/seo/scoliosis-query-page-map.md`.

---

# Known-good baselines

| Metric | Value |
|---|---|
| `npx tsc --noEmit` | 50 errors, **all pre-existing**, unchanged file-by-file (measured against a real `git stash` baseline) |
| `npm run test:measurement` | 9 / 9 |
| `npm run build` | Green, 743 static pages |
| Sitemap | 331 URLs; Georgia + Atlanta in; `/lp/*` out; 0 redirecting paths |
| Internal links | 355 unique across 23 pages, **all 200** |
| Responsive/a11y QA | 5 pages × 9 viewports, 0 failures |
| Bundle delta vs baseline | `/conditions/[slug]` +4 kB, `/locations/*` +1 kB, **shared chunk unchanged** |
| Clinics / states | 24 / 5 |
