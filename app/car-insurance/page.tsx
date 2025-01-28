import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock } from "lucide-react";

export default function CarInsurance() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Fixed button styling */}
      <section className="relative bg-gradient-to-r from-primary to-primary/80 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        <div className="container mx-auto px-6 relative">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <span className="inline-block bg-white/10 px-4 py-1 rounded-full text-sm mb-4">
                Save up to 45% on your car insurance
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Drive with Confidence and Complete Protection
              </h1>
              <p className="text-xl mb-8 text-white/90">
                Comprehensive car insurance starting at ₹2,000/year with instant policy issuance
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="w-full sm:w-auto"
                  asChild
                >
                  <Link href="#quote-form">Get a Quote</Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto border-white hover:bg-blue/20 text-black"
                  asChild
                >
                  <Link href="#coverage">View Coverage</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="absolute -inset-4 bg-white/5 rounded-full blur-3xl" />
              <Image
                src="/car-insurance-hero.svg"
                alt="Car Insurance Protection"
                width={600}
                height={480}
                priority
                className="relative animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Benefits Section - New */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {quickBenefits.map((benefit) => (
              <div key={benefit.title} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Types - Enhanced with Tabs */}
      <section id="coverage" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Coverage</h2>
          <Tabs defaultValue="comprehensive" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-[400px] mx-auto mb-8">
              <TabsTrigger value="comprehensive">Comprehensive</TabsTrigger>
              <TabsTrigger value="third-party">Third Party</TabsTrigger>
            </TabsList>
            {Object.entries(coverageDetails).map(([key, coverage]) => (
              <TabsContent key={key} value={key}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {coverage.features.map((feature, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                          <CheckCircle className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-2">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Quote Form */}
      <section id="quote-form" className="bg-muted py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl text-center">Get Your Car Insurance Quote</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="carMake">Car Make</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select car make" />
                      </SelectTrigger>
                      <SelectContent>
                        {carMakes.map((make) => (
                          <SelectItem key={make} value={make.toLowerCase()}>
                            {make}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Model Year</Label>
                    <Input id="model" type="number" placeholder="2023" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label>Coverage Type</Label>
                    <RadioGroup defaultValue="comprehensive" className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="comprehensive" id="comprehensive" />
                        <Label htmlFor="comprehensive">Comprehensive</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="third-party" id="third-party" />
                        <Label htmlFor="third-party">Third Party</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder="+91 98765 43210" />
                  </div>
                  <div className="md:col-span-2">
                    <Button type="submit" className="w-full">Get Quote</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced with better visual design */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Why Choose Us</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            We offer the best car insurance experience with quick claims, extensive network, and round-the-clock support
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
                <CardContent className="pt-6 relative">
                  <div className="w-14 h-14 bg-primary/10 rounded-lg mb-4 flex items-center justify-center">
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      width={32}
                      height={32}
                    />
                  </div>
                  <CardHeader className="p-0">
                    <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
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

const coverageTypes = [
  {
    title: "Comprehensive Coverage",
    features: [
      "Damage to your own vehicle",
      "Third-party liability",
      "Personal accident cover",
      "Natural disaster protection",
      "Theft coverage"
    ]
  },
  {
    title: "Third Party Coverage",
    features: [
      "Mandatory legal requirement",
      "Covers third-party injuries",
      "Property damage protection",
      "Legal liability coverage",
      "No own damage coverage"
    ]
  }
];

const features = [
  {
    title: "Quick Claims",
    description: "Hassle-free claim settlement within 24-48 hours",
    icon: "/icons/quick-claim.svg"
  },
  {
    title: "Garage Network",
    description: "Access to 5000+ network garages across India",
    icon: "/icons/garage.svg"
  },
  {
    title: "24/7 Support",
    description: "Round-the-clock roadside assistance and support",
    icon: "/icons/support.svg"
  }
];

const carMakes = [
  "Maruti Suzuki",
  "Hyundai",
  "Tata",
  "Honda",
  "Toyota",
  "Mahindra",
  "Kia",
  "Mercedes-Benz",
  "BMW",
  "Audi"
];

const quickBenefits = [
  {
    title: "Instant Policy",
    description: "Get insured in 5 minutes",
    icon: Clock
  },
  // ... add more quick benefits
];

const coverageDetails = {
  comprehensive: {
    features: [
      {
        title: "Own Damage",
        description: "Covers damages to your own vehicle from accidents, theft, or natural disasters"
      },
      // ... add more comprehensive features
    ]
  },
  "third-party": {
    features: [
      {
        title: "Legal Liability",
        description: "Mandatory coverage for third-party injuries and property damage"
      },
      // ... add more third-party features
    ]
  }
};
