import AvatarUploader from '@/components/common/AvatarUploader';
import ProfileForm from '@/components/common/ProfileForm';
import { DUMMY_USER } from '@/constants/dummy';
import ChangePasswordModal from '@/components/common/ChangePasswordModal';
import ChangePasswordForm from '@/components/common/ChangePasswordForm';

const MyProfile = () => {
  return (
    <div>
      <h2 className="text-xl text-center font-semibold font-poppins md:text-start md:text-2xl">
        My Profile
      </h2>
      <div className="flex flex-col items-center gap-10 mt-5 md:flex-row md:items-start">
        <AvatarUploader />
        <div className="w-full">
          <ProfileForm defaultUser={DUMMY_USER} />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
