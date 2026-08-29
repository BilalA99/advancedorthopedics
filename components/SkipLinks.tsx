/**
 * Bypass block (WCAG 2.4.1).
 *
 * Server-rendered as the first focusable element in the document so keyboard
 * and screen-reader users can jump past the header and navigation on every
 * route. Visually hidden until focused.
 *
 * Previously this component offered three links — to #main-content,
 * #navigation and #search — but it was never rendered, and two of those three
 * targets did not exist anywhere in the site. A skip link that lands nowhere is
 * worse than none, so this is a single link to the one target the root layout
 * actually provides.
 */
export default function SkipLinks() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:inline-flex focus:min-h-[44px] focus:items-center focus:rounded-md focus:bg-[#0A50EC] focus:px-4 focus:py-2 focus:font-medium focus:text-white focus:outline-none focus:ring-2 focus:ring-[#0A50EC] focus:ring-offset-2"
    >
      Skip to main content
    </a>
  );
}
