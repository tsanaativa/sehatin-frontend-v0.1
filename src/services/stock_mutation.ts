import { StockMutation } from '@/types/StockMutation';
import { get } from '@/utils/api';

export const getStockMutations = async () => {
  try {
    const res = await get<{ StockMutations: StockMutation[] }>(
      `/stock-mutations`
    );
    return res;
  } catch (error: any) {
    throw new Error(String(error));
  }
};
