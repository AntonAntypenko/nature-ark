"use client";

import { useState, useTransition, ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  inventoryFormSchema,
  InventoryFormValues,
  InventoryItem,
} from "@/shared/schemas/inventory";
import { createInventoryAction } from "@/server/actions/inventory";

interface Props {
  onSuccess?: (item: InventoryItem) => void;
  buttonText?: string;
  buttonIcon?: ReactNode;
  buttonClassName?: string;
}

export function CreateInventoryModal({
  onSuccess,
  buttonText,
  buttonIcon,
  buttonClassName = "flex items-center justify-center rounded bg-gray-800 px-3 py-2 text-sm font-bold text-white transition-colors hover:bg-black",
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const { register, handleSubmit, reset } = useForm<InventoryFormValues>({
    resolver: zodResolver(inventoryFormSchema),
    defaultValues: {
      name: "",
      category: "feed",
      unit: "kg",
      target_stock: "" as unknown as number,
      current_stock: "" as unknown as number,
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleClose = () => {
    reset();
    setIsOpen(false);
  };

  const onSubmit = (data: InventoryFormValues) => {
    startTransition(async () => {
      try {
        const newItem = await createInventoryAction(data);
        if (newItem) {
          handleClose();
          if (onSuccess) {
            onSuccess(newItem);
          }
        }
      } catch (error) {
        console.error("Failed to create item", error);
      }
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={buttonClassName}
      >
        {buttonIcon && <span className="leading-none">{buttonIcon}</span>}
        {buttonText && (
          <span className={buttonIcon ? "ml-2" : ""}>{buttonText}</span>
        )}
      </button>

      {isOpen &&
        isMounted &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-bold">Create New Inventory Item</h3>
                <button
                  type="button"
                  onClick={handleClose}
                  className="font-bold text-gray-500 hover:text-black"
                >
                  ✕
                </button>
              </div>

              <form
                onSubmit={e => {
                  e.stopPropagation();
                  handleSubmit(onSubmit)(e);
                }}
                className="grid w-full grid-cols-3 gap-4"
              >
                <input
                  {...register("name")}
                  className="col-span-3 rounded border p-2"
                  placeholder="Item Name"
                />

                <select
                  {...register("category")}
                  className="rounded border p-2"
                >
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

                <div className="col-span-3 flex gap-4">
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

                <div className="col-span-3 mt-4 flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={isPending}
                    className="rounded bg-gray-200 px-4 py-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="rounded bg-black px-6 py-2 text-white disabled:opacity-50"
                  >
                    {isPending ? "Saving..." : "Save Item"}
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
