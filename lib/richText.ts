import { conditionIndex, treatmentIndex } from '@/components/data/taxonomyIndex.generated';
import { resolveConditionSlugHref } from '@/lib/internal-link-redirects';

/**
 * Converts stored article text into render-ready HTML: markdown bold becomes
 * <strong>, and the first mention of another condition or treatment becomes an
 * internal link.
 *
 * This logic already existed inline in ConditionPage, the treatment detail page
 * and ConditionTreatmentFAQSection. It lives here so the area-of-pain templates
 * can use it too without a fourth copy drifting from the others.
 *
 * Deliberately built on taxonomyIndex.generated rather than the source data
 * modules. Those are 1.3MB and 867KB, and the area-of-pain templates are client
 * components — importing them here would put the whole dataset back in the
 * browser bundle and undo the reduction from 729kB to 325kB.
 */

type Entry = { slug: string; title: string; type: 'condition' | 'treatment' };

const ENTRIES: Entry[] = [
  ...conditionIndex.map((c) => ({ slug: c.slug, title: c.title, type: 'condition' as const })),
  ...treatmentIndex.map((t) => ({ slug: t.slug, title: t.title, type: 'treatment' as const })),
];

/** Longest titles first, so "Cervical Herniated Disc" wins over "Herniated Disc". */
const SORTED = ENTRIES.slice().sort((a, b) => b.title.length - a.title.length);

const BY_TITLE = new Map<string, Entry>();
for (const e of ENTRIES) {
  const key = e.title.toLowerCase();
  if (!BY_TITLE.has(key)) BY_TITLE.set(key, e);
}

const escapeRe = (s: string) => s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');

/** Physical therapy is not a service offered here, so it is never bolded or linked. */
const stripPhysicalTherapy = (s: string) =>
  s
    .replace(/\*\*Physical Therapy\*\*/gi, 'Physical Therapy')
    .replace(/<a[^>]*>Physical Therapy<\/a>/gi, 'Physical Therapy')
    .replace(/<strong>Physical Therapy<\/strong>/gi, 'Physical Therapy');

export function processTextWithBoldAndLinks(text: string, currentSlug: string): string {
  if (!text || typeof text !== 'string') return text ?? '';

  let processed = stripPhysicalTherapy(text);

  // **bold** -> <strong>, applied before link detection so markdown nested
  // inside an existing anchor is still converted.
  processed = processed.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  processed = stripPhysicalTherapy(processed);

  // Text that already carries its own links is left alone rather than
  // accumulating a second layer of them.
  if (processed.includes('<a href=')) return processed;

  // Split into tag / text runs so titles inside attributes are never linked.
  const segments: Array<{ html: boolean; content: string }> = [];
  const tagRe = /<[^>]+>/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = tagRe.exec(processed)) !== null) {
    if (m.index > last) segments.push({ html: false, content: processed.slice(last, m.index) });
    segments.push({ html: true, content: m[0] });
    last = m.index + m[0].length;
  }
  if (last < processed.length) segments.push({ html: false, content: processed.slice(last) });

  const linked = new Set<string>();

  const out = segments.map((seg) => {
    if (seg.html) return seg.content;
    let content = seg.content;

    for (const { title } of SORTED) {
      const entry = BY_TITLE.get(title.toLowerCase());
      if (!entry) continue;
      if (entry.slug === currentSlug) continue;
      if (linked.has(entry.slug)) continue;
      if (title.toLowerCase() === 'physical therapy') continue;

      const re = new RegExp(`(?<![\\w-])${escapeRe(title)}(?![\\w-])`, 'i');
      let done = false;
      content = content.replace(re, (match) => {
        if (done) return match;
        done = true;
        linked.add(entry.slug);
        const href = entry.type === 'condition' ? resolveConditionSlugHref(entry.slug) : `/treatments/${entry.slug}`;
        return `<a href="${href}" class="underline text-[#252932] hover:text-[#2358AC]">${match}</a>`;
      });
    }

    return content;
  });

  return stripPhysicalTherapy(out.join(''));
}
