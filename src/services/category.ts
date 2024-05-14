import { Category } from '@/types/Product';
import { get } from '@/utils/api';

export const getCategories = async () => {
  try {
    const res = await get<{ categories: Category[] }>(`/categories`);
    return res.data.categories;
  } catch (error: any) {
    throw error;
  }
};
