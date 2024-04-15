import { ExpenseCreate } from '../model/expense-create';
import { ExpenseListLatest } from '../model/expense-list-latest';
import { ExpenseMatchList } from '../model/expense-match-list';
import { ProblemDetails } from './problemDetails';

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
    const problemDetails: ProblemDetails = await response.json();
    throw problemDetails;
  }
  
  return true;
}

export async function listLatestExpenses(idToken: string, count:number): Promise<ExpenseListLatest> {
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_GUITO_API_URL}/expense/latest/${count}`, {
    headers: {
      'x-google-idtoken': idToken
    }});
  if (!response.ok) {
    const problemDetails: ProblemDetails = await response.json();
    throw problemDetails;
  }
  const expenses: ExpenseListLatest = await response.json();
  return expenses;
}

export async function listExpenseMatches(idToken: string): Promise<ExpenseMatchList> {
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_GUITO_API_URL}/expense/match/`, {
    headers: {
      'x-google-idtoken': idToken
    }});
    
  if (!response.ok) {
    const problemDetails: ProblemDetails = await response.json();
    throw problemDetails;
  }
  const expenses: ExpenseMatchList = await response.json();
  return expenses;
}