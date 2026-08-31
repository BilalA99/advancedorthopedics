'use client';
import React from 'react'
import Image from 'next/image'
import Logo from '../public/newlogo4.png'
import Link from 'next/link';
import { STATE_METADATA, VALID_STATE_SLUGS, getClinicsByState } from '@/lib/locationRedirects';
import { CONTACT_INFO, GENERAL_EMAIL } from '@/lib/contact-routing';
import { OPEN_COOKIE_PREFERENCES_EVENT } from '@/lib/consent';
const socials = [
    {
        icon: () => (<svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M3.49629 5.29662C3.49629 2.35881 6.01766 0.0419922 9.04554 0.0419922L11.8486 0.0419922C12.0649 0.0419922 12.279 0.051865 12.4726 0.0918611C12.6713 0.132893 12.8902 0.213903 13.0746 0.387333C13.4378 0.728772 13.4584 1.2321 13.4584 1.59292V3.44477C13.4584 3.80559 13.4378 4.30892 13.0746 4.65036C12.8902 4.82379 12.6713 4.9048 12.4726 4.94583C12.279 4.98582 12.0649 4.9957 11.8486 4.9957L9.04554 4.9957C8.80991 4.9957 8.68569 5.16619 8.68569 5.29662V6.98644L10.6944 6.98644C10.9716 6.98644 11.2364 7.00014 11.4658 7.05124C11.6949 7.10227 11.9655 7.20737 12.1614 7.45161C12.3625 7.70227 12.4009 7.99347 12.3892 8.23393C12.3779 8.46814 12.3161 8.7209 12.2394 8.97346L11.8173 10.3624C11.7305 10.6481 11.6006 11.0051 11.2755 11.2357C10.9598 11.4596 10.5797 11.4772 10.2724 11.4772H8.68569V16.4077C8.68569 16.7686 8.66509 17.2719 8.30192 17.6133C8.11745 17.7867 7.89855 17.8678 7.69988 17.9088C7.50623 17.9488 7.29217 17.9587 7.07584 17.9587H5.10614C4.88981 17.9587 4.67575 17.9488 4.4821 17.9088C4.28343 17.8678 4.06453 17.7867 3.88006 17.6133C3.51689 17.2719 3.49629 16.7686 3.49629 16.4077L3.49629 11.4772H2.1516C1.93527 11.4772 1.7212 11.4673 1.52755 11.4273C1.32889 11.3863 1.10998 11.3053 0.925513 11.1318C0.562346 10.7904 0.541748 10.2871 0.541748 9.92625L0.541748 8.53736C0.541748 8.17654 0.562346 7.67322 0.925513 7.33178C1.10998 7.15835 1.32889 7.07734 1.52755 7.03631C1.7212 6.99631 1.93527 6.98644 2.1516 6.98644L3.49629 6.98644L3.49629 5.29662ZM9.04554 1.29199C6.63424 1.29199 4.74629 3.12069 4.74629 5.29662L4.74629 7.61144C4.74629 7.95661 4.46647 8.23644 4.12129 8.23644H2.1516C1.98334 8.23644 1.87582 8.24428 1.80652 8.25566C1.79808 8.31299 1.79175 8.40146 1.79175 8.53736L1.79175 9.92625C1.79175 10.0622 1.79808 10.1506 1.80652 10.208C1.87582 10.2193 1.98334 10.2272 2.1516 10.2272H4.12129C4.46647 10.2272 4.74629 10.507 4.74629 10.8522L4.74629 16.4077C4.74629 16.5436 4.75263 16.6321 4.76108 16.6894C4.83038 16.7008 4.93789 16.7087 5.10614 16.7087H7.07584C7.24409 16.7087 7.35161 16.7008 7.42091 16.6894C7.42936 16.6321 7.43569 16.5436 7.43569 16.4077L7.43569 10.8522C7.43569 10.507 7.71551 10.2272 8.06069 10.2272H10.2724C10.4136 10.2272 10.4949 10.2202 10.5435 10.2112C10.5617 10.1748 10.5872 10.1111 10.6213 9.99889L11.0434 8.61001C11.0912 8.45254 11.1179 8.33973 11.1309 8.2598C11.0357 8.24555 10.8963 8.23644 10.6944 8.23644H8.06069C7.71551 8.23644 7.43569 7.95661 7.43569 7.61144L7.43569 5.29662C7.43569 4.4043 8.19332 3.7457 9.04554 3.7457L11.8486 3.7457C12.0168 3.7457 12.1243 3.73786 12.1936 3.72648C12.2021 3.66914 12.2084 3.58067 12.2084 3.44477V1.59292C12.2084 1.45702 12.2021 1.36855 12.1936 1.31121C12.1243 1.29983 12.0168 1.29199 11.8486 1.29199L9.04554 1.29199Z" fill="#0A50EC" />
        </svg>),
        link: 'https://www.facebook.com/p/Mountain-Spine-Orthopedics-61576930958681/?_rdr',
        label: 'Mountain Spine & Orthopedics on Facebook'
    },
    {
        icon: () => (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.04781 0.458416C10.8734 0.458405 12.3073 0.458397 13.4268 0.608912C14.574 0.763149 15.4842 1.08568 16.1994 1.80084C16.9146 2.51601 17.2371 3.42622 17.3913 4.57343C17.5419 5.69294 17.5418 7.12683 17.5418 8.9524V8.95242V8.95244V9.04772V9.04774V9.04776C17.5418 10.8733 17.5419 12.3072 17.3913 13.4267C17.2371 14.5739 16.9146 15.4842 16.1994 16.1993C15.4842 16.9145 14.574 17.237 13.4268 17.3913C12.3073 17.5418 10.8734 17.5418 9.04784 17.5417H9.0478H8.95252H8.95248C7.12691 17.5418 5.69302 17.5418 4.57352 17.3913C3.4263 17.237 2.51609 16.9145 1.80092 16.1993C1.08576 15.4842 0.76323 14.5739 0.608991 13.4267C0.458476 12.3072 0.458485 10.8733 0.458496 9.04773L0.458496 8.95244C0.458485 7.12685 0.458476 5.69295 0.608991 4.57343C0.76323 3.42622 1.08576 2.51601 1.80092 1.80084C2.51609 1.08568 3.4263 0.763149 4.57352 0.608912C5.69303 0.458397 7.12693 0.458405 8.95252 0.458416H9.04781ZM4.74008 1.84776C3.73147 1.98337 3.12901 2.24052 2.68481 2.68473C2.2406 3.12893 1.98345 3.73139 1.84784 4.74C1.70982 5.76658 1.7085 7.11644 1.7085 9.00008C1.7085 10.8837 1.70982 12.2336 1.84784 13.2602C1.98345 14.2688 2.2406 14.8712 2.68481 15.3154C3.12901 15.7596 3.73147 16.0168 4.74008 16.1524C5.76666 16.2904 7.11652 16.2917 9.00016 16.2917C10.8838 16.2917 12.2337 16.2904 13.2603 16.1524C14.2689 16.0168 14.8713 15.7596 15.3155 15.3154C15.7597 14.8712 16.0169 14.2688 16.1525 13.2602C16.2905 12.2336 16.2918 10.8837 16.2918 9.00008C16.2918 7.11644 16.2905 5.76658 16.1525 4.74C16.0169 3.73139 15.7597 3.12893 15.3155 2.68473C14.8713 2.24052 14.2689 1.98337 13.2603 1.84776C12.2337 1.70974 10.8838 1.70842 9.00016 1.70842C7.11652 1.70842 5.76666 1.70974 4.74008 1.84776ZM9.00016 5.87508C7.27427 5.87508 5.87516 7.27419 5.87516 9.00008C5.87516 10.726 7.27427 12.1251 9.00016 12.1251C10.7261 12.1251 12.1252 10.726 12.1252 9.00008C12.1252 7.27419 10.7261 5.87508 9.00016 5.87508ZM4.62516 9.00008C4.62516 6.58384 6.58392 4.62508 9.00016 4.62508C11.4164 4.62508 13.3752 6.58384 13.3752 9.00008C13.3752 11.4163 11.4164 13.3751 9.00016 13.3751C6.58392 13.3751 4.62516 11.4163 4.62516 9.00008ZM13.59 5.25008C14.0502 5.25008 14.4233 4.87699 14.4233 4.41675C14.4233 3.95651 14.0502 3.58342 13.59 3.58342H13.5825C13.1223 3.58342 12.7492 3.95651 12.7492 4.41675C12.7492 4.87699 13.1223 5.25008 13.5825 5.25008H13.59Z" fill="#0A50EC" />
            </svg>
        ),
        link: 'https://www.instagram.com/mountainspineortho',
        label: 'Mountain Spine & Orthopedics on Instagram'
    },

]

export default function Footer() {
    return (
        <footer className='bg-black w-full flex-col flex py-[60px]'>{/* SEO-FIX: Changed footer outer element from <main> to <footer> for valid HTML landmark */}
            {/* Top Section: Logo & Description + Contact */}
            <section className='w-full max-w-[1440px] mx-auto px-[40px] flex flex-col lg:flex-row lg:justify-between gap-8 lg:gap-16'>
                {/* Left: Logo and description */}
                <div className='flex flex-col lg:max-w-[400px]'>
                    <div className='flex flex-row space-x-[8px] items-center'>
                        <Image src={Logo} alt="Mountain Spine & Orthopedics Logo" className="max-h-[80px] lg:h-[80px] w-auto" />
                        <div className='w-[1px] h-[35px] bg-gradient-to-b from-transparent via-gray-50 to-transparent' />
                        <div className="flex flex-col text-white"
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                letterSpacing: "0.02em",
                            }}
                        >
                            <span className="text-xl font-[600]">MOUNTAIN</span>
                            <span className="font-[600] text-xs">SPINE & ORTHOPEDIC</span>
                        </div>
                    </div>

                    <p
                        style={{
                            fontFamily: 'var(--font-inter)',
                            fontWeight: 400,
                            color: 'white'
                        }}
                        className='text-white mt-[20px] text-sm leading-relaxed'>
                        Trusted <strong>orthopedic surgeon specialists</strong> serving Florida, New Jersey, New York, Pennsylvania & Georgia with <strong>minimally invasive spine surgery</strong>, <strong>joint replacement surgery</strong>, and advanced <strong>back pain treatment</strong>. Book your <strong>orthopedic surgery consultation</strong> today.
                    </p>

                    {/* Contact Info — general + one bucket per state, in VALID_STATE_SLUGS order */}
                    <div className='mt-6 flex flex-col gap-[10px]'>
                        {/* General inquiries */}
                        <div className='flex flex-col gap-[2px]'>
                            <span
                                style={{ fontFamily: 'var(--font-inter)', fontWeight: 600, color: '#8A8F98' }}
                                className='text-xs uppercase tracking-wider'
                            >
                                General
                            </span>
                            <a
                                href={`mailto:${GENERAL_EMAIL}`}
                                style={{ fontFamily: 'var(--font-inter)', fontWeight: 400, color: '#DCDEE1' }}
                                className='text-sm hover:text-white transition-colors'
                            >
                                {GENERAL_EMAIL}
                            </a>
                        </div>

                        {([CONTACT_INFO.fl, CONTACT_INFO.nj, CONTACT_INFO.ny, CONTACT_INFO.pa, CONTACT_INFO.ga] as const).map((c) => (
                            <div key={c.key} className='flex flex-col gap-[2px]'>
                                <span
                                    style={{ fontFamily: 'var(--font-inter)', fontWeight: 600, color: '#8A8F98' }}
                                    className='text-xs uppercase tracking-wider'
                                >
                                    {c.label}
                                </span>
                                <div className='flex flex-row flex-wrap items-center gap-x-[8px] gap-y-[2px]'>
                                    <a
                                        href={c.phoneHref}
                                        style={{ fontFamily: 'var(--font-inter)', fontWeight: 400, color: '#DCDEE1' }}
                                        className='text-sm hover:text-white transition-colors'
                                    >
                                        {c.phoneDisplay}
                                    </a>
                                    <span style={{ color: '#555A63' }} className='text-sm select-none'>|</span>
                                    <a
                                        href={`mailto:${c.email}`}
                                        style={{ fontFamily: 'var(--font-inter)', fontWeight: 400, color: '#DCDEE1' }}
                                        className='text-sm hover:text-white transition-colors'
                                    >
                                        {c.email}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Social Icons */}
                    <div className='mt-6 flex flex-row space-x-[16px]'>
                        {
                            socials.map((item, index) => (
                                <Link href={item.link} target='_blank' aria-label={item.label}
                                    className='bg-[#22262A] rounded-full px-[13px] py-[12px] items-center justify-center hover:cursor-pointer hover:scale-[1.2] transition-transform' key={index}>
                                    <item.icon aria-hidden="true" />
                                </Link>
                            ))
                        }
                    </div>
                </div>

                {/* Right: Links Grid - Overview + one column per state (VALID_STATE_SLUGS) */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-8 flex-1">
                    {/* Column 1: Overview */}
                    <div
                        style={{
                            fontFamily: 'var(--font-public-sans)',
                            fontWeight: 400,
                            color: 'white'
                        }}
                    >
                        <p className="uppercase tracking-wider mb-4 text-sm font-[600] text-white">Overview</p>
                        <ul className="space-y-[10px] flex flex-col text-sm text-[#DCDEE1]">
                            <Link href={'/find-care/book-an-appointment'} className="hover:text-white transition-colors">Contact Us</Link>
                            <Link href={'/find-care/find-a-doctor'} className="hover:text-white transition-colors">Doctors</Link>
                            <Link href={'/locations'} className="hover:text-white transition-colors">All Locations</Link>
                            <Link href={'/blogs'} className="hover:text-white transition-colors">Blog</Link>
                            <Link href={'/about/faqs'} className="hover:text-white transition-colors">FAQs</Link>
                            <Link href={'/patient-forms'} className="hover:text-white transition-colors">Patient Forms</Link>
                            <Link href={'/condition-check'} className="hover:text-white transition-colors">Condition Check</Link>
                            <Link href={'/find-care/free-mri-review'} className="hover:text-white transition-colors">MRI Review</Link>
                        </ul>
                    </div>
                    
                    {/* Locations by State - 4 columns with equal widths */}
                    {VALID_STATE_SLUGS.map((stateSlug) => {
                        const stateInfo = STATE_METADATA[stateSlug];
                        const stateClinics = getClinicsByState(stateSlug);
                        if (stateClinics.length === 0) return null;
                        
                        return (
                            <div
                                key={stateSlug}
                                style={{
                                    fontFamily: 'var(--font-public-sans)',
                                    fontWeight: 400,
                                    color: 'white'
                                }}
                            >
                                <Link href={`/locations/${stateSlug}`} className="uppercase tracking-wider mb-4 text-sm font-[600] block hover:text-[#5E96F0] transition-colors text-white">
                                    {stateInfo?.abbr} Locations
                                </Link>
                                <ul className="space-y-[10px] flex flex-col text-sm text-[#DCDEE1]">
                                    {stateClinics.map((clinic, index) => {
                                        // Get display name - extract neighborhood from name if it's in parentheses
                                        // e.g., "Mountain Spine & Orthopedics Philadelphia (Walnut)" -> "Philadelphia (Walnut)"
                                        let displayName = clinic.region.replace(`, ${stateInfo?.abbr}`, '');
                                        
                                        // For locations with neighborhood specifiers in name, append them
                                        const neighborhoodMatch = clinic.name.match(/\(([^)]+)\)$/);
                                        if (neighborhoodMatch && displayName === 'Philadelphia') {
                                            displayName = `Philadelphia (${neighborhoodMatch[1]})`;
                                        }
                                        
                                        return (
                                            <Link 
                                                href={`/locations/${clinic.stateSlug}/${clinic.locationSlug}`} 
                                                key={index}
                                                className="hover:text-white transition-colors"
                                            >
                                                {displayName}
                                            </Link>
                                        );
                                    })}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </section>

            <div className='w-full max-w-[1440px] mx-auto h-[1px] mt-[20px] items-center px-[40px]'>
                <div
                    style={{
                        background: 'rgba(255, 255, 255, 0.10)'
                    }}
                    className=' w-full h-[1px]'
                />
            </div>

            <div className='w-full max-w-[1440px] mx-auto mt-[40px] justify-between md:items-center px-[40px] flex md:flex-row flex-col md:space-y-0 space-y-[10px] '>
                <p
                    style={{
                        fontFamily: 'var(--font-inter)',
                        fontWeight: 400,
                        color: '#DCDEE1'
                    }}
                >Copyright © 2026 Mountain Spine & Orthopedics.</p>

                <div className='flex md:flex-row flex-col md:space-x-[40px] md:space-y-0 space-y-[10px]'>
                    <Link href={'/privacy-policy'}
                        style={{
                            fontFamily: 'var(--font-public-sans)',
                            fontWeight: 400,
                            color: '#5E96F0'
                        }}
                    >
                        Privacy Policy
                    </Link>
                    <button
                        type="button"
                        onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_PREFERENCES_EVENT))}
                        style={{
                            fontFamily: 'var(--font-public-sans)',
                            fontWeight: 400,
                            color: '#5E96F0'
                        }}
                        className="text-left"
                    >
                        Cookie Preferences
                    </button>
                    <Link href={'/insurance-policy'}
                        style={{
                            fontFamily: 'var(--font-public-sans)',
                            fontWeight: 400,
                            color: '#5E96F0'
                        }}
                    >
                        Insurance
                    </Link>
                    <Link href={'/sitemap'}
                        style={{
                            fontFamily: 'var(--font-public-sans)',
                            fontWeight: 400,
                            color: '#5E96F0'
                        }}
                    >
                        Sitemap
                    </Link>
                </div>
            </div>
        </footer>
    )
}
