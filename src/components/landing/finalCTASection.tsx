import type { FC } from "react";

import { useTranslations } from "next-intl";

import { LandingSection, CtaButtonGroup } from "@/components/landing";

export const FinalCTASection: FC = () => {
  const t = useTranslations("landingSections.finalCta");

  return (
    <LandingSection
      id="finalCta"
      title={t("title")}
      subtitle={t("subtitle")}
      className="bg-muted"
    >
      <CtaButtonGroup className="mt-8 flex justify-center space-x-2 md:mx-0 md:space-x-6" />
    </LandingSection>
  );
};
