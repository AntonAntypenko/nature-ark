"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { dietFormSchema, DietFormValues } from "@/shared/schemas/diet";
import { createDietAction } from "@/server/actions/diets";
import { Animal } from "@/shared/schemas/animal";
import { InventoryItem } from "@/shared/schemas/inventory";

interface Props {
  animals: Animal[];
  items: InventoryItem[];
}

export function DietForm({ animals, items }: Props) {
  const [isPending, startTransition] = useTransition();

  const { register, handleSubmit, reset } = useForm<DietFormValues>({
    resolver: zodResolver(dietFormSchema),
    defaultValues: {
      animal_id: "",
      inventory_item_id: "",
      daily_norm_quantity: undefined,
    },
  });

  const onSubmit = (data: DietFormValues) => {
    startTransition(async () => {
      await createDietAction(data);
      reset();
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-8 grid max-w-4xl grid-cols-3 gap-4"
    >
      <select {...register("animal_id")} className="rounded border p-2">
        <option value="">Select Animal</option>
        {animals.map(a => (
          <option key={a.id} value={a.id}>
            {a.name} ({a.species})
          </option>
        ))}
      </select>

      <select {...register("inventory_item_id")} className="rounded border p-2">
        <option value="">Select Feed Item</option>
        {items
          .filter(i => i.category === "feed")
          .map(i => (
            <option key={i.id} value={i.id}>
              {i.name} ({i.unit})
            </option>
          ))}
      </select>

      <input
        {...register("daily_norm_quantity")}
        type="number"
        step="0.001"
        className="rounded border p-2"
        placeholder="Daily Norm Quantity"
      />

      <button
        type="submit"
        disabled={isPending}
        className="col-span-3 max-w-xs rounded bg-black p-2 text-white disabled:opacity-50"
      >
        Save Diet Norm
      </button>
    </form>
  );
}
