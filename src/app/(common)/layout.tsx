import {
  BottomNavigation,
  Footer,
  Navbar,
  SehatinBanner,
} from '@/components/layout';
import LoginBar from '@/components/layout/LoginBar';

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-screen relative">
      <LoginBar />
      <Navbar />
      <div className="w-full m-auto flex justify-center">{children}</div>
      <SehatinBanner />
      <Footer />
      <BottomNavigation />
    </div>
  );
};

export default CommonLayout;
