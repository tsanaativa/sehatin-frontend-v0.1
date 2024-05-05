'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';
import ModalAddAddress from '../ModalAddAddress';
import { Button } from '@/components/common';

const AddAddressButton = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <Button
        variant="outlined-primary"
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
