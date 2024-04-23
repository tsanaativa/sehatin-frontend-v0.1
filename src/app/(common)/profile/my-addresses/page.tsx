import { Button } from '@/components/common';
import AddressCard from '@/components/common/AddressCard';
import { DUMMY_ADDRESSES } from '@/constants/dummy';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const MyAddresses = () => {
  return (
    <div>
      <h2 className="text-xl text-center font-semibold font-poppins md:text-2xl md:text-start">
        My Addresses
      </h2>
      <div className="flex flex-col gap-4 mt-5">
        {DUMMY_ADDRESSES.map((addr, idx) => (
          <div key={idx}>
            <Link
              href={`/profile/my-addresses/${addr.id}`}
              className="md:hidden"
            >
              <AddressCard address={addr} key={idx} />
            </Link>
            <div className="hidden md:block">
              <AddressCard address={addr} key={idx} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6 md:justify-end">
        <Button
          variant="outlined-primary"
          className="flex items-center justify-center gap-1 px-6 w-full md:w-fit"
        >
          <Plus size={15} /> Add Address
        </Button>
      </div>
    </div>
  );
};

export default MyAddresses;
