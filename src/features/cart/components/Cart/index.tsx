'use client';
import { Button, Icon, OrderCard } from '@/components/common';
import { ProductsProps } from '@/components/common/OrderCard';
import { currency, overflowHandler } from '@/utils/helper';
import React, { useEffect, useRef, useState } from 'react';

type PharmaciesProps = {
  products: ProductsProps[];
  name: string;
  slug: string;
};

type CheckoutedPharmaciesProps = Omit<PharmaciesProps, 'products'> & {
  products: (ProductsProps & { count: number })[];
  name: string;
  slug: string;
};

type CartProps = {
  onCheckout: (products: CheckoutedPharmaciesProps[]) => void;
};

const Cart = ({ onCheckout }: CartProps) => {
  const pharmacies: PharmaciesProps[] = [
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
          label: 'per BOTOL',
          is_available: true,
        },
        {
          id: 2,
          picture:
            'https://images.unsplash.com/photo-1598046937895-2be846402c0d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          name: 'Panadol Obat Pusing Pusing Pusing Pusing',
          slug: 'panadol-obat-pusingg-2',
          price: 15990,
          stock: 5,
          inCart: 2,
          label: 'per BOTOL',
          is_available: true,
        },
        {
          id: 3,
          picture:
            'https://images.unsplash.com/photo-1598046937895-2be846402c0d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          name: 'Panadol Obat Pusing',
          slug: 'panadol-obat-pusingg-3',
          price: 15990,
          stock: 5,
          inCart: 2,
          label: 'per BOTOL',
          is_available: true,
        },
        {
          id: 4,
          picture:
            'https://images.unsplash.com/photo-1598046937895-2be846402c0d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          name: 'Panadol Obat Pusing',
          slug: 'panadol-obat-pusingg-4',
          price: 15990,
          stock: 5,
          inCart: 2,
          label: 'per BOTOL',
          is_available: true,
        },
      ],
      name: 'K-24 Mampang Prapatan',
      slug: 'k-24-mampang-prapatan-1',
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
          label: 'per BOTOL',
          is_available: true,
        },
        {
          id: 12,
          picture:
            'https://images.unsplash.com/photo-1598046937895-2be846402c0d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          name: 'Panadol Obat Pusing',
          slug: 'panadol-obat-pusingg-12',
          price: 15990,
          stock: 5,
          inCart: 2,
          label: 'per BOTOL',
          is_available: true,
        },
      ],
      name: 'Century Mampang Prapatan',
      slug: 'century-mampang-prapatan-1',
    },
  ];

  const [productChecks, setProductChecks] = useState(
    pharmacies.map((p) => [...Array(p.products.length)].map(() => false))
  );

  const [pharmaChecks, setPharmaChecks] = useState<
    (boolean | 'indeterminate')[]
  >(pharmacies.map(() => false));

  const [productCounts, setProductCounts] = useState(
    pharmacies.map((ph) => ph.products.map((p) => p.inCart))
  );

  const handlePharmaCheck = (idx: number) => {
    const checks = pharmaChecks;
    if (checks[idx] == false || checks[idx] == 'indeterminate') {
      checks[idx] = true;
    } else {
      checks[idx] = false;
    }
    setPharmaChecks(checks);

    const prodChecks = productChecks;
    prodChecks[idx].forEach(
      (_, i) => (prodChecks[idx][i] = checks[idx] as boolean)
    );
    setProductChecks(prodChecks);
    countTotalPrice(prodChecks);
  };

  const handleProductCheck = (pharmaIdx: number, productIdx: number) => {
    const checks = productChecks;
    checks[pharmaIdx][productIdx] = !checks[pharmaIdx][productIdx];
    setProductChecks(checks);

    const pharChecks = pharmaChecks;
    if (checks[pharmaIdx].every((c) => c)) pharChecks[pharmaIdx] = true;
    else if (checks[pharmaIdx].some((c) => c))
      pharChecks[pharmaIdx] = 'indeterminate';
    else pharChecks[pharmaIdx] = false;

    countTotalPrice(checks);
  };

  const countTotalPrice = (checkedProducts: boolean[][]) => {
    const checkeds = productCounts.map((pc, idx) => {
      const count = pharmacies[idx].products.map((p, i) => p.price * pc[i]);
      return count.filter((_, i) => checkedProducts[idx][i]);
    });
    const totalPrice = document.getElementById('total-price');
    totalPrice!.textContent = `${checkeds.flat().reduce((a, b) => a + b, 0)}`;
  };

  const handleUpdateCount = (
    pharmaIdx: number,
    productIdx: number,
    value: number
  ) => {
    const counts = productCounts;
    counts[pharmaIdx][productIdx] = value;
    setProductCounts(counts);
  };

  const handleRemove = (pharmaIdx: number, productIdx: number) => {};

  const totalItemInCart = () => {
    let total: ProductsProps[] = [];
    pharmacies.forEach((p) => (total = [...total, ...p.products]));
    return total.length;
  };

  const handleCheckout = () => {
    const checkedPharmas = pharmacies.filter((_, idx) =>
      productChecks[idx].some((prod) => prod)
    );

    const checkedProducts = checkedPharmas.map((pharma, idx) => {
      const products = pharma.products.map((prod, i) => {
        return { ...prod, count: productCounts[idx][i] };
      });
      const checkeds = products.filter((_, i) => {
        return productChecks[idx][i];
      });
      return { ...pharma, products: checkeds };
    });

    onCheckout(checkedProducts);
  };

  useEffect(() => {
    overflowHandler('hidden');
  });
  return (
    <div className="min-w-full relative overflow-y-auto h-[calc(100%-54px)] lg:h-full bottom-0 bg-light z-[41] pb-14">
      <div className="max-w-[1440px] m-auto px-[calc(8px+3vw)] pt-5">
        <div className="flex lg:flex-col gap-1 justify-between lg:justify-normal items-center lg:items-start">
          <h2 className="text-dark text-lg lg:text-2xl font-semibold font-poppins">
            My Cart
          </h2>
          <span className="font-medium text-[14px] text-dark-gray">
            {totalItemInCart()} item
          </span>
        </div>
        <div className="flex gap-[27px] mt-5">
          <div className="flex flex-col gap-5 w-full lg:w-[calc(100%-377px)] lg:overflow-hidden">
            {pharmacies.map((p, idx) => (
              <OrderCard
                key={idx}
                isChecked={pharmaChecks[idx]}
                productChecks={productChecks[idx]}
                products={p.products}
                pharmacyName={p.name}
                name={p.slug}
                id={p.slug}
                productCount={productCounts[idx]}
                onCheck={() => handlePharmaCheck(idx)}
                productAction={{
                  onCheck: (productIdx) => handleProductCheck(idx, productIdx),
                  updateCount: (productIdx, value) =>
                    handleUpdateCount(idx, productIdx, value),
                  onRemove: (productIdx) => handleRemove(idx, productIdx),
                }}
              >
                <Icon
                  name="Trash"
                  className="w-[18px] h-[18px] lg:w-5 lg:h-5 stroke-gray"
                />
              </OrderCard>
            ))}
          </div>
          <div className="fixed lg:sticky w-full lg:w-[357px] flex justify-between items-center lg:block bg-light h-[78px] lg:h-[268px] bottom-0 left-0 lg:top-12 z-[42] shadow-[0_-1px_8px_0] shadow-gray/50 lg:shadow-none px-5 lg:p-7 lg:border lg:border-primary-border rounded-t-3xl lg:rounded-lg gap-4">
            <strong className="hidden lg:block text-[20px] font-semibold font-poppins text-darker">
              Ringkasan
            </strong>
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center lg:mt-[18px] lg:mb-6">
              <span className="text-gray-cart lg:text-dark-gray font-medium text-sm lg:text-base">
                Total
              </span>
              <strong
                id="total-price"
                className="text-secondary font-bold lg:font-semibold text-lg lg:text-base whitespace-nowrap"
              >
                Rp 0
              </strong>
            </div>
            <div className="flex flex-col gap-[14px]">
              <Button
                onClick={handleCheckout}
                variant="primary"
                className="h-11 lg:h-12 px-6 lg:px-0 w-full sm:w-40 lg:w-full font-poppins font-semibold rounded-xl text-sm lg:text-base"
              >
                Checkout
              </Button>
              <Button
                variant="outlined-primary"
                className="hidden lg:block h-12 w-full font-poppins font-semibold rounded-xl"
              >
                + Tambah Obat Lain
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
