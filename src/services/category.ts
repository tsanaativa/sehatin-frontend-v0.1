import { Category } from '@/types/Product';
import api from '@/utils/api';

export const getCategories = async () => {
  try {
    const params = {};
    const res = await api.get<typeof params, { categories: Category[] }>(
      `/categories`
    );
    return res.data.categories;
  } catch (error: any) {
    throw new Error(String(error));
  }
};
