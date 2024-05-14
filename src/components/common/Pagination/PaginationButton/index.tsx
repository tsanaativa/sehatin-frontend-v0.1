type PaginationButtonProps = {
  disabled?: boolean;
  active?: boolean;
} & React.ComponentPropsWithoutRef<'button'>;

const PaginationButton = ({
  disabled = false,
  active = false,
  children,
  ...paginationButtonProps
}: PaginationButtonProps) => {
  return (
    <button
      {...paginationButtonProps}
      className={`text-dark-gray ${active && 'bg-primary text-light pointer-events-none'} ${disabled ? 'bg-gray-lighter pointer-events-none opacity-50' : 'bg-light'} w-10 h-10 flex items-center justify-center rounded`}
    >
      {children}
    </button>
  );
};

export default PaginationButton;
