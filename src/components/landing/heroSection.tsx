import Link from "next/link";
import { FC } from "react";

import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui";

export const HeroSection: FC = () => {
  return (
    <section className="flex min-h-screen w-full items-center justify-center px-6 py-24">
      <div className="max-w-6xl space-y-12 text-center">
        <h1 className="text-4xl leading-tight font-bold md:text-6xl">
          NatureArk — система обліку та
          <br />
          управління витратами для зоопарків
        </h1>

        <p className="text-muted-foreground mx-auto max-w-xl text-lg">
          Автоматизувати процес обліку, керування бюджетом, створенням
          документів та звітів для тварин. Простий інтерфейс, прозорість витрат
          та повний контроль.
        </p>

        <div className="mx-auto space-x-6">
          <Button size="lg" className="cursor-pointer" asChild>
            <Link href="/dashboard">Розпочати</Link>
          </Button>
          <Button size="lg" variant="outline" className="cursor-pointer">
            <a
              href="https://github.com/AntonAntypenko/nature-ark"
              target="_blank"
              rel="noopener noreferrer"
            >
              Відкрити GitHub
            </a>
          </Button>
        </div>
      </div>
      <div className="text-muted-foreground absolute bottom-10 animate-bounce">
        <ChevronDown size="30" />
      </div>
    </section>
  );
};
