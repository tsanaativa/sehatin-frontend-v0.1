import UserPageHeader from '@/components/common/UserPageHeader';
import { getUser } from '@/services/user';

const MedsLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = getUser();

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
