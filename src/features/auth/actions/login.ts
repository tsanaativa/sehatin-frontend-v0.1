'use server';

import { getSession } from '@/utils/session';
import { LoginResponse } from '@/types/Auth';
import { post } from '@/utils/api';
import cookiesStore from '@/utils/cookies';

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
    session.isAuthenticated = true;
    await session.save();

    cookiesStore.set('access_token', loginData.token.access_token, true);
    cookiesStore.set('refresh_token', loginData.token.refresh_token, true);

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
