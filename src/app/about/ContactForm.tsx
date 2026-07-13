"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

/**
 * Contact form for the About page. Client component because it manages
 * local form state and handles submit events.
 */
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

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
        className="flex h-full min-h-[420px] flex-col items-center justify-center gap-4 p-8 text-center"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-electric/15">
          <CheckCircle2 className="h-7 w-7 text-electric" />
        </span>
        <h3 className="font-heading text-2xl font-semibold text-black">
          Message received
        </h3>
        <p className="max-w-sm text-sm leading-relaxed text-black">
          Thanks for reaching out to Opus Global Solution. A member of our team will
          get back to you within one business day.
        </p>
        <Button
          variant="outline"
          onClick={() => setSubmitted(false)}
          className="mt-2 border-black/15 bg-black/5 text-black hover:bg-black/10 hover:text-black"
        >
          Send another message
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-7 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="contact-name" className="text-black">
            Name
          </Label>
          <Input
            id="contact-name"
            name="name"
            placeholder="Jane Cooper"
            required
            className="border-black/15 bg-black/5 text-black placeholder:text-black focus-visible:border-electric/60"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="contact-email" className="text-black">
            Email
          </Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            placeholder="jane@brokerage.com"
            required
            className="border-black/15 bg-black/5 text-black placeholder:text-black focus-visible:border-electric/60"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-phone" className="text-black">
          Phone
        </Label>
        <Input
          id="contact-phone"
          name="phone"
          type="tel"
          placeholder="(320) 331-0910"
          className="border-black/15 bg-black/5 text-black placeholder:text-black focus-visible:border-electric/60"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-message" className="text-black">
          Message
        </Label>
        <Textarea
          id="contact-message"
          name="message"
          placeholder="Tell us about your goals and how we can help…"
          required
          rows={5}
          className="resize-none border-black/15 bg-black/5 text-black placeholder:text-black focus-visible:border-electric/60"
        />
      </div>

      <Button
        type="submit"
        className="group mt-1 h-11 w-full gap-2 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#38BDF8] font-semibold text-white shadow-[0_0_30px_-8px_rgba(37,99,235,0.7)] transition-all hover:shadow-[0_0_40px_-6px_rgba(37,99,235,0.9)]"
      >
        Send Message
        <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Button>
    </form>
  );
}
