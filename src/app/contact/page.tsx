import type { Metadata } from "next";
import { SiteChrome, PageHero } from "@/components/leadsphere/SiteChrome";
import { CTABanner } from "@/components/leadsphere/CTABanner";
import {
  GlassCard,
  SectionShell,
} from "@/components/leadsphere/primitives";
import { Reveal } from "@/components/leadsphere/Reveal";
import { ContactFormSection } from "./ContactFormSection";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Opus Global Solution | Real Estate Marketing Support",
  description:
    "Let's do great work together. Connect with Opus Global Solution for marketing consulting, outreach support, and CRM solutions for real estate professionals.",
};

/* ----------------------------- Contact info data ----------------------------- */
type InfoColor = "electric" | "violet" | "cyan" | "gold";

const INFO_THEME: Record<
  InfoColor,
  { iconWrap: string; icon: string; glow: string }
> = {
  electric: {
    iconWrap: "bg-electric/15 ring-1 ring-electric/30",
    icon: "text-electric",
    glow: "shadow-[0_0_40px_-12px_rgba(37,99,235,0.55)]",
  },
  violet: {
    iconWrap: "bg-violet/15 ring-1 ring-violet/30",
    icon: "text-violet",
    glow: "shadow-[0_0_40px_-12px_rgba(56,189,248,0.55)]",
  },
  cyan: {
    iconWrap: "bg-cyan/15 ring-1 ring-cyan/30",
    icon: "text-cyan",
    glow: "shadow-[0_0_40px_-12px_rgba(6,182,212,0.55)]",
  },
  gold: {
    iconWrap: "bg-gold/15 ring-1 ring-gold/30",
    icon: "text-gold",
    glow: "shadow-[0_0_40px_-12px_rgba(212,175,55,0.55)]",
  },
};

const INFO_CARDS: {
  icon: typeof Mail;
  color: InfoColor;
  label: string;
  lines: { text: string; href?: string }[];
}[] = [
  {
    icon: Mail,
    color: "electric",
    label: "Email",
    lines: [
      { text: "info@opussolutions.com", href: "mailto:info@opussolutions.com" },
    ],
  },
  {
    icon: Phone,
    color: "violet",
    label: "Phone",
    lines: [
      { text: "(320) 331-0910", href: "tel:+13203310910" },
      { text: "(320) 331-8501", href: "tel:+13203318501" },
      { text: "(320) 331-3559", href: "tel:+13203313559" },
    ],
  },
  {
    icon: MapPin,
    color: "cyan",
    label: "Address",
    lines: [
      { text: "418 Broadway, Ste. R" },
      { text: "Albany, NY 12207" },
      { text: "United States" },
    ],
  },
  {
    icon: Clock,
    color: "gold",
    label: "Office Hours",
    lines: [{ text: "10:00 A.M. to 08:00 P.M (EST)" }],
  },
];

export default function ContactPage() {
  return (
    <SiteChrome>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s do{" "}
            <span className="text-gradient-electric">great work</span> together
          </>
        }
        description="Stop wasting time on unqualified leads. We connect you with motivated home sellers in your area who are serious about selling. Reach out to discuss your goals."
      />

      {/* Office image */}
      <section className="relative w-full px-5 pb-4 sm:px-8">
        <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-black/15 shadow-lg">
          <img
            src="/sections/contact-office.jpg"
            alt="Opus Global Solution office reception"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </section>

      <SectionShell id="contact" className="pt-6 md:pt-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* LEFT | Contact form */}
          <Reveal>
            <GlassCard strong sheen className="relative h-full overflow-hidden p-0">
              {/* Ambient orbs */}
              <div className="pointer-events-none absolute -left-12 -top-12 h-44 w-44 rounded-full bg-electric/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-12 -right-12 h-44 w-44 rounded-full bg-violet/20 blur-3xl" />
              <div className="relative">
                <ContactFormSection />
              </div>
            </GlassCard>
          </Reveal>

          {/* RIGHT | Info cards + stylized map */}
          <Reveal delay={0.08}>
            <div className="flex h-full flex-col gap-5">
              {/* 2×2 info card grid */}
              <div className="grid gap-5 sm:grid-cols-2">
                {INFO_CARDS.map((card) => {
                  const theme = INFO_THEME[card.color];
                  const Icon = card.icon;
                  return (
                    <GlassCard
                      key={card.label}
                      strong
                      className={`group relative overflow-hidden p-6 transition-transform duration-300 hover:-translate-y-1 ${theme.glow}`}
                    >
                      <div
                        className={`pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-50 blur-2xl ${theme.iconWrap}`}
                      />
                      <span
                        className={`relative flex h-11 w-11 items-center justify-center rounded-xl ${theme.iconWrap}`}
                      >
                        <Icon className={`h-5 w-5 ${theme.icon}`} />
                      </span>
                      <p className="relative mt-4 text-xs font-medium uppercase tracking-wider text-black">
                        {card.label}
                      </p>
                      <div className="relative mt-2 flex flex-col gap-1">
                        {card.lines.map((line) =>
                          line.href ? (
                            <a
                              key={line.text}
                              href={line.href}
                              className="text-sm leading-relaxed text-black transition-colors hover:text-black"
                            >
                              {line.text}
                            </a>
                          ) : (
                            <span
                              key={line.text}
                              className="text-sm leading-relaxed text-black"
                            >
                              {line.text}
                            </span>
                          )
                        )}
                      </div>
                    </GlassCard>
                  );
                })}
              </div>

              {/* Stylized map panel */}
              <StylizedMap />
            </div>
          </Reveal>
        </div>
      </SectionShell>

      {/* Closing CTA */}
      <CTABanner
        title="Ready to get started?"
        subtitle="Book a free consultation and discover how Opus Global Solution can help your business grow."
      />
    </SiteChrome>
  );
}

/* ----------------------------- Stylized map (pure CSS/SVG) ----------------------------- */
function StylizedMap() {
  return (
    <GlassCard strong className="relative h-full min-h-[280px] flex-1 overflow-hidden p-0">
      {/* Dark base */}
      <div className="absolute inset-0 bg-[#070a12]" />

      {/* Layered grids */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(37,99,235,0.18) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,0.18) 1px,transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%,#000 30%,transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%,#000 30%,transparent 75%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(56,189,248,0.16) 1px,transparent 1px),linear-gradient(90deg,rgba(56,189,248,0.16) 1px,transparent 1px)",
          backgroundSize: "128px 128px",
          maskImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%,#000 20%,transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%,#000 20%,transparent 70%)",
        }}
      />

      {/* Central radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle,rgba(37,99,235,0.45) 0%,rgba(56,189,248,0.25) 35%,transparent 70%)",
        }}
      />

      {/* Corner badges */}
      <div className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full border border-black/15 bg-black/5 px-3 py-1.5 text-xs text-black backdrop-blur">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        HQ · Albany
      </div>
      <div className="absolute bottom-4 right-4 z-20 rounded-full border border-black/15 bg-black/5 px-3 py-1.5 text-[11px] text-black backdrop-blur tnum">
        42.6526° N, 73.7562° W
      </div>

      {/* Glowing center pin */}
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        {/* Pulse rings */}
        <div className="absolute left-1/2 top-1/2 -z-10 h-24 w-24 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border border-electric/40" />
        <div className="absolute left-1/2 top-1/2 -z-10 h-16 w-16 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-electric/20 blur-sm" />

        {/* Pin */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative">
            <MapPin
              className="h-12 w-12 text-electric"
              style={{
                filter: "drop-shadow(0 0 14px rgba(37,99,235,0.95))",
              }}
              strokeWidth={2}
            />
            <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-[60%] rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.95)]" />
          </div>
          {/* Label */}
          <div className="mt-3 rounded-full border border-electric/30 bg-[#0d0d12]/80 px-3 py-1 text-xs font-medium text-black backdrop-blur">
            Albany, NY
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
