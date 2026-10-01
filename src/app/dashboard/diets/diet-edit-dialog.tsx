"use client";

import { useRef, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DietNorm,
  dietFormSchema,
  DietFormValues,
} from "@/shared/schemas/diet";
import { updateDietAction } from "@/server/actions/diets";
import { Animal } from "@/shared/schemas/animal";
import { InventoryItem } from "@/shared/schemas/inventory";

interface Props {
  diet: DietNorm;
  animals: Animal[];
  items: InventoryItem[];
}

export function DietEditDialog({ diet, animals, items }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isPending, startTransition] = useTransition();

  const { register, handleSubmit } = useForm<DietFormValues>({
    resolver: zodResolver(dietFormSchema),
    defaultValues: {
      animal_id: diet.animal_id,
      inventory_item_id: diet.inventory_item_id,
      daily_norm_quantity: diet.daily_norm_quantity,
    },
  });

  const onSubmit = (data: DietFormValues) => {
    startTransition(async () => {
      await updateDietAction(diet.id, data);
      dialogRef.current?.close();
    });
  };

  return (
    <>
      <button
        onClick={() => dialogRef.current?.showModal()}
        className="mr-2 text-blue-600 hover:underline"
      >
        Edit
      </button>

      <dialog
        ref={dialogRef}
        className="w-full max-w-md rounded border p-6 backdrop:bg-black/50"
      >
        <h3 className="mb-4 text-lg font-bold">Edit Diet Norm</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <select {...register("animal_id")} className="rounded border p-2">
            {animals.map(a => (
              <option key={a.id} value={a.id}>
                {a.name} ({a.species})
              </option>
            ))}
          </select>

          <select
            {...register("inventory_item_id")}
            className="rounded border p-2"
          >
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
          />

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              disabled={isPending}
              className="rounded bg-gray-200 px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
            >
              Save
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
