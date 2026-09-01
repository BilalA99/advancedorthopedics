import Link from 'next/link';
import { conditions } from '@/components/data/conditions';
import { AllTreatmentsCombined } from '@/components/data/treatments';
import { ConditionInfoProp, TreatmentsCardProp } from '@/types/content';
import { normalizeTag } from '@/lib/tag-utils';
import { resolveConditionSlugHref } from '@/lib/internal-link-redirects';

interface InternalLinkingSectionProps {
  currentSlug: string;
  pageType: 'condition' | 'treatment';
}

/**
 * Finds related conditions based on tag, keywords, and treatment relationships
 */
function findRelatedConditions(currentSlug: string, currentCondition: ConditionInfoProp): ConditionInfoProp[] {
  const related: Array<{ condition: ConditionInfoProp; score: number }> = [];
  
  conditions.forEach(condition => {
    if (condition.slug === currentSlug) return; // Skip current condition
    
    let score = 0;
    
    // Same tag = high relevance
    if (condition.tag === currentCondition.tag) {
      score += 10;
    }
    
    // Check additionalTags overlap
    if (currentCondition.additionalTags && condition.tag) {
      if (currentCondition.additionalTags.some(t => normalizeTag(t) === normalizeTag(condition.tag))) {
        score += 8;
      }
    }
    if (condition.additionalTags && currentCondition.tag) {
      if (condition.additionalTags.some(t => normalizeTag(t) === normalizeTag(currentCondition.tag))) {
        score += 8;
      }
    }
    
    // Check categories overlap
    if (currentCondition.categories && condition.categories) {
      const overlap = currentCondition.categories.filter(c1 => 
        condition.categories!.some(c2 => normalizeTag(c1) === normalizeTag(c2))
      ).length;
      score += overlap * 5;
    }
    
    // Keyword overlap
    if (currentCondition.keywords && condition.keywords) {
      const currentKeywords = currentCondition.keywords.map(k => k.toLowerCase());
      const otherKeywords = condition.keywords.map(k => k.toLowerCase());
      const overlap = currentKeywords.filter(k => otherKeywords.includes(k)).length;
      score += overlap * 2;
    }
    
    // Similar title words (basic similarity)
    const currentWords = currentCondition.title.toLowerCase().split(/\s+/);
    const otherWords = condition.title.toLowerCase().split(/\s+/);
    const titleOverlap = currentWords.filter(w => w.length > 3 && otherWords.includes(w)).length;
    score += titleOverlap;
    
    if (score > 0) {
      related.push({ condition, score });
    }
  });
  
  // Sort by score descending and return top 6
  return related
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map(item => item.condition);
}

/**
 * Finds related treatments based on tag, conditions_treated, and keywords
 */
function findRelatedTreatments(currentSlug: string, currentTreatment: TreatmentsCardProp): TreatmentsCardProp[] {
  const related: Array<{ treatment: TreatmentsCardProp; score: number }> = [];
  
  AllTreatmentsCombined.forEach(treatment => {
    if (treatment.slug === currentSlug) return; // Skip current treatment
    
    let score = 0;
    
    // Same tag = high relevance
    if (treatment.tag === currentTreatment.tag) {
      score += 10;
    }
    
    // Check additionalTags overlap
    if (currentTreatment.additionalTags && treatment.tag) {
      if (currentTreatment.additionalTags.some(t => normalizeTag(t) === normalizeTag(treatment.tag))) {
        score += 8;
      }
    }
    if (treatment.additionalTags && currentTreatment.tag) {
      if (treatment.additionalTags.some(t => normalizeTag(t) === normalizeTag(currentTreatment.tag))) {
        score += 8;
      }
    }
    
    // Check categories overlap
    if (currentTreatment.categories && treatment.categories) {
      const overlap = currentTreatment.categories.filter(c1 => 
        treatment.categories!.some(c2 => normalizeTag(c1) === normalizeTag(c2))
      ).length;
      score += overlap * 5;
    }
    
    // Similar conditions_treated (basic text matching)
    if (currentTreatment.conditions_treated && treatment.conditions_treated) {
      const currentLower = currentTreatment.conditions_treated.toLowerCase();
      const otherLower = treatment.conditions_treated.toLowerCase();
      
      // Check for common condition keywords
      const commonTerms = ['spine', 'back', 'neck', 'disc', 'nerve', 'joint', 'pain', 'arthritis', 'herniated', 'stenosis'];
      commonTerms.forEach(term => {
        if (currentLower.includes(term) && otherLower.includes(term)) {
          score += 2;
        }
      });
    }
    
    // Keyword overlap
    if (currentTreatment.keywords && treatment.keywords) {
      const currentKeywords = currentTreatment.keywords.map(k => k.toLowerCase());
      const otherKeywords = treatment.keywords.map(k => k.toLowerCase());
      const overlap = currentKeywords.filter(k => otherKeywords.includes(k)).length;
      score += overlap * 2;
    }
    
    // Similar title words
    const currentWords = currentTreatment.title.toLowerCase().split(/\s+/);
    const otherWords = treatment.title.toLowerCase().split(/\s+/);
    const titleOverlap = currentWords.filter(w => w.length > 3 && otherWords.includes(w)).length;
    score += titleOverlap;
    
    if (score > 0) {
      related.push({ treatment, score });
    }
  });
  
  // Sort by score descending and return top 6
  return related
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map(item => item.treatment);
}

export default function InternalLinkingSection({ currentSlug, pageType }: InternalLinkingSectionProps) {
  let relatedItems: Array<{ title: string; slug: string; href: string }> = [];
  
  if (pageType === 'condition') {
    const currentCondition = conditions.find(c => c.slug === currentSlug);
    if (currentCondition) {
      const related = findRelatedConditions(currentSlug, currentCondition);
      relatedItems = related.map(condition => ({
        title: condition.title,
        slug: condition.slug,
        href: resolveConditionSlugHref(condition.slug)
      }));
    }
  } else if (pageType === 'treatment') {
    const currentTreatment = AllTreatmentsCombined.find(t => t.slug === currentSlug);
    if (currentTreatment) {
      const related = findRelatedTreatments(currentSlug, currentTreatment);
      relatedItems = related.map(treatment => ({
        title: treatment.title,
        slug: treatment.slug,
        href: `/treatments/${treatment.slug}`
      }));
    }
  }
  
  // Don't render if no related items found
  if (relatedItems.length === 0) {
    return null;
  }
  
  const sectionTitle = pageType === 'condition' ? 'Related Conditions' : 'Related Treatments';
  
  return (
    <nav aria-label={sectionTitle} className="bg-white space-y-[40px] flex flex-col w-full">
      <p
        style={{
          fontFamily: "var(--font-public-sans)",
          fontWeight: 400,
        }}
        className="text-[#111315] sm:text-5xl text-3xl"
        aria-hidden="true"
      >
        {sectionTitle}
      </p>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-[32px] gap-y-[24px]">
        {relatedItems.map((item) => (
          <Link
            key={item.slug}
            href={item.href}
            className="group flex flex-col p-6 bg-[#FAFAFA] rounded-[16px] border border-gray-200 hover:border-[#0A50EC] transition-all duration-300 hover:shadow-md"
          >
            <span
              style={{
                fontFamily: "var(--font-public-sans)",
                fontWeight: 500,
              }}
              className="text-[#111315] text-xl group-hover:text-[#0A50EC] transition-colors duration-300"
            >
              {item.title}
            </span>
            <div className="mt-4 flex items-center text-[#0A50EC] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400,
                }}
                className="text-sm"
              >
                Learn more
              </span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="18" 
                height="11" 
                viewBox="0 0 18 11" 
                fill="none"
                className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
              >
                <path 
                  d="M12.3982 0.268483C12.0402 -0.0894963 11.4598 -0.089494 11.1018 0.268488C10.7438 0.62647 10.7438 1.20687 11.1018 1.56485L14.1203 4.58333H1.66667C1.16041 4.58333 0.75 4.99374 0.75 5.5C0.75 6.00626 1.16041 6.41667 1.66667 6.41667H14.1203L11.1018 9.43516C10.7439 9.79314 10.7439 10.3735 11.1019 10.7315C11.4598 11.0895 12.0402 11.0895 12.3982 10.7315L16.9766 6.15303C16.9935 6.13637 17.0098 6.11905 17.0254 6.10112C17.0873 6.02997 17.1365 5.95154 17.1728 5.86885C17.2221 5.75677 17.2496 5.63294 17.25 5.50273L17.25 5.5C17.25 5.49717 17.25 5.49434 17.25 5.49152C17.2489 5.37622 17.2266 5.26602 17.1867 5.16463C17.142 5.05068 17.0736 4.94387 16.9815 4.85178L12.3982 0.268483Z" 
                  fill="#0A50EC" 
                />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
}


