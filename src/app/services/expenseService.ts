import { Category } from '../model/category';
import { Expense } from '../model/expense';

export async function listCategories(idToken: string): Promise<Category[]> {
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_GUITO_API_URL}/category`, {
    headers: {
      'x-google-idtoken': idToken
    }});
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const categories: Category[] = await response.json();
  return categories;
}

export async function createExpense(expense: Expense, idToken: string): Promise<boolean> {
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