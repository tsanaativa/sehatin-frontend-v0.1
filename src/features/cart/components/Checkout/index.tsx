'use client';
import { Button, Icon, OrderCard } from '@/components/common';
import { ProductsProps } from '@/components/common/OrderCard';
import { overflowHandler } from '@/utils/helper';
import React, { useEffect, useState } from 'react';

type PharmaciesProps = {
  products: ProductsProps[];
  name: string;
  slug: string;
};

const Checkout = () => {
  const pharmacies: PharmaciesProps[] = [];

  const [productChecks, setProductChecks] = useState(
    pharmacies.map((p) => [...Array(p.products.length)].map(() => false))
  );

  const [pharmaChecks, setPharmaChecks] = useState<
    (boolean | 'indeterminate')[]
  >(pharmacies.map(() => false));

  const [productCount, setProductCount] = useState(
    pharmacies.map((p) => [...Array(p.products.length)].map(() => 0))
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
  };

  const handleUpdateCount = (
    pharmaIdx: number,
    productIdx: number,
    value: number
  ) => {
    const counts = productCount;
    counts[pharmaIdx][productIdx] = value;
    setProductCount(counts);
  };

  const handleRemove = (pharmaIdx: number, productIdx: number) => {};

  const totalItemInCart = () => {
    let total: ProductsProps[] = [];
    pharmacies.forEach((p) => (total = [...total, ...p.products]));
    return total.length;
  };

  useEffect(() => {
    overflowHandler('hidden');
  });
  return (
    <div className="min-w-full overflow-y-auto h-[calc(100%-54px)] lg:h-full bottom-[54px] lg:bottom-0 bg-light z-[41] pb-14">
      <div className="max-w-[1440px] m-auto px-[calc(8px+3vw)] pt-5">
        <h2 className="text-dark text-lg lg:text-2xl font-semibold font-poppins">
          My Cart
        </h2>
        <span className="hidden lg:block font-medium text-[14px] text-dark-gray mt-1">
          {totalItemInCart()} item
        </span>
        <div className="flex gap-[27px] mt-5">
          <div className="flex flex-col gap-5 w-full lg:w-[calc(100%-377px)] lg:overflow-hidden">
            {pharmacies.map((p, idx) => (
              <OrderCard
                key={idx}
                isChecked={pharmaChecks[idx]}
                productChecks={productChecks[idx]}
                products={p.products}
                pharmacyName={p.name}
                name="cart"
                id={p.slug}
                productCount={productCount[idx]}
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
          <div className="hidden lg:block min-w-[357px] h-[268px] sticky top-12 p-7 border border-primary-border rounded-lg">
            <strong className="text-[20px] font-semibold font-poppins text-darker">
              Ringkasan
            </strong>
            <div className="flex justify-between items-center mt-[18px] mb-6">
              <span className="text-dark-gray font-medium">Total</span>
              <span className="text-secondary font-semibold">Rp 1.000.000</span>
            </div>
            <div className="flex flex-col gap-[14px]">
              <Button
                variant="primary"
                className="h-12 w-full font-poppins font-semibold rounded-xl"
              >
                Checkout
              </Button>
              <Button
                variant="outlined-primary"
                className="h-12 w-full font-poppins font-semibold rounded-xl"
              >
                + Tambah Obat Lain
              </Button>
            </div>
          </div>
        </div>
        {/* <div className="bg-light w-full fixed bottom-0 left-0 h-[78px] z-[42] shadow-[0_-1px_8px_0] shadow-gray/50 flex lg:hidden justify-between items-center px-5 gap-4 rounded-3xl">
          <div className="flex flex-col">
            <span className="text-gray-cart font-medium text-sm">Total</span>
            <strong className="text-secondary font-bold text-lg whitespace-nowrap">
              Rp 1.000.000
            </strong>
          </div>
          <Button
            variant="primary"
            className="h-11 px-6 sm:w-40 font-poppins font-semibold text-sm rounded-xl"
          >
            Checkout
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default Checkout;
