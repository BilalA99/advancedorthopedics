'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { conditions } from '@/components/data/conditions';
import ConditionCard from '@/components/ConditionCard';
import BodyPartTabs from '@/components/BodyPartTabs';
import ConditionsSearchBar from '@/components/ConditionsSearchBar';
import RatingsAndReviews from '@/components/RatingsAndReviews';
import type { SocialProofReview } from '@/components/data/socialProofReviews';
import { TextAnimate } from '@/components/magicui/text-animate';
import { MultiSelect } from '@/components/ui/multi-select';
import { useSearchParams } from 'next/navigation';
import type { ConditionInfoProp } from '@/types/content';
import { BicepsFlexed, Bone, Footprints, Hand, User, TorusIcon, TextCursorInputIcon } from 'lucide-react';

const ITEMS_PER_PAGE = 9;

const filterCategories = [
  { value: 'Neck', label: 'Neck', icon: User },
  { value: 'Shoulder', label: 'Shoulder', icon: BicepsFlexed },
  { value: 'Spine', label: 'Spine', icon: Bone },
  { value: 'Lower Spine', label: 'Lower Spine', icon: TorusIcon },
  { value: 'Knee', label: 'Knee', icon: TextCursorInputIcon },
  { value: 'Foot', label: 'Foot & Ankle', icon: Footprints },
  { value: 'Hand', label: 'Hand, Wrist & Elbow', icon: Hand },
  { value: 'Hip', label: 'Hip', icon: User },
  { value: 'Other', label: 'Other', icon: Bone },
];

function filterByTag(items: ConditionInfoProp[], tags: string[]) {
  if (tags.length === 0) return items;
  return items.filter((item) => item.tag && tags.includes(item.tag));
}

export default function ConditionsHubClient({ reviews, showFeaturedDoctor }: { reviews: SocialProofReview[]; showFeaturedDoctor: boolean }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [allData] = useState<ConditionInfoProp[]>(conditions);
  const [filteredData, setFilteredData] = useState<ConditionInfoProp[]>(conditions);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const paginationRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedFilters([categoryParam]);
      const section = document.getElementById('conditions-section');
      if (section) section.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }, [searchParams]);

  const categoryParam = () => {
    const categoryParamVal = searchParams.get('category');
    return categoryParamVal ? [categoryParamVal] : [];
  };

  useEffect(() => {
    const next = filterByTag(allData, selectedFilters);
    setFilteredData(next);
    setCurrentPage(1);
  }, [selectedFilters, allData]);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const handleSelectCondition = (selected: ConditionInfoProp) => {
    setFilteredData([selected]);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setFilteredData(allData);
    setCurrentPage(1);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    if (paginationRef.current && !isInitialMount.current) {
      paginationRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    isInitialMount.current = false;
  }, [currentPage]);

  const renderPageNumbers = () => {
    if (totalPages <= 1) return null;
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`h-[40px] w-[40px] flex items-center justify-center hover:cursor-pointer ${
            i === currentPage ? 'rounded-full bg-[#FAFAFA] text-[#252932]' : 'text-[#424959]'
          }`}
        >
          <span style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }} className="text-lg">
            {i}
          </span>
        </button>
      );
    }
    return pages;
  };

  return (
    <main className="w-full flex flex-col items-center justify-center bg-white h-full">
      {/* Hero */}
      <section className="w-full min-h-[180px] sm:min-h-[260px] lg:min-h-[320px] flex flex-col relative overflow-hidden [mask-composite:intersect] [mask-image:linear-gradient(to_top,transparent,black_4rem)] sm:[mask-image:linear-gradient(to_top,transparent,black_6rem)]">
        <div style={{ filter: 'blur(30px)' }} className="w-full h-[80px] sm:h-[120px] absolute top-0 z-[1]" />
        <Image
          src="/herosectionimg.jpg"
          priority
          fetchPriority="high"
          fill
          className="h-full absolute top-0 object-cover object-center w-full"
          alt="Orthopedic specialist consulting with patient about conditions at Mountain Spine & Orthopedics"
          sizes="100vw"
        />
        <div
          className="w-full z-[1] h-full absolute left-0 top-0"
          style={{
            background: 'linear-gradient(180deg, rgba(10, 80, 236, 0.20) 0%, rgba(255, 255, 255, 0.20) 100%)',
          }}
        />
        <div className="z-[1] flex flex-col w-full h-full text-left relative pt-20 pb-6 sm:pt-36 sm:pb-12 lg:pt-48 lg:pb-16">
          <div className="px-4 sm:px-6 xl:px-[80px] z-[2] flex flex-row items-center justify-center w-full">
            <TextAnimate
              as="h1"
              animation="blurInUp"
              by="word"
              once
              style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 400 }}
              className="text-[#252932] text-2xl sm:text-4xl lg:text-5xl xl:text-6xl text-center leading-tight"
            >
              Orthopedic Conditions & Treatments
            </TextAnimate>
          </div>
          <div className="z-[2] px-4 sm:px-6 xl:px-[80px] mt-3 sm:mt-5 lg:w-full items-center justify-center">
            <p
              style={{ fontWeight: 400, lineHeight: '148%' }}
              className="text-shadow-sm text-[#424959] text-sm sm:text-lg lg:text-xl w-full text-center"
            >
              Explore our conditions or use the search below to find specific options.
              <br className="sm:flex hidden" /> Comprehensive care for spine, joint, and musculoskeletal conditions.
            </p>
          </div>
        </div>
      </section>

      {/* Browse by Body Part */}
      <section className="max-w-[1440px] w-full flex flex-col py-6 sm:py-8 xl:py-10 xl:px-[80px] px-4 sm:px-6 space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div className="flex flex-col gap-1">
            <h2
              style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
              className="text-[#111315] text-xl sm:text-2xl lg:text-3xl"
            >
              Browse by Body Part
            </h2>
            <p
              style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
              className="text-[#6B7280] text-sm sm:text-base hidden sm:block"
            >
              Select a body region to explore conditions
            </p>
          </div>
        </div>
        <BodyPartTabs linkPrefix="/conditions/" />
      </section>

      {/* All Conditions – paginated list */}
      <section
        id="conditions-section"
        ref={paginationRef}
        className="max-w-[1440px] w-full flex flex-col py-8 sm:py-10 xl:py-[50px] xl:px-[80px] px-4 sm:px-6 space-y-6 scroll-mt-8"
      >
        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 lg:gap-8">
          <h2
            style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
            className="text-[#111315] text-2xl sm:text-3xl lg:text-4xl xl:text-5xl flex-shrink-0"
          >
            All Our Conditions
          </h2>

          <div className="w-full lg:w-1/2 flex flex-col lg:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <ConditionsSearchBar
                conditions={allData}
                onSelect={handleSelectCondition}
                onClear={handleClearSearch}
              />
            </div>
            <div className="w-full md:w-1/2">
              <div className="sr-only">
                <nav aria-label="Filter conditions by category">
                  {filterCategories.map((cat) => (
                    <Link key={cat.value} href={`/conditions?category=${encodeURIComponent(cat.value)}`}>
                      {cat.label} Conditions
                    </Link>
                  ))}
                </nav>
              </div>
              <MultiSelect
                options={filterCategories}
                onValueChange={setSelectedFilters}
                defaultValue={categoryParam()}
                placeholder="Select Category"
                variant="inverted"
                animation={2}
                maxCount={3}
              />
            </div>
          </div>
        </div>

        <p
          style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
          className="text-[#424959] text-sm sm:text-base lg:text-lg leading-relaxed -mt-2"
        >
          Explore our comprehensive list of orthopedic and spine conditions we treat.
        </p>

        {currentItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-8 gap-6 xl:gap-8">
            {currentItems.map((item) => (
              <ConditionCard key={item.slug} ConditionInfo={item} showFeaturedDoctor={showFeaturedDoctor} />
            ))}
          </div>
        ) : (
          <div className="text-center text-[#424959] mt-10 text-lg">
            No conditions found matching your search or filters.
          </div>
        )}

        {filteredData.length > ITEMS_PER_PAGE && (
          <>
            <div className="bg-[#DCDEE1] h-[1px] w-full mt-8" />
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <button
                className="flex flex-row items-center space-x-2 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
                  <path d="M5.2929 11.7071C5.68342 12.0976 6.31659 12.0976 6.70711 11.7071C7.09763 11.3166 7.09763 10.6834 6.7071 10.2929L3.41419 7L17 7C17.5523 7 18 6.55228 18 6C18 5.44771 17.5523 5 17 5L3.41423 5L6.70707 1.7071C7.09759 1.31657 7.09759 0.683409 6.70706 0.292888C6.31653 -0.0976335 5.68337 -0.0976287 5.29285 0.292899L0.298225 5.2876C0.27977 5.30578 0.262016 5.32468 0.245012 5.34424C0.177454 5.42185 0.123865 5.50741 0.0842495 5.59762C0.0304489 5.71989 0.000417697 5.85497 3.81444e-06 5.99702L0 6C2.69961e-10 6.00309 1.3352e-05 6.00617 4.19625e-05 6.00925C0.00118257 6.13503 0.0255413 6.25525 0.0690403 6.36586C0.117815 6.49017 0.192434 6.60669 0.292896 6.70715L5.2929 11.7071Z" />
                </svg>
                <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }} className="text-[#424959]">
                  Previous
                </span>
              </button>
              <div className="flex flex-row items-center space-x-1">{renderPageNumbers()}</div>
              <button
                className="flex flex-row items-center space-x-2 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }} className="text-[#111315]">
                  Next
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
                  <path d="M12.7071 11.7071C12.3166 12.0976 11.6834 12.0976 11.2929 11.7071C10.9024 11.3166 10.9024 10.6834 11.2929 10.2929L14.5858 7L1 7C0.447716 7 0 6.55228 0 6C0 5.44771 0.447716 5 1 5L14.5858 5L11.2929 1.7071C10.9024 1.31657 10.9024 0.683409 11.2929 0.292888C11.6835 -0.0976335 12.3166 -0.0976287 12.7072 0.292899L17.7018 5.2876C17.7202 5.30578 17.738 5.32468 17.755 5.34424C17.8225 5.42185 17.8761 5.50741 17.9158 5.59762C17.9696 5.71989 17.9996 5.85497 18 5.99702L18 6C18 6.00309 18 6.00617 18 6.00925C17.9988 6.13503 17.9745 6.25525 17.931 6.36586C17.8822 6.49017 17.8076 6.60669 17.7071 6.70715L12.7071 11.7071Z" />
                </svg>
              </button>
            </div>
          </>
        )}
      </section>

      {/* CTA */}
      <section className="w-full px-4 sm:px-6 xl:px-[80px] mb-8 sm:mb-10 xl:mb-[50px]">
        <div className="max-w-[1440px] mx-auto w-full flex flex-col py-6 sm:py-10 xl:py-[50px] px-4 sm:px-6 xl:px-10 space-y-4 sm:space-y-6 bg-[#FAFAFA] rounded-2xl sm:rounded-3xl">
          <div className="flex flex-col space-y-3 sm:space-y-4 text-center">
            <h2
              style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
              className="text-[#111315] text-xl sm:text-2xl lg:text-3xl xl:text-4xl"
            >
              Ready to Get Started?
            </h2>
            <p
              style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
              className="text-[#424959] text-sm sm:text-base lg:text-lg xl:text-xl max-w-2xl mx-auto leading-relaxed"
            >
              Take the first step toward relief. Book a consultation, get a free MRI review, or request a second
              opinion from our board-certified specialists.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-4 sm:mt-6">
              <Link
                href="/find-care/book-an-appointment"
                className="w-full sm:w-auto bg-[#2358AC] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full hover:bg-[#1a4a8a] transition-all duration-200 shadow-sm hover:shadow-md text-center"
              >
                <span style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }} className="text-sm sm:text-base">
                  Book an Appointment
                </span>
              </Link>
              <Link
                href="/find-care/free-mri-review"
                className="w-full sm:w-auto bg-white border border-[#252932] text-[#252932] px-6 py-3 sm:px-8 sm:py-4 rounded-full hover:bg-white/80 transition-all duration-200 text-center"
              >
                <span style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }} className="text-sm sm:text-base">
                  Free MRI Review
                </span>
              </Link>
              <Link
                href="/find-care/second-opinion"
                className="w-full sm:w-auto bg-white border border-[#252932] text-[#252932] px-6 py-3 sm:px-8 sm:py-4 rounded-full hover:bg-white/80 transition-all duration-200 text-center"
              >
                <span style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }} className="text-sm sm:text-base">
                  Second Opinion
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ratings & Reviews Section */}
      <RatingsAndReviews reviews={reviews} />
    </main>
  );
}
