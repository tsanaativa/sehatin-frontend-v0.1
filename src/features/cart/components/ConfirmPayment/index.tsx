import Image from 'next/image';
import seabank from '@/assets/images/seabank.png';
import { Button } from '@/components/common';
import CartLayout from '../layout';

const ConfirmPayment = () => {
  return (
    <div className="min-w-full overflow-y-auto h-[calc(100%-54px)] lg:h-full bottom-0 bg-light z-[41] pb-14">
      <CartLayout
        pageTitle="Confirm Your Payment"
        summaryTitle="Payment Proof"
        pageIndex={1}
        mainButton={{
          text: 'Upload Payment Proof',
          disabled: false,
          loading: false,
          action: () => {},
        }}
        secondaryButton={{
          text: 'Back To Home',
          action: () => {},
        }}
      >
        <div>
          <div>
            <span>Remaining Time</span>
            <strong>50:00</strong>
          </div>
          <p>
            Transfer to bank account below and upload your payment proof to have
            your order processed.
          </p>
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
          <div>
            <span>Total Payment</span>
            <strong>Rp 25.990</strong>
          </div>
        </div>
      </CartLayout>
    </div>
  );
};

export default ConfirmPayment;
