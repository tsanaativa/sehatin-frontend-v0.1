import { Pagination } from '@/components/common';
import OrderList from '@/features/profile/OrderList';

const MyOrders = () => {
  return (
    <div>
      <h1 className="text-xl text-center font-semibold font-poppins md:text-2xl md:text-start">
        My Orders
      </h1>
      <OrderList />
      <Pagination className="mt-12" />
    </div>
  );
};

export default MyOrders;
