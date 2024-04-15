import { TransactionList } from '../model/transaction-list';
import { ProblemDetails } from './problemDetails';

export async function listTransactions(idToken: string): Promise<TransactionList> {
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_GUITO_API_URL}/account/transactions`, {
    headers: {
      'x-google-idtoken': idToken
    }});
    
  if (!response.ok) {
    const problemDetails: ProblemDetails = await response.json();
    throw problemDetails;
  }
  const expenses: TransactionList = await response.json();
  return expenses;
}
