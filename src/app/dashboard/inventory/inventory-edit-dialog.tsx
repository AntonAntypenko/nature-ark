"use client";

import { useRef, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InventoryItem,
  inventoryFormSchema,
  InventoryFormValues,
} from "@/shared/schemas/inventory";
import { updateInventoryAction } from "@/server/actions/inventory";

interface Props {
  item: InventoryItem;
}

export function InventoryEditDialog({ item }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isPending, startTransition] = useTransition();

  const { register, handleSubmit } = useForm<InventoryFormValues>({
    resolver: zodResolver(inventoryFormSchema),
    defaultValues: {
      name: item.name,
      category: item.category,
      unit: item.unit,
      target_stock: item.target_stock,
      current_stock: item.current_stock,
    },
  });

  const onSubmit = (data: InventoryFormValues) => {
    startTransition(async () => {
      await updateInventoryAction(item.id, data);
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
        <h3 className="mb-4 text-lg font-bold">Edit: {item.name}</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <input {...register("name")} className="rounded border p-2" />

          <select {...register("category")} className="rounded border p-2">
            <option value="feed">Feed</option>
            <option value="veterinary">Veterinary</option>
            <option value="utilities">Utilities</option>
            <option value="logistics">Logistics</option>
            <option value="maintenance">Maintenance</option>
          </select>

          <select {...register("unit")} className="rounded border p-2">
            <option value="kg">kg</option>
            <option value="liter">liter</option>
            <option value="dose">dose</option>
            <option value="piece">piece</option>
            <option value="kwh">kWh</option>
          </select>

          <input
            {...register("target_stock")}
            type="number"
            step="0.1"
            className="rounded border p-2"
            placeholder="Target Stock"
          />
          <input
            {...register("current_stock")}
            type="number"
            step="0.1"
            className="rounded border p-2"
            placeholder="Current Stock"
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
