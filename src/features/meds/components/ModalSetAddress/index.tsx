import { Button, Modal } from '@/components/common';
import { TriangleAlert, X } from 'lucide-react';
import Link from 'next/link';

type ModalSetAddressProps = {
  showModal: boolean;
};

const ModalSetAddress = ({ showModal }: ModalSetAddressProps) => {
  return (
    <Modal onClick={() => {}} showModal={showModal}>
      <div className="flex items-center justify-between font-poppins font-semibold text-sm px-4 pt-4 md:text-lg"></div>
      <div className="flex flex-col items-center gap-y-2 px-5 pb-5 md:pb-10 md:pt-6 md:px-10 md:min-w-[400px]">
        <div className="bg-warning-light text-warning rounded-full p-4">
          <TriangleAlert size={40} />
        </div>
        <div className="flex flex-col items-center">
          <div className="font-poppins font-semibold text-lg mb-1">
            You have no addresses.
          </div>
          <div className="text-dark-gray text-center">
            Set your address first.
            <br />
            Redirecting to My Addresses in 5 seconds...
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <Link href={'/profile/my-profile'}>
            <Button className="w-full px-4 min-w-[100px] flex items-center justify-center gap-x-2">
              Set Address
            </Button>
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default ModalSetAddress;
