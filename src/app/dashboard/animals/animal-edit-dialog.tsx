"use client";

import { useRef, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Animal,
  animalFormSchema,
  AnimalFormValues,
} from "@/shared/schemas/animal";
import { updateAnimalAction } from "@/server/actions/animals";
import { Enclosure } from "@/shared/schemas/enclosure";

interface Props {
  animal: Animal;
  enclosures: Enclosure[];
}

export function AnimalEditDialog({ animal, enclosures }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isPending, startTransition] = useTransition();

  const { register, handleSubmit } = useForm<AnimalFormValues>({
    resolver: zodResolver(animalFormSchema),
    defaultValues: {
      name: animal.name,
      species: animal.species,
      inventory_number: animal.inventory_number,
      enclosure_id: animal.enclosure_id || null,
      status: animal.status,
      diet_type: animal.diet_type,
      weight_kg: animal.weight_kg,
      daily_food_norm_kg: animal.daily_food_norm_kg,
      estimated_daily_cost: animal.estimated_daily_cost,
      is_winter_heating_required: animal.is_winter_heating_required,
    },
  });

  const onSubmit = (data: AnimalFormValues) => {
    startTransition(async () => {
      await updateAnimalAction(animal.id, data);
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
        <h3 className="mb-4 text-lg font-bold">Edit: {animal.name}</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <input
            {...register("name")}
            className="rounded border p-2"
            placeholder="Name"
          />
          <input
            {...register("species")}
            className="rounded border p-2"
            placeholder="Species"
          />
          <input
            {...register("inventory_number")}
            className="rounded border p-2"
            placeholder="Inventory Number"
          />

          <select {...register("enclosure_id")} className="rounded border p-2">
            <option value="">Select Enclosure</option>
            {enclosures.map(e => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>

          <select {...register("status")} className="rounded border p-2">
            <option value="healthy">healthy</option>
            <option value="sick">sick</option>
            <option value="quarantine">quarantine</option>
            <option value="recovery">recovery</option>
          </select>

          <select {...register("diet_type")} className="rounded border p-2">
            <option value="carnivore">carnivore</option>
            <option value="herbivore">herbivore</option>
            <option value="omnivore">omnivore</option>
            <option value="piscivore">piscivore</option>
          </select>

          <input
            {...register("weight_kg")}
            type="number"
            step="0.1"
            className="rounded border p-2"
            placeholder="Weight (kg)"
          />
          <input
            {...register("daily_food_norm_kg")}
            type="number"
            step="0.1"
            className="rounded border p-2"
            placeholder="Daily Norm (kg)"
          />
          <input
            {...register("estimated_daily_cost")}
            type="number"
            step="0.01"
            className="rounded border p-2"
            placeholder="Cost/day"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("is_winter_heating_required")}
            />
            Requires winter heating
          </label>

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
