'use server';

import { post } from '@/utils/api';

export default async function register(formData: FormData) {
  const role = formData.get('role') as 'user' | 'doctor';
  const userData = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password-confirmation'),
    birth_date: formData.get('birth-date'),
    gender_id: Number(formData.get('gender')),
  };

  try {
    let res;
    if (role == 'user') {
      res = await post('/auth/register/user', userData);
    } else {
      res = await post('/auth/register/doctor', formData, {
        'Content-Type': 'multipart/form-data',
      });
    }
    return res.message;
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
