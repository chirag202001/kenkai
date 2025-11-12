import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StrengthsSection from "@/components/StrengthsSection";
import FounderBanner from "@/components/FounderBanner";
import CredibilitySection from "@/components/CredibilitySection";
import TalentInterestForm from "@/components/TalentInterestForm";

export const metadata: Metadata = {
  title: "About - Kenkai Labs | Expert Technology Consulting Team",
  description: "Meet the experienced technology consultants behind Kenkai Labs. 10+ years of experience in software development, system architecture, and digital transformation.",
};

export default function AboutPage() {
  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-blue-50 via-white to-gray-50">
        <div className="container-width px-4 md:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              About Kenkai Labs
            </h1>
            <p className="text-xl text-gray-600">
              We&apos;re a team of experienced technology consultants dedicated to helping 
              businesses solve their most complex technical challenges through proven 
              methodologies and expert execution.
            </p>
          </div>
        </div>
      </section>
  <FounderBanner />

      {/* Mission Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-width px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Too many companies struggle with technology that should empower them but instead 
              creates bottlenecks and frustration. We bridge the gap between business needs and 
              technical solutions by first understanding the real problems, then designing clear 
              roadmaps, and finally executing with precision and accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🔍</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Discover</h3>
              <p className="text-gray-600">
                We dig deep to understand your real challenges, not just symptoms.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🗺️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Design</h3>
              <p className="text-gray-600">
                We create clear, actionable roadmaps with prioritized steps and measurable outcomes.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Deliver</h3>
              <p className="text-gray-600">
                We execute with precision, ensuring solutions work and teams can maintain them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section id="approach" className="py-16 md:py-20 bg-gray-50">
        <div className="container-width px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
              Our Approach
            </h2>
            
            <div className="space-y-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Process-First Methodology
                  </h3>
                  <p className="text-gray-600 mb-4">
                    We don&apos;t build until we validate the real problem. Our structured approach 
                    ensures we solve the right challenges in the right order.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-gray-700">Stakeholder-driven discovery</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-gray-700">Data-backed recommendations</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-gray-700">Iterative validation and feedback</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-2xl p-8">
                  <div className="text-center">
                    <div className="text-4xl mb-4">📊</div>
                    <h4 className="font-bold text-gray-900 mb-2">Evidence-Based Decisions</h4>
                    <p className="text-gray-600 text-sm">
                      Every recommendation is backed by data, stakeholder input, and proven best practices.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="lg:order-2">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Outcome Accountability
                  </h3>
                  <p className="text-gray-600 mb-4">
                    We measure success by your results, not our hours. Our engagements are 
                    structured around delivering measurable business value.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-gray-700">Clear success metrics defined upfront</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-gray-700">Regular progress reviews and adjustments</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-gray-700">Post-delivery success tracking</span>
                    </li>
                  </ul>
                </div>
                <div className="lg:order-1 bg-purple-50 rounded-2xl p-8">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🎯</div>
                    <h4 className="font-bold text-gray-900 mb-2">Results-Driven</h4>
                    <p className="text-gray-600 text-sm">
                      Your success is our success. We&apos;re committed to delivering measurable outcomes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CredibilitySection />
      {/* Founder-led strengths replacing individual team profiles */}
      <StrengthsSection />
      {/* Hiring Interest (client form encapsulated to avoid server passing handlers) */}
      <section className="py-16 md:py-20 bg-white" aria-labelledby="hiring-interest-heading">
        <div className="container-width px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 id="hiring-interest-heading" className="text-3xl font-bold text-gray-900 mb-4">We're Hiring Soon</h2>
            <p className="text-gray-600 text-lg">We're expanding carefully. If you'd like to be considered when we open roles, leave your email and we'll reach out before public postings.</p>
          </div>
          <TalentInterestForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
