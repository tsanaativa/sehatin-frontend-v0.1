import ProfileSidebar from '@/features/profile/components/ProfileSidebar';
import React from 'react';

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-[100vh] max-w-[1440px] flex justify-center md:min-h-fit">
      <div className="w-full flex gap-6 pt-6 pb-8 px-4 max-w-[1150px] sm:px-6 md:py-12">
        <div className="hidden md:block">
          <ProfileSidebar />
        </div>
        <div className="w-full min-h-full md:border md:border-gray-light md:py-6 md:px-7 md:rounded">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
