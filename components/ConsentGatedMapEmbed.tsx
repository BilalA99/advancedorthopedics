"use client";

import { useEffect, useState } from "react";
import { CONSENT_UPDATED_EVENT, OPEN_COOKIE_PREFERENCES_EVENT, hasFunctionalConsent } from "@/lib/consent";

/**
 * Consent gate for the stored Google Maps `mapEmbed` markup on location pages.
 *
 * The clinic finder (components/ClinicsMap.tsx) already gates the Maps JS API
 * behind functional consent and shows a placeholder otherwise. The location
 * page's own map did not: it injected `locationData.mapEmbed` straight through
 * `dangerouslySetInnerHTML`, and that markup is a full
 * `<iframe src="https://www.google.com/maps/embed?…" loading="eager">`.
 *
 * The effect was that every visitor to a location page contacted Google and
 * received its cookies — including one who had just pressed Reject All, and
 * including returning visitors with a stored refusal (verified in production,
 * 2026-11-12). That directly contradicted the banner's own Functional copy,
 * which offers "embedded maps" as an optional feature the visitor controls.
 *
 * Address, directions link and phone number are server-rendered elsewhere on
 * the page, so refusing the map costs the visitor nothing they need.
 */
export default function ConsentGatedMapEmbed({
  embedHtml,
  locationName,
  directionsUrl,
}: {
  embedHtml: string;
  locationName?: string;
  directionsUrl?: string;
}) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    setAllowed(hasFunctionalConsent());
    const onConsentUpdated = () => setAllowed(hasFunctionalConsent());
    window.addEventListener(CONSENT_UPDATED_EVENT, onConsentUpdated);
    return () => window.removeEventListener(CONSENT_UPDATED_EVENT, onConsentUpdated);
  }, []);

  if (!allowed) {
    return (
      <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-3 bg-slate-50 p-6 text-center">
        <p className="max-w-md text-sm leading-6 text-[#424959]">
          The map is turned off because optional cookies are not enabled.
          {locationName ? ` You can still call or visit ${locationName}.` : ""}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() =>
              // Pre-checks Functional in the existing preferences panel. Nothing
              // is stored until the visitor saves, so this cannot record a
              // decision on their behalf.
              window.dispatchEvent(
                new CustomEvent(OPEN_COOKIE_PREFERENCES_EVENT, {
                  detail: { preselect: { functional: true } },
                })
              )
            }
            className="min-h-11 rounded-md bg-[#0A50EC] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#252932]"
          >
            Enable map
          </button>
          {directionsUrl ? (
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-11 inline-flex items-center rounded-md border border-[#0A50EC] px-4 text-sm font-semibold text-[#0A50EC] transition-colors hover:bg-blue-50"
            >
              Get directions
            </a>
          ) : null}
        </div>
      </div>
    );
  }

  return <div className="absolute inset-0 h-full w-full" dangerouslySetInnerHTML={{ __html: embedHtml }} />;
}
