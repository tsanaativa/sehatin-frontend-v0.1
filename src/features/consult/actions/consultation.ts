'use server';

import { Consultation } from '@/types/Consultation';
import { post } from '@/utils/api';

export default async function createConsultation(req: any) {
  try {
    const res = await post<typeof req, Consultation>(
      `/users/consultations`,
      req
    );
    return res.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
