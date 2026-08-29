'use client'

import { useState, useCallback } from 'react'
import { MapPin, Phone, Navigation, Clock, Search } from 'lucide-react'
import { injuryLocations, type InjuryLocation } from '@/lib/injuryLocations'

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3958.8 // miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.asin(Math.sqrt(a))
}

// ZIP prefix to approximate coordinates
const zipPrefixCoords: Record<string, { lat: number; lng: number }> = {
  // Florida
  '330': { lat: 25.8, lng: -80.2 }, // Miami
  '331': { lat: 25.8, lng: -80.2 },
  '332': { lat: 25.8, lng: -80.2 },
  '333': { lat: 26.1, lng: -80.1 }, // Fort Lauderdale / Hollywood
  '334': { lat: 26.7, lng: -80.1 }, // Palm Beach
  '335': { lat: 27.9, lng: -82.5 }, // Tampa
  '336': { lat: 27.9, lng: -82.5 },
  '337': { lat: 27.3, lng: -82.4 }, // Sarasota
  '338': { lat: 27.5, lng: -80.4 }, // Fort Pierce
  '339': { lat: 25.8, lng: -80.3 }, // Homestead
  '340': { lat: 28.5, lng: -81.4 }, // Orlando
  '341': { lat: 26.4, lng: -80.1 }, // Boca Raton
  '342': { lat: 28.5, lng: -81.4 }, // Orlando Metro
  '346': { lat: 28.2, lng: -81.6 }, // Davenport
  '347': { lat: 28.7, lng: -81.4 }, // Altamonte Springs
  '322': { lat: 30.3, lng: -81.5 }, // Jacksonville
  // New Jersey
  '070': { lat: 40.8, lng: -74.1 }, // Newark / West Orange
  '071': { lat: 40.9, lng: -74.0 }, // Paramus
  '072': { lat: 40.8, lng: -74.1 },
  '073': { lat: 40.9, lng: -74.2 },
  '074': { lat: 41.0, lng: -74.1 },
  '075': { lat: 40.5, lng: -74.4 }, // Edison
  '076': { lat: 40.7, lng: -74.4 },
  '077': { lat: 40.4, lng: -74.3 }, // Freehold
  '078': { lat: 40.6, lng: -74.7 }, // Bridgewater
  '079': { lat: 40.6, lng: -74.7 },
  '080': { lat: 39.9, lng: -75.0 }, // Cherry Hill
  '081': { lat: 39.8, lng: -74.9 },
  '082': { lat: 39.9, lng: -74.8 },
  '083': { lat: 40.4, lng: -74.7 }, // Princeton
  '084': { lat: 40.8, lng: -75.0 }, // Voorhees area
  '085': { lat: 40.8, lng: -74.9 },
  '086': { lat: 40.2, lng: -74.3 },
  '087': { lat: 40.5, lng: -74.3 },
  // New York
  '100': { lat: 40.75, lng: -74.0 }, // Manhattan
  '101': { lat: 40.75, lng: -74.0 },
  '102': { lat: 40.75, lng: -74.0 },
  '103': { lat: 40.6, lng: -74.1 }, // Staten Island
  '104': { lat: 40.9, lng: -73.8 }, // Bronx
  '105': { lat: 41.0, lng: -73.9 }, // Westchester
  '110': { lat: 40.7, lng: -73.8 }, // Queens
  '111': { lat: 40.7, lng: -73.9 }, // Brooklyn
  '112': { lat: 40.6, lng: -73.9 },
  '113': { lat: 40.7, lng: -73.8 },
  '114': { lat: 40.7, lng: -73.8 },
  '116': { lat: 40.7, lng: -73.6 }, // Long Island
  // Pennsylvania
  '180': { lat: 40.6, lng: -75.5 }, // Allentown
  '181': { lat: 40.6, lng: -75.5 },
  '189': { lat: 40.0, lng: -75.1 }, // Philadelphia
  '190': { lat: 40.0, lng: -75.1 },
  '191': { lat: 40.0, lng: -75.1 },
  '192': { lat: 39.9, lng: -75.2 },
  '193': { lat: 39.9, lng: -75.4 },
}

function zipToCoords(zip: string): { lat: number; lng: number } | null {
  const prefix = zip.substring(0, 3)
  return zipPrefixCoords[prefix] || null
}

interface ClinicWithDistance extends InjuryLocation {
  distance: number
}

export default function InjuryClinicFinder() {
  const [zipInput, setZipInput] = useState('')
  const [results, setResults] = useState<ClinicWithDistance[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'done'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function sortAndSetNearest(lat: number, lng: number) {
    const withDist = injuryLocations.map((loc) => ({
      ...loc,
      distance: haversineDistance(lat, lng, loc.lat, loc.lng),
    }))
    withDist.sort((a, b) => a.distance - b.distance)
    setResults(withDist.slice(0, 3))
    setStatus('done')
  }

  const handleUseLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setErrorMsg('Geolocation is not supported by your browser.')
      setStatus('error')
      return
    }
    setStatus('loading')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const state = getStateFromCoords(pos.coords.latitude, pos.coords.longitude)
        if (state) sessionStorage.setItem('mso-state', state)
        sortAndSetNearest(pos.coords.latitude, pos.coords.longitude)
      },
      () => {
        setErrorMsg('Location access was denied. Please enter your ZIP code instead.')
        setStatus('error')
      },
      { timeout: 6000 }
    )
  }, [])

  function handleZipSearch() {
    const zip = zipInput.trim()
    if (!/^\d{5}$/.test(zip)) {
      setErrorMsg('Please enter a valid 5-digit ZIP code.')
      setStatus('error')
      return
    }
    const coords = zipToCoords(zip)
    if (!coords) {
      setErrorMsg('ZIP code not recognized. Please try a nearby ZIP or use your location.')
      setStatus('error')
      return
    }
    setStatus('loading')
    setTimeout(() => sortAndSetNearest(coords.lat, coords.lng), 200)
  }

  function getDirectionsUrl(loc: InjuryLocation) {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(loc.address)}`
  }

  return (
    <section id="nearest-clinic" className="w-full bg-gray-50 py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2
            style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
            className="text-3xl md:text-4xl text-gray-900 mb-3"
          >
            Find the Nearest Clinic
          </h2>
          <p className="text-gray-600 text-lg">
            Open 8 AM – 8 PM, 7 Days · 22+ Locations Across FL, NJ, NY & PA
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleUseLocation}
              disabled={status === 'loading'}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-[#0A50EC] text-white rounded-xl font-semibold hover:bg-[#0A40CC] transition-colors disabled:opacity-60"
            >
              <Navigation className="w-4 h-4" />
              Use My Location
            </button>
            <div className="flex flex-1 gap-2">
              <input
                type="text"
                value={zipInput}
                onChange={(e) => setZipInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleZipSearch()}
                aria-label="ZIP code"
                name="zip"
                autoComplete="postal-code"
                inputMode="numeric"
                placeholder="Enter ZIP code (e.g. 33021)"
                maxLength={5}
                className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A50EC]"
              />
              <button
                onClick={handleZipSearch}
                disabled={status === 'loading'}
                className="flex items-center gap-1.5 px-4 py-3 border border-gray-300 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors disabled:opacity-60"
              >
                <Search className="w-4 h-4" />
                Search
              </button>
            </div>
          </div>
          {status === 'error' && <p className="mt-3 text-sm text-red-600">{errorMsg}</p>}
          {status === 'loading' && <p className="mt-3 text-sm text-gray-500 animate-pulse">Searching nearby clinics…</p>}
        </div>

        {status === 'done' && results.length > 0 && (
          <div className="grid sm:grid-cols-3 gap-4">
            {results.map((loc, i) => (
              <div
                key={loc.slug}
                className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col gap-3"
              >
                {i === 0 && (
                  <span className="self-start text-xs font-bold px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                    Nearest
                  </span>
                )}
                <div>
                  <p className="font-bold text-gray-900">
                    {loc.city}
                    {loc.neighborhood ? ` — ${loc.neighborhood}` : ''}
                  </p>
                  <p className="text-sm text-gray-600">{loc.address}</p>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="font-semibold text-gray-700">{loc.distance.toFixed(1)} mi away</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-green-700">
                  <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>Open Today: 8 AM – 8 PM, 7 Days</span>
                </div>
                <div className="flex flex-col gap-2 mt-auto pt-2">
                  <a
                    href="tel:+15612239959"
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#0A50EC] text-white rounded-lg text-sm font-semibold hover:bg-[#0A40CC] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call Now: (561) 223-9959
                  </a>
                  <a
                    href={getDirectionsUrl(loc)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    Get Directions
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

// helper used in handleUseLocation
function getStateFromCoords(lat: number, lng: number): 'FL' | 'NJ' | 'NY' | 'PA' | null {
  const bounds = {
    FL: { latMin: 24.4, latMax: 31.1, lngMin: -87.7, lngMax: -79.9 },
    NJ: { latMin: 38.9, latMax: 41.4, lngMin: -75.6, lngMax: -73.9 },
    NY: { latMin: 40.5, latMax: 45.0, lngMin: -79.8, lngMax: -71.8 },
    PA: { latMin: 39.7, latMax: 42.3, lngMin: -80.5, lngMax: -74.7 },
  }
  for (const [state, b] of Object.entries(bounds)) {
    if (lat >= b.latMin && lat <= b.latMax && lng >= b.lngMin && lng <= b.lngMax) {
      return state as 'FL' | 'NJ' | 'NY' | 'PA'
    }
  }
  return null
}
