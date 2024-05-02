'use server';

import { LoginResponse } from '@/types/Auth';
import api from '@/utils/api';
import cookiesStore from '@/utils/cookies';

export default async function login(formData: FormData) {
  const rawFormData = {
    email: formData.get('email'),
    password: formData.get('password'),
    role: formData.get('role'),
  };

  try {
    const res = await api.post('/auth/login', rawFormData);
    const user = res.data as LoginResponse;
    cookiesStore.set('healthcare-app-user', user);
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
      message = 'Something when wrong';
    }

    throw new Error(message);
  }
}
