'use client';
import {
  ClipboardList,
  Home,
  MessageSquareMore,
  Pill,
  UserRound,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const BottomNavigation = () => {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 w-full bg-light rounded-tl-lg rounded-tr-lg border-t-2 border-t-gray-lighter md:hidden">
      <ul className="flex items-center justify-between px-6 py-3">
        <li>
          <Link
            className={`flex flex-col items-center gap-y-1 ${
              pathname === '/' ? 'text-primary-dark' : 'text-dark-gray'
            }`}
            href="/"
          >
            <Home />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link
            className={`flex flex-col items-center gap-y-1 ${
              pathname === '/meds' ? 'text-primary-dark' : 'text-dark-gray'
            }`}
            href="/meds"
          >
            <Pill />
            <span>Meds</span>
          </Link>
        </li>
        <li className="flex flex-col items-center relative">
          <div className="absolute -top-12 bg-primary text-white-fa p-4 rounded-full border-8 border-primary-outline">
            <MessageSquareMore />
          </div>
          <span className="mt-8 text-dark-gray">Consult</span>
        </li>
        <li>
          <Link
            className={`flex flex-col items-center gap-y-1 ${
              pathname === '/orders' ? 'text-primary-dark' : 'text-dark-gray'
            }`}
            href="/orders"
          >
            <ClipboardList />
            <span>Orders</span>
          </Link>
        </li>
        <li>
          <Link
            className={`flex flex-col items-center gap-y-1 ${
              pathname === '/profile' ? 'text-primary-dark' : 'text-dark-gray'
            }`}
            href="/profile"
          >
            <UserRound />
            <span>Profile</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default BottomNavigation;
