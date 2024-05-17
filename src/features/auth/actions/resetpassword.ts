'use server';

import { post } from '@/utils/api';

export async function forgotPassword(formData: FormData) {
  const param = {
    role: formData.get('role'),
    email: formData.get('email'),
  };

  try {
    const res = await post('/auth/forgot-password', param);
    return res.message;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function resetPassword(formData: FormData) {
  const param = {
    token: formData.get('token'),
    email: formData.get('email'),
    new_password: formData.get('password-confirmation'),
  };

  try {
    const res = await post('/auth/reset-password', param);
    return res.message;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
