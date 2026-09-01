import React from 'react';
import Image, { StaticImageData } from 'next/image'
import DoctorsAvatar from './ui/doctorsavatar'
import Logo from '../public/newlogo4.png'
import Link from 'next/link'
import { ConditionInfoProp } from '@/types/content'
import { conditionThumbnailBySlug } from '@/lib/seo/condition-images';
import { resolveConditionSlugHref } from '@/lib/internal-link-redirects';

function truncateString(str: string, maxLength = 125) {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
}

export default function ConditionCard({ ConditionInfo, showFeaturedDoctor }: { ConditionInfo: ConditionInfoProp; showFeaturedDoctor: boolean }) {
  // Check if ConditionInfo.card_img is a valid image source (string or static import object)
  const imageSource = ConditionInfo?.card_img ? ConditionInfo?.card_img : Logo;
  
  // Get SEO metadata from mapping if available
  const seoMetadata = typeof imageSource === 'string' ? conditionThumbnailBySlug[ConditionInfo.slug] : null;
  const imageAlt = seoMetadata?.alt || `Treatment for ${ConditionInfo.title} at Mountain Spine & Orthopedics`;
  const imageTitle = seoMetadata?.title || `${ConditionInfo.title} | Mountain Spine & Orthopedics`;

  return (
    <Link className="bg-white flex flex-col p-4 rounded-[24px] space-y-[32px]" href={resolveConditionSlugHref(ConditionInfo.slug)}>
      <div>
        <div className="w-full max-h-[240px] h-full object-cover rounded-[24px] lg:h-[240px] bg-[#FAFAFA] items-center justify-center flex overflow-hidden">
          <Image 
            src={imageSource} 
            width={240} 
            height={240} 
            layout="cover" 
            alt={imageAlt}
            title={imageTitle}
            className="w-full h-full object-cover aspect-video object-center" 
          />
        </div>
      </div>
      <div className="flex flex-col space-y-[16px]">
        <div className='flex flex-col space-y-[8px]'>
          <h3
            style={{
              fontFamily: "var(--font-public-sans)",
              fontWeight: 500, color: '#252932',
            }}
            className="text-xl"
          >{ConditionInfo.title}</h3>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 500, color: '#424959',
            }}
            className="text-md overflow-ellipsis"
          >
            {truncateString(ConditionInfo.body)}
          </p>
        </div>
        <div className='bg-[#DCDEE1] h-[1px] w-full' />
        <div className='flex flex-row w-full space-x-[16px] items-center'>
          <DoctorsAvatar tag={ConditionInfo.tag} condition={ConditionInfo.title} showFeaturedDoctor={showFeaturedDoctor} />
          <span
            style={{
              fontFamily: "var(--font-public-sans)",
              fontWeight: 400,
              color: '#424959',
            }}
          >
            {ConditionInfo.tag === 'Foot' || ConditionInfo.tag === 'Ankle' ? '2 Specialist Doctors' : ConditionInfo.title.includes('Injections') ? '5 Specialist Doctors' : '4 Specialist Doctors'}
          </span>
        </div>
        <button className="bg-white border hover:cursor-pointer border-[#252932] px-[20px] py-[10px] space-x-[10px] flex flex-row items-center justify-center rounded-[62px] w-full">
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 400,
            }}
            className="text-[#252932]"
          >View details</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="11" viewBox="0 0 18 11" fill="none">
            <path d="M12.3982 0.268483C12.0402 -0.0894963 11.4598 -0.089494 11.1018 0.268488C10.7438 0.62647 10.7438 1.20687 11.1018 1.56485L14.1203 4.58333H1.66667C1.16041 4.58333 0.75 4.99374 0.75 5.5C0.75 6.00626 1.16041 6.41667 1.66667 6.41667H14.1203L11.1018 9.43516C10.7439 9.79314 10.7439 10.3735 11.1019 10.7315C11.4598 11.0895 12.0402 11.0895 12.3982 10.7315L16.9766 6.15303C16.9935 6.13637 17.0098 6.11905 17.0254 6.10112C17.0873 6.02997 17.1365 5.95154 17.1728 5.86885C17.2221 5.75677 17.2496 5.63294 17.25 5.50273L17.25 5.5C17.25 5.49717 17.25 5.49434 17.25 5.49152C17.2489 5.37622 17.2266 5.26602 17.1867 5.16463C17.142 5.05068 17.0736 4.94387 16.9815 4.85178L12.3982 0.268483Z" fill="#252932" />
          </svg>
        </button>
      </div>
    </Link>
  )
}
