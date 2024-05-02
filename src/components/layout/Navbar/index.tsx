'use client';
import { Sehatin } from '@/assets/icons';
import { Button } from '@/components/common';
import { AlignLeft, ShoppingCart } from 'lucide-react';
import CartPage from '@/features/cart/components';
import Link from 'next/link';
import { useState } from 'react';
import { overflowHandler } from '@/utils/helper';

const Navbar = () => {
  const [openCart, setOpenCart] = useState(false);
  return (
    <>
      <header className="sticky top-0 z-[42] bg-light border-b-2 border-b-gray-lighter">
        <nav className="max-w-[1440px] w-full m-auto px-4 py-4 flex items-center justify-between sm:px-6 md:px-20">
          <div className="md:hidden">
            <AlignLeft size={28} className="cursor-pointer" />
          </div>
          <Link href="/">
            <Sehatin />
          </Link>
          <div className="flex items-center">
            <ul className="hidden items-center gap-x-10 md:flex">
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
              <li className="flex gap-4">
                <Link href="/register">
                  <Button variant="outlined-primary" className="w-32 h-11 py-2">
                    Register
                  </Button>
                </Link>
                <Link href="/login">
                  <Button className="w-32 h-11 py-2">Login</Button>
                </Link>
              </li>
              <li>
                <div className="w-16 h-full grid place-items-center -ms-6">
                  <button
                    onClick={() => {
                      setOpenCart(true);
                      overflowHandler('hidden');
                    }}
                    className="relative cursor-pointer"
                  >
                    <ShoppingCart size={28} />
                    <span className="absolute -top-1 -right-5 text-sm text-light font-bold bg-primary-darker rounded-full py-0 px-1">
                      99+
                    </span>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <CartPage
        openCart={openCart}
        onCloseCart={() => {
          setOpenCart(false);
          overflowHandler('auto');
        }}
      />
    </>
  );
};

export default Navbar;
