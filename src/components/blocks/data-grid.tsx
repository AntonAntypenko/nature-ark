import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { EmptyState } from "@/components/blocks";

type SmartGridProps<T> = {
  items: T[];
  columns?: 2 | 3 | 4;
  renderItem: (item: T) => ReactNode;
  emptyMessage?: string;
};

const gridVariants = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
};

export const DataGrid = <T extends { key: string }>({
  items,
  columns = 3,
  renderItem,
  emptyMessage,
}: SmartGridProps<T>) => {
  if (!items?.length) return <EmptyState message={emptyMessage} />;

  return (
    <div className={cn("grid gap-8 sm:grid-cols-2", gridVariants[columns])}>
      {items.map(item => renderItem(item))}
    </div>
  );
};
