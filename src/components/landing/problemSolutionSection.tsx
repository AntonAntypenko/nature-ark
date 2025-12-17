import { FC } from "react";

import { useTranslations } from "next-intl";

import { LandingSection } from "@/components/landing";

const PROBLEM_KEYS = ["problem1", "problem2", "problem3"];
const SOLUTION_KEYS = ["solution1", "solution2", "solution3"];

export const ProblemSolutionSection: FC = () => {
  const t = useTranslations("landingSections.problemSolution");

  return (
    <LandingSection id="" title={t("title")}>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <h3 className="mb-3 text-2xl font-semibold">{t("problemsTitle")}</h3>
          <ul className="text-muted-foreground ml-6 list-disc space-y-3">
            {PROBLEM_KEYS.map(key => (
              <li key={key}>{t(key)}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-2xl font-semibold">{t("solutionTitle")}</h3>
          <ul className="text-muted-foreground ml-6 list-disc space-y-3">
            {SOLUTION_KEYS.map(key => (
              <li key={key}>{t(key)}</li>
            ))}
          </ul>
        </div>
      </div>
    </LandingSection>
  );
};
