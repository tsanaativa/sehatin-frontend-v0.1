'use client';

import { Sehatin } from '@/assets/icons';
import { Button } from '@/components/common';
import ProfileDropdown from '@/components/common/ProfileDropdown';
import { UserContext } from '@/context/UserProvider';
import { User } from '@/types/User';
import { AlignLeft, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useContext, useEffect } from 'react';

type HeaderProps = {
  user?: User;
  onCart: () => void;
};

const Header = ({ user, onCart }: HeaderProps) => {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    setUser(user);
  }, [setUser, user]);

  return (
    <header
      id="header-main"
      className="sticky top-0 z-40 bg-light border-b-2 border-b-gray-lighter"
    >
      <nav className="max-w-[1440px] min-h-[80px] w-full m-auto px-4 py-4 flex items-center justify-between sm:px-5 lg:px-10">
        <div className="md:hidden">
          <AlignLeft size={28} className="cursor-pointer" />
        </div>
        <Link href="/">
          <Sehatin />
        </Link>
        <div className="flex items-center">
          <ul className="hidden items-center gap-x-7 lg:gap-x-10 md:flex">
            {user?.role !== 'doctor' && (
              <>
                <li>
                  <Link className="font-poppins text-secondary" href="/meds">
                    Medicines
                  </Link>
                </li>
                <li>
                  <Link className="font-poppins text-secondary" href="/doctors">
                    Doctors
                  </Link>
                </li>
              </>
            )}
            {!!!user && (
              <li className="flex gap-4">
                <Link href="/auth/register">
                  <Button variant="outlined-primary" className="w-32 h-11 py-2">
                    Register
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button className="w-32 h-11 py-2">Login</Button>
                </Link>
              </li>
            )}
            {user && user.role !== 'doctor' && (
              <>
                <li>
                  <div className="w-16 h-full grid place-items-center -ms-6">
                    <button
                      onClick={onCart}
                      className="relative cursor-pointer"
                    >
                      <ShoppingCart size={28} />
                      <span className="absolute -top-1 -right-5 text-sm text-light font-bold bg-primary-darker rounded-full py-0 px-1">
                        99+
                      </span>
                    </button>
                  </div>
                </li>
              </>
            )}
            {!!user && (
              <li>
                <ProfileDropdown user={user} />
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
