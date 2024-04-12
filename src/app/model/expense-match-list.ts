export interface ExpenseMatchList {
  matches: ExpenseMatch[];
}

export interface ExpenseMatch {
  date: Date;
  expense: ExpenseMatchDetail;
  transaction: TransactionMatchDetail;
}

export interface ExpenseMatchDetail {
  amount: number;
  description: string;
}

export interface TransactionMatchDetail {
  id: string;
  amount: number;
  description: string;
}