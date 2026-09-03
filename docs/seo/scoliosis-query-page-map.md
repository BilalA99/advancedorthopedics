# Scoliosis: Query → Page Ownership Map

Last updated: 2026-08-31

One URL owns each intent. When a new scoliosis query shows up in Search Console, look it
up here before creating anything — the default answer is "strengthen the owner", not
"build a page".

Volume/KD figures below come from the supplied Ahrefs export and are directional only.
The 288K combined volume in that export is **not** additive market size; the clusters
overlap heavily, so never quote a summed figure as reachable traffic.

---

## Owners

| Owner | URL | Role |
|---|---|---|
| **Scoliosis pillar** | `/conditions/adult-degenerative-scoliosis` | The commercial + informational authority for adult scoliosis. |
| **Deformity parent** | `/conditions/spine-deformities` | Broader adult spinal deformity entity (kyphosis, sagittal imbalance, complex/post-surgical deformity). Parent of the pillar, not a peer. |
| **Surgical hub** | `/treatments/adult-scoliosis-surgery` | The commercial owner of surgical intent: candidacy, approach selection, cost, recovery, risks. Added 2026-08-31. |
| **Treatment-decision blog** | `/blogs/adult-scoliosis-treatment-options-when-surgery-is-needed` | Narrative "how a surgeon decides" long-form. No longer the owner of the surgical query cluster — see below. |
| **Procedure pages** | `/treatments/spinal-fusion`, `lumbar-fusion-surgery`, `understanding-tlif-surgery`, `anterior-lumbar-interbody-fusion`, `lumbar-decompression`, `revision-spinal-surgery`, `epidural-steroid-injection` | Procedure-level intent. |
| **Local** | `/locations/{state}`, `/locations/{state}/{location}`, GBP | Proximity and "near me" intent. |
| **Paid only** | `/lp/adult-scoliosis-treatment` | Google Ads. `noindex, follow`, excluded from the sitemap. Owns **no** organic query. |

---

## Existing Page — Primary (scoliosis pillar)

These now have a matching H2 on the pillar and are answered in the first sentence
beneath it.

| Query cluster | Vol (approx) | Section that owns it |
|---|---|---|
| adult scoliosis treatment / degenerative scoliosis treatment / scoliosis treatment | 13,000 / 400 / — | H1 + Non-Surgical Treatment Options |
| degenerative scoliosis, adult scoliosis, scoliosis in adults, adult onset scoliosis | 1,400 / 800 / 900 / 350 | "What is Adult Degenerative Scoliosis?" |
| adult scoliosis symptoms | 200 | "Symptoms of Adult Degenerative Scoliosis" |
| does/can scoliosis cause back pain, scoliosis back pain, scoliosis lower back pain, is scoliosis painful | 1,000 / 800 / 1,100 / 300 | **"Can Adult Scoliosis Cause Back Pain, Sciatica, or Leg Symptoms?"** |
| can scoliosis cause sciatica, does scoliosis cause sciatica, scoliosis leg pain | 400 | same section |
| does scoliosis get worse with age, does scoliosis progress, scoliosis get worse over time | 700 / 200 / 100 | **"Does Adult Scoliosis Get Worse With Age?"** |
| what causes scoliosis in adults, can you develop scoliosis as an adult | 700 / 600 | "Causes and Risk Factors" + progression section |
| how is scoliosis diagnosed, scoliosis x ray, cobb angle, how to know if you have scoliosis | 250 / 1,000 / — / 1,300 | **"How Is Adult Scoliosis Diagnosed? X-Rays, Cobb Angle, and MRI"** |
| scoliosis doctor, scoliosis specialist, what kind of doctor treats scoliosis | 1,700 / — | **"What Type of Doctor Treats Adult Scoliosis?"** + the physician module |
| can scoliosis be corrected in adults / treatment without surgery | 300 / 250 | progression section (honest "no" on straightening) + conservative care |

## Surgical Hub — `/treatments/adult-scoliosis-surgery` (owner as of 2026-08-31)

This cluster moved off the blog and onto a treatment page. The site had a condition
pillar for scoliosis but no treatment-side page, unlike degenerative disc disease which
has both — the blog was absorbing commercial surgical intent that a procedure page is
better placed to serve, and that a blog URL converts poorly for.

| Query cluster | Vol (approx) | Section that owns it |
|---|---|---|
| scoliosis surgery, adult scoliosis surgery, what is scoliosis surgery | 9,600 / 450 / 60 | H1 + "When Adult Scoliosis Surgery Becomes the Right Option" |
| what degree of scoliosis requires surgery, can surgery fix scoliosis | 300 / 50 | "Who Is a Candidate for Adult Scoliosis Surgery?" + FAQ |
| how to fix / can you fix / can scoliosis be fixed without surgery | 150 / 100 / 90 | candidacy list + "Can adult scoliosis be fixed without surgery?" FAQ |
| how does scoliosis surgery work, how long does scoliosis surgery take | 80 / 100 | "How Adult Scoliosis Correction Is Planned and Performed" + FAQ |
| scoliosis surgery recovery, how long is scoliosis surgery recovery | 600 / 80 | "Recovery After Adult Scoliosis Surgery" + FAQ |
| is scoliosis surgery dangerous, what are the risks, is it painful | 150 / 60 / 80 | risk FAQ |
| scoliosis surgery cost cluster | 250 / 200 / 150 / 70 | cost FAQ — **cost-driver framework only, never a dollar figure** |
| how much is scoliosis surgery with insurance, does insurance cover it | 100 / 70 | ⚠️ **not served** — held in `docs/seo/PENDING-temur-insurance-faq-adult-scoliosis-surgery.md` pending approval |
| PT / chiropractic cluster | ~940 combined | one FAQ paragraph only, by policy. Not targeted in metadata, no H2. Do not expand. |

Differentiation to preserve, now three-way: the **pillar** answers "what is this and what
are my options"; the **surgical hub** answers "am I a candidate, what happens, what does
recovery look like"; the **blog** keeps only narrative decision-making long-form. If the
blog starts outranking the hub for `adult scoliosis surgery`, that is cannibalization —
trim the blog, do not expand it. The hub links down to `OLIF`, `XLIF`, `ALIF`, `TLIF`,
`spinal-fusion`, and `revision-spinal-surgery` for procedural depth rather than
duplicating it; those pages link back up to the hub.

## Local / GBP

`scoliosis doctor near me` (600), `scoliosis specialist near me` (600), `scoliosis
treatment near me` (500), `scoliosis surgeon near me`, `adult scoliosis specialist near
me`, `scoliosis clinic` (150).

~33 local-intent queries in the export, ~24 showing a Local Pack. These are **not** won
by the pillar. They are won by location pages, physician pages, and GBP proximity.
Do not create `/scoliosis-doctor-{city}` pages — Florida city variants show near-zero
volume and would be thin duplicates of the existing location architecture.

## Paid Landing Page

Ad groups: adult scoliosis treatment · degenerative scoliosis treatment · scoliosis
doctor/specialist (+ near me) · adult scoliosis surgery · scoliosis surgeon · spinal
deformity surgeon. All land on `/lp/adult-scoliosis-treatment`, which is noindexed so it
cannot compete with the pillar.

## HOLD — needs SERP evidence before building

- **`lumbar scoliosis`** (4,800, TP ~30,000) and `lumbar scoliosis treatment` (600).
  High volume, but do not create `/conditions/lumbar-scoliosis` on volume alone. First
  check whether Google treats "lumbar scoliosis" and "adult degenerative scoliosis" as
  distinct intents: pull the top 10 for both and measure URL overlap. High overlap →
  strengthen the pillar's lumbar language. Low overlap with lumbar-specific resources
  ranking → then build, with genuinely differentiated content.
- ~~**A standalone adult scoliosis surgery page.**~~ **Built 2026-08-31** as
  `/treatments/adult-scoliosis-surgery`. This entry previously said not to build it on
  the grounds that the blog and procedure pages covered the intent. That reasoning was
  overturned deliberately: the coverage was real but split across a blog post and six
  procedure pages with no hub, leaving `scoliosis surgery` (9,600) and the whole
  candidacy/cost/recovery cluster without a single commercial owner. Recorded here rather
  than deleted so the reversal is visible.
- **A standalone progression article** (`does scoliosis get worse with age`). Now a
  section on the pillar. Promote to its own URL only if that section earns meaningful
  impressions *and* the SERP favours standalone pages.

## Ignore

The head term **`scoliosis`** (~229,000, KD ~73) and the pediatric/adolescent cluster.
Mixed and largely non-commercial intent for an adult orthopedic practice. Adult
relevance is stated prominently on the pillar precisely so this traffic self-selects.

Do not turn the 2,500-query question export into 2,500 FAQs or URLs. It is ~157K raw
monthly volume with heavy semantic overlap; the clusters above absorb the commercially
useful part of it.

---

## Cannibalization controls in place

- Pillar `<title>`: "Degenerative Scoliosis: Adult Treatment & Surgical Options".
  Deformity parent `<title>`: "Adult Spinal Deformity: Scoliosis, Kyphosis & Correction
  Options". Distinct head terms, distinct H1s.
- The pillar is deliberately **not** geo-locked to Florida. It is a multi-state condition
  authority; geography belongs to the location, physician, and GBP layer.
- The paid page is `noindex, follow` with a self-referencing canonical and is absent from
  `app/sitemap.xml/route.ts`.
- Pillar vs. surgical hub: the pillar owns Cobb angle, diagnosis, doctor-type selection,
  and non-surgical care and does **not** re-explain surgery; the hub owns candidacy,
  approach, risk, cost, and recovery and does **not** re-explain the condition. The
  pillar's "When Surgery is Needed" CTA now points at the hub; the hub's overview and CTA
  point back at the pillar.
- Related-link rendering deduplicates by slug and cannot link a page to itself.

**Before acting on a suspected cannibalization**, prove it in Search Console: filter
queries by `scoliosis|degenerative scoliosis|adult scoliosis|spinal deformity|lumbar
scoliosis`, compare query × landing page over time, and look for URL swapping or an
unstable preferred URL. Two pages both mentioning "scoliosis" is not evidence.

---

## Commit 10 — local query coverage (2026-09-03)

### `scoliosis specialist near me` — KD 0, CPC $1.80, the strongest commercial signal in the cluster

**Owner: the location pages, not a new national page.** This is a local query and was
deliberately not given its own URL.

Before this commit the treatment page linked to all five state hubs, but the reverse
direction did not exist: **no location page linked to `/treatments/adult-scoliosis-surgery`
at all**, and each mentioned scoliosis exactly once.

The cause was not content. `components/LocationSeoSections.tsx` prioritises which eight
treatments per body-part group get linked, and `adult-scoliosis-surgery` was not in the
Spine priority list — so it never made the cut on any of the 24 clinic pages.

Fixed by adding it to the Spine `priorityTreatments`. Verified: clinic pages now link the
scoliosis treatment page. State hubs (`/locations/georgia` etc.) render through
`StateSeoSections` and still do not — recorded as a remaining gap, not addressed here.

### `adult scoliosis treatment` — TP 4,100

**Already served by the existing pillar; no new section written.** The pillar carries nine
sections including "Non-Surgical Treatment Options for Degenerative Scoliosis", "When
Surgery is Needed for Adult Degenerative Scoliosis" and "What Type of Doctor Treats Adult
Scoliosis?". Adding a tenth treatment-options section would have duplicated content already
present and failed the noun-swap test against its own page. Scope was deliberately small
here; this is the "finish and stop" line.

### `lumbar scoliosis` — 4,800 volume — remains on HOLD

Unchanged. The SERP-overlap test against `/conditions/adult-degenerative-scoliosis` runs
before any decision. Do not build `/conditions/lumbar-scoliosis`.

### Blog articles — not published

Blog content lives in the production Supabase `blogs` table, not this repo.
`components/data/blogs.ts` is a stale decoy with six unrelated entries that nothing renders.
Publishing would mean INSERTs against production.
