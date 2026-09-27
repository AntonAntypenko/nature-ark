import { getExpenses } from "@/server/services/expenses";
import { getAnimals } from "@/server/services/animals";
import { ExpenseEditDialog } from "./expense-edit-dialog";
import { ExpenseDeleteButton } from "./expense-delete-button";
import { createExpenseAction } from "@/server/actions/expenses";

export default async function Page() {
  // Паралельне завантаження на сервері
  const [expenses, animals] = await Promise.all([getExpenses(), getAnimals()]);

  const totalSum = expenses.reduce((acc, curr) => acc + Number(curr.amount), 0);

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif" }}>
      <h1>Журнал фінансових витрат</h1>
      <p>
        Всього проведено витрат на суму:{" "}
        <strong>{totalSum.toLocaleString()} грн</strong>
      </p>

      {/* Форма додавання витрати */}
      <details
        style={{ margin: "16px 0", padding: "12px", border: "1px solid #ddd" }}
      >
        <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
          + Зареєструвати нову витрату
        </summary>
        <form
          action={async formData => {
            "use server";
            await createExpenseAction(formData);
          }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px",
            marginTop: "12px",
          }}
        >
          <input
            name="title"
            placeholder="Призначення (напр. Закупівля сіна)"
            required
          />
          <input
            name="amount"
            type="number"
            step="0.01"
            placeholder="Сума (грн)"
            required
          />
          <select name="category">
            <option value="feed">feed (корми)</option>
            <option value="veterinary">veterinary (ветеринарія)</option>
            <option value="utilities">utilities (обігрів/комунальні)</option>
            <option value="logistics">logistics (доставка)</option>
            <option value="maintenance">maintenance (обслуговування)</option>
          </select>
          <input
            name="spent_at"
            type="date"
            defaultValue={new Date().toISOString().split("T")[0]}
            required
          />
          <input name="vendor" placeholder="Постачальник" />
          <select name="animal_id">
            <option value="none">-- Без прив'язки (загальне) --</option>
            {animals.map(a => (
              <option key={a.id} value={a.id}>
                {a.name} ({a.species})
              </option>
            ))}
          </select>
          <input
            name="notes"
            placeholder="Примітки"
            style={{ gridColumn: "span 2" }}
          />
          <button type="submit" style={{ padding: "6px" }}>
            Зберегти витрату
          </button>
        </form>
      </details>

      {/* Таблиця витрат */}
      {expenses.length === 0 ? (
        <p>Немає зареєстрованих витрат.</p>
      ) : (
        <table
          border={1}
          cellPadding={8}
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th>Дата</th>
              <th>Призначення</th>
              <th>Категорія</th>
              <th>Сума (грн)</th>
              <th>Постачальник</th>
              <th>Тварина</th>
              <th>Дії</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(expense => (
              <tr key={expense.id}>
                <td>{expense.spent_at}</td>
                <td>
                  <strong>{expense.title}</strong>
                </td>
                <td>{expense.category}</td>
                <td>{Number(expense.amount).toFixed(2)}</td>
                <td>{expense.vendor || "—"}</td>
                <td>
                  {expense.animals
                    ? `${expense.animals.name} (${expense.animals.species})`
                    : "Загальне"}
                </td>
                <td>
                  <ExpenseEditDialog expense={expense} animals={animals} />
                  <ExpenseDeleteButton id={expense.id} title={expense.title} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
