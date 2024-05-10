import { PaginationInfo } from '@/types/PaginationInfo';
import { Product, ProductsParams } from '@/types/Product';
import { get } from '@/utils/api';

export const getProducts = async (searchParams: ProductsParams) => {
  try {
    const res = await get<{
      pagination_info: PaginationInfo;
      products: Product[];
    }>(`/products`, searchParams);
    return res.data;
  } catch (error: any) {
    throw new Error(String(error));
  }
};
