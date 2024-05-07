'use client';
import { Icon, Modal, OrderCard, RadioBox } from '@/components/common';
import { useEffect, useState } from 'react';
import CartLayout from '../layout';
import { PharmaciesInCartProps } from '../Cart';
import { currency } from '@/utils/helper';
import { TikiIcon, JNEIcon } from '@/assets/icons';
import Image from 'next/image';
import seabank from '@/assets/images/seabank.png';
import { DUMMY_ADDRESSES } from '@/constants/dummy';

type CheckoutProps = {
  toOrder: PharmaciesInCartProps[];
  onClose: () => void;
  onBack: () => void;
  onOrder: (totalPayment: string) => void;
};

const Checkout = ({
  onBack,
  onClose,
  onOrder,
  toOrder = [],
}: CheckoutProps) => {
  const [isLoading, setIsLoading] = useState({
    order: false,
  });

  const address = DUMMY_ADDRESSES.map((a) => ({
    id: a.id,
    address: a.address,
  }));

  const [currentAddress, setCurrentAddress] = useState(address[0]['id']);

  const productSubTotal = () => {
    const order = toOrder.map((t) => t.products.map((p) => p.price * p.inCart));
    return order.flat().reduce((a, b) => a + b, 0);
  };

  const [showModal, setShowModal] = useState(false);

  const [shipment, setShipment] = useState<
    '' | 'instant' | 'sameday' | 'jne' | 'tiki'
  >(address.length > 0 ? 'instant' : '');

  const shipmentPrice: Record<
    '' | 'instant' | 'sameday' | 'jne' | 'tiki',
    number
  > = {
    instant: 40000,
    sameday: 28000,
    jne: 20000,
    tiki: 16000,
    '': 0,
  };

  const summarySubTotal: Record<string, string> = {
    'Product Subtotal': currency(productSubTotal()),
    'Shipping Subtotal': currency(shipmentPrice[shipment]),
  };

  const locationCircle = () => {
    const circle = document.querySelector('.lucide-map-pin > circle');
    circle?.setAttribute('r', '4.5');
  };

  const createOrder = () => {
    setIsLoading({ ...isLoading, order: true });
    setTimeout(() => {
      setIsLoading({ ...isLoading, order: false });
      onOrder(currency(productSubTotal() + shipmentPrice[shipment]));
    }, 2000);
  };

  useEffect(() => {
    locationCircle();
  });
  return (
    <div className="min-w-full overflow-y-auto h-[calc(100%-54px)] lg:h-full bottom-0 bg-light z-[41] pb-14">
      <CartLayout
        pageTitle="Checkout"
        summaryTitle="Payment Detail"
        summarySubTitle="Total Payment"
        summaryTotal={productSubTotal() + shipmentPrice[shipment]}
        summarySubTotal={summarySubTotal}
        pageIndex={1}
        mainButton={{
          text: 'Create Order',
          disabled: address.length == 0,
          loading: isLoading['order'],
          action: () => createOrder(),
        }}
        navLabel={`${toOrder.map((t) => t.products).flat().length}`}
        breadcrumb={[
          { text: 'Current Page', action: () => onClose() },
          { text: 'My Cart', action: () => onBack() },
        ]}
      >
        <div className="[&>*>h5]:text-dark [&>*>h5]:font-semibold [&>*>h5]:text-xs md:[&>*>h5]:text-xl [&>*>h5]:mb-1.5 md:[&>*>h5]:mb-3 w-full lg:w-[calc(100%-384px)] flex flex-col gap-5">
          <div className="bg-primary-light border border-primary-border rounded-xl px-3.5 flex flex-col text-primary-dark">
            <div className="flex items-center justify-between border-b border-b-primary-border">
              <span className="py-3 text-xs sm:text-base">
                Shipping Address
              </span>
              <button
                onClick={() => setShowModal(true)}
                className="bg-primary/20 h-7 px-3 rounded-md text-primary-darker hover:bg-primary/25 active:bg-primary/15 transition-colors duration-300 text-sm sm:text-base"
              >
                Change
              </button>
            </div>
            <div className="py-3 flex items-center gap-2 sm:gap-4">
              <Icon
                name="MapPin"
                className="min-w-6 h-6 fill-primary-dark [&>circle]:fill-primary-light"
              />
              <span className="text-xs sm:text-lg">
                {address.find((a) => a.id == currentAddress)?.address}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-5 lg:overflow-hidden">
            {toOrder.map((p, idx) => (
              <OrderCard
                key={idx}
                products={p.products}
                pharmacyName={p.name}
                name="pharmacy"
                id={p.id.toString()}
                childrenKey={{ prefix: 'x', key: 'inCart' }}
              />
            ))}
          </div>
          <div>
            <h5>Shipping Method</h5>
            <div className="mt-2 md:mt-0 grid [grid-template-columns:repeat(auto-fit,_minmax(132px,_1fr))] md:[grid-template-columns:repeat(auto-fit,_minmax(180px,_1fr))] gap-3 [&>label]:h-32 md:[&>label]:h-40 [&_section]:flex [&_section]:flex-col [&_section]:justify-center [&_section]:items-center [&_section]:gap-2">
              <RadioBox
                id="instant"
                name="shipment"
                isActive={shipment === 'instant'}
                onChange={() => setShipment('instant')}
                disabled={address.length == 0}
              >
                <section>
                  <Icon name="Zap" className="w-9 h-9 md:w-14 md:h-14" />
                  <span className="text-xs md:text-base">
                    Instant -{' '}
                    <span className="font-bold font-poppins">2 Jam</span>
                  </span>
                  <strong className="text-xs md:text-base font-semibold">
                    Rp <span className="text-lg md:text-2xl">40</span>.000
                  </strong>
                </section>
              </RadioBox>
              <RadioBox
                id="sameday"
                name="shipment"
                isActive={shipment === 'sameday'}
                onChange={() => setShipment('sameday')}
                disabled={address.length == 0}
              >
                <section>
                  <Icon name="Bike" className="w-9 h-9 md:w-14 md:h-14" />
                  <span className="text-xs md:text-base">
                    SameDay -{' '}
                    <span className="font-bold font-poppins">1 Hari</span>
                  </span>
                  <strong className="text-xs md:text-base font-semibold">
                    Rp <span className="text-lg md:text-2xl">28</span>.000
                  </strong>
                </section>
              </RadioBox>
              <RadioBox
                id="jne"
                name="shipment"
                isActive={shipment === 'jne'}
                onChange={() => setShipment('jne')}
                disabled={address.length == 0}
              >
                <section>
                  <div className="h-16 md:h-[88px] grid place-items-center">
                    <JNEIcon />
                  </div>
                  <strong className="text-xs md:text-base font-semibold">
                    Rp <span className="text-lg md:text-2xl">20</span>.000
                  </strong>
                </section>
              </RadioBox>
              <RadioBox
                id="tiki"
                name="shipment"
                isActive={shipment === 'tiki'}
                onChange={() => setShipment('tiki')}
                disabled={address.length == 0}
              >
                <section>
                  <div className="h-16 md:h-[88px] grid place-items-center">
                    <TikiIcon />
                  </div>
                  <strong className="text-xs md:text-base font-semibold">
                    Rp <span className="text-lg md:text-2xl">16</span>.000
                  </strong>
                </section>
              </RadioBox>
            </div>
          </div>
          <div>
            <h5>Payment Method</h5>
            <div className="p-5 border border-primary-border bg-light rounded-xl w-full flex items-center gap-5">
              <div className="min-w-fit">
                <Image src={seabank} alt="seabank" width={29} height={38} />
              </div>
              <div className="flex flex-col gap-1">
                <b className="text-dark font-semibold md:font-medium text-xs md:text-lg">
                  Transfer to Seabank
                </b>
                <span className="text-dark-gray font-semibold text-xs md:text-lg">
                  13246515736182 a/n Moana
                </span>
              </div>
            </div>
          </div>
          <div className="block lg:hidden">
            <h5>Payment Details</h5>
            <div className="flex flex-col gap-1.5 mt-1 mb-3">
              {Object.keys(summarySubTotal).map((s) => (
                <div
                  key={s}
                  className="flex justify-between items-center text-dark-gray text-xs md:text-sm"
                >
                  <span>{s}</span>
                  <span>{summarySubTotal[s]}</span>
                </div>
              ))}
            </div>
            <hr className="border-none bg-gray-lighter h-0.5 w-full" />
            <div className="flex justify-between items-center mt-2.5">
              <span className="text-dark font-semibold text-xs md:text-sm">
                Total Payment
              </span>
              <span className="text-secondary font-bold md:text-lg">
                {productSubTotal() + shipmentPrice[shipment]}
              </span>
            </div>
          </div>
        </div>
      </CartLayout>
      <Modal
        modalClass="[&>*]:rounded-t-2xl sm:[&>*]:rounded-b-2xl sm:[&>*]:max-w-[540px] left-[100%]"
        showModal={showModal}
        onClick={() => setShowModal(false)}
      >
        <div className="p-8 sm:p-6 flex flex-col items-center sm:items-start gap-4 [&>*]:w-full max-h-[50vh] overflow-y-auto">
          <b className="text-dark text-lg">Choose Address</b>
          <div className="flex flex-col">
            {address.map((a) => (
              <label
                key={a.id}
                htmlFor={
                  a.address.toLowerCase().replaceAll(' ', '-') + `-${a.id}`
                }
                className="relative has-[input:checked]:bg-primary/20 has-[input:checked]:text-primary-darker py-4 border-b transition-colors duration-300 text-primary-text border-primary-border hover:bg-primary/20 px-3 rounded-lg"
              >
                <div className="flex gap-2 items-center">
                  <Icon name="MapPin" />
                  <span>{a.address}</span>
                  {currentAddress == a.id && <Icon name="Check" />}
                </div>
                <input
                  type="radio"
                  name="address"
                  checked={currentAddress == a.id}
                  id={a.address.toLowerCase().replaceAll(' ', '-') + `-${a.id}`}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={() => {
                    setCurrentAddress(a.id);
                    setShowModal(false);
                  }}
                />
              </label>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Checkout;
