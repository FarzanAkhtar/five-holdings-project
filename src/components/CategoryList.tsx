import React, { memo } from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import type { Category } from '../types';
import { Colors } from '../constants';

interface CategoryListProps {
  categories: Category[] | undefined;
  selectedCategory: string | null;
  onSelectCategory: (slug: string) => void;
  isLoading: boolean;
  error: Error | null;
}

interface CategoryItemProps {
  category: Category;
  isSelected: boolean;
  onPress: (slug: string) => void;
}

const CategoryItem = memo(function CategoryItem({
  category,
  isSelected,
  onPress,
}: CategoryItemProps) {
  return (
    <TouchableOpacity
      style={[styles.categoryItem, isSelected && styles.selectedCategory]}
      onPress={() => onPress(category.slug)}
      activeOpacity={0.7}
    >
      <Text
        style={[styles.categoryText, isSelected && styles.selectedCategoryText]}
        numberOfLines={1}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );
});

export const CategoryList = memo(function CategoryList({
  categories,
  selectedCategory,
  onSelectCategory,
  isLoading,
  error,
}: CategoryListProps) {
  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="small" color={Colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Failed to load categories</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.slug}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <CategoryItem
          category={item}
          isSelected={selectedCategory === item.slug}
          onPress={onSelectCategory}
        />
      )}
    />
  );
});

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.backgroundSecondary,
    marginRight: 8,
  },
  selectedCategory: {
    backgroundColor: Colors.primary,
  },
  categoryText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: Colors.textLight,
  },
  centerContainer: {
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: Colors.error,
    fontSize: 14,
  },
});
