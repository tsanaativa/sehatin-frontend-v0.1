'use client';

import { Button } from '@/components/common';
import { useState } from 'react';
import ModalEndChat from '../ModalEndChat';

type EndChatButtonProps = {
  onConfirm: () => void;
  isDoctor: boolean;
};

const EndChatButton = ({ onConfirm, isDoctor }: EndChatButtonProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div>
      <Button
        variant="danger"
        className="hidden text-center rounded ps-4 pe-5 py-2 gap-2 w-full md:block"
        onClick={() => setShowModal(true)}
      >
        End Chat
      </Button>
      <div
        className="text-danger hover:bg-gray-lighter flex gap-2 items-center cursor-pointer capitalize justify-between py-2 px-3 md:hidden"
        role="button"
        onClick={() => setShowModal(true)}
      >
        End Chat
      </div>
      <ModalEndChat
        onConfirm={onConfirm}
        onShowModal={setShowModal}
        showModal={showModal}
        isDoctor={isDoctor}
      />
    </div>
  );
};

export default EndChatButton;
