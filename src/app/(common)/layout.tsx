import {
  BottomNavigation,
  Footer,
  Navbar,
  SehatinBanner,
} from '@/components/layout';
import LoginBar from '@/components/layout/LoginBar';
import { getUser } from '@/utils/user';

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  const user = getUser();

  return (
    <div className="w-full min-h-screen relative">
      <LoginBar isAuthenticated={!!user} />
      <Navbar />
      <div className="w-full m-auto flex justify-center">{children}</div>
      <SehatinBanner />
      <Footer />
      <BottomNavigation />
    </div>
  );
};

export default CommonLayout;
