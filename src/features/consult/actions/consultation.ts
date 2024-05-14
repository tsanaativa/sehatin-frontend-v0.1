'use server';

import { Consultation } from '@/types/Consultation';
import { post } from '@/utils/api';

export async function createConsultation(req: any) {
  try {
    const res = await post<Consultation>(`/users/consultations`, req);
    return res.data;
  } catch (error) {
    throw error;
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
    throw error;
  }
}

export async function createMedicalCertificate(req: any, id: string) {
  try {
    const res = await post<{ certificate_url: string }>(
      `/doctors/consultations/${id}/certificate`,
      req
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function createPrescription(req: any, id: string) {
  try {
    const res = await post<{ prescription_url: string }>(
      `/doctors/consultations/${id}/prescription`,
      req
    );
    return res.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function addPrescriptionToCart(id: string) {
  try {
    const res = await post(`/users/consultations/${id}/prescription/add`);
    return res.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function endConsultation(role: string, id: string) {
  try {
    const res = await post(`/${role}s/consultations/${id}/end`);
    return res.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
