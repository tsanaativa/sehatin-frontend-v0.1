import { Partner, PartnersParams } from '@/types/Partner';
import { PaginationInfo } from '@/types/PaginationInfo';
import { get } from '@/utils/api';

export const getAllPartners = async (searchParams: PartnersParams) => {
  try {
    const res = await get<{
      pagination_info: PaginationInfo;
      pharmacy_managers: Partner[];
    }>(`/pharmacy-managers`, searchParams);
    return res.data;
  } catch (error: any) {
    throw new Error(String(error));
  }
};

export const getPartner = async (id: string) => {
  try {
    const res = await get(`/pharmacy-managers/${id}`);
    return res.data as Partner;
  } catch (error: any) {
    throw new Error(String(error));
  }
};
