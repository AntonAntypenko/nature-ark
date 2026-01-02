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
    <Card className="flex w-full flex-col items-start p-6 text-left transition-shadow duration-300 hover:shadow-lg">
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
