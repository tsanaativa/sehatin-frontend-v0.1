import React from 'react';

type BadgeProps = {
  variant?: 'primary' | 'gray' | 'blue' | 'success' | 'warning' | 'danger';
  className?: string;
} & React.ComponentPropsWithoutRef<'div'>;

const Badge = ({ variant = 'primary', className, children }: BadgeProps) => {
  const TYPE_STYLE = {
    primary: 'text-primary-dark bg-primary-border',
    gray: 'text-dark-gray bg-gray-lighter',
    blue: 'text-blue bg-blue-light',
    success: 'text-green bg-green-light',
    warning: 'text-warning bg-warning-light',
    danger: 'text-danger bg-danger-light',
  };

  return (
    <div
      className={`${TYPE_STYLE[variant]} ${className} flex justify-center items-center gap-2 font-semibold py-1 px-2 rounded-lg text-xs md:text-sm`}
    >
      {children}
    </div>
  );
};

export default Badge;
