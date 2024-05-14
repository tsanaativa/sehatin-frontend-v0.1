'use server';

import { LoginResponse } from '@/types/Auth';
import { post } from '@/utils/api';
import { getSession } from '@/services/session';

export async function login(formData: FormData) {
  const session = await getSession();

  const rawFormData = {
    email: formData.get('email'),
    password: formData.get('password'),
    role: formData.get('role'),
  };

  try {
    const res = await post<LoginResponse>('/auth/login', rawFormData);
    const loginData = res.data;

    session.exp = loginData.exp;
    session.user = loginData.user;
    session.access_token = loginData.token.access_token;
    session.refresh_token = loginData.token.refresh_token;
    await session.save();

    return loginData;
  } catch (error) {
    throw error;
  }
}

export async function loginAdmin(formData: FormData) {
  const session = await getSession();

  const rawFormData = {
    email: formData.get('email'),
    password: formData.get('password'),
    role: 'admin',
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
    throw error;
  }
}
