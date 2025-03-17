import { createContext, useContext, useState } from 'react';

const demoTransactions: Transaction[] = [
  {
    type: 'expense' as const,
    amount: 25.5,
    category: 'Food',
    description: 'Lunch at Cafe',
    date: '2025-03-15T14:30:00',
    source: 'credit' as const,
  },
  {
    type: 'income' as const,
    amount: 2500.0,
    category: 'Salary',
    description: 'Monthly Salary',
    date: '2025-03-01T09:00:00',
    source: 'debit' as const,
  },
  {
    type: 'expense' as const,
    amount: 45.0,
    category: 'Transport',
    description: 'Uber Ride',
    date: '2025-03-10T16:45:00',
    source: 'credit' as const,
  },
  {
    type: 'expense' as const,
    amount: 120.0,
    category: 'Shopping',
    description: 'Groceries',
    date: '2025-03-05T11:20:00',
    source: 'cash' as const,
  },
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export type Category =
  | 'Food'
  | 'Transport'
  | 'Shopping'
  | 'Bills'
  | 'Salary'
  | 'Investment';
export type TransactionType = 'income' | 'expense';
export type PaymentSource = 'credit' | 'debit' | 'cash';
export type Transaction = {
  type: TransactionType;
  amount: number;
  category: Category;
  description: string;
  date: Date;
  source: PaymentSource;
};

type TransactionsContextType = {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
};

const TransactionsContext = createContext<TransactionsContextType | undefined>(
  undefined
);

export function TransactionsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [transactions, setTransactions] =
    useState<Transaction[]>(demoTransactions);

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => {
      const updatedTransactions = [...prev, transaction].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      return [...updatedTransactions];
    });
  };

  return (
    <TransactionsContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  if (!context)
    throw new Error(
      'useTransactions must be used within a TransactionsProvider'
    );
  return context;
}
