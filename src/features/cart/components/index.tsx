'use client';

import { useEffect, useState } from 'react';
import Cart, { PharmaciesInCartProps } from './Cart';
import Checkout from './Checkout';
import { createOrder, getCart, getShippingCost } from '@/services/cart';
import { toast } from 'react-toastify';
import { NonOfficialMethod, OfficialMethod, OrderRequest } from '@/types/Cart';
import { useRouter } from 'next/navigation';

export type ShippingType =
  | OfficialMethod['name']
  | NonOfficialMethod['name']
  | '';

type CartPageProps = {
  openCart: boolean;
  onCloseCart: () => void;
};

const CartPage = ({ openCart, onCloseCart }: CartPageProps) => {
  const { push } = useRouter();
  const [step, setStep] = useState(0);
  const [cart, setCart] = useState<PharmaciesInCartProps[]>([]);
  const [address, setAddress] = useState<
    { id: number; address: string; is_main: boolean }[]
  >([]);
  const [load, setLoad] = useState({
    checkout: false,
    removeItem: false,
    order: false,
    changeAddress: false,
  });

  const [cost, setCost] = useState<Record<ShippingType, number>[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<
    PharmaciesInCartProps[]
  >([]);

  const handleCloseCart = () => {
    onCloseCart();
    setTimeout(() => {
      setStep(0);
    }, 300);
  };

  const updateCart = async () => {
    try {
      const data = await getCart();
      setCart([...data.pharmacies]);
      setAddress([...data.address]);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const getCost = async (
    selectedProducts: PharmaciesInCartProps[],
    addressId?: number
  ) => {
    try {
      const costs: number[][] = [];
      for (const p of selectedProducts) {
        const weight = p.products
          .map((p) => p.weight)
          .reduce((a, b) => a + b, 0);

        const methods = [
          p.shippingMethods.official,
          p.shippingMethods.nonOfficial,
        ].flat();

        const dataByPharmacy = [];
        for (const m of methods) {
          const data = await getShippingCost(
            m,
            p.id,
            weight,
            addressId as number
          );
          dataByPharmacy.push(data);
        }

        costs.push(dataByPharmacy);
      }

      const result = costs.map((_, idx) => {
        const officials = selectedProducts[idx].shippingMethods.official.map(
          (s) => s.name
        );
        const nonOfficials = selectedProducts[
          idx
        ].shippingMethods.nonOfficial.map((s) => s.name);

        return Object.fromEntries(
          [officials, nonOfficials].flat().map((s, i) => [s, costs[idx][i]])
        );
      }) as Record<ShippingType, number>[];

      setCost([...result]);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleCheckout = async (selectedProducts: PharmaciesInCartProps[]) => {
    setLoad({ ...load, checkout: true });
    await getCost(selectedProducts);
    setSelectedProducts(selectedProducts);
    setStep(1);
    setLoad({ ...load, checkout: false });
  };

  const handleOrder = async (orderData: OrderRequest[]) => {
    setLoad({ ...load, order: true });
    for (const o of orderData) {
      try {
        await createOrder(o);
      } catch (error) {
        toast.error((error as Error).message);
      }
    }
    setLoad({ ...load, order: false });
    push('/profile/my-orders');
    setTimeout(() => {
      handleCloseCart();
    }, 3000);
  };

  const changeAddress = async (addressId: number) => {
    setLoad({ ...load, changeAddress: true });
    await getCost(selectedProducts, addressId);
    setLoad({ ...load, changeAddress: false });
  };

  useEffect(() => {
    if (openCart) updateCart();
  }, [openCart]);
  return (
    <div
      style={{ transform: `translateX(${openCart ? -step * 100 : 100}%)` }}
      className={`fixed bg-light z-[41] flex inset-0 transition-transform duration-300`}
    >
      <Cart
        products={cart}
        checkoutLoad={load.checkout}
        removeLoad={load.removeItem}
        onCheckout={handleCheckout}
        onClose={handleCloseCart}
      />
      <Checkout
        onBack={() => setStep(0)}
        onClose={handleCloseCart}
        onOrder={handleOrder}
        onChangeAddress={changeAddress}
        toOrder={selectedProducts}
        costs={cost}
        address={address}
        loadAddress={load.changeAddress}
        loadOrder={load.order}
      />
    </div>
  );
};

export default CartPage;
