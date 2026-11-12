/**
 * Meta Pixel adapter — Mountain Spine & Orthopedics.
 *
 * Design rules, all deliberate:
 *
 * 1. LAYER SEPARATION. The application emits a neutral first-party success
 *    event (`lead_form_submit_success`, see lib/lead-contract.ts). This module
 *    is one *consumer* of that event. It translates it into the smallest legal
 *    Meta signal and nothing more. The site is the source of truth; Meta does
 *    not get to decide what a lead is.
 *
 * 2. MINIMAL PAYLOAD. Meta receives `Lead` / `Contact` / `PageView` with an
 *    eventID and an EMPTY custom_data object. No market, no clinic, no form
 *    name, no condition, no payer, no value. The site knows all of those; they
 *    stay first-party. Adding a parameter here is a privacy decision, not a
 *    convenience.
 *
 * 3. NO ADVANCED MATCHING. Automatic Advanced Matching is intentionally off in
 *    Events Manager. `init` is called with no user-data object, and no hashed
 *    or unhashed identity is ever passed. Hashed PHI is still PHI.
 *
 * 4. NEVER LOAD-BEARING. Every export no-ops on the server, without consent, on
 *    a sensitive route, or if the pixel failed to load. Nothing here may throw
 *    into application code — a blocked pixel or a Meta outage must never affect
 *    a patient's ability to submit a lead.
 */
import { hasDeclinedMarketing, isAdvertisingAllowed } from "@/lib/consent";
import { getBufferedLandingParam } from "@/lib/gclid";
import { isMetaEligibleRoute } from "@/lib/route-privacy";

/**
 * The Pixel/Dataset ID is public by nature (it ships in the browser), so the
 * literal is a safe, explicit default. The env var exists so a staging deploy
 * can point at a test dataset, but production falls back to the real ID rather
 * than silently disabling measurement on a missing variable.
 */
export const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || "1114353070995808";

/** True when a pixel id was supplied explicitly, i.e. not the production default. */
const HAS_EXPLICIT_PIXEL_OVERRIDE = Boolean(process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim());

/**
 * Non-production origins that must never reach the PRODUCTION dataset.
 *
 * `next dev` and a locally served production build both run on localhost, and
 * during this implementation two local test PageViews did reach the real pixel
 * before this guard existed. Automated local runs and CI must not pollute the
 * dataset with events that look like real traffic.
 *
 * Escape hatch: set NEXT_PUBLIC_META_PIXEL_ID to a TEST dataset id and local
 * tracking is enabled against that id instead. The production id is never used
 * from a local or preview origin.
 */
function isNonProductionOrigin(): boolean {
  const w = metaWindow();
  if (!w) return true;

  const host = (w.location.hostname || "").toLowerCase();
  const localHost =
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "0.0.0.0" ||
    host === "[::1]" ||
    host === "::1" ||
    host.endsWith(".local") ||
    host.endsWith(".localhost");
  if (localHost) return true;

  // Vercel preview/development deployments, when the flag is exposed.
  const vercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV;
  if (vercelEnv && vercelEnv !== "production") return true;

  return false;
}

/**
 * Whether this environment may talk to Meta at all.
 *
 * Independent of consent and of route eligibility: it is about WHERE the code
 * is running, not who the visitor is.
 */
export function isMetaEnvironmentEnabled(): boolean {
  if (!isNonProductionOrigin()) return true;
  // Non-production origin: allowed only against an explicitly configured
  // (test) dataset, never against the production default.
  return HAS_EXPLICIT_PIXEL_OVERRIDE;
}

export const META_PIXEL_SCRIPT_ID = "meta-pixel-base";
export const META_PIXEL_SRC = "https://connect.facebook.net/en_US/fbevents.js";

type FbqArgs = unknown[];
type Fbq = {
  (...args: FbqArgs): void;
  callMethod?: (...args: FbqArgs) => void;
  queue?: FbqArgs[];
  loaded?: boolean;
  version?: string;
  push?: unknown;
};

type MetaWindow = Window & {
  fbq?: Fbq;
  _fbq?: Fbq;
  __msoMetaInitialized?: boolean;
};

function metaWindow(): MetaWindow | null {
  return typeof window === "undefined" ? null : (window as MetaWindow);
}

const isDev = process.env.NODE_ENV !== "production";

/** Route-level suppression latches. Declared early to avoid any TDZ hazard. */
let suspendedForRoute = false;
let routeGuardInstalled = false;

/** Dev-only diagnostics. Never logs identity, form payloads or medical values. */
function debug(message: string) {
  if (isDev && typeof console !== "undefined") console.info(`[Meta] ${message}`);
}

/**
 * Current-route eligibility, read live from location so it stays correct across
 * client-side navigation without any subscription.
 */
export function isCurrentRouteMetaEligible(): boolean {
  const w = metaWindow();
  if (!w) return false;
  return isMetaEligibleRoute(w.location.pathname, w.location.search);
}

/**
 * The single gate: advertising is allowed for the current visitor, and the
 * current route is eligible.
 *
 * "Allowed" means the visitor accepted marketing — see isAdvertisingAllowed().
 * Undecided, an explicit Reject, or a revocation after acceptance blocks
 * everything and clears the pixel's cookies.
 */
export function isMetaAllowed(): boolean {
  if (!metaWindow()) return false;
  if (!isMetaEnvironmentEnabled()) return false;
  if (!isAdvertisingAllowed()) return false;
  return isCurrentRouteMetaEligible();
}

/** True once the base loader stub exists on window. */
export function isMetaPixelPresent(): boolean {
  return typeof metaWindow()?.fbq === "function";
}

/**
 * Installs the official Meta loader stub.
 *
 * This is the vendor snippet's function body, transcribed rather than pasted:
 * it creates the `fbq` queue so calls made before fbevents.js finishes loading
 * are replayed afterwards. The vendor's inline `init` + `track('PageView')` are
 * deliberately NOT included here — PageView has exactly one authoritative
 * owner, `initMetaPixel()` below, so the first page cannot be counted twice.
 *
 * The <script src> itself is rendered by components/MetaPixel.tsx via
 * next/script, so this function never injects a second network request.
 */
function installLoaderStub(w: MetaWindow) {
  if (w.fbq) return;
  const n: Fbq = function (...args: FbqArgs) {
    // Equivalent to the vendor's `n.callMethod.apply(n, arguments)` — a method
    // call on `n` binds `this` the same way.
    if (n.callMethod) n.callMethod(...args);
    else n.queue?.push(args);
  } as Fbq;
  if (!w._fbq) w._fbq = n;
  n.push = n;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [];
  w.fbq = n;
}

function callFbq(...args: FbqArgs): boolean {
  const w = metaWindow();
  if (!w?.fbq) return false;
  try {
    w.fbq(...args);
    return true;
  } catch {
    // A blocked, stubbed or partially-loaded pixel must never surface an error.
    return false;
  }
}

/**
 * Initializes the pixel exactly once per page load and fires the single
 * authoritative PageView for the page the visitor is on right now.
 *
 * Safe to call repeatedly — on mount, on consent change, on rerender. The
 * `__msoMetaInitialized` flag lives on window rather than in module scope so
 * React Strict Mode's double-invoked effects and any duplicate mount of the
 * provider cannot produce a second init or a second PageView.
 */
export function initMetaPixel(): boolean {
  const w = metaWindow();
  if (!w) return false;
  if (w.__msoMetaInitialized) return true;
  if (!isMetaAllowed()) {
    debug(
      !isMetaEnvironmentEnabled()
        ? "suppressed: non-production origin (set NEXT_PUBLIC_META_PIXEL_ID to a test dataset to enable)"
        : !isAdvertisingAllowed()
          ? hasDeclinedMarketing()
            ? "suppressed: visitor declined advertising"
            : "suppressed: visitor has not accepted advertising"
          : "suppressed: sensitive route",
    );
    return false;
  }

  installLoaderStub(w);

  // No second argument: Automatic Advanced Matching stays off by design.
  if (!callFbq("init", META_PIXEL_ID)) return false;

  w.__msoMetaInitialized = true;
  debug(`initialized ${META_PIXEL_ID}`);

  // Wrap history BEFORE any navigation can happen, so route suppression beats
  // Meta's own automatic PageView on the very first transition.
  installRouteGuard(w);

  // Recover click attribution that Meta would otherwise miss. fbevents builds
  // _fbc from an `fbclid` in the CURRENT url; because the pixel only loads
  // after consent, a visitor who browsed before accepting no longer has it
  // there and the click becomes unattributed. The buffered landing value
  // restores it, in Meta's documented fb.1.<ts>.<fbclid> format.
  seedFbcFromLanding();

  // The one PageView for the initial eligible page. Route transitions are
  // handled separately by components/MetaPixel.tsx.
  callFbq("track", "PageView");
  debug("PageView (initial)");
  return true;
}

/**
 * Writes the `_fbc` click cookie from the buffered landing `fbclid` when the
 * pixel could not derive one itself. Runs only after consent (its only caller
 * is initMetaPixel, which is already gated) and never overwrites an existing
 * value, so Meta's own cookie always wins.
 */
function seedFbcFromLanding(): void {
  try {
    if (typeof document === "undefined") return;
    if (/(^|;\s*)_fbc=/.test(document.cookie)) return;
    const fbclid = getBufferedLandingParam("fbclid");
    if (!fbclid || !/^[A-Za-z0-9._~-]{1,256}$/.test(fbclid)) return;
    const value = `fb.1.${Date.now()}.${fbclid}`;
    const expires = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `_fbc=${value};expires=${expires};path=/;SameSite=Lax`;
    debug("seeded _fbc from buffered landing fbclid");
  } catch {
    // Attribution enrichment is best-effort and must never break init.
  }
}

/**
 * PageView for a client-side route transition. The caller owns de-duplication
 * of the route itself; this only enforces consent, eligibility and init state.
 */
export function trackMetaPageView(): boolean {
  if (!isMetaAllowed()) return false;
  if (!metaWindow()?.__msoMetaInitialized) return false;
  const sent = callFbq("track", "PageView");
  if (sent) debug("PageView (route change)");
  return sent;
}

/**
 * The primary conversion. Fired only after the server has confirmed an accepted
 * lead, from the single canonical success funnel in utils/enhancedConversions.ts.
 *
 * @param eventId Opaque, server-issued submission ID. Contains no PII and is
 *   never derived from email, phone, name, ZIP or any clinical value. Passing
 *   it as Meta's `eventID` is what lets Meta de-duplicate this browser event
 *   against the Meta-managed CAPI server event that mirrors it.
 */
export function trackMetaLead(eventId: string): boolean {
  if (!eventId) return false;
  if (!isMetaAllowed()) {
    debug("Lead suppressed: consent or route ineligible");
    return false;
  }
  if (!metaWindow()?.__msoMetaInitialized) {
    debug("Lead suppressed: pixel not initialized");
    return false;
  }
  // Empty custom_data is the point. See rule 2 above.
  const sent = callFbq("track", "Lead", {}, { eventID: eventId });
  if (sent) debug(`Lead ${eventId}`);
  return sent;
}

/**
 * Secondary micro-conversion for a click-to-call CTA.
 *
 * A click on a tel: link is NOT a completed phone call, and this event must not
 * be treated as one. The dialled business number is never sent.
 */
export function trackMetaContact(eventId: string): boolean {
  if (!eventId) return false;
  if (!isMetaAllowed()) return false;
  if (!metaWindow()?.__msoMetaInitialized) return false;
  const sent = callFbq("track", "Contact", {}, { eventID: eventId });
  if (sent) debug(`Contact ${eventId}`);
  return sent;
}

/**
 * Route-level suppression, distinct from user consent.
 *
 * VERIFIED IN-BROWSER: once fbevents.js is resident, Meta's own pixel fires a
 * PageView on `history` changes by itself — no `fbq()` call from this codebase
 * is involved. Unmounting the <Script> does not stop it, because the script has
 * already executed and removing the tag does not unload it. So on a
 * client-side navigation from an eligible page into a clinical route Meta
 * would transmit a PageView for that URL despite this module staying silent.
 *
 * The authoritative list of clinical routes is SENSITIVE_PATH_PREFIXES in
 * lib/route-privacy.ts — do not restate it here. An earlier version of this
 * comment named four routes that the policy did not actually exclude, and
 * docs/meta-tracking.md carried the same stale list into its QA checklist,
 * so anyone verifying against either would have certified a protection that
 * did not exist. Name the source, not a copy.
 *
 * `fbq('consent','revoke')` is Meta's documented kill switch and suppresses the
 * automatic event too — measured: 0 requests while revoked, and normal
 * behaviour restored after `grant`. These two helpers therefore ride the
 * eligibility of the current route, independently of the visitor's consent
 * choice, which `revokeMetaConsent()` below still owns.
 */
export function suspendMetaForRoute(): void {
  if (suspendedForRoute) return;
  if (!metaWindow()?.fbq) return;
  callFbq("consent", "revoke");
  suspendedForRoute = true;
  debug("suppressed: sensitive route (pixel dispatch revoked)");
}

export function resumeMetaForRoute(): void {
  if (!suspendedForRoute) return;
  if (!metaWindow()?.fbq) return;
  // Never re-grant against an explicit refusal.
  if (!isAdvertisingAllowed()) return;
  callFbq("consent", "grant");
  suspendedForRoute = false;
  debug("resumed: eligible route");
}

/** Test seam — resets the module-level suspension latch. */
export function __resetMetaRouteSuspension(): void {
  suspendedForRoute = false;
  routeGuardInstalled = false;
}

/**
 * Makes route suppression take effect BEFORE the navigation, not after.
 *
 * React effects run after the history entry has already changed, and Meta's own
 * history hook fires its automatic PageView synchronously during the change —
 * so an effect-based guard always loses the race on the FIRST navigation into a
 * clinical route. Measured: one PageView for /patient-forms leaked that way.
 *
 * This installs our own wrapper around history.pushState/replaceState *after*
 * fbevents.js has installed its own. Ours is therefore the outer function and
 * runs first: it decides eligibility from the TARGET url and revokes or grants
 * before delegating, so Meta's hook is already suppressed by the time it runs.
 *
 * Installed once, immediately after a successful init.
 */
function installRouteGuard(w: MetaWindow): void {
  if (routeGuardInstalled) return;
  routeGuardInstalled = true;

  const applyFor = (pathname: string, search: string) => {
    if (isMetaEligibleRoute(pathname, search)) resumeMetaForRoute();
    else suspendMetaForRoute();
  };

  (["pushState", "replaceState"] as const).forEach((method) => {
    const original = w.history[method].bind(w.history);
    w.history[method] = function patched(
      data: unknown,
      unused: string,
      url?: string | URL | null,
    ) {
      if (url !== undefined && url !== null) {
        try {
          const target = new URL(String(url), w.location.href);
          applyFor(target.pathname, target.search);
        } catch {
          // Unparseable target: fail closed.
          suspendMetaForRoute();
        }
      }
      return original(data, unused, url);
    } as History[typeof method];
  });

  // Back/forward: the URL has already changed when popstate fires, but Meta's
  // listener is registered earlier than ours only if it also uses popstate; in
  // practice this catches the state correctly for the subsequent dispatch.
  w.addEventListener("popstate", () => {
    applyFor(w.location.pathname, w.location.search);
  });
}

/**
 * Called when the visitor withdraws marketing consent after the pixel loaded.
 *
 * Uses Meta's own consent mechanism to stop further dispatch, then clears the
 * init flag so a later re-grant performs a clean initialization. First-party
 * `_fbp`/`_fbc` cookies are expired by lib/consent.ts `cleanupNonEssentialCookies`,
 * which already lists those prefixes. Cookies on facebook.com are outside this
 * origin and cannot be removed from here — no attempt is made to pretend otherwise.
 */
export function revokeMetaConsent(): void {
  const w = metaWindow();
  if (!w?.fbq) return;
  callFbq("consent", "revoke");
  w.__msoMetaInitialized = false;
  debug("consent revoked; dispatch stopped");
}

/** Re-enables dispatch after a prior revoke within the same page load. */
export function grantMetaConsent(): void {
  if (!metaWindow()?.fbq) return;
  callFbq("consent", "grant");
  debug("consent granted");
}

/**
 * Opaque event ID fallback for signals with no server-issued identifier
 * (currently only phone clicks). Uses crypto.randomUUID where available.
 * Contains no PII by construction.
 */
export function createOpaqueEventId(prefix = "evt"): string {
  try {
    const c = typeof crypto !== "undefined" ? crypto : undefined;
    if (c?.randomUUID) return `${prefix}_${c.randomUUID()}`;
    if (c?.getRandomValues) {
      const bytes = c.getRandomValues(new Uint8Array(16));
      return `${prefix}_${Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("")}`;
    }
  } catch {
    // fall through
  }
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
}
