import { User } from '@/types/User';
import api from '@/utils/api';

export const getProfile = async (id: number) => {
  try {
    const params = {};
    const res = await api.get<typeof params, User>(`/users/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(String(error));
  }
};
