import { Modal } from '@/components/common';

type ModalPharmacyProduct = {
  onShowModal: (showModal: boolean) => void;
  showModal: boolean;
};

const ModalPharmacyProduct = ({
  onShowModal,
  showModal,
}: ModalPharmacyProduct) => {
  return (
    <Modal onClick={() => onShowModal(false)} showModal={showModal}>
      <div>Modal Pharmacy Product</div>
    </Modal>
  );
};

export default ModalPharmacyProduct;
