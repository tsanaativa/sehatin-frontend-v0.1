import {
  BottomNavigation,
  Footer,
  Navbar,
  SehatinBanner,
} from '@/components/layout';
import LoginBar from '@/components/layout/LoginBar';
import { getSession } from '@/utils/session';

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getSession();

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
