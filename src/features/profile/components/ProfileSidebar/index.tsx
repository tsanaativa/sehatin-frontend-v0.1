'use client';

import DefaultAvatarImg from '@/assets/images/default-avatar.svg';
import { PROFILE_MENUS } from '@/constants/menus';
import { UserContext } from '@/context/UserProvider';
import { logout } from '@/utils/interceptor';
import { ChevronRight, LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useContext } from 'react';

type ProfileSidebarProps = {
  isMobile?: boolean;
};

const ProfileSidebar = ({ isMobile = false }: ProfileSidebarProps) => {
  const { user } = useContext(UserContext);
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div>
      <ul
        className={`min-w-[220px] ${!isMobile && 'border border-gray-light'} rounded-lg lg:min-w-[250px]`}
      >
        {!isMobile && (
          <li className="border-b border-gray-light">
            <div className="flex gap-3 p-4">
              <Image
                width={43}
                height={43}
                src={
                  user?.profile_picture
                    ? user?.profile_picture
                    : DefaultAvatarImg
                }
                className="rounded-full object-cover"
                priority
                alt="Profile"
              />
              <div>
                <p className="font-semibold line-clamp-1">{user?.name}</p>
                <p className="text-sm text-dark-gray line-clamp-1">
                  {user?.email}
                </p>
              </div>
            </div>
          </li>
        )}
        {PROFILE_MENUS.map((menu, idx) => (
          <React.Fragment key={idx}>
            {!(isMobile && idx > 1) && (
              <a href={menu.link}>
                <li
                  className={`px-4 py-4 ${idx !== 0 && 'border-t'} border-gray-light flex items-center justify-between text-lg md:text-base ${
                    !isMobile
                      ? pathname === menu.link
                        ? 'text-primary-dark font-semibold'
                        : 'text-dark-gray'
                      : 'font-semibold text-dark'
                  }`}
                >
                  {menu.label}
                  {isMobile && <ChevronRight />}
                </li>
              </a>
            )}
          </React.Fragment>
        ))}
        {isMobile && (
          <li
            role="button"
            onClick={handleLogout}
            className="px-4 py-4 border-t border-gray-light flex items-center justify-between text-lg md:text-base text-danger font-semibold"
          >
            Logout
            <LogOut />
          </li>
        )}
      </ul>
    </div>
  );
};

export default ProfileSidebar;
