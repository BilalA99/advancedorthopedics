import React from 'react';
import Image from 'next/image';
import { Calendar, User } from 'lucide-react';
import BlogTitleAnimated from './BlogTitleAnimated';
import { PreferredSourceButton } from "@/components/PreferredSourceCTA";

interface BlogContentProps {
  blog: {
    blog_info: {
      img: string;
      title: string;
      desc: string;
      tags: string[];
      author?: string;
      date?: string;
      blog_info: Array<{
        header: string;
        body: string;
        sub_stories?: Array<{
          header: string;
          body: string;
          img?: string;
        }>;
      }>;
    };
  };
}

/**
 * Server component that renders main blog content
 * Uses dangerouslySetInnerHTML for rich text since HTML is from trusted Supabase source
 */
export default function BlogContent({ blog }: BlogContentProps) {
  const info = blog.blog_info;

  return (
    <>
      {/* Landing/Hero Section */}
      <section className="w-full h-full flex flex-col relative overflow-hidden [mask-composite:intersect] [mask-image:linear-gradient(to_top,transparent,black_6rem)]">
        <div
          style={{
            filter: 'blur(30px)'
          }}
          className="w-full h-[120px] absolute top-0 z-[1]"
        />
        <Image
          src={info.img || '/herosectionimg.jpg'}
          priority={true}
          fetchPriority="high"
          fill
          className="h-full absolute top-0 object-cover object-center md:object-center w-full"
          alt={`Expert orthopedic insights from Mountain Spine & Orthopedics - ${info.title}`}
        />
        <div
          className="lg:w-[100%] z-[1] h-full absolute left-0 top-0 md:w-[100%] w-full"
          style={{
            background: 'linear-gradient(180deg, rgba(10, 80, 236, 0.35) 0%, rgba(255, 255, 255, 0.35) 100%)',
          }}
        />
        <div
          className="lg:w-[100%] z-[1] h-full absolute left-0 top-0 md:w-[100%] w-full"
          style={{
            background: 'linear-gradient(90deg, rgba(12, 20, 46, 0.55) 0%, rgba(12, 20, 46, 0.00) 65%)',
          }}
        />
        <div
          className="lg:w-[100%] z-[1] h-full absolute left-0 top-0 md:w-[100%] w-full opacity-70"
          style={{
            background: 'linear-gradient(180deg, rgba(148, 196, 255, 0.45) 0%, rgba(255, 255, 255, 0.25) 100%)',
          }}
        />
        <div className="z-[1] flex flex-col w-full h-full text-center relative sm:pt-60 sm:pb-20 pt-30 pb-0">
          <div className='px-6 xl:px-[80px] z-[2] w-full flex flex-col items-center justify-center'>
            <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-[18px] px-6 md:px-12 py-8 flex flex-col items-center justify-center shadow-[0_18px_55px_rgba(12,20,46,0.12)] max-w-5xl w-full space-y-4">
              <nav aria-label="Breadcrumb" className="xl:flex hidden bg-white/55 rounded-full px-4 py-2 w-fit">
                <ol className="flex space-x-2 text-[#252932]">
                  <li><a href="/blogs">Blogs</a> /</li>
                  <li aria-current="page">{info.title}</li>
                </ol>
              </nav>
              <BlogTitleAnimated 
                title={info.title}
                style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }} 
                className="text-[#1C2340] text-2xl md:text-5xl lg:text-6xl w-full text-center"
              />
              <p style={{ fontWeight: 400, lineHeight: "150%" }} className="text-[#394257] md:text-lg text-base w-full text-center">{info.desc}</p>
              {/*
                Tags, then the preferred-source ask as the last item in the same
                row. The tags are pale, non-interactive pills; the button is solid
                brand blue, so the one thing here that can be clicked looks like it.

                gap-y-3 rather than gap-2 because the button is taller than a tag
                pill — with a uniform small gap the wrapped rows sit too close and
                the button crowds the pills above it.

                The row wraps, so on a narrow screen the button naturally falls onto
                its own line at full row width instead of being squeezed beside a
                tag. No breakpoint needed; the layout does it.
              */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-3 mt-2 justify-center">
                {info.tags.map((tag: string, index: number) => (
                  <span key={index} className="bg-[#f3f6ff] text-[#1C2340] px-3 py-1 rounded-full text-sm border border-[#d9e2ff]">{tag}</span>
                ))}
                {/* Separator: says "this is not another tag" without adding words.
                    Hidden under 640px, where the button is usually on its own line
                    and a floating rule would just be noise. */}
                <span aria-hidden="true" className="hidden sm:block h-5 w-px bg-[#1C2340]/20 mx-1" />
                <PreferredSourceButton compact />
              </div>
              <div className="flex items-center gap-6 mt-4 text-sm text-[#1C2340] flex-wrap justify-center">
                {info.author && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{info.author}</span>
                  </div>
                )}
                {info.date && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(info.date).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}

