import React from 'react';
import { ChevronDown } from 'lucide-react';
import { LocationIcon } from '@/assets/icons';

const AddressCard = () => {
  return (
    <div className="text-primary-dark bg-primary-light border border-primary-border rounded-lg py-3 px-3 flex items-center justify-between cursor-pointer gap-2">
      <div className="flex gap-2">
        <LocationIcon />
        <span> 2640 Cabin Creek Rd #102 Alexandria, Virginia(VA), 22314</span>
      </div>
      <span>
        <ChevronDown />
      </span>
    </div>
  );
};

export default AddressCard;
