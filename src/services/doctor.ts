import { get } from '@/utils/api';
import { Doctor } from '@/types/Doctor';
import { PaginationInfo } from '@/types/PaginationInfo';

export const getAllDoctor = async () => {
  try {
    const res = await get<{
      pagination_info: PaginationInfo;
      doctors: Doctor[];
    }>(`/doctors`);
    return res.data;
  } catch (error) {
    throw new Error(String((error as Error).message));
  }
};
