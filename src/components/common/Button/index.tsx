type ButtonProps = {
  variant?:
    | 'primary'
    | 'primary-light'
    | 'outlined-primary'
    | 'outlined-danger'
    | 'danger'
    | 'outlined-gray';
  loading?: boolean;
} & React.ComponentPropsWithoutRef<'button'>;

const Button = ({
  className,
  disabled,
  children,
  variant = 'primary',
  loading = false,
  ...buttonProps
}: ButtonProps) => {
  const TYPE_STYLE = {
    primary:
      'text-light bg-primary-dark hover:bg-primary-dark/80 disabled:bg-primary-disabled',
    'outlined-primary':
      'text-primary-dark bg-light border border-primary-dark hover:text-light hover:bg-primary-dark',
    'outlined-danger': '',
    'primary-light': 'text-primary-dark bg-primary-border',
    danger: 'text-white bg-danger hover:bg-danger/80',
    'outlined-gray':
      'text-dark-gray border border-gray-light hover:bg-gray-light',
  };

  return (
    <button
      className={`${TYPE_STYLE[variant]} ${className} font-poppins font-medium py-2 rounded-md transition`}
      disabled={disabled || loading}
      {...buttonProps}
    >
      {loading ? 'loading' : children}
    </button>
  );
};

export default Button;
