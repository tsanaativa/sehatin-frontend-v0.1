'use server';

import { Consultation } from '@/types/Consultation';
import { post } from '@/utils/api';

export async function createConsultation(req: any) {
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

export async function createChat(
  consultationId: string,
  role: string,
  req: any
) {
  try {
    const res = await post(
      `/${role}s/consultations/${consultationId}/chats`,
      req
    );
    return res.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function createMedicalCertificate(req: any) {
  try {
    const res = await post<typeof req, { url: string }>(
      `/doctors/consultations/certificate`,
      req
    );
    return res.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
