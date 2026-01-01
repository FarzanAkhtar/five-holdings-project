import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants';

interface EmptyStateProps {
  message: string;
  submessage?: string;
}

export const EmptyState = memo(function EmptyState({
  message,
  submessage,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      {submessage && <Text style={styles.submessage}>{submessage}</Text>}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  message: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  submessage: {
    marginTop: 8,
    fontSize: 14,
    color: Colors.textTertiary,
    textAlign: 'center',
  },
});
