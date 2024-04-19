import { SlidersHorizontal } from 'lucide-react';
import React from 'react';
import { Button } from '..';

const FilterDropdown = () => {
  return (
    <Button
      variant="primary-light"
      className="flex items-center gap-2 p-2 md:px-3 text-xs md:text-sm"
    >
      <div className="md:hidden">
        <SlidersHorizontal size={15} />
      </div>
      <div className="hidden md:block">
        <SlidersHorizontal size={18} />
      </div>
      Filter
    </Button>
  );
};

export default FilterDropdown;
