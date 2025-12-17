import { FC } from "react";

import {
  LucideIcon,
  UserPlus,
  Settings,
  PieChart,
  PawPrint,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { LandingSection, FeatureCard } from "@/components/landing";

type Step = {
  icon: LucideIcon;
  key: string;
};

const STEPS: Step[] = [
  {
    icon: UserPlus,
    key: "step1",
  },
  {
    icon: PawPrint,
    key: "step2",
  },
  {
    icon: Settings,
    key: "step3",
  },
  {
    icon: PieChart,
    key: "step4",
  },
];

const lineClasses = "w-[3px] shrink-0 h-20 bg-primary opacity-70";

export const HowItWorksSection: FC = () => {
  const t = useTranslations("landingSections.howItWorks");

  return (
    <LandingSection id="howItWorks" title={t("title")}>
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

              <FeatureCard
                title={t(`${step.key}.title`)}
                description={t(`${step.key}.description`)}
              />
            </div>
          );
        })}
      </div>
    </LandingSection>
  );
};
