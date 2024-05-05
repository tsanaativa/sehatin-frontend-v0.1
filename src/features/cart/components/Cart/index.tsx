'use client';
import { Button, Icon, Loading, Modal, OrderCard } from '@/components/common';
import { ProductsProps } from '@/components/common/OrderCard';
import { useState } from 'react';
import CartLayout from '../layout';
import { useRouter } from 'next/navigation';

export type PharmaciesInCartProps = {
  products: ProductsProps[];
  name: string;
  id: number;
};

type CartProps = {
  onCheckout: (products: PharmaciesInCartProps[]) => void;
  onClose: () => void;
};

const Cart = ({ onCheckout, onClose }: CartProps) => {
  const { push } = useRouter();
  const [pharmacies, setPharmacies] = useState<PharmaciesInCartProps[]>([
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
      id: 1,
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
      id: 2,
    },
  ]);

  const [productChecks, setProductChecks] = useState(
    pharmacies.map((p) => [...Array(p.products.length)].map(() => false))
  );

  const [pharmaChecks, setPharmaChecks] = useState<
    (boolean | 'indeterminate')[]
  >(pharmacies.map(() => false));

  const [productCounts, setProductCounts] = useState(
    pharmacies.map((ph) => ph.products.map((p) => p.inCart))
  );

  const [totalPrice, setTotalPrice] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [productToRemove, setProductToRemove] = useState<ProductsProps[]>([]);
  const [isLoading, setIsLoading] = useState({
    removeItem: false,
    checkout: false,
  });

  const handlePharmaCheck = (idx: number) => {
    const checks = pharmaChecks;
    checks[idx] = checks[idx] == false || checks[idx] == 'indeterminate';
    setPharmaChecks([...checks]);

    const prodChecks = productChecks;
    prodChecks[idx] = prodChecks[idx].map(() => checks[idx] as boolean);
    countTotalPrice(prodChecks, productCounts);
  };

  const handleProductCheck = (pharmaIdx: number, productIdx: number) => {
    const checks = productChecks;
    checks[pharmaIdx][productIdx] = !checks[pharmaIdx][productIdx];
    setProductChecks([...checks]);

    const pharChecks = pharmaChecks;
    if (checks[pharmaIdx].every((c) => c)) pharChecks[pharmaIdx] = true;
    else if (checks[pharmaIdx].some((c) => c))
      pharChecks[pharmaIdx] = 'indeterminate';
    else pharChecks[pharmaIdx] = false;
    countTotalPrice(checks, productCounts);
  };

  const countTotalPrice = (
    checkedProducts: boolean[][],
    itemCounts: number[][]
  ) => {
    const checkeds = itemCounts.map((pc, idx) => {
      const count = pharmacies[idx].products.map((p, i) => p.price * pc[i]);
      return count.filter((_, i) => checkedProducts[idx][i]);
    });
    setTotalPrice(checkeds.flat().reduce((a, b) => a + b, 0));
  };

  const handleUpdateCount = (
    pharmaIdx: number,
    productIdx: number,
    value: number
  ) => {
    const itemCounts = productCounts;
    if (value == 0) {
      handleModalRemove(pharmaIdx, productIdx);
      return;
    }
    itemCounts[pharmaIdx][productIdx] = value;
    setProductCounts([...itemCounts]);
    if (productChecks[pharmaIdx][productIdx]) {
      countTotalPrice(productChecks, itemCounts);
    }
  };

  const handleModalRemove = (pharmaIdx: number, productIdx: number) => {
    setProductToRemove([pharmacies[pharmaIdx].products[productIdx]]);
    setShowModal(true);
  };

  const handleRemove = (id: number) => {
    setIsLoading({ ...isLoading, removeItem: true });
    let pharmas = pharmacies.map((ph) => {
      const products = ph.products.filter((p) => p.id !== id);
      return { ...ph, products };
    });

    const pharmaIdx = pharmas.findIndex(
      (ph, i) => ph.products.length < pharmacies[i].products.length
    );
    const productIdx = pharmacies[pharmaIdx].products.findIndex(
      (p) => p.id == id
    );

    let itemList = productChecks.map((pc, idx) =>
      idx == pharmaIdx ? pc.filter((_, i) => i != productIdx) : pc
    );
    let pharmaList = pharmaChecks.map((ph, idx) =>
      idx == pharmaIdx
        ? itemList[pharmaIdx].every((pc) => pc) ||
          itemList[pharmaIdx].some((pc) => pc)
          ? 'indeterminate'
          : false
        : ph
    );
    let itemCounts = productCounts.map((pc, idx) =>
      idx == pharmaIdx ? pc.filter((_, i) => i != productIdx) : pc
    );

    const emptyProductIndex = pharmas.findIndex(
      (ph) => ph.products.length == 0
    );
    if (emptyProductIndex >= 0) {
      pharmaList = pharmaChecks.filter((_, i) => i !== emptyProductIndex);
      itemList = productChecks.filter((_, i) => i !== emptyProductIndex);
      itemCounts = productCounts.filter((_, i) => i !== emptyProductIndex);
    }

    pharmas = pharmas.filter((ph) => ph.products.length > 0);
    setTimeout(() => {
      setIsLoading({ ...isLoading, removeItem: false });
      setPharmacies([...pharmas]);
      setPharmaChecks([...pharmaList]);
      setProductChecks([...itemList]);
      setProductCounts([...itemCounts]);
      countTotalPrice(itemList, itemCounts);
      setShowModal(false);
    }, 2000);
  };

  const totalItemInCart = () => {
    let total: ProductsProps[] = [];
    pharmacies.forEach((p) => (total = [...total, ...p.products]));
    return total.length;
  };

  const handleCheckout = () => {
    setIsLoading({ ...isLoading, checkout: true });
    const checkedPharmas = pharmacies.filter((_, idx) =>
      productChecks[idx].some((prod) => prod)
    );

    const checkedProducts = checkedPharmas.map((pharma, idx) => {
      const products = pharma.products.map((prod, i) => {
        return { ...prod, inCart: productCounts[idx][i] };
      });
      const checkeds = products.filter((_, i) => {
        return productChecks[idx][i];
      });
      return { ...pharma, products: checkeds };
    });

    setTimeout(() => {
      setIsLoading({ ...isLoading, checkout: false });
      onCheckout(checkedProducts);
    }, 2000);
  };

  const handleAddProduct = () => {
    push('/meds');
    setTimeout(() => {
      onClose();
    }, 200);
  };
  return (
    <div className="min-w-full overflow-y-auto h-[calc(100%-54px)] lg:h-full bottom-0 bg-light z-[41] pb-14">
      <CartLayout
        pageTitle="My Cart"
        summaryTitle="Summary"
        summarySubTitle="Total"
        summaryTotal={totalPrice}
        pageIndex={0}
        mainButton={{
          text: 'Checkout',
          disabled: productChecks.flat().every((p) => !p),
          loading: isLoading['checkout'],
          action: () => handleCheckout(),
        }}
        secondaryButton={{
          text: '+ Tambah Obat Lain',
          action: () => handleAddProduct(),
        }}
        breadcrumb={[{ text: 'Current Page', action: () => onClose() }]}
        navLabel={`${totalItemInCart()}`}
      >
        <div className="flex flex-col gap-5 w-full lg:w-[calc(100%-384px)] lg:overflow-hidden">
          {pharmacies.map((p, idx) => (
            <OrderCard
              key={idx}
              isChecked={pharmaChecks[idx]}
              productChecks={productChecks[idx]}
              products={p.products}
              pharmacyName={p.name}
              name="pharmacy"
              id={p.id.toString()}
              productCount={productCounts[idx]}
              onCheck={() => handlePharmaCheck(idx)}
              productAction={{
                onCheck: (productIdx) => handleProductCheck(idx, productIdx),
                updateCount: (productIdx, value) =>
                  handleUpdateCount(idx, productIdx, value),
                onRemove: (productIdx) => handleModalRemove(idx, productIdx),
              }}
            >
              <Icon
                name="Trash"
                className="w-[18px] h-[18px] lg:w-5 lg:h-5 stroke-gray"
              />
            </OrderCard>
          ))}
        </div>
      </CartLayout>
      <Modal
        modalClass="[&>*]:rounded-t-2xl sm:[&>*]:rounded-b-2xl sm:[&>*]:max-w-[540px]"
        showModal={showModal}
        onClick={() => isLoading['removeItem'] || setShowModal(false)}
      >
        <div className="p-8 sm:p-6 flex flex-col items-center sm:items-start gap-4 [&>*]:w-full">
          <p className="text-primary-text sm:text-lg text-center sm:text-left">
            By clicking <b>{'"Yes, Remove"'}</b>, the product bellow will be
            removed from the cart.
          </p>
          <OrderCard products={productToRemove} />
          <div className="flex flex-col items-center sm:items-end gap-3 sm:gap-4">
            <strong className="text-secondary text-lg sm:text-xl text-center sm:text-left">
              Are you sure to continue ?
            </strong>
            <div className="flex gap-3">
              <Button
                onClick={() => handleRemove(productToRemove[0].id)}
                loading={isLoading['removeItem']}
                className="w-32 sm:w-36 text-sm sm:text-base h-11 sm:h-12 !font-semibold"
                variant="danger"
              >
                {isLoading['removeItem'] ? (
                  <Loading name="jump-dots" />
                ) : (
                  'Yes, Remove'
                )}
              </Button>
              <Button
                onClick={() => setShowModal(false)}
                className="w-32 sm:w-36 text-sm sm:text-base h-11 sm:h-12 !font-semibold"
                variant="primary"
              >
                No, Keep It
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Cart;
