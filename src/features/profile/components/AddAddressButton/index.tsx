'use client';

import { Button } from '@/components/common';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import ModalAddAddress from '../ModalAddAddress';

const AddAddressButton = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <Button
        className="flex items-center justify-center gap-1 px-6 w-full md:w-fit"
        onClick={() => setShowModal(true)}
      >
        <Plus size={15} /> Add Address
      </Button>
      <ModalAddAddress onShowModal={setShowModal} showModal={showModal} />
    </>
  );
};

export default AddAddressButton;
