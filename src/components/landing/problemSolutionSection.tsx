import { FC } from "react";

export const ProblemSolutionSection: FC = () => {
  return (
    <section className="bg-muted w-full px-6 py-24">
      <div className="mx-auto max-w-5xl space-y-12">
        <h2 className="text-center text-4xl font-bold">Чому NatureArk?</h2>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <h3 className="mb-3 text-2xl font-semibold">Проблеми</h3>
            <ul className="text-muted-foreground ml-6 list-disc space-y-3">
              <li>Неточний або ручний облік витрат.</li>
              <li>Труднощі у веденні карток тварин.</li>
              <li>Повільна підготовка звітів та документів.</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-2xl font-semibold">Рішення</h3>
            <ul className="text-muted-foreground ml-6 list-disc space-y-3">
              <li>Автоматизований облік та контроль бюджету.</li>
              <li>Зручні профілі для кожної тварини.</li>
              <li>Швидка генерація документів та звітів.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
