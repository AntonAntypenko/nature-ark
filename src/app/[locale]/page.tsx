import { use } from "react";

import { setRequestLocale } from "next-intl/server";

import {
  BenefitsSection,
  HeroSection,
  ProblemSolutionSection,
  TechStackSection,
  FaqSection,
  FeaturesSection,
  Footer,
  FinalCtaSection,
  Header,
  ContactUsSection,
  HowItWorksSection,
} from "@/components/landing";

export default function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <div className="bg-background text-primary w-full">
      <Header />
      <HeroSection />
      <BenefitsSection />
      <ProblemSolutionSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TechStackSection />
      <FaqSection />
      <FinalCtaSection />
      <ContactUsSection />
      <Footer />
    </div>
  );
}
