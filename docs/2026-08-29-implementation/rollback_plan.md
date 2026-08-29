# Rollback Plan — 2026-08-29

Branch `HomeSEO`, rebased onto `upstream/main` @ `5c99f1b`. Nothing here has been
pushed or deployed.

## Recovery points

| Ref | Contents |
|---|---|
| `5c99f1b` | Upstream main — the pre-work baseline |
| `stash@{0}` "pre-sync safety snapshot" | The original uncommitted measurement work, exactly as found |
| Each commit below is independently revertable | See order |

The safety stash was taken before anything was touched. If everything needs to
be abandoned: `git reset --hard 5c99f1b` restores upstream, and `git stash apply`
restores the original uncommitted work.

## Commits, in dependency order

| # | Commit | Revert impact |
|---|---|---|
| 1 | measurement contract + migration file | Reverting restores triple event firing and the thank-you conversion. **Do not revert while the DB migration stays applied** — harmless, since the columns are simply unused again. |
| 2 | persist before email | Safe to revert alone. |
| 3 | remove fabricated schema claims | Safe to revert alone; restores unverified ratings. |
| 4 | Miami -> South Miami rename | **Highest-risk revert.** See below. |
| 5 | review aggregate + location validator | Safe; reverting also removes the prebuild gate. |
| 6 | prebuild gating | Safe to revert alone. |
| 7 | Second Opinion callout + E.164 tel | Safe to revert alone. |
| 8 | sitemap redirect exclusions | Safe; reverting reintroduces 4 redirecting URLs. |
| 9 | one H1 per page | Safe to revert alone. |

## Database migration

`add_google_braid_attribution` on Supabase project `bwrnnmzqipnoakmdbevz` is
**applied to production**. It is additive: three columns, a backfill, a default,
a NOT NULL, and a unique index.

It does not need to be rolled back if the code is reverted — older code simply
ignores the columns. Roll back only if you must, and only when no deployed code
writes them:

```sql
drop index if exists public.forms_submission_id_key;
alter table public.forms
  drop column if exists submission_id,
  drop column if exists gbraid,
  drop column if exists wbraid;
```

This destroys the 1,142 backfilled submission IDs. They are synthetic (generated
during the backfill, not tied to any real click), so nothing of evidentiary
value is lost — but any offline conversion reconciliation keyed on them would
break.

## Reverting the South Miami rename

The URL change is the only outward-facing, hard-to-undo item, and only becomes
so once deployed and recrawled.

To revert cleanly:
1. Revert commit 4.
2. Remove the added redirect `/locations/florida/miami-beach-orthopedics ->
   /locations/florida/south-miami-orthopedics` from `next.config.ts`.
3. Restore the flat legacy redirect target to `miami-beach-orthopedics`.
4. Re-run `npm run generate:clinics-map`.
5. If already deployed and recrawled, add the inverse 301
   (`south-miami -> miami-beach`) rather than deleting the old one, so no URL
   that search engines have seen starts returning 404.
6. Re-point the Miami PMax asset group if it was moved.

Do not revert only the data change while leaving the redirect in place — that
creates a redirect loop.

## Deploy ordering

The migration is already applied, so code and schema are no longer coupled. For
any future deploy of this branch:

1. Deploy the application.
2. Verify one `lead_form_submit_success` per accepted lead in GA4 DebugView.
3. **Only then** retire the legacy GTM `form_submit` / `form_submission`
   triggers. Retiring them first stops conversion tracking entirely.
