/**
 * Deterministic provider selection for pages that feature a couple of doctors.
 *
 * These pages previously called Math.random() during render. On server
 * components that means the prerendered HTML is non-reproducible: two builds of
 * the same URL show different physicians, a rebuild silently rewrites hundreds
 * of pages, and the same patient can see different doctors on a revisit. It
 * also makes visual and content regression testing impossible, because nothing
 * about the output is stable.
 *
 * Selection is instead keyed off the page's own slug: stable for a given page,
 * while still distributing different providers across different pages rather
 * than pinning the same two everywhere.
 */

/** FNV-1a. Small, stable across runs and platforms, no dependency. */
function hashKey(key: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

export function selectProvidersForPage<T>(providers: readonly T[], key: string, count = 2): T[] {
  if (providers.length === 0) return [];
  if (providers.length <= count) return [...providers];

  const start = hashKey(key || "default") % providers.length;
  return Array.from({ length: count }, (_, i) => providers[(start + i) % providers.length]);
}
