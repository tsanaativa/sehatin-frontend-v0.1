type ModalProps = {
  children: React.ReactNode;
  modalValue: 0 | 100;
  onClick: () => void;
};

const Modal = ({ children, modalValue = 0, onClick }: ModalProps) => {
  const SHOW_MODAL = {
    0: 'translate-y-0',
    100: 'translate-y-100',
  };
  return (
    <div onClick={onClick}>
      <div className={`translate-y-${SHOW_MODAL[modalValue]}`}>{children}</div>
    </div>
  );
};

export default Modal;
