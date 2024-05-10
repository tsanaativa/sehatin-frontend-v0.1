import Loading from '../Loading';

type ButtonProps = {
  variant?:
    | 'primary'
    | 'primary-light'
    | 'outlined-primary'
    | 'danger'
    | 'outlined-danger'
    | 'danger'
    | 'outlined-gray'
    | 'google'
    | 'green';
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
      'text-light bg-primary-dark/85 hover:bg-primary-dark/90 active:bg-primary-dark disabled:bg-primary-disabled disabled:cursor-not-allowed',
    'outlined-primary':
      'text-primary-dark bg-light border border-primary-dark hover:bg-primary/10 disabled:hover:bg-light disabled:border-primary-disabled disabled:text-primary-disabled disabled:cursor-not-allowed',
    danger:
      'text-light bg-danger/85 hover:bg-danger/90 active:bg-danger disabled:bg-danger/60',
    'outlined-danger': '',
    'primary-light': 'text-primary-dark bg-primary-border',
    'outlined-gray': 'text-dark-gray border border-gray hover:bg-gray-light',
    google:
      'border-gray-light border-[1px] bg-light/40 !rounded-full text-dark hover:border-gray-cart disabled:opacity-50 disabled:cursor-not-allowed',
    green: 'text-light bg-green hover:bg-green/90',
  };

  return (
    <button
      className={`${TYPE_STYLE[variant]} ${className} font-poppins font-medium py-2 rounded-md transition duration-300`}
      disabled={disabled || loading}
      {...buttonProps}
    >
      {loading ? <Loading name="jump-dots" /> : children}
    </button>
  );
};

export default Button;
