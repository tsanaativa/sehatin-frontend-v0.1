import { LoginData } from '@/types/LoginData';
import local from './localStorage';

export function getUser() {
  if (typeof window !== 'undefined') {
    const loginData = local.get<LoginData>(
      process.env.NEXT_PUBLIC_USER_LOCAL_KEY || ''
    );

    let isAuthenticated = !!loginData?.user;

    if (isAuthenticated) {
      const currentTime = new Date();
      const isExpired = currentTime > new Date(loginData.exp);
      isAuthenticated = isAuthenticated && !isExpired;
    }

    if (!isAuthenticated) {
      local.remove(process.env.NEXT_PUBLIC_USER_LOCAL_KEY || '');
    }

    return isAuthenticated ? loginData.user : undefined;
  }
}
