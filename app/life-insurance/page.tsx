import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Header } from "@/components/layout/Header";

export default function LifeInsurance() {
  return (
    <div className="min-h-screen">
      <Header />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[var(--brand-dark-brown)] to-[var(--brand-charcoal)] text-white py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl font-bold mb-6">
                Protect Your Family's Future
              </h1>
              <p className="text-xl mb-8 text-[var(--brand-light-gray)]">
                Get comprehensive life insurance coverage starting at ₹500/month
              </p>
              <Button
                asChild
                className="bg-[var(--brand-orange)] hover:bg-[var(--brand-orange)]/90 text-white"
              >
                <Link href="#quote-form">Get a Quote</Link>
              </Button>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/life-insurance-hero.svg"
                alt="Life Insurance Protection"
                width={500}
                height={400}
                priority
                className="drop-shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-[var(--brand-charcoal)]">
            Why Choose Our Life Insurance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <Card 
                key={benefit.title}
                className="transition-all duration-300 hover:shadow-lg hover:border-[var(--brand-orange)]"
              >
                <CardContent className="pt-6">
                  <div className="w-14 h-14 bg-[var(--brand-light-gray)]/20 rounded-lg mb-4 flex items-center justify-center">
                    <Image
                      src={benefit.icon}
                      alt={benefit.title}
                      width={32}
                      height={32}
                    />
                  </div>
                  <CardHeader className="p-0">
                    <CardTitle className="text-xl mb-2 text-[var(--brand-charcoal)]">{benefit.title}</CardTitle>
                    <p className="text-[var(--brand-charcoal)]/70">{benefit.description}</p>
                  </CardHeader>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section id="quote-form" className="bg-[var(--brand-light-gray)]/10 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl text-center text-[var(--brand-charcoal)]">
                  Get Your Life Insurance Quote
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[var(--brand-charcoal)]">Full Name</Label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age" className="text-[var(--brand-charcoal)]">Age</Label>
                    <Input id="age" type="number" placeholder="30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[var(--brand-charcoal)]">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-[var(--brand-charcoal)]">Phone</Label>
                    <Input id="phone" type="tel" placeholder="+91 98765 43210" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="coverage" className="text-[var(--brand-charcoal)]">Coverage Amount</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select coverage amount" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="500000">₹5 Lakhs</SelectItem>
                        <SelectItem value="1000000">₹10 Lakhs</SelectItem>
                        <SelectItem value="2000000">₹20 Lakhs</SelectItem>
                        <SelectItem value="5000000">₹50 Lakhs</SelectItem>
                        <SelectItem value="10000000">₹1 Crore</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Button 
                      type="submit" 
                      className="w-full bg-[var(--brand-orange)] hover:bg-[var(--brand-orange)]/90 text-white"
                    >
                      Get Quote
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

const benefits = [
  {
    title: "Comprehensive Coverage",
    description: "Get complete financial protection for your family with our comprehensive life insurance plans",
    icon: "/icons/shield.svg"
  },
  {
    title: "Flexible Plans",
    description: "Choose from a variety of plans that suit your needs and budget",
    icon: "/icons/flexible.svg"
  },
  {
    title: "Tax Benefits",
    description: "Enjoy tax benefits on premiums paid under Section 80C of the Income Tax Act",
    icon: "/icons/tax.svg"
  }
];