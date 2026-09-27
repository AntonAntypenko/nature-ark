"use client";

import { useTransition } from "react";
import { deleteExpenseAction } from "@/server/actions/expenses";

export function ExpenseDeleteButton({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm(`Ви дійсно бажаєте видалити запис "${title}"?`)) {
      startTransition(async () => {
        await deleteExpenseAction(id);
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      style={{ color: "red", cursor: "pointer" }}
    >
      {isPending ? "..." : "Видалити"}
    </button>
  );
}
