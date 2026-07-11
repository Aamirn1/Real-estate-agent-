"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Building2,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  ArrowLeft,
  ChevronDown,
  Check,
  X,
} from "lucide-react";

const SERVICES = [
  "Marketing Consulting",
  "CRM Support",
  "Workflow Automation",
  "Virtual Assistance",
  "Outreach Support",
  "Digital Marketing",
  "Appointment Coordination",
  "Reporting & Analytics",
  "Not sure yet",
];

const PLANS = ["Trial ($300)", "Gold ($600)", "Platinum ($1200)", "Need help choosing"];

export function GetStartedForm() {
  const [submitted, setSubmitted] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [planOpen, setPlanOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    services: [] as string[],
    plan: "",
    message: "",
  });

  const toggleService = (s: string) => {
    setForm((f) => ({
      ...f,
      services: f.services.includes(s)
        ? f.services.filter((x) => x !== s)
        : [...f.services, s],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white p-8 shadow-[0_30px_80px_-20px_rgba(30,41,59,0.15)] sm:p-10"
      >
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-electric/15 blur-3xl" />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
          className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-electric"
        >
          <CheckCircle2 className="h-8 w-8 text-[#1a1a1a]" />
        </motion.div>
        <h2 className="relative mt-6 text-center font-heading text-2xl font-semibold text-[#1E293B]">
          Thank you!
        </h2>
        <p className="relative mt-2 text-center text-sm text-[#1E293B]/55">
          Your request has been received. A member of our team will reach out
          within 24 hours to discuss your goals and set up your account.
        </p>
        <a
          href="/"
          className="relative mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-electric to-violet py-3 text-sm font-semibold text-[#1a1a1a] shadow-[0_0_24px_-6px_rgba(37,99,235,0.3)] transition-all hover:shadow-[0_0_32px_-4px_rgba(56,189,248,0.4)]"
        >
          Back to Home
          <ArrowRight className="h-4 w-4" />
        </a>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white p-7 shadow-[0_30px_80px_-20px_rgba(30,41,59,0.15)] sm:p-9"
    >
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-electric/15 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-violet/15 blur-3xl" />

      <div className="relative">
        <a
          href="/"
          className="group flex items-center gap-1.5 text-sm font-medium text-[#1E293B]/55 transition-colors hover:text-[#1E293B]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E2E8F0] bg-[#1E293B]/5 transition-all group-hover:border-[#CBD5E1] group-hover:bg-[#1E293B]/8">
            <ArrowLeft className="h-4 w-4" />
          </span>
          Back
        </a>

        <div className="mt-20 mb-7 text-center">
          <h1 className="font-heading text-2xl font-semibold text-[#1E293B] sm:text-3xl">
            Get Started
          </h1>
          <p className="mt-2 text-sm text-[#1E293B]/50">
            Fill out the form below and our team will reach out within 24 hours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field icon={User} label="Full Name" type="text" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
            <Field icon={Building2} label="Company / Team" type="text" value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field icon={Mail} label="Email" type="email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
            <Field icon={Phone} label="Phone" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
          </div>

          <div className="relative">
            <label className="mb-1.5 block text-xs font-medium text-[#1E293B]/55">
              Service of Interest (select multiple)
            </label>
            <button
              type="button"
              onClick={() => { setServicesOpen(!servicesOpen); setPlanOpen(false); }}
              className="flex w-full items-center justify-between rounded-xl border border-[#E2E8F0] bg-[#1E293B]/5 px-4 py-3 text-sm text-[#1E293B] transition-colors hover:border-[#CBD5E1] focus:border-electric/50 focus:outline-none"
            >
              <span className={form.services.length > 0 ? "text-[#1E293B]" : "text-[#1E293B]/35"}>
                {form.services.length > 0 ? `${form.services.length} selected` : "Select services..."}
              </span>
              <ChevronDown className={`h-4 w-4 text-[#1E293B]/40 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="mt-2 space-y-1.5 rounded-xl border border-[#E2E8F0] bg-white p-2 shadow-lg">
                    {SERVICES.map((s) => {
                      const selected = form.services.includes(s);
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggleService(s)}
                          className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                            selected ? "bg-electric/15 text-[#1E293B]" : "text-[#1E293B]/70 hover:bg-[#1E293B]/5"
                          }`}
                        >
                          <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${selected ? "border-electric bg-electric" : "border-[#E2E8F0]"}`}>
                            {selected && <Check className="h-3 w-3 text-[#1a1a1a]" />}
                          </span>
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {form.services.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {form.services.map((s) => (
                  <span key={s} className="inline-flex items-center gap-1 rounded-full bg-electric/15 px-2.5 py-1 text-xs text-electric">
                    {s}
                    <button type="button" onClick={() => toggleService(s)} className="hover:text-[#1E293B]">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <label className="mb-1.5 block text-xs font-medium text-[#1E293B]/55">
              Interested Plan
            </label>
            <button
              type="button"
              onClick={() => { setPlanOpen(!planOpen); setServicesOpen(false); }}
              className="flex w-full items-center justify-between rounded-xl border border-[#E2E8F0] bg-[#1E293B]/5 px-4 py-3 text-sm text-[#1E293B] transition-colors hover:border-[#CBD5E1] focus:border-electric/50 focus:outline-none"
            >
              <span className={form.plan ? "text-[#1E293B]" : "text-[#1E293B]/35"}>
                {form.plan || "Select a plan..."}
              </span>
              <ChevronDown className={`h-4 w-4 text-[#1E293B]/40 transition-transform ${planOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {planOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="mt-2 space-y-1.5 rounded-xl border border-[#E2E8F0] bg-white p-2 shadow-lg">
                    {PLANS.map((p) => {
                      const selected = form.plan === p;
                      return (
                        <button
                          key={p}
                          type="button"
                          onClick={() => { setForm({ ...form, plan: p }); setPlanOpen(false); }}
                          className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                            selected ? "bg-violet/15 text-[#1E293B]" : "text-[#1E293B]/70 hover:bg-[#1E293B]/5"
                          }`}
                        >
                          <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${selected ? "border-violet bg-violet" : "border-[#E2E8F0]"}`}>
                            {selected && <Check className="h-3 w-3 text-[#1a1a1a]" />}
                          </span>
                          {p}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#1E293B]/55">
              Message (optional)
            </label>
            <textarea
              rows={3}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell us about your goals..."
              className="w-full resize-none rounded-xl border border-[#E2E8F0] bg-[#1E293B]/5 px-4 py-3 text-sm text-[#1E293B] placeholder:text-[#1E293B]/35 focus:border-electric/50 focus:outline-none focus:ring-1 focus:ring-electric/30"
            />
          </div>

          <button
            type="submit"
            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-electric to-violet py-3.5 text-sm font-semibold text-[#1a1a1a] shadow-[0_0_24px_-6px_rgba(37,99,235,0.3)] transition-all hover:shadow-[0_0_32px_-4px_rgba(56,189,248,0.4)]"
          >
            <span className="relative z-10">Submit Request</span>
            <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-[#1E293B]/40">
          By submitting, you agree to our{" "}
          <a href="/terms" className="text-electric hover:underline">Terms</a> and{" "}
          <a href="/privacy-policy" className="text-electric hover:underline">Privacy Policy</a>.
        </p>
      </div>
    </motion.div>
  );
}

function Field({
  icon: Icon,
  label,
  type,
  value,
  onChange,
  required,
}: {
  icon: React.ElementType;
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-[#1E293B]/55">
        {label} {required && <span className="text-electric">*</span>}
      </label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1E293B]/35" />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="w-full rounded-xl border border-[#E2E8F0] bg-[#1E293B]/5 py-3 pl-10 pr-4 text-sm text-[#1E293B] placeholder:text-[#1E293B]/35 focus:border-electric/50 focus:outline-none focus:ring-1 focus:ring-electric/30"
        />
      </div>
    </div>
  );
}
