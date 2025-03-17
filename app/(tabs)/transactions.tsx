import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { format, addMonths, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import TransactionCard from '@/components/TransactionCard';

export default function TransactionsScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const transactions = [
    {
      type: 'expense' as const,
      amount: 25.50,
      category: 'Food',
      description: 'Lunch at Cafe',
      date: '2025-03-15T14:30:00',
    },
    {
      type: 'income' as const,
      amount: 2500.00,
      category: 'Salary',
      description: 'Monthly Salary',
      date: '2025-03-01T09:00:00',
    },
    {
      type: 'expense' as const,
      amount: 45.00,
      category: 'Transport',
      description: 'Uber Ride',
      date: '2025-03-10T16:45:00',
    },
    {
      type: 'expense' as const,
      amount: 120.00,
      category: 'Shopping',
      description: 'Groceries',
      date: '2025-03-05T11:20:00',
    },
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);

  const monthlyTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    return transactionDate >= monthStart && transactionDate <= monthEnd;
  });

  const monthlyTotals = monthlyTransactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.amount;
      } else {
        acc.expenses += transaction.amount;
      }
      return acc;
    },
    { income: 0, expenses: 0 }
  );

  const netAmount = monthlyTotals.income - monthlyTotals.expenses;

  const navigateMonth = (direction: 'prev' | 'next') => {
    setSelectedDate(current => 
      direction === 'prev' ? subMonths(current, 1) : addMonths(current, 1)
    );
  };

  const groupTransactionsByDate = () => {
    const grouped = monthlyTransactions.reduce((acc, transaction) => {
      const date = format(new Date(transaction.date), 'yyyy-MM-dd');
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(transaction);
      return acc;
    }, {} as Record<string, typeof transactions>);

    return Object.entries(grouped).sort((a, b) => 
      new Date(b[0]).getTime() - new Date(a[0]).getTime()
    );
  };

  // Custom icon components that handle web compatibility
  const ChevronLeftIcon = () => (
    <View style={Platform.select({ web: { cursor: 'pointer' } })}>
      <ChevronLeft size={24} color="#64748b" strokeWidth={2} />
    </View>
  );

  const ChevronRightIcon = () => (
    <View style={Platform.select({ web: { cursor: 'pointer' } })}>
      <ChevronRight size={24} color="#64748b" strokeWidth={2} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Transactions</Text>
        
        <View style={styles.monthSelector}>
          <Pressable 
            style={styles.monthButton} 
            onPress={() => navigateMonth('prev')}
          >
            <ChevronLeftIcon />
          </Pressable>
          
          <Text style={styles.monthText}>
            {format(selectedDate, 'MMMM yyyy')}
          </Text>
          
          <Pressable 
            style={styles.monthButton} 
            onPress={() => navigateMonth('next')}
          >
            <ChevronRightIcon />
          </Pressable>
        </View>

        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Income</Text>
              <Text style={[styles.summaryValue, styles.incomeText]}>
                +${monthlyTotals.income.toFixed(2)}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Expenses</Text>
              <Text style={[styles.summaryValue, styles.expenseText]}>
                -${monthlyTotals.expenses.toFixed(2)}
              </Text>
            </View>
          </View>
          <View style={styles.netContainer}>
            <Text style={styles.netLabel}>Net Amount</Text>
            <Text style={[
              styles.netValue,
              netAmount >= 0 ? styles.positiveNet : styles.negativeNet
            ]}>
              ${netAmount.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.transactionsList}>
        {groupTransactionsByDate().map(([date, transactions]) => (
          <View key={date} style={styles.dateGroup}>
            <Text style={styles.dateHeader}>
              {format(new Date(date), 'EEEE, MMMM d')}
            </Text>
            {transactions.map((transaction, index) => (
              <TransactionCard
                key={`${date}-${index}`}
                {...transaction}
                date={format(new Date(transaction.date), 'h:mm a')}
              />
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 24,
    color: '#0f172a',
    fontFamily: 'Inter-Bold',
    marginBottom: 16,
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  monthButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },
  monthText: {
    fontSize: 20,
    color: '#0f172a',
    fontFamily: 'Inter-SemiBold',
    marginHorizontal: 16,
  },
  summaryContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  summaryItem: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  incomeText: {
    color: '#059669',
  },
  expenseText: {
    color: '#dc2626',
  },
  netContainer: {
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 16,
  },
  netLabel: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
    marginBottom: 4,
  },
  netValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  positiveNet: {
    color: '#059669',
  },
  negativeNet: {
    color: '#dc2626',
  },
  transactionsList: {
    flex: 1,
  },
  dateGroup: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  dateHeader: {
    fontSize: 16,
    color: '#64748b',
    fontFamily: 'Inter-Medium',
    marginBottom: 12,
    marginTop: 8,
  },
});