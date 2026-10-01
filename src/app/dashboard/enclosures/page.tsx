import { getEnclosures } from "@/server/services/enclosures";
import { deleteEnclosureAction } from "@/server/actions/enclosures";
import { EnclosureForm } from "./enclosure-form";

export default async function Page() {
  const enclosures = await getEnclosures();

  return (
    <div className="p-6 font-sans">
      <h1 className="mb-6 text-2xl font-bold">Enclosures</h1>

      <EnclosureForm />

      <table className="w-full border-collapse border text-left">
        <thead>
          <tr className="bg-gray-50">
            <th className="border p-3">Name</th>
            <th className="border p-3">Type</th>
            <th className="border p-3">Heating</th>
            <th className="border p-3">Notes</th>
            <th className="border p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {enclosures.map(enclosure => (
            <tr key={enclosure.id}>
              <td className="border p-3 font-medium">{enclosure.name}</td>
              <td className="border p-3">{enclosure.type}</td>
              <td className="border p-3">
                {enclosure.has_heating_system ? "Yes" : "No"}
              </td>
              <td className="border p-3">{enclosure.notes}</td>
              <td className="border p-3">
                <form
                  action={async () => {
                    "use server";
                    await deleteEnclosureAction(enclosure.id);
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
