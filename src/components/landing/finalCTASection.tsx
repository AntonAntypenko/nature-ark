import { FC } from "react";

import { LandingSection, CtaButtonGroup } from "@/components/landing";

export const FinalCTASection: FC = () => {
  return (
    <LandingSection
      id=""
      title="Почніть цифровий облік"
      subtitle="Почніть роботу з NatureArk вже сьогодні та отримайте повний контроль
            над витратами."
      className="bg-muted"
    >
      <CtaButtonGroup className="mt-8 flex justify-center space-x-2 md:mx-0 md:space-x-6" />
    </LandingSection>
  );
};
