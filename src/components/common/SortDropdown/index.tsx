'use client';

import React, { useState } from 'react';
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
        className="flex justify-between items-center gap-2 p-2 text-xs"
        onClick={show}
      >
        Sort by
        <ChevronDown size={15} />
      </Button>
      <div
        className={`px-3 py-1 mt-1 min-w-20 absolute right-0 bg-light border border-gray-light rounded ${!showDropdown ? 'hidden' : ''}`}
        ref={ref}
      >
        <div className="flex flex-col text-dark-gray">
          <label
            htmlFor="distance"
            className="text-xs flex gap-2 flex items-center"
          >
            <span
              className={`${sortBy === 'distance' ? 'visible' : 'invisible'}`}
            >
              <CheckIcon width={12} />
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
            className="text-xs flex gap-2 flex items-center"
          >
            <span className={`${sortBy === 'price' ? 'visible' : 'invisible'}`}>
              <CheckIcon width={12} />
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
