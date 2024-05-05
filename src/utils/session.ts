'use server';

import { SessionData, sessionOptions } from '@/services/session';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  return session;
};
