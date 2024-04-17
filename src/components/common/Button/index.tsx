type ButtonProps = {
  variant?: 'primary' | 'outlined-primary' | 'outlined-danger';
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
      'text-primary-dark bg-light border-1 border-solid border-primary-dark hover:text-light hover:bg-primary-dark',
    'outlined-danger': '',
  };

  return (
    <button
      className={`${TYPE_STYLE[variant]} ${className} font-poppins font-medium py-2 rounded-md`}
      disabled={disabled || loading}
      {...buttonProps}
    >
      {loading ? 'loading' : children}
    </button>
  );
};

export default Button;
