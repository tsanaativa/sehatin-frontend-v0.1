import Link from 'next/link';

type LoginBarProps = {
  isAuthenticated: boolean;
};

const LoginBar = ({ isAuthenticated }: LoginBarProps) => {
  return (
    <>
      {!isAuthenticated && (
        <div className="w-full bg-dark-gray text-light text-center text-[0.625rem] font-medium py-1 md:text-sm">
          You are not logged in. To access all features,{' '}
          <Link className="font-bold underline" href="/login">
            login here
          </Link>
          .
        </div>
      )}
    </>
  );
};

export default LoginBar;
