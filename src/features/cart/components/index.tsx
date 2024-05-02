'use client';

import { useState } from 'react';
import Cart, { PharmaciesProps } from './Cart';
import Checkout from './Checkout';
import ConfirmPayment from './ConfirmPayment';

type CartPageProps = {
  openCart: boolean;
  onCloseCart: () => void;
};

const CartPage = ({ openCart, onCloseCart }: CartPageProps) => {
  const [step, setStep] = useState(0);
  const [cart, setCart] = useState<PharmaciesProps[]>([]);
  const [payment, setPayment] = useState('Rp 0');
  const handleCloseCart = () => {
    onCloseCart();
    setTimeout(() => {
      setStep(0);
    }, 300);
  };
  return (
    <div
      style={{ transform: `translateX(${openCart ? -step * 100 : 100}%)` }}
      className={`fixed h-[calc(100%-74px)] top-[74px] bottom-0 bg-light z-[41] flex w-full transition duration-300 lg:duration-0`}
    >
      <Cart
        onCheckout={(cart) => {
          setCart(cart);
          setStep(1);
        }}
        onClose={handleCloseCart}
      />
      <Checkout
        onBack={() => setStep(0)}
        onClose={handleCloseCart}
        onOrder={(payment) => {
          setPayment(payment);
          setStep(2);
        }}
        toOrder={cart}
      />
      <ConfirmPayment />
    </div>
  );
};

export default CartPage;
