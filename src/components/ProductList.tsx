import React, { memo, useCallback, useMemo } from 'react';
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { ProductCard } from './ProductCard';
import type { Product } from '../types';
import { Colors } from '../constants';

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  error: Error | null;
  onLoadMore: () => void;
  searchQuery: string;
}

export const ProductList = memo(function ProductList({
  products,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  error,
  onLoadMore,
  searchQuery,
}: ProductListProps) {
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const query = searchQuery.toLowerCase().trim();
    return products.filter((product) =>
      product.title.toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  const renderItem = useCallback(
    ({ item }: { item: Product }) => <ProductCard product={item} />,
    []
  );

  const keyExtractor = useCallback((item: Product) => item.id.toString(), []);

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage && !searchQuery.trim()) {
      onLoadMore();
    }
  }, [hasNextPage, isFetchingNextPage, searchQuery, onLoadMore]);

  const renderFooter = useCallback(() => {
    if (isFetchingNextPage) {
      return (
        <View style={styles.footerLoader}>
          <ActivityIndicator size="small" color={Colors.primary} />
          <Text style={styles.loadingText}>Loading more...</Text>
        </View>
      );
    }
    if (!hasNextPage && products.length > 0 && !searchQuery.trim()) {
      return (
        <View style={styles.footerEnd}>
          <Text style={styles.endText}>You've reached the end</Text>
        </View>
      );
    }
    return null;
  }, [isFetchingNextPage, hasNextPage, products.length, searchQuery]);

  const renderEmpty = useCallback(() => {
    if (isLoading) return null;
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {searchQuery ? 'No products match your search' : 'No products found'}
        </Text>
      </View>
    );
  }, [isLoading, searchQuery]);

  if (isLoading && products.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  if (error && products.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Failed to load products</Text>
        <Text style={styles.errorSubtext}>{error.message}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={filteredProducts}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      numColumns={2}
      contentContainerStyle={styles.listContainer}
      columnWrapperStyle={styles.row}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
      showsVerticalScrollIndicator={false}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
    />
  );
});

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    flexGrow: 1,
  },
  row: {
    justifyContent: 'space-between',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 14,
    color: Colors.textTertiary,
  },
  errorText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.error,
  },
  errorSubtext: {
    marginTop: 8,
    fontSize: 14,
    color: Colors.textTertiary,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textTertiary,
  },
  footerLoader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  footerEnd: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  endText: {
    fontSize: 14,
    color: Colors.textPlaceholder,
  },
});
