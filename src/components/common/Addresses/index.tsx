'use client';

import AddressCard from '@/components/common/AddressCard';
import { deleteAddress } from '@/features/profile/actions/profile';
import { User } from '@/types/User';
import { Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import Button from '../Button';

type AddressesProps = {
  profile: User;
};

const Addresses = ({ profile }: AddressesProps) => {
  const handleDeleteAddress = async (id: number) => {
    try {
      await deleteAddress(id);
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  return (
    <div>
      <h2 className="text-xl text-center font-semibold font-poppins md:text-2xl md:text-start">
        My Addresses
      </h2>
      <div className="flex flex-col gap-4 mt-5">
        {profile.addresses.map((addr, idx) => (
          <div key={idx}>
            <AddressCard
              address={addr}
              key={idx}
              onDelete={() => handleDeleteAddress(addr.id)}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6 md:justify-end">
        <a
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/profile/my-addresses/create`}
        >
          <Button className="flex items-center justify-center gap-1 px-6 w-full md:w-fit">
            <Plus size={15} /> Add Address
          </Button>
        </a>
      </div>
    </div>
  );
};

export default Addresses;
