"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star, ArrowRight } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Google } from "./Google"
import Link from "next/link"
import type { HomepageGoogleReview } from "@/components/data/socialProofReviews"

export default function Testimonials({ reviews }: { reviews: HomepageGoogleReview[] }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const reviewsPerPage = 2

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + reviewsPerPage >= reviews.length ? 0 : prevIndex + reviewsPerPage))
    }

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? Math.max(0, reviews.length - reviewsPerPage) : Math.max(0, prevIndex - reviewsPerPage),
        )
    }

    const goToSlide = (index: number) => {
        setCurrentIndex(index * reviewsPerPage)
    }

    const totalSlides = Math.ceil(reviews.length / reviewsPerPage)
    const currentSlide = Math.floor(currentIndex / reviewsPerPage)

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < rating ? "fill-orange-400 text-orange-400" : "fill-gray-200 text-gray-200"}`}
            />
        ))
    }

    return (
        <div className="lg:py-22 py-10 px-4 w-full h-full">
            <div className="mx-auto lg:px-20 px-4 space-y-8">
                <div>
                    <h2
                        style={{
                            fontFamily: "var(--font-reem-kufi)",
                            fontWeight: 500,
                        }}
                        className="text-black lg:text-5xl sm:text-4xl text-3xl text-left w-full"
                    >What Our Patients Say
                    </h2>
                    <div
                        style={{
                            fontFamily: "var(--font-inter)",
                            fontWeight: 400,
                        }}
                        className=" text-[#5B5F67] mt-[16px] w-full justify-between items-center flex flex-row"
                    >
                        <div className="lg:w-[45%] w-full">
                            <h2
                                className='text-lg'
                            >Our patients' experiences speak volumes about our urgent care expertise. See their stories below. Real feedback from those who trust us with their health. Hear their thoughts here.</h2>
                        </div>
                    </div>
                </div>

                <div className="lg:grid lg:grid-cols-12 flex flex-col w-full  gap-8 items-start">
                    {/* Law Firm Info - Left Side */}
                    <div className="lg:col-span-4 flex flex-col w-full">
                        <Card className="bg-white shadow-lg w-full">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-16 h-14 relative rounded-full flex items-center justify-center">
                                        <Image
                                            src={"/bluemountainspinelogo2.png"}
                                            alt="Mountain Spine & Orthopedics logo"
                                            fill
                                            className="rounded-full object-contain"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-gray-900">Mountain Spine & Orthopedics</h3>
                                        <p className="text-gray-600">Orthopedic Center</p>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-3xl font-bold text-orange-500">4.9</span>
                                        <div className="flex">{renderStars(5)}</div>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-1">Based on 87 reviews</p>
                                    <div className="flex items-center gap-1 text-sm text-gray-500">
                                        <span>powered by</span>
                                        <span className="font-semibold text-blue-600">Google</span>
                                    </div>
                                </div>

                                <Link href="https://www.google.com/search?q=mountain+spine+and+orthopedics&sourceid=chrome&ie=UTF-8" asChild>
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white rounded-full">
                                        <span className="mr-2">review us on</span>
                                        <Google />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Reviews Carousel - Right Side */}
                    <div className="lg:col-span-8 flex flex-col  relative">
                        <div className="flex lg:flex-row flex-col items-center">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={prevSlide}
                                className="absolute lg:left-0 left-20 lg:top-1/2 -bottom-5 -translate-y-1/2 text-black z-10 bg-white shadow-md hover:bg-gray-50 rounded-full"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </Button>

                            <div className="overflow-hidden mx-12 w-full">
                                <div
                                    className="flex transition-transform items-stretch flex-row duration-300 ease-in-out "
                                    style={{ transform: `translateX(-${(currentIndex / reviewsPerPage) * 100}%)` }}
                                >
                                    {Array.from({ length: totalSlides }, (_, slideIndex) => (
                                        <div key={slideIndex} className="w-full flex-shrink-0 py-1 px-1">
                                            <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
                                                {reviews.slice(slideIndex * reviewsPerPage, (slideIndex + 1) * reviewsPerPage).map((review) => (
                                                    <Card key={review.id} className="bg-white shadow-md">
                                                        <CardContent className="p-6">
                                                            <div className="flex items-center gap-3 mb-4">
                                                                <div
                                                                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                                                                    style={{
                                                                        backgroundColor: ["#4285F4", "#EA4335", "#FBBC05", "#34A853"][review.id % 4],
                                                                    }}
                                                                    aria-hidden
                                                                >
                                                                    {review.name?.charAt(0)?.toUpperCase()}
                                                                </div>
                                                                <div className="flex-1">
                                                                    <div className="flex items-center gap-2 mb-1">
                                                                        <span className="font-semibold text-blue-600 text-sm">{review.name}</span>
                                                                        <Google />
                                                                    </div>
                                                                    <p className="text-gray-500 text-xs">{review.timeAgo}</p>
                                                                </div>
                                                            </div>

                                                            <div className="flex mb-3">{renderStars(review.rating)}</div>

                                                            <p className="text-gray-700 text-sm leading-relaxed">{review.text}</p>
                                                        </CardContent>
                                                    </Card>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={nextSlide}
                                className="absolute lg:right-0 right-20 lg:top-1/2 -bottom-5 text-black  -translate-y-1/2 z-10 bg-white shadow-md hover:bg-gray-50 rounded-full"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* Pagination Dots */}
                        <div className="flex justify-center gap-2 lg:mt-8 mt-1">
                            {Array.from({ length: totalSlides }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`w-3 h-3 rounded-full transition-colors ${currentSlide === index ? "bg-blue-600" : "bg-gray-300"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}