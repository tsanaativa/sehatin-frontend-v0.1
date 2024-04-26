type ModalProps = {
  children: React.ReactNode;
  showModal: boolean;
  modalClass?: React.ComponentPropsWithoutRef<'div'>['className'];
  onClick: () => void;
};

const Modal = ({
  children,
  showModal = false,
  modalClass,
  onClick,
}: ModalProps) => {
  return (
    <div
      className={`fixed inset-0 z-50 w-full h-full overflow-auto ${showModal ? 'scale-100 bg-dark/60 [transition:transform_0s_ease-in-out,background_0.3s_ease-in-out_0.1s]' : 'scale-0 bg-dark/0 [transition:transform_0s_ease-in-out_0.3s,background_0.3s_ease-in-out]'} flex items-end md:grid md:place-items-center ${modalClass}`}
      onClick={onClick}
    >
      <div
        className={`bg-light w-full h-fit transition-transform duration-300 ${showModal ? 'translate-y-0 delay-[0.1s] md:translate-y-0 md:scale-100' : 'translate-y-full md:translate-y-0 md:scale-0'} rounded-tl-lg rounded-tr-lg md:w-fit md:rounded-t-none`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
