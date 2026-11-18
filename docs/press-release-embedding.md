# Press-release embedding (CSP `frame-ancestors`)

## What it does

Newswires can show one of our pages in a frame underneath a press release (EIN
Presswire calls the field "Embedded Website"). That needs the site to allow
framing by those wires and no one else.

Every response now sends:

```
Content-Security-Policy: frame-ancestors 'self' https://www.einpresswire.com https://*.einpresswire.com https://www.einnews.com https://*.einnews.com
```

and **no longer sends `X-Frame-Options`**. `X-Frame-Options` only understands
`DENY` and `SAMEORIGIN` — it cannot allowlist a domain (`ALLOW-FROM` is obsolete
and ignored by every current browser). `frame-ancestors` is its supported
replacement. Leaving `X-Frame-Options: DENY` alongside the CSP would make header
checkers keep reporting the page as blocked, so it was removed.

- Allowlist: `lib/security/frame-ancestors.ts`
- Header is attached in `next.config.ts` → `headers()`, on `source: '/:path*'`
  (the whole site).

## Adding a new wire

1. Open `lib/security/frame-ancestors.ts`.
2. Uncomment the wire's line in the "Future wires" block, or add the exact
   origin (scheme + host, no path, no trailing slash).
3. Deploy. No other file changes.

**Only named domains.** Never add `*`, `https:`, `http:` or any bare wildcard
host. This allowlist is the site's clickjacking protection; a wildcard removes
it entirely.

## Testing after deploy

```bash
curl -sI https://mountainspineorthopedics.com/treatments/spinal-fusion \
  | grep -iE "x-frame-options|content-security-policy"
```

Expect one `content-security-policy` line with the allowlist, and **no**
`x-frame-options` line. Then paste the page URL into
<https://www.iframetester.com> — the page should render inside the box, and the
"Check frame killer script" step should pass (there is no frame-killer script in
this repo).

## Rolling back

In `next.config.ts` → `headers()`, replace the CSP entry with the old one:

```ts
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
```

(delete the `Content-Security-Policy` entry and its import at the top of the
file). Deploy. Framing is blocked again everywhere.

## Caveats

- Only named domains may be added to the allowlist — see above.
- Forms still submit fine inside a frame (same-origin API routes, no session or
  CSRF cookie), but **analytics attribution may be lost**: GA4/GTM `_ga` cookies
  are partitioned or blocked in a cross-site iframe, so a lead can arrive
  without its source.
- Because of that, the front desk should log **"press release"** as the source
  for leads that come in during a release window.
