'use server';

import { PUBLIC_API_ROUTES } from '@/constants/routes';
import { getSession } from '@/services/session';
import { redirect } from 'next/navigation';

const logout = async (): Promise<void> => {
  // const response = await fetch(BASE_URL + '/logout', {
  //   headers: {
  //     Authorization: `Bearer ${cookiesStore.get('access_token')}`,
  //     'Content-Type': 'application/json',
  //   },
  // });
  // await response.json();

  const session = await getSession();
  session.destroy();
  redirect('/');
};

const interceptor = async (url: string) => {
  const session = await getSession();
  if (!PUBLIC_API_ROUTES.some((p) => url.includes(p))) {
    if (!session?.user) {
      await logout();
    }

    if (session.exp && new Date(session.exp) <= new Date()) {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL + '/auth/refresh-token',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session?.refresh_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const result = await response.json();
      if (!response.ok) {
        await logout();
      }

      session.exp = result.data.exp;
      session.access_token = result.data.access_token;
      session.refresh_token = undefined;
      await session.save();
    }
  }
};

export { interceptor, logout };
