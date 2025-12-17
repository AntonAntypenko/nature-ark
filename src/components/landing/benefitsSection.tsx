import { FC } from "react";

import { LucideIcon, Coins, Shield, UserCheck, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

import { FeatureCard, LandingSection } from "@/components/landing";

type Benefit = {
  icon: LucideIcon;
  key: string;
};

const BENEFITS: Benefit[] = [
  { icon: Coins, key: "costTransparency" },
  { icon: Zap, key: "workflowSpeed" },
  { icon: UserCheck, key: "staffConvenience" },
  { icon: Shield, key: "dataSecurity" },
];

export const BenefitsSection: FC = () => {
  const t = useTranslations("landingSections.benefits");

  return (
    <LandingSection id="benefits" title={t("title")} className="bg-muted">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map(benefit => (
          <FeatureCard
            key={benefit.key}
            icon={benefit.icon}
            title={t(`${benefit.key}.title`)}
            description={t(`${benefit.key}.description`)}
          />
        ))}
      </div>
    </LandingSection>
  );
};
