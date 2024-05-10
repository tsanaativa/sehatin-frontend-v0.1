import { PaginationInfo } from '@/types/PaginationInfo';
import { User } from '@/types/User';
import { get } from '@/utils/api';

export const getAllUser = async () => {
  try {
    const res = await get<{ pagination_info: PaginationInfo; users: User[] }>(
      `/users`
    );
    return res.data;
  } catch (error) {
    throw new Error(String((error as Error).message));
  }
};
