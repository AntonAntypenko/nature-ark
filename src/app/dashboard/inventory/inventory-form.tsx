"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import {
  inventoryFormSchema,
  InventoryFormValues,
} from "@/shared/schemas/inventory";
import { createInventoryAction } from "@/server/actions/inventory";

export function InventoryForm() {
  const [isPending, startTransition] = useTransition();

  const { register, handleSubmit, reset } = useForm<InventoryFormValues>({
    resolver: zodResolver(inventoryFormSchema),
    defaultValues: {
      name: "",
      category: "feed",
      unit: "kg",
      target_stock: undefined,
      current_stock: undefined,
    },
  });

  const onSubmit = (data: InventoryFormValues) => {
    startTransition(async () => {
      await createInventoryAction(data);
      reset();
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-8 grid max-w-4xl grid-cols-3 gap-4"
    >
      <input
        {...register("name")}
        className="col-span-3 rounded border p-2"
        placeholder="Item Name (e.g. Beef 1st cat.)"
      />

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

      <div className="flex gap-4">
        <input
          {...register("target_stock")}
          type="number"
          step="0.1"
          className="w-full rounded border p-2"
          placeholder="Target Stock"
        />
        <input
          {...register("current_stock")}
          type="number"
          step="0.1"
          className="w-full rounded border p-2"
          placeholder="Current Stock"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="col-span-3 max-w-xs rounded bg-black p-2 text-white disabled:opacity-50"
      >
        Save Inventory Item
      </button>
    </form>
  );
}
