"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  Building2,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { GlassCard } from "@/components/leadsphere/primitives";
import { cn } from "@/lib/utils";

type Mode = "signin" | "signup";

interface AuthFormProps {
  mode: Mode;
}

export function AuthForm({ mode }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    password: "",
    confirm: "",
    agree: false,
    remember: false,
  });

  const isSignup = mode === "signup";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <GlassCard strong sheen className="relative w-full max-w-md overflow-hidden p-8">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-400/15 blur-3xl" />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
          className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-electric"
        >
          <CheckCircle2 className="h-8 w-8 text-white" />
        </motion.div>
        <h2 className="relative mt-6 text-center font-heading text-2xl font-semibold text-white">
          {isSignup ? "Account created!" : "Welcome back!"}
        </h2>
        <p className="relative mt-2 text-center text-sm text-white/55">
          {isSignup
            ? "We've sent a confirmation email. Our team will reach out within 24 hours to set up your account."
            : "Redirecting you to your dashboard…"}
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="relative mt-6 w-full rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-medium text-white/70 transition-colors hover:bg-white/10"
        >
          Back to form
        </button>
      </GlassCard>
    );
  }

  return (
    <GlassCard strong sheen className="relative w-full max-w-md overflow-hidden p-7 sm:p-8">
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-electric/15 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-violet/15 blur-3xl" />

      <div className="relative">
        {/* Header */}
        <div className="mb-7 flex flex-col items-center text-center">
          <span className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-electric via-violet to-cyan shadow-[0_0_24px_-6px_rgba(59,130,246,0.7)]">
            <Sparkles className="h-6 w-6 text-white" strokeWidth={2.2} />
          </span>
          <h1 className="font-heading text-2xl font-semibold text-white">
            {isSignup ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-1.5 text-sm text-white/50">
            {isSignup
              ? "Start scaling your real estate business today"
              : "Sign in to your Opus Solutions account"}
          </p>
        </div>

        {/* Social auth */}
        <div className="mb-5 grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-medium text-white/75 transition-colors hover:bg-white/10">
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google
          </button>
          <button className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-medium text-white/75 transition-colors hover:bg-white/10">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.868 0 2.222-1.01 3.882-1.01.613 0 2.817.06 4.303 2.13-.11.07-2.422 1.41-2.422 4.28 0 3.39 2.962 4.61 3.012 4.63z" />
            </svg>
            Apple
          </button>
        </div>

        {/* Divider */}
        <div className="mb-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-white/35">or continue with email</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div className="grid grid-cols-2 gap-3">
              <FormField
                icon={User}
                type="text"
                placeholder="Full name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                required
              />
              <FormField
                icon={Building2}
                type="text"
                placeholder="Company"
                value={form.company}
                onChange={(v) => setForm({ ...form, company: v })}
              />
            </div>
          )}

          <FormField
            icon={Mail}
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
            required
          />

          <FormField
            icon={Lock}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={(v) => setForm({ ...form, password: v })}
            required
            trailing={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-white/40 transition-colors hover:text-white/70"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
          />

          {isSignup && (
            <FormField
              icon={Lock}
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm password"
              value={form.confirm}
              onChange={(v) => setForm({ ...form, confirm: v })}
              required
              trailing={
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="text-white/40 transition-colors hover:text-white/70"
                >
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
            />
          )}

          {/* Remember / Forgot / Terms */}
          {!isSignup ? (
            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-xs text-white/55">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={(e) => setForm({ ...form, remember: e.target.checked })}
                  className="h-3.5 w-3.5 rounded border-white/20 bg-white/5 accent-electric"
                />
                Remember me
              </label>
              <a href="#" className="text-xs font-medium text-electric hover:text-electric/80">
                Forgot password?
              </a>
            </div>
          ) : (
            <label className="flex cursor-pointer items-start gap-2 text-xs text-white/55">
              <input
                type="checkbox"
                checked={form.agree}
                onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                required
                className="mt-0.5 h-3.5 w-3.5 rounded border-white/20 bg-white/5 accent-electric"
              />
              <span>
                I agree to the{" "}
                <a href="/terms" className="text-electric hover:underline">Terms</a> and{" "}
                <a href="/privacy-policy" className="text-electric hover:underline">Privacy Policy</a>
              </span>
            </label>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-electric to-violet py-3.5 text-sm font-semibold text-white shadow-[0_0_24px_-6px_rgba(59,130,246,0.7)] transition-all hover:shadow-[0_0_32px_-4px_rgba(139,92,246,0.85)]"
          >
            <span className="relative z-10">
              {isSignup ? "Create Account" : "Sign In"}
            </span>
            <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </button>
        </form>

        {/* Switch */}
        <p className="mt-6 text-center text-sm text-white/50">
          {isSignup ? "Already have an account? " : "Don't have an account? "}
          <a
            href={isSignup ? "/signin" : "/signup"}
            className="font-medium text-electric hover:underline"
          >
            {isSignup ? "Sign in" : "Sign up free"}
          </a>
        </p>
      </div>
    </GlassCard>
  );
}

function FormField({
  icon: Icon,
  type,
  placeholder,
  value,
  onChange,
  required,
  trailing,
}: {
  icon: React.ElementType;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  trailing?: React.ReactNode;
}) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className={cn(
          "w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-10 text-sm text-white placeholder:text-white/35 transition-colors",
          "focus:border-electric/50 focus:bg-white/8 focus:outline-none focus:ring-1 focus:ring-electric/30"
        )}
      />
      {trailing && (
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
          {trailing}
        </div>
      )}
    </div>
  );
}
