import {
  BottomNavigation,
  Footer,
  Navbar,
  SehatinBanner,
} from '@/components/layout';
import LoginBar from '@/components/layout/LoginBar';
import UserProvider from '@/context/UserProvider';
import { getUser } from '@/services/user';

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();

  return (
    <UserProvider>
      <div className="w-full min-h-screen relative">
        <LoginBar isAuthenticated={!!user} />
        <Navbar user={user} />
        <div className="w-full m-auto flex justify-center">{children}</div>
        <SehatinBanner />
        <Footer />
        <BottomNavigation />
      </div>
    </UserProvider>
  );
};

export default CommonLayout;
