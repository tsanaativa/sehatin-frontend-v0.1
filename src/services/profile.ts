import { User } from '@/types/User';
import { get } from '@/utils/api';

export const getProfile = async () => {
  try {
    const params = {};
    const res = await get<typeof params, User>(`/users/profile`);
    return res.data;
  } catch (error) {
    throw new Error(String((error as Error).message));
  }
};
