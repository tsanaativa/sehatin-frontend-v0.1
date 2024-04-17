import React from 'react';
import { Button } from '..';
import { ChevronDown } from 'lucide-react';

const SortDropdown = () => {
  return (
    <Button
      variant="primary-light"
      className="flex justify-between items-center gap-2 p-2 text-xs"
    >
      Sort by
      <ChevronDown size={15} />
    </Button>
  );
};

export default SortDropdown;
