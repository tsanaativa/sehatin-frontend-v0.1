'use client';

import { useOutsideClick } from '@/hooks/useOutsideClick';
import { CheckIcon, ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '..';

type SortDropdownProps = {
  sortBy: string;
  sort: string;
  onSort?: (sortBy: string, sort: string) => void;
  options?: string[];
};

const SortDropdown = ({
  sortBy,
  sort,
  onSort = () => {},
  options = [],
}: SortDropdownProps) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  function show() {
    setShowDropdown(true);
  }

  const ref = useOutsideClick(() => {
    setShowDropdown(false);
  });

  const handleChange = (e: React.MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      onSort(target.id, sort);
    } else {
      onSort(target.id, '');
    }
  };

  return (
    <div className="relative">
      <Button
        variant="primary-light"
        className="flex justify-between items-center gap-2 p-2 md:px-3 text-sm"
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
        className={`mt-1 min-w-20 absolute z-10 right-0 bg-light border border-gray-light rounded ${!showDropdown ? 'hidden' : ''}`}
        ref={ref}
      >
        {options && (
          <div className="flex flex-col text-dark-gray">
            {options.map((option, idx) => (
              <label
                key={idx}
                htmlFor={option}
                className="px-2 md:px-3 py-2 hover:bg-gray-lighter gap-2 flex items-center cursor-pointer capitalize text-sm"
              >
                <span
                  className={`${sortBy === option ? 'visible' : 'invisible'}`}
                >
                  <CheckIcon size={15} />
                </span>
                <input
                  id={option}
                  type="radio"
                  name="sortby"
                  defaultChecked={sortBy === option}
                  className="hidden"
                  onClick={handleChange}
                />
                {option}
              </label>
            ))}
          </div>
        )}
        <div className="px-3 py-2 border-t border-gray-light text-sm">
          <div
            className="flex gap-5 items-center [&>label]:flex [&>label]:cursor-pointer [&>label]:items-center [&>label]:gap-1.5 [&_input]:hidden
              [&_mark]:grid [&_mark]:place-items-center [&_mark]:w-4 [&_mark]:h-4 [&_mark]:rounded-full [&_mark]:border-[1px] [&_mark]:border-gray
              [&_mark]:bg-transparent after:[&_mark]:content-[''] after:[&_mark]:h-2.5 after:[&_mark]:w-2.5 after:[&_mark]:rounded-full
              after:[&_mark]:bg-primary-dark after:[&_mark]:hidden [&_span]:leading-[150%] [&_span]:tracking-[0.5px]"
          >
            <label htmlFor="asc">
              <input
                type="radio"
                name="sort"
                id="asc"
                className="peer"
                checked={sort === 'asc'}
                onChange={() => onSort(sortBy, 'asc')}
              />
              <mark className="peer-checked:after:block peer-checked:border-primary-dark"></mark>
              <span>ASC</span>
            </label>
            <label htmlFor="desc">
              <input
                type="radio"
                name="sort"
                id="desc"
                className="peer"
                checked={sort === 'desc'}
                onChange={() => onSort(sortBy, 'desc')}
              />
              <mark className="peer-checked:after:block peer-checked:border-primary-dark"></mark>
              <span>DESC</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortDropdown;
