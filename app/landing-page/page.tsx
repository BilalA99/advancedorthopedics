import type React from "react"
import Image from "next/image"
import { OrthoButton } from "./components/ortho-button"
import {
    OrthoCard,
    OrthoCardContent,
    OrthoCardDescription,
    OrthoCardHeader,
    OrthoCardTitle,
} from "./components/ortho-card"

import { Badge } from "@/components/ui/badge"
import {
    Phone,
    MapPin,
    Clock,
    Star,
    Award,
    Users,
    Heart,
    Shield,
    Stethoscope,
    Activity,
    Calendar,
    ArrowRight,
    CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { DoctorContactForm } from "@/components/DoctorContactForm"
import Testimonials from "./components/Testimonials"
import { getVisibleReviews } from "@/lib/providers/providerVisibility"
import { homepageGoogleReviews } from "@/components/data/socialProofReviews"
import { LOCATION_HOURS_DISPLAY } from "@/lib/locationConstants"
import { clinics } from "@/components/data/clinics"
import BookAnAppoitmentButton from "@/components/BookAnAppoitmentButton"
import { PhoneTextLink } from "@/components/PhoneTextLink"
const HomePage = () => {

    return (
        <div className="min-h-screen">

            {/* Hero Section */}
            <section className="w-full h-full  flex flex-col relative overflow-hidden [mask-composite:intersect] [mask-image:linear-gradient(to_top,transparent,black_6rem)]">
                <div className="sm:py-26 py-10">
                    <div
                        style={{
                            filter: 'blur(30px)'
                        }}
                        className="w-full h-[120px] absolute top-0 z-[1]"
                    />
                    <Image
                        src={'/herosectionimg.jpg'}
                        priority={true}
                        fetchPriority="high"
                        layout='fill'
                        className="h-full absolute top-0 object-cover object-center md:object-center w-full"
                        alt="Advanced Orthopedic Care"
                    />
                    <div
                        className="lg:w-[100%] z-[1] h-full absolute left-0 top-0 md:w-[100%] w-full"
                        style={{
                            background: 'linear-gradient(180deg, rgba(10, 80, 236, 0.20) 0%, rgba(255, 255, 255, 0.20) 100%)',
                        }}
                    />
                    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-[60px] z-10 relative">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                                        <Award className="w-3 h-3 mr-1" />
                                        Orthopedic Care Across Florida
                                    </Badge>
                                    <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight text-balance">
                                        Advanced Orthopedic Care for Your <span className="text-primary">Active Life</span>
                                    </h1>
                                    <p className="text-xl text-gray-600 leading-relaxed text-pretty">
                                        Orthopedic evaluation and treatment by board-certified specialists. From sports injuries to joint replacement, we help you return to the activities you enjoy.
                                    </p>
                                </div>

                                <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 items-center">
                                    <BookAnAppoitmentButton />
                                    <PhoneTextLink 
                                        trackLocation="LandingPageHero"
                                        className="justify-center sm:justify-start"
                                    />
                                </div>

                                <div className="flex items-center gap-8 pt-4">
                                    <div className="flex items-center gap-2">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3, 4].map((i) => (
                                                <div
                                                    key={i}
                                                    className="w-8 h-8 rounded-full bg-primary/10 border-2 border-white flex items-center justify-center"
                                                >
                                                    <Heart className="w-4 h-4 text-primary" />
                                                </div>
                                            ))}
                                        </div>
                                        <span className="text-sm text-gray-600">Trusted by patients across Florida</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                        <span className="text-sm text-gray-600 ml-2">5/5 rating</span>
                                    </div>
                                </div>
                            </div>

                            <div className="relative">
                                <DoctorContactForm backgroundcolor="white" />
                                {/* <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full opacity-20 animate-pulse delay-1000"></div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Emergency Alert */}
            {/* <section className="py-4 bg-medical-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <OrthoAlert variant="info" className="border-medical-blue-400 bg-medical-blue-500 text-white">
            <strong>24/7 Emergency Care:</strong> For urgent orthopedic injuries, call our emergency line at (555)
            911-BONE or visit our ER partners.
          </OrthoAlert>
        </div>
      </section> */}


            {/* Testimonials */}
            <Testimonials reviews={getVisibleReviews(homepageGoogleReviews)} />

            {/* Services Overview */}
            <section className="py-20 bg-pure-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-3xl lg:text-4xl font-serif font-bold text-trust-navy-900">
                            Comprehensive Orthopedic Services
                        </h2>
                        <p className="text-lg text-warm-gray-600 max-w-3xl mx-auto text-pretty">
                            From diagnosis to recovery, our specialized treatments cover the full spectrum of musculoskeletal care.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Activity,
                                title: "Sports Medicine",
                                description: "Advanced treatment for athletic injuries and performance optimization.",
                                features: ["ACL Reconstruction", "Rotator Cuff Repair", "Meniscus Repair"],
                            },
                            {
                                icon: Shield,
                                title: "Joint Replacement",
                                description: "Hip, knee, and shoulder replacement options.",
                                features: ["Minimally invasive approaches when appropriate", "Recovery pathways designed to support faster return to activity", "Custom Implants"],
                            },
                            {
                                icon: Stethoscope,
                                title: "Spine Care",
                                description: "Comprehensive spine treatment from conservative care to surgery.",
                                features: ["Disc Replacement", "Spinal Fusion", "Non-surgical and surgical options for spine-related pain"],
                            },
                            {
                                icon: Heart,
                                title: "Trauma Care",
                                description: "Expert treatment for fractures and orthopedic emergencies.",
                                features: ["Urgent orthopedic injuries", "Complex Fracture Repair", "Polytrauma Management"],
                            },
                            {
                                icon: Users,
                                title: " PediatricOrthopedics",
                                description: "Specialized care for growing bones and developing bodies.",
                                features: ["Growth Plate Injuries", "Scoliosis Treatment", "Congenital Conditions"],
                            },
                            {
                                icon: Award,
                                title: "Hand, Wrist & Elbow",
                                description: "Microsurgical expertise for complex hand, wrist, and elbow conditions.",
                                features: ["Carpal Tunnel Surgery", "Tennis Elbow Treatment", "Nerve Reconstruction"],
                            },
                        ].map((service, index) => (
                            <Link href="https://mountainspineorthopedics.com/conditions" key={index}>
                                <OrthoCard className="group hover:shadow-xl transition-all duration-300">
                                    <OrthoCardHeader>
                                        <div className="w-12 h-12 bg-medical-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-medical-blue-200 transition-colors">
                                            <service.icon className="w-6 h-6 text-medical-blue-600" />
                                        </div>
                                        <OrthoCardTitle>{service.title}</OrthoCardTitle>
                                        <OrthoCardDescription>{service.description}</OrthoCardDescription>
                                    </OrthoCardHeader>
                                    <OrthoCardContent>
                                        <ul className="space-y-2">
                                            {service.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-center text-sm text-warm-gray-600">
                                                    <CheckCircle className="w-4 h-4 text-healing-green-500 mr-2 flex-shrink-0" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                        <div
                                            // href="https://www.mountainspineorthopedics.com/conditions"
                                            className="inline-flex items-center text-medical-blue-600 hover:text-medical-blue-700 text-sm font-medium mt-4 group"
                                        >
                                            Learn More About Orthopedic Conditions
                                            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </OrthoCardContent>
                                </OrthoCard>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>


            {/* Why Choose Us */}
            <section className="py-20 bg-warm-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-3xl lg:text-4xl font-serif font-bold text-trust-navy-900">
                                    Why Patients Choose Mountain Spine & Orthopedics
                                </h2>
                                <p className="text-lg text-warm-gray-700 leading-relaxed">
                                    Our commitment to excellence, innovation, and patient-centered care provides high-quality orthopedic care for patients across Florida.
                                </p>
                            </div>

                            <div className="space-y-6">
                                {[
                                    {
                                        title: "Board-Certified Specialists",
                                        description:
                                            "Our team includes fellowship-trained surgeons with expertise in every orthopedic subspecialty.",
                                    },
                                    {
                                        title: "Advanced Technology",
                                        description:
                                            "Imaging and surgical technologies appropriate to your condition",
                                    },
                                    {
                                        title: "Personalized Treatment Plans",
                                        description:
                                            "Every patient receives a customized care plan tailored to their specific needs and goals.",
                                    },
                                    {
                                        title: "Comprehensive Rehabilitation",
                                        description: "Expert guidance and referral to trusted rehabilitation specialists for complete recovery.",
                                    },
                                ].map((item, index) => (
                                    <div key={index} className="flex gap-4 items-center justify-center">
                                        <div className="flex-shrink-0">
                                            <Image src="/bluemountainspinelogo2.png" alt="Check Circle" width={40} height={40} />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="font-semibold text-trust-navy-900">{item.title}</h3>
                                            <p className="text-warm-gray-600 text-sm leading-relaxed">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-6">
                                <div className="bg-pure-white p-6 rounded-xl shadow-md text-center">
                                    <div className="text-3xl font-bold text-medical-blue-600 mb-2">25+</div>
                                    <div className="text-sm text-warm-gray-600">years serving Florida</div>
                                </div>
                                <div className="bg-pure-white p-6 rounded-xl shadow-md text-center">
                                    <div className="text-3xl font-bold text-healing-green-600 mb-2">High</div>
                                    <div className="text-sm text-warm-gray-600">patient satisfaction</div>
                                </div>
                            </div>
                            <div className="space-y-6 pt-8">
                                <div className="bg-pure-white p-6 rounded-xl shadow-md text-center">
                                    <div className="text-3xl font-bold text-medical-blue-600 mb-2">Team of</div>
                                    <div className="text-sm text-warm-gray-600">fellowship-trained specialists</div>
                                </div>
                                <div className="bg-pure-white p-6 rounded-xl shadow-md text-center">
                                    <div className="text-3xl font-bold text-healing-green-600 mb-2">10</div>
                                    <div className="text-sm text-warm-gray-600">Convenient Locations</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Locations */}
            <section className="py-20 bg-pure-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-3xl lg:text-4xl font-serif font-bold text-trust-navy-900">
                            Convenient Locations Throughout Florida
                        </h2>
                        <p className="text-lg text-warm-gray-600 max-w-3xl mx-auto">
                            Find expert orthopedic care close to home with our network of modern facilities.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {clinics.map((location, index) => (
                            // {
                            //   name: "Miami Beach",
                            //   address: "1234 Ocean Drive, Miami Beach, FL 33139",
                            //   phone: "(561) 223-9959",
                            //   hours: "Mon-Fri: 8AM-6PM",
                            // },
                            // {
                            //   name: "Fort Lauderdale",
                            //   address: "5678 Las Olas Blvd, Fort Lauderdale, FL 33301",
                            //   phone: "(555) 234-5678",
                            //   hours: "Mon-Fri: 7AM-7PM",
                            // },
                            // {
                            //   name: "West Palm Beach",
                            //   address: "9012 Clematis Street, West Palm Beach, FL 33401",
                            //   phone: "(555) 345-6789",
                            //   hours: "Mon-Fri: 8AM-5PM",
                            // },

                            <Link href={`https://mountainspineorthopedics.com/locations`} key={index}>
                                <OrthoCard key={index} className="hover:shadow-lg transition-shadow">
                                    <OrthoCardHeader>
                                        <OrthoCardTitle className="flex items-center gap-2">
                                            {/* <MapPin className="w-5 h-5 text-medical-blue-600" /> */}
                                            {location.name}
                                        </OrthoCardTitle>
                                    </OrthoCardHeader>
                                    <OrthoCardContent className="space-y-3">
                                        <p className="text-sm text-warm-gray-600">{location.address}</p>
                                        <div className="flex items-center gap-2 text-sm text-warm-gray-600">
                                            <Phone className="w-4 h-4" />
                                            {location.phone}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-warm-gray-600">
                                            <Clock className="w-4 h-4" />
                                            Hours: {LOCATION_HOURS_DISPLAY}
                                        </div>
                                        <OrthoButton variant="outline" size="sm" className="w-full mt-4">
                                            Get Directions
                                        </OrthoButton>
                                    </OrthoCardContent>
                                </OrthoCard>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-medical-blue-600 to-medical-blue-700">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white text-balance">
                                Ready to Start Your Recovery Journey?
                            </h2>
                            <p className="text-lg text-medical-blue-100 leading-relaxed text-pretty">
                                Don't let pain hold you back. Schedule your consultation today and take the first step toward getting
                                back to your active lifestyle.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            {/* <Link href="https://www.mountainspineorthopedics.com">
                                <OrthoButton
                                    size="lg"
                                    variant="secondary"
                                    className="bg-white text-medical-blue-600 w-full hover:bg-warm-gray-50"
                                >
                                    <Calendar className="w-5 h-5 mr-2" />
                                    Book Your Appointment
                                </OrthoButton>
                            </Link> */}
                            <BookAnAppoitmentButton className="w-1/3"/>
                            <PhoneTextLink 
                                trackLocation="LandingPageCTA"
                                textColor="text-white"
                                iconColor="#FFFFFF"
                                className="justify-center"
                            />
                        </div>

                        <p className="text-sm text-medical-blue-200">
                            We accept many insurance plans · Same-day appointments often available · Telehealth visits available for eligible cases
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}

        </div>
    )
}

export default HomePage