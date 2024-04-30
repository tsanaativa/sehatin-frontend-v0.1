type ButtonProps = {
  variant?:
    | 'primary'
    | 'primary-light'
    | 'outlined-primary'
    | 'outlined-danger'
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
      'text-light bg-primary-dark/85 hover:bg-primary-dark/90 active:bg-primary-dark disabled:bg-primary-disabled',
    'outlined-primary':
      'text-primary-dark bg-light border border-primary-dark hover:bg-primary/10',
    'outlined-danger': '',
    'primary-light': 'text-primary-dark bg-primary-border',
    google: 'border-gray-light border bg-light/40 !rounded-full text-dark',
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
