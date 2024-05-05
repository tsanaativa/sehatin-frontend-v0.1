'use client';
import CartPage from '@/features/cart/components';
import { useState } from 'react';
import { overflowHandler } from '@/utils/helper';
import Header from './Header';

const Navbar = () => {
  const [openCart, setOpenCart] = useState(false);
  return (
    <>
      <Header
        onCart={() => {
          overflowHandler('hidden');
          setOpenCart(true);
        }}
      />
      <CartPage
        openCart={openCart}
        onCloseCart={() => {
          setOpenCart(false);
          overflowHandler('auto');
        }}
      />
    </>
  );
};

export default Navbar;
