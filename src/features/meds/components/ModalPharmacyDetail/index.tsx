import { WhatsAppIcon } from '@/assets/icons';
import { Button, Modal } from '@/components/common';
import { X } from 'lucide-react';

type ModalPharmacyDetailProps = {
  onShowModal: (showModal: boolean) => void;
  showModal: boolean;
};

const ModalPharmacyDetail = ({
  onShowModal,
  showModal,
}: ModalPharmacyDetailProps) => {
  return (
    <Modal onClick={() => onShowModal(false)} showModal={showModal}>
      <div className="flex items-center justify-between border-b border-gray-light font-poppins font-semibold text-sm px-4 py-4 md:text-lg">
        Pharmacy Detail{' '}
        <X
          className="text-gray cursor-pointer"
          onClick={() => onShowModal(false)}
        />
      </div>
      <div className="flex flex-col gap-y-2 px-4 py-4">
        <div className="flex justify-between">
          <span className="w-1/2 text-xs text-dark-gray md:text-base">
            Address
          </span>
          <span className="w-1/2 text-end text-xs text-dark md:text-base">
            Jl. bla bla ini alamat lah ya pokoknya, gggg, sssss, 52616
          </span>
        </div>
        <div className="flex justify-between">
          <span className="w-1/2 text-xs text-dark-gray md:text-base">
            Operational Hour
          </span>
          <span className="w-1/2 text-end text-xs text-dark md:text-base">
            10.00 - 17.00
          </span>
        </div>
        <div className="flex justify-between">
          <span className="w-1/2 text-xs text-dark-gray md:text-base">
            Operational Day
          </span>
          <span className="w-1/2 text-end text-xs text-dark md:text-base">
            Weekday
          </span>
        </div>
        <div className="flex justify-between">
          <span className="w-1/2 text-xs text-dark-gray md:text-base">
            Pharmacist Name
          </span>
          <span className="w-1/2 text-end text-xs text-dark md:text-base">
            Fajar Si Orang
          </span>
        </div>
        <div className="flex justify-between">
          <span className="w-1/2 text-xs text-dark-gray md:text-base">
            Pharmacist License Number
          </span>
          <span className="w-1/2 text-end text-xs text-dark md:text-base">
            57868768789
          </span>
        </div>
        <Button className="flex items-center justify-center gap-x-2 mt-6">
          <WhatsAppIcon /> Contact With WhatsApp
        </Button>
      </div>
    </Modal>
  );
};

export default ModalPharmacyDetail;
