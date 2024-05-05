import { getSession } from '@/utils/session';

export const getUser = async () => {
  const session = await getSession();
  return session?.user;
};
