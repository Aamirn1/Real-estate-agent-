"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SERVICES = [
  "Marketing Consulting",
  "CRM Support",
  "Workflow Automation",
  "Virtual Assistance",
  "Outreach Support",
  "Digital Marketing",
  "Appointment Coordination",
  "Reporting & Analytics",
];

/**
 * Contact form with a service-of-interest dropdown and submit-success state.
 * Client component | manages local form state and handles the submit event.
 */
export function ContactFormSection() {
  const [submitted, setSubmitted] = useState(false);
  const [service, setService] = useState<string>("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex h-full min-h-[520px] flex-col items-center justify-center gap-4 p-8 text-center"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-electric/15 ring-1 ring-electric/30">
          <CheckCircle2 className="h-8 w-8 text-electric" />
        </span>
        <h3 className="font-heading text-2xl font-semibold text-[#1a1a1a]">
          Message received
        </h3>
        <p className="max-w-sm text-sm leading-relaxed text-[#1a1a1a]/60">
          Thanks for reaching out to Opus Global Solution. A member of our team will
          get back to you within one business day.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setSubmitted(false);
            setService("");
          }}
          className="mt-2 border-black/15 bg-black/5 text-[#1a1a1a] hover:bg-black/10 hover:text-[#1a1a1a]"
        >
          Send another message
        </Button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-full flex-col gap-5 p-7 sm:p-8"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-electric/15 ring-1 ring-electric/30">
          <MessageSquare className="h-5 w-5 text-electric" />
        </span>
        <div className="flex flex-col">
          <span className="font-heading text-lg font-semibold text-[#1a1a1a]">
            Send us a message
          </span>
          <span className="text-xs text-[#1a1a1a]/45">
            We reply within one business day.
          </span>
        </div>
      </div>

      {/* Name + Email */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="cf-name" className="text-[#1a1a1a]/70">
            Name
          </Label>
          <Input
            id="cf-name"
            name="name"
            placeholder="Jane Cooper"
            required
            className="border-black/10 bg-black/5 text-[#1a1a1a] placeholder:text-[#1a1a1a]/35 focus-visible:border-electric/60"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="cf-email" className="text-[#1a1a1a]/70">
            Email
          </Label>
          <Input
            id="cf-email"
            name="email"
            type="email"
            placeholder="jane@brokerage.com"
            required
            className="border-black/10 bg-black/5 text-[#1a1a1a] placeholder:text-[#1a1a1a]/35 focus-visible:border-electric/60"
          />
        </div>
      </div>

      {/* Phone + Company/Team */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="cf-phone" className="text-[#1a1a1a]/70">
            Phone
          </Label>
          <Input
            id="cf-phone"
            name="phone"
            type="tel"
            placeholder="(320) 331-0910"
            className="border-black/10 bg-black/5 text-[#1a1a1a] placeholder:text-[#1a1a1a]/35 focus-visible:border-electric/60"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="cf-company" className="text-[#1a1a1a]/70">
            Company / Team
          </Label>
          <Input
            id="cf-company"
            name="company"
            placeholder="Cooper Realty Group"
            className="border-black/10 bg-black/5 text-[#1a1a1a] placeholder:text-[#1a1a1a]/35 focus-visible:border-electric/60"
          />
        </div>
      </div>

      {/* Service of Interest */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="cf-service" className="text-[#1a1a1a]/70">
          Service of Interest
        </Label>
        <Select value={service} onValueChange={setService}>
          <SelectTrigger
            id="cf-service"
            className="w-full border-black/10 bg-black/5 text-[#1a1a1a] data-[placeholder]:text-[#1a1a1a]/35 focus-visible:border-electric/60 [&_svg]:text-[#1a1a1a]/50"
          >
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent className="border-black/10 bg-[#0d0d12] text-[#1a1a1a]">
            {SERVICES.map((s) => (
              <SelectItem
                key={s}
                value={s}
                className="focus:bg-electric/15 focus:text-[#1a1a1a]"
              >
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Message */}
      <div className="flex flex-1 flex-col gap-2">
        <Label htmlFor="cf-message" className="text-[#1a1a1a]/70">
          Message
        </Label>
        <Textarea
          id="cf-message"
          name="message"
          placeholder="Tell us about your goals and how we can help…"
          required
          rows={5}
          className="min-h-[140px] resize-none border-black/10 bg-black/5 text-[#1a1a1a] placeholder:text-[#1a1a1a]/35 focus-visible:border-electric/60"
        />
      </div>

      <Button
        type="submit"
        className="group mt-1 h-11 w-full gap-2 rounded-xl bg-gradient-to-r from-electric to-violet font-semibold text-[#1a1a1a] shadow-[0_0_30px_-8px_rgba(59,130,246,0.7)] transition-all hover:shadow-[0_0_40px_-6px_rgba(59,130,246,0.9)]"
      >
        Send Message
        <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Button>
    </form>
  );
}
