'use client';

import { LocationIcon } from '@/assets/icons';
import UpdateAddressButton from '@/features/profile/components/UpdateAddressButton';
import { Address } from '@/types/Address';
import { formatAddress } from '@/utils/address';
import { Check, ChevronRight } from 'lucide-react';
import Badge from '../Badge';
import DeleteModalButton from '../DeleteModalButton';

type AddressCardProps = {
  address: Address;
};

const AddressCard = ({ address }: AddressCardProps) => {
  const onDelete = () => {};

  return (
    <div className="text-dark bg-light border border-gray-light rounded-lg pt-2 pb-3 ps-3 pe-2 flex items-center justify-between gap-2">
      <div className="flex items-center">
        <div className="flex gap-5 max-w-full">
          <div className="max-w-1">
            <LocationIcon width={12} />
          </div>
          <div className="flex flex-col gap-2">
            <p className="mt-[0.06rem]">{address && formatAddress(address)}</p>
            {(address.is_active || address.is_main) && (
              <div className="flex gap-2">
                {address.is_active && (
                  <Badge className="min-w-[5.75rem]" variant="success">
                    <div className="-mx-1">
                      <Check size={15} />
                    </div>
                    Selected
                  </Badge>
                )}
                {address.is_main && (
                  <Badge className="min-w-[5.75rem]">Main</Badge>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <span className="md:hidden text-dark-gray">
        <ChevronRight size={20} />
      </span>
      <div className="flex items-center gap-2 hidden md:flex">
        <UpdateAddressButton address={address} />
        <DeleteModalButton isIcon objName="address" onConfirm={onDelete} />
      </div>
    </div>
  );
};

export default AddressCard;
