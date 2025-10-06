import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ResourceSection from "@/components/ResourceSection";

export const metadata: Metadata = {
  title: "Resources - Kenkai Labs | Free Technical Assessment Tools",
  description: "Free resources for technology leaders: Problem Discovery Checklist, ROI Calculator, Architecture Review Guide, and more.",
};

export default function ResourcesPage() {
  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-gray-50">
        <div className="container-width section-padding">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Free Resources
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Practical tools and guides to help you assess, plan, and improve your 
              technology infrastructure. All resources are free and immediately actionable.
            </p>
          </div>
        </div>
      </section>

      <ResourceSection />

      <Footer />
    </main>
  );
}
