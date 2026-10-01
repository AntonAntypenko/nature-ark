import Link from "next/link";
import { getExpenses } from "@/server/services/expenses";
import { deleteExpenseAction } from "@/server/actions/expenses";

export default async function Page() {
  const expenses = await getExpenses();

  return (
    <div className="p-6 font-sans">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Expenses</h1>
        <Link
          href="/dashboard/expenses/new"
          className="rounded bg-black px-4 py-2 text-white"
        >
          + Add New Expense
        </Link>
      </div>

      <table className="w-full border-collapse border text-left">
        <thead>
          <tr className="bg-gray-50">
            <th className="border p-3">Date</th>
            <th className="border p-3">Vendor</th>
            <th className="border p-3">Invoice No.</th>
            <th className="border p-3">Category</th>
            <th className="border p-3">Total Amount</th>
            <th className="border p-3">Status</th>
            <th className="border p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(expense => (
            <tr key={expense.id}>
              <td className="border p-3">{expense.spent_at}</td>
              <td className="border p-3 font-medium">{expense.vendor}</td>
              <td className="border p-3">{expense.invoice_number || "—"}</td>
              <td className="border p-3">{expense.category}</td>
              <td className="border p-3">{expense.total_amount}</td>
              <td className="border p-3">{expense.status}</td>
              <td className="flex gap-4 border p-3">
                <Link
                  href={`/dashboard/expenses/${expense.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <form
                  action={async () => {
                    "use server";
                    await deleteExpenseAction(expense.id);
                  }}
                >
                  <button
                    type="submit"
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
