import { Doctor } from '@/types/Doctor';
import { User } from '@/types/User';
import { get } from '@/utils/api';
import { getSession } from './session';
import { Address, ReverseGeoResponse } from '@/types/Address';

export const getProfile = async () => {
  try {
    const res = await get<User>(`/users/profile`);
    return res.data;
  } catch (error) {
    throw new Error(String((error as Error).message));
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
    throw new Error(String((error as Error).message));
  }
};

export const getAddressByLatLong = async (params: {
  lat: number;
  lon: number;
}) => {
  try {
    const res = await get<ReverseGeoResponse>(`/loc/reverse`, params, {});
    return res.data;
  } catch (error) {
    throw new Error(String((error as Error).message));
  }
};
