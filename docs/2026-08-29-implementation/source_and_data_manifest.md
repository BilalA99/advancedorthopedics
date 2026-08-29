# Source and Data Manifest — 2026-08-29

## Inputs that were expected but do not exist in the workspace

The brief presents these as attached. None are present in the repository or the
working directory. They were **not** read, and no conclusion in this work rests
on them.

| Expected input | Status |
|---|---|
| `01-layout.tsx` … `16-painconditions.tsx` (16 TSX snapshots) | absent |
| `Countries(2).csv`, `Devices(2).csv`, `Filters(2).csv`, `Pages(2).csv`, `Queries(2).csv`, `Search appearance(2).csv` | absent |
| `Chart(1).csv`, `Reports_snapshot (1).csv` | absent |
| `mountainspineorthopedics_05-aug-2026_all-issues_2026-08-28_23-08-51.zip` (30 issue reports) | absent |
| `florida_ads_final_execution_report.md`, `florida_ads_measurement_handoff.md`, `florida_ads_notion_update.md`, `florida_ads_task_status*.md` | absent |
| `florida_ads_execution_pmax_assets_destinations.csv`, `florida_ads_execution_search_terms.csv` | absent |

The numeric findings quoted in the brief (GSC totals, device splits, page and
query tables, the 30-issue Ahrefs inventory) are therefore **unverified inputs**
in this pass. They are treated as directional context, not as evidence. Where a
brief figure could be checked against the live repository it was, and several
did not survive — see "Superseded" below.

## Inputs actually used

| Source | What it gave | Limits |
|---|---|---|
| Live repository, branch `HomeSEO` rebased onto `upstream/main` @ `5c99f1b` | Route tree, data layer, schema generation, redirect table, sitemap, form/measurement code | Source of truth per the brief's own hierarchy |
| `git` history and working tree | Recovery of the uncommitted SHARED-02/03 work | — |
| Supabase MCP, project `bwrnnmzqipnoakmdbevz` (`mountainspine`) | Live `public.forms` schema; 1,142 rows; migration applied and verified | Production; read-only except the one approved additive migration |
| `components/data/clinicsForMap.generated.ts` (GBP-derived) | 23 locations, 530 reviews, 4.98 weighted average — the basis for every review figure now shown | Derived from `clinics.tsx`; provenance of individual review bodies still unconfirmed |
| Production build output (`.next/server/app/**/*.html`) | Rendered titles, canonicals, H1 counts, JSON-LD, tel links | Build-time HTML, not live production |
| Local production server (`npm start`) | Live sitemap (333 URLs) and redirect status codes | localhost, not production |
| `npm run test:measurement` | 8/8 measurement contract assertions | Unit/JSDOM level, not live GA4 |
| `npx tsc --noEmit` | 43 pre-existing errors, unchanged | `next.config.ts` sets `ignoreBuildErrors`, so these do not gate the build |

## Not available this session

- **Notion** — only the `authenticate` tool is exposed, so no task could be read
  or updated. All Notion content is staged in `notion_task_reconciliation.md`.
- **Ahrefs MCP** — available but not queried in this pass; the repository and
  live server provided direct evidence for the issues actually worked on.
- **GA4, GTM, Tag Assistant, CallRail, Google Ads** — no access. Every claim
  depending on them is marked unverified in `measurement_qa_report.md`.
- **Real devices / non-Chromium browsers** — no iOS Safari or Android device.

## Superseded: brief premises contradicted by live code

Checked directly; the brief's version is stale in each case.

| Brief premise | Live finding |
|---|---|
| Hollywood coordinates point outside Florida | Correct: 26.0113548, −80.1789073 |
| Palm Beach Gardens has an incomplete address | Complete: 3355 Burns Rd STE 304, with lat/lng, placeUrl, embed and gallery |
| Location metadata fallback forces FL | Reads `location.stateSlug`; `STATE_METADATA[state]` drives the rest |
| Review schema uses generic "Patient Review" authors | Zero occurrences; authors are named individuals |
| Homepage `reviewCount: 250000` | Was `200` (now removed as unverified) |
| Unknown location slugs produce an indexable "Not Found" page | `notFound()` is called; no canonical emitted |
| Treatment JSON-LD is duplicated by a client component appending scripts | `TreatmentDetailsClient.tsx` is dead code, imported nowhere |
| `(123) 456-7890` is a live placeholder phone | Form input placeholders — correct UX, not a defect |
| NJ/NY phone content leaks onto the Florida PBG page | Comes from the site-wide footer, which lists all three state contacts by design |
| 4 redirecting URLs in the sitemap | **Confirmed still live**, and fixed this session |

## Confirmed and unreported by the brief

- `/conditions/spine` does not exist — SHARED-15 is a create, not a rebuild.
- `/find-care/book-an-appointment` claimed **4.8 stars from 1,247 reviews**, the
  largest unverified rating on the site.
- The injections page carried three invented named patient testimonials with
  specific clinical outcome claims.
- Production `public.forms` was missing the columns the committed code writes —
  a deploy in the wrong order would have zeroed lead capture.
- Location pages emitted a non-E.164 `tel:` link alongside correct ones.
- No location page mentioned the Free Second Opinion offer that the approved
  PBG ads lead with.
