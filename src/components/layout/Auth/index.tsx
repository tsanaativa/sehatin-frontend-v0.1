import Image from 'next/image';
import React from 'react';

type AuthWithRoleProps = {
  children: React.ReactNode;
  pageTitle?: string;
};

const AuthWithRole = ({
  children,
  pageTitle = 'Register',
}: AuthWithRoleProps) => {
  return (
    <div className="flex min-h-screen">
      <div className="grid place-items-center py-[35px] px-[23px] sm:p-[35px] lg:p-[calc(.5rem+4vw)] min-w-[280px] w-full sm:min-w-[480px] sm:w-5/12">
        <div className="w-full">
          <h2 className="font-semibold text-2xl leading-[135%] text-center text-primary-text mb-10">
            {pageTitle}
          </h2>
          <div className="text-dark-gray leading-[150%] tracking-[0.5px] mb-[6px]">
            Please select your role
          </div>
          {children}
        </div>
      </div>
      <div className="w-7/12 hidden sm:block rounded-l-2xl overflow-hidden shadow-[-2px_0_10px_0] shadow-slate-300/50">
        <Image
          src="/auth-hero.png"
          width={1920}
          height={1920}
          className="w-full h-full object-cover lg:object-right"
          priority
          alt="banner-hero-1"
        />
      </div>
    </div>
  );
};

export default AuthWithRole;
