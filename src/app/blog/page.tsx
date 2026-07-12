"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Clock,
  Handshake,
  Megaphone,
  Moon,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { SiteChrome, PageHero } from "@/components/leadsphere/SiteChrome";
import { CTABanner } from "@/components/leadsphere/CTABanner";
import Link from "next/link";
import {
  GlassCard,
  SectionHeading,
  SectionShell,
} from "@/components/leadsphere/primitives";
import { Reveal } from "@/components/leadsphere/Reveal";

/* ----------------------------- Post data ----------------------------- */
type ColorKey = "electric" | "violet" | "cyan" | "gold";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  icon: LucideIcon;
  color: ColorKey;
  image: string;
}

const POSTS: BlogPost[] = [
  {
    slug: "10-proven-strategies-to-generate-seller-leads-2025",
    title: "10 Proven Strategies to Generate Seller Leads in 2025",
    excerpt:
      "Discover the most effective seller lead generation strategies for US real estate agents in 2025. From expired listings to FSBO targeting, learn how top producers fill their pipelines with motivated sellers using proven, compliant outreach methods.",
    category: "Lead Generation",
    readTime: "8 min read",
    date: "Jul 10, 2025",
    icon: TrendingUp,
    color: "electric",
    image: "/blog/blog-1.jpg",
  },
  {
    slug: "how-virtual-assistants-transforming-real-estate",
    title: "How Virtual Assistants Are Transforming Real Estate Businesses",
    excerpt:
      "Real estate virtual assistants handle scheduling, CRM management, lead follow-up, and client communication so agents can focus on closing. Learn how a dedicated VA can save you 15+ hours per week and boost your conversion rate.",
    category: "Virtual Assistants",
    readTime: "7 min read",
    date: "Jul 5, 2025",
    icon: Moon,
    color: "violet",
    image: "/blog/blog-2.jpg",
  },
  {
    slug: "complete-guide-real-estate-crm-setup-new-agents",
    title: "The Complete Guide to Real Estate CRM Setup for New Agents",
    excerpt:
      "Setting up your first real estate CRM doesn't have to be overwhelming. This step-by-step guide covers pipeline stages, lead organization, automation rules, and best practices to keep your deals moving from first contact to closing.",
    category: "CRM",
    readTime: "9 min read",
    date: "Jun 28, 2025",
    icon: Sparkles,
    color: "cyan",
    image: "/blog/blog-3.jpg",
  },
  {
    slug: "why-human-verified-outreach-beats-cold-calling",
    title: "Why Human-Verified Outreach Beats Cold Calling Every Time",
    excerpt:
      "Cold calling is dead. Discover why human-verified, consent-based outreach converts at 4x the rate of robocalls and autodialers. Learn how documented conversations and compliance-first methods build trust and close more deals.",
    category: "Outreach",
    readTime: "6 min read",
    date: "Jun 20, 2025",
    icon: Handshake,
    color: "electric",
    image: "/blog/blog-4.jpg",
  },
  {
    slug: "facebook-google-ads-real-estate-2025-playbook",
    title: "Facebook and Google Ads for Real Estate: A 2025 Playbook",
    excerpt:
      "Stop wasting ad spend on the wrong audience. This 2025 playbook shows real estate agents how to target motivated home sellers on Facebook and Google using consent-based intake forms, compliant campaigns, and proven ad creatives.",
    category: "Digital Marketing",
    readTime: "10 min read",
    date: "Jun 12, 2025",
    icon: Megaphone,
    color: "violet",
    image: "/blog/blog-5.jpg",
  },
  {
    slug: "how-to-build-real-estate-pipeline-never-goes-dry",
    title: "How to Build a Real Estate Pipeline That Never Goes Dry",
    excerpt:
      "A consistent pipeline is the lifeblood of every successful real estate agent. Learn how to combine lead discovery, CRM organization, automated follow-ups, and monthly reporting to keep your pipeline full month after month.",
    category: "Pipeline",
    readTime: "7 min read",
    date: "Jun 5, 2025",
    icon: Target,
    color: "cyan",
    image: "/blog/blog-6.jpg",
  },
  {
    slug: "compliance-real-estate-marketing-tcpa-dnc",
    title: "Compliance in Real Estate Marketing: TCPA, DNC, and What Agents Must Know",
    excerpt:
      "TCPA, DNC, CAN-SPAM, CCPA: compliance violations can cost real estate agents thousands in fines. This guide breaks down every regulation you need to know and how to stay compliant while growing your business.",
    category: "Compliance",
    readTime: "8 min read",
    date: "May 28, 2025",
    icon: Search,
    color: "gold",
    image: "/blog/blog-7.jpg",
  },
  {
    slug: "from-lead-to-closing-nurture-real-estate-prospects",
    title: "From Lead to Closing: How to Nurture Real Estate Prospects Effectively",
    excerpt:
      "Generating leads is just the beginning. Learn proven nurturing strategies including timely follow-ups, appointment scheduling, client reminders, and relationship-building techniques that turn cold prospects into closed deals.",
    category: "Conversion",
    readTime: "7 min read",
    date: "May 20, 2025",
    icon: TrendingUp,
    color: "electric",
    image: "/blog/blog-8.jpg",
  },
];

/* --------------------------- Color styling --------------------------- */
/**
 * Static class strings so the Tailwind v4 scanner reliably picks up every
 * brand color. Keys mirror the `ColorKey` union.
 */
const COLOR_STYLES: Record<
  ColorKey,
  {
    gradient: string;
    pill: string;
    iconTile: string;
    ring: string;
    orb: string;
    hoverBorder: string;
    hoverTitle: string;
    hoverArrow: string;
    accentDot: string;
  }
> = {
  electric: {
    gradient: "from-electric to-[#1e3a8a]",
    pill: "bg-electric/15 text-electric border-electric/30",
    iconTile: "bg-electric/20 text-electric shadow-[0_0_28px_-6px_rgba(37,99,235,0.7)]",
    ring: "ring-electric/30",
    orb: "bg-electric/30",
    hoverBorder: "group-hover:border-electric/40 group-hover:shadow-[0_24px_60px_-20px_rgba(37,99,235,0.45)]",
    hoverTitle: "group-hover:text-electric",
    hoverArrow: "group-hover:text-electric",
    accentDot: "bg-electric shadow-[0_0_8px_#2563EB]",
  },
  violet: {
    gradient: "from-[#38BDF8] to-[#4c1d95]",
    pill: "bg-violet/15 text-violet border-violet/30",
    iconTile: "bg-violet/20 text-violet shadow-[0_0_28px_-6px_rgba(56,189,248,0.7)]",
    ring: "ring-violet/30",
    orb: "bg-violet/30",
    hoverBorder: "group-hover:border-violet/40 group-hover:shadow-[0_24px_60px_-20px_rgba(56,189,248,0.45)]",
    hoverTitle: "group-hover:text-violet",
    hoverArrow: "group-hover:text-violet",
    accentDot: "bg-violet shadow-[0_0_8px_#38BDF8]",
  },
  cyan: {
    gradient: "from-cyan to-[#0e7490]",
    pill: "bg-cyan/15 text-cyan border-cyan/30",
    iconTile: "bg-cyan/20 text-cyan shadow-[0_0_28px_-6px_rgba(6,182,212,0.7)]",
    ring: "ring-cyan/30",
    orb: "bg-cyan/30",
    hoverBorder: "group-hover:border-cyan/40 group-hover:shadow-[0_24px_60px_-20px_rgba(6,182,212,0.45)]",
    hoverTitle: "group-hover:text-cyan",
    hoverArrow: "group-hover:text-cyan",
    accentDot: "bg-cyan shadow-[0_0_8px_#14B8A6]",
  },
  gold: {
    gradient: "from-gold to-[#7a5a16]",
    pill: "bg-gold/15 text-gold border-gold/30",
    iconTile: "bg-gold/20 text-gold shadow-[0_0_28px_-6px_rgba(212,175,55,0.7)]",
    ring: "ring-gold/30",
    orb: "bg-gold/30",
    hoverBorder: "group-hover:border-gold/40 group-hover:shadow-[0_24px_60px_-20px_rgba(212,175,55,0.45)]",
    hoverTitle: "group-hover:text-gold",
    hoverArrow: "group-hover:text-gold",
    accentDot: "bg-gold shadow-[0_0_8px_#d4af37]",
  },
};

/* ------------------------------ Page ------------------------------ */
export default function BlogPage() {
  return (
    <SiteChrome>
      <PageHero
        eyebrow="Blog"
        title={
          <>
            Our{" "}
            <span className="text-gradient-electric">Latest News</span>
          </>
        }
        description="Stay updated with the latest trends, tips, and insights in real estate lead generation. At Opus Global Solution, we share strategies that help agents and brokerages grow stronger businesses."
      />

      <SectionShell id="blog" className="pt-10 md:pt-12">
        <SectionHeading
          eyebrow="Blog"
          title="Insights for real estate professionals"
          description="Strategies, tips, and stories from the front lines of real estate lead generation."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3">
          {POSTS.map((post, i) => {
            const Icon = post.icon;
            const c = COLOR_STYLES[post.color];
            return (
              <Reveal key={post.title} delay={i * 0.06} className="h-full">
                <Link href={`/blog/${post.slug}`} className="group h-full block">
                <motion.article
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className="h-full"
                >
                  <GlassCard
                    sheen
                    className={`flex h-full flex-col overflow-hidden border border-black/8 transition-colors duration-300 ${c.hoverBorder}`}
                  >
                    {/* ---------------- Thumbnail with blog image ---------------- */}
                    <div
                      className={`relative h-48 overflow-hidden bg-gradient-to-br ${c.gradient}`}
                    >
                      {/* Blog image */}
                      <img
                        src={post.image}
                        alt={post.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      {/* Gradient overlay for text legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* category pill (top-left) */}
                      <div className="absolute left-3 top-3">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wide backdrop-blur-md ${c.pill}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${c.accentDot}`}
                          />
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* ---------------- Body ---------------- */}
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <h3
                        className={`font-heading text-lg font-semibold leading-snug text-[#1a1a1a] transition-colors duration-300 ${c.hoverTitle}`}
                      >
                        {post.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-[#1a1a1a]/55 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* footer row */}
                      <div className="mt-5 flex items-center justify-between border-t border-black/8 pt-4">
                        <div className="flex items-center gap-2 text-xs text-[#1a1a1a]/45">
                          <Calendar className="h-3.5 w-3.5" />
                          <span className="tnum">{post.date}</span>
                          <span className="text-[#1a1a1a]/20">·</span>
                          <Clock className="h-3.5 w-3.5" />
                          <span>{post.readTime}</span>
                        </div>
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-semibold text-[#1a1a1a]/70 transition-colors duration-300 ${c.hoverArrow}`}
                        >
                          Read more
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </GlassCard>
                </motion.article>
                </Link>
              </Reveal>
            );
          })}
        </div>

        {/* ---------------- Load more + disclaimer ---------------- */}
        <div className="mt-14 flex flex-col items-center gap-6">
          <motion.button
            type="button"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group inline-flex items-center gap-2 rounded-xl border border-black/15 bg-black/5 px-7 py-3.5 text-sm font-semibold text-[#1a1a1a]/80 backdrop-blur transition-colors hover:border-electric/40 hover:text-[#1a1a1a] hover:shadow-[0_0_32px_-8px_rgba(37,99,235,0.55)]"
          >
            Load More Articles
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </motion.button>

          <p className="max-w-2xl text-center text-xs leading-relaxed text-[#1a1a1a]/35">
            Opus Global Solution is a marketing consulting and support company. We do
            not act as a brokerage, list or sell property, or resell leads.
          </p>
        </div>
      </SectionShell>

      <CTABanner
        title="Ready to put these insights to work?"
        subtitle="Join thousands of agents who trust Opus Global Solution to fill their pipeline."
      />
    </SiteChrome>
  );
}
