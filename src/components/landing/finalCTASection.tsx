import { FC } from "react";
import Link from "next/link";

import { Button } from "@/components/ui";

export const FinalCTASection: FC = () => {
  return (
    <section className="w-full px-6 py-24">
      <div className="bg-primary-foreground mx-auto max-w-6xl rounded-xl p-12 text-center shadow-2xl">
        <h2 className="text-primary text-4xl font-bold">
          Готові змінити облік у вашому зоопарку?
        </h2>
        <p className="text-primary/80 mt-4 text-xl">
          Почніть роботу з NatureArk вже сьогодні та отримайте повний контроль
          над витратами.
        </p>
        <div className="mx-auto mt-8 space-x-6">
          <Link href="/dashboard" passHref>
            <Button size="lg" className="cursor-pointer">
              Розпочати
            </Button>
          </Link>
          <Link href="https://github.com/AntonAntypenko/nature-ark" passHref>
            <Button size="lg" variant="outline" className="cursor-pointer">
              Відкрити GitHub
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
