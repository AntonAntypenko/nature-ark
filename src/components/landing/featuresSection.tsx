import { FC } from "react";

import {
  LucideIcon,
  Download,
  FilePlusIcon,
  PawPrint,
  Rocket,
  UserCheck,
  Wrench,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { FeatureCard, LandingSection } from "@/components/landing";

type Feature = {
  icon: LucideIcon;
  key: string;
};

const FEATURES: Feature[] = [
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
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(feature => (
          <FeatureCard
            key={feature.key}
            icon={feature.icon}
            title={t(`${feature.key}Title`)}
            description={t(`${feature.key}Description`)}
          />
        ))}
      </div>
    </LandingSection>
  );
};
