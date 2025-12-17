import { FC } from "react";

import { Coins, Shield, UserCheck, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

import { FeatureCard, LandingSection } from "@/components/landing";

export const BenefitsSection: FC = () => {
  const t = useTranslations("landingSections.benefits");

  return (
    <LandingSection id="benefits" title={t("title")} className="bg-muted">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <FeatureCard
          icon={Coins}
          title={t("costTransparency.title")}
          description={t("costTransparency.description")}
        />
        <FeatureCard
          icon={Zap}
          title={t("workflowSpeed.title")}
          description={t("workflowSpeed.description")}
        />
        <FeatureCard
          icon={UserCheck}
          title={t("staffConvenience.title")}
          description={t("staffConvenience.description")}
        />
        <FeatureCard
          icon={Shield}
          title={t("dataSecurity.title")}
          description={t("dataSecurity.description")}
        />
      </div>
    </LandingSection>
  );
};
