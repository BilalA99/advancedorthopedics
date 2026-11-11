# US-default Consent Mode — 2026-09-21

> **SUPERSEDED (2026-11-10):** the site is opt-in again. Consent Mode defaults to
> denied for every visitor, and Meta Pixel, CallRail DNI, click-ID attribution and
> Enhanced Conversions identity wait for an explicit Accept
> (`isAdvertisingAllowed()` now equals `hasMarketingConsent()`). The build gate in
> `scripts/validate-measurement-contract.mjs` enforces the opt-in posture. This
> document is kept as the record of what ran between 2026-09-21 and the change.

**Owner decision:** Mountain Spine advertises only in US states. Google's EU user
consent policy applies to visitors in the **EEA, UK and Switzerland**, not to US
traffic. Silence on the banner is therefore no longer treated as an objection.

## What changed

| Surface | Before | After |
|---|---|---|
| Consent Mode default | all advertising signals **denied** globally | **granted** globally, **denied** for EEA/UK/CH via `region` |
| Undecided visitor, Google | cookieless pings, modelled conversions only | fully measured — `_ga`, `_gcl_au` set, deterministic attribution |
| Undecided visitor, Enhanced Conversions | suppressed | sent (SHA-256 hashed, `ad_user_data` granted) |
| Undecided visitor, CallRail DNI | not loaded | loaded |
| Phone-click / CTA analytics events | suppressed | sent |
| **Explicit refusal** | denied + cookies cleared | **unchanged** — denied + cookies cleared |

Meta and first-party attribution already treated undecided as allowed (decision of
the same date); this brings Google, Enhanced Conversions and CallRail into line so
one rule governs the whole advertising stack.

## The trap this closes

`CookieConsentManager` issues a Consent Mode **update** on mount. Previously that
update sent all-denied for an undecided visitor. Had the HTML default been flipped
to granted without also changing the runtime, the update would have **immediately
cancelled the granted default** and silently re-broken measurement — with no
visible symptom.

`lib/consent.ts` now exports `undecidedConsentCategories` (analytics, marketing and
functional all true) used wherever "no decision" is the state, and the build gate
fails if it ever contradicts the HTML default again.

## Verified in a real browser

Fresh undecided visitor on `/locations/florida`:

- banner still displayed, nothing stored
- every Consent Mode signal **granted**, default and update agreeing
- `_ga` and `_gcl_au` set; GTM + GA4 + CallRail loaded

Then **Reject All**:

- stored record all-false; Consent Mode update all **denied**
- `_ga`, `_gcl_au`, `_fbp` cleared

## Guardrails

`scripts/validate-measurement-contract.mjs` fails the build if the global default
stops granting, if the EEA/UK/CH carve-out is removed or loses a country, or if
`undecidedConsentCategories` contradicts the default. Mutation-tested three ways.

## Known limitations

- **Scripts stay resident after refusal.** CallRail (and Meta) cannot be unloaded
  once executed — `next/script` unmount removes the React element, not the running
  script. Their cookies are expired by `cleanupNonEssentialCookies`, and Meta is
  additionally told to stop via `fbq('consent','revoke')`. CallRail has no
  equivalent kill switch, so a visitor who loads the page and *then* rejects may
  still have dynamic number insertion active for that page view. It stops on the
  next load.
- **Scope is a policy choice, not a technical one.** This implements the owner's
  US-only determination. If advertising ever extends to a consent-required region,
  the carve-out must be revisited before launch.
- `PRIVACY_POLICY_REVIEW_REQUIRED` — the policy predates both this posture and the
  Meta Pixel. No legal copy was changed.
