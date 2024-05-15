import { PaginationInfo } from '@/types/PaginationInfo';
import { SalesReport } from '@/types/SalesReport';
import { get } from '@/utils/api';

export const getSalesReport = async (params: any) => {
  try {
    const res = await get<{
      pagination_info: PaginationInfo;
      sales_reports: SalesReport[];
    }>(`/sales-reports`, params);
    return res.data;
  } catch (error: any) {
    throw new Error(String(error));
  }
};
