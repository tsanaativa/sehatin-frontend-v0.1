import { Button, Modal } from '@/components/common';
import AddressForm from '@/components/common/AddressForm';
import GoogleMapView from '@/components/common/GoogleMapView';
import { X } from 'lucide-react';

type ModalAddAddressProps = {
  onShowModal: (showModal: boolean) => void;
  showModal: boolean;
};

const ModalAddAddress = ({ onShowModal, showModal }: ModalAddAddressProps) => {
  return (
    <Modal onClick={() => onShowModal(false)} showModal={showModal}>
      <div className="flex items-center justify-between border-b border-gray-light font-poppins font-semibold text-sm px-4 py-4 md:text-lg">
        Add Address{' '}
        <X
          className="text-gray cursor-pointer"
          onClick={() => onShowModal(false)}
        />
      </div>
      <div className="flex flex-col gap-y-2 px-4 py-4 md:min-w-[700px]">
        <div className="flex flex-col gap-4 text-xs text-dark-gray md:text-base">
          <AddressForm />
          <GoogleMapView />
        </div>
      </div>
    </Modal>
  );
};

export default ModalAddAddress;
