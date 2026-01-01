import { API_BASE_URL } from '../constants';
import type { Category, ProductsResponse, PaginationParams } from '../types';

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${API_BASE_URL}/products/categories`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
}

export const fetchProductsByCategory = async (
  categorySlug: string,
  params: PaginationParams
): Promise<ProductsResponse> => {
  const { limit, skip } = params;
  const response = await fetch(
    `${API_BASE_URL}/products/category/${categorySlug}?limit=${limit}&skip=${skip}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch products for category: ${categorySlug}`);
  }
  return response.json();
}
