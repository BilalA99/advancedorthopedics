'use client'

import { useState, useEffect } from 'react'

type InjuryType = 'car-accident' | 'slip-and-fall' | 'work-injury' | 'personal-injury'
type StateCode = 'FL' | 'NJ' | 'NY' | 'PA'

interface Props {
  injuryType: InjuryType
}

interface HotspotRecord {
  region: string;
  corridor: string;
  context: string;
  nearestClinicLabel: string;
  nearestClinicSlug: string;
  nearestClinicState: string;
  tags: InjuryType[];
}

const hotspots: Record<StateCode, HotspotRecord[]> = {
  FL: [
    {
      region: 'South Florida',
      corridor: 'I-95 Corridor — Miami to Fort Lauderdale',
      context: 'One of the most congested highway corridors in Florida, this stretch of I-95 between Miami and Fort Lauderdale accounts for thousands of motor vehicle accidents annually. High-speed rear-end collisions and lane-change crashes are common, frequently causing whiplash, herniated discs, and lumbar fractures.',
      nearestClinicLabel: 'Hollywood, FL',
      nearestClinicSlug: 'hollywood-orthopedics',
      nearestClinicState: 'florida',
      tags: ['car-accident', 'personal-injury', 'slip-and-fall'],
    },
    {
      region: 'South Florida',
      corridor: 'US-1 Biscayne Blvd — Downtown Miami to Aventura',
      context: 'Heavy urban traffic, frequent pedestrian crossings, and commercial truck deliveries make US-1 in Miami a high-risk corridor for pedestrian injuries, bicycle accidents, and rear-end collisions causing cervical and lumbar spine injuries.',
      nearestClinicLabel: 'South Miami, FL',
      nearestClinicSlug: 'south-miami-orthopedics',
      nearestClinicState: 'florida',
      tags: ['car-accident', 'personal-injury', 'slip-and-fall'],
    },
    {
      region: 'Palm Beach County',
      corridor: 'I-95 Palm Beach Gardens to Boca Raton',
      context: 'The Palm Beach section of I-95 sees significant accident volume from commuter and tourist traffic. Construction zones and on/off ramp merges contribute to rear-end and sideswipe collisions causing neck and back injuries.',
      nearestClinicLabel: 'Boca Raton, FL',
      nearestClinicSlug: 'boca-raton-orthopedics',
      nearestClinicState: 'florida',
      tags: ['car-accident', 'personal-injury', 'slip-and-fall'],
    },
    {
      region: 'Palm Beach County',
      corridor: 'Palm Beach Lakes Blvd & Okeechobee Blvd Intersections',
      context: 'High-volume intersections in West Palm Beach near major commercial districts generate significant T-bone and angle crash injury patterns including shoulder injuries, knee trauma, and spinal fractures.',
      nearestClinicLabel: 'Palm Beach Gardens, FL',
      nearestClinicSlug: 'palm-beach-gardens-orthopedics',
      nearestClinicState: 'florida',
      tags: ['car-accident', 'personal-injury', 'slip-and-fall'],
    },
    {
      region: 'Orlando Metro',
      corridor: 'I-4 Corridor — Orlando to Davenport',
      context: 'Interstate 4 is consistently rated among Florida\'s most dangerous highways. High traffic volume from theme park visitors and commercial trucks creates frequent rear-end pile-ups and rollover accidents causing cervical fractures, disc injuries, and knee trauma.',
      nearestClinicLabel: 'Davenport, FL',
      nearestClinicSlug: 'davenport-orthopedics',
      nearestClinicState: 'florida',
      tags: ['car-accident', 'personal-injury', 'slip-and-fall'],
    },
    {
      region: 'Orlando Metro',
      corridor: 'SR-408 East-West Expressway — Orlando Central',
      context: 'This toll expressway cutting through central Orlando sees significant commuter accident frequency. High-speed merges and distracted driving cause whiplash, thoracic injuries, and wrist fractures from bracing on impact.',
      nearestClinicLabel: 'Orlando, FL',
      nearestClinicSlug: 'orlando-orthopedics',
      nearestClinicState: 'florida',
      tags: ['car-accident', 'personal-injury', 'slip-and-fall'],
    },
    {
      region: 'Northeast Florida',
      corridor: 'I-95 & I-295 Jacksonville Interchange',
      context: 'The Jacksonville interchange of I-95 and I-295 is among the busiest in northeast Florida. Complex multi-lane merges and high truck traffic create significant risk for high-energy crash mechanisms causing spinal and extremity injuries.',
      nearestClinicLabel: 'Jacksonville, FL',
      nearestClinicSlug: 'jacksonville-orthopedics',
      nearestClinicState: 'florida',
      tags: ['car-accident', 'personal-injury', 'slip-and-fall'],
    },
    {
      region: 'Treasure Coast',
      corridor: 'US-1 Fort Pierce Corridor',
      context: 'The US-1 corridor through Fort Pierce and Port St. Lucie is a high-volume arterial road with frequent intersection collisions and pedestrian accidents. Agricultural and construction vehicle traffic increases injury severity.',
      nearestClinicLabel: 'Fort Pierce, FL',
      nearestClinicSlug: 'fort-pierce-orthopedics',
      nearestClinicState: 'florida',
      tags: ['car-accident', 'personal-injury', 'slip-and-fall'],
    },
    // Work injury hotspots FL
    {
      region: 'South Florida',
      corridor: 'Port Everglades & PortMiami Industrial Zone',
      context: 'South Florida\'s major cargo ports generate significant work injury volume from dock workers, freight handlers, and logistics personnel. Common injuries include lumbar strain from lifting, shoulder tears, and lower-extremity fractures from falls on dock surfaces.',
      nearestClinicLabel: 'Hollywood, FL',
      nearestClinicSlug: 'hollywood-orthopedics',
      nearestClinicState: 'florida',
      tags: ['work-injury'],
    },
    {
      region: 'Orlando Metro',
      corridor: 'Theme Park & Hospitality Corridor — International Drive',
      context: 'Orlando\'s hospitality and entertainment industry employs tens of thousands. Work injuries among hospitality workers, ride operators, and maintenance staff are common — including slip-and-fall, repetitive stress injuries, and back strain from physical labor.',
      nearestClinicLabel: 'Davenport, FL',
      nearestClinicSlug: 'davenport-orthopedics',
      nearestClinicState: 'florida',
      tags: ['work-injury'],
    },
  ],
  NJ: [
    {
      region: 'North Jersey',
      corridor: 'NJ Turnpike — Exits 13–16 Newark to Fort Lee',
      context: 'The northern section of the New Jersey Turnpike near Newark and the George Washington Bridge is one of the most heavily trafficked corridors in the country. High-speed merge conflicts and truck traffic cause significant whiplash, lumbar disc, and shoulder injuries.',
      nearestClinicLabel: 'West Orange, NJ',
      nearestClinicSlug: 'west-orange-surgery-center',
      nearestClinicState: 'new-jersey',
      tags: ['car-accident', 'personal-injury', 'slip-and-fall'],
    },
    {
      region: 'Bergen County',
      corridor: 'Route 17 Paramus Retail Corridor',
      context: 'Route 17 in Paramus is one of New Jersey\'s highest-volume commercial arteries. Frequent turning conflicts at shopping center entrances create high-frequency side-impact and rear-end collision patterns causing cervical and lumbar injuries.',
      nearestClinicLabel: 'Paramus, NJ',
      nearestClinicSlug: 'paramus-orthopedics',
      nearestClinicState: 'new-jersey',
      tags: ['car-accident', 'personal-injury', 'slip-and-fall'],
    },
    {
      region: 'Central NJ',
      corridor: 'Route 1 Corridor — Edison to New Brunswick',
      context: 'US Route 1 through Edison and New Brunswick sees high pedestrian and commercial traffic. Dense development creates frequent intersection conflicts and pedestrian knockdown incidents causing traumatic orthopedic injuries.',
      nearestClinicLabel: 'Edison, NJ',
      nearestClinicSlug: 'edison-orthopedics',
      nearestClinicState: 'new-jersey',
      tags: ['car-accident', 'personal-injury', 'slip-and-fall'],
    },
    {
      region: 'Monmouth County',
      corridor: 'Route 9 Freehold to Manalapan',
      context: 'Route 9 through Monmouth County mixes commercial, residential, and through traffic at elevated speeds. T-bone and rear-end collisions at unsignalized intersections cause significant spine and joint injury patterns.',
      nearestClinicLabel: 'Freehold, NJ',
      nearestClinicSlug: 'freehold-orthopedics',
      nearestClinicState: 'new-jersey',
      tags: ['car-accident', 'personal-injury', 'slip-and-fall'],
    },
    {
      region: 'Somerset County',
      corridor: 'I-78 & US-22 Interchange — Bridgewater',
      context: 'The complex interchange of I-78 and US-22 in Bridgewater generates significant crash volume from commuter and commercial traffic. High-speed merges cause rear-end and sideswipe collisions with significant cervical and lumbar outcomes.',
      nearestClinicLabel: 'Bridgewater, NJ',
      nearestClinicSlug: 'bridgewater-orthopedics',
      nearestClinicState: 'new-jersey',
      tags: ['car-accident', 'personal-injury', 'slip-and-fall'],
    },
    {
      region: 'South Jersey',
      corridor: 'I-295 Cherry Hill to Camden',
      context: 'I-295 through South Jersey near Cherry Hill and Camden experiences heavy freight traffic and commuter volume. Accident severity is elevated by truck involvement and high approach speeds.',
      nearestClinicLabel: 'Cherry Hill, NJ',
      nearestClinicSlug: 'cherry-hill-orthopedics',
      nearestClinicState: 'new-jersey',
      tags: ['car-accident', 'personal-injury', 'slip-and-fall'],
    },
    // Work injury NJ
    {
      region: 'Port Newark-Elizabeth',
      corridor: 'Port Newark Container Terminal & Adjacent Warehouses',
      context: 'The Port Newark-Elizabeth Marine Terminal is the largest on the East Coast. Longshoremen, forklift operators, and warehouse workers face significant work injury risk from heavy lifting, crush injuries, and falls — a high-volume source of orthopedic workers\' comp claims.',
      nearestClinicLabel: 'West Orange, NJ',
      nearestClinicSlug: 'west-orange-surgery-center',
      nearestClinicState: 'new-jersey',
      tags: ['work-injury'],
    },
    {
      region: 'Central NJ',
      corridor: 'Middlesex County Distribution Center Corridor',
      context: 'The concentration of large distribution and fulfillment centers in Edison, Piscataway, and South Brunswick creates high workers\' comp claim volume for repetitive stress injuries, lumbar strain, and shoulder tears among warehouse and logistics employees.',
      nearestClinicLabel: 'Edison, NJ',
      nearestClinicSlug: 'edison-orthopedics',
      nearestClinicState: 'new-jersey',
      tags: ['work-injury'],
    },
  ],
  NY: [
    {
      region: 'Manhattan',
      corridor: 'Midtown Manhattan — 42nd St to 59th St Crosstown Corridors',
      context: 'Midtown Manhattan\'s dense intersection grid generates the highest pedestrian knockdown and bicycle accident rate in New York State. Patients injured by vehicles while walking or cycling may access NY no-fault benefits from the at-fault driver\'s insurer.',
      nearestClinicLabel: 'New York, NY (Midtown)',
      nearestClinicSlug: 'new-york-city-orthopedics',
      nearestClinicState: 'new-york',
      tags: ['car-accident', 'personal-injury', 'slip-and-fall'],
    },
    {
      region: 'Manhattan',
      corridor: 'FDR Drive — East Side Manhattan',
      context: 'The FDR Drive runs along Manhattan\'s east side with limited sight distance and high-speed through traffic. Merge crashes and tunnel-exit conflicts frequently result in cervical fractures, lumbar disc injuries, and traumatic shoulder tears.',
      nearestClinicLabel: 'New York, NY (Midtown)',
      nearestClinicSlug: 'new-york-city-orthopedics',
      nearestClinicState: 'new-york',
      tags: ['car-accident', 'personal-injury', 'slip-and-fall'],
    },
    {
      region: 'Manhattan',
      corridor: 'NYC Subway Platforms & Stairways',
      context: 'New York City subway stations are a significant source of slip-and-fall injuries. Wet platforms, uneven surfaces, and missing handrails lead to FOOSH injuries, hip fractures in older adults, and cervical spine injuries. MTA liability claims require a Notice of Claim within 90 days.',
      nearestClinicLabel: 'New York, NY (Midtown)',
      nearestClinicSlug: 'new-york-city-orthopedics',
      nearestClinicState: 'new-york',
      tags: ['slip-and-fall', 'personal-injury'],
    },
    {
      region: 'Manhattan',
      corridor: 'NYC Construction Corridor — Hudson Yards & Lower Manhattan',
      context: 'New York\'s Scaffold Law (Labor Law §240/241) provides broad protection for construction workers injured at height. The Hudson Yards development and Downtown Manhattan projects generate significant work injury claims involving falls, scaffold collapses, and materials handling injuries.',
      nearestClinicLabel: 'New York, NY (Midtown)',
      nearestClinicSlug: 'new-york-city-orthopedics',
      nearestClinicState: 'new-york',
      tags: ['work-injury', 'personal-injury'],
    },
    {
      region: 'Manhattan',
      corridor: 'Manhattan Sidewalks — Ice & Wet Surface Slip-and-Fall Zone',
      context: 'New York City property owners are liable for sidewalk maintenance. Ice, uneven pavement, and unmarked hazards cause significant hip fracture, wrist fracture (FOOSH), and ankle injury rates each winter. Government property falls require a 90-day Notice of Claim.',
      nearestClinicLabel: 'New York, NY (Midtown)',
      nearestClinicSlug: 'new-york-city-orthopedics',
      nearestClinicState: 'new-york',
      tags: ['slip-and-fall', 'personal-injury'],
    },
  ],
  PA: [
    {
      region: 'Philadelphia Metro',
      corridor: 'I-76 Schuylkill Expressway — Philadelphia',
      context: 'The Schuylkill Expressway (I-76) is among Pennsylvania\'s most accident-prone highways. Tight lanes, limited shoulders, and congestion create frequent rear-end collisions causing whiplash, lumbar disc herniations, and PTSD-associated injury patterns.',
      nearestClinicLabel: 'Philadelphia, PA (Center City)',
      nearestClinicSlug: 'philadelphia-walnut-orthopedics',
      nearestClinicState: 'pennsylvania',
      tags: ['car-accident', 'personal-injury', 'slip-and-fall'],
    },
    {
      region: 'Philadelphia Metro',
      corridor: 'I-95 Philadelphia — Airport to Center City',
      context: 'I-95 through Philadelphia from the airport to Center City sees dense freight, SEPTA, and commuter traffic. Lane-change and rear-end accidents along this corridor generate significant cervical and lumbar injury claims.',
      nearestClinicLabel: 'Philadelphia, PA (Center City)',
      nearestClinicSlug: 'philadelphia-walnut-orthopedics',
      nearestClinicState: 'pennsylvania',
      tags: ['car-accident', 'personal-injury', 'slip-and-fall'],
    },
    {
      region: 'North Philadelphia',
      corridor: 'Kensington & Port Richmond Corridors',
      context: 'North Philadelphia\'s Kensington Avenue and Port Richmond industrial district generate both pedestrian injury and work injury claims. Uneven sidewalks, poor lighting, and industrial vehicle traffic create elevated injury risk.',
      nearestClinicLabel: 'Philadelphia, PA (Port Richmond)',
      nearestClinicSlug: 'philadelphia-tioga-orthopedics',
      nearestClinicState: 'pennsylvania',
      tags: ['car-accident', 'personal-injury', 'slip-and-fall', 'work-injury'],
    },
    {
      region: 'Northwest Philadelphia',
      corridor: 'Germantown Avenue Corridor',
      context: 'Germantown Avenue\'s mix of commercial and residential traffic, combined with aging sidewalk infrastructure, creates significant pedestrian and slip-and-fall injury risk. Our Germantown clinic serves this community directly.',
      nearestClinicLabel: 'Philadelphia, PA (Germantown)',
      nearestClinicSlug: 'philadelphia-germantown-orthopedics',
      nearestClinicState: 'pennsylvania',
      tags: ['car-accident', 'personal-injury', 'slip-and-fall'],
    },
    {
      region: 'Lehigh Valley',
      corridor: 'I-78 Allentown Corridor — Route 22 Interchange',
      context: 'The I-78/Route 22 interchange in Allentown is a major freight and commuter nexus for the Lehigh Valley. Heavy truck traffic and high-speed merges generate rear-end and sideswipe collisions with significant orthopedic injury patterns.',
      nearestClinicLabel: 'Allentown, PA',
      nearestClinicSlug: 'allentown-orthopedics',
      nearestClinicState: 'pennsylvania',
      tags: ['car-accident', 'personal-injury', 'slip-and-fall'],
    },
    // Work injury PA
    {
      region: 'Philadelphia Metro',
      corridor: 'Philadelphia Navy Yard & Industrial South Philly',
      context: 'The Philadelphia Navy Yard and the industrial south Philadelphia waterfront employ a large concentration of manufacturing, logistics, and construction workers. Workers\' comp claims in this zone commonly involve lumbar strain, shoulder injuries, and falls from height.',
      nearestClinicLabel: 'Philadelphia, PA (Center City)',
      nearestClinicSlug: 'philadelphia-walnut-orthopedics',
      nearestClinicState: 'pennsylvania',
      tags: ['work-injury'],
    },
    {
      region: 'Lehigh Valley',
      corridor: 'Bethlehem & Allentown Distribution Corridor',
      context: 'The Lehigh Valley is one of Pennsylvania\'s largest logistics and distribution hubs. Large fulfillment center operations generate high repetitive stress injury and acute lifting injury volume. Our Allentown clinic is positioned to serve Lehigh Valley workers\' comp cases.',
      nearestClinicLabel: 'Allentown, PA',
      nearestClinicSlug: 'allentown-orthopedics',
      nearestClinicState: 'pennsylvania',
      tags: ['work-injury'],
    },
  ],
}

const injuryLabels: Record<InjuryType, string> = {
  'car-accident': 'Car Accident',
  'slip-and-fall': 'Slip & Fall',
  'work-injury': 'Work Injury',
  'personal-injury': 'Personal Injury',
}

const stateDisclaimers: Record<StateCode, string> = {
  FL: 'Accident data referenced from Florida Department of Transportation (FDOT) Signal Four Analytics and Florida Highway Safety and Motor Vehicles crash statistics.',
  NJ: 'Corridor risk data referenced from New Jersey Department of Transportation (NJDOT) crash records and NJ State Police accident reports.',
  NY: 'Injury data referenced from New York State Department of Transportation (NYSDOT) crash repository and NYC DOT pedestrian injury statistics.',
  PA: 'Corridor data referenced from Pennsylvania Department of Transportation (PennDOT) crash information system and SEPTA safety reports.',
}

const stateTabs: StateCode[] = ['FL', 'NJ', 'NY', 'PA']

function filterHotspots(records: HotspotRecord[], injuryType: InjuryType): HotspotRecord[] {
  return records.filter((r) => r.tags.includes(injuryType))
}

export default function InjuryHotspots({ injuryType }: Props) {
  const [activeState, setActiveState] = useState<StateCode>('FL')

  useEffect(() => {
    const stored = sessionStorage.getItem('mso-state') as StateCode | null
    if (stored && stateTabs.includes(stored)) {
      setActiveState(stored)
    }
  }, [])

  const stateHotspots = filterHotspots(hotspots[activeState], injuryType)

  return (
    <section className="w-full bg-white py-12 sm:py-16 border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2
            style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
            className="text-3xl md:text-4xl text-gray-900 mb-3"
          >
            Orthopedic Clinics Near{' '}
            <span className="text-[#0A50EC]">{activeState}&apos;s</span> Highest{' '}
            {injuryLabels[injuryType]} Areas
          </h2>
          <p className="text-gray-600 text-lg">
            Our clinics are strategically located near the highest-risk corridors in each state.
          </p>
        </div>

        {/* State tabs */}
        <div className="flex gap-2 justify-center mb-8">
          {stateTabs.map((state) => (
            <button
              key={state}
              onClick={() => setActiveState(state)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                activeState === state
                  ? 'bg-[#0A50EC] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {state}
            </button>
          ))}
        </div>

        {stateHotspots.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {stateHotspots.map((record, index) => (
              <article
                key={index}
                className="bg-gray-50 rounded-xl p-5 border-l-4 border-[#0A50EC] flex flex-col gap-2"
              >
                <p className="text-xs font-semibold text-[#0A50EC] uppercase tracking-wide">
                  {record.region}
                </p>
                <h3 className="font-bold text-gray-900 text-base leading-snug">
                  {record.corridor}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{record.context}</p>
                <a
                  href={`/locations/${record.nearestClinicState}/${record.nearestClinicSlug}`}
                  className="mt-auto text-sm font-semibold text-[#0A50EC] hover:underline"
                >
                  Nearest Clinic: {record.nearestClinicLabel} →
                </a>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No specific hotspot data for this injury type in {activeState}. Our clinics serve all injury types across this state.</p>
          </div>
        )}

        <p className="mt-6 text-xs text-gray-400 leading-relaxed">{stateDisclaimers[activeState]}</p>
      </div>
    </section>
  )
}
