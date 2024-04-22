'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import DefaultAvatarImg from '@/assets/images/default-avatar.svg';
import Image from 'next/image';
import { PROFILE_MENUS } from '@/constants/menus';
import { DUMMY_USER } from '@/constants/dummy';

const ProfileSidebar = () => {
  const pathname = usePathname();

  return (
    <div>
      <ul className="min-w-[250px] border border-gray-light rounded-lg">
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
        {PROFILE_MENUS.map((menu, idx) => {
          return (
            <li
              key={idx}
              className={`px-4 py-3 border-t border-gray-light ${
                pathname === menu.link
                  ? 'text-primary-dark font-semibold'
                  : 'text-dark-gray'
              }`}
            >
              <Link href={menu.link}>{menu.label}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProfileSidebar;
