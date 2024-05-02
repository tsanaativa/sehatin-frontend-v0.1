import UserPageHeader from '@/components/common/UserPageHeader';
import { getProfile } from '@/services/profile';
import { LoginData } from '@/types/LoginData';
import cookiesStore from '@/utils/cookies';

const MedsLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = cookiesStore.get<LoginData>(
    process.env.NEXT_PUBLIC_USER_LOCAL_KEY || ''
  )?.user;

  if (user) {
    const profile = await getProfile(user.id);

    // if (profile) {
    //   let userWithAddress = user;
    //   userWithAddress.addresses = profile.addresses;

    //   cookiesStore.set(
    //     process.env.NEXT_PUBLIC_USER_LOCAL_KEY || '',
    //     userWithAddress
    //   );
    // }
  }

  return (
    <div className="bg-primary-dark bg-gradient-to-r from-slate-900/0 to-primary w-full">
      <div className="flex justify-center px-1 md:px-6">
        <UserPageHeader user={user} />
      </div>
      {children}
    </div>
  );
};

export default MedsLayout;
