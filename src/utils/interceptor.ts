import { LoginResponse } from '@/types/Auth';
import { minuteDifference } from './formHelper';
import local from './localStorage';

const userkey = process.env.USER_LOCAL_KEY as string;
const base = process.env.BASE_URL as string;

const publicApiRoute = [
  'register',
  'login',
  'refresh',
  'forgotpassword',
  'resetpassword',
  'verifyemail',
  'logout',
];

const logout = async (): Promise<void> => {
  const response = await fetch(base + '/logout', {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  await response.json();
  if (local.get(userkey)) local.remove(userkey);
};

const interceptor = async (url: string) => {
  if (!publicApiRoute.includes(url.split('/')[1])) {
    const isValidUser = local.get(userkey) as LoginResponse;
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
      local.set(userkey, { ...isValidUser, exp: result.data.exp });
    }
  }
};

export { logout, interceptor };
