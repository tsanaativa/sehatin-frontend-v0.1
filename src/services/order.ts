import { AdminsParams } from '@/types/Admin';
import { Order } from '@/types/Order';
import { PaginationInfo } from '@/types/PaginationInfo';
import { get } from '@/utils/api';

export const getAllOrders = async (
  role: string,
  searchParams: AdminsParams
) => {
  try {
    const res = await get<{ pagination_info: PaginationInfo; orders: Order[] }>(
      `/${role}s/orders`,
      searchParams
    );
    return res.data;
  } catch (error: any) {
    throw new Error(String(error));
  }
};
