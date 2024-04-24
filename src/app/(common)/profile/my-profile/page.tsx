import AvatarUploader from '@/components/common/AvatarUploader';
import { DUMMY_USER } from '@/constants/dummy';
import ChangePasswordModal from '@/features/profile/components/ChangePasswordModal';

const MyProfile = () => {
  return (
    <div>
      <h2 className="text-xl text-center font-semibold font-poppins md:text-start md:text-2xl">
        My Profile
      </h2>
      <div className="flex flex-col items-center gap-10 mt-5 md:flex-row md:items-start">
        <AvatarUploader />
        <div className="w-full">
          <ul>
            <li className="">
              <div className="flex justify-between py-2">
                <p className="text-dark-gray">Name</p>
                <p>{DUMMY_USER.name}</p>
              </div>
            </li>
            <li className="">
              <div className="flex justify-between py-2">
                <p className="text-dark-gray">Email</p>
                <p>{DUMMY_USER.email}</p>
              </div>
            </li>
            <li className="">
              <div className="flex justify-between py-2">
                <p className="text-dark-gray">Gender</p>
                <p>{DUMMY_USER.gender}</p>
              </div>
            </li>
            <li>
              <div className="flex justify-between py-2">
                <p className="text-dark-gray">Birth Date</p>
                <p>{DUMMY_USER.birth_date}</p>
              </div>
            </li>
          </ul>
          <div className="flex justify-end py-2 mt-3">
            <ChangePasswordModal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
