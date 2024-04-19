import ProfileSidebar from '@/features/profile/ProfileSidebar';
import React from 'react';

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full max-w-[1440px] flex justify-center">
      <div className="w-full flex gap-6 py-12 px-4 max-w-[1150px] sm:px-6">
        <ProfileSidebar />
        <div className="w-full border border-gray-light py-6 px-7">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
