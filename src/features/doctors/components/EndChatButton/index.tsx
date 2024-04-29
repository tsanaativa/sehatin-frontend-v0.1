'use client';

import { Button } from '@/components/common';
import { useState } from 'react';
import ModalEndChat from '../ModalEndChat';

type EndChatButtonProps = {
  onConfirm: () => void;
};

const EndChatButton = ({ onConfirm }: EndChatButtonProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div>
      <Button
        variant="danger"
        className="text-center rounded ps-4 pe-5 py-2 gap-2 w-full"
        onClick={() => setShowModal(true)}
      >
        End Chat
      </Button>
      <ModalEndChat
        onConfirm={onConfirm}
        onShowModal={setShowModal}
        showModal={showModal}
      />
    </div>
  );
};

export default EndChatButton;
