import ProfileSidebar from '@/features/profile/ProfileSidebar';
import React from 'react';

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-5 py-12 w-full max-w-[1440px]">
      <ProfileSidebar />
      <div className="w-full">{children}</div>
    </div>
  );
};

export default ProfileLayout;
