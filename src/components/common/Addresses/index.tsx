'use client';

import AddressCard from '@/components/common/AddressCard';
import { deleteAddress } from '@/features/profile/actions/profile';
import AddAddressButton from '@/features/profile/components/AddAddressButton';
import ModalUpdateAddress from '@/features/profile/components/ModalUpdateAddress';
import { Address } from '@/types/Address';
import { User } from '@/types/User';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';

type AddressesProps = {
  profile: User;
};

const Addresses = ({ profile }: AddressesProps) => {
  const [address, setAddress] = useState<Address>();
  const [showModal, setShowModal] = useState(false);

  const handleChangeAddress = (address: Address) => {
    setAddress(address);
    setShowModal(true);
  };

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
            <Link
              href={`/profile/my-addresses/${addr.id}`}
              className="md:hidden"
            >
              <AddressCard
                address={addr}
                key={idx}
                onEdit={() => handleChangeAddress(addr)}
                onDelete={() => handleDeleteAddress(addr.id)}
              />
            </Link>
            <div className="hidden md:block">
              <AddressCard
                address={addr}
                key={idx}
                onEdit={() => handleChangeAddress(addr)}
                onDelete={() => handleDeleteAddress(addr.id)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6 md:justify-end">
        <AddAddressButton />
      </div>
      {address && (
        <ModalUpdateAddress
          address={address}
          onShowModal={setShowModal}
          showModal={showModal}
        />
      )}
    </div>
  );
};

export default Addresses;
