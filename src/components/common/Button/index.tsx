type ButtonProps = {
  variant?:
    | 'primary'
    | 'primary-light'
    | 'outlined-primary'
    | 'outlined-danger'
    | 'danger'
    | 'outlined-gray'
    | 'google';
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
      'text-light bg-primary-dark/85 hover:bg-primary-dark/90 active:bg-primary-dark disabled:bg-primary/70',
    'outlined-primary':
      'text-primary-dark bg-light border border-primary-dark hover:text-light hover:bg-primary-dark',
    'outlined-danger': '',
    'primary-light': 'text-primary-dark bg-primary-border',
    danger: 'text-white bg-danger hover:bg-danger/80',
    'outlined-gray':
      'text-dark-gray border border-gray-light hover:bg-gray-light',
    google:
      'border-gray-light border-[1px] bg-light/40 !rounded-full text-dark',
  };

  return (
    <button
      className={`${TYPE_STYLE[variant]} ${className} font-poppins font-medium py-2 rounded-md transition duration-300`}
      disabled={disabled || loading}
      {...buttonProps}
    >
      {loading ? 'loading' : children}
    </button>
  );
};

export default Button;
