import React from 'react';
import { Badge } from '..';

type OrderStatusProps = {
  status: string;
};

const OrderStatus = ({ status }: OrderStatusProps) => {
  const colorMap = {
    Pending: 'gray',
    Processing: 'warning',
    Shipped: 'blue',
    Completed: 'success',
    Canceled: 'danger',
  };
  return (
    <div>
      <Badge
        variant={
          colorMap[status as keyof typeof colorMap] as
            | 'primary'
            | 'danger'
            | 'warning'
            | 'gray'
            | 'blue'
            | 'success'
            | undefined
        }
      >
        {status}
      </Badge>
    </div>
  );
};

export default OrderStatus;
