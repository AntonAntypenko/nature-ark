import type { FC } from "react";

import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

import { CtaButtonGroup } from "@/components/landing";
import { SmartImage } from "@/components/blocks";

export const HeroSection: FC = () => {
  const t = useTranslations("landingSections.hero");

  return (
    <section id="hero" className="min-h-screen w-full">
      <div className="flex min-h-[calc(100vh-200px)] items-center justify-between">
        <div className="flex flex-col space-y-6 px-[10%] lg:w-[50%] lg:pr-0">
          <h1 className="text-center text-4xl leading-tight font-bold md:text-left md:text-6xl">
            {t("title")}
          </h1>

          <p className="text-muted-foreground max-w-xl text-center text-lg md:text-left">
            {t("subtitle")}
          </p>

          <CtaButtonGroup className="mx-auto space-x-2 md:mx-0 md:space-x-6" />
        </div>
        <div className="relative hidden h-[720px] w-[45%] overflow-hidden rounded-l-full lg:block">
          <SmartImage
            src="/bison.jpg"
            alt={t("alt")}
            className="rounded-l-lg object-cover shadow-lg"
            fill={true}
          />
        </div>
      </div>

      <div className="text-muted-foreground mt-10 flex animate-bounce justify-center lg:mt-20">
        <a href="#benefits">
          <ChevronDown size={30} />
        </a>
      </div>
    </section>
  );
};
