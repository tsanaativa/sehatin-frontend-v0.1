import { LoginData } from '@/types/LoginData';
import local from './localStorage';

export function getUser() {
  if (typeof window !== 'undefined') {
    const loginData = local.get<LoginData>(
      process.env.NEXT_PUBLIC_USER_LOCAL_KEY || ''
    );
    return loginData.user ? loginData.user : undefined;
  }
}
