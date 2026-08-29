import Link from "next/link";

export type HubLink = { href: string; label: string; group?: string };

/**
 * Server-rendered shell for the conditions and treatments hubs.
 *
 * Both hub bodies are client components that call useSearchParams(), which makes
 * Next bail out of prerendering that subtree. They were wrapped in a Suspense
 * boundary whose fallback was a grey skeleton, so the prerendered HTML for
 * /conditions and /treatments contained no heading and zero links — nothing for
 * a crawler or a non-JS answer engine to read, and nothing to pass link equity
 * to the hundreds of pages beneath them.
 *
 * Used as the Suspense fallback, this renders the same information the hub
 * shows once hydrated: the page's H1, its intro, and a complete crawlable list
 * of destinations. The interactive hub replaces it on hydration, so this is a
 * genuine equivalent of the final content, not hidden text — and it also gives
 * users real content instead of a pulsing skeleton while JS loads.
 */
export default function HubStaticShell({
  title,
  intro,
  links,
}: {
  title: string;
  intro: string;
  links: HubLink[];
}) {
  const groups = new Map<string, HubLink[]>();
  for (const link of links) {
    const key = link.group || "All";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(link);
  }
  const grouped = [...groups.entries()].sort((a, b) => a[0].localeCompare(b[0]));

  return (
    <main className="w-full flex flex-col items-center bg-white">
      <section className="max-w-[1440px] w-full px-4 sm:px-6 xl:px-[80px] pt-24 sm:pt-32 pb-8">
        <h1
          style={{ fontFamily: "var(--font-public-sans)", fontWeight: 400 }}
          className="text-[#252932] text-2xl sm:text-4xl lg:text-5xl xl:text-6xl text-center leading-tight"
        >
          {title}
        </h1>
        <p className="mt-4 text-center text-[#424959] text-sm sm:text-lg lg:text-xl max-w-3xl mx-auto">
          {intro}
        </p>
      </section>

      <section className="max-w-[1440px] w-full px-4 sm:px-6 xl:px-[80px] pb-16 space-y-8">
        {grouped.map(([group, items]) => (
          <div key={group}>
            {grouped.length > 1 && (
              <h2
                style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }}
                className="text-[#111315] text-xl sm:text-2xl mb-3"
              >
                {group}
              </h2>
            )}
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-[44px] items-center text-[#0A50EC] hover:underline text-sm sm:text-base"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </main>
  );
}
