import type { FC } from "react";

import {
  Download,
  FilePlusIcon,
  PawPrint,
  Rocket,
  UserCheck,
  Wrench,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { FeatureCard, LandingSection } from "@/components/landing";
import { DataGrid } from "@/components/blocks";
import { StaggerContainer, StaggerItem } from "@/components/motion";

const FEATURES = [
  { icon: FilePlusIcon, key: "costAccounting" },
  { icon: PawPrint, key: "animalProfiles" },
  { icon: Rocket, key: "reportGeneration" },
  { icon: Wrench, key: "aiDocuments" },
  { icon: UserCheck, key: "rolesAndAccess" },
  { icon: Download, key: "importExport" },
];

export const FeaturesSection: FC = () => {
  const t = useTranslations("landingSections.features");

  return (
    <LandingSection id="features" title={t("title")} className="bg-muted">
      <StaggerContainer>
        <DataGrid
          items={FEATURES}
          columns={3}
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
