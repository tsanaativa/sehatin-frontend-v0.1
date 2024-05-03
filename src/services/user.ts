import { LoginData } from '@/types/LoginData';
import cookiesStore from '../utils/cookies';

export function getUser() {
  const user = cookiesStore.get<LoginData>(
    process.env.NEXT_PUBLIC_USER_LOCAL_KEY || ''
  )?.user;
  return user;
}
