'use server';

import { LoginResponse } from '@/types/Auth';
import cookiesStore from './cookies';
import { minuteDifference } from './helper';

const userkey = process.env.NEXT_PUBLIC_USER_LOCAL_KEY as string;
const base = process.env.NEXT_PUBLIC_BASE_URL as string;

const publicApiRoute = [
  '/auth/register',
  '/auth/login',
  '/auth/refresh-token',
  '/auth/oauth/google',
  '/auth/verify',
  '/auth/logout',
  '/products',
  '/categories',
  '/doctors',
  '/specialists',
  '/users',
];

const logout = async (): Promise<void> => {
  const response = await fetch(base + '/logout', {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  await response.json();
  if (cookiesStore.get(userkey)) cookiesStore.remove(userkey);
};

const interceptor = async (url: string) => {
  if (!publicApiRoute.some((p) => url.includes(p))) {
    const isValidUser = cookiesStore.get(userkey) as LoginResponse;
    if (!isValidUser) {
      await logout();
      window.location.replace('/auth/login');
    }
    if (minuteDifference(isValidUser.exp) <= 0) {
      const response = await fetch(base + '/refresh-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const result = await response.json();
      if (!response.ok) {
        await logout();
        window.location.replace('/auth/login');
      }
      cookiesStore.set(userkey, { ...isValidUser, exp: result.data.exp });
    }
  }
};

export { interceptor, logout };
