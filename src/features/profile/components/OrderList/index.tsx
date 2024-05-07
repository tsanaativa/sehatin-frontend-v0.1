import { OrderCard } from '@/components/common';
import { BadgeProps } from '@/components/common/OrderCard';
import { PharmaciesInCartProps } from '@/features/cart/components/Cart';

type OrderListProps = PharmaciesInCartProps & {
  totalOrder: string | number;
  badge: BadgeProps;
};

const OrderList = () => {
  const ongoing: OrderListProps[] = [
    {
      products: [
        {
          id: 1,
          picture:
            'https://images.unsplash.com/photo-1598046937895-2be846402c0d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          name: 'Panadol Obat Pusing',
          slug: 'panadol-obat-pusingg-1',
          price: 15990,
          stock: 3,
          inCart: 2,
          label: 'March 22, 2022',
          is_available: true,
        },
      ],
      totalOrder: 7,
      badge: 'Delivered',
      name: 'K-24 Mampang Prapatan',
      id: 1,
    },
    {
      products: [
        {
          id: 11,
          picture:
            'https://images.unsplash.com/photo-1598046937895-2be846402c0d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          name: 'Panadol Obat Pusing',
          slug: 'panadol-obat-pusingg-11',
          price: 15990,
          stock: 3,
          inCart: 2,
          label: 'March 22, 2022',
          is_available: true,
        },
      ],
      totalOrder: 5,
      badge: 'Shipped',
      name: 'Century Mampang Prapatan',
      id: 2,
    },
  ];

  const completed: OrderListProps[] = [
    {
      products: [
        {
          id: 1,
          picture:
            'https://images.unsplash.com/photo-1598046937895-2be846402c0d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          name: 'Panadol Obat Pusing',
          slug: 'panadol-obat-pusingg-1',
          price: 15990,
          stock: 3,
          inCart: 2,
          label: 'March 22, 2022',
          is_available: true,
        },
      ],
      totalOrder: 7,
      badge: 'Completed',
      name: 'K-24 Mampang Prapatan',
      id: 1,
    },
    {
      products: [
        {
          id: 11,
          picture:
            'https://images.unsplash.com/photo-1598046937895-2be846402c0d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          name: 'Panadol Obat Pusing',
          slug: 'panadol-obat-pusingg-11',
          price: 15990,
          stock: 3,
          inCart: 2,
          label: 'March 22, 2022',
          is_available: true,
        },
      ],
      totalOrder: 5,
      badge: 'Completed',
      name: 'Century Mampang Prapatan',
      id: 2,
    },
  ];
  return (
    <div className="flex flex-col items-center mt-5">
      <div className="flex gap-x-2 w-full overflow-x-auto peer">
        <input
          type="radio"
          id="all"
          className="all peer/all"
          name="status"
          defaultChecked
          hidden
        />
        <label
          htmlFor="all"
          className="bg-light border border-gray-light font-bold text-sm text-dark-gray text-center min-w-32 block rounded-md py-2 cursor-pointer peer-checked/all:bg-primary-light peer-checked/all:text-primary-dark peer-checked/all:border-primary-dark"
        >
          All
        </label>
        <input
          type="radio"
          id="pending"
          className="pending peer/pending"
          name="status"
          hidden
        />
        <label
          htmlFor="pending"
          className="bg-light border border-gray-light font-bold text-sm text-dark-gray text-center min-w-32 block rounded-md py-2 cursor-pointer peer-checked/pending:bg-primary-light peer-checked/pending:text-primary-dark peer-checked/pending:border-primary-dark"
        >
          Pending
        </label>
        <input
          type="radio"
          id="processing"
          className="processing peer/processing"
          name="status"
          hidden
        />
        <label
          htmlFor="processing"
          className="bg-light border border-gray-light font-bold text-sm text-dark-gray text-center min-w-32 block rounded-md py-2 cursor-pointer peer-checked/processing:bg-primary-light peer-checked/processing:text-primary-dark peer-checked/processing:border-primary-dark"
        >
          Processing
        </label>
        <input
          type="radio"
          id="shipped"
          className="shipped peer/shipped"
          name="status"
          hidden
        />
        <label
          htmlFor="shipped"
          className="bg-light border border-gray-light font-bold text-sm text-dark-gray text-center min-w-32 block rounded-md py-2 cursor-pointer peer-checked/shipped:bg-primary-light peer-checked/shipped:text-primary-dark peer-checked/shipped:border-primary-dark"
        >
          Shipped
        </label>
        <input
          type="radio"
          id="delivered"
          className="delivered peer/delivered"
          name="status"
          hidden
        />
        <label
          htmlFor="delivered"
          className="bg-light border border-gray-light font-bold text-sm text-dark-gray text-center min-w-32 block rounded-md py-2 cursor-pointer peer-checked/delivered:bg-primary-light peer-checked/delivered:text-primary-dark peer-checked/delivered:border-primary-dark"
        >
          Delivered
        </label>
        <input
          type="radio"
          id="completed"
          className="completed peer/completed"
          name="status"
          hidden
        />
        <label
          htmlFor="completed"
          className="bg-light border border-gray-light font-bold text-sm text-dark-gray text-center min-w-32 block rounded-md py-2 cursor-pointer peer-checked/completed:bg-primary-light peer-checked/completed:text-primary-dark peer-checked/completed:border-primary-dark"
        >
          Completed
        </label>
        <input
          type="radio"
          id="canceled"
          className="canceled peer/canceled"
          name="status"
          hidden
        />
        <label
          htmlFor="canceled"
          className="bg-light border border-gray-light font-bold text-sm text-dark-gray text-center min-w-32 block rounded-md py-2 cursor-pointer peer-checked/canceled:bg-primary-light peer-checked/canceled:text-primary-dark peer-checked/canceled:border-primary-dark"
        >
          Canceled
        </label>
      </div>
      <div className="hidden w-full mt-4 peer-has-[.all:checked]:block">
        <div className="flex flex-col gap-5 w-full lg:w-[calc(100%-384px)] lg:overflow-hidden">
          {ongoing.map((p, idx) => (
            <OrderCard
              key={idx}
              products={p.products}
              badge={p.badge}
              redirectTo={`/profile/my-orders/${p.id}`}
              childrenKey={{
                key: 'inCart',
                customKey: +p.totalOrder - 1,
                prefix: '+',
                suffix: ' more',
              }}
            />
          ))}
        </div>
      </div>
      <div className="hidden w-full mt-4 peer-has-[.completed:checked]:block">
        <div className="flex flex-col gap-5 w-full lg:w-[calc(100%-384px)] lg:overflow-hidden">
          {completed.map((p, idx) => (
            <OrderCard
              key={idx}
              products={p.products}
              badge={p.badge}
              redirectTo={`/profile/my-orders/${p.id}`}
              childrenKey={{
                key: 'inCart',
                customKey: +p.totalOrder - 1,
                prefix: '+',
                suffix: ' more',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderList;
