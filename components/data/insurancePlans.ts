/**
 * Insurance participation.
 *
 * The practice accepts **PPO plans**. That is the organising fact of this page,
 * not a footnote: it decides the answer for most patients before the carrier
 * name matters. An Aetna PPO is accepted; an Aetna HMO is not.
 *
 * Wording is deliberately conservative. "PPO accepted" is a statement about the
 * plan type and carrier, never about a specific patient's benefits — deductible,
 * network tier and authorisation vary plan to plan, so nothing here promises
 * coverage or eligibility. Exclusions are stated plainly rather than buried,
 * because a patient finding out at the front desk is a far worse outcome than
 * finding out here.
 */

export type PlanStatus = 'accepted' | 'partial' | 'not-accepted';

export interface InsurancePlan {
  name: string;
  aliases?: string[];
  status: PlanStatus;
  note: string;
  /** Distinguishes true PPO carriers from other payer types we also work with. */
  isPpoCarrier?: boolean;
}

/** The single rule that decides most answers on this page. */
export const PPO_HEADLINE = 'We accept PPO plans';
export const PPO_SUBLINE =
  'Mountain Spine & Orthopedics is a PPO practice. If your plan is a PPO with one of the carriers below, you can usually see a specialist without a referral. HMO plans are not accepted.';

export const INSURANCE_PLANS: InsurancePlan[] = [
  {
    name: 'Blue Cross Blue Shield PPO',
    aliases: ['bcbs', 'blue cross', 'blue shield', 'florida blue', 'horizon'],
    status: 'accepted',
    note: 'PPO plans accepted across our locations. No referral needed to see a specialist.',
    isPpoCarrier: true,
  },
  {
    name: 'UnitedHealthcare PPO',
    aliases: ['united healthcare', 'united', 'uhc', 'optum'],
    status: 'accepted',
    note: 'PPO plans accepted across our locations. No referral needed to see a specialist.',
    isPpoCarrier: true,
  },
  {
    name: 'Cigna PPO',
    aliases: ['cigna'],
    status: 'accepted',
    note: 'PPO plans accepted across our locations. No referral needed to see a specialist.',
    isPpoCarrier: true,
  },
  {
    name: 'Aetna PPO',
    aliases: ['aetna', 'cvs health'],
    status: 'accepted',
    note: 'PPO plans accepted across our locations. No referral needed to see a specialist.',
    isPpoCarrier: true,
  },
  {
    name: 'Meritain Health PPO',
    aliases: ['meritan', 'meritain'],
    status: 'accepted',
    note: 'PPO plans accepted across our locations.',
    isPpoCarrier: true,
  },
  {
    name: 'MultiPlan / PHCS PPO',
    aliases: ['multiplan', 'phcs'],
    status: 'accepted',
    note: 'Accepted as a PPO network partner across our locations.',
    isPpoCarrier: true,
  },
  {
    name: 'Bright Health PPO',
    aliases: ['bright health group', 'bright'],
    status: 'accepted',
    note: 'PPO plans accepted across our locations.',
    isPpoCarrier: true,
  },
  {
    name: 'Workers’ Compensation',
    aliases: ['workers comp', 'workmans comp', 'work injury', 'workers compensation'],
    status: 'accepted',
    note: 'Handled separately from PPO benefits. We treat work-related injuries and coordinate directly with adjusters and case managers.',
  },
  {
    name: 'Auto / Personal Injury (PIP)',
    aliases: ['pip', 'auto insurance', 'car accident', 'letter of protection', 'lop'],
    status: 'accepted',
    note: 'Handled separately from PPO benefits. We treat auto-accident injuries and can work with your attorney where a letter of protection applies.',
  },
  {
    name: 'HMO plans (any carrier)',
    aliases: ['hmo', 'health maintenance', 'aetna hmo', 'cigna hmo', 'bcbs hmo', 'united hmo'],
    status: 'not-accepted',
    note: 'We are a PPO practice and do not accept HMO plans — including HMO products from carriers whose PPO plans we do accept. If you are unsure which you have, your member card usually states it.',
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
    aliases: ['medicare hmo', 'medicaid hmo'],
    status: 'not-accepted',
    note: 'We do not participate in Medicare or Medicaid HMO plans. Your plan administrator can point you to an in-network orthopedic provider.',
  },
];

export const STATUS_COPY: Record<PlanStatus, { label: string; detail: string }> = {
  accepted: {
    label: 'Accepted',
    detail:
      'Your specific plan and benefits still need to be verified before your visit — deductible, network tier and authorisation vary by plan.',
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
