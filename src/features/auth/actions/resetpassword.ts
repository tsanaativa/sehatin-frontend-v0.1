'use server';

import { post } from '@/utils/api';

export default async function forgotPassword(formData: FormData) {
  const userData = {
    role: formData.get('role'),
    email: formData.get('email'),
  };

  try {
    const res = await post('/auth/forgot-password', userData);
    return res.message;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
