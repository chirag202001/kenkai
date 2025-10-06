import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ServicesOverview from "@/components/ServicesOverview";
import ProcessSection from "@/components/ProcessSection";
import LeadCaptureSection from "@/components/LeadCaptureSection";
import CredibilitySection from "@/components/CredibilitySection";
import TeamSection from "@/components/TeamSection";
import ResourceSection from "@/components/ResourceSection";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <ServicesOverview />
      <ProcessSection />
      <LeadCaptureSection />
      <CredibilitySection />
      <TeamSection />
      <ResourceSection />
      <Footer />
    </main>
  );
}
