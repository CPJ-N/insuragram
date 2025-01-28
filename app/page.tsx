import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
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
      <section className="py-20 bg-muted">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
        Insurance Solutions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {insuranceCategories.map((category) => (
          <Card key={category.title}>
            <CardContent className="pt-6">
              <div className="w-14 h-14 bg-muted rounded-lg mb-4 flex items-center justify-center text-primary">
                {category.icon}
              </div>
              <CardHeader className="p-0">
                <CardTitle className="text-xl mb-2">{category.title}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <Button variant="link" asChild className="p-0 mt-4">
                <Link href={category.link}>Learn More →</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
        </div>
      </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
        Why Choose Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {features.map((feature) => (
          <Card key={feature.title} className="text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4 text-primary">
                {feature.icon}
              </div>
              <CardHeader className="p-0">
                <CardTitle className="text-lg mb-2">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </CardContent>
          </Card>
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
