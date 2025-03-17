import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ArrowUpRight, ArrowDownLeft, Coffee, ShoppingBag, Car, Chrome as Home, Utensils } from 'lucide-react-native';

const categoryIcons: { [key: string]: React.ComponentType<any> } = {
  food: Coffee,
  shopping: ShoppingBag,
  transport: Car,
  housing: Home,
  dining: Utensils,
};

interface TransactionCardProps {
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
}

export default function TransactionCard({ type, amount, category, description, date }: TransactionCardProps) {
  const Icon = categoryIcons[category.toLowerCase()] || ShoppingBag;
  
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon size={24} color={type === 'income' ? '#059669' : '#dc2626'} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.category}>{category}</Text>
      </View>
      <View style={styles.amountContainer}>
        <View style={styles.amountRow}>
          {type === 'income' ? (
            <ArrowUpRight size={16} color="#059669" />
          ) : (
            <ArrowDownLeft size={16} color="#dc2626" />
          )}
          <Text style={[styles.amount, { color: type === 'income' ? '#059669' : '#dc2626' }]}>
            ${amount.toFixed(2)}
          </Text>
        </View>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  detailsContainer: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1e293b',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 4,
  },
  date: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#94a3b8',
    marginTop: 4,
  },
});