import { Icon, Button, Loading } from '@/components/common';

type CartLayoutProps = {
  summaryTitle?: string;
  summarySubTitle?: string;
  summarySubTotal?: Record<string, string>;
  mainButton: {
    text: string;
    loading: boolean;
    disabled: boolean;
    action: () => void;
  };
  secondaryButton?: {
    text: string;
    action: () => void;
  };
  navLabel?: string;
  breadcrumb?: { text: string; action: () => void }[];
  pageTitle: string;
  children: React.ReactNode;
  pageIndex: number;
  fileAction?: boolean;
};

const CartLayout = ({
  summaryTitle,
  summarySubTitle,
  summarySubTotal,
  mainButton,
  secondaryButton,
  navLabel,
  breadcrumb,
  pageTitle,
  children,
  pageIndex,
  fileAction,
}: CartLayoutProps) => {
  return (
    <div className="max-w-[1440px] m-auto px-[calc(8px+4vw)] pt-5">
      <div className="hidden lg:flex items-center gap-1.5 font-semibold mb-5">
        {breadcrumb && (
          <>
            {breadcrumb.map((b, idx) => (
              <button
                key={idx}
                onClick={b.action}
                className=" text-dark-gray hover:text-dark transition-colors duration-300"
              >
                {b.text}&ensp;{'>'}
              </button>
            ))}
            <span>{pageTitle}</span>
          </>
        )}
      </div>
      <div className="flex lg:flex-col gap-1 justify-between lg:justify-normal items-center lg:items-start">
        <div className="flex items-center gap-2">
          {breadcrumb && (
            <button
              onClick={breadcrumb[breadcrumb.length - 1].action}
              className="w-8 h-8 grid lg:hidden place-items-center hover:bg-primary/30 transition-colors duration-300 rounded-full"
            >
              <Icon name="ChevronLeft" />
            </button>
          )}
          <h2 className="text-dark text-lg lg:text-3xl lg:mb-2 font-semibold font-poppins">
            {pageTitle}
          </h2>
        </div>
        {navLabel && (
          <span className="font-medium text-[14px] text-dark-gray">
            {navLabel} item
          </span>
        )}
      </div>
      <div className="flex gap-[27px] mt-4 lg:mt-5">
        {children}
        <div
          style={{ left: `${pageIndex * 100}%` }}
          className="absolute lg:sticky w-full lg:w-[357px] flex justify-between items-center lg:block bg-light h-[78px] lg:h-[268px] bottom-0 lg:top-12 z-[42] shadow-[0_-1px_8px_0] shadow-gray/50 lg:shadow-none px-5 lg:p-7 lg:border lg:border-primary-border rounded-t-3xl lg:rounded-lg gap-4"
        >
          <strong className="hidden lg:block text-[20px] font-semibold font-poppins text-darker">
            {summaryTitle}
          </strong>
          {summarySubTotal && (
            <div className="hidden lg:flex flex-col gap-1 pt-4 pb-2">
              {Object.keys(summarySubTotal).map((s) => (
                <div
                  key={s}
                  className="flex justify-between items-center text-dark-gray text-[14px]"
                >
                  <span>{s}</span>
                  <span>{summarySubTotal[s]}</span>
                </div>
              ))}
            </div>
          )}
          {summarySubTitle && (
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center lg:mt-[18px] lg:mb-6">
              <span className="text-gray-cart lg:text-dark-gray font-medium text-sm lg:text-base">
                {summarySubTitle}
              </span>
              <strong
                id={`total-price-${pageIndex}`}
                className="text-secondary font-bold lg:font-semibold text-lg lg:text-base whitespace-nowrap"
              >
                Rp 0
              </strong>
            </div>
          )}
          <div className="flex flex-col gap-[14px]">
            <Button
              disabled={mainButton.disabled}
              loading={mainButton.loading}
              onClick={mainButton.action}
              variant="primary"
              className="h-11 lg:h-12 px-6 lg:px-0 w-full sm:w-44 md:w-48 lg:w-full font-poppins font-semibold rounded-xl text-sm md:text-base"
            >
              {mainButton.text}
            </Button>
            {secondaryButton && (
              <Button
                onClick={secondaryButton.action}
                variant="outlined-primary"
                className="hidden lg:block h-12 w-full font-poppins font-semibold rounded-xl"
              >
                {secondaryButton.text}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartLayout;
