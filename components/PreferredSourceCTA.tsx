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
 *   1. **No third-party script.** The JS button is a render-blocking-ish async
 *      request on every article, condition and treatment page — the highest-volume
 *      templates on the site — for a control that most readers will never click.
 *      A link costs nothing and cannot shift layout.
 *   2. **No consent question.** This site runs Consent Mode and a cookie banner,
 *      and its measurement contract is deliberate about what may load before a
 *      visitor chooses. Injecting a Google script that may set storage would need
 *      a consent decision; an `<a href>` needs none.
 *   3. **It is server-rendered.** The button, its wording and its destination are
 *      in the HTML a crawler and an LLM read. A JS-injected control is not.
 *   4. **It matches the site.** The JS button renders Google's own styling, which
 *      does not sit inside this design system. This one uses the same tokens as
 *      every other module on the page.
 *
 * ## Scope
 *
 * Google accepts domain- and subdomain-level sources only — never a path — so the
 * link always nominates the bare domain regardless of which page it appears on.
 *
 * Worth knowing: the feature's Top Stories surface is news-oriented, so the
 * clearest fit is the blog. It also feeds AI Overviews and AI Mode, which is why
 * it is reasonable on the evergreen clinical templates too.
 */

/** Google accepts a domain or subdomain, never a path. */
const PREFERRED_SOURCE_DOMAIN = new URL(SITE_URL).hostname;
const PREFERRED_SOURCE_HREF =
  `https://www.google.com/preferences/source?q=${encodeURIComponent(PREFERRED_SOURCE_DOMAIN)}`;

export default function PreferredSourceCTA({ className = "" }: { className?: string }) {
  const label = "Add Mountain Spine & Orthopedics as a preferred source on Google";

  // Extracted so the markup below stays readable; the link is the whole point of
  // the module and everything around it is framing.
  const link = (
    <a
      href={PREFERRED_SOURCE_HREF}
      target="_blank"
      rel="noopener noreferrer"
      data-cta-action="preferred-source"
      aria-label={label}
      className={
        "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full " +
        "bg-[#0A50EC] px-5 py-2.5 text-sm font-medium text-white transition-colors " +
        "hover:bg-[#0942c4] focus-visible:outline focus-visible:outline-2 " +
        "focus-visible:outline-offset-2 focus-visible:outline-[#0A50EC] " +
        // Full-width when stacked (under 640px) so it is thumb-reachable at the
        // end of a long article; intrinsic width once it sits beside the text.
        "w-full sm:w-auto shrink-0"
      }
    >
      {/* Decorative: the accessible name comes from aria-label on the link. */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M12 3.5l2.6 5.27 5.82.85-4.21 4.1.99 5.78L12 16.77l-5.2 2.73.99-5.78-4.21-4.1 5.82-.85L12 3.5z"
          fill="currentColor"
        />
      </svg>
      <span>Add as preferred source</span>
    </a>
  );

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
      {link}
    </aside>
  );
}
