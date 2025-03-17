import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { format } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';
import { X } from 'lucide-react-native';

type Category =
  | 'Food'
  | 'Transport'
  | 'Shopping'
  | 'Bills'
  | 'Salary'
  | 'Investment';
type TransactionType = 'income' | 'expense';
type PaymentSource = 'credit' | 'debit' | 'cash';

export default function AddTransactionScreen() {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<TransactionType>('expense');
  const [category, setCategory] = useState<Category>('Food');
  const [source, setSource] = useState<PaymentSource>('cash');

  const categories: Category[] = [
    'Food',
    'Transport',
    'Shopping',
    'Bills',
    'Salary',
    'Investment',
  ];
  const sources: PaymentSource[] = ['credit', 'debit', 'cash'];

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleSubmit = () => {
    // Here you would typically save the transaction
    console.log({
      date,
      amount: parseFloat(amount),
      description,
      type,
      category,
      source,
    });
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Add Transaction</Text>
        <Pressable onPress={() => router.back()} style={styles.closeButton}>
          <X size={24} color="#64748b" />
        </Pressable>
      </View>

      <ScrollView style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Type</Text>
          <View style={styles.segmentedControl}>
            <Pressable
              style={[
                styles.segment,
                type === 'expense' && styles.segmentActive,
              ]}
              onPress={() => setType('expense')}
            >
              <Text
                style={[
                  styles.segmentText,
                  type === 'expense' && styles.segmentTextActive,
                ]}
              >
                Expense
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.segment,
                type === 'income' && styles.segmentActive,
              ]}
              onPress={() => setType('income')}
            >
              <Text
                style={[
                  styles.segmentText,
                  type === 'income' && styles.segmentTextActive,
                ]}
              >
                Income
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.input}
            keyboardType="decimal-pad"
            value={amount}
            onChangeText={setAmount}
            placeholder="0.00"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date</Text>
          {Platform.OS === 'ios' ? (
            <DateTimePicker
              value={date}
              mode="datetime"
              display="spinner"
              onChange={handleDateChange}
              style={styles.datePickerIOS}
            />
          ) : (
            <>
              <Pressable
                onPress={() => setShowDatePicker(true)}
                style={styles.dateButton}
              >
                <Text style={styles.dateButtonText}>
                  {format(date, 'MMM d, yyyy h:mm a')}
                </Text>
              </Pressable>
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="datetime"
                  onChange={handleDateChange}
                />
              )}
            </>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Category</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}
          >
            {categories.map((cat) => (
              <Pressable
                key={cat}
                style={[
                  styles.categoryChip,
                  category === cat && styles.categoryChipActive,
                ]}
                onPress={() => setCategory(cat)}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    category === cat && styles.categoryChipTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Payment Source</Text>
          <View style={styles.sourceContainer}>
            {sources.map((src) => (
              <Pressable
                key={src}
                style={[
                  styles.sourceChip,
                  source === src && styles.sourceChipActive,
                ]}
                onPress={() => setSource(src)}
              >
                <Text
                  style={[
                    styles.sourceChipText,
                    source === src && styles.sourceChipTextActive,
                  ]}
                >
                  {src.charAt(0).toUpperCase() + src.slice(1)}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter description"
            multiline
            numberOfLines={4}
          />
        </View>

        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Add Transaction</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  },
  closeButton: {
    padding: 8,
  },
  form: {
    flex: 1,
    padding: 24,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    color: '#64748b',
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#0f172a',
    fontFamily: 'Inter-Regular',
    backgroundColor: '#ffffff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  segmentedControl: {
    flexDirection: 'row',
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    padding: 4,
  },
  segment: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  segmentActive: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  segmentText: {
    fontSize: 16,
    color: '#64748b',
    fontFamily: 'Inter-Medium',
  },
  segmentTextActive: {
    color: '#0f172a',
  },
  categoryScroll: {
    flexGrow: 0,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: '#0891b2',
  },
  categoryChipText: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: 'Inter-Medium',
  },
  categoryChipTextActive: {
    color: '#ffffff',
  },
  sourceContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  sourceChip: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
  },
  sourceChipActive: {
    backgroundColor: '#0891b2',
  },
  sourceChipText: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: 'Inter-Medium',
  },
  sourceChipTextActive: {
    color: '#ffffff',
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  dateButtonText: {
    fontSize: 16,
    color: '#0f172a',
    fontFamily: 'Inter-Regular',
  },
  datePickerIOS: {
    height: 180,
  },
  submitButton: {
    backgroundColor: '#0891b2',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 48,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});
