import { Category } from '@/types/Product';
import { get } from '@/utils/api';

export const getCategories = async () => {
  try {
    const params = {};
    const res = await get<typeof params, { categories: Category[] }>(
      `/categories`
    );
    return res.data.categories;
  } catch (error: any) {
    throw new Error(String(error));
  }
};
