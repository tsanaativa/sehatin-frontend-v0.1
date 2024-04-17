import React from 'react';
import { ChevronDown } from 'lucide-react';
import { LocationIcon } from '@/assets/icons';

const AddressCard = () => {
  return (
    <div className="text-primary-dark bg-primary-light border border-primary-border rounded-lg px-4 py-3 flex items-center justify-between cursor-pointer">
      <div className="flex gap-3">
        <LocationIcon />
        2640 Cabin Creek Rd #102 Alexandria, Virginia(VA), 22314
      </div>
      <span>
        <ChevronDown />
      </span>
    </div>
  );
};

export default AddressCard;
