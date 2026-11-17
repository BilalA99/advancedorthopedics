import "server-only";
import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client, for the one thing the publishable key cannot do.
 *
 * Every existing database call on this site uses the publishable (anon) key via
 * `utils/supabase/server.js`, and that is correct for lead capture: RLS grants
 * anon INSERT on public.forms and nothing else, so the key shipped in the client
 * bundle can write a lead and can never read one back.
 *
 * `public.message_deliveries` needs INSERT *and* SELECT *and* UPDATE, because
 * the whole point of an outbox is reading back what already happened before
 * acting again. Granting that to anon would hand the browser the ability to
 * manufacture or suppress an outbound patient email, so this table is
 * service_role only and this module is the only way in.
 *
 * `server-only` makes an accidental client import a build error rather than a
 * credential leak. No session, no cookies, no token refresh: this is a
 * machine-to-machine client and must never be used to act as a user.
 */

let cached: SupabaseClient | null = null;

/** Returns null when the service key is unconfigured, so callers can degrade. */
export function createServiceClient(): SupabaseClient | null {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;

  cached = createSupabaseClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { "x-application-name": "mso-lead-delivery" } },
  });
  return cached;
}

/** True when durable delivery state is available. */
export function hasServiceClient(): boolean {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}
