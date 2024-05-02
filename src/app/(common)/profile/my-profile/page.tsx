import { ProfileForm } from '@/components/common';
import { getProfile } from '@/services/profile';
import { LoginData } from '@/types/LoginData';
import { User } from '@/types/User';
import cookiesStore from '@/utils/cookies';

const MyProfile = async () => {
  const user = cookiesStore.get<LoginData>(
    process.env.NEXT_PUBLIC_USER_LOCAL_KEY || ''
  )?.user;

  let profileData: User | undefined;
  profileData = await getProfile(user.id);

  return (
    <div>
      <h2 className="text-xl text-center font-semibold font-poppins md:text-start md:text-2xl">
        My Profile
      </h2>
      <div className="flex flex-col items-center gap-5 md:gap-10 mt-5 md:flex-row md:items-start">
        <ProfileForm defaultUser={profileData} />
      </div>
    </div>
  );
};

export default MyProfile;
