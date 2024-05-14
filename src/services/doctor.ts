import { get } from '@/utils/api';
import { Doctor } from '@/types/Doctor';
import { PaginationInfo } from '@/types/PaginationInfo';
import { AdminsParams } from '@/types/Admin';

export const getAllDoctor = async (params: AdminsParams) => {
  try {
    const res = await get<{
      pagination_info: PaginationInfo;
      doctors: Doctor[];
    }>(`/doctors`, params);
    return res.data;
  } catch (error) {
    throw new Error(String((error as Error).message));
  }
};

export const getOneDoctor = async (id: number) => {
  try {
    const res = await get<Doctor>(`/doctors/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(String((error as Error).message));
  }
};
