import { useMemo } from 'react';
import { useTransactions } from '@/context/transactionsContext';

export const useTransactionSummary = () => {
  const { transactions } = useTransactions();

  const { totalBalance, income, expenses } = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          acc.income += transaction.amount;
        } else if (transaction.type === 'expense') {
          acc.expenses += transaction.amount;
        }
        acc.totalBalance = acc.income - acc.expenses;
        return acc;
      },
      { totalBalance: 0, income: 0, expenses: 0 }
    );
  }, [transactions]);

  return { totalBalance, income, expenses };
};
