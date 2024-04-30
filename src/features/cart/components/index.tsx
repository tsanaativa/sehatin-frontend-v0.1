'use client';

import { useState } from 'react';
import Cart from './Cart';
import Checkout from './Checkout';

const CartPage = () => {
  const [isCheckout, setIsCheckout] = useState(false);
  return (
    <div
      className={`fixed h-[calc(100%-74px)] top-[74px] bottom-0 bg-light z-[41] flex w-full ${isCheckout ? '-translate-x-full' : '-translate-x-0'}`}
    >
      <Cart onCheckout={() => setIsCheckout(true)} />
      <Checkout />
    </div>
  );
};

export default CartPage;
