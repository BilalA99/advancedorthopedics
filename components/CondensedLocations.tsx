'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, ChevronRight } from 'lucide-react'
import { clinicsForMap as clinics } from '@/components/data/clinicsForMap.generated'
import type { StateSlug } from '@/components/data/clinics'
import Link from 'next/link'

export default function CondensedLocations() {
    // Group clinics by state
    const groupedByState = clinics.reduce((acc, clinic) => {
        const state = clinic.stateSlug || 'florida'
        if (!acc[state]) {
            acc[state] = []
        }
        acc[state].push(clinic)
        return acc
    }, {} as Record<string, typeof clinics>)

    const stateNames: Record<StateSlug, string> = {
        'florida': 'Florida',
        'new-jersey': 'New Jersey',
        'new-york': 'New York',
        'pennsylvania': 'Pennsylvania',
        'georgia': 'Georgia'
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3 }
        }
    }

    return (
        <section className="w-full bg-gray-50/50 py-12 border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-[#252932] mb-3">Our Locations</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
                        Visit any of our state-of-the-art facilities across FL, NJ, NY, PA, and GA for expert orthopedic care.
                    </p>
                </div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {(Object.keys(stateNames) as StateSlug[]).map((stateSlug) => {
                        const stateClinics = groupedByState[stateSlug] || []
                        if (stateClinics.length === 0) return null

                        return (
                            <motion.div key={stateSlug} variants={itemVariants} className="flex flex-col">
                                <h3 className="text-lg font-bold text-[#0A50EC] mb-4 flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    {stateNames[stateSlug]}
                                </h3>
                                <ul className="space-y-2">
                                    {stateClinics
                                        .map(clinic => ({
                                            ...clinic,
                                            cityName: clinic.region ? clinic.region.split(',')[0].trim() : clinic.name.replace('Mountain Spine & Orthopedics ', '').split(',')[0].trim()
                                        }))
                                        .sort((a, b) => a.cityName.localeCompare(b.cityName))
                                        .map((clinic) => (
                                            <li key={clinic.id}>
                                                <Link 
                                                    href={`/locations/${clinic.stateSlug}/${clinic.locationSlug}`}
                                                    className="group flex items-center text-gray-700 hover:text-[#0A50EC] transition-colors py-1 text-sm"
                                                >
                                                    <ChevronRight className="w-3 h-3 mr-1 text-gray-300 group-hover:text-[#0A50EC] transition-colors" />
                                                    <span className="font-medium">{clinic.cityName}</span>
                                                </Link>
                                            </li>
                                        ))}
                                </ul>
                            </motion.div>
                        )
                    })}
                </motion.div>
                
                <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-500">
                        By state: FL <a href="tel:+15612239959" className="font-semibold text-gray-700 hover:text-[#0A50EC]">(561) 223-9959</a> · NJ <a href="tel:+19732596756" className="font-semibold text-gray-700 hover:text-[#0A50EC]">(973) 259-6756</a> · NY <a href="tel:+16463895606" className="font-semibold text-gray-700 hover:text-[#0A50EC]">(646) 389-5606</a> · PA <a href="tel:+12154369496" className="font-semibold text-gray-700 hover:text-[#0A50EC]">(215) 436-9496</a> · GA <a href="tel:+14049136886" className="font-semibold text-gray-700 hover:text-[#0A50EC]">(404) 913-6886</a>
                    </p>
                    <Link 
                        href="/locations"
                        className="text-[#0A50EC] font-semibold text-sm hover:underline flex items-center gap-1"
                    >
                        View All Locations on Map <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
