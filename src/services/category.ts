import { Category } from '@/types/Product';
import { get } from '@/utils/api';

export const getCategories = async () => {
  try {
    const res = await get<{ categories: Category[] }>(`/categories`);
    const data = Object.fromEntries(
      res.data.categories.map((d) => [d.id.toString(), d.name])
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
