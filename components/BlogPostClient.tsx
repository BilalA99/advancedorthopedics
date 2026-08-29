'use client'
import React from 'react'
import Image from 'next/image'
import ConditionDetialsLanding from '@/public/ConditionDetails.jpeg'
import { ConsultationForm } from '@/components/ContactForm'
import { Input } from '@/components/ui/input'
import DoctorCard from '@/components/DoctorCard'
import BlogPostCard from '@/components/BlogPostCard'
import type { BlogFAQItem } from '@/components/BlogPostCard'
import ClinicsMap from '@/components/ClinicsMap'
import ContactUsSection from '@/components/ContactUsSection'
import RelatedPosts from '@/components/RelatedPosts'
import { GetBlogInfo } from '@/app/blogs/api/get-blog-info'
import { Badge } from '@/components/ui/badge'
import { TextAnimate } from '@/components/magicui/text-animate'
import { Calendar, User } from 'lucide-react'
import { useQuery } from '@tanstack/react-query';
import { GetBlogs } from '@/app/blogs/api/get-blogs'
import { getAspectRatioClass } from '@/lib/image-utils'

export default function BlogDetails({
  params,
}: {
  params: string
}) {
  const { data: blog_details, isLoading, error } = useQuery({
    queryKey: ['posts', params],
    queryFn: () => GetBlogInfo(params),
  });
  const { data: recentPosts, isLoading: recentPostsLoading } = useQuery({
    queryKey: ['recentPosts'],
    queryFn: () => GetBlogs(),
  });
  const faqs: BlogFAQItem[] = (() => {
    const seen = new Set<string>();
    const items = Array.isArray(blog_details?.blog_info?.faqs) ? blog_details.blog_info.faqs : [];
    const normalized: BlogFAQItem[] = [];

    items.forEach((item: any) => {
      const question = typeof item?.question === 'string' ? item.question.trim() : '';
      const rawAnswer = typeof item?.answer === 'string' ? item.answer : '';
      const answer = rawAnswer.trim();

      if (!question || !answer) return;

      const key = `${question.toLowerCase()}|${answer.toLowerCase()}`;
      if (seen.has(key)) return;
      seen.add(key);

      normalized.push({
        question,
        answer: rawAnswer,
      });
    });

    return normalized;
  })();

  if (isLoading) {
    return (
      <main className="w-full h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <h2 className="text-xl font-medium text-gray-600">Loading blog details...</h2>
        </div>
      </main>
    )
  }

  if (error || !blog_details) {
    return (
      <main className="w-full h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-2xl font-bold text-red-600">{error?.message || 'Blog not found or might have been deleted'}</h2>
          <p className="text-gray-600">Please check the URL or try again later</p>
        </div>
      </main>
    )
  }
  const renderRichText = (text: string) => {
    if (!text) return null;

    // Create a temporary div to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = text;

    const processNode = (node: Node, key: string): React.ReactNode => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent;
      }

      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        const tagName = element.tagName.toLowerCase();
        const children = Array.from(element.childNodes).map((child, index) =>
          processNode(child, `${key}-${index}`)
        );

        // Handle different HTML elements
        switch (tagName) {
          case 'a':
            const href = element.getAttribute('href') || '';
            const linkText = element.textContent || '';
            return (
              <a
                key={key}
                href={href}
                className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#2563eb' }}
              >
                {linkText}
              </a>
            );

          case 'strong':
          case 'b':
            return (
              <strong key={key} className="font-bold">
                {children}
              </strong>
            );

          case 'em':
          case 'i':
            return (
              <em key={key} className="italic">
                {children}
              </em>
            );

          case 'u':
            return (
              <u key={key} className="underline">
                {children}
              </u>
            );

          case 'br':
            return <br key={key} />;

          case 'p':
            return (
              <p key={key} className="mb-4">
                {children}
              </p>
            );

          case 'h1':
            return (
              <h2 key={key} className="text-3xl font-bold mb-4 text-[#252932]">
                {children}
              </h2>
            );

          case 'h2':
            return (
              <h2 key={key} className="text-2xl font-bold mb-3 text-[#252932]">
                {children}
              </h2>
            );

          case 'h3':
            return (
              <h3 key={key} className="text-xl font-bold mb-2 text-[#252932]">
                {children}
              </h3>
            );

          case 'h4':
            return (
              <h4 key={key} className="text-lg font-bold mb-2 text-[#252932]">
                {children}
              </h4>
            );

          case 'ul':
            return (
              <ul key={key} className="list-disc ml-6  mb-4 space-y-1">
                {children}
              </ul>
            );

          case 'ol':
            return (
              <ol key={key} className="list-decimal ml-6 mx-auto  mb-4 space-y-1">
                {children}
              </ol>
            );

          case 'li':
            return (
              <li key={key}>
                {children}
              </li>
            );

          case 'blockquote':
            return (
              <blockquote key={key} className="border-l-4 border-blue-500 pl-4 italic bg-gray-50 py-2 mb-4">
                {children}
              </blockquote>
            );

          case 'code':
            return (
              <code key={key} className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                {children}
              </code>
            );

          case 'pre':
            return (
              <pre key={key} className="bg-gray-100 p-4 rounded overflow-x-auto text-sm font-mono mb-4">
                {children}
              </pre>
            );

          case 'mark':
            return (
              <mark key={key} className="bg-yellow-200 px-1 rounded">
                {children}
              </mark>
            );

          case 'small':
            return (
              <small key={key} className="text-sm text-gray-600">
                {children}
              </small>
            );

          case 'sub':
            return <sub key={key}>{children}</sub>;

          case 'sup':
            return <sup key={key}>{children}</sup>;

          case 'del':
            return (
              <del key={key} className="line-through text-gray-500">
                {children}
              </del>
            );

          case 'ins':
            return (
              <ins key={key} className="underline">
                {children}
              </ins>
            );

          case 'span':
            // Handle span with custom styles
            const style = element.getAttribute('style');
            const className = element.getAttribute('class');
            return (
              <span key={key} style={style ? { ...parseInlineStyles(style) } : undefined} className={className || undefined}>
                {children}
              </span>
            );

          case 'div':
            // Handle div with custom styles
            const divStyle = element.getAttribute('style');
            const divClassName = element.getAttribute('class');
            return (
              <div key={key} style={divStyle ? { ...parseInlineStyles(divStyle) } : undefined} className={divClassName || undefined}>
                {children}
              </div>
            );

          default:
            // For any other tags, render as a span with the tag's content
            return (
              <span key={key}>
                {children}
              </span>
            );
        }
      }

      return null;
    };

    // Helper function to parse inline styles
    const parseInlineStyles = (styleString: string): React.CSSProperties => {
      const styles: React.CSSProperties = {};
      const stylePairs = styleString.split(';');

      stylePairs.forEach(pair => {
        const [property, value] = pair.split(':').map(s => s.trim());
        if (property && value) {
          // Convert CSS property names to camelCase
          const camelProperty = property.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
          (styles as any)[camelProperty] = value;
        }
      });

      return styles;
    };

    // Process all child nodes
    const processedNodes = Array.from(tempDiv.childNodes).map((node, index) =>
      processNode(node, `node-${index}`)
    );

    return <>{processedNodes}</>;
  }
  console.log(recentPosts)
  return (
    <main className='w-full flex flex-col items-center justify-center bg-white h-full'>
      {/* Landing */}
      <section className="w-full h-full flex flex-col relative overflow-hidden [mask-composite:intersect] [mask-image:linear-gradient(to_top,transparent,black_6rem)]" >
        <div
          style={{
            filter: 'blur(30px)'
          }}
          className="w-full h-[120px] absolute top-0 z-[1]"
        />
        <Image
          src={blog_details?.blog_info?.img || '/herosectionimg.jpg'}
          priority={true}
          fetchPriority="high"
          layout='fill'
          className="h-full absolute top-0 object-cover object-center md:object-center w-full"
          alt={`Expert orthopedic insights from Mountain Spine & Orthopedics - ${blog_details?.blog_info?.title}`}
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
        {/* <div
        className="lg:w-[100%] z-[1] h-full absolute left-0 top-0 md:w-[85%] w-full"
        style={{
          background: '#5FBBEC',
        }}
      /> */}
        <div className="z-[1] flex flex-col w-full h-full text-center relative sm:pt-60 sm:pb-20 pt-30 pb-0">
          <div className='px-6 xl:px-[80px] z-[2] w-full flex flex-col items-center justify-center'>
            <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-[18px] px-6 md:px-12 py-8 flex flex-col items-center justify-center shadow-[0_18px_55px_rgba(12,20,46,0.12)] max-w-5xl w-full space-y-4">
            <nav aria-label="Breadcrumb" className="xl:flex hidden bg-white/55 rounded-full px-4 py-2 w-fit">
              <ol className="flex space-x-2 text-[#252932]">
                <li><a href="/blogs">Blogs</a> /</li>
                <li aria-current="page">{blog_details?.blog_info.title}</li>
              </ol>
            </nav>
            <TextAnimate as="h1" by='word' style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }} className="text-[#1C2340] text-2xl md:text-5xl lg:text-6xl w-full text-center">{blog_details?.blog_info.title}</TextAnimate>
            <p style={{ fontWeight: 400, lineHeight: "150%" }} className="text-[#394257] md:text-lg text-base w-full text-center">{blog_details?.blog_info.desc}</p>
            <div className="flex flex-wrap gap-2 mt-2 justify-center">
              {blog_details?.blog_info.tags.map((tag: string, index: number) => (
                <span key={index} className="bg-[#f3f6ff] text-[#1C2340] px-3 py-1 rounded-full text-sm border border-[#d9e2ff]">{tag}</span>
              ))}
            </div>
            <div className="flex items-center gap-6 mt-4 text-sm text-[#1C2340] flex-wrap justify-center">
              {blog_details?.blog_info.author && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{blog_details?.blog_info.author}</span>
                </div>
              )}
              {blog_details?.blog_info.date && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(blog_details?.blog_info.date).toLocaleDateString()}</span>
                </div>
              )}
            </div>
            </div>
          </div>
        </div>
      </section>
      <main className='max-w-[1440px] w-full h-full flex lg:flex-row flex-col relative overflow-hidden px-6 xl:px-[80px] py-[50px] space-x-[60px]'>
        <article className='lg:w-[70%] w-full flex flex-col space-y-[60px] rounded-[24px]'>
          {blog_details?.blog_info.blog_info.map((section: any, idx: number) => (
            <section key={idx} className="mb-8">
              <h2 style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }} className='text-[#111315] text-3xl mb-2'>{section.header}</h2>
              {section.img && (
                <div className={`w-full relative rounded-2xl overflow-hidden mb-6 ${getAspectRatioClass(section.imgRatio)}`}>
                  {section.imgRatio === 'original' ? (
                    <Image 
                      src={section.img} 
                      alt={section.header || ''} 
                      width={0}
                      height={0}
                      sizes="100vw"
                      className='w-full h-auto object-contain'
                    />
                  ) : (
                    <Image 
                      src={section.img} 
                      alt={section.header || ''} 
                      fill 
                      className='object-cover object-center' 
                    />
                  )}
                </div>
              )}
              <div className='text-[#424959] text-lg mb-4'>{renderRichText(section.body)}</div>
              {section.sub_stories && section.sub_stories.length > 0 && (
                <div className="space-y-4">
                  {section.sub_stories.map((sub: any, subIdx: number) => (
                    <div key={subIdx} className="ml-4">
                      {sub.img && (
                        <div className={`w-full relative rounded-2xl overflow-hidden mb-6 ${getAspectRatioClass(sub.imgRatio)}`}>
                          {sub.imgRatio === 'original' ? (
                            <Image 
                              src={sub.img} 
                              alt={sub.header || ''} 
                              width={0}
                              height={0}
                              sizes="100vw"
                              className='w-full h-auto object-contain'
                            />
                          ) : (
                            <Image 
                              src={sub.img} 
                              alt={sub.header || ''} 
                              fill 
                              className='object-cover object-center' 
                            />
                          )}
                        </div>
                      )}
                      <h3 style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }} className='text-[#252932] text-xl mb-1'>{sub.header}</h3>
                      <div className='text-[#424959] ml-2 border-l-2 border-gray-200 pl-6 mb-8 text-base'>{renderRichText(sub.body)}</div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
          {faqs.length > 0 && (
            <section 
              className="rounded-[24px] border border-blue-100 bg-blue-50/60 px-4 sm:px-6 py-6 sm:py-8 shadow-sm"
            >
              <div className="flex flex-col gap-2 mb-6 sm:mb-8">
                <h2 
                  style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }} 
                  className="text-[#111315] text-2xl sm:text-3xl"
                >
                  Frequently Asked Questions
                </h2>
                <p className="text-sm sm:text-base text-[#394257]">
                  Answers to the most common patient questions about this topic.
                </p>
              </div>
              <div className="space-y-4 sm:space-y-6">
                {faqs.map((faq, index) => {
                  const answerId = `faq-answer-${index}`;
                  const questionId = `faq-question-${index}`;
                  const answerContent = renderRichText(faq.answer);

                  return (
                    <article
                      key={`${faq.question}-${index}`}
                      className="rounded-2xl border border-blue-100 bg-white/95 shadow-sm transition-shadow duration-200 hover:shadow-md"
                    >
                      <div className="px-4 sm:px-6 py-4 sm:py-5">
                        <h3 
                          id={questionId}
                          className="text-base sm:text-lg font-semibold text-[#1C2340] mb-3 sm:mb-4"
                        >
                          {faq.question}
                        </h3>
                        <div
                          id={answerId}
                          className="text-sm sm:text-base leading-relaxed text-[#424959] space-y-2"
                        >
                          <div>
                            {answerContent}
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          )}
        </article>
        <aside className='lg:w-[30%] w-full flex flex-col space-y-8'>
          <h2 className='text-[#252932] text-2xl font-bold mb-4'>Recent Posts</h2>
          <div className='grid grid-cols-1 gap-4'>
            {
              recentPosts?.slice(0, 3).map((post) => (
                <BlogPostCard
                  key={post.id}
                  BlogInfo={post.blog_info}
                  backgroundcolor='white'
                  id={post.id}
                  slug={post.slug}
                />
              ))}
          </div>
        </aside>
      </main>

      {/* Related Posts */}
      <section className='max-w-[1440px] w-full px-6 xl:px-[80px] py-8'>
        <RelatedPosts
          currentSlug={params}
          currentTags={blog_details?.blog_info.tags || []}
        />
      </section>

      <ContactUsSection />
    </main>
  )
}
