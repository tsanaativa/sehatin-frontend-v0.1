import {
  BottomNavigation,
  Footer,
  Navbar,
  SehatinBanner,
} from '@/components/layout';
import Link from 'next/link';

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-screen relative">
      <div
        id="unregister-notif"
        className="w-full bg-dark-gray text-light text-center text-[0.625rem] font-medium py-1 md:text-sm"
      >
        You are not registered. To access all features,{' '}
        <Link className="font-bold underline" href="/register">
          register here
        </Link>
        .
      </div>
      <Navbar />
      <div className="w-full m-auto flex justify-center">{children}</div>
      <SehatinBanner />
      <Footer />
      <BottomNavigation />
    </div>
  );
};

export default CommonLayout;
