import { ProfileForm } from '@/components/common';
import { getDoctorProfile, getProfile } from '@/services/profile';
import { getUser } from '@/services/session';
import { Doctor } from '@/types/Doctor';
import { User } from '@/types/User';

const MyProfile = async () => {
  const user = await getUser();

  let userProfile: User | undefined;
  let doctorProfile: Doctor | undefined;

  if (user?.role === 'user') {
    userProfile = await getProfile();
  }
  if (user?.role === 'doctor') {
    doctorProfile = await getDoctorProfile();
  }

  return (
    <div>
      <h2 className="text-xl text-center font-semibold font-poppins md:text-start md:text-2xl">
        My Profile
      </h2>
      <div className="flex flex-col items-center gap-5 md:gap-10 mt-5 md:flex-row md:items-start">
        <ProfileForm
          role={user?.role}
          defaultUser={userProfile}
          defaultDoctor={doctorProfile}
        />
      </div>
    </div>
  );
};

export default MyProfile;
