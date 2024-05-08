import { User } from '@/types/User';
import { get } from '@/utils/api';

export const getAllUser = async () => {
  try {
    const params = {
      ky: 'fs',
    };
    const res = await get<User[]>(`/users`, params);
    return res.data;
  } catch (error) {
    throw new Error(String((error as Error).message));
  }
};
