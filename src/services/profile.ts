import { Doctor } from '@/types/Doctor';
import { User } from '@/types/User';
import { get } from '@/utils/api';
import { getSession } from './session';

export const getProfile = async () => {
  try {
    const params = {};
    const res = await get<typeof params, User>(`/users/profile`);
    return res.data;
  } catch (error) {
    throw new Error(String((error as Error).message));
  }
};

export const getDoctorProfile = async () => {
  try {
    const session = await getSession();
    const params = {};
    const res = await get<typeof params, Doctor>(
      `/doctors/profile`,
      {},
      {
        Authorization: `Bearer ${session.access_token}`,
      }
    );
    return res.data;
  } catch (error) {
    throw new Error(String((error as Error).message));
  }
};
