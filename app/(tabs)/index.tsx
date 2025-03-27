import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import TransactionCard from '@/components/TransactionCard';
import { useTransactions } from '@/context/transactionsContext';
import { useTransactionSummary } from '@/hooks/useTransactionSummary';

export default function HomeScreen() {
  const { transactions } = useTransactions();
  const recentTransactions = transactions.slice(0, 10);
  const { totalBalance, income, expenses } = useTransactionSummary();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Good morning</Text>
          <Text style={styles.name}>John Doe</Text>
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>${totalBalance.toFixed(2)}</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Income</Text>
              <Text style={[styles.statAmount, styles.incomeText]}>
                +${income.toFixed(2)}
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Expenses</Text>
              <Text style={[styles.statAmount, styles.expenseText]}>
                -${expenses.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          {recentTransactions.map((transaction, index) => (
            <TransactionCard key={index} {...transaction} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingTop: 60,
  },
  greeting: {
    fontSize: 16,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
  },
  name: {
    fontSize: 24,
    color: '#0f172a',
    fontFamily: 'Inter-Bold',
    marginTop: 4,
  },
  balanceCard: {
    margin: 16,
    padding: 24,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
  },
  balanceAmount: {
    fontSize: 32,
    color: '#0f172a',
    fontFamily: 'Inter-Bold',
    marginTop: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 24,
  },
  statItem: {
    flex: 1,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e2e8f0',
    marginHorizontal: 16,
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
    marginBottom: 4,
  },
  statAmount: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  incomeText: {
    color: '#059669',
  },
  expenseText: {
    color: '#dc2626',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#0f172a',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
});
