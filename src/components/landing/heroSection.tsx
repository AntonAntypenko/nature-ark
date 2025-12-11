import { FC } from "react";

import { Button } from "@/components/ui";

export const HeroSection: FC = () => {
  return (
    <section className="w-full px-6 py-24">
      <div className="mx-auto max-w-6xl space-y-6 text-center">
        <h1 className="text-4xl leading-tight font-bold md:text-6xl">
          NatureArk — система обліку та
          <br />
          управління витратами для зоопарків
        </h1>

        <p className="text-muted-foreground mx-auto max-w-xl text-lg">
          NatureArk допомагає автоматизувати процес обліку, керування бюджетом,
          створенням документів та звітів для тварин. Простий інтерфейс,
          прозорість витрат та повний контроль.
        </p>

        <div className="mx-auto space-x-6">
          <a href="/dashboard">
            <Button size="lg" className="cursor-pointer">
              Розпочати
            </Button>
          </a>
          <a href="https://github.com/AntonAntypenko/nature-ark">
            <Button size="lg" variant="outline" className="cursor-pointer">
              Відкрити GitHub
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};
