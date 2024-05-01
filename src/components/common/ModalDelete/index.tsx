import { Button, Modal } from '@/components/common';
import { TriangleAlert, X } from 'lucide-react';

type ModalDeleteProps = {
  objName: string;
  onConfirm: () => void;
  onShowModal: (showModal: boolean) => void;
  showModal: boolean;
};

const ModalDelete = ({
  onShowModal,
  showModal,
  objName,
  onConfirm,
}: ModalDeleteProps) => {
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
          <div className="font-poppins font-semibold text-lg">
            Are you sure?
          </div>
          <div className="text-dark-gray">
            Do you really want to delete this {objName}?
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
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDelete;
