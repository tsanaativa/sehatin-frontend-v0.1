import { Consultation, ConsultationParams } from '@/types/Consultation';
import { PaginationInfo } from '@/types/PaginationInfo';
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

export const getConsultations = async (
  role: string,
  params: ConsultationParams
) => {
  try {
    const res = await get<
      typeof params,
      { pagination_info: PaginationInfo; consultations: Consultation[] }
    >(`/${role}s/consultations`, params);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error((error as Error).message);
  }
};
