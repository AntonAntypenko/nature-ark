import { FC } from "react";

import { CtaButtonGroup } from "@/components/landing/ctaButtonGroup";

export const FinalCTASection: FC = () => {
  return (
    <section className="w-full px-6 py-24">
      <div className="bg-primary-foreground mx-auto max-w-6xl rounded-xl p-12 text-center shadow-2xl">
        <h2 className="text-primary text-4xl font-bold">
          Почніть цифровий облік
        </h2>
        <p className="text-primary mt-4 text-xl">
          Почніть роботу з NatureArk вже сьогодні та отримайте повний контроль
          над витратами.
        </p>

        <CtaButtonGroup className="mx-auto mt-8 space-x-2 md:mx-0 md:space-x-6" />
      </div>
    </section>
  );
};
