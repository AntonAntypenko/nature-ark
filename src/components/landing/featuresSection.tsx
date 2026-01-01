import { FC } from "react";

import {
  Download,
  FilePlusIcon,
  PawPrint,
  Rocket,
  UserCheck,
  Wrench,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { LandingSection } from "@/components/landing";
import { SmartGrid } from "@/components/blocks";

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
      <SmartGrid items={FEATURES} t={t} columns={3} />
    </LandingSection>
  );
};
