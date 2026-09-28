import { getExpenses } from "@/server/services/expenses";
import { getAnimals } from "@/server/services/animals";
import { ExpenseEditDialog } from "./expense-edit-dialog";
import { ExpenseDeleteButton } from "./expense-delete-button";
import { ExpenseCreateForm } from "./expense-create-form";

export default async function Page() {
  const [expenses, animals] = await Promise.all([getExpenses(), getAnimals()]);

  const totalSum = expenses.reduce((acc, curr) => acc + Number(curr.amount), 0);

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif" }}>
      <h1>Журнал фінансових витрат</h1>
      <p>
        Всього проведено витрат на суму:{" "}
        <strong>{totalSum.toLocaleString()} грн</strong>
      </p>

      {/* Форма з інтегрованим Gemini сканером */}
      <ExpenseCreateForm animals={animals} />

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
              <th>Примітки</th>
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
                <td>{expense.notes || "—"}</td>
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
