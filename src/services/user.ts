import { Address } from '@/types/Address';
import { AdminsParams } from '@/types/Admin';
import { PaginationInfo } from '@/types/PaginationInfo';
import { User } from '@/types/User';
import { get } from '@/utils/api';

export const getAllUser = async (params: AdminsParams) => {
  try {
    const res = await get<{ pagination_info: PaginationInfo; users: User[] }>(
      `/users`,
      params
    );
    return res.data;
  } catch (error) {
    throw new Error(String((error as Error).message));
  }
};

export const getOneUser = async (id: number) => {
  try {
    const res = await get<User>(`/users/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(String((error as Error).message));
  }
};
