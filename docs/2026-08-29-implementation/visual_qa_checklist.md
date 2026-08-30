# Visual QA checklist — pages for Bilal to review

Server: `npm start` → **http://localhost:3000**
(If pages look unstyled, the server is stale relative to the build — stop it,
`npm run build`, start once, and confirm the page's `/_next/static/css/*.css`
returns 200 before trusting anything you see.)

Check each at a desktop width and a phone width. Chrome's minimum window width
on Windows is ~486px, so use DevTools device mode for a true 390px.

---

## Tier 1 — I changed these substantially. Please review closely.

| Page | What changed | Link |
|---|---|---|
| Insurance | Rebuilt: PPO-first messaging, hero "At a glance" panel, interactive plan checker | http://localhost:3000/insurance-policy |
| South Miami location | **Renamed entity** + corrected coordinates (was 1.3km off) + Second Opinion callout | http://localhost:3000/locations/florida/south-miami-orthopedics |
| Old Miami URL | Must 301 to South Miami, not 404 | http://localhost:3000/locations/florida/miami-beach-orthopedics |
| Palm Beach Gardens | Second Opinion callout, E.164 phone links — the paid-launch page | http://localhost:3000/locations/florida/palm-beach-gardens-orthopedics |
| Conditions hub | Server-rendered shell + 110 crawlable links; pagination now wraps on mobile | http://localhost:3000/conditions |
| Treatments hub | Server-rendered shell + 121 crawlable links; pagination wraps | http://localhost:3000/treatments |
| Blog post | New conversion module at article end (variant: second-opinion) | http://localhost:3000/blogs/what-is-the-hardest-orthopedic-surgery-to-recover-from |
| Area-of-pain page | 729kB → 325kB, cross-canonical to /conditions, hidden duplicate H1 removed | http://localhost:3000/area-of-pain/back-pain/herniated-disc |

## Tier 2 — schema/claims stripped or headings changed. Spot-check for gaps.

| Page | What changed | Link |
|---|---|---|
| Homepage | Removed fabricated aggregateRating 5.0/200 | http://localhost:3000/ |
| Book an appointment | Removed 4.8/1247 rating; duplicate mobile H1 demoted | http://localhost:3000/find-care/book-an-appointment |
| Orthopedic injections | Removed 5.0/54 rating **and 3 invented patient testimonials** | http://localhost:3000/treatments/orthopedic-injections |
| FAQs | Insurance answer corrected to PPO-only | http://localhost:3000/about/faqs |
| Car accident | Removed fabricated clinicians + example.com placeholders; review count now real | http://localhost:3000/injuries/car-accident |
| Work injury | Review count now derived from GBP data | http://localhost:3000/injuries/work-injury |
| Condition detail | Doctor selection now deterministic | http://localhost:3000/conditions/sciatica |
| Treatment detail | Doctor selection now deterministic | http://localhost:3000/treatments/kyphoplasty |
| Spine hub | Untouched — exists and is healthy; included as a sanity reference | http://localhost:3000/conditions/spine |
| Find a doctor | Hidden layout H1 removed | http://localhost:3000/find-care/find-a-doctor |
| Second opinion | Hidden layout H1 removed | http://localhost:3000/find-care/second-opinion |
| Condition check | Was 9 H1s, now 1 | http://localhost:3000/condition-check |
| Thank you | Conversion restore removed — must fire NO conversion on load/refresh | http://localhost:3000/thank-you |

## Tier 3 — reference pages I did not change (your design benchmark)

| Page | Link |
|---|---|
| Homepage anatomy selector | http://localhost:3000/ |
| Injections page | http://localhost:3000/treatments/orthopedic-injections |
| Locations hub (correctly server-rendered — control) | http://localhost:3000/locations |

## Known-imperfect, so you are not surprised

| Page | Issue |
|---|---|
| http://localhost:3000/landing-page | Orphan: 0 sitemap entries, 0 inbound links, 3 unnamed buttons |
| http://localhost:3000/area-of-pain/foot-pain/footpaintreatmentoptions | Data-less stub, slug-derived title, no `<html lang>` — now noindex |
| http://localhost:3000/insurance-policy | 3 duplicate element ids (`first_name`/`last_name`/`postal_code`) from two form instances |

## What to look for

1. Anything visually broken, misaligned, or overflowing sideways.
2. Any remaining claim that overstates: "most major insurance", "PPO preferred",
   star ratings, "same-day appointments", "8AM–8PM 7 days".
3. Wrong phone number for the market, or a number that is not `(561) 223-9959`
   on a Florida page.
4. The Second Opinion callout reading accurately (free, within 24 hours, needs
   uploaded imaging, no promise of candidacy).
5. On `/insurance-policy`: pick **Aetna PPO**, then **Medicare**, then
   **HMO plans (any carrier)** — the answer *and* the call-to-action should
   change each time, and "Not accepted" must never offer "Verify my benefits".
