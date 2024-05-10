'use client';

import { Edit2 } from 'lucide-react';
import { useState } from 'react';
import ModalUpdateAddress from '../ModalUpdateAddress';
import { Address } from '@/types/Address';

type UpdateAddressButtonProps = {
  address: Address;
};

const UpdateAddressButton = ({ address }: UpdateAddressButtonProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div>
      <button
        type="button"
        className="flex items-center text-blue"
        onClick={() => setShowModal(true)}
      >
        <Edit2 size={20} />
      </button>
      <ModalUpdateAddress
        address={address}
        onShowModal={setShowModal}
        showModal={showModal}
      />
    </div>
  );
};

export default UpdateAddressButton;
