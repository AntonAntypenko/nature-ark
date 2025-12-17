import { FC } from "react";

import { UserPlus, Settings, PieChart, PawPrint } from "lucide-react";
import { useTranslations } from "next-intl";

import { LandingSection, FeatureCard } from "@/components/landing";

type Step = {
  icon: FC<{ className?: string }>;
  title: string;
  description: string;
};

const lineClasses = "w-[3px] shrink-0 h-20 bg-primary opacity-70";

export const HowItWorksSection: FC = () => {
  const t = useTranslations("landingSections.howItWorks");

  const STEPS: Step[] = [
    {
      icon: UserPlus,
      title: t("step1.title"),
      description: t("step1.description"),
    },
    {
      icon: PawPrint,
      title: t("step2.title"),
      description: t("step2.description"),
    },
    {
      icon: Settings,
      title: t("step3.title"),
      description: t("step3.description"),
    },
    {
      icon: PieChart,
      title: t("step4.title"),
      description: t("step4.description"),
    },
  ];

  return (
    <LandingSection id="" title={t("title")}>
      <div className="relative mx-auto max-w-4xl">
        {STEPS.map((step, index) => {
          const isFirst = index === 0;
          const isLast = index === STEPS.length - 1;

          return (
            <div key={index} className="relative flex items-center">
              <div className="relative z-10 flex w-12 shrink-0 flex-col items-center md:w-40">
                <div className="flex flex-col items-center justify-between">
                  {isFirst ? (
                    <span className="h-20" />
                  ) : (
                    <span className={lineClasses} />
                  )}

                  <span className="bg-primary text-primary-foreground border-background flex size-12 items-center justify-center rounded-full border-4 font-mono text-xl font-bold shadow-md">
                    {index + 1}
                  </span>

                  {isLast ? (
                    <span className="h-20" />
                  ) : (
                    <span className={lineClasses} />
                  )}
                </div>
              </div>

              <FeatureCard title={step.title} description={step.description} />
            </div>
          );
        })}
      </div>
    </LandingSection>
  );
};
