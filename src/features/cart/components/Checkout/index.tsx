'use client';
import { Icon, Loading, Modal, OrderCard, RadioBox } from '@/components/common';
import { useEffect, useState } from 'react';
import CartLayout from '../layout';
import { PharmaciesInCartProps } from '../Cart';
import { currency } from '@/utils/helper';
import { TikiIcon, JNEIcon } from '@/assets/icons';
import Image from 'next/image';
import seabank from '@/assets/images/seabank.png';
import { ShippingType } from '..';
import { OrderRequest } from '@/types/Cart';

type CheckoutProps = {
  costs: Record<ShippingType, number>[];
  toOrder: PharmaciesInCartProps[];
  address: { id: number; address: string; is_main: boolean }[];
  loadAddress: boolean;
  loadOrder: boolean;
  onClose: () => void;
  onBack: () => void;
  onChangeAddress: (addressId: number) => void;
  onOrder: (orderData: OrderRequest[]) => void;
};

const Checkout = ({
  onBack,
  onClose,
  onOrder,
  onChangeAddress,
  costs,
  address,
  toOrder = [],
  loadAddress,
  loadOrder,
}: CheckoutProps) => {
  const [currentAddress, setCurrentAddress] = useState(0);

  const productSubTotal = () => {
    const order = toOrder.map((t) => t.products.map((p) => p.price * p.inCart));
    return order.flat().reduce((a, b) => a + b, 0);
  };

  const [showModal, setShowModal] = useState(false);

  const [shipment, setShipment] = useState<ShippingType[]>([]);

  const currencyMode = (idx: number, method: ShippingType) => {
    const rp = currency(costs[idx][method]).replace('Rp ', '').split('.');
    return {
      pre: rp[0],
      suf: rp.slice(1, rp.length).join('.'),
    };
  };

  const totalShipment = () => {
    const selectedMethod = shipment.map((s, i) => (s == '' ? 0 : costs[i][s]));
    return selectedMethod.reduce((a, b) => a + b, 0);
  };

  const summarySubTotal: Record<string, string> = {
    'Product Subtotal': currency(productSubTotal()),
    'Shipping Subtotal': currency(totalShipment()),
  };

  const locationCircle = () => {
    const circle = document.querySelector('.lucide-map-pin > circle');
    circle?.setAttribute('r', '4.5');
  };

  const createOrder = () => {
    const param = toOrder.map((o, idx): OrderRequest => {
      return {
        cart_item_id: o.products.map((p) => p.id),
        user_address_id: currentAddress,
        total_price: o.products
          .map((p) => p.price * p.inCart)
          .reduce((a, b) => a + b, 0),
        shipping_fee: costs[idx][shipment[idx]],
        shipping_method: shipment[idx],
      };
    });
    onOrder(param);
  };

  const updateShippingMethod = (idx: number, method: ShippingType) => {
    const methods = shipment;
    methods[idx] = method;
    setShipment([...methods]);
  };

  const changeAddress = (addressId: number) => {
    onChangeAddress(addressId);
    setCurrentAddress(addressId);
    setShowModal(false);
  };

  useEffect(() => {
    locationCircle();
  });

  useEffect(() => {
    if (currentAddress == 0 && address.length > 0) {
      setCurrentAddress(address.find((a) => a.is_main)!.id);
    }
  }, [address, currentAddress]);

  useEffect(() => {
    if (shipment.length == 0 && toOrder.length > 0) {
      setShipment(
        toOrder.map(
          (o) =>
            [
              o.shippingMethods.official.map((s) => s.name),
              o.shippingMethods.nonOfficial.map((s) => s.name),
            ].flat()[0]
        )
      );
    }
  }, [shipment, toOrder]);
  return (
    <div className="min-w-full overflow-y-auto h-[calc(100%-54px)] lg:h-full bottom-0 bg-light z-[41] pb-14">
      <CartLayout
        pageTitle="Checkout"
        summaryTitle="Payment Detail"
        summarySubTitle="Total Payment"
        summaryTotal={productSubTotal() + totalShipment()}
        summarySubTotal={summarySubTotal}
        pageIndex={1}
        mainButton={{
          text: 'Create Order',
          disabled: address.length == 0,
          loading: loadOrder,
          action: () => createOrder(),
        }}
        navLabel={`${toOrder.map((t) => t.products).flat().length}`}
        breadcrumb={[
          { text: 'Current Page', action: () => onClose() },
          { text: 'My Cart', action: () => onBack() },
        ]}
      >
        <div className="[&_h5]:text-dark [&_h5]:font-semibold [&_h5]:text-xs md:[&_h5]:text-xl [&_h5]:mb-1.5 md:[&_h5]:mb-3 w-full lg:w-[calc(100%-384px)] flex flex-col gap-5">
          <div className="bg-primary-light border border-primary-border rounded-xl px-3.5 flex flex-col text-primary-dark">
            <div className="flex items-center justify-between border-b border-b-primary-border">
              <span className="py-3 text-xs sm:text-base">
                Shipping Address
              </span>
              <button
                disabled={loadAddress}
                onClick={() => setShowModal(true)}
                className="bg-primary/20 h-7 px-3 rounded-md text-primary-darker hover:bg-primary/25 active:bg-primary/15 transition-colors duration-300 text-sm sm:text-base"
              >
                {loadAddress ? (
                  <Loading
                    name="jump-dots"
                    className="[&_span]:w-1.5 [&_span]:h-1.5 [&_span]:bg-primary-dark"
                  />
                ) : (
                  'Change'
                )}
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
          <div className="flex flex-col gap-10">
            {toOrder.map((p, idx) => (
              <div key={idx} className="flex flex-col gap-5 lg:overflow-hidden">
                <OrderCard
                  products={p.products}
                  pharmacyName={p.name}
                  name="pharmacy"
                  id={p.id.toString()}
                  childrenKey={{ prefix: 'x', key: 'inCart' }}
                />
                <div>
                  <h5>Shipping Method for Products from {p.name}</h5>
                  <div className="mt-2 md:mt-0 grid [grid-template-columns:repeat(auto-fit,_minmax(132px,_1fr))] md:[grid-template-columns:repeat(auto-fit,_minmax(180px,_1fr))] gap-3 [&>label]:h-32 md:[&>label]:h-40 [&_section]:flex [&_section]:flex-col [&_section]:justify-center [&_section]:items-center [&_section]:gap-2">
                    {p.shippingMethods.official.find(
                      (s) => s.name == 'instant'
                    ) && (
                      <RadioBox
                        id={`instant-${p.id}`}
                        name={`shipment-${p.id}`}
                        isActive={shipment[idx] === 'instant'}
                        onChange={() => updateShippingMethod(idx, 'instant')}
                        disabled={address.length == 0}
                      >
                        <section>
                          <Icon
                            name="Zap"
                            className="w-9 h-9 md:w-14 md:h-14"
                          />
                          <span className="text-xs md:text-base">
                            Instant -{' '}
                            <span className="font-bold font-poppins">
                              2 Hour
                            </span>
                          </span>
                          <strong className="text-xs md:text-base font-semibold">
                            Rp{' '}
                            <span className="text-lg md:text-2xl">
                              {currencyMode(idx, 'instant').pre}
                            </span>
                            .{currencyMode(idx, 'instant').suf}
                          </strong>
                        </section>
                      </RadioBox>
                    )}
                    {p.shippingMethods.official.find(
                      (s) => s.name == 'sameday'
                    ) && (
                      <RadioBox
                        id={`sameday-${p.id}`}
                        name={`shipment-${p.id}`}
                        isActive={shipment[idx] === 'sameday'}
                        onChange={() => updateShippingMethod(idx, 'sameday')}
                        disabled={address.length == 0}
                      >
                        <section>
                          <Icon
                            name="Bike"
                            className="w-9 h-9 md:w-14 md:h-14"
                          />
                          <span className="text-xs md:text-base">
                            SameDay -{' '}
                            <span className="font-bold font-poppins">
                              1 Day
                            </span>
                          </span>
                          <strong className="text-xs md:text-base font-semibold">
                            Rp{' '}
                            <span className="text-lg md:text-2xl">
                              {currencyMode(idx, 'sameday').pre}
                            </span>
                            .{currencyMode(idx, 'sameday').suf}
                          </strong>
                        </section>
                      </RadioBox>
                    )}
                    {p.shippingMethods.nonOfficial.find(
                      (s) => s.name == 'jne'
                    ) && (
                      <RadioBox
                        id={`jne-${p.id}`}
                        name={`shipment-${p.id}`}
                        isActive={shipment[idx] === 'jne'}
                        onChange={() => updateShippingMethod(idx, 'jne')}
                        disabled={address.length == 0}
                      >
                        <section>
                          <div className="h-16 md:h-[88px] grid place-items-center">
                            <JNEIcon />
                          </div>
                          <strong className="text-xs md:text-base font-semibold">
                            Rp{' '}
                            <span className="text-lg md:text-2xl">
                              {currencyMode(idx, 'jne').pre}
                            </span>
                            .{currencyMode(idx, 'jne').suf}
                          </strong>
                        </section>
                      </RadioBox>
                    )}
                    {p.shippingMethods.nonOfficial.find(
                      (s) => s.name == 'tiki'
                    ) && (
                      <RadioBox
                        id={`tiki-${p.id}`}
                        name={`shipment-${p.id}`}
                        isActive={shipment[idx] === 'tiki'}
                        onChange={() => updateShippingMethod(idx, 'tiki')}
                        disabled={address.length == 0}
                      >
                        <section>
                          <div className="h-16 md:h-[88px] grid place-items-center">
                            <TikiIcon />
                          </div>
                          <strong className="text-xs md:text-base font-semibold">
                            Rp{' '}
                            <span className="text-lg md:text-2xl">
                              {currencyMode(idx, 'tiki').pre}
                            </span>
                            .{currencyMode(idx, 'tiki').suf}
                          </strong>
                        </section>
                      </RadioBox>
                    )}
                  </div>
                </div>
              </div>
            ))}
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
                {currency(productSubTotal() + totalShipment())}
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
                  onChange={() => changeAddress(a.id)}
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
