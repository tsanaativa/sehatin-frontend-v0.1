import Image from 'next/image';
import Badge from '../Badge';
import { Store } from 'lucide-react';
import Link from 'next/link';
import { Icon } from '..';
import Counter from './Counter';

export type ProductsProps = {
  id: number;
  picture: string;
  name: string;
  slug: string;
  price: number;
  label: string;
  inCart: number;
  stock: number;
  is_available: boolean;
  weight: number;
};

export type BadgeProps =
  | 'Canceled'
  | 'Pending'
  | 'Processing'
  | 'Shipped'
  | 'Delivered'
  | 'Completed';

type OrderCardProps = {
  id?: string;
  name?: string;
  badge?: BadgeProps;
  pharmacyName?: string;
  products: ProductsProps[];
  productChecks?: boolean[];
  redirectTo?: string;
  withSubTotal?: boolean;
  productCount?: number[];
  loadUpdateCount?: boolean[];
  children?: React.ReactNode;
  childrenKey?: {
    prefix?: string;
    customKey?: string | number;
    key: keyof ProductsProps;
    suffix?: string;
  };
  isChecked?: boolean | 'indeterminate';
  onCheck?: () => void;
  productAction?: {
    onCheck: (idx: number) => void;
    updateCount: (idx: number, value: number) => void;
    onRemove: (idx: number) => void;
  };
};

const OrderCard = ({
  id,
  name,
  badge,
  pharmacyName,
  products,
  productChecks,
  redirectTo = '',
  loadUpdateCount,
  withSubTotal = false,
  productCount,
  children,
  childrenKey,
  isChecked = false,
  onCheck,
  productAction,
}: OrderCardProps) => {
  return (
    <div className="border border-primary-border rounded-lg cursor-pointer">
      <Link
        className={
          redirectTo == ''
            ? 'select-none cursor-default'
            : 'select-auto cursor-pointer'
        }
        href={redirectTo}
        scroll={false}
      >
        {pharmacyName && (
          <div className="flex items-center justify-between border-b border-primary-border px-4 py-2 md:py-4">
            <div className="flex items-center">
              {productChecks && (
                <label
                  htmlFor={id}
                  aria-label={name}
                  className={`relative grid place-items-center w-4 h-4 rounded-[3px] mr-3 md:mr-[18px] border ${[true, 'indeterminate'].includes(isChecked) ? 'bg-primary-dark border-primary-dark' : 'bg-gray-lighter border-gray'}`}
                >
                  <Icon
                    name={isChecked == 'indeterminate' ? 'Minus' : 'Check'}
                    className="w-2 h-2 stroke-[6] text-gray-light"
                  />
                  <input
                    type="checkbox"
                    name={name}
                    id={id}
                    checked={isChecked == true}
                    onClick={onCheck}
                    onChange={() => {}}
                    disabled={products.every((p) => !p.is_available)}
                    className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  />
                </label>
              )}
              <span className="flex items-center gap-x-2 font-medium text-xs leading-[19px] text-dark md:text-[17px]">
                <Store className="w-4 h-4 md:w-[18px] md:h-[18px] text-dark" />{' '}
                <span className="translate-y-px">{pharmacyName}</span>
              </span>
            </div>
            {badge && <Badge>{badge}</Badge>}
          </div>
        )}
        {products.map((p, idx) => (
          <div
            key={p.slug}
            className={`py-2 md:py-4 border-primary-border ${idx < products.length - 1 ? 'border-b' : ''}`}
          >
            <div className="flex items-center gap-x-4 px-4">
              <div className="flex items-center">
                {productChecks && (
                  <label
                    htmlFor={p.slug}
                    aria-label={id}
                    className={`relative grid place-items-center w-4 h-4 rounded-[3px] mr-3 md:mr-[18px] border ${productChecks[idx] ? 'bg-primary-dark border-primary-dark' : 'bg-gray-lighter border-gray'}`}
                  >
                    <Icon
                      name="Check"
                      className="w-2 h-2 stroke-[6] text-gray-light"
                    />
                    <input
                      type="checkbox"
                      name={id}
                      id={p.slug}
                      checked={productChecks[idx]}
                      disabled={!p.is_available}
                      onClick={() => productAction?.onCheck(idx)}
                      onChange={() => {}}
                      className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                    />
                  </label>
                )}
                <div className="w-[70px] h-[64px] overflow-hidden">
                  <Image
                    src={p.picture}
                    className="w-full h-full object-contain"
                    width={600}
                    height={300}
                    alt={p.name}
                  />
                </div>
              </div>
              <div className="w-full overflow-hidden">
                <div className="md:relative flex justify-between md:items-end">
                  <div className="flex flex-col gap-1 md:gap-0.5 w-[calc(100%-34px)] md:w-[calc(100%-8px)]">
                    <strong className="font-poppins font-medium text-xs leading-4 text-dark md:text-base whitespace-nowrap overflow-hidden text-ellipsis">
                      {p.name}
                    </strong>
                    <span className="font-medium text-[10px] text-dark-gray md:text-[14px]">
                      {p.label}
                    </span>
                  </div>
                  <div className="flex h-fit items-center gap-4 md:translate-y-7 md:absolute right-0 bottom-0 text-dark font-semibold text-sm md:text-base">
                    {childrenKey ? (
                      <span>
                        {childrenKey.prefix}
                        {childrenKey.customKey
                          ? childrenKey.customKey
                          : p[childrenKey.key]}
                        {childrenKey.suffix}
                      </span>
                    ) : (
                      <button
                        className={`${productAction ? '' : 'select-none pointer-events-none'}`}
                        aria-label="children-action"
                        onClick={() => productAction?.onRemove(idx)}
                      >
                        {children}
                      </button>
                    )}
                    {productCount && loadUpdateCount && (
                      <Counter
                        updateValue={(value) =>
                          productAction?.updateCount(idx, value)
                        }
                        value={productCount[idx]}
                        max={p.stock}
                        isAvailable={p.is_available}
                        isLoading={loadUpdateCount[idx]}
                        counterClass="hidden md:block md:ml-0"
                      />
                    )}
                  </div>
                </div>
                <div className="mt-0 md:mt-1">
                  <div>
                    {badge && (
                      <span className="font-medium text-xs text-dark md:text-base">
                        Total Payment:
                      </span>
                    )}
                    <span className="font-semibold text-xs text-secondary md:text-base">
                      {p.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {productCount && loadUpdateCount && (
              <Counter
                updateValue={(value) => productAction?.updateCount(idx, value)}
                value={productCount[idx]}
                max={p.stock}
                isLoading={loadUpdateCount[idx]}
                isAvailable={p.is_available}
                counterClass="md:hidden"
              />
            )}
          </div>
        ))}
      </Link>
    </div>
  );
};

export default OrderCard;
