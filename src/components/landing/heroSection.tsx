import { FC } from "react";

import { ChevronDown } from "lucide-react";

import { CtaButtonGroup } from "@/components/landing/ctaButtonGroup";

export const HeroSection: FC = () => {
  return (
    <section id="hero" className="min-h-screen w-full">
      <div className="flex min-h-[calc(100vh-200px)] items-center justify-between">
        <div className="flex flex-col space-y-6 px-[10%] lg:w-[50%] lg:pr-0">
          <h1 className="text-center text-4xl leading-tight font-bold md:text-left md:text-6xl">
            NatureArk - Контроль бюджету та обліку тварин
          </h1>

          <p className="text-muted-foreground max-w-xl text-center text-lg md:text-left">
            Автоматизувати процес обліку, керування бюджетом, створенням
            документів та звітів для тварин. Простий інтерфейс, прозорість
            витрат та повний контроль.
          </p>

          <CtaButtonGroup className="mx-auto space-x-2 md:mx-0 md:space-x-6" />
        </div>
        <div className="relative hidden h-[720px] w-[45%] overflow-hidden rounded-l-full bg-black lg:block">
          <img
            className="h-full w-full rounded-tl-xl object-cover"
            src="/bison.jpg"
            alt="Bison"
          />
        </div>
      </div>

      <div className="text-muted-foreground mt-10 flex animate-bounce justify-center lg:mt-20">
        <ChevronDown size={30} />
      </div>
    </section>
  );
};
