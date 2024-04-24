import DefaultAvatarImg from '@/assets/images/default-avatar.svg';
import { Edit3 } from 'lucide-react';
import { DUMMY_USER } from '@/constants/dummy';
import ChangePasswordModal from '@/features/profile/components/ChangePasswordModal';
import Image from 'next/image';

const MyProfile = () => {
  return (
    <div>
      <h2 className="text-xl text-center font-semibold font-poppins md:text-start md:text-2xl">
        My Profile
      </h2>
      <div className="flex flex-col items-center gap-10 mt-5 md:flex-row md:items-start">
        <div className="relative w-fit h-fit">
          <Image
            width={150}
            src={DefaultAvatarImg}
            className="rounded-full"
            priority
            alt="Profile"
          />
          <div className="absolute right-[0.125rem] bottom-[0.25rem]">
            <button className="bg-primary text-light p-1 rounded-full">
              <Edit3 fill="white" size={15} />
            </button>
          </div>
        </div>
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
