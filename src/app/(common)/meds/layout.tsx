import UserPageHeader from '@/components/common/UserPageHeader';
import React from 'react';

const MedsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-primary-dark bg-gradient-to-r from-slate-900/0 to-primary w-full">
      <div className="flex justify-center px-6">
        <UserPageHeader />
      </div>
      {children}
    </div>
  );
};

export default MedsLayout;