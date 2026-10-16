import { SITE_URL } from "@/lib/seo";

/**
 * "Add us as a preferred source on Google" prompt.
 *
 * Google's preferred sources feature lets a reader nominate a publication so it
 * surfaces more often in Top Stories, AI Overviews and AI Mode:
 * https://developers.google.com/search/docs/appearance/preferred-sources
 *
 * ## Why the deeplink and not Google's JavaScript button
 *
 * Google documents two options. The first loads
 * `https://news.google.com/swg/js/v1/publisher.js` and renders a Google-styled
 * button into `<div google-add-preferred-source-btn>`. The second is a plain link
 * to `https://www.google.com/preferences/source?q=<domain>`, which Google
 * explicitly supports and explicitly permits styling yourself ("design your own
 * custom promotion badge").
 *
 * The deeplink is the right choice for this site, for four reasons that all point
 * the same way:
 *
 *   1. **No third-party script.** The JS button is an async request on every
 *      article, condition and treatment page — the highest-volume templates on the
 *      site — for a control that most readers will never click. A link costs
 *      nothing and cannot shift layout.
 *   2. **No consent question.** This site runs Consent Mode and a cookie banner,
 *      and its measurement contract is deliberate about what may load before a
 *      visitor chooses. Injecting a Google script that may set storage would need
 *      a consent decision; an `<a href>` needs none.
 *   3. **It is server-rendered.** The button, its wording and its destination are
 *      in the HTML a crawler and an LLM read. A JS-injected control is not.
 *   4. **It matches the site.** The JS button renders Google's own styling, which
 *      does not sit inside this design system.
 *
 * ## Scope
 *
 * Google accepts domain- and subdomain-level sources only — never a path — so the
 * link always nominates the bare domain regardless of which page it appears on.
 *
 * ## Two shapes, one link
 *
 * `PreferredSourceButton` is the bare control, for a place that already supplies
 * its own framing — the blog hero, where it sits in the tag row beneath the title
 * and the surrounding panel makes the context obvious.
 *
 * The default export wraps that same button in a self-explanatory block, for the
 * end of a page where nothing nearby says what the ask is.
 *
 * Both render the identical `<a>`, so they cannot drift in destination, wording or
 * accessible name — only in surrounding layout. A page should use exactly ONE:
 * asking the same reader twice is a defect, and
 * `scripts/qa/preferred-source-audit.mjs` fails if a page renders it more than once.
 */

/** Google accepts a domain or subdomain, never a path. */
const PREFERRED_SOURCE_DOMAIN = new URL(SITE_URL).hostname;
const PREFERRED_SOURCE_HREF =
  `https://www.google.com/preferences/source?q=${encodeURIComponent(PREFERRED_SOURCE_DOMAIN)}`;

/**
 * The accessible name.
 *
 * The visible text reads "Add as preferred source", which is clear in place and
 * ambiguous out of context — someone tabbing through, or listing the page's links
 * in a screen reader, would not know where it goes or who it is for.
 */
const A11Y_LABEL = "Add Mountain Spine & Orthopedics as a preferred source on Google";

/**
 * The bare control.
 *
 * Solid brand blue, because in the hero it sits in a row of pale tag pills and has
 * to read as the one actionable thing there rather than as another tag.
 */
export function PreferredSourceButton({
  className = "",
  compact = false,
}: {
  className?: string;
  /** Tighter, for sitting inline beside small pills. */
  compact?: boolean;
}) {
  return (
    <a
      href={PREFERRED_SOURCE_HREF}
      target="_blank"
      rel="noopener noreferrer"
      data-cta-action="preferred-source"
      aria-label={A11Y_LABEL}
      className={
        "group inline-flex items-center justify-center gap-2 rounded-full " +
        "bg-[#0A50EC] font-medium text-white " +
        "transition-[background-color,box-shadow,transform] duration-200 " +
        "hover:bg-[#0942c4] active:scale-[0.98] " +
        "shadow-[0_2px_10px_rgba(10,80,236,0.28)] hover:shadow-[0_5px_18px_rgba(10,80,236,0.38)] " +
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 " +
        "focus-visible:outline-[#0A50EC] " +
        // 40px inline vs 44px standalone. In the hero the row also holds ~28px tag
        // pills, and a full 44px control there towers over them; 40px keeps the row
        // balanced while staying an easy target, and the row gap means there is
        // nothing adjacent to mis-tap.
        (compact
          ? "min-h-[40px] px-4 py-2 text-[13px] sm:text-sm"
          : "min-h-[44px] w-full px-5 py-2.5 text-sm sm:w-auto") +
        (className ? " " + className : "")
      }
    >
      <svg
        width={compact ? "15" : "16"}
        height={compact ? "15" : "16"}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="shrink-0 transition-transform duration-200 group-hover:scale-110"
      >
        <path
          d="M12 3.5l2.6 5.27 5.82.85-4.21 4.1.99 5.78L12 16.77l-5.2 2.73.99-5.78-4.21-4.1 5.82-.85L12 3.5z"
          fill="currentColor"
        />
      </svg>
      <span className="whitespace-nowrap">Add as preferred source</span>
    </a>
  );
}

/**
 * The self-explanatory block, for the end of a page.
 *
 * Neutral surface rather than the blue of the conversion module it sits above:
 * two tinted cards stacked would read as two competing CTAs, and this is the
 * secondary ask.
 */
export default function PreferredSourceCTA({ className = "" }: { className?: string }) {
  return (
    <aside
      aria-labelledby="preferred-source-heading"
      data-module="preferred-source"
      className={
        "not-prose rounded-2xl border border-[#DCDEE1] bg-[#FAFAFA] " +
        "px-5 py-4 sm:px-6 sm:py-5 " +
        // Stacks under 640px so the button is full-width and thumb-reachable,
        // then sits beside the text once there is room for both.
        "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6 " +
        className
      }
    >
      <div className="min-w-0">
        <h2
          id="preferred-source-heading"
          style={{ fontFamily: "var(--font-public-sans)", fontWeight: 600 }}
          className="text-[#252932] text-base sm:text-lg"
        >
          Follow our updates on Google
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-[#424959]">
          Choose Mountain Spine &amp; Orthopedics as a preferred source to see our
          orthopedic and spine guidance more often in your Google results.
        </p>
      </div>
      <PreferredSourceButton className="shrink-0" />
    </aside>
  );
}
