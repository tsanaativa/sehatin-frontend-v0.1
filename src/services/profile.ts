import { Doctor } from '@/types/Doctor';
import { User } from '@/types/User';
import { get } from '@/utils/api';
import { getSession } from './session';

export const getProfile = async () => {
  try {
    const res = await get<User>(`/users/profile`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getDoctorProfile = async () => {
  try {
    const session = await getSession();
    const res = await get<Doctor>(
      `/doctors/profile`,
      {},
      {
        Authorization: `Bearer ${session.access_token}`,
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
