"use client";

import {
  BenefitsSection,
  HeroSection,
  ProblemSolutionSection,
  TechStackSection,
  FAQSection,
  FeaturesSection,
  Footer,
  FinalCTASection,
  Header,
  ContactUsSection,
} from "@/components/landing";

export default function Page() {
  return (
    <div className="bg-background text-primary flex min-h-screen w-full flex-col items-center">
      <Header />
      <HeroSection />
      <BenefitsSection />
      <ProblemSolutionSection />
      <FeaturesSection />
      <TechStackSection />
      <FAQSection />
      <FinalCTASection />
      <ContactUsSection />
      <Footer />
    </div>
  );
}
