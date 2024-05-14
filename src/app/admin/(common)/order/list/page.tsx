import { AdminOrderList } from '@/features/admin/components';
import { getUser } from '@/services/session';

const OrderList = async () => {
  const user = await getUser();
  return (
    <>
      <h1 className="font-poppins font-semibold text-3xl text-dark">
        Order List
      </h1>
      <AdminOrderList isAdmin={user?.role === 'admin'} />
    </>
  );
};

export default OrderList;
