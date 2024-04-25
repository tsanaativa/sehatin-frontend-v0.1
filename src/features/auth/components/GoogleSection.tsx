import { GoogleIcon } from '@/assets/icons';
import { Button } from '@/components/common';
import Link from 'next/link';

const GoogleSection = ({
  mode = 'register',
}: {
  mode?: 'login' | 'register';
}) => {
  return (
    <div className="flex flex-col gap-7 items-center mt-6">
      <span className="text-dark-gray [&>a]:text-primary-dark">
        {mode == 'login' ? 'Already' : "Don't"} have an account?{' '}
        <Link href={mode == 'login' ? '/register' : '/login'}>
          {mode == 'login' ? 'Register' : 'Login'}
        </Link>
      </span>
      <div className="flex w-full items-center text-gray [&>hr]:border-none [&>hr]:bg-gray [&>hr]:h-px [&>hr]:w-full gap-4">
        <hr />
        <span className="min-w-fit">OR</span>
        <hr />
      </div>
      <Button
        variant="google"
        className="flex items-center w-full relative h-14 px-[18px] max-w-80"
      >
        <GoogleIcon />
        <span className="absolute inset-0 grid place-items-center">
          {mode == 'login' ? 'Register' : 'Sign In'} with Google
        </span>
      </Button>
    </div>
  );
};

export default GoogleSection;
