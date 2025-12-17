import { FC } from "react";

import { useTranslations } from "next-intl";

import { LandingSection } from "@/components/landing";

export const ProblemSolutionSection: FC = () => {
  const t = useTranslations("landingSections.problemSolution");

  return (
    <LandingSection id="" title={t("title")}>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <h3 className="mb-3 text-2xl font-semibold">{t("problemsTitle")}</h3>
          <ul className="text-muted-foreground ml-6 list-disc space-y-3">
            <li>{t("problem1")}</li>
            <li>{t("problem2")}</li>
            <li>{t("problem3")}</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-2xl font-semibold">{t("solutionTitle")}</h3>
          <ul className="text-muted-foreground ml-6 list-disc space-y-3">
            <li>{t("solution1")}</li>
            <li>{t("solution2")}</li>
            <li>{t("solution3")}</li>
          </ul>
        </div>
      </div>
    </LandingSection>
  );
};
