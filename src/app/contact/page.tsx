import type { Metadata } from "next";
import { SiteChrome, PageHero } from "@/components/leadsphere/SiteChrome";
import { CTABanner } from "@/components/leadsphere/CTABanner";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import {
  GlassCard,
  SectionShell,
} from "@/components/leadsphere/primitives";
import { Reveal } from "@/components/leadsphere/Reveal";
import { ContactFormSection } from "./ContactFormSection";
import { Mail, Phone, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Opus Global Solution | Real Estate Marketing Support",
  description:
    "Let's do great work together. Connect with Opus Global Solution for marketing consulting, outreach support, and CRM solutions for real estate professionals.",
  alternates: { canonical: "https://opusglobalsolution.com/contact" },
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
      { text: "info@opusglobalsolution.com", href: "mailto:info@opusglobalsolution.com" },
    ],
  },
  {
    icon: Phone,
    color: "violet",
    label: "Phone",
    lines: [
      { text: "(645) 253-6830", href: "tel:+16452536830" },
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
    <SiteChrome withBackground={false} flushTop>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://opusglobalsolution.com" },
          { name: "Contact", url: "https://opusglobalsolution.com/contact" },
        ]}
      />
      <PageHero
        heroImage="/heroes/get-started-home.jpg"
        eyebrow="Contact"
        title={
          <>
            Let&apos;s do{" "}
            <span className="text-gradient-electric">great work</span> together
          </>
        }
        description="Tell us about your goals and we'll show you how Opus Global Solution can fit into your workflow. Our team responds within one business day."
      />

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

          {/* RIGHT | Info cards (address card + map removed) */}
          <Reveal delay={0.08}>
            <div className="flex h-full flex-col gap-5">
              {/* info card grid */}
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
