'use client';

import { useState } from 'react';
import { Button } from '..';
import { CheckIcon, ChevronDown } from 'lucide-react';
import { useOutsideClick } from '@/hooks/useOutsideClick';

const SortDropdown = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('distance');

  function show() {
    setShowDropdown(true);
  }

  const ref = useOutsideClick(() => {
    setShowDropdown(false);
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      setSortBy(e.target.id);
    }
  }

  return (
    <div className="relative">
      <Button
        variant="primary-light"
        className="flex justify-between items-center gap-2 p-2 md:px-3 text-xs md:text-sm"
        onClick={show}
      >
        Sort by
        <div className="md:hidden">
          <ChevronDown size={15} />
        </div>
        <div className="hidden md:block">
          <ChevronDown size={20} />
        </div>
      </Button>
      <div
        className={`mt-1 min-w-20 absolute right-0 bg-light border border-gray-light rounded ${!showDropdown ? 'hidden' : ''}`}
        ref={ref}
      >
        <div className="flex flex-col text-dark-gray">
          <label
            htmlFor="distance"
            className="px-2 md:px-3 py-1 md:py-2 hover:bg-gray-lighter text-xs md:text-sm gap-2 flex items-center cursor-pointer"
          >
            <span
              className={`${sortBy === 'distance' ? 'visible' : 'invisible'}`}
            >
              <div className="md:hidden">
                <CheckIcon size={12} />
              </div>
              <div className="hidden md:block">
                <CheckIcon size={15} />
              </div>
            </span>
            <input
              id="distance"
              type="radio"
              name="sortby"
              defaultChecked={true}
              className="hidden"
              onChange={handleChange}
            />
            Distance
          </label>
          <label
            htmlFor="price"
            className="px-2 md:px-3 py-1 md:py-2 hover:bg-gray-lighter text-xs md:text-sm gap-2 flex items-center cursor-pointer"
          >
            <span className={`${sortBy === 'price' ? 'visible' : 'invisible'}`}>
              <div className="md:hidden">
                <CheckIcon size={12} />
              </div>
              <div className="hidden md:block">
                <CheckIcon size={15} />
              </div>
            </span>
            <input
              id="price"
              type="radio"
              name="sortby"
              className="hidden"
              onChange={handleChange}
            />
            Price
          </label>
        </div>
      </div>
    </div>
  );
};

export default SortDropdown;
