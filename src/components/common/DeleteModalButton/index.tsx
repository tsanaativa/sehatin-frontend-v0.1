'use client';

import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import ModalDelete from './ModalDelete';

type DeleteModalButtonProps = {
  isIcon?: boolean;
  objName: string;
  onConfirm: () => void;
};

const DeleteModalButton = ({
  isIcon = false,
  objName,
  onConfirm,
}: DeleteModalButtonProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div>
      <button
        role="button"
        className={`flex items-center ${isIcon ? 'text-danger' : 'bg-danger-light text-danger border border-danger rounded ps-4 pe-5 py-2 gap-2 items-center'}`}
        onClick={() => setShowModal(true)}
      >
        {isIcon ? (
          <Trash2 size={20} />
        ) : (
          <>
            <Trash2 size={18} />
            Delete
          </>
        )}
      </button>
      <ModalDelete
        objName={objName}
        onConfirm={onConfirm}
        onShowModal={setShowModal}
        showModal={showModal}
      />
    </div>
  );
};

export default DeleteModalButton;
