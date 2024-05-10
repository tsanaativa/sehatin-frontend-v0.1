'use server';
import { PaginationInfo } from '@/types/PaginationInfo';
import { Pharmacy, PharmacyProduct } from '@/types/Pharmacy';
import { get } from '@/utils/api';
import { getSession } from './session';

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

export const getAllPharmacyProducts = async (id: string) => {
  const session = await getSession();
  try {
    const res = await get<{
      pagination_info: PaginationInfo;
      pharmacy_products: PharmacyProduct[];
    }>(
      `/pharmacies/${id}/products`,
      {},
      {
        Authorization: 'Bearer ' + session.access_token,
      }
    );
    return res.data;
  } catch (error) {
    throw new Error(String((error as Error).message));
  }
};
