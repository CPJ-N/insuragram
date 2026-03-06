"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Clock,
  Award,
  CheckCircle,
  Sparkles,
  FileText,
  Camera,
  Brain,
  Zap,
  TrendingUp,
  Users,
  ChevronRight,
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  return (
    <main id="main-content" className="flex flex-col min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section
        className="relative pt-32 pb-24 lg:pt-40 lg:pb-32"
        aria-labelledby="hero-heading"
      >
        {/* Background effects */}
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 hero-grid opacity-[0.03]" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[var(--brand-orange)]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[var(--brand-brown)]/10 rounded-full blur-[100px]" />

        <motion.div
          className="max-w-[1200px] mx-auto px-6 relative"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              className="inline-flex items-center gap-2 bg-[var(--brand-orange)]/8 border border-[var(--brand-orange)]/15 rounded-full px-4 py-1.5 mb-8"
              variants={fadeIn}
            >
              <Sparkles className="w-4 h-4 text-[var(--brand-orange)]" />
              <span className="text-sm font-medium text-[var(--brand-orange)]">
                AI-Powered Insurance Platform
              </span>
            </motion.div>

            <motion.h1
              id="hero-heading"
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--brand-charcoal)] mb-6 leading-[1.1]"
              variants={fadeIn}
            >
              Insurance that{" "}
              <span className="bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-brown)] bg-clip-text text-transparent">
                understands
              </span>{" "}
              you
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-[var(--brand-charcoal)]/60 mb-10 max-w-2xl mx-auto leading-relaxed"
              variants={fadeIn}
            >
              AI translates your policy into plain English, files claims from photos, and finds coverage gaps — so you never overpay or get caught off guard.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeIn}
            >
              <Button
                size="lg"
                className="bg-[var(--brand-orange)] hover:bg-[var(--brand-orange)]/90 text-white h-12 px-8 text-base shadow-lg shadow-[var(--brand-orange)]/20"
                asChild
              >
                <Link href="/dashboard" className="flex items-center gap-2">
                  Try the AI Dashboard <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[var(--brand-charcoal)]/15 text-[var(--brand-charcoal)]/70 hover:bg-[var(--brand-charcoal)]/3 h-12 px-8 text-base"
                asChild
              >
                <Link href="/get-quote">Get a Free Quote</Link>
              </Button>
            </motion.div>
          </div>

          {/* Dashboard Preview */}
          <motion.div
            className="mt-16 lg:mt-20 relative"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="relative mx-auto max-w-5xl">
              {/* Browser chrome mockup */}
              <div className="rounded-xl border border-[var(--brand-charcoal)]/10 bg-white shadow-2xl shadow-[var(--brand-charcoal)]/8 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 bg-[var(--brand-charcoal)]/[0.03] border-b border-[var(--brand-charcoal)]/8">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[var(--brand-charcoal)]/10" />
                    <div className="w-3 h-3 rounded-full bg-[var(--brand-charcoal)]/10" />
                    <div className="w-3 h-3 rounded-full bg-[var(--brand-charcoal)]/10" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="bg-[var(--brand-charcoal)]/5 rounded-md px-4 py-1 text-xs text-[var(--brand-charcoal)]/40 font-mono">
                      insuragram.com/dashboard
                    </div>
                  </div>
                </div>
                {/* Dashboard mock content */}
                <div className="p-6 md:p-8 grid md:grid-cols-3 gap-4">
                  <DashboardMockCard
                    icon={FileText}
                    title="PolicyPlain"
                    desc="Translate policy jargon to plain English"
                    color="orange"
                  />
                  <DashboardMockCard
                    icon={Camera}
                    title="ClaimBot"
                    desc="Snap a photo, file a claim instantly"
                    color="brown"
                  />
                  <DashboardMockCard
                    icon={Brain}
                    title="Coverage AI"
                    desc="Find gaps before they find you"
                    color="charcoal"
                  />
                </div>
              </div>
              {/* Glow behind */}
              <div className="absolute -inset-4 bg-gradient-to-b from-[var(--brand-orange)]/5 to-transparent rounded-2xl -z-10 blur-2xl" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Metrics Bar */}
      <section className="py-12 border-y border-[var(--brand-charcoal)]/8" aria-label="Trust indicators">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {metrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[var(--brand-charcoal)] mb-1">
                  {metric.value}
                </div>
                <div className="text-sm text-[var(--brand-charcoal)]/50">
                  {metric.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* AI Features Bento Grid */}
      <section
        className="py-24"
        aria-labelledby="features-heading"
      >
        <motion.div
          className="max-w-[1200px] mx-auto px-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div className="text-center mb-16" variants={fadeIn}>
            <p className="text-sm font-semibold text-[var(--brand-orange)] uppercase tracking-wider mb-3">
              AI-Powered Tools
            </p>
            <h2
              id="features-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--brand-charcoal)] mb-4"
            >
              Your insurance, decoded
            </h2>
            <p className="text-lg text-[var(--brand-charcoal)]/60 max-w-2xl mx-auto">
              Three AI tools that turn complex insurance into something you actually understand.
            </p>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* PolicyPlain - Large */}
            <motion.div
              className="lg:col-span-2 group relative rounded-2xl border border-[var(--brand-charcoal)]/8 bg-gradient-to-br from-white to-[var(--brand-orange)]/[0.02] p-8 md:p-10 overflow-hidden hover:border-[var(--brand-orange)]/20 transition-colors"
              variants={fadeIn}
            >
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-[var(--brand-orange)]/10 flex items-center justify-center mb-6">
                  <FileText className="w-6 h-6 text-[var(--brand-orange)]" />
                </div>
                <h3 className="text-2xl font-bold text-[var(--brand-charcoal)] mb-3">
                  PolicyPlain Translator
                </h3>
                <p className="text-[var(--brand-charcoal)]/60 mb-6 max-w-lg leading-relaxed">
                  Paste your insurance policy and our AI translates every section into plain English. It highlights what matters, flags coverage gaps, and builds a glossary of terms — all in seconds.
                </p>
                <Link
                  href="/dashboard/policy-translator"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand-orange)] hover:gap-2 transition-all"
                >
                  Try PolicyPlain <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              {/* Decorative mock */}
              <div className="absolute right-0 bottom-0 w-64 h-48 bg-gradient-to-tl from-[var(--brand-orange)]/5 to-transparent rounded-tl-3xl" />
            </motion.div>

            {/* ClaimBot */}
            <motion.div
              className="group relative rounded-2xl border border-[var(--brand-charcoal)]/8 bg-gradient-to-br from-white to-[var(--brand-brown)]/[0.02] p-8 overflow-hidden hover:border-[var(--brand-brown)]/20 transition-colors"
              variants={fadeIn}
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--brand-brown)]/10 flex items-center justify-center mb-6">
                <Camera className="w-6 h-6 text-[var(--brand-brown)]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--brand-charcoal)] mb-3">
                ClaimBot
              </h3>
              <p className="text-[var(--brand-charcoal)]/60 mb-6 leading-relaxed">
                Upload photos of damage — AI analyzes the images, estimates costs, and generates a ready-to-submit claim.
              </p>
              <Link
                href="/dashboard/claim-bot"
                className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand-brown)] hover:gap-2 transition-all"
              >
                Try ClaimBot <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Smaller feature cards */}
            <motion.div
              className="rounded-2xl border border-[var(--brand-charcoal)]/8 bg-white p-6 hover:border-[var(--brand-charcoal)]/15 transition-colors"
              variants={fadeIn}
            >
              <Zap className="w-8 h-8 text-[var(--brand-orange)] mb-4" />
              <h3 className="font-semibold text-[var(--brand-charcoal)] mb-2">Instant Quotes</h3>
              <p className="text-sm text-[var(--brand-charcoal)]/60">
                Get coverage estimates in under 60 seconds with AI-powered risk assessment.
              </p>
            </motion.div>

            <motion.div
              className="rounded-2xl border border-[var(--brand-charcoal)]/8 bg-white p-6 hover:border-[var(--brand-charcoal)]/15 transition-colors"
              variants={fadeIn}
            >
              <TrendingUp className="w-8 h-8 text-[var(--brand-orange)] mb-4" />
              <h3 className="font-semibold text-[var(--brand-charcoal)] mb-2">Smart Comparisons</h3>
              <p className="text-sm text-[var(--brand-charcoal)]/60">
                Compare plans side-by-side with AI highlighting the differences that matter to you.
              </p>
            </motion.div>

            <motion.div
              className="rounded-2xl border border-[var(--brand-charcoal)]/8 bg-white p-6 hover:border-[var(--brand-charcoal)]/15 transition-colors"
              variants={fadeIn}
            >
              <Shield className="w-8 h-8 text-[var(--brand-orange)] mb-4" />
              <h3 className="font-semibold text-[var(--brand-charcoal)] mb-2">24/7 AI Support</h3>
              <p className="text-sm text-[var(--brand-charcoal)]/60">
                Get answers about your coverage, claims status, or policy questions any time.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section
        className="py-24 bg-[var(--brand-charcoal)]/[0.02]"
        aria-labelledby="how-it-works-heading"
      >
        <motion.div
          className="max-w-[1200px] mx-auto px-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div className="text-center mb-16" variants={fadeIn}>
            <p className="text-sm font-semibold text-[var(--brand-orange)] uppercase tracking-wider mb-3">
              How It Works
            </p>
            <h2
              id="how-it-works-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--brand-charcoal)] mb-4"
            >
              Three steps to clarity
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className="relative text-center"
                variants={fadeIn}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--brand-orange)]/10 mb-6">
                  <span className="text-xl font-bold text-[var(--brand-orange)]">
                    {index + 1}
                  </span>
                </div>
                {/* Connector line (hidden on mobile and last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-[var(--brand-orange)]/15" />
                )}
                <h3 className="text-lg font-semibold text-[var(--brand-charcoal)] mb-2">
                  {step.title}
                </h3>
                <p className="text-[var(--brand-charcoal)]/60 max-w-xs mx-auto">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Social Proof / Testimonials */}
      <section
        className="py-24"
        aria-labelledby="testimonials-heading"
      >
        <motion.div
          className="max-w-[1200px] mx-auto px-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div className="text-center mb-16" variants={fadeIn}>
            <p className="text-sm font-semibold text-[var(--brand-orange)] uppercase tracking-wider mb-3">
              Testimonials
            </p>
            <h2
              id="testimonials-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--brand-charcoal)] mb-4"
            >
              Trusted by thousands
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <motion.article
                key={testimonial.name}
                className="rounded-2xl border border-[var(--brand-charcoal)]/8 bg-white p-8 hover:shadow-lg hover:shadow-[var(--brand-charcoal)]/5 transition-shadow"
                variants={fadeIn}
              >
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating
                          ? "text-[var(--brand-orange)]"
                          : "text-gray-200"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[var(--brand-charcoal)]/80 mb-6 leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--brand-orange)]/20 to-[var(--brand-brown)]/20 flex items-center justify-center">
                    <span className="text-sm font-semibold text-[var(--brand-orange)]">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[var(--brand-charcoal)]">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-[var(--brand-charcoal)]/50">
                      {testimonial.policy}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section
        className="py-24 relative overflow-hidden"
        aria-labelledby="cta-heading"
      >
        <div className="absolute inset-0 bg-[var(--brand-charcoal)]" />
        <div className="absolute inset-0 hero-grid opacity-[0.04]" />
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-[var(--brand-orange)]/15 rounded-full blur-[120px]" />

        <motion.div
          className="max-w-[1200px] mx-auto px-6 relative"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
        >
          <div className="max-w-2xl mx-auto text-center">
            <motion.h2
              id="cta-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
              variants={fadeIn}
            >
              Stop guessing.{" "}
              <span className="bg-gradient-to-r from-[var(--brand-orange)] to-[#e8935b] bg-clip-text text-transparent">
                Start understanding.
              </span>
            </motion.h2>
            <motion.p
              className="text-lg text-white/60 mb-10"
              variants={fadeIn}
            >
              Upload your policy and let AI show you exactly what you&apos;re paying for — and what you&apos;re missing.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeIn}
            >
              <Button
                size="lg"
                className="bg-[var(--brand-orange)] hover:bg-[var(--brand-orange)]/90 text-white h-12 px-8 text-base shadow-lg shadow-[var(--brand-orange)]/30"
                asChild
              >
                <Link href="/dashboard" className="flex items-center gap-2">
                  Open AI Dashboard <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 h-12 px-8 text-base"
                asChild
              >
                <Link href="/contact">Talk to an Expert</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

/* ── Helper Components ────────────────────────── */

function DashboardMockCard({
  icon: Icon,
  title,
  desc,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  color: "orange" | "brown" | "charcoal";
}) {
  const colorMap = {
    orange: "bg-[var(--brand-orange)]/10 text-[var(--brand-orange)]",
    brown: "bg-[var(--brand-brown)]/10 text-[var(--brand-brown)]",
    charcoal: "bg-[var(--brand-charcoal)]/10 text-[var(--brand-charcoal)]",
  };
  return (
    <div className="rounded-xl border border-[var(--brand-charcoal)]/8 bg-[var(--brand-charcoal)]/[0.015] p-5 flex flex-col gap-3">
      <div className={`w-10 h-10 rounded-lg ${colorMap[color]} flex items-center justify-center`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="font-semibold text-sm text-[var(--brand-charcoal)]">{title}</p>
        <p className="text-xs text-[var(--brand-charcoal)]/50 mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

/* ── Data ─────────────────────────────────────── */

const metrics = [
  { value: "50K+", label: "Policies Analyzed" },
  { value: "4.8/5", label: "Customer Rating" },
  { value: "<30s", label: "Avg. Translation Time" },
  { value: "A+", label: "BBB Rating" },
];

const steps = [
  {
    title: "Upload your policy",
    description:
      "Paste the text or upload a PDF of your current insurance policy.",
  },
  {
    title: "AI analyzes it",
    description:
      "Claude reads every clause, identifies what matters, and flags what's missing.",
  },
  {
    title: "Get plain answers",
    description:
      "Receive a clear summary, section-by-section translation, and coverage gap report.",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    policy: "Health Insurance",
    rating: 5,
    quote:
      "PolicyPlain saved me from a $4,000 surprise. It flagged that my plan didn't cover out-of-network labs — something I never would have caught myself.",
  },
  {
    name: "Michael Chen",
    policy: "Car Insurance",
    rating: 5,
    quote:
      "I uploaded a photo of the fender damage and ClaimBot had a draft claim with cost estimates in 20 seconds. Filed and approved within days.",
  },
  {
    name: "Emily Rodriguez",
    policy: "Life Insurance",
    rating: 5,
    quote:
      "Finally understand what I'm actually paying for. The plain English translation made me realize I was double-covered on dental — saved $40/month.",
  },
];
