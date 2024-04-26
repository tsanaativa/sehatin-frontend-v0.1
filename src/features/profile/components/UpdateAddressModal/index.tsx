'use client';

import { Edit2 } from 'lucide-react';
import { useState } from 'react';
import ModalUpdateAddress from '../ModalUpdateAddress';
import { Address } from '@/types/Address';

type UpdateAddressModalProps = {
  address: Address;
};

const UpdateAddressModal = ({ address }: UpdateAddressModalProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div>
      <button
        role="button"
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

export default UpdateAddressModal;
