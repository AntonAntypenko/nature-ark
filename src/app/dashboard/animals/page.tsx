import { getAnimals } from "@/server/services/animals";
import { getEnclosures } from "@/server/services/enclosures";
import { deleteAnimalAction } from "@/server/actions/animals";
import { AnimalForm } from "./animal-form";
import { AnimalEditDialog } from "./animal-edit-dialog";

export default async function Page() {
  const [animals, enclosures] = await Promise.all([
    getAnimals(),
    getEnclosures(),
  ]);

  return (
    <div className="p-6 font-sans">
      <h1 className="mb-6 text-2xl font-bold">Animals Catalog</h1>

      <AnimalForm enclosures={enclosures} />

      <table className="w-full border-collapse border text-left">
        <thead>
          <tr className="bg-gray-50">
            <th className="border p-3">Inv No.</th>
            <th className="border p-3">Name</th>
            <th className="border p-3">Species</th>
            <th className="border p-3">Enclosure</th>
            <th className="border p-3">Status</th>
            <th className="border p-3">Diet</th>
            <th className="border p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {animals.map(animal => (
            <tr key={animal.id}>
              <td className="border p-3">{animal.inventory_number}</td>
              <td className="border p-3 font-medium">{animal.name}</td>
              <td className="border p-3">{animal.species}</td>
              <td className="border p-3">{animal.enclosures?.name || "—"}</td>
              <td className="border p-3">{animal.status}</td>
              <td className="border p-3">{animal.diet_type}</td>
              <td className="border p-3">
                <div className="flex items-center gap-4">
                  <AnimalEditDialog animal={animal} enclosures={enclosures} />
                  <form
                    action={async () => {
                      "use server";
                      await deleteAnimalAction(animal.id);
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
