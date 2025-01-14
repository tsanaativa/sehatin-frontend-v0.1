'use client';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import ModalChoosePharmacies from '../ModalChoosePharmacies';
import ModalPharmacyDetail from '../ModalPharmacyDetail';

const PharmacyModal = () => {
  const [showPharmacyDetail, setShowPharmacyDetail] = useState<boolean>(false);
  const [showChoosePharmacies, setShowChoosePharmacies] =
    useState<boolean>(false);

  return (
    <>
      <div className="bg-primary-light border border-primary-border rounded-lg mt-4 md:mt-6">
        <div className="flex items-center gap-x-2 text-xs text-primary-darker px-2 py-1 md:text-base">
          Send from Centuri Plaza Senayan
          <button
            className="w-4 h-4 bg-primary-dark font-bold text-[0.625rem] text-light rounded-full md:text-sm"
            onClick={() => setShowPharmacyDetail(true)}
          >
            i
          </button>
        </div>
        <hr className="border border-primary-border" />
        <button
          className="w-full flex items-center justify-between font-semibold text-sm text-primary-darker px-3 py-1 rounded-bl-lg rounded-br-lg hover:bg-primary-dark/5 md:text-lg"
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
