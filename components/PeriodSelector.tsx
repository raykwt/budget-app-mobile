import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

type PeriodSelectorProps = {
  period: string;
  onPeriodSelect: (period: string) => void;
};

const PeriodSelector: React.FC<PeriodSelectorProps> = ({
  period,
  onPeriodSelect,
}) => {
  return (
    <View style={styles.periodSelector}>
      <Pressable
        style={[
          styles.periodOption,
          period === 'week' && styles.periodOptionActive,
        ]}
        onPress={() => onPeriodSelect('week')}
      >
        <Text
          style={[
            styles.periodOptionText,
            period === 'week' && styles.periodOptionTextActive,
          ]}
        >
          Week
        </Text>
      </Pressable>
      <Pressable
        style={[
          styles.periodOption,
          period === 'month' && styles.periodOptionActive,
        ]}
        onPress={() => onPeriodSelect('month')}
      >
        <Text
          style={[
            styles.periodOptionText,
            period === 'month' && styles.periodOptionTextActive,
          ]}
        >
          Month
        </Text>
      </Pressable>
      <Pressable
        style={[
          styles.periodOption,
          period === 'year' && styles.periodOptionActive,
        ]}
        onPress={() => onPeriodSelect('year')}
      >
        <Text
          style={[
            styles.periodOptionText,
            period === 'year' && styles.periodOptionTextActive,
          ]}
        >
          Year
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  periodSelector: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    gap: 8,
  },
  periodOption: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
  },
  periodOptionActive: {
    backgroundColor: '#0891b2',
  },
  periodOptionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748b',
  },
  periodOptionTextActive: {
    color: '#ffffff',
  },
});

export default PeriodSelector;
