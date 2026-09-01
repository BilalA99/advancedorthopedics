-- ⚠️ ALREADY APPLIED IN PRODUCTION (project bwrnnmzqipnoakmdbevz).
-- This file is committed to bring the repo level with the database, which was
-- ahead of it. Do NOT re-apply. Rollback, if ever needed:
--   alter table public.forms disable row level security;
--   alter table public.blogs disable row level security;
--
-- Enable Row Level Security on public.forms and public.blogs.
--
-- Why this is urgent: NEXT_PUBLIC_SUPABASE_ANON_KEY ships inside the client
-- JavaScript bundle, so it is public by construction. Before this migration both
-- tables had RLS disabled while `anon` held SELECT/INSERT/UPDATE/DELETE/TRUNCATE
-- grants, which meant anyone who opened devtools could read every patient lead in
-- public.forms — names, emails, phone numbers, insurance type — or truncate the
-- blog. No policies existed (pg_policies was empty for schema `public`).
--
-- Why it is safe to enable: the application's access to these tables is narrow
-- and was verified before writing this.
--
--   public.forms   INSERT only, one call site:
--                  components/email/sendcontactemail.ts -> supabase.from('forms').insert(...)
--                  Nothing in the app selects, updates, or deletes from it.
--
--   public.blogs   SELECT only, six call sites in app/blogs/api/* and
--                  app/blogs/[BlogSlug]/page.tsx. Nothing in the app writes to it.
--
-- The policies below grant exactly those two operations and nothing else.
-- `service_role` bypasses RLS entirely, so the Supabase dashboard, the SQL editor,
-- and any future server-side job using the service key keep unrestricted access —
-- which is how staff should be reading leads in the first place.
--
-- Rollback, if lead capture or the blog breaks:
--   alter table public.forms disable row level security;
--   alter table public.blogs disable row level security;
-- (Dropping the policies is not required; they are inert while RLS is off.)

-- ---------------------------------------------------------------- public.forms

alter table public.forms enable row level security;

-- The public website must be able to submit a lead. It must not be able to read
-- one back, edit one, or delete one.
drop policy if exists "Public website can submit leads" on public.forms;
create policy "Public website can submit leads"
  on public.forms
  for insert
  to anon, authenticated
  with check (true);

-- Deliberately no SELECT / UPDATE / DELETE policy. With RLS on and no policy for
-- a command, that command returns zero rows for anon and authenticated.

comment on table public.forms is
  'Patient lead submissions. RLS on: anon/authenticated may INSERT only. Read leads via service_role (dashboard) — never with the public anon key.';

-- ---------------------------------------------------------------- public.blogs

alter table public.blogs enable row level security;

-- Blog content is public by design and is read at build time and at runtime with
-- the anon key.
drop policy if exists "Blog posts are publicly readable" on public.blogs;
create policy "Blog posts are publicly readable"
  on public.blogs
  for select
  to anon, authenticated
  using (true);

-- Deliberately no INSERT / UPDATE / DELETE policy. Authoring happens through the
-- dashboard or a service_role job, not from the browser.

comment on table public.blogs is
  'Blog posts (jsonb blog_info). RLS on: anon/authenticated may SELECT only. Author via service_role.';
