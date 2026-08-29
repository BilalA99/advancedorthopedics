    // app/page.tsx
    import { notFound } from 'next/navigation';
    import { GetBlogInfo } from '@/app/blogs/api/get-blog-info';
    import BlogContent from '@/components/BlogContent';
    import BlogSections from '@/components/BlogSections';
    import BlogConversionModule from '@/components/BlogConversionModule';
    import BlogFAQSection from '@/components/BlogFAQSection';
    import BlogRecentPosts from '@/components/BlogRecentPosts';
    import RelatedPosts from '@/components/RelatedPosts';
    import ContactUsSection from '@/components/ContactUsSection';
    import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
    import { staticSupabase } from '@/utils/supabase/static';
    import { normalizeFAQs } from '@/lib/normalize-faqs';

    export const dynamicParams = false;

    // Helper to fetch all blog slugs from Supabase
    async function GetAllBlogSlugs() {
      const { data, error } = await staticSupabase.from('blogs').select('slug');
      if (error) {
        console.error(error);
        return [];
      }
      return (data || []).map((row: { slug: string }) => ({ BlogSlug: row.slug }));
    }

    export async function generateStaticParams() {
      return await GetAllBlogSlugs();
    }

    export default async function Page({ params }: { params: Promise<{ BlogSlug: string }> }) {
  const resolvedParams = await params;
  const blog = await GetBlogInfo(resolvedParams.BlogSlug);
  if (!blog) return notFound();

  // Normalize FAQs on server
  const faqs = normalizeFAQs(blog.blog_info?.faqs || []);

  // Prefetch for client components that need it
  const qc = new QueryClient();
  await qc.prefetchQuery({ queryKey: ['posts', resolvedParams.BlogSlug], queryFn: () => blog });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <main className='w-full flex flex-col items-center justify-center bg-white h-full'>
        {/* Server-rendered blog content (hero section) */}
        <BlogContent blog={blog} />
        
        {/* Main content area with sidebar */}
        <div className='max-w-[1440px] w-full h-full flex lg:flex-row flex-col relative overflow-hidden px-6 xl:px-[80px] py-[50px] space-x-[60px]'>
          <article className='lg:w-[70%] w-full flex flex-col space-y-[60px] rounded-[24px]'>
            {/* Server-rendered blog sections */}
            <BlogSections sections={blog.blog_info.blog_info} />
            
            {/* Server-rendered FAQ section */}
            {faqs.length > 0 && <BlogFAQSection faqs={faqs} />}

            {/* Conversion module — after the article body so it reads as the
                natural next step rather than competing with the content. */}
            <BlogConversionModule tags={blog.blog_info.tags || []} placement="article-end" />
          </article>
          
          {/* Client-rendered Recent Posts sidebar */}
          <BlogRecentPosts />
        </div>

        {/* Related Posts - Client component */}
        <section className='max-w-[1440px] w-full px-6 xl:px-[80px] py-8'>
          <RelatedPosts
            currentSlug={resolvedParams.BlogSlug}
            currentTags={blog.blog_info.tags || []}
          />
        </section>

        <ContactUsSection />
      </main>
    </HydrationBoundary>
  );
}
