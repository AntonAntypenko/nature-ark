import { FC } from "react";

type EmptyStateProps = {
  message?: string;
};

export const EmptyState: FC<EmptyStateProps> = ({
  message = "There are no data",
}) => {
  return (
    <div className="text-muted-foreground flex min-h-[200px] items-center justify-center rounded-lg border-2 border-dashed p-8">
      <p>{message}</p>
    </div>
  );
};
