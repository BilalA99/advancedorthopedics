# SHOW_SCOTT_KATZMAN Feature Flag — Head Developer Runbook

## What this flag controls

`SHOW_SCOTT_KATZMAN` is a server-side environment variable that controls whether Dr. Scott
Katzman appears anywhere in the site's public output: his provider profile route, directory
listing, location/treatment/condition relationships, structured data (JSON-LD), sitemap entry,
internal links, testimonials/reviews that name him, and his avatar image on treatment/condition
cards.

- `SHOW_SCOTT_KATZMAN=1` → visible (current production behavior)
- `SHOW_SCOTT_KATZMAN=0` → excluded from all public output
- Missing/unset → defaults to `1` (visible), so existing behavior is preserved if the variable
  is never set
- Any other value (`"true"`, `"false"`, `"yes"`, `""`, `"2"`, etc.) throws a configuration error
  during module initialization, causing the build/server start to fail loudly rather than
  silently misbehaving

The parser lives in [lib/config/featureFlags.ts](../lib/config/featureFlags.ts). The visibility
policy (which providers are hidden, and the selectors every page uses) lives in
[lib/providers/providerVisibility.ts](../lib/providers/providerVisibility.ts). Both are marked
`import "server-only"` and are never imported into Client Components directly — pages compute
the visible dataset server-side and pass it down as props.

## Deployment behavior — read this before flipping the flag

This site is a standard Next.js app (not a static export — no `output: "export"` in
`next.config.ts`), but the vast majority of the affected routes (doctor profile pages, the
directory listing, treatment/condition/location pages) use `generateStaticParams` /
`dynamicParams = false` and are **pre-rendered at build time**. That means:

- **A code/env change alone does not change the live site.** The environment variable is read
  once, at module load time, when the Node process for the build (or the running server) first
  imports `lib/config/featureFlags.ts`.
- **You must trigger a new production build and deployment** for the change to take effect
  across the doctor profile route, the directory listing, `about`, `find-a-doctor`, treatment/
  condition/location pages, and the human-readable `/sitemap` page.
- The one exception is `app/sitemap.xml/route.ts`, which sets `export const revalidate = 3600`
  (ISR, re-executes roughly hourly on platforms that support it). Even so, it only picks up the
  new value if the **server process itself** was restarted with the new environment variable —
  ISR revalidation re-runs the route handler in the same running process/environment, it does
  not re-read `.env` files. Don't rely on this path; do a full rebuild+redeploy regardless.
- No repository file edit, branch switch, or Git revert is needed — only the environment
  variable value, followed by a rebuild/redeploy.

This repo has no `vercel.json`/`netlify.toml` checked in, so the exact hosting dashboard steps
depend on wherever it's actually deployed (Vercel project settings, or your Node host's env
config + process manager). The steps below are written generically; substitute your platform's
UI for "open the environment variable settings."

## Switching to `0` (exclude Dr. Katzman)

1. In your hosting platform's environment variable settings, set `SHOW_SCOTT_KATZMAN=0` for the
   target environment (production/preview) only — do not touch unrelated variables.
2. Trigger a new deployment (redeploy from the latest commit, or push a commit/trigger a build).
3. Wait for the build to complete and the new deployment to become the active/promoted one.
4. Purge/revalidate CDN and image caches for at least: `/`, `/about`, `/about/meetourdoctors`,
   `/about/meetourdoctors/dr-scott-katzman`, `/find-care/find-a-doctor`, `/sitemap.xml`,
   `/sitemap`, and any location/treatment/condition pages you spot-check.
5. Verify:
   - `/about/meetourdoctors/dr-scott-katzman` returns a 404 (not a soft-404 with 200 status —
     confirm the HTTP status code, not just the visible "not found" copy).
   - He is absent from the doctor directory grid, the `find-a-doctor` page, the About page's
     top-3 teaser, and every "Meet Our Experts"/"Featured Doctors" carousel sitewide.
   - `/sitemap.xml` and `/sitemap` no longer list his profile URL.
   - View-source on the homepage, doctor directory, `/about`, and a few treatment/condition
     pages contains no `Physician` JSON-LD entry for him and no `Katzman` string anywhere in
     the rendered HTML or embedded JSON.
   - Testimonials naming him (homepage carousel, doctors-page reviews, any location review
     block) are absent; remaining reviews/testimonials still render normally with no empty
     cards or broken counts.
   - The `/find-care/second-opinion` page's testimonial paragraph still reads naturally,
     mentioning only Dr. Cowin.
   - The `/treatments/orthopedic-injections` page's JSON-LD `@graph` no longer contains his
     Physician entry; the other three physicians (McPhail-Pruitt, McCarthy, Slaughter) are
     unaffected.
   - Forms, phone links, GA4/GTM tracking, and consent banners behave exactly as before (this
     flag does not touch any of that code).
6. Record the deployment ID and the time the change went live.

## Switching back to `1` (restore Dr. Katzman)

1. Set `SHOW_SCOTT_KATZMAN=1` (or simply remove the variable, since missing defaults to `1`).
2. Trigger a new deployment the same way as above.
3. Purge/revalidate the same set of caches.
4. Verify the full original experience returned: profile page loads normally with all content,
   metadata, canonical, Open Graph/Twitter tags, and JSON-LD; he reappears in the directory,
   `find-a-doctor`, About teaser, sitemap (both `/sitemap.xml` and `/sitemap`), treatment/
   condition "meet our doctors" sections, his avatar on relevant treatment/condition cards, the
   `orthopedic-injections` schema graph, the second-opinion testimonial, and all
   testimonials/reviews that name him.
5. No source edit, branch switch, or Git revert is required — this is solely the environment
   variable plus a redeploy.
6. Record the deployment ID and restoration time.

## Maintaining `components/data/clinicsForMap.generated.ts`

This file is a generated, review/testimonial-free snapshot of `components/data/clinics.tsx`,
used by every Client Component that only needs location/marker fields (NavBar, Footer, the map,
location pickers, etc.). It has to be a separate, independently-sourced file rather than a
filtered value computed inline from `clinics` — JS bundlers cannot tree-shake individual object
fields out of a single exported array literal, so any client-bundled code deriving a "safe" view
at runtime from `clinics` would still pull the raw array (and its embedded review text) into the
browser bundle alongside it.

Regenerate it whenever a clinic's core location fields (name, address, lat/lng, phone, slug,
etc.) change in `clinics.tsx`:

```
npx tsx scripts/generate-clinics-for-map.mjs
```

This is unrelated to the `SHOW_SCOTT_KATZMAN` flag itself and does not need to run as part of a
flag flip — only when the underlying location data changes.

## Known limitations (documented, not fixed by this flag)

- **External/cached copies are out of this flag's control.** A previously-crawled version of
  his profile page may still be visible in Google's cache, the Wayback Machine, social-preview
  caches, or third-party physician directories (Healthgrades, Jupiter Medical Center, etc.) that
  the flag cannot reach into. Removing those requires action outside this codebase (e.g. Search
  Console removal requests, contacting the third-party directory).
- **Old dot-notation slug redirect.** `next.config.ts` still 301-redirects
  `/about/meetourdoctors/dr.scottkatzman` → `/about/meetourdoctors/dr-scott-katzman`. When the
  flag is `0` that destination 404s, so the redirect simply chains to a 404 — this is expected,
  correct behavior for a removed page and was left as-is (no dangling content is exposed).
- **`app/ui/HomePageUI.tsx`** is dead code (not imported by any route) that still references the
  full doctor list and testimonials directly; it was left alone since it never reaches
  production output, but if it's ever wired up to a route in the future it will need the same
  `getVisibleProviders()` / `getVisibleReviews()` treatment as the live pages.
- **`app/treatments/[TreatmentDetails]/TreatmentDetailsClient.tsx`** is likewise unreferenced
  dead code with the same characteristics; not modified for the same reason.
- **Provider media is synchronized at build/dev startup.** The source images live under
  `provider-media/scott-katzman/`, outside the public web root. `scripts/sync-provider-media.mjs`
  copies them into `public/` when the flag is on and removes the public copies when it is off.
  The doctor dataset uses inert `StaticImageData`-shaped objects instead of static image imports,
  so a flag-off build does not emit optimized/hashed copies through webpack. Always use the
  repository's `npm run build` script so its `prebuild` synchronization hook runs.
- **The `showScottKatzman` boolean prop name itself contains the string "Katzman."** It appears
  in a few client bundles and in the RSC hydration payload for `/conditions` and `/treatments`
  (always paired with the literal value `false` when the flag is off) — this is the feature
  flag's own control-plane variable name, not user-facing content; no bio, image, testimonial,
  or provider-specific alt text accompanies it. Rename the prop if a zero-substring-match audit
  result is required.

## Rollback

If something looks wrong after a flag flip, set the variable back to its previous value and
redeploy — there is no code state to revert, since the flag is the only thing that changed.
