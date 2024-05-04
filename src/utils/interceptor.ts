'use server';

import { LoginResponse } from '@/types/Auth';
import cookiesStore from './cookies';
import { PUBLIC_API_ROUTES } from '@/constants/routes';

const USER_KEY = process.env.NEXT_PUBLIC_USER_LOCAL_KEY as string;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

const logout = async (): Promise<void> => {
  // const response = await fetch(BASE_URL + '/logout', {
  //   headers: {
  //     Authorization: `Bearer ${cookiesStore.get('access_token')}`,
  //     'Content-Type': 'application/json',
  //   },
  // });
  // await response.json();
  cookiesStore.remove(USER_KEY || '');
  cookiesStore.remove('access_token');
  cookiesStore.remove('refresh_token');
};

const interceptor = async (url: string) => {
  if (!PUBLIC_API_ROUTES.some((p) => url.includes(p))) {
    const isValidUser = cookiesStore.get(USER_KEY) as LoginResponse;
    if (!isValidUser) {
      await logout();
      window.location.replace('/auth/login');
    }
    if (new Date(isValidUser.exp) <= new Date()) {
      const response = await fetch(BASE_URL + '/auth/refresh-token', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${cookiesStore.get('refresh_token')}`,
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      if (!response.ok) {
        await logout();
        window.location.replace('/auth/login');
      }
      cookiesStore.set(USER_KEY, { ...isValidUser, exp: result.data.exp });
      cookiesStore.set('access_token', result.data.token.access_token, true);
      cookiesStore.set('refresh_token', result.data.token.refresh_token, true);
    }
  }
};

export { interceptor, logout };
