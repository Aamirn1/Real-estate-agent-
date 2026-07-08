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
} from "lucide-react";
import {
  GlassCard,
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
        description="Opus Solutions helps real estate professionals streamline outreach, save time, and grow stronger businesses with verified leads and dedicated support."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        <Reveal>
          <GlassCard strong className="h-full p-7">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-electric/15">
              <Target className="h-5.5 w-5.5 text-electric" />
            </span>
            <h3 className="mt-5 font-heading text-xl font-semibold text-white">Our Mission</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
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
            <h3 className="mt-5 font-heading text-xl font-semibold text-white">Our Vision</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              To empower real estate professionals nationwide to reach their full
              potential. By leveraging modern digital platforms, scalable support
              solutions, and continuous improvement, we help agents focus on what
              matters most — closing deals.
            </p>
          </GlassCard>
        </Reveal>

        <Reveal delay={0.2}>
          <GlassCard strong sheen className="relative h-full overflow-hidden p-7">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan/15 blur-3xl" />
            <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-cyan/15">
              <Users className="h-5.5 w-5.5 text-cyan" />
            </span>
            <h3 className="relative mt-5 font-heading text-xl font-semibold text-white">Who We Serve</h3>
            <p className="relative mt-3 text-sm leading-relaxed text-white/60">
              Agents, teams, brokerages, and investors across the USA. From solo
              realtors to large brokerages, our documented workflows and
              human-verified outreach adapt to every stage of your growth.
            </p>
          </GlassCard>
        </Reveal>
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
    desc: "Listing updates, landing pages, and performance tweaks handled — so your web presence always converts.",
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
              <GlassCard className="h-full p-6 transition-all duration-300 hover:border-white/20">
                <div className="flex items-start justify-between">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-${s.color}/15 transition-transform duration-300 group-hover:scale-110`}
                  >
                    <s.icon className={`h-6 w-6 text-${s.color}`} />
                  </span>
                  <span className="font-heading text-3xl font-bold text-white/8 tnum">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 font-heading text-lg font-semibold text-white">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-white/55">
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
    desc: "Your assistant takes on the operational load — you focus on closing.",
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
        <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-electric/0 via-electric/40 to-electric/0 md:block" />

        <div className="grid gap-8 md:grid-cols-4">
          {WORKFLOW_STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.12}>
              <div className="relative flex flex-col items-center text-center md:items-start md:text-left">
                {/* numbered node */}
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#0d0d10] shadow-[0_0_24px_-8px_rgba(59,130,246,0.5)]">
                  <step.icon className={`h-6 w-6 text-${step.color}`} />
                  <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-electric to-violet font-heading text-xs font-bold text-white shadow-lg">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-heading text-base font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
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
