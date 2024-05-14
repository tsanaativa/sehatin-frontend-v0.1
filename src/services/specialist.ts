import { Specialist } from '@/types/Doctor';
import { get } from '@/utils/api';

export const getSpecialists = async () => {
  try {
    const res = await get<{ specialists: Specialist[] }>(`/specialists`);
    return res.data.specialists;
  } catch (error: any) {
    throw error;
  }
};
