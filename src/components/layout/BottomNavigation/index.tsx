'use client';
import { Icon } from '@/components/common';
import { MENUS } from '@/constants/menus';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const BottomNavigation = () => {
  const pathname = usePathname();
  const listOfLink = MENUS.map((val) => val.link);
  const isPage = listOfLink.includes(pathname);

  return (
    <>
      {isPage ? (
        <div className="fixed bottom-0 w-full bg-light rounded-tl-lg rounded-tr-lg border-t-2 border-t-gray-lighter md:hidden">
          <ul className="flex items-center justify-between px-6 py-3">
            {MENUS.map((menu, idx) => {
              if (menu.label === 'Consult') {
                return (
                  <li className="flex flex-col items-center relative" key={idx}>
                    <div className="absolute -top-12 bg-primary text-white-fa p-4 rounded-full border-8 border-primary-outline">
                      <Icon name={menu.icon} />
                    </div>
                    <span className="mt-8 text-dark-gray">Consult</span>
                  </li>
                );
              }

              return (
                <li key={idx}>
                  <Link
                    className={`flex flex-col items-center gap-y-1 ${
                      pathname === menu.link
                        ? 'text-primary-dark'
                        : 'text-dark-gray'
                    }`}
                    href={menu.link}
                  >
                    <Icon name={menu.icon} />
                    <span>{menu.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default BottomNavigation;
