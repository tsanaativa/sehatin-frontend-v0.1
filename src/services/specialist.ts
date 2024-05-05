import { Specialist } from '@/types/Doctor';
import { get } from '@/utils/api';

export const getSpecialists = async () => {
  try {
    const params = {};
    const res = await get<typeof params, { specialists: Specialist[] }>(
      `/specialists`
    );
    return res.data.specialists;
  } catch (error: any) {
    throw new Error(String(error));
  }
};
