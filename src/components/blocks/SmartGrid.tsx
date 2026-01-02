import type { FC, ReactNode } from "react";

import type { LucideIcon } from "lucide-react";

import { FeatureCard } from "@/components/landing";

type GridItem = {
  key: string;
  icon?: LucideIcon;
};

type SmartGridProps = {
  items: GridItem[];
  t: (key: string) => string;
  columns?: 2 | 3 | 4;
  content?: (item: GridItem) => ReactNode;
  emptyMessage?: string;
};

export const SmartGrid: FC<SmartGridProps> = ({
  items,
  t,
  columns = 3,
  content,
  emptyMessage,
}) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-muted-foreground flex min-h-[200px] items-center justify-center rounded-lg border-2 border-dashed p-8">
        <p>{emptyMessage || "Дані відсутні"}</p>
      </div>
    );
  }

  const gridVariants = {
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={`grid gap-8 sm:grid-cols-2 ${gridVariants[columns]}`}>
      {items.map(item => (
        <FeatureCard
          key={item.key}
          icon={item.icon}
          title={t(`${item.key}.title`)}
          description={t(`${item.key}.description`)}
        >
          {content?.(item)}
        </FeatureCard>
      ))}
    </div>
  );
};
