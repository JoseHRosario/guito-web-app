import { ExpenseExtracted } from '../model/expense-extracted';
import { ExpenseExtract } from '../model/expense-extract';
import { ProblemDetails } from './problemDetails';

export async function extractExpense(extract: ExpenseExtract, idToken: string): Promise<ExpenseExtracted> {

  const response = await fetch(`${process.env.NEXT_PUBLIC_GUITO_API_URL}/ai/extract`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-google-idtoken': idToken
    },
    body: JSON.stringify(extract)
  });

  if (!response.ok) {
    const problemDetails: ProblemDetails = await response.json();
    throw problemDetails;
  }

  const expenses: ExpenseExtracted = await response.json();
  return expenses;
}
