'use server';

import { LoginResponse } from '@/types/Auth';
import { post } from '@/utils/api';
import { getSession } from '@/services/session';

export default async function login(formData: FormData) {
  const session = await getSession();

  const rawFormData = {
    email: formData.get('email'),
    password: formData.get('password'),
    role: formData.get('role'),
  };

  try {
    const res = await post('/auth/login', rawFormData);
    const loginData = res.data as LoginResponse;

    session.exp = loginData.exp;
    session.user = loginData.user;
    session.access_token = loginData.token.access_token;
    session.refresh_token = loginData.token.refresh_token;
    await session.save();

    return loginData;
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
