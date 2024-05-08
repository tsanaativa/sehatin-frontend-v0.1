import { PaginationInfo } from '@/types/PaginationInfo';
import { Pharmacy } from '@/types/Pharmacy';
import { get } from '@/utils/api';

export const getAllPharmacies = async () => {
  try {
    const res = await get<{
      pagination_info: PaginationInfo;
      pharmacies: Pharmacy[];
    }>(`/pharmacies`);
    return res.data;
  } catch (error) {
    throw new Error(String((error as Error).message));
  }
};
