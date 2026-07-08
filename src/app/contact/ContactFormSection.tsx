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
 * Client component — manages local form state and handles the submit event.
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
        <h3 className="font-heading text-2xl font-semibold text-white">
          Message received
        </h3>
        <p className="max-w-sm text-sm leading-relaxed text-white/60">
          Thanks for reaching out to Opus Solutions. A member of our team will
          get back to you within one business day.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setSubmitted(false);
            setService("");
          }}
          className="mt-2 border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
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
          <span className="font-heading text-lg font-semibold text-white">
            Send us a message
          </span>
          <span className="text-xs text-white/45">
            We reply within one business day.
          </span>
        </div>
      </div>

      {/* Name + Email */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="cf-name" className="text-white/70">
            Name
          </Label>
          <Input
            id="cf-name"
            name="name"
            placeholder="Jane Cooper"
            required
            className="border-white/10 bg-white/5 text-white placeholder:text-white/35 focus-visible:border-electric/60"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="cf-email" className="text-white/70">
            Email
          </Label>
          <Input
            id="cf-email"
            name="email"
            type="email"
            placeholder="jane@brokerage.com"
            required
            className="border-white/10 bg-white/5 text-white placeholder:text-white/35 focus-visible:border-electric/60"
          />
        </div>
      </div>

      {/* Phone + Company/Team */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="cf-phone" className="text-white/70">
            Phone
          </Label>
          <Input
            id="cf-phone"
            name="phone"
            type="tel"
            placeholder="(320) 331-0910"
            className="border-white/10 bg-white/5 text-white placeholder:text-white/35 focus-visible:border-electric/60"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="cf-company" className="text-white/70">
            Company / Team
          </Label>
          <Input
            id="cf-company"
            name="company"
            placeholder="Cooper Realty Group"
            className="border-white/10 bg-white/5 text-white placeholder:text-white/35 focus-visible:border-electric/60"
          />
        </div>
      </div>

      {/* Service of Interest */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="cf-service" className="text-white/70">
          Service of Interest
        </Label>
        <Select value={service} onValueChange={setService}>
          <SelectTrigger
            id="cf-service"
            className="w-full border-white/10 bg-white/5 text-white data-[placeholder]:text-white/35 focus-visible:border-electric/60 [&_svg]:text-white/50"
          >
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent className="border-white/10 bg-[#0d0d12] text-white">
            {SERVICES.map((s) => (
              <SelectItem
                key={s}
                value={s}
                className="focus:bg-electric/15 focus:text-white"
              >
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Message */}
      <div className="flex flex-1 flex-col gap-2">
        <Label htmlFor="cf-message" className="text-white/70">
          Message
        </Label>
        <Textarea
          id="cf-message"
          name="message"
          placeholder="Tell us about your goals and how we can help…"
          required
          rows={5}
          className="min-h-[140px] resize-none border-white/10 bg-white/5 text-white placeholder:text-white/35 focus-visible:border-electric/60"
        />
      </div>

      <Button
        type="submit"
        className="group mt-1 h-11 w-full gap-2 rounded-xl bg-gradient-to-r from-electric to-violet font-semibold text-white shadow-[0_0_30px_-8px_rgba(59,130,246,0.7)] transition-all hover:shadow-[0_0_40px_-6px_rgba(59,130,246,0.9)]"
      >
        Send Message
        <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Button>
    </form>
  );
}
