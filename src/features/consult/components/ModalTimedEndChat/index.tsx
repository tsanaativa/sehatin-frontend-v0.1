import { Button, Modal } from '@/components/common';
import { TriangleAlert } from 'lucide-react';
import { useEffect, useState } from 'react';

type ModalTimedEndChatProps = {
  onConfirm: () => void;
  showModal: boolean;
  startCount: boolean;
  notify: (countDown: number) => void;
};

const ModalTimedEndChat = ({
  showModal,
  onConfirm,
  startCount,
  notify,
}: ModalTimedEndChatProps) => {
  const [countDown, setCountDown] = useState(30);

  useEffect(() => {
    if (startCount) {
      const interval = setInterval(() => {
        if (countDown > 0) {
          notify(countDown);
          setCountDown(countDown - 1);
        } else onConfirm();
      }, 1000);

      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countDown, startCount]);

  return (
    <Modal onClick={() => {}} showModal={showModal}>
      <div className="flex items-center justify-between  font-poppins font-semibold text-sm px-4 pt-4 md:text-lg">
        <div></div>
        {/* <X
          className="text-gray cursor-pointer"
          onClick={() => onShowModal(false)}
        /> */}
      </div>
      <div className="flex flex-col items-center gap-y-2 px-5 pb-5 md:pb-8 md:px-10">
        <div className="bg-danger-light text-danger rounded-full p-4">
          <TriangleAlert size={40} />
        </div>
        <div className="flex flex-col items-center">
          <div className="font-poppins font-semibold text-lg mb-1">
            Chat will end
          </div>
          <div className="text-dark-gray text-center">
            Doctor wants to end chat. Consultation will end in {countDown}{' '}
            seconds...
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <Button
            variant="danger"
            className="w-full px-4 min-w-[100px] flex items-center justify-center gap-x-2"
            onClick={onConfirm}
          >
            End Now
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalTimedEndChat;
