'use client';

import { User } from '@/types/User';
import { getUser } from '@/utils/user';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const LoginBar = () => {
  const user = getUser();

  return (
    <>
      {!!!user && (
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
