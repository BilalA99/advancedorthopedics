# 10 — Rollback

## What shipped, and the order it must be undone in

Two things changed that can be reverted independently:

1. **A production database column** — `public.forms.postal_code`, added by
   `supabase/migrations/202609270001_add_postal_code.sql`.
2. **Application code** — nine form components, four API routes, three lib modules,
   the email template, the persistence layer, the tests and the prebuild gate.

**Roll back the code first, the column second — or better, leave the column.**
The column is additive and nullable; nothing breaks while it exists and nothing
reads it except reporting. Dropping it while code that writes it is still deployed
would reject every INSERT into `public.forms` and silently destroy lead capture,
which is exactly the outage that `landing_path` caused for four days in September.

## 1. Rolling back the code

The whole change is one branch. To undo it on production:

```bash
git checkout main
git revert --no-commit <merge-commit-sha>     # or reset to the previous main
git commit -m "revert(intake): roll back insurance routing"
git push origin main                          # origin/main auto-deploys to Vercel
```

To roll back in the Vercel dashboard instead, promote the previous production
deployment. The deployment ID to return to is recorded in
`09-production-verification.md`.

### What reverting restores

- "Best Time To Contact" returns on all nine forms.
- The insurance dropdown disappears.
- Every form fires the qualified conversion unconditionally again, so the Google
  Ads qualified signal reverts to its pre-change (ungated) volume — expect
  `lead_form_submit_success` volume to *rise* back to previous levels, because
  "Other" leads will count again.
- ZIP stops being written to `forms.postal_code` (the column stays, rows go NULL).
- `MiniContactForm` becomes unsubmittable again (that bug is pre-existing and the
  revert reinstates it).

### Partial rollback: keep ZIP, drop only the routing split

If the routing split is the problem but the ZIP fixes are wanted, the smallest
change that stops every qualified conversion being gated is to make classification
unconditional. In `lib/insurance-routing.ts`:

```ts
export function classifyInsurance(): InsuranceQualification {
  return "qualified";   // TEMPORARY: routes every lead to the tracked thank-you
}
```

Every lead then routes to `/thank-you` and fires one conversion, exactly as before
the change, while ZIP capture, storage and notification stay intact. This will
fail the `unqualified leads cannot fire the qualified conversion` prebuild check,
which is correct — it is a deliberate, visible, temporary escape hatch, not
something to leave in place.

### Narrower still: re-enable one plan

If a plan is wrongly classified, do **not** patch the routing code. Edit
`components/data/insurancePlans.ts` and change that plan's `status`. The dropdown,
the qualification and the public `/insurance-policy` page all follow from it, and
the change is data, not logic.

## 2. Rolling back the database column

Only if something actively depends on the column being absent — which, for an
additive nullable column, is very unlikely.

```sql
alter table public.forms drop column if exists postal_code;
```

**Before running this, confirm no deployed code writes `postal_code`.** Search for
`postal_code:` in `components/email/sendcontactemail.ts`. If the writer is still
live, this statement will start rejecting every lead INSERT.

Dropping the column destroys every ZIP captured since deploy. There is no backfill:
ZIP was never stored before this change, so there is nothing to restore it from.

## Verifying a rollback worked

1. Load `/insurance-policy` and `/find-care/book-an-appointment`; confirm the
   expected field set for whichever state you rolled back to.
2. Submit one test lead and confirm it lands in `public.forms` — this is the check
   that actually matters, because a schema mismatch shows up nowhere else until
   leads stop arriving:

```sql
select submission_id, created_at, form_source, insurance_type, postal_code
from public.forms
order by created_at desc
limit 5;
```

3. Confirm `lead_form_submit_success` fires once in GTM Preview.
4. Watch `info@mountainspineorthopedics.com` for the staff notification.

## Monitoring after either direction

The failure mode to watch for is silent: leads stop being persisted while emails
keep arriving, so nothing looks broken until someone queries the table. Check for
the loud log line, which exists precisely for this:

```
[logLeadToSupabase] insert failed — lead NOT persisted
```

and confirm the row count is still climbing:

```sql
select count(*), max(created_at) from public.forms;
```
