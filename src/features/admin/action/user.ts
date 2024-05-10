'use server';

import { post } from '@/utils/api';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createUser(formData: FormData) {
  const rawFormData = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    birth_date: formData.get('birth_date'),
    gender_id: Number(formData.get('gender_id')),
  };

  try {
    await post(`/auth/register/user`, rawFormData);
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

  revalidatePath('/admin/user/list');
  redirect('/admin/user/list');
}
