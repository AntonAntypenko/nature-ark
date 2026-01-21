import type { FC, ReactNode } from "react";

import type { LucideIcon } from "lucide-react";

import { Card, CardDescription, CardTitle } from "@/components/ui";

type FeatureCardProps = {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  children?: ReactNode;
};

export const FeatureCard: FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  children,
}: FeatureCardProps) => {
  return (
    <Card className="hover:border-primary/20 flex h-full w-full flex-col items-start p-6 text-left transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
      <CardTitle className="flex gap-4 text-2xl font-semibold">
        {Icon && <Icon className="text-primary h-8 w-8 flex-shrink-0" />}
        {title}
      </CardTitle>
      <CardDescription className="text-muted-foreground text-lg">
        {description}
      </CardDescription>
      <div>{children}</div>
    </Card>
  );
};
