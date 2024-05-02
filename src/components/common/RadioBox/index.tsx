type RadioBoxProps = React.ComponentPropsWithoutRef<'input'> & {
  children: React.ReactNode;
  boxClass?: React.ComponentPropsWithoutRef<'label'>['className'];
  isActive?: boolean;
  onSelect?: () => void;
};

const RadioBox = ({
  children,
  boxClass,
  isActive = false,
  ...props
}: RadioBoxProps) => {
  return (
    <label
      className={`w-full h-[99px] border rounded-[10px] flex flex-col items-center justify-center font-semibold select-none ${props.disabled ? 'opacity-50 cursor-not-allowed' : `cursor-pointer ${isActive ? 'border-primary bg-primary-light text-primary' : 'border-gray-light text-gray transition duration-300 hover:border-primary'}`} ${boxClass}`}
      htmlFor={props.id}
      aria-label={props.name}
    >
      <input {...props} type="radio" checked={isActive} className="hidden" />
      {children}
    </label>
  );
};

export default RadioBox;
