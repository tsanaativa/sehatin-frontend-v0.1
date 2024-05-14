import { PaginationInfo } from '@/types/PaginationInfo';
import { PharmacyProductUser, Product, ProductsParams } from '@/types/Product';
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

// export const getNearestProducts = async (searchParams: ProductsParams) => {
//   try {
//     const res = await get<{
//       pagination_info: PaginationInfo;
//       products: PharmacyProductUser[];
//     }>(`/products/nearest/search`, searchParams);
//     return res.data;
//   } catch (error: any) {
//     throw new Error(String(error));
//   }
// };

export const getNearestProductsSearch = async (
  searchParams: ProductsParams
) => {
  try {
    const res = await get<{
      pagination_info: PaginationInfo;
      products: PharmacyProductUser[];
    }>(`/products/nearest/search`, searchParams);
    return res.data;
  } catch (error: any) {
    throw new Error(String(error));
  }
};
