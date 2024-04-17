import React from 'react';

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
      className={`bg-light text-dark-gray ${active && 'bg-primary text-light'} ${disabled && 'bg-gray-lighter'} w-10 h-10 flex items-center justify-center rounded`}
    >
      {children}
    </button>
  );
};

export default PaginationButton;
