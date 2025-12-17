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

import { FeatureCard, LandingSection } from "@/components/landing";

export const FeaturesSection: FC = () => {
  const t = useTranslations("landingSections.features");

  return (
    <LandingSection id="features" title={t("title")} className="bg-muted">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          icon={FilePlusIcon}
          title={t("costAccountingTitle")}
          description={t("costAccountingDescription")}
        />
        <FeatureCard
          icon={PawPrint}
          title={t("animalProfilesTitle")}
          description={t("animalProfilesDescription")}
        />
        <FeatureCard
          icon={Rocket}
          title={t("reportGenerationTitle")}
          description={t("reportGenerationDescription")}
        />
        <FeatureCard
          icon={Wrench}
          title={t("aiDocumentsTitle")}
          description={t("aiDocumentsDescription")}
        />
        <FeatureCard
          icon={UserCheck}
          title={t("rolesAndAccessTitle")}
          description={t("rolesAndAccessDescription")}
        />
        <FeatureCard
          icon={Download}
          title={t("importExportTitle")}
          description={t("importExportDescription")}
        />
      </div>
    </LandingSection>
  );
};
