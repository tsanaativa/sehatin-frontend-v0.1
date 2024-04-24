import { Modal } from '@/components/common';
import { X } from 'lucide-react';
import { ChoosePharmaciesList } from '..';

type ModalChoosePharmaciesProps = {
  onShowModal: (showModal: boolean) => void;
  showModal: boolean;
};

const ModalChoosePharmacies = ({
  onShowModal,
  showModal,
}: ModalChoosePharmaciesProps) => {
  return (
    <Modal onClick={() => onShowModal(false)} showModal={showModal}>
      <div className="flex items-center justify-between border-b border-gray-light font-poppins font-semibold text-sm px-4 py-4 md:text-lg">
        Choose Pharmacy{' '}
        <X
          className="text-gray cursor-pointer"
          onClick={() => onShowModal(false)}
        />
      </div>
      <div className="flex flex-col gap-y-2 px-4 py-4 max-h-[500px] h-full overflow-y-auto">
        <ChoosePharmaciesList />
      </div>
    </Modal>
  );
};

export default ModalChoosePharmacies;
