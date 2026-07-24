"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Globe,
  ShieldCheck,
  CreditCard,
  MessageSquare,
  Megaphone,
  ArrowRight,
  Loader2,
  AlertCircle,
  Lock,
} from "lucide-react";
import { SignaturePad } from "./SignaturePad";
import type { AgreementPlan } from "@/lib/agreement-plans";

type Props = {
  plan: AgreementPlan;
};

export function AgreementForm({ plan }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [signature, setSignature] = useState<string | null>(null);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    dre: "",
    email: "",
    billingAddress: "",
    serviceArea: "",
  });
  const [consents, setConsents] = useState({
    terms: false,
    payment: false,
    sms: false,
    marketing: false,
  });

  function handleField(key: keyof typeof form, v: string) {
    setForm((f) => ({ ...f, [key]: v }));
  }

  function toggleConsent(key: keyof typeof consents) {
    setConsents((c) => ({ ...c, [key]: !c[key] }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;

    // validation
    if (!form.fullName || !form.phone || !form.dre || !form.email || !form.billingAddress || !form.serviceArea) {
      setStatus("error");
      setErrorMsg("Please fill in all required fields.");
      return;
    }
    if (!signature || signature === "drawing") {
      setStatus("error");
      setErrorMsg("Please draw your signature in the signature pad.");
      return;
    }
    if (!consents.terms || !consents.payment || !consents.sms || !consents.marketing) {
      setStatus("error");
      setErrorMsg("Please check all four consent boxes to continue.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");
    try {
      const resp = await fetch("/api/agreement/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: plan.key,
          fullName: form.fullName,
          phone: form.phone,
          dre: form.dre,
          email: form.email,
          billingAddress: form.billingAddress,
          serviceArea: form.serviceArea,
          signature, // base64 PNG
          consents,
        }),
      });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok || !data?.hosted_url) {
        const msg = data?.error || (resp.status === 503
          ? "Payment checkout is not configured yet. Your details have been recorded — our team will contact you to complete payment."
          : "Could not start checkout. Please try again.");
        setStatus("error");
        setErrorMsg(msg);
        return;
      }
      // Redirect to Coinbase Commerce hosted checkout
      window.location.href = data.hosted_url;
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  }

  return (
    <div className="rounded-3xl border border-[#94A3B8] bg-white p-7 shadow-[0_30px_80px_-20px_rgba(30,41,59,0.15)] sm:p-10">
      {/* form header */}
      <div className="mb-8 border-b border-[#E2E8F0] pb-6">
        <h2 className="font-heading text-2xl font-semibold text-[#000000]">
          {plan.name} — Sign-Up Form
        </h2>
        <p className="mt-2 text-sm text-[#000000]/60">
          Complete the form below to proceed to secure payment. All fields marked
          with <span className="text-electric">*</span> are required.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* two-column fields */}
        <div className="grid gap-5 sm:grid-cols-2">
          <Field icon={User} label="Full Name (As per your Banking Details)" required value={form.fullName} onChange={(v) => handleField("fullName", v)} placeholder="Anderson" />
          <Field icon={Phone} label="Phone (As per your Banking Details)" required value={form.phone} onChange={(v) => handleField("phone", v)} placeholder="012345678" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field icon={ShieldCheck} label="DRE / License #" required value={form.dre} onChange={(v) => handleField("dre", v)} placeholder="012345678" />
          <Field icon={Mail} label="Email Address" required type="email" value={form.email} onChange={(v) => handleField("email", v)} placeholder="abc@gmail.com" />
        </div>

        <Field icon={MapPin} label="Billing Address" required value={form.billingAddress} onChange={(v) => handleField("billingAddress", v)} placeholder="123 Elm Street, Apt 4B, Anytown, CA 90210" />

        <Field icon={Globe} label="Service Area (Minimum 3 Counties)" required value={form.serviceArea} onChange={(v) => handleField("serviceArea", v)} placeholder="e.g. Albany, Schenectady, Rensselaer" />

        {/* signature */}
        <div>
          <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#000000]/60">
            Signature <span className="text-electric">*</span>
          </label>
          <SignaturePad onChange={setSignature} hasContent={!!signature} />
        </div>

        {/* consents */}
        <div className="mt-2 flex flex-col gap-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5">
          <ConsentRow
            checked={consents.terms}
            onChange={() => toggleConsent("terms")}
            icon={ShieldCheck}
          >
            By checking this box, I confirm that I have read and understood the{" "}
            <a href="/terms" className="text-electric hover:underline">Terms and Conditions</a> and{" "}
            <a href="/privacy-policy" className="text-electric hover:underline">Privacy Policy</a>{" "}
            available on the Opus Global Solution Services LLC website, and agree to be bound by them.
          </ConsentRow>

          <ConsentRow
            checked={consents.payment}
            onChange={() => toggleConsent("payment")}
            icon={CreditCard}
          >
            By checking this box, I authorize Opus Global Solution LLC to process payment for the selected plan or service through its secure, PCI-compliant payment processor. I confirm that I have reviewed and accepted the Agreement, Scope of Services, Payment Terms, and Refund Policy. I understand that my card details are entered directly on the processor's secure platform and are not stored or handled by Opus Global Solution LLC.
          </ConsentRow>

          <ConsentRow
            checked={consents.sms}
            onChange={() => toggleConsent("sms")}
            icon={MessageSquare}
          >
            By checking this box, I agree to receive SMS notifications and alerts from Opus Global Solution LLC. Message frequency varies. Message &amp; data rates may apply. Text HELP to (320) 331-0910, (320) 331-8501, or (320) 331-3559 for assistance. Reply STOP to unsubscribe anytime.
          </ConsentRow>

          <ConsentRow
            checked={consents.marketing}
            onChange={() => toggleConsent("marketing")}
            icon={Megaphone}
          >
            I consent to receive occasional marketing messages from Opus Global Solution LLC. Reply STOP to unsubscribe anytime. Learn more on our{" "}
            <a href="/privacy-policy" className="text-electric hover:underline">Privacy Policy</a> page and{" "}
            <a href="/terms" className="text-electric hover:underline">Terms and Conditions</a>.
          </ConsentRow>
        </div>

        {/* error message */}
        {status === "error" && errorMsg && (
          <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm text-red-600">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* submit */}
        <motion.button
          type="submit"
          disabled={status === "loading"}
          whileHover={{ scale: status === "loading" ? 1 : 1.01 }}
          whileTap={{ scale: status === "loading" ? 1 : 0.99 }}
          className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#2563EB] to-[#38BDF8] py-4 text-sm font-semibold text-white shadow-[0_0_30px_-6px_rgba(37,99,235,0.5)] transition-all hover:shadow-[0_0_40px_-4px_rgba(56,189,248,0.6)] disabled:opacity-70"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="relative h-4 w-4 animate-spin" />
              <span className="relative">Processing…</span>
            </>
          ) : (
            <>
              <Lock className="relative h-4 w-4" />
              <span className="relative">Continue to Secure Payment</span>
              <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </motion.button>

        <p className="text-center text-xs text-[#000000]/40">
          You will be redirected to our secure payment processor (Coinbase Commerce) to complete your{" "}
          {plan.priceLabel} payment.
        </p>
      </form>
    </div>
  );
}

/* ---------- Field ---------- */
function Field({
  icon: Icon,
  label,
  type = "text",
  value,
  onChange,
  required,
  placeholder,
}: {
  icon: React.ElementType;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#000000]/60">
        {label} {required && <span className="text-electric">*</span>}
      </label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#000000]/35" />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          placeholder={placeholder}
          className="w-full rounded-xl border border-[#94A3B8] bg-white py-3 pl-10 pr-4 text-sm text-[#000000] placeholder:text-[#000000]/35 focus:border-electric/50 focus:outline-none focus:ring-1 focus:ring-electric/30"
        />
      </div>
    </div>
  );
}

/* ---------- ConsentRow ---------- */
function ConsentRow({
  checked,
  onChange,
  icon: Icon,
  children,
}: {
  checked: boolean;
  onChange: () => void;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={onChange}
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${
          checked
            ? "border-electric bg-electric text-white"
            : "border-[#94A3B8] bg-white text-transparent hover:border-electric/50"
        }`}
      >
        {checked && (
          <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none">
            <path d="M2.5 6.5L5 9L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
      <div className="flex-1 text-xs leading-relaxed text-[#000000]/75">
        {children}
      </div>
    </label>
  );
}
