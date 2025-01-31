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
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
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

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
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
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--brand-charcoal)] mb-4">
              Why Choose Insuragram
            </h2>
            <p className="text-[var(--brand-charcoal)]/70 max-w-2xl mx-auto">
              We offer the best insurance experience with quick claims, extensive coverage, and round-the-clock support.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="relative group"
                variants={fadeIn}
                custom={index}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-orange)]/5 to-[var(--brand-brown)]/5 rounded-2xl transform group-hover:scale-105 transition-transform duration-300" />
                <div className="relative p-8 text-center">
                  <div className="w-16 h-16 bg-[var(--brand-orange)]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-[var(--brand-orange)]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--brand-charcoal)] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[var(--brand-charcoal)]/70">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Insurance Types Section */}
      <section className="py-20">
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
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--brand-charcoal)] mb-4">
              Insurance Solutions
            </h2>
            <p className="text-[var(--brand-charcoal)]/70 max-w-2xl mx-auto">
              Choose from our range of comprehensive insurance plans designed to protect you and your loved ones.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {insuranceTypes.map((type, index) => (
              <motion.div
                key={type.title}
                variants={fadeIn}
                custom={index}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link href={type.href} className="block">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={type.image}
                      alt={type.title}
                      width={400}
                      height={300}
                      className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
                    <div className="absolute bottom-0 left-0 p-8">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {type.title}
                      </h3>
                      <p className="text-white/90">
                        {type.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[var(--brand-orange)]/5 to-[var(--brand-brown)]/5">
        <motion.div 
          className="max-w-[1400px] mx-auto px-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
        >
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
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
    </div>
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
    image: "/image 1.png",
    href: "/life-insurance"
  }
];
