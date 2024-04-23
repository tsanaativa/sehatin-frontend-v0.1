'use client';
import ModalPharmacyDetail from '../ModalPharmacyDetail';
import ModalChoosePharmacies from '../ModalChoosePharmacies';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

const PharmacyModal = () => {
  const [showPharmacyDetail, setShowPharmacyDetail] = useState<boolean>(false);
  const [showChoosePharmacies, setShowChoosePharmacies] =
    useState<boolean>(false);

  return (
    <>
      <div className="bg-primary-light border border-primary-border rounded-lg">
        <div className="flex items-center gap-x-2 text-xs text-primary-darker px-2 py-1">
          Send from Centuri Plaza Senayan
          <button
            className="w-4 h-4 bg-primary-dark font-bold text-[0.625rem] text-light rounded-full"
            onClick={() => setShowPharmacyDetail(true)}
          >
            i
          </button>
        </div>
        <hr className="border border-primary-border" />
        <button
          className="w-full flex items-center justify-between font-semibold text-sm text-primary-darker px-3 py-1 rounded-bl-lg rounded-br-lg hover:bg-primary-dark/5"
          onClick={() => setShowChoosePharmacies(true)}
        >
          Other Pharmacies <ChevronRight size={15} />
        </button>
      </div>
      <ModalPharmacyDetail
        onShowModal={setShowPharmacyDetail}
        showModal={showPharmacyDetail}
      />
      <ModalChoosePharmacies
        onShowModal={setShowChoosePharmacies}
        showModal={showChoosePharmacies}
      />
    </>
  );
};

export default PharmacyModal;
