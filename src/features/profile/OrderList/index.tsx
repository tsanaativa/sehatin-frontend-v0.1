import { OrderCard } from '@/components/common';

const OrderList = () => {
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
        <OrderCard />
      </div>
      <div className="hidden w-full mt-4 peer-has-[.completed:checked]:block">
        <OrderCard />
      </div>
    </div>
  );
};

export default OrderList;
