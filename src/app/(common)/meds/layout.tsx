import UserPageHeader from '@/components/common/UserPageHeader';
import React from 'react';

const MedsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-primary-dark bg-gradient-to-r from-slate-900/0 to-primary w-full">
      <div className="flex justify-center px-6">
        <UserPageHeader />
      </div>
      <div className="w-full bg-light rounded-tr-2xl rounded-tl-2xl flex justify-center px-6 md:rounded-none">
        <div className="max-w-[1150px] py-4 w-full px-4 sm:px-6 md:py-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MedsLayout;
