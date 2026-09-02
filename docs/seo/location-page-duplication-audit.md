# Location page duplication audit

**Produced:** 2026-09-01 · **Status:** report only, no code changes
**Scope:** the 24 `/locations/{state}/{clinic}` pages
**Why it is report-only:** editing location pages mid-experiment would confound the
Commit 12 differentiation pilot. This becomes its own sprint after the pilot reports.

---

## Method

Prose extracted from built HTML (`<p>` and `<li>` only, scripts and styles stripped), then
city, state, county and neighbourhood tokens masked to `CITY` so that pages differing only
by place name collapse to the same string. Sentences under 90 characters excluded as noise.

Reproduce: `scripts/`-free, see the transcript script `locdup.py`; source counts via
`grep -c` against `components/data/clinics.tsx`.

---

## Headline numbers

| Measure | Result |
|---|---|
| Location pages analysed | **24** |
| Distinct long sentences (>90 chars) across all pages | 1,327 |
| Long sentences appearing on **2 or more** pages | **35** |
| Long sentences appearing on **all 24** pages | **6** |
| Pages byte-identical after city masking | **0** |

**No page is wholly duplicate.** Every location page carries some genuinely unique prose,
so this is not a pure spun-template situation. The problem is concentrated in a small
number of paragraphs that repeat at very high multiples.

---

## The repeated blocks, by reach

| Shared string (source: `clinics.tsx`) | Clinics |
|---|---|
| "Our fellowship-trained spine surgeons perform the full spectrum of minimally invasive and reconstructive spine surgeries…" | **22** |
| "Patients choose Mountain Spine & Orthopedics for our **high surgical success rates**, cutting-edge technology, and fast recovery protocols tailored to each patient." | **20** |
| "Our [CITY] orthopedic surgeons perform minimally invasive spine procedures including microdiscectomy, laminectomy, spinal fusion, ACDF, and artificial disc replacement…" (FAQ answer) | **6** |
| "[CITY] patients benefit from our advanced treatment options including epidural steroid injections, minimally invasive spine surgery, lumbar fusion, and artificial disc replacement." | **3** |

Six further sentences appear on all 24 pages, but those are shared page chrome — the cookie
notice, the second-opinion upload block, the "Book an Appointment" panel, and two
value-proposition cards. Chrome repeating sitewide is normal and is **not** the finding.

The finding is the first two rows: **two clinical paragraphs, carrying the substance of what
the practice claims to do, repeated across 20–22 of 24 pages with only the city swapped.**

---

## 🔴 The two problems are the same sentence

The most-duplicated clinical paragraph is also the one making an unsubstantiated medical
outcome claim. **"high surgical success rates" appears on 23 of the 24 built location pages.**

That single sentence is simultaneously:

1. **Duplicate content at scale** — the noun-swap test failing verbatim, 20+ times.
2. **An unsourced YMYL outcome claim** — a direct violation of the standing content rule,
   on the pages paid traffic lands on.

Fixing it once fixes both. It is the highest-value single edit identified in this audit,
and it belongs in Commit 14 rather than waiting for the location sprint.

---

## Which location pages are in trouble in GSC

Only one location page is confirmed in the duplicate-without-canonical bucket:

- `/locations/pennsylvania/philadelphia-walnut-orthopedics`

Ahrefs GSC data over 90 days shows it at **483 impressions, 0 clicks, position 72.2**.
Two sibling Philadelphia pages sit alongside it with similar profiles
(`philadelphia-germantown` 578 impressions / 0 clicks / position 65.2;
`philadelphia-tioga` 429 / 0 / 65.6). Three Philadelphia location pages competing on the
same city term, all with near-identical prose, is the clearest single instance.

By contrast the well-performing location pages carry substantially more unique content:
Hollywood (54 clicks, 15,910 impressions), Princeton (27 clicks), Orlando (26 clicks),
Boca Raton (25), Davenport (24 clicks at position 8.2).

**The correlation is directionally consistent** — pages with more unique prose perform, the
near-duplicates do not — but with n=24 and many confounds (GBP strength, review counts,
market size) this is an observation, not a demonstrated cause.

---

## What genuinely location-specific content would look like

The current template varies only the city name inside otherwise fixed clinical prose. That
is find-and-replace differentiation, which is exactly what the noun-swap test rejects.
Content that could not be pasted onto a sibling page would name things true only of that
site:

- **Which providers actually practise there**, by name, with their care domains.
  `doctors[].locations` already holds this relationship and no page renders it.
- **Which procedures are performed at that site** versus referred elsewhere — a surgery
  centre and a consultation office are not the same offering, and West Orange is already
  flagged in the data as a surgery centre.
- **The referral and access pattern** — which hospitals it admits to, what the parking and
  transit situation actually is, which languages the front desk speaks. Hollywood already
  names bilingual Spanish-speaking staff; that sentence is unique and useful.
- **The local catchment in specific terms** — the neighbourhoods and adjacent towns that
  clinic actually draws from, which several pages already do well.

Deliberately **not** on this list: hours, wait times, same-day promises, review counts, or
anything else unverified. The gating principle stands — unknown fields stay unset.

---

## Recommendation

1. **Now, in Commit 14:** remove the outcome claim from the 20–23 pages carrying it. It is
   a content-rule violation independent of the duplication question.
2. **Not now:** the paragraph-level rewrite. It needs its own sprint, and it must not run
   during the Commit 12 observation window or the pilot's control group is contaminated.
3. **When it does run:** sequence Philadelphia first. Three near-identical pages competing
   on one city is the sharpest test case, and one of them is already excluded.
