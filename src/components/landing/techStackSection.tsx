import { FC } from "react";

export const TechStackSection: FC = () => {
  return (
    <section className="w-full px-6 py-24">
      <div className="mx-auto max-w-6xl space-y-12 text-center">
        <h2 className="text-4xl font-bold">Створено на сучасних технологіях</h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
          NatureArk побудований на надійному, відкритому та сучасному стеку, що
          забезпечує швидкість, безпеку та легкість розширення.
        </p>

        <div className="text-secondary-foreground flex flex-wrap justify-center gap-6 text-xl font-medium">
          <span className="bg-secondary rounded-full px-4 py-2">
            Next.js 15
          </span>
          <span className="bg-secondary rounded-full px-4 py-2">React 19</span>
          <span className="bg-secondary rounded-full px-4 py-2">
            Tailwind CSS
          </span>
          <span className="bg-secondary rounded-full px-4 py-2">shadcn/ui</span>
          <span className="bg-secondary rounded-full px-4 py-2">Supabase</span>
          <span className="bg-secondary rounded-full px-4 py-2">RTK Query</span>
        </div>
      </div>
    </section>
  );
};
