import { Button, Modal } from '@/components/common';
import { X } from 'lucide-react';
import ChangePasswordForm from '../ChangePasswordForm';

type ModalChangePasswordProps = {
  onShowModal: (showModal: boolean) => void;
  showModal: boolean;
};

const ModalChangePassword = ({
  onShowModal,
  showModal,
}: ModalChangePasswordProps) => {
  return (
    <Modal onClick={() => onShowModal(false)} showModal={showModal}>
      <div className="flex items-center justify-between border-b border-gray-light font-poppins font-semibold text-sm px-4 py-4 md:text-lg">
        Change Password{' '}
        <X
          className="text-gray cursor-pointer"
          onClick={() => onShowModal(false)}
        />
      </div>
      <div className="flex flex-col gap-y-2 px-4 py-4 md:min-w-[500px]">
        <ChangePasswordForm />
      </div>
    </Modal>
  );
};

export default ModalChangePassword;
