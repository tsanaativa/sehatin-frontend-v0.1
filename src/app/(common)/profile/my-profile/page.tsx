import DefaultAvatarImg from '@/assets/images/default-avatar.svg';
import { Edit3 } from 'lucide-react';
import Image from 'next/image';

const MyProfile = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold font-poppins">My Profile</h2>
      <div className="flex gap-10 mt-5">
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
                <p>Vivin</p>
              </div>
            </li>
            <li className="">
              <div className="flex justify-between py-2">
                <p className="text-dark-gray">Email</p>
                <p>vivin@gmail.com</p>
              </div>
            </li>
            <li className="">
              <div className="flex justify-between py-2">
                <p className="text-dark-gray">Gender</p>
                <p>Male</p>
              </div>
            </li>
            <li>
              <div className="flex justify-between py-2">
                <p className="text-dark-gray">Birth Date</p>
                <p>2020/10/11</p>
              </div>
            </li>
          </ul>
          <div className="flex justify-end py-2 mt-3">
            <div role="button" className="text-primary-dark font-semibold">
              <p>Change Password?</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
