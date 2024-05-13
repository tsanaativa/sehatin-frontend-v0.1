import { Admin, AdminsParams } from '@/types/Admin';
import { PaginationInfo } from '@/types/PaginationInfo';
import { get } from '@/utils/api';

export const getAllAdmins = async (searchParams: AdminsParams) => {
  try {
    const res = await get<{ pagination_info: PaginationInfo; admin: Admin[] }>(
      `/admins`,
      searchParams
    );
    return res.data;
  } catch (error: any) {
    throw new Error(String(error));
  }
};
