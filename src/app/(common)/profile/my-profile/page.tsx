import { ProfileForm } from '@/components/common';
import { getProfile } from '@/services/profile';
import { User } from '@/types/User';

const MyProfile = async () => {
  let profileData: User | undefined;
  profileData = await getProfile();

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
