import Image from "next/image";
import Link from "next/link";

export default function HealthInsurance() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl font-bold mb-6">
                Your Health is Your Wealth
              </h1>
              <p className="text-xl mb-8">
                Get comprehensive health coverage for you and your family starting at ₹600/month
              </p>
              <Link 
                href="#quote-form"
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition"
              >
                Get a Quote
              </Link>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/health-insurance-hero.svg"
                alt="Health Insurance Protection"
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
            Why Choose Our Health Insurance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div 
                key={benefit.title}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-lg mb-4 flex items-center justify-center">
                  <Image
                    src={benefit.icon}
                    alt={benefit.title}
                    width={32}
                    height={32}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            What's Covered
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coverageItems.map((item) => (
              <div 
                key={item.title}
                className="bg-white rounded-xl p-6 text-center"
              >
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={32}
                    height={32}
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section id="quote-form" className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Get Your Health Insurance Quote
            </h2>
            <form className="bg-white rounded-xl shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Family Members
                  </label>
                  <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select members</option>
                    <option value="1">Self Only</option>
                    <option value="2">Self + Spouse</option>
                    <option value="3">Self + Spouse + 1 Child</option>
                    <option value="4">Self + Spouse + 2 Children</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Coverage Amount
                  </label>
                  <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select coverage</option>
                    <option value="300000">₹3 Lakhs</option>
                    <option value="500000">₹5 Lakhs</option>
                    <option value="1000000">₹10 Lakhs</option>
                    <option value="2000000">₹20 Lakhs</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="w-full mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
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
    title: "Cashless Treatment",
    description: "Get treatment at 10,000+ network hospitals without paying anything from your pocket",
    icon: "/icons/cashless.svg"
  },
  {
    title: "No Claim Bonus",
    description: "Get up to 50% increase in sum insured for claim-free years",
    icon: "/icons/bonus.svg"
  },
  {
    title: "Pre & Post Care",
    description: "Coverage for 30 days pre and 60 days post hospitalization expenses",
    icon: "/icons/care.svg"
  }
];

const coverageItems = [
  {
    title: "Hospitalization",
    description: "Room rent, ICU charges, doctor fees, and more",
    icon: "/icons/hospital.svg"
  },
  {
    title: "Day Care",
    description: "Coverage for treatments that don't require 24hr hospitalization",
    icon: "/icons/daycare.svg"
  },
  {
    title: "Emergency",
    description: "Ambulance charges and emergency room expenses",
    icon: "/icons/emergency.svg"
  },
  {
    title: "Medicines",
    description: "Coverage for prescribed medicines and consumables",
    icon: "/icons/medicine.svg"
  }
]; 