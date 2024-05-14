'use server';

import { getSession } from '@/services/session';
import { User } from '@/types/User';
import { post, put, remove } from '@/utils/api';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateProfile(role: string, formData: FormData) {
  const session = await getSession();
  const headers = {
    Authorization: `Bearer ${session.access_token}`,
  };
  try {
    const res = await put<User>(`/${role}s/profile`, {}, headers, formData);
    if (session.user) {
      if (formData.get('name')) session.user.name = `${formData.get('name')}`;

      if (formData.get('profile_picture'))
        session.user.profile_picture = res.data.profile_picture;

      session.save();
    }
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

  revalidatePath('/profile/my-profile');
  redirect('/profile/my-profile');
}

export async function createAddress(req: any) {
  try {
    await post(`/users/profile/addresses`, req);
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

  revalidatePath('/profile/my-addresses');
  redirect('/profile/my-addresses');
}

export async function deleteAddress(id: number) {
  try {
    await remove(`/users/profile/addresses/${id}`);
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

  revalidatePath('/profile/my-addresses');
  redirect('/profile/my-addresses');
}
