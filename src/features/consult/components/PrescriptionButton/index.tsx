'use client';

import { Button } from '@/components/common';
import { useState } from 'react';
import ModalMedicalCert from '../ModalMedicalCert';

type PrescriptionButtonProps = {
  notify: (url: string) => void;
};

const PrescriptionButton = ({ notify }: PrescriptionButtonProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div>
      <Button
        variant="outlined-primary"
        className="hidden text-center rounded ps-4 pe-5 py-2 gap-2 w-full md:block"
        onClick={() => setShowModal(true)}
      >
        Prescribe Medicine
      </Button>
      <div
        className="text-danger hover:bg-gray-lighter flex gap-2 flex items-center cursor-pointer capitalize justify-between py-2 px-3 md:hidden"
        role="button"
        onClick={() => setShowModal(true)}
      >
        Prescribe Medicine
      </div>
      <ModalMedicalCert
        notify={notify}
        onShowModal={setShowModal}
        showModal={showModal}
      />
    </div>
  );
};

export default PrescriptionButton;
