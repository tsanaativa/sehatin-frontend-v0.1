'use client';

import { useState } from 'react';
import Cart, { PharmaciesInCartProps } from './Cart';
import Checkout from './Checkout';
import ConfirmPayment from './ConfirmPayment';

type CartPageProps = {
  openCart: boolean;
  onCloseCart: () => void;
};

const CartPage = ({ openCart, onCloseCart }: CartPageProps) => {
  const [step, setStep] = useState(0);
  const [cart, setCart] = useState<PharmaciesInCartProps[]>([]);
  const [payment, setPayment] = useState('');
  const [startCount, setStartCount] = useState(false);
  const handleCloseCart = () => {
    onCloseCart();
    setTimeout(() => {
      setStep(0);
      setStartCount(false);
    }, 300);
  };
  return (
    <div
      style={{ transform: `translateX(${openCart ? -step * 100 : 100}%)` }}
      className={`fixed h-[calc(100%-74px)] top-[ bottom-0 bg-light z-[41] flex w-full transition-transform duration-300`}
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
          setStartCount(true);
        }}
        toOrder={cart}
      />
      <ConfirmPayment
        startCount={startCount}
        payment={payment}
        onClose={handleCloseCart}
      />
    </div>
  );
};

export default CartPage;
