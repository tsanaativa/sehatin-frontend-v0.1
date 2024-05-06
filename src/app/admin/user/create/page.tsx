import DefaultAvatarImg from '@/assets/images/default-avatar.svg';
import { AddressCard, Button } from '@/components/common';
import { DUMMY_ADDRESSES } from '@/constants/dummy';
import { Edit3, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const CreateUser = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-poppins font-semibold text-3xl text-dark">
          User List
        </h1>
        <Link
          className="bg-primary-dark font-poppins font-medium text-base text-white rounded-lg px-6 py-3 hover:bg-primary-dark/90"
          href="/admin/user/create"
        >
          + Create User
        </Link>
      </div>
      <div className="flex justify-between">
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
        <div>
          <span>User Data</span>
        </div>
        <div>
          <span>Addresses</span>
          <div className="flex flex-col gap-4 mt-5">
            {DUMMY_ADDRESSES.map((addr, idx) => (
              <AddressCard address={addr} key={idx} />
            ))}
          </div>
          <div className="flex justify-center mt-5 md:justify-end">
            <Button
              variant="outlined-primary"
              className="flex items-center gap-1 px-6 w-full md:w-fit"
            >
              <Plus size={15} /> Add Address
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateUser;
