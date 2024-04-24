import { Button, Modal } from '@/components/common';
import { Address } from '@/types/Address';
import { X } from 'lucide-react';

type ModalUpdateAddressProps = {
  onShowModal: (showModal: boolean) => void;
  showModal: boolean;
  address: Address;
};

const ModalUpdateAddress = ({
  onShowModal,
  showModal,
  address,
}: ModalUpdateAddressProps) => {
  return (
    <Modal onClick={() => onShowModal(false)} showModal={showModal}>
      <div className="flex items-center justify-between border-b border-gray-light font-poppins font-semibold text-sm px-4 py-4 md:text-lg">
        Update Address{' '}
        <X
          className="text-gray cursor-pointer"
          onClick={() => onShowModal(false)}
        />
      </div>
      <div className="flex flex-col gap-y-2 px-4 py-4 min-w-[500px]">
        <div className="flex flex-col gap-4 text-xs text-dark-gray md:text-base">
          <div>
            <label>Password</label>
            <br />
            <input
              type="password"
              className="text-dark border border-gray-light p-2 w-full"
            />
          </div>
          <div>
            <label>New Password</label>
            <br />
            <input
              type="password"
              className="text-dark border border-gray-light p-2 w-full"
            />
          </div>
          <div>
            <label>Confirm New Password</label>
            <br />
            <input
              type="password"
              className="text-dark border border-gray-light p-2 w-full"
            />
          </div>
        </div>
        <Button className="flex items-center justify-center gap-x-2 mt-6">
          Change Password
        </Button>
      </div>
    </Modal>
  );
};

export default ModalUpdateAddress;
