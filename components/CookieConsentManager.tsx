"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import {
  CONSENT_UPDATED_EVENT,
  OPEN_COOKIE_PREFERENCES_EVENT,
  ConsentCategories,
  ConsentState,
  defaultConsentCategories,
  getConsentState,
  setConsentState,
  updateGoogleConsentMode,
} from "@/lib/consent";

type PreferenceDraft = Omit<ConsentCategories, "necessary">;

const allEnabled: PreferenceDraft = {
  analytics: true,
  marketing: true,
  functional: true,
};

const allDisabled: PreferenceDraft = {
  analytics: false,
  marketing: false,
  functional: false,
};

export default function CookieConsentManager() {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [draft, setDraft] = useState<PreferenceDraft>(allDisabled);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const stored = getConsentState();
    setConsent(stored);
    setShowBanner(!stored);
    setDraft(stored?.categories ?? allDisabled);
    updateGoogleConsentMode(stored?.categories ?? defaultConsentCategories);
    setLoaded(true);

    const onConsentUpdated = (event: Event) => {
      const next = (event as CustomEvent<ConsentState | null>).detail;
      setConsent(next);
      setDraft(next?.categories ?? allDisabled);
      setShowBanner(!next);
    };

    const openPreferences = (event: Event) => {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      const current = getConsentState();
      const preselect = (event as CustomEvent<{ preselect?: Partial<PreferenceDraft> }>).detail?.preselect;
      // Merge an optional preselect (e.g. "functional: true" from the map placeholder)
      // into the draft only — nothing is persisted until the user explicitly saves.
      setDraft({ ...(current?.categories ?? allDisabled), ...preselect });
      setShowBanner(false);
      setShowPreferences(true);
    };

    window.addEventListener(CONSENT_UPDATED_EVENT, onConsentUpdated);
    window.addEventListener(OPEN_COOKIE_PREFERENCES_EVENT, openPreferences);

    return () => {
      window.removeEventListener(CONSENT_UPDATED_EVENT, onConsentUpdated);
      window.removeEventListener(OPEN_COOKIE_PREFERENCES_EVENT, openPreferences);
    };
  }, []);

  useEffect(() => {
    if (!showPreferences) return;

    const getFocusableElements = () =>
      Array.from(
        modalRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? []
      );

    getFocusableElements()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePreferences();
        return;
      }

      if (event.key === "Tab") {
        const focusableElements = getFocusableElements();
        if (focusableElements.length === 0) return;

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showPreferences]);

  function savePreferences(nextDraft: PreferenceDraft) {
    const next = setConsentState(nextDraft);
    setConsent(next);
    setShowBanner(false);
    setShowPreferences(false);
    previousFocusRef.current?.focus();
  }

  function closePreferences() {
    setShowPreferences(false);
    previousFocusRef.current?.focus();
  }

  if (!loaded) return null;

  return (
    <>
      {consent?.categories.marketing ? (
        <Script
          id="callrail-dni"
          src="//cdn.callrail.com/companies/773929113/e6e5de417599bf7a871c/12/swap.js"
          strategy="afterInteractive"
        />
      ) : null}

      {showBanner ? (
        <section
          role="region"
          aria-label="Cookie consent"
          className="fixed bottom-0 left-0 right-0 z-[60] border-t border-slate-200 bg-white/95 px-4 py-4 shadow-[0_-8px_30px_rgba(15,23,42,0.12)] backdrop-blur md:bottom-4 md:left-4 md:right-4 md:mx-auto md:max-w-5xl md:rounded-lg md:border"
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="max-w-3xl text-sm leading-6 text-[#424959]">
              We use cookies to improve site performance, understand what pages help patients, and measure our
              marketing. You can accept all, reject non-essential cookies, or manage preferences.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => {
                  previousFocusRef.current = document.activeElement as HTMLElement | null;
                  setShowPreferences(true);
                  setShowBanner(false);
                }}
                className="min-h-11 rounded-md border border-[#0A50EC] px-4 text-sm font-semibold text-[#0A50EC] transition-colors hover:bg-blue-50"
              >
                Manage Preferences
              </button>
              <button
                type="button"
                onClick={() => savePreferences(allDisabled)}
                className="min-h-11 rounded-md border border-slate-300 px-4 text-sm font-semibold text-[#252932] transition-colors hover:bg-slate-50"
              >
                Reject All
              </button>
              <button
                type="button"
                onClick={() => savePreferences(allEnabled)}
                className="min-h-11 rounded-md bg-[#0A50EC] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#252932]"
              >
                Accept All
              </button>
            </div>
          </div>
        </section>
      ) : null}

      {showPreferences ? (
        <div
          role="presentation"
          className="fixed inset-0 z-[70] flex items-end justify-center bg-slate-950/45 px-4 py-4 sm:items-center"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closePreferences();
          }}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-preferences-title"
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-5 shadow-2xl sm:p-6"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 id="cookie-preferences-title" className="text-xl font-bold text-[#252932]">
                  Cookie Preferences
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#424959]">
                  Choose which optional cookies Mountain Spine & Orthopedics may use. Necessary cookies stay active so
                  forms, security, and site navigation work.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close cookie preferences"
                onClick={closePreferences}
                className="rounded-md px-3 py-2 text-2xl leading-none text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              >
                x
              </button>
            </div>

            <div className="space-y-3">
              <PreferenceRow
                title="Necessary"
                description="Required for consent storage, forms, security, navigation, and basic site operation."
                checked
                disabled
              />
              <PreferenceRow
                title="Analytics"
                description="Helps us understand site performance and which pages help patients."
                checked={draft.analytics}
                onChange={(checked) => setDraft((current) => ({ ...current, analytics: checked }))}
              />
              <PreferenceRow
                title="Marketing"
                description="Supports ad attribution, CallRail dynamic number insertion, Google Ads conversions, and remarketing where configured."
                checked={draft.marketing}
                onChange={(checked) => setDraft((current) => ({ ...current, marketing: checked }))}
              />
              <PreferenceRow
                title="Functional"
                description="Enables optional location features such as embedded maps and location personalization."
                checked={draft.functional}
                onChange={(checked) => setDraft((current) => ({ ...current, functional: checked }))}
              />
            </div>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => savePreferences(allDisabled)}
                className="min-h-11 rounded-md border border-slate-300 px-4 text-sm font-semibold text-[#252932] hover:bg-slate-50"
              >
                Reject All
              </button>
              <button
                type="button"
                onClick={() => savePreferences(draft)}
                className="min-h-11 rounded-md border border-[#0A50EC] px-4 text-sm font-semibold text-[#0A50EC] hover:bg-blue-50"
              >
                Save Preferences
              </button>
              <button
                type="button"
                onClick={() => savePreferences(allEnabled)}
                className="min-h-11 rounded-md bg-[#0A50EC] px-4 text-sm font-semibold text-white hover:bg-[#252932]"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function PreferenceRow({
  title,
  description,
  checked,
  disabled = false,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 rounded-lg border border-slate-200 p-4">
      <span>
        <span className="block text-sm font-bold text-[#252932]">{title}</span>
        <span className="mt-1 block text-sm leading-5 text-[#424959]">{description}</span>
      </span>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange?.(event.target.checked)}
        className="mt-1 h-5 w-5 shrink-0 accent-[#0A50EC]"
      />
    </label>
  );
}
