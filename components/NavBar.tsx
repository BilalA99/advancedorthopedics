'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Logo from "../public/bluemountainspinelogo2.png"
import { usePathname } from 'next/navigation';
import { resolveContactByPathname } from '@/lib/contact-routing';
import Link from 'next/link';
import { cn } from "@/lib/utils"
import { pushPhoneClickEvent } from '@/utils/enhancedConversions';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { clinicsForMap as clinics } from './data/clinicsForMap.generated';
import { GetLatestBlog } from "@/app/blogs/api/get-blogs";
import { SidebarNavItem } from './SidebarNavItem';
import { House, Heart, Calendar, User, Eye, Scan, Stethoscope, CheckCircle, Shield, LucideFileText, Target, Activity, Zap, Circle, AlertCircle, Minus, Triangle, Settings, Headphones, Building, Users, HelpCircle, FileText, MapPin, Bone, Footprints, Scissors, Droplet, Syringe, Info, List, ChevronRight, Car, CarFront, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion'
import PromoOverlayCard from './PromoOverlayCard';
import { useQuery } from '@tanstack/react-query';
import NavCompactBlogCard from './NavCompactBlogCard';

function NavLink({ href, title, screen, pathname, sublinks, short_desc, latestBlog }: {
  href: string;
  title: string,
  screen: string,
  pathname: string,
  sublinks: {
    title: string,
    href: string,
    short_desc: string,
    subLinks: {
      title: string,
      href: string,
      short_desc: string,
      icon: React.ComponentType<any>
    }[],
    icon: React.ComponentType<any>
  }[],
  short_desc: string,
  latestBlog?: any
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedSubLink, setSelectedSubLink] = React.useState<{
    title: string,
    href: string,
    short_desc: string,
    subLinks: {
      title: string,
      href: string,
      short_desc: string,
      icon: React.ComponentType<any>
    }[],
    icon: React.ComponentType<any>
  } | null>(NavBarLinks[2].subLinks[0]);

  // Check if current pathname matches the main screen or any of its sublinks
  const isActive = pathname === screen ||
    sublinks.some(link =>
      pathname === link.href ||
      link.subLinks.some(subLink => pathname === subLink.href)
    );

  return (
    <NavigationMenuItem className=' z-999 '>
      <NavigationMenuTrigger
        className={`${isActive
          ? 'text-[#0A50EC] border-white border-1 px-4 py-2 rounded-full shadow-sm'
          : 'text-black hover:text-[#0A50EC] bg-transparent border-0'
          } transition-all duration-300 font-semibold hover:bg-transparent`}

        style={{
          backdropFilter: isActive ? 'blur(50px)' : 'blur(0px)'
        }}
      >
        <Link href={href}>{title}</Link>
      </NavigationMenuTrigger>

      <NavigationMenuContent
        // grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]
        className='flex flex-row border gap-x-4 items-start self-start '
        style={{
          background: 'rgba(239, 245, 255, 0.50)',
          border: '1px solid white',
          borderRadius: '8px',
          backdropFilter: 'blur(30px)'
        }}
      >
        {
          title == 'FIND CARE' ? (
            <div className='w-200 flex flex-row justify-between gap-x-5'>
              <div className='grid grid-cols-2 gap-0 w-130'>
                <div className="col-span-2 px-4 py-3 mb-2">
                  <h3
                    className="text-lg font-semibold text-[#0A50EC] tracking-wide"
                    style={{
                      fontFamily: "var(--font-public-sans)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    Find the Care You Need
                  </h3>
                  <p
                    className="text-sm text-[#424959] mt-1"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontWeight: 400,
                    }}
                  >
                    Explore our specialties and discover the right treatment for you.
                  </p>
                </div>
                {
                  sublinks.map((link, linkIndex) => {
                    const IconComponent = link.icon;
                    return (
                      <div key={`${link.title}-${linkIndex}`} className='h-fit gap-0'>
                        {link.subLinks.length == 0 ? (
                          <NavigationMenuLink asChild className='flex flex-row items-center gap-x-4 '>
                            <Link href={link.href} className='w-full block px-4 py-2 flex-row items-center justify-between'>
                              <div className='flex flex-row items-center gap-x-4'>
                                <div className='p-2 rounded-2xl border aspect-square flex items-center justify-center'>
                                  <IconComponent className='w-8 h-8 text-[#252932]' />
                                </div>
                                <div className='flex flex-col gap-y-0'>
                                  <span
                                    style={{
                                      fontFamily: "var(--font-public-sans)",
                                      fontWeight: 400,
                                    }}
                                  >
                                    {link.title}
                                  </span>
                                  <span className='text-xs text-gray-500'>{link.short_desc}</span>
                                </div>
                              </div>
                              <ChevronRight className='w-4 h-4 text-[#252932]' />
                            </Link>
                          </NavigationMenuLink>
                        ) : (
                          <Link
                            href={link.href}
                            className="w-full text-left px-4 py-2 hover:bg-white/50 transition-colors duration-200 rounded-lg flex flex-row items-center gap-x-4"
                            onMouseEnter={() => setSelectedSubLink(link)}
                          >
                            <div className='p-2 rounded-2xl border aspect-square flex items-center justify-center'>
                              <IconComponent className='w-4 h-4 text-[#252932]' />
                            </div>
                            <div className='flex flex-col gap-y-2'>
                              <span
                                style={{
                                  fontFamily: "var(--font-public-sans)",
                                  fontWeight: 400,
                                }}
                              >
                                {link.title}
                              </span>
                              <span className='text-sm text-gray-500'>{link.short_desc}</span>
                            </div>
                          </Link>
                        )}
                      </div>
                    )
                  })
                }
              </div>
              <div className='w-60'>
                <PromoOverlayCard className="max-w-60" link="/conditions/spinal-stenosis" />
              </div>
            </div>
          ) :
            title == 'SERVICES' ? (
              <div className='w-200 flex flex-row '>
                <div className='w-fit flex flex-col justify-center items-center space-y-4 px-1'>
                  <ul className='flex flex-col w-100'>
                    {
                      sublinks.map((link, linkIndex) => {
                        const IconComponent = link.icon;


                        return (
                          <li key={`${link.title}-${linkIndex}`}>
                            {link.subLinks.length == 0 ? (
                              <NavigationMenuLink asChild className='flex flex-row items-center gap-x-4 '>
                                <Link href={link.href} className='w-full block px-4 py-2 flex-row items-center justify-between'>
                                  <div className='flex flex-row items-center gap-x-4'>
                                    <div className='p-2 rounded-2xl border aspect-square flex items-center justify-center'>
                                      <IconComponent className='w-8 h-8 text-[#252932]' />
                                    </div>
                                    <div className='flex flex-col gap-y-0'>
                                      <span
                                        style={{
                                          fontFamily: "var(--font-public-sans)",
                                          fontWeight: 400,
                                        }}
                                      >
                                        {link.title}
                                      </span>
                                      <span className='text-xs text-gray-500'>{link.short_desc}</span>
                                    </div>
                                  </div>
                                  <ChevronRight className='w-4 h-4 text-[#252932]' />
                                </Link>
                              </NavigationMenuLink>
                            ) : (
                              <Link
                                href={link.href}
                                className="w-full text-left px-4 py-2 hover:bg-white/50 transition-colors duration-200 rounded-lg flex flex-row items-center gap-x-4"
                                onMouseEnter={() => setSelectedSubLink(link)}
                              >
                                <div className='p-2 rounded-2xl border aspect-square flex items-center justify-center'>
                                  <IconComponent className='w-4 h-4 text-[#252932]' />
                                </div>
                                <div className='flex flex-col gap-y-2'>
                                  <span
                                    style={{
                                      fontFamily: "var(--font-public-sans)",
                                      fontWeight: 400,
                                    }}
                                  >
                                    {link.title}
                                  </span>
                                  <span className='text-sm text-gray-500'>{link.short_desc}</span>
                                </div>
                              </Link>
                            )}
                          </li>
                        )
                      })
                    }
                  </ul>
                  <PromoOverlayCard
                    className="max-w-100 w-100"
                    imageUrl="https://mountainspineortho.b-cdn.net/public/lowerbackpain.png"
                    title="Lower Back Pain?"
                    subtitle="Meet with our world-class surgeons today"
                    link={`/conditions?data=${encodeURIComponent(JSON.stringify({ tags: ['Spine'] }))}`}
                  />
                </div>

                {selectedSubLink && (
                  <div className='flex flex-col p-4 border-l lg:w-100'>
                    {/* Header */}
                    <div className='flex flex-row items-center gap-x-3 mb-4 pb-3 border-b'>
                      <div className='p-2 rounded-2xl border aspect-square flex items-center justify-center'>
                        <selectedSubLink.icon className='w-6 h-6 text-[#252932]' />
                      </div>
                      <div className='flex flex-col'>
                        <span
                          style={{
                            fontFamily: "var(--font-public-sans)",
                            fontWeight: 600,
                          }}
                          className='text-[#252932]'
                        >
                          {selectedSubLink.title}
                        </span>
                        <span className='text-sm text-gray-500'>{selectedSubLink.short_desc}</span>
                      </div>
                    </div>

                    {/* SubLinks */}
                    <div className='flex flex-col gap-y-2'>
                      {selectedSubLink.subLinks.map((subLink, subIndex) => {
                        const SubIconComponent = subLink.icon;
                        return (
                          <NavigationMenuLink key={`${subLink.title}-${subIndex}`} asChild>
                            <Link href={subLink.href} className="block px-3 py-2 rounded-lg hover:bg-white/50 transition-colors duration-200">
                              <div className='flex flex-row items-center gap-x-3'>
                                <div className='p-1.5 rounded-xl border aspect-square flex items-center justify-center'>
                                  <SubIconComponent className='w-4 h-4 text-[#252932]' />
                                </div>
                                <div className='flex flex-col'>
                                  <span
                                    style={{
                                      fontFamily: "var(--font-public-sans)",
                                      fontWeight: 400,
                                    }}
                                    className='text-[#252932]'
                                  >
                                    {subLink.title}
                                  </span>
                                  <span className='text-xs text-gray-500'>{subLink.short_desc}</span>
                                </div>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) :
              title == 'ABOUT' ? (
                <div className='w-fit space-y-4 flex-row flex gap-x-4'>
                  <ul className='flex flex-col w-100'>
                    {
                      sublinks.map((link, linkIndex) => {
                        const IconComponent = link.icon;


                        return (
                          <li key={`${link.title}-${linkIndex}`}>
                            {link.subLinks.length == 0 && (
                              <NavigationMenuLink asChild className='flex flex-row items-center gap-x-4'>
                                <Link href={link.href} className='w-full block px-4 py-2 flex-row items-center justify-between'>
                                  <div className='flex flex-row items-center gap-x-4'>
                                    <div className='p-2 rounded-2xl border aspect-square flex items-center justify-center'>
                                      <IconComponent className='w-8 h-8 text-[#252932]' />
                                    </div>
                                    <div className='flex flex-col gap-y-0'>
                                      <span
                                        style={{
                                          fontFamily: "var(--font-public-sans)",
                                          fontWeight: 400,
                                        }}
                                      >
                                        {link.title}
                                      </span>
                                      <span className='text-xs text-gray-500'>{link.short_desc}</span>
                                    </div>
                                  </div>
                                  <ChevronRight className='w-4 h-4 text-[#252932]' />
                                </Link>
                              </NavigationMenuLink>
                            )
                              // : (
                              //   <Link
                              //     href={link.href}
                              //     className="w-full text-left px-4 py-2 hover:bg-white/50 transition-colors duration-200 rounded-lg flex flex-row items-center gap-x-4"
                              //     onMouseEnter={() => setSelectedSubLink(link)}
                              //   >
                              //     <div className='p-2 rounded-2xl border aspect-square flex items-center justify-center'>
                              //       <IconComponent className='w-4 h-4 text-[#252932]' />
                              //     </div>
                              //     <div className='flex flex-col gap-y-2'>
                              //       <span
                              //         style={{
                              //           fontFamily: "var(--font-public-sans)",
                              //           fontWeight: 400,
                              //         }}
                              //       >
                              //         {link.title}
                              //       </span>
                              //       <span className='text-sm text-gray-500'>{link.short_desc}</span>
                              //     </div>
                              //   </Link>
                              // )
                            }
                          </li>
                        )
                      })
                    }
                  </ul>
                  {latestBlog && (
                    <div className='w-70'>
                      <NavCompactBlogCard blog={latestBlog.blog_info} slug={latestBlog.slug} />
                    </div>
                  )}
                  {/* <PromoOverlayCard
                    className="max-w-100"
                    imageUrl="https://mountainspineortho.b-cdn.net/public/lowerbackpain.png"
                    title="Lower Back Pain?"
                    subtitle="Meet with our world-class surgeons today"
                  /> */}
                </div>
              ) : title == 'LOCATION' ? (
                <div className='w-220 flex flex-row'>
                  <div className='w-fit flex flex-col justify-start items-start space-y-1 px-1'>
                    <ul className='flex flex-col w-60'>
                      {
                        sublinks.map((link, linkIndex) => {
                          const IconComponent = link.icon;
                          return (
                            <li key={`${link.title}-${linkIndex}`}>
                              <Link
                                href={link.href}
                                className="w-full text-left px-4 py-2 hover:bg-white/50 transition-colors duration-200 rounded-lg flex flex-row items-center gap-x-4"
                                onMouseEnter={() => setSelectedSubLink(link)}
                              >
                                <div className='p-2 rounded-2xl border aspect-square flex items-center justify-center'>
                                  <IconComponent className='w-4 h-4 text-[#252932]' />
                                </div>
                                <div className='flex flex-col gap-y-0'>
                                  <span
                                    style={{
                                      fontFamily: "var(--font-public-sans)",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {link.title}
                                  </span>
                                  <span className='text-xs text-gray-500'>{link.short_desc}</span>
                                </div>
                              </Link>
                            </li>
                          )
                        })
                      }
                    </ul>
                  </div>

                  {selectedSubLink && selectedSubLink.subLinks && selectedSubLink.subLinks.length > 0 && (
                    <div className='flex flex-col p-4 border-l lg:w-90'>
                      {/* Header */}
                      <div className='flex flex-row items-center gap-x-3 mb-4 pb-3 border-b'>
                        <div className='p-2 rounded-2xl border aspect-square flex items-center justify-center'>
                          <selectedSubLink.icon className='w-6 h-6 text-[#252932]' />
                        </div>
                        <div className='flex flex-col'>
                          <span
                            style={{
                              fontFamily: "var(--font-public-sans)",
                              fontWeight: 600,
                            }}
                            className='text-[#252932]'
                          >
                            {selectedSubLink.title}
                          </span>
                          <span className='text-sm text-gray-500'>{selectedSubLink.short_desc}</span>
                        </div>
                      </div>

                      {/* SubLinks - Locations in State */}
                      <div className='flex flex-col gap-y-1 max-h-60 overflow-y-auto [mask-composite:intersect] [mask-image:linear-gradient(to_top,transparent,black_2rem)]'>
                        {selectedSubLink.subLinks.map((subLink, subIndex) => {
                          const SubIconComponent = subLink.icon;
                          return (
                            <NavigationMenuLink key={`${subLink.title}-${subIndex}`} asChild >
                              <Link href={subLink.href} className="block px-3 py-2 rounded-lg hover:bg-white/50 transition-colors duration-200 ">
                                <div className='flex flex-row items-center gap-x-3'>
                                  <div className='p-1.5 rounded-xl border aspect-square flex items-center justify-center'>
                                    <SubIconComponent className='w-4 h-4 text-[#252932]' />
                                  </div>
                                  <div className='flex flex-col'>
                                    <span
                                      style={{
                                        fontFamily: "var(--font-public-sans)",
                                        fontWeight: 400,
                                      }}
                                      className='text-[#252932] text-sm'
                                    >
                                      {subLink.title}
                                    </span>
                                  </div>
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  
                  <PromoOverlayCard
                    className="max-w-70 w-70"
                    imageUrl="/centralflorida.png"
                    title="Serving 5 States"
                    subtitle="23+ Locations Across FL, NJ, NY, PA & GA"
                    link="/locations"
                  />
                </div>
              ) : title == 'INJURIES' ? (
                <div className='w-130 flex flex-col p-2'>
                  <ul className='flex flex-col w-full'>
                    {
                      sublinks.map((link, linkIndex) => {
                        const IconComponent = link.icon;
                        return (
                          <li key={`${link.title}-${linkIndex}`}>
                            <NavigationMenuLink asChild className='flex flex-row items-center gap-x-4 '>
                              <Link href={link.href} className='w-full block px-4 py-3 hover:bg-white/50 transition-colors duration-200 rounded-lg flex flex-row items-center justify-between group'>
                                <div className='flex flex-row items-center gap-x-4'>
                                  <div className='p-2 rounded-2xl border aspect-square flex items-center justify-center bg-white group-hover:border-[#0A50EC] transition-colors'>
                                    <IconComponent className='w-6 h-6 text-[#252932] group-hover:text-[#0A50EC]' />
                                  </div>
                                  <div className='flex flex-col gap-y-0'>
                                    <span
                                      style={{
                                        fontFamily: "var(--font-public-sans)",
                                        fontWeight: 500,
                                      }}
                                      className='group-hover:text-[#0A50EC] transition-colors'
                                    >
                                      {link.title}
                                    </span>
                                    <span className='text-xs text-gray-500'>{link.short_desc}</span>
                                  </div>
                                </div>
                                <ChevronRight className='w-4 h-4 text-[#252932] group-hover:text-[#0A50EC] group-hover:translate-x-1 transition-all' />
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
              )
                :
                (
                  <ul className='flex flex-col w-200 left-0 self-start'>
                    {
                      sublinks.map((link, linkIndex) => {
                        const IconComponent = link.icon;
                        return (
                          <li key={`${link.title}-${linkIndex}`}>
                            {link.subLinks.length == 0 ? (
                              <NavigationMenuLink asChild className='flex flex-row items-center gap-x-4'>
                                <Link href={link.href} className='w-full block px-4 py-2 flex-row items-center justify-between'>
                                  <div className='flex flex-row items-center gap-x-4'>
                                    <div className='p-2 rounded-2xl border aspect-square flex items-center justify-center'>
                                      <IconComponent className='w-8 h-8 text-[#252932]' />
                                    </div>
                                    <div className='flex flex-col gap-y-0'>
                                      <span
                                        style={{
                                          fontFamily: "var(--font-public-sans)",
                                          fontWeight: 400,
                                        }}
                                      >
                                        {link.title}
                                      </span>
                                      <span className='text-xs text-gray-500'>{link.short_desc}</span>
                                    </div>
                                  </div>
                                  <ChevronRight className='w-4 h-4 text-[#252932]' />
                                </Link>
                              </NavigationMenuLink>
                            ) : (
                              <Link
                                href={link.href}
                                className="w-full text-left px-4 py-2 hover:bg-white/50 transition-colors duration-200 rounded-lg flex flex-row items-center gap-x-4"
                                onMouseEnter={() => setSelectedSubLink(link)}
                              >
                                <div className='p-2 rounded-2xl border aspect-square flex items-center justify-center'>
                                  <IconComponent className='w-4 h-4 text-[#252932]' />
                                </div>
                                <div className='flex flex-col gap-y-2'>
                                  <span
                                    style={{
                                      fontFamily: "var(--font-public-sans)",
                                      fontWeight: 400,
                                    }}
                                  >
                                    {link.title}
                                  </span>
                                  <span className='text-sm text-gray-500'>{link.short_desc}</span>
                                </div>
                              </Link>
                            )}
                          </li>
                        )
                      })
                    }
                  </ul>
                )
        }


      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}


const NavBarLinks = [
  {
    href: '/',
    screen: '/',
    title: 'HOME',
    short_desc: 'Welcome to our practice',
    icon: House,
    subLinks: [
      {
        title: 'Condition Check',
        href: '/condition-check',
        short_desc: 'Check your symptoms',
        icon: Stethoscope,
        subLinks: []
      },
    ]
  },
  {
    href: '/find-care/book-an-appointment',
    screen: '/find-care',
    title: 'FIND CARE',
    short_desc: 'Get the care you need',
    icon: Heart,
    subLinks: [
      {
        title: 'Book An Appointment',
        href: '/find-care/book-an-appointment',
        short_desc: 'Schedule your visit',
        icon: Calendar,
        subLinks: []
      },
      {
        title: 'Find A Doctor',
        href: '/find-care/find-a-doctor',
        short_desc: 'Meet our specialists',
        icon: User,
        subLinks: []
      },
      {
        title: 'Second Opinion',
        href: '/find-care/second-opinion',
        short_desc: 'Expert second opinion',
        icon: Eye,
        subLinks: []
      },
      {
        title: 'Free MRI Review',
        href: '/find-care/free-mri-review',
        short_desc: 'Free MRI analysis',
        icon: Scan,
        subLinks: []
      },
      {
        title: 'Treatment Candidacy',
        href: '/find-care/candidacy-check',
        short_desc: 'Check if you qualify',
        icon: CheckCircle,
        subLinks: []
      },
      {
        title: 'Insurance Policy',
        href: '/insurance-policy',
        short_desc: 'Insurance information',
        icon: Shield,
        subLinks: []
      },
      {
        title: 'Patient Forms',
        href: '/patient-forms',
        short_desc: 'Download forms',
        icon: LucideFileText,
        subLinks: []
      }
    ]
  },
  {
    href: '/conditions',
    screen: '/conditions',
    title: 'SERVICES',
    short_desc: 'Our treatment specialties',
    icon: Target,
    subLinks: [
      {
        title: 'Back Pain',
        href: '/conditions/spine',
        short_desc: 'Spine and back care',
        icon: Activity,
        subLinks: [
          {
            title: 'Lower Back Pain',
            href: '/area-of-pain/back-pain/lower-back-pain',
            short_desc: 'Lower back treatment',
            icon: Zap,
          },
          {
            title: 'Degenerative Disc Disease',
            href: '/area-of-pain/back-pain/degenerative-disc-disease',
            short_desc: 'Disc degeneration care',
            icon: Circle,
          },
          {
            title: 'Lumbar Herniated Disc',
            href: '/area-of-pain/back-pain/lumbar-herniated-disc',
            short_desc: 'Herniated disc treatment',
            icon: AlertCircle,
          },
          {
            title: 'Foraminal Stenosis',
            href: '/area-of-pain/back-pain/foraminal-stenosis-back-pain',
            short_desc: 'Nerve compression relief',
            icon: Minus,
          },
          {
            title: 'Sciatica',
            href: '/area-of-pain/back-pain/sciatica-nerve-pain',
            short_desc: 'Sciatic nerve pain',
            icon: Zap,
          },
          {
            title: 'Coccydynia',
            href: '/area-of-pain/back-pain/tailbone-pain-coccydynia',
            short_desc: 'Tailbone pain relief',
            icon: Triangle,
          },
          {
            title: 'Back Pain Treament Options',
            href: '/area-of-pain/back-pain/back-pain-treatment-options',
            short_desc: 'Treatment solutions',
            icon: Settings,
          }
        ]
      },
      {
        title: 'Neck & Shoulder Pain',
        href: '/conditions/neck',
        short_desc: 'Neck and shoulder care',
        icon: Headphones,
        subLinks: [
          {
            title: 'Cervical Spinal Stenosis',
            href: '/area-of-pain/neck-and-shoulder-pain/neck-spinal-stenosis',
            short_desc: 'Neck stenosis treatment',
            icon: Minus,
          },
          {
            title: 'Cervical Herniated Disc',
            href: '/area-of-pain/neck-and-shoulder-pain/neck-herniated-disc',
            short_desc: 'Neck disc herniation',
            icon: AlertCircle,
          },
          {
            title: 'Degenerative Disc Disease',
            href: '/area-of-pain/neck-and-shoulder-pain/degenerative-disc-disease',
            short_desc: 'Neck disc degeneration',
            icon: Circle,
          },
          {
            title: 'Arthritis',
            href: '/area-of-pain/neck-and-shoulder-pain/neck-shoulder-arthritis-pain',
            short_desc: 'Arthritis management',
            icon: Bone,
          },
          {
            title: 'Pinched Nerve',
            href: '/area-of-pain/neck-and-shoulder-pain/pinched-nerve-neck-shoulder',
            short_desc: 'Nerve compression relief',
            icon: Zap,
          },
          {
            title: 'Neck and Shoulder Treatments',
            href: '/area-of-pain/neck-and-shoulder-pain/neck-and-shoulder-pain-treatment',
            short_desc: 'Treatment options',
            icon: Settings,
          }
        ]
      },
      {
        title: 'Foot & Ankle',
        href: '/conditions/foot-ankle',
        short_desc: 'Foot and ankle care',
        icon: Footprints,
        subLinks: [
          {
            title: 'Bunions',
            href: '/area-of-pain/foot-pain/bunion-pain-hallux-valgus',
            short_desc: 'Bunion treatment',
            icon: Circle,
          },
          {
            title: 'Plantar Fasciitis',
            href: '/area-of-pain/foot-pain/heel-pain-plantar-fasciitis',
            short_desc: 'Heel pain relief',
            icon: Zap,
          },
          {
            title: 'Achilles Tendonitis',
            href: '/area-of-pain/foot-pain/achilles-tendon-pain',
            short_desc: 'Achilles tendon care',
            icon: Activity,
          },
          {
            title: 'Flat Feet',
            href: '/area-of-pain/foot-pain/flat-feet-pain',
            short_desc: 'Flat feet correction',
            icon: Footprints,
          },
          {
            title: 'Ankle Arthroscopy',
            href: '/area-of-pain/foot-pain/ankle-arthroscopy-recovery-pain',
            short_desc: 'Minimally invasive surgery',
            icon: Scissors,
          },
          {
            title: 'Hammertoes',
            href: '/area-of-pain/foot-pain/hammertoes-foot-pain',
            short_desc: 'Toe deformity correction',
            icon: Circle,
          },
          {
            title: 'Diabetic Foot Ulcers',
            href: '/area-of-pain/foot-pain/diabetic-foot-ulcer-care',
            short_desc: 'Diabetic foot care',
            icon: Droplet,
          },
          {
            title: 'Ankle Replacement',
            href: '/area-of-pain/foot-pain/ankle-replacement-surgery-pain',
            short_desc: 'Joint replacement surgery',
            icon: Settings,
          }
        ]
      },
      {
        title: 'View All Conditions',
        href: '/conditions',
        short_desc: 'Browse all conditions',
        icon: List,
        subLinks: [
          {
            title: 'Spine Conditions',
            href: '/conditions/spine',
            short_desc: 'Spine conditions',
            icon: Activity,
          },
          {
            title: 'Neck Conditions',
            href: '/conditions/neck',
            short_desc: 'Neck conditions',
            icon: Headphones,
          },
          {
            title: 'Back Conditions',
            href: '/conditions/back',
            short_desc: 'Back conditions',
            icon: Zap,
          },
          {
            title: 'Shoulder Conditions',
            href: '/conditions/shoulder',
            short_desc: 'Shoulder conditions',
            icon: Circle,
          },
          {
            title: 'Hip Conditions',
            href: '/conditions/hip',
            short_desc: 'Hip conditions',
            icon: Target,
          },
          {
            title: 'Knee Conditions',
            href: '/conditions/knee',
            short_desc: 'Knee conditions',
            icon: Bone,
          },
          {
            title: 'Hand, Wrist & Elbow Conditions',
            href: '/conditions/hand-wrist-elbow',
            short_desc: 'Hand, wrist & elbow conditions',
            icon: AlertCircle,
          },
          {
            title: 'Foot & Ankle Conditions',
            href: '/conditions/foot-ankle',
            short_desc: 'Foot & ankle conditions',
            icon: Footprints,
          },
          {
            title: 'Sports Medicine Conditions',
            href: '/conditions/sports-medicine',
            short_desc: 'Sports medicine conditions',
            icon: Activity,
          },
          {
            title: 'Pain Management Conditions',
            href: '/conditions/pain-management',
            short_desc: 'Pain management conditions',
            icon: Droplet,
          },
        ]
      },
      {
        title: 'View All Treatments',
        href: '/treatments',
        short_desc: 'All treatment options',
        icon: Settings,
        subLinks: [
          {
            title: 'Spine Treatments',
            href: '/treatments?category=Spine',
            short_desc: 'Spine procedures',
            icon: Activity,
          },
          {
            title: 'Orthopedic Injections',
            href: '/treatments/orthopedic-injections',
            short_desc: 'Injection-based treatments',
            icon: Syringe,
          },
          {
            title: 'Neck Treatments',
            href: '/treatments?category=Neck',
            short_desc: 'Neck procedures',
            icon: Headphones,
          },
          {
            title: 'Shoulder Treatments',
            href: '/treatments?category=Shoulder',
            short_desc: 'Shoulder procedures',
            icon: Circle,
          },
          {
            title: 'Hip Treatments',
            href: '/treatments?category=Hip',
            short_desc: 'Hip procedures',
            icon: Target,
          },
          {
            title: 'Knee Treatments',
            href: '/treatments?category=Knee',
            short_desc: 'Knee procedures',
            icon: Bone,
          },
          {
            title: 'Hand, Wrist & Elbow Treatments',
            href: '/treatments?category=Hand',
            short_desc: 'Hand, wrist & elbow procedures',
            icon: AlertCircle,
          },
          {
            title: 'Foot & Ankle Treatments',
            href: '/treatments?category=Foot',
            short_desc: 'Foot & ankle procedures',
            icon: Footprints,
          },
          {
            title: 'Sports Medicine Treatments',
            href: '/treatments?category=Sports%20Medicine',
            short_desc: 'Sports medicine procedures',
            icon: Activity,
          },
        ]
      }

    ]
  },
  {
    href: '/about',
    screen: '/about',
    title: 'ABOUT',
    short_desc: 'Learn about our practice',
    icon: Info,
    subLinks: [
      {
        title: 'About Mountain Spine',
        href: '/about',
        short_desc: 'Our story and mission',
        icon: Building,
        subLinks: []
      },
      {
        title: 'Meet our Doctors',
        href: '/about/meetourdoctors',
        short_desc: 'Our expert specialists',
        icon: Users,
        subLinks: []
      },
      {
        title: 'FAQs',
        href: '/about/faqs',
        short_desc: 'Frequently asked questions',
        icon: HelpCircle,
        subLinks: []
      },
      {
        title: "Blogs",
        href: '/blogs',
        short_desc: 'Health and wellness articles',
        icon: FileText,
        subLinks: []
      }
    ]
  },
  {
    href: '/locations',
    screen: '/locations',
    title: 'LOCATION',
    short_desc: 'Find our locations',
    icon: MapPin,
    subLinks: [
      {
        title: 'Florida',
        href: '/locations/florida',
        short_desc: '10 locations',
        icon: MapPin,
        subLinks: clinics.filter(c => c.stateSlug === 'florida').map((clinic) => ({
          title: clinic.name.split('Mountain Spine & Orthopedics')[1]?.trim() || clinic.region.split(',')[0].trim(),
          href: `/locations/${clinic.stateSlug}/${clinic.locationSlug}`,
          short_desc: clinic.region.split(',')[0].trim(),
          icon: Building,
        }))
      },
      {
        title: 'New Jersey',
        href: '/locations/new-jersey',
        short_desc: '8 locations',
        icon: MapPin,
        subLinks: clinics.filter(c => c.stateSlug === 'new-jersey').map((clinic) => ({
          title: clinic.name.split('Mountain Spine & Orthopedics')[1]?.trim() || clinic.region.split(',')[0].trim(),
          href: `/locations/${clinic.stateSlug}/${clinic.locationSlug}`,
          short_desc: clinic.region.split(',')[0].trim(),
          icon: Building,
        }))
      },
      {
        title: 'New York',
        href: '/locations/new-york',
        short_desc: '1 location',
        icon: MapPin,
        subLinks: clinics.filter(c => c.stateSlug === 'new-york').map((clinic) => ({
          title: clinic.name.split('Mountain Spine & Orthopedics')[1]?.trim() || clinic.region,
          href: `/locations/${clinic.stateSlug}/${clinic.locationSlug}`,
          short_desc: clinic.region,
          icon: Building,
        }))
      },
      {
        title: 'Pennsylvania',
        href: '/locations/pennsylvania',
        short_desc: '4 locations',
        icon: MapPin,
        subLinks: clinics.filter(c => c.stateSlug === 'pennsylvania').map((clinic) => ({
          title: clinic.name.split('Mountain Spine & Orthopedics')[1]?.trim() || clinic.region.split(',')[0].trim(),
          href: `/locations/${clinic.stateSlug}/${clinic.locationSlug}`,
          short_desc: clinic.region.split(',')[0].trim(),
          icon: Building,
        }))
      },
      {
        title: 'Georgia',
        href: '/locations/georgia',
        short_desc: '1 location',
        icon: MapPin,
        subLinks: clinics.filter(c => c.stateSlug === 'georgia').map((clinic) => ({
          title: clinic.name.split('Mountain Spine & Orthopedics')[1]?.trim() || clinic.region.split(',')[0].trim(),
          href: `/locations/${clinic.stateSlug}/${clinic.locationSlug}`,
          short_desc: clinic.region.split(',')[0].trim(),
          icon: Building,
        }))
      },
    ]
  },
  {
    href: '/injuries/car-accident',
    screen: '/injuries/car-accident',
    title: 'INJURIES',
    short_desc: 'Learn about our injuries',
    icon: Activity,
    subLinks: [
      {
        title: 'Slip and Fall',
        href: '/injuries/slip-and-fall',
        short_desc: 'Learn about how to handle slip and fall injuries',
        icon: Footprints,
        subLinks: []
      },
      {
        title: 'Car Accident',
        href: '/injuries/car-accident',
        short_desc: 'Learn about how to handle car accident injuries',
        icon: CarFront,
        subLinks: []
      },
      {
        title: 'Work Injury',
        href: '/injuries/work-injury',
        short_desc: 'Orthopedic care for workplace injuries',
        icon: Briefcase,
        subLinks: []
      },
      {
        title: 'Personal Injury',
        href: '/injuries/personal-injury',
        short_desc: 'Evaluation and treatment after trauma',
        icon: User,
        subLinks: []
      }
    ]
  }
]

const HamburgerIcon = ({ open }: { open: boolean }) => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <motion.line x1="4" y1="6" x2="20" y2="6" animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} />
    <motion.line x1="4" y1="12" x2="20" y2="12" animate={open ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.15 }} />
    <motion.line x1="4" y1="18" x2="20" y2="18" animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} />
  </motion.svg>
);

export default function NavBar() {
  const pathname = usePathname();
  const contact = resolveContactByPathname(pathname);
  const { data: latestBlog } = useQuery({
    queryKey: ["latest-blog"],
    queryFn: GetLatestBlog,
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // <-- State for sidebar
  const [isScrolled, setIsScrolled] = useState(false);

  // iOS-like sidebar animation variants
  const sidebarVariants = {
    hidden: { x: 56, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 260, damping: 30, mass: 0.9 }
    },
    exit: { x: 56, opacity: 0, transition: { duration: 0.2 } }
  } as const

  const listVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.05 }
    }
  } as const

  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  } as const

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);
  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 flex justify-center self-center lg:py-10 py-1 rounded-b-xl max-h-[128px] lg:h-[60px] ${isSidebarOpen ? 'bg-white' : 'bg-transparent'} transition-all duration-200 ${isScrolled ? 'sm:bg-white/50 sm:backdrop-blur-3xl bg-white' : 'bg-transparent'}`}>
        <nav className="flex justify-between items-center w-full max-w-[1440px] px-6 md:px-[40px] py-2 z-[1]">
          <Link href={'/'} className='flex flex-row items-center justify-center space-x-[8px] '>
            <Image src={Logo} alt="Mountain Spine & Orthopedics Logo" className="max-h-[40px] object-cover lg:h-[40px] lg:w-auto w-20 h-10  " />
            <div className='w-[1px] h-[35px] bg-gradient-to-b from-transparent via-[#0A50EC] to-transparnet' />
            <div className="flex flex-col text-[#0A50EC]"
              style={{
                fontFamily: "var(--font-public-sans)",
                fontSize: "16px",
                lineHeight: "24px",
                letterSpacing: "0.02em",
              }}
            >
              <span className="md:text-2xl text-md font-[700]">MOUNTAIN</span>
              <span className="font-[700] text-xs"> SPINE & ORTHOPEDICS</span>
            </div>
          </Link>

          <NavigationMenu className="space-x-8 text-[16px] font-semibold items-center justify-center z-60 xl:flex hidden" >

            <NavigationMenuList className=' '>
              {
                NavBarLinks.map((link, index) => (
                  <NavLink key={index} screen={link.screen} href={link.href} sublinks={link.subLinks} title={link.title} short_desc={link.short_desc} pathname={pathname} latestBlog={latestBlog} />
                ))
              }
            </NavigationMenuList>

          </NavigationMenu>

          <button
            className={`xl:hidden text-[#0A50EC] flex p-2 z-50 ml-6  bg-white rounded-xl backdrop-blur-3xl`}   //ml-auto pushes it right if space allows
            onClick={toggleSidebar}
            aria-label="Toggle menu"
            aria-expanded={isSidebarOpen}
            aria-controls="mobile-sidebar"  //Should match sidebar id
          >
            <HamburgerIcon open={isSidebarOpen} />
          </button>

          <div className={`${isSidebarOpen ? 'hidden' : 'sm:flex hidden'} flex flex-row items-center space-x-[8px] relative z-50`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M11.3852 0.0666578C11.0536 -0.0290477 10.7071 0.162219 10.6114 0.493864C10.5157 0.825509 10.707 1.17194 11.0386 1.26765C13.78 2.05874 15.9419 4.22057 16.7331 6.96182C16.8288 7.29347 17.1752 7.48472 17.5069 7.389C17.8385 7.29328 18.0298 6.94684 17.9341 6.6152C17.0238 3.46127 14.5392 0.976833 11.3852 0.0666578ZM10.9112 4.11842C10.5935 3.9835 10.2266 4.13169 10.0916 4.4494C9.95671 4.76712 10.1049 5.13406 10.4226 5.26898C11.4596 5.70934 12.2914 6.54113 12.7318 7.57812C12.8667 7.89584 13.2336 8.04402 13.5514 7.9091C13.8691 7.77417 14.0173 7.40724 13.8823 7.08952C13.3154 5.75446 12.2463 4.68536 10.9112 4.11842ZM4.51311 0.906545C4.27945 0.487351 3.90337 0.170069 3.43113 0.0724652C2.95397 -0.0261574 2.47434 0.119319 2.08015 0.440604C0.649844 1.60636 -0.260852 3.47409 0.134395 5.43344C0.377348 6.63783 0.78211 7.82615 1.60638 9.26341C3.2606 12.1479 5.84983 14.7385 8.73763 16.3947C10.1749 17.2189 11.3632 17.6237 12.5676 17.8666C14.5269 18.2619 16.3947 17.3512 17.5604 15.9209C17.8817 15.5267 18.0272 15.0471 17.9286 14.5699C17.831 14.0977 17.5137 13.7216 17.0945 13.4879L15.7591 12.7436L15.7591 12.7436C15.2673 12.4694 14.8534 12.2387 14.4936 12.088C14.1119 11.9282 13.7355 11.8332 13.3194 11.8766C12.9032 11.92 12.5545 12.0906 12.2141 12.3257C11.8931 12.5474 11.5357 12.8585 11.111 13.2283L8.97846 15.0848C6.56267 13.611 4.38855 11.4359 2.91618 9.02257L4.77273 6.89005C5.14248 6.46536 5.45365 6.10797 5.67532 5.78698C5.91047 5.44649 6.08101 5.0978 6.12441 4.68166C6.1678 4.26553 6.07287 3.88915 5.91303 3.50747C5.76236 3.14766 5.53163 2.73376 5.25746 2.24192L5.25745 2.24191L4.51311 0.906545ZM12.8148 16.6413C11.9601 16.4689 11.1147 16.2075 10.1427 15.7286L11.9059 14.1936C12.3633 13.7954 12.668 13.5313 12.9244 13.3543C13.1677 13.1862 13.3167 13.1337 13.449 13.1199C13.5814 13.1061 13.7379 13.1267 14.0107 13.241C14.2981 13.3613 14.6508 13.5569 15.1805 13.8521L16.4859 14.5798C16.6449 14.6684 16.6927 14.7659 16.7044 14.8229C16.7152 14.875 16.7145 14.9803 16.5915 15.1312C15.655 16.2801 14.2281 16.9264 12.8148 16.6413ZM3.80745 6.09513L2.27246 7.85829C1.79352 6.88632 1.53212 6.04092 1.35971 5.18627C1.0746 3.77289 1.72089 2.34601 2.86987 1.40954C3.02073 1.28658 3.12604 1.28583 3.17813 1.29659C3.23514 1.30838 3.33262 1.3561 3.42127 1.51514L4.14892 2.82057C4.44418 3.35027 4.6397 3.70291 4.76005 3.9903C4.87429 4.2631 4.89495 4.41965 4.88115 4.55201C4.86734 4.68438 4.81483 4.83329 4.64676 5.07665C4.46971 5.33303 4.20564 5.63774 3.80745 6.09513Z" fill="#0A50EC" />
            </svg>
            <a
              href={contact.phoneHref}
              className="hover:text-[#0A50EC] hover:underline transition-colors duration-200 text-[#252932] font-bold"
              onClick={() => {
                pushPhoneClickEvent({
                  location: 'NavBar',
                  page_path: typeof window !== 'undefined' ? window.location.pathname : '',
                });
              }}
              style={{
                fontFamily: "var(--font-inter)",
              }}
            >
              {contact.phoneDisplay}
            </a>
          </div>

        </nav>
      </header >

      {/* Overlay (Visible when sidebar is open, below xl) */}
      <AnimatePresence>
        {
          isSidebarOpen && (
            <motion.div
              key="sidebar-overlay"
              className="fixed inset-0 z-30 xl:hidden backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeSidebar}
              aria-hidden="true"
            />
          )
        }
      </AnimatePresence >

      {/* Sidebar Container */}
      <AnimatePresence>
        {
          isSidebarOpen && (
            <motion.aside
              key="mobile-sidebar"
              id="mobile-sidebar"
              className={`fixed top-0 left-0 right-0 h-full w-full bg-white rounded-b-2xl  z-40 xl:hidden overflow-y-auto overscroll-contain`}
              style={{ WebkitOverflowScrolling: 'touch' as any }}
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 30 }}
              aria-hidden={!isSidebarOpen}
            >


              {/* Sidebar Navigation Links */}
              <motion.nav
                className="pt-26 flex flex-col space-y-4 px-6 pb-6 overflow-y-auto"
                variants={listVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {NavBarLinks.map((link, index) => {
                  return (
                    <motion.div key={`top-level-${index}`} variants={itemVariants}>
                      <SidebarNavItem
                        item={link}
                        pathname={pathname}
                        closeSidebar={closeSidebar}
                        level={0}
                        latestBlog={latestBlog}
                      />
                    </motion.div>
                  )
                })}
                {/* Optional: Add Contact Us button in sidebar */}
                <motion.div
                  variants={itemVariants}
                  className="w-full mt-6 flex items-center justify-center"
                >
                  <div className="flex flex-row items-center space-x-[8px]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M11.3852 0.0666578C11.0536 -0.0290477 10.7071 0.162219 10.6114 0.493864C10.5157 0.825509 10.707 1.17194 11.0386 1.26765C13.78 2.05874 15.9419 4.22057 16.7331 6.96182C16.8288 7.29347 17.1752 7.48472 17.5069 7.389C17.8385 7.29328 18.0298 6.94684 17.9341 6.6152C17.0238 3.46127 14.5392 0.976833 11.3852 0.0666578ZM10.9112 4.11842C10.5935 3.9835 10.2266 4.13169 10.0916 4.4494C9.95671 4.76712 10.1049 5.13406 10.4226 5.26898C11.4596 5.70934 12.2914 6.54113 12.7318 7.57812C12.8667 7.89584 13.2336 8.04402 13.5514 7.9091C13.8691 7.77417 14.0173 7.40724 13.8823 7.08952C13.3154 5.75446 12.2463 4.68536 10.9112 4.11842ZM4.51311 0.906545C4.27945 0.487351 3.90337 0.170069 3.43113 0.0724652C2.95397 -0.0261574 2.47434 0.119319 2.08015 0.440604C0.649844 1.60636 -0.260852 3.47409 0.134395 5.43344C0.377348 6.63783 0.78211 7.82615 1.60638 9.26341C3.2606 12.1479 5.84983 14.7385 8.73763 16.3947C10.1749 17.2189 11.3632 17.6237 12.5676 17.8666C14.5269 18.2619 16.3947 17.3512 17.5604 15.9209C17.8817 15.5267 18.0272 15.0471 17.9286 14.5699C17.831 14.0977 17.5137 13.7216 17.0945 13.4879L15.7591 12.7436L15.7591 12.7436C15.2673 12.4694 14.8534 12.2387 14.4936 12.088C14.1119 11.9282 13.7355 11.8332 13.3194 11.8766C12.9032 11.92 12.5545 12.0906 12.2141 12.3257C11.8931 12.5474 11.5357 12.8585 11.111 13.2283L8.97846 15.0848C6.56267 13.611 4.38855 11.4359 2.91618 9.02257L4.77273 6.89005C5.14248 6.46536 5.45365 6.10797 5.67532 5.78698C5.91047 5.44649 6.08101 5.0978 6.12441 4.68166C6.1678 4.26553 6.07287 3.88915 5.91303 3.50747C5.76236 3.14766 5.53163 2.73376 5.25746 2.24192L5.25745 2.24191L4.51311 0.906545ZM12.8148 16.6413C11.9601 16.4689 11.1147 16.2075 10.1427 15.7286L11.9059 14.1936C12.3633 13.7954 12.668 13.5313 12.9244 13.3543C13.1677 13.1862 13.3167 13.1337 13.449 13.1199C13.5814 13.1061 13.7379 13.1267 14.0107 13.241C14.2981 13.3613 14.6508 13.5569 15.1805 13.8521L16.4859 14.5798C16.6449 14.6684 16.6927 14.7659 16.7044 14.8229C16.7152 14.875 16.7145 14.9803 16.5915 15.1312C15.655 16.2801 14.2281 16.9264 12.8148 16.6413ZM3.80745 6.09513L2.27246 7.85829C1.79352 6.88632 1.53212 6.04092 1.35971 5.18627C1.0746 3.77289 1.72089 2.34601 2.86987 1.40954C3.02073 1.28658 3.12604 1.28583 3.17813 1.29659C3.23514 1.30838 3.33262 1.3561 3.42127 1.51514L4.14892 2.82057C4.44418 3.35027 4.6397 3.70291 4.76005 3.9903C4.87429 4.2631 4.89495 4.41965 4.88115 4.55201C4.86734 4.68438 4.81483 4.83329 4.64676 5.07665C4.46971 5.33303 4.20564 5.63774 3.80745 6.09513Z" fill="#0A50EC" />
                    </svg>
                    <a
                      href={contact.phoneHref}
                      className="hover:text-[#0A50EC] hover:underline transition-colors duration-200 text-[#252932] font-bold"
                      onClick={() => {
                        pushPhoneClickEvent({
                          location: 'NavBar',
                          page_path: typeof window !== 'undefined' ? window.location.pathname : '',
                        });
                      }}
                      style={{
                        fontFamily: "var(--font-inter)",
                      }}
                    >
                      {contact.phoneDisplay}
                    </a>
                  </div>
                </motion.div>
              </motion.nav>
            </motion.aside>
          )
        }
      </AnimatePresence >
    </>
  )
}


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"




