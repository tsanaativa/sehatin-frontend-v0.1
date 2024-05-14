'use server';

import { LoginResponse } from '@/types/Auth';
import { post } from '@/utils/api';
import { getSession } from '@/services/session';

export type OauthReqProps = {
  auth_code: string;
  role: 'user' | 'doctor';
};

export default async function google(data: OauthReqProps) {
  const session = await getSession();

  try {
    const res = await post<LoginResponse>('/auth/oauth/google', data);
    const loginData = res.data;

    session.exp = loginData.exp;
    session.user = loginData.user;
    session.access_token = loginData.token.access_token;
    session.refresh_token = loginData.token.refresh_token;
    await session.save();
    return res.message;
  } catch (error) {
    throw error;
  }
}
