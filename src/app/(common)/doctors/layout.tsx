import UserPageHeader from '@/components/common/UserPageHeader';
import WebSocketProvider from '@/context/WebSocketProvider';
import React from 'react';

const DoctorsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-primary-dark bg-gradient-to-r from-slate-900/0 to-primary w-full">
      <div className="flex justify-center px-1 md:px-6">
        <UserPageHeader />
      </div>
      <WebSocketProvider>{children}</WebSocketProvider>
    </div>
  );
};

export default DoctorsLayout;
