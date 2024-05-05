'use client';

import Image from 'next/image';
import seabank from '@/assets/images/seabank.png';
import CartLayout from '../layout';
import { useEffect, useState } from 'react';
import { Button, FileUploader } from '@/components/common';
import { FileProps } from '@/components/common/FileUploader';
import { useRouter } from 'next/navigation';

type ConfirmPaymentProps = {
  startCount: boolean;
  payment: string;
  onClose: () => void;
};

const ConfirmPayment = ({
  startCount,
  payment,
  onClose,
}: ConfirmPaymentProps) => {
  const maxTime = new Date(
    new Date().setHours(new Date().getHours() + 1)
  ).getTime();
  const normalize = (time: number) => {
    if (time < 10) return `0${time}`;
    return time;
  };

  const getCurrentStr = (current: number) => {
    const hours = Math.floor(current / (1000 * 3600));
    const minutes = Math.floor(current / (1000 * 60) - hours * 60);
    const seconds = Math.floor(current / 1000 - hours * 3600 - minutes * 60);
    return `${normalize(hours)}:${normalize(minutes)}:${normalize(seconds)}`;
  };

  const [isLoading, setIsloading] = useState(false);
  const [currentStr, setCurrentStr] = useState(
    getCurrentStr(maxTime - new Date().getTime())
  );
  const [uploaded, setUploaded] = useState<FileProps>({
    file: null,
    image: '',
    error: '',
  });

  const handleUpload = () => {
    setIsloading(true);
    setTimeout(() => {
      setIsloading(false);
    }, 1000);
  };

  const { push } = useRouter();
  const handleBack = () => {
    push('/meds');
    setTimeout(() => {
      onClose();
    }, 200);
  };

  const onTimesUp = () => {
    push('/profile/orders');
    setTimeout(() => {
      onClose();
    }, 200);
  };

  useEffect(() => {
    if (startCount) {
      const interval = setInterval(() => {
        const a = currentStr.split(':');
        const current = (+a[0] * 3600 + +a[1] * 60 + +a[2]) * 1000;
        if (current > 0) setCurrentStr(getCurrentStr(current - 1000));
        else onTimesUp();
      }, 1000);

      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStr, startCount]);
  return (
    <div className="min-w-full overflow-y-auto h-full bottom-0 bg-light z-[41] pb-14">
      <CartLayout
        pageTitle="Confirm Your Payment"
        summaryTitle="Payment Proof"
        uploaded={uploaded}
        onUpload={(uploaded) => setUploaded(uploaded)}
        pageIndex={2}
        mainButton={{
          text: 'Upload Payment Proof',
          disabled: !uploaded.file,
          loading: isLoading,
          action: () => handleUpload(),
        }}
        secondaryButton={{
          text: 'Find Other Products',
          action: () => handleBack(),
        }}
      >
        <div className="flex flex-col items-center w-full lg:w-[calc(100%-384px)]">
          <div className="flex flex-col gap-1 items-center my-4 md:my-8">
            <span className="text-xs md:text-lg font-semibold text-dark-gray">
              Remaining Time
            </span>
            <strong className="text-3xl md:text-4xl text-secondary font-semibold font-poppins">
              {currentStr}
            </strong>
          </div>
          <p className="text-xs md:text-lg text-dark-gray">
            Transfer to bank account below and upload your payment proof to have
            your order processed.
          </p>
          <div className="p-5 mt-3 md:mt-5 border border-primary-border bg-light rounded-xl w-full flex items-center gap-5">
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
          <div className="w-full flex justify-between items-center mt-3.5 md:mt-6">
            <span className="font-medium text-sm md:text-lg text-dark-gray">
              Total Payment
            </span>
            <strong className="font-bold text-lg md:text-2xl text-secondary">
              {payment}
            </strong>
          </div>
          <div className="block lg:hidden mt-9 w-full">
            <h5 className="font-semibold text-sm md:text-lg text-dark leading-[150%] mb-1.5">
              Payment Proof
            </h5>
            <FileUploader
              id="payment-proof"
              name="payment-proof"
              uploaded={uploaded}
              instruction="Image format, max 500 KB"
              placeholder={`${uploaded.file ? 'Change' : 'Choose'} File...`}
              accept="image/*"
              maxSize={500}
              onUpload={(file, image, error) =>
                setUploaded({ file, image, error })
              }
            />
          </div>
          <div className="fixed lg:hidden bottom-0 p-4 md:p-6 rounded-t-3xl flex flex-col sm:flex-row w-full gap-2 sm:gap-3 md:gap-4 shadow-[0_-1px_8px_0] shadow-gray/50">
            <Button
              disabled={isLoading}
              onClick={handleBack}
              variant="outlined-primary"
              className="w-full lg:hidden md:h-12"
            >
              Find Other Products
            </Button>
            <Button
              disabled={!uploaded.file}
              loading={isLoading}
              onClick={handleUpload}
              variant="primary"
              className="w-full lg:hidden h-12"
            >
              Upload Payment Proof
            </Button>
          </div>
        </div>
      </CartLayout>
    </div>
  );
};

export default ConfirmPayment;
