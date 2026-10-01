"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  expenseFormSchema,
  ExpenseFormValues,
  Expense,
} from "@/shared/schemas/expense";
import { updateExpenseAction } from "@/server/actions/expenses";
import { Animal } from "@/shared/schemas/animal";
import { Enclosure } from "@/shared/schemas/enclosure";
import { InventoryItem } from "@/shared/schemas/inventory";

interface Props {
  expense: Expense;
  animals: Animal[];
  enclosures: Enclosure[];
  inventory: InventoryItem[];
}

export function ExpenseEditForm({
  expense,
  animals,
  enclosures,
  inventory,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { register, control, handleSubmit } = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: {
      vendor: expense.vendor,
      invoice_number: expense.invoice_number || "",
      total_amount: expense.total_amount,
      category: expense.category,
      spent_at: expense.spent_at,
      status: expense.status,
      items:
        expense.expense_items?.map(item => ({
          id: item.id,
          raw_item_name: item.raw_item_name,
          quantity: item.quantity,
          unit_price: item.unit_price,
          total_price: item.total_price,
          category: item.category,
          inventory_item_id: item.inventory_item_id || null,
          animal_id: item.animal_id || null,
          enclosure_id: item.enclosure_id || null,
        })) || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = (data: ExpenseFormValues) => {
    startTransition(async () => {
      await updateExpenseAction(expense.id, data);
      router.push("/dashboard/expenses");
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-w-7xl flex-col gap-8"
    >
      <div className="grid grid-cols-4 gap-4 rounded border bg-gray-50 p-4">
        <input
          {...register("vendor")}
          className="rounded border p-2"
          placeholder="Vendor"
        />
        <input
          {...register("invoice_number")}
          className="rounded border p-2"
          placeholder="Invoice Number"
        />
        <input
          {...register("spent_at")}
          type="date"
          className="rounded border p-2"
        />
        <input
          {...register("total_amount")}
          type="number"
          step="0.01"
          className="rounded border p-2"
          placeholder="Total Amount"
        />

        <select {...register("category")} className="rounded border p-2">
          <option value="feed">Feed</option>
          <option value="veterinary">Veterinary</option>
          <option value="utilities">Utilities</option>
          <option value="logistics">Logistics</option>
          <option value="maintenance">Maintenance</option>
        </select>

        <select {...register("status")} className="rounded border p-2">
          <option value="draft">Draft</option>
          <option value="ai_parsed">AI Parsed</option>
          <option value="verified">Verified</option>
        </select>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Expense Items</h2>
          <button
            type="button"
            onClick={() =>
              append({
                raw_item_name: "",
                quantity: "" as unknown as number,
                unit_price: "" as unknown as number,
                total_price: "" as unknown as number,
                category: "feed",
                inventory_item_id: null,
                animal_id: null,
                enclosure_id: null,
              })
            }
            className="rounded bg-gray-200 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-300"
          >
            + Add Item
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-9 items-center gap-3 rounded border bg-white p-4"
            >
              <input
                type="hidden"
                {...register(`items.${index}.id` as const)}
              />

              <input
                {...register(`items.${index}.raw_item_name` as const)}
                className="col-span-2 rounded border p-2"
                placeholder="Raw Item Name"
              />
              <input
                {...register(`items.${index}.quantity` as const)}
                type="number"
                step="0.001"
                className="rounded border p-2"
                placeholder="Qty"
              />
              <input
                {...register(`items.${index}.unit_price` as const)}
                type="number"
                step="0.01"
                className="rounded border p-2"
                placeholder="Price"
              />
              <input
                {...register(`items.${index}.total_price` as const)}
                type="number"
                step="0.01"
                className="rounded border p-2"
                placeholder="Total"
              />

              <select
                {...register(`items.${index}.inventory_item_id` as const)}
                className="col-span-1 rounded border p-2"
              >
                <option value="">Inventory...</option>
                {inventory.map(i => (
                  <option key={i.id} value={i.id}>
                    {i.name}
                  </option>
                ))}
              </select>

              <select
                {...register(`items.${index}.animal_id` as const)}
                className="col-span-1 rounded border p-2"
              >
                <option value="">Animal...</option>
                {animals.map(a => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>

              <select
                {...register(`items.${index}.enclosure_id` as const)}
                className="col-span-1 rounded border p-2"
              >
                <option value="">Enclosure...</option>
                {enclosures.map(e => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => remove(index)}
                className="text-sm font-medium text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.push("/dashboard/expenses")}
          disabled={isPending}
          className="rounded bg-gray-200 px-6 py-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="rounded bg-black px-6 py-2 text-white disabled:opacity-50"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
