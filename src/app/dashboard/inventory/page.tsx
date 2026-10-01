import { getInventoryItems } from "@/server/services/inventory";
import { deleteInventoryAction } from "@/server/actions/inventory";
import { InventoryForm } from "./inventory-form";
import { InventoryEditDialog } from "./inventory-edit-dialog";

export default async function Page() {
  const items = await getInventoryItems();

  return (
    <div className="p-6 font-sans">
      <h1 className="mb-6 text-2xl font-bold">Inventory Management</h1>

      <InventoryForm />

      <table className="w-full border-collapse border text-left">
        <thead>
          <tr className="bg-gray-50">
            <th className="border p-3">Name</th>
            <th className="border p-3">Category</th>
            <th className="border p-3">Unit</th>
            <th className="border p-3">Target Stock</th>
            <th className="border p-3">Current Stock</th>
            <th className="border p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td className="border p-3 font-medium">{item.name}</td>
              <td className="border p-3">{item.category}</td>
              <td className="border p-3">{item.unit}</td>
              <td className="border p-3">{item.target_stock}</td>
              <td className="border p-3">{item.current_stock}</td>
              <td className="border p-3">
                <div className="flex items-center gap-4">
                  <InventoryEditDialog item={item} />
                  <form
                    action={async () => {
                      "use server";
                      await deleteInventoryAction(item.id);
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
