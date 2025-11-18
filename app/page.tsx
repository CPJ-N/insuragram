"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Clock, Award, CheckCircle } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  return (
    <main id="main-content" className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section
        className="relative pt-32 pb-20 overflow-hidden"
        aria-labelledby="hero-heading"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-orange)]/5 to-[var(--brand-brown)]/5" />
        <motion.div 
          className="max-w-[1400px] mx-auto px-6 relative"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <motion.div 
                className="inline-flex items-center bg-[var(--brand-orange)]/10 rounded-full px-4 py-1.5 mb-6"
                variants={fadeIn}
              >
                <span className="text-sm font-medium text-[var(--brand-orange)]">
                  Compare & Save up to 45% on Insurance
                </span>
              </motion.div>
              <motion.h1
                id="hero-heading"
                className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-brown)] bg-clip-text text-transparent mb-6"
                variants={fadeIn}
              >
                Protect What Matters Most
              </motion.h1>
              <motion.p 
                className="text-xl text-[var(--brand-charcoal)]/70 mb-8 max-w-2xl mx-auto lg:mx-0"
                variants={fadeIn}
              >
                Comprehensive insurance solutions tailored to your needs. Get instant quotes and secure coverage in minutes.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                variants={fadeIn}
              >
                <Button 
                  size="lg" 
                  className="bg-[var(--brand-orange)] hover:bg-[var(--brand-orange)]/90 text-white"
                  asChild
                >
                  <Link href="/get-quote" className="flex items-center gap-2">
                    Get Started <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-[var(--brand-orange)] text-[var(--brand-orange)] hover:bg-[var(--brand-orange)]/5"
                  asChild
                >
                  <Link href="/compare">Compare Plans</Link>
                </Button>
              </motion.div>
            </div>
            <motion.div 
              className="flex-1 relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative w-full aspect-square max-w-[600px] mx-auto">
                <Image
                  src="/Frame 1400001808.png"
                  alt="Insurance Protection"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-orange)]/20 to-transparent rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-12 bg-white border-y" aria-label="Trust indicators">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <p className="text-sm text-[var(--brand-charcoal)]/60 mb-6 text-center">
              Trusted by over 50,000+ customers nationwide
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center w-full max-w-4xl">
              <motion.div
                className="flex flex-col items-center text-center"
                whileHover={{ y: -5 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-[var(--brand-orange)] mb-2">
                  4.8/5
                </div>
                <div className="text-sm text-[var(--brand-charcoal)]/70">
                  Customer Rating
                </div>
              </motion.div>
              <motion.div
                className="flex flex-col items-center text-center"
                whileHover={{ y: -5 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-[var(--brand-orange)] mb-2">
                  50K+
                </div>
                <div className="text-sm text-[var(--brand-charcoal)]/70">
                  Happy Customers
                </div>
              </motion.div>
              <motion.div
                className="flex flex-col items-center text-center"
                whileHover={{ y: -5 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-[var(--brand-orange)] mb-2">
                  24/7
                </div>
                <div className="text-sm text-[var(--brand-charcoal)]/70">
                  Support Available
                </div>
              </motion.div>
              <motion.div
                className="flex flex-col items-center text-center"
                whileHover={{ y: -5 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-[var(--brand-orange)] mb-2">
                  A+
                </div>
                <div className="text-sm text-[var(--brand-charcoal)]/70">
                  BBB Rating
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="py-20 bg-gradient-to-b from-white to-gray-50"
        aria-labelledby="features-heading"
      >
        <motion.div 
          className="max-w-[1400px] mx-auto px-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div
            className="text-center mb-16"
            variants={fadeIn}
          >
            <h2
              id="features-heading"
              className="text-3xl md:text-4xl font-bold text-[var(--brand-charcoal)] mb-4"
            >
              Why Choose Insuragram
            </h2>
            <p className="text-[var(--brand-charcoal)]/70 max-w-2xl mx-auto">
              We offer the best insurance experience with quick claims, extensive coverage, and round-the-clock support.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" role="list">
            {features.map((feature, index) => (
              <motion.article
                key={feature.title}
                className="relative group"
                variants={fadeIn}
                custom={index}
                role="listitem"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-orange)]/5 to-[var(--brand-brown)]/5 rounded-2xl transform group-hover:scale-105 transition-transform duration-300" aria-hidden="true" />
                <div className="relative p-8 text-center">
                  <div className="w-16 h-16 bg-[var(--brand-orange)]/10 rounded-2xl flex items-center justify-center mx-auto mb-6" aria-hidden="true">
                    <feature.icon className="w-8 h-8 text-[var(--brand-orange)]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--brand-charcoal)] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[var(--brand-charcoal)]/70">
                    {feature.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Insurance Types Section */}
      <section
        className="py-20"
        aria-labelledby="insurance-types-heading"
      >
        <motion.div 
          className="max-w-[1400px] mx-auto px-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div
            className="text-center mb-16"
            variants={fadeIn}
          >
            <h2
              id="insurance-types-heading"
              className="text-3xl md:text-4xl font-bold text-[var(--brand-charcoal)] mb-4"
            >
              Insurance Solutions
            </h2>
            <p className="text-[var(--brand-charcoal)]/70 max-w-2xl mx-auto">
              Choose from our range of comprehensive insurance plans designed to protect you and your loved ones.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {insuranceTypes.map((type, index) => (
              <motion.article
                key={type.title}
                variants={fadeIn}
                custom={index}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link
                  href={type.href}
                  className="block focus-ring"
                  aria-label={`Learn more about ${type.title}: ${type.description}`}
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={type.image}
                      alt={`${type.title} - ${type.description}`}
                      width={400}
                      height={300}
                      className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" aria-hidden="true" />
                    <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                        {type.title}
                      </h3>
                      <p className="text-sm md:text-base text-white/90">
                        {type.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section
        className="py-20 bg-white"
        aria-labelledby="testimonials-heading"
      >
        <motion.div
          className="max-w-[1400px] mx-auto px-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div className="text-center mb-16" variants={fadeIn}>
            <h2
              id="testimonials-heading"
              className="text-3xl md:text-4xl font-bold text-[var(--brand-charcoal)] mb-4"
            >
              What Our Customers Say
            </h2>
            <p className="text-[var(--brand-charcoal)]/70 max-w-2xl mx-auto">
              Don&apos;t just take our word for it - hear from thousands of satisfied customers
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.article
                key={testimonial.name}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                variants={fadeIn}
                custom={index}
              >
                <div className="flex items-center gap-1 mb-4" aria-label={`${testimonial.rating} out of 5 stars`}>
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating
                          ? "text-[var(--brand-orange)]"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[var(--brand-charcoal)]/80 mb-6 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[var(--brand-orange)]/10 flex items-center justify-center">
                    <span className="text-lg font-semibold text-[var(--brand-orange)]">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--brand-charcoal)]">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-[var(--brand-charcoal)]/60">
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
        className="py-20 bg-gradient-to-br from-[var(--brand-orange)]/5 to-[var(--brand-brown)]/5"
        aria-labelledby="cta-heading"
      >
        <motion.div 
          className="max-w-[1400px] mx-auto px-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
        >
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              id="cta-heading"
              className="text-3xl md:text-4xl font-bold text-[var(--brand-charcoal)] mb-6"
              variants={fadeIn}
            >
              Ready to Get Started?
            </motion.h2>
            <motion.p 
              className="text-xl text-[var(--brand-charcoal)]/70 mb-8"
              variants={fadeIn}
            >
              Join thousands of satisfied customers who trust us with their insurance needs.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeIn}
            >
              <Button 
                size="lg" 
                className="bg-[var(--brand-orange)] hover:bg-[var(--brand-orange)]/90 text-white"
                asChild
              >
                <Link href="/get-quote">Get Your Quote</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-[var(--brand-orange)] text-[var(--brand-orange)] hover:bg-[var(--brand-orange)]/5"
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

const features = [
  {
    title: "Instant Coverage",
    description: "Get insured in minutes with our streamlined digital process",
    icon: Clock
  },
  {
    title: "Best Rates",
    description: "Compare and choose from competitive insurance rates",
    icon: Award
  },
  {
    title: "24/7 Support",
    description: "Round-the-clock customer support when you need it most",
    icon: Shield
  },
  {
    title: "Easy Claims",
    description: "Quick and hassle-free claims process with fast payouts",
    icon: CheckCircle
  }
];

const insuranceTypes = [
  {
    title: "Car Insurance",
    description: "Comprehensive coverage for your vehicle",
    image: "/image 1.png",
    href: "/car-insurance"
  },
  {
    title: "Health Insurance",
    description: "Quality healthcare coverage for you and your family",
    image: "/image 2.png",
    href: "/health-insurance"
  },
  {
    title: "Life Insurance",
    description: "Secure your family's financial future",
    image: "/image 2.png", // TODO: Replace with unique life insurance image
    href: "/life-insurance"
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    policy: "Health Insurance",
    rating: 5,
    quote: "Insuragram made finding the right health insurance plan so easy. The comparison tool was incredibly helpful, and I saved 30% compared to my previous provider!"
  },
  {
    name: "Michael Chen",
    policy: "Car Insurance",
    rating: 5,
    quote: "Best insurance experience I've ever had. The claims process was smooth and quick. I got my car repaired within days without any hassle."
  },
  {
    name: "Emily Rodriguez",
    policy: "Life Insurance",
    rating: 5,
    quote: "Peace of mind knowing my family is protected. The agents were knowledgeable and helped me choose the perfect coverage for my needs."
  }
];
