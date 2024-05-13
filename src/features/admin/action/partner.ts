'use server';

import { getSession } from '@/services/session';
import { post, put, remove } from '@/utils/api';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function createPartner(formData: FormData) {
  const session = await getSession();
  const headers = {
    Authorization: `Bearer ${session.access_token}`,
  };
  try {
    await post('/auth/register/pharmacy-manager', {}, headers, formData);
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

  revalidatePath('/admin/partner/list');
  redirect('/admin/partner/list');
}

export async function updatePartner(id: string, formData: FormData) {
  const session = await getSession();
  const headers = {
    Authorization: `Bearer ${session.access_token}`,
  };
  try {
    await put(`/pharmacy-managers/${id}`, {}, headers, formData);
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

  revalidatePath('/admin/partner/list');
  redirect('/admin/partner/list');
}

export async function deletePartner(id: number) {
  try {
    await remove(`/pharmacy-managers/${id}`);
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

  revalidatePath('/admin/admin/list');
  redirect('/admin/admin/list');
}
