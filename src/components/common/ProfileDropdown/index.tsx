'use client';

import DefaultAvatarImg from '@/assets/images/default-avatar.svg';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { User } from '@/types/User';
import { logout } from '@/utils/interceptor';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type ProfileDropdownProps = {
  user: User;
};

const ProfileDropdown = ({ user }: ProfileDropdownProps) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const ref = useOutsideClick(() => {
    setShowDropdown(false);
  });

  const handleLogout = () => {
    setShowDropdown(false);
    logout();
  };

  return (
    <div className="relative cursor-pointer">
      <Image
        src={user.profile_picture ? user.profile_picture : DefaultAvatarImg}
        className="w-10 h-10 object-cover rounded-full"
        width={600}
        height={300}
        alt=""
        onClick={() => setShowDropdown(true)}
      />
      <div
        className={`mt-2 min-w-32 absolute right-0 bg-light border border-gray-light rounded ${!showDropdown ? 'hidden' : ''}`}
        ref={ref}
      >
        <Link
          href="/profile/my-profile"
          className="hidden px-2 py-1 hover:bg-gray-lighter text-xs flex gap-2 flex items-center cursor-pointer capitalize md:py-2 md:px-3 md:text-sm md:block"
          onClick={() => setShowDropdown(false)}
        >
          My Profile
        </Link>
        <Link
          href="/profile"
          className="px-2 py-1 hover:bg-gray-lighter text-xs flex gap-2 flex items-center cursor-pointer capitalize md:py-2 md:px-3 md:text-sm md:hidden"
          onClick={() => setShowDropdown(false)}
        >
          My Profile
        </Link>
        <div
          className="text-danger px-2 py-1 hover:bg-gray-lighter text-xs flex gap-2 flex items-center cursor-pointer capitalize justify-between md:py-2 md:px-3 md:text-sm"
          role="button"
          onClick={handleLogout}
        >
          Logout
          <LogOut size={15} />
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown;
