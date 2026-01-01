import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProductsByCategory } from '../api/products';
import { PRODUCTS_PER_PAGE } from '../constants';

export function useProducts(categorySlug: string | null) {
  return useInfiniteQuery({
    queryKey: ['products', categorySlug],
    queryFn: ({ pageParam = 0 }) =>
      fetchProductsByCategory(categorySlug!, {
        limit: PRODUCTS_PER_PAGE,
        skip: pageParam,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + lastPage.limit;
      return nextSkip < lastPage.total ? nextSkip : undefined;
    },
    enabled: !!categorySlug,
    staleTime: 2 * 60 * 1000,
  });
}
