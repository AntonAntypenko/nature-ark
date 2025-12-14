import { FC } from "react";

import { Coins, Shield, UserCheck, Zap } from "lucide-react";

import { FeatureCard, LandingSection } from "@/components/landing";

export const BenefitsSection: FC = () => {
  return (
    <LandingSection
      id="benefits"
      title="Ваші переваги з NatureArk"
      className="bg-muted"
    >
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
    </LandingSection>
  );
};
