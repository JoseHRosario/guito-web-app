export interface ExpenseListLatest {
  expenses: ExpenseLatest[];
}

export interface ExpenseLatest {
  storedOrder: number;
  date: string;
  amount: string;
  description: string;
  category: string;
  creatorEmail: string;
}