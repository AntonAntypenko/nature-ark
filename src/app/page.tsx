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
} from "@/components/landing";

export default function Page() {
  return (
    <div className="bg-background text-primary flex min-h-screen w-full flex-col items-center">
      <HeroSection />
      <BenefitsSection />
      <ProblemSolutionSection />
      <FeaturesSection />
      <TechStackSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
}
