import Image from "next/image";
import Link from "next/link";

export default function LifeInsurance() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl font-bold mb-6">
                Protect Your Family's Future
              </h1>
              <p className="text-xl mb-8">
                Get comprehensive life insurance coverage starting at ₹500/month
              </p>
              <Link 
                href="#quote-form"
                className="bg-white text-[var(--brand-primary)] px-8 py-3 rounded-full font-semibold hover:bg-[var(--brand-background)] transition"
              >
                Get a Quote
              </Link>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/life-insurance-hero.svg"
                alt="Life Insurance Protection"
                width={500}
                height={400}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Life Insurance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div 
                key={benefit.title}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="w-14 h-14 bg-[var(--brand-background)] rounded-lg mb-4 flex items-center justify-center">
                  <Image
                    src={benefit.icon}
                    alt={benefit.title}
                    width={32}
                    height={32}
                  />
                </div>
                <h3 className="text-xl font-semibold text-[var(--brand-text)] mb-2">{benefit.title}</h3>
                <p className="text-[var(--brand-text-light)]">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section id="quote-form" className="bg-[var(--brand-background)] py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Get Your Life Insurance Quote
            </h2>
            <form className="bg-white rounded-xl shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-[var(--brand-primary)]"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-[var(--brand-primary)]"
                    placeholder="30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-[var(--brand-primary)]"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-[var(--brand-primary)]"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Coverage Amount
                  </label>
                  <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-[var(--brand-primary)]">
                    <option value="">Select coverage amount</option>
                    <option value="500000">₹5 Lakhs</option>
                    <option value="1000000">₹10 Lakhs</option>
                    <option value="2000000">₹20 Lakhs</option>
                    <option value="5000000">₹50 Lakhs</option>
                    <option value="10000000">₹1 Crore</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="w-full mt-8 bg-[var(--brand-primary)] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[var(--brand-primary-dark)] transition"
              >
                Get Quote
              </button>
            </form>
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