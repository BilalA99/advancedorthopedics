# Accessibility QA — 2026-08-29

Measured with `node scripts/audit-a11y-static.mjs .next/server/app` against the
production build. This is the mechanical subset of WCAG that is decidable from
markup; it is **not** a substitute for axe, a real screen reader, or device
testing.

## Results across all 693 built pages

| Check | Before | After |
|---|---:|---:|
| Images with no `alt` | 0 | **0** |
| Links/buttons with no accessible name | 252* | **26** |
| Form fields with no label | 824* | **22** |
| Pages with no skip link | 693 | **1** |
| Pages with no `<html lang>` | 1 | 1 |
| Duplicate element ids | 3 | 3 |

\* Before-figures for names and labels were measured on a 120-page sample; the
after-figures cover all 693, so the real reduction is larger than the table
implies.

## What was fixed and why it was broken

**Reduced motion (WCAG 2.3.3).** `globals.css` neutralises CSS animation under
`prefers-reduced-motion`, but Framer Motion animates inline styles from
JavaScript — `transition-duration: 0.01ms !important` never touched it. Reveal,
SlidingDiv, TextAnimate and the marquee all kept moving for users who had asked
them not to. Now wrapped in `<MotionConfig reducedMotion="user">`, which skips
transform and layout animation while letting opacity and filter resolve, so
content that starts hidden still appears.

**Skip link (WCAG 2.4.1).** The component existed but was never rendered, and
two of its three targets did not exist. Rewritten to a single working link with
a real `#main-content` landmark in the root layout.

**Accessible names (WCAG 4.1.2 / 3.3.2).** Three distinct root causes, all
invisible without inspecting built HTML:

1. Hardcoded `id="first_name"` overrode the id shadcn's `FormControl` supplies,
   severing `<label for>`. Ids retained (GTM may target them for Enhanced
   Conversions — unverifiable from the repo), `aria-label` added instead.
2. Injury lead-capture inputs sit inside a wrapper `<div>` within
   `<FormControl>`. `FormControl` forwards its id to its *direct* child via
   `Slot`, so the id landed on the div.
3. Hero mini forms used raw placeholder-only inputs. A placeholder is not a
   label and disappears on input. Added `aria-label` plus `name`,
   `autoComplete` and `inputMode` — which also restores autofill.

## Known remaining

- **22 form fields** without a label, and **26 links/buttons** without a name —
  concentrated on `/landing-page` and Radix `SelectTrigger` instances.
- **3 duplicate ids** on `/insurance-policy`.
- **`/area-of-pain/foot-pain/footpaintreatmentoptions`** renders without
  `<html lang>` or a skip link. It is the data-less stub, already `noindex`.

## Not tested — needs real devices or tooling this environment lacks

Colour contrast, focus order and focus visibility under keyboard, screen reader
announcement, 200% zoom reflow, touch target sizes in a real viewport, and the
full device/browser matrix (iOS Safari, Android Chrome). No screenshots were
captured: the machine could not hold a browser and a build concurrently.

Every claim above is from static markup analysis of the production build. None
of it has been verified on a deployed site.

---

# Browser QA — desktop, 2026-08-29

Driven against `npm start` on localhost with Chrome automation at a 1536px
viewport. **Mobile was not tested** — see blockers.

## Verified working

| Check | Result |
|---|---|
| `/locations/florida/miami-beach-orthopedics` | 301s to `/south-miami-orthopedics` |
| South Miami page | 1 H1, self-canonical, 0 occurrences of "Miami Beach", 105 of "South Miami" |
| Second Opinion callout | Renders in the decision path with the verified 24-hour scope and both links |
| PBG page | 1 H1; every `tel:` link E.164 (`+15612239959`, `+19732596756`, `+16463895606`); offer present; no placeholder phone |
| `/conditions`, `/treatments` | 1 H1 each; skip link and `#main-content` landmark present |
| Blog conversion module | Resolves to `second-opinion` on the surgery-recovery post; 3 CTAs with `data-cta-action` |
| dataLayer on page load | `gtm.js`, `gtm.dom`, `gtm.load` only — **0 lead events** |
| Empty form submit | **0 `lead_form_submit_success`**, no navigation to `/thank-you` |

The `TextAnimate` H1 appears faint in a screenshot taken mid-animation but
settles to `opacity: 1`, `transform: none`. Not a defect.

## Found during testing

**Silent validation failure (pre-existing).** Submitting the hero mini form
empty produces no error message, no `aria-invalid`, and the inputs carry no
`required` attribute — the form simply does nothing. The conversion invariant
holds, but the user gets no feedback. WCAG 3.3.1 (Error Identification).

**NAP inconsistency on the renamed page.** The South Miami page displays
`7000 SW 62nd Ave, Suite 330, Miami, FL 33143` while its title, H1, breadcrumb
and schema all say South Miami. **Deliberately not changed**: the address must
match the Google Business Profile exactly, and the repo disagrees with itself —
`GBP_ADDRESSES` says "Miami, FL 33143" while the clinic's own Google Maps
`link` says "South Miami, FL 33143-4716". Guessing here would risk a real NAP
mismatch, which is worse than the cosmetic inconsistency. Needs the GBP listing
checked.

## Blocked

- **Mobile viewport.** `resize_window` reports success but `innerWidth` stays
  at 1536 — the Chrome window is maximized, which prevents programmatic
  resizing. Stopped after three attempts. Needs the window restored down.
- **Screenshot capture** timed out twice on tall pages with ~400–700MB free RAM
  (Chrome alone was using 2.2GB across 38 processes).
- **End-to-end lead submission** not attempted: it writes to the production
  `forms` table and sends a patient email via Resend. Requires explicit
  approval and an identifiable test record.

---

# Browser QA — mobile, 2026-08-29

Chrome was restarted un-maximized to make the viewport resizable. **Viewport
floor is 486–502px CSS**, not 390px: Chrome enforces a minimum window width on
Windows and device emulation is not available through these tools. The mobile
breakpoint is genuinely active (`max-width: 640px` matches, `min-width: 1024px`
does not), so mobile layout is exercised — but this is a large-phone width, not
an iPhone-sized one. A true 390px pass still needs a real device or DevTools
device mode.

## Bug found and fixed

`/conditions` and `/treatments` **scrolled horizontally** on mobile —
scrollWidth 527 and 550 against a 486px viewport. The brief's rule is that the
body must never scroll sideways.

The obvious suspect was wrong. The body-part chip row uses `flex-nowrap` on
mobile, which looks like the cause, but it sits inside a container that already
has `overflow-x-auto` and scrolls correctly within its own box. Walking the DOM
for elements that overflow the viewport *and* are not clipped by a scroll
ancestor found the real culprit: the pagination control — 612px of page numbers
in a `flex flex-row` with no wrap and no scroll container.

Fixed with `flex-wrap justify-center gap-1` (gap rather than `space-x`, which
leaves wrapped rows touching). Verified: mobile wraps to 2 centred rows with no
overflow; desktop stays on a single 568px row, unchanged.

## Verified on mobile

| Check | Result |
|---|---|
| Horizontal overflow — home, south-miami, PBG, book-an-appointment, conditions/sciatica, insurance-policy, blog | none |
| Horizontal overflow — /conditions, /treatments | fixed (was 527 / 550) |
| `/find-care/book-an-appointment` | 1 H1 — confirms the mobile duplicate-H1 fix |
| Hero mini form | `aria-label`, `autocomplete=given-name/tel`, `inputmode=tel`, 46px tap height |
| Unlabelled inputs on the homepage | 0 (checked `aria-label`, `aria-labelledby`, `label[for]` and wrapping `<label>`) |
| Second Opinion callout | 454px in a 486px viewport, CTAs stack, both exactly 44px tall (WCAG 2.5.8) |
| Blog conversion module | 438px wide, correct `second-opinion` variant, all 3 CTAs 44px |
| Mobile navigation | Hamburger exposes "Toggle menu"; 8 links, none under 24px; no overflow |
| Pagination interaction | Clicking page 2 changes the card list and the active state |

## Still not verified

- True 390px and smaller viewports; landscape; tablet breakpoints.
- `prefers-reduced-motion` behaviour. The `MotionConfig reducedMotion="user"`
  change is correct by Framer Motion's documented contract and content settles
  visible in normal mode, but emulating the media query needs CDP
  `Emulation.setEmulatedMedia`, which is not exposed here. **Not tested.**
- Colour contrast, keyboard focus order, screen reader output, 200% zoom.
- iOS Safari and Android Chrome.
- End-to-end lead submission (writes to production and emails a patient).
