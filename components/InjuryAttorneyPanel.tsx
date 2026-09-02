'use client'

import { Phone } from 'lucide-react'

interface Props {
  showAttorneyPanel?: boolean
}

export default function InjuryAttorneyPanel({ showAttorneyPanel = true }: Props) {
  return (
    <section className="w-full bg-[#0A2342] text-white py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className={`grid ${showAttorneyPanel ? 'md:grid-cols-2' : 'grid-cols-1 max-w-2xl mx-auto'} gap-8`}>

          {/* Patient Panel — always shown */}
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-3">
              Injured With No Insurance? We Still See You.
            </h2>
            <p className="text-gray-300 mb-5">
              Mountain Spine &amp; Orthopedics treats injured patients regardless of insurance status. We offer medical lien arrangements — you receive the orthopedic care you need today, and we are paid from your settlement.
            </p>
            <ul className="space-y-2.5 mb-6">
              {[
                'No upfront payment required for evaluation',
                'We coordinate directly with your personal injury attorney',
                'Available in FL, NJ, NY, PA & GA for qualifying cases',
                'Board-certified orthopedic surgeons and spine specialists',
                'Detailed medical records provided for your legal claim',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-200">
                  <span className="text-[#0A50EC] font-bold mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="tel:+15612239959"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#0A50EC] text-white rounded-full text-sm font-semibold hover:bg-[#0A40CC] transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call (561) 223-9959 — We Verify Before Your Visit
            </a>
          </div>

          {/* Attorney Panel — conditional */}
          {showAttorneyPanel && (
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-3">
                Referring Attorneys
              </h2>
              <p className="text-gray-300 mb-5">
                Mountain Spine &amp; Orthopedics partners with personal injury attorneys across FL, NJ, NY &amp; PA. We provide the medical documentation your case needs.
              </p>
              <ul className="space-y-2.5 mb-6">
                {[
                  'Same-week evaluations for your client — no backlog',
                  'Comprehensive orthopedic reports and narrative summaries',
                  'MRI, X-ray, and diagnostic coordination on-site',
                  'IME and expert witness services available',
                  'Lien-based billing accepted — no upfront cost to your client',
                  'HIPAA-secure records portal for your firm',
                  'Deposition preparation and courtroom testimony available',
                  'Direct line for attorney scheduling and records: (561) 223-9959',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-200">
                    <span className="text-[#0A50EC] font-bold mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="tel:+15612239959"
                className="inline-flex items-center gap-2 px-5 py-3 border border-white/30 text-white rounded-full text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Attorney Referral Line: (561) 223-9959
              </a>
            </div>
          )}
        </div>

        {/* Bottom trust bar */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-gray-400 font-medium tracking-wide uppercase">
            Board-Certified Orthopedic Surgeons &nbsp;·&nbsp; 22+ Locations &nbsp;·&nbsp; Open 8 AM – 8 PM, 7 Days &nbsp;·&nbsp; FL &nbsp;·&nbsp; NJ &nbsp;·&nbsp; NY &nbsp;·&nbsp; PA
          </p>
        </div>
      </div>
    </section>
  )
}
