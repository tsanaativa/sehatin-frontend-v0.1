'use client';

import { SlidersHorizontal } from 'lucide-react';
import { Button } from '..';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useState } from 'react';
import Selector from '../Selector';

type FilterDropdownProps = {
  selected: string;
  options: Record<string, string>;
  onFilter: (selected: string) => void;
  onReset?: () => void;
};

const FilterDropdown = ({
  options,
  selected,
  onFilter,
  onReset,
}: FilterDropdownProps) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  function show() {
    setShowDropdown(true);
  }

  const ref = useOutsideClick(() => {
    setShowDropdown(false);
  });

  function reset() {
    setShowDropdown(false);
    if (onReset) {
      onReset();
    }
  }

  return (
    <div className="relative">
      <Button
        variant="primary-light"
        className="w-full flex items-center gap-2 p-2 md:px-3 text-sm"
        onClick={show}
      >
        <div className="md:hidden">
          <SlidersHorizontal size={15} />
        </div>
        <div className="hidden md:block">
          <SlidersHorizontal size={18} />
        </div>
        Filter
      </Button>
      <div
        className={`mt-1 min-w-[280px] absolute z-10 right-0 bg-light border border-gray-light rounded ${!showDropdown ? 'hidden' : ''}`}
        ref={ref}
      >
        <div className="w-full flex items-center">
          <Selector
            id="filter"
            options={options}
            selected={selected}
            name="filter"
            searchable
            onSelect={onFilter}
            placeholder="Choose filter..."
          />
          <span
            className="text-sm text-dark-gray hover:underline mx-2"
            role="button"
            onClick={reset}
          >
            Reset
          </span>
        </div>
      </div>
    </div>
  );
};

export default FilterDropdown;
