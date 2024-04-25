'use client';

import DefaultAvatarImg from '@/assets/images/default-avatar.svg';
import { DUMMY_USER } from '@/constants/dummy';
import { PROFILE_MENUS } from '@/constants/menus';
import { ChevronRight, LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type ProfileSidebarProps = {
  isMobile?: boolean;
};

const ProfileSidebar = ({ isMobile = false }: ProfileSidebarProps) => {
  const pathname = usePathname();

  return (
    <div>
      <ul
        className={`min-w-[220px] ${!isMobile && 'border-gray-light'} rounded-lg lg:min-w-[250px]`}
      >
        {!isMobile && (
          <li>
            <div className="flex gap-3 p-4">
              <Image
                width={43}
                src={DefaultAvatarImg}
                className="rounded-full"
                priority
                alt="Profile"
              />
              <div>
                <p className="font-semibold line-clamp-1">{DUMMY_USER.name}</p>
                <p className="text-sm text-dark-gray line-clamp-1">
                  {DUMMY_USER.email}
                </p>
              </div>
            </div>
          </li>
        )}
        {PROFILE_MENUS.map((menu, idx) => (
          <React.Fragment key={idx}>
            {!(isMobile && idx > 1) && (
              <Link href={menu.link}>
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
              </Link>
            )}
          </React.Fragment>
        ))}
        {isMobile && (
          <Link href="/logout">
            <li className="px-4 py-4 border-t border-gray-light flex items-center justify-between text-lg md:text-base text-danger font-semibold">
              Logout
              <LogOut />
            </li>
          </Link>
        )}
      </ul>
    </div>
  );
};

export default ProfileSidebar;
