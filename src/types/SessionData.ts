import { SessionOptions } from 'iron-session';
import { User } from './User';

export interface SessionData {
  exp?: string;
  user?: User;
  access_token?: string;
  refresh_token?: string;
}

export const sessionOptions: SessionOptions = {
  password: process.env.NEXT_PUBLIC_SECRET_KEY!,
  cookieName: process.env.NEXT_PUBLIC_USER_KEY || '',
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NEXT_PUBLIC_NODE_ENV === 'production',
  },
};
