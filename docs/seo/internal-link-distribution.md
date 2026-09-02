# Internal link distribution

**Produced:** 2026-09-02 · **Status:** report only, no code changes
**Tool:** `scripts/internal-link-distribution.mjs` (server-rendered links only)

---

## ⚠️ Correcting the premise this document was commissioned to test

The hypothesis was: *"a site median of zero inbound internal links means most of 703 pages
have no internal links pointing at them — an orphan-page problem at scale, and a candidate
contributor to the indexation losses."*

**The median of zero is real, and it is entirely an `/area-of-pain/*` artifact. It does not
describe the tier that is being excluded.**

That was my own imprecise phrasing — quoting a whole-site median while discussing the
templated tier — and it generated a hypothesis the data does not support.

| Group | n | zero inbound | median | mean |
|---|---|---|---|---|
| ALL built pages | 703 | **387** | **0** | 63.3 |
| excluding `/area-of-pain` | 313 | 15 | 43 | 134.7 |
| **templated tier** (`/conditions` + `/treatments`) | **246** | **3** | **41** | **60.0** |
| — `/conditions/*` | 124 | 3 | 51 | 68.3 |
| — `/treatments/*` | 122 | **0** | 36 | 51.6 |
| `/area-of-pain/*` | 390 | **372** | 0 | 6.0 |
| `/locations/*` | 29 | 0 | 701 | 701.0 |

Pages with zero inbound links, by section: **372 area-of-pain**, 3 conditions,
1 condition-check, 1 root. That is the whole list.

### What this means for the exclusion question

- **No treatment page is orphaned.** Minimum inbound across all 122 is **4**; median 36.
- **Three condition pages** have zero inbound, out of 124.
- So **at most 3 of the ~123 excluded pages could be orphans** — an upper bound, since it
  is not established that those 3 are among the excluded set.

A tier whose median page carries **41 inbound internal links** is not being excluded for
lack of internal linking. **The orphan hypothesis cannot explain the indexation losses and
should not displace the content hypothesis.**

The orphan problem that does exist is confined to `/area-of-pain/*`, and Commit 3b already
resolves it: 324 of those pages now canonicalise to their `/conditions` equivalent and 65
are noindexed. Those pages are not meant to be indexed, so having no inbound links is
consistent rather than problematic.

---

## Top 20 by inbound links

Twenty pages sit at exactly **701** inbound — i.e. linked from essentially every other page.
These are global chrome: the footer's location list, the primary hubs, and the main CTAs.

```
701  /about,  /about/faqs,  /conditions
701  /find-care/book-an-appointment,  /find-care/find-a-doctor,  /find-care/free-mri-review
701  /injuries/car-accident
701  /locations/florida  … and every Florida clinic
701  /locations/georgia,  /locations/georgia/atlanta-orthopedics
```

Worth noting: `/find-care/free-mri-review` and `/find-care/book-an-appointment` — two of the
pages reported as index-problem cases — are among the **most-linked pages on the site**.
Whatever is holding them back, it is not internal linking.

## Top 20 by outbound links

```
340  /sitemap
187  /locations/{florida,georgia,new-jersey,new-york,pennsylvania}
160  /treatments,  and ~157–161 from each individual clinic page
```

Clinic pages are the site's main link distributors, each emitting ~157–161 links into the
condition and treatment tiers. That is what gives the templated tier its healthy median.

---

## Confirmed: client-side nav contributes nothing

`components/NavBar.tsx` and all three body-part dropdowns (`back-pain-dropdown.tsx`,
`foot-pain-dropdown.tsx`, `neck-and-shoulder-dropdown.tsx`) are `'use client'`. Their 21
area-of-pain references and the full services menu **never reach server-rendered HTML** —
verified: the homepage server-renders **zero** `/area-of-pain/` links.

Every number in this document is therefore what Googlebot sees on its first pass, without
executing the client bundle. The healthy templated-tier median is real link equity, not an
artifact of counting nav.

This also explains why the 390 area-of-pain pages are orphaned in the first place: they were
only ever reachable through client-rendered dropdowns.

---

## Limitation

The excluded-vs-indexed split requested cannot be computed precisely here: the 137-URL
excluded export lives in Search Console, not in this repo. What can be stated is the upper
bound above — with zero orphaned treatment pages and three orphaned condition pages, the
overlap between "excluded" and "orphaned" is at most 3 pages regardless of which URLs the
export contains.

## Recommendation

**Do not open an internal-linking workstream on the strength of the whole-site median.** The
templated tier is adequately linked. If a page-level join against the excluded export later
shows excluded pages clustering in the low tail of the inbound distribution (below ~10), that
would be worth revisiting — but the tier-level numbers give no reason to expect it.
