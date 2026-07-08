"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Github,
  Send,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

const FOOTER_COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Pages",
    links: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Pricing", href: "/pricing" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Blog", href: "/blog" },
      { label: "About Us", href: "/about" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Lead Discovery", href: "/services" },
      { label: "Virtual Assistants", href: "/services" },
      { label: "CRM Management", href: "/services" },
      { label: "Outreach Support", href: "/services" },
      { label: "Digital Advertising", href: "/services" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/pricing" },
      { label: "Guides", href: "/blog" },
      { label: "Case Studies", href: "/testimonials" },
      { label: "Help Center", href: "/about" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/about" },
      { label: "Careers", href: "/about" },
      { label: "Partners", href: "/about" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/about" },
      { label: "Terms & Conditions", href: "/about" },
      { label: "Refund Policy", href: "/about" },
      { label: "SMS Terms", href: "/about" },
    ],
  },
];

const SOCIALS = [
  { Icon: Twitter, label: "Twitter / X", href: "#" },
  { Icon: Linkedin, label: "LinkedIn", href: "#" },
  { Icon: Instagram, label: "Instagram", href: "#" },
  { Icon: Youtube, label: "YouTube", href: "#" },
  { Icon: Github, label: "GitHub", href: "#" },
];

function LogoMark() {
  return (
    <Link href="/" className="group flex items-center gap-2.5">
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-electric via-violet to-cyan shadow-[0_0_20px_-4px_rgba(59,130,246,0.6)]">
        <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-electric via-violet to-cyan opacity-60 blur-md transition-opacity group-hover:opacity-90" />
        <Sparkles className="relative h-4.5 w-4.5 text-white" strokeWidth={2.2} />
      </span>
      <span className="font-heading text-base font-semibold tracking-tight text-white">
        Opus<span className="text-electric"> Solutions</span>
      </span>
    </Link>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative w-full bg-[#070709]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-electric via-violet to-cyan" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-electric/5 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 md:py-20">
        {/* top row */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6">
            <LogoMark />
            <p className="max-w-sm text-sm leading-relaxed text-white/55">
              Your trusted partner for marketing consulting, outreach
              support, and CRM solutions. Human-verified outreach, dedicated
              virtual assistants, and documented workflows for licensed real
              estate professionals.
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all hover:-translate-y-0.5 hover:border-electric/40 hover:bg-electric/10 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:items-end lg:text-right">
            <div className="lg:max-w-sm">
              <h3 className="font-heading text-lg font-semibold text-white">
                Stay ahead of the market
              </h3>
              <p className="mt-1.5 text-sm text-white/50">
                Weekly insights on outreach and prospecting.
              </p>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full max-w-md flex-col gap-2.5 sm:flex-row lg:self-end"
            >
              <input
                type="email"
                placeholder="you@brokerage.com"
                aria-label="Email address"
                className="w-full flex-1 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-electric/50 focus:bg-white/10"
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[linear-gradient(120deg,#3b82f6,#8b5cf6)] px-5 py-3 text-sm font-semibold text-white shadow-[0_0_25px_-8px_rgba(59,130,246,0.8)] transition-shadow hover:shadow-[0_0_35px_-6px_rgba(139,92,246,0.85)]"
              >
                <Send className="h-4 w-4" />
                Subscribe
              </motion.button>
            </form>
            <p className="text-xs text-white/35 lg:max-w-sm lg:text-right">
              We respect your inbox. Unsubscribe with one click.
            </p>
          </div>
        </div>

        <div className="my-12 h-px w-full bg-white/8 md:my-14" />

        {/* link columns */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-3.5">
              <h4 className="font-heading text-sm font-semibold tracking-wide text-white">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/55 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-8 md:flex-row">
          <p className="text-xs text-white/45">
            © 2025 Opus Solutions. All rights reserved.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
            <span className="inline-flex items-center gap-1.5 text-xs text-white/45">
              <ShieldCheck className="h-3.5 w-3.5 text-electric/70" />
              Made with care
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              System status: Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
