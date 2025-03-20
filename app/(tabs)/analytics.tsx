import { Category, useTransactions } from '@/context/transactionsContext';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';

export const Colors = ['#0891b2', '#0ea5e9', '#38bdf8', '#7dd3fc', '#a5f3fc'];

export default function AnalyticsScreen() {
  const { transactions } = useTransactions();

  const getExpensesByCategory = () => {
    const categoryMap = transactions.reduce((acc, transaction) => {
      if (transaction.type === 'expense') {
        if (!acc.has(transaction.category)) {
          acc.set(transaction.category, 0);
        }
        acc.set(
          transaction.category,
          acc.get(transaction.category)! + transaction.amount
        );
      }
      return acc;
    }, new Map<Category, number>());

    const expensesArray = Array.from(categoryMap, ([category, amount]) => ({
      category,
      amount,
    }));
    return expensesArray;
  };

  const expenses = getExpensesByCategory();
  const sortedExpenses = expenses.sort((a, b) => b.amount - a.amount);

  const pieData = sortedExpenses.map((item, index) => ({
    name: item.category,
    population: item.amount,
    color: Colors[index % Colors.length],
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  }));
  const screenWidth = Dimensions.get('window').width;

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [2500, 3200, 2800, 3800, 3100, 3500],
        color: () => '#0891b2',
        strokeWidth: 2,
      },
      {
        data: [1800, 2100, 1900, 2300, 2000, 2200],
        color: () => '#dc2626',
        strokeWidth: 2,
      },
    ],
    legend: ['Income', 'Expenses'],
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
    labelColor: () => '#64748b',
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#faf5ff',
    },
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Analytics</Text>
        <Text style={styles.subtitle}>Financial Overview</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Income vs Expenses</Text>
        <LineChart
          data={lineData}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Expense Distribution</Text>
        <PieChart
          data={pieData}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          accessor={'population'}
          backgroundColor={'transparent'}
          paddingLeft={'15'}
          center={[10, 10]}
          absolute
        />
      </View>

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Monthly Summary</Text>
        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Income</Text>
            <Text style={[styles.summaryValue, styles.incomeText]}>
              $3,500.00
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Expenses</Text>
            <Text style={[styles.summaryValue, styles.expenseText]}>
              $2,200.00
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Net Savings</Text>
            <Text style={[styles.summaryValue, styles.savingsText]}>
              $1,300.00
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
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
  },
  title: {
    fontSize: 24,
    color: '#0f172a',
    fontFamily: 'Inter-Bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
    marginTop: 4,
  },
  card: {
    margin: 16,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    color: '#0f172a',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  summaryContainer: {
    padding: 16,
    marginBottom: 24,
  },
  summaryTitle: {
    fontSize: 18,
    color: '#0f172a',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryItem: {
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  incomeText: {
    color: '#059669',
  },
  expenseText: {
    color: '#dc2626',
  },
  savingsText: {
    color: '#0891b2',
  },
});
