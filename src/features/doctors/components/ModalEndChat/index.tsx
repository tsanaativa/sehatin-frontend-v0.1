import { Button, Modal } from '@/components/common';
import { TriangleAlert, X } from 'lucide-react';

type ModalEndChatProps = {
  onConfirm: () => void;
  onShowModal: (showModal: boolean) => void;
  showModal: boolean;
};

const ModalEndChat = ({
  onShowModal,
  showModal,
  onConfirm,
}: ModalEndChatProps) => {
  return (
    <Modal onClick={() => onShowModal(false)} showModal={showModal}>
      <div className="flex items-center justify-between  font-poppins font-semibold text-sm px-4 pt-4 md:text-lg">
        <div></div>
        <X
          className="text-gray cursor-pointer"
          onClick={() => onShowModal(false)}
        />
      </div>
      <div className="flex flex-col items-center gap-y-2 px-5 pb-5 md:pb-8 md:px-10">
        <div className="bg-danger-light text-danger rounded-full p-4">
          <TriangleAlert size={40} />
        </div>
        <div className="flex flex-col items-center">
          <div className="font-poppins font-semibold text-lg mb-1">
            Are you sure?
          </div>
          <div className="text-dark-gray">
            You will have to wait for {"patient's"} confirmation or
            <br />
            it will automatically end in 30 seconds.
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <Button
            variant="outlined-gray"
            className="w-full px-4 min-w-[100px] flex items-center justify-center gap-x-2"
            onClick={() => onShowModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            className="w-full px-4 min-w-[100px] flex items-center justify-center gap-x-2"
            onClick={onConfirm}
          >
            Yes
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalEndChat;
