"use client";

import { useTransition } from "react";
import { deleteAnimalAction } from "@/server/actions/animals";

export function AnimalDeleteButton({ id, name }: { id: string; name: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm(`Ви дійсно бажаєте видалити ${name}?`)) {
      startTransition(async () => {
        await deleteAnimalAction(id);
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
