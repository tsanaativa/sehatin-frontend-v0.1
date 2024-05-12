import { StockHistory } from '@/types/StockHistory';
import { get } from '@/utils/api';

export const getStockHistories = async () => {
  try {
    const res = await get<{ stock_histories: StockHistory[] }>(
      `/stock-histories`
    );
    return res;
  } catch (error: any) {
    throw new Error(String(error));
  }
};
