'use server';

import { post, put, remove } from '@/utils/api';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createAdmin(formData: FormData) {
  const rawFormData = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  };

  try {
    await post(`/admins`, rawFormData);
    revalidatePath('/admin/admin/list');
    redirect('/admin/admin/list');
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

export async function updateAdmin(formData: FormData) {
  const rawFormData = {
    name: formData.get('name'),
  };

  try {
    await put(`/admins`, rawFormData);
    revalidatePath('/admin/admin/list');
    redirect('/admin/admin/list');
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

export async function deleteAdmin(id: number) {
  try {
    await remove(`/admins/${id}`);
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
