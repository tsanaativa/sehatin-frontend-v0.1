import { Consultation, ConsultationParams } from '@/types/Consultation';
import { PaginationInfo } from '@/types/PaginationInfo';
import { get } from '@/utils/api';

export const getConsultation = async (role: string, id: string) => {
  try {
    const res = await get<Consultation>(`/${role}s/consultations/${id}`);
    return res.data;
  } catch (error: any) {
    throw error;
  }
};

export const getConsultations = async (
  role: string,
  params: ConsultationParams
) => {
  try {
    const res = await get<{
      pagination_info: PaginationInfo;
      consultations: Consultation[];
    }>(`/${role}s/consultations`, params);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
