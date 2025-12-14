import { FC } from "react";

import { UserPlus, Settings, PieChart, PawPrint } from "lucide-react";

import { LandingSection, FeatureCard } from "@/components/landing";

type Step = {
  icon: FC<{ className?: string }>;
  title: string;
  description: string;
};

const STEPS: Step[] = [
  {
    icon: UserPlus,
    title: "Крок 1: Реєстрація",
    description:
      "Створіть свій безкоштовний обліковий запис і підтвердіть електронну пошту. Це займає менше хвилини.",
  },
  {
    icon: PawPrint,
    title: "Крок 2: Додайте Об'єкти",
    description:
      "Внесіть дані про ваших перших тварин та їхні базові раціони. Можливий масовий імпорт.",
  },
  {
    icon: Settings,
    title: "Крок 3: Налаштуйте Доступи",
    description:
      "Запросіть колег (ветеринарів, зоологів) та надайте їм відповідні ролі та права доступу.",
  },
  {
    icon: PieChart,
    title: "Крок 4: Почніть Аналіз",
    description:
      "Отримуйте оперативні звіти про стан здоров'я, споживання кормів та фінансові витрати.",
  },
];

const lineClasses = "w-[3px] shrink-0 h-20 bg-primary opacity-70";

export const HowItWorksSection: FC = () => {
  return (
    <LandingSection id="" title="Як почати роботу">
      <div className="relative mx-auto max-w-4xl">
        {STEPS.map((step, index) => {
          const isFirst = index === 0;
          const isLast = index === STEPS.length - 1;

          return (
            <div key={index} className="relative flex items-center">
              <div className="relative z-10 flex w-12 shrink-0 flex-col items-center md:w-40">
                <div className="flex flex-col items-center justify-between">
                  {isFirst ? (
                    <span className="h-20" />
                  ) : (
                    <span className={lineClasses} />
                  )}

                  <span className="bg-primary text-primary-foreground border-background flex size-12 items-center justify-center rounded-full border-4 font-mono text-xl font-bold shadow-md">
                    {index + 1}
                  </span>

                  {isLast ? (
                    <span className="h-20" />
                  ) : (
                    <span className={lineClasses} />
                  )}
                </div>
              </div>

              <FeatureCard title={step.title} description={step.description} />
            </div>
          );
        })}
      </div>
    </LandingSection>
  );
};
