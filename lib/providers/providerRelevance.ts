/**
 * Clinically-grounded provider selection.
 *
 * `selectProvidersForPage` (see ./selectProviders) made the featured-physician
 * module *stable*, but it still picked from every visible provider regardless
 * of what the page is about. A foot-and-ankle surgeon could be featured on an
 * adult scoliosis page, and a spine surgeon on a bunion page. For a YMYL
 * medical site that is worse than a cosmetic bug: it misrepresents who treats
 * the condition, weakens the condition↔physician entity relationship that
 * search and generative engines read, and costs conversions from patients who
 * came looking for the right kind of specialist.
 *
 * This module adds the missing relationship layer:
 *
 *   condition / treatment / body region  →  care domain(s)  →  eligible providers
 *
 * Two hard rules:
 *
 *  1. Provider→domain mappings are derived ONLY from each provider's own
 *     verified profile in components/data/doctors.tsx (`medicalSpecialty`,
 *     `specialties`, `conditionsTreated`). Nothing here is assigned for SEO
 *     reasons. When a provider's verified profile changes, update the entry.
 *
 *  2. If a page resolves to no domain, or a domain has no eligible provider,
 *     the caller receives an empty list and must hide the module rather than
 *     fall back to an arbitrary physician.
 *
 * Within an eligible pool the existing slug-keyed rotation still applies, so
 * different pages continue to surface different (but always appropriate)
 * providers, and any given URL renders the same providers on every build.
 */

import type { DoctorProp } from "@/components/data/doctors";
import { getVisibleProviders } from "@/lib/providers/providerVisibility";
import { selectProvidersForPage } from "@/lib/providers/selectProviders";

export type CareDomain =
  | "spine"
  | "spine-deformity"
  | "foot-ankle"
  | "knee-hip"
  | "shoulder-elbow-hand"
  | "sports-medicine"
  | "pain-management";

/**
 * Provider → care domains, each traceable to that provider's verified profile.
 *
 * - dr-scott-katzman           medicalSpecialty: Orthopedic/Spine Surgery;
 *                              conditionsTreated includes Scoliosis.
 * - dr-david-cowin             Orthopedic Surgery; spine fusion specialties
 *                              (TLIF, axial/facet fusion) plus joint
 *                              reconstruction and upper/lower extremity care.
 * - dr-christopher-mccarthy    Orthopedic + Spine Surgery; reconstructive spine
 *                              procedures; adult degenerative spine, spinal
 *                              trauma, shoulder/hand, sports injuries.
 * - dr-douglas-slaughter       Orthopedic + Spine Surgery; comprehensive and
 *                              reconstructive spinal procedures; sports and
 *                              high-impact / age-related spine injuries.
 * - dr-monica-mcphail-pruitt   Anesthesiology + Pain Medicine only. Not a
 *                              surgical provider — pain management pages only.
 * - dr-clay-shumway            Foot & Ankle surgery only.
 */
const PROVIDER_DOMAINS: Record<string, readonly CareDomain[]> = {
  "dr-scott-katzman": ["spine", "spine-deformity"],
  "dr-david-cowin": ["spine", "knee-hip", "shoulder-elbow-hand"],
  "dr-christopher-mccarthy": [
    "spine",
    "spine-deformity",
    "shoulder-elbow-hand",
    "sports-medicine",
  ],
  "dr-douglas-slaughter": ["spine", "spine-deformity", "sports-medicine"],
  "dr-monica-mcphail-pruitt": ["pain-management"],
  "dr-clay-shumway": ["foot-ankle"],
};

/** Body-region tag used across conditions/treatments data → care domains. */
const DOMAINS_BY_TAG: Record<string, readonly CareDomain[]> = {
  spine: ["spine"],
  "lower spine": ["spine"],
  neck: ["spine"],
  back: ["spine"],
  knee: ["knee-hip"],
  hip: ["knee-hip"],
  shoulder: ["shoulder-elbow-hand"],
  hand: ["shoulder-elbow-hand"],
  wrist: ["shoulder-elbow-hand"],
  elbow: ["shoulder-elbow-hand"],
  "hand, wrist & elbow": ["shoulder-elbow-hand"],
  foot: ["foot-ankle"],
  ankle: ["foot-ankle"],
  "foot & ankle": ["foot-ankle"],
  "sports medicine": ["sports-medicine"],
  "pain management": ["pain-management"],
};

/**
 * Slug-level overrides, for pages whose body-region tag is correct but too
 * coarse. Adult spinal deformity is the motivating case: it is tagged "Spine",
 * but should feature the surgeons whose verified profiles cover deformity and
 * reconstruction rather than any spine provider.
 *
 * Ordered most-specific-first; the first domain with eligible providers wins.
 */
const DOMAIN_OVERRIDES_BY_SLUG: Record<string, readonly CareDomain[]> = {
  // Conditions
  "adult-degenerative-scoliosis": ["spine-deformity", "spine"],
  "spine-deformities": ["spine-deformity", "spine"],
  kyphosis: ["spine-deformity", "spine"],
  "spinal-compression-fractures": ["spine-deformity", "spine"],
  // Treatments
  "spinal-fusion": ["spine-deformity", "spine"],
  "revision-spinal-surgery": ["spine-deformity", "spine"],
  "lumbar-fusion-surgery": ["spine-deformity", "spine"],
  // Deformity-only, deliberately without the "spine" fallback the entries above
  // carry: this page is the adult-deformity hub, and widening the pool lets the
  // rotation surface a general spine surgeon instead of a deformity surgeon. With
  // no eligible deformity provider the module correctly hides itself.
  "adult-scoliosis-surgery": ["spine-deformity"],
};

/**
 * Explicit domains for non-taxonomy routes that name their own body region
 * (area-of-pain hubs) or span several regions (injury landing pages).
 */
export const AREA_DOMAINS = {
  backPain: ["spine"] as const,
  neckAndShoulderPain: ["spine", "shoulder-elbow-hand"] as const,
  footPain: ["foot-ankle"] as const,
  /** Trauma pages: spine trauma first, then the general orthopedic pool. */
  injury: ["spine", "shoulder-elbow-hand", "knee-hip"] as const,
} satisfies Record<string, readonly CareDomain[]>;

function normalizeTag(tag: string | undefined | null): string {
  return (tag ?? "").trim().toLowerCase();
}

/** Every provider whose verified profile covers `domain`, in dataset order. */
function providersInDomain(domain: CareDomain): DoctorProp[] {
  return getVisibleProviders().filter((provider) =>
    (PROVIDER_DOMAINS[provider.slug] ?? []).includes(domain)
  );
}

/**
 * Resolve the care domains a page belongs to. Slug overrides win over tags;
 * `tag` wins over `additionalTags`. Returns [] when nothing resolves, which
 * callers must treat as "hide the physician module".
 */
export function resolveCareDomains({
  slug,
  tag,
  additionalTags,
}: {
  slug?: string;
  tag?: string | null;
  additionalTags?: readonly string[] | null;
}): CareDomain[] {
  if (slug && DOMAIN_OVERRIDES_BY_SLUG[slug]) {
    return [...DOMAIN_OVERRIDES_BY_SLUG[slug]];
  }

  const candidates = [tag, ...(additionalTags ?? [])];
  const resolved: CareDomain[] = [];
  for (const candidate of candidates) {
    for (const domain of DOMAINS_BY_TAG[normalizeTag(candidate)] ?? []) {
      if (!resolved.includes(domain)) resolved.push(domain);
    }
  }
  return resolved;
}

/**
 * Providers eligible to be featured on a page, ordered by domain specificity.
 * Empty when the page has no resolvable domain or no provider covers it.
 */
export function eligibleProvidersForDomains(
  domains: readonly CareDomain[]
): DoctorProp[] {
  const seen = new Set<string>();
  const eligible: DoctorProp[] = [];
  for (const domain of domains) {
    for (const provider of providersInDomain(domain)) {
      if (seen.has(provider.slug)) continue;
      seen.add(provider.slug);
      eligible.push(provider);
    }
  }
  return eligible;
}

/**
 * The physician module's provider list for a page.
 *
 * Returns [] when no provider is verified for the page's clinical domain —
 * callers MUST render nothing in that case rather than substituting an
 * unrelated specialist.
 */
export function selectRelevantProviders({
  slug,
  tag,
  additionalTags,
  domains,
  count = 2,
}: {
  slug?: string;
  tag?: string | null;
  additionalTags?: readonly string[] | null;
  /** Bypass tag resolution with an explicit domain list (area/injury routes). */
  domains?: readonly CareDomain[];
  count?: number;
}): DoctorProp[] {
  const resolved =
    domains && domains.length > 0
      ? domains
      : resolveCareDomains({ slug, tag, additionalTags });

  const eligible = eligibleProvidersForDomains(resolved);
  if (eligible.length === 0) return [];

  // Rotate within the eligible pool so neighbouring pages don't all show the
  // same two faces, while any given URL stays byte-identical across builds.
  return selectProvidersForPage(eligible, slug ?? resolved.join("-"), count);
}
