# 06 — Mobile and tablet test matrix

Same production build, same harness, mobile emulation (`isMobile: true`,
`hasTouch: true`). Responsive screenshots alone were not treated as sufficient —
the full interactive flows were executed at mobile size.

## Visual matrix — 9 viewports

320×568 (iPhone SE 1) · 360×800 (Android) · 375×667 (iPhone SE 2) ·
390×844 (iPhone 12) · 393×852 (iPhone 15) · 412×915 (Pixel) ·
414×896 (iPhone XR) · 768×1024 (iPad) · 820×1180 (iPad Air)

Pages: `/` and `/insurance-policy`. **18 / 18 pass.** Screenshots in
`evidence/mobile/`.

Per viewport:

| Check | Result |
| --- | --- |
| ZIP field present, visible, non-zero size, inside the viewport | pass |
| ZIP `inputmode="numeric"` (numeric keypad) | pass |
| ZIP `autocomplete="postal-code"` (autofill) | pass |
| ZIP has an accessible label | pass |
| Insurance dropdown present, not clipped | pass |
| "Best Time To Contact" absent from the intake form | pass |
| No horizontal overflow | pass |
| No console errors, no hydration warnings | pass |
| CSS actually applied | pass |

### Reported, not failed: 14px fields at ≥768px

At the two tablet widths the ZIP field computes to **14px**, under the 16px iOS
needs to avoid zooming on focus. This is **not** ZIP-specific and **not** caused by
this change: shadcn's `Input` base class carries `md:text-sm`, so *every* field in
*every* form on the site is 14px from 768px up. Measured directly — `first_name`,
`last_name`, email, phone, ZIP and the textarea all report 14px at 768px and 18px
at 390px.

Fixing it means changing the shared `Input` component, which changes every form on
the site. Recorded as pre-existing in `04-implementation-summary.md`; the matrix
reports it rather than failing on it.

## Site-wide form audit — mobile

`14 lead forms across 10 pages, 0 problems.` Every rendered intake form exposes the
insurance dropdown and none shows best-time. Forms identified as hand-offs (they
collect a name and phone and then open the full form in a dialog, never posting a
lead) are labelled as such rather than flagged.

## E2E — ConsultationForm at 390×844 (iPhone 12): 51 / 51 pass

Every desktop flow was re-run at mobile size — accepted insurance, PPO, Other,
validation, server rejection, 500, timeout, triple-click, back/forward, direct
thank-you visits — plus seven mobile-specific checks:

| Mobile-specific check | Result |
| --- | --- |
| ZIP requests the numeric keyboard (`inputmode="numeric"`) | pass |
| ZIP font-size ≥ 16px so iOS does not zoom on focus (18px at 390px) | pass |
| ZIP opts into `postal-code` autofill | pass |
| No horizontal overflow on the form page | pass |
| ZIP survives rotation to landscape (844×390) | pass |
| No horizontal overflow in landscape | pass |
| Submit button reachable while an input is focused | pass |

### Notable mobile behaviour that needed real interaction to find

A **numeric keypad has no hyphen key**, so a patient entering a ZIP+4 on mobile
types nine bare digits. `normalizePostalCode` turns `334631234` into `33463-1234`
rather than rejecting them for using the keyboard the field asked for. Asserted in
both the unit tests and the mobile E2E run.

Radix `Select` items respond to pointer events, so under touch emulation a plain
`element.click()` is ignored and the value silently stays unset — the form then
fails validation and looks broken. The harness drives the dropdown by keyboard
(type-ahead + Enter), which behaves identically with and without touch. This was a
harness finding, not a product defect: the control works correctly for a real
finger.

## E2E — other surfaces, mobile

| Surface | PPO | Other |
| --- | --- | --- |
| `BodyPartHeroForm` @ `/lp/adult-scoliosis-treatment` (paid) | pass | pass |
| `DoctorContactForm` @ `/find-care/book-an-appointment` | pass | pass |
| `StateHeroForm` @ `/locations/florida` | n/a — desktop-only surface | n/a |

`StateHeroForm`'s first-phase fields are not rendered at 390px (`hero_first_name`
has no client rects on mobile and does on desktop), so mobile visitors reach that
page through a different component and there is nothing to drive.

On mobile the paid landing page's dialog opens through a different route than on
desktop: the `[data-open-evaluation]` CTA is not rendered, and the way in is the
compact hero form, whose submit handler opens the same dialog. Both routes were
exercised.

## Orientation, keyboard and sticky elements

- Rotating 390×844 → 844×390 keeps the ZIP field present and sized, with no
  horizontal overflow.
- With an input focused, the submit button remains in the layout and reachable.
- No sticky element covers the ZIP field or the submit button at any tested width.
- No unexpected zoom on focus at phone widths (18px fields). At tablet widths see
  the pre-existing 14px note above.
