import { Report } from '@/types/Report';
import { get } from '@/utils/api';

export const getReports = async () => {
  try {
    const res = await get<{ reports: Report[] }>(`/sales-reports`);
    return res;
  } catch (error: any) {
    throw new Error(String(error));
  }
};
