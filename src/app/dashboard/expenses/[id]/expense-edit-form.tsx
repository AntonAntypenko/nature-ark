"use client";

import { useState, useTransition } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  expenseFormSchema,
  ExpenseFormValues,
  Expense,
} from "@/shared/schemas/expense";
import {
  updateExpenseAction,
  stockExpenseAction,
} from "@/server/actions/expenses";
import { InventoryItem } from "@/shared/schemas/inventory";

interface Props {
  expense: Expense;
  inventory: InventoryItem[];
}

export function ExpenseEditForm({ expense, inventory }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [isStocking, setIsStocking] = useState(false);
  const [stockError, setStockError] = useState<string | null>(null);

  const isReadOnly = expense.status === "stocked";

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

  const handleStockExpense = async () => {
    setIsStocking(true);
    setStockError(null);

    const result = await stockExpenseAction(expense.id);

    if (result.success) {
      router.refresh();
    } else {
      setStockError(result.error || "An error occurred while stocking.");
    }

    setIsStocking(false);
  };

  return (
    <div className="flex max-w-7xl flex-col gap-6">
      {stockError && (
        <div className="rounded border border-red-200 bg-red-50 p-4 text-red-700">
          <strong>Warning:</strong> {stockError}
        </div>
      )}

      {isReadOnly && (
        <div className="rounded border border-blue-200 bg-blue-50 p-4 text-blue-800">
          This document has already been stocked. Editing is locked.
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <div className="grid grid-cols-4 gap-4 rounded border bg-gray-50 p-4">
          <input
            {...register("vendor")}
            className="rounded border p-2"
            placeholder="Vendor"
            disabled={isReadOnly}
          />
          <input
            {...register("invoice_number")}
            className="rounded border p-2"
            placeholder="Invoice Number"
            disabled={isReadOnly}
          />
          <input
            {...register("spent_at")}
            type="date"
            className="rounded border p-2"
            disabled={isReadOnly}
          />
          <input
            {...register("total_amount")}
            type="number"
            step="0.01"
            className="rounded border p-2"
            placeholder="Total Amount"
            disabled={isReadOnly}
          />

          <select
            {...register("category")}
            className="rounded border p-2"
            disabled={isReadOnly}
          >
            <option value="feed">Feed</option>
            <option value="veterinary">Veterinary</option>
            <option value="utilities">Utilities</option>
            <option value="logistics">Logistics</option>
            <option value="maintenance">Maintenance</option>
          </select>

          <select
            {...register("status")}
            className="rounded border p-2 font-semibold"
            disabled={isReadOnly}
          >
            <option value="draft">Draft</option>
            <option value="ai_parsed" className="text-blue-600">
              AI Parsed
            </option>
            <option value="verified" className="text-green-600">
              Verified
            </option>
            {isReadOnly && (
              <option value="stocked" className="text-purple-600">
                Stocked
              </option>
            )}
          </select>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Expense Items</h2>
            {!isReadOnly && (
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
            )}
          </div>

          <div className="flex flex-col gap-4">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className={`grid grid-cols-7 items-center gap-3 rounded border p-4 ${isReadOnly ? "bg-gray-50" : "bg-white"}`}
              >
                <input
                  type="hidden"
                  {...register(`items.${index}.id` as const)}
                />

                <input
                  {...register(`items.${index}.raw_item_name` as const)}
                  className="col-span-2 rounded border p-2"
                  placeholder="Raw Item Name"
                  disabled={isReadOnly}
                />
                <input
                  {...register(`items.${index}.quantity` as const)}
                  type="number"
                  step="0.001"
                  className="rounded border p-2"
                  placeholder="Qty"
                  disabled={isReadOnly}
                />
                <input
                  {...register(`items.${index}.unit_price` as const)}
                  type="number"
                  step="0.01"
                  className="rounded border p-2"
                  placeholder="Price"
                  disabled={isReadOnly}
                />
                <input
                  {...register(`items.${index}.total_price` as const)}
                  type="number"
                  step="0.01"
                  className="rounded border p-2"
                  placeholder="Total"
                  disabled={isReadOnly}
                />

                <select
                  {...register(`items.${index}.inventory_item_id` as const)}
                  className="col-span-1 rounded border p-2 text-sm"
                  disabled={isReadOnly}
                >
                  <option value="">Select Inventory...</option>
                  {inventory.map(i => (
                    <option key={i.id} value={i.id}>
                      {i.name}
                    </option>
                  ))}
                </select>

                {!isReadOnly && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-center text-sm font-medium text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between border-t pt-6">
          <div>
            {expense.status === "verified" && (
              <button
                type="button"
                onClick={handleStockExpense}
                disabled={isPending || isStocking}
                className="rounded bg-green-600 px-6 py-2 font-medium text-white transition-colors hover:bg-green-700 disabled:opacity-50"
              >
                {isStocking ? "Stocking..." : "📦 Add to Stock"}
              </button>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.push("/dashboard/expenses")}
              className="rounded bg-gray-200 px-6 py-2"
            >
              Back
            </button>
            {!isReadOnly && (
              <button
                type="submit"
                disabled={isPending || isStocking}
                className="rounded bg-black px-6 py-2 text-white disabled:opacity-50"
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
