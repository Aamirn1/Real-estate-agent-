import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteChrome, PageHero } from "@/components/leadsphere/SiteChrome";
import { CTABanner } from "@/components/leadsphere/CTABanner";
import {
  GlassCard,
  SectionHeading,
  SectionShell,
} from "@/components/leadsphere/primitives";
import { Reveal } from "@/components/leadsphere/Reveal";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ChevronDown, Check, ArrowRight, ArrowLeft } from "lucide-react";
import {
  SERVICE_DETAILS,
  getServiceBySlug,
  SERVICE_SLUGS,
} from "@/lib/service-details";

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found | Opus Global Solution" };

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: `https://opusglobalsolution.com/services/${service.slug}`,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      images: [
        {
          url: "https://opusglobalsolution.com/heroes/services-home.jpg",
          width: 1344,
          height: 768,
          alt: service.title,
          type: "image/jpeg",
        },
      ],
    },
  };
}

const THEME: Record<string, { text: string; iconWrap: string; bar: string; orb: string }> = {
  electric: {
    text: "text-electric",
    iconWrap: "bg-electric/15 ring-1 ring-inset ring-electric/30",
    bar: "bg-electric",
    orb: "bg-electric/20",
  },
  violet: {
    text: "text-violet",
    iconWrap: "bg-violet/15 ring-1 ring-inset ring-violet/30",
    bar: "bg-violet",
    orb: "bg-violet/20",
  },
  cyan: {
    text: "text-cyan",
    iconWrap: "bg-cyan/15 ring-1 ring-inset ring-cyan/30",
    bar: "bg-cyan",
    orb: "bg-cyan/20",
  },
};

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const t = THEME[service.color];
  const Icon = service.icon;
  const relatedServices = service.relatedServices
    .map((s) => getServiceBySlug(s))
    .filter(Boolean);

  return (
    <SiteChrome withBackground={false} flushTop>
      <PageHero
        heroImage="/heroes/services-home.jpg"
        heroAlt="Two-story brick house with white garage door and green lawn under a blue sky"
        eyebrow="Services"
        title={
          <>
            {service.shortTitle.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-gradient-electric">
              {service.shortTitle.split(" ").slice(-1)}
            </span>
          </>
        }
        description={service.tagline}
      />

      {/* Breadcrumb */}
      <div className="mx-auto w-full max-w-7xl px-5 pt-6 sm:px-8">
        <nav aria-label="breadcrumb" className="flex items-center gap-2 text-sm text-black/50">
          <Link href="/" className="hover:text-electric transition-colors">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-electric transition-colors">Services</Link>
          <span>/</span>
          <span className="text-black font-medium">{service.shortTitle}</span>
        </nav>
      </div>

      <SectionShell id="service-detail" className="pt-8">
        {/* BreadcrumbList + Service schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://opusglobalsolution.com" },
                { "@type": "ListItem", position: 2, name: "Services", item: "https://opusglobalsolution.com/services" },
                { "@type": "ListItem", position: 3, name: service.shortTitle, item: `https://opusglobalsolution.com/services/${service.slug}` },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: service.title,
              description: service.tagline,
              provider: {
                "@type": "Organization",
                name: "Opus Global Solution",
                url: "https://opusglobalsolution.com",
              },
              areaServed: { "@type": "Country", name: "United States" },
              url: `https://opusglobalsolution.com/services/${service.slug}`,
              image: "https://opusglobalsolution.com/heroes/services-home.jpg",
            }),
          }}
        />
        {/* FAQPage schema for service FAQs */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: service.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.a,
                },
              })),
            }),
          }}
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* MAIN CONTENT */}
          <div className="flex flex-col gap-10">
            {/* Overview */}
            <Reveal>
              <div className="flex items-center gap-4">
                <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${t.iconWrap}`}>
                  <Icon className={`h-6 w-6 ${t.text}`} />
                </span>
                <h2 className="font-heading text-2xl font-semibold tracking-tight text-black sm:text-3xl">
                  {service.title}
                </h2>
              </div>
              <div className="mt-6 flex flex-col gap-4">
                {service.overview.map((para, i) => (
                  <p key={i} className="text-sm leading-relaxed text-black sm:text-base">
                    {para}
                  </p>
                ))}
              </div>
            </Reveal>

            {/* What's Included */}
            <Reveal>
              <h2 className="font-heading text-xl font-semibold text-black">
                What&apos;s Included
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {service.whatsIncluded.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-xl border border-black/10 bg-white/50 p-4">
                    <Check className={`mt-0.5 h-5 w-5 shrink-0 ${t.text}`} />
                    <span className="text-sm text-black">{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Benefits */}
            <Reveal>
              <h2 className="font-heading text-xl font-semibold text-black">
                Key Benefits
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {service.benefits.map((benefit, i) => (
                  <GlassCard key={i} strong className="p-5">
                    <h3 className={`font-heading text-base font-semibold ${t.text}`}>
                      {benefit.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-black">
                      {benefit.desc}
                    </p>
                  </GlassCard>
                ))}
              </div>
            </Reveal>

            {/* Process */}
            <Reveal>
              <h2 className="font-heading text-xl font-semibold text-black">
                How It Works
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {service.process.map((step, i) => (
                  <div key={i} className="relative rounded-xl border border-black/10 bg-white/50 p-5">
                    <span className={`font-heading text-2xl font-bold ${t.text} opacity-30`}>
                      {step.step}
                    </span>
                    <h3 className="mt-2 font-heading text-sm font-semibold text-black">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-black">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* FAQs */}
            <Reveal>
              <h2 className="font-heading text-xl font-semibold text-black">
                Frequently Asked Questions
              </h2>
              <Accordion
                type="single"
                collapsible
                defaultValue="faq-0"
                className="mt-4 flex w-full flex-col gap-3"
              >
                {service.faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="glass-strong card-border-glow group rounded-2xl border border-black/15 px-5 transition-colors duration-300 data-[state=open]:border-electric/30 sm:px-6"
                  >
                    <AccordionTrigger
                      className="group/trigger hover:no-underline py-5 text-left text-base font-medium text-black [&>svg:last-child]:hidden"
                    >
                      <span className="flex-1 pr-4 font-heading text-[15px] font-semibold leading-snug text-black sm:text-base">
                        {faq.q}
                      </span>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/15 bg-black/5 transition-all duration-300 group-data-[state=open]:border-electric/40 group-data-[state=open]:bg-electric/10">
                        <ChevronDown className="h-4 w-4 text-black transition-all duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-electric" />
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-black sm:text-[15px]">
                      <span className="block pr-12 pb-5">{faq.a}</span>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>

          {/* SIDEBAR */}
          <div className="flex flex-col gap-5">
            {/* CTA card */}
            <GlassCard strong className="p-6">
              <h3 className="font-heading text-lg font-semibold text-black">
                Ready to get started?
              </h3>
              <p className="mt-2 text-sm text-black">
                Book a free consultation to discuss how {service.shortTitle.toLowerCase()} can help your real estate business grow.
              </p>
              <Link
                href="/contact"
                className="btn-shimmer group relative mt-4 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[linear-gradient(120deg,#2563EB,#38BDF8,#14B8A6)] px-5 py-3 text-sm font-semibold text-white shadow-[0_0_25px_-8px_rgba(37,99,235,0.8)] transition-all hover:shadow-[0_0_35px_-6px_rgba(56,189,248,0.85)]"
              >
                <span className="relative z-10">Book a Consultation</span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/pricing"
                className="mt-3 block w-full rounded-full border border-black/15 bg-black/5 px-5 py-3 text-center text-sm font-semibold text-black transition-colors hover:border-black/30 hover:bg-black/10"
              >
                View Pricing Plans
              </Link>
            </GlassCard>

            {/* Related services */}
            {relatedServices.length > 0 && (
              <GlassCard strong className="p-6">
                <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-black">
                  Related Services
                </h3>
                <div className="mt-3 flex flex-col gap-2">
                  {relatedServices.map((rel) => {
                    const RelIcon = rel!.icon;
                    const relT = THEME[rel!.color];
                    return (
                      <Link
                        key={rel!.slug}
                        href={`/services/${rel!.slug}`}
                        className="flex items-center gap-3 rounded-xl border border-black/10 bg-white/50 p-3 transition-colors hover:border-electric/30 hover:bg-electric/5"
                      >
                        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${relT.iconWrap}`}>
                          <RelIcon className={`h-4 w-4 ${relT.text}`} />
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-black">
                            {rel!.shortTitle}
                          </p>
                          <p className="truncate text-xs text-black">
                            {rel!.tagline}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </GlassCard>
            )}

            {/* Back to all services */}
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-medium text-black/60 transition-colors hover:text-electric"
            >
              <ArrowLeft className="h-4 w-4" />
              All Services
            </Link>
          </div>
        </div>
      </SectionShell>

      <CTABanner
        title={`Ready to scale with ${service.shortTitle.toLowerCase()}?`}
        subtitle="Book a free consultation and discover how Opus Global Solution can help your business grow."
      />
    </SiteChrome>
  );
}
