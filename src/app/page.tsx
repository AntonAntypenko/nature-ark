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
import { Header } from "@/components/landing/header";

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
      <Footer />
    </div>
  );
}
