import { PaginationInfo } from '@/types/PaginationInfo';
import { StockMutation } from '@/types/StockMutation';
import { get } from '@/utils/api';

export const getStockMutations = async (params: any) => {
  try {
    const res = await get<{
      pagination_info: PaginationInfo;
      stock_transfers: StockMutation[];
    }>(`/stock-mutations`, params);
    return res.data;
  } catch (error: any) {
    throw new Error(String(error));
  }
};
