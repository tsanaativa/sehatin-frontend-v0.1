import { PharmacyManager } from '@/types/PharmacyManager';
import { get } from '@/utils/api';

export const getPharmacyManagers = async () => {
  try {
    const res = await get<{ pharmacy_managers: PharmacyManager[] }>(
      `/pharmacy-managers`
    );
    return res;
  } catch (error: any) {
    throw new Error(String(error));
  }
};
