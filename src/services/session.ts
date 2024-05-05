'use server';

import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { SessionData, sessionOptions } from './session_data';

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  return session;
};

export const getUser = async () => {
  const session = await getSession();
  return session?.user;
};
