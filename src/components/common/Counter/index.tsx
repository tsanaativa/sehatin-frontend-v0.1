'use client';
import { useState } from 'react';

const Counter = ({ className }: { className?: string }) => {
  const [count, setCount] = useState<number>(1);
  const disabled = count === 1;

  return (
    <div className={`flex items-center font-semibold text-base ${className}`}>
      <button
        className="bg-gray-lighter text-dark-gray px-2 rounded-sm font-poppins disabled:bg-gray-lighter/30 disabled:text-dark-gray/30"
        onClick={() => setCount((prev) => prev - 1)}
        disabled={disabled}
      >
        -
      </button>
      <span className="w-12 flex justify-center">{count}</span>
      <button
        className="bg-primary-dark text-light hover:bg-primary-dark/80 px-2 rounded-sm font-poppins"
        onClick={() => setCount((prev) => prev + 1)}
      >
        +
      </button>
    </div>
  );
};

export default Counter;
