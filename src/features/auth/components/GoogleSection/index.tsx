'use client';
import { GoogleIcon } from '@/assets/icons';
import { Button } from '@/components/common';
import Link from 'next/link';
import cookie from '@/utils/publicCookie';

const GoogleSection = ({
  mode = 'register',
  role,
}: {
  mode?: 'login' | 'register';
  role: 'user' | 'doctor';
}) => {
  const onGoogle = () => {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
      redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_URI as string,
      client_id: process.env.NEXT_PUBLIC_GOOGLE_ID as string,
      access_type: 'offline',
      response_type: 'code',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/user.birthday.read',
        'https://www.googleapis.com/auth/user.gender.read',
      ].join(' '),
      state: 'auth/response',
    };
    const qs = new URLSearchParams(options);
    window.location.assign(`${rootUrl}?${qs.toString()}`);
    cookie.set('g-session', role, 5);
  };
  return (
    <div className="flex flex-col gap-7 items-center mt-6">
      <span className="text-dark-gray [&>a]:text-primary-dark">
        {mode == 'login' ? "Don't" : 'Already'} have an account?{' '}
        <Link href={`/auth/${mode == 'login' ? 'register' : 'login'}`}>
          {mode == 'login' ? 'Register' : 'Login'}
        </Link>
      </span>
      <div className="flex w-full items-center text-gray [&>hr]:border-none [&>hr]:bg-gray [&>hr]:h-px [&>hr]:w-full gap-4">
        <hr />
        <span className="min-w-fit">OR</span>
        <hr />
      </div>
      <Button
        onClick={onGoogle}
        variant="google"
        className="flex items-center w-full relative h-14 px-[18px] max-w-80"
      >
        <GoogleIcon />
        <span className="absolute inset-0 grid place-items-center">
          {mode == 'login' ? 'Sign In' : 'Register'} with Google
        </span>
      </Button>
    </div>
  );
};

export default GoogleSection;
