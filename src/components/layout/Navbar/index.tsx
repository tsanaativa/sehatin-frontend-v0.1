import { Sehatin } from '@/assets/icons';
import { AlignLeft, ShoppingCart } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-20">
      <nav className="bg-light px-4 py-3 flex items-center justify-between sm:px-6">
        <AlignLeft size={28} className="cursor-pointer" />
        <Sehatin />
        <div className="w-16 h-full grid place-items-center">
          <div className="relative cursor-pointer">
            <ShoppingCart size={28} />
            <span className="absolute -top-2 -right-4 text-xs text-light font-medium bg-primary-darker rounded-full p-1">
              99+
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
