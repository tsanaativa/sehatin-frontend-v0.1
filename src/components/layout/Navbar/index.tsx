import { Sehatin } from '@/assets/icons';
import { AlignLeft, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-20 bg-light border-b-2 border-indigo-200 border-b-gray-lighter">
      <nav className="max-w-[1440px] w-full m-auto px-4 py-4 flex items-center justify-between sm:px-6 md:px-20">
        <div className="md:hidden">
          <AlignLeft size={28} className="cursor-pointer" />
        </div>
        <Sehatin />
        <div className="flex">
          <ul className="hidden items-center gap-x-10 md:flex">
            <li>
              <Link
                className="font-poppins text-lg text-secondary"
                href="/meds"
              >
                Medicines
              </Link>
            </li>
            <li>
              <Link
                className="font-poppins text-lg text-secondary"
                href="/doctors"
              >
                Doctors
              </Link>
            </li>
            <li>
              <Link
                className="bg-light border-2 border-primary-dark rounded-md hover:bg-primary-dark hover:text-light font-poppins font-medium text-primary-dark block text-center w-32 py-2"
                href="/register"
              >
                Register
              </Link>
            </li>
            <li>
              <Link
                className="bg-primary-dark border-2 border-primary-dark font-poppins rounded-md font-medium text-light block text-center w-32 py-2"
                href="/login"
              >
                Login
              </Link>
            </li>
          </ul>
          <div className="w-16 h-full grid place-items-center">
            <div className="relative cursor-pointer">
              <ShoppingCart size={28} />
              <span className="absolute -top-2 -right-4 text-xs text-light font-medium bg-primary-darker rounded-full p-1">
                99+
              </span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
