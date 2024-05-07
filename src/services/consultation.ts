import { Consultation } from '@/types/Consultation';
import { get } from '@/utils/api';

export const getConsultation = async (role: string, id: string) => {
  try {
    const params = {};
    const res = await get<typeof params, Consultation>(
      `/${role}s/consultations/${id}`
    );
    return res.data;
  } catch (error: any) {
    throw new Error(String(error));
  }
};
