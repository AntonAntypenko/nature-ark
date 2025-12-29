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
  HowItWorksSection,
} from "@/components/landing";

export default function Page() {
  return (
    <div className="bg-background text-primary min-h-screen w-full">
      <Header />
      <HeroSection />
      <BenefitsSection />
      <ProblemSolutionSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TechStackSection />
      <FAQSection />
      <FinalCTASection />
      <ContactUsSection />
      <Footer />
    </div>
  );
}
