import { Admin } from '@/types/Admin';
import { get } from '@/utils/api';

export const getAdmins = async () => {
  try {
    const res = await get<{ admins: Admin[] }>(`/admin`);
    return res;
  } catch (error: any) {
    throw new Error(String(error));
  }
};
