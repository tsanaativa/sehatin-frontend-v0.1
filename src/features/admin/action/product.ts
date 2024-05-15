'use server';

import { getSession } from '@/services/session';
import { post, put, remove } from '@/utils/api';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createProductAction(formData: FormData) {
  const session = await getSession();
  const headers = {
    Authorization: `Bearer ${session.access_token}`,
  };
  try {
    await post(`/products`, {}, headers, formData);
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

  revalidatePath('/admin/medicine/list');
  redirect('/admin/medicine/list');
}

export async function updateProductAction(id: number, formData: FormData) {
  const session = await getSession();
  const headers = {
    Authorization: `Bearer ${session.access_token}`,
  };
  try {
    await put(`/products/${id}`, {}, headers, formData);
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

  revalidatePath('/admin/medicine/list');
  redirect('/admin/medicine/list');
}

export async function deleteProductAction(id: number) {
  const session = await getSession();
  const headers = {
    Authorization: `Bearer ${session.access_token}`,
  };

  try {
    await remove(`/products/${id}`, {}, headers);
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
}
