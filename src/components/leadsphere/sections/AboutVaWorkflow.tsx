"use client";

import { motion } from "framer-motion";
import {
  Headset,
  PhoneCall,
  CalendarClock,
  Table2,
  Share2,
  Globe,
  Phone,
  CalendarCheck,
  MessagesSquare,
  Rocket,
  Target,
  Eye,
  Users,
  CheckCircle2,
  ShieldCheck,
  PiggyBank,
  Handshake,
  TrendingUp,
} from "lucide-react";
import {
  GlassCard,
  CountUp,
  SectionHeading,
  SectionShell,
} from "@/components/leadsphere/primitives";
import { Reveal } from "@/components/leadsphere/Reveal";

/* ============================================================
   ABOUT / WHO WE ARE / MISSION / VISION
   (follows vleadservice.com "Who We Are" + "Our Mission" + "Our Vision")
   ============================================================ */
export function AboutMission() {
  return (
    <SectionShell id="about">
      <SectionHeading
        eyebrow="Who We Are"
        title={
          <>
            Workflow automation <span className="text-gradient-electric">for realtors</span>
          </>
        }
        description="Opus Global Solution provides professional marketing and administrative support for real estate professionals. Our mission is to help licensed agents and brokerages stay organized, save time, and grow stronger businesses."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        <Reveal>
          <GlassCard strong className="h-full p-7">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-electric/15">
              <Target className="h-5.5 w-5.5 text-electric" />
            </span>
            <h3 className="mt-5 font-heading text-xl font-semibold text-black">Our Mission</h3>
            <p className="mt-3 text-sm leading-relaxed text-black">
              To help licensed real estate professionals grow their businesses by
              providing marketing support, outreach assistance, CRM solutions, and
              administrative services. We strive to deliver verified, exclusive
              leads that convert into real closings.
            </p>
          </GlassCard>
        </Reveal>

        <Reveal delay={0.1}>
          <GlassCard strong className="h-full p-7">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet/15">
              <Eye className="h-5.5 w-5.5 text-violet" />
            </span>
            <h3 className="mt-5 font-heading text-xl font-semibold text-black">Our Vision</h3>
            <p className="mt-3 text-sm leading-relaxed text-black">
              To empower real estate professionals nationwide to reach their full
              potential. By leveraging modern digital platforms, scalable support
              solutions, and continuous improvement, we help agents focus on what
              matters most, closing deals.
            </p>
          </GlassCard>
        </Reveal>

        <Reveal delay={0.2}>
          <GlassCard strong sheen className="relative h-full overflow-hidden p-7">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan/15 blur-3xl" />
            <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-cyan/15">
              <Users className="h-5.5 w-5.5 text-cyan" />
            </span>
            <h3 className="relative mt-5 font-heading text-xl font-semibold text-black">Who We Serve</h3>
            <p className="relative mt-3 text-sm leading-relaxed text-black">
              Agents, teams, brokerages, and investors across the USA. From solo
              realtors to large brokerages, our documented workflows and
              human-verified outreach adapt to every stage of your growth.
            </p>
          </GlassCard>
        </Reveal>
      </div>

      {/* ============ NEW BLOCK 1: Benefits of Professional Outreach Support ============ */}
      <Reveal delay={0.1}>
        <GlassCard strong sheen className="relative mt-8 overflow-hidden p-0">
          {/* ambient glows */}
          <div className="pointer-events-none absolute -left-16 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-electric/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-violet/10 blur-3xl" />

          <div className="relative grid gap-10 p-8 sm:p-10 lg:grid-cols-2 lg:gap-14">
            {/* LEFT column, heading + paragraph */}
            <div className="flex flex-col justify-center">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-electric/30 bg-electric/10 px-3 py-1 text-xs font-medium tracking-wide text-electric">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Benefits
              </span>
              <h3 className="mt-5 font-heading text-2xl font-semibold leading-tight text-black sm:text-3xl">
                Benefits of{" "}
                <span className="text-gradient-electric">Professional Outreach Support</span>
              </h3>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-black sm:text-base">
                Outsourcing your outreach support with Opus Global Solution saves
                valuable time by providing verified and standardized contact
                records. Our documented workflows make follow-ups faster and
                more consistent, so you can focus on clients, not data entry.
              </p>
              <div className="mt-6 h-0.5 w-24 rounded-full bg-gradient-to-r from-[#2563EB] via-[#38BDF8] to-[#14B8A6]" />
            </div>

            {/* RIGHT column, checklist of 4 benefits */}
            <ul className="flex flex-col gap-4">
              {[
                {
                  title: "Documented workflows",
                  desc: "Repeatable, transparent processes for every campaign.",
                },
                {
                  title: "Verified & standardized contacts",
                  desc: "Clean, deliverable records synced to your CRM.",
                },
                {
                  title: "CRM setup & support",
                  desc: "From onboarding to pipeline hygiene, handled end-to-end.",
                },
                {
                  title: "Digital advertising campaigns",
                  desc: "Consent-based campaigns across Google and social.",
                },
              ].map((item, i) => (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.45, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex items-start gap-3 rounded-xl border border-black/15 bg-white/[0.02] p-4 transition-all duration-300 hover:border-electric/30 hover:bg-electric/[0.04]"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-electric drop-shadow-[0_0_8px_rgba(37,99,235,0.5)] transition-transform duration-300 group-hover:scale-110" />
                  <div>
                    <p className="font-heading text-sm font-semibold text-black">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-black">
                      {item.desc}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </GlassCard>
      </Reveal>

      {/* ============ NEW BLOCK 2: Why We Are Different ============ */}
      <div className="relative mt-24 overflow-hidden rounded-3xl border border-black/15 shadow-lg md:mt-32">
        <img
          src="/sections/why-different-bg.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="relative z-10 px-4 py-10 sm:px-8 md:py-14">
        <Reveal>
          <div className="mx-auto mb-10 flex max-w-2xl flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-medium tracking-wide text-white backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-electric shadow-[0_0_8px_#2563EB]" />
              Why We Are Different
            </span>
            <h3 className="mt-4 font-heading text-2xl font-semibold leading-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] sm:text-3xl md:text-4xl">
              Why We Are{" "}
              <span className="text-gradient-electric">Different</span>
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] sm:text-base">
              Three reasons teams choose Opus Global Solution as their long-term
              outreach partner.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              title: "Verified & Documented Outreach",
              desc: "We engage only through consent-based channels and provide standardized, verified contact records matched to your target areas. Humans conduct all outreach, no autodialers or robocalls.",
              color: "electric",
            },
            {
              icon: PiggyBank,
              title: "Cost-Effective Support Packages",
              desc: "Opus Global Solution offers affordable outreach and marketing support packages that reduce administrative overhead and free up your team's time to focus on client relationships.",
              color: "violet",
            },
            {
              icon: Handshake,
              title: "Long-Term Partnership",
              desc: "We're more than a service provider, we're a long-term ally. Expect ongoing reporting, workflow playbooks, and strategic guidance that scale with your goals.",
              color: "cyan",
            },
          ].map((card, i) => (
            <Reveal key={card.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="group h-full"
              >
                {/* Plain dark card (not GlassCard) so white text is readable.
                    glass-strong forces a white background which hides white text. */}
                <div className="relative h-full overflow-hidden rounded-2xl border border-white/15 bg-slate-900/85 p-7 backdrop-blur-md shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4)]">
                  <div
                    className={`pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-${card.color}/25 blur-3xl transition-opacity duration-300 group-hover:opacity-150`}
                  />
                  <span
                    className={`relative flex h-12 w-12 items-center justify-center rounded-xl bg-${card.color}/20 transition-transform duration-300 group-hover:scale-110`}
                  >
                    <card.icon className={`h-6 w-6 text-${card.color}`} />
                  </span>
                  <h4 className="relative mt-5 font-heading text-lg font-semibold text-white">
                    {card.title}
                  </h4>
                  <p className="relative mt-3 text-sm leading-relaxed text-white/85">
                    {card.desc}
                  </p>
                  <div
                    className={`mt-5 h-0.5 w-10 rounded-full bg-${card.color}/70 transition-all duration-300 group-hover:w-20`}
                  />
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
        </div>
      </div>
    </SectionShell>
  );
}

/* ============================================================
   VIRTUAL ASSISTANT SERVICES
   (follows vleadservice.com "How we drive results in Virtual Assistant Service")
   ============================================================ */
const VA_SERVICES = [
  {
    icon: Headset,
    title: "Customer Support",
    desc: "Dedicated reps handle inbound inquiries, qualify prospects, and keep your clients informed at every stage.",
    color: "electric",
  },
  {
    icon: PhoneCall,
    title: "Prospect Calling",
    desc: "Personalized, human-only outreach to reconnect with prior contacts, schedule follow-ups, and book appointments.",
    color: "violet",
  },
  {
    icon: CalendarClock,
    title: "Calendar Management",
    desc: "Never miss a meeting. Our assistants schedule, confirm, and coordinate your appointments end-to-end.",
    color: "cyan",
  },
  {
    icon: Table2,
    title: "CRM Management",
    desc: "From CRM setup to reporting and pipeline hygiene, we keep your data clean and your follow-ups on track.",
    color: "electric",
  },
  {
    icon: Share2,
    title: "Social Media Management",
    desc: "Consistent, on-brand content across your channels to keep you top-of-mind with sellers and buyers.",
    color: "violet",
  },
  {
    icon: Globe,
    title: "Website Management",
    desc: "Listing updates, landing pages, and performance tweaks handled, so your web presence always converts.",
    color: "cyan",
  },
];

export function VirtualAssistantServices() {
  return (
    <SectionShell id="va-services" className="relative">
      <SectionHeading
        eyebrow="Virtual Assistant Services"
        title={
          <>
            A dedicated team that keeps your business{" "}
            <span className="text-gradient-electric">running</span>
          </>
        }
        description="Reduce your admin workload so you can focus on clients. Our virtual assistants handle the operational heavy lifting."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {VA_SERVICES.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.06}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className="group h-full"
            >
              <GlassCard className="h-full p-6 transition-all duration-300 hover:border-black/20">
                <div className="flex items-start justify-between">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-${s.color}/15 transition-transform duration-300 group-hover:scale-110`}
                  >
                    <s.icon className={`h-6 w-6 text-${s.color}`} />
                  </span>
                  <span className="font-heading text-3xl font-bold text-black/15 tnum">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 font-heading text-lg font-semibold text-black">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-black">
                  {s.desc}
                </p>
                <div className={`mt-4 h-0.5 w-10 rounded-full bg-${s.color}/50 transition-all duration-300 group-hover:w-20`} />
              </GlassCard>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

/* ============================================================
   OUR WORKFLOW
   (follows vleadservice.com "Our Workflow" 4-step process)
   ============================================================ */
const WORKFLOW_STEPS = [
  {
    icon: Phone,
    title: "Initial Intro Call",
    desc: "We learn about your business, goals, and the support you need most.",
    color: "electric",
  },
  {
    icon: CalendarCheck,
    title: "Meet Your Assistant",
    desc: "Get matched with a dedicated virtual assistant tailored to your market.",
    color: "violet",
  },
  {
    icon: MessagesSquare,
    title: "Discuss Your Tasks",
    desc: "Walk through your workflows, tools, and priorities with your VA.",
    color: "cyan",
  },
  {
    icon: Rocket,
    title: "Work Gets Started",
    desc: "Your assistant takes on the operational load, you focus on closing.",
    color: "electric",
  },
];

export function OurWorkflow() {
  return (
    <SectionShell id="workflow">
      <SectionHeading
        eyebrow="Our Workflow"
        title={
          <>
            Get started in <span className="text-gradient-electric">four simple steps</span>
          </>
        }
        description="From intro call to full productivity in days, not weeks."
      />

      <div className="relative mt-14">
        {/* connecting line - desktop */}
        <div className="absolute left-8 right-8 top-7 hidden h-0.5 rounded-full bg-gradient-to-r from-electric/20 via-electric/70 to-cyan/20 md:block" />

        <div className="grid gap-8 md:grid-cols-4">
          {WORKFLOW_STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.12}>
              <div className="relative flex flex-col items-center text-center md:items-start md:text-left">
                {/* numbered node */}
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-black/15 bg-[#f8f9fa] shadow-[0_0_24px_-8px_rgba(37,99,235,0.5)]">
                  <step.icon className={`h-6 w-6 text-${step.color}`} />
                  <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#2563EB] to-[#38BDF8] font-heading text-xs font-bold text-white shadow-lg">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-heading text-base font-semibold text-black">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-black">
                  {step.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
