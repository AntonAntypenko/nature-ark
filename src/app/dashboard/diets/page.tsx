import { getDiets } from "@/server/services/diets";
import { getAnimals } from "@/server/services/animals";
import { getInventoryItems } from "@/server/services/inventory";
import { deleteDietAction } from "@/server/actions/diets";
import { DietForm } from "./diet-form";
import { DietEditDialog } from "./diet-edit-dialog";

export default async function Page() {
  const [diets, animals, items] = await Promise.all([
    getDiets(),
    getAnimals(),
    getInventoryItems(),
  ]);

  return (
    <div className="p-6 font-sans">
      <h1 className="mb-6 text-2xl font-bold">Diet Norms</h1>

      <DietForm animals={animals} items={items} />

      <table className="w-full border-collapse border text-left">
        <thead>
          <tr className="bg-gray-50">
            <th className="border p-3">Animal</th>
            <th className="border p-3">Species</th>
            <th className="border p-3">Feed Item</th>
            <th className="border p-3">Daily Norm</th>
            <th className="border p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {diets.map(diet => (
            <tr key={diet.id}>
              <td className="border p-3 font-medium">{diet.animals?.name}</td>
              <td className="border p-3">{diet.animals?.species}</td>
              <td className="border p-3">{diet.inventory_items?.name}</td>
              <td className="border p-3">
                {diet.daily_norm_quantity} {diet.inventory_items?.unit}
              </td>
              <td className="border p-3">
                <div className="flex items-center gap-4">
                  <DietEditDialog diet={diet} animals={animals} items={items} />
                  <form
                    action={async () => {
                      "use server";
                      await deleteDietAction(diet.id);
                    }}
                  >
                    <button
                      type="submit"
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
