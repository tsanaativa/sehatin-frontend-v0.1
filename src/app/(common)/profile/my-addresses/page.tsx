import { Button } from '@/components/common';
import AddressCard from '@/components/common/AddressCard';
import { DUMMY_ADDRESSES } from '@/constants/dummy';
import React from 'react';

const MyAddresses = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold font-poppins">My Addresses</h2>
      <div className="flex flex-col gap-4 mt-5">
        {DUMMY_ADDRESSES.map((addr, idx) => {
          return <AddressCard address={addr} key={idx} />;
        })}
      </div>
      <div className="flex justify-end mt-5">
        <Button variant="outlined-primary" className="w-fit px-6">
          + Add Address
        </Button>
      </div>
    </div>
  );
};

export default MyAddresses;
