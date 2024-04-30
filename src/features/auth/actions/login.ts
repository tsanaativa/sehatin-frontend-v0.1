'use server';

import { LoginResponse } from '@/types/Auth';
import api from '@/utils/api';
// import local from '@/utils/localStorage';

export default async function login(formData: FormData) {
  const rawFormData = {
    email: formData.get('email'),
    password: formData.get('password'),
    role: formData.get('role'),
  };

  try {
    const res = await api.post('/auth/login', rawFormData);
    const user = res.data as LoginResponse;
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
