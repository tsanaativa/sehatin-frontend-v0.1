'use client';
import Icon from '@/components/common/Icon';
import google from '@/features/auth/actions/google';
import cookie from '@/utils/publicCookie';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

const WaitingOauth = () => {
  const urlParam = useSearchParams();
  const { replace } = useRouter();

  const loginUser = async () => {
    const code = urlParam.get('code');
    const role = cookie.get<'user' | 'doctor'>('g-session');
    if (!code || !role) {
      toast.error('authentication failed. please try again.');
      replace('/auth/login');
      return;
    }

    try {
      await google({ auth_code: code, role });
      toast.success('successfully logged in');
      replace('/');
    } catch (error) {
      if (error instanceof Error) {
        console.log('ERROR', error?.message);
        toast.error('authentication failed. please try again.');
        replace('/auth/login');
      }
    } finally {
      cookie.remove('g-session');
    }
  };

  useEffect(() => {
    loginUser();
  });
  return (
    <div className="h-screen w-full grid place-items-center">
      <Icon
        name="LoaderCircle"
        className="w-1/4 h-1/4 text-primary-dark animate-spin"
      />
    </div>
  );
};

export default WaitingOauth;
