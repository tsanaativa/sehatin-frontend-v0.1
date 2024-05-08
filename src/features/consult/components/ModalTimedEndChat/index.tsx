import { Button, Modal } from '@/components/common';
import { TriangleAlert } from 'lucide-react';

type ModalTimedEndChatProps = {
  onConfirm: () => void;
  showModal: boolean;
  countDown?: number;
};

const ModalTimedEndChat = ({
  showModal,
  onConfirm,
  countDown,
}: ModalTimedEndChatProps) => {
  // const [countDown, setCountDown] = useState(30);

  // useEffect(() => {
  //   function startTimer() {
  //     setInterval(function () {
  //       setCountDown(countDown - 1);
  //     }, 1000);
  //   }

  //   startTimer();
  // }, []);

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
            Doctor wants to end chat. Consultation will end in {countDown}...
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          {/* <Button
            variant="outlined-gray"
            className="w-full px-4 min-w-[100px] flex items-center justify-center gap-x-2"
            onClick={() => onShowModal(false)}
          >
            Cancel
          </Button> */}
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
