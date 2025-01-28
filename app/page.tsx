import Image from "next/image";
import Link from "next/link";
import { HeroSection } from "@/components/hero-section";
import { 
  Heart, 
  Activity, 
  Car, 
  PiggyBank, 
  Plane, 
  ShieldPlus,
  ArrowRightIcon,
  Search,
  Calculator,
  FileCheck,
  LayoutDashboard
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      
      {/* Hero Section */}
      <HeroSection
        badge={{
          text: "Compare & Save:",
          action: {
          text: "Get the best insurance rates today",
          href: "/compare",
          },
        }}
        title="Smart Insurance Decisions Made Simple"
        description="Compare quotes from top insurers, calculate premiums, and manage your policies all in one place"
        actions={[
          {
          text: "Compare Plans",
          href: "/compare",
          icon: <ArrowRightIcon className="h-4 w-4" />,
          variant: "default",
          }
        ]}
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
          <div className="w-14 h-14 bg-[var(--brand-light-gray)] rounded-lg mb-4 flex items-center justify-center text-[var(--brand-orange)]">
            {category.icon}
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
          <div className="w-16 h-16 mx-auto bg-[var(--brand-light-gray)] rounded-full flex items-center justify-center mb-4 text-[var(--brand-orange)]">
            {feature.icon}
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
    description: "Term life, whole life, and investment-linked policies",
    icon: <Heart className="w-8 h-8" />,
    link: "/life-insurance"
  },
  {
    title: "Health Insurance",
    description: "Medical, critical illness, and maternity coverage",
    icon: <Activity className="w-8 h-8" />,
    link: "/health-insurance"
  },
  {
    title: "Motor Insurance",
    description: "Comprehensive coverage for cars, bikes, and commercial vehicles",
    icon: <Car className="w-8 h-8" />,
    link: "/motor-insurance"
  },
  {
    title: "Investment Plans",
    description: "ULIPs and retirement planning solutions",
    icon: <PiggyBank className="w-8 h-8" />,
    link: "/investment-plans"
  },
  {
    title: "Travel Insurance",
    description: "Domestic and international travel protection",
    icon: <Plane className="w-8 h-8" />,
    link: "/travel-insurance"
  },
  {
    title: "Specialized Coverage",
    description: "Senior citizen, pet, and business insurance",
    icon: <ShieldPlus className="w-8 h-8" />,
    link: "/specialized-plans"
  }
];

const features = [
  {
    title: "Instant Comparisons",
    description: "Compare plans from multiple insurers in seconds",
    icon: <Search className="w-8 h-8" />
  },
  {
    title: "Premium Calculator",
    description: "Get accurate premium estimates with our advanced tools",
    icon: <Calculator className="w-8 h-8" />
  },
  {
    title: "Easy Claims",
    description: "Digital claim filing with real-time status tracking",
    icon: <FileCheck className="w-8 h-8" />
  },
  {
    title: "Policy Management",
    description: "Manage all your policies in one dashboard",
    icon: <LayoutDashboard className="w-8 h-8" />
  }
];
