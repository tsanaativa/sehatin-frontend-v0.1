import { PaginationInfo } from '@/types/PaginationInfo';
import { Product } from '@/types/Product';
import { get } from '@/utils/api';

export const getAllProducts = async () => {
  try {
    const res = await get<{
      pagination_info: PaginationInfo;
      products: Product[];
    }>(`/products`);
    return res.data;
  } catch (error) {
    throw new Error(String((error as Error).message));
  }
};
