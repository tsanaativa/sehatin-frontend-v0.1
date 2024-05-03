'use client';

import { useOutsideClick } from '@/hooks/useOutsideClick';
import { CheckIcon, ChevronDown } from 'lucide-react';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Button } from '..';

type SortDropdownProps = {
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<string>>;
  options?: string[];
};

const SortDropdown = ({
  sortBy,
  setSortBy,
  options = [],
}: SortDropdownProps) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

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
        {options && (
          <div className="flex flex-col text-dark-gray">
            {options.map((option, idx) => (
              <label
                key={idx}
                htmlFor={option}
                className="px-2 md:px-3 py-1 md:py-2 hover:bg-gray-lighter text-xs gap-2 flex items-center cursor-pointer capitalize md:text-sm"
              >
                <span
                  className={`${sortBy === option ? 'visible' : 'invisible'}`}
                >
                  <div className="md:hidden">
                    <CheckIcon size={12} />
                  </div>
                  <div className="hidden md:block">
                    <CheckIcon size={15} />
                  </div>
                </span>
                <input
                  id={option}
                  type="radio"
                  name="sortby"
                  defaultChecked={sortBy === option}
                  className="hidden"
                  onChange={handleChange}
                />
                {option}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SortDropdown;
