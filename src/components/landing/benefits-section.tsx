"use client";

import type { FC } from "react";

import { Coins, Shield, UserCheck, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

import { useIsMobile } from "@/hooks";

import { FeatureCard, LandingSection } from "@/components/landing";
import { DataGrid } from "@/components/blocks";

import { MotionAdaptive, StaggerContainer } from "@/components/motion";

const BENEFITS = [
  { icon: Coins, key: "costTransparency" },
  { icon: Zap, key: "workflowSpeed" },
  { icon: UserCheck, key: "staffConvenience" },
  { icon: Shield, key: "dataSecurity" },
];

export const BenefitsSection: FC = () => {
  const isMobile = useIsMobile();
  const t = useTranslations("landingSections.benefits");

  const content = (
    <DataGrid
      items={BENEFITS}
      columns={4}
      renderItem={item => (
        <MotionAdaptive key={item.key} isMobile={isMobile}>
          <FeatureCard
            icon={item.icon}
            title={t(`${item.key}.title`)}
            description={t(`${item.key}.description`)}
          />
        </MotionAdaptive>
      )}
    />
  );

  return (
    <LandingSection id="benefits" title={t("title")} className="bg-muted">
      {!isMobile ? <StaggerContainer>{content}</StaggerContainer> : content}
    </LandingSection>
  );
};
