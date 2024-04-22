import { Modal } from '..';

type ModalPharmacyDetailProps = {
  onShowModal: (showModal: number) => void;
  modalValue: 0 | 100;
};

const ModalPharmacyDetail = ({
  onShowModal,
  modalValue,
}: ModalPharmacyDetailProps) => {
  return (
    <Modal onClick={() => onShowModal(0)} modalValue={modalValue}>
      ModalPharmacyDetail
    </Modal>
  );
};

export default ModalPharmacyDetail;
