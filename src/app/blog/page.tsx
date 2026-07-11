"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Cake,
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
import {
  GlassCard,
  SectionHeading,
  SectionShell,
} from "@/components/leadsphere/primitives";
import { Reveal } from "@/components/leadsphere/Reveal";

/* ----------------------------- Post data ----------------------------- */
type ColorKey = "electric" | "violet" | "cyan" | "gold";

interface BlogPost {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  icon: LucideIcon;
  color: ColorKey;
}

const POSTS: BlogPost[] = [
  {
    title:
      "How a Dedicated VA Team Keeps Your Business Running While You Sleep",
    excerpt:
      "In the modern global marketplace, the traditional 9-to-5 workday is no longer a standard — it's a limitation. A dedicated virtual assistant team keeps your outreach, scheduling, and follow-ups running around the clock.",
    category: "Virtual Assistants",
    readTime: "6 min read",
    date: "Mar 12, 2025",
    icon: Moon,
    color: "electric",
  },
  {
    title:
      "Why Targeting the Right Prospects Is the Secret to a 60% Sales Increase",
    excerpt:
      "In the digital economy, many business owners chase volume. But quality over quantity is the real secret — targeting the right prospects can drive a 60% sales increase.",
    category: "Prospecting",
    readTime: "8 min read",
    date: "Mar 5, 2025",
    icon: Target,
    color: "violet",
  },
  {
    title:
      "The Art of the Warm Introduction: Why Human-Verified Connections Convert Better Than Automation",
    excerpt:
      "In the fast-paced world of digital marketing and real estate, automation has promised a revolution. But human-verified connections still convert better than any automated sequence.",
    category: "Outreach",
    readTime: "7 min read",
    date: "Feb 26, 2025",
    icon: Handshake,
    color: "cyan",
  },
  {
    title: "5 Anniversary Celebration of Opus Solutions",
    excerpt:
      "Five years of helping real estate professionals grow. We look back at the milestones, the partnerships, and the lessons that shaped our journey.",
    category: "Company",
    readTime: "4 min read",
    date: "Feb 18, 2025",
    icon: Cake,
    color: "gold",
  },
  {
    title: "How to Use Google & Facebook Ads to Target Motivated Home Sellers",
    excerpt:
      "It's time to stop relying on cold calling and mailers. The next big real estate deal may be hidden in your Facebook feed. Here's how to target motivated sellers with paid ads.",
    category: "Advertising",
    readTime: "9 min read",
    date: "Feb 10, 2025",
    icon: Megaphone,
    color: "electric",
  },
  {
    title: "How Top Realtors Are Finding Off-Market Deals",
    excerpt:
      "A great realtor will tell you the best deals are the ones no one else knows about. Pocket listings don't pop up on Zillow or the MLS — here's how top realtors find them.",
    category: "Lead Generation",
    readTime: "7 min read",
    date: "Feb 2, 2025",
    icon: Search,
    color: "violet",
  },
  {
    title: "How to Convert Online Real Estate Leads into Paying Clients",
    excerpt:
      "Generating online leads is only the first step. The real challenge is turning those leads into actual buyers and sellers. Without a solid conversion strategy, your leads will go cold.",
    category: "Conversion",
    readTime: "8 min read",
    date: "Jan 25, 2025",
    icon: TrendingUp,
    color: "cyan",
  },
  {
    title:
      "The Future of Real Estate: Enhancing Customer Experience with Smart Strategies",
    excerpt:
      "A client-centric approach prioritizes the needs, preferences, and overall experience of buyers and sellers. Discover the smart strategies shaping the future of real estate.",
    category: "Strategy",
    readTime: "6 min read",
    date: "Jan 18, 2025",
    icon: Sparkles,
    color: "gold",
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
    iconTile: "bg-electric/20 text-electric shadow-[0_0_28px_-6px_rgba(59,130,246,0.7)]",
    ring: "ring-electric/30",
    orb: "bg-electric/30",
    hoverBorder: "group-hover:border-electric/40 group-hover:shadow-[0_24px_60px_-20px_rgba(59,130,246,0.45)]",
    hoverTitle: "group-hover:text-electric",
    hoverArrow: "group-hover:text-electric",
    accentDot: "bg-electric shadow-[0_0_8px_#3b82f6]",
  },
  violet: {
    gradient: "from-violet to-[#4c1d95]",
    pill: "bg-violet/15 text-violet border-violet/30",
    iconTile: "bg-violet/20 text-violet shadow-[0_0_28px_-6px_rgba(139,92,246,0.7)]",
    ring: "ring-violet/30",
    orb: "bg-violet/30",
    hoverBorder: "group-hover:border-violet/40 group-hover:shadow-[0_24px_60px_-20px_rgba(139,92,246,0.45)]",
    hoverTitle: "group-hover:text-violet",
    hoverArrow: "group-hover:text-violet",
    accentDot: "bg-violet shadow-[0_0_8px_#8b5cf6]",
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
    accentDot: "bg-cyan shadow-[0_0_8px_#06b6d4]",
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
        description="Stay updated with the latest trends, tips, and insights in real estate lead generation. At Opus Solutions, we share strategies that help agents and brokerages grow stronger businesses."
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
                <motion.article
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className="group h-full"
                >
                  <GlassCard
                    sheen
                    className={`flex h-full flex-col overflow-hidden border border-[#E2E8F0] transition-colors duration-300 ${c.hoverBorder}`}
                  >
                    {/* ---------------- Thumbnail ---------------- */}
                    <div
                      className={`relative h-40 overflow-hidden bg-gradient-to-br ${c.gradient}`}
                    >
                      {/* subtle grid overlay for depth */}
                      <div
                        className="absolute inset-0 opacity-25"
                        style={{
                          backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.18) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.18) 1px,transparent 1px)",
                          backgroundSize: "32px 32px",
                          maskImage:
                            "radial-gradient(ellipse 80% 70% at 50% 50%,#000 30%,transparent 75%)",
                          WebkitMaskImage:
                            "radial-gradient(ellipse 80% 70% at 50% 50%,#000 30%,transparent 75%)",
                        }}
                      />
                      {/* ambient glow orb */}
                      <div
                        className={`pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full ${c.orb} blur-2xl`}
                      />
                      <div
                        className={`pointer-events-none absolute -bottom-10 -left-6 h-24 w-24 rounded-full ${c.orb} blur-2xl opacity-60`}
                      />

                      {/* centered icon */}
                      <div className="absolute inset-0 grid place-items-center">
                        <motion.div
                          initial={false}
                          whileHover={{ scale: 1.08 }}
                          transition={{ type: "spring", stiffness: 300, damping: 18 }}
                          className={`grid h-16 w-16 place-items-center rounded-2xl border border-[#CBD5E1] bg-[#1E293B]/8 backdrop-blur-md ${c.ring} ring-1`}
                        >
                          <Icon className="h-8 w-8 text-[#1E293B] drop-shadow-[0_0_10px_rgba(255,255,255,0.45)]" />
                        </motion.div>
                      </div>

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
                        className={`font-heading text-lg font-semibold leading-snug text-[#1E293B] transition-colors duration-300 ${c.hoverTitle}`}
                      >
                        {post.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-[#1E293B]/55 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* footer row */}
                      <div className="mt-5 flex items-center justify-between border-t border-[#E2E8F0] pt-4">
                        <div className="flex items-center gap-2 text-xs text-[#1E293B]/45">
                          <Calendar className="h-3.5 w-3.5" />
                          <span className="tnum">{post.date}</span>
                          <span className="text-[#1E293B]/20">·</span>
                          <Clock className="h-3.5 w-3.5" />
                          <span>{post.readTime}</span>
                        </div>
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-semibold text-[#1E293B]/70 transition-colors duration-300 ${c.hoverArrow}`}
                        >
                          Read more
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </GlassCard>
                </motion.article>
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
            className="group inline-flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-[#1E293B]/5 px-7 py-3.5 text-sm font-semibold text-[#1E293B]/80 backdrop-blur transition-colors hover:border-electric/40 hover:text-[#1E293B] hover:shadow-[0_0_32px_-8px_rgba(59,130,246,0.55)]"
          >
            Load More Articles
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </motion.button>

          <p className="max-w-2xl text-center text-xs leading-relaxed text-[#1E293B]/35">
            Opus Solutions is a marketing consulting and support company. We do
            not act as a brokerage, list or sell property, or resell leads.
          </p>
        </div>
      </SectionShell>

      <CTABanner
        title="Ready to put these insights to work?"
        subtitle="Join thousands of agents who trust Opus Solutions to fill their pipeline."
      />
    </SiteChrome>
  );
}
