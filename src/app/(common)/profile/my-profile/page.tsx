'use client';

import AvatarUploader from '@/components/common/AvatarUploader';
import ProfileForm from '@/components/common/ProfileForm';
import { User } from '@/types/User';
import api from '@/utils/api';
import { getUser } from '@/utils/auth';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const [userData, setUserData] = useState<User | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const params = {};
        const res = await api.get<typeof params, User>(`/users/profile`);
        setUserData(res.data);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h2 className="text-xl text-center font-semibold font-poppins md:text-start md:text-2xl">
        My Profile
      </h2>
      <div className="flex flex-col items-center gap-5 md:gap-10 mt-5 md:flex-row md:items-start">
        <AvatarUploader />
        <div className="w-full">
          <ProfileForm defaultUser={userData} />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
