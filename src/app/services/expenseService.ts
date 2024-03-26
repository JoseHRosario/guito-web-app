import { ExpenseCreate } from '../model/expense-create';
import { ExpenseListLatest } from '../model/expense-list-latest';

export async function createExpense(expense: ExpenseCreate, idToken: string): Promise<boolean> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_GUITO_API_URL}/expense`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-google-idtoken': idToken
    },
    body: JSON.stringify(expense)
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return true;
}

export async function listLatestExpenses(idToken: string, count:number): Promise<ExpenseListLatest> {
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_GUITO_API_URL}/expense/latest/${count}`, {
    headers: {
      'x-google-idtoken': idToken
    }});
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const expenses: ExpenseListLatest = await response.json();
  return expenses;
}
