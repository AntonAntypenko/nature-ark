"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  enclosureSchema,
  EnclosureFormValues,
} from "@/shared/schemas/enclosure";
import { createEnclosureAction } from "@/server/actions/enclosures";
import { useTransition } from "react";

export function EnclosureForm() {
  const [isPending, startTransition] = useTransition();

  const { register, handleSubmit, reset } = useForm<EnclosureFormValues>({
    resolver: zodResolver(enclosureSchema),
    defaultValues: {
      name: "",
      type: "outdoor",
      has_heating_system: false,
      notes: "",
    },
  });

  const onSubmit = (data: EnclosureFormValues) => {
    startTransition(async () => {
      await createEnclosureAction(data);
      reset();
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-8 flex max-w-sm flex-col gap-4"
    >
      <input
        {...register("name")}
        className="rounded border p-2"
        placeholder="Name"
      />
      <select {...register("type")} className="rounded border p-2">
        <option value="outdoor">Outdoor</option>
        <option value="indoor">Indoor</option>
        <option value="aquatic">Aquatic</option>
        <option value="terrarium">Terrarium</option>
      </select>
      <label className="flex items-center gap-2">
        <input type="checkbox" {...register("has_heating_system")} />
        Has heating system
      </label>
      <textarea
        {...register("notes")}
        className="rounded border p-2"
        placeholder="Notes"
        rows={3}
      />
      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-black p-2 text-white disabled:opacity-50"
      >
        Save Enclosure
      </button>
    </form>
  );
}
