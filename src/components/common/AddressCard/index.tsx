'use client';

import { LocationIcon } from '@/assets/icons';
import { Address } from '@/types/Address';
import { formatAddress } from '@/utils/formatter';
import { ChevronRight, Edit2 } from 'lucide-react';
import Badge from '../Badge';
import DeleteModalButton from '../DeleteModalButton';

type AddressCardProps = {
  address: Address;
  onDelete: () => void;
};

const AddressCard = ({ address, onDelete }: AddressCardProps) => {
  return (
    <div className="text-dark bg-light border border-gray-light rounded-lg pt-2 pb-3 ps-3 pe-2 flex items-center justify-between gap-2">
      <div className="flex items-center">
        <div className="flex gap-5 max-w-full">
          <div className="max-w-1">
            <LocationIcon width={12} />
          </div>
          <div className="flex flex-col gap-2">
            <p className="mt-[0.06rem]">{address && formatAddress(address)}</p>
            {address.is_main && (
              <div className="flex gap-2">
                {address.is_main && (
                  <Badge className="min-w-[5.75rem]">Main</Badge>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="items-center flex gap-2">
        <a href={`/profile/my-addresses/${address.id}`}>
          <button type="button" className="flex items-center text-blue">
            <Edit2 size={20} />
          </button>
        </a>
        <DeleteModalButton isIcon objName="address" onConfirm={onDelete} />
      </div>
    </div>
  );
};

export default AddressCard;
