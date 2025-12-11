import { FC } from "react";

import { Coins, Shield, UserCheck, Zap } from "lucide-react";

import { FeatureCard } from "@/components/landing";

export const BenefitsSection: FC = () => {
  return (
    <section className="w-full px-6 py-24">
      <div className="mx-auto max-w-6xl space-y-12">
        <h2 className="text-center text-4xl font-bold">
          Ваші переваги з NatureArk
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={Coins}
            title="Прозорість Витрат"
            description="Точно знайте, куди йдуть кошти. Жодних прихованих чи неврахованих витрат."
          />
          <FeatureCard
            icon={Zap}
            title="Швидкість Роботи"
            description="Автоматизуйте рутинні операції та заощаджуйте години робочого часу."
          />
          <FeatureCard
            icon={UserCheck}
            title="Зручність для Персоналу"
            description="Простий та інтуїтивно зрозумілий інтерфейс для кожного співробітника."
          />
          <FeatureCard
            icon={Shield}
            title="Безпека Даних"
            description="Важлива інформація про тварин та фінанси надійно захищена."
          />
        </div>
      </div>
    </section>
  );
};
