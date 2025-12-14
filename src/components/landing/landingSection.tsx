import { FC, ReactNode } from "react";

import { cn } from "@/lib/utils";

type LandingSectionProps = {
  id: string;
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
  className?: string;
};

export const LandingSection: FC<LandingSectionProps> = ({
  id,
  title,
  subtitle,
  children,
  className,
}) => {
  return (
    <section id={id} className={cn("w-full px-6 py-24", className)}>
      <div className="mx-auto max-w-6xl space-y-12">
        <h2 className="text-center text-4xl font-bold">{title}</h2>

        {subtitle && (
          <p className="text-muted-foreground mx-auto max-w-2xl text-center text-lg">
            {subtitle}
          </p>
        )}

        {children}
      </div>
    </section>
  );
};
