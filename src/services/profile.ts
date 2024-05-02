import { LoginData } from '@/types/LoginData';
import { User } from '@/types/User';
import api from '@/utils/api';
import cookiesStore from '@/utils/cookies';

export const getProfile = async (id: number) => {
  try {
    const params = {};
    const res = await api.get<typeof params, User>(`/users/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(String(error));
  }
};
