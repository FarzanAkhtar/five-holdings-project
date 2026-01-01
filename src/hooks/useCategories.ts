import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../api/products';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 2 * 60 * 1000,
  });
}
