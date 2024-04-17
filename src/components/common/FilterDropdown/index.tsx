import { SlidersHorizontal } from 'lucide-react';
import React from 'react';
import { Button } from '..';

const FilterDropdown = () => {
  return (
    <Button
      variant="primary-light"
      className="flex items-center gap-2 p-2 text-xs"
    >
      <SlidersHorizontal size={15} />
      Filter
    </Button>
  );
};

export default FilterDropdown;
