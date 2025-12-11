import Link from "next/link";

import { FC } from "react";

const TECH_STACK = [
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
  return (
    <section className="w-full px-6 py-24">
      <div className="mx-auto max-w-6xl space-y-12 text-center">
        <h2 className="text-4xl font-bold">Створено на сучасних технологіях</h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
          NatureArk побудований на надійному, відкритому та сучасному стеку, що
          забезпечує швидкість, безпеку та легкість розширення.
        </p>

        <div className="flex flex-wrap justify-center gap-4 text-xl font-medium">
          {TECH_STACK.map(tech => (
            <Link
              key={tech.name}
              href={tech.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary hover:bg-primary hover:text-primary-foreground rounded-full px-4 py-2 transition-colors duration-1000"
            >
              {tech.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
