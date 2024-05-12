import Image from 'next/image';
import defaultImage from '@/assets/images/default-avatar.svg';
import { getUser } from '@/services/session';

const AdminHeader = async () => {
  const user = await getUser();
  return (
    <div className="w-full h-16 flex items-center justify-end gap-x-4 bg-white-fe border-b border-gray-light pr-12">
      <Image
        src={user?.profile_picture ? user.profile_picture : defaultImage}
        alt=""
      />
      <span className="font-medium text-sm text-dark">{user?.name}</span>
    </div>
  );
};

export default AdminHeader;
