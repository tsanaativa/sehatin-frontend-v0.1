'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import DefaultAvatarImg from '@/assets/images/default-avatar.svg';
import Image from 'next/image';

const ProfileSidebar = () => {
  const pathname = usePathname();
  const menus = [
    {
      path: '/profile/my-profile',
      name: 'My Profile',
    },
    {
      path: '/profile/my-addresses',
      name: 'My Addresses',
    },
    {
      path: '/profile/my-consultation-history',
      name: 'My Consultation History',
    },
    {
      path: '/profile/my-orders',
      name: 'My Orders',
    },
  ];

  const user = {
    name: 'Vivin',
    email: 'vivin@gmail.com',
  };
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
              <p className="font-semibold line-clamp-1">{user.name}</p>
              <p className="text-sm text-dark-gray line-clamp-1">
                {user.email}
              </p>
            </div>
          </div>
        </li>
        {menus.map((menu, idx) => {
          return (
            <li
              key={idx}
              className={`px-4 py-3 border-t border-gray-light ${
                pathname === menu.path
                  ? 'text-primary-dark font-semibold'
                  : 'text-dark-gray'
              }`}
            >
              <Link href="/profile/my-profile">{menu.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProfileSidebar;
