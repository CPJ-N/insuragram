import Image from "next/image";
import Link from "next/link";
import { HeroSection } from "@/components/hero-section";
import { ArrowRightIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection
        badge={{
          text: "New Feature:",
          action: {
            text: "Compare insurance plans instantly",
            href: "/compare",
          },
        }}
        title="Protect What Matters Most"
        description="Compare and buy insurance plans from top insurers at the best price"
        actions={[
          {
            text: "Get Started",
            href: "/policies",
            icon: <ArrowRightIcon className="h-4 w-4" />,
            variant: "default",
          },
          {
            text: "Learn More",
            href: "/about",
            variant: "outline",
          },
        ]}
        image={{
          light: "/insurance-hero.svg",
          dark: "/insurance-hero-dark.svg",
          alt: "Insurance Protection",
        }}
      />

      {/* Insurance Categories */}
      <section className="py-20 bg-[var(--brand-light-gray)]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-[var(--brand-charcoal)]">
            Insurance Solutions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {insuranceCategories.map((category) => (
              <div 
                key={category.title}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition border-2 border-[var(--brand-brown)] hover:border-[var(--brand-orange)]"
              >
                <div className="w-14 h-14 bg-[var(--brand-light-gray)] rounded-lg mb-4 flex items-center justify-center">
                  <Image
                    src={category.icon}
                    alt={category.title}
                    width={32}
                    height={32}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[var(--brand-charcoal)]">{category.title}</h3>
                <p className="text-[var(--brand-dark-brown)] mb-4">{category.description}</p>
                <Link
                  href={category.link}
                  className="text-[var(--brand-orange)] font-medium hover:text-[var(--brand-brown)]"
                >
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-[var(--brand-charcoal)]">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="w-16 h-16 mx-auto bg-[var(--brand-light-gray)] rounded-full flex items-center justify-center mb-4">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={32}
                    height={32}
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-[var(--brand-charcoal)]">{feature.title}</h3>
                <p className="text-[var(--brand-dark-brown)]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const insuranceCategories = [
  {
    title: "Life Insurance",
    description: "Secure your family's future with comprehensive life coverage",
    icon: "/icons/life.svg",
    link: "/life-insurance"
  },
  {
    title: "Health Insurance", 
    description: "Get the best medical coverage for you and your family",
    icon: "/icons/health.svg",
    link: "/health-insurance"
  },
  {
    title: "Car Insurance",
    description: "Protect your vehicle with comprehensive auto insurance",
    icon: "/icons/car.svg", 
    link: "/car-insurance"
  }
];

const features = [
  {
    title: "Best Prices",
    description: "Compare and get insurance at the most competitive rates",
    icon: "/icons/price.svg"
  },
  {
    title: "Expert Support",
    description: "Get assistance from our insurance experts 24/7",
    icon: "/icons/support.svg"
  },
  {
    title: "Fast Claims",
    description: "Quick and hassle-free claims settlement process",
    icon: "/icons/claims.svg"
  },
  {
    title: "100% Secure",
    description: "Your data is protected with bank-grade security",
    icon: "/icons/security.svg"
  }
];
