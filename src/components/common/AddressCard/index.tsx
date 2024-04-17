import React from 'react';
import { ChevronDown } from 'lucide-react';

const AddressCard = () => {
  return (
    <div className="text-primary-dark bg-primary-light border border-primary-border rounded-lg px-4 py-3 flex items-center justify-between cursor-pointer">
      2640 Cabin Creek Rd #102 Alexandria, Virginia(VA), 22314
      <ChevronDown />
    </div>
  );
};

export default AddressCard;
