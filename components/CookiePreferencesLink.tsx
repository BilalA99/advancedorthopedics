"use client";

import { OPEN_COOKIE_PREFERENCES_EVENT } from "@/lib/consent";

/**
 * Inline "Cookie Preferences" control for prose.
 *
 * The privacy policy used to tell visitors to email us to change their
 * preferences, which was simply wrong — the real control is the preferences
 * panel, and a policy that points somewhere else makes withdrawal harder than
 * granting. This renders a real button (not a styled span) so it is keyboard
 * reachable and announced correctly.
 */
export default function CookiePreferencesLink({ label = "Cookie Preferences" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_PREFERENCES_EVENT))}
      className="text-[#0A50EC] underline underline-offset-2 hover:text-[#252932] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A50EC]"
    >
      {label}
    </button>
  );
}
