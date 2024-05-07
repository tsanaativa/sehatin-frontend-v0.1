'use client';
import CartPage from '@/features/cart/components';
import { useState } from 'react';
import { overflowHandler } from '@/utils/helper';
import Header from './Header';
import { User } from '@/types/User';

const Navbar = ({ user }: { user?: User }) => {
  const [openCart, setOpenCart] = useState(false);
  return (
    <>
      <Header
        user={user}
        onCart={() => {
          setOpenCart(true);
          overflowHandler({ type: 'hidden', hideHeader: true });
        }}
      />
      <CartPage
        openCart={openCart}
        onCloseCart={() => {
          setOpenCart(false);
          overflowHandler({ type: 'auto', hideHeader: true });
        }}
      />
    </>
  );
};

export default Navbar;
