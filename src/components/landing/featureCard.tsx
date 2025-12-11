import { ElementType, FC } from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui";

type FeatureCardProps = {
  icon: ElementType;
  title: string;
  description: string;
};

export const FeatureCard: FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) => {
  return (
    <Card className="flex flex-col items-start p-6 text-left transition-shadow duration-300 hover:shadow-lg">
      <CardTitle className="flex gap-4 text-2xl font-semibold">
        <Icon className="text-primary mb-4 h-8 w-8" />
        {title}
      </CardTitle>
      <CardDescription className="text-muted-foreground text-lg">
        {description}
      </CardDescription>
    </Card>
  );
};
