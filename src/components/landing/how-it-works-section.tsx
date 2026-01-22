"use client";

import type { FC } from "react";

import { UserPlus, Settings, PieChart, PawPrint } from "lucide-react";
import { useTranslations } from "next-intl";

import { useIsMobile } from "@/hooks";
import { LandingSection, FeatureCard } from "@/components/landing";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

const STEPS = [
  { icon: UserPlus, key: "step1" },
  { icon: PawPrint, key: "step2" },
  { icon: Settings, key: "step3" },
  { icon: PieChart, key: "step4" },
];

const lineClasses = "w-[3px] shrink-0 h-20 bg-primary opacity-70";

export const HowItWorksSection: FC = () => {
  const isMobile = useIsMobile();
  const t = useTranslations("landingSections.howItWorks");

  return (
    <LandingSection id="howItWorks" title={t("title")}>
      <div className="relative mx-auto max-w-4xl">
        {STEPS.map((step, index) => {
          const isFirst = index === 0;
          const isLast = index === STEPS.length - 1;

          return (
            <ScrollReveal key={index}>
              <div className="relative mb-8 flex items-center md:mb-0">
                {!isMobile && (
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
                )}
                <FeatureCard
                  icon={step.icon}
                  title={t(`${step.key}.title`)}
                  description={t(`${step.key}.description`)}
                />
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </LandingSection>
  );
};
