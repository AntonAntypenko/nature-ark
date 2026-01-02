import type { FC } from "react";

import { useTranslations } from "next-intl";

import { LandingSection } from "@/components/landing";

type Tech = {
  name: string;
  href: string;
};

const TECH_STACK: Tech[] = [
  { name: "Next.js 15", href: "https://nextjs.org/docs" },
  { name: "React 19", href: "https://react.dev/learn" },
  { name: "Tailwind CSS", href: "https://tailwindcss.com/docs" },
  { name: "shadcn/ui", href: "https://ui.shadcn.com/docs" },
  { name: "Supabase", href: "https://supabase.com/docs" },
  {
    name: "RTK Query",
    href: "https://redux-toolkit.js.org/rtk-query/overview",
  },
];

export const TechStackSection: FC = () => {
  const t = useTranslations("landingSections.techStack");

  return (
    <LandingSection
      id="tech"
      title={t("title")}
      subtitle={t("subtitle")}
      className="bg-muted"
    >
      <div className="flex flex-wrap justify-center gap-4 text-xl font-medium">
        {TECH_STACK.map(tech => (
          <a
            key={tech.name}
            href={tech.href}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-secondary hover:bg-primary hover:text-primary-foreground rounded-full px-4 py-2 transition-colors duration-1000"
          >
            {tech.name}
          </a>
        ))}
      </div>
    </LandingSection>
  );
};
