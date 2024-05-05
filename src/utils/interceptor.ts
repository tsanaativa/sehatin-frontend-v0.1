'use server';

import { PUBLIC_API_ROUTES } from '@/constants/routes';
import { getSession } from '@/utils/session';
import { redirect } from 'next/navigation';
import cookiesStore from './cookies';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

const logout = async (): Promise<void> => {
  // const response = await fetch(BASE_URL + '/logout', {
  //   headers: {
  //     Authorization: `Bearer ${cookiesStore.get('access_token')}`,
  //     'Content-Type': 'application/json',
  //   },
  // });
  // await response.json();

  const session = await getSession();
  console.log(session, 'sssssssssss');
  session.destroy();

  cookiesStore.remove('access_token');
  cookiesStore.remove('refresh_token');

  redirect('/');
};

const interceptor = async (url: string) => {
  const session = await getSession();
  if (!PUBLIC_API_ROUTES.some((p) => url.includes(p))) {
    if (!session.user) {
      await logout();
    }

    if (session.exp && new Date(session.exp) <= new Date()) {
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
      }

      session.exp = result.data.exp;
      await session.save();

      cookiesStore.set('access_token', result.data.token.access_token, true);
    }
  }
};

export { interceptor, logout };
