import { FC } from "react";

import {
  Download,
  FilePlusIcon,
  PawPrint,
  Rocket,
  UserCheck,
  Wrench,
} from "lucide-react";

import { FeatureCard } from "@/components/landing";

export const FeaturesSection: FC = () => {
  return (
    <section id="features" className="w-full px-6 py-24">
      <div className="mx-auto max-w-6xl space-y-12">
        <h2 className="text-center text-4xl font-bold">
          Ключові Можливості Платформи
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={FilePlusIcon}
            title="Облік витрат"
            description="Повний контроль над фінансовими операціями, категоризація та бюджетування."
          />
          <FeatureCard
            icon={PawPrint}
            title="Профілі тварин"
            description="Повна інформація, фото, історія витрат, медичні записи — все в одному місці."
          />
          <FeatureCard
            icon={Rocket}
            title="Генерація звітів"
            description="Автоматична підготовка PDF/Excel документів для швидкої та точної звітності."
          />
          <FeatureCard
            icon={Wrench}
            title="AI-документи"
            description="Створення пояснень, листів та описів за допомогою інтелектуального помічника."
          />
          <FeatureCard
            icon={UserCheck}
            title="Ролі та доступи"
            description="Налаштування гнучких дозволів для різних груп співробітників."
          />
          <FeatureCard
            icon={Download}
            title="Імпорт / Експорт"
            description="Швидке перенесення даних або інтеграція з іншими внутрішніми системами."
          />
        </div>
      </div>
    </section>
  );
};
