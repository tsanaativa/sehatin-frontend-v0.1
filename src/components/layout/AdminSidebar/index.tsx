'use client';
import { Sehatin } from '@/assets/icons';
import { Icon } from '@/components/common';
import { ADMIN_MENUS } from '@/constants/menus';
import {
  ClipboardList,
  LayoutDashboard,
  LineChart,
  LogOut,
  Pill,
  Stethoscope,
  Store,
  User,
  UserRoundCog,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-80 min-h-screen bg-white-fe border-r border-gray-light px-6 py-7">
      <Link href="/admin/dashboard">
        <Sehatin />
      </Link>
      <div className="flex flex-col justify-between h-full mt-12">
        <ul>
          {ADMIN_MENUS.map((menu, idx) => (
            <li key={idx}>
              <Link
                className={`flex items-center gap-x-2 rounded-lg px-4 py-4 ${pathname.includes(menu.link) ? 'bg-primary-dark text-light' : 'text-gray'}`}
                href={
                  menu.link === '/admin/dashboard'
                    ? menu.link
                    : menu.link + '/list'
                }
              >
                <Icon name={menu.icon || 'Ban'} /> {menu.label}
              </Link>
            </li>
          ))}
        </ul>
        <span className="flex gap-x-2">
          <LogOut /> Logout
        </span>
      </div>
    </aside>
  );
};

export default AdminSidebar;
