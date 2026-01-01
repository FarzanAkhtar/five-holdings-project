import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CategoryList, SearchBar, ProductList, EmptyState } from '../components';
import { useCategories, useProducts } from '../hooks';
import { Colors } from '../constants';

export const ProductBrowserScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  const {
    data: productsData,
    isLoading: productsLoading,
    isFetchingNextPage,
    hasNextPage,
    error: productsError,
    fetchNextPage,
  } = useProducts(selectedCategory);

  const handleCategorySelect = useCallback((slug: string) => {
    setSelectedCategory(slug);
    setSearchQuery('');
  }, []);

  const handleSearchChange = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allProducts = useMemo(() => {
    if (!productsData?.pages) return [];
    return productsData.pages.flatMap((page) => page.products);
  }, [productsData?.pages]);

  const selectedCategoryName = useMemo(() => {
    if (!selectedCategory || !categories) return null;
    const category = categories.find((c) => c.slug === selectedCategory);
    return category?.name ?? selectedCategory;
  }, [selectedCategory, categories]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.backgroundPrimary} />
      <View style={styles.header}>
        <Text style={styles.title}>Product Browser</Text>
      </View>

      <CategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
        isLoading={categoriesLoading}
        error={categoriesError}
      />

      {selectedCategory && (
        <View style={styles.flex1}>
          <View style={styles.categoryHeader}>
            <Text style={styles.categoryTitle}>{selectedCategoryName}</Text>
            {productsData?.pages[0] && (
              <Text style={styles.productCount}>
                {productsData.pages[0].total} products
              </Text>
            )}
          </View>
          <SearchBar value={searchQuery} onChangeText={handleSearchChange} />
          <ProductList
            products={allProducts}
            isLoading={productsLoading}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage ?? false}
            error={productsError}
            onLoadMore={handleLoadMore}
            searchQuery={searchQuery}
          />
        </View>
      )}

      {!selectedCategory && !categoriesLoading && (
        <EmptyState
          message="Select a category"
          submessage="Choose a category above to browse products"
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
  },
  flex1: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  productCount: {
    fontSize: 14,
    color: Colors.textTertiary,
  },
});
