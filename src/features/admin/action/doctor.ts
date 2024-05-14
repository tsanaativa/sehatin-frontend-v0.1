'use server';

import { getSession } from '@/services/session';
import { post, put } from '@/utils/api';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createDoctorAction(formData: FormData) {
  const session = await getSession();
  const headers = {
    Authorization: `Bearer ${session.access_token}`,
  };
  try {
    await post(`/auth/register/doctor`, {}, headers, formData);
  } catch (error) {
    let message: string;

    if (error instanceof Error) {
      message = error.message;
    } else if (error && typeof error === 'object' && 'message' in error) {
      message = String(error.message);
    } else if (typeof error === 'string') {
      message = error;
    } else {
      message = 'Something went wrong';
    }

    throw new Error(message);
  }

  revalidatePath('/admin/doctor/list');
  redirect('/admin/doctor/list');
}

export async function updateDoctorAction(id: number, formData: FormData) {
  const session = await getSession();
  const headers = {
    Authorization: `Bearer ${session.access_token}`,
  };
  try {
    await put(`/doctors/${id}`, {}, headers, formData);
  } catch (error) {
    let message: string;

    if (error instanceof Error) {
      message = error.message;
    } else if (error && typeof error === 'object' && 'message' in error) {
      message = String(error.message);
    } else if (typeof error === 'string') {
      message = error;
    } else {
      message = 'Something went wrong';
    }

    throw new Error(message);
  }

  revalidatePath('/admin/doctor/list');
  redirect('/admin/doctor/list');
}
