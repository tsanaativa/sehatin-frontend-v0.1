'use client';

import { useEffect, useState } from 'react';
import { Icon } from '../..';
import useDebounce from '@/utils/debounce';

type CounterProps = {
  value: number;
  max: number;
  isAvailable: boolean;
  isLoading: boolean;
  counterClass: React.ComponentPropsWithoutRef<'div'>['className'];
  updateValue: (value: number) => void;
};

const Counter = ({
  value,
  max,
  counterClass,
  isAvailable,
  isLoading,
  updateValue,
}: CounterProps) => {
  const buttonClass = (disabled: boolean) =>
    `w-4 h-4 md:w-6 md:h-6 rounded-[3px] font-poppins text-xs md:text-base font-bold ${disabled ? 'bg-gray-lighter text-dark-gray cursor-not-allowed' : 'bg-primary-dark text-white'}`;
  const [count, setCount] = useState(value);
  const debounce = useDebounce(count, 500);

  useEffect(() => {
    if (debounce >= 1) {
      updateValue(debounce);
    } else {
      updateValue(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounce]);
  return (
    <div className={`px-4 md:px-0 ml-[114px] mt-[10px] ${counterClass}`}>
      <div className="flex items-center w-[72px] md:w-28 justify-between mb-2">
        <button
          onClick={() => setCount((c) => (c == 1 ? 1 : count - 1))}
          disabled={count <= 0 || !isAvailable || isLoading}
          className={buttonClass(count <= 0 || !isAvailable)}
        >
          -
        </button>
        <span className="font-semibold text-dark text-xs md:text-base">
          {isLoading ? (
            <Icon
              name="LoaderCircle"
              className="w-4 h-4 stroke-[3] text-primary-darker animate-spin"
            />
          ) : isAvailable ? (
            count
          ) : (
            0
          )}
        </span>
        <button
          onClick={() => setCount(() => count + 1)}
          disabled={count >= max || !isAvailable || isLoading}
          className={buttonClass(count >= max || !isAvailable)}
        >
          +
        </button>
      </div>
      {!isAvailable && (
        <span className="text-xs md:text-base text-danger font-medium">
          Out of stock
        </span>
      )}
    </div>
  );
};

export default Counter;
