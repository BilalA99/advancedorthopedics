'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShieldCheck, ShieldAlert, ShieldX, Phone, ArrowRight } from 'lucide-react';
import {
  INSURANCE_PLANS,
  STATUS_COPY,
  findPlans,
  type InsurancePlan,
  type PlanStatus,
} from '@/components/data/insurancePlans';
import { CONTACT_INFO } from '@/lib/contact-routing';

/**
 * Interactive insurance checker — the decision element of /insurance-policy.
 *
 * Insurance uncertainty is the biggest reason an orthopedic patient stalls
 * before booking, and this page previously answered it with a wall of carrier
 * logos plus two exclusions in small grey text at the very bottom. This turns
 * it into something a patient can act on: find your carrier, see where you
 * stand, take the next step — in one move.
 *
 * Deliberate constraints:
 * - It never says "you are covered". Status describes the carrier; the panel
 *   always restates that the individual plan must still be verified. Coverage,
 *   network tier and authorisation vary plan to plan, and a false reassurance
 *   here becomes a surprise bill later.
 * - The two participation exclusions get the same prominence as the positives.
 * - Motion is transform/opacity only and inherits the app's
 *   MotionConfig reducedMotion="user", so it is inert for users who asked for
 *   reduced motion. Nothing is conveyed by animation alone.
 * - The result is announced through role="status", and every control clears a
 *   44px target.
 */

const STATUS_STYLE: Record<
  PlanStatus,
  { ring: string; chip: string; icon: typeof ShieldCheck; iconWrap: string; bar: string }
> = {
  accepted: {
    ring: 'border-[#0A50EC]/25 bg-[#0A50EC]/[0.04]',
    chip: 'bg-[#0A50EC] text-white',
    icon: ShieldCheck,
    iconWrap: 'bg-[#0A50EC]/10 text-[#0A50EC]',
    bar: 'bg-[#0A50EC]',
  },
  partial: {
    ring: 'border-[#B45309]/25 bg-[#B45309]/[0.05]',
    chip: 'bg-[#B45309] text-white',
    icon: ShieldAlert,
    iconWrap: 'bg-[#B45309]/10 text-[#B45309]',
    bar: 'bg-[#B45309]',
  },
  'not-accepted': {
    ring: 'border-[#9F1239]/25 bg-[#9F1239]/[0.05]',
    chip: 'bg-[#9F1239] text-white',
    icon: ShieldX,
    iconWrap: 'bg-[#9F1239]/10 text-[#9F1239]',
    bar: 'bg-[#9F1239]',
  },
};

/**
 * The next step has to match the answer. Offering "Verify my benefits" against
 * a plan we cannot bill sends the patient down a dead end and reads as a
 * script that did not listen.
 */
const STATUS_CTA: Record<
  PlanStatus,
  { primary: { label: string; href: string } | null; callLead: string }
> = {
  accepted: {
    primary: { label: 'Verify my benefits', href: '/find-care/book-an-appointment' },
    callLead: 'or call',
  },
  partial: {
    primary: { label: 'Ask about my situation', href: '/find-care/book-an-appointment' },
    callLead: 'or call',
  },
  'not-accepted': {
    primary: null,
    callLead: 'Call about self-pay options:',
  },
};

export default function InsurancePlanChecker() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<InsurancePlan | null>(null);
  const fl = CONTACT_INFO.fl;

  const matches = useMemo(() => findPlans(query), [query]);
  const noMatch = query.trim().length > 0 && matches.length === 0;

  return (
    <div className="w-full">
      {/* Search */}
      <div className="relative max-w-[560px]">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9CA3AF]"
          aria-hidden="true"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelected(null);
          }}
          aria-label="Search for your insurance carrier"
          placeholder="Search your insurance — e.g. Aetna, BCBS, Medicare"
          className="min-h-[52px] w-full rounded-[62px] border border-[#DCDEE1] bg-[#FAFAFA] pl-12 pr-4 text-base text-[#111315] transition-colors placeholder:text-[#9CA3AF] focus:border-[#0A50EC] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A50EC]/20"
          style={{ fontFamily: 'var(--font-inter)' }}
        />
      </div>

      {/* Carrier pills */}
      <div role="listbox" aria-label="Insurance carriers" className="mt-5 flex flex-wrap gap-2 sm:gap-3">
        {matches.map((plan) => {
          const isSelected = selected?.name === plan.name;
          const s = STATUS_STYLE[plan.status];
          return (
            <button
              key={plan.name}
              type="button"
              role="option"
              aria-selected={isSelected}
              onClick={() => setSelected(isSelected ? null : plan)}
              style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
              className={`inline-flex min-h-[44px] items-center gap-2 rounded-[62px] px-5 text-sm transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A50EC] ${
                isSelected
                  ? `${s.chip} scale-[1.03] shadow-md`
                  : 'border border-[#E5E7EB] bg-white text-[#111315] hover:border-[#0A50EC] hover:bg-[#e8f0ff] hover:scale-[1.02]'
              }`}
            >
              <span
                aria-hidden="true"
                className={`h-2 w-2 shrink-0 rounded-full ${isSelected ? 'bg-white/80' : s.bar}`}
              />
              {plan.name}
            </button>
          );
        })}
      </div>

      {noMatch && (
        <p className="mt-5 text-sm text-[#424959]" style={{ fontFamily: 'var(--font-inter)' }}>
          We do not list that one, but we work with many more carriers than shown here — and we
          verify benefits for you before your visit.
        </p>
      )}

      {/* Result */}
      <div aria-live="polite" role="status" className="mt-6">
        <AnimatePresence mode="wait" initial={false}>
          {selected && (
            <motion.div
              key={selected.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className={`rounded-[24px] border p-5 sm:p-7 ${STATUS_STYLE[selected.status].ring}`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div
                  className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${STATUS_STYLE[selected.status].iconWrap}`}
                  aria-hidden="true"
                >
                  {(() => {
                    const Icon = STATUS_STYLE[selected.status].icon;
                    return <Icon className="h-5 w-5" />;
                  })()}
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 600 }}
                    className="text-lg text-[#111315] sm:text-xl"
                  >
                    {selected.name} — {STATUS_COPY[selected.status].label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[#424959] sm:text-base">
                    {selected.note}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[#424959]">
                    {STATUS_COPY[selected.status].detail}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
                    {STATUS_CTA[selected.status].primary && (
                      <Link
                        href={STATUS_CTA[selected.status].primary!.href}
                        className="inline-flex min-h-[44px] items-center gap-2 rounded-[62px] bg-[#0A50EC] px-5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#1B2A4A] hover:shadow-md active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A50EC] sm:text-base"
                      >
                        {STATUS_CTA[selected.status].primary!.label}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    )}
                    <a
                      href={fl.phoneHref}
                      className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-[#2358AC] underline underline-offset-4 transition-colors hover:text-[#0942c4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A50EC] sm:text-base"
                    >
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      {STATUS_CTA[selected.status].callLead} {fl.phoneDisplay}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!selected && (
          <p className="text-sm text-[#6B7280]" style={{ fontFamily: 'var(--font-inter)' }}>
            Select your carrier to see where you stand. We verify every patient&rsquo;s benefits
            before their visit — selecting here does not confirm coverage.
          </p>
        )}
      </div>

      {/* Static, crawlable summary — also the no-JS fallback */}
      <div className="sr-only">
        <h3>Insurance participation summary</h3>
        <ul>
          {INSURANCE_PLANS.map((p) => (
            <li key={p.name}>
              {p.name}: {STATUS_COPY[p.status].label}. {p.note}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
