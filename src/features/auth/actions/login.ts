'use server';

import { LoginResponse } from '@/types/Auth';
import { post } from '@/utils/api';
import cookiesStore from '@/utils/cookies';

export default async function login(formData: FormData) {
  const rawFormData = {
    email: formData.get('email'),
    password: formData.get('password'),
    role: formData.get('role'),
  };

  try {
    const res = await post('/auth/login', rawFormData);
    const user = res.data as LoginResponse;
    cookiesStore.set('healthcare-app-user', user);
    cookiesStore.set('access_token', user.token.access_token, true);
    cookiesStore.set('refresh_token', user.token.refresh_token, true);
    return user;
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
