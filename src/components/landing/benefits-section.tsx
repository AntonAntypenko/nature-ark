import type { FC } from "react";

import { Coins, Shield, UserCheck, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

import { FeatureCard, LandingSection } from "@/components/landing";
import { DataGrid } from "@/components/blocks";
import { StaggerContainer, StaggerItem } from "@/components/motion";

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
      <StaggerContainer>
        <DataGrid
          items={BENEFITS}
          columns={4}
          renderItem={channel => (
            <StaggerItem key={channel.key}>
              <FeatureCard
                icon={channel.icon}
                title={t(`${channel.key}.title`)}
                description={t(`${channel.key}.description`)}
              />
            </StaggerItem>
          )}
        />
      </StaggerContainer>
    </LandingSection>
  );
};
