'use client';

import ModalChoosePharmacies from '@/components/common/ModalChoosePharmacies';
import ModalPharmacyDetail from '@/components/common/ModalPharmacyDetail';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

const PharmacyModal = () => {
  const [showModal, setShowModal] = useState<0 | 100>(0);

  return (
    <>
      <div className="bg-primary-light border border-primary-border rounded-lg">
        <div className="flex items-center gap-x-2 text-xs text-primary-darker px-2 py-1">
          Send from Centuri Plaza Senayan
          <button className="w-4 h-4 bg-primary-dark font-bold text-[0.625rem] text-light rounded-full">
            i
          </button>
        </div>
        <hr className="border border-primary-border" />
        <button className="w-full flex items-center justify-between font-semibold text-sm text-primary-darker px-3 py-1 rounded-bl-lg rounded-br-lg hover:bg-primary-dark/5">
          Other Pharmacies <ChevronRight size={15} />
        </button>
      </div>
      <ModalPharmacyDetail
        onShowModal={() => setShowModal(100)}
        modalValue={showModal}
      />
      <ModalChoosePharmacies
        onShowModal={() => setShowModal(100)}
        modalValue={showModal}
      />
    </>
  );
};

export default PharmacyModal;
