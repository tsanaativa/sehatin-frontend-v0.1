'use client';
import { Sehatin } from '@/assets/icons';
import { Icon } from '@/components/common';
import { ADMIN_MENUS, PHARMACY_MANAGER_MENUS } from '@/constants/menus';
import { User } from '@/types/User';
import { logout } from '@/utils/interceptor';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AdminSidebar = ({ user }: { user?: User }) => {
  const pathname = usePathname();
  let isAdmin = user?.role === 'admin' ? ADMIN_MENUS : PHARMACY_MANAGER_MENUS;

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className="w-80 fixed h-screen bg-white-fe border-r border-gray-light px-6 py-7">
      <Link href="/admin/dashboard">
        <Sehatin />
      </Link>
      <div className="flex flex-col justify-between h-5/6 mt-12">
        <ul>
          {isAdmin.map((menu, idx) => (
            <li key={idx}>
              <Link
                className={`flex items-center gap-x-2 rounded-lg px-4 py-4 ${pathname.includes(menu.link) ? 'bg-primary-dark text-light hover:bg-primary-dark/90' : 'text-gray'}`}
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
        <span
          className="flex gap-x-2 text-danger px-4 py-4 cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut /> Logout
        </span>
      </div>
    </aside>
  );
};

export default AdminSidebar;
