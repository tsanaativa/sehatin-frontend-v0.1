import { Modal } from '@/components/common';

type ModalChoosePharmaciesProps = {
  onShowModal: (showModal: number) => void;
  modalValue: 0 | 100;
};

const ModalChoosePharmacies = ({
  onShowModal,
  modalValue,
}: ModalChoosePharmaciesProps) => {
  return (
    <Modal onClick={() => onShowModal(0)} modalValue={modalValue}>
      Modal Choose Pharmacies
    </Modal>
  );
};

export default ModalChoosePharmacies;
