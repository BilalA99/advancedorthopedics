# Everything built since the last deployed PR

**Baseline:** `origin/main` @ `5c99f1b` — *"Merge pull request #84 from AppFlow-Studio/TemurDev"*
**Head:** `pa-ga-phone-and-atlanta-wiring` @ `c6de1b4` + uncommitted working tree
**Generated:** 2026-09-01

`5c99f1b` is the exact merge-base — there are **zero** commits on `origin/main` that are
not on this branch, so everything below is purely additive to what is deployed. Nothing
here has been pushed.

| Layer | Size |
|---|---|
| Commits ahead of deployed `main` | **38** (2026-08-29 → 2026-08-31) |
| Files changed in those commits | 139 files, +5,722 / −1,475 |
| Uncommitted modified files | **72** files, +1,810 / −1,033 |
| Uncommitted new (untracked) files | **14** |
| Static pages built | **751** (was 741 pre-Georgia) |

### Current gate status (re-verified 2026-09-01, after the neurosurgery removal)

| Gate | Result |
|---|---|
| `npm run build` | **exit 0**, 751/751 static pages |
| `npx tsc --noEmit` | 49 errors — **unchanged documented baseline**, all in `scripts/` + `temp_conditions_old.tsx`, none in app code |
| `neurosurg*` in built HTML | **0 occurrences across all 751 pages** |
| Sitemap `<loc>` count | 339, includes `/treatments/adult-scoliosis-surgery` |
| Doctor pages built | 11 of 12 records (Katzman suppressed by `SHOW_SCOTT_KATZMAN=0`) |

> `docs/HANDOFF-not-in-upstream-main.md` covers some of the same ground in more
> narrative depth, but its counts are now **stale** (it says 33 commits / 79 modified
> files). This document supersedes it for anything numeric.

---

# Part 0 — Today's change: neurosurgery removed sitewide

Mountain Spine is strictly an **orthopedic** practice. All neurosurgery positioning has
been stripped. 26 edits across 3 files, split into two deliberately different categories.

### A. MSO positioning — deleted outright

| File | What it said | Now |
|---|---|---|
| `app/about/page.tsx:293` | "board-certified **neurologists, neurosurgeons**, orthopedic specialists" | "board-certified **orthopedic surgeons, spine specialists**, and physicians" |
| `app/treatments/orthopedic-injections/layout.tsx:127` | org-level `hasCredential` asserting **American Board of Neurological Surgery** certification in JSON-LD | entry removed; American Board of Orthopaedic Surgery retained |
| `doctors.tsx` — Cunningham | `practice: 'Physician Assistant, Neurosurgery & Spine'` | `'Physician Assistant, Spine'` |
| `doctors.tsx` — Cunningham | `metaTitle` led with "Neurosurgery & Spine Physician Assistant" | "Spine Physician Assistant" |
| `doctors.tsx` — Cunningham | keyword `"physician assistant neurosurgery"` | `"physician assistant spine care"` |
| `doctors.tsx` — Cunningham | `medicalSpecialty: ["Neurosurgery", "Spine Care"]` | `["Orthopedics", "Spine Care"]` |
| `doctors.tsx` — Cunningham | `conditionsTreated` included **"Spinal Tumors", "Brain Tumors", "Intracranial Hemorrhage"** | replaced with Degenerative Disc Disease, Spinal Stenosis |
| `doctors.tsx` — Savory | `medicalSpecialty: ["Pain Management", "Neurosurgery"]` | `["Pain Management", "Spine Care"]` |
| `doctors.tsx` — both | `specialties: [... "Neurosurgical Patient Care" ...]` | `"Spine Surgical Patient Care"` |
| `doctors.tsx` — Savory | keyword `"neurosurgery fellowship trained PA"` | `"fellowship trained physician assistant"` |

**The brain-tumour / intracranial-haemorrhage entries were the most serious find.** Those
are conditions the practice does not treat, asserted as things a named provider treats —
a stronger capability claim than the word "neurosurgery" itself.

### B. Real credentials at other institutions — generalised, never falsified

Two providers hold genuine neurosurgery credentials earned elsewhere. Deleting a real
credential outright would misstate a real person's history and cost E-E-A-T, so these were
**generalised to true-but-non-specialty phrasing** rather than erased:

| Provider | Before | After |
|---|---|---|
| Joseph Cunningham, PA-C | "Chief Physician Assistant in the **Department of Neurosurgery** at South Brooklyn Health" | "Chief Physician Assistant **at South Brooklyn Health**" |
| Joseph Cunningham, PA-C | bio described managing "brain and spinal tumors, hemorrhages" | narrowed to "musculoskeletal and neuropathic spine conditions" |
| Sharmez Savory, PA-C | "**Neurosurgery** Fellowship, Arrowhead Medical Center (2015)" | "**Surgical** Fellowship, Arrowhead Medical Center (2015)" |

Every remaining sentence is factually true. The employer, institution, and year are
unchanged — only the department/specialty label is dropped.

> **Judgement call to review:** if you would rather keep the literal credential
> ("Department of Neurosurgery") for E-E-A-T and accept the keyword, the six category-B
> strings are the only ones to revert. Category A should stay removed regardless.

### Verification

```bash
npm run build                                    # exit 0, 751/751
find .next/server/app -name "*.html" -exec grep -l -i neurosurg {} \;   # returns nothing
```

`neurologist`, `brain tumor`, and `intracranial` are also now absent from `app/` and
`components/`. One benign match remains and was **deliberately kept**:
`app/lp/adult-scoliosis-treatment/page.tsx:360` — *"a neurological check of strength,
sensation, and reflexes"* — which describes a physical exam an orthopedic spine surgeon
performs, not a specialty claim.

**Note on reach:** both PAs are `providerType: 'physician-assistant'`, and
`components/PhysicianSchema.tsx` emits `Person` + `hasCredential` for PAs rather than
`Physician` + `medicalSpecialty`. So their `medicalSpecialty` edits do **not** reach the
rendered schema today — they matter for the provider filter at
`app/treatments/orthopedic-injections/page.tsx:76` and for any future reviewer-schema path.
The visible bio/meta/keyword edits do reach the page.

---

# Part 1 — The 38 commits

All dated 2026-08-29 → 2026-08-31. Grouped by theme, chronological within group.

## 1.1 Lead capture & measurement integrity *(2 commits)*

| Commit | Change |
|---|---|
| `bdcf3bb` | Single accepted-lead event with a **server-issued submission ID** — kills duplicate conversion counting |
| `57a2a08` | **Persist the lead before sending any email** — a mail failure no longer loses the patient |

This is revenue-critical: before `57a2a08`, an SMTP hiccup silently dropped the lead.

## 1.2 Schema truthfulness *(1 commit)*

| Commit | Change |
|---|---|
| `d61157f` | Removed **fabricated ratings, reviews, hours and offer claims** from structured data |

Fabricated `AggregateRating` is a Google manual-action risk. This was the highest-severity
fix in the batch.

## 1.3 Location data correctness *(5 commits)*

| Commit | Change |
|---|---|
| `bd26942` | Miami Beach entity was wrong — corrected to **South Miami** with a 301 |
| `1c6318a` | Review figures **derived from real GBP data**; location facts guarded |
| `7e8f03f` | **Builds now hard-fail on invalid location data** |
| `90d2b68` | Free Second Opinion surfaced; **non-E.164 `tel:` links fixed** |
| `0ef5e39` | Two clinic coordinates corrected against Google Business Profile |

`7e8f03f` is the durable one — it converts a class of silent data bug into a build error.

## 1.4 SEO structure *(6 commits)*

| Commit | Change |
|---|---|
| `83f0a62` | Sitemap stopped advertising 4 redirecting condition URLs |
| `3f49b11` | **One H1 per page** — removed hidden layout headings |
| `4b545a5` | Hub content **server-rendered**; remaining duplicate H1s removed |
| `9df3a7c` | area-of-pain **cross-canonicalised to `/conditions`**; stubs noindexed |
| `3d12738` | Implementation artifacts for the remediation |
| `3092161` | **Deterministic provider selection**, blog CTA, dead-code removal |

`9df3a7c` resolved the largest cannibalisation cluster on the site: area-of-pain pages were
competing with `/conditions` for the same queries.

## 1.5 Accessibility *(6 commits)*

`23340ee` (reduced motion, skip link, control/field naming) · `775c37a` (report) ·
`bc80d82` (Select triggers + remaining fields) · `a82eadc` (desktop QA + blockers) ·
`c5034df` (hub pagination no longer scrolls the page horizontally) · `2d8e907` (mobile QA)

## 1.6 Performance *(3 commits)*

| Commit | Change |
|---|---|
| `3177458` | **−404 kB** first-load JS on every area-of-pain page |
| `6b312bf` | **−187 kB** conditions hub, **−149 kB** treatments hub |
| `5b505bd` | Report with before/after bundle sizes |

## 1.7 Insurance page *(3 commits)*

`9c48991` interactive plan checker · `192debf` PPO-only made the organising fact rather
than a footnote · `8650893` hero filled with a PPO at-a-glance panel

## 1.8 Locations UI / mobile *(4 commits)*

`1f32ee8` Second Opinion callout moved beneath the form · `f80d242` area-of-pain rendered
stored HTML instead of printing raw tags · `6c1464e` hero marquee no longer overlaps the
second-opinion card · `17c976c` address/hours/directions above the offer on mobile

## 1.9 Pennsylvania + Georgia launch *(5 commits)*

| Commit | Change |
|---|---|
| `8ed5da6` | **PA and GA phone numbers wired; Atlanta launch finished** |
| `90efcb4` | PA/GA inboxes confirmed; footer state columns unorphaned |
| `97d32fa` | Registry changes committed so **`/locations/georgia` actually resolves** |
| `99f16dd` | Dev server V8 heap capped at 3072 MB |
| `c6de1b4` | Nav card said "Serving 4 States" while listing five |

`97d32fa` is the standing lesson of this project: the Georgia route 404'd because a
generated registry was not committed. **Verify routing against build output, never
inference.** That lesson is why the scoliosis page's sitemap inclusion was confirmed from
`.next/server/app/sitemap.xml.body` rather than assumed.

## 1.10 Docs & chore *(3 commits)*

`3b0f536` visual QA checklist · `215f4bb` Wave 3 results + two corrected premises ·
`8c0844c` untracked local `.claude` config

---

# Part 2 — The uncommitted working tree

**72 modified + 14 new.** This is the largest body of unshipped work and it is where the
strategic value sits.

## 2.1 Georgia as the 5th state — the multi-state copy sweep

**674 meta titles** rewritten across `conditions.tsx` and `treatments.tsx`:

```
"… | Mountain Spine & Orthopedics – FL, NJ, NY, & PA …"
                    ↓
"… | Mountain Spine & Orthopedics – FL, NJ, NY, PA & GA …"
```

This alone accounts for ~1,000 of the changed lines in `conditions.tsx`. Atlanta was
launched with **no invented data** — no fabricated hours, no fabricated reviews. The
`hoursDisplay` gating pattern (emit only when a real value exists) was established here and
is now reused for clinical-review provenance.

## 2.2 Six new providers — 6 → 12 records

Added: **Dr. Steven Schiebert** (Orthopedic Spine), **Dr. Dean Sorrento** (Foot & Ankle
Podiatric), **Dr. Howard Sharf** (Orthopedic Spine), **Dr. Johnson Ho** (Orthopedic
Physician), **Joseph Cunningham, PA-C**, **Sharmez Savory, PA-C**.

`components/PhysicianSchema.tsx` was reworked (+66 lines) to handle two problems:

1. **PAs are not Physicians.** schema.org has no Physician-Assistant type, and `Physician`
   means an individual physician — emitting it for a PA-C asserts a credential they do not
   hold. PAs now emit `Person` + an explicit physician-assistant `hasCredential`.
2. **Off-domain photos.** `img.src` is site-relative for local imports but absolute for the
   6 providers whose photos still live on `orthopedicandlaserspinesurgery.com`, so it can
   no longer be blindly prefixed with the origin.

> ⚠️ `next.config.ts` carries a **TEMPORARY** remote-image allowlist entry for
> `www.orthopedicandlaserspinesurgery.com`. Migrate those 6 photos to BunnyCDN and remove it.

## 2.3 Physician relevance — `lib/providers/providerRelevance.ts` *(new)*

Condition/treatment → care domain → eligible providers, with deterministic slug-keyed
rotation **within** the eligible pool. Replaces arbitrary provider display with clinically
grounded selection. Fails safe: an empty eligible pool hides the module rather than
falling back to a wrong provider.

**Gotcha learned the hard way:** the rotation spans the *entire* eligible pool, so adding a
broad fallback domain (`"spine"`) lets a general spine surgeon outrank the deformity
surgeon you actually wanted. `adult-scoliosis-surgery` is mapped to `["spine-deformity"]`
alone for exactly this reason.

## 2.4 Scoliosis organic build-out

New page **`/treatments/adult-scoliosis-surgery`** — filled a real architectural gap
(scoliosis had a condition pillar but no treatment-side page, unlike DDD which has both).

Built as a **data record**, not a new component — it renders through the existing
122-page treatment template. Three **optional** fields were added to the `TreatmentContent`
interface, all unset on every pre-existing record so the other 121 pages are provably
unaffected:

| Field | Purpose |
|---|---|
| `doctorsHeading?` | page-specific physician heading; unset ⇒ "Meet our Doctors" as before |
| `reviewedAt?` | ISO review date; **gates** schema `lastReviewed`/`dateModified` emission |
| `reviewedBy?` | doctor slug; unset ⇒ credits the MedicalOrganization, names no individual |

7 FAQs live in `components/data/treatmentFAQs.ts` (**not** `TreatmentContent.faqs`, which
does not render — this cost real debugging time). Bidirectional links wired from the
condition pillar, OLIF, and multilevel-DDD.

Verified: 0 dollar figures, 0 invented clinical thresholds, 0 pediatric/AIS capability
implications, PT/chiropractic confined to a single FAQ, 7.1% shingle overlap with the
pillar (all traceable to shared physician cards and the locations CTA — zero authored
duplication).

## 2.5 Paid landing page — `/lp/adult-scoliosis-treatment` *(new, 785 lines)*

Server component by design, so Ads quality checks see real content pre-hydration. Only
client boundaries are the lead form, tracked phone link, and doctor cards — all existing
components.

**`noindex, follow` is deliberate and load-bearing.** Organic authority for this cluster
belongs to `/conditions/adult-degenerative-scoliosis` and
`/treatments/adult-scoliosis-surgery`. Do not "fix" the noindex.

## 2.6 Internal-link canonicalisation — `lib/internal-link-redirects.ts` *(new)*

Four `conditions.tsx` records are really treatments that were consolidated. `next.config.ts`
301s their `/conditions/{slug}` URLs, and sitemap exclusions kept them out of the sitemap —
but **~200 internal links still pointed through the redirect hop**, because every
data-driven link builder emitted the raw slug.

`resolveConditionHref` closes the gap at link-generation time, so the data rows can stay
where other code still resolves against them.

Two redirect **chains were collapsed** in `next.config.ts` (A→B→C became A→C):
- `/area-of-pain/back-pain/degenerative-disc-disease` → `/conditions/degenerative-disc-disease`
- `/area-of-pain/back-pain/sciatica` → `/conditions/sciatica`

## 2.7 🔴 Security — Supabase RLS migration *(new; applied to prod, uncommitted)*

`supabase/migrations/202608300001_enable_rls_forms_blogs.sql`

**This is the single most urgent item in the tree.** `NEXT_PUBLIC_SUPABASE_ANON_KEY` ships
inside the client bundle and is public by construction. Before this migration, `public.forms`
and `public.blogs` had **RLS disabled** while `anon` held SELECT/INSERT/UPDATE/DELETE/TRUNCATE.

> Anyone who opened devtools could read **every patient lead** — names, emails, phone
> numbers, insurance type — or truncate the blog. `pg_policies` was empty for schema `public`.

The migration was written after verifying the app's actual access is narrow (`public.forms`
is INSERT-only from one call site: `components/email/sendcontactemail.ts`).

**Status corrected 2026-09-01:** per the sprint brief, this migration is **already applied**
to production project `bwrnnmzqipnoakmdbevz`. The *database is ahead of the repo* — the file
is simply uncommitted. It must be committed as-is and **not re-applied**. (An earlier revision
of this document said it was unapplied; that was inferred from the repo alone, which cannot
see production state.)

Related: there is **no service-role key** in `.env` — the app runs entirely on the anon key,
so **any new table will silently return zero rows until an explicit RLS policy is written.**

## 2.8 Supporting infrastructure

| File | Purpose |
|---|---|
| `components/data/taxonomyIndex.generated.ts` | **regenerated** — 112 conditions, 122 treatments. `prebuild` hard-fails on staleness, so this must be committed together with the data files |
| `tests/measurement-contract.test.ts` | +35 lines locking the analytics contract |
| `lib/lead-contract.ts` | +5 lines |
| `scripts/audit-scoliosis-entity-graph.mjs` | entity-graph audit |
| `scripts/qa-adult-scoliosis-surgery.mjs` | Puppeteer responsive QA at 390/768/1440 |
| `scripts/qa-scoliosis-georgia-responsive.mjs` | responsive QA |
| `scripts/visual-audit-shots.mjs` | screenshot capture |
| `scripts/server-only-stub-loader.mjs` | build tooling |
| `docs/seo/scoliosis-query-page-map.md` | **query → owning page map** (cannibalisation control) |
| `docs/seo/post-launch-measurement.md` | measurement plan |
| `docs/seo/PENDING-temur-insurance-faq-adult-scoliosis-surgery.md` | withheld insurance copy, ready to apply |

---

# Part 3 — What you can build on

Reusable patterns already paid for. These are the leverage points.

### 3.1 The data-record page pattern
One dynamic route renders **122 treatment pages** from a `TreatmentContent[]` array; the
same holds for 112 conditions. A new page is a **data object**, not a component. Adding
`/treatments/adult-scoliosis-surgery` required zero new visual components.

### 3.2 Gated schema emission
Emit a claim **only when a real value backs it**. Established for Atlanta's `hoursDisplay`,
reused for `reviewedAt`/`reviewedBy`. This is why the site can add trust signals without
ever fabricating one. Apply it to any new provenance field.

### 3.3 Optional-field interface extension
`doctorsHeading`, `reviewedAt`, `reviewedBy` are all optional and unset everywhere else, so
121 existing pages were provably untouched. **This is the template for extending any shared
interface** — additive, optional, default-preserving.

### 3.4 Care-domain provider mapping
`providerRelevance.ts` already resolves page → care domain → eligible providers, and
`doctors[].locations` already holds clinic slugs for 6 providers. **Both relationships exist
in data and are under-rendered** — see Part 5.

### 3.5 Build-output verification
When the dev server won't stay alive, resolve routes against `.next/prerender-manifest.json`,
`.next/server/app/*.html`, and `sitemap.xml.body`. For static routes this is **stronger
evidence than HTTP**. It is how the Georgia routing gap was caught and how every claim in
this document was checked.

### 3.6 Query → page ownership map
`docs/seo/scoliosis-query-page-map.md` documents which page owns which query. Extend this
before adding any page in an existing cluster — it is the cannibalisation control.

---

# Part 4 — Open items

| # | Item | Owner |
|---|---|---|
| 1 | 🔴 **Apply the Supabase RLS migration** — patient leads currently world-readable in prod | You / DB |
| 2 | **Insurance FAQ pending Temur's approval** — drafted in `docs/seo/PENDING-…md`, deliberately withheld from the shipped page. Page passes all gates without it | Temur |
| 3 | `reviewedAt`/`reviewedBy` **left unset** on the scoliosis page rather than fabricated. Needs a real physician review to populate | Clinical |
| 4 | **"PPO Insurance Accepted" appears 7× in `ItemList` schema** on the new page, sourced from *other* treatments' hardcoded descriptions (Revision Spinal Surgery, Spinal Fusion, Hip Resurfacing, Nerve Block, Chronic Pain, Cervical Laminectomy, Knee Ligament Repair). Pre-existing and sitewide — **not introduced by this work** | Decide |
| 5 | **Temporary remote-image allowlist** in `next.config.ts` for 6 providers' off-domain photos | Migrate to CDN |
| 6 | Cunningham's `locations` were **narrowed by inference** (NY/NJ licensure + Brooklyn career). Savory has **no confirmed location at all** — `locations: []` | Confirm |
| 7 | **Category-B neurosurgery generalisations** (Part 0) — revert the 6 strings if you'd rather keep the literal credentials | You |
| 8 | Nothing is committed or pushed. 38 commits + full working tree are local only | You |

---

# Part 5 — The highest-value next build

Researched and evidence-backed, not yet implemented.

**The real self-competition is between location pages, not between the pillar and the hub.**

| Location page | Condition links | Treatment links | Physician links |
|---|---|---|---|
| Orlando | 67 | 50 | **0** |
| Princeton | 67 | 49 | **0** |
| Atlanta | 62 | 50 | **0** |
| Allentown | 68 | 50 | **0** |

Princeton's condition link set is **byte-identical** to Orlando's. Allentown's treatment set
is **byte-identical** to Orlando's. `components/LocationSeoSections.tsx` filters by body-part
tag only — **the clinic is never an input**. All 24 location pages carry the same grid with
the city name swapped.

Meanwhile clinics, physicians, and procedures are three disconnected entity islands:
`lib/generateLocationSchema.ts` emits `medicalSpecialty` but has **no `availableService`** and
**no `employee`** linkage; doctor pages emit `Physician` but have **no `worksFor`** back to a
clinic `@id`.

**Three plays, zero new URLs:**

1. **Render physician ↔ location on both surfaces.** `doctors[].locations` already holds it.
   Serves *"scoliosis doctor near me"* (600/mo) and *"scoliosis specialist near me"* (600/mo)
   — queries that want a **named person at a place**, which neither page currently provides.
2. **Join the schema graph.** Add `availableService` (clinic → `MedicalProcedure` `@id`),
   `employee` (clinic → Physician), `worksFor`/`knowsAbout` (doctor → clinic, conditions).
   Every `@id` already exists — you'd be adding edges, not vertices.
3. **Make location grids provider-aware** via `providerRelevance.ts`. Differentiates the 24
   near-duplicate pages *and* eliminates the actual cannibalisation.

**Sequence play 3 first** — it fixes an existing dilution problem rather than adding surface
area. **Play 1 has the highest ceiling** for local commercial intent.

Why none of it cannibalises: each surface owns a different entity type — condition page owns
*what is this*, treatment page owns *am I a candidate*, doctor page owns *who is this surgeon*,
location page owns *care at this address*. Four nodes that should point at each other.

---

# Part 6 — Sprint Phase 1 verification (2026-09-01)

Read-only verification of the `HomeSEO` → `upstream/main` sprint brief. **Nine of the
brief's claims did not survive contact with the codebase.** Recorded here so the next
person does not re-plan against them.

## 6.1 Baseline numbers — brief vs. actual

| Check | Brief expects | Actual | Verdict |
|---|---|---|---|
| `npx tsc --noEmit` | 50 errors | **49** | brief stale by 1 |
| `npm run test:measurement` | 9/9 | **9/9** | ✅ match |
| `npm run build` | green, 743 pages | **green, 751 pages** | +8 (Georgia + scoliosis) |
| Sitemap URLs | 331 | **339** | +8 |
| Working tree | 79 modified + 12 untracked | **72 modified + 14 untracked** | brief stale |
| Total vs `upstream/main` | — | **177 files, +7,511 / −2,487** | — |
| `taxonomyIndex.generated.ts` | current | ✅ 112 conditions / 122 treatments | ✅ |
| `clinicsForMap.generated.ts` | current | ✅ 24 entries + 530 reviews / 23 locations | ✅ |

> **Brief command error:** `node scripts/generate-clinics-for-map.mjs --check` fails with
> `ERR_UNKNOWN_FILE_EXTENSION` — the script imports `clinics.tsx`. `prebuild` invokes it as
> `npx tsx …`. Use tsx; the check passes. Not a repo bug.

> **Branch discrepancy:** the brief targets `HomeSEO`, but `HomeSEO` is at `17c976c` — **5
> commits behind** the current branch. The PA/GA/Atlanta work the brief lists as *work to do*
> (Commits 4 & 5) is **already committed** on `pa-ga-phone-and-atlanta-wiring`.

## 6.2 Insurance copy — claim refuted, real violations found elsewhere

The brief's specific claim (~20 × "Most insurance plans accepted", ~17 × "We accept most
major insurance plans" in `clinics.tsx`, only 4 clinics mentioning PPO) is **refuted**:

| String | Brief | Actual |
|---|---|---|
| `Most insurance plans accepted` | ~20 | **0** |
| `We accept most major insurance plans` | ~17 | **0** |
| `PPO` in `clinics.tsx` | 4 clinics | **91 occurrences** |
| `PPO Insurance Accepted` (any case) | — | **204** |

The clinic data is already PPO-correct. The genuine violations are **elsewhere**, and all
are payer copy ⇒ **Phase 2b / Temur-gated, not in the PR**:

| File:line | String |
|---|---|
| `app/locations/[state]/page.tsx:294` | `'Most major insurance plans accepted'` (rendered bullet) |
| `app/locations/[state]/layout.tsx:32` | `Most insurance accepted` (meta description) |
| `app/injuries/car-accident/CarAccidentClient.tsx:382` | `Most insurances accepted.` |
| `app/injuries/car-accident/CarAccidentClient.tsx:1351` | `Most insurances accepted.` |
| `app/landing-page/page.tsx:393` | `We accept many insurance plans · Same-day appointments often available` |
| `components/data/treatments.tsx:2497, 3717, 6020, 8004, 8068, 8639` | "covered by most insurance carriers / most insurance plans" |
| `components/data/treatmentFAQs.ts:283` | "most major insurance plans and Medicare cover" |

**False positives — do not touch:** `alt={\`${insurer.name} insurance accepted\`}` (image alt
text), "most advanced …" in clinic prose, and review bodies.

**Out-of-scope violations found while auditing** (superlatives + same-day promises, which the
brief's own content rules forbid): `clinics.tsx` carries `world-class`, `top-tier`, `renowned`,
`best orthopedic doctor`, `top-rated`, and multiple `same-day appointment` promises
(`clinics.tsx:138, 175, 182, 190, 626–627, 651, 655`). Not fixed — reported.

## 6.3 Physical therapy — 2 real violations

79 total mentions. Only **two** are category (b) first-person plural:

| File:line | String |
|---|---|
| `components/data/conditions.tsx:7701` | "…reduce tensile load; **our physical therapists** mobilize tight…" |
| `components/data/painconditions.tsx:4026` | identical string |

Everything else is category (a) third-person ("your physical therapist") or category (c)
protective de-linking logic in `ConditionPage.tsx:52`, `treatments/[TreatmentDetails]/page.tsx:44`,
`ConditionTreatmentFAQSection.tsx:15` — **leave those alone**.

## 6.4 Cannibalization — one pair refuted, one new pair found

| Brief's claimed pair | Reality |
|---|---|
| `shoulder-replacement` / `resurfacing-shoulder-replacement` | ✅ **confirmed** — and there is a *third*, `reverse-shoulder-replacement` |
| `spinal-fusion` / `lumbar-fusion` | ✅ **confirmed**, but the slug is `lumbar-fusion-surgery` |
| `arthroscopy` / `arthroscopic-surgery` | ❌ **refuted — neither record exists** |

**New pair the brief missed:** `meniscus-surgery` **and** `meniscus-repair-surgery` both
exist and both target the `meniscus surgery` parent topic — the single highest-value term in
the sprint dataset (KD 0, TP 12,000). This is the most valuable cannibalization on the site.

All four Commit-9 targets **already exist** as records — that commit is *extend*, not *create*:
`meniscus-surgery`, `acl-reconstruction-surgery`, `rotator-cuff-repair-surgery`,
`hip-arthroscopy-treatment`. Body-part arthroscopy records also exist for shoulder, hip,
elbow, wrist, and ankle.

## 6.5 "Thin" Tier 2 — premise partially refuted

| Page | Words | h1 | h2 | h3 | FAQs |
|---|---|---|---|---|---|
| `/treatments/reverse-shoulder-replacement` | 1,364 | 1 | 11 | 5 | 5 |
| `/treatments/knee-cartilage-restoration` | 1,348 | 1 | 11 | 5 | 5 |
| `/conditions/cervical-herniated-disc` | 1,048 | 1 | 11 | 5 | 5 |
| — *tier comparators* — | | | | | |
| `/treatments/rotator-cuff-repair-surgery` | 1,158 | 1 | 11 | 4 | 4 |
| `/treatments/resurfacing-shoulder-replacement` | 1,159 | 1 | 11 | 4 | 4 |
| `/treatments/spinal-fusion` | 1,598 | 1 | 11 | 5 | 5 |
| `/treatments/adult-scoliosis-surgery` | **2,747** | 1 | 11 | **7** | **7** |

**The three named pages are at tier median, not uniquely thin.** Every treatment page renders
exactly 11 `<h2>` from the shared template, and the tier clusters at 1,100–1,600 words. The
real outlier is the new scoliosis page at 2,747 — roughly 2× the tier.

So the problem is **the tier is thin**, not those three pages. Expanding only the three named
pages would leave them indistinguishable from their neighbours. Worth a scope decision.

## 6.6 Sitemap gap — explained, but my first mechanism was wrong

751 built pages vs 339 sitemap URLs. The gap is **deliberate**:

| Category | Count |
|---|---|
| `/area-of-pain/*` — **cross-canonicalised** to `/conditions` in `9df3a7c` | **390** |
| `/lp/*` — noindex by design | 1 |
| Redirecting condition slugs in `lib/sitemap-exclusions.ts` | 4 |
| Route variants / non-page HTML artifacts | remainder |

`703` HTML files − `390` area-of-pain ≈ `313`, plus dynamically-listed blog and clinic URLs
= `339`. **No page that should be indexed is absent from the sitemap.**

> **Correction (2026-09-01).** An earlier revision of this section said the 390 area-of-pain
> pages are *noindexed*. They are not. Verified in built HTML: **389 of 390 carry
> `content="index, follow"`** plus a cross-domain canonical to `/conditions/*`; only **1**
> stub page carries `noindex`. `9df3a7c` canonicalised the 390 and noindexed the stub subset —
> the commit was deliberately "chosen over a 301 because it is reversible and retires no URL."
> This changes the GSC prediction entirely — see §6.10.

## 6.7 🔴 Measurement — most of Commit 7 is already shipped

| Sub-item | Status |
|---|---|
| **7a** collapse 3 events → 1 with server-issued submission ID | ✅ **already done** (`bdcf3bb`) |
| persist lead before email | ✅ **already done** (`57a2a08`) |
| **7b** hash PII before dataLayer push | ✅ **done 2026-09-06** (`86b5feb`) — `sha256_` field names; GTM variable must change in the same publish |
| **7c** normalise `state` | ✅ **already done** — `normalizeStateCode()` at `sendcontactemail.ts:49` |
| **7c** fix `form_source` | ✅ **already done** — `resolveFormSource()` in `lib/lead-contract.ts:34` |
| **7d** `landing_path` | ✅ **done 2026-09-06** (`86b5feb` column, `e90fcb6` end-to-end wiring; Supabase only) |

> ### 🔴 The brief contradicts shipped code on the event name
> The brief says: *"Do not remove the `form_submit` event **name** — GTM triggers depend on it."*
>
> **`form_submit` and `form_submission` are already gone — 0 occurrences in the entire repo.**
> The surviving canonical is `CANONICAL_LEAD_EVENT = "lead_form_submit_success"`
> (`lib/lead-contract.ts:3`), deduped via an `emittedSubmissionIds` Set.
>
> **Any GTM trigger still bound to `form_submit` is firing on nothing right now.** This is a
> live measurement gap, not a future risk. GTM must be repointed to
> `lead_form_submit_success` — or the name deliberately reinstated. **Needs a human decision.**

Enhanced Conversions currently pushes raw `email`, `phone_number`, `first_name`, `last_name`,
`postal_code`, `address` into `window.dataLayer` at `utils/enhancedConversions.ts:146, 171, 214`.
GTM hashes before sending to Google, so what *reaches Google* is fine — but the plaintext sits
in a globally readable object any third-party script can read. 7b is the real remaining work.

## 6.8 Georgia / Atlanta — mostly confirmed, two claims stale

| Brief claim | Actual |
|---|---|
| clinic `id: 24` = `atlanta-orthopedics` | ✅ `clinics.tsx:9714` |
| `lat: 33.829783`, `lng: -84.332626` | ✅ exact match |
| `rating: 0`, `reviewCount: 0`, `reviews: []` | ✅ exact match |
| no `placeId` / `cid` / `placeUrl` / `embedSrc` | ✅ absent, with an explanatory comment |
| `hoursDisplay` present | ❌ **absent** — 0 occurrences in the Atlanta block |
| phone = main line `(561) 223-9959` | ❌ **stale** — now `GA_PHONE_DISPLAY = (404) 913-6886` (`8ed5da6`) |
| `GA`/`georgia` in unions + `VALID_STATE_SLUGS` | ✅ `lib/locationRedirects.ts:142, 144, 152` |
| `ConditionStateLinks` reads `VALID_STATE_SLUGS` | ⚠️ not a standalone file — it lives inside `app/conditions/[slug]/ConditionPage.tsx` |

Atlanta's missing `hoursDisplay` is **correct behaviour**, not a defect: hours were never
confirmed for that office, and the gating pattern means the page and schema stay silent
rather than inventing them.

## 6.9 🔴 A.0 deployment check — NOT DEPLOYED (no live gap)

**None of this branch is in production.** `upstream/main` @ `5c99f1b` is the deployed line,
and every one of the 38 commits sits above it.

| Question | Answer |
|---|---|
| Commit that removed `form_submit` | **`bdcf3bb`** |
| Remote branches containing `bdcf3bb` | **none** — local-only, on `HomeSEO` and `pa-ga-phone-and-atlanta-wiring` |
| Is `bdcf3bb` an ancestor of `upstream/main`? | **No** |
| Does production still contain `form_submit`? | **Yes — 3 occurrences** in `upstream/main:utils/enhancedConversions.ts` |
| `HEAD..HomeSEO` | **0** — HEAD is a clean superset; `HomeSEO` superseded |

**Production is still firing `form_submit`.** The 9 conversions on `Thank You Page GTM` for
Aug 25–31 are consistent with that. This is a **sequencing requirement**, exactly as the
amendment predicted — GTM leads, code follows. There is no same-day emergency.

> **My Phase 1 report was wrong here.** I described the rename as "a live gap, not a future
> risk." That was inferred from the working tree without checking deployment state. The
> renamed code has never shipped.

## 6.10 GSC status label — prediction, and the ranking-collapse candidate

Production `app/area-of-pain/*/layout.tsx` emits **`canonical: buildCanonical('/area-of-pain/…')`
— self-canonicalising — with `index, follow` and no `robots` override.** So in production
*right now* the site ships **390 self-canonicalising, indexable pages rendering the same
content as `/conditions/*`**, while the sitemap declares `/conditions` canonical.

That predicts the GSC label directly: those URLs should report as **"Duplicate, Google chose
different canonical"** or **"Crawled – currently not indexed"** — and **not** "Excluded by
'noindex' tag", because there is no noindex in production to exclude them.

Of the amendment's three hypotheses, it is #1 — *the fix is not live in production* — with
one correction: the fix was never a blanket noindex, it was cross-canonicalisation.

**On the ranking collapse.** This is a materially stronger candidate than "noindexed pages",
and unlike that theory it is directly verifiable in the deployed source. 390 indexable
self-canonicalising duplicates of the exact pages intended to rank is a textbook dilution
mechanism, and it is live today. Stated as a candidate, not a conclusion — top-3 keywords
going 118 → 0 between Dec 2025 and Jul 2026 needs a dated correlation against the deploy
that introduced those pages before anyone calls it causal.

**The fix already exists locally and is undeployed.** `lib/areaOfPainCanonical.ts` points each
canonical at the equivalent `/conditions` page, but only where that page genuinely exists as
a condition record and is not itself a redirect source — so no canonical points at a 404 or a
redirect.

**Commit 16 verdict:** the sitemap correctly excludes these today. Once the canonical fix
deploys, signals consolidate and nothing needs adding. Treated as a **no-op** pending the
post-content page-count reconciliation in Phase 3.

---

# Part 7 — Canonical hotfix pre-ship checks (2026-09-01)

Three blocking checks before cherry-picking the area-of-pain canonical fix.
**Check 1 refutes the causal hypothesis. Check 3 changes the recommended instrument.**

## 7.1 Check 1 — dated correlation: the duplicates did NOT cause the collapse

**Route introduction** (`git log --diff-filter=A -- "app/area-of-pain/**"`):

| Date | Commit | What |
|---|---|---|
| 2025-04-12 | `51e6d10` | Back area-of-pain set up |
| 2025-05-30 | `8ef404b` | Foot & ankle added |
| 2025-06-05 | `6a18600` | Layout metadata |
| 2025-06-22 | `5405e00` | Metadata / dynamic-route pass |
| **2026-03-28** | **`9508792`** | **SSR pass — this is what created 390 prerendered indexable pages** |

**Actual top-3 trajectory** (Ahrefs, daily, subdomains mode):

| Date | top-3 | Note |
|---|---|---|
| 2025-05-01 | 0 | routes already live since April |
| 2025-11-30 | 88 | rising *throughout* the duplicates' existence |
| **2025-12-13** | **96** | **peak** |
| 2025-12-18 | 87 | plateau holds |
| **2025-12-19** | **83** | **inflection — decline begins** |
| 2025-12-25 | 61 | smooth glide |
| 2025-12-31 | 31 | |
| 2026-01-08 | 15 | |
| 2026-01-23 | 2 | floor reached |
| 2026-02-25 | 0 | |

### Verdict: refuted, exactly per the decision rule

- The routes existed **from April 2025**, and rankings **rose from 0 to 96 while they existed.**
- The decline begins **2025-12-18/19** — 6 months after the routes shipped.
- The commit that actually created 390 prerendered indexable pages (`9508792`) is dated
  **2026-03-28**, three months **after** the collapse had already bottomed out at 0–2.
- The `/conditions` URL migration (`c59febd`, 2026-01-14) is **four weeks after onset** — it
  cannot be the trigger either, though it may have deepened the decline already underway.

**There is no code deployment at the inflection.** Commits near 2025-12-18/19: a merge PR on
12-11 and a blog canonical fix on 12-21. Nothing structural.

**The shape is diagnostic.** A smooth 5-week glide from 96 → 2 with no concurrent deploy is
the signature of an **algorithmic reassessment**, not a technical regression — a technical
break (bad redirect, stray noindex, robots.txt) produces a cliff within days, not a glide.

Note also the *rise*: 0 → 96 in seven months on largely templated content, followed by a
sustained algorithmic-looking correction. That pattern is consistent with the templating /
thin-content hypothesis and with the "Crawled – currently not indexed" symptom — but it is a
pattern, not proof.

> **The ranking collapse remains unexplained. This question stays open.** The crawl symptom
> now has an explanation; the ranking symptom does not. The 390 duplicates are a real and
> permanent drag worth fixing on their own merits — they are **not** the December event.

## 7.2 Check 2 — 65 of 390 fall through the guard (17%)

| Outcome | Count |
|---|---|
| Cross-canonical to `/conditions/*` (**fixed**) | **324** |
| Still self-canonical (**falls through**) | **65** |
| `noindex` stub (no canonical) | 1 |

Evenly split: 22 back-pain, 21 foot-pain, 22 neck-and-shoulder-pain. Two classes:

1. **4 sitemap-excluded redirect sources** — `ankle-arthroscopy`, `ankle-replacement`,
   `aging-management`, `degenerative-disc-disease-surgery`. The guard **correctly** refuses;
   canonicalising onto a redirect would be worse than leaving it.
2. **~61 slugs with no exact `/conditions` equivalent** — but many have an *obvious* equivalent
   under a different slug: `heel-pain-plantar-fasciitis` → `plantar-fasciitis`,
   `neck-herniated-disc` → `cervical-herniated-disc`, `lumbar-degenerative-disc-disease` →
   `degenerative-disc-disease`, `foraminal-stenosis-back-pain` → `foraminal-stenosis`.

The exact-slug guard cannot see these. A small alias map would convert most of the 61 —
**follow-up work, not part of the existing fix.**

## 7.3 Check 3 — canonical is the wrong instrument; there is no equity to consolidate

| Signal | Result |
|---|---|
| **External backlinks to `/area-of-pain/*`** (Ahrefs, prefix mode) | **0** |
| Non-AoP built pages linking to any AoP URL | **3** of 703 |
| Unique AoP URLs linked from outside the cluster | **18** of 390 |
| AoP links server-rendered on the homepage | **0** |

The three linking pages are `/conditions/diabetic-foot-ulcers`, `/conditions/plantar-fasciitis`,
and the HTML sitemap. `NavBar.tsx` and all three dropdowns are `'use client'`, so their 21
area-of-pain references **never reach the server-rendered HTML** — Googlebot sees them only if
it executes the client bundle.

**The stated condition fails.** Canonical consolidates link equity; these pages have none —
zero backlinks and 18 of 390 receiving any internal link at all. Canonical is also a *hint*
Google may ignore, whereas `noindex` is a *directive*.

### Recommendation

**Split the instrument by bucket:**

- **The 324 with a valid target — ship the canonical as written.** It is already built and
  tested, reversible, retires no URL, and if honoured it consolidates cleanly.
- **The 65 with no valid target — `noindex, follow`.** There is no page to canonicalise to and
  no equity to lose, so the objection to noindex does not apply. This also closes Check 2's
  residual instead of leaving 65 self-canonicalising duplicates live.

The 65-page noindex is **new work, not in the existing fix** — flagged as a scope decision.

## 7.4 Expectation reset — do not expect recovery from this hotfix

The rationale for shipping alone was that "recovery becomes evidence." **Check 1 removes that
expectation.** These pages were not causing the December collapse, so ranking recovery
attributable to this fix is unlikely.

Ship it anyway — 390 self-canonicalising duplicates of the pages meant to rank is a genuine
permanent drag, it is cheap, and it is already written. But record the prediction honestly:
**this fix is expected to improve crawl efficiency and index hygiene, not to restore rankings.**
Judging it on the top-3 metric would fail it for the wrong reason.

The one-variable discipline still holds and is still worth keeping — it just now buys a clean
read on *indexation*, which is what the fix actually targets.

## 7.5 Commit 16 — no-op, with the reasoning recorded correctly

The sitemap is correct. But **a sitemap does not gate indexation — it only declares intent.**
Google indexes what it can crawl and is not told to exclude. Those 390 pages are indexable via
internal links regardless of sitemap status, which is exactly how this sat in production
unnoticed. "Sitemap correct" must never be read as "indexation correct."

---

# Part 8 — Sprint Phase A: committed (2026-09-01)

Five commits landed on `pa-ga-phone-and-atlanta-wiring`. `HomeSEO` confirmed a clean
subset (`HEAD..HomeSEO` = 0), so nothing needed merging and `HomeSEO` is superseded.

| # | Commit | Files | Notes |
|---|---|---|---|
| 1 | `6b76a8f` chore: RLS migration already applied to production | 1 | header added, SQL untouched |
| 2 | `33158ba` chore: commit generated data files | 1 | only the taxonomy index differed |
| 3 | `41156e2` fix: internal link canonicalisation | 14 | +2 redirect chains collapsed |
| 3b | `d8d3103` fix: area-of-pain canonical resolution | 4 | 324 canonical / 65 noindex |
| 6 | `0602df2` feat: clinically grounded provider selection | 7 | 0 unresolvable pages |

## 8.1 Corrections to earlier findings in this document

**The tsc baseline is 50, not 49. The original brief was right and my Phase 1 §6.1 was
wrong.** The count depends on whether `.next/types/**` is freshly generated —
`tsconfig.json:26` includes it. My Phase 1 run measured against a stale `.next` from a
previous session. A file-by-file diff after a fresh build shows **exactly one** new entry:

```
> 1 .next/types/app/area-of-pain/back-pain/[PainArea]/layout.ts
```

Every source file's error count is identical, so none of the five commits introduced a
source error. The error itself is pre-existing and verifiable on `upstream/main`:
`app/area-of-pain/back-pain/[PainArea]/layout.tsx:10` types `params` as
`{ PainArea: string }` while its two sibling layouts correctly use
`Promise<{ … }>` — and the function already does `await params`, so the annotation is
simply wrong for Next.js 15.

> **Decision needed for Commit 15.** The ceiling cannot be 49 and also leave pre-existing
> errors unfixed — those two instructions conflict once artifacts are fresh. Either set the
> ceiling at **50**, or authorise the one-word fix (`Promise<…>`) on that line, which makes
> the file consistent with its siblings and matches its own runtime behaviour. Not fixed:
> the brief forbids touching the pre-existing set, and this is not mine to widen.

**`additionalSections` exists for conditions only.** `ConditionSection` carries the
`placement` key (`conditions.tsx:70` — `after-symptoms | after-causes | before-treatment |
after-treatment`) and `ConditionPage.tsx` renders it at four placement points. But
**`TreatmentContent` has no `additionalSections` field and the treatment template does not
render one.** Commits 8 and 9 target treatment pages, so Phase C needs that field and
render block ported first, following the same additive-optional pattern already used for
`doctorsHeading` / `reviewedAt` / `reviewedBy`.

## 8.2 Verified during Phase A

| Claim | Result |
|---|---|
| 7 internal-link redirect targets resolve | ✅ all prerendered 200 |
| Bare `/injuries` links in built HTML | ✅ 0 (it is an index-less route) |
| `/blogs/tag/*` rows in HTML sitemap | ✅ 0 |
| `posterior-cervical-laminectomy-surgery` in `homepage-data.tsx` | ✅ already `cervical-laminectomy` |
| Redirect chains across all 121 rules | ✅ **0** after collapsing 2 more |
| area-of-pain canonical split | ✅ 324 cross / 65 noindex / 1 stub |
| Cross-canonicals → 404 or redirect source | ✅ **0 and 0** |
| Pages both noindexed *and* cross-canonicalised | ✅ **0** — no contradictory signals |
| Provider resolution | ✅ 124/124 conditions, 122/122 treatments |
| `adult-scoliosis-surgery` → `["spine-deformity"]` | ✅ no `spine` fallback |
| `npm run build` | ✅ exit 0, 751/751 |
| `npm run test:measurement` | ✅ 9/9 |

**Two more brief claims refuted:** the internal-link work has **14** call sites, not 13;
provider selection has **7** consumers, not 6 (the seventh is the scoliosis LP). Condition
and treatment counts are **124 / 122**, not the brief's 136 / 121.

**GSC evidence for the 65 noindexed pages:** no `/area-of-pain` URL appears in the top 100
pages by clicks over 90 days, and that list's floor is 53 impressions — so every one is
below it. Nothing measurable is lost.

## 8.3 Commit-boundary compromises

Two files could not be cleanly separated without interactive staging, which this
environment does not support:

- `app/conditions/[slug]/ConditionPage.tsx` (+191/−127) carries provider selection, the
  `additionalSections` rendering pipeline, and `ConditionStateLinks` reading
  `VALID_STATE_SLUGS`. All three are foundation for later commits; it landed in Commit 6.
- `app/treatments/[TreatmentDetails]/page.tsx` (+25/−9) carries provider selection plus
  `doctorsHeading`; it landed in Commit 6.

Their internal-link hunks therefore ride in Commit 6 rather than Commit 3. Recorded in both
commit messages so a reverter is not surprised.

---

# Part 9 — Commits 3c, 5, 8a + Phase B code-side findings (2026-09-01)

| # | Commit | Notes |
|---|---|---|
| 3c | `0aaccac` fix: params type on area-of-pain back-pain layout | tsc now **49 after a fresh build** |
| 5 | `a711300` feat: multi-state copy sweep for Georgia | **restored — it was never committed** |
| 8a | `7bc5f6c` feat: additionalSections support on treatment pages | 122 pages provably unaffected |

## 9.1 The Georgia copy sweep was never committed

Commits 4 and 5 were dropped from the sprint as "already shipped." They are shipped in the
sense of being **written and verified**, not in the sense of being **in git** — the 674
meta-title rewrites sat uncommitted in the working tree and would not have reached the PR.

`components/data/treatments.tsx` alone carried 226 of them. Bundling those into a commit
titled "add additionalSections" would have mislabelled the diff and destroyed revert
granularity, so the sweep was landed first as its own commit and the 8a interface change
re-applied afterwards.

## 9.2 8a — verified by proof, not sampling

Raw byte comparison across two Next.js builds is meaningless: every build embeds a fresh
build ID and content-hashed asset paths, so all 10 sampled pages "differed" on first check.
Comparing rendered markup with `<script>` blocks and `/_next/static/*` paths normalised
away, **all 10 are identical**.

Stronger than the sample: **zero treatment records set `additionalSections`**, so the filter
matches nothing and the component returns `null` on all 122 pages. The render block is
provably inert until a record opts in.

## 9.3 🔴 Phase B — the cannibalization premise is largely refuted

Commit 11 assumes sibling pages have overlapping `metaTitle` / `metaDescription` / keyword
arrays to be pulled apart. **They mostly do not.** Measured keyword-array intersection:

| Pair | Shared keywords |
|---|---|
| `meniscus-surgery` vs `meniscus-repair-surgery` | **0 / 8 (0%)** |
| `shoulder-replacement` vs `resurfacing-shoulder-replacement` | **0 / 8 (0%)** |
| `spinal-fusion` vs `lumbar-fusion-surgery` | **0 / 7 (0%)** |
| `arthroscopic-knee-surgery` vs `shoulder-arthroscopy` | **0 / 8 (0%)** |
| `shoulder-replacement` vs `reverse-shoulder-replacement` | 3 / 8 (38%) |

The titles already encode the canonical/subtype split the brief wants to *create*:

- `meniscus-surgery` → **"Meniscus Surgery (Meniscectomy)"**
- `meniscus-repair-surgery` → **"Meniscus Repair Surgery"**
- `shoulder-replacement` → **"Total Shoulder Replacement"**
- `resurfacing-shoulder-replacement` → **"Resurfacing Shoulder Replacement"**

Even the 38% pair is weak: two of its three shared terms are generic
(`shoulder pain surgery`, `shoulder replacement specialist`) and the third is the
boilerplate state string that appears sitewide.

**One genuine overlap remains:** `spinal-fusion`'s keyword array contains **`lumbar fusion`**
and **`cervical fusion`** while a dedicated `lumbar-fusion-surgery` record exists. That is
the one page reaching into a sibling's head term.

### What this implies

If metadata is already differentiated and Google still deduplicates these pages by body
part, **metadata is not the lever — body content sameness is.** Every treatment page renders
the same 11 `<h2>` from the shared template, and that is what the exclusions cluster on.

This lowers the expected value of Commit 11 (mostly already done: what remains is
designating ownership, the one `spinal-fusion` keyword fix, and forward internal links) and
**raises the importance of Commit 12's differentiation pilot**, which tests the mechanism
that actually appears to be operating.

---

# Part 10 — Outcome claims, DDD cluster, location duplication (2026-09-01)

## 10.1 ✅ Commit 4 is genuinely committed

Checked the same way Commit 5 was: `components/data/clinics.tsx` has no uncommitted
changes, `lib/locationRedirects.ts` and `lib/locationConstants.ts` are clean, `8ed5da6`
landed the Atlanta work, and `upstream/main` contains **0** Georgia mentions against 2
locally. Commit 5 was the only one sitting uncommitted.

## 10.2 🔴 Outcome claims — 111 hits, never swept

The sweep has never been run and the result is much larger than the one Orlando line:

| File | Hits |
|---|---|
| `components/data/treatmentFAQs.ts` | **41** |
| `components/data/treatments.tsx` | **35** |
| `components/data/clinics.tsx` | **27** |
| `components/data/conditions.tsx` | 4 |
| `components/data/conditionFAQs.ts` | 4 |
| **Total** | **111** |

These are not marketing adjectives. They are **unsourced numeric medical statistics on YMYL
pages**:

- "**High success rate** exceeding 90% for complete pain relief"
- "70-90% success rate for pain relief"
- "85-95% success rate with anatomic repair techniques"
- "High success rate (80-85%) for symptom resolution"
- "High success rate with **80-90%** of patients achieving significant pain relief"
- "implants lasting 15-20 years or more"
- conditions.tsx: "80-90% good-to-excellent outcomes", "up to 80% success rate"

This is a different category from superlatives. It violates the standing content rule
outright, and unsourced medical outcome statistics across a templated tier are close to a
textbook description of what the December 2025 core update targeted. **Reported, not fixed —
111 edits is a scope decision, not a judgement call I should make alone.**

## 10.3 The location duplication and the outcome claim are the same sentence

Full analysis in `docs/seo/location-page-duplication-audit.md`. The headline:

| Measure | Result |
|---|---|
| Location pages | 24 |
| Distinct long sentences across all of them | 1,327 |
| Sentences on 2+ pages | 35 |
| Pages byte-identical after city masking | **0** |
| "Our fellowship-trained spine surgeons perform the full spectrum…" | **22 clinics** |
| "Patients choose MSO for our **high surgical success rates**…" | **20 clinics** |
| `high surgical success rates` in built location HTML | **23 of 24 pages** |

No page is wholly duplicate — every location page has some unique prose. The damage is
concentrated in two clinical paragraphs repeated 20–22 times with only the city swapped.

**The most-duplicated clinical paragraph is also the one making the outcome claim.** One
sentence is simultaneously duplicate content at scale and an unsourced YMYL claim. Fixing it
once fixes both, and it is the highest-value single edit in the audit.

Three Philadelphia location pages compete on the same city with near-identical prose:
`walnut` (483 impressions / 0 clicks / pos 72.2, in the duplicate bucket), `germantown`
(578 / 0 / 65.2), `tioga` (429 / 0 / 65.6).

## 10.4 DDD cluster — recommended owner

There are **four** URLs, not three:

| URL | Status |
|---|---|
| `/treatments/degenerative-disc-disease-surgery` | built |
| `/treatments/degenerative-disc-disease-surgery-details` | built |
| `/treatments/multilevel-degenerative-disc-disease-surgery` | built, properly differentiated |
| `/conditions/degenerative-disc-disease-surgery` | built **but a 301 source** (`next.config.ts:91`) → `/treatments/degenerative-disc-disease-surgery`, and sitemap-excluded |

The fourth is not a competitor — it redirects. The real conflict is the first two, and
**this is the one genuine metadata cannibalization on the site**:

- `…-surgery` → `"Degenerative Disc Disease Surgery | Fusion & Replacement FL"`
- `…-surgery-details` → `"Degenerative Disc Disease Surgery | Fusion & Disc Replacement Options"`

Near-identical, both leading with the same head term. My earlier pair analysis missed this
because neither slug was on the candidate list.

**Recommended owner: `/treatments/degenerative-disc-disease-surgery`** — because
`next.config.ts:91` already 301s the retired condition URL onto it, so the site has *already*
designated it canonical and it receives that consolidated signal. Demoting it would throw
that away. `-details` reads as a child page by its slug and should take the long tail
(what the operation involves, fusion vs disc replacement decision-making).

Self-reference confirmed: the `-details` page's related-treatments list links to its own
near-twin. Needs checking across the whole related-treatments generator, not just here.

---

# Part 11 — Commit 11b does not reproduce (2026-09-02)

**The missing-canonical bug does not exist in the codebase. There is nothing to fix.**

## Step 1 — reproduction failed, and the audit is clean

| Measure | Result |
|---|---|
| Built pages audited | **703** |
| Pages with **no** `<link rel="canonical">` | **0** |
| Self-referencing canonical | 374 |
| Cross-canonical (by design — the 324 area-of-pain + others) | 329 |

All nine reported pages emit a correct self-referencing canonical in **server-rendered**
`<head>`:

```
/patient-forms                          → …/patient-forms
/find-care/free-mri-review              → …/find-care/free-mri-review
/conditions/tfcc-tear                   → …/conditions/tfcc-tear
/conditions/yoga-injuries               → …/conditions/yoga-injuries
/treatments/artificial-disc-replacement-surgery → …/treatments/artificial-disc-replacement-surgery
/locations/pennsylvania/philadelphia-walnut-orthopedics → …(self)
```

The three known-good controls also pass, so the check itself is sound.

## Step 2 — root cause: the code is identical on production

- `lib/seo.ts` and `lib/metadata-seo.ts` are **unchanged** between `upstream/main` and HEAD —
  they do not even appear in the diff.
- `app/layout.tsx` differs, but its canonical logic is byte-identical on both:
  `alternates: { canonical: url }`.
- None of the nine is a dynamic (`ƒ`) route — all are statically prerendered with the tag
  baked in. The only dynamic routes are `/api/*`, `/blogs`, `/review/[locationSlug]`.
- Middleware does not touch `<head>`.

**So production emits these canonicals too.** There is no July 2026 regression in this
repo, and `git log` over the June–August window shows nothing touching the canonical path.

## What the GSC reading more likely means

The described pattern — six unrelated pages folding into `/about`, two into `/locations`,
one into `/` — is not what a missing tag produces. A missing tag makes Google pick a
*content twin*; it does not make `/patient-forms` and `/find-care/free-mri-review` collapse
into `/about`. Unrelated pages folding into a hub is characteristic of Google selecting a
hub canonical for pages it judges thin or low-value — **a quality signal, consistent with
the December core-update diagnosis, not a markup defect.**

Two readings worth checking against the raw inspection output before this is retired:

1. **URL variant.** If inspection ran on `www.`, `http://`, or trailing-slash forms, those
   redirect, and inspection of a redirecting URL reports user-declared canonical as N/A.
2. **Display artifact.** When Google selects a different canonical, "user-declared: N/A"
   can co-occur without asserting that no tag was served. The Google-selected value is the
   real signal.

## Consequence

**Commit 11b is retired unless the raw inspection output contradicts this.** Commit 11c
(internal linking for never-crawled pages) is unaffected — that finding rests on
"Discovered – currently not indexed", which needs no canonical explanation.

---

# Part 12 — Sprint complete: 55 commits (2026-09-02)

Working tree fully committed. `git status` clean.

| # | Commit | What |
|---|---|---|
| 1 | `6b76a8f` | RLS migration already applied to production |
| 2 | `33158ba` | Generated data files |
| 3 | `41156e2` | Internal link canonicalisation (+2 redirect chains collapsed) |
| 3b | `d8d3103` | Area-of-pain canonical resolution — 324 canonical / 65 noindex |
| 3c | `0aaccac` | `params` type fix — makes the 49 ceiling real |
| 5 | `a711300` | Multi-state copy sweep for Georgia (**was never committed**) |
| 6 | `0602df2` | Clinically grounded provider selection |
| 8a | `7bc5f6c` | `additionalSections` support on treatment pages |
| 11 | `5d38493` | Cannibalization — topic ownership, forward links, self-link fix |
| 14a | `6c5b9cb` | **Removed 111 unsourced outcome claims** |
| 15 | `e0d2bdf` | CI typecheck gate at 49 |
| — | `7d64ca7` | Six new providers; orthopedic-only positioning |
| — | `877dfb3` | Scoliosis paid LP; review-provenance schema |
| — | `6cfc6cd` | Schema, metadata and lead-contract hardening |

## 12.1 The largest finding: 111 unsourced outcome claims

Not marketing adjectives — **numeric medical statistics presented as fact on YMYL pages**:
"success rate exceeding 90%", "85-95% with anatomic repair techniques", "80-90% of patients
achieving significant pain relief", "implants lasting 15-20 years or more".

**41 were in `treatmentFAQs.ts`, which feeds `FAQPage` structured data** — so they were
shipped to Google as machine-readable claims from a surgical practice. That slice went first.

| File | Claims |
|---|---|
| `treatmentFAQs.ts` | 41 (incl. ~14 questions titled "What is the success rate of X?") |
| `treatments.tsx` | 35 |
| `clinics.tsx` | 27 |
| `conditions.tsx` / `conditionFAQs.ts` | 8 |

Replaced, not deleted — each statistic became what actually determines the result for that
procedure. **Verified: 0 claims remain; 122 FAQPage blocks / 539 questions all parse with no
empty or truncated answers.**

Deliberately kept: `stem-cell-treatment`'s "not a cure or guaranteed treatment" (a
disclaimer, the opposite of a violation) and a blog title that critically examines
success-rate numbers.

**One error caught and fixed mid-sweep:** a generic replacement matched under
`total-knee-replacement` and inserted nerve-compression text — carpal-tunnel content, wrong
for a knee, and on a pilot *control* page that should have had a minimal edit. Both faults
corrected in the same commit.

## 12.2 Two commits retired after measurement

**11b (missing canonicals) — does not exist.** 0 of 703 built pages lack a canonical; all
nine reported pages emit correct self-referencing tags; `curl` against production returns
HTTP 200 with the right tag on all seven checked; `lib/seo.ts` and `lib/metadata-seo.ts` are
identical between production and this branch.

**11c (never-crawled pages under-linked) — refuted.** Those four pages carry 29–174 inbound
internal links each and are all in the sitemap, against a site-wide median of 0. They are
among the best-linked pages on the site. Google is choosing not to fetch them, not failing
to find them.

## 12.3 What did NOT ship, and why

**Commits 8, 9, 10, 12 — the differentiation content.** These require writing original
clinical content for seven pilot pages to a standard where *"if this section could be pasted
onto the adjacent page with the noun swapped, it has failed."* That is authored medical
content, not a transformation, and producing it at speed is exactly how a pilot gets a null
result from a weak intervention — the failure mode the brief explicitly warned about.

The infrastructure is ready: `additionalSections` now exists on treatments (8a), the pilot
groups are locked with their control condition recorded, and the outcome sweep has already
run across both arms so recrawl is common to both.

**Commit 7 (7b hashing, 7d landing_path), 13 (injections LPs), 14 (PT + superlatives).**
~~Scoped and specified; not started.~~ **All three shipped 2026-09-06** — `86b5feb`,
`e90fcb6`, `80467de`. PT positioning was verified already clean repo-wide, so Commit 14
is superlatives-only. See Wave 13 in `UNDEPLOYED-COMMITS-FULL-REFERENCE.md`.

---

# Appendix — Reproduce every number here

```bash
git log --oneline origin/main..HEAD | wc -l        # 38
git diff --shortstat origin/main..HEAD             # 139 files, +5722 -1475
git diff --shortstat HEAD                          # 72 files, +1810 -1033
git ls-files --others --exclude-standard | wc -l   # 14

npm run build; echo "EXIT: $?"                     # 0, 751/751 pages
npx tsc --noEmit 2>&1 | grep -c "error TS"         # 49 (baseline)

find .next/server/app -name "*.html" -exec grep -l -i neurosurg {} \;   # empty
grep -c "<loc>" .next/server/app/sitemap.xml.body  # 339
```

**Constraints that must survive any future edit:** adult-only scope (no pediatric/AIS);
PT & chiropractic capped at one FAQ mention; no fabricated dollar figures or clinical
thresholds; insurance copy gated on approval; no city-variant pages; orthopedic-only
positioning.
