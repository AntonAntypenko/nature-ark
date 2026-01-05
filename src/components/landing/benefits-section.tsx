import type { FC } from "react";

import { Coins, Shield, UserCheck, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

import { FeatureCard, LandingSection } from "@/components/landing";
import { SmartGrid } from "@/components/blocks";

const BENEFITS = [
  { icon: Coins, key: "costTransparency" },
  { icon: Zap, key: "workflowSpeed" },
  { icon: UserCheck, key: "staffConvenience" },
  { icon: Shield, key: "dataSecurity" },
];

export const BenefitsSection: FC = () => {
  const t = useTranslations("landingSections.benefits");

  return (
    <LandingSection id="benefits" title={t("title")} className="bg-muted">
      <SmartGrid
        items={BENEFITS}
        columns={4}
        renderItem={channel => (
          <FeatureCard
            key={channel.key}
            icon={channel.icon}
            title={t(`${channel.key}.title`)}
            description={t(`${channel.key}.description`)}
          />
        )}
      />
    </LandingSection>
  );
};
