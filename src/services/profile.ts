import { User } from '@/types/User';
import { get } from '@/utils/api';

export const getProfile = async () => {
  try {
    const res = await get<User>(`/users/profile`);
    return res.data;
  } catch (error) {
    throw new Error(String((error as Error).message));
  }
};
