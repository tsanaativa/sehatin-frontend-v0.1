import DefaultAvatarImg from '@/assets/images/default-avatar.svg';
import { ProfileSidebar } from '@/features/profile/components';
import { getUser } from '@/services/user';
import { logout } from '@/utils/interceptor';
import Image from 'next/image';
import { redirect } from 'next/navigation';

const Profile = async () => {
  const user = await getUser();

  if (!user) {
    await logout();
    redirect('/');
  }

  return (
    <div className="-mx-4 -my-6 bg-primary-dark bg-gradient-to-r from-slate-900/0 to-primary sm:-mx-6 md:hidden">
      <div className="px-3 py-9 flex flex-col items-center gap-3 text-light md:hidden">
        <Image
          width={100}
          src={DefaultAvatarImg}
          className="rounded-full"
          priority
          alt="Profile"
        />
        <div className="text-center">
          <p className="font-poppins text-lg font-semibold">{user.name}</p>
          <p>{user.email}</p>
        </div>
      </div>
      <div className="bg-light rounded-tl-xl rounded-tr-xl p-5">
        <ProfileSidebar isMobile user={user} />
      </div>
    </div>
  );
};

export default Profile;
