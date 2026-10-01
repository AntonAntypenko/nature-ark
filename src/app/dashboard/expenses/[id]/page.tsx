import { notFound } from "next/navigation";
import { getAnimals } from "@/server/services/animals";
import { getEnclosures } from "@/server/services/enclosures";
import { getInventoryItems } from "@/server/services/inventory";
import { getExpenseById } from "@/server/services/expenses";
import { ExpenseEditForm } from "./expense-edit-form";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  const [expense, animals, enclosures, inventory] = await Promise.all([
    getExpenseById(id),
    getAnimals(),
    getEnclosures(),
    getInventoryItems(),
  ]);

  if (!expense) {
    notFound();
  }

  return (
    <div className="p-6 font-sans">
      <h1 className="mb-6 text-2xl font-bold">Edit Expense Document</h1>
      <ExpenseEditForm
        expense={expense}
        animals={animals}
        enclosures={enclosures}
        inventory={inventory}
      />
    </div>
  );
}
