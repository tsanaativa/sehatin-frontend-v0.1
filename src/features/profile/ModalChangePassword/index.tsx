import { Modal } from '@/components/common';

type ModalChangePasswordProps = {
  onShowModal: (showModal: number) => void;
  modalValue: 0 | 100;
};

const ModalChangePassword = ({
  onShowModal,
  modalValue,
}: ModalChangePasswordProps) => {
  return (
    <Modal onClick={() => onShowModal(100)} modalValue={modalValue}>
      Change Password
    </Modal>
  );
};

export default ModalChangePassword;
