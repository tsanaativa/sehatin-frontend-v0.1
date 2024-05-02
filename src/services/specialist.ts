import { Specialist } from '@/types/Doctor';
import api from '@/utils/api';

export const getSpecialists = async () => {
  try {
    const params = {};
    const res = await api.get<typeof params, { specialists: Specialist[] }>(
      `/specialists`
    );
    return res.data.specialists;
  } catch (error: any) {
    throw new Error(String(error));
  }
};
