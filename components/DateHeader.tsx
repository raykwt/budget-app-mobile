import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export const DateHeader = ({
  date,
  onLeftPress,
  onRightPress,
}: {
  date: Date;
  onLeftPress: () => void;
  onRightPress: () => void;
}) => {
  return (
    <View style={styles.monthSelector}>
      <Pressable style={styles.monthButton} onPress={onLeftPress}>
        <ChevronLeft size={24} color="#64748b" strokeWidth={2} />
      </Pressable>

      <Text style={styles.monthText}>{format(date, 'MMMM yyyy')}</Text>

      <Pressable style={styles.monthButton} onPress={onRightPress}>
        <ChevronRight size={24} color="#64748b" strokeWidth={2} />
      </Pressable>
    </View>
  );
};

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
    justifyContent: 'space-between',
    marginBottom: 16,
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
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  incomeText: {
    color: '#059669',
  },
  expenseText: {
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
