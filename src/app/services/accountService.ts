import { TransactionList } from '../model/transaction-list';

export async function listTransactions(idToken: string): Promise<TransactionList> {
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_GUITO_API_URL}/account/transactions`, {
    headers: {
      'x-google-idtoken': idToken
    }});
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const expenses: TransactionList = await response.json();
  return expenses;
}
