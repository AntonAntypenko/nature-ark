"use client";

import { useState, useTransition } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { expenseFormSchema, ExpenseFormValues } from "@/shared/schemas/expense";
import { createExpenseAction } from "@/server/actions/expenses";
import { parseReceiptAction } from "@/server/actions/ai-receipt";
import { Animal } from "@/shared/schemas/animal";
import { Enclosure } from "@/shared/schemas/enclosure";
import { InventoryItem } from "@/shared/schemas/inventory";

interface Props {
  animals: Animal[];
  enclosures: Enclosure[];
  inventory: InventoryItem[];
}

export function ExpenseForm({ animals, enclosures, inventory }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isParsing, setIsParsing] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const { register, control, handleSubmit, setValue } =
    useForm<ExpenseFormValues>({
      resolver: zodResolver(expenseFormSchema),
      defaultValues: {
        vendor: "",
        invoice_number: "",
        total_amount: "" as unknown as number,
        category: "feed",
        spent_at: new Date().toISOString().split("T")[0],
        status: "draft",
        items: [
          {
            raw_item_name: "",
            quantity: "" as unknown as number,
            unit_price: "" as unknown as number,
            total_price: "" as unknown as number,
            category: "feed",
            inventory_item_id: null,
            animal_id: null,
            enclosure_id: null,
          },
        ],
      },
    });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "items",
  });

  const handleAIParse = async () => {
    if (!file) return;

    setIsParsing(true);
    setParseError(null);

    const formData = new FormData();
    formData.append("receipt_file", file);

    const result = await parseReceiptAction(formData);

    setIsParsing(false);

    if (result.success && result.data) {
      setValue("vendor", result.data.vendor);
      setValue("invoice_number", result.data.invoice_number || "");
      setValue("spent_at", result.data.spent_at);
      setValue("total_amount", result.data.total_amount);
      setValue("category", result.data.category);
      setValue("status", "ai_parsed");

      const parsedItems = result.data.items.map(item => ({
        raw_item_name: item.raw_item_name,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total_price: item.total_price,
        category: item.category,
        inventory_item_id: null,
        animal_id: null,
        enclosure_id: null,
      }));

      replace(parsedItems);
    } else {
      setParseError(result.error || "Не вдалося розпізнати чек.");
    }
  };

  const onSubmit = (data: ExpenseFormValues) => {
    startTransition(async () => {
      await createExpenseAction(data);
      router.push("/dashboard/expenses");
    });
  };

  return (
    <div className="flex max-w-7xl flex-col gap-8">
      <div className="flex flex-col gap-4 rounded-lg border border-blue-100 bg-blue-50 p-6">
        <div>
          <h2 className="text-lg font-bold text-blue-900">
            AI Receipt Scanner
          </h2>
          <p className="text-sm text-blue-700">
            Upload a photo of your receipt to autofill the form below.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={e => setFile(e.target.files?.[0] || null)}
            className="rounded border bg-white p-2"
          />
          <button
            type="button"
            onClick={handleAIParse}
            disabled={isParsing || !file}
            className="rounded bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
          >
            {isParsing ? "Scanning with Gemini..." : "Scan Receipt"}
          </button>
        </div>

        {parseError && (
          <p className="text-sm font-medium text-red-600">{parseError}</p>
        )}
      </div>

      <hr className="border-gray-200" />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
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

          <select
            {...register("status")}
            className="rounded border p-2 font-semibold"
          >
            <option value="draft">Draft</option>
            <option value="ai_parsed" className="text-blue-600">
              AI Parsed
            </option>
            <option value="verified" className="text-green-600">
              Verified
            </option>
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
                  className="col-span-1 rounded border p-2 text-sm"
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
                  className="col-span-1 rounded border p-2 text-sm"
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
                  className="col-span-1 rounded border p-2 text-sm"
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
                  className="text-center text-sm font-medium text-red-600 hover:underline"
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
            Save Document
          </button>
        </div>
      </form>
    </div>
  );
}
