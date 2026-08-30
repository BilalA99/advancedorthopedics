/**
 * Insurance carriers and participation status.
 *
 * Wording is deliberately conservative. "Commonly accepted" is a statement
 * about the carrier, never about a specific patient's plan — benefits, network
 * tier and authorisation vary plan to plan, so nothing here promises coverage
 * or eligibility. The exclusions are stated plainly rather than buried, because
 * a patient finding out at the desk is a worse outcome than finding out here.
 *
 * Sources: the carrier list previously shown on /insurance-policy, and the two
 * participation exclusions already published on that page.
 */

export type PlanStatus = 'accepted' | 'partial' | 'not-accepted';

export interface InsurancePlan {
  name: string;
  aliases?: string[];
  status: PlanStatus;
  note: string;
}

export const INSURANCE_PLANS: InsurancePlan[] = [
  {
    name: 'Blue Cross Blue Shield',
    aliases: ['bcbs', 'blue cross', 'blue shield', 'florida blue', 'horizon'],
    status: 'accepted',
    note: 'Commonly accepted across our locations, including most PPO plans.',
  },
  {
    name: 'UnitedHealthcare',
    aliases: ['united healthcare', 'united', 'uhc', 'optum'],
    status: 'accepted',
    note: 'Commonly accepted across our locations, including most PPO plans.',
  },
  {
    name: 'Cigna Healthcare',
    aliases: ['cigna'],
    status: 'accepted',
    note: 'Commonly accepted across our locations, including most PPO plans.',
  },
  {
    name: 'Aetna',
    aliases: ['aetna', 'cvs health'],
    status: 'accepted',
    note: 'Commonly accepted across our locations, including most PPO plans.',
  },
  {
    name: 'Meritain Health',
    aliases: ['meritan', 'meritain'],
    status: 'accepted',
    note: 'Commonly accepted across our locations.',
  },
  {
    name: 'MultiPlan',
    aliases: ['multiplan', 'phcs'],
    status: 'accepted',
    note: 'Commonly accepted as a network partner across our locations.',
  },
  {
    name: 'Bright Health',
    aliases: ['bright health group', 'bright'],
    status: 'accepted',
    note: 'Commonly accepted across our locations.',
  },
  {
    name: 'Workers’ Compensation',
    aliases: ['workers comp', 'workmans comp', 'work injury', 'workers compensation'],
    status: 'accepted',
    note: 'We treat work-related injuries and coordinate directly with adjusters and case managers.',
  },
  {
    name: 'Auto / Personal Injury (PIP)',
    aliases: ['pip', 'auto insurance', 'car accident', 'letter of protection', 'lop'],
    status: 'accepted',
    note: 'We treat auto-accident injuries and can work with your attorney where a letter of protection applies.',
  },
  {
    name: 'Medicare',
    aliases: ['medicare advantage', 'part b'],
    status: 'partial',
    note: 'We do not participate in Medicare for spine surgery. Other orthopedic services may be available — please call so we can check before you book.',
  },
  {
    name: 'Medicaid',
    aliases: ['medi-caid'],
    status: 'partial',
    note: 'We do not participate in Medicaid for spine surgery. Other orthopedic services may be available — please call so we can check before you book.',
  },
  {
    name: 'Medicare or Medicaid HMO',
    aliases: ['medicare hmo', 'medicaid hmo', 'hmo'],
    status: 'not-accepted',
    note: 'We do not participate in Medicare or Medicaid HMO plans. Your plan administrator can point you to an in-network orthopedic provider.',
  },
];

export const STATUS_COPY: Record<PlanStatus, { label: string; detail: string }> = {
  accepted: {
    label: 'Commonly accepted',
    detail:
      'Your specific plan and benefits still need to be verified before your visit — coverage, network tier and authorisation vary by plan.',
  },
  partial: {
    label: 'Partially accepted',
    detail:
      'Some services are available and some are not. Please call before booking so we can check your specific situation.',
  },
  'not-accepted': {
    label: 'Not accepted',
    detail:
      'We are not able to bill this plan. Your plan administrator can help you find an in-network orthopedic provider.',
  },
};

/** Case-insensitive match across plan names and their common aliases. */
export function findPlans(query: string): InsurancePlan[] {
  const q = query.trim().toLowerCase();
  if (!q) return INSURANCE_PLANS;
  return INSURANCE_PLANS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      (p.aliases ?? []).some((a) => a.includes(q) || q.includes(a))
  );
}
