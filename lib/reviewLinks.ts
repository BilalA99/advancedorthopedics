// Maps locationSlug (from clinics.tsx) to Google review short URL
// Only clinics with active Google Business Profiles are included
// Clinics not in this map have no GBP yet — handled gracefully in all UI
export const REVIEW_LINKS: Record<string, string> = {
  'hollywood-orthopedics': 'https://g.page/r/CYqA11vJ24y9EBM/review',
  'south-miami-orthopedics': 'https://g.page/r/CUt57-NcR2RGEBM/review',
  'palm-beach-gardens-orthopedics': 'https://g.page/r/CUMyxOiry4yEEBM/review',
  'boca-raton-orthopedics': 'https://g.page/r/CewP7F8j5W7WEBM/review',
  'orlando-orthopedics': 'https://g.page/r/CWyo3YuSDwCTEBM/review',
  'palm-springs-orthopedics': 'https://g.page/r/CbyTfcg1z948EBM/review',
  'altamonte-springs-orthopedics': 'https://g.page/r/CZdNCoUsaU5vEBM/review',
  'jacksonville-orthopedics': 'https://g.page/r/CQuHCfzUfzR6EBM/review',
  'fort-pierce-orthopedics': 'https://g.page/r/CTyihrFXV5-HEBM/review',
  'new-york-city-orthopedics': 'https://g.page/r/Ca2RXgYKHipQEBM/review',
  'bridgewater-orthopedics': 'https://g.page/r/CSfEt1IXNr7DEBM/review',
  'freehold-orthopedics': 'https://g.page/r/CVU-VYAxAx1eEBM/review',
  'princeton-orthopedics': 'https://g.page/r/CbFY9Q7Ab57iEBM/review',
  'cherry-hill-orthopedics': 'https://g.page/r/CWXHP7Jv-y7JEBM/review',
  'west-orange-surgery-center': 'https://g.page/r/CT0PMkcwIzYxEBM/review',
  'edison-orthopedics': 'https://g.page/r/CS5_Ra9InWIzEBM/review',
  'paramus-orthopedics': 'https://g.page/r/CbQ0wAxe4uA8EBM/review',
  'voorhees-orthopedics': 'https://g.page/r/CZzrShXR0RTvEBM/review',
};

// Returns the Google review URL for a given locationSlug, or null if not found
export function getReviewLink(locationSlug: string): string | null {
  return REVIEW_LINKS[locationSlug] ?? null;
}

// Returns an array of all locations that have review links, sorted alphabetically
// by region name, for use in dropdowns and the staff tool.
// Region labels are sourced directly from clinics.tsx to ensure consistency.
export function getReviewLocations(): { locationSlug: string; region: string; address: string; reviewUrl: string }[] {
  return [
    { locationSlug: 'hollywood-orthopedics',          region: 'Hollywood, FL',                          address: '3500 Tyler St, Hollywood, FL 33021',                        reviewUrl: REVIEW_LINKS['hollywood-orthopedics'] },
    { locationSlug: 'south-miami-orthopedics',         region: 'South Miami, FL',                        address: '7000 SW 62nd Ave, Suite 330, Miami, FL 33143',              reviewUrl: REVIEW_LINKS['south-miami-orthopedics'] },
    { locationSlug: 'palm-beach-gardens-orthopedics',  region: 'Palm Beach Gardens, FL',                 address: '3355 Burns Rd, Palm Beach Gardens, FL 33410',               reviewUrl: REVIEW_LINKS['palm-beach-gardens-orthopedics'] },
    { locationSlug: 'boca-raton-orthopedics',          region: 'Boca Raton, FL',                         address: '1905 Clint Moore Rd, Boca Raton, FL 33496',                 reviewUrl: REVIEW_LINKS['boca-raton-orthopedics'] },
    { locationSlug: 'orlando-orthopedics',             region: 'Orlando, FL',                            address: '6150 Metrowest Blvd, Orlando, FL 32835',                    reviewUrl: REVIEW_LINKS['orlando-orthopedics'] },
    { locationSlug: 'palm-springs-orthopedics',        region: 'Altamonte Springs - Casselberry, FL',    address: '652 Palm Springs Dr, Altamonte Springs, FL 32701',          reviewUrl: REVIEW_LINKS['palm-springs-orthopedics'] },
    { locationSlug: 'altamonte-springs-orthopedics',   region: 'Central Pkwy Altamonte Springs, FL',     address: '499 E Central Pkwy, Suite 130, Altamonte Springs, FL 32701', reviewUrl: REVIEW_LINKS['altamonte-springs-orthopedics'] },
    { locationSlug: 'jacksonville-orthopedics',        region: 'Jacksonville, FL',                       address: '1205 Monument Rd, Suite 202, Jacksonville, FL 32225',       reviewUrl: REVIEW_LINKS['jacksonville-orthopedics'] },
    { locationSlug: 'fort-pierce-orthopedics',         region: 'Fort Pierce, FL',                        address: '2215 Nebraska Ave Suite 1C, Fort Pierce, FL 34950',         reviewUrl: REVIEW_LINKS['fort-pierce-orthopedics'] },
    { locationSlug: 'new-york-city-orthopedics',       region: 'New York, NY',                           address: '535 5th Ave, New York, NY 10017',                           reviewUrl: REVIEW_LINKS['new-york-city-orthopedics'] },
    { locationSlug: 'bridgewater-orthopedics',         region: 'Bridgewater, NJ',                        address: '1200 US-22, Bridgewater, NJ 08807',                         reviewUrl: REVIEW_LINKS['bridgewater-orthopedics'] },
    { locationSlug: 'freehold-orthopedics',            region: 'Freehold, NJ',                           address: '77 Schanck Rd, Freehold, NJ 07728',                         reviewUrl: REVIEW_LINKS['freehold-orthopedics'] },
    { locationSlug: 'princeton-orthopedics',           region: 'Princeton, NJ',                          address: '601 Ewing St, Princeton, NJ 08540',                         reviewUrl: REVIEW_LINKS['princeton-orthopedics'] },
    { locationSlug: 'cherry-hill-orthopedics',         region: 'Cherry Hill, NJ',                        address: '100 Springdale Rd, Cherry Hill, NJ 08003',                  reviewUrl: REVIEW_LINKS['cherry-hill-orthopedics'] },
    { locationSlug: 'west-orange-surgery-center',      region: 'West Orange, NJ',                        address: '375 Mount Pleasant Ave, West Orange, NJ 07052',             reviewUrl: REVIEW_LINKS['west-orange-surgery-center'] },
    { locationSlug: 'edison-orthopedics',              region: 'Edison, NJ',                             address: '25 Main St, Edison, NJ 08837',                              reviewUrl: REVIEW_LINKS['edison-orthopedics'] },
    { locationSlug: 'paramus-orthopedics',             region: 'Paramus, NJ',                            address: '140 NJ-17, Paramus, NJ 07652',                              reviewUrl: REVIEW_LINKS['paramus-orthopedics'] },
    { locationSlug: 'voorhees-orthopedics',            region: 'Voorhees, NJ',                           address: '701 White Horse Rd, Voorhees, NJ 08043',                    reviewUrl: REVIEW_LINKS['voorhees-orthopedics'] },
  ].sort((a, b) => a.region.localeCompare(b.region));
}
