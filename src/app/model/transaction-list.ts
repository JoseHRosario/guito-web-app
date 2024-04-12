export interface TransactionList {
  transactions: Transaction[];
}

export interface Transaction {
  date: Date;
  amount: number;
  description: string;
}