'use client'

import { useState, useEffect } from 'react'
import { X, Phone, MapPin } from 'lucide-react'
import { CONSENT_UPDATED_EVENT, hasFunctionalConsent } from '@/lib/consent'

type InjuryType = 'car-accident' | 'slip-and-fall' | 'work-injury' | 'personal-injury'
type StateCode = 'FL' | 'NJ' | 'NY' | 'PA'

interface Props {
  injuryType: InjuryType
}

const stateBounds = {
  FL: { latMin: 24.4, latMax: 31.1, lngMin: -87.7, lngMax: -79.9 },
  NJ: { latMin: 38.9, latMax: 41.4, lngMin: -75.6, lngMax: -73.9 },
  NY: { latMin: 40.5, latMax: 45.0, lngMin: -79.8, lngMax: -71.8 },
  PA: { latMin: 39.7, latMax: 42.3, lngMin: -80.5, lngMax: -74.7 },
}

function getStateFromCoords(lat: number, lng: number): StateCode | null {
  for (const [state, bounds] of Object.entries(stateBounds)) {
    if (lat >= bounds.latMin && lat <= bounds.latMax && lng >= bounds.lngMin && lng <= bounds.lngMax) {
      return state as StateCode
    }
  }
  return null
}

const urgencyContent: Record<InjuryType, Record<StateCode, { headline: string; body: string }>> = {
  'car-accident': {
    FL: {
      headline: 'Florida PIP Deadline: 14 Days After Your Accident',
      body: 'Florida law requires you to seek medical care within 14 days of a car accident to access your $10,000 PIP benefit. Our FL clinics see accident patients same-week — don\'t miss your window.',
    },
    NJ: {
      headline: 'New Jersey No-Fault Coverage — Act Promptly',
      body: 'NJ no-fault auto insurance covers orthopedic care after a crash. Delays in documentation can affect your claim. Our Bridgewater, Paramus & Edison clinics have same-week availability.',
    },
    NY: {
      headline: 'NY No-Fault: File Within 30 Days of Your Accident',
      body: 'New York\'s $50,000 no-fault benefit requires prompt medical documentation. See an orthopedic specialist within days of your crash. Our NYC Midtown clinic offers same-week evaluations.',
    },
    PA: {
      headline: 'Pennsylvania Tort Claim — Document Your Injuries Now',
      body: 'PA operates under limited/full tort rules. Strong medical documentation from the start protects your claim. Our Philadelphia and Allentown clinics accept most auto insurance plans.',
    },
  },
  'slip-and-fall': {
    FL: {
      headline: 'Florida Slip & Fall: 2-Year Statute of Limitations',
      body: 'FL\'s premises liability window is 2 years from the date of injury. Early orthopedic evaluation creates a contemporaneous medical record — critical for your claim. Same-week appointments available.',
    },
    NJ: {
      headline: 'New Jersey Slip & Fall: Act Within 2 Years',
      body: 'NJ slip-and-fall claims require prompt medical documentation. Our NJ clinics in Paramus, Edison, and Cherry Hill see fall injury patients same-week.',
    },
    NY: {
      headline: 'New York Slip & Fall: 3-Year Window (1 Year for Government Property)',
      body: 'NY premises liability gives you 3 years, but government property claims require notice within 90 days. Early evaluation protects your rights. Our NYC clinic offers urgent appointments.',
    },
    PA: {
      headline: 'Pennsylvania Slip & Fall: 2-Year Filing Deadline',
      body: 'PA premises liability claims must be filed within 2 years. Documenting your fractures, sprains, or spine injuries early strengthens your case. See our Philadelphia or Allentown specialists.',
    },
  },
  'work-injury': {
    FL: {
      headline: 'Florida Workers\' Comp: Report Your Injury Within 30 Days',
      body: 'FL workers\' comp requires injury reporting within 30 days. Your employer\'s authorized treating physician (ATP) directs your care — our FL clinics are designated ATPs for many carriers.',
    },
    NJ: {
      headline: 'New Jersey Work Injury: You May Choose Your Own Doctor',
      body: 'NJ workers\' comp generally allows you to select your treating physician. Our Bridgewater, Edison, and Paramus orthopedic specialists accept workers\' comp cases and coordinate with insurers.',
    },
    NY: {
      headline: 'New York Workers\' Comp: Authorized Providers Only',
      body: 'NY WCB requires treatment from authorized providers. Mountain Spine & Orthopedics — NYC is an authorized workers\' comp provider. Same-week evaluations available.',
    },
    PA: {
      headline: 'Pennsylvania Workers\' Comp: Use the Panel List',
      body: 'PA workers\' comp requires treatment from your employer\'s panel physicians for the first 90 days. Our Philadelphia and Allentown clinics are listed on many employer panels. Call to verify.',
    },
  },
  'personal-injury': {
    FL: {
      headline: 'Florida Personal Injury: Medical Liens Available',
      body: 'No health insurance? Florida allows medical liens — we treat you now and get paid when your case settles. Our FL clinics work with personal injury attorneys statewide.',
    },
    NJ: {
      headline: 'New Jersey Personal Injury: Lien-Based Care Available',
      body: 'NJ patients with pending PI claims can receive orthopedic care on a lien basis. Our NJ clinics in Paramus, Edison, and Cherry Hill coordinate directly with your attorney.',
    },
    NY: {
      headline: 'New York Personal Injury: No-Fault + Lien Options',
      body: 'NY offers no-fault coverage plus lien-based care for personal injury patients. Our NYC Midtown clinic works with your attorney to ensure seamless medical documentation.',
    },
    PA: {
      headline: 'Pennsylvania Personal Injury: Lien-Based Orthopedic Care',
      body: 'PA personal injury patients can access orthopedic care on a medical lien — no upfront cost. Our Philadelphia clinics work with PI attorneys throughout the tri-state area.',
    },
  },
}

export default function InjuryUrgencyBanner({ injuryType }: Props) {
  const [detectedState, setDetectedState] = useState<StateCode | null>(null)
  const [dismissed, setDismissed] = useState(false)
  const [geoBlocked, setGeoBlocked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [functionalAllowed, setFunctionalAllowed] = useState(false)

  useEffect(() => {
    setFunctionalAllowed(hasFunctionalConsent())

    const handleConsentUpdated = () => setFunctionalAllowed(hasFunctionalConsent())
    window.addEventListener(CONSENT_UPDATED_EVENT, handleConsentUpdated)
    return () => window.removeEventListener(CONSENT_UPDATED_EVENT, handleConsentUpdated)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    if (sessionStorage.getItem('mso-urgency-dismissed') === '1') {
      setDismissed(true)
      setIsLoading(false)
      return
    }

    const cached = sessionStorage.getItem('mso-state') as StateCode | null
    if (cached && stateBounds[cached]) {
      setDetectedState(cached)
      setIsLoading(false)
      return
    }

    if (!functionalAllowed) {
      setGeoBlocked(true)
      setIsLoading(false)
      return
    }

    if (!navigator.geolocation) {
      setGeoBlocked(true)
      setIsLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const state = getStateFromCoords(pos.coords.latitude, pos.coords.longitude)
        if (state) {
          sessionStorage.setItem('mso-state', state)
          setDetectedState(state)
        } else {
          setGeoBlocked(true)
        }
        setIsLoading(false)
      },
      () => {
        setGeoBlocked(true)
        setIsLoading(false)
      },
      { timeout: 5000 }
    )
  }, [functionalAllowed])

  function handleStateSelect(state: StateCode) {
    sessionStorage.setItem('mso-state', state)
    setDetectedState(state)
    setGeoBlocked(false)
  }

  function handleDismiss() {
    sessionStorage.setItem('mso-urgency-dismissed', '1')
    setDismissed(true)
  }

  function scrollToClinicFinder() {
    const el = document.getElementById('nearest-clinic')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  if (dismissed || isLoading) return null

  const isFL = detectedState === 'FL'
  const bannerBg = isFL ? 'bg-amber-50 border-amber-500' : 'bg-blue-50 border-[#0A50EC]'
  const badgeBg = isFL ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-[#0A50EC]'
  const ctaBg = isFL ? 'bg-amber-500 hover:bg-amber-600' : 'bg-[#0A50EC] hover:bg-[#0A40CC]'

  if (geoBlocked && !detectedState) {
    return (
      <div className={`w-full border-l-4 border-[#0A50EC] bg-blue-50 px-4 py-4 sm:px-6`}>
        <div className="max-w-5xl mx-auto">
          <p className="text-sm font-semibold text-gray-800 mb-3">
            Select your state to see time-sensitive coverage information:
          </p>
          <div className="flex flex-wrap gap-2">
            {(['FL', 'NJ', 'NY', 'PA'] as StateCode[]).map((s) => (
              <button
                key={s}
                onClick={() => handleStateSelect(s)}
                className="px-5 py-2 rounded-full border border-[#0A50EC] text-[#0A50EC] text-sm font-medium hover:bg-[#0A50EC] hover:text-white transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!detectedState) return null

  const content = urgencyContent[injuryType][detectedState]

  return (
    <div className={`w-full border-l-4 ${bannerBg} px-4 py-4 sm:px-6 relative`} role="alert">
      <button
        onClick={handleDismiss}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        aria-label="Dismiss banner"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1">
            <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-1 ${badgeBg}`}>
              {detectedState} — Time Sensitive
            </span>
            <p className="text-sm font-bold text-gray-900">{content.headline}</p>
            <p className="text-sm text-gray-700 mt-0.5">{content.body}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
            <a
              href="tel:+15612239959"
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-white ${ctaBg} transition-colors`}
            >
              <Phone className="w-4 h-4" />
              Call Now: (561) 223-9959
            </a>
            <button
              onClick={scrollToClinicFinder}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border border-current text-[#0A50EC] hover:bg-[#0A50EC] hover:text-white transition-colors"
            >
              <MapPin className="w-4 h-4" />
              Find Nearest Clinic
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
