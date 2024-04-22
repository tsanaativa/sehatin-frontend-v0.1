import { LocationIcon } from '@/assets/icons';
import { Address } from '@/types/Address';
import { formatAddress } from '@/utils/address';
import { ChevronDown, Edit2, Trash2 } from 'lucide-react';
import React from 'react';
import Badge from '../Badge';

type AddressCardProps = {
  address: Address;
};

const AddressCard = ({ address }: AddressCardProps) => {
  return (
    <div className="text-dark bg-light border border-gray-light rounded-lg pt-2 pb-3 ps-3 pe-2 flex items-center justify-between gap-2">
      <div className="flex items-center">
        <div className="flex gap-5 max-w-full">
          <div className="max-w-1">
            <LocationIcon width={12} />
          </div>
          <div className="flex flex-col gap-2">
            <p className="max-h-10 mt-[0.06rem]">
              {address && formatAddress(address)}
            </p>
            {(address.is_active || address.is_main) && (
              <div className="flex gap-2">
                {address.is_active && (
                  <Badge className="min-w-[5rem]" variant="success">
                    Selected
                  </Badge>
                )}
                {address.is_main && (
                  <Badge className=" min-w-[5rem]">Main</Badge>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <span className="md:hidden">
        <ChevronDown size={20} />
      </span>
      <div className="flex items-center gap-2">
        <button className="flex items-center text-blue">
          <Edit2 size={20} />
        </button>
        <button className="flex items-center text-danger">
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default AddressCard;
