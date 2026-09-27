import { getAnimals } from "@/server/services/animals";
import { createAnimalAction } from "@/server/actions/animals";
import { AnimalEditDialog } from "./animal-edit-dialog";
import { AnimalDeleteButton } from "./animal-delete-button";

export default async function Page() {
  const animals = await getAnimals();

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif" }}>
      <h1>Керування каталогом тварин</h1>

      {/* Проста форма швидкого додавання */}
      <details
        style={{ margin: "16px 0", padding: "12px", border: "1px solid #ddd" }}
      >
        <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
          + Додати нову тварину
        </summary>
        <form
          action={async formData => {
            "use server";
            await createAnimalAction(formData);
          }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px",
            marginTop: "12px",
          }}
        >
          <input name="name" placeholder="Кличка (Сімба)" required />
          <input name="species" placeholder="Вид (Лев)" required />
          <input name="inventory_number" placeholder="Інвентарний №" required />
          <input name="enclosure_zone" placeholder="Локація/Сектор" required />
          <select name="status">
            <option value="healthy">healthy</option>
            <option value="sick">sick</option>
            <option value="quarantine">quarantine</option>
            <option value="recovery">recovery</option>
          </select>
          <select name="diet_type">
            <option value="carnivore">carnivore</option>
            <option value="herbivore">herbivore</option>
            <option value="omnivore">omnivore</option>
            <option value="piscivore">piscivore</option>
          </select>
          <input
            name="weight_kg"
            type="number"
            step="0.1"
            placeholder="Вага (кг)"
            required
          />
          <input
            name="daily_food_norm_kg"
            type="number"
            step="0.1"
            placeholder="Норма корму (кг)"
            required
          />
          <input
            name="estimated_daily_cost"
            type="number"
            step="0.01"
            placeholder="Вартість/день (грн)"
            required
          />
          <label
            style={{
              display: "flex",
              gap: "6px",
              alignItems: "center",
              gridColumn: "span 2",
            }}
          >
            <input name="is_winter_heating_required" type="checkbox" />
            Потребує обігріву взимку
          </label>
          <button type="submit" style={{ padding: "6px" }}>
            Створити запис
          </button>
        </form>
      </details>

      {/* Таблиця з діями */}
      <table
        border={1}
        cellPadding={8}
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr>
            <th>Інвентарний №</th>
            <th>Кличка</th>
            <th>Вид</th>
            <th>Статус</th>
            <th>Дієта</th>
            <th>Вага (кг)</th>
            <th>Витрати (грн/день)</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {animals.map(animal => (
            <tr key={animal.id}>
              <td>{animal.inventory_number}</td>
              <td>
                <strong>{animal.name}</strong>
              </td>
              <td>{animal.species}</td>
              <td>{animal.status}</td>
              <td>{animal.diet_type}</td>
              <td>{animal.weight_kg}</td>
              <td>{animal.estimated_daily_cost}</td>
              <td>
                <AnimalEditDialog animal={animal} />
                <AnimalDeleteButton id={animal.id} name={animal.name} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
