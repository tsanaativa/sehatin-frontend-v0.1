'use client';
import { Button, Icon, Loading, Modal, OrderCard } from '@/components/common';
import { ProductsProps } from '@/components/common/OrderCard';
import { useEffect, useState } from 'react';
import CartLayout from '../layout';
import { useRouter } from 'next/navigation';
import { decreaseQuantity, increaseQuantity } from '@/services/cart';
import { toast } from 'react-toastify';
import Image from 'next/image';
import EmptyCart from '@/assets/images/empty-cart.png';
import Link from 'next/link';
import { NonOfficialMethod, OfficialMethod } from '@/types/Cart';

export type PharmaciesInCartProps = {
  products: ProductsProps[];
  shippingMethods: {
    official: OfficialMethod[];
    nonOfficial: NonOfficialMethod[];
  };
  name: string;
  id: number;
};

type CartProps = {
  checkoutLoad: boolean;
  removeLoad: boolean;
  products: PharmaciesInCartProps[];
  onCheckout: (products: PharmaciesInCartProps[]) => void;
  onClose: () => void;
};

const Cart = ({
  checkoutLoad,
  removeLoad,
  products,
  onCheckout,
  onClose,
}: CartProps) => {
  const { push } = useRouter();

  const [pharmacies, setPharmacies] = useState<PharmaciesInCartProps[]>([]);
  const [productChecks, setProductChecks] = useState<boolean[][]>([]);
  const [pharmaChecks, setPharmaChecks] = useState<
    (boolean | 'indeterminate')[]
  >([]);
  const [productCounts, setProductCounts] = useState<number[][]>([]);
  const [productLoads, setProductLoads] = useState<boolean[][]>([]);

  const [totalPrice, setTotalPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [productToRemove, setProductToRemove] = useState<ProductsProps[]>([]);

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

  const handleUpdateCount = async (
    pharmaIdx: number,
    productIdx: number,
    value: number
  ) => {
    if (productCounts[pharmaIdx][productIdx] == value) return;
    const itemCounts = productCounts;
    const itemLoad = productLoads;
    if (value == 0) {
      handleModalRemove(pharmaIdx, productIdx);
      return;
    }
    try {
      itemLoad[pharmaIdx][productIdx] = true;
      setProductLoads([...itemLoad]);
      const selectedProduct = pharmacies[pharmaIdx].products[productIdx];
      if (productCounts[pharmaIdx][productIdx] < value) {
        await increaseQuantity(selectedProduct.id);
      }
      if (productCounts[pharmaIdx][productIdx] > value) {
        await decreaseQuantity(selectedProduct.id);
      }
      itemCounts[pharmaIdx][productIdx] = value;
      setProductCounts([...itemCounts]);
      if (productChecks[pharmaIdx][productIdx]) {
        countTotalPrice(productChecks, itemCounts);
      }
    } catch (error: any) {
      toast(error?.message);
    } finally {
      itemLoad[pharmaIdx][productIdx] = false;
      setProductLoads([...itemLoad]);
    }
  };

  const handleModalRemove = (pharmaIdx: number, productIdx: number) => {
    setProductToRemove([pharmacies[pharmaIdx].products[productIdx]]);
    setShowModal(true);
  };

  const handleRemove = (id: number) => {
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
    setPharmacies([...pharmas]);
    setPharmaChecks([...pharmaList]);
    setProductChecks([...itemList]);
    setProductCounts([...itemCounts]);
    countTotalPrice(itemList, itemCounts);
    setShowModal(false);
  };

  const totalItemInCart = () => {
    let total: ProductsProps[] = [];
    pharmacies.forEach((p) => (total = [...total, ...p.products]));
    return total.length;
  };

  const handleCheckout = () => {
    const checkedPharmas = pharmacies.filter((_, idx) =>
      productChecks[idx].some((prod) => prod)
    );

    const checkedProducts = checkedPharmas.map((pharma) => {
      const idx = pharmacies.findIndex((p) => p.id == pharma.id);
      const products = pharma.products.map((prod, i) => {
        return { ...prod, inCart: productCounts[idx][i] };
      });
      const checkeds = products.filter((_, i) => {
        return productChecks[idx][i];
      });
      return { ...pharma, products: checkeds };
    });

    onCheckout(checkedProducts);
  };

  const handleAddProduct = () => {
    push('/meds');
    setTimeout(() => {
      onClose();
    }, 200);
  };

  useEffect(() => {
    setPharmacies([...products]);
    setProductChecks(
      products.map((p) => [...Array(p.products.length)].map(() => false))
    );
    setPharmaChecks(products.map(() => false));
    setProductCounts(products.map((ph) => ph.products.map((p) => p.inCart)));
    setProductLoads(products.map((ph) => ph.products.map(() => false)));
  }, [products]);
  return (
    <div
      className={`min-w-full overflow-y-auto h-[calc(100%-54px)] lg:h-full bottom-0 bg-light z-[41] ${pharmacies.length == 0 ? '' : 'pb-14'}`}
    >
      <CartLayout
        pageTitle="My Cart"
        summaryTitle="Summary"
        summarySubTitle="Total"
        summaryTotal={totalPrice}
        pageIndex={0}
        mainButton={{
          text: 'Checkout',
          disabled: productChecks.flat().every((p) => !p),
          loading: checkoutLoad,
          action: () => handleCheckout(),
        }}
        secondaryButton={{
          text: '+ Tambah Obat Lain',
          action: () => handleAddProduct(),
        }}
        breadcrumb={[{ text: 'Current Page', action: () => onClose() }]}
        navLabel={`${totalItemInCart()}`}
      >
        {pharmacies.length == 0 ? (
          <div className="flex flex-col gap-4 justify-center items-center w-full h-[calc(100vh-150px)] lg:h-[calc(100vh-154px)] lg:w-[calc(100%-384px)]">
            <Image src={EmptyCart} alt="empty-cart" className="h-1/2 w-auto" />
            <b className=" text-dark-gray text-lg">
              Oops... Your cart still empty
            </b>
            <Link href="/meds">
              <Button
                onClick={onClose}
                className="sm:text-base h-11 sm:h-12 !font-semibold px-8"
                variant="primary"
              >
                Add Some Products
              </Button>
            </Link>
          </div>
        ) : (
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
                loadUpdateCount={productLoads[idx]}
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
        )}
      </CartLayout>
      <Modal
        modalClass="[&>*]:rounded-t-2xl sm:[&>*]:rounded-b-2xl sm:[&>*]:max-w-[540px]"
        showModal={showModal}
        onClick={() => removeLoad || setShowModal(false)}
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
                loading={removeLoad}
                className="w-32 sm:w-36 text-sm sm:text-base h-11 sm:h-12 !font-semibold"
                variant="danger"
              >
                {removeLoad ? <Loading name="jump-dots" /> : 'Yes, Remove'}
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
