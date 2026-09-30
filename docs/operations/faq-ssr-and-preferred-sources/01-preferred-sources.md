# Google Preferred Sources

Implements
[Preferred sources](https://developers.google.com/search/docs/appearance/preferred-sources)
on the blog, treatment and condition templates: a reader can nominate Mountain
Spine & Orthopedics so its content surfaces more often in Top Stories, AI
Overviews and AI Mode.

## The implementation decision, and why

Google documents two options.

**Option A — Google's JavaScript button.** Load
`https://news.google.com/swg/js/v1/publisher.js` and drop in
`<div google-add-preferred-source-btn></div>`. Google renders a localized,
Google-styled button.

**Option B — the deeplink.** A plain link to
`https://www.google.com/preferences/source?q=<domain>`. Google supports this
explicitly and explicitly permits styling it yourself ("design your own custom
promotion badge").

**This uses Option B**, for four reasons that all point the same way:

1. **No third-party script.** The JS button is an async request on every article,
   condition and treatment page — the highest-volume templates on the site — for a
   control most readers will never click. A link costs nothing and cannot shift
   layout. This repo already measures Core Web Vitals; adding a script to hundreds
   of pages for a secondary CTA is a poor trade.
2. **No consent question.** The site runs Consent Mode and a cookie banner, and its
   measurement contract is deliberate about what may load before a visitor
   chooses. A Google script that may set storage would need a consent decision.
   An `<a href>` needs none.
3. **It is server-rendered.** The control, its wording and its destination are in
   the HTML a crawler and an LLM read. A JS-injected button is not — which would
   sit oddly beside the other half of this work, whose whole point was getting
   content into the server HTML.
4. **It matches the design system.** Google's button brings Google's styling. This
   one uses the same tokens as every other module on the page.

The cost of Option B is that the label is not auto-localized. The site is English-
only and US-only (there is a geo-block on non-US submissions), so that buys
nothing here.

## Where it appears

| Template | File | Placement |
| --- | --- | --- |
| Blog post | `app/blogs/[BlogSlug]/page.tsx` | after the article and its FAQ, before the conversion module |
| Treatment | `app/treatments/[TreatmentDetails]/page.tsx` | after the FAQ — both the new and legacy format branches |
| Condition | `app/conditions/[slug]/ConditionPage.tsx` | after the FAQ — both the new and legacy format branches |

Five call sites, because the treatment and condition templates each render two
format branches and missing one would leave half the pages without it.

**The placement is deliberate.** It sits *after* the FAQ — the reader has just had
their question answered, which is the moment "see more of this" is a fair thing to
ask — and *before* the booking CTA, so it never competes with the conversion the
page exists for. It is a secondary ask and it looks like one.

## The link

```
https://www.google.com/preferences/source?q=mountainspineorthopedics.com
```

Derived at build time from `SITE_URL`, so it cannot drift from the canonical
domain. Google accepts **domain and subdomain level only, never a path**, so the
link nominates the bare host regardless of which page it appears on — the audit
asserts this, because passing a path would silently produce a dead nomination.

## Visual design

One module, one layout. It is a bordered row in the site's neutral surface
(`#FAFAFA` on `#DCDEE1`), deliberately quieter than the blue conversion module it
sits above — two tinted cards stacked would read as two competing CTAs, which is
the opposite of the intent.

- **Under 640px** it stacks: heading, one line of explanation, then a full-width
  button. Full-width because a thumb-reachable target at the bottom of a long
  article matters more than horizontal tidiness.
- **640px and up** it becomes a row — text left, button right, vertically centred —
  so it reads as a single quiet band rather than a stacked block interrupting the
  page.

An earlier draft carried a second, blue-tinted variant. It was removed: it was
unused, and in the one place it would have gone it would have been wrong for the
reason above.

The button gets `min-h-[44px]`, matching the site's existing touch-target
floor.

### Accessibility

- A real `<a>`, so it works without JavaScript and behaves like a link.
- `aria-label="Add Mountain Spine & Orthopedics as a preferred source on Google"` —
  the visible text reads "Add as preferred source", which is clear in place but
  ambiguous out of context in a screen-reader link list.
- The star icon is `aria-hidden="true"`; the accessible name comes from the label.
- `focus-visible:outline-2 outline-offset-2 outline-[#0A50EC]`, matching the rest
  of the site.
- `target="_blank"` with `rel="noopener noreferrer"`.

### Why a star and not Google's logo

Google supplies optional branded assets and also permits a custom badge. A custom
star avoids embedding Google's trademark in a medical practice's page template,
where brand-usage rules are easy to breach by accident and hard to notice. The
word "Google" appears in the copy and the accessible name, which is what tells the
reader where the action goes.

## Verification

`node scripts/qa/preferred-source-audit.mjs <baseUrl>` — a plain fetch, no JS,
asserting per page:

| Check | Why |
| --- | --- |
| module present in server HTML | the control must not depend on hydration |
| rendered exactly once | a reader asked twice on one page is a bug |
| href is exactly the documented deeplink | a typo here fails silently and forever |
| `q` is a bare domain, no path | Google rejects path-level sources |
| `q` is the canonical domain | nominating the wrong host is worse than nothing |
| is a real `<a>` | not a div with a handler |
| has an accessible name ≥ 20 chars | "Add as preferred source" alone is ambiguous out of context |
| `target="_blank"` + `rel="noopener"` | tab-napping |
| visible label in the HTML | a crawler and an LLM should both read what it does |
| no `news.google.com/swg/js` script | confirms Option B stayed Option B |

## What this does not do

- **No structured data.** Preferred sources has no schema.org component; it is a
  user action, not a markup feature. Nothing to add to the JSON-LD graph.
- **No tracking.** Clicks are not instrumented. Adding a `dataLayer` push would be
  easy, but it would be a new advertising-adjacent event, and this site's
  measurement contract keeps that surface deliberately small. The link carries
  `data-cta-action="preferred-source"` so a GTM click trigger can be attached later
  without a code change, if it is ever worth measuring.
- **Not on every template.** Location pages, injury pages and paid landing pages
  are untouched. The paid landing pages in particular exist to convert ad clicks,
  and a secondary ask competing with that CTA would cost more than it earns.
