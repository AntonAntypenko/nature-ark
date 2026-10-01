import { getAnimals } from "@/server/services/animals";
import { getEnclosures } from "@/server/services/enclosures";
import { getInventoryItems } from "@/server/services/inventory";
import { ExpenseForm } from "./expense-form";

export default async function Page() {
  const [animals, enclosures, inventory] = await Promise.all([
    getAnimals(),
    getEnclosures(),
    getInventoryItems(),
  ]);

  return (
    <div className="p-6 font-sans">
      <h1 className="mb-6 text-2xl font-bold">Create New Expense Document</h1>
      <ExpenseForm
        animals={animals}
        enclosures={enclosures}
        inventory={inventory}
      />
    </div>
  );
}
