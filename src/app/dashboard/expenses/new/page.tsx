import { getInventoryItems } from "@/server/services/inventory";
import { ExpenseForm } from "./expense-form";

export default async function Page() {
  const inventory = await getInventoryItems();

  return (
    <div className="p-6 font-sans">
      <h1 className="mb-6 text-2xl font-bold">Create New Expense Document</h1>
      <ExpenseForm inventory={inventory} />
    </div>
  );
}
