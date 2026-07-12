import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import { SiteChrome } from "@/components/leadsphere/SiteChrome";
import { CTABanner } from "@/components/leadsphere/CTABanner";
import { BLOG_POSTS, getPostBySlug } from "../blog-data";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found | Opus Global Solution" };

  return {
    title: `${post.title} | Opus Global Solution`,
    description: post.excerpt,
    keywords: [post.category, "real estate", "marketing", "lead generation"],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image, width: 1024, height: 1024 }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <SiteChrome withBackground={false}>
      {/* BlogPosting structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            image: `https://opus-globalsolution.com${post.image}`,
            datePublished: post.date,
            dateModified: post.date,
            author: {
              "@type": "Organization",
              name: "Opus Global Solution",
              url: "https://opus-globalsolution.com",
            },
            publisher: {
              "@type": "Organization",
              name: "Opus Global Solution",
              logo: {
                "@type": "ImageObject",
                url: "https://opus-globalsolution.com/favicon-32.png",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://opus-globalsolution.com/blog/${post.slug}`,
            },
          }),
        }}
      />
      {/* Hero image */}
      <div className="relative w-full px-5 pt-28 sm:px-8">
        <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-3xl border border-black/15 shadow-lg">
          <img
            src={post.image}
            alt={post.title}
            className="h-64 w-full object-cover sm:h-96"
          />
        </div>
      </div>

      {/* Article */}
      <article className="relative w-full px-5 py-10 sm:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Back link */}
          <Link
            href="/blog"
            className="group mb-6 inline-flex items-center gap-2 text-sm font-medium text-black/55 transition-colors hover:text-[#2563EB]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/15 bg-black/5 transition-all group-hover:border-[#2563EB]/30 group-hover:bg-[#2563EB]/10">
              <ArrowLeft className="h-4 w-4" />
            </span>
            Back to Blog
          </Link>

          {/* Category + meta */}
          <div className="mb-4 flex flex-wrap items-center gap-3 text-xs">
            <span className="rounded-full bg-[#2563EB]/15 px-3 py-1 font-semibold text-[#2563EB]">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-black/45">
              <Calendar className="h-3.5 w-3.5" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5 text-black/45">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-heading text-3xl font-bold leading-tight text-black sm:text-4xl">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="mt-4 text-lg leading-relaxed text-black/60">
            {post.excerpt}
          </p>

          {/* Content */}
          <div className="mt-8 space-y-5">
            {post.content.map((paragraph, i) => (
              <p
                key={i}
                className="text-base leading-relaxed text-black/75"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Share + back */}
          <div className="mt-10 border-t border-black/15 pt-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-[#1d4ed8]"
            >
              <ArrowLeft className="h-4 w-4" />
              All Blog Posts
            </Link>
          </div>
        </div>
      </article>

      {/* Related posts */}
      <section className="w-full px-5 py-10 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 font-heading text-2xl font-bold text-black">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {relatedPosts.map((rp) => (
              <Link
                key={rp.slug}
                href={`/blog/${rp.slug}`}
                className="group overflow-hidden rounded-2xl border border-black/15 bg-white shadow-sm transition-all hover:shadow-lg"
              >
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={rp.image}
                    alt={rp.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="p-4">
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-[#2563EB]">
                    {rp.category}
                  </span>
                  <h3 className="mt-1.5 font-heading text-sm font-semibold leading-snug text-black transition-colors group-hover:text-[#2563EB]">
                    {rp.title}
                  </h3>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-black/50">
                    Read more
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Ready to put these insights to work?"
        subtitle="Join thousands of agents who trust Opus Global Solution to fill their pipeline."
      />
    </SiteChrome>
  );
}
